  // Theme Toggle - Fixed
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
  const body = document.body;
  
  function toggleTheme() {
      body.classList.toggle('light-mode');
      const isDarkMode = !body.classList.contains('light-mode');
      
      // Update all theme icons
      const allThemeIcons = document.querySelectorAll('.theme-icon, .mobile-theme-toggle .material-icons');
      allThemeIcons.forEach(icon => {
          icon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';
      });
      
      // Store theme preference
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
  
  // Load saved theme preference
  document.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
          body.classList.add('light-mode');
          document.querySelectorAll('.theme-icon, .mobile-theme-toggle .material-icons').forEach(icon => {
              icon.textContent = 'light_mode';
          });
      }
  });

  themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');

  mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
  });

  mobileMenuCloseBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
  });

  mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
      });
  });

  // Tab Functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');
          
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          button.classList.add('active');
          document.getElementById(tabId).classList.add('active');
      });
  });

  // Cursor Animation
  const cursorFollower = document.querySelector('.cursor-follower');
  const invertCircle = document.querySelector('.invert-circle');
  
  document.addEventListener('mousemove', (e) => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
      
      invertCircle.style.left = `${e.clientX}px`;
      invertCircle.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mousedown', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Create Flutter and Material Icons for Background
  const bgAnimation = document.getElementById('bg-animation');
  
  function createFlutterIcons() {
      bgAnimation.innerHTML = '';
      
      // Flutter Logo SVGs
      const flutterIconCount = 10;
      for (let i = 0; i < flutterIconCount; i++) {
          const flutterIcon = document.createElement('div');
          flutterIcon.className = 'flutter-icon';
          
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
      
      // Material Design Icons
      const materialIconCount = 15;
      const materialIcons = [
          'widgets', 'code', 'developer_mode', 'devices', 'smartphone',
          'web', 'layers', 'architecture', 'auto_awesome', 'build'
      ];
      
      for (let i = 0; i < materialIconCount; i++) {
          const materialIcon = document.createElement('div');
          materialIcon.className = 'material-icon';
          
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
          const iconName = materialIcons[Math.floor(Math.random() * materialIcons.length)];
          materialIcon.innerHTML = `
              <span class="material-icons" style="font-size: ${size}px; color: var(--secondary);">${iconName}</span>
          `;
          
          bgAnimation.appendChild(materialIcon);
      }
      
      // Create GetX Logo
      const getxIcon = document.createElement('div');
      getxIcon.className = 'flutter-icon';
      
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
      const dartIcon = document.createElement('div');
      dartIcon.className = 'flutter-icon';
      
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
  
  createFlutterIcons();

  // Dynamic Background Animation with Cursor
  let mouseX = 0;
  let mouseY = 0;
  let invertSize = 0;
  const maxInvertSize = 300;
  
  document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Gradually increase invert circle size
      if (invertSize < maxInvertSize) {
          invertSize += 5;
      }
      
      invertCircle.style.width = `${invertSize}px`;
      invertCircle.style.height = `${invertSize}px`;
      
      // Move background elements based on cursor
      const flutterIcons = document.querySelectorAll('.flutter-icon');
      const materialIcons = document.querySelectorAll('.material-icon');
      
      const moveElements = (elements, intensity) => {
          elements.forEach(element => {
              const rect = element.getBoundingClientRect();
              const elementX = rect.left + rect.width / 2;
              const elementY = rect.top + rect.height / 2;
              
              // Calculate distance from cursor
              const distX = mouseX - elementX;
              const distY = mouseY - elementY;
              const distance = Math.sqrt(distX * distX + distY * distY);
              
              // Move away from cursor if close
              if (distance < 300) {
                  const moveX = (distX / distance) * (300 - distance) * 0.05 * intensity;
                  const moveY = (distY / distance) * (300 - distance) * 0.05 * intensity;
                  
                  element.style.transform = `translate(${-moveX}px, ${-moveY}px) rotate(${moveX * 0.1}deg)`;
              } else {
                  element.style.transform = '';
              }
          });
      };
      
      moveElements(flutterIcons, 1);
      moveElements(materialIcons, 1.5);
  });
  
  // Reset invert circle size when mouse stops moving
  let timeout;
  document.addEventListener('mousemove', () => {
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
  const fadeElements = document.querySelectorAll('.fade-in');
  const slideRightElements = document.querySelectorAll('.slide-in-right');
  const slideLeftElements = document.querySelectorAll('.slide-in-left');
  
  function checkAnimations() {
      const checkElements = (elements, className) => {
          elements.forEach(element => {
              const elementTop = element.getBoundingClientRect().top;
              const elementBottom = element.getBoundingClientRect().bottom;
              const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
              
              if (isVisible) {
                  element.classList.add(className);
              }
          });
      };
      
      checkElements(fadeElements, 'appear');
      checkElements(slideRightElements, 'appear');
      checkElements(slideLeftElements, 'appear');
  }
  
  window.addEventListener('scroll', checkAnimations);
  window.addEventListener('resize', checkAnimations);
  window.addEventListener('load', () => {
      checkAnimations();
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Header Scroll Effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.backgroundColor = body.classList.contains('light-mode') 
              ? 'rgba(185, 185, 185, 0.8)' 
              : 'rgba(10, 25, 47, 0.8)';
          header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      } else {
          header.style.backgroundColor = 'transparent';
          header.style.boxShadow = 'none';
      }
  });
  
  // Add pulse animation to Flutter icons
  setInterval(() => {
      const randomIcon = document.querySelectorAll('.flutter-icon, .material-icon')[
          Math.floor(Math.random() * document.querySelectorAll('.flutter-icon, .material-icon').length)
      ];
      
      if (randomIcon) {
          randomIcon.style.animation = 'pulse 2s ease-in-out';
          
          setTimeout(() => {
              randomIcon.style.animation = '';
          }, 2000);
      }
  }, 3000);
  
  // Enhanced Project Cards Animation
  const projectCards = document.querySelectorAll('.project-card');
  const projectsSection = document.querySelector('.projects');
  
  // Create Intersection Observer for projects section
  const projectsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
          animateProjectCards();
          projectsObserver.unobserve(projectsSection);
      }
  }, { threshold: 0.1 });
  
  // Start observing the projects section
  projectsObserver.observe(projectsSection);
  
  function animateProjectCards() {
      projectCards.forEach((card, index) => {
          setTimeout(() => {
              card.classList.add('visible');
              card.style.animation = `projectFadeIn 0.8s ease-out forwards`;
          }, index * 150); // Staggered animation with 150ms delay between cards
      });
  }
  
  // Animate skill tags
  const skillTags = document.querySelectorAll('.skill-tag');
  
  function animateSkillTags() {
      skillTags.forEach((tag, index) => {
          setTimeout(() => {
              tag.style.opacity = '1';
              tag.style.transform = 'translateY(0)';
          }, index * 100);
      });
  }
  
  // Trigger skill tags animation when they come into view
  const skillsSection = document.querySelector('.skills');
  const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateSkillTags();
              skillsObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });
  
  skillsObserver.observe(skillsSection);