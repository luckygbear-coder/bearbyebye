// ================== 籤詩資料 ==================
const lots = [
  {
    title: "珍珠奶茶好朋友籤",
    main: "今天適合來一杯你最喜歡的飲料，搭配一份小點心。",
    tag: "飲料・甜食・小確幸",
    bear: "🐻 熊熊說：慢慢喝沒關係，把今天的辛苦也一起吞下去，然後記得對自己說聲辛苦了。"
  },
  {
    title: "家常飯暖暖籤",
    main: "適合吃一頓家常味的料理，可以是滷肉飯、滷雞腿或是味噌湯。",
    tag: "家常菜・滷肉飯・暖胃",
    bear: "🐻 熊熊說：有時候最療癒的不是大餐，而是那碗讓你覺得安心的白飯和熱湯。"
  },
  {
    title: "揪人一起吃籤",
    main: "今天適合找一個人一起吃飯，不一定要大餐，但要可以聊天。",
    tag: "一起吃飯・聊天・陪伴",
    bear: "🐻 熊熊說：跟在乎的人一起吃飯，胃會飽，心也會被裝滿一點點。"
  },
  {
    title: "便當小確幸籤",
    main: "簡單的便當也很好，只要裡面有你喜歡的一樣小菜就足夠。",
    tag: "便當・上班族・快速補充",
    bear: "🐻 熊熊說：不用每一餐都完美，有時候只是好好吃完一個便當，就是對自己的照顧。"
  }
];

// ================== DOM 取得 ==================
const btnDraw    = document.getElementById("btnDraw");
const btnOffer   = document.getElementById("btnOffer");
const btnHistory = document.getElementById("btnHistory");

const loading    = document.getElementById("loading");
const meritValueEl = document.getElementById("meritValue");
const plusOne    = document.getElementById("plusOne");

// Modal：籤詩
const modalResult      = document.getElementById("modalResult");
const modalResultTitle = document.getElementById("modalResultTitle");
const modalResultMain  = document.getElementById("modalResultMain");
const modalResultTag   = document.getElementById("modalResultTag");
const modalResultBear  = document.getElementById("modalResultBear");

// Modal：紀錄
const modalHistory     = document.getElementById("modalHistory");
const historyListModal = document.getElementById("historyListModal");

// ================== 狀態 & localStorage ==================
const STORAGE_MERIT   = "luckyg_merit";
const STORAGE_HISTORY = "luckyg_food_history";

let merit   = 0;
let history = [];

function loadState() {
  try {
    const m = parseInt(localStorage.getItem(STORAGE_MERIT) || "0", 10);
    if (!isNaN(m)) merit = m;
    const h = JSON.parse(localStorage.getItem(STORAGE_HISTORY) || "[]");
    if (Array.isArray(h)) history = h;
  } catch (e) {
    merit = 0;
    history = [];
  }
  updateMerit();
}

function saveState() {
  localStorage.setItem(STORAGE_MERIT, String(merit));
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history));
}

function updateMerit() {
  if (meritValueEl) {
    meritValueEl.textContent = merit;
  }
}

// ================== +1 功德值動畫 ==================
function showPlusOne(text) {
  if (!plusOne) return;
  plusOne.textContent = text;
  plusOne.classList.remove("show");
  void plusOne.offsetWidth;        // 重觸發動畫
  plusOne.classList.add("show");
}

// ================== Modal 開關 ==================
function openResultModal(lot) {
  if (!modalResult) return;
  modalResultTitle.textContent = lot.title;
  modalResultMain.textContent  = lot.main;
  modalResultTag.textContent   = "關鍵字：" + lot.tag;
  modalResultBear.textContent  = lot.bear;
  modalResult.classList.add("show");
}

function closeResult() {
  if (modalResult) modalResult.classList.remove("show");
}

function openHistoryModal() {
  if (!modalHistory) return;

  historyListModal.innerHTML = "";

  if (!history.length) {
    historyListModal.innerHTML =
      '<p style="font-size:13px;color:#7a4329;">目前還沒有籤詩紀錄，先來抽一籤吧～</p>';
  } else {
    history.slice(0, 8).forEach(item => {
      const d = new Date(item.time);
      const div = document.createElement("div");
      div.style.padding = "8px 0";
      div.style.borderBottom = "1px dashed #e8c08d";
      div.innerHTML = `
        <strong>${item.title}</strong><br>
        <span style="font-size:12px;color:#b07a50;">
          ${d.toLocaleString("zh-TW",{hour12:false})}
        </span>
      `;
      historyListModal.appendChild(div);
    });
  }

  modalHistory.classList.add("show");
}

function closeHistory() {
  if (modalHistory) modalHistory.classList.remove("show");
}

// 讓 HTML 裡 onclick 可以用
window.closeResult  = closeResult;
window.closeHistory = closeHistory;

// 點背景關閉
if (modalResult) {
  modalResult.addEventListener("click", (e) => {
    if (e.target === modalResult) closeResult();
  });
}
if (modalHistory) {
  modalHistory.addEventListener("click", (e) => {
    if (e.target === modalHistory) closeHistory();
  });
}

// ================== 事件：抽詩籤 ==================
if (btnDraw) {
  btnDraw.addEventListener("click", () => {
    if (loading) loading.style.display = "flex";
    btnDraw.style.pointerEvents = "none";

    setTimeout(() => {
      if (loading) loading.style.display = "none";
      btnDraw.style.pointerEvents = "";

      const picked = lots[Math.floor(Math.random() * lots.length)];
      const now = new Date();

      openResultModal(picked);     // 顯示籤詩視窗

      merit += 1;
      updateMerit();
      showPlusOne("+1 功德值");

      history.unshift({
        time: now.toISOString(),
        title: picked.title,
        main: picked.main
      });
      if (history.length > 50) history.pop();
      saveState();
    }, 900);
  });
}

// ================== 事件：上供品 ==================
if (btnOffer) {
  btnOffer.addEventListener("click", () => {
    merit += 3;
    updateMerit();
    saveState();
    showPlusOne("+3 功德值");
  });
}

// ================== 事件：抽籤紀錄 ==================
if (btnHistory) {
  btnHistory.addEventListener("click", () => {
    openHistoryModal();
  });
}

// ================== 初始化 ==================
loadState();