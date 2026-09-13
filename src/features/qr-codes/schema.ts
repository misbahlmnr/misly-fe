import { z } from "zod";

import { formatDate } from "@/lib/formatter";

import { formatShortLabel, resolveQrRedirectUrl, slugFromUrl } from "./lib/url";

export const qrStylePresetSchema = z.enum(["default", "brand", "circular"]);
export type QrStylePreset = z.infer<typeof qrStylePresetSchema>;

export const qrDotTypeSchema = z.enum([
  "square",
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
  "extra-rounded",
]);

export const qrCornerSquareTypeSchema = z.enum([
  "dot",
  "square",
  "extra-rounded",
]);

export const qrCornerDotTypeSchema = z.enum(["dot", "square"]);

export const qrStylesSchema = z.object({
  dotsOptions: z
    .object({
      type: qrDotTypeSchema.optional(),
      color: z.string().optional(),
    })
    .optional(),
  cornersSquareOptions: z
    .object({
      type: qrCornerSquareTypeSchema.optional(),
      color: z.string().optional(),
    })
    .optional(),
  cornersDotOptions: z
    .object({
      type: qrCornerDotTypeSchema.optional(),
      color: z.string().optional(),
    })
    .optional(),
  backgroundOptions: z
    .object({
      color: z.string().optional(),
    })
    .optional(),
});

export type QrDotType = z.infer<typeof qrDotTypeSchema>;
export type QrCornerSquareType = z.infer<typeof qrCornerSquareTypeSchema>;
export type QrCornerDotType = z.infer<typeof qrCornerDotTypeSchema>;
export type QrStyles = z.infer<typeof qrStylesSchema>;

export type ResolvedQrStyles = {
  dotsOptions: { type: QrDotType; color: string };
  cornersSquareOptions: { type: QrCornerSquareType; color: string };
  cornersDotOptions: { type: QrCornerDotType; color: string };
  backgroundOptions: { color: string };
};

export const defaultQrStyles: ResolvedQrStyles = {
  dotsOptions: { type: "square", color: "#161d1f" },
  cornersSquareOptions: { type: "square", color: "#161d1f" },
  cornersDotOptions: { type: "square", color: "#161d1f" },
  backgroundOptions: { color: "#ffffff" },
};

export const qrStylePresets: Record<QrStylePreset, ResolvedQrStyles> = {
  default: defaultQrStyles,
  brand: {
    dotsOptions: { type: "square", color: "#5341cd" },
    cornersSquareOptions: { type: "square", color: "#5341cd" },
    cornersDotOptions: { type: "square", color: "#5341cd" },
    backgroundOptions: { color: "#ffffff" },
  },
  circular: {
    dotsOptions: { type: "extra-rounded", color: "#161d1f" },
    cornersSquareOptions: { type: "extra-rounded", color: "#161d1f" },
    cornersDotOptions: { type: "dot", color: "#161d1f" },
    backgroundOptions: { color: "#ffffff" },
  },
};

export function resolveQrStyles(styles?: QrStyles | null): ResolvedQrStyles {
  return {
    dotsOptions: {
      type: styles?.dotsOptions?.type ?? defaultQrStyles.dotsOptions.type,
      color: styles?.dotsOptions?.color ?? defaultQrStyles.dotsOptions.color,
    },
    cornersSquareOptions: {
      type:
        styles?.cornersSquareOptions?.type ??
        defaultQrStyles.cornersSquareOptions.type,
      color:
        styles?.cornersSquareOptions?.color ??
        defaultQrStyles.cornersSquareOptions.color,
    },
    cornersDotOptions: {
      type:
        styles?.cornersDotOptions?.type ?? defaultQrStyles.cornersDotOptions.type,
      color:
        styles?.cornersDotOptions?.color ?? defaultQrStyles.cornersDotOptions.color,
    },
    backgroundOptions: {
      color:
        styles?.backgroundOptions?.color ??
        defaultQrStyles.backgroundOptions.color,
    },
  };
}

export function parseQrStyles(value: unknown): QrStyles {
  if (value == null || value === "") return {};

  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value) as unknown;
    } catch {
      return {};
    }
  }

  const result = qrStylesSchema.safeParse(parsed);
  return result.success ? result.data : {};
}

