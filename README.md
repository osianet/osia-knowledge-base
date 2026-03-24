# OSIA Knowledge Base

This repository contains the intelligence configuration, context environment, and custom agent skills for the **Open Source Intelligence Agency (OSIA)**. It is designed to be used in conjunction with the primary [osia-framework](https://github.com/osianet/osia-framework) repository.

OSIA operates under a **configurable mission mandate**, which is defined in a Markdown file within the framework. This allows the agency to dynamically adapt its analytical lens across all intelligence desks by synchronizing core directives with agent system prompts.

## 🗂️ Repository Structure

*   **`plugins/agent-skills/`**: Custom JavaScript skills that extend the capabilities of the AnythingLLM agents.
    *   `osia-cyber-ip-intel`: IP Geolocation & ASN lookup (used by Cyber Desk).
    *   `osia-finance-stock-intel`: Real-time stock market data (used by Finance Desk).
    *   `osia-stash-writer`: Allows agents to append synthesized intelligence reports to a shared local filesystem.
*   **`plugins/anythingllm_mcp_servers.example.json`**: Example configuration for integrated Model Context Protocol (MCP) servers (Tavily, Wikipedia, ArXiv, Semantic Scholar, YouTube, Time).
*   **`mcp/`**: Contains the source code and virtual environments for the various MCP servers connected to the OSIA network.
*   **`.env.example`**: A template for the environment variables required to run the AnythingLLM instance with all configured LLM providers (Gemini, Anthropic, OpenAI, Ollama, etc.).

## 🔒 Security & Ignored Files

To protect the integrity of the intelligence network and prevent the leakage of sensitive data, this repository strictly ignores:
*   All AnythingLLM SQLite databases (`*.db`, `*.db-shm`, `*.db-wal`) containing chat histories and prompts.
*   The raw `.env` file containing API keys.
*   The actual `plugins/anythingllm_mcp_servers.json` config (which contains API keys).
*   The `documents/` folder containing uploaded intelligence PDFs and raw intercepts.
*   The `vector-cache/` and `lancedb/` vector database files.
*   All `node_modules/`, `__pycache__/`, and `.venv/` directories to keep the repository lightweight.

## 🚀 Setup Instructions

1.  Clone this repository to the location where your AnythingLLM instance expects its storage volume (e.g., `/app/server/storage` in Docker, mapped to `/home/ubuntu/osia-knowledge-base` on the host).
2.  Copy `.env.example` to `.env` and fill in your API keys.
3.  Copy `plugins/anythingllm_mcp_servers.example.json` to `plugins/anythingllm_mcp_servers.json` and fill in any required MCP API keys.
4.  Use the `update_prompts.py` script from the `osia-framework` repository to automatically provision the AnythingLLM SQLite database with the correct agent prompts, models, and custom skill activations.
