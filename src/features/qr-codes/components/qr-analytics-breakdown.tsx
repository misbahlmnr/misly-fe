"use client"

import { Camera, Focus, MoreHorizontal, Smartphone, Tablet } from "lucide-react"

import { AnimatedBar } from "@/components/shared/animated-bar"
import { AnimatedNumber } from "@/components/shared/animated-number"
import type { QrScanAnalytics } from "@/features/qr-codes/types"
import { cn } from "@/lib/utils"

const locationBars = [
  "bg-primary",
  "bg-tertiary-fixed",
  "bg-secondary-fixed",
  "bg-outline-variant",
]

const deviceIcons: Record<string, typeof Smartphone> = {
  iphone: Smartphone,
  android: Smartphone,
  tablet: Tablet,
}

const sourceIcons: Record<string, typeof Camera> = {
  camera: Camera,
  lens: Focus,
  instagram: Camera,
  other: MoreHorizontal,
}

export function QrAnalyticsBreakdown({ data }: { data: QrScanAnalytics }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
        <h3 className="mb-6 font-headline text-lg font-bold text-on-surface">
          Top Locations
        </h3>
        <div className="flex flex-1 flex-col gap-4">
          {data.locations.length === 0 ? (
            <p className="text-sm text-on-surface-variant">No location data yet.</p>
          ) : null}
          {data.locations.map((item, index) => (
            <div key={item.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>{item.name}</span>
                <span className="text-on-surface-variant">
                  <AnimatedNumber value={item.share} />%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full border border-outline-variant bg-surface-container">
                <AnimatedBar
                  value={item.share}
                  className={locationBars[index] ?? "bg-outline-variant"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BreakdownList
        title="Devices & OS"
        items={data.devices.map((item) => ({
          name: item.name,
          share: item.share,
          featured: item.featured,
          icon: deviceIcons[item.icon] ?? Smartphone,
          iconClass: item.featured ? "text-primary" : "text-on-surface-variant",
        }))}
      />

      <BreakdownList
        title="Scan Sources"
        items={data.sources.map((item) => ({
          name: item.name,
          share: item.share,
          featured: item.featured,
          icon: sourceIcons[item.icon] ?? MoreHorizontal,
          iconClass: item.featured ? "text-tertiary" : "text-on-surface-variant",
        }))}
      />
    </div>
  )
}

function BreakdownList({
  title,
  items,
}: {
  title: string
  items: {
    name: string
    share: number
    featured?: boolean
    icon: typeof Smartphone
    iconClass: string
  }[]
}) {
  return (
    <div className="flex flex-col rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
      <h3 className="mb-6 font-headline text-lg font-bold text-on-surface">
        {title}
      </h3>
      <div className="flex flex-1 flex-col gap-4">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.name}
              className={cn(
                "flex items-center justify-between rounded-lg p-3 text-sm font-bold ink-border",
                item.featured
                  ? "bg-surface-bright shadow-hard-pressed"
                  : "hover:bg-surface-container"
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className={cn("size-5", item.iconClass)} strokeWidth={2.25} />
                {item.name}
              </span>
              <span
                className={
                  item.featured ? "text-on-surface" : "text-on-surface-variant"
                }
              >
                <AnimatedNumber value={item.share} />%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
