"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Clock } from "lucide-react";
import type { Project, GitHubRepo, GitHubStats } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  featuredProjects: Project[];
  githubRepos: GitHubRepo[];
  githubStats: GitHubStats;
}

export function ProjectsClient({ featuredProjects, githubRepos, githubStats }: Props) {
  const [filter, setFilter] = useState<string>("All");

  const allLangs = ["All", ...Array.from(new Set(githubRepos.map((r) => r.language).filter(Boolean) as string[]))];

  const filtered =
    filter === "All"
      ? githubRepos
      : githubRepos.filter((r) => r.language === filter);

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Portfolio</p>
          <h1 className="font-display text-5xl font-bold text-navy-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-navy-600 dark:text-slate-400 max-w-xl">
            A selection of systems I&apos;ve built — from real-time trading platforms to
            cross-platform mobile apps.
          </p>
        </motion.div>

        {/* GitHub stats bar */}
        {githubStats.totalRepos > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
          >
            {[
              { label: "Public Repos",   value: githubStats.totalRepos },
              { label: "Total Stars",    value: githubStats.totalStars },
              { label: "Total Forks",    value: githubStats.totalForks },
              { label: "Contributions",  value: `${githubStats.contributions}+` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-navy-50 dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-800 p-4 text-center"
              >
                <p className="font-display text-2xl font-bold text-accent">{value}</p>
                <p className="text-xs text-navy-500 dark:text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Featured */}
        <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white mb-6">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {featuredProjects.map((p, i) => (
            <motion.div
              key={p.id}
              id={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-6 flex flex-col card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent font-medium">
                  Featured
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-navy-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs font-mono rounded bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-slate-400 border border-navy-100 dark:border-navy-700">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-3 border-t border-navy-50 dark:border-navy-800">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-slate-500 hover:text-accent transition-colors">
                    <Github size={13} /> Source
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-slate-500 hover:text-accent transition-colors">
                    <ExternalLink size={13} /> Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub repos */}
        {githubRepos.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white">
                Open Source
              </h2>
              <div className="flex flex-wrap gap-2">
                {allLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setFilter(lang)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
                      filter === lang
                        ? "bg-accent text-white border-accent"
                        : "border-navy-200 dark:border-navy-700 text-navy-600 dark:text-slate-400 hover:border-accent hover:text-accent"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group bg-white dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-800 p-5 card-hover flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-navy-900 dark:text-white group-hover:text-accent transition-colors truncate pr-2">
                      {repo.name}
                    </h3>
                    <Github size={14} className="text-navy-300 dark:text-navy-600 shrink-0" />
                  </div>
                  <p className="text-xs text-navy-500 dark:text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-navy-400 dark:text-slate-600">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock size={11} />
                      {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
