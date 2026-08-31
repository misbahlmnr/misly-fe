"use client"

import { Menu } from "lucide-react"
import Link from "next/link"

import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { NotificationPopover } from "@/features/notifications"

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b-2 border-on-surface bg-surface-container-lowest px-6">
      <div className="flex items-center gap-3 md:hidden">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-lg bg-surface-container-lowest p-2 ink-border btn-hard-shadow-sm"
        >
          <Menu className="size-5" strokeWidth={2.25} />
        </button>
        <Link
          href={routes.dashboard}
          className="font-headline text-xl font-black tracking-tight"
        >
          {siteConfig.name}
        </Link>
      </div>

      <div className="hidden md:block" />

      <div className="flex items-center gap-4">
        <NotificationPopover />
        <div className="flex size-8 items-center justify-center rounded-full bg-primary-fixed font-headline text-xs font-bold text-primary ink-border md:hidden">
          M
        </div>
      </div>
    </header>
  )
}