export function inferQrPreset(styles?: QrStyles | null): QrStylePreset {
  const resolved = resolveQrStyles(styles);

  if (
    resolved.dotsOptions.type === "extra-rounded" ||
    resolved.cornersSquareOptions.type === "extra-rounded"
  ) {
    return "circular";
  }

  if (resolved.dotsOptions.color.toLowerCase() === "#5341cd") {
    return "brand";
  }

  return "default";
}

export function isQrCustomized(styles: QrStyles, logoUrl: string | null) {
  if (logoUrl) return true;

  const resolved = resolveQrStyles(styles);
  return JSON.stringify(resolved) !== JSON.stringify(defaultQrStyles);
}

const apiQrLinkSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().optional(),
    shortUrl: z.string().optional(),
    shortLink: z.string().optional(),
    short_url: z.string().optional(),
    short_link: z.string().optional(),
    originalUrl: z.string().optional(),
  })
  .optional();

export const apiQrCodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  destinationUrl: z.string(),
  styles: z
    .union([z.string(), z.record(z.string(), z.unknown()), z.null()])
    .optional(),
  logoUrl: z.string().nullable().optional(),
  shortUrl: z.string().optional(),
  shortLink: z.string().optional(),
  short_url: z.string().optional(),
  short_link: z.string().optional(),
  slug: z.string().optional(),
  linkId: z.string().nullable().optional(),
  link: apiQrLinkSchema,
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type ApiQrCode = z.infer<typeof apiQrCodeSchema>;

export type QrCodeItem = {
  id: string;
  title: string;
  shortUrl: string;
  shortLabel: string;
  destinationUrl: string;
  scans: number;
  createdLabel: string;
  createdAt: string;
  updatedAt?: string;
  styles: QrStyles;
  logoUrl: string | null;
  linkId: string | null;
  slug: string | null;
  customized: boolean;
};

export function mapApiQrToQrCodeItem(item: ApiQrCode): QrCodeItem {
  const styles = parseQrStyles(item.styles);
  const logoUrl = item.logoUrl?.trim() ? item.logoUrl.trim() : null;
  const slug =
    item.slug?.trim() ||
    item.link?.slug?.trim() ||
    slugFromUrl(
      item.shortLink ||
        item.short_link ||
        item.shortUrl ||
        item.short_url ||
        "",
    ) ||
    null;
  const shortUrl = resolveQrRedirectUrl({
    shortLink: item.shortLink || item.short_link || item.link?.shortLink || item.link?.short_link,
    shortUrl: item.shortUrl || item.short_url || item.link?.shortUrl || item.link?.short_url,
    slug,
    destinationUrl: item.destinationUrl,
  });

  return {
    id: item.id,
    title: item.title,
    shortUrl,
    shortLabel: formatShortLabel(shortUrl, slug),
    destinationUrl: item.destinationUrl,
    scans: 0,
    createdLabel: formatDate(item.createdAt),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    styles,
    logoUrl,
    linkId: item.linkId ?? item.link?.id ?? null,
    slug,
    customized: isQrCustomized(styles, logoUrl),
  };
}

export const createQrPayloadSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .min(1, "Destination URL is required")
    .url("Enter a valid URL")
    .refine((url) => /^https?:\/\/.+/i.test(url), "Enter a valid URL"),
  title: z.string().trim().min(1, "Title is required"),
  styles: z.string(),
  logoUrl: z.string(),
});

export type CreateQrPayload = z.infer<typeof createQrPayloadSchema>;

