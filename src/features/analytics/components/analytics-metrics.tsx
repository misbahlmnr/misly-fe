"use client"

import type { ReactNode } from "react"
import { Globe, MousePointerClick, Share2, TrendingUp, Users } from "lucide-react"

import { AnimatedNumber } from "@/components/shared/animated-number"
import type { LinkAnalytics } from "@/features/analytics/types"

export function AnalyticsMetrics({ data }: { data: LinkAnalytics }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Clicks"
        value={<AnimatedNumber value={data.totalClicks} />}
        icon={
          <MousePointerClick
            className="size-6 text-primary"
            strokeWidth={2.25}
            fill="currentColor"
          />
        }
        iconWrap="bg-primary-fixed"
        glow="bg-primary"
        footer={
          <>
            <span className="flex items-center gap-1 text-sm font-bold text-secondary">
              <TrendingUp className="size-3.5" strokeWidth={2.5} />+
              <AnimatedNumber value={data.clicksChange} decimals={1} />%
            </span>
            <span className="text-xs text-on-surface-variant">
              {data.comparisonLabel}
            </span>
          </>
        }
      />
      <MetricCard
        label="Unique Visitors"
        value={<AnimatedNumber value={data.uniqueVisitors} />}
        icon={
          <Users
            className="size-6 text-secondary"
            strokeWidth={2.25}
            fill="currentColor"
          />
        }
        iconWrap="bg-secondary-container"
        glow="bg-secondary"
        footer={
          <>
            <span className="flex items-center gap-1 text-sm font-bold text-secondary">
              <TrendingUp className="size-3.5" strokeWidth={2.5} />+
              <AnimatedNumber value={data.visitorsChange} decimals={1} />%
            </span>
            <span className="text-xs text-on-surface-variant">
              {data.comparisonLabel}
            </span>
          </>
        }
      />
      <MetricCard
        label="Top Country"
        value={data.topCountry.name || "—"}
        valueClass="text-2xl truncate pr-2"
        icon={
          <Globe
            className="size-6 text-on-surface"
            strokeWidth={2.25}
            fill="currentColor"
          />
        }
        iconWrap="bg-surface-container-high"
        footer={
          <>
            <span className="rounded border border-on-surface bg-on-surface px-2 py-0.5 text-xs font-bold text-surface-container-lowest">
              <AnimatedNumber value={data.topCountry.share} />%
            </span>
            <span className="text-xs text-on-surface-variant">
              of total traffic
            </span>
          </>
        }
      />
      <MetricCard
        label="Top Referrer"
        value={data.topReferrer.name || "—"}
        valueClass="text-2xl truncate pr-2"
        icon={
          <Share2
            className="size-6 text-tertiary"
            strokeWidth={2.25}
            fill="currentColor"
          />
        }
        iconWrap="bg-tertiary-fixed"
        footer={
          <>
            <span className="rounded border border-on-surface bg-on-surface px-2 py-0.5 text-xs font-bold text-surface-container-lowest">
              <AnimatedNumber value={data.topReferrer.share} />%
            </span>
            <span className="text-xs text-on-surface-variant">
              of total traffic
            </span>
          </>
        }
      />
    </div>
  )
}

function MetricCard({
  label,
  value,
  valueClass = "text-3xl",
  icon,
  iconWrap,
  glow,
  footer,
}: {
  label: string
  value: ReactNode
  valueClass?: string
  icon: ReactNode
  iconWrap: string
  glow?: string
  footer: ReactNode
}) {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-sm font-bold text-on-surface-variant">
            {label}
          </p>
          <h3
            className={`font-headline font-bold text-on-surface tabular-nums ${valueClass}`}
          >
            {value}
          </h3>
        </div>
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-full ink-border ${iconWrap}`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2 border-t border-outline-variant/30 pt-2">
        {footer}
      </div>
      {glow && (
        <div
          className={`pointer-events-none absolute -right-4 -bottom-4 size-16 rounded-full opacity-10 blur-xl ${glow}`}
        />
      )}
    </div>
  )
}
