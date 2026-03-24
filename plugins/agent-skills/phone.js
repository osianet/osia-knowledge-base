/**
 * OSIA Physical Intelligence (PHINT) Skill
 * Allows agents to request a live screenshot from David Thorne's physical phone.
 */
const phoneIntelligence = {
  name: "osia-physical-intelligence",
  description: "Requests a live screenshot from David Thorne's physical Android phone to capture real-time app data or social media posts.",
  arguments: [],
  handler: async () => {
    const bridgeUrl = "http://172.20.0.1:8006/phone/execute";

    try {
      const response = await fetch(bridgeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "screenshot" }),
      });

      if (!response.ok) {
        throw new Error(`Phone Bridge error: ${response.statusText}`);
      }

      return "Successfully triggered a physical screenshot on David's phone. The file has been saved to the OSIA secure archives.";
    } catch (error) {
      return `Failed to reach the physical phone: ${error.message}`;
    }
  },
};

module.exports = { phoneIntelligence };
