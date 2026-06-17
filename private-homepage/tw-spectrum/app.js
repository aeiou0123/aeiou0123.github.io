(function () {
  const lock = window.TW_SPECTRUM_LOCKED;
  const storageKey = "tw-spectrum-unlocked-payload-v2";

  const state = {
    data: null,
    axisById: new Map(),
    mode: null,
    questions: [],
    index: 0,
    answers: {},
    result: null,
    coordView: null,
    matchView: "all",
  };

  const els = {};

  function query(id) {
    return document.getElementById(id);
  }

  function init() {
    [
      "unlockShell", "unlockForm", "passwordInput", "unlockButton", "unlockError", "appShell",
      "lockButton", "quizPanel", "resultPanel", "modeLabel", "questionCounter", "progressBar",
      "axisLabel", "issueLabel", "questionText", "scaleRow", "prevQuestion", "skipQuestion",
      "answeredCount", "restartTop", "restartBottom", "resultTitle", "resultSummary",
      "confidenceText", "copyResult", "exportPng", "tagList", "radarCanvas", "coordinateTabs",
      "coordinateMap", "mapXAxis", "mapYAxis", "interpretationGrid", "dimensionList",
      "matchViewTabs", "matchList", "heatmap", "strongestList", "sourceList",
    ].forEach((id) => {
      els[id] = query(id);
    });

    els.unlockForm.addEventListener("submit", onUnlock);
    els.lockButton.addEventListener("click", lockAgain);
    els.prevQuestion.addEventListener("click", goBack);
    els.skipQuestion.addEventListener("click", () => answerQuestion(null));
    els.restartTop.addEventListener("click", reset);
    els.restartBottom.addEventListener("click", reset);
    els.copyResult.addEventListener("click", copySummary);
    els.exportPng.addEventListener("click", exportPng);

    document.querySelectorAll("[data-start-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.startMode));
    });

    const cached = sessionStorage.getItem(storageKey);
    if (cached) {
      try {
        setup(JSON.parse(cached));
      } catch (_) {
        sessionStorage.removeItem(storageKey);
      }
    }
  }

  async function onUnlock(event) {
    event.preventDefault();
    els.unlockError.textContent = "";
    els.unlockButton.disabled = true;
    els.unlockButton.textContent = "解锁中";

    try {
      if (!window.crypto || !window.crypto.subtle) {
        throw new Error("当前浏览器不支持 WebCrypto。");
      }
      const password = els.passwordInput.value;
      const payload = await decryptPayload(password);
      sessionStorage.setItem(storageKey, JSON.stringify(payload));
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
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"],
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: base64ToBytes(lock.salt),
        iterations: lock.iterations,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    );
    const plainBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: base64ToBytes(lock.iv) },
      key,
      base64ToBytes(lock.payload),
    );
    return JSON.parse(new TextDecoder().decode(plainBuffer));
  }

  function base64ToBytes(value) {
    const raw = atob(value);
    const bytes = new Uint8Array(raw.length);
    for (let index = 0; index < raw.length; index += 1) {
      bytes[index] = raw.charCodeAt(index);
    }
    return bytes;
  }

  function setup(payload) {
    state.data = payload;
    state.axisById = new Map(payload.axes.map((axis) => [axis.id, axis]));
    state.coordView = payload.coordinateViews[0].id;
    els.unlockShell.classList.add("is-hidden");
    els.appShell.classList.remove("is-hidden");
    renderSources();
  }

  function lockAgain() {
    sessionStorage.removeItem(storageKey);
    state.data = null;
    state.result = null;
    els.appShell.classList.add("is-hidden");
    els.unlockShell.classList.remove("is-hidden");
    els.passwordInput.focus();
  }

  function start(modeKey) {
    const data = state.data;
    state.mode = data.modes[modeKey] || data.modes.standard;
    state.questions = selectQuestions(state.mode.perAxis);
    state.index = 0;
    state.answers = {};
    state.result = null;
    state.matchView = "all";
    state.coordView = data.coordinateViews[0].id;
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.classList.remove("is-hidden");
    renderQuestion();
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectQuestions(perAxis) {
    const picks = perAxis === 5
      ? [0, 5, 8, 13, 16]
      : perAxis === 10
        ? [0, 1, 4, 5, 8, 9, 12, 13, 16, 17]
        : Array.from({ length: 20 }, (_, index) => index);

    return state.data.axes.flatMap((axis) => {
      const list = state.data.questions.filter((question) => question.axis === axis.id);
      return picks.map((index) => list[index]).filter(Boolean);
    });
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    const axis = state.axisById.get(question.axis);
    const total = state.questions.length;
    const done = Object.values(state.answers).filter((answer) => answer.value !== null).length;

    els.modeLabel.textContent = `${state.mode.label} / ${state.mode.description}`;
    els.questionCounter.textContent = `第 ${state.index + 1} 题 / ${total}`;
    els.progressBar.style.width = `${(state.index / total) * 100}%`;
    els.axisLabel.textContent = `${axis.id} ${axis.name}`;
    els.axisLabel.style.setProperty("--axis-color", axis.color);
    els.issueLabel.textContent = question.subdomain;
    els.questionText.textContent = question.textZh;
    els.answeredCount.textContent = `${done} / ${total}`;
    els.prevQuestion.disabled = state.index === 0;

    const current = state.answers[question.id]?.value;
    els.scaleRow.replaceChildren(
      ...state.data.scale.map((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scale-button";
        if (current === option.value) button.classList.add("is-active");
        button.textContent = option.value;
        button.title = option.label;
        button.addEventListener("click", () => answerQuestion(option.value));
        return button;
      }),
    );
  }

  function answerQuestion(value) {
    const question = state.questions[state.index];
    state.answers[question.id] = { value };
    state.index += 1;
    if (state.index >= state.questions.length) {
      finish();
      return;
    }
    renderQuestion();
  }

  function goBack() {
    if (state.index <= 0) return;
    state.index -= 1;
    renderQuestion();
  }

  function reset() {
    if (!state.mode) return;
    start(state.mode.key);
  }

  function finish() {
    state.result = computeResult();
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.remove("is-hidden");
    showResult();
    els.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function computeResult() {
    const scores = {};
    const axisStats = {};

    state.data.axes.forEach((axis) => {
      const axisQuestions = state.questions.filter((question) => question.axis === axis.id);
      const answered = axisQuestions
        .map((question) => ({ question, answer: state.answers[question.id] }))
        .filter((item) => item.answer && item.answer.value !== null);
      const adjusted = answered.map((item) => {
        const x = (item.answer.value - 5) / 4;
        return x * item.question.polarity;
      });
      const denom = answered.reduce((sum, item) => sum + item.question.weight, 0);
      const numerator = answered.reduce((sum, item, index) => (
        sum + adjusted[index] * item.question.weight
      ), 0);
      const mean = denom ? numerator / denom : 0;
      const score = clamp(50 + 50 * mean, 0, 100);
      const avgAbs = adjusted.length
        ? adjusted.reduce((sum, value) => sum + Math.abs(value), 0) / adjusted.length
        : 0;
      const meanAbs = Math.abs(mean);
      const coverage = axisQuestions.length ? answered.length / axisQuestions.length : 0;
      const consistency = adjusted.length < 2
        ? 0.65
        : clamp(0.35 + 0.65 * (meanAbs / Math.max(avgAbs, 0.05)), 0.2, 1);
      const confidence = Math.round((0.55 * coverage + 0.25 * avgAbs + 0.2 * consistency) * 100);
      scores[axis.id] = Math.round(score);
      axisStats[axis.id] = {
        answered: answered.length,
        total: axisQuestions.length,
        skipped: axisQuestions.length - answered.length,
        confidence,
        mean,
        avgAbs,
      };
    });

    const overallConfidence = Math.round(
      state.data.axes.reduce((sum, axis) => sum + axisStats[axis.id].confidence, 0) /
        state.data.axes.length,
    );
    const label = pickResultLabel(scores);
    const tags = buildTags(scores, overallConfidence);
    const matches = buildMatches(scores, state.matchView);
    const strongSignals = buildStrongSignals(scores, axisStats);

    return { scores, axisStats, overallConfidence, label, tags, matches, strongSignals };
  }

  function pickResultLabel(scores) {
    const labels = state.data.resultLabels;
    const found = labels.find((item) => {
      return Object.entries(item.when).every(([axis, rule]) => {
        const value = scores[axis];
        if (rule.min !== undefined && value < rule.min) return false;
        if (rule.max !== undefined && value > rule.max) return false;
        return true;
      });
    });
    return found || labels[labels.length - 1];
  }

  function buildTags(scores, confidence) {
    const tags = [state.result?.label?.name].filter(Boolean);
    state.data.axes.forEach((axis) => {
      const score = scores[axis.id];
      if (score >= 72) tags.push(`${axis.name}：偏向「${axis.positiveLabel}」`);
      if (score <= 28) tags.push(`${axis.name}：偏向「${axis.negativeLabel}」`);
    });
    if (scores.D8 >= 72) tags.push("制度改革与透明治理取向明显");
    if (scores.D5 >= 72) tags.push("住房与世代议题权重很高");
    if (scores.D1 >= 72 && scores.D2 < 55) tags.push("身份认同强，但两岸风险策略较克制");
    if (scores.D1 < 45 && scores.D8 >= 70) tags.push("身份取向偏维持现状，但治理改革要求高");
    if (confidence < 58) tags.push("置信度偏低：中立、跳过或维度内部摇摆较多");
    return [...new Set(tags)].slice(0, 9);
  }

  function buildMatches(scores, viewId) {
    const view = state.data.matchViews.find((item) => item.id === viewId) || state.data.matchViews[0];
    const axes = view.axes;
    const weightSum = axes.reduce((sum, axisId) => sum + (state.data.dimensionWeights[axisId] || 1), 0);
    return state.data.profiles.map((profile) => {
      const weightedSquares = axes.reduce((sum, axisId) => {
        const weight = state.data.dimensionWeights[axisId] || 1;
        const diff = scores[axisId] - profile.scores[axisId];
        return sum + weight * diff * diff;
      }, 0);
      const distance = Math.sqrt(weightedSquares);
      const similarity = clamp(100 * (1 - distance / (100 * Math.sqrt(weightSum))), 0, 100);
      const diffs = axes.map((axisId) => ({
        axis: state.axisById.get(axisId),
        diff: Math.abs(scores[axisId] - profile.scores[axisId]),
      })).sort((a, b) => b.diff - a.diff);
      return {
        profile,
        distance,
        similarity,
        largestDiffs: diffs.slice(0, 2),
        closestAxes: [...diffs].reverse().slice(0, 2),
      };
    }).sort((a, b) => b.similarity - a.similarity);
  }

  function buildStrongSignals(scores, axisStats) {
    const answered = state.questions
      .map((question) => ({ question, answer: state.answers[question.id] }))
      .filter((item) => item.answer && item.answer.value !== null)
      .map((item) => ({
        ...item,
        strength: Math.abs(item.answer.value - 5),
        direction: item.question.polarity * ((item.answer.value - 5) / 4),
      }))
      .sort((a, b) => b.strength - a.strength);

    const strongest = answered.slice(0, 6).map((item) => {
      const axis = state.axisById.get(item.question.axis);
      const side = item.direction >= 0 ? axis.positiveLabel : axis.negativeLabel;
      return `强信号：${axis.name}中，你在「${item.question.textZh}」上明显偏向「${side}」。`;
    });

    const unsureAxes = state.data.axes
      .filter((axis) => axisStats[axis.id].confidence < 58)
      .map((axis) => `${axis.name}（${scores[axis.id]} 分）`);
    if (unsureAxes.length) {
      strongest.push(`不确定点：${unsureAxes.join("、")} 的置信度较低，结果更适合作为粗略参考。`);
    }
    return strongest;
  }

  function showResult() {
    const result = state.result;
    result.matches = buildMatches(result.scores, state.matchView);
    els.resultTitle.textContent = result.label.name;
    els.resultSummary.textContent = `${result.label.summary} 最接近的参照对象是「${result.matches[0].profile.name}」，相似度约 ${Math.round(result.matches[0].similarity)}。`;
    els.confidenceText.textContent = `整体置信度 ${result.overallConfidence}/100；跳过题和中立答案越多，置信度越低。`;

    els.tagList.replaceChildren(
      ...buildTags(result.scores, result.overallConfidence).map((tag) => {
        const li = document.createElement("li");
        li.textContent = tag;
        return li;
      }),
    );

    renderRadar();
    renderCoordinateTabs();
    renderCoordinateMap();
    renderInterpretation();
    renderDimensions();
    renderMatchViewTabs();
    renderMatches();
    renderHeatmap();
    renderStrongest();
  }

  function renderRadar() {
    const canvas = els.radarCanvas;
    const ctx = canvas.getContext("2d");
    const size = 480;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 165;
    const axes = state.data.axes;

    ctx.strokeStyle = "rgba(23,32,42,0.14)";
    ctx.lineWidth = 1;
    for (let ring = 1; ring <= 4; ring += 1) {
      ctx.beginPath();
      axes.forEach((_, index) => {
        const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
        const r = (radius * ring) / 4;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
    }

    axes.forEach((axis, index) => {
      const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = axis.color;
      ctx.font = "700 12px Microsoft YaHei, sans-serif";
      ctx.textAlign = x < cx - 8 ? "right" : x > cx + 8 ? "left" : "center";
      ctx.textBaseline = y < cy ? "bottom" : "top";
      ctx.fillText(axis.id, cx + Math.cos(angle) * (radius + 20), cy + Math.sin(angle) * (radius + 20));
    });

    ctx.beginPath();
    axes.forEach((axis, index) => {
      const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
      const value = state.result.scores[axis.id] / 100;
      const x = cx + Math.cos(angle) * radius * value;
      const y = cy + Math.sin(angle) * radius * value;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(47, 143, 111, 0.22)";
    ctx.strokeStyle = "#2f8f6f";
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
  }

  function renderCoordinateTabs() {
    els.coordinateTabs.replaceChildren(
      ...state.data.coordinateViews.map((view) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab-button";
        if (view.id === state.coordView) button.classList.add("is-active");
        button.textContent = view.label;
        button.addEventListener("click", () => {
          state.coordView = view.id;
          renderCoordinateTabs();
          renderCoordinateMap();
        });
        return button;
      }),
    );
  }

  function renderCoordinateMap() {
    const view = state.data.coordinateViews.find((item) => item.id === state.coordView) ||
      state.data.coordinateViews[0];
    els.mapXAxis.textContent = view.xLabel;
    els.mapYAxis.textContent = view.yLabel;
    els.coordinateMap.querySelectorAll(".map-dot").forEach((dot) => dot.remove());

    state.data.profiles.forEach((profile) => {
      const point = computePoint(profile.scores, view);
      addDot(point.x, point.y, profile.name, campColor(profile.camp), false);
    });
    const userPoint = computePoint(state.result.scores, view);
    addDot(userPoint.x, userPoint.y, "你", "#cf5549", true);
  }

  function computePoint(scores, view) {
    return {
      x: averageAxis(scores, view.xAxes),
      y: averageAxis(scores, view.yAxes),
    };
  }

  function averageAxis(scores, axes) {
    return axes.reduce((sum, axisId) => sum + scores[axisId], 0) / axes.length;
  }

  function addDot(x, y, label, color, isUser) {
    const dot = document.createElement("span");
    dot.className = `map-dot${isUser ? " user" : ""}`;
    dot.style.left = `${clamp(x, 2, 98)}%`;
    dot.style.bottom = `${clamp(y, 2, 98)}%`;
    dot.style.setProperty("--dot-color", color);
    dot.title = `${label}: ${Math.round(x)}, ${Math.round(y)}`;
    const text = document.createElement("span");
    text.textContent = label;
    dot.append(text);
    els.coordinateMap.append(dot);
  }

  function campColor(camp) {
    return {
      "pan-green": "#2f8f6f",
      "pan-blue": "#2f5fa8",
      "third-force": "#7957a8",
      minor: "#b78116",
      other: "#647184",
    }[camp] || "#647184";
  }

  function renderInterpretation() {
    const scores = state.result.scores;
    const matches = state.result.matches;
    const cards = [
      {
        title: "整体画像",
        text: `${state.result.label.summary} 你的前三个接近参照是 ${matches.slice(0, 3).map((item) => item.profile.name).join("、")}。`,
      },
      {
        title: "国家认同与两岸",
        text: describeIdentity(scores),
      },
      {
        title: "经济民生与住房",
        text: describeLivelihood(scores),
      },
      {
        title: "治理文化与权利",
        text: describeGovernance(scores),
      },
    ];

    els.interpretationGrid.replaceChildren(
      ...cards.map((card) => {
        const article = document.createElement("article");
        article.className = "interpretation-card";
        const h3 = document.createElement("h3");
        h3.textContent = card.title;
        const p = document.createElement("p");
        p.textContent = card.text;
        article.append(h3, p);
        return article;
      }),
    );
  }

  function describeIdentity(scores) {
    const identity = scores.D1 >= 70 ? "台湾主体性很强" : scores.D1 <= 35 ? "更重视中华民国/中国连续性框架" : "偏向维持现状或混合身份";
    const risk = scores.D2 >= 70 ? "两岸策略上偏威慑与降依赖" : scores.D2 <= 35 ? "更看重交流、对话和和平红利" : "两岸策略较折中";
    const defense = scores.D3 >= 70 ? "也倾向强化国际结盟和国防韧性" : scores.D3 <= 35 ? "对选边和军事刺激较谨慎" : "国防外交上保留弹性";
    return `${identity}，${risk}，${defense}。`;
  }

  function describeLivelihood(scores) {
    const economy = scores.D4 >= 70 ? "经济上偏再分配、劳权和福利国家" : scores.D4 <= 35 ? "经济上偏市场效率、低税和财政纪律" : "经济分配立场较中间";
    const housing = scores.D5 >= 70 ? "住房世代议题上支持更强公共介入" : scores.D5 <= 35 ? "住房上更相信市场供给和产权稳定" : "住房政策偏务实折中";
    const energy = scores.D7 >= 70 ? "能源环境上更重视生态、绿能和环评" : scores.D7 <= 35 ? "能源环境上更重视供电安全、核能务实和开发弹性" : "能源环境立场较平衡";
    return `${economy}，${housing}，${energy}。`;
  }

  function describeGovernance(scores) {
    const culture = scores.D6 >= 70 ? "社会文化上偏平权、多元和限缩重刑" : scores.D6 <= 35 ? "社会文化上偏传统秩序、重刑和家庭价值" : "社会文化立场并不极端";
    const governance = scores.D8 >= 70 ? "制度治理上强烈支持监督、透明、反腐和公民参与" : scores.D8 <= 35 ? "制度治理上更重视强行政、专家治理和程序稳定" : "制度治理上偏审慎改革";
    return `${culture}；${governance}。`;
  }

  function renderDimensions() {
    els.dimensionList.replaceChildren(
      ...state.data.axes.map((axis) => {
        const value = state.result.scores[axis.id];
        const stats = state.result.axisStats[axis.id];
        const row = document.createElement("article");
        row.className = "dimension-row";
        const label = document.createElement("div");
        label.innerHTML = `<strong>${axis.id} ${axis.name}</strong><small>${axis.negativeLabel} ←→ ${axis.positiveLabel}<br>置信度 ${stats.confidence}/100，答题 ${stats.answered}/${stats.total}</small>`;
        const track = document.createElement("div");
        track.className = "score-track";
        const fill = document.createElement("span");
        fill.className = "score-fill";
        fill.style.setProperty("--score", `${value}%`);
        fill.style.setProperty("--axis-color", axis.color);
        track.append(fill);
        const score = document.createElement("span");
        score.className = "score-value";
        score.textContent = value;
        row.append(label, track, score);
        return row;
      }),
    );
  }

  function renderMatchViewTabs() {
    els.matchViewTabs.replaceChildren(
      ...state.data.matchViews.map((view) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab-button";
        if (view.id === state.matchView) button.classList.add("is-active");
        button.textContent = view.label;
        button.addEventListener("click", () => {
          state.matchView = view.id;
          state.result.matches = buildMatches(state.result.scores, state.matchView);
          renderMatchViewTabs();
          renderMatches();
        });
        return button;
      }),
    );
  }

  function renderMatches() {
    els.matchList.replaceChildren(
      ...state.result.matches.slice(0, 10).map((match) => {
        const card = document.createElement("article");
        card.className = "match-card";
        const body = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.textContent = match.profile.name;
        const p = document.createElement("p");
        p.textContent = match.profile.note;
        const meta = document.createElement("div");
        meta.className = "match-meta";
        meta.textContent = `最接近维度：${match.closestAxes.map((item) => item.axis.name).join("、")}；差距最大维度：${match.largestDiffs.map((item) => item.axis.name).join("、")}。`;
        body.append(h3, p, meta);
        const score = document.createElement("div");
        score.className = "similarity";
        score.innerHTML = `${Math.round(match.similarity)}<span>相似度</span>`;
        card.append(body, score);
        return card;
      }),
    );
  }

  function renderHeatmap() {
    els.heatmap.replaceChildren(
      ...state.data.axes.map((axis) => {
        const column = document.createElement("div");
        column.className = "heat-column";
        const title = document.createElement("strong");
        title.textContent = `${axis.id} ${axis.name}`;
        column.append(title);
        state.questions.filter((question) => question.axis === axis.id).forEach((question) => {
          const answer = state.answers[question.id];
          const cell = document.createElement("span");
          cell.className = "heat-cell";
          if (!answer || answer.value === null) {
            cell.classList.add("skipped");
            cell.title = `${question.textZh}：跳过`;
          } else {
            const adjusted = ((answer.value - 5) / 4) * question.polarity;
            const color = heatColor(adjusted);
            cell.style.setProperty("--heat-color", color);
            cell.title = `${question.textZh}：${answer.value}`;
          }
          column.append(cell);
        });
        return column;
      }),
    );
  }

  function heatColor(value) {
    const alpha = 0.18 + Math.abs(value) * 0.62;
    if (value > 0) return `rgba(47, 143, 111, ${alpha})`;
    if (value < 0) return `rgba(207, 85, 73, ${alpha})`;
    return "rgba(100, 113, 132, 0.18)";
  }

  function renderStrongest() {
    els.strongestList.replaceChildren(
      ...state.result.strongSignals.map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      }),
    );
  }

  function renderSources() {
    if (!state.data) return;
    els.sourceList.replaceChildren(
      ...state.data.sources.map((source) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = source.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = source.title;
        li.append(a, document.createTextNode(` - ${source.note}`));
        return li;
      }),
    );
  }

  async function copySummary() {
    if (!state.result) return;
    const top = state.result.matches.slice(0, 3).map((item) => `${item.profile.name} ${Math.round(item.similarity)}`).join(" / ");
    const axes = state.data.axes.map((axis) => `${axis.id}:${state.result.scores[axis.id]}`).join(" ");
    const text = `台湾政治光谱测试：${state.result.label.name}\n${state.result.label.summary}\n置信度：${state.result.overallConfidence}/100\n接近参照：${top}\n维度：${axes}\n结果仅供参考，不构成投票建议。`;
    try {
      await navigator.clipboard.writeText(text);
      els.copyResult.textContent = "已复制";
      setTimeout(() => { els.copyResult.textContent = "复制结果摘要"; }, 1400);
    } catch (_) {
      els.copyResult.textContent = "复制失败";
      setTimeout(() => { els.copyResult.textContent = "复制结果摘要"; }, 1400);
    }
  }

  function exportPng() {
    if (!state.result) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1500;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f4f7f4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#17202a";
    ctx.font = "900 54px Microsoft YaHei, sans-serif";
    ctx.fillText("台湾政治光谱测试", 80, 110);
    ctx.font = "800 42px Microsoft YaHei, sans-serif";
    ctx.fillText(state.result.label.name, 80, 180);
    ctx.font = "24px Microsoft YaHei, sans-serif";
    wrapText(ctx, state.result.label.summary, 80, 235, 1040, 34);
    ctx.fillStyle = "#647184";
    ctx.fillText(`置信度 ${state.result.overallConfidence}/100 · 结果仅供参考，不构成投票建议`, 80, 335);

    let y = 410;
    state.data.axes.forEach((axis) => {
      const value = state.result.scores[axis.id];
      ctx.fillStyle = "#17202a";
      ctx.font = "700 22px Microsoft YaHei, sans-serif";
      ctx.fillText(`${axis.id} ${axis.name}`, 80, y);
      ctx.fillStyle = "#dfe7e8";
      roundRect(ctx, 330, y - 22, 650, 20, 10);
      ctx.fill();
      ctx.fillStyle = axis.color;
      roundRect(ctx, 330, y - 22, 650 * (value / 100), 20, 10);
      ctx.fill();
      ctx.fillStyle = "#17202a";
      ctx.font = "900 24px Microsoft YaHei, sans-serif";
      ctx.fillText(String(value), 1010, y);
      y += 62;
    });

    y += 40;
    ctx.fillStyle = "#17202a";
    ctx.font = "900 30px Microsoft YaHei, sans-serif";
    ctx.fillText("接近参照", 80, y);
    y += 50;
    state.result.matches.slice(0, 3).forEach((match, index) => {
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, 80, y - 32, 1040, 70, 8);
      ctx.fill();
      ctx.fillStyle = "#17202a";
      ctx.font = "800 25px Microsoft YaHei, sans-serif";
      ctx.fillText(`${index + 1}. ${match.profile.name}`, 110, y + 8);
      ctx.fillStyle = "#2f8f6f";
      ctx.font = "900 30px Microsoft YaHei, sans-serif";
      ctx.fillText(`${Math.round(match.similarity)}`, 1030, y + 8);
      y += 90;
    });

    ctx.fillStyle = "#647184";
    ctx.font = "20px Microsoft YaHei, sans-serif";
    wrapText(ctx, "题库、参照对象和解释在浏览器本地解密与计算；党派/派系分数是建站用初始估计，可后续校准。", 80, 1390, 1040, 30);

    const link = document.createElement("a");
    link.download = "tw-spectrum-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let line = "";
    for (const char of text) {
      const testLine = line + char;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = char;
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) ctx.fillText(line, x, y);
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
