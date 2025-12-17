export const initCursorFollower = () => {
  const follower = document.querySelector(".cursor-follower");
  if (!follower) return;
  document.addEventListener("mousemove", (e) => {
    follower.style.left = `${e.clientX}px`;
    follower.style.top = `${e.clientY}px`;
  });
  document.addEventListener("mousedown", () => {
    follower.style.transform = "translate(-50%, -50%) scale(0.8)";
  });
  document.addEventListener("mouseup", () => {
    follower.style.transform = "translate(-50%, -50%) scale(1)";
  });
};

export const initMobileMenu = () => {
  const menu = document.querySelector(".mobile-menu");
  const btn = document.querySelector(".mobile-menu-btn");
  const closeBtn = document.querySelector(".mobile-menu-close");
  const links = document.querySelectorAll(".mobile-menu .nav-link");
  if (!menu || !btn || !closeBtn) return;
  const close = () => {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      menu.classList.add("hiding");
      document.body.style.overflow = "";
      setTimeout(() => {
        menu.classList.remove("hiding");
      }, 400);
    }
  };
  btn.addEventListener("click", () => {
    menu.classList.add("active");
    document.body.style.overflow = "hidden";
  });
  closeBtn.addEventListener("click", close);
  document.addEventListener("mousedown", (e) => {
    if (
      menu.classList.contains("active") &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      close();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      close();
    }
  });
  links.forEach((l) => l.addEventListener("click", close));
  menu.addEventListener("transitionend", () => {
    if (menu.classList.contains("hiding")) {
      menu.classList.remove("hiding");
    }
  });
};

export const initTabs = () => {
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-tab");
      buttons.forEach((b) => b.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(id)?.classList.add("active");
    });
  });
};

export const initScrollAnimations = () => {
  const fades = document.querySelectorAll(".fade-in");
  const right = document.querySelectorAll(".slide-in-right");
  const left = document.querySelectorAll(".slide-in-left");
  const check = () => {
    const apply = (elements, cls) => {
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const bottom = el.getBoundingClientRect().bottom;
        const visible = top < window.innerHeight - 100 && bottom > 0;
        if (visible) el.classList.add(cls);
      });
    };
    apply(fades, "appear");
    apply(right, "appear");
    apply(left, "appear");
  };
  window.addEventListener("scroll", check);
  window.addEventListener("resize", check);
  window.addEventListener("load", check);
};

export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (
      a.closest(".hero-social-links") ||
      a.closest(".social-links") ||
      a.hasAttribute("target") ||
      a.getAttribute("href") === "#"
    ) {
      return;
    }
    a.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#" && targetId.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({ top: target.offsetTop - 100, behavior: "smooth" });
        }
      }
    });
  });
};

export const initHeaderScrollEffect = () => {
  const header = document.querySelector("header");
  const body = document.body;
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
};
