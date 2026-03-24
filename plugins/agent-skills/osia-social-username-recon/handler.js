module.exports.runtime = {
  handler: async function ({ username }) {
    const targets = [
      { name: "GitHub", url: `https://github.com/${username}` },
      { name: "Twitter/X", url: `https://x.com/${username}` },
      { name: "Instagram", url: `https://instagram.com/${username}` },
      { name: "Reddit", url: `https://reddit.com/user/${username}` },
      { name: "Bluesky", url: `https://bsky.app/profile/${username}.bsky.social` }
    ];

    const results = [];
    this.introspect(`Starting social recon for user: ${username}...`);

    for (const target of targets) {
      try {
        const response = await fetch(target.url, { method: 'HEAD', redirect: 'follow' });
        if (response.status === 200) {
          results.push({ platform: target.name, status: "FOUND", url: target.url });
        } else {
          results.push({ platform: target.name, status: "NOT_FOUND" });
        }
      } catch (e) {
        results.push({ platform: target.name, status: "ERROR", message: e.message });
      }
    }

    return JSON.stringify({ target: username, profiles: results }, null, 2);
  }
};