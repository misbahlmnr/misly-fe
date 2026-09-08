"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"

export function CopyValueButton({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      title={copied ? "Copied!" : `Copy ${label}`}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      onClick={handleCopy}
      className={cn(
        "relative shrink-0 rounded-md p-1.5 ink-border btn-hard-shadow-sm",
        copied
          ? "bg-secondary text-on-secondary"
          : "bg-tertiary-fixed text-on-surface hover:bg-surface",
        className
      )}
    >
      {copied ? (
        <Check className="size-4" strokeWidth={2.25} />
      ) : (
        <Copy className="size-4" strokeWidth={2.25} />
      )}
      {copied ? (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-inverse-surface px-2 py-1 font-label text-xs whitespace-nowrap text-inverse-on-surface">
          Copied!
        </span>
      ) : null}
    </button>
  )
}
