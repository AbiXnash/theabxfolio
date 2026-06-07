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
    menu?.removeAttribute("inert");
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
    menu?.setAttribute("inert", "");
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

  const navbar = document.getElementById("navbar");

  function onScroll() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (navbar) {
      if (scrollTop > 24) {
        navbar.classList.add("nav-scrolled");
      } else {
        navbar.classList.remove("nav-scrolled");
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
    menu.setAttribute("inert", "");
    menu.setAttribute("aria-hidden", "true");
    document.getElementById("menu-toggle")?.setAttribute(
      "aria-expanded",
      "false",
    );
    document.body.style.overflow = "";
  }
});