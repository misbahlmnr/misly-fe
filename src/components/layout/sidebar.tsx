"use client";

import {
  Bell,
  ChevronsUpDown,
  LayoutGrid,
  Link2,
  QrCode,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  accountNav,
  workspaceNav,
  type SidebarIcon,
} from "@/config/navigation";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { currentUser, isProPlan } from "@/config/user";
import { LogoutMenuItem } from "@/features/auth";
import { cn } from "@/lib/utils";

const icons: Record<SidebarIcon, typeof LayoutGrid> = {
  overview: LayoutGrid,
  links: Link2,
  qr: QrCode,
  notifications: Bell,
  settings: Settings,
};

function Brand() {
  return (
    <div className="border-b-2 border-on-surface p-6">
      <Link href={routes.dashboard} className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary ink-border btn-hard-shadow-sm">
          <span className="font-headline text-xl font-bold text-on-primary">
            M
          </span>
        </div>
        <span className="font-headline text-2xl font-black tracking-tight">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}

function NavSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: typeof workspaceNav;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div>
      <p className="mb-2 px-2 font-label text-label-sm font-bold tracking-wider text-outline uppercase">
        {title}
      </p>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const active =
            item.href === routes.dashboard
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md border-2 px-3 py-2 font-label font-bold transition-[transform,box-shadow,background-color,color,border-color] duration-200",
                active
                  ? "border-on-surface bg-primary-container text-on-primary btn-hard-shadow-sm"
                  : "border-transparent text-on-surface hover:border-on-surface hover:bg-primary-container hover:text-on-primary hover:shadow-hard-pressed",
              )}
            >
              <Icon
                className={cn("size-5", active && "text-white")}
                strokeWidth={2.25}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="space-y-4 border-t-2 border-on-surface p-4">
      {!isProPlan() && (
        <div className="relative overflow-hidden rounded-lg bg-tertiary-fixed p-4 ink-border shadow-hard-pressed">
          <h4 className="mb-1 font-headline font-bold text-on-tertiary-fixed">
            Upgrade to Pro
          </h4>
          <p className="mb-3 font-body text-sm text-on-tertiary-fixed-variant">
            Unlock advanced analytics and custom domains.
          </p>
          <button
            type="button"
            className="w-full rounded-lg bg-surface-container-lowest py-2 font-label font-bold text-on-surface ink-border btn-hard-shadow-sm hover:bg-surface"
          >
            Upgrade Now
          </button>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-container data-popup-open:bg-surface-container">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed font-headline text-sm font-bold text-primary ink-border">
            M
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-label text-sm font-bold">
              {currentUser.name}
            </p>
            <p className="truncate font-body text-xs text-outline">
              {isProPlan() ? "Pro Plan" : "Free Plan"}
            </p>
          </div>
          <ChevronsUpDown className="size-5 text-outline" strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="w-(--anchor-width)"
        >
          <LogoutMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Brand />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-8">
          <NavSection
            title="Workspace"
            items={workspaceNav}
            onNavigate={onNavigate}
          />
        </div>
        <NavSection
          title="Account"
          items={accountNav}
          onNavigate={onNavigate}
        />
      </div>
      <SidebarFooter />
    </>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r-2 border-on-surface bg-surface-container-lowest md:flex">
      <SidebarBody onNavigate={onNavigate} />
    </aside>
  );
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        className="absolute inset-0 bg-[#0f172a]/45 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="relative flex h-full w-64 flex-col bg-surface-container-lowest ink-border">
        <SidebarBody onNavigate={onClose} />
      </aside>
    </div>
  );
}
