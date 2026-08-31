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
