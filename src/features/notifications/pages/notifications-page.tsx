"use client"

import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  ChevronDown,
  Link2,
  Lock,
  QrCode,
  TriangleAlert,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { routes } from "@/config/routes"
import {
  notificationPageSize,
  notifications as initialNotifications,
} from "@/features/notifications/constants"
import type {
  NotificationItem,
  NotificationKind,
  NotificationTab,
} from "@/features/notifications/types"
import { cn } from "@/lib/utils"

const tabs: { id: NotificationTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "system", label: "System" },
  { id: "analytics", label: "Analytics" },
]

const kindIcons: Record<NotificationKind, typeof Link2> = {
  clicks: BarChart3,
  qr: QrCode,
  domain: BadgeCheck,
  link: Link2,
  warning: TriangleAlert,
  security: Lock,
}

export function NotificationsPage() {
  const [tab, setTab] = useState<NotificationTab>("all")
  const [items, setItems] = useState(initialNotifications)
  const [visible, setVisible] = useState(notificationPageSize)

  const filtered = useMemo(() => {
    if (tab === "unread") return items.filter((item) => item.unread)
    if (tab === "system" || tab === "analytics") {
      return items.filter((item) => item.category === tab)
    }
    return items
  }, [items, tab])

  const shown = tab === "all" ? filtered.slice(0, visible) : filtered
  const canLoadMore = tab === "all" && visible < filtered.length

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, unread: false })))
  }

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
          Notifications
        </h1>
        <p className="font-body text-on-surface-variant">
          Stay up to date with what&apos;s happening in your account.
        </p>
      </div>

      <div className="inline-flex items-center overflow-x-auto rounded-lg bg-surface-container-lowest p-1 ink-border shadow-hard">
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
                  : "border-2 border-transparent text-on-surface hover:bg-surface-container-highest"
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <section className="overflow-hidden rounded-lg bg-surface-container-lowest ink-border shadow-hard">
        <div className="flex items-center justify-between border-b-2 border-on-surface px-6 py-4">
          <h2 className="font-headline text-lg font-bold text-on-surface">
            Notifications
          </h2>
          <button
            type="button"
            onClick={markAllRead}
            className="text-sm font-bold text-primary hover:underline"
          >
            Mark all as read
          </button>
        </div>

        {shown.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-body font-bold text-on-surface-variant">
              No notifications in this view.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {shown.map((item, index) => (
              <NotificationRow
                key={item.id}
                item={item}
                last={index === shown.length - 1}
              />
            ))}
          </div>
        )}
      </section>

      {canLoadMore ? (
        <div className="flex justify-center pt-4 pb-8">
          <Button
            variant="outline"
            className="px-6"
            onClick={() => setVisible(filtered.length)}
          >
            Load More Notifications
            <ChevronDown className="size-4" strokeWidth={2.5} />
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function NotificationRow({
  item,
  last,
}: {
  item: NotificationItem
  last: boolean
}) {
  const Icon = kindIcons[item.kind]
  const categoryLabel =
    item.category === "analytics" ? "Analytics" : "System"

  return (
    <div
      className={cn(
        "group relative flex cursor-pointer gap-4 p-4 transition-colors",
        !last && "border-b-2 border-on-surface",
        item.unread
          ? "bg-primary-fixed/30 hover:bg-primary-fixed/50"
          : "bg-surface-container-lowest pl-10 hover:bg-surface-container"
      )}
    >
      {item.unread ? (
        <div className="absolute top-1/2 left-4 size-2 shrink-0 -translate-y-1/2 rounded-full bg-primary" />
      ) : null}

      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg ink-border",
          item.unread
            ? "ml-4 bg-primary text-on-primary"
            : "bg-secondary-container text-on-secondary-container"
        )}
      >
        <Icon className="size-[18px]" strokeWidth={2.25} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-start justify-between">
          <h3 className="font-headline text-base font-bold text-on-surface">
            {item.title}
          </h3>
          <span
            className={cn(
              "ml-4 shrink-0 whitespace-nowrap text-xs text-on-surface-variant",
              item.unread && "font-medium"
            )}
          >
            {item.time}
          </span>
        </div>
        <p className="mb-2 font-body text-sm text-on-surface-variant">
          {item.body}
        </p>
        <span
          className={cn(
            "inline-flex items-center rounded px-2 py-0.5 font-body text-xs font-bold text-on-surface ink-border",
            item.unread
              ? "bg-surface-container-lowest"
              : "bg-surface-container"
          )}
        >
          {categoryLabel}
        </span>
      </div>
    </div>
  )
}
