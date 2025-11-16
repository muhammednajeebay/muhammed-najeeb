// Theme Toggle - Fixed
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const mobileThemeToggle = document.querySelector(".mobile-theme-toggle");
const body = document.body;
let typingSwitchTimeout = null;

// Batman mode is toggled via logo click (no long-press)

function toggleTheme() {
  // Don't toggle if in batman mode - only allow exiting batman mode
  if (body.classList.contains("batman-mode")) {
    exitBatmanMode();
    return;
  }

  body.classList.toggle("light-mode");
  const isDarkMode = !body.classList.contains("light-mode");

  // Update all theme icons
  const allThemeIcons = document.querySelectorAll(
    ".theme-icon, .mobile-theme-toggle .material-icons"
  );
  allThemeIcons.forEach((icon) => {
    icon.textContent = isDarkMode ? "dark_mode" : "light_mode";
  });

  // Update theme-color meta tag
  updateThemeColor(isDarkMode);

  // Store theme preference
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Batman mode functions
function activateBatmanMode() {
  body.classList.add("batman-mode");
  body.classList.remove("light-mode");

  // Update theme icon
  const allThemeIcons = document.querySelectorAll(
    ".theme-icon, .mobile-theme-toggle .material-icons"
  );
  allThemeIcons.forEach((icon) => {
    icon.textContent = "dark_mode";
  });

  // Update theme-color meta tag
  updateThemeColor(true, true);

  // Store batman mode preference
  localStorage.setItem("theme", "batman");

  // Update header background if scrolled
  const header = document.querySelector("header");
  if (header && window.scrollY > 50) {
    header.style.backgroundColor = "rgba(22, 22, 22, 0.9)";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
  }

  // Recreate background with bat symbols
  createFlutterIcons();

  // Replace hero SVG with bat symbol
  // replaceHeroSvgWithBat();

  // Reactivate hero SVG animation and typing with BATMAN text
  animateHeroSvg();
  // Show default text first, then switch to BATMAN after a delay
  if (typingSwitchTimeout) {
    clearTimeout(typingSwitchTimeout);
    typingSwitchTimeout = null;
  }
  setTypingTextAndAnimate("I build things for mobile.");
  typingSwitchTimeout = setTimeout(() => {
    setTypingTextAndAnimate("I AM BATMAN");
  }, 2500);
}

function exitBatmanMode() {
  body.classList.remove("batman-mode");

  // Restore to dark mode
  const isDarkMode = !body.classList.contains("light-mode");

  // Update theme icon
  const allThemeIcons = document.querySelectorAll(
    ".theme-icon, .mobile-theme-toggle .material-icons"
  );
  allThemeIcons.forEach((icon) => {
    icon.textContent = isDarkMode ? "dark_mode" : "light_mode";
  });

  // Update theme-color meta tag
  updateThemeColor(isDarkMode);

  // Store theme preference
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  // Restore header background if scrolled
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

  // Recreate background with normal icons
  createFlutterIcons();

  // Restore hero SVG
  restoreHeroSvg();
  // Cancel any pending BATMAN switch and restore default typing
  if (typingSwitchTimeout) {
    clearTimeout(typingSwitchTimeout);
    typingSwitchTimeout = null;
  }
  setTypingTextAndAnimate("I build things for mobile.");
}

// function replaceHeroSvgWithBat() {
//   const heroSvgWrapper = document.querySelector(".about-image-wrapper");
//   if (!heroSvgWrapper) return;

//   // Check if bat SVG already exists
//   if (heroSvgWrapper.querySelector(".bat-symbol")) return;

//   const heroSvg = heroSvgWrapper.querySelector("svg");
//   if (heroSvg) {
//     // Store original display style
//     heroSvg.dataset.originalDisplay = heroSvg.style.display || "";
//     heroSvg.style.display = "none";

//     // Create bat symbol SVG
//     const batSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     batSvg.setAttribute("viewBox", "0 0 200 200");
//     batSvg.setAttribute("width", "100%");
//     batSvg.setAttribute("height", "100%");
//     batSvg.setAttribute("class", "bat-symbol");
//     batSvg.style.display = "block";

//     // Batman symbol path
//     const batPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     batPath.setAttribute("d", "M100,20 L80,60 L40,60 L60,90 L50,130 L100,110 L150,130 L140,90 L160,60 L120,60 Z");
//     batPath.setAttribute("fill", "#FFFFFF");
//     batPath.setAttribute("stroke", "#808080");
//     batPath.setAttribute("stroke-width", "2");
//     batPath.setAttribute("opacity", "0.8");

//     batSvg.appendChild(batPath);
//     heroSvgWrapper.appendChild(batSvg);
//   }
// }

function restoreHeroSvg() {
  const heroSvgWrapper = document.querySelector(".about-image-wrapper");
  if (!heroSvgWrapper) return;

  const heroSvg = heroSvgWrapper.querySelector("svg:not(.bat-symbol)");
  const batSvg = heroSvgWrapper.querySelector(".bat-symbol");

  if (heroSvg && batSvg) {
    heroSvg.style.display = heroSvg.dataset.originalDisplay || "";
    batSvg.remove();
  }
}

// Function to update theme-color meta tag
function updateThemeColor(isDarkMode, isBatman = false) {
  const themeColorMeta = document.getElementById("theme-color-meta");
  if (themeColorMeta) {
    if (isBatman) {
      themeColorMeta.content = "#1a1a1a"; // Charcoal black
    } else {
      themeColorMeta.content = isDarkMode ? "#0A192F" : "#f0fffd";
    }
  }
}

// Load theme preference - device default or saved preference
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  // Check for batman mode first
  if (savedTheme === "batman") {
    activateBatmanMode();
    return;
  }

  // If no saved preference, use device preference
  if (!savedTheme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      // Device prefers dark mode, keep default (dark) theme
      body.classList.remove("light-mode");
      document
        .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
        .forEach((icon) => {
          icon.textContent = "dark_mode";
        });
      updateThemeColor(true);
    } else {
      // Device prefers light mode, apply light theme
      body.classList.add("light-mode");
      document
        .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
        .forEach((icon) => {
          icon.textContent = "light_mode";
        });
      updateThemeColor(false);
    }
  } else {
    // Use saved preference
    if (savedTheme === "light") {
      body.classList.add("light-mode");
      document
        .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
        .forEach((icon) => {
          icon.textContent = "light_mode";
        });
      updateThemeColor(false);
    } else {
      body.classList.remove("light-mode");
      document
        .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
        .forEach((icon) => {
          icon.textContent = "dark_mode";
        });
      updateThemeColor(true);
    }
  }
});

