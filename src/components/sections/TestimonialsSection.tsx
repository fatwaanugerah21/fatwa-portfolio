"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsSection() {
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
            Social Proof
          </p>
          <h2 className="font-display text-4xl font-bold text-navy-900 dark:text-white">
            What People Say
          </h2>
        </motion.div>
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-8 card-hover relative overflow-hidden"
            >
              {/* Big quote decoration */}
              <Quote
                size={64}
                className="absolute -top-2 -right-2 text-navy-50 dark:text-navy-800 rotate-180"
              />

              <p className="text-navy-700 dark:text-slate-300 text-sm leading-relaxed mb-6 relative">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar initials */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-amber-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-navy-500 dark:text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
                {t.linkedIn && (
                  <a
                    href={t.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-accent hover:underline"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }
          }
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-navy-400 dark:text-slate-500 mt-8"
        >
          More recommendations on{" "}
          <a
            href="https://www.linkedin.com/in/fatwa-anugerah/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            LinkedIn
          </a>
        </motion.p>
      </div >
    </section >
  );
}
