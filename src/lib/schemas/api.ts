import { z } from "zod";
import { paginationMetaSchema, type PaginationMeta } from "./pagination";

export const backendErrorSchema = z.object({
  code: z.string().optional(),
});

export function backendEnvelopeSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
    error: backendErrorSchema.optional(),
    meta: paginationMetaSchema.optional(),
  });
}

export const unknownEnvelopeSchema = backendEnvelopeSchema(z.unknown());

export type BackendEnvelope<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code?: string;
  };
  meta?: PaginationMeta;
};

export async function parseJsonBody<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<{ ok: true; data: T } | { ok: false; message: string }> {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return { ok: false, message: "Invalid request body" };
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Invalid request body";
    return { ok: false, message };
  }

  return { ok: true, data: result.data };
}

export function parseEnvelope<T>(
  data: unknown,
  fallbackMessage: string,
  dataSchema?: z.ZodType<T>,
): BackendEnvelope<T> {
  const schema = dataSchema
    ? backendEnvelopeSchema(dataSchema)
    : unknownEnvelopeSchema;

  const result = schema.safeParse(data);
  if (result.success) {
    return result.data as BackendEnvelope<T>;
  }

  return {
    success: false,
    message: fallbackMessage,
  };
}
