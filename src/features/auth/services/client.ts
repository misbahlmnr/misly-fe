import axios from "axios";

import { restApiPaths } from "@/config/api";
import {
  LoginSchema,
  RegisterSchema,
  authActionResultSchema,
  userDataSchema,
  type UserData,
} from "@/features/auth/common/schemas";

export const currentUserQueryKey = ["current-user"] as const;

type CurrentUserApiResponse = {
  success: boolean;
  message?: string;
  data?: UserData;
};

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

export async function getCurrentUserOnClient(): Promise<UserData> {
  const response = await axios.get<CurrentUserApiResponse>(
    restApiPaths.auth.me,
    {
      validateStatus: () => true,
    },
  );

  const body = response.data;

  if (response.status < 200 || response.status >= 300 || !body?.success) {
    throw new Error(body?.message ?? "Failed to get current user");
  }

  const parsed = userDataSchema.safeParse(body.data);
  if (!parsed.success) {
    throw new Error("Invalid user data");
  }

  return parsed.data;
}
