import axios from "axios";

import {
  authActionResultSchema,
  type LoginValues,
  type RegisterValues,
} from "@/features/auth/common/schemas";

async function postAuth(path: string, body: Record<string, string>) {
  const response = await axios.post(path, body, {
    validateStatus: () => true,
  });

  console.log(response);

  const parsed = authActionResultSchema.safeParse(response.data);
  const json = parsed.success
    ? parsed.data
    : {
        ok: response.status >= 200 && response.status < 300,
        message: "Request failed",
      };

  const ok = response.status >= 200 && response.status < 300;

  return {
    ok: ok && json.ok !== false,
    message: json.message || (ok ? "Success" : "Request failed"),
    signedIn: Boolean(json.signedIn),
  };
}

export function loginOnClient(values: Pick<LoginValues, "email" | "password">) {
  return postAuth("/api/auth/login", {
    email: values.email,
    password: values.password,
  });
}

export function registerOnClient(
  values: Pick<RegisterValues, "name" | "email" | "password">,
) {
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
