// ================== 60 種美食籤 ==================
const lots = [
  {
    name: "台北紅燒牛肉麵",
    poem: "一碗牛肉湯，暖胃又暖心。\n麵條入口時，今天也算被好好對待。",
    explain: "經典台式牛肉麵，湯頭濃郁、麵條有嚼勁，適合需要被安慰的一天。",
    calories: "約 750 kcal（一碗）",
    exercise: "建議：快走 45 分鐘，或輕鬆騎腳踏車 35 分鐘。",
    bear: "🐻 熊熊說：慢慢吃、好好嚼，讓每一口都幫你把壓力一點點帶走。"
  },
  {
    name: "鹽酥雞宵夜拼盤",
    poem: "一口酥，一口香，\n煩惱暫時放一旁。",
    explain: "鹽酥雞是台灣宵夜代表，酥脆又過癮，但也要記得適量就好。",
    calories: "約 900 kcal（一份宵夜拼盤）",
    exercise: "建議：快走 60 分鐘，或者居家伸展＋原地踏步 40 分鐘。",
    bear: "🐻 熊熊說：想吃宵夜不代表意志薄弱，只是今天辛苦了，記得明天多喝水、多動一點就好。"
  },
  {
    name: "珍珠奶茶",
    poem: "杯中星球慢慢旋轉，\n甜甜的心情在嘴裡打滾。",
    explain: "珍珠奶茶是台式靈魂飲料，一杯就可以讓心情升級，但糖量也要留意。",
    calories: "約 450 kcal（中杯全糖）",
    exercise: "建議：快走 30 分鐘，或輕鬆跳跳舒展 20 分鐘。",
    bear: "🐻 熊熊說：可以少糖、去冰，也可以多一點愛自己，不需要每次都喝到最罪惡版。"
  },
  {
    name: "滷肉飯",
    poem: "一碗滷肉香，\n下班後的小確幸在白飯上閃光。",
    explain: "肥瘦相間的滷肉配上白飯，是超級療癒的家常味。",
    calories: "約 650 kcal（一碗）",
    exercise: "建議：快走 40 分鐘，或家裡做家事 50 分鐘（拖地、掃地也算運動）。",
    bear: "🐻 熊熊說：滷肉飯不只餵飽肚子，也在提醒你，有人把這碗飯煮好，是很大的溫柔。"
  },
  {
    name: "鐵路便當",
    poem: "便當盒打開，是一段旅程的味道，\n木盒裡裝著往前走的勇氣。",
    explain: "在火車上吃一個便當，是很多人對旅行的記憶，小菜簡單卻很扎實。",
    calories: "約 700 kcal（一個）",
    exercise: "建議：到站後散步 40 分鐘，看風景也算運動。",
    bear: "🐻 熊熊說：就算只是短短一段車程，只要有讓自己放空幾分鐘，也是很棒的休息。"
  },
  {
    name: "蚵仔煎",
    poem: "蚵仔在鐵板上跳舞，\n淋上醬汁，是夜市燈光的味道。",
    explain: "外脆內軟，加上蚵仔和甜辣醬，是夜市經典組合。",
    calories: "約 500 kcal（一份）",
    exercise: "建議：夜市多走兩圈，快走 30 分鐘剛剛好。",
    bear: "🐻 熊熊說：一邊吃一邊走，逛夜市的腳步，也能算是給自己的小運動。"
  },
  {
    name: "臭豆腐",
    poem: "香的是靈魂，臭的是個性，\n外酥內嫩，很像真實人生。",
    explain: "炸臭豆腐加泡菜，是很多人越吃越愛的台式味道。",
    calories: "約 450 kcal（一份）",
    exercise: "建議：飯後散步 25–30 分鐘。",
    bear: "🐻 熊熊說：喜歡一樣食物，不必每個人都懂，自己吃得開心就好。"
  },
  {
    name: "台式小火鍋",
    poem: "鍋裡咕嚕咕嚕，\n是今天的疲勞慢慢被煮開。",
    explain: "一人一鍋，最適合天氣微涼或心情需要被溫暖的時候。",
    calories: "約 800 kcal（一鍋，含白飯）",
    exercise: "建議：快走 50 分鐘，或健走 40 分鐘。",
    bear: "🐻 熊熊說：熱湯喝慢一點，順便把自己擁抱一下，然後記得多補充白開水。"
  },
  {
    name: "小籠包",
    poem: "咬開小籠包的瞬間，\n湯汁是小宇宙爆開的聲音。",
    explain: "皮薄湯多的小籠包，是細膩又療癒的小點心。",
    calories: "約 420 kcal（8 顆）",
    exercise: "建議：快走 25 分鐘，或做伸展＋深呼吸 15 分鐘。",
    bear: "🐻 熊熊說：吃的時候小心燙口，就像對待自己的心一樣，要溫柔一點。"
  },
  {
    name: "刈包（割包）",
    poem: "軟綿的包子裡，\n夾著酸菜與花生粉，像人生的酸甜苦辣。",
    explain: "一份台式漢堡，肥瘦肉＋酸菜＋花生粉，一口咬下超滿足。",
    calories: "約 550 kcal（一份）",
    exercise: "建議：快走 35 分鐘，或跳簡單舞蹈 25 分鐘。",
    bear: "🐻 熊熊說：偶爾吃一份很滿足的刈包，也是在告訴自己：你值得被好好餵飽。"
  },
  {
    name: "肉燥麵",
    poem: "麵條吸附醬汁，\n像日子吸收著琐碎的溫柔。",
    explain: "比起大餐，肉燥麵是簡單卻實在的一餐，非常台式家常味。",
    calories: "約 600 kcal（一碗）",
    exercise: "建議：快走 35–40 分鐘。",
    bear: "🐻 熊熊說：有時候，不需要儀式感的大餐，一碗麵就能讓今天變得不那麼累。"
  },
  {
    name: "炸雞排",
    poem: "一塊金黃脆皮，\n是考試、加班後的小小慶祝。",
    explain: "外酥內嫩，是許多人壓力大的時候會想吃的食物。",
    calories: "約 550 kcal（一片中等大小）",
    exercise: "建議：快走 35 分鐘，或上下樓梯 20 分鐘。",
    bear: "🐻 熊熊說：偶爾慶祝自己活過今天，不需要太多理由，一片雞排就夠了。"
  },
  {
    name: "肉圓",
    poem: "Q 彈外皮包著內心，\n像藏在心裡的小小願望。",
    explain: "油炸或清蒸版本都很受歡迎，醬汁是靈魂。",
    calories: "約 400 kcal（2 顆）",
    exercise: "建議：快走 25 分鐘。",
    bear: "🐻 熊熊說：吃東西前可以先問問自己：我現在是肚子餓，還是心需要被安慰呢？"
  },
  {
    name: "魯味拼盤",
    poem: "豆干、海帶、蛋，\n是宵夜，也是深夜的陪伴。",
    explain: "可自由搭配，想清爽就多青菜、少加工品。",
    calories: "約 500 kcal（一份綜合）",
    exercise: "建議：快走 30 分鐘，或輕鬆瑜伽 20 分鐘。",
    bear: "🐻 熊熊說：多點青菜、多點水，魯味也可以走清爽健康風。"
  },
  {
    name: "燒臘便當",
    poem: "三拼肉鋪滿白飯，\n是一種辛苦上班族的慰勞獎章。",
    explain: "油亮亮的燒臘配飯，超級下飯，但油脂也比較多。",
    calories: "約 850 kcal（一個）",
    exercise: "建議：快走 55 分鐘，或快步爬樓梯 20 分鐘。",
    bear: "🐻 熊熊說：很累的日子可以吃好一點，之後再慢慢調整就好，別對自己太兇。"
  },
  {
    name: "牛排館晚餐",
    poem: "鐵板上的滋滋聲，\n像是對自己的加油掌聲。",
    explain: "適合當作小小慶祝儀式的一餐。",
    calories: "約 900 kcal（一客含配菜）",
    exercise: "建議：快走 60 分鐘，或分散在一天多次活動。",
    bear: "🐻 熊熊說：偶爾犒賞自己是一種充電，不是罪惡。記得享受每一口就好。"
  },
  {
    name: "日式拉麵",
    poem: "湯頭濃郁如同思緒，\n但喝完也要記得好好放下。",
    explain: "濃郁湯頭加上叉燒與溏心蛋，味道偏重鹹。",
    calories: "約 800 kcal（一碗）",
    exercise: "建議：快走 50 分鐘，並多喝白開水。",
    bear: "🐻 熊熊說：湯可以不用全喝完，保留一點空間給明天的自己。"
  },
  {
    name: "關東煮",
    poem: "一格一格的小溫暖，\n是冬夜手心裡的熱度。",
    explain: "清爽湯頭＋多種配料，選擇上可以偏向少油少鹽。",
    calories: "約 350 kcal（多種綜合）",
    exercise: "建議：快走 20 分鐘，或舒服伸展 15 分鐘。",
    bear: "🐻 熊熊說：關東煮很適合想吃熱熱的，又不想太負擔的日子。"
  },
  {
    name: "早餐蛋餅",
    poem: "早晨的一份香，\n讓今天的開始多一點勇氣。",
    explain: "酥脆或軟Q口感，內餡變化很多。",
    calories: "約 350 kcal（一份）",
    exercise: "建議：早上快走 20 分鐘，精神會更好。",
    bear: "🐻 熊熊說：有好好吃早餐的人，心裡也會比較穩定一點。"
  },
  {
    name: "豆漿油條",
    poem: "酥脆與柔軟的組合，\n是台式早餐的老靈魂。",
    explain: "油條偏油，搭配無糖豆漿會平衡一些。",
    calories: "約 500 kcal（一份豆漿＋油條）",
    exercise: "建議：快走 30 分鐘，或樓梯上下 15 分鐘。",
    bear: "🐻 熊熊說：偶爾回味一下老味道，也是在跟過去的自己打招呼。"
  },
  {
    name: "飯糰",
    poem: "把喜歡的小菜都包在一起，\n就像把希望藏在一天的起點。",
    explain: "內餡可能有肉鬆、菜脯、蛋等，很有飽足感。",
    calories: "約 550 kcal（一顆）",
    exercise: "建議：快走 35 分鐘。",
    bear: "🐻 熊熊說：吃完飯糰，今天就有能量面對一點點難關了。"
  },
  {
    name: "綜合水果剉冰",
    poem: "冰涼裡有色彩，\n每一口都是夏天的笑聲。",
    explain: "冰＋水果＋配料，清爽中帶一點甜。",
    calories: "約 350 kcal（一碗）",
    exercise: "建議：夏天可以散步 20–30 分鐘。",
    bear: "🐻 熊熊說：吃冰時也記得照顧喉嚨，太冷可以慢慢吃。"
  },
  {
    name: "黑糖珍珠鮮奶",
    poem: "黑糖在杯裡畫出星空，\n甜甜的宇宙只為你旋轉。",
    explain: "甜度與熱量都偏高，適合當作偶爾的獎勵。",
    calories: "約 520 kcal（一杯）",
    exercise: "建議：快走 35–40 分鐘。",
    bear: "🐻 熊熊說：可以約朋友一起分著喝，甜度會減半，快樂加倍。"
  },
  {
    name: "芒果雪花冰",
    poem: "金黃色的甜，是夏季的陽光切片。",
    explain: "芒果加雪花冰，香甜又消暑。",
    calories: "約 400 kcal（一份）",
    exercise: "建議：快走 25 分鐘。",
    bear: "🐻 熊熊說：如果今天過得很悶，就讓一盤芒果冰當作給自己的小獎品。"
  },
  {
    name: "豆花",
    poem: "柔嫩像雲朵，\n甜味像溫柔的問候。",
    explain: "可以搭配花生、珍珠、紅豆，甜度可調整。",
    calories: "約 250 kcal（一碗）",
    exercise: "建議：散步 15–20 分鐘。",
    bear: "🐻 熊熊說：有時候需要的不是大餐，而是一碗不那麼沉重的甜。"
  },
  {
    name: "車輪餅",
    poem: "一個小圓，包著大宇宙，\n紅豆、奶油都是童年的味道。",
    explain: "路邊常見的小點心，適合下午嘴饞時來一顆。",
    calories: "約 180 kcal（一顆）",
    exercise: "建議：快走 10–15 分鐘。",
    bear: "🐻 熊熊說：嘴巴想吃一點點甜，車輪餅就很剛好。"
  },
  {
    name: "草莓大福",
    poem: "軟Q外皮包著酸甜，\n像一顆剛剛好的心。",
    explain: "麻糬包草莓和餡料，是視覺與味覺都很療癒的小甜點。",
    calories: "約 200 kcal（一顆）",
    exercise: "建議：快走 12–15 分鐘。",
    bear: "🐻 熊熊說：喜歡草莓口味的你，其實也很值得被溫柔對待。"
  },
  {
    name: "菠蘿麵包",
    poem: "外酥內軟的麵包，\n是下午茶與咖啡的好朋友。",
    explain: "酥皮中帶甜，份量紮實。",
    calories: "約 380 kcal（一顆）",
    exercise: "建議：快走 25 分鐘。",
    bear: "🐻 熊熊說：如果今天工作很多，就讓一顆麵包陪你撐過去。"
  },
  {
    name: "鳳梨酥",
    poem: "一口酸甜，\n把思念與祝福都封存在方塊裡。",
    explain: "常作為伴手禮的小點，一顆就頗有飽足感。",
    calories: "約 200 kcal（一顆）",
    exercise: "建議：散步 10–15 分鐘。",
    bear: "🐻 熊熊說：吃鳳梨酥時，可以順便想想今天值得感謝的三件小事。"
  },
  {
    name: "太陽餅",
    poem: "層層酥皮，\n像一頁頁翻過去的日子。",
    explain: "中間夾麥芽餡，甜度較高。",
    calories: "約 220 kcal（一片）",
    exercise: "建議：快走 15 分鐘。",
    bear: "🐻 熊熊說：甜的東西不必一次吃很多，一點點就可以很幸福。"
  },
  {
    name: "鐵板麵",
    poem: "鐵板吱吱作響，\n是早餐也可以很有氣勢的證明。",
    explain: "常見在早點店，可以搭配蛋和肉片。",
    calories: "約 600 kcal（一份）",
    exercise: "建議：快走 35–40 分鐘。",
    bear: "🐻 熊熊說：忙碌的一天之前，先把肚子照顧好是很重要的儀式。"
  },
  {
    name: "蛋炒飯",
    poem: "粒粒分明的飯，\n在鍋裡跳舞，炒出家的味道。",
    explain: "簡單卻經典的一道家常料理。",
    calories: "約 700 kcal（一盤）",
    exercise: "建議：快走 45 分鐘。",
    bear: "🐻 熊熊說：炒飯雖然油一點，但配點青菜、慢慢吃，心情也會跟著變好。"
  },
  {
    name: "炒麵",
    poem: "麵條吸滿醬汁，\n讓平凡的一天多一點香氣。",
    explain: "街邊常見的小吃，份量十足。",
    calories: "約 650 kcal（一盤）",
    exercise: "建議：快走 40 分鐘。",
    bear: "🐻 熊熊說：肚子覺得滿足，心才有力氣面對接下來的事情。"
  },
  {
    name: "鹽水雞",
    poem: "冰涼清爽，\n像深夜裡的一口輕鬆。",
    explain: "可以多選蔬菜、少選加工品，是較清爽的宵夜選擇。",
    calories: "約 350 kcal（一份偏清爽搭配）",
    exercise: "建議：散步 20 分鐘。",
    bear: "🐻 熊熊說：想吃晚餐或宵夜又怕太重，鹽水雞是很不錯的折衷方案。"
  },
  {
    name: "涼麵",
    poem: "芝麻醬與黃瓜絲，\n替夏天降溫的一碗麵。",
    explain: "冷麵條搭配清爽醬汁，適合天氣熱或沒胃口時。",
    calories: "約 500 kcal（一份）",
    exercise: "建議：快走 25–30 分鐘。",
    bear: "🐻 熊熊說：不想吃熱的也沒關係，涼涼的一碗麵也很溫柔。"
  },
  {
    name: "沙拉輕食",
    poem: "繽紛的菜葉與水果，\n像給身體的一封道歉信。",
    explain: "高纖維、低熱量，搭配適量蛋白質更均衡。",
    calories: "約 300 kcal（一份主餐沙拉）",
    exercise: "建議：散步 15–20 分鐘即可。",
    bear: "🐻 熊熊說：照顧自己不一定要嚴格節食，從多一點蔬菜開始也很好。"
  },
  {
    name: "水果便當",
    poem: "一盒彩虹色，\n酸甜中都是維他命的味道。",
    explain: "多種水果切片，適合作為下午點心或清爽一餐。",
    calories: "約 250 kcal（一盒）",
    exercise: "建議：悠閒散步 15 分鐘。",
    bear: "🐻 熊熊說：吃水果不是減肥工具，是在補充你每天需要的能量。"
  },
  {
    name: "芒果",
    poem: "一片金黃，是夏天寫給你的情書。",
    explain: "台灣夏季代表水果，甜度高、維生素也高。",
    calories: "約 135 kcal（一顆中等大小）",
    exercise: "建議：散步 10–15 分鐘。",
    bear: "🐻 熊熊說：水果也有熱量，但同時帶來很多營養，不需要太害怕。"
  },
  {
    name: "西瓜",
    poem: "紅色的甜與水分，\n把夏天的躁動慢慢降溫。",
    explain: "含水量高，適合消暑，但吃多了也會有糖分。",
    calories: "約 80 kcal（一大碗切片）",
    exercise: "建議：輕鬆動一動 10 分鐘就很足夠。",
    bear: "🐻 熊熊說：渴了先喝水，再吃西瓜，身體會更開心。"
  },
  {
    name: "蘋果",
    poem: "每天一顆，\n是送給自己的小小守護。",
    explain: "纖維和維生素都多，當點心很適合。",
    calories: "約 95 kcal（一顆中等）",
    exercise: "建議：走路 10 分鐘就很棒。",
    bear: "🐻 熊熊說：不必每一餐都完美，只要有幾次選擇健康一點，就很值得鼓勵。"
  },
  {
    name: "香蕉",
    poem: "補充能量的黃金弧線，\n讓你不再那麼疲憊。",
    explain: "含鉀與碳水化合物，是很方便的能量來源。",
    calories: "約 105 kcal（一根中等）",
    exercise: "建議：搭配輕鬆走路 10–15 分鐘。",
    bear: "🐻 熊熊說：累的時候先吃根香蕉，再決定要不要繼續奮戰。"
  },
  {
    name: "木瓜牛奶",
    poem: "杯中橘色星雲，\n一口喝掉滿滿的營養。",
    explain: "木瓜加牛奶香甜順口，含有蛋白質與維生素。",
    calories: "約 220 kcal（一杯無加糖）",
    exercise: "建議：散步 15–20 分鐘。",
    bear: "🐻 熊熊說：怕太甜可以少糖，但保留喜歡的味道很重要。"
  },
  {
    name: "甘蔗汁",
    poem: "清甜的液體陽光，\n在喉嚨裡滑過的瞬間好療癒。",
    explain: "解渴又甜，但糖分偏高，適量就好。",
    calories: "約 180 kcal（一杯中杯）",
    exercise: "建議：散步 15 分鐘。",
    bear: "🐻 熊熊說：你可以把它當成小點心，而不是一直灌飲料。"
  },
  {
    name: "手搖無糖茶",
    poem: "無糖不等於無趣，\n有時候清爽才是最懂你的味道。",
    explain: "無糖茶幾乎沒有熱量，是很好的日常飲品。",
    calories: "約 0–5 kcal（一杯）",
    exercise: "建議：只要記得起身活動身體就好。",
    bear: "🐻 熊熊說：想減少糖分的時候，不妨先把飲料改成無糖茶試試。"
  },
  {
    name: "拿鐵咖啡",
    poem: "咖啡香裡混著牛奶，\n是大人版的安慰。",
    explain: "比黑咖啡多了奶和熱量，也多了溫柔口感。",
    calories: "約 150 kcal（一杯中杯）",
    exercise: "建議：散步 15–20 分鐘。",
    bear: "🐻 熊熊說：早上那杯咖啡，不只是提神，也是和自己相處的小儀式。"
  },
  {
    name: "海鮮熱炒",
    poem: "鍋裡火光四射，\n是聚會的笑聲被一起炒熱。",
    explain: "各種海鮮與蔬菜快炒，口味偏重。",
    calories: "約 700 kcal（幾道菜配白飯）",
    exercise: "建議：快走 45 分鐘，或當天多走路、多站一點。",
    bear: "🐻 熊熊說：和喜歡的人一起吃飯，是對心情最好的補給。"
  },
  {
    name: "壽喜燒吃到飽",
    poem: "滿滿的鍋料與肉片，\n像是一場關於飽足的冒險。",
    explain: "吃到飽很容易吃過量，可以專心挑喜歡的食材慢慢吃。",
    calories: "約 1000 kcal（視份量而定）",
    exercise: "建議：當天多分段活動，合計快走 60 分鐘以上。",
    bear: "🐻 熊熊說：不一定要把店家吃垮，吃到剛好開心、肚子舒服就算成功。"
  },
  {
    name: "石頭火鍋宵夜",
    poem: "半夜的鍋，比白天多了一點秘密的快樂。",
    explain: "宵夜時段吃火鍋，雖然爽度高，但負擔也較大。",
    calories: "約 900 kcal（一鍋含主食）",
    exercise: "建議：隔天多活動，多喝水，快走 60 分鐘。",
    bear: "🐻 熊熊說：如果真的好想吃，就選多蔬菜、少炸物，對身體好一點。"
  },
  {
    name: "章魚燒",
    poem: "圓滾滾的小球，\n一口一個，是嘴巴的遊樂園。",
    explain: "外酥內軟的小點，醬料與美乃滋比較重口味。",
    calories: "約 320 kcal（6 顆）",
    exercise: "建議：快走 20 分鐘。",
    bear: "🐻 熊熊說：想吃就好好享受，吃完記得多喝水、多走幾步路就可以。"
  },
  {
    name: "起司蛋糕",
    poem: "綿密的口感，\n把辛苦的那一部分暫時藏起來。",
    explain: "濃郁又香甜，適合慢慢品嚐的小甜點。",
    calories: "約 350 kcal（一片）",
    exercise: "建議：快走 25 分鐘。",
    bear: "🐻 熊熊說：不用愧疚，記得問自己：這一片蛋糕好不好吃？如果有被療癒到，就值得了。"
  },
  {
    name: "布丁",
    poem: "晃呀晃的甜，是童年的搖籃曲。",
    explain: "滑嫩布丁，加上焦糖，很適合作為小點心。",
    calories: "約 180 kcal（一個）",
    exercise: "建議：散步 10–15 分鐘。",
    bear: "🐻 熊熊說：想吃甜食時，選一個真的很愛的，比什麼都吃一點來得幸福。"
  },
  {
    name: "鹹酥蝦",
    poem: "酥脆的殼與鮮甜的肉，\n讓味蕾去海邊度假。",
    explain: "油炸食物，鈉與油脂較高，適合偶爾享受。",
    calories: "約 500 kcal（一盤）",
    exercise: "建議：快走 30–35 分鐘。",
    bear: "🐻 熊熊說：吃之前可以先問自己：現在是嘴巴饞，還是心很累？如果是心累，也要想想能不能休息一下。"
  },
  {
    name: "烤玉米",
    poem: "炭香與醬香，\n把夜市的溫度鎖在每一顆玉米粒裡。",
    explain: "常塗上醬料，口味偏重鹹甜。",
    calories: "約 320 kcal（一支）",
    exercise: "建議：散步 20 分鐘。",
    bear: "🐻 熊熊說：可以請老闆醬少一點，你仍然可以吃到喜歡的味道。"
  },
  {
    name: "烤地瓜",
    poem: "手心裡的一小團溫熱，\n是冬天最樸實的甜。",
    explain: "富含纖維與澱粉，比精緻甜點健康一些。",
    calories: "約 200 kcal（一條中等大小）",
    exercise: "建議：散步 15 分鐘。",
    bear: "🐻 熊熊說：肚子餓又不想吃太重，可以試試烤地瓜當點心。"
  },
  {
    name: "義大利麵",
    poem: "麵條在醬汁裡游泳，\n像腦袋在想像裡來回漂浮。",
    explain: "紅醬、白醬、青醬口味皆有，熱量依醬汁不同略有差異。",
    calories: "約 700 kcal（一份）",
    exercise: "建議：快走 45 分鐘。",
    bear: "🐻 熊熊說：配一點沙拉或蔬菜，讓這餐的顏色更繽紛。"
  },
  {
    name: "泰式打拋豬飯",
    poem: "微辣的香氣，\n喚醒今天有點疲憊的味蕾。",
    explain: "辣味與羅勒香很下飯，要小心不小心吃太多飯。",
    calories: "約 780 kcal（一份含白飯）",
    exercise: "建議：快走 50 分鐘，或跳個 30 分鐘喜歡的音樂。",
    bear: "🐻 熊熊說：辣辣的食物，有時候也在幫你把悶悶的情緒帶走一點。"
  },
  {
    name: "漢堡薯條套餐",
    poem: "一口炸物、一口碳酸，\n是壓力過多時的緊急出口。",
    explain: "高油高熱量，適合作為偶爾的享受，不宜太常吃。",
    calories: "約 950 kcal（一套）",
    exercise: "建議：分散在一天裡多活動，合計快走 60 分鐘以上。",
    bear: "🐻 熊熊說：如果真的很想吃，就好好吃、好好享受，然後下一餐再溫柔地調整就好。"
  },
  {
    name: "披薩",
    poem: "拉起的起司線，\n像是對生活仍有期待的證據。",
    explain: "起司與配料豐富，很適合作為聚餐分享食物。",
    calories: "約 300 kcal（一片中等大小）",
    exercise: "建議：每吃兩片，多快走 20 分鐘。",
    bear: "🐻 熊熊說：記得多喝水、多吃一點蔬菜配著，身體會謝謝你的。"
  },
  {
    name: "炸物拼盤宵夜",
    poem: "深夜的罪惡香氣，\n也是靈魂想被安慰的信號。",
    explain: "綜合炸物熱量偏高，適合多人分享，減少每個人的份量。",
    calories: "約 1000 kcal（一大盤）",
    exercise: "建議：隔天多活動、多喝水，分散快走至少 60 分鐘。",
    bear: "🐻 熊熊說：如果最近宵夜變多，可以試試看一週挑一天特別日子吃就好。"
  },
  {
    name: "關東煮暖暖湯",
    poem: "一口湯暖到心底，\n讓冷冷的世界稍微溫柔一點。",
    explain: "清湯搭配多種食材，較為清爽。",
    calories: "約 280 kcal（幾種食材加湯）",
    exercise: "建議：散步 15–20 分鐘。",
    bear: "🐻 熊熊說：選擇清爽一點，不代表你不能享受，而是你在照顧自己。"
  }
];


