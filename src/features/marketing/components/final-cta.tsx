import { ArrowRight } from "lucide-react"

import { HardLink } from "@/components/shared/hard-button"
import { Reveal } from "@/features/marketing/components/reveal"

export function FinalCta() {
  return (
    <Reveal
      as="section"
      className="relative w-full overflow-hidden border-t-2 border-on-surface text-center"
    >
      <div className="absolute top-0 right-0 -z-10 size-96 rounded-full bg-primary-fixed opacity-30 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 size-96 rounded-full bg-secondary-fixed opacity-30 blur-3xl" />
      <div className="relative mx-auto max-w-container-max px-4 py-32 md:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="text-5xl leading-tight font-extrabold text-on-surface md:text-6xl">
            Get closer to your audience and customers today
          </h2>
          <p className="text-xl text-on-surface-variant">
            Connect with your audience using branded links, QR Codes, and
            Link-in-bio tools that give them a better experience.
          </p>
          <HardLink
            href="#"
            variant="primary"
            className="mt-8 px-10 py-5 text-lg"
          >
            Start for free
            <ArrowRight className="size-5" strokeWidth={2.5} />
          </HardLink>
        </div>
      </div>
    </Reveal>
  )
}
