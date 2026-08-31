import { NextResponse } from "next/server";

import { loginSchema } from "@/features/auth/common/schemas";
import { loginWithPassword } from "@/features/auth/services/server";
import { parseJsonBody } from "@/lib/schemas/api";

export async function POST(request: Request) {
  try {
    const parsed = await parseJsonBody(request, loginSchema);
    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, message: parsed.message },
        { status: 400 },
      );
    }

    const result = await loginWithPassword(parsed.data);

    return NextResponse.json(
      {
        success: result.ok,
        message: result.message,
        signedIn: result.signedIn,
      },
      { status: result.ok ? 200 : 401 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 },
    );
  }
}
