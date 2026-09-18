import { getAuthToken } from "@/features/auth/common/session";
import { createQrPayloadSchema } from "@/features/qr-codes/schema";
import {
  deleteQrCodeOnServer,
  getQrCodeByIdOnServer,
  updateQrCodeOnServer,
} from "@/features/qr-codes/services/server";
import { ApiError } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getAuthToken();
  const { id } = await params;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const data = await getQrCodeByIdOnServer(id);

    return NextResponse.json({
      success: true,
      message: "QR code fetched successfully",
      data,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, message: error.message },
        {
          status: error.status,
        },
      );
    }

    throw error;
  }
}

export async function PUT(
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

  try {
    const body = createQrPayloadSchema.parse(await request.json());

    const data = await updateQrCodeOnServer(id, body);

    return NextResponse.json({
      success: true,
      message: "QR code updated successfully",
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

export async function DELETE(
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

  try {
    const data = await deleteQrCodeOnServer(id);

    return NextResponse.json({
      success: true,
      message: "QR code deleted successfully",
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
