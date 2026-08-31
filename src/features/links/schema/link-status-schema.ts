import { z } from "zod";

export const linkStatusSchema = z.enum(["active", "hidden"]);

export const apiLinkStatusSchema = z
  .string()
  .toLowerCase()
  .pipe(linkStatusSchema);

export type LinkStatus = z.infer<typeof linkStatusSchema>;
