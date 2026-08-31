"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { routes } from "@/config/routes";
import { logoutOnClient } from "@/features/auth/services/client";

export function LogoutMenuItem() {
  const router = useRouter();

  async function handleLogout() {
    await logoutOnClient();
    router.push(routes.login);
    router.refresh();
  }

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={() => {
        void handleLogout();
      }}
    >
      <LogOut className="size-4" strokeWidth={2.25} />
      Logout
    </DropdownMenuItem>
  );
}
