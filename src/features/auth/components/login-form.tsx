"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/config/routes";
import { loginOnClient } from "@/features/auth/services/client";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { PasswordField } from "@/features/auth/components/password-field";
import { loginSchema, type LoginValues } from "@/features/auth/common/schemas";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    const result = await loginOnClient(values);

    if (!result.ok) {
      setError("root", { message: result.message });
      return;
    }

    router.push(routes.dashboard);
    router.refresh();
  }

  return (
    <div className="w-full rounded-2xl bg-surface-container-low p-6 ink-border btn-hard-shadow md:p-8">
      <GoogleAuthButton label="Continue with Google" />

      <div className="relative mb-6 flex items-center">
        <div className="grow border-t-2 border-on-surface/10" />
        <span className="mx-4 shrink-0 text-sm font-bold text-on-surface-variant">
          or continue with email
        </span>
        <div className="grow border-t-2 border-on-surface/10" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-left text-sm font-bold text-on-surface"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            tabIndex={1}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-left text-sm font-bold text-on-surface"
            >
              Password
            </label>
            <a
              href="#"
              tabIndex={4}
              className="text-sm font-bold text-primary transition-colors hover:text-primary-container"
            >
              Forgot password?
            </a>
          </div>
          <PasswordField
            id="password"
            autoComplete="current-password"
            error={errors.password?.message}
            tabIndex={2}
            {...register("password")}
          />
        </div>

        <FieldError message={errors.root?.message} />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          tabIndex={3}
          className="mt-8 w-full text-lg font-headline"
        >
          {isSubmitting ? (
            <Loader2 className="size-5 animate-spin" strokeWidth={2.5} />
          ) : (
            <>
              Log In
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
