export type NotificationKind =
  | "clicks"
  | "qr"
  | "domain"
  | "link"
  | "warning"
  | "security"

export type NotificationCategory = "system" | "analytics"

export type NotificationTab = "all" | "unread" | NotificationCategory

export type NotificationItem = {
  id: string
  kind: NotificationKind
  category: NotificationCategory
  title: string
  body: string
  time: string
  unread: boolean
}
