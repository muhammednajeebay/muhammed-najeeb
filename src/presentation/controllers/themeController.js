import { getThemePreference, setThemePreference } from "../../infrastructure/storage/themePreference.js";

const body = document.body;

const updateThemeColor = (isDark, batman = false) => {
  const meta = document.getElementById("theme-color-meta");
  if (!meta) return;
  meta.content = batman ? "#1a1a1a" : isDark ? "#0A192F" : "#f0fffd";
};

const setTypingTextAndAnimate = (text) => {
  const el = document.querySelector(".typing-text");
  if (!el) return;
  el.setAttribute("data-text", text);
  el.textContent = "";
  let i = 0;
  const step = () => {
    if (i < text.length) {
      el.textContent = text.substring(0, i + 1);
      i += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 200);
};

const animateHeroSvg = () => {
  const paths = document
    .querySelector(".about-image-wrapper svg")
    ?.querySelectorAll("path");
  if (!paths) return;
  paths.forEach((p) => {
    const len = p.getTotalLength();
    p.style.transition = "none";
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    p.getBoundingClientRect();
    p.style.transition = "stroke-dashoffset 8s ease-in-out";
    p.style.strokeDashoffset = "0";
  });
};

const restoreHeroSvg = () => {
  const wrapper = document.querySelector(".about-image-wrapper");
  if (!wrapper) return;
  const heroSvg = wrapper.querySelector("svg:not(.bat-symbol)");
  const batSvg = wrapper.querySelector(".bat-symbol");
  if (heroSvg && batSvg) {
    heroSvg.style.display = heroSvg.dataset.originalDisplay || "";
    batSvg.remove();
  }
};

let typingSwitchTimeout = null;

const setIconsForTheme = (isDark) => {
  document
    .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
    .forEach((icon) => {
      icon.textContent = isDark ? "dark_mode" : "light_mode";
    });
};

const runGlitchOverlay = () => {
  const existing = document.querySelector(".glitch-overlay");
  if (existing) existing.remove();
  const overlay = document.createElement("div");
  overlay.className = "glitch-overlay";
  overlay.addEventListener("animationend", () => {
    overlay.remove();
  });
  body.appendChild(overlay);
};

export const activateBatmanMode = () => {
  runGlitchOverlay();
  body.classList.add("batman-mode");
  body.classList.remove("light-mode");
  setIconsForTheme(true);
  updateThemeColor(true, true);
  setThemePreference("batman");
  const header = document.querySelector("header");
  if (header && window.scrollY > 50) {
    header.style.backgroundColor = "rgba(22, 22, 22, 0.9)";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
  }
  document.dispatchEvent(new CustomEvent("recreate-background"));
  animateHeroSvg();
  if (typingSwitchTimeout) {
    clearTimeout(typingSwitchTimeout);
    typingSwitchTimeout = null;
  }
  setTypingTextAndAnimate("I build things for mobile.");
  typingSwitchTimeout = setTimeout(() => {
    setTypingTextAndAnimate("I AM BATMAN");
  }, 2500);
};

export const exitBatmanMode = () => {
  runGlitchOverlay();
  body.classList.remove("batman-mode");
  const isDark = !body.classList.contains("light-mode");
  setIconsForTheme(isDark);
  updateThemeColor(isDark);
  setThemePreference(isDark ? "dark" : "light");
  animateHeroSvg();
  const header = document.querySelector("header");
  if (header && window.scrollY > 50) {
    header.style.backgroundColor = body.classList.contains("light-mode")
      ? "rgba(185, 185, 185, 0.8)"
      : "rgba(10, 25, 47, 0.8)";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
  } else if (header) {
    header.style.backgroundColor = "transparent";
    header.style.boxShadow = "none";
  }
  document.dispatchEvent(new CustomEvent("recreate-background"));
  restoreHeroSvg();
  if (typingSwitchTimeout) {
    clearTimeout(typingSwitchTimeout);
    typingSwitchTimeout = null;
  }
  setTypingTextAndAnimate("I build things for mobile.");
};

export const toggleTheme = () => {
  if (body.classList.contains("batman-mode")) {
    exitBatmanMode();
    return;
  }
  runGlitchOverlay();
  body.classList.toggle("light-mode");
  const isDark = !body.classList.contains("light-mode");
  setIconsForTheme(isDark);
  updateThemeColor(isDark);
  setThemePreference(isDark ? "dark" : "light");
  animateHeroSvg();
};

export const initThemeOnLoad = () => {
  const saved = getThemePreference();
  if (saved === "batman") {
    activateBatmanMode();
    return;
  }
  if (!saved) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      body.classList.remove("light-mode");
      setIconsForTheme(true);
      updateThemeColor(true);
    } else {
      body.classList.add("light-mode");
      setIconsForTheme(false);
      updateThemeColor(false);
    }
  } else {
    if (saved === "light") {
      body.classList.add("light-mode");
      setIconsForTheme(false);
      updateThemeColor(false);
    } else {
      body.classList.remove("light-mode");
      setIconsForTheme(true);
      updateThemeColor(true);
    }
  }
  animateHeroSvg();
};
