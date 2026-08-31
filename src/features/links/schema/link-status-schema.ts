import { z } from "zod";

export const linkStatusSchema = z.enum(["active", "hidden"]);

export type LinkStatus = z.infer<typeof linkStatusSchema>;
