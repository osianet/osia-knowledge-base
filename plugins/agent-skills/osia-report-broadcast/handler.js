module.exports.runtime = {
  handler: async function ({ report_title, content }) {
    const signalApiUrl = "http://172.20.0.1:8081/v2/send";
    const groupId = "group.cHVnV0RjVGlEY2pFeHlPS1ZmSjZibGJZeE9QUE5pZmRxVFREMzdqbndNbz0=";
    const senderNumber = process.env.SIGNAL_SENDER_NUMBER;

    if (!senderNumber) {
      return "Failed to broadcast report: SIGNAL_SENDER_NUMBER environment variable is not set.";
    }

    const message = `🚨 OSIA INTELLIGENCE BROADCAST 🚨\n\nTITLE: ${report_title}\n\n${content}`;

    try {
      this.introspect(`Broadcasting intelligence report: ${report_title}...`);
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
  }
};