// ================== 上供品 12 句熊熊小語 ==================
const offerMessages = [
  "🐻 熊熊說：吃飽才有力氣減肥，減肥不是挨餓，是學會照顧自己。",
  "🐻 熊熊說：你不是變胖了，是變得更值得被好好餵養。",
  "🐻 熊熊說：減肥可以明天開始，但好好吃飯要從今天開始。",
  "🐻 熊熊說：吃東西前先問肚子：你餓了嗎？不要讓壓力幫你點餐。",
  "🐻 熊熊說：偶爾吃宵夜沒關係，但可以順便多喝兩杯水，讓身體輕鬆一點。",
  "🐻 熊熊說：吃飯時專心吃，就不會默默吃太多，是最溫柔的自律。",
  "🐻 熊熊說：吃得開心比吃得完美重要，你已經很努力了。",
  "🐻 熊熊說：有時候需要的是一碗熱湯，不是一堆罪惡感。",
  "🐻 熊熊說：肚子餓是身體的訊號，不是你不夠努力。",
  "🐻 熊熊說：今天有好好吃一餐，就已經在為明天的自己存體力。",
  "🐻 熊熊說：想吃甜點沒關係，記得配一杯水和一點笑聲一起入口。",
  "🐻 熊熊說：上供品給自己，就是承認你值得被好好對待。"
];

