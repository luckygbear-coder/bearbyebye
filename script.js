// 狀態變數
let throwCount = 0; // 已擲筊次數
let successCount = 0; // 聖筊次數
let state = "ready"; // ready, throwing, result, notApproved
let currentLot = null;

let merit = 0;
let lightEndTime = null; // ms timestamp
let records = [];

// 籤詩資料（示範一些，可之後再擴充）
const lots = [
  {
    id: 1,
    title: "第一籤・大吉",
    fortune: "大吉",
    poem: "晨光破霧好風來，\n心定步穩路自開；\n若能溫飽常知足，\n福到人間喜盈腮。",
    meaning:
      "最近是往前走的好時機，只要保持腳步穩定，不用太急，事情會一件件明朗。記得在忙碌中也要好好吃飯、照顧自己。",
    food: "滷肉飯一碗＋燙青菜",
    calories: 650,
    exerciseMinutes: 25,
    summary: "福氣上門、穩穩前進。",
  },
  {
    id: 2,
    title: "第二籤・中吉",
    fortune: "中吉",
    poem: "微雨過後見晴天，\n雲開月上好人緣；\n心中疑慮慢慢解，\n一碗暖湯最貼肩。",
    meaning:
      "心裡的擔心會慢慢解除，不必一次想通全部，只要願意和信任的人聊聊，就能找到出口。",
    food: "蚵仔麵線一碗",
    calories: 450,
    exerciseMinutes: 20,
    summary: "心事漸解、適合溫暖相聚。",
  },
  {
    id: 3,
    title: "第三籤・小吉",
    fortune: "小吉",
    poem: "腳步雖慢仍向前，\n迂迴小路也有緣；\n偶遇甜味添笑意，\n莫忘抬頭看藍天。",
    meaning:
      "進度比想像中慢一些，但並不是失敗，而是宇宙在幫你安排更合適的步伐。途中給自己一點甜，也能補充勇氣。",
    food: "豆花一碗（少糖）",
    calories: 250,
    exerciseMinutes: 15,
    summary: "慢慢走也會到、甜中有力量。",
  },
  {
    id: 4,
    title: "第四籤・吉",
    fortune: "吉",
    poem: "薄雲輕罩未成陰，\n心若安然自有金；\n一盤青葉入口爽，\n煩憂隨風不再尋。",
    meaning:
      "有些小煩惱在身邊，但還不會真正阻礙你。先照顧身體，讓心情穩定，處理事情就會更順利。",
    food: "地瓜葉＋白飯小碗",
    calories: 420,
    exerciseMinutes: 18,
    summary: "小煩惱擋不住，穩住自己就好。",
  },
  {
    id: 5,
    title: "第五籤・小凶",
    fortune: "小凶",
    poem: "夜路微暗心不安，\n言語誤會易成端；\n且先緩步暖身胃，\n明日再談更心寬。",
    meaning:
      "最近容易有溝通小摩擦，先不要急著爭對錯，把身體照顧好，讓自己睡飽再談，比硬撐有效。",
    food: "清粥小菜一份",
    calories: 320,
    exerciseMinutes: 20,
    summary: "少說一點、多休息一點。",
  },
  {
    id: 6,
    title: "第六籤・中吉",
    fortune: "中吉",
    poem: "船行河上波微搖，\n掌舵在手心不焦；\n一杯豆漿暖喉間，\n前程雖遠路不遙。",
    meaning:
      "有一些變動，但主控權還在你手上。適度調整腳步，保持彈性，你會發現其實自己比想像中更有力量。",
    food: "燒餅油條＋無糖豆漿",
    calories: 580,
    exerciseMinutes: 25,
    summary: "變動中仍能掌舵。",
  },
  {
    id: 7,
    title: "第七籤・平",
    fortune: "平",
    poem: "風平浪靜無大波，\n小事堆疊亦成多；\n一碗青菜暖心腹，\n慢慢整理不必拖。",
    meaning:
      "生活現在沒大風波，但小事情堆起來會讓你覺得煩。可以從最簡單的一件開始收拾，給自己一點完成的成就感。",
    food: "青菜蛋花湯＋白飯半碗",
    calories: 380,
    exerciseMinutes: 18,
    summary: "小事慢慢清，心就慢慢輕。",
  },
  {
    id: 8,
    title: "第八籤・吉",
    fortune: "吉",
    poem: "舊枝抽新芽，\n轉彎見彩霞；\n心願雖未滿，\n腳下有好茶。",
    meaning:
      "計畫還在路上，但已經開始有小成果。值得為現在的自己鼓鼓掌，再多走幾步就更接近了。",
    food: "珍珠奶茶（半糖少冰）",
    calories: 420,
    exerciseMinutes: 25,
    summary: "正在長出新芽的小小好兆頭。",
  },
  {
    id: 9,
    title: "第九籤・小吉",
    fortune: "小吉",
    poem: "雲有陰晴月有圓，\n喜怒哀樂在人間；\n允許情緒慢慢走，\n一顆水果伴身邊。",
    meaning:
      "最近情緒比較敏感，沒關係，那代表你在認真生活。允許自己偶爾難過，吃點喜歡的水果，也算是給自己一點溫柔。",
    food: "一顆蘋果／香蕉",
    calories: 90,
    exerciseMinutes: 10,
    summary: "允許情緒，也給自己甜甜的照顧。",
  },
  {
    id: 10,
    title: "第十籤・凶",
    fortune: "凶",
    poem: "風急雨驟樹難安，\n暫避鋒頭保心安；\n切莫逞強硬向前，\n熱湯入口身自暖。",
    meaning:
      "現在不太適合做太大的決定，比起硬撐，更需要的是保護自己。先把生活簡化，讓身體暖起來，等情況穩定再出手也不遲。",
    food: "薑絲魚湯／熱湯麵",
    calories: 500,
    exerciseMinutes: 20,
    summary: "暫時避風頭，先照顧好自己。",
  },
  {
    id: 11,
    title: "第十一籤・吉",
    fortune: "吉",
    poem: "人來人往有貴人，\n一句暖語勝黃金；\n多聽少說心放鬆，\n甜點一口笑盈盈。",
    meaning:
      "最近有機會遇到願意幫助你、理解你的人。試著多聽聽別人的建議，也別忘了跟自己說一些溫柔的話。",
    food: "一份小蛋糕／奶酪",
    calories: 320,
    exerciseMinutes: 22,
    summary: "貴人運上升，多聽多笑。",
  },
  {
    id: 12,
    title: "第十二籤・中吉",
    fortune: "中吉",
    poem: "山路雖彎景更佳，\n回頭一望有紅霞；\n路邊小館香味繞，\n好好用餐莫心煩。",
    meaning:
      "事情不像一條直線，而是有點曲折，但這些轉彎會帶來不同風景。先把每一餐吃好，讓身體有力氣，才有精神欣賞沿途風景。",
    food: "牛肉麵一碗",
    calories: 650,
    exerciseMinutes: 28,
    summary: "彎路也是風景，好好吃飯就有力氣。",
  },
];

