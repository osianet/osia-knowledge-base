/**
 * OSIA Intelligence Broadcast Skill
 * Allows agents to send finished reports directly to the Signal Briefings group.
 */
const broadcastToSignal = {
  name: "osia-report-broadcast",
  description: "Broadcasts a finished intelligence report or update to the OSIA Briefings Signal group.",
  arguments: [
    {
      name: "report_title",
      type: "string",
      description: "The title of the intelligence report.",
    },
    {
      name: "content",
      type: "string",
      description: "The full content of the report to broadcast.",
    },
  ],
  handler: async (args) => {
    const { report_title, content } = args;
    const signalApiUrl = "http://172.20.0.1:8081/v2/send";
    const groupId = "group.cHVnV0RjVGlEY2pFeHlPS1ZmSjZibGJZeE9QUE5pZmRxVFREMzdqbndNbz0=";
    const senderNumber = "[REDACTED]";

    const message = `🚨 OSIA INTELLIGENCE BROADCAST 🚨\n\nTITLE: ${report_title}\n\n${content}`;

    try {
      const response = await fetch(signalApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          number: senderNumber,
          recipients: [groupId],
        }),
      });

      if (!response.ok) {
        throw new Error(`Signal API error: ${response.statusText}`);
      }

      return "Successfully broadcasted intelligence report to the OSIA Briefings group.";
    } catch (error) {
      return `Failed to broadcast report: ${error.message}`;
    }
  },
};

module.exports = { broadcastToSignal };
