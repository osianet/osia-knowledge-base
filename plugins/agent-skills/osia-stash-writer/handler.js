const fs = require('fs');
const path = require('path');

module.exports.runtime = {
  handler: async function ({ report }) {
    const callerId = `${this.config.name}-v${this.config.version}`;
    try {
      this.introspect(`${callerId} writing to shared stash...`);
      const stashFile = path.join(__dirname, '..', '..', '..', 'osia_shared_stash.txt');
      
      const timestamp = new Date().toISOString();
      const content = `\n--- [${timestamp}] ---\n${report}\n`;
      
      fs.appendFileSync(stashFile, content, 'utf8');
      
      return `Successfully appended report to the shared stash.`;
    } catch (e) {
      this.introspect(`${callerId} failed: ${e.message}`);
      this.logger(`${callerId} failed to write stash`, e.message);
      return `Error writing to stash: ${e.message}`;
    }
  }
};