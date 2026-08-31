export type UserPlan = "free" | "pro"

export const currentUser: {
  name: string
  email: string
  plan: UserPlan
} = {
  name: "Misbah",
  email: "misbah@example.com",
  plan: "pro",
}

export function isProPlan() {
  return currentUser.plan === "pro"
}
