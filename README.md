# OSIA Knowledge Base

This repository contains the intelligence configuration, context environment, and custom agent skills for the **Open Source Intelligence Agency (OSIA)**. It is designed to be used in conjunction with the primary [osia-framework](https://github.com/osianet/osia-framework) repository.

OSIA operates under a **configurable mission mandate**, which is defined in a Markdown file within the framework. This allows the agency to dynamically adapt its analytical lens across all intelligence desks by synchronizing core directives with agent system prompts.

## 🗂️ Repository Structure

*   **`plugins/agent-skills/`**: Custom JavaScript skills that extend the capabilities of the AnythingLLM agents.
    *   `osia-cyber-ip-intel`: IP geolocation & ASN lookup (Cyber Desk).
    *   `osia-cyber-kali-tools`: Executes whitelisted recon tools (nmap, whois, dig, ping) inside a secure Kali Linux sandbox (Cyber Desk).
    *   `osia-finance-stock-intel`: Real-time stock market data (Finance Desk).
    *   `osia-geopol-country-intel`: Foundational country data — borders, population, region, UN membership (Geopolitical Desk).
    *   `osia-culture-observatory`: Upcoming global holidays and religious observances for sociological context (Culture Desk).
    *   `osia-github-repo-intel`: Technical metadata and health indicators for any GitHub repository (Cyber/Tech Desk).
    *   `osia-social-username-recon`: Cross-platform username existence checks across major social media (HUMINT Desk).
    *   `osia-report-broadcast`: Broadcasts finished intelligence reports to the OSIA Briefings Signal group.
    *   `osia-stash-writer`: Appends synthesized intelligence to a shared local stash file for cross-desk collaboration.
*   **`plugins/anythingllm_mcp_servers.example.json`**: Example configuration for integrated Model Context Protocol (MCP) servers (Tavily, Wikipedia, ArXiv, Semantic Scholar, YouTube, Time).
*   **`mcp/`**: Source code and virtual environments for the MCP servers connected to the OSIA network.
    *   `mcp-arxiv`: Academic paper search via ArXiv.
    *   `mcp-semantic-scholar`: Academic paper search via Semantic Scholar.
    *   `mcp-wikipedia-py`: Wikipedia lookups.
    *   `tavily`: Web search via Tavily API.
    *   `youtube`: YouTube transcript extraction.
*   **`.env.example`**: Template for environment variables required to run the AnythingLLM instance with all configured LLM providers (Gemini, Anthropic, OpenAI, Ollama, etc.).

## 🔒 Security & Ignored Files

To protect the integrity of the intelligence network and prevent the leakage of sensitive data, this repository strictly ignores:
*   All AnythingLLM SQLite databases (`*.db`, `*.db-shm`, `*.db-wal`) containing chat histories and prompts.
*   The raw `.env` file containing API keys.
*   The actual `plugins/anythingllm_mcp_servers.json` config (which contains API keys).
*   The `documents/` folder containing uploaded intelligence PDFs and raw intercepts.
*   The `vector-cache/` and `lancedb/` vector database files.
*   The OSIA shared stash file (`plugins/osia_shared_stash.txt`), a runtime artifact written to by agents.
*   All `node_modules/`, `__pycache__/`, and `.venv/` directories to keep the repository lightweight.

## 🚀 Setup Instructions

1.  Clone this repository to the location where your AnythingLLM instance expects its storage volume (e.g., `/app/server/storage` in Docker, mapped to `/home/ubuntu/osia-knowledge-base` on the host).
2.  Copy `.env.example` to `.env` and fill in your API keys.
3.  Copy `plugins/anythingllm_mcp_servers.example.json` to `plugins/anythingllm_mcp_servers.json` and fill in any required MCP API keys.
4.  Use the `update_prompts.py` script from the `osia-framework` repository to automatically provision the AnythingLLM SQLite database with the correct agent prompts, models, and custom skill activations.
