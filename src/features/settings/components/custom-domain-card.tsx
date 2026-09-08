"use client"

import {
  CircleAlert,
  CircleCheck,
  Clock,
  ExternalLink,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CopyValueButton } from "@/features/settings/components/copy-value-button"
import { dnsSetupGuides } from "@/features/settings/constants"
import { getDnsRecords } from "@/features/settings/lib/dns"
import type { CustomDomain } from "@/features/settings/types"
import { cn } from "@/lib/utils"

const kebabClass =
  "inline-flex items-center justify-center rounded-md bg-tertiary-fixed p-2 ink-border btn-hard-shadow-sm hover:bg-surface"

export function CustomDomainCard({
  domain,
  isVerifying,
  onVerify,
  onEdit,
  onDelete,
}: {
  domain: CustomDomain
  isVerifying: boolean
  onVerify: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const dns = getDnsRecords(domain.host)
  const isVerified = domain.status === "verified"
  const isFailed = domain.status === "failed"

  return (
    <article className="rounded-lg bg-surface p-4 ink-border">
      <div className="mb-4 flex items-start justify-between gap-3 border-b-2 border-outline-variant/30 pb-4">
        <div className="min-w-0">
          <h3 className="truncate font-headline text-lg font-bold text-on-surface">
            {domain.host}
          </h3>
          <p className="font-body text-sm text-on-surface-variant">
            {domain.addedLabel}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DomainStatusBadge
            status={domain.status}
            isVerifying={isVerifying}
          />
          <DropdownMenu>
            <DropdownMenuTrigger
              title="Domain actions"
              aria-label={`Actions for ${domain.host}`}
              className={kebabClass}
            >
              <MoreHorizontal className="size-5" strokeWidth={2.25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="size-4" strokeWidth={2.25} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={onDelete}>
                <Trash2 className="size-4" strokeWidth={2.25} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        className={cn(
          "mb-4 rounded-lg p-3 ink-border",
          isVerified
            ? "bg-secondary-container/40"
            : isFailed
              ? "bg-error-container/60"
              : "bg-tertiary-fixed/40"
        )}
        aria-live="polite"
      >
        {isVerifying ? (
          <p className="flex items-center gap-2 font-body text-sm font-bold text-on-surface">
            <Loader2 className="size-4 shrink-0 animate-spin" strokeWidth={2.5} />
            Checking DNS records...
          </p>
        ) : isVerified ? (
          <p className="flex items-start gap-2 font-body text-sm text-on-surface">
            <CircleCheck
              className="mt-0.5 size-4 shrink-0 text-secondary"
              strokeWidth={2.5}
            />
            This domain is connected. You can create branded short links with it.
          </p>
        ) : isFailed ? (
          <div className="space-y-1">
            <p className="flex items-start gap-2 font-body text-sm font-bold text-on-surface">
              <CircleAlert
                className="mt-0.5 size-4 shrink-0 text-error"
                strokeWidth={2.5}
              />
              {domain.lastError ??
                "Verification failed: CNAME record not found yet."}
            </p>
            <p className="pl-6 font-body text-xs text-on-surface-variant">
              DNS propagation can take up to 24–48 hours. Double-check the
              record, then try again.
            </p>
          </div>
        ) : (
          <p className="flex items-start gap-2 font-body text-sm text-on-surface">
            <Clock
              className="mt-0.5 size-4 shrink-0 text-tertiary"
              strokeWidth={2.5}
            />
            Waiting for DNS. Add the CNAME below, then verify. Propagation can
            take up to 24–48 hours.
          </p>
        )}
      </div>

      <div className="rounded-lg bg-surface-container-lowest p-4 ink-border">
        <p className="mb-1 font-label text-sm font-bold text-on-surface">
          DNS configuration
        </p>
        <p className="mb-4 font-body text-xs text-on-surface-variant">
          Add this CNAME at your DNS provider, then click Verify.
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <DnsField label="Type" value={dns.type} />
          <DnsField label="Name" value={dns.name} copyable />
          <DnsField label="Value" value={dns.value} copyable />
        </div>
        <div className="mt-4 flex flex-col gap-2 border-t-2 border-outline-variant/30 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-xs font-bold text-on-surface-variant">
            How to add a CNAME
          </p>
          <div className="flex flex-wrap gap-2">
            {dnsSetupGuides.map((guide) => (
              <a
                key={guide.label}
                href={guide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-surface px-2.5 py-1 font-label text-xs font-bold text-on-surface ink-border shadow-hard-pressed hover:bg-surface-container-high"
              >
                {guide.label}
                <ExternalLink className="size-3" strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {!isVerified ? (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="brand"
            disabled={isVerifying}
            onClick={onVerify}
            className="w-full sm:w-auto"
          >
            {isVerifying ? (
              <>
                Checking...
                <Loader2 className="size-4 animate-spin" strokeWidth={2.5} />
              </>
            ) : (
              <>
                Verify Domain
                <CircleCheck className="size-4" strokeWidth={2.5} />
              </>
            )}
          </Button>
        </div>
      ) : null}
    </article>
  )
}

function DomainStatusBadge({
  status,
  isVerifying,
}: {
  status: CustomDomain["status"]
  isVerifying: boolean
}) {
  if (isVerifying) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1 font-label text-xs font-bold text-on-surface ink-border shadow-hard-pressed">
        <Loader2 className="size-3 animate-spin" strokeWidth={2.5} />
        Checking
      </span>
    )
  }

  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 font-label text-xs font-bold text-on-secondary-container ink-border shadow-hard-pressed">
        <CircleCheck className="size-3" strokeWidth={2.5} />
        Verified
      </span>
    )
  }

  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-error-container px-3 py-1 font-label text-xs font-bold text-error ink-border shadow-hard-pressed">
        <CircleAlert className="size-3" strokeWidth={2.5} />
        Failed
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1 font-label text-xs font-bold text-on-surface ink-border shadow-hard-pressed">
      <Clock className="size-3" strokeWidth={2.5} />
      Pending
    </span>
  )
}

function DnsField({
  label,
  value,
  copyable = false,
}: {
  label: string
  value: string
  copyable?: boolean
}) {
  return (
    <div className="rounded-md bg-surface p-3 ink-border">
      <p className="font-label text-[11px] font-bold tracking-wide text-on-surface-variant uppercase">
        {label}
      </p>
      <div className="mt-1 flex items-start justify-between gap-2">
        <code
          title={value}
          className="min-w-0 break-all font-body text-sm font-bold text-on-surface"
        >
          {value}
        </code>
        {copyable ? <CopyValueButton value={value} label={label} /> : null}
      </div>
    </div>
  )
}
