export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  dashboardLinks: "/dashboard/links",
  dashboardQrCodes: "/dashboard/qr-codes",
  dashboardQrCodesNew: "/dashboard/qr-codes/new",
  dashboardNotifications: "/dashboard/notifications",
  dashboardSettings: "/dashboard/settings",
} as const

export function dashboardLinkPath(slug: string) {
  return `${routes.dashboardLinks}/${slug}`
}

export function dashboardQrCodeEditPath(id: string) {
  return `${routes.dashboardQrCodes}/${id}/edit`
}

export function dashboardQrAnalyticsPath(id: string) {
  return `${routes.dashboardQrCodes}/${id}`
}