// ================== DOM 取得 ==================
const btnDraw    = document.getElementById("btnDraw");
const btnOffer   = document.getElementById("btnOffer");
const btnDiary   = document.getElementById("btnDiary");

const loading      = document.getElementById("loading");
const meritValueEl = document.getElementById("meritValue");
const plusOne      = document.getElementById("plusOne");
const bearImage    = document.getElementById("bearImage");

// Modals
const modalResult      = document.getElementById("modalResult");
const modalResultTitle = document.getElementById("modalResultTitle");
const modalResultPoem  = document.getElementById("modalResultPoem");
const modalResultExplain = document.getElementById("modalResultExplain");
const modalResultCal   = document.getElementById("modalResultCal");
const modalResultExercise = document.getElementById("modalResultExercise");
const modalResultBear  = document.getElementById("modalResultBear");

const modalHistory     = document.getElementById("modalHistory");
const historyListModal = document.getElementById("historyListModal");

const modalOffer       = document.getElementById("modalOffer");
const modalOfferText   = document.getElementById("modalOfferText");

// ================== 狀態 & localStorage ==================
const STORAGE_MERIT   = "luckyg_merit";
const STORAGE_HISTORY = "luckyg_food_history"; // [{time,index}]

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
  if (meritValueEl) meritValueEl.textContent = merit;
}

