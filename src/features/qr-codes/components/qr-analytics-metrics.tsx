"use client"

import type { ReactNode } from "react"
import { Clock, QrCode, Smartphone, TrendingUp, User } from "lucide-react"

import { AnimatedNumber } from "@/components/shared/animated-number"
import type { QrScanAnalytics } from "@/features/qr-codes/types"

export function QrAnalyticsMetrics({ data }: { data: QrScanAnalytics }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Scans"
        value={<AnimatedNumber value={data.totalScans} />}
        icon={
          <QrCode
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
              <AnimatedNumber value={data.scansChange} decimals={1} />%
            </span>
            <span className="text-xs text-on-surface-variant">
              {data.comparisonLabel}
            </span>
          </>
        }
      />
      <MetricCard
        label="Unique Scanners"
        value={<AnimatedNumber value={data.uniqueScanners} />}
        icon={
          <User
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
              <AnimatedNumber value={data.scannersChange} decimals={1} />%
            </span>
            <span className="text-xs text-on-surface-variant">
              {data.comparisonLabel}
            </span>
          </>
        }
      />
      <MetricCard
        label="Top Device"
        value={data.topDevice.name}
        valueClass="text-2xl truncate pr-2"
        icon={
          <Smartphone
            className="size-6 text-on-surface"
            strokeWidth={2.25}
            fill="currentColor"
          />
        }
        iconWrap="bg-surface-container-high"
        footer={
          <>
            <span className="rounded border border-on-surface bg-on-surface px-2 py-0.5 text-xs font-bold text-surface-container-lowest">
              <AnimatedNumber value={data.topDevice.share} />%
            </span>
            <span className="text-xs text-on-surface-variant">
              of total scans
            </span>
          </>
        }
      />
      <MetricCard
        label="Peak Scan Time"
        value={data.peakTime.label}
        valueClass="text-2xl truncate pr-2"
        icon={
          <Clock
            className="size-6 text-tertiary"
            strokeWidth={2.25}
            fill="currentColor"
          />
        }
        iconWrap="bg-tertiary-fixed"
        footer={
          <>
            <span className="rounded border border-on-surface bg-on-surface px-2 py-0.5 text-xs font-bold text-surface-container-lowest">
              <AnimatedNumber value={data.peakTime.scans} />
            </span>
            <span className="text-xs text-on-surface-variant">scans</span>
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
          <p className="mb-1 text-sm font-bold tracking-wider text-on-surface-variant uppercase">
            {label}
          </p>
          <h3 className={`font-headline font-bold text-on-surface tabular-nums ${valueClass}`}>
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
