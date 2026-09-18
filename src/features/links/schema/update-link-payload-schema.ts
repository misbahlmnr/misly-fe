import { z } from "zod";

import { createLinkSchema } from "@/features/links/schema/create-link-schema";

export const updateLinkPayloadSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .min(1, "Destination URL is required")
    .url("Enter a valid URL"),
  title: z.string().trim(),
});

export type UpdateLinkPayload = z.infer<typeof updateLinkPayloadSchema>;

export function toUpdateLinkPayload(
  values: z.infer<typeof createLinkSchema>,
): UpdateLinkPayload {
  const parsed = createLinkSchema.parse(values);

  return updateLinkPayloadSchema.parse({
    destinationUrl: parsed.destinationUrl.trim(),
    title: parsed.title.trim(),
  });
}
