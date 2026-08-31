import { Reveal } from "@/features/marketing/components/reveal"
import { brands } from "@/features/marketing/constants"

export function SocialProof() {
  return (
    <Reveal
      as="section"
      className="mb-24 w-full border-y-2 border-on-surface bg-surface-container-low"
    >
      <div className="mx-auto max-w-container-max px-4 py-12 md:px-8">
        <p className="font-headline mb-8 text-center text-lg font-bold text-on-surface-variant">
          Built for people who want their links to work harder
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 md:gap-16">
          {brands.map((brand, index) => (
            <div
              key={brand}
              className="stagger-item text-2xl font-black tracking-tighter"
              style={{ "--stagger": `${index * 80}ms` } as React.CSSProperties}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
