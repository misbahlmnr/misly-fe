"use client"

import {
  BarChart3,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  FileImage,
  FileText,
  MoreHorizontal,
  Palette,
  Pencil,
  Trash2,
} from "lucide-react"
import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  dashboardQrAnalyticsPath,
  dashboardQrCodeEditPath,
} from "@/config/routes"
import { isProPlan } from "@/config/user"
import { QrPattern } from "@/features/qr-codes/components/qr-pattern"
import type { QrCodeItem } from "@/features/qr-codes/types"

export function QrCard({ item }: { item: QrCodeItem }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`https://${item.shortUrl}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col rounded-xl bg-surface-container-lowest ink-border shadow-hard">
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-t-xl border-b-2 border-on-surface bg-surface-bright p-8">
        <QrPattern seed={item.id} style={item.style} logo={item.logo} />
        {item.featured && (
          <div className="absolute top-4 right-4 bg-tertiary-fixed px-2 py-1 text-xs font-bold text-on-surface ink-border shadow-hard-pressed">
            Top
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 font-headline text-xl font-bold text-on-surface">
          {item.title}
        </h3>
        <a
          href={`https://${item.shortUrl}`}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {item.shortUrl}
          <ExternalLink className="size-4" strokeWidth={2.25} />
        </a>

        <div className="mt-auto mb-6 flex items-center justify-between text-sm font-medium text-on-surface-variant">
          <span className="flex items-center gap-1">
            <Eye className="size-[18px]" strokeWidth={2.25} />
            {item.scans.toLocaleString()}
          </span>
          <span>{item.createdLabel}</span>
        </div>

        <div className="mt-auto flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              title="Download"
              className="rounded-md bg-surface-container-lowest p-2 ink-border btn-hard-shadow-sm hover:bg-surface"
            >
              <Download className="size-5" strokeWidth={2.25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-36">
              <DropdownMenuItem>
                <FileImage className="size-4" strokeWidth={2.25} />
                PNG
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileCode2 className="size-4" strokeWidth={2.25} />
                SVG
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="size-4" strokeWidth={2.25} />
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1" />

          <DropdownMenu>
            <DropdownMenuTrigger
              title="More"
              className="rounded-md bg-tertiary-fixed p-2 ink-border btn-hard-shadow-sm hover:bg-surface"
            >
              <MoreHorizontal className="size-5" strokeWidth={2.25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLink
                href={`${dashboardQrCodeEditPath(item.id)}?tab=appearance`}
              >
                <Palette className="size-4" strokeWidth={2.25} />
                Customize
              </DropdownMenuLink>
              <DropdownMenuLink
                href={`${dashboardQrCodeEditPath(item.id)}?tab=content`}
              >
                <Pencil className="size-4" strokeWidth={2.25} />
                Edit
              </DropdownMenuLink>
              <DropdownMenuItem onClick={copyLink}>
                <Copy className="size-4" strokeWidth={2.25} />
                {copied ? "Copied!" : "Copy Link"}
              </DropdownMenuItem>
              {isProPlan() ? (
                <DropdownMenuLink href={dashboardQrAnalyticsPath(item.id)}>
                  <span className="flex flex-1 items-center gap-2">
                    <BarChart3 className="size-4" strokeWidth={2.25} />
                    Analytics
                  </span>
                  <span className="rounded-sm border border-on-surface bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">
                    PRO
                  </span>
                </DropdownMenuLink>
              ) : (
                <DropdownMenuItem disabled>
                  <span className="flex flex-1 items-center gap-2">
                    <BarChart3 className="size-4" strokeWidth={2.25} />
                    Analytics
                  </span>
                  <span className="rounded-sm border border-on-surface bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">
                    PRO
                  </span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" strokeWidth={2.25} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
