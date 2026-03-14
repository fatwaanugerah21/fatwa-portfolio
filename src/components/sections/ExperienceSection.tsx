"use client";
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Career
          </p>
          <h2 className="font-display text-4xl font-bold text-navy-900 dark:text-white">
            Professional Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-navy-200 dark:via-navy-700 to-transparent" />

          <div className="space-y-12">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-2 md:left-6 top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-white dark:border-navy-950 shadow-sm" />

                <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-6 card-hover">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-navy-900 dark:text-white leading-tight">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                          <Briefcase size={13} />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-navy-400 dark:text-slate-500">
                          <MapPin size={11} />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-navy-400 dark:text-slate-500 bg-navy-50 dark:bg-navy-800 px-3 py-1.5 rounded-lg whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-sm text-navy-600 dark:text-slate-400 leading-relaxed"
                      >
                        <span className="text-accent mt-1.5 shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
