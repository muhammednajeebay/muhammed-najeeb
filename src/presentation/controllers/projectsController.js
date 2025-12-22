// Projects Controller - Handles all project-related functionality

/**
 * Creates a project card element with all necessary content and event listeners
 * @param {Object} project - Project data from content.json
 * @param {number} index - Index of the project in the array
 * @returns {HTMLElement} - Complete project card element
 */
export const createProjectCard = (project, index) => {
  const card = document.createElement("div");
  card.className = index >= 3 ? "project-card hidden-project" : "project-card";

  // Create project top section
  const projectTop = document.createElement("div");
  projectTop.className = "project-top";

  const folderIcon = document.createElement("span");
  folderIcon.className = "material-icons folder-icon";
  folderIcon.textContent = "folder";
  projectTop.appendChild(folderIcon);

  // Create project actions (links)
  if (project.links && Object.keys(project.links).length > 0) {
    const actionsContainer = document.createElement("div");
    actionsContainer.className = "project-actions";

    // GitHub link
    if (project.links.github) {
      const githubLink = document.createElement("a");
      githubLink.href = project.links.github;
      githubLink.className = "social-link";
      githubLink.target = "_blank";
      githubLink.setAttribute("aria-label", "GitHub repository");
      githubLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      `;
      actionsContainer.appendChild(githubLink);
    }

    // Live demo link
    if (project.links.live) {
      const liveLink = document.createElement("a");
      liveLink.href = project.links.live;
      liveLink.className = "material-chip";
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      liveLink.setAttribute("aria-label", "View Live Demo (opens in a new tab)");
      liveLink.textContent = "Live";
      actionsContainer.appendChild(liveLink);
    }

    // Pub.dev link
    if (project.links.pub) {
      const pubLink = document.createElement("a");
      pubLink.href = project.links.pub;
      pubLink.className = "material-chip";
      pubLink.target = "_blank";
      pubLink.rel = "noopener noreferrer";
      pubLink.setAttribute("aria-label", "View on Pub.dev (opens in a new tab)");
      pubLink.textContent = "Pub.dev";
      actionsContainer.appendChild(pubLink);
    }

    projectTop.appendChild(actionsContainer);
  }

  card.appendChild(projectTop);

  // Create title
  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = project.title || "";
  card.appendChild(title);

  // Create tech stack (minimal card - only title and tech)
  const techContainer = document.createElement("div");
  techContainer.className = "project-tech";
  if (Array.isArray(project.tech)) {
    project.tech.forEach((tech) => {
      const chip = document.createElement("div");
      chip.className = "material-chip";
      chip.textContent = tech;
      techContainer.appendChild(chip);
    });
  }
  card.appendChild(techContainer);

  // Store project data for popup
  card.dataset.projectData = JSON.stringify(project);
  card.style.cursor = "pointer";

  // Add click event to open popup
  card.addEventListener("click", () => {
    openProjectPopup(project);
  });

  return card;
};

/**
 * Opens a glassmorphic popup with full project details
 * @param {Object} project - Project data to display in popup
 */
const openProjectPopup = (project) => {
  // Create popup overlay
  const overlay = document.createElement("div");
  overlay.className = "project-popup-overlay";
  
  // Create popup container
  const popup = document.createElement("div");
  popup.className = "project-popup";
  
  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "popup-close";
  closeBtn.innerHTML = '<span class="material-icons">close</span>';
  closeBtn.setAttribute("aria-label", "Close popup");
  popup.appendChild(closeBtn);
  
  // Create popup content
  const content = document.createElement("div");
  content.className = "popup-content";
  
  // Title
  const title = document.createElement("h2");
  title.className = "popup-title";
  title.textContent = project.title || "";
  content.appendChild(title);
  
  // Description
  const description = document.createElement("p");
  description.className = "popup-description";
  description.textContent = project.description || "";
  content.appendChild(description);
  
  // Features
  if (Array.isArray(project.features) && project.features.length > 0) {
    const featuresTitle = document.createElement("h3");
    featuresTitle.textContent = "Features";
    content.appendChild(featuresTitle);
    
    const featuresList = document.createElement("ul");
    featuresList.className = "popup-features";
    project.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });
    content.appendChild(featuresList);
  }
  
  // Tech stack
  if (Array.isArray(project.tech) && project.tech.length > 0) {
    const techTitle = document.createElement("h3");
    techTitle.textContent = "Technologies";
    content.appendChild(techTitle);
    
    const techContainer = document.createElement("div");
    techContainer.className = "popup-tech";
    project.tech.forEach((tech) => {
      const chip = document.createElement("div");
      chip.className = "material-chip";
      chip.textContent = tech;
      techContainer.appendChild(chip);
    });
    content.appendChild(techContainer);
  }
  
  // Links
  if (project.links && Object.keys(project.links).length > 0) {
    const linksContainer = document.createElement("div");
    linksContainer.className = "popup-links";
    
    if (project.links.github) {
      const githubBtn = document.createElement("a");
      githubBtn.href = project.links.github;
      githubBtn.className = "popup-link-btn";
      githubBtn.target = "_blank";
      githubBtn.innerHTML = '<span class="material-icons">code</span> View Code';
      linksContainer.appendChild(githubBtn);
    }
    
    if (project.links.live) {
      const liveBtn = document.createElement("a");
      liveBtn.href = project.links.live;
      liveBtn.className = "popup-link-btn";
      liveBtn.target = "_blank";
      liveBtn.innerHTML = '<span class="material-icons">launch</span> Live Demo';
      linksContainer.appendChild(liveBtn);
    }
    
    if (project.links.pub) {
      const pubBtn = document.createElement("a");
      pubBtn.href = project.links.pub;
      pubBtn.className = "popup-link-btn";
      pubBtn.target = "_blank";
      pubBtn.innerHTML = '<span class="material-icons">package</span> Pub.dev';
      linksContainer.appendChild(pubBtn);
    }
    
    content.appendChild(linksContainer);
  }
  
  popup.appendChild(content);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  
  // Close popup handlers
  const closePopup = () => {
    overlay.classList.add("closing");
    setTimeout(() => overlay.remove(), 300);
  };
  
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });
  
  // Escape key to close
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closePopup();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
  
  // Animate in
  requestAnimationFrame(() => overlay.classList.add("active"));
};

/**
 * Populates the projects carousel with project cards from JSON data
 * @param {Array} projects - Array of project objects from content.json
 */
export const populateProjects = (projects) => {
  if (!Array.isArray(projects)) return;
  const track = document.querySelector(".projects-track");
  const indicatorsContainer = document.querySelector(".carousel-indicators");
  if (!track) return;

  // Clear existing content
  track.innerHTML = "";
  if (indicatorsContainer) indicatorsContainer.innerHTML = "";

  // Generate project cards dynamically
  projects.forEach((project, index) => {
    const card = createProjectCard(project, index);
    track.appendChild(card);

    // Create indicator dot
    if (indicatorsContainer) {
      const indicator = document.createElement("button");
      indicator.className = `carousel-indicator ${index === 0 ? "active" : ""}`;
      indicator.setAttribute("aria-label", `Go to project ${index + 1}`);
      indicator.dataset.index = index;
      indicatorsContainer.appendChild(indicator);
    }
  });

  // Initialize carousel functionality
  initProjectsCarousel(projects.length);
};

/**
 * Initializes carousel navigation and interactions
 * @param {number} totalProjects - Total number of projects
 */
export const initProjectsCarousel = (totalProjects) => {
  const track = document.querySelector(".projects-track");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".carousel-indicator");
  
  if (!track || totalProjects === 0) return;

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  const updateCarousel = (index) => {
    currentIndex = Math.max(0, Math.min(index, totalProjects - 1));
    
    // Update track position
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentIndex);
    });

    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalProjects - 1;
  };

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => updateCarousel(currentIndex - 1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => updateCarousel(currentIndex + 1));
  }

  // Indicator clicks
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.dataset.index, 10);
      updateCarousel(index);
    });
  });

  // Touch/swipe support
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      updateCarousel(currentIndex + 1);
    }
  });

  // Initialize
  updateCarousel(0);
};

// Legacy exports for backward compatibility
export const initProjectsAnimations = () => {
  // No longer needed - carousel handles display
};

export const initLoadMoreProjects = () => {
  // No longer needed - carousel navigation replaces load more
};

export const initProjectFeatureToggles = () => {
  // No longer needed - handled in createProjectCard()
};
