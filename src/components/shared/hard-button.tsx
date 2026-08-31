import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const variants = {
  cta: "default",
  primary: "brand",
  secondary: "secondary",
  outline: "outline",
  muted: "muted",
} as const

type Variant = keyof typeof variants

export function HardLink({
  href,
  variant = "cta",
  className,
  children,
}: {
  href: string
  variant?: Variant
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: variants[variant] }), className)}
    >
      {children}
    </Link>
  )
}

export function HardButton({
  variant = "cta",
  className,
  type = "button",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <Button
      type={type}
      variant={variants[variant]}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}
