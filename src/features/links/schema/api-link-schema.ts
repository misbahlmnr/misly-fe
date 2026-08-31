import { z } from "zod";

import { linkStatusSchema } from "@/features/links/schema/link-status-schema";

export const apiLinkSchema = z.object({
  id: z.string(),
  title: z.string(),
  originalUrl: z.string(),
  slug: z.string(),
  shortUrl: z.string().optional(),
  clickCount: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  status: linkStatusSchema.optional(),
});

export type ApiLink = z.infer<typeof apiLinkSchema>;
