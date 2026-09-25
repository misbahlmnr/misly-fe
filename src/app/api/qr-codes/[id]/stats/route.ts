import { NextResponse } from "next/server";

import { restApiPaths } from "@/config/api";
import { getAuthToken } from "@/features/auth/common/session";
import { api, ApiError } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getAuthToken();
  const { id } = await params;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const range = new URL(request.url).searchParams.get("range") ?? "30d";

  try {
    const data = await api<unknown>(
      `${restApiPaths.qrCodes.stats(id)}?range=${encodeURIComponent(range)}`,
      { method: "GET" },
    );

    return NextResponse.json({
      success: true,
      message: "QR scan statistics fetched successfully",
      data,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status },
      );
    }

    throw error;
  }
}
