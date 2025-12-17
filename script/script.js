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

// Smooth Scrolling - Only for internal navigation links (not social links or external links)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  // Skip social links and external links
  if (anchor.closest('.hero-social-links') || 
      anchor.closest('.social-links') || 
      anchor.hasAttribute('target') ||
      anchor.getAttribute('href') === '#') {
    return;
  }
  
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    // Only prevent default for actual internal anchors (not just "#")
    if (targetId && targetId !== '#' && targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
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
        toggleText.textContent = "Hide ";
      } else {
        // Collapse
        features.classList.remove("expanded");
        features.classList.add("collapsed");
        toggle.classList.remove("expanded");
        toggleText.textContent = "Show More";
      }
    });
  });
});

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

const MEDIUM_USERNAME = "muhammednajeeb.ay";
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const MEDIUM_FEED_ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  MEDIUM_RSS_URL
)}`;
const MAX_MEDIUM_POSTS = 12;

async function loadMediumPosts() {
  const track = document.querySelector("[data-blog-track]");
  const errorEl = document.querySelector("[data-blog-error]");
  const prevBtn = document.querySelector('[data-blog-nav="prev"]');
  const nextBtn = document.querySelector('[data-blog-nav="next"]');

  if (!track) return;

  track.dataset.loading = "true";
  if (errorEl) errorEl.hidden = true;
  prevBtn?.setAttribute("disabled", "true");
  nextBtn?.setAttribute("disabled", "true");

  try {
    const response = await fetch(MEDIUM_FEED_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Medium feed request failed: ${response.status}`);
    }

    const payload = await response.json();
    const items = payload.items || [];

    if (!items.length) {
      throw new Error("No Medium posts available");
    }

    track.innerHTML = "";
    items.slice(0, MAX_MEDIUM_POSTS).forEach((item) => {
      track.appendChild(createMediumBlogCard(item));
    });

    setupBlogCarouselInteractions(track, prevBtn, nextBtn);
  } catch (error) {
    console.warn("Medium blog load failed:", error);
    if (errorEl) {
      errorEl.hidden = false;
    }
  } finally {
    delete track.dataset.loading;
  }
}

function createMediumBlogCard(item) {
  const title = (item.title || "Untitled post").trim();
  const image = resolveMediumImage(item);
  const readTime = estimateReadTime(item.content || item.description || "");
  const dateLabel = formatMediumDate(item.pubDate);
  const authorLabel = item.author || "Medium";

  const card = document.createElement("article");
  card.className = "blog-card";
  card.setAttribute("role", "listitem");

  const link = document.createElement("a");
  link.className = "blog-link";
  link.href = item.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const thumb = document.createElement("div");
  thumb.className = "blog-thumb";

  const img = document.createElement("img");
  img.className = "blog-image";
  img.loading = "lazy";
  img.src = image;
  img.alt = `${title} cover`;

  const badge = document.createElement("span");
  badge.className = "badge badge-medium";
  badge.textContent = authorLabel;

  thumb.appendChild(img);
  thumb.appendChild(badge);

  const content = document.createElement("div");
  content.className = "blog-content";

  const heading = document.createElement("h3");
  heading.className = "blog-title";
  heading.textContent = title;

  const meta = document.createElement("div");
  meta.className = "blog-meta";

  const dateEl = document.createElement("span");
  dateEl.className = "blog-date";
  dateEl.textContent = dateLabel;

  const dot = document.createElement("span");
  dot.className = "blog-dot";
  dot.textContent = "•";

  const readEl = document.createElement("span");
  readEl.className = "blog-read";
  readEl.textContent = `${readTime} min read`;

  meta.appendChild(dateEl);
  meta.appendChild(dot);
  meta.appendChild(readEl);

  content.appendChild(heading);
  content.appendChild(meta);

  link.appendChild(thumb);
  link.appendChild(content);

  card.appendChild(link);
  return card;
}

function resolveMediumImage(item) {
  // 1) rss2json thumbnail
  if (item.thumbnail && item.thumbnail.startsWith("http")) {
    return item.thumbnail;
  }

  // 2) enclosure link
  if (item.enclosure && item.enclosure.link && item.enclosure.link.startsWith("http")) {
    return item.enclosure.link;
  }

  // 3) first <img> in HTML content/description
  const html = item.content || item.description || "";
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  // 4) fallback to local preview image
  return "assets/preview.png";
}

