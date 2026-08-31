import { z } from "zod";

export const createLinkSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .min(1, "Destination URL is required")
    .url("Enter a valid URL")
    .refine((url) => /^https?:\/\/.+/i.test(url), "Enter a valid URL"),
  domain: z.string().min(1),
  customSlug: z.string(),
  title: z.string(),
});

export type CreateLinkValues = z.infer<typeof createLinkSchema>;
