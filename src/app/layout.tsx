import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fatwaanugerah.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fatwa Anugerah Nasir — Senior Full Stack Engineer",
    template: "%s | Fatwa Anugerah",
  },
  description:
    "Senior Full Stack Engineer with 5+ years building scalable real-time systems, trading platforms, and cloud-native apps. TypeScript, Node.js, Next.js, Flutter.",
  keywords: [
    "Full Stack Engineer", "TypeScript", "Node.js", "Next.js", "Flutter",
    "WebSocket", "Remote Engineer", "APAC", "EU", "Trading Systems",
  ],
  authors: [{ name: "Fatwa Anugerah Nasir", url: SITE_URL }],
  creator: "Fatwa Anugerah Nasir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Fatwa Anugerah Nasir",
    title: "Fatwa Anugerah Nasir — Senior Full Stack Engineer",
    description:
      "Building scalable real-time systems, trading platforms, and cloud-native apps.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatwa Anugerah Nasir — Senior Full Stack Engineer",
    description: "Building scalable real-time systems for global teams.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable} font-body antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-white dark:bg-navy-950 text-navy-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
