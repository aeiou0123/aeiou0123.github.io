(function () {
  const data = window.DE_SPECTRUM_DATA;
  const els = {
    grid: document.getElementById("issueGrid"),
    sources: document.getElementById("sourceList"),
  };

  function init() {
    renderIssues();
    renderSources();
  }

  function renderIssues() {
    const axisById = new Map(data.axes.map((axis) => [axis.id, axis]));
    els.grid.replaceChildren(
      ...data.issueExplanations.map((issue) => {
        const axis = axisById.get(issue.axis);
        const card = document.createElement("article");
        card.className = "issue-card";
        card.style.setProperty("--axis-color", axis.color);
        const questions = data.questions.filter((question) => question.topic === issue.id);
        const positive = questions.filter((question) => question.polarity === 1).length;
        const reverse = questions.length - positive;
        card.innerHTML = `
          <div class="card-top">
            <span>${issue.id}</span>
            <b>${axis.short}</b>
          </div>
          <h3>${issue.title}</h3>
          <p>${issue.summary}</p>
          <p class="issue-meta">${questions.length} 题 · 正向 ${positive} · 反向 ${reverse} · ${axis.negativeLabel} ←→ ${axis.positiveLabel}</p>
          <ul>${issue.examples.map((text) => `<li>${text}</li>`).join("")}</ul>
        `;
        return card;
      }),
    );
  }

  function renderSources() {
    els.sources.replaceChildren(
      ...data.sources.map((source) => {
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

  document.addEventListener("DOMContentLoaded", init);
})();
