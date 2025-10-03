import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
}

interface GitHubProjectsProps {
  username: string;
}

export default function GitHubProjects({ username }: GitHubProjectsProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();
        setRepos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>GitHub Projects</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {repos.map((repo) => (
          <li key={repo.id} style={{ marginBottom: "1rem" }}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#0366d6",
              }}
            >
              {repo.name}
            </a>
            {repo.description && (
              <p style={{ margin: "0.25rem 0" }}>{repo.description}</p>
            )}
            <small>
              ⭐ {repo.stargazers_count} • {repo.language || "Unknown"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
