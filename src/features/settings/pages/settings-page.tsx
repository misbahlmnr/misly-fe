"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { routes } from "@/config/routes"
import { BillingSection } from "@/features/settings/components/billing-section"
import { CustomDomainSection } from "@/features/settings/components/custom-domain-section"
import { PasswordSection } from "@/features/settings/components/password-section"
import { ProfileInformation } from "@/features/settings/components/profile-information"
import type { SettingsTab } from "@/features/settings/types"
import { cn } from "@/lib/utils"

const tabs: { id: SettingsTab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "domain", label: "Custom Domain" },
  { id: "billing", label: "Billing & Plan" },
]

export function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("profile")

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Link
          href={routes.dashboard}
          className="mb-4 inline-flex items-center gap-2 font-label text-sm font-bold text-on-surface hover:underline"
        >
          <ArrowLeft className="size-4" strokeWidth={2.25} />
          Back to Dashboard
        </Link>
        <h1 className="mb-2 font-headline text-headline-md font-bold tracking-tight text-on-surface">
          Settings
        </h1>
        <p className="font-body text-on-surface-variant">
          Manage your account, domains, and subscription.
        </p>
      </div>

      <div className="inline-flex items-center overflow-x-auto rounded-lg bg-surface-container-low p-1 ink-border shadow-hard-pressed">
        {tabs.map((item) => {
          const active = tab === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "whitespace-nowrap rounded-md px-6 py-2 text-sm font-bold transition-[transform,box-shadow,background-color,border-color]",
                active
                  ? "scale-[1.02] bg-primary text-on-primary ink-border shadow-hard-pressed"
                  : "border-2 border-transparent bg-surface-container-low text-on-surface-variant hover:border-on-surface hover:bg-surface-container-highest"
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {tab === "profile" ? (
        <div className="grid grid-cols-1 gap-8">
          <ProfileInformation />
          <PasswordSection />
        </div>
      ) : null}

      {tab === "domain" ? <CustomDomainSection /> : null}

      {tab === "billing" ? <BillingSection /> : null}
    </div>
  )
}
