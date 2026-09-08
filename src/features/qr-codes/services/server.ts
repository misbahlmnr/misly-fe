import { restApiPaths } from "@/config/api";
import {
  apiQrCodeSchema,
  mapApiQrToQrCodeItem,
  type CreateQrPayload,
  type QrCodeItem,
} from "@/features/qr-codes/schema";
import { api } from "@/lib/api";

export async function getQrCodesOnServer(): Promise<QrCodeItem[]> {
  const data = await api<unknown[]>(restApiPaths.qrCodes.get, {
    method: "GET",
  });

  return (Array.isArray(data) ? data : []).flatMap((item) => {
    const parsed = apiQrCodeSchema.safeParse(item);
    if (!parsed.success) return [];
    return [mapApiQrToQrCodeItem(parsed.data)];
  });
}

export async function getQrCodeOnServer(id: string) {
  const items = await getQrCodesOnServer();
  return items.find((item) => item.id === id) ?? null;
}

export async function createQrCodeOnServer(payload: CreateQrPayload) {
  const data = await api<unknown>(restApiPaths.qrCodes.create, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return mapApiQrToQrCodeItem(apiQrCodeSchema.parse(data));
}
