"use client"

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Link2,
  Lock,
  QrCode,
  TriangleAlert,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { routes } from "@/config/routes"
import { notifications as initialNotifications } from "@/features/notifications/constants"
import type {
  NotificationItem,
  NotificationKind,
} from "@/features/notifications/types"
import { cn } from "@/lib/utils"

const kindStyles: Record<
  NotificationKind,
  { icon: typeof Link2; box: string; iconClass: string }
> = {
  clicks: {
    icon: BarChart3,
    box: "bg-primary-container",
    iconClass: "text-on-primary",
  },
  link: {
    icon: Link2,
    box: "bg-primary-container",
    iconClass: "text-on-primary",
  },
  domain: {
    icon: BadgeCheck,
    box: "bg-secondary-fixed",
    iconClass: "text-on-secondary-fixed",
  },
  qr: {
    icon: QrCode,
    box: "bg-primary-fixed",
    iconClass: "text-primary",
  },
  warning: {
    icon: TriangleAlert,
    box: "bg-tertiary-fixed",
    iconClass: "text-on-tertiary-container",
  },
  security: {
    icon: Lock,
    box: "bg-primary-container",
    iconClass: "text-on-primary",
  },
}

export function NotificationPopover() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(initialNotifications)
  const rootRef = useRef<HTMLDivElement>(null)
  const unreadCount = items.filter((item) => item.unread).length

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, unread: false })))
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
        className="relative rounded-full p-2 transition-colors hover:bg-surface-container"
      >
        <Bell className="size-5" strokeWidth={2.25} />
        {unreadCount > 0 ? (
          <span className="absolute top-1 right-1 size-2.5 rounded-full border-2 border-surface-container-lowest bg-error" />
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Notifications"
          className="fixed top-16 right-4 z-50 w-[min(400px,calc(100vw-2rem))] overflow-hidden rounded-xl bg-surface-container-lowest ink-border shadow-hard md:right-6"
        >
          <div className="flex items-center justify-between border-b-2 border-on-surface p-4">
            <h3 className="font-headline font-bold text-on-surface">
              Notifications
            </h3>
            <button
              type="button"
              onClick={markAllRead}
              className="font-label text-sm font-bold text-primary hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-[480px] overflow-y-auto">
            {items.slice(0, 5).map((item) => (
              <NotificationRow
                key={item.id}
                item={item}
                onSelect={() => setOpen(false)}
              />
            ))}
          </div>

          <div className="bg-surface-container-low p-4 text-center">
            <Link
              href={routes.dashboardNotifications}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 font-label text-sm font-bold text-primary hover:underline"
            >
              View all notifications
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function NotificationRow({
  item,
  onSelect,
}: {
  item: NotificationItem
  onSelect: () => void
}) {
  const style = kindStyles[item.kind]
  const Icon = style.icon

  return (
    <Link
      href={routes.dashboardNotifications}
      onClick={onSelect}
      className={cn(
        "relative flex gap-4 border-b-2 border-outline-variant/30 p-4 transition-colors hover:bg-surface-container",
        item.unread && "bg-primary-fixed/20"
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-md ink-border shadow-hard-pressed",
          style.box
        )}
      >
        <Icon className={cn("size-5", style.iconClass)} strokeWidth={2.25} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-label text-sm font-bold text-on-surface">
          {item.title}
        </p>
        <p className="font-body text-xs text-on-surface-variant">{item.body}</p>
        <p className="mt-1 font-body text-[10px] text-outline">{item.time}</p>
      </div>
      {item.unread ? (
        <div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
      ) : null}
    </Link>
  )
}
