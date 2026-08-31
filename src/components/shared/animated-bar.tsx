"use client"

import { useEffect, useState, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export function AnimatedBar({
  value,
  className,
  style,
}: {
  value: number
  className?: string
  style?: CSSProperties
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <div
      className={cn(
        "h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
      style={{
        ...style,
        width: ready ? `${Math.max(0, Math.min(100, value))}%` : "0%",
      }}
    />
  )
}
