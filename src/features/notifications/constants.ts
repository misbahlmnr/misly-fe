import type { NotificationItem } from "@/features/notifications/types"

export const notifications: NotificationItem[] = [
  {
    id: "1",
    kind: "clicks",
    category: "analytics",
    title: "Your short link reached 1,000 clicks",
    body: "Summer Sale has reached a new click milestone.",
    time: "5m ago",
    unread: true,
  },
  {
    id: "2",
    kind: "qr",
    category: "system",
    title: "Your QR Code is ready",
    body: "The QR Code for summer-sale is ready to use.",
    time: "2h ago",
    unread: false,
  },
  {
    id: "3",
    kind: "domain",
    category: "system",
    title: "Custom domain verified",
    body: "links.example.com is now connected to your account.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    kind: "link",
    category: "system",
    title: "Short link created successfully",
    body: "Your new short link summer-sale has been created.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "5",
    kind: "link",
    category: "analytics",
    title: "Your link is getting attention",
    body: "summer-sale received 142 clicks today.",
    time: "18m ago",
    unread: true,
  },
  {
    id: "6",
    kind: "warning",
    category: "system",
    title: "You're approaching your link limit",
    body: "Used 8 of 10 short links on Free Plan.",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: "7",
    kind: "security",
    category: "system",
    title: "Password updated successfully",
    body: "Your account password was recently changed.",
    time: "Yesterday",
    unread: false,
  },
]

export const notificationPageSize = 4
