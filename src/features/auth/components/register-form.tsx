"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/config/routes";
import { registerOnClient } from "@/features/auth/services/client";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { PasswordField } from "@/features/auth/components/password-field";
import {
  registerSchema,
  type RegisterValues,
} from "@/features/auth/common/schemas";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    const result = await registerOnClient({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (!result.ok) {
      setError("root", { message: result.message });
      return;
    }

    router.push(result.signedIn ? routes.dashboard : routes.login);
    router.refresh();
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
            htmlFor="name"
            className="block text-left text-sm font-bold text-on-surface"
          >
            Name
          </label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

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
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <PasswordField
          id="password"
          label="Password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordField
          id="confirm-password"
          label="Confirm password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <FieldError message={errors.root?.message} />

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="mt-8 w-full text-lg font-headline"
        >
          Create account
          <ArrowRight className="size-5" strokeWidth={2.5} />
        </Button>
      </form>
    </div>
  );
}
