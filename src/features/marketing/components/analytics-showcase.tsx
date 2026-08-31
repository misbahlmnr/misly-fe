import { ArrowRight } from "lucide-react"

import { HardLink } from "@/components/shared/hard-button"
import { HardLiftCard } from "@/components/shared/hard-lift-card"
import { LandingContainer } from "@/features/marketing/components/landing-container"
import { Reveal } from "@/features/marketing/components/reveal"
import { UnderlineMark } from "@/features/marketing/components/underline-mark"

export function AnalyticsShowcase() {
  return (
    <Reveal as="section" className="w-full border-t-2 border-on-surface">
      <LandingContainer>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <HardLiftCard
            className="order-2 rounded-2xl md:order-1"
            innerClassName="rounded-2xl bg-surface-container-lowest p-6 ink-border"
          >
            <h4 className="mb-6 border-b-2 border-on-surface pb-4 text-xl font-bold">
              Campaign Analytics
            </h4>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <Stat
                label="Total clicks"
                value="26.8K"
                className="bg-primary-fixed/30 text-primary"
              />
              <Stat
                label="Conversion"
                value="83%"
                className="bg-secondary-container/30 text-secondary"
              />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-surface-container p-4 ink-border">
              <span className="font-bold">Total links</span>
              <span className="text-xl font-black">1,263</span>
            </div>
            <div className="mt-6 flex h-24 items-center justify-center rounded-xl bg-surface-container-low ink-border">
              <svg
                aria-hidden
                className="h-full w-full fill-none p-2 stroke-primary stroke-[3]"
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
              >
                <path d="M0 25 Q 10 15 20 20 T 40 10 T 60 15 T 80 5 T 100 15" />
              </svg>
            </div>
          </HardLiftCard>

          <div className="order-1 space-y-8 md:order-2">
            <h3 className="text-3xl leading-tight font-bold text-on-surface md:text-4xl">
              See how Misly can{" "}
              <UnderlineMark className="text-tertiary-fixed">
                help your business
              </UnderlineMark>
            </h3>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              Turn every link into a useful signal. Understand how people
              interact with your URLs and make smarter decisions from one simple
              platform.
            </p>
            <HardLink href="#" variant="secondary" className="px-8 py-4">
              Start for free
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </HardLink>
          </div>
        </div>
      </LandingContainer>
    </Reveal>
  )
}

function Stat({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className: string
}) {
  return (
    <div className={`rounded-xl p-4 text-center ink-border ${className}`}>
      <span className="mb-1 block text-sm font-medium text-on-surface-variant">
        {label}
      </span>
      <span className="block text-2xl font-black">{value}</span>
    </div>
  )
}
