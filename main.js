(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const nav = document.querySelector(".nav");
  if (nav) {
    let ticking = false;
    const applyScrollState = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
      ticking = false;
    };
    applyScrollState();
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(applyScrollState);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  const main = document.querySelector("main");
  if (main) {
    if (prefersReducedMotion) {
      main.classList.add("is-visible");
    } else {
      requestAnimationFrame(() => main.classList.add("is-visible"));
    }
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  document.querySelectorAll("[data-fallback-text]").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        const placeholder = document.createElement("div");
        placeholder.className = "photo-placeholder";
        placeholder.textContent = img.dataset.fallbackText;
        img.replaceWith(placeholder);
      },
      { once: true }
    );
  });

  const rootStyles = getComputedStyle(document.documentElement);
  const colorPrimary = rootStyles.getPropertyValue("--color-primary").trim();
  const colorAccent = rootStyles.getPropertyValue("--color-accent").trim();

  const appendSVGPath = (
    el,
    { w, h, d, color, opacity, strokeWidth, className = "underline-svg", linejoin }
  ) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add(className);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-opacity", opacity);
    path.setAttribute("stroke-width", strokeWidth);
    path.setAttribute("stroke-linecap", "round");
    if (linejoin) path.setAttribute("stroke-linejoin", linejoin);

    svg.appendChild(path);
    el.appendChild(svg);
    return { svg, path };
  };

  const createUnderlineSVG = (
    el,
    { color, opacity, width: strokeWidth, w, h, d, animate = true }
  ) => {
    w = w ?? el.offsetWidth + 8;
    h = h ?? 10;

    if (!d) {
      const startY = 4 + Math.random() * 2;
      const endY = 4 + Math.random() * 2;
      const cp1x = w * (0.2 + Math.random() * 0.15);
      const cp1y = startY - 1 - Math.random() * 2;
      const cp2x = w * (0.6 + Math.random() * 0.15);
      const cp2y = endY + 1 + Math.random() * 2;
      d = `M2 ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${w - 2} ${endY}`;
    }

    const { path } = appendSVGPath(el, { w, h, d, color, opacity, strokeWidth });

    if (animate) {
      path.style.setProperty("--path-length", path.getTotalLength());
    }
  };

  const drawOverlaidCurves = (el, { wPad, primaryWidth, primaryOpacity, accentWidth, accentOpacity }) => {
    const w = el.offsetWidth + wPad;
    const h = 14;

    const s1 = 7 + Math.random() * 2;
    const e1 = 8 + Math.random() * 2;
    const d1 = `M2 ${s1} C ${w * 0.3} ${s1 - 4 - Math.random() * 2} ${w * 0.7} ${e1 + 2 + Math.random() * 2} ${w - 2} ${e1}`;
    createUnderlineSVG(el, { color: colorPrimary, opacity: primaryOpacity, width: primaryWidth, w, h, d: d1, animate: false });

    const s2 = 2 + Math.random() * 2;
    const e2 = 7 + Math.random() * 2;
    const d2 = `M-6 ${s2} Q ${w * 0.5 + Math.random() * w * 0.1} ${s2 + 8 + Math.random() * 4} ${w - 4} ${e2}`;
    createUnderlineSVG(el, { color: colorAccent, opacity: accentOpacity, width: accentWidth, w, h, d: d2, animate: false });
  };

  const drawImperfectBorder = (el, { color, opacity, strokeWidth }) => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;

    const j = (max = 6) => (Math.random() - 0.5) * max;
    const bow = 8;

    const tl = { x: j(), y: j() };
    const tr = { x: w + j(), y: j() };
    const br = { x: w + j(), y: h + j() };
    const bl = { x: j(), y: h + j() };

    const d = [
      `M ${tl.x} ${tl.y}`,
      `C ${w * 0.3 + j()} ${tl.y - bow + j()} ${w * 0.7 + j()} ${tr.y + bow + j()} ${tr.x} ${tr.y}`,
      `C ${tr.x + bow + j()} ${h * 0.3 + j()} ${br.x - bow + j()} ${h * 0.7 + j()} ${br.x} ${br.y}`,
      `C ${w * 0.7 + j()} ${br.y + bow + j()} ${w * 0.3 + j()} ${bl.y - bow + j()} ${bl.x} ${bl.y}`,
      `C ${bl.x - bow + j()} ${h * 0.7 + j()} ${tl.x + bow + j()} ${h * 0.3 + j()} ${tl.x} ${tl.y}`,
      "Z",
    ].join(" ");

    appendSVGPath(el, {
      w, h, d, color, opacity, strokeWidth,
      className: "imperfect-border-svg",
      linejoin: "round",
    });
  };

  const initUnderlines = () => {
    document.querySelectorAll(".underline--name").forEach((el) =>
      drawOverlaidCurves(el, { wPad: 6, primaryWidth: 12, primaryOpacity: "0.4", accentWidth: 7, accentOpacity: "0.8" })
    );

    document.querySelectorAll(".underline--large").forEach((el) =>
      drawOverlaidCurves(el, { wPad: 12, primaryWidth: 10, primaryOpacity: "0.35", accentWidth: 6, accentOpacity: "0.85" })
    );

    const drawLinks = document.querySelectorAll(".underline--draw");
    drawLinks.forEach((link) => {
      createUnderlineSVG(link, { color: colorPrimary, opacity: "0.35", width: 7 });
      createUnderlineSVG(link, { color: colorAccent, opacity: "0.85", width: 5 });
    });

    document.querySelectorAll(".post--featured").forEach((el) => {
      drawImperfectBorder(el, { color: colorAccent, opacity: "0.7", strokeWidth: 3 });
    });

    // Enable transitions only after paint so the draw-on-hover underlines
    // don't flash in reverse on load.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        drawLinks.forEach((l) => l.classList.add("is-ready"));
      });
    });
  };

  const postModal = document.getElementById("post-modal");
  if (postModal) {
    const frame = postModal.querySelector(".post-modal__frame");
    const titleEl = postModal.querySelector(".post-modal__title");
    const externalLink = postModal.querySelector(".post-modal__external");
    let lastTrigger = null;

    const openModal = (url, title, trigger) => {
      lastTrigger = trigger || null;
      titleEl.textContent = title || "";
      externalLink.href = url;
      frame.src = url;
      postModal.hidden = false;
      requestAnimationFrame(() => {
        postModal.classList.add("is-open");
      });
      document.body.classList.add("modal-open");
      const closeBtn = postModal.querySelector(".post-modal__close");
      closeBtn && closeBtn.focus();
    };

    const closeModal = () => {
      postModal.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      const onEnd = () => {
        postModal.hidden = true;
        frame.src = "about:blank";
      };
      if (prefersReducedMotion) {
        onEnd();
      } else {
        postModal.addEventListener("transitionend", onEnd, { once: true });
      }
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
    };

    document.querySelectorAll(".posts .post__link").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        const url = link.getAttribute("href");
        const postTitleEl = link.querySelector(".post__title");
        const title = postTitleEl ? postTitleEl.textContent.trim() : "";
        openModal(url, title, link);
      });
    });

    postModal.addEventListener("click", (e) => {
      if (e.target.closest("[data-modal-close]")) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && postModal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  // Wait for web fonts so underlines size against the final text metrics.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initUnderlines);
  } else {
    initUnderlines();
  }
})();
