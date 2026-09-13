import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/common/session";
import { restApiPaths } from "@/config/api";
import { api, ApiError } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ linkId: string }> },
) {
  const token = await getAuthToken();
  const { linkId } = await params;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const range = new URL(request.url).searchParams.get("range") ?? "30d";

  try {
    const data = await api<unknown>(
      `${restApiPaths.analytics.stats(linkId)}?range=${encodeURIComponent(range)}`,
      { method: "GET" },
    );

    return NextResponse.json({
      success: true,
      message: "Statistics fetched successfully",
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
