export function initializeScrollReveal(): void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      }
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  for (const element of document.querySelectorAll(
    ".reveal, .stagger-children",
  )) {
    observer.observe(element);
  }
}
