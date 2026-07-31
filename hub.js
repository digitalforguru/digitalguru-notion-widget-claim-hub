const widgets = [
  {
    key: "calendar",
    title: "Calendar Widget",
    label: "monthly Notion calendar",
    status: ["new", "monthly", "ipad ☑"],
    preview: "calendar-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-calendar-widget/"
  },
  {
    key: "journal",
    title: "Journal Widget",
    label: "daily digital Notion journal with prompts",
    status: ["new", "cloud save", "ipad ☑"],
    preview: "journal-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-journal-widget/"
  },
  {
    key: "clock",
    title: "Live Clock Widget",
    label: "real-time Notion clock",
    status: ["new", "popular", "ipad ☑"],
    preview: "clock-preview.png",
    link: "https://digitalforguru.github.io/digitialgurus-notion-live-clock-widget/"
  },
  {
    key: "affirmations",
    title: "Daily Affirmation Widget",
    label: "random daily Notion affirmations",
    status: ["new", "wellness", "ipad ☑"],
    preview: "affirmation-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-affirmations-widget/"
  },
  {
    key: "weekly-weather",
    title: "Weekly Weather Widget",
    label: "7-day live forecast made for Notion embeds",
    status: ["new", "weather", "#1 THIS WEEK", "ipad ☑"],
    preview: "weekly-weather-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-weekly-weather-widget/"
  },
  {
    key: "countdown",
    title: "Countdown Widget",
    label: "create a Notion countdown for anything (includes 20+ custom icons)",
    status: ["new", "popular", "icons", "ipad ☑"],
    preview: "countdown-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-countdown-widget/"
  },
  {
    key: "mood",
    title: "Mood Tracker Widget",
    label: "weekly mood tracker made for Notion (includes yearly mood grid log)",
    status: ["new", "cloud save", "ipad ☑"],
    preview: "mood-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-mood-tracker-widget/"
  },
  {
    key: "vision-board",
    title: "Vision Board Widget",
    label: "customizable vision board made for Notion (includes custom stickers)",
    status: ["new", "popular", "stickers", "ipad ☑"],
    preview: "vision-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-grid-vision-board-widget/"
  },
  {
    key: "horoscope",
    title: "Horoscope Widget",
    label: "daily horoscope made for Notion",
    status: ["new", "wellness", "ipad ☑"],
    preview: "horoscope-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-horoscope-widget/"
  },
  {
    key: "weather",
    title: "Live Weather Widget",
    label: "live weather each day built for Notion",
    status: ["new", "weather", "live", "ipad ☑"],
    preview: "weather-preview.png",
    link: "https://digitalforguru.github.io/digitalgurus-notion-weather-widget/"
  }
];

const accessCodes = {
  MYLIFEDASH: ["affirmations", "clock", "weather"],
  STUDYSUNNYRU: ["weather"],
  DGLAUNCHURU: ["calendar", "clock", "horoscope", "weather"],
  MYDGWIDGETS: ["all"]
};

const accessInput = document.getElementById("accessInput");
const unlockBtn = document.getElementById("unlockBtn");
const accessMessage = document.getElementById("accessMessage");
const widgetLibrary = document.getElementById("widgetLibrary");
const widgetGrid = document.getElementById("widgetGrid");

let currentUnlocked = [];

function normalizeCode(code) {
  return code.trim().toUpperCase();
}

function getUnlockedKeys(code) {
  const normalizedCode = normalizeCode(code);
  return accessCodes[normalizedCode] || [];
}

function getVisibleWidgets(unlockedKeys = []) {
  if (unlockedKeys.includes("all")) {
    return widgets;
  }

  return widgets.filter((widget) => unlockedKeys.includes(widget.key));
}

function renderWidgets(unlockedKeys = []) {
  widgetGrid.innerHTML = "";

  const visibleWidgets = getVisibleWidgets(unlockedKeys);

  if (!visibleWidgets.length) {
    widgetLibrary.classList.add("hidden");
    return;
  }

  visibleWidgets.forEach((widget) => {
    const card = document.createElement("a");

    card.className = "widget-card unlocked";
    card.href = widget.link;
    card.target = "_blank";

    card.innerHTML = `
      <div class="status-row">
        ${widget.status.map((tag) => `<span class="status-pill">${tag}</span>`).join(" ")}
        <span class="lock-pill">
          <img 
            class="lock-icon" 
            src="unlocked.png" 
            alt="unlocked"
          />
          unlocked
        </span>
      </div>

      <div class="widget-card-title">${widget.title}</div>
      <div class="widget-card-label">${widget.label}</div>
      <img class="widget-preview" src="${widget.preview}" alt="">
    `;

    widgetGrid.appendChild(card);
  });

  widgetLibrary.classList.remove("hidden");
}

function unlockWidgets() {
  const code = normalizeCode(accessInput.value);
  const unlockedKeys = getUnlockedKeys(code);

  if (!unlockedKeys.length) {
    accessMessage.textContent = "code not found, try again ✧";
    currentUnlocked = [];
    localStorage.removeItem("digitalguruAccessCode");
    renderWidgets([]);
    return;
  }

  currentUnlocked = unlockedKeys;
  localStorage.setItem("digitalguruAccessCode", code);

  accessMessage.textContent = "studio unlocked ✧";
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
