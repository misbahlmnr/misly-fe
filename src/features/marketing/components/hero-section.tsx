import { Zap } from "lucide-react";

import { ShortenerForm } from "@/features/links";
import { UnderlineMark } from "@/features/marketing/components/underline-mark";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute top-10 right-10 -z-10 size-64 animate-pulse rounded-full bg-primary-fixed opacity-50 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 size-72 rounded-full bg-secondary-fixed opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-container-max px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="hero-fade btn-hard-shadow mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-2 text-sm font-semibold ink-border hover:translate-x-0 hover:translate-y-0">
            <Zap className="size-4 text-primary" strokeWidth={2} />
            <span>The fastest way to manage your links.</span>
          </div>

          <h1 className="hero-fade delay-100 text-5xl leading-[1.1] font-extrabold text-on-surface md:text-7xl">
            Shorten your links,
            <br />
            <UnderlineMark>grow your brand.</UnderlineMark>
          </h1>

          <p className="hero-fade delay-200 mx-auto max-w-2xl font-body text-xl text-on-surface-variant md:text-2xl">
            Simple, powerful link management for freelancers and professionals.
            Turn long, ugly URLs into trackable, branded links in seconds.
          </p>

          <div className="hero-fade delay-300">
            <ShortenerForm />
            <p className="mt-4 text-sm text-on-surface-variant">
              By clicking Shorten Now, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
