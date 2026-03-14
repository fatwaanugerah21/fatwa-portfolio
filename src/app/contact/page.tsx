import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Github, Linkedin, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Fatwa Anugerah Nasir — open to senior remote full-stack engineering roles in APAC, EU & globally.",
};

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "fatwaanugerah0421@gmail.com",
    href: "mailto:fatwaanugerah0421@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/fatwa-anugerah",
    href: "https://www.linkedin.com/in/fatwa-anugerah/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/fatwaanugerah21",
    href: "https://github.com/fatwaanugerah21",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Indonesia · Open to APAC, EU & Global Remote",
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Immediately available",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl section-padding">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Contact
          </p>
          <h1 className="font-display text-5xl font-bold text-navy-900 dark:text-white mb-4">
            Let&apos;s work together.
          </h1>
          <p className="text-navy-600 dark:text-slate-400 max-w-lg">
            Open to senior remote roles, freelance projects, and technical
            collaborations. I typically respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 rounded-xl bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-navy-400 dark:text-slate-500 mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-navy-800 dark:text-slate-200 hover:text-accent transition-colors break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-navy-800 dark:text-slate-200">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
