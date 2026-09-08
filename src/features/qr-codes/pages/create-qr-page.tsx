"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ImageIcon, Loader2, Save } from "lucide-react"
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
import {
  ColorField,
  CornerStylePicker,
  DestinationChip,
  DotStylePicker,
  EditorTabs,
  FormatToggle,
  SourceToggle,
  StylePresetPicker,
} from "@/features/qr-codes/components/qr-editor-controls"
import { QrStyledPreview } from "@/features/qr-codes/components/qr-styled-preview"
import { useCreateQrCode } from "@/features/qr-codes/hooks/use-create-qr-code"
import { useQrLinkOptions } from "@/features/qr-codes/hooks/use-qr-link-options"
import { downloadStyledQr } from "@/features/qr-codes/lib/qr-styling"
import { QR_PLACEHOLDER_URL } from "@/features/qr-codes/lib/url"
import {
  applyQrPreset,
  createQrSchema,
  qrStylesFromValues,
  valuesFromQr,
  type CreateQrValues,
} from "@/features/qr-codes/schema"
import type {
  QrCodeItem,
  QrEditorTab,
  QrStyle,
} from "@/features/qr-codes/types"
import { cn } from "@/lib/utils"

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
  const createQr = useCreateQrCode()
  const { data: linksResult, isLoading: linksLoading } = useQrLinkOptions()
  const links = linksResult?.data ?? []

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateQrValues>({
    resolver: zodResolver(createQrSchema),
    defaultValues: valuesFromQr(initial),
  })

  const source = useWatch({ control, name: "source" }) ?? "existing"
  const linkId = useWatch({ control, name: "linkId" }) ?? ""
  const destinationUrl = useWatch({ control, name: "destinationUrl" }) ?? ""
  const preset = useWatch({ control, name: "preset" }) ?? "default"
  const dotsType = useWatch({ control, name: "dotsType" }) ?? "square"
  const dotsColor = useWatch({ control, name: "dotsColor" }) ?? "#161d1f"
  const cornersSquareType =
    useWatch({ control, name: "cornersSquareType" }) ?? "square"
  const cornersDotType = useWatch({ control, name: "cornersDotType" }) ?? "square"
  const cornersColor = useWatch({ control, name: "cornersColor" }) ?? "#161d1f"
  const backgroundColor =
    useWatch({ control, name: "backgroundColor" }) ?? "#ffffff"
  const logoUrl = useWatch({ control, name: "logoUrl" }) ?? ""
  const format = useWatch({ control, name: "format" }) ?? "png"

  const selectedLink = links.find((link) => link.id === linkId)
  const previewUrl =
    source === "existing"
      ? selectedLink?.destinationUrl || initial?.shortUrl || QR_PLACEHOLDER_URL
      : destinationUrl || initial?.shortUrl || QR_PLACEHOLDER_URL
  const logoPreview = /^https?:\/\/.+/i.test(logoUrl.trim()) ? logoUrl.trim() : ""

  const liveStyles = qrStylesFromValues({
    dotsType,
    dotsColor,
    cornersSquareType,
    cornersDotType,
    cornersColor,
    backgroundColor,
  })

  const linkItems = [
    {
      label: linksLoading ? "Loading links..." : "Select a short link...",
      value: null as string | null,
    },
    ...links.map((link) => ({
      label: `${link.title || link.slug} · /${link.slug}`,
      value: link.id,
    })),
  ]

  const isSaving = createQr.isPending

  function applyPreset(next: QrStyle) {
    const nextValues = applyQrPreset(next)
    setValue("preset", nextValues.preset)
    setValue("dotsType", nextValues.dotsType)
    setValue("dotsColor", nextValues.dotsColor)
    setValue("cornersSquareType", nextValues.cornersSquareType)
    setValue("cornersDotType", nextValues.cornersDotType)
    setValue("cornersColor", nextValues.cornersColor)
    setValue("backgroundColor", nextValues.backgroundColor)
  }

  async function onSubmit(values: CreateQrValues) {
    const selectedDestinationUrl =
      values.source === "existing"
        ? selectedLink?.destinationUrl
        : values.destinationUrl

    if (mode === "edit") {
      await downloadStyledQr({
        data: initial?.shortUrl || selectedDestinationUrl || QR_PLACEHOLDER_URL,
        styles: qrStylesFromValues(values),
        logoUrl: values.logoUrl,
        name: values.title || "qr-code",
        extension: values.format,
      })
      router.push(routes.dashboardQrCodes)
      return
    }

    let result
    try {
      result = await createQr.mutateAsync({
        values,
        selectedDestinationUrl,
      })
    } catch {
      return
    }

    if (!result.success || !result.data) return

    await downloadStyledQr({
      data: result.data.shortUrl || result.data.destinationUrl,
      styles: result.data.styles,
      logoUrl: result.data.logoUrl,
      name: result.data.title || values.title || "qr-code",
      extension: values.format,
    })

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
        <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
          {mode === "edit" ? "Customize QR Code" : "Create QR Code"}
        </h1>
        <p className="font-body text-lg text-outline">
          {mode === "edit"
            ? "Update the look and destination of this QR code."
            : "Create and customize a QR code for your shortened link."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EditorTabs value={tab} onChange={setTab} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8 lg:col-span-7">
            {tab === "content" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface">
                    Destination
                  </h2>
                  <p className="mt-1 font-body text-sm text-on-surface-variant">
                    Name this QR and choose where scans should go.
                  </p>
                </div>

                <label className="block space-y-2">
                  <span className="block font-label text-sm font-bold text-on-surface">
                    Title <span className="text-error">*</span>
                  </span>
                  <Input
                    type="text"
                    placeholder="e.g., Summer Campaign"
                    aria-invalid={errors.title ? true : undefined}
                    {...register("title")}
                  />
                  <FieldError message={errors.title?.message} />
                </label>

                <div className="space-y-3">
                  <p className="font-label text-sm font-bold text-on-surface">
                    Link source
                  </p>
                  <SourceToggle
                    value={source}
                    onChange={(next) => setValue("source", next)}
                  />
                </div>

                {source === "existing" ? (
                  <label className="block space-y-2">
                    <span className="block font-label text-sm font-bold text-on-surface">
                      Short link <span className="text-error">*</span>
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
                    {selectedLink ? (
                      <p className="truncate font-body text-xs text-on-surface-variant">
                        {selectedLink.destinationUrl}
                      </p>
                    ) : (
                      <p className="font-body text-xs text-on-surface-variant">
                        {linksLoading
                          ? "Loading your short links..."
                          : links.length === 0
                            ? "No short links yet — switch to New URL instead."
                            : "Choose a link this QR should encode."}
                      </p>
                    )}
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
                      aria-invalid={errors.destinationUrl ? true : undefined}
                      {...register("destinationUrl")}
                    />
                    <FieldError message={errors.destinationUrl?.message} />
                  </label>
                )}
              </div>
            )}

            {tab === "appearance" && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface">
                    Appearance
                  </h2>
                  <p className="mt-1 font-body text-sm text-on-surface-variant">
                    Start from a preset, then tune dots, corners, and colors.
                  </p>
                </div>

                <StylePresetPicker
                  value={preset}
                  onChange={(next) => applyPreset(next)}
                />

                <DotStylePicker
                  value={dotsType}
                  color={dotsColor}
                  onChange={(next) => setValue("dotsType", next)}
                />

                <CornerStylePicker
                  value={cornersSquareType}
                  color={cornersColor}
                  onChange={(next) => {
                    setValue("cornersSquareType", next)
                    setValue(
                      "cornersDotType",
                      next === "dot" ? "dot" : "square"
                    )
                  }}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <ColorField
                    label="Foreground"
                    value={dotsColor}
                    onChange={(value) => {
                      setValue("dotsColor", value)
                      setValue("cornersColor", value)
                    }}
                    error={errors.dotsColor?.message}
                  />
                  <ColorField
                    label="Background"
                    value={backgroundColor}
                    onChange={(value) => setValue("backgroundColor", value)}
                    error={errors.backgroundColor?.message}
                    swatches={["#ffffff", "#f4fafd", "#e4dfff", "#161d1f"]}
                  />
                </div>
              </div>
            )}

            {tab === "branding" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface">
                    Branding
                  </h2>
                  <p className="mt-1 font-body text-sm text-on-surface-variant">
                    Drop a logo in the center. Square PNG or SVG works best.
                  </p>
                </div>

                <div
                  className={cn(
                    "flex items-center gap-4 rounded-xl bg-surface-bright p-4 ink-border",
                    logoPreview && "shadow-hard-pressed"
                  )}
                >
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-surface-container-lowest ink-border">
                    <ImageIcon
                      className={cn(
                        "size-6",
                        logoPreview ? "text-primary" : "text-on-surface-variant"
                      )}
                      strokeWidth={2.25}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label text-sm font-bold text-on-surface">
                      {logoPreview ? "Logo added" : "Center logo"}
                    </p>
                    <p className="font-body text-xs text-on-surface-variant">
                      {logoPreview
                        ? "Shown in the live preview on the right."
                        : "Optional. Leave empty for a clean QR."}
                    </p>
                  </div>
                </div>

                <label className="block space-y-2">
                  <span className="block font-label text-sm font-bold text-on-surface">
                    Logo URL
                  </span>
                  <Input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    aria-invalid={errors.logoUrl ? true : undefined}
                    {...register("logoUrl")}
                  />
                  <FieldError message={errors.logoUrl?.message} />
                </label>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="flex flex-col rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard lg:sticky lg:top-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  Live preview
                </h2>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-2.5 py-1 font-label text-[11px] font-bold text-on-secondary-container ink-border">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-secondary" />
                  </span>
                  Live
                </span>
              </div>

              <div className="mb-5 flex aspect-square w-full items-center justify-center rounded-xl bg-surface-bright p-5 ink-border">
                <QrStyledPreview
                  data={previewUrl}
                  styles={liveStyles}
                  logoUrl={logoUrl}
                  size={240}
                  className="size-full max-w-60"
                />
              </div>

              <p className="mb-2 font-label text-xs font-bold tracking-wide text-on-surface-variant uppercase">
                Encodes
              </p>
              <DestinationChip url={previewUrl} />

              <div className="mt-5 border-t-2 border-dashed border-on-surface pt-5">
                <p className="mb-3 font-label text-sm font-bold text-on-surface">
                  Download format
                </p>
                <FormatToggle
                  value={format}
                  onChange={(next) => setValue("format", next)}
                />
              </div>
            </div>
          </aside>
        </div>

        <div className="flex flex-col-reverse items-stretch justify-between gap-3 rounded-xl bg-surface-container-lowest px-6 py-4 ink-border shadow-hard sm:flex-row sm:items-center">
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
            disabled={isSaving}
            variant="brand"
            className="px-8"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2.5} />
            ) : (
              <Save className="size-4" strokeWidth={2.5} />
            )}
            Save & Download QR
          </Button>
        </div>
      </form>
    </div>
  )
}
