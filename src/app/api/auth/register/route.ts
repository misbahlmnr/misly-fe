import { NextResponse } from "next/server";

import { registerRequestSchema } from "@/features/auth/common/schemas";
import { registerWithPassword } from "@/features/auth/services/server";
import { parseJsonBody } from "@/lib/schemas/api";

export async function POST(request: Request) {
  try {
    const parsed = await parseJsonBody(request, registerRequestSchema);
    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, message: parsed.message },
        { status: 400 },
      );
    }

    const result = await registerWithPassword(parsed.data);

    return NextResponse.json(
      {
        success: result.ok,
        message: result.message,
        signedIn: result.signedIn,
      },
      { status: result.ok ? 200 : 400 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 },
    );
  }
}
