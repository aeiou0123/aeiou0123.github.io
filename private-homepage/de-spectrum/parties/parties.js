(function () {
  const data = window.DE_SPECTRUM_DATA;
  let region = "Germany";
  let status = "all";
  const els = {
    regionFilters: document.getElementById("regionFilters"),
    statusFilters: document.getElementById("statusFilters"),
    head: document.getElementById("partyTableHead"),
    body: document.getElementById("partyTableBody"),
    sources: document.getElementById("sourceList"),
  };

  const statusOptions = [
    { id: "all", label: "全部" },
    { id: "bundestag", label: "联邦议院" },
    { id: "extra_parliamentary", label: "院外主流" },
    { id: "minor_party", label: "小党" },
    { id: "minority_party", label: "少数民族党" },
    { id: "faction", label: "派系参照" },
  ];

  function init() {
    renderFilters();
    renderTable();
    renderSources();
  }

  function renderFilters() {
    els.regionFilters.replaceChildren(
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

    els.statusFilters.replaceChildren(
      ...statusOptions.map((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab-button";
        if (item.id === status) button.classList.add("is-active");
        button.textContent = item.label;
        button.addEventListener("click", () => {
          status = item.id;
          renderFilters();
          renderTable();
        });
        return button;
      }),
    );
  }

  function renderTable() {
    const view = data.regionViews.find((item) => item.id === region);
    const profiles = data.profiles
      .filter((profile) => profile.regions.some((item) => view.profileRegions.includes(item)))
      .filter((profile) => status === "all" || profile.status === status)
      .sort((a, b) => {
        const boostA = a.regionAffinity?.[region] || 0;
        const boostB = b.regionAffinity?.[region] || 0;
        return boostB - boostA || b.confidence - a.confidence || a.name.localeCompare(b.name);
      });
    els.head.innerHTML = `
      <tr>
        <th>参照对象</th>
        <th>类型</th>
        <th>地区</th>
        <th>置信/不确定</th>
        ${data.axes.map((axis) => `<th>${axis.short}</th>`).join("")}
      </tr>
    `;
    els.body.replaceChildren(
      ...profiles.map((profile) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${profile.name}</strong><small>${profile.note}</small></td>
          <td><span class="status-pill">${profile.status}</span></td>
          <td><div class="pill-list">${profile.regions.map((item) => `<span>${item}</span>`).join("")}</div></td>
          <td><span class="status-pill">${profile.confidence}/100 · ±${profile.uncertainty}</span></td>
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
