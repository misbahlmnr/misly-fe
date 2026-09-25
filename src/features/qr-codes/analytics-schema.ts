import { z } from "zod";

import type { QrScanAnalytics } from "@/features/qr-codes/types";
import { comparisonLabel, type TimeRange } from "@/lib/time-series";

const timeRangeSchema = z.enum(["7d", "30d", "all"]);

const namedShareSchema = z.object({
  name: z.string(),
  share: z.coerce.number(),
});

export const apiQrScanAnalyticsSchema = z.object({
  range: timeRangeSchema.optional(),
  comparisonLabel: z.string().optional(),
  totalScans: z.coerce.number(),
  uniqueScanners: z.coerce.number(),
  scansChange: z.coerce.number(),
  scannersChange: z.coerce.number(),
  topDevice: namedShareSchema,
  peakTime: z.object({
    label: z.string(),
    scans: z.coerce.number(),
  }),
  locations: z.array(namedShareSchema).optional().default([]),
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
  sources: z
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

export function mapApiQrScanAnalytics(
  value: unknown,
  range: TimeRange,
): QrScanAnalytics {
  const parsed = apiQrScanAnalyticsSchema.parse(value);

  return {
    range: parsed.range ?? range,
    comparisonLabel: parsed.comparisonLabel ?? comparisonLabel(range),
    totalScans: parsed.totalScans,
    uniqueScanners: parsed.uniqueScanners,
    scansChange: parsed.scansChange,
    scannersChange: parsed.scannersChange,
    topDevice: parsed.topDevice,
    peakTime: parsed.peakTime,
    locations: parsed.locations,
    devices: parsed.devices.map((item) => ({
      name: item.name,
      share: item.share,
      icon: item.icon ?? item.name.toLowerCase(),
      featured: item.featured,
    })),
    sources: parsed.sources.map((item) => ({
      name: item.name,
      share: item.share,
      icon: item.icon ?? "direct",
      featured: item.featured,
    })),
    series: parsed.series,
  };
}
