import { fetchPortfolioContent } from "../../infrastructure/http/portfolio.js";
import { activateBatmanMode, toggleTheme } from "./themeController.js";
import { populateProjects } from "./projectsController.js";

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

const populateHero = (hero) => {
  if (!hero) return;
  const subtitleEl = document.querySelector(".hero-subtitle");
  const nameEl = document.querySelector(".hero-title");
  const typingEl = document.querySelector(".typing-text");
  const descEl = document.querySelector(".hero-description");
  const ctaEl = document.querySelector(".cta-button");
  if (subtitleEl && hero.greeting) subtitleEl.textContent = hero.greeting;
  if (nameEl && hero.name) nameEl.textContent = hero.name;
  if (typingEl && hero.typingText) {
    typingEl.setAttribute("data-text", hero.typingText);
    typingEl.textContent = "";
  }
  if (descEl && hero.description) descEl.textContent = hero.description;
  const socialLinksContainer = document.querySelector(".hero-social-links");
  if (socialLinksContainer && hero.social) {
    const allLinks = socialLinksContainer.querySelectorAll("a.social-link");
    allLinks.forEach((link) => {
      const ariaLabel = link.getAttribute("aria-label")?.toLowerCase() || "";
      if (ariaLabel.includes("linkedin") && hero.social.linkedin) {
        link.href = hero.social.linkedin;
      } else if (ariaLabel.includes("github") && hero.social.github) {
        link.href = hero.social.github;
      } else if (ariaLabel.includes("medium") && hero.social.medium) {
        link.href = hero.social.medium;
      } else if (ariaLabel.includes("email") && hero.social.email) {
        link.href = `mailto:${hero.social.email}`;
      } else if (ariaLabel.includes("resume") && hero.social.resume) {
        link.href = hero.social.resume;
      }
    });
  }
  if (ctaEl && hero.cta) {
    if (hero.cta.label) {
      ctaEl.innerHTML = `
        <span class="material-icons-outlined" style="font-size: 1rem; margin-right: 0.5rem">send</span>
        ${hero.cta.label}
      `;
    }
    if (hero.cta.targetId) ctaEl.setAttribute("href", hero.cta.targetId);
  }
  if (hero.typingText) setTypingTextAndAnimate(hero.typingText);
};

const populateAbout = (about) => {
  if (!about) return;
  const container = document.querySelector(".about-text");
  if (!container) return;
  if (Array.isArray(about.paragraphsHtml)) {
    container.innerHTML = about.paragraphsHtml.map((p) => `<p>${p}</p>`).join("");
  }
};

const populateValuesGoals = (valuesGoals) => {
  if (!valuesGoals) return;
  const el = document.querySelector(".values-goals-text");
  if (!el) return;
  const parts = [];
  if (valuesGoals.valuesHtml) parts.push(`<p>${valuesGoals.valuesHtml}</p>`);
  if (valuesGoals.goalsHtml) parts.push(`<p>${valuesGoals.goalsHtml}</p>`);
  if (parts.length) el.innerHTML = parts.join("");
};

const populateExperience = (experiences) => {
  if (!Array.isArray(experiences)) return;
  experiences.forEach((exp) => {
    if (!exp.tabId) return;
    const tab = document.getElementById(exp.tabId);
    if (!tab) return;
    const titleEl = tab.querySelector(".job-title");
    const companyEl = tab.querySelector(".job-company");
    const durationEl = tab.querySelector(".job-duration");
    const listEl = tab.querySelector(".job-description ul");
    if (titleEl && exp.title) titleEl.textContent = exp.title;
    if (companyEl && exp.company) companyEl.textContent = exp.company;
    if (durationEl && exp.duration) durationEl.textContent = exp.duration;
    if (listEl && Array.isArray(exp.highlights)) {
      listEl.innerHTML = "";
      exp.highlights.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = item;
        listEl.appendChild(li);
      });
    }
  });
  const tabs = document.querySelectorAll(".experience-tabs .tab-button");
  experiences.forEach((exp, index) => {
    if (!exp.companyShort) return;
    const tabBtn = tabs[index];
    if (tabBtn) tabBtn.textContent = exp.companyShort;
  });
};

const populateSkillCategories = (categories) => {
  if (!Array.isArray(categories)) return;
  const terminalOutput = document.getElementById("terminal-output");
  const terminalTabs = document.querySelectorAll(".terminal-tab");
  const activeCategorySpan = document.querySelector(".active-category");
  if (!terminalOutput || !terminalTabs.length) return;
  const displayCategory = (name) => {
    const category = categories.find((c) => c.title === name);
    if (!category) return;
    if (activeCategorySpan) activeCategorySpan.textContent = name;
    terminalOutput.innerHTML = "";
    if (Array.isArray(category.items)) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < category.items.length; i += 1) {
        const div = document.createElement("div");
        div.className = "skill-item-terminal";
        div.textContent = category.items[i];
        div.style.animationDelay = `${i * 0.05}s`;
        frag.appendChild(div);
      }
      terminalOutput.appendChild(frag);
    }
  };
  terminalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      terminalTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const name = tab.getAttribute("data-category");
      displayCategory(name);
    });
  });
  const first = categories[0];
  if (first) displayCategory(first.title);
};

const populateFooter = (social) => {
  if (!social) return;
  const footerLinks = document.querySelectorAll("footer .social-links a.social-link");
  footerLinks.forEach((link) => {
    const ariaLabel = link.getAttribute("aria-label")?.toLowerCase() || "";
    if (ariaLabel.includes("linkedin") && social.linkedin) {
      link.href = social.linkedin;
    } else if (ariaLabel.includes("github") && social.github) {
      link.href = social.github;
    } else if (ariaLabel.includes("medium") && social.medium) {
      link.href = social.medium;
    } else if (ariaLabel.includes("email") && social.email) {
      link.href = `mailto:${social.email}`;
    } else if (ariaLabel.includes("resume") && social.resume) {
      link.href = social.resume;
    }
  });
};


export const initPortfolio = async () => {
  try {
    const data = await fetchPortfolioContent();
    if (!data) return;
    populateHero(data.hero);
    populateAbout(data.about);
    populateValuesGoals(data.valuesGoals);
    populateExperience(data.experience);
    populateSkillCategories(data.skillCategories);
    populateProjects(data.projects);
    populateFooter(data.hero?.social);
  } catch {}
};

export const bindThemeButtons = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.querySelector(".mobile-theme-toggle");
  themeToggle?.addEventListener("click", (e) => toggleTheme(e.currentTarget));
  themeToggle?.addEventListener("touchend", (e) => {
    toggleTheme(e.currentTarget);
    e.preventDefault();
  });
  mobileThemeToggle?.addEventListener("click", (e) => toggleTheme(e.currentTarget));
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", () => {
      const body = document.body;
      if (body.classList.contains("batman-mode")) {
        const ev = new CustomEvent("exit-batman");
        document.dispatchEvent(ev);
      } else {
        activateBatmanMode(logo);
      }
    });
  }
};
