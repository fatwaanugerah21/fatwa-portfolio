"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/data";

export function FeaturedProjectsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-end justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Work
            </p>
            <h2 className="font-display text-4xl font-bold text-navy-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
          >
            View all projects <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-6 flex flex-col card-hover"
            >
              {/* Number */}
              <p className="font-mono text-5xl font-bold text-navy-50 dark:text-navy-800 mb-4 select-none group-hover:text-accent/10 transition-colors">
                0{i + 1}
              </p>

              <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-navy-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono rounded bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-slate-400 border border-navy-100 dark:border-navy-700"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-2 py-0.5 text-xs font-mono rounded bg-navy-50 dark:bg-navy-800 text-navy-400 dark:text-slate-500">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-navy-50 dark:border-navy-800">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-slate-500 hover:text-accent transition-colors"
                  >
                    <Github size={13} />
                    Source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-slate-500 hover:text-accent transition-colors"
                  >
                    <ExternalLink size={13} />
                    Live
                  </a>
                )}
                <Link
                  href={`/projects#${project.id}`}
                  className="ml-auto flex items-center gap-1 text-xs font-medium text-accent hover:gap-2 transition-all"
                >
                  Details <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
