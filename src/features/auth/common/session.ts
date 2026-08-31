import { cookies } from "next/headers"

import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/config/auth"

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
}

export async function getAuthToken() {
  const jar = await cookies()
  return jar.get(AUTH_COOKIE_NAME)?.value ?? null
}

export async function setAuthCookie(token: string) {
  const jar = await cookies()
  jar.set(AUTH_COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: AUTH_COOKIE_MAX_AGE,
  })
}

export async function clearAuthCookie() {
  const jar = await cookies()
  jar.set(AUTH_COOKIE_NAME, "", {
    ...cookieOptions,
    maxAge: 0,
  })
}
