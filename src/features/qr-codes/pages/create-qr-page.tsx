"use client"

import { ArrowLeft, Link2, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"

import { FieldError } from "@/components/shared/field-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { routes } from "@/config/routes"
import { QrPattern } from "@/features/qr-codes/components/qr-pattern"
import { getQrLinkOption, qrLinkOptions } from "@/features/qr-codes/constants"
import type {
  CreateQrValues,
  QrCodeItem,
  QrEditorTab,
  QrStyle,
} from "@/features/qr-codes/types"
import { cn } from "@/lib/utils"

const tabs: { id: QrEditorTab; label: string }[] = [
  { id: "content", label: "Content" },
  { id: "appearance", label: "Appearance" },
  { id: "branding", label: "Branding" },
]

const linkItems = [
  { label: "Select a link...", value: null as string | null },
  ...qrLinkOptions.map((option) => ({
    label: `${option.shortUrl} - ${option.title}`,
    value: option.value,
  })),
]

const formatItems = [
  { label: "PNG", value: "png" },
  { label: "SVG", value: "svg" },
  { label: "PDF", value: "pdf" },
] as const

function valuesFromQr(item?: QrCodeItem): CreateQrValues {
  if (!item) {
    return {
      title: "",
      source: "existing",
      linkId: "",
      destinationUrl: "",
      style: "default",
      logo: "m",
      format: "png",
    }
  }

  return {
    title: item.title,
    source: "existing",
    linkId: item.linkSlug ?? item.id,
    destinationUrl: item.destinationUrl,
    style: item.style,
    logo: item.logo ?? "m",
    format: "png",
  }
}

export function CreateQrPage({
  mode,
  initial,
  initialTab = "content",
}: {
  mode: "create" | "edit"
  initial?: QrCodeItem
  initialTab?: QrEditorTab
}) {
  const router = useRouter()
  const [tab, setTab] = useState<QrEditorTab>(initialTab)
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateQrValues>({
    defaultValues: valuesFromQr(initial),
  })

  const source = useWatch({ control, name: "source" }) ?? "existing"
  const linkId = useWatch({ control, name: "linkId" }) ?? ""
  const destinationUrl = useWatch({ control, name: "destinationUrl" }) ?? ""
  const style = useWatch({ control, name: "style" }) ?? "default"
  const logo = useWatch({ control, name: "logo" }) ?? "m"
  const format = useWatch({ control, name: "format" }) ?? "png"
  const title = useWatch({ control, name: "title" }) ?? ""

  register("linkId", {
    required: source === "existing" ? "Select a short link" : false,
  })

  const selectedLink = getQrLinkOption(linkId)
  const previewUrl =
    source === "existing"
      ? selectedLink?.shortUrl
      : destinationUrl || "misly.link/your-link"

  function onSubmit() {
    router.push(routes.dashboardQrCodes)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <Link
          href={routes.dashboardQrCodes}
          className="mb-4 inline-flex items-center gap-2 font-label text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" strokeWidth={2.25} />
          Back to QR Codes
        </Link>
        <h1 className="mb-2 font-headline text-headline-md font-black text-on-surface">
          {mode === "edit" ? "Customize QR Code" : "Create QR Code"}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant">
          {mode === "edit"
            ? "Update the look and destination of this QR code."
            : "Create and customize a QR code for your shortened link."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-surface-container-lowest p-8 ink-border shadow-[6px_6px_0_0_var(--ink)] md:p-10"
      >
        <div className="mb-8 flex rounded-lg bg-surface-container-lowest p-1 ink-border">
          {tabs.map((item) => {
            const active = tab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 font-label text-sm font-bold transition-[transform,box-shadow,background-color,border-color]",
                  active
                    ? "bg-primary-container text-on-primary-container ink-border shadow-hard-pressed"
                    : "border-2 border-transparent text-on-surface hover:border-on-surface hover:shadow-hard-pressed"
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            {tab === "content" && (
              <div className="space-y-8">
                <label className="block space-y-2">
                  <span className="block font-label text-sm font-bold text-on-surface">
                    QR Code Title <span className="text-error">*</span>
                  </span>
                  <Input
                    type="text"
                    placeholder="e.g., Summer Campaign 2024"
                    aria-invalid={errors.title ? true : undefined}
                    {...register("title", { required: "Title is required" })}
                  />
                  <p className="font-body text-xs text-on-surface-variant">
                    Internal name to help you identify this QR code.
                  </p>
                  <FieldError message={errors.title?.message} />
                </label>

                <div className="space-y-4">
                  <p className="font-label text-sm font-bold text-on-surface">
                    Link Destination
                  </p>
                  <Segmented
                    options={[
                      { id: "existing", label: "Existing Short Link" },
                      { id: "new", label: "New URL" },
                    ]}
                    value={source}
                    onChange={(next) => setValue("source", next)}
                  />
                </div>

                {source === "existing" ? (
                  <label className="block space-y-2">
                    <span className="block font-label text-sm font-bold text-on-surface">
                      Select Short Link <span className="text-error">*</span>
                    </span>
                    <Select
                      items={linkItems}
                      value={linkId || null}
                      onValueChange={(value) => {
                        setValue("linkId", value ?? "", { shouldValidate: true })
                      }}
                    >
                      <SelectTrigger
                        aria-label="Select short link"
                        aria-invalid={errors.linkId ? true : undefined}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {linkItems.map((item) =>
                            item.value ? (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ) : null
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldError message={errors.linkId?.message} />
                  </label>
                ) : (
                  <label className="block space-y-2">
                    <span className="block font-label text-sm font-bold text-on-surface">
                      Destination URL <span className="text-error">*</span>
                    </span>
                    <Input
                      type="url"
                      placeholder="https://example.com/your-long-url"
                      {...register("destinationUrl", {
                        required:
                          source === "new"
                            ? "Destination URL is required"
                            : false,
                        pattern: {
                          value: /^https?:\/\/.+/i,
                          message: "Enter a valid URL",
                        },
                      })}
                    />
                    <FieldError message={errors.destinationUrl?.message} />
                  </label>
                )}
              </div>
            )}

            {tab === "appearance" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="font-label text-sm font-bold text-on-surface">
                    Style
                  </p>
                  <Segmented
                    options={[
                      { id: "default", label: "Classic" },
                      { id: "brand", label: "Brand" },
                      { id: "circular", label: "Circular" },
                    ]}
                    value={style}
                    onChange={(next) => setValue("style", next as QrStyle)}
                  />
                  <p className="font-body text-xs text-on-surface-variant">
                    Classic uses ink modules. Brand uses purple. Circular rounds
                    the frame and dots.
                  </p>
                </div>
              </div>
            )}

            {tab === "branding" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="font-label text-sm font-bold text-on-surface">
                    Center mark
                  </p>
                  <Segmented
                    options={[
                      { id: "none", label: "None" },
                      { id: "m", label: "Misly" },
                      { id: "work", label: "Work" },
                    ]}
                    value={logo}
                    onChange={(next) =>
                      setValue("logo", next as CreateQrValues["logo"])
                    }
                  />
                  <p className="font-body text-xs text-on-surface-variant">
                    Optional logo in the middle of the QR code.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col items-center rounded-lg bg-surface-container-lowest p-6 ink-border">
              <div className="mb-6 flex w-full items-center justify-between">
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  Live Preview
                </h2>
                <span className="relative flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-secondary" />
                </span>
              </div>

              <div className="mb-6 flex aspect-square w-full max-w-[280px] items-center justify-center rounded-lg bg-surface-container-lowest p-6 ink-border">
                <QrPattern
                  seed={title || previewUrl || "misly"}
                  style={style}
                  logo={logo === "none" ? undefined : logo}
                  className="size-full max-w-[220px]"
                />
              </div>

              <div className="mb-4 text-center">
                <p className="mb-1 font-label text-sm font-bold text-on-surface-variant">
                  Destination URL
                </p>
                <div className="inline-flex items-center gap-2 rounded-md bg-surface-container-lowest px-4 py-2 ink-border shadow-hard-pressed">
                  <Link2 className="size-4 text-primary" strokeWidth={2.25} />
                  <span className="font-label font-bold text-primary">
                    {previewUrl}
                  </span>
                </div>
              </div>

              <div className="w-full border-t-2 border-dashed border-on-surface pt-6">
                <p className="mb-3 font-label text-sm font-bold text-on-surface">
                  Download Format
                </p>
                <Select
                  items={[...formatItems]}
                  value={format}
                  onValueChange={(value) => {
                    if (value) {
                      setValue("format", value as CreateQrValues["format"])
                    }
                  }}
                >
                  <SelectTrigger aria-label="Download format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {formatItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t-2 border-on-surface pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(routes.dashboardQrCodes)}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="brand"
            className="px-8"
          >
            <Save className="size-4" strokeWidth={2.5} />
            Save & Download QR
          </Button>
        </div>
      </form>
    </div>
  )
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex rounded-lg bg-surface-container-lowest p-1 ink-border">
      {options.map((option) => {
        const active = value === option.id

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex-1 rounded-md px-4 py-2 font-label text-sm font-bold transition-[transform,box-shadow,background-color,border-color]",
              active
                ? "bg-surface-container-high text-on-surface ink-border shadow-hard-pressed"
                : "border-2 border-transparent text-on-surface hover:border-on-surface hover:shadow-hard-pressed"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
