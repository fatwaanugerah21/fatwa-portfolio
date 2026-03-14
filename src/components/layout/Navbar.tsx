"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/",          label: "Home" },
  { href: "/projects",  label: "Projects" },
  { href: "/blog",      label: "Blog" },
  { href: "/contact",   label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [mounted, setMounted]     = useState(false);
  const { theme, setTheme }       = useTheme();
  const pathname                  = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-sm shadow-navy-900/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl section-padding">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-gradient">F</span>
              <span className="text-navy-900 dark:text-white">A</span>
            </span>
            <span className="hidden sm:block text-sm font-medium text-navy-600 dark:text-slate-400 group-hover:text-accent transition-colors">
              Fatwa Anugerah
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === href
                    ? "text-accent"
                    : "text-navy-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white"
                )}
              >
                {pathname === href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-navy-50 dark:bg-navy-800 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-navy-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Download CV */}
            <a
              href="/Fatwa_Anugerah_CV_Final.pdf"
              download
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              <Download size={14} />
              CV
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-navy-600 dark:text-slate-400 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 space-y-1 border-t border-navy-100 dark:border-navy-800 mt-2 pt-4">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      pathname === href
                        ? "bg-navy-50 dark:bg-navy-800 text-accent"
                        : "text-navy-600 dark:text-slate-400 hover:bg-navy-50 dark:hover:bg-navy-800"
                    )}
                  >
                    {label}
                  </Link>
                ))}
                <a
                  href="/Fatwa_Anugerah_CV_Final.pdf"
                  download
                  className="flex items-center gap-2 mx-4 mt-3 px-4 py-2.5 text-sm font-medium bg-accent text-white rounded-lg"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
