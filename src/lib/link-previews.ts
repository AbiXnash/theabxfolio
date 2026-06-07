import { site, socialLinks } from "../config/site";

export interface LinkPreview {
  title: string;
  description?: string;
  image?: string;
  domain?: string;
}

function normalizeUrl(href: string) {
  try {
    const url = new URL(href, site.domain);
    const hash = url.hash;
    url.hash = "";
    const base = url.href.replace(/\/$/, "");
    return hash ? `${base}${hash}` : base;
  } catch {
    return href.replace(/\/$/, "");
  }
}

function domainFromUrl(href: string) {
  try {
    return new URL(href, site.domain).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

const registry = new Map<string, LinkPreview>([
  [
    normalizeUrl(site.employerUrl),
    {
      title: site.employer,
      description: "Payment systems, banking integrations, and enterprise Java backends.",
      domain: "mindgate.solutions",
    },
  ],
  [
    normalizeUrl(site.resumeUrl),
    {
      title: "Resume",
      description: "PDF download for Abinash Selvarasu, backend engineer.",
      domain: site.domain.replace(/^https?:\/\//, ""),
    },
  ],
  [
    normalizeUrl("https://github.com/AbiXnash"),
    {
      title: "GitHub",
      description: "Open source projects, experiments, and daily commits.",
      domain: "github.com",
    },
  ],
  [
    normalizeUrl("https://linkedin.com/in/abinash-selvarasu"),
    {
      title: "LinkedIn",
      description: "Professional profile and work history.",
      domain: "linkedin.com",
    },
  ],
  [
    normalizeUrl("https://instagram.com/abx.engg"),
    {
      title: "Instagram",
      description: "Engineering life outside the editor.",
      domain: "instagram.com",
    },
  ],
  [
    normalizeUrl(`mailto:${site.email}`),
    {
      title: site.email,
      description: "Say hello about backend work, side projects, or APIs.",
      domain: "email",
    },
  ],
  [
    normalizeUrl("/#experience"),
    {
      title: "Work experience",
      description: "Payment systems and banking tools at Mindgate Solutions.",
      domain: site.domain.replace(/^https?:\/\//, ""),
    },
  ],
  [
    normalizeUrl("/#projects"),
    {
      title: "Projects",
      description: "Side projects and experiments built after hours.",
      domain: site.domain.replace(/^https?:\/\//, ""),
    },
  ],
  [
    normalizeUrl("/#opensource"),
    {
      title: "Open source",
      description: "Public GitHub repositories sorted by latest push.",
      domain: site.domain.replace(/^https?:\/\//, ""),
    },
  ],
]);

for (const link of socialLinks) {
  const existing = registry.get(normalizeUrl(link.href));
  if (!existing) {
    registry.set(normalizeUrl(link.href), {
      title: link.label,
      description: `Visit ${link.label}.`,
      domain: domainFromUrl(link.href),
    });
  }
}

export function resolveLinkPreview(
  href: string,
  overrides?: Partial<LinkPreview>,
): LinkPreview | null {
  if (!href || href === "#") return null;

  const normalized = normalizeUrl(href);
  const base =
    registry.get(normalized) ??
    (href.startsWith("http")
      ? {
          title: domainFromUrl(href),
          description: href,
          domain: domainFromUrl(href),
        }
      : href.startsWith("/")
        ? registry.get(normalizeUrl(`${site.domain}${href}`)) ?? null
        : null);

  if (!base && !overrides) return null;

  return {
    title: overrides?.title ?? base?.title ?? domainFromUrl(href),
    description: overrides?.description ?? base?.description,
    image: overrides?.image ?? base?.image,
    domain: overrides?.domain ?? base?.domain ?? domainFromUrl(href),
  };
}

export function linkPreviewAttributes(
  href: string,
  overrides?: Partial<LinkPreview>,
) {
  const preview = resolveLinkPreview(href, overrides);
  if (!preview) return {};

  return {
    "data-link-preview": "",
    "data-preview-title": preview.title,
    ...(preview.description && {
      "data-preview-description": preview.description,
    }),
    ...(preview.image && { "data-preview-image": preview.image }),
    ...(preview.domain && { "data-preview-domain": preview.domain }),
  };
}