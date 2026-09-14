import { z } from "zod";

export const resolveLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .min(1)
    .refine((url) => /^https?:\/\/.+/i.test(url), "Invalid destination URL"),
});

export type ResolveLink = z.infer<typeof resolveLinkSchema>;
