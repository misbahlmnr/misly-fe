import { z } from "zod";

export const createdLinkSchema = z.object({
  id: z.string().optional(),
  originalUrl: z.string().optional(),
  title: z.string().optional(),
  customSlug: z.string().optional(),
  slug: z.string().optional(),
});

export type CreatedLink = z.infer<typeof createdLinkSchema>;
