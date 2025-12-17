export const initProjectsAnimations = () => {
  const projectCards = document.querySelectorAll(".project-card");
  const projectsSection = document.querySelector(".projects");
  if (!projectsSection || !projectCards.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const visible = Array.from(projectCards).filter(
          (c) => !c.classList.contains("hidden-project")
        );
        visible.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add("visible");
            card.style.animation = `projectFadeIn 0.8s ease-out forwards`;
          }, idx * 150);
        });
        observer.unobserve(projectsSection);
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(projectsSection);
};

export const initLoadMoreProjects = () => {
  const hiddenProjects = document.querySelectorAll(".project-card.hidden-project");
  const btn = document.getElementById("load-more-btn");
  const section = document.querySelector(".projects");
  if (!btn || !hiddenProjects.length || !section) return;
  let currentIndex = 0;
  const perLoad = 3;
  const list = Array.from(hiddenProjects);
  let showLess = false;
  btn.addEventListener("click", () => {
    if (showLess) {
      list.forEach((c) => {
        c.classList.remove("show");
        c.classList.remove("visible");
      });
      currentIndex = 0;
      showLess = false;
      btn.classList.remove("expanded");
      btn.querySelector("span:first-child").textContent = "Load More";
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }
    const end = Math.min(currentIndex + perLoad, list.length);
    const batch = list.slice(currentIndex, end);
    batch.forEach((card, idx) => {
      setTimeout(() => {
        card.classList.add("show");
        card.classList.add("visible");
        card.style.animation = `projectFadeIn 0.8s ease-out forwards`;
      }, idx * 100);
    });
    currentIndex = end;
    if (currentIndex >= list.length) {
      showLess = true;
      btn.classList.add("expanded");
      btn.querySelector("span:first-child").textContent = "Show Less";
    } else {
      const remaining = list.length - currentIndex;
      const nextBatch = Math.min(perLoad, remaining);
      btn.querySelector("span:first-child").textContent = `Load More (${nextBatch} more)`;
    }
  });
};

export const initProjectFeatureToggles = () => {
  const toggles = document.querySelectorAll(".project-features-toggle");
  toggles.forEach((t) => {
    t.addEventListener("click", () => {
      const card = t.closest(".project-card");
      const features = card.querySelector(".project-features");
      const text = t.querySelector(".toggle-text");
      if (features.classList.contains("collapsed")) {
        features.classList.remove("collapsed");
        features.classList.add("expanded");
        t.classList.add("expanded");
        text.textContent = "Hide ";
      } else {
        features.classList.remove("expanded");
        features.classList.add("collapsed");
        t.classList.remove("expanded");
        text.textContent = "Show More";
      }
    });
  });
};
