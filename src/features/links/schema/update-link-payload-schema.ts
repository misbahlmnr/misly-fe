import { z } from "zod";

import { createLinkSchema } from "@/features/links/schema/create-link-schema";

export const updateLinkPayloadSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .min(1, "Original URL is required")
    .url("Enter a valid URL"),
  title: z.string().trim(),
});

export type UpdateLinkPayload = z.infer<typeof updateLinkPayloadSchema>;

export function toUpdateLinkPayload(
  values: z.infer<typeof createLinkSchema>,
): UpdateLinkPayload {
  const parsed = createLinkSchema.parse(values);

  return updateLinkPayloadSchema.parse({
    originalUrl: parsed.destinationUrl.trim(),
    title: parsed.title.trim(),
  });
}
