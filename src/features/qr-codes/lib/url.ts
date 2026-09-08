export function toAbsoluteUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  return `https://${trimmed}`;
}

export const QR_PLACEHOLDER_URL = "https://misly.link";
