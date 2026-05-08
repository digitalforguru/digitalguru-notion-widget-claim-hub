const widgets = [
  {
    key: "calendar",
    title: "Calendar Widget",
    label: "monthly Notion calendar",
    status: ["planning", "builder included"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-calendar-widget/"
  },
  {
    key: "journal",
    title: "Journal Widget",
    label: "daily digital journal",
    status: ["new", "cloud save"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-journal-widget/"
  },
  {
    key: "clock",
    title: "Live Clock Widget",
    label: "real-time clock",
    status: ["simple", "ipad ready"],
    link: "https://digitalforguru.github.io/digitialgurus-notion-live-clock-widget/"
  },
  {
    key: "affirmations",
    title: "Daily Affirmation Widget",
    label: "soft daily affirmations",
    status: ["wellness", "daily"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-affirmations-widget/"
  },
  {
    key: "weekly-weather",
    title: "Weekly Weather Widget",
    label: "7-day forecast",
    status: ["weather", "builder included"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-weekly-weather-widget/"
  },
  {
    key: "countdown",
    title: "Countdown Widget",
    label: "count down to anything",
    status: ["popular", "customizable"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-countdown-widget/"
  },
  {
    key: "mood",
    title: "Mood Tracker Widget",
    label: "weekly mood tracker",
    status: ["cloud save", "ipad optimized"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-mood-tracker-widget/"
  },
  {
    key: "vision-board",
    title: "Vision Board Widget",
    label: "mini aesthetic board",
    status: ["aesthetic", "visual"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-grid-vision-board-widget/"
  },
  {
    key: "horoscope",
    title: "Horoscope Widget",
    label: "daily zodiac vibes",
    status: ["daily", "fun"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-horoscope-widget/"
  },
  {
    key: "weather",
    title: "Weather Widget",
    label: "current weather card",
    status: ["weather", "live"],
    link: "https://digitalforguru.github.io/digitalgurus-notion-weather-widget/"
  }
];

const accessCodes = {
  DGALL2026: ["all"],
  DGCALENDAR2026: ["calendar"],
  DGJOURNAL2026: ["journal"],
  DGCLOCK2026: ["clock"],
  DGAFFIRM2026: ["affirmations"],
  DGWEEKLY2026: ["weekly-weather"],
  DGCOUNTDOWN2026: ["countdown"],
  DGMOOD2026: ["mood"],
  DGVISION2026: ["vision-board"],
  DGHORO2026: ["horoscope"],
  DGWEATHER2026: ["weather"]
};

const accessInput = document.getElementById("accessInput");
const unlockBtn = document.getElementById("unlockBtn");
const accessMessage = document.getElementById("accessMessage");
const widgetLibrary = document.getElementById("widgetLibrary");
const widgetGrid = document.getElementById("widgetGrid");

let currentUnlocked = [];

function getUnlockedKeys(code) {
  return accessCodes[code] || [];
}

function renderWidgets(unlockedKeys = []) {
  widgetGrid.innerHTML = "";

  const unlocksAll = unlockedKeys.includes("all");

  widgets.forEach(widget => {
    const isUnlocked = unlocksAll || unlockedKeys.includes(widget.key);

    const card = document.createElement(isUnlocked ? "a" : "div");

    card.className = `widget-card ${isUnlocked ? "unlocked" : "locked"}`;

    if (isUnlocked) {
      card.href = widget.link;
      card.target = "_blank";
    }

    card.innerHTML = `
      <div class="status-row">
        ${widget.status.map(tag => `<span class="status-pill">${tag}</span>`).join("")}
        <span class="lock-pill">
  <img 
    class="lock-icon" 
    src="${isUnlocked ? "unlocked.png" : "locked.png"}" 
    alt="${isUnlocked ? "unlocked" : "locked"}"
  />
  ${isUnlocked ? "unlocked" : "locked"}
</span>
      </div>

      <div class="widget-card-title">${widget.title}</div>
      <div class="widget-card-label">${widget.label}</div>
    `;

    widgetGrid.appendChild(card);
  });

  widgetLibrary.classList.remove("hidden");
}

function unlockWidgets() {
  const code = accessInput.value.trim().toUpperCase();
  const unlockedKeys = getUnlockedKeys(code);

  if (!unlockedKeys.length) {
    accessMessage.textContent = "code not found, try again ✧";
    currentUnlocked = [];
    renderWidgets([]);
    return;
  }

  currentUnlocked = unlockedKeys;
  localStorage.setItem("digitalguruAccessCode", code);

  accessMessage.textContent = "unlocked ✧";
  renderWidgets(currentUnlocked);
}

unlockBtn.addEventListener("click", unlockWidgets);

accessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockWidgets();
});

window.addEventListener("DOMContentLoaded", () => {
  const savedCode = localStorage.getItem("digitalguruAccessCode");

  if (savedCode) {
    accessInput.value = savedCode;
    currentUnlocked = getUnlockedKeys(savedCode);

    if (currentUnlocked.length) {
      accessMessage.textContent = "welcome back ✧";
      renderWidgets(currentUnlocked);
      return;
    }
  }

  renderWidgets([]);
});
