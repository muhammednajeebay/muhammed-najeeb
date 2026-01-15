import { fetchMediumItems } from "../../infrastructure/http/medium.js";

const stripHtml = (v = "") => {
  const doc = new DOMParser().parseFromString(v, "text/html");
  return doc.body.textContent || "";
};

const truncate = (text, max = 160) => {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
};

const estimateRead = (text = "") => {
  const words = stripHtml(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const formatDate = (value) => {
  if (!value) return "Recent";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Recent";
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(d);
};

const resolveImage = (item) => {
  const isTrackingPixel = (url) => url && url.includes("medium.com/_/stat");
  
  if (item.thumbnail && item.thumbnail.startsWith("http") && !isTrackingPixel(item.thumbnail)) {
    return item.thumbnail;
  }
  
  if (item.enclosure && item.enclosure.link && item.enclosure.link.startsWith("http") && !isTrackingPixel(item.enclosure.link)) {
    return item.enclosure.link;
  }

  const html = item.content || item.description || "";
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (m && m[1] && !isTrackingPixel(m[1])) return m[1];

  return "assets/preview.png";
};

const createCard = (item) => {
  const title = (item.title || "Untitled post").trim();
  const image = resolveImage(item);
  const readTime = estimateRead(item.content || item.description || "");
  const dateLabel = formatDate(item.pubDate);
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
};

const navState = (track, prevBtn, nextBtn) => {
  if (!track) return;
  const maxScrollLeft = track.scrollWidth - track.clientWidth - 5;
  if (prevBtn) prevBtn.disabled = track.scrollLeft <= 5;
  if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScrollLeft;
};

const scrollAmount = (track) => {
  if (!track) return 0;
  const card = track.querySelector(".blog-card");
  if (!card) return track.clientWidth;
  const cardWidth = card.getBoundingClientRect().width;
  const styles = window.getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || styles.rowGap || "0") || 0;
  return cardWidth + gap;
};

const setupCarousel = (track, prevBtn, nextBtn) => {
  if (!track || track.dataset.carouselReady === "true") {
    navState(track, prevBtn, nextBtn);
    return;
  }
  const scrollByAmount = (direction) => {
    const amount = scrollAmount(track) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };
  prevBtn?.addEventListener("click", () => scrollByAmount(-1));
  nextBtn?.addEventListener("click", () => scrollByAmount(1));
  track.addEventListener("scroll", () => navState(track, prevBtn, nextBtn));
  window.addEventListener("resize", () => navState(track, prevBtn, nextBtn));
  track.dataset.carouselReady = "true";
  navState(track, prevBtn, nextBtn);
};

export const initBlog = async () => {
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
    const items = await fetchMediumItems();
    if (!items.length) throw new Error("no-items");
    track.innerHTML = "";
    const MAX = 12;
    items.slice(0, MAX).forEach((it) => {
      track.appendChild(createCard(it));
    });
    setupCarousel(track, prevBtn, nextBtn);
  } catch {
    if (errorEl) errorEl.hidden = false;
  } finally {
    delete track.dataset.loading;
  }
};
