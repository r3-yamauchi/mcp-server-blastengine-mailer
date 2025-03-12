# blastengine-mailer MCP Server

A Model Context Protocol server

This is a TypeScript-based MCP server that implements a sending email system.

<a href="https://glama.ai/mcp/servers/oo6xexjpe0">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/oo6xexjpe0/badge" alt="blastengine-mailer MCP server" />
</a>

## Features

### Tools
- `send_email` - send a email

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "blastengine-mailer": {
      "command": "node",
      "env": {
        "BLASTENGINE_USER_ID": "userid-of-blastengine",
        "BLASTENGINE_API_KEY": "apikey-of-blastengine"
      },
      "args": [
        "/path/to/blastengine-mailer/server.js"
      ]
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.