// ================== +1 功德值動畫 ==================
function showPlusOne(text) {
  if (!plusOne) return;
  plusOne.textContent = text;
  plusOne.classList.remove("show");
  void plusOne.offsetWidth;
  plusOne.classList.add("show");
}

// ================== Modal 開關 ==================
function openResultModal(lot) {
  if (!modalResult) return;
  modalResultTitle.textContent    = lot.name;
  modalResultPoem.textContent     = lot.poem;
  modalResultExplain.textContent  = lot.explain;
  modalResultCal.textContent      = lot.calories;
  modalResultExercise.textContent = lot.exercise;
  modalResultBear.textContent     = lot.bear;
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
      '<p style="font-size:13px;color:#7a4329;">目前還沒有詩籤紀錄，先來抽一籤吧～</p>';
  } else {
    history.slice(0, 20).forEach((item, idx) => {
      const d = new Date(item.time);
      const div = document.createElement("div");
      div.className = "history-item";
      div.dataset.index = item.index;
      div.innerHTML = `
        <span class="history-name">${lots[item.index]?.name || "未知美食"}</span>
        <span class="history-time">${d.toLocaleString("zh-TW", { hour12: false })}</span>
      `;
      historyListModal.appendChild(div);
    });
  }

  modalHistory.classList.add("show");
}

