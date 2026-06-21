(function () {
  const storageKey = "de-spectrum-last-result-v1";
  const state = {
    data: window.DE_SPECTRUM_DATA,
    axisById: new Map(),
    topicById: new Map(),
    mode: null,
    questions: [],
    index: 0,
    answers: {},
    weights: {},
    result: null,
    coordView: null,
    matchView: "all",
    regionView: "Germany",
  };

  const els = {};

  function query(id) {
    return document.getElementById(id);
  }

  function init() {
    [
      "weightPanel", "weightList", "resetWeights", "cancelWeights", "startWeightedQuiz",
      "quizPanel", "resultPanel", "modeLabel", "questionCounter", "progressBar", "axisLabel",
      "topicLabel", "issueLabel", "questionText", "scaleRow", "importantToggle", "prevQuestion",
      "skipQuestion", "answeredCount", "restartTop", "restartBottom", "resultTitle",
      "resultSummary", "confidenceText", "copyResult", "exportPng", "regionTabs", "regionNote",
      "tagList", "radarCanvas", "axisLegend", "coordinateTabs", "coordinateMap", "mapXAxis",
      "mapYAxis", "mapLegend", "interpretationGrid", "dimensionList", "matchViewTabs",
      "matchList", "coalitionList", "heatmap", "strongestList", "sourceList",
    ].forEach((id) => {
      els[id] = query(id);
    });

    state.axisById = new Map(state.data.axes.map((axis) => [axis.id, axis]));
    state.topicById = new Map(state.data.topics.map((topic) => [topic.id, topic]));
    state.weights = { ...state.data.defaultWeights };
    state.coordView = state.data.coordinateViews[0].id;
    renderSources();

    document.querySelectorAll("[data-start-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.startMode));
    });
    els.resetWeights.addEventListener("click", resetWeights);
    els.cancelWeights.addEventListener("click", reset);
    els.startWeightedQuiz.addEventListener("click", beginQuiz);
    els.importantToggle.addEventListener("click", toggleImportant);
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
    state.regionView = "Germany";
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
        label.innerHTML = `<span>${axis.short} ${axis.name}</span><b>${Number(state.weights[axis.id]).toFixed(1)}</b>`;
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
    const topic = state.topicById.get(question.topic);
    const answered = Object.values(state.answers).filter((answer) => answer && answer.value !== undefined).length;
    els.modeLabel.textContent = state.mode.label;
    els.questionCounter.textContent = `第 ${state.index + 1} 题 / ${state.questions.length}`;
    els.progressBar.style.width = `${(answered / state.questions.length) * 100}%`;
    els.axisLabel.textContent = `${axis.short} ${axis.name}`;
    els.axisLabel.style.setProperty("--axis-color", axis.color);
    els.topicLabel.textContent = `${question.topic}. ${topic?.title || "议题"}`;
    els.issueLabel.textContent = question.tags.join(" / ");
    els.questionText.textContent = question.textZh;
    els.answeredCount.textContent = `${answered} / ${state.questions.length}`;
    els.prevQuestion.disabled = state.index === 0;
    updateImportantButton(question);

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

  function updateImportantButton(question) {
    const active = Boolean(state.answers[question.id]?.important);
    els.importantToggle.classList.toggle("is-active", active);
    els.importantToggle.setAttribute("aria-pressed", String(active));
    els.importantToggle.textContent = active ? "已标记为重要题" : "标记为重要题";
  }

  function toggleImportant() {
    const question = state.questions[state.index];
    const current = state.answers[question.id] || {};
    state.answers[question.id] = { ...current, important: !current.important };
    updateImportantButton(question);
  }

  function answerQuestion(value) {
    const question = state.questions[state.index];
    const current = state.answers[question.id] || {};
    state.answers[question.id] = { ...current, value };
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
        .filter((item) => item.answer && item.answer.value !== null && item.answer.value !== undefined);
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
      const coverage = answered.length / Math.max(axisQuestions.length, 1);
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
    const coalitions = buildCoalitions(scores);
    const strongSignals = buildStrongSignals();
    const lowConfidence = state.data.axes
      .filter((axis) => axisStats[axis.id].confidence < 45)
      .map((axis) => `${axis.short} ${axis.name}`);
    return { scores, axisStats, overallConfidence, label, matches, coalitions, strongSignals, lowConfidence };
  }

  function selectLabel(scores) {
    const candidates = state.data.resultLabels
      .filter((label) => label.rules.length)
      .map((label) => ({
        label,
        fit: average(label.rules.map((rule) => ruleFit(scores[rule.axis], rule))),
      }))
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
        const rawSimilarity = clamp(100 - (distance / maxDistance) * 100, 0, 100);
        const regionBoost = profile.regionAffinity?.[region.id] || 0;
        const similarity = clamp(rawSimilarity + regionBoost, 0, 100);
        return {
          profile,
          diffs,
          distance,
          similarity,
          rawSimilarity,
          closestAxes: [...diffs].sort((a, b) => a.diff - b.diff).slice(0, 2),
          largestDiffs: [...diffs].sort((a, b) => b.weighted - a.weighted).slice(0, 3),
        };
      })
      .sort((a, b) => b.similarity - a.similarity);
  }

  function buildCoalitions(scores) {
    return state.data.coalitionViews.map((coalition) => {
      const members = coalition.members
        .map((id) => state.data.profiles.find((profile) => profile.id === id))
        .filter(Boolean);
      const coalitionScores = {};
      state.data.axes.forEach((axis) => {
        coalitionScores[axis.id] = average(members.map((profile) => profile.scores[axis.id]));
      });
      const axes = coalition.axes || state.data.axes.map((axis) => axis.id);
      const distance = Math.sqrt(
        axes.reduce((sum, axisId) => {
          const diff = (scores[axisId] ?? 50) - coalitionScores[axisId];
          return sum + (state.weights[axisId] || 1) * diff ** 2;
        }, 0),
      );
      const maxDistance = Math.sqrt(axes.reduce((sum, axisId) => sum + (state.weights[axisId] || 1) * 100 ** 2, 0));
      return {
        ...coalition,
        scores: coalitionScores,
        similarity: clamp(100 - (distance / maxDistance) * 100, 0, 100),
        closestAxes: axes
          .map((axisId) => ({ axis: state.axisById.get(axisId), diff: Math.abs((scores[axisId] ?? 50) - coalitionScores[axisId]) }))
          .sort((a, b) => a.diff - b.diff)
          .slice(0, 2),
      };
    }).sort((a, b) => b.similarity - a.similarity);
  }

  function buildStrongSignals() {
    const topProfile = state.result?.matches?.[0]?.profile;
    const importantLines = [];
    const lines = Object.entries(state.answers)
      .map(([id, answer]) => {
        const question = state.questions.find((item) => item.id === id);
        if (!question || !answer || answer.value === null || answer.value === undefined) return null;
        const axis = state.axisById.get(question.axis);
        const adjusted = ((answer.value - 5) / 4) * question.polarity;
        const direction = adjusted >= 0 ? axis.positiveLabel : axis.negativeLabel;
        const topDiff = topProfile ? Math.abs(state.result.scores[axis.id] - topProfile.scores[axis.id]) : 0;
        const text = `${question.id}：回答 ${answer.value}，推动 ${axis.short} 向「${direction}」偏移。${question.textZh}`;
        if (answer.important) importantLines.push(`重要题：${text}`);
        return {
          impact: Math.abs(adjusted) * (question.weight || 1) + topDiff / 100,
          text,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 8)
      .map((item) => item.text);
    return [...importantLines.slice(0, 6), ...lines];
  }

  function renderResult() {
    const result = state.result;
    els.resultTitle.textContent = result.label.name;
    els.resultSummary.textContent = result.label.summary;
    els.confidenceText.textContent = `置信度 ${result.overallConfidence}/100 · 当前视角：${state.regionView} · 坐标为首版启发式估计`;
    renderRegionTabs();
    renderTags();
    renderRadar();
    renderAxisLegend();
    renderCoordinateTabs();
    renderCoordinateMap();
    renderInterpretation();
    renderDimensions();
    renderMatchViewTabs();
    renderMatches();
    renderCoalitions();
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
      ctx.fillText(axis.short, cx + Math.cos(angle) * (radius + 24), cy + Math.sin(angle) * (radius + 24));
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
    ctx.fillStyle = "rgba(67, 91, 184, 0.18)";
    ctx.strokeStyle = "#435bb8";
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();
  }

  function renderAxisLegend() {
    els.axisLegend.replaceChildren(
      ...state.data.axes.map((axis) => {
        const item = document.createElement("span");
        item.style.setProperty("--axis-color", axis.color);
        item.textContent = `${axis.short} ${axis.name}`;
        return item;
      }),
    );
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

    state.result.matches.slice(0, 12).forEach((match, index) => {
      const point = computePoint(match.profile.scores, view);
      const color = campColor(match.profile.camp);
      addDot(point.x, point.y, String(index + 1), color, false, match.profile.uncertainty, `${match.profile.name}: ${Math.round(point.x)}, ${Math.round(point.y)}`);
      addLegend(index + 1, match.profile.name, color, Math.round(match.similarity), match.profile.confidence);
    });
    const userPoint = computePoint(state.result.scores, view);
    addDot(userPoint.x, userPoint.y, "你", "#cf5549", true, 0, `你：${Math.round(userPoint.x)}, ${Math.round(userPoint.y)}`);
  }

  function computePoint(scores, view) {
    return { x: averageAxis(scores, view.xAxes), y: averageAxis(scores, view.yAxes) };
  }

  function averageAxis(scores, axes) {
    return axes.reduce((sum, axisId) => sum + scores[axisId], 0) / axes.length;
  }

  function addDot(x, y, text, color, isUser, uncertainty, title) {
    const dot = document.createElement("span");
    dot.className = `map-dot${isUser ? " user" : ""}`;
    dot.style.left = `${clamp(x, 2, 98)}%`;
    dot.style.bottom = `${clamp(y, 2, 98)}%`;
    dot.style.setProperty("--dot-color", color);
    if (uncertainty) dot.style.boxShadow = `0 0 0 ${Math.min(18, 4 + uncertainty / 2)}px rgba(23, 32, 42, 0.07)`;
    dot.textContent = text;
    dot.title = title;
    els.coordinateMap.append(dot);
  }

  function addLegend(number, name, color, similarity, confidence) {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `<i style="--dot-color:${color}">${number}</i><span>${name} · ${similarity} · 置信 ${confidence}</span>`;
    item.title = `${name} · 相似度 ${similarity} · 置信 ${confidence}/100`;
    els.mapLegend.append(item);
  }

  function campColor(camp) {
    return {
      social_democrat: "#cf5549",
      conservative: "#202734",
      christian_social: "#365f9f",
      green: "#2f8f6f",
      liberal: "#b47a18",
      left: "#b13c53",
      national_right: "#7656a7",
      communitarian: "#8f6b2f",
      regional: "#247c9b",
      minor: "#5f7891",
    }[camp] || "#5f7891";
  }

  function renderInterpretation() {
    const scores = state.result.scores;
    const matches = state.result.matches;
    const region = state.data.regionViews.find((item) => item.id === state.regionView);
    const cards = [
      {
        title: "整体画像",
        text: `${state.result.label.summary} 在 ${region.label} 视角下，前三个接近参照是 ${matches.slice(0, 3).map((item) => item.profile.name).join("、")}。`,
      },
      { title: "经济、财政与社会国家", text: describeEconomy(scores) },
      { title: "移民、文化与自由宪政", text: describeCulture(scores) },
      { title: "欧盟、外交与安全", text: describeExternal(scores) },
      { title: "地区、现代化与治理风格", text: describeGovernance(scores) },
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
    const eco = scores.ECO >= 68 ? "经济分配上偏社会国家、再分配和劳工保护" : scores.ECO <= 38 ? "经济分配上偏市场、企业竞争力和低再分配" : "经济分配上比较务实折中";
    const fiscal = scores.FISC >= 68 ? "财政上愿意为公共投资、住房、铁路和教育放松债务刹车" : scores.FISC <= 38 ? "财政上更重视债务刹车、预算纪律和减税空间" : "财政上在债务纪律和投资需求之间摇摆";
    return `${eco}；${fiscal}。`;
  }

  function describeCulture(scores) {
    const migration = scores.MIG >= 68 ? "移民庇护上偏开放融合、人道保护和合法路径" : scores.MIG <= 38 ? "移民庇护上偏限制、快速遣返和边境控制" : "移民庇护上更强调可控开放或条件式融合";
    const culture = scores.CULT >= 68 ? "文化议题上偏 GAL、多元、性别平等和公民自由" : scores.CULT <= 38 ? "文化议题上偏传统秩序、国家认同和社会保守" : "文化议题上不是强阵营化立场";
    const democracy = scores.DEM >= 68 ? "制度上更强调自由宪政、法治边界和反极端主义" : scores.DEM <= 38 ? "制度上更容易接受反建制多数主义和强授权政治" : "制度改革取向偏中间";
    return `${migration}；${culture}；${democracy}。`;
  }

  function describeExternal(scores) {
    const eu = scores.EU >= 68 ? "欧盟议题上偏一体化、共同规则和欧洲身份" : scores.EU <= 38 ? "欧盟议题上更强调国家主权、边界和预算自主" : "欧盟议题上保持条件式亲欧";
    const security = scores.SEC >= 68 ? "外交安全上偏 NATO、援乌、国防投入和安全鹰派" : scores.SEC <= 38 ? "外交安全上偏克制、和平主义、反军事化或对俄妥协" : "外交安全上偏现实主义平衡";
    const climate = scores.CLIM >= 68 ? "气候能源上支持更快绿色转型" : scores.CLIM <= 38 ? "气候能源上更担心成本、工业竞争力和技术中立" : "气候能源上支持转型但重视成本控制";
    return `${eu}；${security}；${climate}。`;
  }

  function describeGovernance(scores) {
    const region = scores.REG >= 68 ? "地区政策上重视东西德、城乡和弱势地区的公共投资" : scores.REG <= 38 ? "地区政策上更重视财政自担、增长中心和地方竞争" : "地区政策上倾向渐进平衡";
    const modern = scores.MOD >= 68 ? "现代化上支持更强国家能力、数字化、产业政策和行政改革" : scores.MOD <= 38 ? "现代化上更谨慎，担心国家扩张、监管负担和技术官僚主义" : "现代化上偏务实改良";
    return `${region}；${modern}。`;
  }

  function renderDimensions() {
    els.dimensionList.replaceChildren(
      ...state.data.axes.map((axis) => {
        const value = state.result.scores[axis.id];
        const stats = state.result.axisStats[axis.id];
        const row = document.createElement("article");
        row.className = "dimension-row";
        const label = document.createElement("div");
        label.innerHTML = `<strong>${axis.short} ${axis.name}</strong><small>${axis.negativeLabel} ←→ ${axis.positiveLabel}<br>置信度 ${stats.confidence}/100，答题 ${stats.answered}/${stats.total}，匹配权重 ${state.weights[axis.id].toFixed(1)}</small>`;
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
      ...state.result.matches.slice(0, 12).map((match) => {
        const card = document.createElement("article");
        card.className = "match-card";
        const body = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.textContent = match.profile.name;
        const p = document.createElement("p");
        const flags = [
          match.profile.status,
          match.profile.stability === "low" ? "低稳定度估计" : "",
          `不确定性 ${match.profile.uncertainty}`,
        ].filter(Boolean).join(" · ");
        p.textContent = `${match.profile.note}（${flags}）`;
        const meta = document.createElement("div");
        meta.className = "match-meta";
        meta.textContent = `最接近维度：${match.closestAxes.map((item) => item.axis.name).join("、")}；差距最大：${match.largestDiffs.map((item) => item.axis.name).join("、")}。`;
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

  function renderCoalitions() {
    els.coalitionList.replaceChildren(
      ...state.result.coalitions.slice(0, 8).map((coalition) => {
        const card = document.createElement("article");
        card.className = "coalition-card";
        const h3 = document.createElement("h3");
        h3.textContent = coalition.name;
        const p = document.createElement("p");
        p.textContent = `${coalition.note} 接近维度：${coalition.closestAxes.map((item) => item.axis.short).join("、")}。`;
        const bar = document.createElement("i");
        bar.className = "match-bar";
        bar.style.setProperty("--match", `${Math.round(coalition.similarity)}%`);
        const score = document.createElement("strong");
        score.textContent = `${Math.round(coalition.similarity)}`;
        card.append(h3, p, score, bar);
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
        title.textContent = `${axis.short}`;
        column.append(title);
        state.questions.filter((question) => question.axis === axis.id).forEach((question) => {
          const answer = state.answers[question.id];
          const cell = document.createElement("span");
          cell.className = "heat-cell";
          if (answer?.important) cell.classList.add("important");
          if (!answer || answer.value === null || answer.value === undefined) {
            cell.classList.add("skipped");
            cell.title = `${question.id} ${question.textZh}：跳过`;
          } else {
            const adjusted = ((answer.value - 5) / 4) * question.polarity;
            cell.style.setProperty("--heat-color", heatColor(adjusted));
            cell.title = `${question.id} ${question.textZh}：${answer.value}${answer.important ? " · 重要题" : ""}`;
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
    if (state.result.lowConfidence.length) lines.unshift(`低置信维度：${state.result.lowConfidence.join("、")}。这些维度答题少、跳过多或回答更接近中立。`);
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
    const coalitions = state.result.coalitions.slice(0, 3).map((item) => `${item.name} ${Math.round(item.similarity)}`).join(" / ");
    const axes = state.data.axes.map((axis) => `${axis.short}:${state.result.scores[axis.id]}`).join(" ");
    const text = `德国政治光谱测试：${state.result.label.name}\n${state.result.label.summary}\n地区视角：${state.regionView}\n置信度：${state.result.overallConfidence}/100\n接近参照：${top}\n联盟相容性：${coalitions}\n维度：${axes}\n结果仅供参考，不构成投票建议。`;
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
      version: state.data.version,
      mode: state.mode?.id,
      modeLabel: state.mode?.label,
      regionView: state.regionView,
      matchView: state.matchView,
      weights: state.weights,
      scores: state.result.scores,
      confidence: state.result.overallConfidence,
      label: state.result.label,
      importantQuestions: Object.entries(state.answers).filter(([, answer]) => answer?.important).map(([id]) => id),
      matches: state.result.matches.slice(0, 12).map((match) => ({
        id: match.profile.id,
        name: match.profile.name,
        similarity: Math.round(match.similarity),
        confidence: match.profile.confidence,
      })),
      coalitions: state.result.coalitions.slice(0, 8).map((coalition) => ({
        id: coalition.id,
        name: coalition.name,
        similarity: Math.round(coalition.similarity),
      })),
      disclaimer: state.data.methodNote,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }

  function exportPng() {
    if (!state.result) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1580;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f5f7fb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#17202a";
    ctx.font = "900 38px Microsoft YaHei, sans-serif";
    ctx.fillText("德国政治光谱测试", 72, 82);
    ctx.font = "800 34px Microsoft YaHei, sans-serif";
    const titleY = wrapText(ctx, state.result.label.name, 72, 142, 1056, 42);
    ctx.fillStyle = "#344154";
    ctx.font = "20px Microsoft YaHei, sans-serif";
    const nextY = wrapText(ctx, `${state.result.label.summary} 当前地区视角：${state.regionView}。`, 72, titleY + 38, 1056, 30);
    ctx.fillStyle = "#627086";
    ctx.font = "18px Microsoft YaHei, sans-serif";
    ctx.fillText(`置信度 ${state.result.overallConfidence}/100 · 结果仅供参考，不构成投票建议`, 72, nextY + 32);

    let y = nextY + 82;
    state.data.axes.forEach((axis) => {
      const value = state.result.scores[axis.id];
      ctx.fillStyle = "#17202a";
      ctx.font = "700 17px Microsoft YaHei, sans-serif";
      ctx.fillText(`${axis.short} ${axis.name}`, 72, y);
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

    ctx.fillStyle = "#17202a";
    ctx.font = "900 26px Microsoft YaHei, sans-serif";
    ctx.fillText("联盟相容性", 72, y + 6);
    y += 54;
    state.result.coalitions.slice(0, 3).forEach((coalition) => {
      ctx.fillStyle = "#344154";
      ctx.font = "700 19px Microsoft YaHei, sans-serif";
      ctx.fillText(`${coalition.name} · ${Math.round(coalition.similarity)}`, 92, y);
      y += 34;
    });

    ctx.fillStyle = "#627086";
    ctx.font = "18px Microsoft YaHei, sans-serif";
    wrapText(ctx, state.data.methodNote, 72, 1490, 1056, 28);

    const link = document.createElement("a");
    link.download = "de-spectrum-result.png";
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
