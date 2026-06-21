(function () {
  const state = {
    data: window.FR_SPECTRUM_DATA,
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
      "quizPanel", "resultPanel", "modeLabel", "questionCounter", "progressBar", "axisLabel",
      "issueLabel", "questionText", "scaleRow", "prevQuestion", "skipQuestion", "answeredCount",
      "restartTop", "restartBottom", "resultTitle", "resultSummary", "confidenceText",
      "copyResult", "exportPng", "tagList", "radarCanvas", "coordinateTabs", "coordinateMap",
      "mapXAxis", "mapYAxis", "mapLegend", "interpretationGrid", "dimensionList",
      "matchViewTabs", "matchList", "heatmap", "strongestList", "sourceList",
    ].forEach((id) => {
      els[id] = query(id);
    });

    state.axisById = new Map(state.data.axes.map((axis) => [axis.id, axis]));
    state.coordView = state.data.coordinateViews[0].id;
    renderSources();

    document.querySelectorAll("[data-start-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.startMode));
    });
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
    state.coordView = state.data.coordinateViews[0].id;
    els.quizPanel.classList.remove("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    renderQuestion();
  }

  function reset() {
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.classList.add("is-hidden");
    state.mode = null;
    state.questions = [];
    state.index = 0;
    state.answers = {};
    state.result = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    const overallConfidence = Math.round(
      average(Object.values(axisStats).map((stats) => stats.confidence)),
    );
    const label = selectLabel(scores);
    const matches = buildMatches(scores, state.matchView);
    const strongSignals = buildStrongSignals(scores);
    return { scores, axisStats, overallConfidence, label, matches, strongSignals };
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
    if (typeof rule.min === "number" && value < rule.min) {
      fit = Math.min(fit, clamp(1 - (rule.min - value) / 34, 0, 1));
    }
    if (typeof rule.max === "number" && value > rule.max) {
      fit = Math.min(fit, clamp(1 - (value - rule.max) / 34, 0, 1));
    }
    return fit;
  }

  function buildMatches(scores, viewId) {
    const view = state.data.matchViews.find((item) => item.id === viewId) || state.data.matchViews[0];
    const axes = view.axes;
    return state.data.profiles
      .map((profile) => {
        const diffs = axes.map((axisId) => {
          const axis = state.axisById.get(axisId);
          const diff = Math.abs((scores[axisId] ?? 50) - profile.scores[axisId]);
          return { axis, diff };
        });
        const distance = Math.sqrt(diffs.reduce((sum, item) => sum + item.diff ** 2, 0));
        const maxDistance = Math.sqrt(axes.length * 100 ** 2);
        const similarity = clamp(100 - (distance / maxDistance) * 100, 0, 100);
        return {
          profile,
          diffs,
          distance,
          similarity,
          closestAxes: [...diffs].sort((a, b) => a.diff - b.diff).slice(0, 2),
          largestDiffs: [...diffs].sort((a, b) => b.diff - a.diff).slice(0, 2),
        };
      })
      .sort((a, b) => b.similarity - a.similarity);
  }

  function buildStrongSignals(scores) {
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
    els.confidenceText.textContent = `置信度 ${result.overallConfidence}/100 · 党派/派系坐标为首版启发式估计，仅供参考。`;
    els.tagList.replaceChildren(
      ...[
        ...result.label.tags,
        `最接近：${result.matches[0]?.profile.name || "暂无"}`,
        `模式：${state.mode.label}`,
      ].map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
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
    const radius = size * 0.35;
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
      ctx.font = `${size < 400 ? 10 : 11}px Microsoft YaHei, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(axis.short, cx + Math.cos(angle) * (radius + 22), cy + Math.sin(angle) * (radius + 22));
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
    const view = state.data.coordinateViews.find((item) => item.id === state.coordView) ||
      state.data.coordinateViews[0];
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
    return {
      x: averageAxis(scores, view.xAxes),
      y: averageAxis(scores, view.yAxes),
    };
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
      left: "#cf5549",
      ecologist: "#2f8f6f",
      center: "#435bb8",
      "center-right": "#8f6b2f",
      right: "#b47a18",
      "national-right": "#5b4b88",
      regional: "#247c9b",
    }[camp] || "#5f7891";
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
        title: "经济/福利",
        text: describeEconomy(scores),
      },
      {
        title: "欧洲/身份/秩序",
        text: describeIdentityOrder(scores),
      },
      {
        title: "生态/制度/外交",
        text: describeEcologyInstitution(scores),
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

  function describeEconomy(scores) {
    const econ = scores.D1 >= 68 ? "经济上明显偏市场、财政纪律和供给侧改革" : scores.D1 <= 35 ? "经济上明显偏福利国家、再分配和劳动保护" : "经济分配立场较折中";
    const local = scores.D8 >= 68 ? "同时重视地方社会和基层自治" : scores.D8 <= 35 ? "更信任中央国家规划与统一公共服务" : "国家能力与地方自治之间保持平衡";
    return `${econ}；${local}。`;
  }

  function describeIdentityOrder(scores) {
    const eu = scores.D2 >= 68 ? "欧洲/主权上更强调法国边界和政策自主" : scores.D2 <= 35 ? "欧洲/主权上偏亲欧一体化与开放合作" : "对欧盟与国家主权保持条件式态度";
    const identity = scores.D3 >= 68 ? "身份上更重视同化、世俗主义和共和国共同体" : scores.D3 <= 35 ? "身份上更重视多元主义、反歧视和少数群体表达" : "身份议题上较中间";
    const order = scores.D4 >= 68 ? "治安上倾向国家权威和强执法" : scores.D4 <= 35 ? "治安上更重视公民自由、程序和警察监督" : "秩序和自由之间较谨慎折中";
    return `${eu}，${identity}，${order}。`;
  }

  function describeEcologyInstitution(scores) {
    const ecology = scores.D5 >= 68 ? "生态上更重视工业、核能、农业和能源价格现实" : scores.D5 <= 35 ? "生态上更重视气候约束、需求转型和地方环境评估" : "生态与生产之间保留现实折中";
    const institution = scores.D6 >= 68 ? "制度上偏公投、直接授权和反精英政治" : scores.D6 <= 35 ? "制度上偏议会协商、专家评估和中介组织" : "制度改革态度不极端";
    const foreign = scores.D7 >= 68 ? "外交上更偏战略自主、反干预和降低对北约依赖" : scores.D7 <= 35 ? "外交上更偏欧盟/北约协调和支持乌克兰" : "外交战略上较务实摇摆";
    return `${ecology}；${institution}；${foreign}。`;
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
          renderCoordinateMap();
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
    els.strongestList.replaceChildren(
      ...state.result.strongSignals.map((text) => {
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
    const text = `法国政治光谱测试：${state.result.label.name}\n${state.result.label.summary}\n置信度：${state.result.overallConfidence}/100\n接近参照：${top}\n维度：${axes}\n结果仅供参考，不构成投票建议。`;
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
    canvas.height = 1300;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f5f7fb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#17202a";
    ctx.font = "900 38px Microsoft YaHei, sans-serif";
    ctx.fillText("法国政治光谱测试", 72, 82);
    ctx.font = "800 34px Microsoft YaHei, sans-serif";
    wrapText(ctx, state.result.label.name, 72, 142, 1056, 42);
    ctx.fillStyle = "#344154";
    ctx.font = "20px Microsoft YaHei, sans-serif";
    const nextY = wrapText(ctx, state.result.label.summary, 72, 196, 1056, 30);
    ctx.fillStyle = "#627086";
    ctx.font = "18px Microsoft YaHei, sans-serif";
    ctx.fillText(`置信度 ${state.result.overallConfidence}/100 · 结果仅供参考，不构成投票建议`, 72, nextY + 32);

    let y = nextY + 86;
    state.data.axes.forEach((axis) => {
      const value = state.result.scores[axis.id];
      ctx.fillStyle = "#17202a";
      ctx.font = "700 18px Microsoft YaHei, sans-serif";
      ctx.fillText(`${axis.id} ${axis.name}`, 72, y);
      ctx.fillStyle = "#e4e9ef";
      roundRect(ctx, 306, y - 17, 690, 16, 8);
      ctx.fill();
      const gradient = ctx.createLinearGradient(306, 0, 996, 0);
      gradient.addColorStop(0, "#cf5549");
      gradient.addColorStop(0.52, axis.color);
      gradient.addColorStop(1, "#2f8f6f");
      ctx.fillStyle = gradient;
      roundRect(ctx, 306, y - 17, 690 * (value / 100), 16, 8);
      ctx.fill();
      ctx.fillStyle = "#17202a";
      ctx.font = "900 19px Microsoft YaHei, sans-serif";
      ctx.fillText(String(value), 1028, y);
      y += 52;
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
    wrapText(ctx, state.data.methodNote, 72, 1212, 1056, 28);

    const link = document.createElement("a");
    link.download = "fr-spectrum-result.png";
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
