"use client"

import { useState } from "react"

import { HardButton } from "@/components/shared/hard-button"
import { Reveal } from "@/features/marketing/components/reveal"
import { LandingContainer } from "@/features/marketing/components/landing-container"
import { testimonials } from "@/features/marketing/constants"
import { cn } from "@/lib/utils"

const PREVIEW_COUNT = 3

export function TestimonialsSection() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? testimonials : testimonials.slice(0, PREVIEW_COUNT)

  return (
    <Reveal
      as="section"
      className="w-full border-t-2 border-on-surface bg-surface-container-lowest"
    >
      <LandingContainer>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-on-surface md:text-5xl">
            Hundreds of people already trust us
          </h2>
          <p className="text-xl text-on-surface-variant">
            But don&apos;t just take our word for it.
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {visible.map((item, index) => (
            <article
              key={item.name}
              className="stagger-item space-y-4 rounded-2xl bg-surface p-6 ink-border card-hard-shadow"
              style={{ "--stagger": `${index * 100}ms` } as React.CSSProperties}
            >
              <p className="text-on-surface-variant italic">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-4 border-t-2 border-on-surface/10 pt-4">
                <div
                  className={cn("size-12 rounded-full ink-border", item.avatar)}
                  aria-hidden
                />
                <div>
                  <h5 className="font-bold">{item.name}</h5>
                  <span className="text-sm text-on-surface-variant">
                    {item.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!expanded ? (
          <div className="text-center">
            <HardButton
              variant="muted"
              className="px-8 py-3 hover:translate-x-0 hover:translate-y-0"
              onClick={() => setExpanded(true)}
            >
              Show more
            </HardButton>
          </div>
        ) : null}
      </LandingContainer>
    </Reveal>
  )
}
