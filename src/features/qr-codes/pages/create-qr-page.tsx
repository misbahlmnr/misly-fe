"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import {
  DestinationChip,
  EditorTabs,
  FormatToggle,
} from "@/features/qr-codes/components/qr-editor-controls";
import { QrStyledPreview } from "@/features/qr-codes/components/qr-styled-preview";
import { useCreateQrCode } from "@/features/qr-codes/hooks/use-create-qr-code";
import { useQrLinkOptions } from "@/features/qr-codes/hooks/use-qr-link-options";
import {
  buildQrScanUrl,
  withShortOrigin,
} from "@/features/qr-codes/common/lib/url";
import {
  applyQrPreset,
  createQrSchema,
  qrStylesFromValues,
  valuesFromQr,
  type CreateQrValues,
} from "@/features/qr-codes/schema";
import type {
  QrCodeItem,
  QrEditorTab,
  QrStyle,
} from "@/features/qr-codes/types";
import ContentTab from "../components/create-form/content-tab";
import ApperanceTab from "../components/create-form/apperance-tab";
import BrandingTab from "../components/create-form/branding-tab";
import { useQrFormValues } from "../hooks/use-qr-form-values";
import { useUpdateQrCode } from "../hooks/use-update-qr-code";

export function CreateQrPage({
  mode,
  initial,
  initialTab = "content",
}: {
  mode: "create" | "edit";
  initial?: QrCodeItem;
  initialTab?: QrEditorTab;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<QrEditorTab>(initialTab);

  const createQr = useCreateQrCode();
  const updateQrCode = useUpdateQrCode();

  const { data: linksResult, isLoading: linksLoading } = useQrLinkOptions();
  const links = linksResult?.data ?? [];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateQrValues>({
    resolver: zodResolver(createQrSchema),
    defaultValues: valuesFromQr(initial),
  });

  const {
    source,
    linkId,
    destinationUrl,
    preset,
    dotsType,
    dotsColor,
    cornersSquareType,
    cornersDotType,
    cornersColor,
    backgroundColor,
    logoUrl,
    format,
  } = useQrFormValues(control);

  const selectedLink = links.find((link) => link.id === linkId);

  const previewUrl = initial?.id
    ? buildQrScanUrl(initial.id)
    : source === "existing"
      ? withShortOrigin(selectedLink?.shortUrl || initial?.shortUrl)
      : destinationUrl || withShortOrigin(initial?.shortUrl);

  const logoPreview = /^https?:\/\/.+/i.test(logoUrl.trim())
    ? logoUrl.trim()
    : "";

  const liveStyles = qrStylesFromValues({
    dotsType,
    dotsColor,
    cornersSquareType,
    cornersDotType,
    cornersColor,
    backgroundColor,
  });

  const linkItems = [
    {
      label: linksLoading ? "Loading links..." : "Select a short link...",
      value: null as string | null,
    },
    ...links.map((link) => ({
      label: `${link.title || link.slug} · /${link.slug}`,
      value: link.id,
    })),
  ];

  const isSaving = createQr.isPending || updateQrCode.isPending;

  function applyPreset(next: QrStyle) {
    const nextValues = applyQrPreset(next);
    setValue("preset", nextValues.preset);
    setValue("dotsType", nextValues.dotsType);
    setValue("dotsColor", nextValues.dotsColor);
    setValue("cornersSquareType", nextValues.cornersSquareType);
    setValue("cornersDotType", nextValues.cornersDotType);
    setValue("cornersColor", nextValues.cornersColor);
    setValue("backgroundColor", nextValues.backgroundColor);
  }

  async function saveQrCode(
    values: CreateQrValues,
    selectedDestinationUrl?: string,
  ) {
    if (mode === "edit") {
      if (!initial?.id) return;
      return updateQrCode.mutateAsync({
        id: initial.id,
        values,
        selectedDestinationUrl,
      });
    }

    return createQr.mutateAsync({ values, selectedDestinationUrl });
  }

  async function onSubmit(values: CreateQrValues) {
    const selectedDestinationUrl =
      values.source === "existing"
        ? selectedLink?.destinationUrl
        : values.destinationUrl;

    try {
      const result = await saveQrCode(values, selectedDestinationUrl);
      if (!result?.success || !result.data) return;

      // await downloadStyledQr({
      //   data: buildQrScanUrl(result.data.id),
      //   styles: result.data.styles,
      //   logoUrl: result.data.logoUrl,
      //   name: result.data.title || values.title || "qr-code",
      //   extension: values.format,
      // });

      router.push(routes.dashboardQrCodes);
    } catch {
      return;
    }
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
              <ContentTab
                register={register}
                errors={errors}
                source={source}
                setValue={setValue}
                linkItems={linkItems}
                linkId={linkId}
                selectedLink={selectedLink}
              />
            )}

            {tab === "appearance" && (
              <ApperanceTab
                preset={preset}
                applyPreset={applyPreset}
                dotsType={dotsType}
                dotsColor={dotsColor}
                setValue={setValue}
                cornersSquareType={cornersSquareType}
                cornersColor={cornersColor}
                backgroundColor={backgroundColor}
                errors={errors}
              />
            )}

            {tab === "branding" && (
              <BrandingTab
                logoPreview={logoPreview}
                register={register}
                errors={errors}
              />
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
                  key={previewUrl}
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
  );
}