// Click on theme button simply toggles theme now
themeToggle.addEventListener("click", toggleTheme);

// Touch events for mobile
// Mobile: tap theme button toggles theme
themeToggle.addEventListener("touchend", (e) => {
  toggleTheme();
  e.preventDefault();
});

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("click", toggleTheme);
}

// Tap on header logo toggles Batman mode
const logo = document.querySelector(".logo");
if (logo) {
  logo.addEventListener("click", () => {
    if (body.classList.contains("batman-mode")) {
      exitBatmanMode();
    } else {
      activateBatmanMode();
    }
  });
}

// Listen for system theme changes (only if no user preference is saved)
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const savedTheme = localStorage.getItem("theme");

    // Don't respond if in batman mode
    if (savedTheme === "batman" || body.classList.contains("batman-mode")) {
      return;
    }

    // Only respond to system changes if user hasn't set a preference
    if (!savedTheme) {
      if (e.matches) {
        // System switched to dark mode
        body.classList.remove("light-mode");
        document
          .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
          .forEach((icon) => {
            icon.textContent = "dark_mode";
          });
        updateThemeColor(true);
      } else {
        // System switched to light mode
        body.classList.add("light-mode");
        document
          .querySelectorAll(".theme-icon, .mobile-theme-toggle .material-icons")
          .forEach((icon) => {
            icon.textContent = "light_mode";
          });
        updateThemeColor(false);
      }
    }
  });

// Mobile Menu
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenuClose = document.querySelector(".mobile-menu-close");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu .nav-link");

// Open mobile menu
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scroll
});

// Close mobile menu
function closeMobileMenu() {
  if (mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
    mobileMenu.classList.add("hiding");
    document.body.style.overflow = "";
    // Wait for the transition to finish before removing .hiding
    setTimeout(() => {
      mobileMenu.classList.remove("hiding");
    }, 400); // Match your CSS transition duration (0.4s)
  }
}

mobileMenuClose.addEventListener("click", closeMobileMenu);

// Close on outside click
document.addEventListener("mousedown", function (event) {
  if (
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(event.target) &&
    !mobileMenuBtn.contains(event.target)
  ) {
    closeMobileMenu();
  }
});

// Optionally, close on ESC key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu(); // Use the proper close function instead of just removing active class
  });
});

