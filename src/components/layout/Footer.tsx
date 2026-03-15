"use client";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const LINKS = {
  nav: [
    { href: "/",         label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog",     label: "Blog" },
    { href: "/contact",  label: "Contact" },
  ],
  social: [
    { href: "https://github.com/fatwaanugerah21",              label: "GitHub",   icon: Github },
    { href: "https://www.linkedin.com/in/fatwa-anugerah/",     label: "LinkedIn", icon: Linkedin },
    { href: "mailto:fatwaanugerah0421@gmail.com",              label: "Email",    icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-6xl section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-display text-xl font-bold">
              <span className="text-gradient">Fatwa</span>{" "}
              <span className="text-navy-900 dark:text-white">Anugerah</span>
            </p>
            <p className="text-sm text-navy-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Senior Full Stack Engineer building scalable real-time systems for
              global teams. Open to remote opportunities in APAC, EU &amp; beyond.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 dark:text-slate-500 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {LINKS.nav.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-navy-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/cv/Fatwa_Anugerah_CV_Final.pdf"
                  download
                  className="inline-flex items-center gap-1 text-sm text-navy-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Download CV <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 dark:text-slate-500 mb-4">
              Connect
            </p>
            <ul className="space-y-2">
              {LINKS.social.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-navy-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-100 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Fatwa Anugerah Nasir. All rights reserved.</p>
          <p>Built with Next.js · Deployed on VPS</p>
        </div>
      </div>
    </footer>
  );
}
