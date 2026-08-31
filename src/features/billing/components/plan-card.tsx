import { CircleCheck } from "lucide-react"

import { HardLink } from "@/components/shared/hard-button"
import { HardLiftCard } from "@/components/shared/hard-lift-card"
import { cn } from "@/lib/utils"

type PlanCardProps = {
  name: string
  description: string
  price: number
  cta: string
  features: readonly string[]
  featured?: boolean
}

export function PlanCard({
  name,
  description,
  price,
  cta,
  features,
  featured = false,
}: PlanCardProps) {
  return (
    <HardLiftCard
      className={cn(
        "rounded-[32px]",
        featured ? "z-20 md:-mt-4" : "mt-4 md:mt-12"
      )}
      innerClassName={cn(
        "relative rounded-[32px] p-8 ink-border",
        featured
          ? "bg-primary-container text-on-primary-container"
          : "bg-surface-container-lowest"
      )}
    >
      {featured ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tertiary-fixed px-4 py-1.5 text-sm font-bold text-on-tertiary-fixed ink-border shadow-hard">
          Most Popular
        </div>
      ) : null}

      <h3
        className={cn(
          "font-headline mb-2 font-bold",
          featured ? "text-3xl" : "text-2xl"
        )}
      >
        {name}
      </h3>
      <p
        className={cn(
          "mb-6 h-10 text-sm",
          featured ? "text-inverse-primary" : "text-on-surface-variant"
        )}
      >
        {description}
      </p>

      <div className="mb-8">
        <span
          className={cn(
            "font-display font-extrabold",
            featured ? "text-6xl" : "text-5xl"
          )}
        >
          ${price}
        </span>
        <span
          className={cn(
            "font-medium",
            featured ? "text-inverse-primary" : "text-on-surface-variant"
          )}
        >
          /mo
        </span>
      </div>

      <ul className="mb-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CircleCheck
              className={cn(
                "size-5 shrink-0",
                featured ? "text-secondary-fixed" : "text-secondary"
              )}
              strokeWidth={2}
              fill="currentColor"
              fillOpacity={0.2}
            />
            <span className={cn("text-sm", featured && "font-medium")}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <HardLink href="#" className="w-full rounded-xl py-4 text-lg">
        {cta}
      </HardLink>
    </HardLiftCard>
  )
}
