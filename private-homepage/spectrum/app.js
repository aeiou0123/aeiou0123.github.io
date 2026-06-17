(function () {
  const registry = window.SPECTRUM_REGISTRY || [];

  function render() {
    const available = document.getElementById("availableList");
    const future = document.getElementById("futureList");
    const count = document.getElementById("testCount");
    const availableItems = registry.filter((item) => item.status === "available");
    const futureItems = registry.filter((item) => item.status !== "available");

    count.textContent = `${availableItems.length} online / ${futureItems.length} planned`;
    available.replaceChildren(...availableItems.map(card));
    future.replaceChildren(...futureItems.map(card));
  }

  function card(item) {
    const article = document.createElement("article");
    article.className = `test-card ${item.status}`;
    const statusText = item.status === "available" ? "available" : item.status;
    const href = item.status === "available" ? item.href : "#future";
    article.innerHTML = `
      <div class="card-top">
        <span>${item.region}</span>
        <b>${statusText}</b>
      </div>
      <h3>${item.title_zh}</h3>
      <p class="en-title">${item.title_en}</p>
      <p>${item.summary}</p>
      <div class="meta-row">
        <span>${item.axis_count ? `${item.axis_count} 轴` : "轴待定"}</span>
        <span>${item.question_count ? `${item.question_count} 题` : "题库待定"}</span>
        <span>${item.languages.join(" / ")}</span>
      </div>
      <a href="${href}" aria-disabled="${item.status !== "available"}">${item.status === "available" ? "进入测试" : "预留位置"}</a>
    `;
    return article;
  }

  document.addEventListener("DOMContentLoaded", render);
})();
