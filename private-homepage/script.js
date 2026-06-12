const statusLines = [
  "正在整理主页，把学术外的自己也放上网。",
  "今天适合做一个有贴纸、有舞台灯、有碎碎念的网站。",
  "未完成也可以先上架，之后再慢慢打磨。",
  "项目柜打开中：网页、小工具、笔记、感想都能放。",
  "私人主页不是简历，它更像一个会发光的房间。"
];

const statusLine = document.querySelector("#statusLine");
const shuffleButton = document.querySelector("#shuffleStatus");
let statusIndex = 0;

shuffleButton?.addEventListener("click", () => {
  statusIndex = (statusIndex + 1) % statusLines.length;
  statusLine.textContent = statusLines[statusIndex];
});
