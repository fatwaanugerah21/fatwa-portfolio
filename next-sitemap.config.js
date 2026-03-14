/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://fatwaanugerah.dev",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
