import { Receipt, Wallet } from "lucide-react"

import { HardLink } from "@/components/shared/hard-button"
import { routes } from "@/config/routes"
import { currentUser, isProPlan } from "@/config/user"
import { planUsage } from "@/features/settings/constants"

export function BillingSection() {
  const usage = planUsage[currentUser.plan]
  const pro = isProPlan()

  return (
    <div className="grid grid-cols-1 gap-8">
      <section className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary-container ink-border shadow-hard-pressed">
            <Wallet className="size-5 text-on-primary" strokeWidth={2.25} />
          </div>
          <h2 className="font-headline text-xl font-bold text-on-surface">
            Current Plan
          </h2>
          <span className="ml-auto rounded-full bg-secondary-fixed/20 px-3 py-1 font-label text-xs font-bold text-on-surface ink-border shadow-hard-pressed">
            {pro ? "Pro Plan" : "Free Plan"}
          </span>
        </div>

        <div className="space-y-6">
          <UsageBar
            label="Short Links"
            used={usage.links.used}
            limit={usage.links.limit}
            barClass="bg-primary"
          />
          <UsageBar
            label="QR Codes"
            used={usage.qr.used}
            limit={usage.qr.limit}
            barClass="bg-secondary-fixed"
          />
        </div>
      </section>

      {!pro ? (
        <section className="rounded-xl bg-tertiary-fixed p-6 ink-border shadow-hard md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="mb-2 font-headline text-2xl font-bold text-on-surface">
                Upgrade to Pro
              </h2>
              <p className="font-body text-on-surface/80">
                Unlock advanced analytics, unlimited links, and custom domains.
              </p>
            </div>
            <HardLink
              href={`${routes.home}#pricing`}
              variant="outline"
              className="shrink-0 rounded-lg px-8 py-3 text-lg"
            >
              Upgrade Now
            </HardLink>
          </div>
        </section>
      ) : null}

      <section className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary-container ink-border shadow-hard-pressed">
            <Receipt className="size-5 text-on-primary" strokeWidth={2.25} />
          </div>
          <h2 className="font-headline text-xl font-bold text-on-surface">
            Billing History
          </h2>
        </div>
        <div className="rounded-lg border-2 border-dashed border-outline py-8 text-center">
          <p className="font-body font-bold text-on-surface-variant">
            No billing history yet.
          </p>
        </div>
      </section>
    </div>
  )
}

function UsageBar({
  label,
  used,
  limit,
  barClass,
}: {
  label: string
  used: number
  limit: number
  barClass: string
}) {
  const width = Math.min(100, (used / limit) * 100)

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="font-label text-sm font-bold text-on-surface">
          {label}
        </span>
        <span className="font-body text-sm text-on-surface-variant">
          {used}/{limit.toLocaleString()}
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-surface-container-high ink-border">
        <div
          className={`h-full rounded-full border-r-2 border-on-surface ${barClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
