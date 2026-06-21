(function () {
  const storageKey = "uk-spectrum-last-result-v1";
  const state = {
    data: window.UK_SPECTRUM_DATA,
    axisById: new Map(),
    mode: null,
    questions: [],
    index: 0,
    answers: {},
    weights: {},
    result: null,
    coordView: null,
    matchView: "all",
    regionView: "UK",
  };

  const els = {};

  function query(id) {
    return document.getElementById(id);
  }

  function init() {
    [
      "weightPanel", "weightList", "resetWeights", "cancelWeights", "startWeightedQuiz",
      "quizPanel", "resultPanel", "modeLabel", "questionCounter", "progressBar", "axisLabel",
      "issueLabel", "questionText", "scaleRow", "prevQuestion", "skipQuestion", "answeredCount",
      "restartTop", "restartBottom", "resultTitle", "resultSummary", "confidenceText",
      "copyResult", "exportPng", "regionTabs", "regionNote", "tagList", "radarCanvas",
      "coordinateTabs", "coordinateMap", "mapXAxis", "mapYAxis", "mapLegend",
      "interpretationGrid", "dimensionList", "matchViewTabs", "matchList", "heatmap",
      "strongestList", "sourceList",
    ].forEach((id) => {
      els[id] = query(id);
    });

    state.axisById = new Map(state.data.axes.map((axis) => [axis.id, axis]));
    state.weights = { ...state.data.defaultWeights };
    state.coordView = state.data.coordinateViews[0].id;
    renderSources();

    document.querySelectorAll("[data-start-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.startMode));
    });
    els.resetWeights.addEventListener("click", resetWeights);
    els.cancelWeights.addEventListener("click", reset);
    els.startWeightedQuiz.addEventListener("click", beginQuiz);
    els.prevQuestion.addEventListener("click", goBack);
    els.skipQuestion.addEventListener("click", () => answerQuestion(null));
    els.restartTop.addEventListener("click", reset);
    els.restartBottom.addEventListener("click", reset);
    els.copyResult.addEventListener("click", copySummary);
    els.exportPng.addEventListener("click", exportPng);
  }

  function start(modeId) {
    const mode = state.data.modes.find((item) => item.id === modeId) || state.data.modes[1];
    const questionMap = new Map(state.data.questions.map((question) => [question.id, question]));
    state.mode = mode;
    state.questions = mode.questionIds.map((id) => questionMap.get(id)).filter(Boolean);
    state.index = 0;
    state.answers = {};
    state.result = null;
    state.matchView = "all";
    state.regionView = "UK";
    state.coordView = state.data.coordinateViews[0].id;
    state.weights = { ...state.data.defaultWeights };
    els.weightPanel.classList.remove("is-hidden");
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    renderWeights();
    els.weightPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function beginQuiz() {
    els.weightPanel.classList.add("is-hidden");
    els.quizPanel.classList.remove("is-hidden");
    renderQuestion();
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    els.weightPanel.classList.add("is-hidden");
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    state.mode = null;
    state.questions = [];
    state.index = 0;
    state.answers = {};
    state.result = null;
    state.weights = { ...state.data.defaultWeights };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetWeights() {
    state.weights = { ...state.data.defaultWeights };
    renderWeights();
  }

  function renderWeights() {
    els.weightList.replaceChildren(
      ...state.data.axes.map((axis) => {
        const row = document.createElement("article");
        row.className = "weight-row";
        row.style.setProperty("--axis-color", axis.color);
        const label = document.createElement("label");
        label.innerHTML = `<span>${axis.id} ${axis.name}</span><b>${Number(state.weights[axis.id]).toFixed(1)}</b>`;
        const input = document.createElement("input");
        input.type = "range";
        input.min = "0.5";
        input.max = "2";
        input.step = "0.1";
        input.value = state.weights[axis.id];
        input.addEventListener("input", () => {
          state.weights[axis.id] = Number(input.value);
          label.querySelector("b").textContent = Number(input.value).toFixed(1);
        });
        const small = document.createElement("small");
        small.textContent = `${axis.negativeLabel} ←→ ${axis.positiveLabel}`;
        row.append(label, input, small);
        return row;
      }),
    );
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    const axis = state.axisById.get(question.axis);
    const answered = Object.values(state.answers).filter((answer) => answer !== undefined).length;
    els.modeLabel.textContent = state.mode.label;
    els.questionCounter.textContent = `第 ${state.index + 1} 题 / ${state.questions.length}`;
    els.progressBar.style.width = `${(answered / state.questions.length) * 100}%`;
    els.axisLabel.textContent = `${axis.id} ${axis.name}`;
    els.axisLabel.style.setProperty("--axis-color", axis.color);
    els.issueLabel.textContent = question.tags.join(" / ");
    els.questionText.textContent = question.textZh;
    els.answeredCount.textContent = `${answered} / ${state.questions.length}`;
    els.prevQuestion.disabled = state.index === 0;

    els.scaleRow.replaceChildren(
      ...Array.from({ length: 9 }, (_, index) => {
        const value = index + 1;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scale-button";
        if (state.answers[question.id]?.value === value) button.classList.add("is-active");
        button.textContent = String(value);
        button.addEventListener("click", () => answerQuestion(value));
        return button;
      }),
    );
  }

  function answerQuestion(value) {
    const question = state.questions[state.index];
    state.answers[question.id] = { value };
    if (state.index >= state.questions.length - 1) {
      showResult();
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function goBack() {
    if (state.index === 0) return;
    state.index -= 1;
    renderQuestion();
  }

  function showResult() {
    state.result = calculateResult();
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
      const axisQuestions = state.questions.filter((question) => question.axis === axis.id);
      const answered = axisQuestions
        .map((question) => ({ question, answer: state.answers[question.id] }))
        .filter((item) => item.answer && item.answer.value !== null);
      if (!answered.length) {
        scores[axis.id] = 50;
        axisStats[axis.id] = { answered: 0, total: axisQuestions.length, confidence: 0 };
        return;
      }
      let weighted = 0;
      let totalWeight = 0;
      let strength = 0;
      answered.forEach(({ question, answer }) => {
        const adjusted = ((answer.value - 5) / 4) * question.polarity;
        const weight = question.weight || 1;
        weighted += adjusted * weight;
        totalWeight += weight;
        strength += Math.abs(adjusted);
      });
      const mean = weighted / totalWeight;
      const coverage = answered.length / axisQuestions.length;
      const avgStrength = strength / answered.length;
      scores[axis.id] = Math.round(clamp(50 + mean * 50, 0, 100));
      axisStats[axis.id] = {
        answered: answered.length,
        total: axisQuestions.length,
        confidence: Math.round(clamp(coverage * 72 + avgStrength * 28, 0, 100)),
      };
    });

    const overallConfidence = Math.round(average(Object.values(axisStats).map((stats) => stats.confidence)));
    const label = selectLabel(scores);
    const matches = buildMatches(scores, state.matchView, state.regionView);
    const strongSignals = buildStrongSignals();
    const lowConfidence = state.data.axes
      .filter((axis) => axisStats[axis.id].confidence < 45)
      .map((axis) => `${axis.id} ${axis.name}`);
    return { scores, axisStats, overallConfidence, label, matches, strongSignals, lowConfidence };
  }

  function selectLabel(scores) {
    const candidates = state.data.resultLabels
      .filter((label) => label.rules.length)
      .map((label) => ({ label, fit: average(label.rules.map((rule) => ruleFit(scores[rule.axis], rule))) }))
      .sort((a, b) => b.fit - a.fit);
    const best = candidates[0];
    if (best && best.fit >= 0.72) return best.label;
    return state.data.resultLabels.find((label) => label.id === "mixed");
  }

  function ruleFit(value, rule) {
    let fit = 1;
    if (typeof rule.min === "number" && value < rule.min) fit = Math.min(fit, clamp(1 - (rule.min - value) / 34, 0, 1));
    if (typeof rule.max === "number" && value > rule.max) fit = Math.min(fit, clamp(1 - (value - rule.max) / 34, 0, 1));
    return fit;
  }

  function buildMatches(scores, viewId, regionId) {
    const view = state.data.matchViews.find((item) => item.id === viewId) || state.data.matchViews[0];
    const region = state.data.regionViews.find((item) => item.id === regionId) || state.data.regionViews[0];
    const axes = view.axes;
    return state.data.profiles
      .filter((profile) => profile.regions.some((item) => region.profileRegions.includes(item)))
      .map((profile) => {
        const diffs = axes.map((axisId) => {
          const axis = state.axisById.get(axisId);
          const diff = Math.abs((scores[axisId] ?? 50) - profile.scores[axisId]);
          return { axis, diff, weighted: diff * (state.weights[axisId] || 1) };
        });
        const distance = Math.sqrt(diffs.reduce((sum, item) => sum + (state.weights[item.axis.id] || 1) * item.diff ** 2, 0));
        const maxDistance = Math.sqrt(axes.reduce((sum, axisId) => sum + (state.weights[axisId] || 1) * 100 ** 2, 0));
        const similarity = clamp(100 - (distance / maxDistance) * 100, 0, 100);
        return {
          profile,
          diffs,
          distance,
          similarity,
          closestAxes: [...diffs].sort((a, b) => a.diff - b.diff).slice(0, 2),
          largestDiffs: [...diffs].sort((a, b) => b.weighted - a.weighted).slice(0, 3),
        };
      })
      .sort((a, b) => b.similarity - a.similarity);
  }

  function buildStrongSignals() {
    return Object.entries(state.answers)
      .map(([id, answer]) => {
        const question = state.questions.find((item) => item.id === id);
        if (!question || !answer || answer.value === null) return null;
        const axis = state.axisById.get(question.axis);
        const adjusted = ((answer.value - 5) / 4) * question.polarity;
        const direction = adjusted >= 0 ? axis.positiveLabel : axis.negativeLabel;
        return {
          impact: Math.abs(adjusted) * (question.weight || 1),
          text: `${question.id}：回答 ${answer.value}，推动 ${axis.short} 向「${direction}」偏移。${question.textZh}`,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 8)
      .map((item) => item.text);
  }

  function renderResult() {
    const result = state.result;
    els.resultTitle.textContent = result.label.name;
    els.resultSummary.textContent = result.label.summary;
    els.confidenceText.textContent = `置信度 ${result.overallConfidence}/100 · 当前地区视角：${state.regionView} · 党派坐标为首版估计。`;
    renderRegionTabs();
    renderTags();
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

  function renderTags() {
    const top = state.result.matches[0];
    els.tagList.replaceChildren(
      ...[
        ...state.result.label.tags,
        `地区视角：${state.regionView}`,
        `最接近：${top?.profile.name || "暂无"}`,
        `模式：${state.mode.label}`,
      ].map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      }),
    );
  }

  function renderRegionTabs() {
    const region = state.data.regionViews.find((item) => item.id === state.regionView) || state.data.regionViews[0];
    els.regionNote.textContent = region.note;
    els.regionTabs.replaceChildren(
      ...state.data.regionViews.map((view) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab-button";
        if (view.id === state.regionView) button.classList.add("is-active");
        button.textContent = view.label;
        button.addEventListener("click", () => {
          state.regionView = view.id;
          state.result.matches = buildMatches(state.result.scores, state.matchView, state.regionView);
          renderRegionTabs();
          renderTags();
          renderInterpretation();
          renderMatches();
          renderCoordinateMap();
          persistResult();
        });
        return button;
      }),
    );
  }

  function renderRadar() {
    const canvas = els.radarCanvas;
    const size = Math.min(canvas.clientWidth || 480, 520);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const axes = state.data.axes;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.34;
    ctx.strokeStyle = "rgba(23, 32, 42, 0.14)";
    ctx.lineWidth = 1;

    [0.25, 0.5, 0.75, 1].forEach((step) => {
      ctx.beginPath();
      axes.forEach((_, index) => {
        const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius * step;
        const y = cy + Math.sin(angle) * radius * step;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
    });

    axes.forEach((axis, index) => {
      const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = axis.color;
      ctx.font = `${size < 400 ? 9 : 11}px Microsoft YaHei, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(axis.short, cx + Math.cos(angle) * (radius + 23), cy + Math.sin(angle) * (radius + 23));
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
    ctx.fillStyle = "rgba(67, 91, 184, 0.2)";
    ctx.strokeStyle = "#435bb8";
    ctx.lineWidth = 2.5;
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
    const view = state.data.coordinateViews.find((item) => item.id === state.coordView) || state.data.coordinateViews[0];
    els.mapXAxis.textContent = view.xLabel;
    els.mapYAxis.textContent = view.yLabel;
    els.coordinateMap.querySelectorAll(".map-dot").forEach((dot) => dot.remove());
    els.mapLegend.replaceChildren();

    state.result.matches.slice(0, 10).forEach((match, index) => {
      const point = computePoint(match.profile.scores, view);
      const color = campColor(match.profile.camp);
      addDot(point.x, point.y, String(index + 1), color, false, `${match.profile.name}: ${Math.round(point.x)}, ${Math.round(point.y)}`);
      addLegend(index + 1, match.profile.name, color, Math.round(match.similarity));
    });
    const userPoint = computePoint(state.result.scores, view);
    addDot(userPoint.x, userPoint.y, "你", "#cf5549", true, `你: ${Math.round(userPoint.x)}, ${Math.round(userPoint.y)}`);
  }

  function computePoint(scores, view) {
    return { x: averageAxis(scores, view.xAxes), y: averageAxis(scores, view.yAxes) };
  }

  function averageAxis(scores, axes) {
    return axes.reduce((sum, axisId) => sum + scores[axisId], 0) / axes.length;
  }

  function addDot(x, y, text, color, isUser, title) {
    const dot = document.createElement("span");
    dot.className = `map-dot${isUser ? " user" : ""}`;
    dot.style.left = `${clamp(x, 2, 98)}%`;
    dot.style.bottom = `${clamp(y, 2, 98)}%`;
    dot.style.setProperty("--dot-color", color);
    dot.textContent = text;
    dot.title = title;
    els.coordinateMap.append(dot);
  }

  function addLegend(number, name, color, similarity) {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `<i style="--dot-color:${color}">${number}</i><span>${name} · ${similarity}</span>`;
    item.title = `${name} · 相似度 ${similarity}`;
    els.mapLegend.append(item);
  }

  function campColor(camp) {
    return {
      labour: "#cf5549",
      "labour-left": "#b13c53",
      conservative: "#435bb8",
      "national-right": "#5b4b88",
      liberal: "#b47a18",
      green: "#2f8f6f",
      nationalist: "#247c9b",
      unionist: "#8f6b2f",
    }[camp] || "#5f7891";
  }

  function renderInterpretation() {
    const scores = state.result.scores;
    const matches = state.result.matches;
    const region = state.data.regionViews.find((item) => item.id === state.regionView);
    const cards = [
      {
        title: "整体画像",
        text: `${state.result.label.summary} 当前 ${region.label} 视角下，前三个接近参照是 ${matches.slice(0, 3).map((item) => item.profile.name).join("、")}。`,
      },
      { title: "经济与公共服务", text: describeEconomy(scores) },
      { title: "移民、文化与自由", text: describeCulture(scores) },
      { title: "Brexit、Union 与制度", text: describeConstitution(scores) },
      { title: "气候、外交与安全", text: describeSecurity(scores) },
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

  function describeEconomy(scores) {
    const fiscal = scores.A >= 68 ? "财政福利上偏高税、高公共服务和再分配" : scores.A <= 38 ? "财政福利上偏低税、财政纪律和较小政府" : "财政福利取向较折中";
    const labour = scores.B >= 68 ? "也支持更强劳动权利、公共所有和产业政策" : scores.B <= 38 ? "也更相信市场竞争、私营运营和灵活雇佣" : "市场与劳动规制之间保持务实平衡";
    return `${fiscal}，${labour}。`;
  }

  function describeCulture(scores) {
    const migration = scores.C >= 68 ? "移民身份上偏开放、多元和人道庇护" : scores.C <= 38 ? "移民身份上偏强边境、限制净移民和同化要求" : "移民身份议题较中间";
    const liberty = scores.D >= 68 ? "秩序自由上更强调隐私、抗议权和恢复性司法" : scores.D <= 38 ? "秩序自由上更倾向警务扩权、惩罚主义和快速制裁" : "治安与自由之间较折中";
    const equality = scores.I >= 68 ? "平等文化上明显支持反歧视、LGBTQ+ 权利和多元文化" : scores.I <= 38 ? "平等文化上更接近 anti-DEI 或传统文化保守" : "平等文化立场不极端";
    return `${migration}；${liberty}；${equality}。`;
  }

  function describeConstitution(scores) {
    const europe = scores.E >= 68 ? "欧洲/Brexit 上偏亲欧、单一市场或重返 EU 方向" : scores.E <= 38 ? "欧洲/Brexit 上更强调 hard Brexit、主权优先和远离欧盟制度" : "欧洲关系上保持条件式务实";
    const union = scores.F >= 68 ? "Union/Devolution 上偏去中心化、联邦化或民族自决" : scores.F <= 38 ? "Union/Devolution 上偏强 Union 和 Westminster 中心" : "联合王国结构上偏渐进改革";
    const reform = scores.H >= 68 ? "制度上支持 PR、上院改革和成文宪法" : scores.H <= 38 ? "制度上更接受 FPTP、上院和现有宪制安排" : "制度改革态度中等";
    return `${europe}；${union}；${reform}。`;
  }

  function describeSecurity(scores) {
    const green = scores.G >= 68 ? "气候能源上支持快速绿色转型和生态政策" : scores.G <= 38 ? "气候能源上更强调成本、油气和反 net zero 压力" : "气候能源立场较务实";
    const security = scores.J >= 68 ? "外交安全上偏 NATO、军费、核威慑和安全审查" : scores.J <= 38 ? "外交安全上偏克制、反干预、低军费或核裁军" : "外交安全上保持中间现实主义";
    return `${green}；${security}。`;
  }

  function renderDimensions() {
    els.dimensionList.replaceChildren(
      ...state.data.axes.map((axis) => {
        const value = state.result.scores[axis.id];
        const stats = state.result.axisStats[axis.id];
        const row = document.createElement("article");
        row.className = "dimension-row";
        const label = document.createElement("div");
        label.innerHTML = `<strong>${axis.id} ${axis.name}</strong><small>${axis.negativeLabel} ←→ ${axis.positiveLabel}<br>置信度 ${stats.confidence}/100，答题 ${stats.answered}/${stats.total}，匹配权重 ${state.weights[axis.id].toFixed(1)}</small>`;
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
          state.result.matches = buildMatches(state.result.scores, state.matchView, state.regionView);
          renderMatchViewTabs();
          renderMatches();
          renderCoordinateMap();
          persistResult();
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
        const low = match.profile.stability === "low" ? "（低稳定度估计）" : "";
        p.textContent = `${match.profile.note}${low}`;
        const meta = document.createElement("div");
        meta.className = "match-meta";
        meta.textContent = `最接近维度：${match.closestAxes.map((item) => item.axis.name).join("、")}；差距最大维度：${match.largestDiffs.map((item) => item.axis.name).join("、")}。`;
        body.append(h3, p, meta);
        const score = document.createElement("div");
        score.className = "similarity";
        score.innerHTML = `${Math.round(match.similarity)}<span>相似度</span>`;
        const bar = document.createElement("i");
        bar.className = "match-bar";
        bar.style.setProperty("--match", `${Math.round(match.similarity)}%`);
        card.append(body, score, bar);
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
        title.textContent = `${axis.id} ${axis.short}`;
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
            cell.style.setProperty("--heat-color", heatColor(adjusted));
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
    if (value > 0) return `rgba(67, 91, 184, ${alpha})`;
    if (value < 0) return `rgba(207, 85, 73, ${alpha})`;
    return "rgba(100, 113, 132, 0.18)";
  }

  function renderStrongest() {
    const lines = [...state.result.strongSignals];
    if (state.result.lowConfidence.length) lines.unshift(`低置信维度：${state.result.lowConfidence.join("、")}。这些维度答题少或回答更接近中立。`);
    else lines.unshift("多数维度回答覆盖和强度较稳定。");
    els.strongestList.replaceChildren(
      ...lines.map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      }),
    );
  }

  function renderSources() {
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
    const text = `英国政治光谱测试：${state.result.label.name}\n${state.result.label.summary}\n地区视角：${state.regionView}\n置信度：${state.result.overallConfidence}/100\n接近参照：${top}\n维度：${axes}\n结果仅供参考，不构成投票建议。`;
    try {
      await navigator.clipboard.writeText(text);
      els.copyResult.textContent = "已复制";
      setTimeout(() => { els.copyResult.textContent = "复制结果摘要"; }, 1400);
    } catch (_) {
      els.copyResult.textContent = "复制失败";
      setTimeout(() => { els.copyResult.textContent = "复制结果摘要"; }, 1400);
    }
  }

  function persistResult() {
    if (!state.result) return;
    const payload = {
      savedAt: new Date().toISOString(),
      mode: state.mode?.id,
      modeLabel: state.mode?.label,
      regionView: state.regionView,
      matchView: state.matchView,
      weights: state.weights,
      scores: state.result.scores,
      confidence: state.result.overallConfidence,
      label: state.result.label,
      matches: state.result.matches.slice(0, 10).map((match) => ({
        id: match.profile.id,
        name: match.profile.name,
        similarity: Math.round(match.similarity),
        confidence: match.profile.confidence,
      })),
      disclaimer: state.data.methodNote,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }

  function exportPng() {
    if (!state.result) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1500;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f5f7fb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#17202a";
    ctx.font = "900 38px Microsoft YaHei, sans-serif";
    ctx.fillText("英国政治光谱测试", 72, 82);
    ctx.font = "800 34px Microsoft YaHei, sans-serif";
    wrapText(ctx, state.result.label.name, 72, 142, 1056, 42);
    ctx.fillStyle = "#344154";
    ctx.font = "20px Microsoft YaHei, sans-serif";
    const nextY = wrapText(ctx, `${state.result.label.summary} 当前地区视角：${state.regionView}。`, 72, 196, 1056, 30);
    ctx.fillStyle = "#627086";
    ctx.font = "18px Microsoft YaHei, sans-serif";
    ctx.fillText(`置信度 ${state.result.overallConfidence}/100 · 结果仅供参考，不构成投票建议`, 72, nextY + 32);

    let y = nextY + 82;
    state.data.axes.forEach((axis) => {
      const value = state.result.scores[axis.id];
      ctx.fillStyle = "#17202a";
      ctx.font = "700 17px Microsoft YaHei, sans-serif";
      ctx.fillText(`${axis.id} ${axis.name}`, 72, y);
      ctx.fillStyle = "#e4e9ef";
      roundRect(ctx, 340, y - 16, 650, 15, 8);
      ctx.fill();
      const gradient = ctx.createLinearGradient(340, 0, 990, 0);
      gradient.addColorStop(0, "#cf5549");
      gradient.addColorStop(0.52, axis.color);
      gradient.addColorStop(1, "#2f8f6f");
      ctx.fillStyle = gradient;
      roundRect(ctx, 340, y - 16, 650 * (value / 100), 15, 8);
      ctx.fill();
      ctx.fillStyle = "#17202a";
      ctx.font = "900 18px Microsoft YaHei, sans-serif";
      ctx.fillText(String(value), 1022, y);
      y += 48;
    });

    y += 30;
    ctx.fillStyle = "#17202a";
    ctx.font = "900 26px Microsoft YaHei, sans-serif";
    ctx.fillText("前三接近参照", 72, y);
    y += 44;
    state.result.matches.slice(0, 3).forEach((match, index) => {
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, 72, y - 28, 1056, 64, 8);
      ctx.fill();
      ctx.fillStyle = campColor(match.profile.camp);
      roundRect(ctx, 92, y - 9, 420 * (match.similarity / 100), 12, 6);
      ctx.fill();
      ctx.fillStyle = "#17202a";
      ctx.font = "800 21px Microsoft YaHei, sans-serif";
      ctx.fillText(`${index + 1}. ${match.profile.name}`, 92, y + 25);
      ctx.fillStyle = "#435bb8";
      ctx.font = "900 24px Microsoft YaHei, sans-serif";
      ctx.fillText(`${Math.round(match.similarity)}`, 1058, y + 18);
      y += 82;
    });

    ctx.fillStyle = "#627086";
    ctx.font = "18px Microsoft YaHei, sans-serif";
    wrapText(ctx, state.data.methodNote, 72, 1410, 1056, 28);

    const link = document.createElement("a");
    link.download = "uk-spectrum-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let line = "";
    let currentY = y;
    for (const char of text) {
      const testLine = line + char;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, currentY);
        line = char;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) ctx.fillText(line, x, currentY);
    return currentY;
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

  function average(values) {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  window.addEventListener("resize", () => {
    if (state.result) renderRadar();
  });
  document.addEventListener("DOMContentLoaded", init);
})();
