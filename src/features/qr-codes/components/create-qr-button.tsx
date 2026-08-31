import { Plus } from "lucide-react"

import { HardLink } from "@/components/shared/hard-button"
import { routes } from "@/config/routes"
import { cn } from "@/lib/utils"

export function CreateQrButton({ className }: { className?: string }) {
  return (
    <HardLink
      href={routes.dashboardQrCodesNew}
      className={cn("whitespace-nowrap px-6", className)}
    >
      <Plus className="size-5" strokeWidth={2.5} />
      Create QR Code
    </HardLink>
  )
}
