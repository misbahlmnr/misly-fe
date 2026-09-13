import { z } from "zod";

import type { LinkAnalytics, SourceStat } from "@/features/analytics/types";
import { comparisonLabel, type TimeRange } from "@/lib/time-series";

export const timeRangeSchema = z.enum(["7d", "30d", "all"]);

const namedShareSchema = z.object({
  name: z.string(),
  share: z.coerce.number(),
});

const sourceColorByName: Record<string, string> = {
  Instagram: "#E1306C",
  WhatsApp: "#25D366",
  "Google Search": "#DB4437",
  Facebook: "#1877F2",
  X: "#111111",
  TikTok: "#010101",
  LinkedIn: "#0A66C2",
  YouTube: "#FF0000",
};

export const apiLinkAnalyticsSchema = z.object({
  range: timeRangeSchema.optional(),
  comparisonLabel: z.string().optional(),
  totalClicks: z.coerce.number(),
  uniqueVisitors: z.coerce.number(),
  clicksChange: z.coerce.number(),
  visitorsChange: z.coerce.number(),
  topCountry: namedShareSchema.nullable().optional(),
  topReferrer: namedShareSchema.nullable().optional(),
  locations: z
    .array(
      z.object({
        country: z.string(),
        flag: z.string().optional().default(""),
        share: z.coerce.number(),
        clicks: z.coerce.number(),
      }),
    )
    .optional()
    .default([]),
  sources: z
    .array(
      z.object({
        name: z.string(),
        share: z.coerce.number(),
        color: z.string().optional(),
        icon: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  devices: z
    .array(
      z.object({
        name: z.string(),
        share: z.coerce.number(),
        icon: z.string().optional(),
        featured: z.boolean().optional(),
      }),
    )
    .optional()
    .default([]),
  browsers: z.array(namedShareSchema).optional().default([]),
  series: z
    .array(
      z.object({
        date: z.string(),
        value: z.coerce.number(),
      }),
    )
    .optional()
    .default([]),
});

export type ApiLinkAnalytics = z.infer<typeof apiLinkAnalyticsSchema>;

function sourcePresentation(source: ApiLinkAnalytics["sources"][number]): SourceStat {
  return {
    name: source.name,
    share: source.share,
    color: source.color ?? sourceColorByName[source.name] ?? "",
    icon: source.icon ?? "direct",
  };
}

export function mapApiLinkAnalytics(
  value: unknown,
  range: TimeRange,
): LinkAnalytics {
  const parsed = apiLinkAnalyticsSchema.parse(value);
  const topCountry = parsed.topCountry ?? { name: "", share: 0 };
  const topReferrer = parsed.topReferrer ?? { name: "", share: 0 };

  return {
    range: parsed.range ?? range,
    comparisonLabel: parsed.comparisonLabel ?? comparisonLabel(range),
    totalClicks: parsed.totalClicks,
    uniqueVisitors: parsed.uniqueVisitors,
    clicksChange: parsed.clicksChange,
    visitorsChange: parsed.visitorsChange,
    topCountry,
    topReferrer,
    locations: parsed.locations.map((item) => ({
      country: item.country,
      flag: item.flag,
      share: item.share,
      clicks: item.clicks,
    })),
    sources: parsed.sources.map(sourcePresentation),
    devices: parsed.devices.map((item) => ({
      name: item.name,
      share: item.share,
      icon: item.icon ?? item.name.toLowerCase(),
      featured: item.featured,
    })),
    browsers: parsed.browsers,
    series: parsed.series,
  };
}
