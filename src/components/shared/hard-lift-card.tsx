import { cn } from "@/lib/utils"

type HardLiftCardProps = {
  className?: string
  innerClassName?: string
  as?: "div" | "article"
  style?: React.CSSProperties
  children: React.ReactNode
}

export function HardLiftCard({
  className,
  innerClassName,
  as: Comp = "div",
  style,
  children,
}: HardLiftCardProps) {
  return (
    <div className={cn("relative self-start", className)} style={style}>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-[inherit] bg-ink"
      />
      <Comp
        className={cn(
          "relative z-10 transition-transform duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1",
          innerClassName
        )}
      >
        {children}
      </Comp>
    </div>
  )
}
