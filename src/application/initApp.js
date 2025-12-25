import { initThemeOnLoad, exitBatmanMode } from "../presentation/controllers/themeController.js";
import { recreateBackground, initBackgroundInteractions } from "../presentation/controllers/backgroundController.js";
import { initCursorFollower, initMobileMenu, initTabs, initScrollAnimations, initSmoothScroll, initHeaderScrollEffect } from "../presentation/controllers/uiController.js";
import { initProjectsTerminal } from "../projects-terminal.js";
import { initContactForm } from "../presentation/controllers/contactController.js";
import { initPortfolio, bindThemeButtons } from "../presentation/controllers/portfolioController.js";
import { initBlog } from "../presentation/controllers/blogController.js";
import { toggleTheme, activateBatmanMode } from "../presentation/controllers/themeController.js";

export const startApp = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    initThemeOnLoad();
    bindThemeButtons();
    initCursorFollower();
    initMobileMenu();
    initTabs();
    initScrollAnimations();
    initSmoothScroll();
    initHeaderScrollEffect();
    initBackgroundInteractions();
    recreateBackground();
    initProjectsTerminal();
    initContactForm();
    await initPortfolio();
    await initBlog();
  });
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const body = document.body;
      const saved = localStorage.getItem("theme");
      if (saved === "batman" || body.classList.contains("batman-mode")) return;
      if (!saved) {
        if (e.matches) {
          body.classList.remove("light-mode");
          document
            .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
            .forEach((icon) => {
              icon.textContent = "dark_mode";
            });
          const meta = document.getElementById("theme-color-meta");
          if (meta) meta.content = "#0A192F";
        } else {
          body.classList.add("light-mode");
          document
            .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
            .forEach((icon) => {
              icon.textContent = "light_mode";
            });
          const meta = document.getElementById("theme-color-meta");
          if (meta) meta.content = "#f0fffd";
        }
      }
    });
  document.addEventListener("exit-batman", () => exitBatmanMode(null));
  const api = { toggleTheme, activateBatmanMode };
  window.__portfolioAPI__ = api;
};
