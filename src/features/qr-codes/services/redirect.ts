import { restApiPaths } from "@/config/api";
import { publicApi } from "@/lib/api";
import { z } from "zod";

type ResolveRedirectContext = {
  host?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  referer?: string | null;
  prefetch?: boolean;
};

const resolveQrSchema = z.object({ destinationUrl: z.string() });

export async function resolveQrRedirect(
  id: string,
  context: ResolveRedirectContext = {},
): Promise<string | null> {
  const query = new URLSearchParams();

  const host = context.host;

  if (host) query.set("host", host);

  const queryString = query.toString();

  const path = `${restApiPaths.qrCodes.resolve(id)}${queryString ? `?${queryString}` : ""}`;

  const headers: Record<string, string> = {};
  const ip = context.ip;
  const userAgent = context.userAgent;
  const referer = context.referer;

  if (ip) headers["x-forwarded-for"] = ip;
  if (host) headers["x-forwarded-host"] = host;
  if (userAgent) headers["user-agent"] = userAgent;
  if (referer) headers["referer"] = referer;
  if (context.prefetch) headers["purpose"] = "prefetch";

  const { status, body } = await publicApi<unknown>(path, {
    method: "GET",
    headers,
  });

  if (status === 404 || !body.success) {
    return null;
  }

  const parsed = resolveQrSchema.safeParse(body.data);
  if (!parsed.success) {
    return null;
  }

  return parsed.data.destinationUrl;
}
