"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Clock } from "lucide-react";
import type { Project, GitHubRepo, GitHubStats } from "@/types";
import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionData = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

interface Props {
  featuredProjects: Project[];
  githubRepos: GitHubRepo[];
  githubStats: GitHubStats;
  contributions?: ContributionData;
}

const DAYS = ["Sun", "", "Tue", "", "Thu", "", "Sat"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2)  return 1;
  if (count <= 5)  return 2;
  if (count <= 9)  return 3;
  return 4;
}

const LEVEL_CLASSES = [
  "bg-navy-100 dark:bg-navy-800",
  "bg-accent/20",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

function ContributionGraph({ data }: { data: ContributionData }) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  // Build month labels from week data
  const monthLabels: { label: string; weekIndex: number }[] = [];
  data.weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const d = new Date(firstDay.date);
    if (i === 0 || d.getDate() <= 7) {
      const label = MONTHS[d.getMonth()];
      if (!monthLabels.length || monthLabels[monthLabels.length - 1].label !== label) {
        monthLabels.push({ label, weekIndex: i });
      }
    }
  });

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div>
          <p className="text-sm font-semibold text-navy-900 dark:text-white">
            Contribution Activity
          </p>
          <p className="text-xs text-navy-400 dark:text-slate-500 mt-0.5">
            {data.totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "fatwaanugerah21"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-navy-500 dark:text-slate-400 hover:text-accent transition-colors"
        >
          <Github size={13} />
          View on GitHub
        </a>
      </div>

      {/* Graph container */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Month labels */}
          <div className="flex mb-1.5 ml-8">
            {data.weeks.map((_, wi) => {
              const match = monthLabels.find((m) => m.weekIndex === wi);
              return (
                <div
                  key={wi}
                  className="flex-shrink-0 w-[13px] mr-[3px] text-[10px] text-navy-400 dark:text-slate-500"
                >
                  {match ? match.label : ""}
                </div>
              );
            })}
          </div>

          {/* Day labels + grid */}
          <div className="flex gap-0">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-[3px] mr-2 mt-0.5">
              {DAYS.map((day, i) => (
                <div
                  key={i}
                  className="w-5 h-[13px] text-[9px] text-navy-400 dark:text-slate-500 leading-none flex items-center justify-end pr-0.5"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution cells */}
            <div className="flex gap-[3px] relative">
              {data.weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {/* Pad start of first week */}
                  {wi === 0 &&
                    Array.from({ length: 7 - week.contributionDays.length }).map((_, pi) => (
                      <div key={`pad-${pi}`} className="w-[13px] h-[13px]" />
                    ))}
                  {week.contributionDays.map((day) => (
                    <motion.div
                      key={day.date}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: wi * 0.004 + 0.1, duration: 0.15 }}
                      className={cn(
                        "w-[13px] h-[13px] rounded-[2px] cursor-pointer transition-all hover:ring-2 hover:ring-accent hover:ring-offset-1 hover:ring-offset-white dark:hover:ring-offset-navy-900",
                        LEVEL_CLASSES[getLevel(day.contributionCount)]
                      )}
                      onMouseEnter={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        const parent = (e.target as HTMLElement)
                          .closest(".overflow-x-auto")
                          ?.getBoundingClientRect();
                        setTooltip({
                          text:
                            day.contributionCount === 0
                              ? `No contributions on ${day.date}`
                              : `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${day.date}`,
                          x: rect.left - (parent?.left ?? 0) + rect.width / 2,
                          y: rect.top - (parent?.top ?? 0) - 8,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}
                </div>
              ))}

              {/* Tooltip */}
              {tooltip && (
                <div
                  className="absolute z-10 px-2 py-1 text-[10px] font-medium bg-navy-900 dark:bg-white text-white dark:text-navy-900 rounded-md pointer-events-none whitespace-nowrap shadow-lg -translate-x-1/2 -translate-y-full"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {tooltip.text}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-navy-900 dark:border-t-white" />
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[10px] text-navy-400 dark:text-slate-500">Less</span>
            {LEVEL_CLASSES.map((cls, i) => (
              <div key={i} className={cn("w-[13px] h-[13px] rounded-[2px]", cls)} />
            ))}
            <span className="text-[10px] text-navy-400 dark:text-slate-500">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsClient({ featuredProjects, githubRepos, githubStats, contributions }: Props) {
  const [filter, setFilter] = useState<string>("All");

  const allLangs = [
    "All",
    ...Array.from(new Set(githubRepos.map((r) => r.language).filter(Boolean) as string[])),
  ];

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
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
          >
            {[
              { label: "Public Repos",  value: githubStats.totalRepos },
              { label: "Total Stars",   value: githubStats.totalStars },
              { label: "Total Forks",   value: githubStats.totalForks },
              { label: "Contributions", value: contributions
                  ? contributions.totalContributions.toLocaleString()
                  : `${githubStats.contributions}+` },
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

        {/* Contribution Graph */}
        {contributions && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-16"
          >
            <ContributionGraph data={contributions} />
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
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono rounded bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-slate-400 border border-navy-100 dark:border-navy-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-3 border-t border-navy-50 dark:border-navy-800">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-slate-500 hover:text-accent transition-colors"
                  >
                    <Github size={13} /> Source
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-slate-500 hover:text-accent transition-colors"
                  >
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
                      {new Date(repo.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
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
