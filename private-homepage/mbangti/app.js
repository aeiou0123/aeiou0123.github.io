(function () {
  const data = window.MBANGTI_DATA;

  const state = {
    mode: null,
    questions: [],
    index: 0,
    answers: {},
  };

  const els = {};

  function query(id) {
    return document.getElementById(id);
  }

  function init() {
    if (!data) {
      document.body.classList.add("data-error");
      return;
    }

    els.quizPanel = query("quizPanel");
    els.resultPanel = query("resultPanel");
    els.modeLabel = query("modeLabel");
    els.questionCounter = query("questionCounter");
    els.progressBar = query("progressBar");
    els.axisLabel = query("axisLabel");
    els.questionText = query("questionText");
    els.choiceAText = query("choiceAText");
    els.choiceBText = query("choiceBText");
    els.answerScale = query("answerScale");
    els.prevQuestion = query("prevQuestion");
    els.answeredCount = query("answeredCount");
    els.restartTop = query("restartTop");
    els.restartBottom = query("restartBottom");
    els.resultType = query("resultType");
    els.resultTitle = query("resultTitle");
    els.confidenceText = query("confidenceText");
    els.dimensionList = query("dimensionList");
    els.primaryCharacters = query("primaryCharacters");
    els.adjacentText = query("adjacentText");
    els.adjacentCharacters = query("adjacentCharacters");
    els.stagePosition = query("stagePosition");
    els.whyList = query("whyList");
    els.unlikeList = query("unlikeList");

    document.querySelectorAll("[data-start-mode]").forEach((button) => {
      button.addEventListener("click", () => start(button.dataset.startMode));
    });

    els.prevQuestion.addEventListener("click", goBack);
    els.restartTop.addEventListener("click", resetToIntro);
    els.restartBottom.addEventListener("click", resetToIntro);
  }

  function start(modeKey) {
    const mode = data.modes[modeKey] || data.modes.daily;
    state.mode = mode;
    state.questions =
      mode.key === "daily"
        ? data.questions.filter((question) => question.quick)
        : data.questions.slice();
    state.index = 0;
    state.answers = {};

    document.body.classList.add("is-taking-quiz");
    els.resultPanel.classList.add("is-hidden");
    els.quizPanel.classList.remove("is-hidden");
    els.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    renderQuestion();
  }

  function renderQuestion() {
    const question = state.questions[state.index];
    const dim = data.dimensions[question.axis];
    const total = state.questions.length;
    const answered = Object.keys(state.answers).length;
    const progress = Math.max(((state.index + 1) / total) * 100, (answered / total) * 100);

    els.modeLabel.textContent = `${state.mode.kicker} · ${state.mode.description}`;
    els.questionCounter.textContent = `第 ${state.index + 1} 题 / ${total}`;
    els.progressBar.style.width = `${progress}%`;
    els.axisLabel.textContent = `${dim.label} · ${dim.left} / ${dim.right}`;
    els.axisLabel.title = dim.summary;
    els.questionText.textContent = question.prompt;
    els.choiceAText.textContent = question.a;
    els.choiceBText.textContent = question.b;
    els.answeredCount.textContent = `${answered} / ${total}`;
    els.prevQuestion.disabled = state.index === 0;

    els.answerScale.replaceChildren(
      ...data.answerScale.map((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scale-button";
        button.textContent = option.label;
        button.dataset.value = String(option.value);
        if (state.answers[question.id] === option.value) {
          button.classList.add("is-selected");
        }
        button.addEventListener("click", () => answer(option.value));
        return button;
      })
    );
  }

  function answer(value) {
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

  function resetToIntro() {
    document.body.classList.remove("is-taking-quiz");
    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.add("is-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showResult() {
    const result = calculateResult();
    const profile = data.results[result.type];
    const adjacentProfile = data.results[result.adjacentType];

    els.quizPanel.classList.add("is-hidden");
    els.resultPanel.classList.remove("is-hidden");
    els.resultType.textContent = result.type;
    els.resultTitle.textContent = profile.title;
    els.confidenceText.textContent = confidenceSentence(result);
    els.stagePosition.textContent = profile.stage;

    renderDimensions(result.axes);
    renderCharacters(els.primaryCharacters, profile.characters);
    renderCharacters(els.adjacentCharacters, adjacentProfile.characters);
    els.adjacentText.textContent = `${result.adjacentType} · ${adjacentProfile.title}。${result.adjacentReason}`;
    renderList(els.whyList, profile.why);
    renderList(els.unlikeList, profile.unlike);

    els.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function calculateResult() {
    const letterScores = {};
    Object.values(data.dimensions).forEach((dim) => {
      letterScores[dim.a] = 0;
      letterScores[dim.b] = 0;
    });

    state.questions.forEach((question) => {
      const answerValue = state.answers[question.id] || 0;
      const dim = data.dimensions[question.axis];

      if (answerValue > 0) {
        letterScores[dim.a] += answerValue;
      } else if (answerValue < 0) {
        letterScores[dim.b] += Math.abs(answerValue);
      }
    });

    const axes = Object.entries(data.dimensions).map(([axisKey, dim]) => {
      const leftScore = letterScores[dim.a];
      const rightScore = letterScores[dim.b];
      const total = leftScore + rightScore;
      const diff = Math.abs(leftScore - rightScore);
      const confidence = total === 0 ? 0 : diff / total;
      const chosen = leftScore >= rightScore ? dim.a : dim.b;
      const close = diff <= (state.mode.key === "daily" ? 2 : 3);

      return {
        key: axisKey,
        dim,
        leftScore,
        rightScore,
        total,
        diff,
        confidence,
        chosen,
        close,
      };
    });

    const type = axes.map((axis) => axis.chosen).join("");
    const lowestAxis = axes.reduce((lowest, axis) =>
      axis.confidence < lowest.confidence ? axis : lowest
    );
    const adjacentLetters = type.split("");
    const flipIndex = axes.indexOf(lowestAxis);
    adjacentLetters[flipIndex] =
      lowestAxis.chosen === lowestAxis.dim.a ? lowestAxis.dim.b : lowestAxis.dim.a;

    const overallConfidence =
      axes.reduce((sum, axis) => sum + axis.confidence, 0) / axes.length;
    const closeAxes = axes.filter((axis) => axis.close);

    return {
      type,
      axes,
      closeAxes,
      overallConfidence,
      adjacentType: adjacentLetters.join(""),
      adjacentReason: `${lowestAxis.dim.label} 这一维最接近，所以相邻回声会从这里翻面。`,
    };
  }

  function confidenceSentence(result) {
    const percent = Math.round(result.overallConfidence * 100);
    const closeText = result.closeAxes.length
      ? `接近混合的维度：${result.closeAxes.map((axis) => axis.dim.label).join("、")}。`
      : "四个维度分化比较清楚。";

    if (percent < 28) {
      return `匹配置信度 ${percent}%：这是低置信度结果，更适合当作混合倾向来看。${closeText}`;
    }

    if (percent < 52) {
      return `匹配置信度 ${percent}%：主类型可参考，但相邻回声也很重要。${closeText}`;
    }

    return `匹配置信度 ${percent}%：这个主类型比较稳定。${closeText}`;
  }

  function renderDimensions(axes) {
    els.dimensionList.replaceChildren(
      ...axes.map((axis) => {
        const row = document.createElement("div");
        const leftRatio = axis.total === 0 ? 50 : (axis.leftScore / axis.total) * 100;
        row.className = "dimension-row";
        row.style.setProperty("--left", `${leftRatio}%`);
        row.innerHTML = `
          <div class="dimension-meta">
            <span>${axis.dim.a} ${axis.dim.left}</span>
            <strong>${axis.dim.label}</strong>
            <span>${axis.dim.b} ${axis.dim.right}</span>
          </div>
          <div class="dimension-track">
            <span class="dimension-left"></span>
            <span class="dimension-mid"></span>
          </div>
          <div class="dimension-score">
            <span>${axis.leftScore}</span>
            <span>${axis.close ? "混合倾向" : axis.chosen}</span>
            <span>${axis.rightScore}</span>
          </div>
        `;
        return row;
      })
    );
  }

  function renderCharacters(container, characters) {
    container.replaceChildren(
      ...characters.map((character) => {
        const item = document.createElement("div");
        item.className = "character-chip";
        const name = document.createElement("strong");
        name.textContent = character.name;
        const note = document.createElement("span");
        note.textContent = character.note;
        item.append(name, note);
        return item;
      })
    );
  }

  function renderList(container, items) {
    container.replaceChildren(
      ...items.map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      })
    );
  }

  document.addEventListener("DOMContentLoaded", init);
})();
