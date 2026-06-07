import { navItems } from "../config/site";

const sections = navItems.map((item) => ({
  id: item.sectionId,
  name: item.sectionName,
}));

export function setupSite() {
  const toggle = document.getElementById("menu-toggle");
  const close = document.getElementById("menu-close");
  const menu = document.getElementById("mobile-nav");
  const links = document.querySelectorAll(".mobile-link");

  function openMenu() {
    menu?.classList.remove(
      "translate-y-[-100%]",
      "opacity-0",
      "pointer-events-none",
    );
    menu?.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
    menu?.setAttribute("aria-hidden", "false");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    history.pushState({ menu: true }, "");
  }

  function closeMenu() {
    menu?.classList.add(
      "translate-y-[-100%]",
      "opacity-0",
      "pointer-events-none",
    );
    menu?.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
    menu?.setAttribute("aria-hidden", "true");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggle?.getAttribute("data-menu-bound") !== "true") {
    toggle?.setAttribute("data-menu-bound", "true");
    toggle?.addEventListener("click", openMenu);
  }

  if (close?.getAttribute("data-menu-bound") !== "true") {
    close?.setAttribute("data-menu-bound", "true");
    close?.addEventListener("click", closeMenu);
  }

  links.forEach((link) => {
    if (link.getAttribute("data-menu-bound") === "true") return;
    link.setAttribute("data-menu-bound", "true");
    link.addEventListener("click", closeMenu);
  });

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

  const navInner = document.getElementById("nav-inner");

  function onScroll() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (navInner) {
      if (scrollTop > 24) {
        navInner.classList.add("nav-pill");
      } else {
        navInner.classList.remove("nav-pill");
      }
    }
  }

  const sectionElements = sections
    .map((s) => document.getElementById(s.id))
    .filter((el): el is HTMLElement => el !== null);
  const mobileLinks = document.querySelectorAll<HTMLElement>(".mobile-link");
  const navLinks = document.querySelectorAll<HTMLElement>(".nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        const id = visible[0].target.id;
        const match = sections.find((s) => s.id === id);
        const name = match?.name ?? "";

        mobileLinks.forEach((link) => {
          const active = link.getAttribute("data-section") === name;
          link.classList.toggle("text-gruv-text", active);
          link.classList.toggle("text-gruv-muted", !active);
        });

        navLinks.forEach((link) => {
          const active = link.getAttribute("data-section") === name;
          link.classList.toggle("text-gruv-text", active);
          link.classList.toggle("text-gruv-muted", !active);
        });
      }

      onScroll();
    },
    { threshold: 0.2, rootMargin: "0px 0px -30% 0px" },
  );

  sectionElements.forEach((el) => sectionObserver.observe(el));
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

window.addEventListener("popstate", () => {
  const menu = document.getElementById("mobile-nav");
  if (menu?.classList.contains("translate-y-0")) {
    menu.classList.add(
      "translate-y-[-100%]",
      "opacity-0",
      "pointer-events-none",
    );
    menu.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
    menu.setAttribute("aria-hidden", "true");
    document.getElementById("menu-toggle")?.setAttribute(
      "aria-expanded",
      "false",
    );
    document.body.style.overflow = "";
  }
});