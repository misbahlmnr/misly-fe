import { NextResponse } from "next/server";

import { registerWithPassword } from "@/features/auth/services/server";
import { registerSchema } from "@/features/auth/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.message },
        { status: 400 },
      );
    }

    const result = await registerWithPassword(parsed.data);

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
        signedIn: result.signedIn,
      },
      { status: result.success ? 200 : 400 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 },
    );
  }
}
