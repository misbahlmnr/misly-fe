"use client"

import { Tag } from "lucide-react"
import { useState } from "react"

import { PlanCard } from "@/features/billing/components/plan-card"
import { plans } from "@/features/billing/constants"
import { LandingContainer } from "@/features/marketing/components/landing-container"
import { Reveal } from "@/features/marketing/components/reveal"
import { cn } from "@/lib/utils"

export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <Reveal
      as="section"
      id="pricing"
      className="w-full border-t-2 border-on-surface"
    >
      <LandingContainer className="pt-32 pb-20 text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-4 py-2 font-label text-sm font-bold text-on-secondary-fixed ink-border shadow-hard">
          <Tag className="size-4" strokeWidth={2} fill="currentColor" />
          Flexible Plans
        </div>
        <h2 className="font-display mb-6 text-5xl leading-tight font-extrabold tracking-tight md:text-7xl">
          Simple pricing.
          <br />
          <span className="text-primary">Powerful links.</span>
        </h2>
        <p className="font-body mx-auto mb-12 max-w-2xl text-xl text-on-surface-variant">
          Whether you&apos;re just starting out or managing a global brand, we
          have a plan built for your scale.
        </p>

        <div className="mb-8 flex items-center justify-center gap-4 md:mb-20">
          <span
            className={cn(
              "font-label text-lg font-bold",
              yearly && "text-on-surface-variant"
            )}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Bill yearly"
            onClick={() => setYearly((value) => !value)}
            className="relative h-8 w-16 cursor-pointer rounded-full bg-surface-container-highest ink-border"
          >
            <span
              className={cn(
                "absolute top-1 left-1 size-5 rounded-full border border-ink bg-primary transition-transform duration-300",
                yearly && "translate-x-8"
              )}
            />
          </button>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "font-label text-lg font-bold",
                !yearly && "text-on-surface-variant"
              )}
            >
              Yearly
            </span>
            <span className="rotate-3 rounded-md bg-tertiary-fixed px-2 py-1 text-xs font-bold text-on-tertiary-fixed ink-border">
              Save 20%
            </span>
          </div>
        </div>
      </LandingContainer>

      <LandingContainer className="pt-0 pb-32">
        <div className="relative z-10 grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              name={plan.name}
              description={plan.description}
              price={yearly ? plan.yearlyPrice : plan.monthlyPrice}
              cta={plan.cta}
              features={plan.features}
              featured={plan.featured}
            />
          ))}
        </div>
      </LandingContainer>
    </Reveal>
  )
}
