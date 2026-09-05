import { getAuthToken } from "@/features/auth/common/session";
import { updateLinkStatus } from "@/features/links/services/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getAuthToken();
  const { id } = await params;
  const { status } = await request.json();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    await updateLinkStatus(id, status);

    return NextResponse.json({
      success: true,
      message: "Link status updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update link status" },
      { status: 500 },
    );
  }
}
