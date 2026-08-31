import { NextResponse } from "next/server";

import { clearAuthCookie } from "@/features/auth/common/session";

export async function POST() {
  await clearAuthCookie();
  return NextResponse.json({ success: true, message: "Logged out" });
}