function setupBlogCarouselInteractions(track, prevBtn, nextBtn) {
  if (!track || track.dataset.carouselReady === "true") {
    updateBlogNavState(track, prevBtn, nextBtn);
    return;
  }

  const scrollByAmount = (direction) => {
    const amount = getBlogScrollAmount(track) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  prevBtn?.addEventListener("click", () => scrollByAmount(-1));
  nextBtn?.addEventListener("click", () => scrollByAmount(1));

  track.addEventListener("scroll", () =>
    updateBlogNavState(track, prevBtn, nextBtn)
  );
  window.addEventListener("resize", () =>
    updateBlogNavState(track, prevBtn, nextBtn)
  );

  track.dataset.carouselReady = "true";
  updateBlogNavState(track, prevBtn, nextBtn);
}

function updateBlogNavState(track, prevBtn, nextBtn) {
  if (!track) return;
  const maxScrollLeft = track.scrollWidth - track.clientWidth - 5;
  if (prevBtn) {
    prevBtn.disabled = track.scrollLeft <= 5;
  }
  if (nextBtn) {
    nextBtn.disabled = track.scrollLeft >= maxScrollLeft;
  }
}

function getBlogScrollAmount(track) {
  if (!track) return 0;
  const card = track.querySelector(".blog-card");
  if (!card) return track.clientWidth;
  const cardWidth = card.getBoundingClientRect().width;
  const styles = window.getComputedStyle(track);
  const gap =
    parseFloat(styles.columnGap || styles.gap || styles.rowGap || "0") || 0;
  return cardWidth + gap;
}

function stripHtml(value = "") {
  const temp = document.createElement("div");
  temp.innerHTML = value;
  return temp.textContent || temp.innerText || "";
}

function truncateText(text, maxLength = 160) {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}…`;
}

function estimateReadTime(text = "") {
  const words = stripHtml(text)
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatMediumDate(value) {
  if (!value) return "Recent";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

document.addEventListener("DOMContentLoaded", () => {
  loadMediumPosts();
});

// ---------------------------
// Portfolio content from JSON
// ---------------------------

async function loadPortfolioContent() {
  try {
    const response = await fetch("assets/content.json", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load content.json: ${response.status}`);
    }

    const data = await response.json();
    if (!data) return;

    populateHero(data.hero);
    populateAbout(data.about);
    populateValuesGoals(data.valuesGoals);
    populateExperience(data.experience);
    populateSkillCategories(data.skillCategories);
    populateProjects(data.projects);
  } catch (error) {
    console.warn("Could not load portfolio content from JSON:", error);
  }
}

function populateHero(hero) {
  if (!hero) return;
  const subtitleEl = document.querySelector(".hero-subtitle");
  const nameEl = document.querySelector(".hero-title");
  const typingEl = document.querySelector(".typing-text");
  const descEl = document.querySelector(".hero-description");
  const ctaEl = document.querySelector(".cta-button");

  if (subtitleEl && hero.greeting) {
    subtitleEl.textContent = hero.greeting;
  }
  if (nameEl && hero.name) {
    nameEl.textContent = hero.name;
  }
  if (typingEl && hero.typingText) {
    typingEl.setAttribute("data-text", hero.typingText);
    typingEl.textContent = "";
  }
  if (descEl && hero.description) {
    descEl.textContent = hero.description;
  }

  // Social links (order: LinkedIn, GitHub, Medium, Email, Resume)
  const socialLinksContainer = document.querySelector(".hero-social-links");
  if (socialLinksContainer && hero.social) {
    const allLinks = socialLinksContainer.querySelectorAll("a.social-link");
    
    // Find links by their aria-label or position
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
      // Rebuild CTA content to avoid relying on existing hardcoded text
      ctaEl.innerHTML = `
        <span class="material-icons-outlined" style="font-size: 1rem; margin-right: 0.5rem">send</span>
        ${hero.cta.label}
      `;
    }
    if (hero.cta.targetId) {
      ctaEl.setAttribute("href", hero.cta.targetId);
    }
  }

  // Ensure typing animation shows the updated text from JSON
  if (hero.typingText) {
    setTypingTextAndAnimate(hero.typingText);
  }
}

function populateAbout(about) {
  if (!about) return;
  const aboutContainer = document.querySelector(".about-text");
  if (!aboutContainer) return;

  if (Array.isArray(about.paragraphsHtml)) {
    aboutContainer.innerHTML = about.paragraphsHtml
      .map((p) => `<p>${p}</p>`)
      .join("");
  }
}

function populateValuesGoals(valuesGoals) {
  if (!valuesGoals) return;
  const valuesGoalsText = document.querySelector(".values-goals-text");
  if (!valuesGoalsText) return;

  const parts = [];
  if (valuesGoals.valuesHtml) {
    parts.push(`<p>${valuesGoals.valuesHtml}</p>`);
  }
  if (valuesGoals.goalsHtml) {
    parts.push(`<p>${valuesGoals.goalsHtml}</p>`);
  }

  if (parts.length) {
    valuesGoalsText.innerHTML = parts.join("");
  }
}

