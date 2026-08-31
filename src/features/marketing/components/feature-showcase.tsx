import { ArrowRight } from "lucide-react"

import { HardLink } from "@/components/shared/hard-button"
import { HardLiftCard } from "@/components/shared/hard-lift-card"
import { LandingContainer } from "@/features/marketing/components/landing-container"
import { Reveal } from "@/features/marketing/components/reveal"
import { featurePills } from "@/features/marketing/constants"
import { cn } from "@/lib/utils"

export function FeatureShowcase() {
  return (
    <Reveal as="section" id="features" className="w-full border-t-2 border-on-surface">
      <LandingContainer>
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-extrabold text-on-surface md:text-5xl">
            Explore features for more efficiency
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-on-surface-variant">
            Use Misly to turn every link into a smarter growth tool.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {featurePills.map((pill, index) => (
              <span
                key={pill.label}
                className={cn(
                  "stagger-item rounded-full px-6 py-2 font-bold ink-border",
                  pill.className
                )}
                style={{ "--stagger": `${index * 100}ms` } as React.CSSProperties}
              >
                {pill.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-24 grid items-center gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-on-surface">
              Campaign Monitoring & Analytics
            </h3>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              Learn how your links perform and make better digital campaigns.
            </p>
            <HardLink href="#" variant="primary" className="px-8 py-4">
              Start for free
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </HardLink>
          </div>

          <HardLiftCard
            className="rounded-2xl"
            innerClassName="relative rounded-2xl bg-surface-container-lowest p-6 ink-border"
          >
            <div className="absolute -top-4 -right-4 z-0 size-16 rounded-full bg-tertiary-fixed ink-border" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b-2 border-on-surface pb-4">
                <span className="text-lg font-bold">Total clicks</span>
                <span className="text-3xl font-black text-primary">2,280</span>
              </div>
              <div className="flex h-32 items-end gap-2 rounded-xl bg-surface-container p-2 ink-border">
                <div className="h-1/3 w-1/6 rounded-t-sm bg-primary/20" />
                <div className="h-1/2 w-1/6 rounded-t-sm bg-primary/40" />
                <div className="h-2/3 w-1/6 rounded-t-sm bg-primary/60" />
                <div className="h-3/4 w-1/6 rounded-t-sm bg-primary/80" />
                <div className="h-full w-1/6 rounded-t-sm bg-primary" />
                <div className="h-4/5 w-1/6 rounded-t-sm bg-secondary" />
              </div>
              <div className="space-y-3">
                <ClickRow source="twitter.com/post" value="+124" />
                <ClickRow source="linkedin.com/in" value="+86" />
              </div>
            </div>
          </HardLiftCard>
        </div>
      </LandingContainer>
    </Reveal>
  )
}

function ClickRow({ source, value }: { source: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-3 ink-border">
      <span className="font-medium">{source}</span>
      <span className="font-bold text-secondary">{value}</span>
    </div>
  )
}