// DOM 取得
const statusTextEl = document.getElementById("statusText");
const lotNumberEl = document.getElementById("lotNumber");
const lotFortuneEl = document.getElementById("lotFortune");
const lotPoemEl = document.getElementById("lotPoem");
const lotMeaningEl = document.getElementById("lotMeaning");
const lotFoodEl = document.getElementById("lotFood");
const lotCalorieEl = document.getElementById("lotCalorie");
const lotExerciseEl = document.getElementById("lotExercise");

const mainActionBtn = document.getElementById("mainActionBtn");
const lotTubeEl = document.getElementById("lotTube");

const meritValueEl = document.getElementById("meritValue");
const lightStatusEl = document.getElementById("lightStatus");
const lightBtn = document.getElementById("lightBtn");

const historyBtn = document.getElementById("historyBtn");
const historyModal = document.getElementById("historyModal");
const historyBackdrop = document.getElementById("historyBackdrop");
const historyCloseBtn = document.getElementById("historyCloseBtn");
const historyOkBtn = document.getElementById("historyOkBtn");
const historyListEl = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// 初始化
initFromStorage();
renderMeritAndLight();
updateStatusText();
renderLastLotIfAny();

// 綁定事件
mainActionBtn.addEventListener("click", handleMainAction);
lightBtn.addEventListener("click", handleLightBtnClick);

historyBtn.addEventListener("click", openHistoryModal);
historyBackdrop.addEventListener("click", closeHistoryModal);
historyCloseBtn.addEventListener("click", closeHistoryModal);
historyOkBtn.addEventListener("click", closeHistoryModal);
clearHistoryBtn.addEventListener("click", clearHistory);

// --- 初始化與 Storage ---

function initFromStorage() {
  const meritStr = localStorage.getItem("wuzang_merit");
  merit = meritStr ? parseInt(meritStr, 10) || 0 : 0;

  const lightStr = localStorage.getItem("wuzang_lightEndTime");
  if (lightStr) {
    lightEndTime = parseInt(lightStr, 10) || null;
  }

  const recordStr = localStorage.getItem("wuzang_records");
  if (recordStr) {
    try {
      records = JSON.parse(recordStr) || [];
    } catch (e) {
      records = [];
    }
  }

  // 檢查光明燈是否過期
  updateLightTime();
}

