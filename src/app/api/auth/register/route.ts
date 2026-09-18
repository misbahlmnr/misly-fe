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

    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 },
    );
  }
}
