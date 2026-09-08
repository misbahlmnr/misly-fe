"use client"

import { ArrowLeft, Check, Copy, ExternalLink, Pencil } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { HardLink } from "@/components/shared/hard-button"
import { Button } from "@/components/ui/button"
import { dashboardQrCodeEditPath, routes } from "@/config/routes"
import { QrStyledPreview } from "@/features/qr-codes/components/qr-styled-preview"
import { toAbsoluteUrl } from "@/features/qr-codes/lib/url"
import type { QrCodeItem } from "@/features/qr-codes/types"

export function QrAnalyticsHeader({ item }: { item: QrCodeItem }) {
  const [copied, setCopied] = useState(false)
  const href = toAbsoluteUrl(item.shortUrl)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div className="flex gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-container-lowest p-2 ink-border shadow-hard">
          <QrStyledPreview
            data={item.shortUrl || item.destinationUrl}
            styles={item.styles}
            logoUrl={item.logoUrl}
            size={64}
            className="size-full"
          />
        </div>
        <div className="flex w-full flex-col justify-center gap-1 md:w-auto">
          <Link
            href={routes.dashboardQrCodes}
            className="mb-1 inline-flex w-fit items-center gap-2 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" strokeWidth={2.25} />
            Back to QR Codes
          </Link>
          <h1 className="font-headline text-headline-md font-bold tracking-tight text-on-surface">
            {item.title} QR
          </h1>
          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-base font-bold text-primary hover:underline"
            >
              {item.shortUrl}
              <ExternalLink className="size-4" strokeWidth={2.25} />
            </a>
            <span className="hidden text-outline-variant sm:inline">|</span>
            <span
              className="max-w-[300px] truncate text-sm text-on-surface-variant"
              title={item.destinationUrl}
            >
              {item.destinationUrl}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center gap-4 md:mt-0 md:w-auto">
        <Button
          variant="outline"
          onClick={handleCopy}
          className="flex-1 md:flex-none"
        >
          {copied ? (
            <Check className="size-5" strokeWidth={2.25} />
          ) : (
            <Copy className="size-5" strokeWidth={2.25} />
          )}
          {copied ? "Copied" : "Copy Link"}
        </Button>
        <HardLink
          href={`${dashboardQrCodeEditPath(item.id)}?tab=appearance`}
          className="flex-1 rounded-lg px-6 py-3 text-sm md:flex-none"
        >
          <Pencil className="size-5" strokeWidth={2.25} />
          Edit Design
        </HardLink>
      </div>
    </div>
  )
}
