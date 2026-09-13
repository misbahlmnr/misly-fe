import axios from "axios";

import { restApiPaths } from "@/config/api";
import { mapApiLinkAnalytics } from "@/features/analytics/schema";
import type { LinkAnalytics } from "@/features/analytics/types";
import type { TimeRange } from "@/lib/time-series";

export const linkAnalyticsQueryKey = (linkId: string, range: TimeRange) =>
  ["link-analytics", linkId, range] as const;

type LinkAnalyticsApiResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

export async function getLinkAnalyticsOnClient(
  linkId: string,
  range: TimeRange,
): Promise<LinkAnalytics> {
  const response = await axios.get<LinkAnalyticsApiResponse>(
    `${restApiPaths.analytics.stats(linkId)}?range=${range}`,
    { validateStatus: () => true },
  );

  const body = response.data;

  if (response.status < 200 || response.status >= 300 || !body?.success) {
    throw new Error(body?.message ?? "Failed to get link analytics");
  }

  return mapApiLinkAnalytics(body.data ?? {}, range);
}
