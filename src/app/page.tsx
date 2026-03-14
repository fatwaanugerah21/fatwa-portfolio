import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ExperienceSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      {/* <TestimonialsSection /> */}

      {/* CTA Banner */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl section-padding">
          <div className="relative rounded-3xl bg-navy-900 dark:bg-navy-800 overflow-hidden p-12 text-center">
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
            <div className="relative">
              <h2 className="font-display text-4xl font-bold text-white mb-4">
                Let&apos;s build something great.
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Open to senior remote roles in APAC, EU &amp; globally. Let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-amber-600 transition-colors shadow-lg shadow-accent/30"
              >
                Get In Touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
