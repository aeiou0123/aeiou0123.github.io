(function () {
  const data = window.JP_SPECTRUM_DATA;

  const state = {
    mode: null,
    questions: [],
    index: 0,
    answers: {},
    result: null,
  };

  const els = {};
  const dimensionById = new Map(data.dimensions.map((dimension) => [dimension.id, dimension]));

  function query(id) {
    return document.getElementById(id);
  }

  function init() {
    [
      "quizPanel",
      "resultPanel",
      "modeLabel",
      "questionCounter",
      "progressBar",
      "axisLabel",
      "issueLabel",
      "questionText",
      "scaleRow",
      "prevQuestion",
      "skipQuestion",
      "answeredCount",
      "restartTop",
      "restartBottom",
      "resultKicker",
      "resultTitle",
      "resultSummary",
      "confidenceText",
      "tagList",
      "dimensionList",
      "partyList",
      "insightList",
      "sourceList",
      "copyResult",
      "radarCanvas",
      "compassPoint",
      "compassLabel",
      "economyScore",
      "securityScore",
    ].forEach((id) => {
      els[id] = query(id);
    });

    document.querySelectorAll("[data-start-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.startMode));
    });

    els.prevQuestion.addEventListener("click", goBack);
    els.skipQuestion.addEventListener("click", () => recordAnswer(null));
    els.restartTop.addEventListener("click", resetToStart);
    els.restartBottom.addEventListener("click", resetToStart);
    els.copyResult.addEventListener("click", copyResult);

    renderSources();
  }

  function start(modeKey) {
    const mode = data.modes[modeKey] || data.modes.quick;
    state.mode = mode;
    state.questions = selectQuestions(mode.perAxis);
    state.index = 0;
    state.answers = {};
    state.result = null;

    document.body.classList.add("is-taking");
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.classList.remove("is-hidden");
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    renderQuestion();
  }

  function selectQuestions(perAxis) {
    const buckets = data.dimensions.map((dimension) =>
      data.questions
        .filter((question) => question.dimension === dimension.id)
        .slice(0, perAxis)
    );

    const interleaved = [];
    for (let i = 0; i < perAxis; i += 1) {
      buckets.forEach((bucket) => {
        if (bucket[i]) {
          interleaved.push(bucket[i]);
        }
      });
    }
    return interleaved;
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    const dimension = dimensionById.get(question.dimension);
    const total = state.questions.length;
    const done = answeredEntries().length;
    const progress = (state.index / total) * 100;

    els.modeLabel.textContent = `${state.mode.label} / ${state.mode.description}`;
    els.questionCounter.textContent = `第 ${state.index + 1} 题 / ${total}`;
    els.progressBar.style.width = `${progress}%`;
    els.axisLabel.textContent = `${dimension.name}: ${dimension.negative} ←→ ${dimension.positive}`;
    els.axisLabel.style.setProperty("--axis-color", dimension.color);
    els.issueLabel.textContent = question.issue;
    els.questionText.textContent = question.text;
    els.answeredCount.textContent = `${done} / ${total}`;
    els.prevQuestion.disabled = state.index === 0;

    els.scaleRow.replaceChildren(
      ...data.scale.map((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scale-button";
        button.dataset.value = String(option.value);
        button.title = option.title;
        button.innerHTML = `<span>${option.label}</span><small>${option.title}</small>`;
        if (state.answers[question.id] === option.value) {
          button.classList.add("is-selected");
        }
        button.addEventListener("click", () => recordAnswer(option.value));
        return button;
      })
    );
  }

  function recordAnswer(value) {
    const question = state.questions[state.index];
    state.answers[question.id] = value;

    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
      return;
    }

    showResult();
  }

  function goBack() {
    if (state.index === 0) {
      return;
    }
    state.index -= 1;
    renderQuestion();
  }

  function resetToStart() {
    state.mode = null;
    state.questions = [];
    state.index = 0;
    state.answers = {};
    state.result = null;
    document.body.classList.remove("is-taking");
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function answeredEntries() {
    return Object.entries(state.answers).filter(([, value]) => value !== undefined);
  }

  function showResult() {
    state.result = calculateResult();
    const result = state.result;

    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.remove("is-hidden");
    els.resultKicker.textContent = `${state.mode.label} / ${answeredEntries().length} 个有效或跳过响应`;
    els.resultTitle.textContent = result.primaryTag.title;
    els.resultSummary.textContent = result.primaryTag.summary;
    els.confidenceText.textContent = confidenceSentence(result);

    renderTags(result.tags);
    renderDimensions(result.dimensions);
    renderCompass(result);
    renderRadar(result.dimensions);
    renderParties(result.parties);
    renderInsights(result.insights);

    els.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function calculateResult() {
    const dimensions = data.dimensions.map((dimension) => {
      const questions = state.questions.filter((question) => question.dimension === dimension.id);
      let weighted = 0;
      let answered = 0;
      let skipped = 0;
      let sumAbs = 0;
      let neutrals = 0;

      questions.forEach((question) => {
        const answer = state.answers[question.id];
        if (answer === null) {
          skipped += 1;
          return;
        }
        if (answer === undefined) {
          return;
        }
        const z = (answer - 5) / 4;
        weighted += z * question.direction;
        sumAbs += Math.abs(z);
        if (answer === 5) {
          neutrals += 1;
        }
        answered += 1;
      });

      const score = answered ? Math.round((weighted / answered) * 100) : 0;
      const answeredRatio = questions.length ? answered / questions.length : 0;
      const consistency = sumAbs ? Math.abs(weighted) / sumAbs : 0;
      const intensity = answered ? sumAbs / answered : 0;
      const confidence = Math.round(
        100 * answeredRatio * (0.28 + 0.52 * consistency + 0.2 * intensity)
      );

      return {
        ...dimension,
        questions: questions.length,
        answered,
        skipped,
        neutrals,
        score: clamp(score, -100, 100),
        confidence: clamp(confidence, 0, 100),
        consistency,
        intensity,
      };
    });

    const scoreMap = Object.fromEntries(dimensions.map((dimension) => [dimension.id, dimension.score]));
    const economy = average([scoreMap.welfare, scoreMap.fiscal, scoreMap.industry]);
    const security = average([scoreMap.security, scoreMap.diplomacy]);
    const socialLiberal = -average([scoreMap.social, scoreMap.immigration, scoreMap.liberty]);
    const confidence = Math.round(average(dimensions.map((dimension) => dimension.confidence)));
    const tags = buildTags(scoreMap, economy, security, socialLiberal);
    const parties = calculatePartyMatches(scoreMap);
    const insights = buildInsights(dimensions, economy, security, socialLiberal);

    return {
      dimensions,
      scoreMap,
      economy,
      security,
      socialLiberal,
      confidence,
      tags,
      primaryTag: tags[0],
      parties,
      insights,
    };
  }

  function average(values) {
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function buildTags(scores, economy, security, socialLiberal) {
    const tags = [];

    if (scores.welfare < -42 && scores.security < -25) {
      tags.push({
        title: "福利和平主义型",
        summary: "你更重视再分配、公共服务和宪法约束，对安保正常化保持谨慎。",
      });
    }
    if (scores.welfare < -45 && scores.fiscal < -45) {
      tags.push({
        title: "反紧缩福利型",
        summary: "你倾向用财政扩张、减税或给付来处理生活成本和社会保障压力。",
      });
    }
    if (scores.industry < -35 && scores.security > 25) {
      tags.push({
        title: "国家发展主义型",
        summary: "你支持国家主导关键产业，同时接受更强的安保能力和经济安全政策。",
      });
    }
    if (scores.local < -42 && scores.welfare > 0 && scores.security > 20) {
      tags.push({
        title: "改革保守型",
        summary: "你偏好地方分权、行政改革和市场纪律，同时在安保上较现实主义。",
      });
    }
    if (socialLiberal > 42 && Math.abs(economy) < 35 && Math.abs(security) < 35) {
      tags.push({
        title: "社会自由中道型",
        summary: "你的核心特征是社会自由和权利平等，经济与安保议题相对中间。",
      });
    }
    if (scores.local < -40 && socialLiberal > 28) {
      tags.push({
        title: "地方改革自由派",
        summary: "你同时看重地方自治、行政改革和社会多样性。",
      });
    }
    if (scores.social > 42 && scores.security > 42 && scores.immigration > 42) {
      tags.push({
        title: "传统保守国家型",
        summary: "你重视传统制度、国民共同体边界和安全正常化。",
      });
    }
    if (scores.energy < -50 && scores.security < -20) {
      tags.push({
        title: "绿色和平主义型",
        summary: "你在能源上偏脱碳慎核，在安保上也更倾向克制和外交优先。",
      });
    }
    if (scores.energy > 45 && scores.security > 20) {
      tags.push({
        title: "能源安全现实型",
        summary: "你把稳定电力、产业成本和安全环境作为政策判断的重要基础。",
      });
    }

    if (!tags.length) {
      tags.push({
        title: "现实主义混合型",
        summary: "你的回答呈现议题组合而不是单一左右标签，适合逐轴查看具体分歧。",
      });
    }

    tags.push({
      title: `经济 ${formatSigned(economy)} / 安保 ${formatSigned(security)}`,
      summary: "这是二维主图坐标，不替代下方 10 个维度。",
    });

    return tags.slice(0, 4);
  }

  function calculatePartyMatches(scoreMap) {
    return data.partyPositions
      .map((party) => {
        const values = data.dimensions.map((dimension) => {
          const diff = scoreMap[dimension.id] - party.scores[dimension.id];
          return diff * diff;
        });
        const distance = Math.sqrt(values.reduce((sum, value) => sum + value, 0) / values.length);
        const match = clamp(Math.round(100 * (1 - distance / 200)), 0, 100);
        return { ...party, distance, match };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 6);
  }

  function buildInsights(dimensions, economy, security, socialLiberal) {
    const strongest = [...dimensions].sort((a, b) => Math.abs(b.score) - Math.abs(a.score)).slice(0, 3);
    const weakest = [...dimensions].sort((a, b) => a.confidence - b.confidence).slice(0, 2);
    const mixed = dimensions.filter((dimension) => dimension.confidence < 42 || Math.abs(dimension.score) < 16);
    const insights = [];

    insights.push(
      `最清晰的维度是 ${strongest
        .map((dimension) => `${dimension.short}(${formatSigned(dimension.score)})`)
        .join("、")}。`
    );
    insights.push(
      `二维主图上，你位于经济 ${formatSigned(economy)}、安保 ${formatSigned(security)}；社会自由指数约为 ${formatSigned(socialLiberal)}。`
    );

    if (mixed.length) {
      insights.push(
        `混合或低置信度维度：${mixed
          .slice(0, 4)
          .map((dimension) => dimension.short)
          .join("、")}。这些议题最好不要用单一标签概括。`
      );
    }

    if (weakest.some((dimension) => dimension.skipped > 0)) {
      insights.push(
        `跳题会降低置信度；本次低置信度轴包括 ${weakest
          .map((dimension) => dimension.short)
          .join("、")}。`
      );
    }

    return insights;
  }

  function confidenceSentence(result) {
    if (result.confidence < 35) {
      return `总体置信度 ${result.confidence}%。你可能选了较多中立或跳过，结果适合当作模糊倾向。`;
    }
    if (result.confidence < 62) {
      return `总体置信度 ${result.confidence}%。主标签可参考，但请优先看各维度的具体位置。`;
    }
    return `总体置信度 ${result.confidence}%。本次回答在多数维度上比较稳定。`;
  }

  function renderTags(tags) {
    els.tagList.replaceChildren(
      ...tags.map((tag) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${tag.title}</strong><span>${tag.summary}</span>`;
        return item;
      })
    );
  }

  function renderDimensions(dimensions) {
    els.dimensionList.replaceChildren(
      ...dimensions.map((dimension) => {
        const row = document.createElement("article");
        const marker = ((dimension.score + 100) / 200) * 100;
        row.className = "dimension-row";
        row.style.setProperty("--axis-color", dimension.color);
        row.style.setProperty("--marker", `${marker}%`);
        row.innerHTML = `
          <div class="dimension-title">
            <div>
              <span>${dimension.short}</span>
              <strong>${dimension.name}</strong>
            </div>
            <b>${formatSigned(dimension.score)}</b>
          </div>
          <div class="axis-meta">
            <span>${dimension.negative}</span>
            <span>${dimension.positive}</span>
          </div>
          <div class="axis-track" aria-hidden="true"><i></i></div>
          <div class="dimension-foot">
            <span>置信度 ${dimension.confidence}%</span>
            <span>${dimension.answered}/${dimension.questions} 题有效，跳过 ${dimension.skipped}</span>
          </div>
        `;
        return row;
      })
    );
  }

  function renderCompass(result) {
    const x = ((result.economy + 100) / 200) * 100;
    const y = 100 - ((result.security + 100) / 200) * 100;
    els.compassPoint.style.left = `${clamp(x, 4, 96)}%`;
    els.compassPoint.style.top = `${clamp(y, 4, 96)}%`;
    els.compassLabel.textContent = result.primaryTag.title;
    els.economyScore.textContent = formatSigned(result.economy);
    els.securityScore.textContent = formatSigned(result.security);
  }

  function renderRadar(dimensions) {
    const canvas = els.radarCanvas;
    const size = Math.min(canvas.clientWidth || 420, 520);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const center = size / 2;
    const radius = size * 0.38;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(26, 32, 44, 0.14)";
    ctx.fillStyle = "#f7fafc";

    [0.25, 0.5, 0.75, 1].forEach((step) => {
      ctx.beginPath();
      ctx.arc(center, center, radius * step, 0, Math.PI * 2);
      ctx.stroke();
    });

    dimensions.forEach((dimension, index) => {
      const angle = angleFor(index, dimensions.length);
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.fillStyle = "#1a202c";
      ctx.font = "12px sans-serif";
      ctx.textAlign = x < center - 8 ? "right" : x > center + 8 ? "left" : "center";
      ctx.textBaseline = y < center ? "bottom" : "top";
      ctx.fillText(dimension.short, center + Math.cos(angle) * (radius + 18), center + Math.sin(angle) * (radius + 18));
    });

    const points = dimensions.map((dimension, index) => {
      const angle = angleFor(index, dimensions.length);
      const signedRadius = radius * (dimension.score / 100);
      return {
        x: center + Math.cos(angle) * signedRadius,
        y: center + Math.sin(angle) * signedRadius,
        color: dimension.color,
      };
    });

    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(65, 87, 183, 0.18)";
    ctx.strokeStyle = "rgba(65, 87, 183, 0.78)";
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

  function angleFor(index, total) {
    return -Math.PI / 2 + (Math.PI * 2 * index) / total;
  }

  function renderParties(parties) {
    els.partyList.replaceChildren(
      ...parties.map((party) => {
        const item = document.createElement("article");
        item.className = "party-row";
        item.style.setProperty("--match", `${party.match}%`);
        item.innerHTML = `
          <div>
            <strong>${party.name}</strong>
            <span>${party.note}</span>
          </div>
          <b>${party.match}%</b>
          <i aria-hidden="true"></i>
        `;
        return item;
      })
    );
  }

  function renderInsights(insights) {
    els.insightList.replaceChildren(
      ...insights.map((insight) => {
        const li = document.createElement("li");
        li.textContent = insight;
        return li;
      })
    );
  }

  function renderSources() {
    els.sourceList.replaceChildren(
      ...data.sources.map((source) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a><span>${source.note}</span>`;
        return li;
      })
    );
  }

  async function copyResult() {
    if (!state.result) {
      return;
    }
    const text = [
      "日本政治・社会価値観スペクトラム診断",
      `主标签：${state.result.primaryTag.title}`,
      `经济：${formatSigned(state.result.economy)} / 安保：${formatSigned(state.result.security)} / 置信度：${state.result.confidence}%`,
      data.meta.disclaimer,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      els.copyResult.textContent = "已复制";
      window.setTimeout(() => {
        els.copyResult.textContent = "复制结果摘要";
      }, 1600);
    } catch (error) {
      els.copyResult.textContent = "复制失败";
      window.setTimeout(() => {
        els.copyResult.textContent = "复制结果摘要";
      }, 1600);
    }
  }

  function formatSigned(value) {
    return `${value > 0 ? "+" : ""}${Math.round(value)}`;
  }

  window.addEventListener("resize", () => {
    if (state.result) {
      renderRadar(state.result.dimensions);
    }
  });

  document.addEventListener("DOMContentLoaded", init);
})();
