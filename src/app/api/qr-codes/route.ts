import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/common/session";
import { createQrPayloadSchema } from "@/features/qr-codes/schema";
import {
  createQrCodeOnServer,
  getQrCodesOnServer,
} from "@/features/qr-codes/services/server";
import { ApiError } from "@/lib/api";
import { parseJsonBody } from "@/lib/schemas/api";

export async function GET() {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const data = await getQrCodesOnServer();

    return NextResponse.json({
      success: true,
      message: "QR codes fetched successfully",
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

export async function POST(request: Request) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const parsed = await parseJsonBody(request, createQrPayloadSchema);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, message: parsed.message },
      { status: 400 },
    );
  }

  try {
    const data = await createQrCodeOnServer(parsed.data);

    return NextResponse.json({
      success: true,
      message: "QR code created successfully",
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
