import { UserData } from "./schemas";

export function userDisplayName(user: Pick<UserData, "name" | "email">) {
  return user.name.trim() || user.email;
}

export function userInitial(user: Pick<UserData, "name" | "email">) {
  return user ? userDisplayName(user).charAt(0).toUpperCase() : "M";
}
