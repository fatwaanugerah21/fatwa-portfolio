"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, MapPin, Download } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const TECH_BADGES = [
  "TypeScript", "Go", "Java", "Python", "React.js", "Next.js", "React Native", "Flutter", "TailwindCSS", "Sass", "Styled Components",
  "Real-Time", "Event-Driven", "Background Services", "WebSocket", "AWS", "Docker", "PostgreSQL", "MySQL", "Redis", "MongoDB", "DynamoDB", "Fastify", "Express.js", "Gin", "Flask", "REST API", "GraphQL"
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid + radial */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-60 dark:opacity-40" />
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Floating orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-navy-400/20 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl section-padding w-full pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Status badge */}
          <motion.div {...fadeUp(0.1)} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for remote opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.2)} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            <span className="text-navy-900 dark:text-white">Building </span>
            <span className="text-gradient-animate">real-time</span>
            <br />
            <span className="text-navy-900 dark:text-white">systems that</span>
            <br />
            <span className="text-navy-900 dark:text-white">scale.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p {...fadeUp(0.3)} className="text-lg text-navy-600 dark:text-slate-400 leading-relaxed mb-3 max-w-xl">
            Senior Full Stack Engineer with <strong className="text-navy-900 dark:text-white font-semibold">5+ years</strong> architecting
            scalable web, mobile &amp; real-time crypto trading systems for global teams.
          </motion.p>

          <motion.div {...fadeUp(0.35)} className="flex items-center gap-2 text-sm text-navy-500 dark:text-slate-500 mb-8">
            <MapPin size={13} />
            <span>Indonesia · Open to APAC, EU &amp; Global Remote</span>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 dark:bg-white text-white dark:text-navy-900 text-sm font-semibold hover:bg-navy-700 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-navy-900/20"
            >
              View My Work <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-slate-300 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Get In Touch
            </Link>
            <a
              href="/cv/Fatwa_Anugerah_CV_Final.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 text-accent text-sm font-semibold hover:bg-accent/20 transition-colors"
            >
              <Download size={15} />
              Download CV
            </a>
          </motion.div>

          {/* Tech badges */}
          <motion.div {...fadeUp(0.5)}>
            <p className="text-xs text-navy-400 dark:text-slate-500 uppercase tracking-widest mb-3 font-medium">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {TECH_BADGES.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-navy-50 dark:bg-navy-800 text-navy-700 dark:text-slate-300 border border-navy-100 dark:border-navy-700"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-navy-200 dark:to-navy-700" />
          <a
            href="https://github.com/fatwaanugerah21"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-navy-400 dark:text-slate-500 hover:text-accent transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/fatwa-anugerah/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-navy-400 dark:text-slate-500 hover:text-accent transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <div className="w-px h-16 bg-gradient-to-b from-navy-200 dark:from-navy-700 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
