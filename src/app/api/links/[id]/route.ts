import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/common/session";
import { updateLinkPayloadSchema } from "@/features/links/schema";
import { deleteLink, updateLink } from "@/features/links/services/server";
import { ApiError } from "@/lib/api";
import { parseJsonBody } from "@/lib/schemas/api";

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

  const parsed = await parseJsonBody(request, updateLinkPayloadSchema);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, message: parsed.message },
      { status: 400 },
    );
  }

  try {
    const data = await updateLink(id, parsed.data);

    return NextResponse.json({
      success: true,
      message: "Link updated successfully",
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
    await deleteLink(id);

    return NextResponse.json(
      { success: true, message: "Link deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete link" },
      { status: 500 },
    );
  }
}
