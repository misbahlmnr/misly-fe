import { cn } from "@/lib/utils"

export function Field({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-left text-sm font-bold">{label}</span>
      {children}
    </label>
  )
}
