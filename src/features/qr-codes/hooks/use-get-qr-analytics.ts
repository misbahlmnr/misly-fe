import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getQrAnalyticsOnClient,
  qrAnalyticsQueryKey,
} from "@/features/qr-codes/services/client";
import type { TimeRange } from "@/lib/time-series";

export function useGetQrAnalytics(qrCodeId: string, range: TimeRange) {
  return useQuery({
    queryKey: qrAnalyticsQueryKey(qrCodeId, range),
    queryFn: () => getQrAnalyticsOnClient(qrCodeId, range),
    enabled: Boolean(qrCodeId),
    placeholderData: keepPreviousData,
  });
}
