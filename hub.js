const widgets = [
  {
    key: "calendar",
    title: "Calendar Widget",
    label: "monthly Notion calendar",
    link: "https://digitalforguru.github.io/digitalgurus-notion-calendar-widget/"
  },
  {
    key: "journal",
    title: "Journal Widget",
    label: "daily digital journal",
    link: "https://digitalforguru.github.io/digitalgurus-notion-journal-widget/"
  },
  {
    key: "clock",
    title: "Live Clock Widget",
    label: "real-time clock",
    link: "https://digitalforguru.github.io/digitialgurus-notion-live-clock-widget/"
  },
  {
    key: "affirmations",
    title: "Daily Affirmation Widget",
    label: "soft daily affirmations",
    link: "https://digitalforguru.github.io/digitalgurus-notion-affirmations-widget/"
  },
  {
    key: "weekly-weather",
    title: "Weekly Weather Widget",
    label: "7-day forecast",
    link: "https://digitalforguru.github.io/digitalgurus-notion-weekly-weather-widget/"
  },
  {
    key: "countdown",
    title: "Countdown Widget",
    label: "count down to anything",
    link: "https://digitalforguru.github.io/digitalgurus-notion-countdown-widget/"
  },
  {
    key: "mood",
    title: "Mood Tracker Widget",
    label: "weekly mood tracker",
    link: "https://digitalforguru.github.io/digitalgurus-notion-mood-tracker-widget/"
  },
  {
    key: "vision-board",
    title: "Vision Board Widget",
    label: "mini aesthetic board",
    link: "https://digitalforguru.github.io/digitalgurus-notion-grid-vision-board-widget/"
  },
  {
    key: "horoscope",
    title: "Horoscope Widget",
    label: "daily zodiac vibes",
    link: "https://digitalforguru.github.io/digitalgurus-notion-horoscope-widget/"
  },
  {
    key: "weather",
    title: "Weather Widget",
    label: "current weather card",
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

function getUnlockedWidgets(code) {
  const unlocked = accessCodes[code];

  if (!unlocked) return [];

  if (unlocked.includes("all")) return widgets;

  return widgets.filter(widget => unlocked.includes(widget.key));
}

function renderWidgets(unlockedWidgets) {
  widgetGrid.innerHTML = "";

  unlockedWidgets.forEach(widget => {
    const card = document.createElement("a");

    card.className = "widget-card";
    card.href = widget.link;
    card.target = "_blank";

    card.innerHTML = `
      <div class="widget-card-title">${widget.title}</div>
      <div class="widget-card-label">${widget.label}</div>
    `;

    widgetGrid.appendChild(card);
  });
}

function unlockWidgets() {
  const code = accessInput.value.trim().toUpperCase();
  const unlockedWidgets = getUnlockedWidgets(code);

  if (!unlockedWidgets.length) {
    accessMessage.textContent = "code not found, try again ✧";
    widgetLibrary.classList.add("hidden");
    return;
  }

  localStorage.setItem("digitalguruAccessCode", code);

  accessMessage.textContent = "unlocked ✧";
  renderWidgets(unlockedWidgets);
  widgetLibrary.classList.remove("hidden");
}

unlockBtn.addEventListener("click", unlockWidgets);

accessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockWidgets();
});

window.addEventListener("DOMContentLoaded", () => {
  const savedCode = localStorage.getItem("digitalguruAccessCode");

  if (!savedCode) return;

  accessInput.value = savedCode;

  const unlockedWidgets = getUnlockedWidgets(savedCode);

  if (unlockedWidgets.length) {
    accessMessage.textContent = "welcome back ✧";
    renderWidgets(unlockedWidgets);
    widgetLibrary.classList.remove("hidden");
  }
});
