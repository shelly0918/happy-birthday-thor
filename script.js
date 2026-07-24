// =================================
// Happy Birthday Thor
// Script
// =================================

// ======================
// 設定
// ======================

const START_DATE = new Date("2026-07-25T00:00:00+08:00");

const tickets = [
  {
    title: "🍽️ 一日請客券",
    text: "使用此券，當天所有消費皆由丸那公主買單。",
  },

  {
    title: "👑 一日主人券",
    text: "使用此券，當天丸那公主將盡力配合 Thor 提出的合理安排與活動，一起度過專屬的一天。",
  },

  {
    title: "🛏️ 一日賴床券",
    text: "使用此券，當天可與丸那公主一起賴床、放鬆一整天，享受悠閒又幸福的兩人時光。",
  },

  {
    title: "🌠 一日願望券",
    text: "使用此券，Thor 可以許下一個願望，由丸那公主盡力協助完成。",
  },

  {
    title: "🎬 一日電影券",
    text: "使用此券，當天可與丸那公主一起觀看一場電影，電影相關消費皆由丸那公主買單。",
  },

  {
    title: "🤗 一日抱抱啾啾券",
    text: "使用此券，當天可與丸那公主抱抱、啾啾一整天，享受滿滿的甜蜜陪伴。",
  },
];

// ======================
// 頁面元素
// ======================

const loading = document.getElementById("loading");

const home = document.getElementById("home");

const game = document.getElementById("game");

const startBtn = document.getElementById("startBtn");

const giftContainer = document.getElementById("giftContainer");

const rewardModal = document.getElementById("rewardModal");

const closeReward = document.getElementById("closeReward");

const status = document.getElementById("status");

// ======================
// Loading
// ======================

window.addEventListener("load", () => {
  setTimeout(() => {
    loading.style.display = "none";
  }, 1500);
});

// ======================
// 開始遊戲
// ======================

startBtn.onclick = function () {
  home.style.display = "none";

  game.style.display = "block";

  createGifts();
};

// ======================
// 建立六個盲盒
// ======================

function createGifts() {
  giftContainer.innerHTML = "";

  let randomTickets = getDailyTickets();

  randomTickets.forEach((ticket) => {
    const gift = document.createElement("div");

    gift.className = "gift";

    gift.innerHTML = `

<div class="box">

🎁

</div>

`;

    gift.onclick = function () {
      if (localStorage.getItem(todayKey())) {
        showOpened();

        return;
      }

      gift.classList.add("opening");

      setTimeout(() => {
        playOpeningEffect();

        openGift(ticket);
      }, 1200);
    };

    giftContainer.appendChild(gift);
  });

  checkToday();
}

// ======================
// 隨機
// ======================

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
// ======================
// 六天固定隨機券
// ======================

function getDayNumber() {
  let now = new Date();

  let diff = now - START_DATE;

  let day = Math.floor(diff / (1000 * 60 * 60 * 24));

  return day;
}

function getDailyTickets() {
  let day = getDayNumber();

  let key = "ThorBirthdayTickets_" + day;

  let saved = localStorage.getItem(key);

  if (saved) {
    return JSON.parse(saved);
  }

  let result = shuffle([...tickets]);

  localStorage.setItem(key, JSON.stringify(result));

  return result;
}

// ======================
// 今日紀錄
// ======================

function todayKey() {
  let today = new Date();

  let date = today.toISOString().substring(0, 10);

  return "ThorBirthday_" + date;
}

// ======================
// 開箱
// ======================

function openGift(ticket) {
  let opened = localStorage.getItem(todayKey());

  if (opened) {
    showOpened();

    return;
  }

  localStorage.setItem(
    todayKey(),

    JSON.stringify(ticket)
  );

  // ======================
  // 開箱特效
  // ======================

  function playOpeningEffect() {
    const effects = document.getElementById("effects");

    /* 彩帶 */

    for (let i = 0; i < 80; i++) {
      let c = document.createElement("div");

      c.className = "confetti";

      c.style.setProperty("--x", Math.random() * 800 - 400 + "px");

      c.style.setProperty("--y", Math.random() * 700 - 350 + "px");

      c.style.background = [
        "#38bdf8",
        "#a855f7",
        "#f472b6",
        "#facc15",
        "#4ade80",
      ][Math.floor(Math.random() * 5)];

      effects.appendChild(c);

      setTimeout(() => {
        c.remove();
      }, 2000);
    }

    /* 粒子 */

    for (let i = 0; i < 40; i++) {
      let p = document.createElement("div");

      p.className = "particle";

      p.style.setProperty("--x", Math.random() * 500 - 250 + "px");

      p.style.setProperty("--y", Math.random() * 500 - 250 + "px");

      effects.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, 1200);
    }
  }
  showReward(ticket);
}

// ======================
// 顯示結果
// ======================
// ======================
// 開箱特效
// ======================

