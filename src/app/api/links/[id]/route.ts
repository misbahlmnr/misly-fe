import { getAuthToken } from "@/features/auth/common/session";
import { deleteLink } from "@/features/links/services/server";
import { NextResponse } from "next/server";

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
