import { z } from "zod";

import { createLinkSchema } from "@/features/links/schema/create-link-schema";

export const createLinkPayloadSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .min(1, "Destination URL is required")
    .url("Enter a valid URL"),
  title: z.string().trim(),
  customSlug: z.string().trim().optional(),
  domainId: z.string().trim().optional(),
});

export type CreateLinkPayload = z.infer<typeof createLinkPayloadSchema>;

export function toCreateLinkPayload(
  values: z.infer<typeof createLinkSchema>,
): CreateLinkPayload {
  const parsed = createLinkSchema.parse(values);
  const customSlug = parsed.customSlug.trim();

  return createLinkPayloadSchema.parse({
    destinationUrl: parsed.destinationUrl.trim(),
    title: parsed.title.trim(),
    ...(customSlug ? { customSlug } : {}),
  });
}
