export const SHORT_LINK_BRAND_HOST = "misly.link";

export function getShortDomain() {
  const fromEnv = process.env.NEXT_PUBLIC_SHORT_DOMAIN?.trim();

  return (fromEnv || SHORT_LINK_BRAND_HOST)
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "");
}

function isLocalHost(host: string) {
  const hostname = host.replace(/:\d+$/, "").toLowerCase();
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export function toAbsoluteShortUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const host = getShortDomain();
  const protocol = isLocalHost(host) ? "http" : "https";
  return `${protocol}://${trimmed.replace(/^\/+/, "")}`;
}

export function formatShortLabel(href: string) {
  return href.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

export function resolveShortUrl(
  shortUrl?: string | null,
  slug?: string | null,
) {
  const fromApi = shortUrl?.trim();
  if (fromApi) return toAbsoluteShortUrl(fromApi);

  const resolvedSlug = slug?.trim();
  if (!resolvedSlug) return "";

  const host = getShortDomain();
  const protocol = isLocalHost(host) ? "http" : "https";
  return `${protocol}://${host}/${resolvedSlug}`;
}
