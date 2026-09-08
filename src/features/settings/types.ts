export type SettingsTab = "profile" | "domain" | "billing"

export type ProfileValues = {
  name: string
  email: string
}

export type PasswordValues = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type CustomDomainStatus = "pending" | "verified" | "failed"

export type CustomDomain = {
  id: string
  host: string
  addedLabel: string
  status: CustomDomainStatus
  verifyAttempts: number
  lastError?: string
}
