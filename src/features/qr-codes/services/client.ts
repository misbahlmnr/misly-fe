import axios from "axios";

import { restApiPaths } from "@/config/api";
import { mapApiQrScanAnalytics } from "@/features/qr-codes/analytics-schema";
import {
  toCreateQrPayload,
  type CreateQrValues,
  type QrCodeItem,
} from "@/features/qr-codes/schema";
import type { QrScanAnalytics } from "@/features/qr-codes/types";
import type { TimeRange } from "@/lib/time-series";

export const qrCodesQueryKey = ["qr-codes"] as const;

export const qrAnalyticsQueryKey = (qrCodeId: string, range: TimeRange) =>
  ["qr-analytics", qrCodeId, range] as const;

type QrCodesApiResponse = {
  success: boolean;
  message?: string;
  data?: QrCodeItem[];
};

type CreateQrApiResponse = {
  success: boolean;
  message?: string;
  data?: QrCodeItem;
};

export async function getQrCodesOnClient(): Promise<QrCodeItem[]> {
  const response = await axios.get<QrCodesApiResponse>(
    restApiPaths.qrCodes.get,
    {
      validateStatus: () => true,
    },
  );

  const body = response.data;

  if (response.status < 200 || response.status >= 300 || !body?.success) {
    throw new Error(body?.message ?? "Failed to get QR codes");
  }

  return body.data ?? [];
}

export async function createQrCodeOnClient(
  values: CreateQrValues,
  selectedDestinationUrl?: string,
) {
  const payload = toCreateQrPayload(values, selectedDestinationUrl);

  const response = await axios.post<CreateQrApiResponse>(
    restApiPaths.qrCodes.create,
    payload,
    { validateStatus: () => true },
  );

  return response.data;
}

export async function getQrCodeByIdOnClient(id: string) {
  const res = await axios.get<QrCodeItem>(restApiPaths.qrCodes.getById(id), {
    validateStatus: () => true,
  });

  return res.data;
}

export async function updateQrCodeOnClient(
  id: string,
  values: CreateQrValues,
  selectedDestinationUrl?: string,
) {
  const payload = toCreateQrPayload(values, selectedDestinationUrl);

  const response = await axios.put<CreateQrApiResponse>(
    restApiPaths.qrCodes.update(id),
    payload,
    { validateStatus: () => true },
  );

  return response.data;
}

export async function deleteQrCodeOnClient(id: string) {
  const response = await axios.delete<unknown>(
    restApiPaths.qrCodes.delete(id),
    {
      validateStatus: () => true,
    },
  );

  return response.data;
}

type QrAnalyticsApiResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

export async function getQrAnalyticsOnClient(
  qrCodeId: string,
  range: TimeRange,
): Promise<QrScanAnalytics> {
  const response = await axios.get<QrAnalyticsApiResponse>(
    `${restApiPaths.qrCodes.stats(qrCodeId)}?range=${range}`,
    { validateStatus: () => true },
  );

  const body = response.data;

  if (response.status < 200 || response.status >= 300 || !body?.success) {
    throw new Error(body?.message ?? "Failed to get QR analytics");
  }

  return mapApiQrScanAnalytics(body.data ?? {}, range);
}
