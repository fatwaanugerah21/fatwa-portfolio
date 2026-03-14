import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl section-padding">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-navy-500 dark:text-slate-400 hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={15} />
          Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white leading-tight mb-5">
          {post.title}
        </h1>

        <div className="flex items-center gap-5 text-sm text-navy-400 dark:text-slate-500 mb-10 pb-10 border-b border-navy-100 dark:border-navy-800">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {post.readingTime}
          </span>
        </div>

        {/* Content */}
        <article className="prose prose-navy dark:prose-invert prose-sm sm:prose max-w-none
          prose-headings:font-display prose-headings:font-bold
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-code:font-mono prose-code:text-sm
          prose-pre:bg-navy-900 dark:prose-pre:bg-navy-950
          prose-blockquote:border-l-accent">
          {post.content}
        </article>

        {/* Author */}
        <div className="mt-16 pt-8 border-t border-navy-100 dark:border-navy-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-amber-700 flex items-center justify-center text-white font-bold">
            FA
          </div>
          <div>
            <p className="font-semibold text-navy-900 dark:text-white">Fatwa Anugerah Nasir</p>
            <p className="text-sm text-navy-500 dark:text-slate-400">
              Senior Full Stack Engineer
            </p>
          </div>
          <Link
            href="/contact"
            className="ml-auto text-sm text-accent hover:underline"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