// Tab Functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});

// Cursor Animation
const cursorFollower = document.querySelector(".cursor-follower");
const invertCircle = document.querySelector(".invert-circle");

document.addEventListener("mousemove", (e) => {
  cursorFollower.style.left = `${e.clientX}px`;
  cursorFollower.style.top = `${e.clientY}px`;

  invertCircle.style.left = `${e.clientX}px`;
  invertCircle.style.top = `${e.clientY}px`;
});

document.addEventListener("mousedown", () => {
  cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)";
});

document.addEventListener("mouseup", () => {
  cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
});

// Create Flutter and Material Icons for Background
const bgAnimation = document.getElementById("bg-animation");

function createBatSymbol() {
  // Randomly select bat_logo_0 or bat_logo_1 and render as masked span
  const variant = Math.random() < 0.5 ? 0 : 1;
  return `<span class="bat-symbol-mask bat-symbol-mask--${variant}" aria-hidden="true"></span>`;
}

function createFlutterIcons() {
  bgAnimation.innerHTML = "";

  // Check if in batman mode
  const isBatmanMode = body.classList.contains("batman-mode");

  // Responsive SVG count based on screen size
  const isMobile = window.innerWidth <= 768; // Mobile breakpoint
  const iconCount = isMobile ? 12 : 25; // 15 on mobile, 25 on desktop

  if (isBatmanMode) {
    // Create bat symbols for batman mode
    for (let i = 0; i < iconCount * 2; i++) {
      const batIcon = document.createElement("div");
      batIcon.className = "flutter-icon";

      const size = Math.random() * 60 + 40;
      batIcon.style.width = `${size}px`;
      batIcon.style.height = `${size}px`;
      batIcon.style.left = `${Math.random() * 100}%`;
      batIcon.style.top = `${Math.random() * 100}%`;
      batIcon.style.opacity = Math.random() * 0.2 + 0.1;

      // Animation duration and delay
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      batIcon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

      // Bat Symbol SVG
      batIcon.innerHTML = createBatSymbol();

      bgAnimation.appendChild(batIcon);
    }
  } else {
    // Normal mode - create Flutter and Material icons
    const flutterIconCount = iconCount;
    const materialIconCount = iconCount;

    for (let i = 0; i < flutterIconCount; i++) {
      const flutterIcon = document.createElement("div");
      flutterIcon.className = "flutter-icon";

      const size = Math.random() * 60 + 40;
      flutterIcon.style.width = `${size}px`;
      flutterIcon.style.height = `${size}px`;
      flutterIcon.style.left = `${Math.random() * 100}%`;
      flutterIcon.style.top = `${Math.random() * 100}%`;
      flutterIcon.style.opacity = Math.random() * 0.15 + 0.05;

      // Animation duration and delay
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      flutterIcon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

      // Flutter Logo SVG
      flutterIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
                    <path fill="#64FFDA" d="M20.41,41.95l-0.14,0.13l-9.03-9.03L21.15,23.14l0.14,0.13L20.41,41.95z"/>
                    <path fill="#64FFDA" d="M33.06,23.1l-11.8,11.8l-0.14-18.68l0.13-0.13L33.06,23.1z"/>
                    <path fill="#64FFDA" d="M20.41,6.06l-0.14,0.13l-0.13,0.13l0.13,0.13l0.14-0.13V6.06z"/>
                    <path fill="#64FFDA" d="M20.41,23.27l-0.14,0.13l-9.03-9.03L21.15,4.46l0.14,0.13L20.41,23.27z"/>
                    <path fill="#64FFDA" d="M11.24,23.14l9.03,9.03l0.14,0.13V23.14l-0.14-0.13L11.24,23.14z"/>
                </svg>
            `;

      bgAnimation.appendChild(flutterIcon);
    }

    const materialIcons = [
      "widgets",
      "code",
      "developer_mode",
      "devices",
      "smartphone",
      "web",
      "layers",
      "architecture",
      "auto_awesome",
      "build",
    ];

    for (let i = 0; i < materialIconCount; i++) {
      const materialIcon = document.createElement("div");
      materialIcon.className = "material-icon";

      const size = Math.random() * 40 + 20;
      materialIcon.style.width = `${size}px`;
      materialIcon.style.height = `${size}px`;
      materialIcon.style.left = `${Math.random() * 100}%`;
      materialIcon.style.top = `${Math.random() * 100}%`;
      materialIcon.style.opacity = Math.random() * 0.15 + 0.05;

      // Animation duration and delay
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      materialIcon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

      // Random Material Icon
      const iconName =
        materialIcons[Math.floor(Math.random() * materialIcons.length)];
      materialIcon.innerHTML = `
                <span class="material-icons" style="font-size: ${size}px; color: var(--secondary);">${iconName}</span>
            `;

      bgAnimation.appendChild(materialIcon);
    }

    // Create GetX Logo
    const getxIcon = document.createElement("div");
    getxIcon.className = "flutter-icon";

    const getxSize = 60;
    getxIcon.style.width = `${getxSize}px`;
    getxIcon.style.height = `${getxSize}px`;
    getxIcon.style.left = `${Math.random() * 80 + 10}%`;
    getxIcon.style.top = `${Math.random() * 80 + 10}%`;
    getxIcon.style.opacity = 0.1;

    // Animation
    getxIcon.style.animation = `float 15s ease-in-out 2s infinite`;

    // GetX Logo (simplified)
    getxIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
                <text x="20" y="70" fill="#64FFDA" font-family="Arial" font-weight="bold" font-size="70">G</text>
                <text x="55" y="70" fill="#64FFDA" font-family="Arial" font-weight="bold" font-size="50">X</text>
            </svg>
        `;

    bgAnimation.appendChild(getxIcon);

    // Create Dart Logo
    const dartIcon = document.createElement("div");
    dartIcon.className = "flutter-icon";

    const dartSize = 50;
    dartIcon.style.width = `${dartSize}px`;
    dartIcon.style.height = `${dartSize}px`;
    dartIcon.style.left = `${Math.random() * 80 + 10}%`;
    dartIcon.style.top = `${Math.random() * 80 + 10}%`;
    dartIcon.style.opacity = 0.1;

    // Animation
    dartIcon.style.animation = `float 12s ease-in-out 1s infinite`;

    // Dart Logo (simplified)
    dartIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
                <path fill="#64FFDA" d="M17,14L5.4,32.5L9,44l10.5,0l7.66-7.66l0-13.26L17,14z"/>
                <path fill="#64FFDA" d="M19,14h10.5l5.25,5.25l0,10.5L27.09,37.41L19,29V14z"/>
                <path fill="#64FFDA" d="M20.74,19L9,30.74V19H20.74z"/>
            </svg>
        `;

    bgAnimation.appendChild(dartIcon);
  }
}

createFlutterIcons();

// Dynamic Background Animation with Cursor
let mouseX = 0;
let mouseY = 0;
let invertSize = 0;
const maxInvertSize = 300;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Gradually increase invert circle size
  if (invertSize < maxInvertSize) {
    invertSize += 5;
  }

  invertCircle.style.width = `${invertSize}px`;
  invertCircle.style.height = `${invertSize}px`;

  // Move background elements based on cursor
  const flutterIcons = document.querySelectorAll(".flutter-icon");
  const materialIcons = document.querySelectorAll(".material-icon");

  const moveElements = (elements, intensity) => {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;

      // Calculate distance from cursor
      const distX = mouseX - elementX;
      const distY = mouseY - elementY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Move away from cursor if close
      if (distance < 500) {
        const moveX = (distX / distance) * (500 - distance) * 0.05 * intensity;
        const moveY = (distY / distance) * (500 - distance) * 0.05 * intensity;

        element.style.transform = `translate(${-moveX}px, ${-moveY}px) rotate(${
          moveX * 0.1
        }deg)`;
      } else {
        element.style.transform = "";
      }
    });
  };

  moveElements(flutterIcons, 1.5);
  moveElements(materialIcons, 1.5);
});

// Reset invert circle size when mouse stops moving
let timeout;
document.addEventListener("mousemove", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const shrinkInterval = setInterval(() => {
      invertSize -= 10;
      if (invertSize <= 0) {
        invertSize = 0;
        clearInterval(shrinkInterval);
      }
      invertCircle.style.width = `${invertSize}px`;
      invertCircle.style.height = `${invertSize}px`;
    }, 50);
  }, 1000);
});

// Scroll Animation
const fadeElements = document.querySelectorAll(".fade-in");
const slideRightElements = document.querySelectorAll(".slide-in-right");
const slideLeftElements = document.querySelectorAll(".slide-in-left");

function checkAnimations() {
  const checkElements = (elements, className) => {
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible =
        elementTop < window.innerHeight - 100 && elementBottom > 0;

      if (isVisible) {
        element.classList.add(className);
      }
    });
  };

  checkElements(fadeElements, "appear");
  checkElements(slideRightElements, "appear");
  checkElements(slideLeftElements, "appear");
}

window.addEventListener("scroll", checkAnimations);
window.addEventListener("resize", checkAnimations);
window.addEventListener("load", () => {
  checkAnimations();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

// Header Scroll Effect
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    if (body.classList.contains("batman-mode")) {
      header.style.backgroundColor = "rgba(22, 22, 22, 0.9)";
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.backgroundColor = body.classList.contains("light-mode")
        ? "rgba(185, 185, 185, 0.8)"
        : "rgba(10, 25, 47, 0.8)";
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
    }
  } else {
    header.style.backgroundColor = "transparent";
    header.style.boxShadow = "none";
  }
});

// Add pulse animation to Flutter icons
setInterval(() => {
  const randomIcon = document.querySelectorAll(".flutter-icon, .material-icon")[
    Math.floor(
      Math.random() *
        document.querySelectorAll(".flutter-icon, .material-icon").length
    )
  ];

  if (randomIcon) {
    randomIcon.style.animation = "pulse 2s ease-in-out";

    setTimeout(() => {
      randomIcon.style.animation = "";
    }, 2000);
  }
}, 3000);

// Enhanced Project Cards Animation
const projectCards = document.querySelectorAll(".project-card");
const projectsSection = document.querySelector(".projects");
const hiddenProjects = document.querySelectorAll(".project-card.hidden-project");
const loadMoreBtn = document.getElementById("load-more-btn");

// Create Intersection Observer for projects section
const projectsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateProjectCards();
      projectsObserver.unobserve(projectsSection);
    }
  },
  { threshold: 0.1 }
);

// Start observing the projects section
projectsObserver.observe(projectsSection);

function animateProjectCards() {
  // Only animate visible cards (first 6)
  const visibleCards = Array.from(projectCards).filter(
    (card) => !card.classList.contains("hidden-project")
  );
  visibleCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
      card.style.animation = `projectFadeIn 0.8s ease-out forwards`;
    }, index * 150); // Staggered animation with 150ms delay between cards
  });
}

// Load More functionality - Show 3 projects at a time
if (loadMoreBtn) {
  let currentIndex = 0;
  const projectsPerLoad = 3;
  const hiddenProjectsArray = Array.from(hiddenProjects);
  let isShowingLess = false;

  loadMoreBtn.addEventListener("click", () => {
    // Check if we're in "Show Less" mode
    if (isShowingLess) {
      // Hide all shown projects and reset to initial state
      hiddenProjectsArray.forEach((card) => {
        card.classList.remove("show");
        card.classList.remove("visible");
      });

      // Reset state
      currentIndex = 0;
      isShowingLess = false;
      loadMoreBtn.classList.remove("expanded");
      loadMoreBtn.querySelector("span:first-child").textContent = "Load More";
      
      // Scroll to projects section smoothly
      setTimeout(() => {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }

    // Calculate how many projects to show in this batch
    const endIndex = Math.min(currentIndex + projectsPerLoad, hiddenProjectsArray.length);
    const projectsToShow = hiddenProjectsArray.slice(currentIndex, endIndex);

    // Show the next batch of projects
    projectsToShow.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
        card.classList.add("visible");
        card.style.animation = `projectFadeIn 0.8s ease-out forwards`;
      }, index * 100); // Staggered animation
    });

    // Update the current index
    currentIndex = endIndex;

    // Check if all projects are shown
    if (currentIndex >= hiddenProjectsArray.length) {
      // Change button to "Show Less" when all projects are shown
      isShowingLess = true;
      loadMoreBtn.classList.add("expanded");
      loadMoreBtn.querySelector("span:first-child").textContent = "Show Less";
    } else {
      // Update button text to show remaining count
      const remaining = hiddenProjectsArray.length - currentIndex;
      const nextBatch = Math.min(projectsPerLoad, remaining);
      loadMoreBtn.querySelector("span:first-child").textContent = `Load More (${nextBatch} more)`;
    }
  });
}

// Project Features Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  const featureToggles = document.querySelectorAll(".project-features-toggle");
  
  featureToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const projectCard = toggle.closest(".project-card");
      const features = projectCard.querySelector(".project-features");
      const toggleText = toggle.querySelector(".toggle-text");
      
      if (features.classList.contains("collapsed")) {
        // Expand
        features.classList.remove("collapsed");
        features.classList.add("expanded");
        toggle.classList.add("expanded");
        toggleText.textContent = "Hide Features";
      } else {
        // Collapse
        features.classList.remove("expanded");
        features.classList.add("collapsed");
        toggle.classList.remove("expanded");
        toggleText.textContent = "Show Features";
      }
    });
  });
});

// Animate skill tags
const skillTags = document.querySelectorAll(".skill-tag");

function animateSkillTags() {
  skillTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.opacity = "1";
      tag.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Trigger skill tags animation when they come into view
const skillsSection = document.querySelector(".skills");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillTags();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

skillsObserver.observe(skillsSection);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const snackbar = document.getElementById("snackbar");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            showSnackbar("Message sent successfully!");
            form.reset();
          } else {
            showSnackbar("Something went wrong. Please try again.");
          }
        })
        .catch(() => {
          showSnackbar("Something went wrong. Please try again.");
        });
    });
  }

  function showSnackbar(message) {
    snackbar.textContent = message;
    snackbar.classList.add("show");
    setTimeout(function () {
      snackbar.classList.remove("show");
    }, 3000);
  }
});

mobileMenu.addEventListener("transitionend", (e) => {
  if (mobileMenu.classList.contains("hiding")) {
    mobileMenu.classList.remove("hiding");
    // Optionally hide the menu here
  }
});

function animateHeroSvg() {
  const heroSvgPaths = document
    .querySelector(".about-image-wrapper svg")
    ?.querySelectorAll("path");

  if (!heroSvgPaths) return;

  heroSvgPaths.forEach((path) => {
    const length = path.getTotalLength();

    // Reset and re-trigger the stroke animation
    path.style.transition = "none";
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Force reflow to apply the reset before animating
    path.getBoundingClientRect();

    path.style.transition = "stroke-dashoffset 8s ease-in-out";
    path.style.strokeDashoffset = "0";
  });
}

function initTypingAnimation() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const text = typingElement.getAttribute("data-text");
  const typingSpeed = 100; // milliseconds per character
  let currentIndex = 0;

  function typeNextCharacter() {
    if (currentIndex < text.length) {
      typingElement.textContent = text.substring(0, currentIndex + 1);
      currentIndex++;
      setTimeout(typeNextCharacter, typingSpeed);
    }
  }

  // Start typing animation after a delay
  setTimeout(() => {
    typeNextCharacter();
  }, 1000); // 1 second delay after page load
}

// Initialize typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  initTypingAnimation();
  animateHeroSvg();
});

// Set text and re-run typing animation
function setTypingTextAndAnimate(newText) {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  typingElement.setAttribute("data-text", newText);
  typingElement.textContent = "";

  const text = newText;
  const typingSpeed = 100; // milliseconds per character
  let currentIndex = 0;

  function typeNextCharacter() {
    if (currentIndex < text.length) {
      typingElement.textContent = text.substring(0, currentIndex + 1);
      currentIndex++;
      setTimeout(typeNextCharacter, typingSpeed);
    }
  }

  // Short delay before starting re-typing
  setTimeout(typeNextCharacter, 200);
}

// Fetch and apply external blog preview (Medium) using Microlink API
document.addEventListener("DOMContentLoaded", () => {
  try {
    const blogCards = document.querySelectorAll(".blog-card[data-url]");
    blogCards.forEach(async (card) => {
      const url = card.getAttribute("data-url");
      const imgEl = card.querySelector(".blog-image");
      const titleEl = card.querySelector(".blog-title");
      const excerptEl = card.querySelector(".blog-excerpt");
      const badgeEl = card.querySelector(".badge.badge-medium");

      if (!url || !imgEl || !titleEl || !excerptEl) return;

      try {
        const resp = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true`
        );
        if (!resp.ok) throw new Error("Preview fetch failed");
        const json = await resp.json();
        const data = json && json.data ? json.data : {};

        if (data.image && data.image.url) {
          imgEl.src = data.image.url;
          imgEl.alt = data.title ? `${data.title} cover` : imgEl.alt;
        }
        if (data.title) {
          titleEl.textContent = data.title;
        }
        if (data.description) {
          excerptEl.textContent = data.description;
        }
        if (badgeEl && data.publisher) {
          badgeEl.textContent = data.publisher;
        }
      } catch (err) {
        console.warn("Blog preview fetch error:", err);
      }
    });
  } catch (e) {
    console.warn("Blog preview initialization error:", e);
  }
});
