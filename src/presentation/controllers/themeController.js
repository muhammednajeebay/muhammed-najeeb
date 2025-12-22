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

const runBlockSpreadAnimation = (buttonElement) => {
  // Remove any existing overlay
  const existing = document.querySelector(".theme-transition-overlay");
  if (existing) existing.remove();

  // Create overlay container
  const overlay = document.createElement("div");
  overlay.className = "theme-transition-overlay";

  // Get button position for animation origin
  let originX = window.innerWidth / 2;
  let originY = window.innerHeight / 2;
  
  if (buttonElement) {
    const rect = buttonElement.getBoundingClientRect();
    originX = rect.left + rect.width / 2;
    originY = rect.top + rect.height / 2;
  }

  // Create grid of blocks (20x20 = 400 blocks)
  const gridSize = 20;
  const blocks = [];
  
  for (let i = 0; i < gridSize * gridSize; i++) {
    const block = document.createElement("div");
    block.className = "theme-transition-block";
    
    // Calculate block position
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const blockX = (col + 0.5) * (window.innerWidth / gridSize);
    const blockY = (row + 0.5) * (window.innerHeight / gridSize);
    
    // Calculate distance from origin
    const dx = blockX - originX;
    const dy = blockY - originY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = Math.sqrt(
      window.innerWidth * window.innerWidth + 
      window.innerHeight * window.innerHeight
    );
    
    // Stagger animation based on distance
    const delay = (distance / maxDistance) * 400; // Max 400ms delay
    block.style.animationDelay = `${delay}ms`;
    
    blocks.push(block);
    overlay.appendChild(block);
  }

  body.appendChild(overlay);

  // Remove overlay after animation completes
  setTimeout(() => {
    overlay.remove();
  }, 1000); // 600ms animation + 400ms max delay
};

export const activateBatmanMode = (buttonElement) => {
  runBlockSpreadAnimation(buttonElement);
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

export const exitBatmanMode = (buttonElement) => {
  runBlockSpreadAnimation(buttonElement);
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

export const toggleTheme = (buttonElement) => {
  if (body.classList.contains("batman-mode")) {
    exitBatmanMode(buttonElement);
    return;
  }
  runBlockSpreadAnimation(buttonElement);
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
