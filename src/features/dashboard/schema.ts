import { z } from "zod";

import {
  apiLinkSchema,
  mapApiLinkToManagedLink,
} from "@/features/links/schema";
import type { Overview } from "./types";

export const overviewStatsSchema = z.object({
  totalLinks: z.coerce.number(),
  totalClicks: z.coerce.number(),
  totalQrCodes: z.coerce.number(),
});

export const apiOverviewSchema = z.object({
  stats: overviewStatsSchema.optional(),
  recentLinks: z.array(apiLinkSchema).optional().default([]),
});

export function mapApiOverview(value: unknown): Overview {
  const parsed = apiOverviewSchema.parse(value);

  return {
    stats: parsed.stats ?? {
      totalLinks: 0,
      totalClicks: 0,
      totalQrCodes: 0,
    },
    recentLinks: parsed.recentLinks.map(mapApiLinkToManagedLink),
  };
}
