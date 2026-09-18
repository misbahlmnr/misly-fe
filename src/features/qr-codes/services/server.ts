import { restApiPaths } from "@/config/api";
import {
  apiQrCodeSchema,
  mapApiQrToQrCodeItem,
  type CreateQrPayload,
  type QrCodeItem,
} from "@/features/qr-codes/schema";
import { ApiError, api } from "@/lib/api";

export async function getQrCodesOnServer(): Promise<QrCodeItem[]> {
  const data = await api<unknown[]>(restApiPaths.qrCodes.get, {
    method: "GET",
  });

  return data.flatMap((item) => {
    const parsed = apiQrCodeSchema.safeParse(item);
    if (!parsed.success) return [];
    return [mapApiQrToQrCodeItem(parsed.data)];
  });
}

export async function getQrCodeByIdOnServer(id: string) {
  const data = await api<QrCodeItem>(restApiPaths.qrCodes.getById(id), {
    method: "GET",
  });

  const parsed = apiQrCodeSchema.safeParse(data);

  if (!parsed.success) throw new ApiError("Invalid QR code data", 400);

  return mapApiQrToQrCodeItem(parsed.data);
}

export async function createQrCodeOnServer(payload: CreateQrPayload) {
  const data = await api<unknown>(restApiPaths.qrCodes.create, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return mapApiQrToQrCodeItem(apiQrCodeSchema.parse(data));
}

export async function updateQrCodeOnServer(
  id: string,
  payload: CreateQrPayload,
) {
  const data = await api<unknown>(restApiPaths.qrCodes.update(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return mapApiQrToQrCodeItem(apiQrCodeSchema.parse(data));
}

export async function deleteQrCodeOnServer(id: string) {
  return api<unknown>(restApiPaths.qrCodes.delete(id), {
    method: "DELETE",
  });
}
