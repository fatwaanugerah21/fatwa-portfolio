import { GitHubRepo, GitHubStats } from "@/types";

const GITHUB_API = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "fatwaanugerah21";

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=100&type=public`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("GitHub API error");
    const repos: GitHubRepo[] = await res.json();
    return repos
      .filter((r) => !r.name.includes(USERNAME) && r.description)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch {
    return [];
  }
}

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=public`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    const user = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

    return {
      totalRepos: user.public_repos || repos.length,
      totalStars,
      totalForks,
      contributions: user.public_repos * 12,
    };
  } catch {
    return { totalRepos: 0, totalStars: 0, totalForks: 0, contributions: 0 };
  }
}

// ── Contribution types ────────────────────────────────────────────

export type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionData = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

// ── GraphQL query ─────────────────────────────────────────────────

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function getContributions(): Promise<ContributionData> {
  // GraphQL requires an auth token — fall back to empty data gracefully
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set — skipping contribution graph.");
    return { totalContributions: 0, weeks: [] };
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { username: USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);

    const json = await res.json();

    if (json.errors?.length) {
      throw new Error(json.errors[0].message);
    }

    return json.data.user.contributionsCollection.contributionCalendar as ContributionData;
  } catch (err) {
    console.error("getContributions failed:", err);
    return { totalContributions: 0, weeks: [] };
  }
}