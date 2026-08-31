import { cn } from "@/lib/utils"

export function UnderlineMark({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        className={cn(
          "absolute -bottom-1 left-0 h-3 w-full text-secondary-fixed md:h-4",
          className
        )}
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <path
          d="M0 5 Q 50 10 100 5"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
        />
      </svg>
    </span>
  )
}
