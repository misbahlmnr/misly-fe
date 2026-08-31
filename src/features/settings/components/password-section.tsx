"use client";

import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";

import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PasswordValues } from "@/features/settings/types";

export function PasswordSection() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit() {}

  return (
    <section className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary-container ink-border shadow-hard-pressed">
          <Lock className="size-5 text-on-primary" strokeWidth={2.25} />
        </div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Security
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="font-label text-sm font-bold text-on-surface">
              Current Password
            </span>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            <FieldError message={errors.currentPassword?.message} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-label text-sm font-bold text-on-surface">
              New Password
            </span>
            <Input
              type="password"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
            <FieldError message={errors.newPassword?.message} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-label text-sm font-bold text-on-surface">
              Confirm New Password
            </span>
            <Input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Confirm your new password",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              })}
            />
            <FieldError message={errors.confirmPassword?.message} />
          </label>
        </div>

        <div className="mt-6 flex justify-start border-t-2 border-outline-variant/30 pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            Update Password
          </Button>
        </div>
      </form>
    </section>
  );
}
