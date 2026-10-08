(function () {
  const lock = window.CN_SPECTRUM_LOCKED;
  const payloadKey = "cn-spectrum-unlocked-v1";
  const progressKey = "cn-spectrum-progress-v1";
  const resultKey = "cn-spectrum-result-v1";
  const state = {
    data: null,
    axisById: new Map(),
    mode: null,
    questions: [],
    index: 0,
    answers: {},
    result: null,
    coordinateView: "economy_institutions",
    matchView: "all",
  };
  const els = {};

  function byId(id) { return document.getElementById(id); }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function average(values) { return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0; }

  function init() {
    [
      "unlockShell", "unlockForm", "passwordInput", "unlockButton", "unlockError", "appShell", "lockButton",
      "resumeBanner", "resumeText", "resumeButton", "discardProgress", "quizPanel", "resultPanel", "modeLabel",
      "questionCounter", "progressBar", "axisLabel", "issueLabel", "questionText", "scaleRow", "importantToggle",
      "prevQuestion", "skipQuestion", "answeredCount", "restartTop", "restartBottom", "resultTitle", "resultSummary",
      "confidenceText", "tagList", "copyResult", "exportPng", "radarCanvas", "axisLegend", "coordinateTabs",
      "coordinateMap", "mapXAxis", "mapYAxis", "mapLegend", "interpretationGrid", "dimensionList", "matchViewTabs",
      "matchList", "parallelCanvas", "parallelLegend", "heatmap", "strongestList", "uncertaintyList",
    ].forEach((id) => { els[id] = byId(id); });

    els.unlockForm.addEventListener("submit", onUnlock);
    els.lockButton.addEventListener("click", lockAgain);
    els.prevQuestion.addEventListener("click", goBack);
    els.skipQuestion.addEventListener("click", () => answerQuestion(null));
    els.importantToggle.addEventListener("click", toggleImportant);
    els.restartTop.addEventListener("click", reset);
    els.restartBottom.addEventListener("click", reset);
    els.resumeButton.addEventListener("click", resumeProgress);
    els.discardProgress.addEventListener("click", discardProgress);
    els.copyResult.addEventListener("click", copySummary);
    els.exportPng.addEventListener("click", exportPng);
    document.querySelectorAll("[data-start-mode]").forEach((button) => button.addEventListener("click", () => start(button.dataset.startMode)));

    const cached = sessionStorage.getItem(payloadKey);
    if (cached) {
      try { setup(JSON.parse(cached)); } catch (_) { sessionStorage.removeItem(payloadKey); }
    }
  }

  async function onUnlock(event) {
    event.preventDefault();
    els.unlockError.textContent = "";
    els.unlockButton.disabled = true;
    els.unlockButton.textContent = "解锁中";
    try {
      if (!crypto?.subtle) throw new Error("WebCrypto unavailable");
      const payload = await decryptPayload(els.passwordInput.value);
      sessionStorage.setItem(payloadKey, JSON.stringify(payload));
      setup(payload);
      els.passwordInput.value = "";
    } catch (_) {
      els.unlockError.textContent = "密码不正确，或加密数据无法解锁。";
    } finally {
      els.unlockButton.disabled = false;
      els.unlockButton.textContent = "解锁";
    }
  }

  async function decryptPayload(password) {
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: bytes(lock.salt), iterations: lock.iterations, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(lock.iv) }, key, bytes(lock.payload));
    return JSON.parse(new TextDecoder().decode(plain));
  }

  function bytes(value) {
    const raw = atob(value);
    return Uint8Array.from(raw, (character) => character.charCodeAt(0));
  }

  function setup(payload) {
    state.data = payload;
    state.axisById = new Map(payload.axes.map((axis) => [axis.id, axis]));
    els.unlockShell.classList.add("is-hidden");
    els.appShell.classList.remove("is-hidden");
    updateResumeBanner();
  }

  function lockAgain() {
    sessionStorage.removeItem(payloadKey);
    sessionStorage.removeItem(progressKey);
    sessionStorage.removeItem(resultKey);
    state.data = null;
    state.answers = {};
    state.result = null;
    els.appShell.classList.add("is-hidden");
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    els.unlockShell.classList.remove("is-hidden");
    els.passwordInput.focus();
  }

  function start(modeId) {
    const mode = state.data.modes.find((item) => item.id === modeId) || state.data.modes[1];
    const questionById = new Map(state.data.questions.map((question) => [question.id, question]));
    state.mode = mode;
    state.questions = mode.questionIds.map((id) => questionById.get(id)).filter(Boolean);
    state.index = 0;
    state.answers = {};
    state.result = null;
    state.coordinateView = state.data.coordinateViews[0].id;
    state.matchView = "all";
    els.resumeBanner.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.classList.remove("is-hidden");
    persistProgress();
    renderQuestion();
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    const axis = state.axisById.get(question.axis);
    const answered = Object.values(state.answers).filter((answer) => answer && answer.value !== undefined).length;
    els.modeLabel.textContent = state.mode.label;
    els.questionCounter.textContent = `第 ${state.index + 1} 题 / ${state.questions.length}`;
    els.progressBar.style.width = `${(answered / state.questions.length) * 100}%`;
    els.axisLabel.textContent = `${axis.short} ${axis.name}`;
    els.axisLabel.style.setProperty("--axis-color", axis.color);
    els.questionText.style.setProperty("--axis-color", axis.color);
    els.questionText.textContent = question.textZh;
    els.issueLabel.textContent = question.tags.join(" / ");
    els.answeredCount.textContent = `${answered} / ${state.questions.length}`;
    els.prevQuestion.disabled = state.index === 0;
    updateImportant(question);
    els.scaleRow.replaceChildren(...Array.from({ length: 9 }, (_, index) => {
      const value = index + 1;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "scale-button";
      button.style.setProperty("--axis-color", axis.color);
      if (state.answers[question.id]?.value === value) button.classList.add("is-active");
      button.textContent = String(value);
      button.setAttribute("aria-label", `选择 ${value}`);
      button.addEventListener("click", () => answerQuestion(value));
      return button;
    }));
  }

  function answerQuestion(value) {
    const question = state.questions[state.index];
    state.answers[question.id] = { ...(state.answers[question.id] || {}), value };
    if (state.index >= state.questions.length - 1) {
      showResult();
      return;
    }
    state.index += 1;
    persistProgress();
    renderQuestion();
  }

  function goBack() {
    if (state.index === 0) return;
    state.index -= 1;
    persistProgress();
    renderQuestion();
  }

  function toggleImportant() {
    const question = state.questions[state.index];
    const current = state.answers[question.id] || {};
    state.answers[question.id] = { ...current, important: !current.important };
    persistProgress();
    updateImportant(question);
  }

  function updateImportant(question) {
    const active = Boolean(state.answers[question.id]?.important);
    els.importantToggle.classList.toggle("is-active", active);
    els.importantToggle.setAttribute("aria-pressed", String(active));
    els.importantToggle.textContent = active ? "已标记为重要题" : "标记为重要题";
  }

  function persistProgress() {
    if (!state.mode) return;
    sessionStorage.setItem(progressKey, JSON.stringify({ modeId: state.mode.id, index: state.index, answers: state.answers, savedAt: Date.now() }));
  }

  function updateResumeBanner() {
    const raw = sessionStorage.getItem(progressKey);
    if (!raw) return els.resumeBanner.classList.add("is-hidden");
    try {
      const saved = JSON.parse(raw);
      const mode = state.data.modes.find((item) => item.id === saved.modeId);
      if (!mode) throw new Error("invalid mode");
      const answered = Object.values(saved.answers || {}).filter((answer) => answer && answer.value !== undefined).length;
      els.resumeText.textContent = `${mode.label} · 已处理 ${answered}/${mode.questionCount} 题`;
      els.resumeBanner.classList.remove("is-hidden");
    } catch (_) {
      sessionStorage.removeItem(progressKey);
      els.resumeBanner.classList.add("is-hidden");
    }
  }

  function resumeProgress() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(progressKey));
      const mode = state.data.modes.find((item) => item.id === saved.modeId);
      const questionById = new Map(state.data.questions.map((question) => [question.id, question]));
      state.mode = mode;
      state.questions = mode.questionIds.map((id) => questionById.get(id)).filter(Boolean);
      state.index = clamp(saved.index || 0, 0, state.questions.length - 1);
      state.answers = saved.answers || {};
      els.resumeBanner.classList.add("is-hidden");
      els.quizPanel.classList.remove("is-hidden");
      renderQuestion();
      els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (_) { discardProgress(); }
  }

  function discardProgress() {
    sessionStorage.removeItem(progressKey);
    els.resumeBanner.classList.add("is-hidden");
  }

  function reset() {
    sessionStorage.removeItem(progressKey);
    sessionStorage.removeItem(resultKey);
    state.mode = null;
    state.questions = [];
    state.index = 0;
    state.answers = {};
    state.result = null;
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    els.resumeBanner.classList.add("is-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showResult() {
    state.result = calculateResult();
    state.result.matches = buildMatches(state.result.scores, state.matchView);
    state.result.signals = buildSignals(state.result.scores);
    sessionStorage.removeItem(progressKey);
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.remove("is-hidden");
    renderResult();
    persistResult();
    els.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function calculateResult() {
    const scores = {};
    const axisStats = {};
    state.data.axes.forEach((axis) => {
      const questions = state.questions.filter((question) => question.axis === axis.id);
      const values = questions.map((question) => {
        const answer = state.answers[question.id];
        if (!answer || answer.value === null || answer.value === undefined) return null;
        return ((answer.value - 5) / 4) * question.polarity;
      }).filter((value) => value !== null);
      const mean = values.length ? average(values) : 0;
      const coverage = values.length / Math.max(questions.length, 1);
      const consistency = values.length > 1 ? clamp(1 - average(values.map((value) => Math.abs(value - mean))) / 1.5, 0, 1) : 0.45;
      const unique = new Set(values.map((value) => value.toFixed(2))).size;
      const diversity = values.length ? clamp(unique / Math.min(5, values.length), 0.35, 1) : 0;
      scores[axis.id] = Math.round(mean * 100);
      axisStats[axis.id] = {
        answered: values.length,
        total: questions.length,
        skipped: questions.length - values.length,
        consistency: Math.round(consistency * 100),
        stability: Math.round(clamp(coverage * 72 + consistency * 20 + diversity * 8, 0, 100)),
      };
    });
    const overallStability = Math.round(average(Object.values(axisStats).map((stats) => stats.stability)));
    const labels = rankLabels(scores);
    return { scores, axisStats, overallStability, label: labels[0], secondaryLabels: labels.slice(1, 3), matches: [], signals: [] };
  }

  function rankLabels(scores) {
    const ranked = state.data.resultLabels.filter((label) => label.rules.length).map((label) => ({
      ...label,
      fit: average(label.rules.map((rule) => ruleFit(scores[rule.axis], rule))),
    })).sort((a, b) => b.fit - a.fit);
    const fallback = state.data.resultLabels.find((label) => label.id === "mixed");
    return ranked[0]?.fit >= 0.82 ? ranked : [fallback, ...ranked];
  }

  function ruleFit(value, rule) {
    if (typeof rule.min === "number") return clamp(1 - Math.max(0, rule.min - value) / 90, 0, 1);
    if (typeof rule.max === "number") return clamp(1 - Math.max(0, value - rule.max) / 90, 0, 1);
    return 1;
  }

  function buildMatches(scores, viewId) {
    const view = state.data.matchViews.find((item) => item.id === viewId) || state.data.matchViews[0];
    const maxDistance = Math.sqrt(view.axes.length * 200 ** 2);
    return state.data.profiles.map((profile) => {
      const diffs = view.axes.map((axisId) => ({ axis: state.axisById.get(axisId), diff: Math.abs(scores[axisId] - profile.scores[axisId]) }));
      const distance = Math.sqrt(diffs.reduce((sum, item) => sum + item.diff ** 2, 0));
      return {
        profile,
        similarity: Math.round(clamp(100 - (distance / maxDistance) * 100, 0, 100)),
        closest: [...diffs].sort((a, b) => a.diff - b.diff).slice(0, 2),
        largest: [...diffs].sort((a, b) => b.diff - a.diff).slice(0, 2),
      };
    }).sort((a, b) => b.similarity - a.similarity);
  }

  function buildSignals(scores) {
    return state.questions.map((question) => {
      const answer = state.answers[question.id];
      if (!answer || answer.value === null || answer.value === undefined) return null;
      const adjusted = ((answer.value - 5) / 4) * question.polarity;
      const axisQuestions = state.questions.filter((item) => item.axis === question.axis && state.answers[item.id]?.value != null).length;
      const estimatedShift = axisQuestions ? Math.round(Math.abs(adjusted) * 100 / axisQuestions) : 0;
      const axis = state.axisById.get(question.axis);
      return { question, answer, adjusted, estimatedShift, axis, direction: adjusted >= 0 ? axis.positiveLabel : axis.negativeLabel, important: Boolean(answer.important) };
    }).filter(Boolean).sort((a, b) => Number(b.important) - Number(a.important) || b.estimatedShift - a.estimatedShift || Math.abs(b.adjusted) - Math.abs(a.adjusted));
  }

  function renderResult() {
    const result = state.result;
    els.resultTitle.textContent = result.label.name;
    els.resultSummary.textContent = `${result.label.summary} ${summarySentence(result.scores)}`;
    els.confidenceText.textContent = `结果稳定度 ${result.overallStability}/100 · ${state.mode.label} · 坐标为首版启发式估计`;
    els.tagList.replaceChildren(...[...result.label.tags, ...result.secondaryLabels.map((label) => label.name)].slice(0, 4).map((text) => {
      const li = document.createElement("li"); li.textContent = text; return li;
    }));
    renderRadar();
    renderAxisLegend();
    renderCoordinateTabs();
    renderCoordinateMap();
    renderInterpretation();
    renderDimensions();
    renderMatchTabs();
    renderMatches();
    renderParallel();
    renderHeatmap();
    renderSignals();
    renderUncertainty();
  }

  function summarySentence(scores) {
    const strongest = state.data.axes.map((axis) => ({ axis, value: scores[axis.id], magnitude: Math.abs(scores[axis.id]) })).sort((a, b) => b.magnitude - a.magnitude).slice(0, 2);
    return `最鲜明的两个方向是${strongest.map((item) => `${item.axis.name}偏${item.value >= 0 ? item.axis.positiveLabel : item.axis.negativeLabel}`).join("，")}。`;
  }

  function renderRadar() {
    const canvas = els.radarCanvas;
    const size = Math.min(canvas.clientWidth || 480, 520);
    const dpr = devicePixelRatio || 1;
    canvas.width = size * dpr; canvas.height = size * dpr; canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, size, size);
    const axes = state.data.axes; const cx = size / 2; const cy = size / 2; const radius = size * .34;
    ctx.strokeStyle = "rgba(23,32,43,.15)"; ctx.lineWidth = 1;
    [.25, .5, .75, 1].forEach((step) => {
      ctx.beginPath(); axes.forEach((_, index) => { const angle = -Math.PI / 2 + index / axes.length * Math.PI * 2; const x = cx + Math.cos(angle) * radius * step; const y = cy + Math.sin(angle) * radius * step; index ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.stroke();
    });
    axes.forEach((axis, index) => {
      const angle = -Math.PI / 2 + index / axes.length * Math.PI * 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius); ctx.stroke();
      ctx.fillStyle = axis.color; ctx.font = `${size < 410 ? 9 : 11}px Microsoft YaHei, sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(axis.short, cx + Math.cos(angle) * (radius + 23), cy + Math.sin(angle) * (radius + 23));
    });
    ctx.beginPath(); axes.forEach((axis, index) => { const angle = -Math.PI / 2 + index / axes.length * Math.PI * 2; const value = (state.result.scores[axis.id] + 100) / 200; const x = cx + Math.cos(angle) * radius * value; const y = cy + Math.sin(angle) * radius * value; index ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fillStyle = "rgba(35,103,201,.18)"; ctx.strokeStyle = "#2367c9"; ctx.lineWidth = 2.5; ctx.fill(); ctx.stroke();
  }

  function renderAxisLegend() {
    els.axisLegend.replaceChildren(...state.data.axes.map((axis) => { const span = document.createElement("span"); span.style.setProperty("--axis-color", axis.color); span.textContent = `${axis.short} ${axis.name}`; return span; }));
  }

  function renderCoordinateTabs() {
    els.coordinateTabs.replaceChildren(...state.data.coordinateViews.map((view) => tab(view.label, view.id === state.coordinateView, () => { state.coordinateView = view.id; renderCoordinateTabs(); renderCoordinateMap(); })));
  }

  function tab(label, active, onClick) {
    const button = document.createElement("button"); button.type = "button"; button.className = `tab-button${active ? " is-active" : ""}`; button.textContent = label; button.addEventListener("click", onClick); return button;
  }

  function renderCoordinateMap() {
    const view = state.data.coordinateViews.find((item) => item.id === state.coordinateView) || state.data.coordinateViews[0];
    els.mapXAxis.textContent = view.xLabel; els.mapYAxis.textContent = view.yLabel;
    els.coordinateMap.querySelectorAll(".map-dot").forEach((dot) => dot.remove()); els.mapLegend.replaceChildren();
    state.result.matches.slice(0, 12).forEach((match, index) => {
      addDot(match.profile.scores[view.xAxis], match.profile.scores[view.yAxis], String(index + 1), profileColor(index), false, match.profile.uncertainty, match.profile.name);
      const item = document.createElement("div"); item.className = "legend-item"; item.innerHTML = `<i style="--dot-color:${profileColor(index)}">${index + 1}</i><span>${escapeHtml(match.profile.name)} · ${match.similarity}</span>`; item.title = `${match.profile.name}，相似度 ${match.similarity}/100，参照置信度 ${match.profile.confidence}/100`; els.mapLegend.append(item);
    });
    addDot(state.result.scores[view.xAxis], state.result.scores[view.yAxis], "你", "#df6158", true, 0, "你的坐标");
  }

  function addDot(x, y, label, color, user, uncertainty, title) {
    const dot = document.createElement("span"); dot.className = `map-dot${user ? " user" : ""}`; dot.style.left = `${clamp((x + 100) / 2, 2, 98)}%`; dot.style.bottom = `${clamp((y + 100) / 2, 2, 98)}%`; dot.style.setProperty("--dot-color", color); if (uncertainty) dot.style.boxShadow = `0 0 0 ${Math.min(16, 3 + uncertainty / 3)}px rgba(23,32,43,.07)`; dot.textContent = label; dot.title = title; els.coordinateMap.append(dot);
  }

  function profileColor(index) { return ["#2367c9", "#168f8a", "#d99a22", "#df6158", "#5f9e48", "#4d70a8", "#a64f77", "#267b96", "#8b6730", "#536270", "#9f4f43", "#4d8b65"][index % 12]; }

  function renderInterpretation() {
    const scores = state.result.scores;
    const cards = [
      ["经济与福利", describePair(scores.A, scores.B, ["偏向国家主导和产业政策", "偏向市场竞争和民营活力"], ["偏向效率和财政克制", "偏向福利、劳动保护和再分配"])],
      ["制度与秩序", describePair(scores.C, scores.D, ["更信任集中执行", "更重视参与、监督和程序"], ["更重视自由与隐私", "更强调安全、秩序和风险控制"])],
      ["国家与文化", describePair(scores.E, scores.F, ["更重视国际合作和开放身份", "更强调主权、战略自主和民族共同体"], ["文化上偏传统与共同规范", "文化上偏个人选择和多元开放"])],
      ["治理与生态", describePair(scores.G, scores.H, ["更重视基层经验和协商", "更偏专家、数据和技术治理"], ["发展上偏增长、工业和能源成本", "发展上偏生态、城市生活质量和公正转型"])],
    ];
    els.interpretationGrid.replaceChildren(...cards.map(([title, text], index) => { const article = document.createElement("article"); article.className = "interpretation-card"; article.style.setProperty("--accent", ["#2367c9", "#168f8a", "#d66b91", "#65a448"][index]); const h3 = document.createElement("h3"); h3.textContent = title; const p = document.createElement("p"); p.textContent = text; article.append(h3, p); return article; }));
  }

  function describePair(first, second, firstWords, secondWords) {
    const band = (value, words) => Math.abs(value) < 25 ? `在“${words[0]} / ${words[1]}”之间保持混合` : value > 0 ? words[1] : words[0];
    return `${band(first, firstWords)}；${band(second, secondWords)}。这些维度彼此独立，不必组合成传统左右标签。`;
  }

  function renderDimensions() {
    els.dimensionList.replaceChildren(...state.data.axes.map((axis) => {
      const value = state.result.scores[axis.id]; const stats = state.result.axisStats[axis.id]; const row = document.createElement("article"); row.className = "dimension-row";
      const label = document.createElement("div"); label.innerHTML = `<strong>${axis.short} ${escapeHtml(axis.name)}</strong><small>${escapeHtml(axis.negativeLabel)} ←→ ${escapeHtml(axis.positiveLabel)} · 稳定度 ${stats.stability}/100 · ${stats.answered}/${stats.total}</small>`;
      const track = document.createElement("div"); track.className = "score-track"; const marker = document.createElement("span"); marker.className = "score-marker"; marker.style.setProperty("--position", `${(value + 100) / 2}%`); marker.style.setProperty("--axis-color", axis.color); track.append(marker);
      const score = document.createElement("span"); score.className = "score-value"; score.textContent = value > 0 ? `+${value}` : String(value); row.append(label, track, score); return row;
    }));
  }

  function renderMatchTabs() {
    els.matchViewTabs.replaceChildren(...state.data.matchViews.map((view) => tab(view.label, view.id === state.matchView, () => { state.matchView = view.id; state.result.matches = buildMatches(state.result.scores, state.matchView); renderMatchTabs(); renderMatches(); renderCoordinateMap(); renderParallel(); persistResult(); })));
  }

  function renderMatches() {
    els.matchList.replaceChildren(...state.result.matches.map((match) => {
      const card = document.createElement("article"); card.className = "match-card";
      card.innerHTML = `<div class="match-head"><h3>${escapeHtml(match.profile.name)}</h3><span class="match-score">${match.similarity}</span></div><p>${escapeHtml(match.profile.note)}</p><div class="match-bar"><span style="--match:${match.similarity}%"></span></div><div class="match-meta">接近：${match.closest.map((item) => item.axis.name).join("、")} · 差距：${match.largest.map((item) => item.axis.name).join("、")} · 置信 ${match.profile.confidence}/100 · 不确定性 ±${match.profile.uncertainty}</div>`;
      return card;
    }));
  }

  function renderParallel() {
    const canvas = els.parallelCanvas; const width = Math.max(640, canvas.clientWidth || 720); const height = Math.round(width * .5); const dpr = devicePixelRatio || 1; canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
    const pad = { left: 34, right: 30, top: 30, bottom: 48 }; const axes = state.data.axes; const xStep = (width - pad.left - pad.right) / (axes.length - 1);
    ctx.font = `${width < 700 ? 9 : 11}px Microsoft YaHei, sans-serif`; ctx.textAlign = "center";
    axes.forEach((axis, index) => { const x = pad.left + index * xStep; ctx.strokeStyle = "rgba(23,32,43,.18)"; ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, height - pad.bottom); ctx.stroke(); ctx.fillStyle = axis.color; ctx.fillText(axis.short, x, height - 20); });
    const lines = [{ name: "你", scores: state.result.scores, color: "#df6158", width: 3 }, ...state.result.matches.slice(0, 3).map((match, index) => ({ name: match.profile.name, scores: match.profile.scores, color: profileColor(index), width: 1.5 }))];
    lines.forEach((line) => { ctx.beginPath(); axes.forEach((axis, index) => { const x = pad.left + index * xStep; const y = pad.top + (100 - line.scores[axis.id]) / 200 * (height - pad.top - pad.bottom); index ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.strokeStyle = line.color; ctx.lineWidth = line.width; ctx.globalAlpha = line.name === "你" ? 1 : .78; ctx.stroke(); }); ctx.globalAlpha = 1;
    els.parallelLegend.replaceChildren(...lines.map((line) => { const span = document.createElement("span"); span.innerHTML = `<i style="--legend-color:${line.color}"></i>${escapeHtml(line.name)}`; return span; }));
  }

  function renderHeatmap() {
    els.heatmap.replaceChildren(...state.questions.map((question) => {
      const answer = state.answers[question.id]; const cell = document.createElement("span"); cell.className = `heat-cell${answer?.important ? " important" : ""}`;
      if (!answer || answer.value === null || answer.value === undefined) cell.style.setProperty("--heat-color", "#d8dee4");
      else { const adjusted = ((answer.value - 5) / 4) * question.polarity; const hue = adjusted >= 0 ? 12 : 214; const light = 92 - Math.abs(adjusted) * 46; cell.style.setProperty("--heat-color", `hsl(${hue} 67% ${light}%)`); }
      cell.title = `${question.id} · ${answer?.value == null ? "跳过" : `回答 ${answer.value}`}`; return cell;
    }));
  }

  function renderSignals() {
    els.strongestList.replaceChildren(...state.result.signals.slice(0, 10).map((signal) => { const li = document.createElement("li"); li.textContent = `${signal.important ? "重要题 · " : ""}${signal.question.id} 回答 ${signal.answer.value}，推动${signal.axis.name}向“${signal.direction}”，单题影响约 ${signal.estimatedShift} 分。`; li.title = signal.question.textZh; return li; }));
  }

  function renderUncertainty() {
    const low = state.data.axes.map((axis) => ({ axis, stats: state.result.axisStats[axis.id] })).filter((item) => item.stats.stability < 62).sort((a, b) => a.stats.stability - b.stats.stability);
    const items = low.length ? low : state.data.axes.map((axis) => ({ axis, stats: state.result.axisStats[axis.id] })).sort((a, b) => a.stats.stability - b.stats.stability).slice(0, 2);
    els.uncertaintyList.replaceChildren(...items.map(({ axis, stats }) => { const card = document.createElement("div"); card.className = "uncertainty-card"; card.style.setProperty("--axis-color", axis.color); card.innerHTML = `<strong>${axis.short} ${escapeHtml(axis.name)} · ${stats.stability}/100</strong><br><span>${stats.skipped ? `跳过 ${stats.skipped} 题；` : ""}同维回答一致性 ${stats.consistency}/100。建议把它理解为暂时位置。</span>`; return card; }));
  }

  function persistResult() {
    if (!state.result) return;
    sessionStorage.setItem(resultKey, JSON.stringify({ version: state.data.meta.version, mode: state.mode.id, savedAt: new Date().toISOString(), answers: state.answers, scores: state.result.scores, axisStats: state.result.axisStats, overallStability: state.result.overallStability, label: state.result.label.name, secondaryLabels: state.result.secondaryLabels.map((label) => label.name), matchView: state.matchView, matches: state.result.matches.slice(0, 12).map((match) => ({ id: match.profile.id, name: match.profile.name, similarity: match.similarity })) }));
  }

  async function copySummary() {
    const lines = [`中国大陆政治光谱测试：${state.result.label.name}`, state.result.label.summary, `稳定度：${state.result.overallStability}/100`, ...state.data.axes.map((axis) => `${axis.short} ${axis.name}：${state.result.scores[axis.id] > 0 ? "+" : ""}${state.result.scores[axis.id]}`), `接近参照：${state.result.matches.slice(0, 3).map((match) => `${match.profile.name} ${match.similarity}`).join("；")}`, "仅供政治社会学理解，不构成现实政治或组织加入建议。"];
    try { await navigator.clipboard.writeText(lines.join("\n")); els.copyResult.textContent = "已复制"; setTimeout(() => { els.copyResult.textContent = "复制摘要"; }, 1600); } catch (_) { els.copyResult.textContent = "复制失败"; }
  }

  function exportPng() {
    const canvas = document.createElement("canvas"); canvas.width = 1200; canvas.height = 1500; const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f6f8fa"; ctx.fillRect(0, 0, 1200, 1500); ctx.fillStyle = "#17202b"; ctx.fillRect(0, 0, 1200, 220);
    ctx.fillStyle = "#ffffff"; ctx.font = "700 38px Microsoft YaHei"; ctx.fillText("中国大陆政治光谱测试", 76, 78); ctx.font = "800 66px Microsoft YaHei"; ctx.fillText(state.result.label.name, 76, 160);
    ctx.fillStyle = "#536270"; ctx.font = "24px Microsoft YaHei"; wrapText(ctx, state.result.label.summary, 76, 280, 1048, 38);
    let y = 390; state.data.axes.forEach((axis) => { const value = state.result.scores[axis.id]; ctx.fillStyle = "#17202b"; ctx.font = "700 22px Microsoft YaHei"; ctx.fillText(`${axis.short} ${axis.name}`, 76, y); ctx.textAlign = "right"; ctx.fillText(`${value > 0 ? "+" : ""}${value}`, 1124, y); ctx.textAlign = "left"; ctx.fillStyle = "#dfe4e9"; ctx.fillRect(290, y - 19, 760, 18); ctx.fillStyle = axis.color; const position = 290 + (value + 100) / 200 * 760; ctx.fillRect(position - 4, y - 24, 8, 28); y += 74; });
    y += 14; ctx.fillStyle = "#17202b"; ctx.font = "800 28px Microsoft YaHei"; ctx.fillText("接近的三个参照类型", 76, y); y += 58; state.result.matches.slice(0, 3).forEach((match, index) => { ctx.fillStyle = profileColor(index); ctx.fillRect(76, y - 24, 30, 30); ctx.fillStyle = "#17202b"; ctx.font = "700 24px Microsoft YaHei"; ctx.fillText(`${index + 1}. ${match.profile.name}`, 130, y); ctx.textAlign = "right"; ctx.fillText(`${match.similarity}/100`, 1124, y); ctx.textAlign = "left"; y += 54; });
    ctx.fillStyle = "#637181"; ctx.font = "20px Microsoft YaHei"; ctx.fillText(`结果稳定度 ${state.result.overallStability}/100 · ${state.mode.label} · ${new Date().toLocaleDateString("zh-CN")}`, 76, 1360); ctx.fillText("参照坐标为启发式估计。仅供政治社会学理解，不构成现实政治或组织加入建议。", 76, 1410);
    const link = document.createElement("a"); link.download = "cn-spectrum-result.png"; link.href = canvas.toDataURL("image/png"); link.click();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let line = ""; for (const char of text) { const test = line + char; if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line, x, y); line = char; y += lineHeight; } else line = test; } if (line) ctx.fillText(line, x, y);
  }

  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]); }

  init();
})();
