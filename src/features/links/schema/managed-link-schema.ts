import { z } from "zod";

import type { ApiLink } from "@/features/links/schema/api-link-schema";
import { linkStatusSchema } from "@/features/links/schema/link-status-schema";
import { formatDate } from "@/lib/formatter";

export const managedLinkSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  destinationUrl: z.string(),
  clickCount: z.number(),
  createdAt: z.string(),
  createdLabel: z.string(),
  createdShort: z.string(),
  status: linkStatusSchema,
});

export const managedLinksSchema = z.array(managedLinkSchema);

export type ManagedLink = z.infer<typeof managedLinkSchema>;

export function mapApiLinkToManagedLink(link: ApiLink): ManagedLink {
  const createdLabel = formatDate(link.createdAt);
  const createdShort = new Date(link.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return {
    id: link.id,
    title: link.title,
    slug: link.slug,
    destinationUrl: link.originalUrl,
    clickCount: link.clickCount ?? 0,
    createdAt: link.createdAt,
    createdLabel,
    createdShort,
    status: link.status ?? "active",
  };
}
