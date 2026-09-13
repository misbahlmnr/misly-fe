export const QR_PLACEHOLDER_URL = "https://misly.link";
export const SHORT_LINK_BRAND_HOST = "misly.link";

export function toAbsoluteUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  return `https://${trimmed}`;
}

export function getShortenerOrigin() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  return apiUrl.replace(/\/api$/i, "");
}

export function slugFromUrl(url: string) {
  try {
    const path = new URL(toAbsoluteUrl(url)).pathname.replace(/^\/+|\/+$/g, "");
    if (!path || path.includes("/")) return null;
    return path;
  } catch {
    const withoutHost = url
      .replace(/^https?:\/\//i, "")
      .replace(/^[^/]+\//, "")
      .replace(/\/$/, "");
    if (!withoutHost || withoutHost.includes("/")) return null;
    return withoutHost;
  }
}

function normalizeRedirectCandidate(url?: string | null) {
  const trimmed = url?.trim() ?? "";
  if (!trimmed) return "";
  if (trimmed.startsWith("/")) {
    const origin = getShortenerOrigin();
    return origin ? `${origin}${trimmed}` : trimmed;
  }
  return toAbsoluteUrl(trimmed);
}

function isHttpUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isBrandedShortHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "") === SHORT_LINK_BRAND_HOST;
  } catch {
    return false;
  }
}

function sameHref(a: string, b: string) {
  return a.replace(/\/$/, "") === b.replace(/\/$/, "");
}

export function resolveQrRedirectUrl({
  shortLink,
  shortUrl,
  slug,
  destinationUrl,
}: {
  shortLink?: string | null;
  shortUrl?: string | null;
  slug?: string | null;
  destinationUrl?: string | null;
}) {
  const origin = getShortenerOrigin();
  const dest = destinationUrl ? toAbsoluteUrl(destinationUrl) : "";
  const fromShortLink = normalizeRedirectCandidate(shortLink);
  const fromShortUrl = normalizeRedirectCandidate(shortUrl);

  if (fromShortLink && isHttpUrl(fromShortLink) && !isBrandedShortHost(fromShortLink)) {
    return fromShortLink;
  }

  if (
    fromShortUrl &&
    isHttpUrl(fromShortUrl) &&
    !isBrandedShortHost(fromShortUrl) &&
    (!dest || !sameHref(fromShortUrl, dest))
  ) {
    return fromShortUrl;
  }

  const resolvedSlug =
    slug ||
    (fromShortLink && isBrandedShortHost(fromShortLink)
      ? slugFromUrl(fromShortLink)
      : null) ||
    (fromShortUrl && isBrandedShortHost(fromShortUrl)
      ? slugFromUrl(fromShortUrl)
      : null);

  if (resolvedSlug && origin) return `${origin}/${resolvedSlug}`;
  if (fromShortUrl && isHttpUrl(fromShortUrl) && !isBrandedShortHost(fromShortUrl)) {
    return fromShortUrl;
  }
  if (dest) return dest;
  return QR_PLACEHOLDER_URL;
}

export function formatShortLabel(href: string, slug?: string | null) {
  const labelSlug = slug || slugFromUrl(href);
  if (labelSlug) return `${SHORT_LINK_BRAND_HOST}/${labelSlug}`;

  try {
    const parsed = new URL(toAbsoluteUrl(href));
    return `${parsed.host}${parsed.pathname.replace(/\/$/, "")}`;
  } catch {
    return href.replace(/^https?:\/\//i, "");
  }
}
