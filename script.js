// ================== DOM 取得 ==================
const loadingScreen = document.getElementById("loadingScreen");

const statusTextEl = document.getElementById("statusText");
const boBtn = document.getElementById("boBtn");
const drawBtn = document.getElementById("drawBtn");

const shakeArea = document.getElementById("shakeArea");
const shakeSvgContainer = document.getElementById("shakeSvgContainer");

const currentLotCard = document.getElementById("currentLotCard");

const meritEl = document.getElementById("merit");
const lightStatusEl = document.getElementById("lightStatus");
const lightBtn = document.getElementById("lightBtn");
const offerBtn = document.getElementById("offerBtn");

const historyBtn = document.getElementById("historyBtn");
const resetBtn = document.getElementById("resetBtn");

const lotModal = document.getElementById("lotModal");
const lotTextEl = document.getElementById("lotText");
const closeLot = document.getElementById("closeLot");

const historyModal = document.getElementById("historyModal");
const historyListEl = document.getElementById("historyList");
const closeHistory = document.getElementById("closeHistory");

// ================== 狀態變數 ==================
let canDraw = false;             // 是否已獲得「可抽籤」資格（一次聖筊）
let currentLot = null;           // 當下詩籤
let merit = 0;                   // 現在功德值
let lightEndTime = null;         // 光明燈到期時間（timestamp）
let lotHistory = [];             // 抽籤紀錄
let meritLog = [];               // 功德無量匾額紀錄（光明燈與供品）

// ================== 常數設定 ==================
const STORAGE_MERIT = "wuzang_merit";
const STORAGE_LIGHT_END = "wuzang_lightEnd";
const STORAGE_LOT_HISTORY = "wuzang_lotHistory";
const STORAGE_MERIT_LOG = "wuzang_meritLog";

// 光明燈持續 7 天
const LIGHT_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// 擲筊聖筊機率 90%
const SHENGBO_RATE = 0.9;

// ========== 搖籤筒 SVG（暫時用，之後可換成你的熊熊 SVG） ==========
const SHAKE_SVG = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="jarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f6b26b"/>
      <stop offset="100%" stop-color="#c27b53"/>
    </linearGradient>
  </defs>
  <!-- 籤筒主體 -->
  <g id="shaker" transform="translate(90,100)">
    <rect x="-30" y="-40" width="60" height="80" rx="16" ry="16" fill="url(#jarGrad)" stroke="#6b3b1f" stroke-width="5"/>
    <!-- 籤筒邊 -->
    <rect x="-26" y="-36" width="52" height="10" rx="5" ry="5" fill="#f3e2c5" stroke="#6b3b1f" stroke-width="3"/>
    <!-- 籤 -->
    <rect x="-4" y="-52" width="8" height="26" rx="4" ry="4" fill="#ffebbb" stroke="#6b3b1f" stroke-width="3"/>
    <!-- 動畫：左右搖動 -->
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="-6 0 0; 6 0 0; -6 0 0"
      dur="1s"
      repeatCount="indefinite"
    />
  </g>
  <!-- 字：等一下吃什麼 -->
  <text x="90" y="32" text-anchor="middle" font-size="14" fill="#6b3b1f" font-family="Noto Sans TC">
    等一下吃什麼…
  </text>