export const createQrSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    source: z.enum(["existing", "new"]),
    linkId: z.string(),
    destinationUrl: z.string(),
    preset: qrStylePresetSchema,
    dotsType: qrDotTypeSchema,
    dotsColor: z.string().min(1, "Foreground color is required"),
    cornersSquareType: qrCornerSquareTypeSchema,
    cornersDotType: qrCornerDotTypeSchema,
    cornersColor: z.string().min(1, "Corner color is required"),
    backgroundColor: z.string().min(1, "Background color is required"),
    logoUrl: z.string(),
    format: z.enum(["png", "svg"]),
  })
  .refine((values) => values.source !== "existing" || values.linkId.trim(), {
    message: "Select a short link",
    path: ["linkId"],
  })
  .refine(
    (values) =>
      values.source !== "new" || values.destinationUrl.trim().length > 0,
    {
      message: "Destination URL is required",
      path: ["destinationUrl"],
    },
  )
  .refine(
    (values) =>
      values.source !== "new" || /^https?:\/\/.+/i.test(values.destinationUrl.trim()),
    {
      message: "Enter a valid URL",
      path: ["destinationUrl"],
    },
  )
  .refine(
    (values) =>
      !values.logoUrl.trim() || /^https?:\/\/.+/i.test(values.logoUrl.trim()),
    {
      message: "Enter a valid image URL",
      path: ["logoUrl"],
    },
  );

export type CreateQrValues = z.infer<typeof createQrSchema>;

export const defaultCreateQrValues: CreateQrValues = {
  title: "",
  source: "existing",
  linkId: "",
  destinationUrl: "",
  preset: "default",
  dotsType: defaultQrStyles.dotsOptions.type,
  dotsColor: defaultQrStyles.dotsOptions.color,
  cornersSquareType: defaultQrStyles.cornersSquareOptions.type,
  cornersDotType: defaultQrStyles.cornersDotOptions.type,
  cornersColor: defaultQrStyles.cornersSquareOptions.color,
  backgroundColor: defaultQrStyles.backgroundOptions.color,
  logoUrl: "",
  format: "png",
};

export function qrStylesFromValues(
  values: Pick<
    CreateQrValues,
    | "dotsType"
    | "dotsColor"
    | "cornersSquareType"
    | "cornersDotType"
    | "cornersColor"
    | "backgroundColor"
  >,
): QrStyles {
  return {
    dotsOptions: { type: values.dotsType, color: values.dotsColor },
    cornersSquareOptions: {
      type: values.cornersSquareType,
      color: values.cornersColor,
    },
    cornersDotOptions: {
      type: values.cornersDotType,
      color: values.cornersColor,
    },
    backgroundOptions: { color: values.backgroundColor },
  };
}

export function valuesFromQr(item?: QrCodeItem): CreateQrValues {
  if (!item) return defaultCreateQrValues;

  const styles = resolveQrStyles(item.styles);

  return {
    title: item.title,
    source: item.linkId ? "existing" : "new",
    linkId: item.linkId ?? "",
    destinationUrl: item.destinationUrl,
    preset: inferQrPreset(item.styles),
    dotsType: styles.dotsOptions.type,
    dotsColor: styles.dotsOptions.color,
    cornersSquareType: styles.cornersSquareOptions.type,
    cornersDotType: styles.cornersDotOptions.type,
    cornersColor: styles.cornersSquareOptions.color,
    backgroundColor: styles.backgroundOptions.color,
    logoUrl: item.logoUrl ?? "",
    format: "png",
  };
}

export function applyQrPreset(preset: QrStylePreset): Pick<
  CreateQrValues,
  | "preset"
  | "dotsType"
  | "dotsColor"
  | "cornersSquareType"
  | "cornersDotType"
  | "cornersColor"
  | "backgroundColor"
> {
  const styles = qrStylePresets[preset];

  return {
    preset,
    dotsType: styles.dotsOptions.type,
    dotsColor: styles.dotsOptions.color,
    cornersSquareType: styles.cornersSquareOptions.type,
    cornersDotType: styles.cornersDotOptions.type,
    cornersColor: styles.cornersSquareOptions.color,
    backgroundColor: styles.backgroundOptions.color,
  };
}

export function toCreateQrPayload(
  values: CreateQrValues,
  selectedDestinationUrl?: string,
): CreateQrPayload {
  const destinationUrl =
    values.source === "existing"
      ? (selectedDestinationUrl ?? "").trim()
      : values.destinationUrl.trim();

  return createQrPayloadSchema.parse({
    destinationUrl,
    title: values.title.trim(),
    styles: JSON.stringify(qrStylesFromValues(values)),
    logoUrl: values.logoUrl.trim(),
  });
}
