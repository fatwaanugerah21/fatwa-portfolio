"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-navy-50 dark:bg-navy-900 border border-navy-200 dark:border-navy-700 text-navy-900 dark:text-white text-sm placeholder:text-navy-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-navy-600 dark:text-slate-400 mb-1.5">
            Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy-600 dark:text-slate-400 mb-1.5">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-navy-600 dark:text-slate-400 mb-1.5">
          Subject *
        </label>
        <select name="subject" value={form.subject} onChange={handleChange} required className={inputClass}>
          <option value="">Select a topic...</option>
          <option value="Job Opportunity">Job Opportunity</option>
          <option value="Freelance Project">Freelance Project</option>
          <option value="Technical Collaboration">Technical Collaboration</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-navy-600 dark:text-slate-400 mb-1.5">
          Message *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell me about your project or opportunity..."
          className={cn(inputClass, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 dark:bg-white text-white dark:text-navy-900 text-sm font-semibold hover:bg-navy-700 dark:hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? (
          <><Loader2 size={16} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={15} /> Send Message</>
        )}
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm"
          >
            <CheckCircle size={16} />
            Message sent! I&apos;ll get back to you within 24 hours.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
          >
            <AlertCircle size={16} />
            Something went wrong. Please email me directly.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
