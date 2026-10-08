(function () {
  const storageKey = "de-spectrum-last-result-v1";
  const data = window.DE_SPECTRUM_DATA;
  const els = {
    status: document.getElementById("lastResultStatus"),
    preview: document.getElementById("resultPreview"),
    exportJson: document.getElementById("exportJson"),
    exportCsv: document.getElementById("exportCsv"),
    clearResult: document.getElementById("clearResult"),
    schema: document.getElementById("schemaBody"),
    sources: document.getElementById("sourceList"),
  };

  function init() {
    els.exportJson.addEventListener("click", exportJson);
    els.exportCsv.addEventListener("click", exportCsv);
    els.clearResult.addEventListener("click", clearResult);
    renderSchema();
    renderSources();
    renderLastResult();
  }

  function getLastResult() {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (_) {
      return null;
    }
  }

  function renderLastResult() {
    const result = getLastResult();
    if (!result) {
      els.status.textContent = "当前浏览器还没有德国测试结果。完成一次测试后回到这里即可导出。";
      els.preview.textContent = "";
      els.exportJson.disabled = true;
      els.exportCsv.disabled = true;
      return;
    }
    els.exportJson.disabled = false;
    els.exportCsv.disabled = false;
    els.status.textContent = `最近结果：${result.label.name} · ${result.regionView} · ${result.confidence}/100 · ${new Date(result.savedAt).toLocaleString()}`;
    els.preview.textContent = JSON.stringify(result, null, 2);
  }

  function renderSchema() {
    const rows = [
      ["axes", "id/name/short/poles/weight", `${data.axes.length} 个德国政治维度和默认匹配权重。`],
      ["topics", "id/axis/title/summary", `${data.topics.length} 个议题块，每块 10 题。`],
      ["questions", "id/topic/axis/textZh/polarity/tags", `${data.questions.length} 题；反向题通过 polarity 修正。`],
      ["profiles", "scores/status/confidence/uncertainty", `${data.profiles.length} 个党派、派系、小党和少数民族党参照。`],
      ["regionViews", "profileRegions/note", "德国全国、东部、西部、城市、乡村解释视角。"],
      ["coalitionViews", "members/note", `${data.coalitionViews.length} 个联盟相容性组合。`],
      ["matchViews", "axes", "用于排除欧盟/外交、只看经济财政等对照重算。"],
    ];
    els.schema.replaceChildren(
      ...rows.map(([object, fields, note]) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${object}</td><td>${fields}</td><td>${note}</td>`;
        return tr;
      }),
    );
  }

  function exportJson() {
    const result = getLastResult();
    if (!result) return;
    download("de-spectrum-result.json", "application/json", JSON.stringify(result, null, 2));
  }

  function exportCsv() {
    const result = getLastResult();
    if (!result) return;
    const rows = [
      ["field", "value"],
      ["savedAt", result.savedAt],
      ["version", result.version],
      ["label", result.label.name],
      ["regionView", result.regionView],
      ["confidence", result.confidence],
      ...Object.entries(result.scores).map(([axis, value]) => [`score_${axis}`, value]),
      ...Object.entries(result.weights).map(([axis, value]) => [`weight_${axis}`, value]),
      ...result.matches.map((match, index) => [`match_${index + 1}`, `${match.name} ${match.similarity}`]),
      ...result.coalitions.map((coalition, index) => [`coalition_${index + 1}`, `${coalition.name} ${coalition.similarity}`]),
      ["importantQuestions", result.importantQuestions.join(" ")],
    ];
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    download("de-spectrum-result.csv", "text/csv", csv);
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function clearResult() {
    localStorage.removeItem(storageKey);
    renderLastResult();
  }

  function download(filename, type, content) {
    const blob = new Blob([content], { type });
    const link = document.createElement("a");
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
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
