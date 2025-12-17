const body = document.body;
const bgAnimation = document.getElementById("bg-animation");
const invertCircle = document.querySelector(".invert-circle");

const createBatSymbol = () => {
  const variant = Math.random() < 0.5 ? 0 : 1;
  return `<span class="bat-symbol-mask bat-symbol-mask--${variant}" aria-hidden="true"></span>`;
};

export const recreateBackground = () => {
  if (!bgAnimation) return;
  bgAnimation.innerHTML = "";
  const isBatman = body.classList.contains("batman-mode");
  const isMobile = window.innerWidth <= 768;
  const iconCount = isMobile ? 12 : 25;
  if (isBatman) {
    for (let i = 0; i < iconCount * 2; i += 1) {
      const node = document.createElement("div");
      node.className = "flutter-icon";
      const size = Math.random() * 60 + 40;
      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
      node.style.left = `${Math.random() * 100}%`;
      node.style.top = `${Math.random() * 100}%`;
      node.style.opacity = Math.random() * 0.2 + 0.1;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      node.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      node.innerHTML = createBatSymbol();
      bgAnimation.appendChild(node);
    }
    return;
  }
  for (let i = 0; i < iconCount; i += 1) {
    const node = document.createElement("div");
    node.className = "flutter-icon";
    const size = Math.random() * 60 + 40;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `${Math.random() * 100}%`;
    node.style.opacity = Math.random() * 0.15 + 0.05;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    node.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    node.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
        <path fill="#64FFDA" d="M20.41,41.95l-0.14,0.13l-9.03-9.03L21.15,23.14l0.14,0.13L20.41,41.95z"/>
        <path fill="#64FFDA" d="M33.06,23.1l-11.8,11.8l-0.14-18.68l0.13-0.13L33.06,23.1z"/>
        <path fill="#64FFDA" d="M20.41,6.06l-0.14,0.13l-0.13,0.13l0.13,0.13l0.14-0.13V6.06z"/>
        <path fill="#64FFDA" d="M20.41,23.27l-0.14,0.13l-9.03-9.03L21.15,4.46l0.14,0.13L20.41,23.27z"/>
        <path fill="#64FFDA" d="M11.24,23.14l9.03,9.03l0.14,0.13V23.14l-0.14-0.13L11.24,23.14z"/>
      </svg>
    `;
    bgAnimation.appendChild(node);
  }
  const materialIconCount = iconCount;
  const materialIcons = ["widgets","code","developer_mode","devices","smartphone","web","layers","architecture","auto_awesome","build"];
  for (let i = 0; i < materialIconCount; i += 1) {
    const node = document.createElement("div");
    node.className = "material-icon";
    const size = Math.random() * 40 + 20;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `${Math.random() * 100}%`;
    node.style.opacity = Math.random() * 0.15 + 0.05;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    node.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    const name = materialIcons[Math.floor(Math.random() * materialIcons.length)];
    node.innerHTML = `<span class="material-icons" style="font-size: ${size}px; color: var(--secondary);">${name}</span>`;
    bgAnimation.appendChild(node);
  }
  const getx = document.createElement("div");
  getx.className = "flutter-icon";
  const gs = 60;
  getx.style.width = `${gs}px`;
  getx.style.height = `${gs}px`;
  getx.style.left = `${Math.random() * 80 + 10}%`;
  getx.style.top = `${Math.random() * 80 + 10}%`;
  getx.style.opacity = 0.1;
  getx.style.animation = `float 15s ease-in-out 2s infinite`;
  getx.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <text x="20" y="70" fill="#64FFDA" font-family="Arial" font-weight="bold" font-size="70">G</text>
      <text x="55" y="70" fill="#64FFDA" font-family="Arial" font-weight="bold" font-size="50">X</text>
    </svg>
  `;
  bgAnimation.appendChild(getx);
  const dart = document.createElement("div");
  dart.className = "flutter-icon";
  const ds = 50;
  dart.style.width = `${ds}px`;
  dart.style.height = `${ds}px`;
  dart.style.left = `${Math.random() * 80 + 10}%`;
  dart.style.top = `${Math.random() * 80 + 10}%`;
  dart.style.opacity = 0.1;
  dart.style.animation = `float 12s ease-in-out 1s infinite`;
  dart.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
      <path fill="#64FFDA" d="M17,14L5.4,32.5L9,44l10.5,0l7.66-7.66l0-13.26L17,14z"/>
      <path fill="#64FFDA" d="M19,14h10.5l5.25,5.25l0,10.5L27.09,37.41L19,29V14z"/>
      <path fill="#64FFDA" d="M20.74,19L9,30.74V19H20.74z"/>
    </svg>
  `;
  bgAnimation.appendChild(dart);
};

export const initBackgroundInteractions = () => {
  let mouseX = 0;
  let mouseY = 0;
  let invertSize = 0;
  const maxInvertSize = 300;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (invertSize < maxInvertSize) {
      invertSize += 5;
    }
    if (invertCircle) {
      invertCircle.style.width = `${invertSize}px`;
      invertCircle.style.height = `${invertSize}px`;
      invertCircle.style.left = `${e.clientX}px`;
      invertCircle.style.top = `${e.clientY}px`;
    }
    const flutterIcons = document.querySelectorAll(".flutter-icon");
    const materialIcons = document.querySelectorAll(".material-icon");
    const move = (elements, intensity) => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const ex = rect.left + rect.width / 2;
        const ey = rect.top + rect.height / 2;
        const dx = mouseX - ex;
        const dy = mouseY - ey;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 500) {
          const mx = (dx / dist) * (500 - dist) * 0.05 * intensity;
          const my = (dy / dist) * (500 - dist) * 0.05 * intensity;
          el.style.transform = `translate(${-mx}px, ${-my}px) rotate(${mx * 0.1}deg)`;
        } else {
          el.style.transform = "";
        }
      });
    };
    move(flutterIcons, 1.5);
    move(materialIcons, 1.5);
  });
  let timeout;
  document.addEventListener("mousemove", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const shrink = setInterval(() => {
        invertSize -= 10;
        if (invertSize <= 0) {
          invertSize = 0;
          clearInterval(shrink);
        }
        if (invertCircle) {
          invertCircle.style.width = `${invertSize}px`;
          invertCircle.style.height = `${invertSize}px`;
        }
      }, 50);
    }, 1000);
  });
  setInterval(() => {
    const all = document.querySelectorAll(".flutter-icon, .material-icon");
    const idx = Math.floor(Math.random() * all.length);
    const node = all[idx];
    if (!node) return;
    node.style.animation = "pulse 2s ease-in-out";
    setTimeout(() => {
      node.style.animation = "";
    }, 2000);
  }, 3000);
  recreateBackground();
  document.addEventListener("recreate-background", () => recreateBackground());
};
