import type { Metadata } from "next";
import { getGitHubRepos, getGitHubStats, getContributions } from "@/lib/github";
import { FEATURED_PROJECTS } from "@/lib/data";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured projects and open-source work by Fatwa Anugerah Nasir — trading systems, real-time platforms, mobile apps.",
};

export default async function ProjectsPage() {
  const [githubRepos, githubStats, contributions] = await Promise.all([
    getGitHubRepos(),
    getGitHubStats(),
    getContributions(),
  ]);

  return (
    <ProjectsClient
      featuredProjects={FEATURED_PROJECTS}
      githubRepos={githubRepos}
      githubStats={githubStats}
      contributions={contributions}
    />
  );
}
