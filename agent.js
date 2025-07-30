import { Anthropic } from "@anthropic-ai/sdk";
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const getFigmaInfo = async (i = 0) => {
  const response = await anthropic.beta.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: "You can use Figma tools to learn about designs",
    messages: [
      {
        role: "user",
        content: "look up this figma issue https://www.figma.com/design/JqWii6wYby2bPqnaaALroQ/USER-10?node-id=1-82&t=HmxiRsQt44d9A7pH-4 and respond yes or no indicating whether or not you were able to view it over MCP. Your only output should be YES or NO and you should use the MCP server for figma.",
      },
    ],
    mcp_servers: [
      {
        type: "url",
        url: process.env.MCP_FIGMA_ENDPOINT,
        name: "figma-mcp",
        authorization_token: null, // Optional for local server with no auth
        tool_configuration: {
          enabled: true,
          // removed allowed_tools to allow all tools
        },
      },
    ],
  }, {
    headers: {
      "anthropic-beta": "mcp-client-2025-04-04", // REQUIRED for MCP tool use
    },
  });

  console.log("=".repeat(50));
  console.log(`\n${i}: Claude's response:\n`);
  console.log("=".repeat(50));

  // Log the full response structure to see all content blocks
  console.log("Full response content:");
  console.log(JSON.stringify(response.content, null, 2));


}

