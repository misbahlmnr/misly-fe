import {
  resolveQrStyles,
  type QrStyles,
} from "@/features/qr-codes/schema";
import { QR_PLACEHOLDER_URL, toAbsoluteUrl } from "@/features/qr-codes/lib/url";

export type QrDownloadExtension = "png" | "svg";

type QrInstance = {
  append: (element: HTMLElement) => void;
  update: (options: Record<string, unknown>) => void;
  download: (options: {
    name?: string;
    extension?: QrDownloadExtension;
  }) => Promise<void>;
};

export function buildQrOptions(
  data: string,
  styles?: QrStyles | null,
  logoUrl?: string | null,
  size = 220,
) {
  const resolved = resolveQrStyles(styles);
  const image = logoUrl?.trim() || undefined;

  return {
    width: size,
    height: size,
    type: "svg" as const,
    data: toAbsoluteUrl(data) || QR_PLACEHOLDER_URL,
    image,
    margin: 8,
    qrOptions: {
      errorCorrectionLevel: image ? ("H" as const) : ("M" as const),
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.35,
      margin: 4,
      crossOrigin: "anonymous" as const,
    },
    dotsOptions: resolved.dotsOptions,
    cornersSquareOptions: resolved.cornersSquareOptions,
    cornersDotOptions: resolved.cornersDotOptions,
    backgroundOptions: resolved.backgroundOptions,
  };
}

async function loadQrCodeStyling() {
  const mod = await import("qr-code-styling");
  return mod.default;
}

export async function createQrInstance(
  data: string,
  styles?: QrStyles | null,
  logoUrl?: string | null,
  size = 220,
): Promise<QrInstance> {
  const QRCodeStyling = await loadQrCodeStyling();
  return new QRCodeStyling(
    buildQrOptions(data, styles, logoUrl, size),
  ) as unknown as QrInstance;
}

export async function downloadStyledQr({
  data,
  styles,
  logoUrl,
  name,
  extension,
}: {
  data: string;
  styles?: QrStyles | null;
  logoUrl?: string | null;
  name: string;
  extension: QrDownloadExtension;
}) {
  const qr = await createQrInstance(data, styles, logoUrl, 1024);
  const filename = name.trim().replace(/[^\w.-]+/g, "-") || "qr-code";
  await qr.download({ name: filename, extension });
}