function closeHistory() {
  if (modalHistory) modalHistory.classList.remove("show");
}

function openOfferModal(text) {
  if (!modalOffer) return;
  modalOfferText.textContent = text;
  modalOffer.classList.add("show");
}

function closeOffer() {
  if (modalOffer) modalOffer.classList.remove("show");
}

// 讓 HTML onclick 可以用
window.closeResult  = closeResult;
window.closeHistory = closeHistory;
window.closeOffer   = closeOffer;

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
if (modalOffer) {
  modalOffer.addEventListener("click", (e) => {
    if (e.target === modalOffer) closeOffer();
  });
}

// ================== 事件：抽詩籤 ==================
if (btnDraw) {
  btnDraw.addEventListener("click", () => {
    if (!lots.length) return;

    // 顯示等待＋熊熊搖晃
    if (loading) loading.style.display = "flex";
    btnDraw.disabled = true;
    if (bearImage) bearImage.classList.add("shake");

    setTimeout(() => {
      if (loading) loading.style.display = "none";
      btnDraw.disabled = false;
      if (bearImage) bearImage.classList.remove("shake");

      const index = Math.floor(Math.random() * lots.length);
      const picked = lots[index];
      const now = new Date();

      openResultModal(picked);

      // 功德值 +1
      merit += 1;
      updateMerit();
      showPlusOne("+1 功德值");

      // 存歷史（記錄 index，之後可重看）
      history.unshift({
        time: now.toISOString(),
        index
      });
      if (history.length > 100) history.pop();
      saveState();
    }, 900); // 停頓一下，有抽籤感
  });
}

// ================== 事件：上供品 ==================
if (btnOffer) {
  btnOffer.addEventListener("click", () => {
    merit += 3;
    updateMerit();
    saveState();
    showPlusOne("+3 功德值");

    const msg = offerMessages[Math.floor(Math.random() * offerMessages.length)];
    openOfferModal(msg);
  });
}

// ================== 事件：詩籤日記 ==================
if (btnDiary) {
  btnDiary.addEventListener("click", () => {
    openHistoryModal();
  });
}

// 在日記視窗中點一條紀錄 → 重看那張詩籤
if (historyListModal) {
  historyListModal.addEventListener("click", (e) => {
    const item = e.target.closest(".history-item");
    if (!item) return;
    const idx = parseInt(item.dataset.index, 10);
    if (isNaN(idx) || !lots[idx]) return;

    closeHistory();
    openResultModal(lots[idx]);
  });
}

// ================== 初始化 ==================
loadState();