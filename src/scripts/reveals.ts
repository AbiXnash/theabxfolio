export function setupReveals() {
  function activateInViewReveals() {
    const viewport = window.innerHeight * 0.92;
    document.querySelectorAll(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewport && rect.bottom > 0) {
        el.classList.add("active");
      }
    });
  }

  activateInViewReveals();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
}