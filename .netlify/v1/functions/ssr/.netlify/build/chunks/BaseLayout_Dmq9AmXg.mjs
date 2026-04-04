import { c as createComponent } from './astro-component_CuX-g-_P.mjs';
import 'piccolore';
import { h as createRenderInstruction, m as maybeRenderHead, e as addAttribute, r as renderTemplate, g as renderComponent, i as renderSlot, j as renderHead, u as unescapeHTML } from './ssr-function_Bc7nLyaD.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const isActive = (href) => Astro2.url.pathname === href;
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <div class="header-inner container" data-astro-cid-3ef6ksr2> <a href="/" class="logo" data-astro-cid-3ef6ksr2> <span class="logo-mark" data-astro-cid-3ef6ksr2>$</span> <span class="logo-name" data-astro-cid-3ef6ksr2>abx</span> </a> <nav class="nav-desktop" data-astro-cid-3ef6ksr2> <a href="/"${addAttribute(["nav-link", { active: isActive("/") }], "class:list")} data-astro-cid-3ef6ksr2>home</a> <a href="/resume"${addAttribute(["nav-link", { active: isActive("/resume") }], "class:list")} data-astro-cid-3ef6ksr2>resume</a> <a href="/contact"${addAttribute(["nav-link", { active: isActive("/contact") }], "class:list")} data-astro-cid-3ef6ksr2>contact</a> </nav> <div class="nav-social" data-astro-cid-3ef6ksr2> <a href="https://github.com/AbiXnash" target="_blank" rel="noreferrer" class="social-link" aria-label="GitHub" data-astro-cid-3ef6ksr2> <svg viewBox="0 0 24 24" fill="currentColor" data-astro-cid-3ef6ksr2> <path d="M12 2C6.48 2 2 6.58 2 12.28c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.4-3.37-1.4-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.3 10.3 0 0 0 22 12.28C22 6.58 17.52 2 12 2z" data-astro-cid-3ef6ksr2></path> </svg> </a> <a href="https://linkedin.com/in/abinash-selvarasu" target="_blank" rel="noreferrer" class="social-link" aria-label="LinkedIn" data-astro-cid-3ef6ksr2> <svg viewBox="0 0 24 24" fill="currentColor" data-astro-cid-3ef6ksr2> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-astro-cid-3ef6ksr2></path> </svg> </a> </div> <button class="mobile-menu-btn" aria-label="Toggle menu" id="mobileMenuBtn" data-astro-cid-3ef6ksr2> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <line x1="3" y1="12" x2="21" y2="12" data-astro-cid-3ef6ksr2></line> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-3ef6ksr2></line> <line x1="3" y1="18" x2="21" y2="18" data-astro-cid-3ef6ksr2></line> </svg> </button> </div> </header> <div class="mobile-nav-overlay" id="mobileOverlay" data-astro-cid-3ef6ksr2></div> <nav class="mobile-nav" id="mobileNav" data-astro-cid-3ef6ksr2> <div class="mobile-nav-header" data-astro-cid-3ef6ksr2> <span class="mobile-nav-brand" data-astro-cid-3ef6ksr2> <span class="brand-mark" data-astro-cid-3ef6ksr2>$</span> <span class="brand-name" data-astro-cid-3ef6ksr2>abx</span> </span> <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu" data-astro-cid-3ef6ksr2> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-3ef6ksr2></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-3ef6ksr2></line> </svg> </button> </div> <div class="mobile-nav-links" data-astro-cid-3ef6ksr2> <a href="/"${addAttribute(["mobile-nav-link", { active: isActive("/") }], "class:list")} data-astro-cid-3ef6ksr2> <span class="link-icon" data-astro-cid-3ef6ksr2>~/</span> <span data-astro-cid-3ef6ksr2>home</span> </a> <a href="/resume"${addAttribute(["mobile-nav-link", { active: isActive("/resume") }], "class:list")} data-astro-cid-3ef6ksr2> <span class="link-icon" data-astro-cid-3ef6ksr2>~/</span> <span data-astro-cid-3ef6ksr2>resume</span> </a> <a href="/contact"${addAttribute(["mobile-nav-link", { active: isActive("/contact") }], "class:list")} data-astro-cid-3ef6ksr2> <span class="link-icon" data-astro-cid-3ef6ksr2>~/</span> <span data-astro-cid-3ef6ksr2>contact</span> </a> </div> <div class="mobile-nav-footer" data-astro-cid-3ef6ksr2> <a href="https://github.com/AbiXnash" target="_blank" rel="noreferrer" class="mobile-nav-social" data-astro-cid-3ef6ksr2> <svg viewBox="0 0 24 24" fill="currentColor" data-astro-cid-3ef6ksr2> <path d="M12 2C6.48 2 2 6.58 2 12.28c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.4-3.37-1.4-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.3 10.3 0 0 0 22 12.28C22 6.58 17.52 2 12 2z" data-astro-cid-3ef6ksr2></path> </svg> <span data-astro-cid-3ef6ksr2>@AbiXnash</span> </a> <a href="https://linkedin.com/in/abinash-selvarasu" target="_blank" rel="noreferrer" class="mobile-nav-social" data-astro-cid-3ef6ksr2> <svg viewBox="0 0 24 24" fill="currentColor" data-astro-cid-3ef6ksr2> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-astro-cid-3ef6ksr2></path> </svg> <span class="social-name" data-astro-cid-3ef6ksr2>@abinash-selvarasu</span> </a> </div> </nav>  ${renderScript($$result, "/Users/abx/dev/projects/theabxfolio/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/abx/dev/projects/theabxfolio/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="footer-inner container" data-astro-cid-sz7xmlte> <div class="footer-left" data-astro-cid-sz7xmlte> <span class="footer-name" data-astro-cid-sz7xmlte>Abinash Selvarasu</span> <span class="footer-role" data-astro-cid-sz7xmlte>Backend Engineer</span> </div> <nav class="footer-links" aria-label="Footer navigation" data-astro-cid-sz7xmlte> <a href="/" data-astro-cid-sz7xmlte>home</a> <a href="/resume" data-astro-cid-sz7xmlte>resume</a> <a href="/contact" data-astro-cid-sz7xmlte>contact</a> <a href="https://github.com/AbiXnash" target="_blank" rel="noreferrer" data-astro-cid-sz7xmlte>github</a> </nav> <div class="footer-copy" data-astro-cid-sz7xmlte> <span class="mono" data-astro-cid-sz7xmlte>${year}</span> </div> </div> </footer>`;
}, "/Users/abx/dev/projects/theabxfolio/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Abinash Selvarasu",
    description = "Backend Engineer specializing in payments, security, and resilient systems. Building production-grade platforms with clean architecture.",
    canonicalURL = new URL(Astro2.url.pathname, Astro2.site || "https://theabx.in"),
    ogImage = "/arch-logo.svg"
  } = Astro2.props;
  const siteName = "Abinash Selvarasu";
  const siteUrl = "https://theabx.in";
  const twitterHandle = "@AbiXnash";
  const linkedInUrl = "https://linkedin.com/in/abinash-selvarasu";
  const githubUrl = "https://github.com/AbiXnash";
  const authorName = "Abinash Selvarasu";
  const authorEmail = "abinash@theabx.in";
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-37fxchfa> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"', "><!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="author"', '><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><meta name="theme-color" content="#ff6b35"><meta name="color-scheme" content="dark"><!-- Canonical URL --><link rel="canonical"', '><!-- Favicon & Icons --><link rel="icon" type="image/svg+xml" href="/arch-logo.svg"><link rel="apple-touch-icon" sizes="180x180" href="/arch-logo.svg"><meta name="msapplication-TileColor" content="#0f0f0f"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name"', '><meta property="og:locale" content="en_US"><!-- Twitter / X --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:creator"', '><meta name="twitter:site"', '><!-- LinkedIn --><meta property="article:author"', '><!-- Preconnect to external domains --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Google Fonts --><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"><!-- RSS Feed --><link rel="alternate" type="application/rss+xml"', ' href="/rss.xml"><!-- Sitemap --><link rel="sitemap" type="application/xml" href="/sitemap-index.xml"><!-- JSON-LD Structured Data - Person --><script type="application/ld+json">', '<\/script><!-- JSON-LD Structured Data - Website --><script type="application/ld+json">', '<\/script><!-- JSON-LD Structured Data - BreadcrumbList --><script type="application/ld+json">', '<\/script><!-- JSON-LD FAQ for AEO (Answer Engine Optimization) --><script type="application/ld+json">', '<\/script><!-- Knowledge Graph --><script type="application/ld+json">', "<\/script>", '</head> <body data-astro-cid-37fxchfa> <a href="#main-content" class="skip-link" data-astro-cid-37fxchfa>Skip to main content</a> ', ' <main id="main-content" data-astro-cid-37fxchfa> ', " </main> ", "</body></html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(authorName, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(siteName, "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(twitterHandle, "content"), addAttribute(twitterHandle, "content"), addAttribute(linkedInUrl, "content"), addAttribute(siteName, "title"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": authorName,
    "alternateName": ["Abinash S", "AbiXnash"],
    "url": siteUrl,
    "sameAs": [
      githubUrl,
      linkedInUrl,
      "https://x.com/theabxguy",
      "https://instagram.com/_abixnash_"
    ],
    "jobTitle": "Backend Engineer",
    "description": description,
    "knowsAbout": ["Java", "Spring Boot", "Microservices", "Payments", "Security", "APIs", "Backend Development"],
    "skills": ["Java", "Spring Boot", "Microservices", "PostgreSQL", "OracleDB", "Payment Systems", "REST APIs"],
    "worksFor": {
      "@type": "Organization",
      "name": "Mindgate Solutions",
      "url": "https://www.mindgate.solutions"
    },
    "email": authorEmail,
    "image": ogImage,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalURL,
      "url": canonicalURL,
      "name": title,
      "description": description
    }
  })), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": siteName,
    "description": description,
    "publisher": {
      "@id": `${siteUrl}/#person`
    },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  })), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title.split(" | ")[1] || "Portfolio",
        "item": canonicalURL
      }
    ]
  })), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does Abinash Selvarasu do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Abinash Selvarasu is a Backend Engineer specializing in payments, security, and resilient systems. He works with Java, Spring Boot, microservices, and payment platforms."
        }
      },
      {
        "@type": "Question",
        "name": "What technologies does Abinash work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Abinash works with Java, Spring Boot, microservices architecture, OracleDB, PostgreSQL, payment systems, and API development."
        }
      },
      {
        "@type": "Question",
        "name": "Where does Abinash work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Abinash currently works at Mindgate Solutions, focusing on banking and payment infrastructure."
        }
      }
    ]
  })), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        "name": authorName,
        "url": siteUrl
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": siteName
      }
    ]
  })), renderHead(), renderComponent($$result, "Header", $$Header, { "data-astro-cid-37fxchfa": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-37fxchfa": true }));
}, "/Users/abx/dev/projects/theabxfolio/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, renderScript as r };
