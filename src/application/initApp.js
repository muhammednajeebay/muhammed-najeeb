import { initThemeOnLoad, exitBatmanMode } from "../presentation/controllers/themeController.js";
import { recreateBackground, initBackgroundInteractions } from "../presentation/controllers/backgroundController.js";
import { initCursorFollower, initMobileMenu, initTabs, initScrollAnimations, initSmoothScroll, initHeaderScrollEffect } from "../presentation/controllers/uiController.js";
import { initProjectsTerminal } from "../projects-terminal.js";
import { initContactForm } from "../presentation/controllers/contactController.js";
import { initPortfolio, bindThemeButtons } from "../presentation/controllers/portfolioController.js";
import { initBlog } from "../presentation/controllers/blogController.js";
import { toggleTheme, activateBatmanMode } from "../presentation/controllers/themeController.js";
import { splashController } from "../presentation/controllers/splashController.js";

export const startApp = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    // Initialize theme FIRST
    initThemeOnLoad();
    bindThemeButtons();
    
    // Show splash screen with correct theme
    splashController.show();
    splashController.applyCurrentTheme();
    
    // Update splash screen theme when theme changes
    const observer = new MutationObserver(() => {
      splashController.applyCurrentTheme();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    // Initialize UI components
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
    
    // Load portfolio data with progress tracking
    try {
      await splashController.trackLoadingProgress(
        Promise.all([
          initPortfolio(),
          initBlog()
        ]),
        3000 // Estimated duration
      );
      console.log('Loading completed, progress:', splashController.currentProgress);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      // Still hide splash screen even if there's an error
      splashController.updateProgress(100);
    }
    
    // Ensure we're at 100% then hide splash screen
    splashController.updateProgress(100);
    console.log('Hiding splash screen');
    splashController.hide();
    
    // Clean up observer
    observer.disconnect();
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
