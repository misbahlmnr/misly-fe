import axios from "axios";

import {
  LoginSchema,
  RegisterSchema,
  authActionResultSchema,
} from "@/features/auth/common/schemas";

async function postAuth(path: string, body: Record<string, string>) {
  const res = await axios.post(path, body, {
    validateStatus: () => true,
  });

  const parsed = authActionResultSchema.safeParse(res.data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Request failed",
      signedIn: false,
    };
  }

  return parsed.data;
}

export function loginOnClient(payload: LoginSchema) {
  return postAuth("/api/auth/login", {
    email: payload.email,
    password: payload.password,
  });
}

export function registerOnClient(payload: RegisterSchema) {
  return postAuth("/api/auth/register", {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    confirmPassword: payload.confirmPassword,
  });
}

export async function logoutOnClient() {
  await axios.post("/api/auth/logout", undefined, {
    validateStatus: () => true,
  });
}
