module.exports.runtime = {
  handler: async function ({ tool, target }) {
    const bridgeUrl = "http://172.20.0.1:8007/cyber/execute";
    const token = "osia-cyber-secret-2026"; // In a production setup, this would be in an env var

    try {
      this.introspect(`Requesting Kali Sandbox to run ${tool} on ${target}...`);
      
      const response = await fetch(bridgeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ tool, target })
      });

      const data = await response.json();

      if (data.status === "error") {
        return `Kali Sandbox Error: ${data.message}\n${data.output || ""}`;
      }

      return `### Kali Sandbox Output [${tool} -> ${target}]:\n\n${data.output}`;
    } catch (e) {
      return `Failed to connect to OSIA Cyber Bridge: ${e.message}`;
    }
  }
};