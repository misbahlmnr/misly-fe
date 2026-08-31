"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { HardLiftCard } from "@/components/shared/hard-lift-card"
import { LandingContainer } from "@/features/marketing/components/landing-container"
import { Reveal } from "@/features/marketing/components/reveal"
import { faqs } from "@/features/marketing/constants"
import { cn } from "@/lib/utils"

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Reveal
      as="section"
      className="w-full border-t-2 border-on-surface bg-surface-container-low"
    >
      <LandingContainer>
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-on-surface md:text-5xl">
            Your questions, answered
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl items-start gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const open = openId === faq.question
            return (
              <HardLiftCard
                key={faq.question}
                className="stagger-item rounded-xl"
                innerClassName="rounded-xl bg-surface-container-lowest p-6 ink-border"
                style={{ "--stagger": `${index * 100}ms` } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : faq.question)}
                >
                  <span className="text-lg font-bold">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 transition-transform duration-300",
                      open && "rotate-180"
                    )}
                    strokeWidth={2}
                  />
                </button>
                {open ? (
                  <p className="mt-4 text-on-surface-variant">{faq.answer}</p>
                ) : null}
              </HardLiftCard>
            )
          })}
        </div>
      </LandingContainer>
    </Reveal>
  )
}
