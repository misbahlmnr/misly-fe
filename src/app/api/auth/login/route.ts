import { NextResponse } from "next/server";

import { loginSchema } from "@/features/auth/common/schemas";
import { loginWithPassword } from "@/features/auth/services/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.message },
        { status: 400 },
      );
    }

    const result = await loginWithPassword(parsed.data);

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
        signedIn: result.signedIn,
      },
      { status: result.success ? 200 : 401 },
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
