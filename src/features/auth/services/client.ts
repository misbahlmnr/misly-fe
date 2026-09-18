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

export function loginOnClient(values: LoginSchema) {
  return postAuth("/api/auth/login", {
    email: values.email,
    password: values.password,
  });
}

export function registerOnClient(values: RegisterSchema) {
  return postAuth("/api/auth/register", {
    name: values.name,
    email: values.email,
    password: values.password,
  });
}

export async function logoutOnClient() {
  await axios.post("/api/auth/logout", undefined, {
    validateStatus: () => true,
  });
}