function populateExperience(experiences) {
  if (!Array.isArray(experiences)) return;

  experiences.forEach((exp) => {
    if (!exp.tabId) return;
    const tabContent = document.getElementById(exp.tabId);
    if (!tabContent) return;

    const titleEl = tabContent.querySelector(".job-title");
    const companyEl = tabContent.querySelector(".job-company");
    const durationEl = tabContent.querySelector(".job-duration");
    const listEl = tabContent.querySelector(".job-description ul");

    if (titleEl && exp.title) {
      titleEl.textContent = exp.title;
    }
    if (companyEl && exp.company) {
      companyEl.textContent = exp.company;
    }
    if (durationEl && exp.duration) {
      durationEl.textContent = exp.duration;
    }

    if (listEl && Array.isArray(exp.highlights)) {
      listEl.innerHTML = "";
      exp.highlights.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = item;
        listEl.appendChild(li);
      });
    }
  });

  // Also update tab button labels if provided
  const tabs = document.querySelectorAll(".experience-tabs .tab-button");
  experiences.forEach((exp, index) => {
    if (!exp.companyShort) return;
    const tabBtn = tabs[index];
    if (tabBtn) {
      tabBtn.textContent = exp.companyShort;
    }
  });
}

function populateSkillCategories(categories) {
  if (!Array.isArray(categories)) return;
  
  const terminalOutput = document.getElementById('terminal-output');
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const activeCategorySpan = document.querySelector('.active-category');
  
  if (!terminalOutput || !terminalTabs.length) return;

  function displayCategory(categoryName) {
    const category = categories.find(cat => cat.title === categoryName);
    if (!category) return;
    if (activeCategorySpan) {
      activeCategorySpan.textContent = categoryName;
    }
    terminalOutput.innerHTML = '';
    if (Array.isArray(category.items)) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < category.items.length; i += 1) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item-terminal';
        skillDiv.textContent = category.items[i];
        skillDiv.style.animationDelay = `${i * 0.05}s`;
        frag.appendChild(skillDiv);
      }
      terminalOutput.appendChild(frag);
    }
  }

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const categoryName = tab.getAttribute('data-category');
      displayCategory(categoryName);
    });
  });

  const firstCategory = categories[0];
  if (firstCategory) {
    displayCategory(firstCategory.title);
  }
}

function populateProjects(projects) {
  if (!Array.isArray(projects)) return;
  const cards = document.querySelectorAll(".projects .project-card");
  if (!cards.length) return;

  cards.forEach((card, index) => {
    const project = projects[index];
    if (!project) return;

    const titleEl = card.querySelector(".project-title");
    const descEl = card.querySelector(".project-description");
    const featuresList = card.querySelector(".project-features ul");
    const techContainer = card.querySelector(".project-tech");
    const actionsContainer = card.querySelector(".project-actions");

    if (titleEl && project.title) {
      titleEl.textContent = project.title;
    }
    if (descEl && project.description) {
      descEl.textContent = project.description;
    }

    if (featuresList && Array.isArray(project.features)) {
      featuresList.innerHTML = "";
      project.features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
      });
    }

    if (techContainer && Array.isArray(project.tech)) {
      techContainer.innerHTML = "";
      project.tech.forEach((tech) => {
        const chip = document.createElement("div");
        chip.className = "material-chip";
        chip.textContent = tech;
        techContainer.appendChild(chip);
      });
    }

    // Update project action links (GitHub, Live, Pub.dev) from JSON
    if (actionsContainer && project.links) {
      const { github, live, pub } = project.links;

      if (github) {
        const githubLink =
          actionsContainer.querySelector("a[aria-label*='GitHub']") ||
          actionsContainer.querySelector("a[href*='github.com']");
        if (githubLink) {
          githubLink.href = github;
        }
      }

      if (live) {
        const liveLink =
          actionsContainer.querySelector("a[aria-label*='Live']") ||
          actionsContainer.querySelector(".material-chip");
        if (liveLink) {
          liveLink.href = live;
          // Ensure visible label
          if (!liveLink.textContent.trim()) {
            liveLink.textContent = "Live";
          }
        }
      }

      if (pub) {
        const pubLink =
          actionsContainer.querySelector("a[aria-label*='Pub.dev']") ||
          actionsContainer.querySelector(".material-chip");
        if (pubLink) {
          pubLink.href = pub;
          // Ensure visible label
          if (!pubLink.textContent.trim()) {
            pubLink.textContent = "Pub.dev";
          }
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPortfolioContent();
});
