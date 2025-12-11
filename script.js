btnDraw.addEventListener("click", () => {
  loading.style.display = "flex";
  resultCard.style.display = "none";

  setTimeout(() => {
    loading.style.display = "none";

    const picked = lots[Math.floor(Math.random() * lots.length)];
    const now = new Date();

    // 填入 modal 內容
    document.getElementById("modalResultTitle").textContent = picked.title;
    document.getElementById("modalResultMain").textContent = picked.main;
    document.getElementById("modalResultTag").textContent = "關鍵字：" + picked.tag;
    document.getElementById("modalResultBear").textContent = picked.bear;

    // 顯示 Modal
    document.getElementById("modalResult").classList.add("show");

    // 功德值 +1
    merit += 1;
    updateMerit();
    showPlusOne("+1 功德值");

    // 存歷史
    history.unshift({
      time: now.toISOString(),
      title: picked.title,
      main: picked.main
    });
    if (history.length > 20) history.pop();

    saveState();

  }, 900);
});