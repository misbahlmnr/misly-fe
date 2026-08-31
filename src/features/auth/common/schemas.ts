import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = registerRequestSchema
  .extend({
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const authTokenDataSchema = z.object({
  token: z.string(),
});

export const authActionResultSchema = z.object({
  ok: z.boolean(),
  message: z.string(),
  signedIn: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type AuthTokenData = z.infer<typeof authTokenDataSchema>;
export type AuthActionResult = z.infer<typeof authActionResultSchema>;
