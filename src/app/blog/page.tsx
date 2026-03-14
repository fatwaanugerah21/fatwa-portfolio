import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Tag, Rss } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on full-stack engineering, real-time systems, TypeScript, and distributed architecture.",
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl section-padding">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Writing
            </p>
            <h1 className="font-display text-5xl font-bold text-navy-900 dark:text-white">
              Blog
            </h1>
            <p className="text-navy-600 dark:text-slate-400 mt-3 max-w-xl">
              Thoughts on engineering, architecture, and building systems at scale.
            </p>
          </div>
          <a
            href="/blog/rss.xml"
            className="flex items-center gap-2 text-sm text-navy-500 dark:text-slate-400 hover:text-accent transition-colors"
          >
            <Rss size={15} />
            RSS Feed
          </a>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-navy-400 dark:text-slate-500">
            <p className="font-display text-2xl font-bold mb-2">Coming soon</p>
            <p className="text-sm">First posts are on their way.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-800 p-7 card-hover"
              >
                {post.featured && (
                  <span className="inline-block mb-3 px-2.5 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                    Featured
                  </span>
                )}
                <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-navy-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-navy-400 dark:text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readingTime}
                  </span>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="flex items-center gap-1">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