function playOpeningEffect() {
  const effects = document.getElementById("effects");

  // 彩帶

  for (let i = 0; i < 80; i++) {
    let c = document.createElement("div");

    c.className = "confetti";

    c.style.setProperty("--x", Math.random() * 800 - 400 + "px");

    c.style.setProperty("--y", Math.random() * 700 - 350 + "px");

    c.style.background = [
      "#38bdf8",
      "#a855f7",
      "#f472b6",
      "#facc15",
      "#4ade80",
    ][Math.floor(Math.random() * 5)];

    effects.appendChild(c);

    setTimeout(() => {
      c.remove();
    }, 2000);
  }

  // 粒子

  for (let i = 0; i < 40; i++) {
    let p = document.createElement("div");

    p.className = "particle";

    p.style.setProperty("--x", Math.random() * 500 - 250 + "px");

    p.style.setProperty("--y", Math.random() * 500 - 250 + "px");

    effects.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 1200);
  }
}
function showReward(ticket) {
  document.getElementById("ticketTitle").innerHTML = ticket.title;

  document.getElementById("ticketText").innerHTML = ticket.text;

  rewardModal.style.display = "flex";

  checkToday();

  // 六天完成後觸發彩蛋
  checkFinalSurprise();
}

closeReward.onclick = function () {
  rewardModal.style.display = "none";
};

// ======================
// 今日狀態
// ======================

function checkToday() {
  let opened = localStorage.getItem(todayKey());

  if (opened) {
    status.innerHTML = "❤️ 今天已開啟<br>明天再來";
  } else {
    status.innerHTML = "✨ 今天還有一個驚喜等待 Thor";
  }
}

function showOpened() {
  alert("今天已開啟 ❤️\n明天再來");
}

// ======================
// Admin
// ======================

const adminTrigger = document.getElementById("adminTrigger");

const adminPanel = document.getElementById("adminPanel");

const loginAdmin = document.getElementById("loginAdmin");

const adminPassword = document.getElementById("adminPassword");

const adminContent = document.getElementById("adminContent");

let adminCount = 0;

adminTrigger.onclick = function () {
  adminCount++;

  if (adminCount >= 5) {
    adminPanel.style.display = "flex";
  }
};

loginAdmin.onclick = function () {
  if (adminPassword.value === "0918") {
    adminContent.style.display = "block";
  } else {
    alert("密碼錯誤");
  }
};

document.getElementById("resetToday").onclick = function () {
  localStorage.removeItem(todayKey());

  alert("今日已重置");

  checkToday();
};

document.getElementById("clearAll").onclick = function () {
  localStorage.clear();

  alert("全部資料清除");
};

document.getElementById("showTickets").onclick = function () {
  document.getElementById("adminResult").innerHTML = tickets
    .map((item) => item.title)
    .join("<br>");
};
// ======================
// Countdown
// ======================

// ======================
// Birthday Countdown System
// ======================

const startDate = new Date("2026-07-25T00:00:00");

const totalDays = 6;

function updateCountdown() {
  const countdown = document.getElementById("countdown");

  if (!countdown) return;

  const now = new Date();

  const diffStart = startDate - now;

  // 活動開始前

  if (diffStart > 0) {
    countdown.innerHTML = "距離生日驚喜開始<br>" + formatTime(diffStart);

    return;
  }

  const dayIndex = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  // 活動結束

  if (dayIndex >= totalDays) {
    countdown.innerHTML = "🎉 Happy Birthday Thor ❤️";

    return;
  }

  // 下一天午夜

  let nextDay = new Date(startDate);

  nextDay.setDate(startDate.getDate() + dayIndex + 1);

  const diff = nextDay - now;

  countdown.innerHTML = "下一份驚喜倒數<br>" + formatTime(diff);
}

function formatTime(ms) {
  const day = Math.floor(ms / (1000 * 60 * 60 * 24));

  const hour = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const min = Math.floor((ms / (1000 * 60)) % 60);

  const sec = Math.floor((ms / 1000) % 60);

  if (day > 0) {
    return `${day}天 ${String(hour).padStart(2, "0")}:${String(min).padStart(
      2,
      "0"
    )}:${String(sec).padStart(2, "0")}`;
  }

  return `${String(hour).padStart(2, "0")}:${String(min).padStart(
    2,
    "0"
  )}:${String(sec).padStart(2, "0")}`;
}

setInterval(updateCountdown, 1000);

updateCountdown();
// ======================
// Admin Mode
// ======================

const ADMIN_PASSWORD = "0918";

const adminBtn = document.getElementById("adminBtn");

const adminLogin = document.getElementById("adminLogin");

if (adminBtn) {
  adminBtn.onclick = function () {
    adminPanel.style.display = "block";
  };
}

if (adminLogin) {
  adminLogin.onclick = function () {
    if (adminPassword.value === ADMIN_PASSWORD) {
      adminContent.style.display = "block";
    } else {
      alert("密碼錯誤");
    }
  };
}

console.log(document.getElementById("adminBtn"));
// ======================
// Final Birthday Surprise
// ======================

function checkFinalSurprise() {
  let openedCount = 0;

  for (let i = 0; i < 6; i++) {
    let key = "ThorBirthdayTickets_" + i;

    if (localStorage.getItem(key)) {
      openedCount++;
    }
  }

  if (openedCount >= 6) {
    setTimeout(() => {
      document.getElementById("finalSurprise").style.display = "flex";
    }, 1500);
  }
}
const closeSurprise = document.getElementById("closeSurprise");

if (closeSurprise) {
  closeSurprise.onclick = function () {
    document.getElementById("finalSurprise").style.display = "none";
  };
}
