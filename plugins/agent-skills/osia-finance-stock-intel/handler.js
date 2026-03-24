module.exports.runtime = {
  handler: async function ({ ticker }) {
    const callerId = `${this.config.name}-v${this.config.version}`;
    try {
      this.introspect(`${callerId} fetching market data for ${ticker}...`);
      const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
      const data = await response.json();
      
      if (data.chart && data.chart.error) {
        return `Failed to fetch stock data for ${ticker}: ${data.chart.error.description}`;
      }
      
      const result = data.chart.result[0];
      const meta = result.meta;
      const latestPrice = meta.regularMarketPrice;
      const previousClose = meta.chartPreviousClose;
      const currency = meta.currency;
      
      return `Ticker: ${ticker}\nCurrent Price: ${latestPrice} ${currency}\nPrevious Close: ${previousClose} ${currency}\nExchange: ${meta.exchangeName}`;
    } catch (e) {
      this.introspect(`${callerId} failed: ${e.message}`);
      this.logger(`${callerId} failed for ticker ${ticker}`, e.message);
      return `Error looking up stock ticker: ${e.message}`;
    }
  }
};