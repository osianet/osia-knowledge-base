module.exports.runtime = {
  handler: async function ({ ip_address }) {
    const callerId = `${this.config.name}-v${this.config.version}`;
    try {
      this.introspect(`${callerId} looking up IP: ${ip_address}...`);
      const response = await fetch(`http://ip-api.com/json/${ip_address}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
      const data = await response.json();
      
      if (data.status !== "success") {
        return `Failed to fetch intel for IP ${ip_address}: ${data.message}`;
      }
      
      return [
        `IP: ${data.query}`,
        `Country: ${data.country} (${data.countryCode})`,
        `Region: ${data.regionName} (${data.region})`,
        `City: ${data.city}`,
        `ZIP: ${data.zip}`,
        `Coordinates: ${data.lat}, ${data.lon}`,
        `Timezone: ${data.timezone}`,
        `ISP: ${data.isp}`,
        `Organization: ${data.org}`,
        `AS: ${data.as}`,
      ].join("\n");
    } catch (e) {
      this.introspect(`${callerId} failed: ${e.message}`);
      this.logger(`${callerId} failed for IP ${ip_address}`, e.message);
      return `Error looking up IP: ${e.message}`;
    }
  }
};