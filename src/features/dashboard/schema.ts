import { z } from "zod";

import {
  linkStatusSchema,
  mapApiLinkToManagedLink,
  type ApiLink,
} from "@/features/links/schema";
import type { Overview } from "./types";

export const overviewStatsSchema = z.object({
  totalLinks: z.coerce.number(),
  totalClicks: z.coerce.number(),
  totalQrCodes: z.coerce.number(),
});

const overviewLinkSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  title: z.string().optional().default(""),
  originalUrl: z.string().optional(),
  destinationUrl: z.string().optional(),
  url: z.string().optional(),
  slug: z.string(),
  shortUrl: z.string().optional(),
  clickCount: z.coerce.number().optional(),
  clicks: z.coerce.number().optional(),
  createdAt: z.union([z.string(), z.date()]).transform((value) =>
    value instanceof Date ? value.toISOString() : value,
  ),
  updatedAt: z.string().optional(),
  status: z.string().optional(),
});

export const apiOverviewSchema = z.object({
  stats: overviewStatsSchema.optional(),
  totalLinks: z.coerce.number().optional(),
  totalClicks: z.coerce.number().optional(),
  totalQrCodes: z.coerce.number().optional(),
  recentLinks: z.array(z.unknown()).optional(),
  recent_links: z.array(z.unknown()).optional(),
});

export function mapApiOverview(value: unknown): Overview {
  const parsed = apiOverviewSchema.parse(value);
  const stats = parsed.stats ?? {
    totalLinks: parsed.totalLinks ?? 0,
    totalClicks: parsed.totalClicks ?? 0,
    totalQrCodes: parsed.totalQrCodes ?? 0,
  };

  return {
    stats,
    recentLinks: (parsed.recentLinks ?? parsed.recent_links ?? []).flatMap(
      (item) => {
        const parsedLink = overviewLinkSchema.safeParse(item);
        if (!parsedLink.success) return [];

        const originalUrl =
          parsedLink.data.originalUrl ??
          parsedLink.data.destinationUrl ??
          parsedLink.data.url ??
          parsedLink.data.shortUrl ??
          "";

        const status = linkStatusSchema.safeParse(parsedLink.data.status);

        const apiLink: ApiLink = {
          id: parsedLink.data.id,
          title: parsedLink.data.title,
          originalUrl,
          slug: parsedLink.data.slug,
          shortUrl: parsedLink.data.shortUrl,
          clickCount: parsedLink.data.clickCount ?? parsedLink.data.clicks ?? 0,
          createdAt: parsedLink.data.createdAt,
          updatedAt: parsedLink.data.updatedAt,
          status: status.success ? status.data : "active",
        };

        return [mapApiLinkToManagedLink(apiLink)];
      },
    ),
  };
}
