import { BarChart3, Share2, TrendingUp } from "lucide-react"

import { HardLiftCard } from "@/components/shared/hard-lift-card"
import { LandingContainer } from "@/features/marketing/components/landing-container"
import { Reveal } from "@/features/marketing/components/reveal"
import { benefits } from "@/features/marketing/constants"
import { cn } from "@/lib/utils"

const icons = {
  share: Share2,
  trending: TrendingUp,
  monitor: BarChart3,
} as const

export function BenefitsSection() {
  return (
    <Reveal as="section" className="w-full border-t-2 border-on-surface">
      <LandingContainer>
        <div className="grid items-start gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon]
            return (
              <HardLiftCard
                key={benefit.title}
                as="article"
                className="stagger-item rounded-2xl"
                innerClassName="flex flex-col items-start gap-4 rounded-2xl bg-surface-container-low p-8 ink-border"
                style={{ "--stagger": `${index * 100}ms` } as React.CSSProperties}
              >
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full ink-border",
                    benefit.well
                  )}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </div>
                <h4 className="text-xl font-bold">{benefit.title}</h4>
                <p className="text-on-surface-variant">{benefit.description}</p>
              </HardLiftCard>
            )
          })}
        </div>
      </LandingContainer>
    </Reveal>
  )
}
