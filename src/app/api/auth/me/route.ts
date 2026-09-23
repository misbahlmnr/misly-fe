import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/common/session";
import { getCurrentUserOnServer } from "@/features/auth/services/server";
import { ApiError } from "@/lib/api";

export async function GET() {
  const token = await getAuthToken();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const data = await getCurrentUserOnServer();

    return NextResponse.json({
      success: true,
      message: "Profile fetched successfully",
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