</svg>
`;

// ================== 食物清單 ==================
// 主食 + 小吃 42 種
const foodsMainSnack = [
  { name: "滷肉飯一碗", calories: 650, exerciseMinutes: 25 },
  { name: "雞肉飯一碗", calories: 620, exerciseMinutes: 24 },
  { name: "排骨飯便當", calories: 780, exerciseMinutes: 30 },
  { name: "雞腿便當", calories: 820, exerciseMinutes: 32 },
  { name: "家常雙主菜便當", calories: 750, exerciseMinutes: 30 },
  { name: "牛肉麵一碗", calories: 680, exerciseMinutes: 27 },
  { name: "榨菜肉絲麵", calories: 620, exerciseMinutes: 24 },
  { name: "陽春麵一碗", calories: 550, exerciseMinutes: 22 },
  { name: "鍋燒意麵一碗", calories: 580, exerciseMinutes: 23 },
  { name: "蚵仔麵線一碗", calories: 520, exerciseMinutes: 21 },
  { name: "米粉湯＋小菜", calories: 540, exerciseMinutes: 22 },
  { name: "肉圓兩粒", calories: 600, exerciseMinutes: 24 },
  { name: "臭豆腐一盤", calories: 480, exerciseMinutes: 19 },
  { name: "炸雞排一片", calories: 540, exerciseMinutes: 22 },
  { name: "鹽酥雞一份", calories: 600, exerciseMinutes: 24 },
  { name: "蚵仔煎一份", calories: 520, exerciseMinutes: 21 },
  { name: "蘿蔔糕＋蛋", calories: 460, exerciseMinutes: 18 },
  { name: "蛋餅一份", calories: 430, exerciseMinutes: 17 },
  { name: "湯包八顆", calories: 520, exerciseMinutes: 21 },
  { name: "小籠包十顆", calories: 580, exerciseMinutes: 23 },
  { name: "水餃十顆", calories: 500, exerciseMinutes: 20 },
  { name: "鍋貼十顆", calories: 540, exerciseMinutes: 22 },
  { name: "蔥抓餅一份", calories: 480, exerciseMinutes: 19 },
  { name: "蔥油餅一片", calories: 460, exerciseMinutes: 18 },
  { name: "刈包一個", calories: 420, exerciseMinutes: 17 },
  { name: "魯味拼盤一份", calories: 550, exerciseMinutes: 22 },
  { name: "炸物綜合拼盤", calories: 650, exerciseMinutes: 26 },
  { name: "章魚燒六顆", calories: 420, exerciseMinutes: 17 },
  { name: "炒飯一盤", calories: 700, exerciseMinutes: 28 },
  { name: "炒麵一盤", calories: 680, exerciseMinutes: 27 },
  { name: "炒米粉一盤", calories: 640, exerciseMinutes: 25 },
  { name: "日式豬排丼飯", calories: 780, exerciseMinutes: 31 },
  { name: "親子丼一碗", calories: 650, exerciseMinutes: 26 },
  { name: "壽司便當一份", calories: 620, exerciseMinutes: 24 },
  { name: "韓式拌飯一碗", calories: 640, exerciseMinutes: 25 },
  { name: "部隊鍋一鍋", calories: 820, exerciseMinutes: 32 },
  { name: "泡菜鍋套餐", calories: 680, exerciseMinutes: 27 },
  { name: "鐵板麵一份", calories: 630, exerciseMinutes: 25 },
  { name: "擔仔麵一碗", calories: 540, exerciseMinutes: 22 },
  { name: "肉羹湯＋白飯", calories: 620, exerciseMinutes: 24 },
  { name: "火鍋（多菜少加工）", calories: 700, exerciseMinutes: 28 }
];

// 甜點 + 水果 21 種
const foodsDessertFruit = [
  { name: "豆花一碗（少糖）", calories: 250, exerciseMinutes: 15 },
  { name: "仙草凍加鮮奶", calories: 230, exerciseMinutes: 14 },
  { name: "芋圓地瓜圓甜湯", calories: 320, exerciseMinutes: 18 },
  { name: "黑糖剉冰加配料", calories: 350, exerciseMinutes: 19 },
  { name: "芒果冰一份", calories: 380, exerciseMinutes: 21 },
  { name: "車輪餅兩顆", calories: 260, exerciseMinutes: 16 },
  { name: "雞蛋糕三顆", calories: 240, exerciseMinutes: 15 },
  { name: "草莓奶油蛋糕一片", calories: 320, exerciseMinutes: 18 },
  { name: "巧克力蛋糕一片", calories: 360, exerciseMinutes: 20 },
  { name: "手工餅乾兩片", calories: 180, exerciseMinutes: 12 },
  { name: "布朗尼小塊", calories: 220, exerciseMinutes: 14 },
  { name: "芋泥奶酥厚片", calories: 420, exerciseMinutes: 23 },
  { name: "地瓜球一小包", calories: 280, exerciseMinutes: 16 },
  { name: "水果優格一杯", calories: 180, exerciseMinutes: 12 },
  { name: "蘋果一顆", calories: 90, exerciseMinutes: 8 },
  { name: "香蕉一條", calories: 100, exerciseMinutes: 9 },
  { name: "奇異果兩顆", calories: 90, exerciseMinutes: 8 },
  { name: "葡萄一小串", calories: 80, exerciseMinutes: 7 },
  { name: "鳳梨切片一份", calories: 90, exerciseMinutes: 8 },
  { name: "綜合水果盤一份", calories: 120, exerciseMinutes: 10 },
  { name: "愛文芒果一顆", calories: 130, exerciseMinutes: 11 }
];

// 飲料 + 果汁 21 種
const foodsDrinkJuice = [
  { name: "珍珠奶茶一杯（半糖少冰）", calories: 420, exerciseMinutes: 25 },
  { name: "鮮奶茶一杯（微糖）", calories: 320, exerciseMinutes: 20 },
  { name: "紅茶拿鐵一杯", calories: 280, exerciseMinutes: 18 },
  { name: "青茶無糖一杯", calories: 20, exerciseMinutes: 5 },
  { name: "烏龍奶蓋茶一杯", calories: 350, exerciseMinutes: 21 },
  { name: "黑咖啡一杯", calories: 10, exerciseMinutes: 3 },
  { name: "拿鐵咖啡一杯", calories: 220, exerciseMinutes: 14 },
  { name: "抹茶拿鐵一杯", calories: 260, exerciseMinutes: 16 },
  { name: "熱可可一杯", calories: 230, exerciseMinutes: 14 },
  { name: "豆漿一杯", calories: 150, exerciseMinutes: 11 },
  { name: "麥茶無糖一杯", calories: 10, exerciseMinutes: 3 },
  { name: "西瓜汁一杯", calories: 160, exerciseMinutes: 11 },
  { name: "柳橙汁一杯", calories: 150, exerciseMinutes: 11 },
  { name: "葡萄柚綠茶一杯", calories: 180, exerciseMinutes: 12 },
  { name: "檸檬愛玉一杯", calories: 160, exerciseMinutes: 11 },
  { name: "甘蔗汁一杯", calories: 220, exerciseMinutes: 14 },
  { name: "木瓜牛奶一杯", calories: 260, exerciseMinutes: 16 },
  { name: "冬瓜茶一杯（微糖）", calories: 160, exerciseMinutes: 11 },
  { name: "百香果多多一杯", calories: 240, exerciseMinutes: 15 },
  { name: "氣泡水加檸檬一杯", calories: 10, exerciseMinutes: 3 },
  { name: "檸檬水一杯", calories: 5, exerciseMinutes: 2 }
];

// ================== 詩籤（示例 24 筆，可再增加） ==================
const lots = [
  {
    id: 1,
    title: "第一籤．晨光好胃口",
    fortune: "大滿足",
    hungerLevel: "best",
    poem: "晨光破霧好風來，\n心定步穩路自開；\n若能溫飽常知足，\n福到人間喜盈腮。",
    meaning:
      "最近是往前走的好時機，只要腳步穩定，不用太急，事情會一件件明朗。記得在忙碌中也要好好吃飯、照顧自己。",
    summary: "福氣上門、穩穩前進。"
  },
  {
    id: 2,
    title: "第二籤．暖湯好人緣",
    fortune: "暖暖飽",
    hungerLevel: "good",
    poem: "微雨過後見晴天，\n雲開月上好人緣；\n心中疑慮慢慢解，\n一碗暖湯最貼肩。",
    meaning:
      "心裡的擔心會慢慢解除，不必一次想通全部，只要願意和信任的人聊聊，就能找到出口。",
    summary: "心事漸解、適合溫暖相聚。"
  },
  {
    id: 3,
    title: "第三籤．甜甜補勇氣",
    fortune: "甜甜飽",
    hungerLevel: "good",
    poem: "腳步雖慢仍向前，\n迂迴小路也有緣；\n偶遇甜味添笑意，\n莫忘抬頭看藍天。",
    meaning:
      "進度比想像中慢一些，但並不是失敗，而是宇宙在幫你安排更合適的步伐。途中給自己一點甜，也能補充勇氣。",
    summary: "慢慢走也會到、甜中有力量。"
  },
  {
    id: 4,
    title: "第四籤．青菜好心情",
    fortune: "剛剛好飽",
    hungerLevel: "good",
    poem: "薄雲輕罩未成陰，\n心若安然自有金；\n一盤青葉入口爽，\n煩憂隨風不再尋。",
    meaning:
      "有些小煩惱在身邊，但還不會真正阻礙你。先照顧身體，讓心情穩定，處理事情就會更順利。",
    summary: "小煩惱擋不住，穩住自己就好。"
  },
  {
    id: 5,
    title: "第五籤．清粥安安胃",
    fortune: "有點餓",
    hungerLevel: "hungry",
    poem: "夜路微暗心不安，\n言語誤會易成端；\n且先緩步暖身胃，\n明日再談更心寬。",
    meaning:
      "最近容易有溝通小摩擦，先不要急著爭對錯，把身體照顧好，讓自己睡飽再談，比硬撐有效。",
    summary: "少說一點、多休息一點。"
  },
  {
    id: 6,
    title: "第六籤．豆漿掌舵手",
    fortune: "穩穩飽",
    hungerLevel: "good",
    poem: "船行河上波微搖，\n掌舵在手心不焦；\n一杯豆漿暖喉間，\n前程雖遠路不遙。",
    meaning:
      "有一些變動，但主控權還在你手上。適度調整腳步，保持彈性，你會發現其實自己比想像中更有力量。",
    summary: "變動中仍能掌舵。"
  },
  {
    id: 7,
    title: "第七籤．小事慢慢吃",
    fortune: "平平飽",
    hungerLevel: "good",
    poem: "風平浪靜無大波，\n小事堆疊亦成多；\n一碗青菜暖心腹，\n慢慢整理不必拖。",
    meaning:
      "生活現在沒大風波，但小事情堆起來會讓你覺得煩。可以從最簡單的一件開始收拾，給自己一點完成的成就感。",
    summary: "小事慢慢清，心就慢慢輕。"
  },
  {
    id: 8,
    title: "第八籤．奶茶小確幸",
    fortune: "幸福飽",
    hungerLevel: "good",
    poem: "舊枝抽新芽，\n轉彎見彩霞；\n心願雖未滿，\n腳下有好茶。",
    meaning:
      "計畫還在路上，但已經開始有小成果。值得為現在的自己鼓鼓掌，再多走幾步就更接近了。",
    summary: "正在長出新芽的小小好兆頭。"
  },
  {
    id: 9,
    title: "第九籤．水果小點心",
    fortune: "微微餓",
    hungerLevel: "good",
    poem: "雲有陰晴月有圓，\n喜怒哀樂在人間；\n允許情緒慢慢走，\n一顆水果伴身邊。",
    meaning:
      "最近情緒比較敏感，沒關係，那代表你在認真生活。允許自己偶爾難過，吃點喜歡的水果，也算是給自己一點溫柔。",
    summary: "允許情緒，也給自己甜甜的照顧。"
  },
  {
    id: 10,
    title: "第十籤．熱湯救餓龍",
    fortune: "好餓狀態",
    hungerLevel: "hungry",
    poem: "風急雨驟樹難安，\n暫避鋒頭保心安；\n切莫逞強硬向前，\n熱湯入口身自暖。",
    meaning:
      "現在不太適合做太大的決定，比起硬撐，更需要的是保護自己。先把生活簡化，讓身體暖起來，等情況穩定再出手也不遲。",
    summary: "暫時避風頭，先照顧好自己。"
  },
  {
    id: 11,
    title: "第十一籤．甜點貴人運",
    fortune: "甜甜飽",
    hungerLevel: "good",
    poem: "人來人往有貴人，\n一句暖語勝黃金；\n多聽少說心放鬆，\n甜點一口笑盈盈。",
    meaning:
      "最近有機會遇到願意幫助你、理解你的人。試著多聽聽別人的建議，也別忘了跟自己說一些溫柔的話。",
    summary: "貴人運上升，多聽多笑。"
  },
  {
    id: 12,
    title: "第十二籤．轉彎牛肉麵",
    fortune: "暖暖飽",
    hungerLevel: "good",
    poem: "山路雖彎景更佳，\n回頭一望有紅霞；\n路邊小館香味繞，\n好好用餐莫心煩。",
    meaning:
      "事情不像一條直線，而是有點曲折，但這些轉彎會帶來不同風景。先把每一餐吃好，讓身體有力氣，才有精神欣賞沿途風景。",
    summary: "彎路也是風景，好好吃飯就有力氣。"
  },
  {
    id: 13,
    title: "第十三籤．便當慢慢嚼",
    fortune: "需要休息",
    hungerLevel: "good",
    poem: "忙裡偷閒一口茶，\n心火微退煩也差；\n莫把自己逼太緊，\n慢嚼飯菜最優雅。",
    meaning:
      "最近事情有點多，容易覺得喘不過氣。先從放慢吃飯速度開始，讓自己在餐桌上好好呼吸一下。",
    summary: "放慢吃飯，也是休息。"
  },
  {
    id: 14,
    title: "第十四籤．炸雞好分享",
    fortune: "歡樂飽",
    hungerLevel: "best",
    poem: "好事將臨心先暖，\n路旁花開香不遠；\n與人分享好滋味，\n喜氣自會多一半。",
    meaning:
      "有好消息正在路上，和身邊的人分享你的喜悅或喜歡的食物，會讓幸福感放大。",
    summary: "分享食物，分享好運。"
  },
  {
    id: 15,
    title: "第十五籤．小辣醒腦湯",
    fortune: "微辣飽",
    hungerLevel: "good",
    poem: "日子平平也算福，\n三餐溫飽已是富；\n偶爾小辣提精神，\n記得多喝幾口水。",
    meaning:
      "生活沒有特別大起伏，但平安就是一種祝福。可以用一點點刺激口味讓自己醒醒，但記得顧胃。",
    summary: "平淡日常，加一點小辣就好。"
  },
  {
    id: 16,
    title: "第十六籤．燕麥助好眠",
    fortune: "睏到餓",
    hungerLevel: "hungry",
    poem: "心煩意亂睡不安，\n手機螢光夜未完；\n不如關機早就寢，\n清粥暖胃夢也甜。",
    meaning:
      "最近睡眠狀況可能不太好，情緒也容易跟著起伏。先從早點放下手機開始，讓自己好好睡一晚。",
    summary: "關機休息，讓胃和心一起放鬆。"
  },
  {
    id: 17,
    title: "第十七籤．新味小冒險",
    fortune: "新口味",
    hungerLevel: "good",
    poem: "陌生巷口有驚喜，\n轉角香味把人喚；\n敢於踏出舒適圈，\n新味新景眼前展。",
    meaning:
      "適合嘗試沒吃過的料理或新的生活方式。小小的改變，會帶來意想不到的靈感。",
    summary: "試試新口味，打開新視野。"
  },
  {
    id: 18,
    title: "第十八籤．咖啡配點心",
    fortune: "午茶飽",
    hungerLevel: "good",
    poem: "工作雖忙手不閒，\n桌上咖啡伴身邊；\n慎防空腹太刺激，\n點心一塊保平安。",
    meaning:
      "事情多、壓力也不小，但你撐得很好。不要靠空腹咖啡硬撐，搭配一點點心或正餐，身體會比較穩。",
    summary: "咖啡配點心，比單喝溫柔。"
  },
  {
    id: 19,
    title: "第十九籤．火鍋暖家人",
    fortune: "團圓飽",
    hungerLevel: "best",
    poem: "家人相聚一桌圓，\n湯匙碰碗笑聲連；\n偶有爭執皆小事，\n好好吃飯才是先。",
    meaning:
      "家庭或親密關係可能有一點小摩擦，但本質上仍是相愛的人。先一起吃頓飯，再談心事也不遲。",
    summary: "先吃飯再吵架，通常就不想吵了。"
  },
  {
    id: 20,
    title: "第二十籤．味噌冷靜湯",
    fortune: "餓怒狀態",
    hungerLevel: "hungry",
    poem: "情緒上湧如巨浪，\n言語不慎易受傷；\n暫時離席深呼吸，\n一碗熱湯護心腸。",
    meaning:
      "這段時間比較容易暴躁或受傷害，說出口的話可能會後悔。先離開吵鬧現場，讓自己喝點溫熱的東西冷靜一下。",
    summary: "先保護自己，再處理問題。"
  },
  {
    id: 21,
    title: "第二十一籤．靈感甜點盤",
    fortune: "創作飽",
    hungerLevel: "best",
    poem: "創意靈感正發芽，\n腦中點子如煙花；\n小小甜點當獎勵，\n別忘肯定好自家。",
    meaning:
      "最近特別有創意與靈感，很適合寫計畫、畫圖、創作。也別忘了在完成後獎勵自己一下。",
    summary: "靈感滿滿，配一點甜更開心。"
  },
  {
    id: 22,
    title: "第二十二籤．水果休息站",
    fortune: "補充元氣",
    hungerLevel: "good",
    poem: "身體微累信號現，\n肩頸緊繃眼也酸；\n少滑一集追劇吧，\n熱茶水果最相伴。",
    meaning:
      "身體正在發出疲勞警報，需要好好伸展和休息眼睛。可以把追劇時間縮短一點，留給自己和身體。",
    summary: "少看一集劇，多愛自己一點。"
  },
  {
    id: 23,
    title: "第二十三籤．聰明荷包餐",
    fortune: "省錢飽",
    hungerLevel: "good",
    poem: "錢財進出有節奏，\n省一點來花更久；\n外食搭配自備菜，\n荷包健康都加油。",
    meaning:
      "金錢上需要多一點節制，但不是要你完全不能享受，而是學會搭配與平衡。",
    summary: "聰明吃飯，也聰明存錢。"
  },
  {
    id: 24,
    title: "第二十四籤．旅程補給站",
    fortune: "出遊飽",
    hungerLevel: "good",
    poem: "旅程將啟心雀躍，\n車站街角香味烈；\n玩樂之前先吃飽，\n體力足夠笑不滅。",
    meaning:
      "適合安排小旅行或外出走走。記得先吃好、帶點水和小點心，玩起來會更愉快。",
    summary: "先充飽電，再出發冒險。"
  }
];

// ================== 熊熊食神隨機語（30 句） ==================
const bearBlessings = [
  "熊熊食神笑咪咪：願你今天吃得開心，心裡也暖暖的。",
  "熊熊食神拍拍肚子：把自己餵飽，就是很重要的修行。",
  "熊熊食神眨眨眼：吃東西不用完美，只要記得溫柔對待自己的胃。",
  "熊熊食神說：今天也辛苦了，犒賞自己一點小點心吧！",
  "熊熊食神：吃飽才有力氣面對世界的怪物和挑戰。",
  "熊熊食神：別為了配合別人而餓肚子，你的感受也很重要。",
  "熊熊食神：每一口食物，都在說『你值得被好好對待』。",
  "熊熊食神：喝點溫熱的飲料，讓心情也慢慢變溫柔。",
  "熊熊食神：就算今天很混亂，好好吃一餐也是一種前進。",
  "熊熊食神笑：你已經做得很好了，記得停下來喘口氣。",
  "熊熊食神：吃飯時專心吃，世界先暫停一下也沒關係。",
  "熊熊食神：人生不一定要很厲害，但一定要記得餵飽自己。",
  "熊熊食神：好好睡、好好吃，很多難題就會比較好解決。",
  "熊熊食神：你不需要完美，願意照顧自己就很值得被稱讚。",
  "熊熊食神：胃被安撫好了，心也會比較願意打開門。",
  "熊熊食神：今天就算只完成一點點，也值得好好吃一頓。",
  "熊熊食神：別小看一碗熱湯，它常常帶走很多委屈。",
  "熊熊食神：覺得累的時候，先吃一點東西再決定要不要放棄。",
  "熊熊食神：你可以慢慢來，但別忘了帶上好吃的。",
  "熊熊食神：與其苛責自己，不如問問肚子餓了沒。",
  "熊熊食神：有些心情用言語說不出來，用一碗飯安撫也很好。",
  "熊熊食神：世界很吵，但餐桌可以是專屬於你的安靜小島。",
  "熊熊食神：吃東西不是懲罰，而是在補充勇氣值。",
  "熊熊食神：就讓今天的食物，當作對自己的溫柔擁抱吧。",
  "熊熊食神：你不用很堅強，至少要讓自己不餓。",
  "熊熊食神：喝水，呼吸，吃口飯，然後再繼續前進就好。",
  "熊熊食神：如果覺得自己很糟，那先從吃一頓喜歡的開始。",
  "熊熊食神：謝謝你願意照顧自己的身體，它真的很需要你。",
  "熊熊食神：有時候不是你懶，而是真的太餓沒力氣了。",
  "熊熊食神：願你每一口，都吃進一點點安心與被愛的感覺。"
];

// ================== 初始化 ==================
init();

function init() {
  // Loading 畫面自動隱藏
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1500);
  }

  // 從 localStorage 讀取狀態
  loadFromStorage();
  updateLightStatus();
  renderMerit();
  renderCurrentLotCard();
  updateButtonsState();

  // 綁定事件
  boBtn.addEventListener("click", handleBoClick);
  drawBtn.addEventListener("click", handleDrawClick);

  currentLotCard.addEventListener("click", () => {
    if (currentLot) openLotModal(currentLot);
  });

  lightBtn.addEventListener("click", handleLightClick);
  offerBtn.addEventListener("click", handleOfferClick);

  historyBtn.addEventListener("click", openHistoryModal);
  closeHistory.addEventListener("click", () => historyModal.classList.add("hidden"));

  resetBtn.addEventListener("click", handleReset);

  closeLot.addEventListener("click", () => lotModal.classList.add("hidden"));

  // 初始提示
  statusTextEl.textContent = "請先擲筊，一次聖筊就可以抽籤（聖筊機率 90%）";
}

// ================== localStorage ==================
function loadFromStorage() {
  const m = localStorage.getItem(STORAGE_MERIT);
  merit = m ? parseInt(m, 10) || 0 : 0;

  const le = localStorage.getItem(STORAGE_LIGHT_END);
  lightEndTime = le ? parseInt(le, 10) || null : null;

  const lh = localStorage.getItem(STORAGE_LOT_HISTORY);
  lotHistory = lh ? JSON.parse(lh) || [] : [];

  const ml = localStorage.getItem(STORAGE_MERIT_LOG);
  meritLog = ml ? JSON.parse(ml) || [] : [];

  if (lotHistory.length > 0) {
    currentLot = lotHistory[0];
  }
}

function saveMerit() {
  localStorage.setItem(STORAGE_MERIT, String(merit));
}

function saveLightEnd() {
  if (lightEndTime) {
    localStorage.setItem(STORAGE_LIGHT_END, String(lightEndTime));
  } else {
    localStorage.removeItem(STORAGE_LIGHT_END);
  }
}

function saveLotHistory() {
  localStorage.setItem(STORAGE_LOT_HISTORY, JSON.stringify(lotHistory));
}

function saveMeritLog() {
  localStorage.setItem(STORAGE_MERIT_LOG, JSON.stringify(meritLog));
}

// ================== UI 更新 ==================
function renderMerit() {
  meritEl.textContent = merit;
}

function updateLightStatus() {
  const now = Date.now();
  if (lightEndTime && now < lightEndTime) {
    const diff = lightEndTime - now;
    const days = Math.max(1, Math.ceil(diff / (24 * 60 * 60 * 1000)));
    lightStatusEl.textContent = `光明燈點亮中 ✨ 約剩 ${days} 天`;
    lightBtn.classList.add("disabled");
    lightBtn.textContent = "光明燈祝福中";
  } else {
    // 已過期
    lightEndTime = null;
    saveLightEnd();

    if (merit >= 30) {
      lightStatusEl.textContent = "功德已滿，隨時可以點光明燈 🕯️";
      lightBtn.classList.remove("disabled");
      lightBtn.textContent = "點光明燈（消耗 30）";
    } else {
      lightStatusEl.textContent = "尚未點燈";
      lightBtn.classList.add("disabled");
      lightBtn.textContent = "功德滿 30 可點燈";
    }
  }

  // 供品按鈕
  if (merit >= 5) {
    offerBtn.classList.remove("disabled");
  } else {
    offerBtn.classList.add("disabled");
  }
}

function renderCurrentLotCard() {
  if (!currentLot) {
    currentLotCard.classList.add("hidden");
    return;
  }

  currentLotCard.classList.remove("hidden");
  currentLotCard.innerHTML = `
    <div><strong>${currentLot.title}</strong>｜${currentLot.fortune}</div>
    <div style="margin-top:4px; font-size:14px;">${currentLot.food}</div>
    <div style="margin-top:4px; font-size:12px;color:#6b3b1f;">
      約 ${currentLot.calories} kcal ｜ 建議小運動 ${currentLot.exerciseMinutes} 分鐘
    </div>
    <div style="margin-top:4px; font-size:12px;color:#a36c33;">
      （點這裡可再次查看完整詩籤）
    </div>
  `;
}

function updateButtonsState() {
  if (canDraw) {
    boBtn.classList.add("hidden");
    drawBtn.classList.remove("hidden");
  } else {
    boBtn.classList.remove("hidden");
    drawBtn.classList.add("hidden");
  }
}

// ================== 擲筊流程 ==================
function handleBoClick() {
  statusTextEl.textContent = "擲筊中…等一下吃什麼？";
  boBtn.disabled = true;

  // 顯示搖籤筒動畫
  showShake();

  setTimeout(() => {
    hideShake();

    const isShengBo = Math.random() < SHENGBO_RATE;
    if (isShengBo) {
      statusTextEl.textContent = "聖筊！熊熊食神允許你抽籤～按下「抽籤」看看今天吃什麼。";
      canDraw = true;
    } else {
      statusTextEl.textContent = "這次不是聖筊，再誠心問問熊熊食神吧。";
      canDraw = false;
    }

    boBtn.disabled = false;
    updateButtonsState();
  }, 1000);
}

function showShake() {
  shakeSvgContainer.innerHTML = SHAKE_SVG;
  shakeArea.classList.remove("hidden");
}

function hideShake() {
  shakeArea.classList.add("hidden");
  shakeSvgContainer.innerHTML = "";
}

// ================== 抽籤流程 ==================
function handleDrawClick() {
  if (!canDraw) return;

  // 1. 隨機抽一首詩籤
  const lotBase = lots[Math.floor(Math.random() * lots.length)];

  // 2. 隨機選一種類：0 主食小吃 / 1 甜點水果 / 2 飲料果汁
  const catIdx = Math.floor(Math.random() * 3);
  let foodItem;
  if (catIdx === 0) {
    foodItem = foodsMainSnack[Math.floor(Math.random() * foodsMainSnack.length)];
  } else if (catIdx === 1) {
    foodItem = foodsDessertFruit[Math.floor(Math.random() * foodsDessertFruit.length)];
  } else {
    foodItem = foodsDrinkJuice[Math.floor(Math.random() * foodsDrinkJuice.length)];
  }

  // 3. 組合成完整詩籤結果
  const lot = {
    ...lotBase,
    time: formatNow(),
    food: foodItem.name,
    calories: foodItem.calories,
    exerciseMinutes: foodItem.exerciseMinutes
  };

  currentLot = lot;
  renderCurrentLotCard();

  // 4. 功德 +1
  merit += 1;
  saveMerit();
  renderMerit();
  updateLightStatus();

  // 5. 寫入抽籤紀錄（最新放最前面）
  lotHistory.unshift(lot);
  if (lotHistory.length > 100) lotHistory.pop();
  saveLotHistory();

  // 6. 顯示詩籤 Modal
  openLotModal(lot);

  // 7. 本輪結束，需重新擲筊
  canDraw = false;
  updateButtonsState();

  statusTextEl.textContent = "熊熊食神已給你今日的吃貨詩籤，可以慢慢品味，也可以再擲筊問下一餐。";
}

function openLotModal(lot) {
  if (!lot) return;

  const html = `
    <div style="font-weight:bold; font-size:18px; margin-bottom:4px;">${lot.title}</div>
    <div style="font-size:14px; margin-bottom:8px;">吉餓程度：${lot.fortune}</div>
    <div style="white-space:pre-line; font-size:14px; margin-bottom:8px;">📜 詩文：\n${lot.poem}</div>
    <div style="font-size:14px; margin-bottom:8px;">🐻 熊熊食神解籤：${lot.meaning}</div>
    <hr>
    <div style="font-size:14px; margin-top:8px;">🍱 推薦食物：${lot.food}</div>
    <div style="font-size:13px; margin-top:2px;">🔥 估計熱量：約 ${lot.calories} kcal（請以實際份量為準）</div>
    <div style="font-size:13px; margin-top:2px;">🏃 小運動建議：約 ${lot.exerciseMinutes} 分鐘輕鬆活動（散步、拉筋或做家事）</div>
    <div style="font-size:12px; margin-top:6px; color:#a36c33;">抽籤時間：${lot.time}</div>
  `;
  lotTextEl.innerHTML = html;
  lotModal.classList.remove("hidden");
}

// ================== 光明燈 / 供品 ==================
function handleLightClick() {
  const now = Date.now();
  if (lightEndTime && now < lightEndTime) return;
  if (merit < 30) return;

  // 消耗 30 功德，點亮光明燈 7 天
  merit -= 30;
  saveMerit();

  lightEndTime = now + LIGHT_DURATION_MS;
  saveLightEnd();

  renderMerit();
  updateLightStatus();

  // 記錄功德無量匾額
  const bless = randomFrom(bearBlessings);
  const log = {
    time: formatNow(),
    type: "light",
    message: bless
  };
  meritLog.unshift(log);
  saveMeritLog();

  statusTextEl.textContent = `🕯️ 你點亮了光明燈，熊熊食神說：${bless}`;
}

function handleOfferClick() {
  if (merit < 5) return;

  merit -= 5;
  saveMerit();
  renderMerit();
  updateLightStatus();

  const bless = randomFrom(bearBlessings);
  const log = {
    time: formatNow(),
    type: "offering",
    message: bless
  };
  meritLog.unshift(log);
  saveMeritLog();

  statusTextEl.textContent = `🍎 你上了供品給熊熊食神，熊熊笑著說：${bless}`;
}

// ================== 抽籤紀錄（含功德無量匾額） ==================
function openHistoryModal() {
  const parts = [];

  // 抽籤紀錄
  parts.push(`<div style="font-weight:bold; margin-bottom:4px;">📘 抽籤紀錄</div>`);
  if (!lotHistory.length) {
    parts.push(`<div style="font-size:13px; margin-bottom:8px;">目前還沒有抽籤紀錄喔～</div>`);
  } else {
    lotHistory.forEach((lot, idx) => {
      parts.push(`
        <div class="hist-item lot-item" data-idx="${idx}" style="padding:6px 0; border-bottom:1px dashed #d9b07e; cursor:pointer;">
          <div style="font-size:12px; color:#8c5a3f;">${lot.time}</div>
          <div style="font-size:14px;">${lot.title}｜${lot.fortune}</div>
          <div style="font-size:12px; color:#6b3b1f;">${lot.food}｜約 ${lot.calories} kcal｜建議運動 ${lot.exerciseMinutes} 分鐘</div>
        </div>
      `);
    });
  }

  // 功德無量匾額
  parts.push(`<div style="font-weight:bold; margin:10px 0 4px;">🏮 功德無量匾額（光明燈／供品紀錄）</div>`);
  if (!meritLog.length) {
    parts.push(`<div style="font-size:13px; margin-bottom:8px;">目前還沒有功德消耗紀錄。</div>`);
  } else {
    meritLog.forEach((log) => {
      const typeText = log.type === "light" ? "點光明燈" : "上供品";
      parts.push(`
        <div style="padding:6px 0; border-bottom:1px dashed #d9b07e;">
          <div style="font-size:12px; color:#8c5a3f;">${log.time}</div>
          <div style="font-size:13px;">${typeText}</div>
          <div style="font-size:12px; color:#6b3b1f;">${log.message}</div>
        </div>
      `);
    });
  }

  historyListEl.innerHTML = parts.join("");
  historyModal.classList.remove("hidden");

  // 讓歷史紀錄可點開詩籤
  historyListEl.onclick = (e) => {
    const item = e.target.closest(".lot-item");
    if (!item) return;
    const idx = parseInt(item.dataset.idx, 10);
    const lot = lotHistory[idx];
    if (!lot) return;
    openLotModal(lot);
  };
}

// ================== 重置 ==================
function handleReset() {
  const ok = confirm("確定要清空所有抽籤紀錄與功德、光明燈紀錄嗎？");
  if (!ok) return;

  merit = 0;
  lightEndTime = null;
  lotHistory = [];
  meritLog = [];
  currentLot = null;
  canDraw = false;

  saveMerit();
  saveLightEnd();
  saveLotHistory();
  saveMeritLog();

  renderMerit();
  updateLightStatus();
  renderCurrentLotCard();
  updateButtonsState();

  statusTextEl.textContent = "資料已清空，可以重新與熊熊食神開始吃貨之旅。";
}

// ================== 工具函式 ==================
function formatNow() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${hh}:${mm}`;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}