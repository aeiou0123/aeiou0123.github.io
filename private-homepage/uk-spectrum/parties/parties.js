(function () {
  const data = window.UK_SPECTRUM_DATA;
  let region = "UK";
  const els = {
    filters: document.getElementById("regionFilters"),
    head: document.getElementById("partyTableHead"),
    body: document.getElementById("partyTableBody"),
    sources: document.getElementById("sourceList"),
  };

  function init() {
    renderFilters();
    renderTable();
    renderSources();
  }

  function renderFilters() {
    els.filters.replaceChildren(
      ...data.regionViews.map((view) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab-button";
        if (view.id === region) button.classList.add("is-active");
        button.textContent = view.label;
        button.addEventListener("click", () => {
          region = view.id;
          renderFilters();
          renderTable();
        });
        return button;
      }),
    );
  }

  function renderTable() {
    const view = data.regionViews.find((item) => item.id === region);
    const profiles = data.profiles.filter((profile) =>
      profile.regions.some((item) => view.profileRegions.includes(item)),
    );
    els.head.innerHTML = `
      <tr>
        <th>参照对象</th>
        <th>地区</th>
        <th>置信度</th>
        ${data.axes.map((axis) => `<th>${axis.id}</th>`).join("")}
      </tr>
    `;
    els.body.replaceChildren(
      ...profiles.map((profile) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${profile.name}</strong><small>${profile.note}</small></td>
          <td><div class="pill-list">${profile.regions.map((item) => `<span>${item}</span>`).join("")}</div></td>
          <td><span class="status-pill">${profile.confidence}/100${profile.stability === "low" ? " low" : ""}</span></td>
          ${data.axes.map((axis) => `<td>${profile.scores[axis.id]}</td>`).join("")}
        `;
        return tr;
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
