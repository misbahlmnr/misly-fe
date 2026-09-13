"use client"

import { ArrowLeft, Check, Copy, ExternalLink, Pencil } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { routes } from "@/config/routes"
import type { AnalyticsLink } from "@/features/analytics/types"
import { formatShortLabel, resolveShortUrl } from "@/features/links/lib/url"

export function AnalyticsHeader({ link }: { link: AnalyticsLink }) {
  const [copied, setCopied] = useState(false)
  const href = resolveShortUrl(null, link.slug)
  const shortLabel = formatShortLabel(href)

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
      <div className="flex w-full flex-col gap-3 md:w-auto">
        <Link
          href={routes.dashboardLinks}
          className="inline-flex w-fit items-center gap-2 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" strokeWidth={2.25} />
          Back to My Links
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="font-headline text-headline-md font-bold tracking-tight text-on-surface">
            {link.title}
          </h1>
          <span className="-rotate-2 rounded-md bg-secondary-container px-2 py-1 text-xs font-bold text-on-secondary-container ink-border shadow-hard-pressed">
            PRO
          </span>
        </div>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={href}
            className="flex items-center gap-1 text-base font-bold text-primary hover:underline"
          >
            {shortLabel}
            <ExternalLink className="size-4" strokeWidth={2.25} />
          </a>
          <span className="hidden text-outline-variant sm:inline">|</span>
          <span
            className="max-w-[300px] truncate text-sm text-on-surface-variant"
            title={link.destinationUrl}
          >
            {link.destinationUrl}
          </span>
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
        <Button className="flex-1 md:flex-none">
          <Pencil className="size-5" strokeWidth={2.25} />
          Edit
        </Button>
      </div>
    </div>
  )
}
