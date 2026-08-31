"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  as?: "div" | "section" | "footer"
  id?: string
  className?: string
  children: React.ReactNode
}

export function Reveal({
  as: Comp = "div",
  id,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.unobserve(el)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Comp
      id={id}
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Comp>
  )
}
