"use client"

import { useCountUp } from "@/hooks/use-count-up"

export function AnimatedNumber({
  value,
  decimals = 0,
  duration = 800,
  className,
}: {
  value: number
  decimals?: number
  duration?: number
  className?: string
}) {
  const current = useCountUp(value, duration)
  const formatted =
    decimals > 0
      ? current.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(current).toLocaleString()

  return <span className={className}>{formatted}</span>
}
