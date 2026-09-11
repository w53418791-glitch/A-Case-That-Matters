/* Sticky TOC + expand/collapse analysis details */
(function () {
  const toc = document.getElementById("toc");
  if (toc) {
    const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    function setActive(id) {
      links.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
      });
    }

    if ("IntersectionObserver" in window && sections.length) {
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0] && visible[0].target.id) setActive(visible[0].target.id);
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
      );
      sections.forEach((s) => io.observe(s));
    }

    links.forEach((a) => {
      a.addEventListener("click", () => {
        const id = a.getAttribute("href").slice(1);
        setActive(id);
      });
    });
  }

  function allDetails(root) {
    return Array.from((root || document).querySelectorAll("details.analysis-details"));
  }

  document.querySelectorAll("[data-expand-all]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const scope = btn.getAttribute("data-expand-all");
      const root = scope ? document.querySelector(scope) : document;
      allDetails(root).forEach((d) => { d.open = true; });
    });
  });
  document.querySelectorAll("[data-collapse-all]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const scope = btn.getAttribute("data-collapse-all");
      const root = scope ? document.querySelector(scope) : document;
      allDetails(root).forEach((d) => { d.open = false; });
    });
  });
})();
