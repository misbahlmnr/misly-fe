import { CircleCheck, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { customDomain } from "@/features/settings/constants"

export function CustomDomainSection() {
  return (
    <section className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary-container ink-border shadow-hard-pressed">
          <Globe className="size-5 text-on-primary" strokeWidth={2.25} />
        </div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Custom Domains
        </h2>
      </div>
      <p className="mb-6 font-body text-on-surface-variant">
        Connect your own domain to create branded short links.
      </p>

      <div className="mb-6 rounded-lg bg-surface p-4 ink-border">
        <div className="mb-4 flex flex-col justify-between gap-4 border-b-2 border-outline-variant/30 pb-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-headline text-lg font-bold text-on-surface">
              {customDomain.host}
            </h3>
            <p className="font-body text-sm text-on-surface-variant">
              {customDomain.addedLabel}
            </p>
          </div>
          <span className="rounded-full bg-tertiary-fixed px-3 py-1 font-label text-xs font-bold text-on-surface ink-border shadow-hard-pressed">
            {customDomain.status}
          </span>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 ink-border">
          <p className="mb-2 font-label text-sm font-bold text-on-surface">
            DNS Configuration
          </p>
          <div className="grid grid-cols-1 gap-4 font-body text-sm md:grid-cols-3">
            <div>
              <span className="text-on-surface-variant">Type:</span>{" "}
              <strong className="text-on-surface">{customDomain.dns.type}</strong>
            </div>
            <div>
              <span className="text-on-surface-variant">Name:</span>{" "}
              <strong className="text-on-surface">{customDomain.dns.name}</strong>
            </div>
            <div>
              <span className="text-on-surface-variant">Value:</span>{" "}
              <strong className="text-on-surface">
                {customDomain.dns.value}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-4 border-t-2 border-outline-variant/30 pt-6 sm:flex-row">
        <Button variant="outline" className="px-6">
          Add Custom Domain
        </Button>
        <Button className="px-6">
          Verify Domain
          <CircleCheck className="size-4" strokeWidth={2.5} />
        </Button>
      </div>
    </section>
  )
}