function saveMerit() {
  localStorage.setItem("wuzang_merit", String(merit));
}

function saveLightEndTime() {
  if (lightEndTime) {
    localStorage.setItem("wuzang_lightEndTime", String(lightEndTime));
  } else {
    localStorage.removeItem("wuzang_lightEndTime");
  }
}

function saveRecords() {
  localStorage.setItem("wuzang_records", JSON.stringify(records));
}

// --- UI 更新 ---

function renderMeritAndLight() {
  meritValueEl.textContent = merit;

  const now = Date.now();
  if (lightEndTime && now < lightEndTime) {
    const remainDays = Math.max(
      1,
      Math.ceil((lightEndTime - now) / (24 * 60 * 60 * 1000))
    );
    lightStatusEl.textContent = `光明燈點亮中 ✨ 剩餘約 ${remainDays} 天`;
    lightBtn.disabled = true;
    lightBtn.classList.remove("enabled");
    lightBtn.textContent = "光明燈祝福中";
  } else {
    // 未點燈
    if (merit >= 30) {
      lightStatusEl.textContent = "功德已滿，可點光明燈！";
      lightBtn.disabled = false;
      lightBtn.classList.add("enabled");
      lightBtn.textContent = "🕯️ 點亮光明燈（7 天）";
    } else {
      lightStatusEl.textContent = "尚未點燈";
      lightBtn.disabled = true;
      lightBtn.classList.remove("enabled");
      lightBtn.textContent = "功德滿 30 可點燈";
    }
  }
}

function updateStatusText() {
  if (state === "ready") {
    statusTextEl.textContent =
      "請在心中向熊熊食神誠心發問，然後按下「開始擲筊」。需要三次聖筊才能抽籤。";
    mainActionBtn.textContent = "🙏 開始擲筊問熊熊";
  } else if (state === "throwing") {
    statusTextEl.textContent = `第 ${throwCount + 1} 次擲筊中……請靜心等待結果。`;
  } else if (state === "throwing_done") {
    // 理論上立即進入 result / notApproved，不太會看到這段
  } else if (state === "notApproved") {
    statusTextEl.textContent =
      `這次沒有連續三個聖筊，熊熊食神說可以改天再來問，或先換個問題。功德值不會扣喔～`;
    mainActionBtn.textContent = "再試一次擲筊";
  } else if (state === "result") {
    statusTextEl.textContent =
      "熊熊食神已應允，以下是本次的詩籤與飲食、小運動建議。";
    mainActionBtn.textContent = "再問一卦";
  }
}

function renderLot(lot) {
  if (!lot) return;

  lotNumberEl.textContent = lot.title;
  lotFortuneEl.textContent = lot.fortune;

  lotFortuneEl.classList.remove("best", "good", "bad");
  if (lot.fortune === "大吉") {
    lotFortuneEl.classList.add("best");
  } else if (lot.fortune === "吉" || lot.fortune === "中吉" || lot.fortune === "小吉") {
    lotFortuneEl.classList.add("good");
  } else if (lot.fortune === "凶" || lot.fortune === "小凶") {
    lotFortuneEl.classList.add("bad");
  }

  lotPoemEl.textContent = lot.poem;
  lotMeaningEl.textContent = "🐻 熊熊食神解籤： " + lot.meaning;

  lotFoodEl.textContent = `建議：${lot.food}`;
  lotCalorieEl.textContent = `約 ${lot.calories} kcal（熱量為估計值，請以實際份量為準）`;
  lotExerciseEl.textContent = `建議做約 ${lot.exerciseMinutes} 分鐘的輕鬆小運動（散步、伸展或家事活動）。`;
}

function renderLastLotIfAny() {
  if (records.length > 0) {
    // 最近一次
    const last = records[0];
    lotNumberEl.textContent = last.title;
    lotFortuneEl.textContent = last.fortune;
    lotPoemEl.textContent = last.poem;
    lotMeaningEl.textContent = "🐻 熊熊食神解籤： " + last.meaning;
    lotFoodEl.textContent = `建議：${last.food}`;
    lotCalorieEl.textContent = `約 ${last.calories} kcal（熱量為估計值，請以實際份量為準）`;
    lotExerciseEl.textContent = `建議做約 ${last.exerciseMinutes} 分鐘的輕鬆小運動（散步、伸展或家事活動）。`;
  }
}

// --- 主流程：按鈕邏輯 ---

