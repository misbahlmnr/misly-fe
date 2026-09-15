import { getShortOrigin } from "@/features/links/lib/url";

export function withShortOrigin(url?: string | null) {
  const trimmed = url?.trim() ?? "";
  if (!trimmed) return getShortOrigin();

  try {
    const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(href);
    const path = parsed.pathname.replace(/\/$/, "");
    return `${getShortOrigin()}${path}${parsed.search}`;
  } catch {
    if (trimmed.startsWith("/")) return `${getShortOrigin()}${trimmed}`;
    return `${getShortOrigin()}/${trimmed.replace(/^\/+/, "")}`;
  }
}

export function buildQrScanUrl(qrCodeId: string) {
  return `${getShortOrigin()}/q/${qrCodeId}`;
}
