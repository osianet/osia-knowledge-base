module.exports.runtime = {
  handler: async function () {
    try {
      this.introspect(`Observing global cultural and religious drivers...`);
      // Using a public holiday API (Nager.Date for simplicity/no-key)
      const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidaysWorldwide`);
      const data = await response.json();
      
      const upcoming = data.slice(0, 10).map(h => ({
        date: h.date,
        name: h.name,
        localName: h.localName,
        country: h.countryCode
      }));
      
      const formatted = upcoming.map(h =>
        `- ${h.date} | ${h.name} (${h.localName}) — ${h.country}`
      ).join("\n");
      return `Upcoming Global Observations & Drivers:\n${formatted}`;
    } catch (e) {
      return `Error fetching cultural data: ${e.message}`;
    }
  }
};