function handleMainAction() {
  if (state === "ready" || state === "notApproved") {
    // 重新開始擲筊流程
    resetThrowState();
    startThrowing();
  } else if (state === "throwing") {
    // 理論上不會，因為擲筊中會鎖按鈕，但保險
    return;
  } else if (state === "result") {
    // 再問一卦 → 回到 ready 狀態
    resetThrowState();
    state = "ready";
    updateStatusText();
  }
}

function startThrowing() {
  state = "throwing";
  updateStatusText();
  performThrow();
}

function performThrow() {
  mainActionBtn.disabled = true;
  shakeLotTube();

  setTimeout(() => {
    throwCount += 1;

    // 90% 聖筊機率
    const isSuccess = Math.random() < 0.9;
    if (isSuccess) {
      successCount += 1;
      statusTextEl.textContent = `第 ${throwCount} 次擲筊結果：聖筊 ✅（目前 ${successCount} 次聖筊）`;
    } else {
      statusTextEl.textContent = `第 ${throwCount} 次擲筊結果：不是聖筊 🙏（目前 ${successCount} 次聖筊）`;
    }

    if (throwCount < 3) {
      // 還沒擲完三次 -> 再擲
      mainActionBtn.disabled = false;
      mainActionBtn.textContent = `第 ${throwCount + 1} 次擲筊`;
      state = "throwing";
    } else {
      // 三次都結束
      if (successCount === 3) {
        // 應允抽籤
        drawLotAndShow();
      } else {
        // 不給問
        state = "notApproved";
        mainActionBtn.disabled = false;
        updateStatusText();
      }
    }
  }, 650);
}

function shakeLotTube() {
  lotTubeEl.classList.add("shake");
  setTimeout(() => {
    lotTubeEl.classList.remove("shake");
  }, 300);
}

function resetThrowState() {
  throwCount = 0;
  successCount = 0;
}

// --- 抽籤與紀錄 ---

function drawLotAndShow() {
  // 從 lots 中隨機抽一籤
  const index = Math.floor(Math.random() * lots.length);
  const lot = lots[index];
  currentLot = lot;

  // 顯示籤
  renderLot(lot);

  // 計算功德值 +1
  merit += 1;
  saveMerit();

  // 檢查光明燈
  updateLightTime();
  renderMeritAndLight();

  // 存紀錄
  addRecord(lot);

  state = "result";
  mainActionBtn.disabled = false;
  updateStatusText();
}

function addRecord(lot) {
  const now = new Date();
  const timeStr = now.toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const record = {
    time: timeStr,
    title: lot.title,
    fortune: lot.fortune,
    summary: lot.summary,
    food: lot.food,
    calories: lot.calories,
    exerciseMinutes: lot.exerciseMinutes,
    poem: lot.poem,
    meaning: lot.meaning,
  };

  records.unshift(record); // 最新在最前
  if (records.length > 10) {
    records.pop();
  }

  saveRecords();
}

// --- 光明燈 ---

function updateLightTime() {
  const now = Date.now();
  if (lightEndTime && now >= lightEndTime) {
    // 過期
    lightEndTime = null;
    saveLightEndTime();
  }
}

function handleLightBtnClick() {
  const now = Date.now();
  if (lightEndTime && now < lightEndTime) {
    // 已點燈中
    return;
  }

  if (merit < 30) {
    return;
  }

  // 點燈 7 天
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  lightEndTime = now + sevenDaysMs;
  saveLightEndTime();

  // 功德值歸零
  merit = 0;
  saveMerit();

  renderMeritAndLight();
  statusTextEl.textContent =
    "🕯️ 光明燈已點亮七天，熊熊食神祝福你身體健康、萬事如意！";
}

// --- 抽籤紀錄 Modal ---

function openHistoryModal() {
  renderHistoryList();
  historyModal.classList.add("show");
}

function closeHistoryModal() {
  historyModal.classList.remove("show");
}

function renderHistoryList() {
  if (!records.length) {
    historyListEl.innerHTML =
      '<div style="text-align:center; font-size:12px; color:#8c5a3f;">目前還沒有抽籤紀錄喔～</div>';
    return;
  }

  historyListEl.innerHTML = records
    .map((r) => {
      return `
        <div class="record-item">
          <div class="record-time">${r.time}</div>
          <div class="record-main">${r.title}｜${r.fortune}｜${r.summary}</div>
          <div class="record-extra">
            食物：約 ${r.calories} kcal｜建議運動：約 ${r.exerciseMinutes} 分鐘
          </div>
        </div>
      `;
    })
    .join("");
}

function clearHistory() {
  if (!records.length) return;
  const ok = confirm("確定要刪除所有抽籤紀錄嗎？");
  if (!ok) return;
  records = [];
  saveRecords();
  renderHistoryList();
}
