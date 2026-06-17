(function () {
  const data = window.US_SPECTRUM_DATA;
  const axisById = new Map(data.axes.map((axis) => [axis.id, axis]));

  const state = {
    lang: "zh",
    mode: null,
    questions: [],
    index: 0,
    step: "intro",
    answers: {},
    weights: {},
    result: null,
    tab: "classic",
  };

  const els = {};

  const i18n = {
    zh: {
      navHome: "私人主页",
      navHub: "测试集合",
      navStart: "开始",
      navMethod: "方法",
      navSources: "来源",
      heroEyebrow: "United States political spectrum test",
      titleA: "美国政治・社会价值观",
      titleB: "光谱测试",
      lead: "用 10 个维度测量你在美国经济、文化、制度、外交与能源议题上的相对位置。结果显示坐标、置信度和参考政策距离，但不构成投票建议。",
      scaleHint: "1 表示完全不同意，9 表示完全同意；5 是中立或不确定。不了解的题可以跳过。",
      quick: "快速版",
      standard: "标准版",
      full: "深度版",
      question: "第",
      of: "题 /",
      disagree: "不同意",
      neutral: "中立",
      agree: "同意",
      previous: "上一题",
      skip: "跳过",
      restart: "重新开始",
      importanceTitle: "这个维度对你有多重要？",
      importanceLead: "重要性只影响党派/派系/Pew 距离，不改变你的原始轴分数。",
      veryLow: "很低",
      low: "较低",
      normal: "一般",
      high: "较高",
      veryHigh: "很高",
      useDefault: "使用默认重要性",
      copy: "复制结果摘要",
      exportPng: "导出 PNG",
      tags: "组合标签",
      radar: "十轴雷达",
      map: "坐标图",
      axes: "10 个维度",
      distance: "参考政策距离",
      insights: "置信度与混合点",
      sources: "参考资料入口",
      methodTitle: "设计方法",
      method1: "160 题题库",
      method1Text: "10 个轴，每轴 4 个子域、16 道题；快速版和标准版从同一题库抽取。",
      method2: "轴级重要性",
      method2Text: "你可以给每个维度设置重要性，用于加权参考对象距离；原始分数保持透明。",
      method3: "本地优先",
      method3Text: "答题、计分和 PNG 生成都在浏览器本地完成，不上传原始答案。",
      resultDisclaimer: "以下仅表示本测试题项中的政策距离，不表示投票建议。",
    },
    en: {
      navHome: "Home",
      navHub: "Tests Hub",
      navStart: "Start",
      navMethod: "Method",
      navSources: "Sources",
      heroEyebrow: "United States political spectrum test",
      titleA: "United States Political",
      titleB: "Spectrum Test",
      lead: "Measure your relative position across ten dimensions of U.S. economics, culture, institutions, foreign policy, and energy. Results show coordinates, confidence, and reference distances, not voting advice.",
      scaleHint: "1 means completely disagree, 9 means completely agree, and 5 means neutral or unsure. You can skip unfamiliar questions.",
      quick: "Quick mode",
      standard: "Standard mode",
      full: "Full mode",
      question: "Question",
      of: "of",
      disagree: "Disagree",
      neutral: "Neutral",
      agree: "Agree",
      previous: "Previous",
      skip: "Skip",
      restart: "Restart",
      importanceTitle: "How important is this dimension to you?",
      importanceLead: "Importance affects party, caucus, and Pew reference distances, not your raw axis score.",
      veryLow: "Very low",
      low: "Low",
      normal: "Normal",
      high: "High",
      veryHigh: "Very high",
      useDefault: "Use default importance",
      copy: "Copy summary",
      exportPng: "Export PNG",
      tags: "Profile tags",
      radar: "Ten-axis radar",
      map: "Coordinate map",
      axes: "10 dimensions",
      distance: "Reference distance",
      insights: "Confidence and mixed points",
      sources: "Reference sources",
      methodTitle: "Method",
      method1: "160-item bank",
      method1Text: "Ten axes, four subdomains per axis, sixteen items per axis. Shorter modes sample from the same bank.",
      method2: "Axis importance",
      method2Text: "You can weight dimensions for reference matching while keeping raw axis scores transparent.",
      method3: "Local first",
      method3Text: "Answering, scoring, and PNG export happen locally in the browser. Raw answers are not uploaded.",
      resultDisclaimer: "These are policy distances within this item bank, not voting advice.",
    },
  };

  const tabs = [
    { id: "classic", x: "ECO", y: "CULT", zh: "经典政治图", en: "Classic map" },
    { id: "liberty", x: "LIB", y: "CULT", zh: "自由—秩序图", en: "Liberty-order map" },
    { id: "global", x: "FP", y: "IMM", zh: "全球主义图", en: "Globalism map" },
    { id: "climate", x: "ECO", y: "CLIM", zh: "气候—经济图", en: "Climate-economy map" },
    { id: "democracy", x: "DEMO", y: "RACE", zh: "制度改革图", en: "Democracy reform map" },
  ];

  function t(key) {
    return i18n[state.lang][key];
  }

  function query(id) {
    return document.getElementById(id);
  }

  function init() {
    [
      "languageToggle", "heroEyebrow", "heroTitleA", "heroTitleB", "heroLead", "scaleHint",
      "navHome", "navHub", "navStart", "navMethod", "navSources",
      "quickLabel", "quickDesc", "standardLabel", "standardDesc", "fullLabel", "fullDesc",
      "quizPanel", "questionCard", "weightCard", "resultPanel", "modeLabel", "questionCounter",
      "progressBar", "axisLabel", "subdomainLabel", "questionText", "scaleRow", "prevQuestion",
      "skipQuestion", "answeredCount", "restartTop", "importanceTitle", "importanceLead",
      "importanceAxis", "importanceButtons", "importanceDefault", "resultKicker", "resultTitle",
      "resultSummary", "confidenceText", "tagList", "radarCanvas", "coordinateTabs", "coordinateMap",
      "mapXAxis", "mapYAxis", "dimensionList", "matchList", "insightList", "sourceList",
      "copyResult", "exportPng", "restartBottom", "methodTitle", "method1", "method1Text",
      "method2", "method2Text", "method3", "method3Text", "sectionTags", "sectionRadar",
      "sectionMap", "sectionAxes", "sectionDistance", "sectionInsights", "sectionSources",
    ].forEach((id) => {
      els[id] = query(id);
    });

    document.querySelectorAll("[data-start-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.startMode));
    });
    els.languageToggle.addEventListener("click", toggleLanguage);
    els.prevQuestion.addEventListener("click", goBack);
    els.skipQuestion.addEventListener("click", () => answerQuestion(null));
    els.restartTop.addEventListener("click", reset);
    els.restartBottom.addEventListener("click", reset);
    els.importanceDefault.addEventListener("click", () => saveImportance(3));
    els.copyResult.addEventListener("click", copySummary);
    els.exportPng.addEventListener("click", exportPng);
    renderStatic();
    renderSources();
  }

  function renderStatic() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    els.languageToggle.textContent = state.lang === "zh" ? "EN" : "中文";
    [
      "heroEyebrow", "heroLead", "scaleHint", "navHome", "navHub", "navStart", "navMethod",
      "navSources", "methodTitle", "method1", "method1Text", "method2", "method2Text",
      "method3", "method3Text",
    ].forEach((id) => {
      els[id].textContent = t(id);
    });
    els.heroTitleA.textContent = t("titleA");
    els.heroTitleB.textContent = t("titleB");
    els.quickLabel.textContent = t("quick");
    els.quickDesc.textContent = data.modes.quick[state.lang === "zh" ? "zhDesc" : "enDesc"];
    els.standardLabel.textContent = t("standard");
    els.standardDesc.textContent = data.modes.standard[state.lang === "zh" ? "zhDesc" : "enDesc"];
    els.fullLabel.textContent = t("full");
    els.fullDesc.textContent = data.modes.full[state.lang === "zh" ? "zhDesc" : "enDesc"];
    els.prevQuestion.textContent = t("previous");
    els.skipQuestion.textContent = t("skip");
    els.restartTop.textContent = t("restart");
    els.restartBottom.textContent = t("restart");
    els.importanceTitle.textContent = t("importanceTitle");
    els.importanceLead.textContent = t("importanceLead");
    els.importanceDefault.textContent = t("useDefault");
    els.copyResult.textContent = t("copy");
    els.exportPng.textContent = t("exportPng");
    els.sectionTags.textContent = t("tags");
    els.sectionRadar.textContent = t("radar");
    els.sectionMap.textContent = t("map");
    els.sectionAxes.textContent = t("axes");
    els.sectionDistance.textContent = t("distance");
    els.sectionInsights.textContent = t("insights");
    els.sectionSources.textContent = t("sources");
    if (state.step === "question") renderQuestion();
    if (state.step === "weight") renderImportance();
    if (state.result) showResult(false);
  }

  function toggleLanguage() {
    state.lang = state.lang === "zh" ? "en" : "zh";
    renderStatic();
  }

  function start(modeKey) {
    state.mode = data.modes[modeKey] || data.modes.quick;
    state.questions = selectQuestions(state.mode.perAxis);
    state.index = 0;
    state.step = "question";
    state.answers = {};
    state.weights = {};
    state.result = null;
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.classList.remove("is-hidden");
    renderQuestion();
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectQuestions(perAxis) {
    const picks = perAxis === 4
      ? [0, 1, 8, 9]
      : perAxis === 8
        ? [0, 1, 4, 5, 8, 9, 12, 13]
        : Array.from({ length: 16 }, (_, index) => index);
    return data.axes.flatMap((axis) => {
      const list = data.questions.filter((question) => question.axis === axis.id);
      return picks.map((index) => list[index]).filter(Boolean);
    });
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    const axis = axisById.get(question.axis);
    const total = state.questions.length;
    const done = Object.keys(state.answers).length;
    state.step = "question";
    els.questionCard.classList.remove("is-hidden");
    els.weightCard.classList.add("is-hidden");
    els.modeLabel.textContent = `${state.mode[state.lang === "zh" ? "zh" : "en"]} / ${state.mode[state.lang === "zh" ? "zhDesc" : "enDesc"]}`;
    els.questionCounter.textContent = state.lang === "zh"
      ? `${t("question")} ${state.index + 1} ${t("of")} ${total}`
      : `${t("question")} ${state.index + 1} ${t("of")} ${total}`;
    els.progressBar.style.width = `${(state.index / total) * 100}%`;
    els.axisLabel.textContent = axisText(axis);
    els.axisLabel.style.setProperty("--axis-color", axis.color);
    els.subdomainLabel.textContent = state.lang === "zh" ? question.subdomainZh : question.subdomainEn;
    els.questionText.textContent = state.lang === "zh" ? question.textZh : question.textEn;
    els.answeredCount.textContent = `${done} / ${total}`;
    els.prevQuestion.disabled = state.index === 0;
    els.scaleRow.replaceChildren(
      ...data.scale.map((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scale-button";
        button.dataset.value = String(option.value);
        button.innerHTML = `<span>${option.value}</span><small>${option[state.lang]}</small>`;
        if (state.answers[question.id] === option.value) button.classList.add("is-selected");
        button.addEventListener("click", () => answerQuestion(option.value));
        return button;
      })
    );
  }

  function answerQuestion(value) {
    const question = state.questions[state.index];
    state.answers[question.id] = value;
    if (isAxisEnd(state.index)) {
      renderImportance();
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function isAxisEnd(index) {
    const current = state.questions[index]?.axis;
    const next = state.questions[index + 1]?.axis;
    return current && current !== next;
  }

  function renderImportance() {
    const question = state.questions[state.index];
    const axis = axisById.get(question.axis);
    state.step = "weight";
    els.questionCard.classList.add("is-hidden");
    els.weightCard.classList.remove("is-hidden");
    els.progressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
    els.importanceAxis.textContent = axisText(axis);
    els.importanceAxis.style.setProperty("--axis-color", axis.color);
    const labels = [t("veryLow"), t("low"), t("normal"), t("high"), t("veryHigh")];
    els.importanceButtons.replaceChildren(
      ...labels.map((label, index) => {
        const value = index + 1;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "importance-button";
        button.textContent = label;
        button.addEventListener("click", () => saveImportance(value));
        return button;
      })
    );
  }

  function saveImportance(value) {
    const axis = state.questions[state.index].axis;
    state.weights[axis] = value;
    if (state.index >= state.questions.length - 1) {
      showResult(true);
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function goBack() {
    if (state.step === "weight") {
      renderQuestion();
      return;
    }
    if (state.index === 0) return;
    state.index -= 1;
    renderQuestion();
  }

  function reset() {
    state.mode = null;
    state.questions = [];
    state.index = 0;
    state.step = "intro";
    state.answers = {};
    state.weights = {};
    state.result = null;
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function calculateResult() {
    const axes = data.axes.map((axis) => {
      const questions = state.questions.filter((question) => question.axis === axis.id);
      let sum = 0;
      let answered = 0;
      let skipped = 0;
      let magnitude = 0;
      questions.forEach((question) => {
        const value = state.answers[question.id];
        if (value === null) {
          skipped += 1;
          return;
        }
        if (value === undefined) return;
        const z = ((value - 5) / 4) * question.direction;
        sum += z;
        magnitude += Math.abs(z);
        answered += 1;
      });
      const score = answered ? Math.round((sum / answered) * 100) : 0;
      const consistency = magnitude ? Math.abs(sum) / magnitude : 0;
      const confidence = Math.round((answered / questions.length) * (35 + 45 * consistency + 20 * (magnitude / Math.max(answered, 1))));
      return { ...axis, score: clamp(score, -100, 100), answered, skipped, total: questions.length, confidence: clamp(confidence, 0, 100), importance: state.weights[axis.id] || 3 };
    });
    const scoreMap = Object.fromEntries(axes.map((axis) => [axis.id, axis.score]));
    const axisWeights = Object.fromEntries(axes.map((axis) => [axis.id, axis.importance]));
    const matches = data.entities.map((entity) => {
      let weighted = 0;
      let totalWeight = 0;
      data.axes.forEach((axis) => {
        const weight = axisWeights[axis.id] || 3;
        const diff = scoreMap[axis.id] - entity.scores[axis.id];
        weighted += weight * diff * diff;
        totalWeight += weight;
      });
      const distance = Math.sqrt(weighted / totalWeight);
      return {
        ...entity,
        match: clamp(Math.round(100 * (1 - distance / 200)), 0, 100),
        diffs: categoryDiffs(scoreMap, entity.scores),
      };
    }).sort((a, b) => b.match - a.match);
    const tags = buildTags(scoreMap);
    const confidence = Math.round(axes.reduce((sum, axis) => sum + axis.confidence, 0) / axes.length);
    return { axes, scoreMap, matches, tags, confidence };
  }

  function categoryDiffs(user, ref) {
    const groups = {
      econ: ["ECO", "STATE"],
      culture: ["CULT", "RACE"],
      immigration: ["IMM"],
      foreign: ["FP", "MIL"],
      climate: ["CLIM"],
      institutions: ["DEMO", "LIB"],
    };
    return Object.fromEntries(Object.entries(groups).map(([key, ids]) => [
      key,
      Math.round(ids.reduce((sum, id) => sum + Math.abs(user[id] - ref[id]), 0) / ids.length),
    ]));
  }

  function buildTags(scores) {
    const tags = [];
    if (scores.ECO > 45 && scores.CULT > 45) tags.push(tag("进步经济自由派", "Progressive economic liberal", "再分配和文化多元都比较突出。", "Strong redistribution and cultural pluralism."));
    if (scores.ECO < -40 && scores.CULT < -40) tags.push(tag("市场传统保守派", "Market traditional conservative", "低税市场与文化传统取向较强。", "Low-tax market orientation with traditional cultural values."));
    if (scores.ECO < -45 && scores.LIB > 45) tags.push(tag("自由意志主义倾向", "Libertarian-leaning", "市场自由和公民自由都较突出。", "Market freedom and civil liberties are both prominent."));
    if (scores.ECO > 40 && scores.MIL < -40) tags.push(tag("社会民主反干预型", "Social-democratic restraint", "支持公共投资，同时偏向军事克制。", "Supports public investment while leaning toward military restraint."));
    if (scores.IMM < -55 && scores.CULT < -45) tags.push(tag("民族保守倾向", "National-conservative leaning", "边境、同化和传统文化取向较强。", "Strong border, assimilation, and traditional culture orientation."));
    if (scores.CLIM > 55 && scores.ECO > 30) tags.push(tag("绿色进步型", "Green progressive", "气候监管和经济再分配都较高。", "High climate regulation and redistribution."));
    if (scores.DEMO > 55 && scores.RACE > 50) tags.push(tag("制度改革正义型", "Institutional reform and justice", "重视投票权、制度改革和结构性正义。", "Prioritizes voting access, institutional reform, and structural justice."));
    if (!tags.length) tags.push(tag("混合现实主义型", "Mixed pragmatic profile", "你的立场跨越多个阵营，适合逐轴查看。", "Your profile crosses camps; axis-by-axis reading matters."));
    return tags.slice(0, 4);
  }

  function tag(zh, en, zhSummary, enSummary) {
    return { zh, en, zhSummary, enSummary };
  }

  function showResult(scroll) {
    state.result = calculateResult();
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.remove("is-hidden");
    const result = state.result;
    const primary = result.tags[0];
    els.resultKicker.textContent = `${state.mode[state.lang === "zh" ? "zh" : "en"]} / ${t("resultDisclaimer")}`;
    els.resultTitle.textContent = state.lang === "zh" ? primary.zh : primary.en;
    els.resultSummary.textContent = state.lang === "zh" ? primary.zhSummary : primary.enSummary;
    els.confidenceText.textContent = state.lang === "zh"
      ? `总体置信度 ${result.confidence}%。党派/派系/Pew 距离已按你的轴级重要性加权。`
      : `Overall confidence ${result.confidence}%. Party, caucus, and Pew distances are weighted by your axis importance choices.`;
    renderTags(result.tags);
    renderRadar(result.axes);
    renderTabs();
    renderMap();
    renderAxes(result.axes);
    renderMatches(result.matches);
    renderInsights(result);
    if (scroll) els.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderTags(tags) {
    els.tagList.replaceChildren(...tags.map((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${state.lang === "zh" ? item.zh : item.en}</strong><span>${state.lang === "zh" ? item.zhSummary : item.enSummary}</span>`;
      return li;
    }));
  }

  function renderTabs() {
    els.coordinateTabs.replaceChildren(...tabs.map((tab) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = tab.id === state.tab ? "is-active" : "";
      button.textContent = state.lang === "zh" ? tab.zh : tab.en;
      button.addEventListener("click", () => {
        state.tab = tab.id;
        renderTabs();
        renderMap();
      });
      return button;
    }));
  }

  function renderMap() {
    const result = state.result;
    const tab = tabs.find((item) => item.id === state.tab) || tabs[0];
    const xAxis = axisById.get(tab.x);
    const yAxis = axisById.get(tab.y);
    els.mapXAxis.textContent = `${sideText(xAxis, "negative")} ←→ ${sideText(xAxis, "positive")}`;
    els.mapYAxis.textContent = `${sideText(yAxis, "positive")} ↑ / ${sideText(yAxis, "negative")} ↓`;
    els.coordinateMap.querySelectorAll(".map-dot").forEach((dot) => dot.remove());
    const refs = result.matches.slice(0, 10);
    refs.forEach((entity) => addDot(entity.scores[tab.x], entity.scores[tab.y], entity.name, "ref"));
    addDot(result.scoreMap[tab.x], result.scoreMap[tab.y], state.lang === "zh" ? "你" : "You", "user");
  }

  function addDot(xScore, yScore, label, type) {
    const dot = document.createElement("span");
    dot.className = `map-dot ${type}`;
    dot.style.left = `${((xScore + 100) / 200) * 100}%`;
    dot.style.top = `${100 - ((yScore + 100) / 200) * 100}%`;
    dot.textContent = shortLabel(label);
    dot.title = label;
    els.coordinateMap.appendChild(dot);
  }

  function shortLabel(label) {
    if (label === "You" || label === "你") return label;
    return label.split(/[\s/]+/).map((part) => part[0]).join("").slice(0, 4).toUpperCase();
  }

  function renderAxes(axes) {
    els.dimensionList.replaceChildren(...axes.map((axis) => {
      const row = document.createElement("article");
      row.className = "dimension-row";
      row.style.setProperty("--axis-color", axis.color);
      row.style.setProperty("--marker", `${((axis.score + 100) / 200) * 100}%`);
      row.innerHTML = `
        <div class="dimension-title">
          <div><span>${axis.short}</span><strong>${state.lang === "zh" ? axis.nameZh : axis.nameEn}</strong></div>
          <b>${signed(axis.score)}</b>
        </div>
        <div class="axis-meta"><span>${sideText(axis, "negative")}</span><span>${sideText(axis, "positive")}</span></div>
        <div class="axis-track" aria-hidden="true"><i></i></div>
        <div class="dimension-foot">
          <span>${state.lang === "zh" ? "置信度" : "Confidence"} ${axis.confidence}%</span>
          <span>${state.lang === "zh" ? "重要性" : "Importance"} ${axis.importance}/5</span>
        </div>
      `;
      return row;
    }));
  }

  function renderMatches(matches) {
    const top = matches.slice(0, 12);
    els.matchList.replaceChildren(...top.map((entity) => {
      const row = document.createElement("article");
      row.className = "match-row";
      row.style.setProperty("--match", `${entity.match}%`);
      row.innerHTML = `
        <div class="match-head">
          <div><strong>${entity.name}</strong><span>${state.lang === "zh" ? entity.zh : entity.category}</span></div>
          <b>${entity.match}%</b>
        </div>
        <p>${state.lang === "zh" ? entity.noteZh : entity.noteEn}</p>
        <div class="heat-grid">
          ${heat("econ", entity.diffs.econ)}
          ${heat("culture", entity.diffs.culture)}
          ${heat("imm", entity.diffs.immigration)}
          ${heat("foreign", entity.diffs.foreign)}
          ${heat("climate", entity.diffs.climate)}
          ${heat("inst", entity.diffs.institutions)}
        </div>
        <i aria-hidden="true"></i>
      `;
      return row;
    }));
  }

  function heat(label, value) {
    return `<span style="--heat:${Math.min(value, 100)}%">${label} ${value}</span>`;
  }

  function renderInsights(result) {
    const strongest = [...result.axes].sort((a, b) => Math.abs(b.score) - Math.abs(a.score)).slice(0, 3);
    const mixed = result.axes.filter((axis) => Math.abs(axis.score) < 18 || axis.confidence < 42).slice(0, 4);
    const closest = result.matches[0];
    const lines = state.lang === "zh"
      ? [
          `最清晰的维度：${strongest.map((axis) => `${axis.short}(${signed(axis.score)})`).join("、")}。`,
          `最接近的参考对象是 ${closest.name}，但这只是本题库中的政策距离。`,
          mixed.length ? `混合或低置信度维度：${mixed.map((axis) => axis.short).join("、")}。` : "多数维度回答较稳定。",
        ]
      : [
          `Clearest dimensions: ${strongest.map((axis) => `${axis.short}(${signed(axis.score)})`).join(", ")}.`,
          `Closest reference: ${closest.name}, but this is only a policy distance within this item bank.`,
          mixed.length ? `Mixed or lower-confidence dimensions: ${mixed.map((axis) => axis.short).join(", ")}.` : "Most dimensions were relatively stable.",
        ];
    els.insightList.replaceChildren(...lines.map((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      return li;
    }));
  }

  function renderRadar(axes) {
    const canvas = els.radarCanvas;
    const size = Math.min(canvas.clientWidth || 460, 520);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const center = size / 2;
    const radius = size * 0.38;
    ctx.strokeStyle = "rgba(23,32,42,.15)";
    [0.25, 0.5, 0.75, 1].forEach((step) => {
      ctx.beginPath();
      ctx.arc(center, center, radius * step, 0, Math.PI * 2);
      ctx.stroke();
    });
    axes.forEach((axis, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / axes.length;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + Math.cos(angle) * radius, center + Math.sin(angle) * radius);
      ctx.stroke();
      ctx.fillStyle = "#17202a";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(axis.short, center + Math.cos(angle) * (radius + 20), center + Math.sin(angle) * (radius + 20));
    });
    const points = axes.map((axis, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / axes.length;
      const r = radius * (axis.score / 100);
      return { x: center + Math.cos(angle) * r, y: center + Math.sin(angle) * r, color: axis.color };
    });
    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    ctx.closePath();
    ctx.fillStyle = "rgba(65,87,183,.18)";
    ctx.strokeStyle = "rgba(65,87,183,.78)";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
    });
  }

  function renderSources() {
    els.sourceList.replaceChildren(...data.sources.map((source) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a>`;
      return li;
    }));
  }

  async function copySummary() {
    if (!state.result) return;
    const text = `${state.lang === "zh" ? state.result.tags[0].zh : state.result.tags[0].en}\n${state.result.matches.slice(0, 3).map((entity) => `${entity.name}: ${entity.match}%`).join("\n")}\n${t("resultDisclaimer")}`;
    await navigator.clipboard.writeText(text).catch(() => {});
    els.copyResult.textContent = state.lang === "zh" ? "已复制" : "Copied";
    setTimeout(() => (els.copyResult.textContent = t("copy")), 1400);
  }

  function exportPng() {
    if (!state.result) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f5f7fb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#17202a";
    ctx.font = "700 42px sans-serif";
    ctx.fillText(state.lang === "zh" ? "美国政治光谱测试" : "United States Political Spectrum Test", 64, 82);
    ctx.font = "800 56px sans-serif";
    ctx.fillText(state.lang === "zh" ? state.result.tags[0].zh : state.result.tags[0].en, 64, 165);
    ctx.font = "24px sans-serif";
    ctx.fillText(`${state.lang === "zh" ? "置信度" : "Confidence"} ${state.result.confidence}%`, 64, 215);
    const top = state.result.matches.slice(0, 3);
    ctx.font = "700 30px sans-serif";
    ctx.fillText(state.lang === "zh" ? "接近参照" : "Closest references", 64, 292);
    top.forEach((entity, index) => {
      const y = 344 + index * 72;
      ctx.fillStyle = "#4157b7";
      ctx.fillRect(64, y - 24, entity.match * 5, 18);
      ctx.fillStyle = "#17202a";
      ctx.font = "24px sans-serif";
      ctx.fillText(`${entity.name} ${entity.match}%`, 64, y + 20);
    });
    ctx.fillStyle = "#647084";
    ctx.font = "20px sans-serif";
    ctx.fillText(t("resultDisclaimer"), 64, 620);
    const link = document.createElement("a");
    link.download = "us-spectrum-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function axisText(axis) {
    return `${axis.short} / ${state.lang === "zh" ? axis.nameZh : axis.nameEn}: ${sideText(axis, "negative")} ←→ ${sideText(axis, "positive")}`;
  }

  function sideText(axis, side) {
    if (state.lang === "zh") return side === "negative" ? axis.negativeZh : axis.positiveZh;
    return side === "negative" ? axis.negativeEn : axis.positiveEn;
  }

  function signed(value) {
    return `${value > 0 ? "+" : ""}${Math.round(value)}`;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  window.addEventListener("resize", () => {
    if (state.result) renderRadar(state.result.axes);
  });
  document.addEventListener("DOMContentLoaded", init);
})();
