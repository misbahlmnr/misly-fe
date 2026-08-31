import { PricingSection } from "@/features/billing"
import { AnalyticsShowcase } from "@/features/marketing/components/analytics-showcase"
import { BenefitsSection } from "@/features/marketing/components/benefits-section"
import { FaqSection } from "@/features/marketing/components/faq-section"
import { FeatureShowcase } from "@/features/marketing/components/feature-showcase"
import { FinalCta } from "@/features/marketing/components/final-cta"
import { HeroSection } from "@/features/marketing/components/hero-section"
import { SocialProof } from "@/features/marketing/components/social-proof"
import { TestimonialsSection } from "@/features/marketing/components/testimonials-section"

export function MarketingHomePage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <FeatureShowcase />
      <AnalyticsShowcase />
      <BenefitsSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
