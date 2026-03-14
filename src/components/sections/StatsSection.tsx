"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const num = parseInt(target.replace(/\D/g, ""));
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <span ref={ref}>
      {count}
      {target.includes("+") ? "+" : ""}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 border-y border-navy-100 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-900/30">
      <div className="mx-auto max-w-6xl section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-4xl font-bold text-accent mb-1">
                <CountUp target={value} />
              </p>
              <p className="text-sm text-navy-500 dark:text-slate-400">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
