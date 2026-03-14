import type { Metadata } from "next";
import { getGitHubRepos, getGitHubStats } from "@/lib/github";
import { FEATURED_PROJECTS } from "@/lib/data";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured projects and open-source work by Fatwa Anugerah Nasir — trading systems, real-time platforms, mobile apps.",
};

export default async function ProjectsPage() {
  const [githubRepos, githubStats] = await Promise.all([
    getGitHubRepos(),
    getGitHubStats(),
  ]);

  return (
    <ProjectsClient
      featuredProjects={FEATURED_PROJECTS}
      githubRepos={githubRepos}
      githubStats={githubStats}
    />
  );
}
