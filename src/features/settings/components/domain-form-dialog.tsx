"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Globe, Loader2, Save, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import { FieldError } from "@/components/shared/field-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  getDnsRecords,
  isValidDomain,
  normalizeHost,
} from "@/features/settings/lib/dns"
import {
  createCustomDomainSchema,
  type CustomDomainValues,
} from "@/features/settings/schema"
import { cn } from "@/lib/utils"

type DomainFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  existingHosts: string[]
  onSubmit: (host: string) => void
} & (
  | { mode?: "create"; currentHost?: undefined; isVerified?: undefined }
  | { mode: "edit"; currentHost: string; isVerified?: boolean }
)

export function DomainFormDialog(props: DomainFormDialogProps) {
  const { open, onOpenChange, existingHosts, onSubmit } = props
  const isEdit = props.mode === "edit"

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-hidden
        className="absolute inset-0 bg-[#0f172a]/45 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="domain-form-title"
        className="relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-y-auto rounded-lg bg-surface-container-lowest ink-border shadow-hard"
      >
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          aria-label="Close modal"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4"
        >
          <X className="size-4" strokeWidth={2.25} />
        </Button>
        <div className="p-6 md:p-8">
          <div className="mb-6 pr-8">
            <h2
              id="domain-form-title"
              className="mb-2 font-headline text-2xl font-bold text-on-surface"
            >
              {isEdit ? "Edit custom domain" : "Add custom domain"}
            </h2>
            <p className="font-body text-sm text-outline">
              {isEdit
                ? "Changing the hostname resets verification. Update DNS to match, then verify again."
                : "Enter a hostname you own. Next, you will add a CNAME record at your DNS provider."}
            </p>
          </div>
          <DomainForm
            isEdit={isEdit}
            currentHost={isEdit ? props.currentHost : undefined}
            isVerified={isEdit ? props.isVerified : false}
            existingHosts={existingHosts}
            onCancel={() => onOpenChange(false)}
            onSubmit={(host) => {
              onSubmit(host)
              onOpenChange(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

function DomainForm({
  isEdit,
  currentHost,
  isVerified = false,
  existingHosts,
  onCancel,
  onSubmit,
}: {
  isEdit: boolean
  currentHost?: string
  isVerified?: boolean
  existingHosts: string[]
  onCancel: () => void
  onSubmit: (host: string) => void
}) {
  const schema = useMemo(
    () => createCustomDomainSchema(existingHosts, currentHost),
    [existingHosts, currentHost]
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomDomainValues>({
    resolver: zodResolver(schema),
    defaultValues: { host: currentHost ?? "" },
  })

  const [typedHost, setTypedHost] = useState(currentHost ?? "")
  const previewHost = normalizeHost(typedHost)
  const showPreview = isValidDomain(previewHost)
  const dns = showPreview ? getDnsRecords(previewHost) : null

  function submit(values: CustomDomainValues) {
    onSubmit(values.host)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submit)} noValidate>
      <label className="block">
        <span className="mb-2 block text-left text-sm font-bold">
          Domain hostname
        </span>
        <Input
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="links.yourbrand.com"
          aria-invalid={errors.host ? true : undefined}
          {...register("host", {
            onChange: (event) => setTypedHost(event.target.value),
          })}
        />
        <p className="mt-2 font-body text-xs text-outline">
          Prefer a subdomain. Root domains often cannot use a CNAME record.
        </p>
        <FieldError message={errors.host?.message} />
      </label>

      {isEdit && isVerified ? (
        <p className="rounded-lg bg-tertiary-fixed/50 p-3 font-body text-sm text-on-surface ink-border">
          This domain is currently verified. Saving a different hostname will
          require a new CNAME record and verification.
        </p>
      ) : null}

      {dns ? (
        <div
          className={cn(
            "rounded-lg p-4 ink-border",
            dns.isApex ? "bg-error-container/50" : "bg-surface"
          )}
        >
          <p className="mb-3 font-label text-sm font-bold text-on-surface">
            {dns.isApex
              ? "Root domain detected"
              : "CNAME record you will add next"}
          </p>
          {dns.isApex ? (
            <p className="font-body text-sm text-on-surface">
              Use a subdomain like{" "}
              <strong>links.{previewHost}</strong> instead. Apex/root hosts
              usually need ALIAS or ANAME, which we do not support yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <PreviewStat label="Type" value={dns.type} />
              <PreviewStat label="Name" value={dns.name} />
              <PreviewStat label="Value" value={dns.value} />
            </div>
          )}
        </div>
      ) : null}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || Boolean(dns?.isApex)}
          className="flex-1"
        >
          {isSubmitting ? (
            <Loader2 className="size-5 animate-spin" strokeWidth={2.5} />
          ) : isEdit ? (
            <>
              Save changes
              <Save className="size-5" strokeWidth={2.5} />
            </>
          ) : (
            <>
              Add domain
              <Globe className="size-5" strokeWidth={2.5} />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-label text-[11px] font-bold tracking-wide text-on-surface-variant uppercase">
        {label}
      </p>
      <p className="mt-1 break-all font-body text-sm font-bold text-on-surface">
        {value}
      </p>
    </div>
  )
}
