module.exports.runtime = {
  handler: async function ({ repo_path }) {
    try {
      this.introspect(`Analyzing repository: ${repo_path}...`);
      const response = await fetch(`https://api.github.com/repos/${repo_path}`, {
          headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      const data = await response.json();
      
      if (data.message === "Not Found") {
        return `Repository ${repo_path} not found.`;
      }
      
      const stats = {
        full_name: data.full_name,
        description: data.description,
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language,
        license: data.license ? data.license.spdx_id : "N/A",
        last_update: data.updated_at,
        open_issues: data.open_issues_count
      };
      
      return [
        `Repository: ${stats.full_name}`,
        `Description: ${stats.description || "N/A"}`,
        `Language: ${stats.language || "N/A"}`,
        `Stars: ${stats.stars}`,
        `Forks: ${stats.forks}`,
        `Open Issues: ${stats.open_issues}`,
        `License: ${stats.license}`,
        `Last Updated: ${stats.last_update}`,
      ].join("\n");
    } catch (e) {
      return `Error fetching repo intel: ${e.message}`;
    }
  }
};