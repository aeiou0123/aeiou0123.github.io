(function () {
  const lock = window.YOUTH_VALUES_LOCKED;
  const payloadKey = "youth-values-unlocked-payload-v1";
  const progressKey = "youth-values-progress-v1";
  const radarIds = [
    "path_reversibility", "credential_strategy", "agency", "labor_market_risk",
    "family_control_resistance", "market_trust", "social_insurance",
    "institutional_process", "technology_adoption", "international_openness",
  ];

  const state = {
    data: null,
    stage: null,
    mode: null,
    questions: [],
    index: 0,
    answers: {},
    important: new Set(),
    result: null,
    pairedView: null,
    domainView: null,
  };

  const els = {};
  const ids = [
    "unlockShell", "unlockForm", "passwordInput", "unlockButton", "unlockError", "appShell",
    "lockButton", "stageGrid", "modeBlock", "modeActions", "resumeBanner", "resumeText",
    "resumeButton", "discardProgress", "quizPanel", "resultPanel", "modeLabel", "questionCounter",
    "progressBar", "stagePill", "importantStatus", "questionText", "lowAnchor", "midAnchor",
    "highAnchor", "scaleRow", "importantToggle", "prevQuestion", "skipQuestion", "answeredCount",
    "restartTop", "restartBottom", "resultStage", "resultTitle", "resultSummary", "confidenceText",
    "secondaryTags", "copyResult", "exportPng", "exportJson", "radarCanvas", "radarLegend",
    "pairedTabs", "pairedMap", "userPoint", "mapXAxis", "mapYAxis", "pairLegend",
    "interpretationGrid", "tensionGrid", "domainTabs", "dimensionList", "heatmap",
    "strongestList", "importantList", "stabilityGrid", "sourceList",
  ];

  function init() {
    ids.forEach((id) => { els[id] = document.getElementById(id); });
    els.unlockForm.addEventListener("submit", unlock);
    els.lockButton.addEventListener("click", lockAgain);
    els.prevQuestion.addEventListener("click", goBack);
    els.skipQuestion.addEventListener("click", () => answerQuestion(null));
    els.importantToggle.addEventListener("click", toggleImportant);
    els.restartTop.addEventListener("click", resetToStart);
    els.restartBottom.addEventListener("click", resetToStart);
    els.resumeButton.addEventListener("click", resumeProgress);
    els.discardProgress.addEventListener("click", discardProgress);
    els.copyResult.addEventListener("click", copySummary);
    els.exportPng.addEventListener("click", exportPng);
    els.exportJson.addEventListener("click", exportJson);
    document.addEventListener("keydown", onKeyDown);

    const cached = sessionStorage.getItem(payloadKey);
    if (cached) {
      try {
        setup(JSON.parse(cached));
      } catch (_) {
        sessionStorage.removeItem(payloadKey);
        sessionStorage.removeItem(progressKey);
      }
    }
  }

  async function unlock(event) {
    event.preventDefault();
    els.unlockError.textContent = "";
    els.unlockButton.disabled = true;
    els.unlockButton.textContent = "解锁中";
    try {
      if (!window.crypto?.subtle) throw new Error("WebCrypto unavailable");
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
    const encoder = new TextEncoder();
    const material = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({
      name: "PBKDF2",
      salt: base64ToBytes(lock.salt),
      iterations: lock.iterations,
      hash: "SHA-256",
    }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64ToBytes(lock.iv) }, key, base64ToBytes(lock.payload));
    return JSON.parse(new TextDecoder().decode(plain));
  }

  function base64ToBytes(value) {
    const raw = atob(value);
    return Uint8Array.from(raw, (char) => char.charCodeAt(0));
  }

  function setup(payload) {
    state.data = payload;
    state.pairedView = payload.pairedViews[0].id;
    state.domainView = payload.domains[0].id;
    els.unlockShell.classList.add("is-hidden");
    els.appShell.classList.remove("is-hidden");
    renderStages();
    renderModes();
    renderResumePrompt();
  }

  function lockAgain() {
    sessionStorage.removeItem(payloadKey);
    sessionStorage.removeItem(progressKey);
    state.data = null;
    state.result = null;
    els.appShell.classList.add("is-hidden");
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    els.unlockShell.classList.remove("is-hidden");
    els.passwordInput.focus();
  }

  function renderStages() {
    els.stageGrid.innerHTML = "";
    state.data.stages.forEach((stage) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `stage-card${state.stage?.id === stage.id ? " is-selected" : ""}`;
      button.innerHTML = `<span>${stage.code}</span><strong>${stage.name}</strong><small>${stage.description}</small>`;
      button.addEventListener("click", () => selectStage(stage.id));
      els.stageGrid.appendChild(button);
    });
  }

  function selectStage(stageId) {
    state.stage = state.data.stages.find((stage) => stage.id === stageId);
    renderStages();
    els.modeBlock.classList.remove("is-hidden");
    els.modeBlock.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderModes() {
    els.modeActions.innerHTML = "";
    const descriptions = {
      quick: "六大领域初步轮廓，细分结论保持克制。",
      standard: "核心组合、阶段解读和主要条件敏感性。",
      full: "完整 28 项描述性指数与更稳定的组合画像。",
    };
    Object.values(state.data.modes).forEach((mode) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `mode-card${mode.id === "standard" ? " is-featured" : ""}`;
      button.innerHTML = `<span>${mode.label}</span><strong>${mode.questionCount}</strong><small>${descriptions[mode.id]}</small>`;
      button.addEventListener("click", () => start(mode.id));
      els.modeActions.appendChild(button);
    });
  }

  function start(modeId, restored = null) {
    if (!state.stage) {
      document.getElementById("stage-title").scrollIntoView({ behavior: "smooth" });
      return;
    }
    state.mode = state.data.modes[modeId];
    const byId = new Map(state.data.questions.map((question) => [question.id, question]));
    state.questions = state.mode.questionIds.map((id) => byId.get(id)).filter(Boolean);
    state.index = restored?.index || 0;
    state.answers = restored?.answers || {};
    state.important = new Set(restored?.important || []);
    state.result = null;
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.classList.remove("is-hidden");
    els.resumeBanner.classList.add("is-hidden");
    renderQuestion();
    saveProgress();
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function questionText(question) {
    return question.text.common || question.text[state.stage.id] || Object.values(question.text)[0];
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    const total = state.questions.length;
    const processed = Object.keys(state.answers).length;
    els.modeLabel.textContent = `${state.stage.name} / ${state.mode.label}`;
    els.questionCounter.textContent = `第 ${state.index + 1} 题 / ${total}`;
    els.progressBar.style.width = `${(state.index / total) * 100}%`;
    els.stagePill.textContent = `${state.stage.code} 生活情境`;
    els.questionText.textContent = questionText(question);
    els.lowAnchor.textContent = question.anchors.low;
    els.midAnchor.textContent = question.anchors.mid;
    els.highAnchor.textContent = question.anchors.high;
    els.answeredCount.textContent = `${processed} / ${total}`;
    els.prevQuestion.disabled = state.index === 0;
    const marked = state.important.has(question.id);
    els.importantToggle.setAttribute("aria-pressed", String(marked));
    els.importantToggle.textContent = marked ? "已标记为对我很重要" : "标记为对我很重要";
    els.importantStatus.textContent = marked ? "这道题会进入重要题解读" : "按第一反应回答";
    renderScale(question);
  }

  function renderScale(question) {
    els.scaleRow.innerHTML = "";
    const current = state.answers[question.id]?.value;
    for (let value = 1; value <= 9; value += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `scale-button${current === value ? " is-selected" : ""}`;
      button.textContent = value;
      button.setAttribute("aria-label", `${value} 分`);
      button.addEventListener("click", () => answerQuestion(value));
      els.scaleRow.appendChild(button);
    }
  }

  function answerQuestion(value) {
    const question = state.questions[state.index];
    state.answers[question.id] = { value };
    if (state.index >= state.questions.length - 1) {
      finish();
      return;
    }
    state.index += 1;
    saveProgress();
    renderQuestion();
  }

  function goBack() {
    if (state.index === 0) return;
    state.index -= 1;
    saveProgress();
    renderQuestion();
  }

  function toggleImportant() {
    const id = state.questions[state.index].id;
    if (state.important.has(id)) state.important.delete(id);
    else state.important.add(id);
    saveProgress();
    renderQuestion();
  }

  function onKeyDown(event) {
    if (els.quizPanel.classList.contains("is-hidden")) return;
    if (/^[1-9]$/.test(event.key)) answerQuestion(Number(event.key));
    if (event.key === "ArrowLeft") goBack();
  }

  function saveProgress() {
    if (!state.stage || !state.mode) return;
    sessionStorage.setItem(progressKey, JSON.stringify({
      version: state.data.meta.version,
      stageId: state.stage.id,
      modeId: state.mode.id,
      index: state.index,
      answers: state.answers,
      important: [...state.important],
    }));
  }

  function readProgress() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(progressKey));
      if (!saved || saved.version !== state.data.meta.version) return null;
      return saved;
    } catch (_) {
      return null;
    }
  }

  function renderResumePrompt() {
    const saved = readProgress();
    if (!saved || !Object.keys(saved.answers || {}).length) return;
    const stage = state.data.stages.find((item) => item.id === saved.stageId);
    const mode = state.data.modes[saved.modeId];
    if (!stage || !mode) return;
    els.resumeText.textContent = `${stage.name} · ${mode.label} · 已处理 ${Object.keys(saved.answers).length}/${mode.questionCount} 题`;
    els.resumeBanner.classList.remove("is-hidden");
  }

  function resumeProgress() {
    const saved = readProgress();
    if (!saved) return;
    state.stage = state.data.stages.find((stage) => stage.id === saved.stageId);
    renderStages();
    els.modeBlock.classList.remove("is-hidden");
    start(saved.modeId, saved);
  }

  function discardProgress() {
    sessionStorage.removeItem(progressKey);
    els.resumeBanner.classList.add("is-hidden");
  }

  function resetToStart() {
    sessionStorage.removeItem(progressKey);
    state.mode = null;
    state.questions = [];
    state.answers = {};
    state.important = new Set();
    state.result = null;
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    document.getElementById("start").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function finish() {
    sessionStorage.removeItem(progressKey);
    state.result = calculateResult();
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.remove("is-hidden");
    renderResult();
    els.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function calculateResult() {
    const accum = Object.fromEntries(state.data.constructs.map((construct) => [construct.id, { sum: 0, weight: 0, values: [], answered: 0 }]));
    state.questions.forEach((question) => {
      const value = state.answers[question.id]?.value;
      if (value == null) return;
      const normalized = (value - 5) / 4;
      question.loadings.forEach((loading) => {
        const bucket = accum[loading.construct];
        const adjusted = normalized * loading.polarity;
        bucket.sum += adjusted * loading.weight;
        bucket.weight += loading.weight;
        bucket.values.push(adjusted);
        bucket.answered += 1;
      });
    });

    const scores = {};
    Object.entries(accum).forEach(([id, bucket]) => {
      scores[id] = {
        value: bucket.weight ? Math.round(50 + 50 * (bucket.sum / bucket.weight)) : null,
        answered: bucket.answered,
        spread: standardDeviation(bucket.values),
      };
    });

    const profiles = state.data.profileTypes
      .filter((profile) => profile.conditions.every((condition) => {
        const item = scores[condition.construct];
        return item?.value != null && item.answered > 0 && item.value >= condition.min;
      }))
      .sort((a, b) => b.priority - a.priority);
    const primary = profiles.find((profile) => profile.id !== "mixed") || state.data.profileTypes.find((profile) => profile.id === "mixed");
    const secondary = profiles.filter((profile) => profile.id !== primary.id && profile.id !== "mixed").slice(0, 2);
    return { scores, primary, secondary, stability: calculateStability(accum) };
  }

  function calculateStability(accum) {
    const values = state.questions.map((question) => state.answers[question.id]?.value).filter((value) => value != null);
    const coverage = values.length / state.questions.length;
    const neutral = values.length ? values.filter((value) => value === 5).length / values.length : 1;
    const constructSpreads = Object.values(accum).filter((item) => item.values.length >= 2).map((item) => standardDeviation(item.values));
    const consistency = constructSpreads.length ? clamp(1 - average(constructSpreads) / 0.9, 0, 1) : 0.45;
    const responseSpread = standardDeviation(values.map((value) => (value - 5) / 4));
    const differentiation = clamp(responseSpread / 0.55, 0, 1);
    const score = Math.round(100 * (coverage * 0.55 + consistency * 0.25 + differentiation * 0.2));
    const label = score >= 78 ? "较稳定" : score >= 58 ? "中等" : "探索性";
    return { score, label, coverage, consistency, differentiation, neutral };
  }

  function standardDeviation(values) {
    if (values.length < 2) return 0;
    const mean = average(values);
    return Math.sqrt(average(values.map((value) => (value - mean) ** 2)));
  }

  function average(values) {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function renderResult() {
    const result = state.result;
    els.resultStage.textContent = `${state.stage.name} · ${state.mode.label}`;
    els.resultTitle.textContent = result.primary.name;
    els.resultSummary.textContent = buildSummary(result);
    els.confidenceText.textContent = `结果稳定度：${result.stability.label}（${result.stability.score}/100） · ${state.data.meta.notice}`;
    els.secondaryTags.innerHTML = result.secondary.map((item) => `<span>${item.name}</span>`).join("");
    if (!result.secondary.length) els.secondaryTags.innerHTML = "<span>多维混合</span>";
    drawRadar();
    renderRadarLegend();
    renderPairedTabs();
    renderPairedMap();
    renderInterpretations();
    renderTensions();
    renderDomainTabs();
    renderDimensions();
    renderHeatmap();
    renderInsights();
    renderStability();
    renderSources();
  }

  function eligibleScores(minAnswered = 1) {
    return state.data.constructs
      .map((construct) => ({ construct, ...state.result.scores[construct.id] }))
      .filter((item) => item.value != null && item.answered >= minAnswered);
  }

  function buildSummary(result) {
    const min = state.mode.id === "full" ? 3 : state.mode.id === "standard" ? 2 : 1;
    const ranked = eligibleScores(min).sort((a, b) => Math.abs(b.value - 50) - Math.abs(a.value - 50)).slice(0, 3);
    const phrases = ranked.map((item) => item.value >= 50 ? item.construct.high : item.construct.low);
    const evidence = phrases.length ? `本次最鲜明的组合是：${phrases.join("、")}。` : "本次回答更接近多个方向的中间区域。";
    return `${result.primary.summary}${evidence}`;
  }

  function drawRadar() {
    const canvas = els.radarCanvas;
    const rect = canvas.getBoundingClientRect();
    const size = Math.max(300, Math.min(520, rect.width || 520));
    const ratio = window.devicePixelRatio || 1;
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const center = size / 2;
    const radius = size * 0.34;
    const constructs = radarIds.map((id) => state.data.constructs.find((item) => item.id === id));
    ctx.clearRect(0, 0, size, size);
    for (let ring = 1; ring <= 5; ring += 1) {
      ctx.beginPath();
      constructs.forEach((_, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / constructs.length;
        const r = radius * ring / 5;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle = "rgba(23,24,33,.12)";
      ctx.stroke();
    }
    constructs.forEach((construct, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / constructs.length;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + Math.cos(angle) * radius, center + Math.sin(angle) * radius);
      ctx.strokeStyle = "rgba(23,24,33,.12)";
      ctx.stroke();
      ctx.fillStyle = "#3f4b5e";
      ctx.font = `${size < 400 ? 10 : 12}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(construct.code, center + Math.cos(angle) * radius * 1.15, center + Math.sin(angle) * radius * 1.15);
    });
    ctx.beginPath();
    constructs.forEach((construct, index) => {
      const score = state.result.scores[construct.id]?.value ?? 50;
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / constructs.length;
      const r = radius * score / 100;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;
      if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, 0, size, size);
    fill.addColorStop(0, "rgba(49,95,209,.36)");
    fill.addColorStop(0.5, "rgba(24,169,184,.28)");
    fill.addColorStop(1, "rgba(237,94,104,.32)");
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = "#315fd1";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function renderRadarLegend() {
    els.radarLegend.innerHTML = radarIds.map((id) => {
      const construct = state.data.constructs.find((item) => item.id === id);
      return `<span><b>${construct.code}</b>${construct.name}</span>`;
    }).join("");
  }

  function renderPairedTabs() {
    els.pairedTabs.innerHTML = "";
    state.data.pairedViews.forEach((view) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = view.id === state.pairedView ? "is-active" : "";
      button.textContent = view.name;
      button.addEventListener("click", () => { state.pairedView = view.id; renderPairedTabs(); renderPairedMap(); });
      els.pairedTabs.appendChild(button);
    });
  }

  function renderPairedMap() {
    const view = state.data.pairedViews.find((item) => item.id === state.pairedView);
    const x = state.result.scores[view.x]?.value ?? 50;
    const y = state.result.scores[view.y]?.value ?? 50;
    els.userPoint.style.left = `${clamp(x, 5, 95)}%`;
    els.userPoint.style.bottom = `${clamp(y, 5, 95)}%`;
    els.mapXAxis.textContent = `${view.xLow} ← X → ${view.xHigh}`;
    els.mapYAxis.textContent = `${view.yLow} ← Y → ${view.yHigh}`;
    els.pairLegend.innerHTML = `<span><b>X ${x}</b><br>${view.xLow} / ${view.xHigh}</span><span><b>Y ${y}</b><br>${view.yLow} / ${view.yHigh}</span>`;
  }

  function renderInterpretations() {
    const order = state.data.narratives.stageOrder[state.stage.id];
    els.interpretationGrid.innerHTML = order.slice(0, 4).map((domainId) => {
      const domain = state.data.domains.find((item) => item.id === domainId);
      const candidates = eligibleScores(1).filter((item) => item.construct.domain === domainId).sort((a, b) => Math.abs(b.value - 50) - Math.abs(a.value - 50));
      const first = candidates[0];
      const second = candidates[1];
      const text = first
        ? `你在这一领域更突出的是“${first.value >= 50 ? first.construct.high : first.construct.low}”${second ? `，同时表现出“${second.value >= 50 ? second.construct.high : second.construct.low}”` : ""}。${domain.summary}`
        : `当前模式对这一领域覆盖有限。${domain.summary}`;
      return `<article class="interpretation-card"><h3>${domain.name}</h3><p>${text}</p></article>`;
    }).join("");
  }

  function renderTensions() {
    els.tensionGrid.innerHTML = state.data.pairedViews.map((view) => {
      const x = state.result.scores[view.x]?.value;
      const y = state.result.scores[view.y]?.value;
      const available = x != null && y != null;
      const text = available ? tensionText(view, x, y) : "当前模式对这组组合覆盖不足。";
      return `<article class="tension-card"><h3>${view.name}</h3>${available ? `<div class="dual-meter" style="--left:${Math.max(x, 2)}fr;--right:${Math.max(y, 2)}fr"><span></span><span></span></div>` : ""}<p>${text}</p></article>`;
    }).join("");
  }

  function tensionText(view, x, y) {
    if (x >= 60 && y >= 60) return `两端同时较高：${view.xHigh}，也${view.yHigh}。这是一种组合，不是自相矛盾。`;
    if (x <= 40 && y <= 40) return `两端同时较低：更接近${view.xLow}，也更接近${view.yLow}。`;
    const xPhrase = x >= 50 ? view.xHigh : view.xLow;
    const yPhrase = y >= 50 ? view.yHigh : view.yLow;
    return `目前更接近“${xPhrase} + ${yPhrase}”，两项指数分别为 ${x} 与 ${y}。`;
  }

  function renderDomainTabs() {
    els.domainTabs.innerHTML = "";
    state.data.domains.forEach((domain) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = domain.id === state.domainView ? "is-active" : "";
      button.textContent = domain.name;
      button.addEventListener("click", () => { state.domainView = domain.id; renderDomainTabs(); renderDimensions(); });
      els.domainTabs.appendChild(button);
    });
  }

  function renderDimensions() {
    const min = state.mode.id === "full" ? 3 : state.mode.id === "standard" ? 2 : 2;
    const domain = state.data.domains.find((item) => item.id === state.domainView);
    const rows = state.data.constructs.filter((construct) => construct.domain === state.domainView).map((construct) => ({ construct, score: state.result.scores[construct.id] }));
    els.dimensionList.innerHTML = rows.map(({ construct, score }) => {
      if (score.value == null || score.answered < min) {
        return `<article class="dimension-row"><div><strong>${construct.name}</strong><small>${construct.description}</small></div><div class="score-track"></div><div class="score-value">覆盖不足</div></article>`;
      }
      const label = score.value >= 60 ? construct.high : score.value <= 40 ? construct.low : "中间组合";
      return `<article class="dimension-row"><div><strong>${construct.name}</strong><small>${label} · ${score.answered} 个有效载荷</small></div><div class="score-track"><div class="score-fill" style="--score:${score.value}%;--axis-color:${domain.color}"></div></div><div class="score-value">${score.value}</div></article>`;
    }).join("");
  }

  function renderHeatmap() {
    els.heatmap.innerHTML = state.data.domains.map((domain) => {
      const list = state.questions.filter((question) => question.domain === domain.id);
      const cells = list.map((question) => {
        const value = state.answers[question.id]?.value;
        const color = value == null ? "" : heatColor(value);
        return `<span class="heat-cell${value == null ? " skipped" : ""}" style="${color ? `--heat-color:${color}` : ""}" title="${question.id}: ${value == null ? "跳过" : value}"></span>`;
      }).join("");
      return `<div class="heat-column"><strong>${domain.code} ${domain.name}</strong>${cells}</div>`;
    }).join("");
  }

  function heatColor(value) {
    const palette = ["#d65f66", "#df7d72", "#e89d80", "#efc5a6", "#e8e4d8", "#b9dfc5", "#82cbb0", "#42b4a8", "#218f9f"];
    return palette[value - 1];
  }

  function renderInsights() {
    const answered = state.questions
      .map((question) => ({ question, value: state.answers[question.id]?.value }))
      .filter((item) => item.value != null)
      .sort((a, b) => Math.abs(b.value - 5) - Math.abs(a.value - 5));
    els.strongestList.innerHTML = answered.slice(0, 8).map(({ question, value }) => `<li><strong>${question.id} · ${value}/9</strong><br>${questionText(question)}</li>`).join("") || "<li>没有有效回答。</li>";
    const important = state.questions.filter((question) => state.important.has(question.id));
    els.importantList.innerHTML = important.slice(0, 10).map((question) => `<li><strong>${question.id} · ${state.answers[question.id]?.value ?? "跳过"}/9</strong><br>${questionText(question)}</li>`).join("") || "<li>本次没有标记重要题。</li>";
  }

  function renderStability() {
    const s = state.result.stability;
    const cards = [
      ["题目覆盖", `${Math.round(s.coverage * 100)}%`, "有效回答占当前模式题目的比例。"],
      ["构念内方向", `${Math.round(s.consistency * 100)}%`, "同一构念不同题目方向是否大体一致。"],
      ["回答区分度", `${Math.round(s.differentiation * 100)}%`, "是否使用了足够宽的量表范围。"],
      ["中立比例", `${Math.round(s.neutral * 100)}%`, "选择 5 分的题目比例；较高时解读会更克制。"],
    ];
    els.stabilityGrid.innerHTML = cards.map(([name, value, text]) => `<article class="stability-card"><h3>${name} · ${value}</h3><p>${text}</p></article>`).join("");
  }

  function renderSources() {
    const links = [
      { name: "维度解释", url: "dimensions/" },
      { name: "计分与方法", url: "method/" },
      ...state.data.sources,
    ];
    els.sourceList.innerHTML = links.map((source) => `<a href="${source.url}"${source.url.startsWith("http") ? " target=\"_blank\" rel=\"noreferrer\"" : ""}>${source.name}</a>`).join("");
  }

  function summaryText() {
    const lines = [
      `中国青年社会画像测试：${state.result.primary.name}`,
      `${state.stage.name} · ${state.mode.label} · 稳定度 ${state.result.stability.label}`,
      buildSummary(state.result),
    ];
    const top = eligibleScores(state.mode.id === "full" ? 3 : 1).sort((a, b) => Math.abs(b.value - 50) - Math.abs(a.value - 50)).slice(0, 6);
    lines.push(...top.map((item) => `${item.construct.name}：${item.value}`));
    lines.push("仅供理解个人价值组合与生活策略，不用于诊断、筛选或人生决策。");
    return lines.join("\n");
  }

  async function copySummary() {
    await navigator.clipboard.writeText(summaryText());
    const old = els.copyResult.textContent;
    els.copyResult.textContent = "已复制";
    setTimeout(() => { els.copyResult.textContent = old; }, 1400);
  }

  function exportJson() {
    const payload = {
      test: state.data.meta,
      stage: state.stage,
      mode: state.mode.id,
      profile: { primary: state.result.primary.name, secondary: state.result.secondary.map((item) => item.name) },
      stability: state.result.stability,
      scores: Object.fromEntries(Object.entries(state.result.scores).map(([id, item]) => [id, item.value])),
      answers: Object.fromEntries(state.questions.map((question) => [question.id, state.answers[question.id]?.value ?? null])),
      important: [...state.important],
      exportedAt: new Date().toISOString(),
    };
    downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }), `youth-values-${state.stage.id}-${state.mode.id}.json`);
  }

  function exportPng() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1500;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f7f6f1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#171821";
    ctx.fillRect(0, 0, canvas.width, 24);
    ctx.font = "800 30px sans-serif";
    ctx.fillText("中国青年社会画像测试", 76, 92);
    ctx.fillStyle = "#315fd1";
    ctx.font = "900 64px sans-serif";
    wrapCanvasText(ctx, state.result.primary.name, 76, 190, 1048, 76);
    ctx.fillStyle = "#4b5668";
    ctx.font = "24px sans-serif";
    const summaryEnd = wrapCanvasText(ctx, buildSummary(state.result), 76, 300, 1048, 38);
    ctx.fillStyle = "#171821";
    ctx.font = "800 22px sans-serif";
    ctx.fillText(`${state.stage.name} · ${state.mode.label} · 稳定度 ${state.result.stability.label}`, 76, summaryEnd + 42);
    const top = eligibleScores(state.mode.id === "full" ? 3 : 1).sort((a, b) => Math.abs(b.value - 50) - Math.abs(a.value - 50)).slice(0, 10);
    let y = summaryEnd + 100;
    top.forEach((item) => {
      ctx.fillStyle = "#171821";
      ctx.font = "700 21px sans-serif";
      ctx.fillText(`${item.construct.code}  ${item.construct.name}`, 76, y);
      ctx.fillStyle = "#e4e7e7";
      ctx.fillRect(410, y - 20, 600, 18);
      const gradient = ctx.createLinearGradient(410, 0, 1010, 0);
      gradient.addColorStop(0, "#315fd1");
      gradient.addColorStop(0.55, "#18a9b8");
      gradient.addColorStop(1, "#ed5e68");
      ctx.fillStyle = gradient;
      ctx.fillRect(410, y - 20, 6 * item.value, 18);
      ctx.fillStyle = "#171821";
      ctx.font = "800 22px sans-serif";
      ctx.fillText(String(item.value), 1040, y);
      y += 72;
    });
    ctx.strokeStyle = "rgba(23,24,33,.16)";
    ctx.beginPath(); ctx.moveTo(76, 1310); ctx.lineTo(1124, 1310); ctx.stroke();
    ctx.fillStyle = "#626979";
    ctx.font = "20px sans-serif";
    wrapCanvasText(ctx, "描述性试测：尚未经过代表性样本和心理计量校准。结果不用于诊断、筛选、投票建议或人生决策。所有计算在浏览器本地完成。", 76, 1360, 1048, 32);
    const link = document.createElement("a");
    link.download = `youth-values-${state.stage.id}-${state.mode.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = [...text];
    let line = "";
    let cursor = y;
    chars.forEach((char) => {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, cursor);
        line = char;
        cursor += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) ctx.fillText(line, x, cursor);
    return cursor;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  init();
})();
