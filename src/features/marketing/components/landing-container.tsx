import { cn } from "@/lib/utils"

export function LandingContainer({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-container-max px-4 py-24 md:px-8",
        className
      )}
    >
      {children}
    </div>
  )
}
