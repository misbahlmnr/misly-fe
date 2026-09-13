import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getLinkAnalyticsOnClient,
  linkAnalyticsQueryKey,
} from "@/features/analytics/services/client";
import type { TimeRange } from "@/lib/time-series";

export function useGetLinkAnalytics(linkId: string, range: TimeRange) {
  return useQuery({
    queryKey: linkAnalyticsQueryKey(linkId, range),
    queryFn: () => getLinkAnalyticsOnClient(linkId, range),
    enabled: Boolean(linkId),
    placeholderData: keepPreviousData,
  });
}
