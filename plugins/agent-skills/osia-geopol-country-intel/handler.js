module.exports.runtime = {
  handler: async function ({ country }) {
    try {
      this.introspect(`Fetching geopolitical data for ${country}...`);
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const data = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        return `Failed to find intel for country: ${country}`;
      }
      
      const c = data[0];
      const info = {
        official_name: c.name.official,
        region: `${c.region} (${c.subregion})`,
        capital: c.capital ? c.capital[0] : "N/A",
        population: c.population.toLocaleString(),
        borders: c.borders ? c.borders.join(", ") : "None",
        landlocked: c.landlocked,
        un_member: c.unMember,
        maps: c.maps.googleMaps
      };
      
      return JSON.stringify(info, null, 2);
    } catch (e) {
      return `Error looking up country: ${e.message}`;
    }
  }
};