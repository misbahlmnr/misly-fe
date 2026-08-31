"use client"

import { User } from "lucide-react"
import { useRef } from "react"
import { useForm } from "react-hook-form"

import { FieldError } from "@/components/shared/field-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { currentUser } from "@/config/user"
import type { ProfileValues } from "@/features/settings/types"

export function ProfileInformation() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  })

  function onSubmit() {}

  return (
    <section className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary-container ink-border shadow-hard-pressed">
          <User className="size-5 text-on-primary" strokeWidth={2.25} />
        </div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Profile Information
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-[160px] w-[130px] shrink-0">
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-primary-container ink-border" />
              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-tertiary-fixed font-headline text-5xl font-black text-on-tertiary-fixed ink-border shadow-hard">
                {currentUser.name.slice(0, 1)}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="Change photo"
            />
            <Button
              variant="brand"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="font-label text-sm font-bold text-on-surface">
                Full Name
              </span>
              <Input
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              <FieldError message={errors.name?.message} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-label text-sm font-bold text-on-surface">
                Email Address
              </span>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              <FieldError message={errors.email?.message} />
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t-2 border-outline-variant/30 pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  )
}
