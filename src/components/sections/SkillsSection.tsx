"use client";
import { motion } from "framer-motion";
import { SKILLS_BY_CATEGORY } from "@/lib/data";

export function SkillsSection() {
  return (
    <section className="py-24 bg-navy-50/50 dark:bg-navy-900/30">
      <div className="mx-auto max-w-6xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Expertise
          </p>
          <h2 className="font-display text-4xl font-bold text-navy-900 dark:text-white">
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_BY_CATEGORY.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-6 card-hover"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-navy-50 dark:bg-navy-800 text-navy-700 dark:text-slate-300 border border-navy-100 dark:border-navy-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
