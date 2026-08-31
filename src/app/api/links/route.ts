import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/common/session";
import { createLinkPayloadSchema } from "@/features/links/schema";
import {
  createShortLink,
  getLinksOnServer,
} from "@/features/links/services/server";
import { ApiError } from "@/lib/api";
import { parseJsonBody } from "@/lib/schemas/api";

function parseLinksQuery(request: Request) {
  const { searchParams } = new URL(request.url);

  return {
    page: Number.parseInt(searchParams.get("page") ?? "1", 10) || 1,
    limit: Number.parseInt(searchParams.get("limit") ?? "10", 10) || 10,
    q: searchParams.get("q") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
  };
}

export async function GET(request: Request) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const result = await getLinksOnServer(parseLinksQuery(request));

    return NextResponse.json({
      success: true,
      message: "Links fetched",
      data: result.data,
      meta: result.meta,
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

  const parsed = await parseJsonBody(request, createLinkPayloadSchema);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, message: parsed.message },
      { status: 400 },
    );
  }

  try {
    const data = await createShortLink(parsed.data);

    return NextResponse.json({
      success: true,
      message: "Link created successfully",
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
