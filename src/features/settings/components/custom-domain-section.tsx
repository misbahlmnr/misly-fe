"use client"

import { Globe, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { Button } from "@/components/ui/button"
import { CustomDomainCard } from "@/features/settings/components/custom-domain-card"
import { DomainFormDialog } from "@/features/settings/components/domain-form-dialog"
import { initialCustomDomains } from "@/features/settings/constants"
import type { CustomDomain } from "@/features/settings/types"

export function CustomDomainSection() {
  const [domains, setDomains] = useState<CustomDomain[]>(initialCustomDomains)
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<CustomDomain | null>(null)
  const [deleting, setDeleting] = useState<CustomDomain | null>(null)
  const [verifyingId, setVerifyingId] = useState<string | null>(null)

  const hosts = domains.map((domain) => domain.host)

  function handleAdd(host: string) {
    setDomains((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        host,
        addedLabel: "Added just now",
        status: "pending",
        verifyAttempts: 0,
      },
    ])
    toast.success(`${host} added. Add the CNAME record, then verify.`, {
      position: "top-center",
    })
  }

  function handleEdit(host: string) {
    if (!editing) return

    const hostChanged = host !== editing.host
    setDomains((current) =>
      current.map((domain) =>
        domain.id === editing.id
          ? {
              ...domain,
              host,
              ...(hostChanged
                ? {
                    status: "pending" as const,
                    verifyAttempts: 0,
                    lastError: undefined,
                    addedLabel: "Updated just now",
                  }
                : {}),
            }
          : domain
      )
    )
    if (hostChanged) {
      toast.success(
        `${host} updated. Re-add the CNAME record, then verify.`,
        { position: "top-center" }
      )
    }
    setEditing(null)
  }

  function handleDelete() {
    if (!deleting) return

    setDomains((current) =>
      current.filter((domain) => domain.id !== deleting.id)
    )
    toast.success(`${deleting.host} removed.`, { position: "top-center" })
    setDeleting(null)
  }

  async function handleVerify(domain: CustomDomain) {
    setVerifyingId(domain.id)
    setDomains((current) =>
      current.map((item) =>
        item.id === domain.id ? { ...item, lastError: undefined } : item
      )
    )

    await new Promise((resolve) => window.setTimeout(resolve, 1400))

    const nextAttempts = domain.verifyAttempts + 1
    const succeeded = nextAttempts >= 2

    setDomains((current) =>
      current.map((item) =>
        item.id === domain.id
          ? succeeded
            ? {
                ...item,
                status: "verified",
                verifyAttempts: nextAttempts,
                lastError: undefined,
              }
            : {
                ...item,
                status: "failed",
                verifyAttempts: nextAttempts,
                lastError:
                  "Verification failed: CNAME record not found yet.",
              }
          : item
      )
    )
    setVerifyingId(null)

    if (succeeded) {
      toast.success(`${domain.host} is now verified.`, {
        position: "top-center",
      })
    }
  }

  return (
    <section className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary-container ink-border shadow-hard-pressed">
              <Globe className="size-5 text-on-primary" strokeWidth={2.25} />
            </div>
            <h2 className="font-headline text-xl font-bold text-on-surface">
              Custom Domains
            </h2>
          </div>
          <p className="font-body text-on-surface-variant sm:max-w-lg">
            Connect your own domain to create branded short links.
          </p>
        </div>
        <Button
          type="button"
          className="w-full shrink-0 sm:w-auto"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="size-5" strokeWidth={2.5} />
          Add Custom Domain
        </Button>
      </div>

      {domains.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-outline px-4 py-10 text-center">
          <Globe
            className="mx-auto mb-3 size-8 text-on-surface-variant"
            strokeWidth={2}
          />
          <p className="font-body font-bold text-on-surface">
            No custom domains yet
          </p>
          <p className="mx-auto mt-1 max-w-sm font-body text-sm text-on-surface-variant">
            Add a hostname you own, then point a CNAME to Misly and verify DNS.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {domains.map((domain) => (
            <CustomDomainCard
              key={domain.id}
              domain={domain}
              isVerifying={verifyingId === domain.id}
              onVerify={() => handleVerify(domain)}
              onEdit={() => setEditing(domain)}
              onDelete={() => setDeleting(domain)}
            />
          ))}
        </div>
      )}

      <DomainFormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        existingHosts={hosts}
        onSubmit={handleAdd}
      />
      {editing ? (
        <DomainFormDialog
          mode="edit"
          open
          currentHost={editing.host}
          isVerified={editing.status === "verified"}
          existingHosts={hosts}
          onOpenChange={(open) => {
            if (!open) setEditing(null)
          }}
          onSubmit={handleEdit}
        />
      ) : null}
      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => {
          if (!open) setDeleting(null)
        }}
        title="Remove custom domain?"
        description={
          deleting
            ? `${deleting.host} will no longer be used for short links. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onConfirm={handleDelete}
      />
    </section>
  )
}
