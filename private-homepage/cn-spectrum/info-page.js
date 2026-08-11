(function () {
  const lock = window.CN_SPECTRUM_LOCKED;
  const payloadKey = "cn-spectrum-unlocked-v1";
  const resultKey = "cn-spectrum-result-v1";
  const pageType = document.body.dataset.page;
  const unlockShell = document.getElementById("unlockShell");
  const appShell = document.getElementById("appShell");
  const form = document.getElementById("unlockForm");
  const input = document.getElementById("passwordInput");
  const button = document.getElementById("unlockButton");
  const error = document.getElementById("unlockError");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); error.textContent = ""; button.disabled = true; button.textContent = "解锁中";
    try {
      const payload = await decrypt(input.value);
      sessionStorage.setItem(payloadKey, JSON.stringify(payload));
      show(payload);
      input.value = "";
    } catch (_) { error.textContent = "密码不正确，或加密数据无法解锁。"; }
    finally { button.disabled = false; button.textContent = "解锁"; }
  });

  document.getElementById("lockButton").addEventListener("click", () => {
    sessionStorage.removeItem(payloadKey); sessionStorage.removeItem("cn-spectrum-progress-v1"); sessionStorage.removeItem(resultKey);
    appShell.classList.add("is-hidden"); unlockShell.classList.remove("is-hidden"); input.focus();
  });

  const cached = sessionStorage.getItem(payloadKey);
  if (cached) { try { show(JSON.parse(cached)); } catch (_) { sessionStorage.removeItem(payloadKey); } }

  async function decrypt(password) {
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: bytes(lock.salt), iterations: lock.iterations, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(lock.iv) }, key, bytes(lock.payload));
    return JSON.parse(new TextDecoder().decode(plain));
  }
  function bytes(value) { return Uint8Array.from(atob(value), (character) => character.charCodeAt(0)); }

  function show(data) {
    unlockShell.classList.add("is-hidden"); appShell.classList.remove("is-hidden");
    if (pageType === "references") renderReferences(data);
    if (pageType === "issues") renderIssues(data);
    if (pageType === "method") renderMethod(data);
  }

  function renderReferences(data) {
    const profiles = document.getElementById("profileGrid");
    profiles.replaceChildren(...data.profiles.map((profile, index) => {
      const card = document.createElement("article"); card.className = "profile-card"; card.style.setProperty("--accent", data.axes[index % data.axes.length].color);
      const scores = data.axes.map((axis) => `<span title="${escapeHtml(axis.name)}">${axis.short} ${signed(profile.scores[axis.id])}</span>`).join("");
      card.innerHTML = `<h3>${escapeHtml(profile.name)}</h3><p>${escapeHtml(profile.note)}</p><div class="mini-scores">${scores}</div><p>参照置信 ${profile.confidence}/100 · 不确定范围 ±${profile.uncertainty}</p>`;
      return card;
    }));
    const body = document.getElementById("organizationBody");
    body.replaceChildren(...data.organizations.map((organization) => { const row = document.createElement("tr"); row.innerHTML = `<td><strong>${escapeHtml(organization.name)}</strong></td><td>${escapeHtml(organization.role)}</td><td>${escapeHtml(organization.field)}</td>`; return row; }));
    renderSources(data);
  }

  function renderIssues(data) {
    const root = document.getElementById("issueGrid");
    root.replaceChildren(...data.axes.map((axis) => {
      const questions = data.questions.filter((question) => question.axis === axis.id);
      const positive = questions.filter((question) => question.polarity === 1).length;
      const tags = [...new Set(questions.flatMap((question) => question.tags))];
      const card = document.createElement("article"); card.className = "info-card issue-card"; card.style.borderTop = `5px solid ${axis.color}`;
      const details = document.createElement("details"); const summary = document.createElement("summary"); summary.textContent = `查看 ${questions.length} 道题目`; const list = document.createElement("ol");
      list.replaceChildren(...questions.map((question) => { const li = document.createElement("li"); li.textContent = `${question.id} ${question.textZh}`; return li; })); details.append(summary, list);
      card.innerHTML = `<p class="eyebrow">${axis.short} axis</p><h2>${escapeHtml(axis.name)}</h2><p><strong>${escapeHtml(axis.negativeLabel)} ←→ ${escapeHtml(axis.positiveLabel)}</strong></p><p>${escapeHtml(axis.description)}</p><p>${questions.length} 题 · 正向 ${positive} · 反向 ${questions.length - positive}</p><p>覆盖：${tags.map(escapeHtml).join("、")}</p>`;
      card.append(details); return card;
    }));
    renderSources(data);
  }

  function renderMethod(data) {
    document.getElementById("schemaTable").innerHTML = [
      ["axes", "8 个维度及两端标签、颜色和说明"],
      ["questions", `${data.questions.length} 题；id、axis、textZh、polarity、tags、modeFlags`],
      ["modes", data.modes.map((mode) => `${mode.label} ${mode.questionCount}`).join(" / ")],
      ["profiles", `${data.profiles.length} 个启发式理想类型，含 8 维坐标、置信度和不确定范围`],
      ["organizations", `${data.organizations.length} 个制度内政党资料项，不参与距离计算`],
    ].map(([name, detail]) => `<tr><td><code>${name}</code></td><td>${escapeHtml(detail)}</td></tr>`).join("");
    const status = document.getElementById("exportStatus");
    const result = readResult();
    status.textContent = result ? `检测到 ${new Date(result.savedAt).toLocaleString("zh-CN")} 的 ${result.label} 结果。` : "当前会话尚无可导出的测试结果。";
    document.getElementById("exportJson").disabled = !result;
    document.getElementById("exportCsv").disabled = !result;
    document.getElementById("exportJson").addEventListener("click", () => result && download("cn-spectrum-result.json", "application/json", JSON.stringify(result, null, 2)));
    document.getElementById("exportCsv").addEventListener("click", () => result && download("cn-spectrum-result.csv", "text/csv;charset=utf-8", toCsv(result, data)));
    renderSources(data);
  }

  function readResult() { try { return JSON.parse(sessionStorage.getItem(resultKey)); } catch (_) { return null; } }
  function toCsv(result, data) {
    const rows = [["type", "id", "name", "value", "detail"]];
    data.axes.forEach((axis) => rows.push(["axis", axis.id, axis.name, result.scores[axis.id], `stability=${result.axisStats[axis.id].stability}`]));
    result.matches.forEach((match) => rows.push(["profile", match.id, match.name, match.similarity, `view=${result.matchView}`]));
    rows.push(["meta", "overall_stability", result.label, result.overallStability, result.mode]);
    return rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  }
  function download(name, type, content) { const blob = new Blob([content], { type }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); }
  function renderSources(data) { const root = document.getElementById("sourceList"); if (!root) return; root.replaceChildren(...data.sources.map((source) => { const li = document.createElement("li"); const link = document.createElement("a"); link.href = source.url; link.target = "_blank"; link.rel = "noreferrer"; link.textContent = source.name; const type = document.createElement("span"); type.textContent = ` · ${source.type}`; li.append(link, type); return li; })); }
  function signed(value) { return value > 0 ? `+${value}` : String(value); }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]); }
})();
