"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function CopyLinkButton({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      title={copied ? "Copied!" : "Copy"}
      aria-label={copied ? "Copied" : "Copy link"}
      onClick={handleCopy}
      className={cn(
        "relative p-2 ink-border btn-hard-shadow-sm",
        copied
          ? "bg-secondary text-on-secondary"
          : "bg-tertiary-fixed hover:bg-surface",
        className ?? "rounded-md",
      )}
    >
      {copied ? (
        <Check className="size-5" strokeWidth={2.25} />
      ) : (
        <Copy className="size-5" strokeWidth={2.25} />
      )}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-inverse-surface px-2 py-1 font-label text-xs whitespace-nowrap text-inverse-on-surface">
          Copied!
        </span>
      )}
    </button>
  );
}
