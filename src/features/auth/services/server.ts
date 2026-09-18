import { restApiPaths } from "@/config/api";
import { setAuthCookie } from "@/features/auth/common/session";
import {
  authTokenDataSchema,
  type AuthActionResult,
  LoginSchema,
  RegisterSchema,
  userDataSchema,
  UserData,
} from "@/features/auth/common/schemas";
import { BackendEnvelope, backendEnvelopeSchema } from "@/lib/schemas/api";
import { publicApi } from "@/lib/api";

const authTokenEnvelopeSchema = backendEnvelopeSchema(authTokenDataSchema);
const authRegisterEnvelopeSchema = backendEnvelopeSchema(userDataSchema);

function authResult(
  status: number,
  success: boolean,
  message: string,
  signedIn = false,
): AuthActionResult {
  return {
    success: success && status >= 200 && status < 300,
    message,
    signedIn,
  };
}

async function storeTokenIfPresent(data: unknown) {
  const parsed = authTokenDataSchema.safeParse(data);
  if (parsed.success) await setAuthCookie(parsed.data.token);
}

export async function loginWithPassword(
  values: LoginSchema,
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
  values: RegisterSchema,
): Promise<BackendEnvelope<UserData>> {
  const { body: rawBody } = await publicApi(restApiPaths.auth.register, {
    method: "POST",
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }),
  });

  const parsed = authRegisterEnvelopeSchema.safeParse(rawBody);
  const body = parsed.success
    ? parsed.data
    : { success: false, message: rawBody.message || "Registration failed" };

  if (!body.success) {
    return {
      success: false,
      message: body.message || "Registration failed",
      data: undefined,
    };
  }

  return {
    success: body.success,
    message: body.message || "Registration successful",
    data: body.data,
  };
}
