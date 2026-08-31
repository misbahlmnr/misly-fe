import { restApiPaths } from "@/config/api";
import { setAuthCookie } from "@/features/auth/common/session";
import {
  authTokenDataSchema,
  type AuthActionResult,
  type LoginValues,
  type RegisterValues,
} from "@/features/auth/common/schemas";
import { backendEnvelopeSchema } from "@/lib/schemas/api";
import { publicApi } from "@/lib/api";

const authTokenEnvelopeSchema = backendEnvelopeSchema(authTokenDataSchema);

function authResult(
  status: number,
  success: boolean,
  message: string,
  signedIn = false,
): AuthActionResult {
  return {
    ok: success && status >= 200 && status < 300,
    message,
    signedIn,
  };
}

async function storeTokenIfPresent(data: unknown) {
  const parsed = authTokenDataSchema.safeParse(data);
  if (parsed.success) await setAuthCookie(parsed.data.token);
}

export async function loginWithPassword(
  values: Pick<LoginValues, "email" | "password">,
): Promise<AuthActionResult> {
  const { status, body: rawBody } = await publicApi(restApiPaths.auth.login, {
    method: "POST",
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  });

  const parsed = authTokenEnvelopeSchema.safeParse(rawBody);
  const body = parsed.success
    ? parsed.data
    : { success: false, message: rawBody.message || "Login failed" };

  if (!body.success) {
    return authResult(status, false, body.message || "Login failed");
  }

  if (!body.data?.token) {
    return authResult(status, false, "Login did not return a token");
  }

  await storeTokenIfPresent(body.data);
  return authResult(status, true, body.message || "Login successful", true);
}

export async function registerWithPassword(
  values: Pick<RegisterValues, "name" | "email" | "password">,
): Promise<AuthActionResult> {
  const { status, body: rawBody } = await publicApi(
    restApiPaths.auth.register,
    {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    },
  );

  const parsed = authTokenEnvelopeSchema.safeParse(rawBody);
  const body = parsed.success
    ? parsed.data
    : { success: false, message: rawBody.message || "Registration failed" };

  if (!body.success) {
    return authResult(status, false, body.message || "Registration failed");
  }

  const signedIn = Boolean(body.data?.token);
  if (signedIn) await storeTokenIfPresent(body.data);

  return authResult(
    status,
    true,
    body.message || "Registration successful",
    signedIn,
  );
}
