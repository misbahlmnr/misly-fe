import { routes } from "@/config/routes"

export type SidebarIcon = "overview" | "links" | "qr" | "notifications" | "settings"

export type SidebarNavItem = {
  href: string
  label: string
  icon: SidebarIcon
}

export const workspaceNav: SidebarNavItem[] = [
  { href: routes.dashboard, label: "Overview", icon: "overview" },
  { href: routes.dashboardLinks, label: "My Links", icon: "links" },
  { href: routes.dashboardQrCodes, label: "QR Codes", icon: "qr" },
  {
    href: routes.dashboardNotifications,
    label: "Notifications",
    icon: "notifications",
  },
]

export const accountNav: SidebarNavItem[] = [
  { href: routes.dashboardSettings, label: "Settings", icon: "settings" },
]
