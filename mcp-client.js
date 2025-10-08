// client.js
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

async function main() {
    const MCP_URL = "http://figma-nlb-sticky-d8eed53b27af16f3.elb.us-east-1.amazonaws.com/mcp"; // endpoint path matters
    const BEARER_TOKEN = "5c37a040cf7c53bf9617f77166a4057d7338ed1d2aab6ad93aa00f0ac5d85e12";        // set in your shell: export MCP_TOKEN=...

    // Create the MCP client
    const client = new Client({
        name: "example-client",
        version: "1.0.0"
    });

    // Create the HTTP transport, with Authorization header
    const transport = new StreamableHTTPClientTransport(new URL(MCP_URL), {
        requestInit: {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`
            }
        }
    });

    // Connect client <-> server
    await client.connect(transport);

    // List available tools
    // const tools = await client.listTools();
    // console.log("Available tools:", JSON.stringify(tools, null, 4));

    // If there’s at least one tool, call it as a demo
    // if (tools.length > 0) {
    //     const result = await client.callTool({
    //         name: tools[0].name,
    //         arguments: { foo: "bar" }
    //     });
    //     console.log("Tool result:", result);
    // }

    const getCode = async (i) => {
        const result = await client.callTool({
            name: "get_code",  // get_metadata seems to work?
            arguments: {
                clientLanguages: "javascript, html, css",
                clientFrameworks: "react, tailwind",
                fileKey: "3JgSzy4U8gdIGm1oyHiovy",
                fileName: "TaskFlow",
                nodeId: `0-113`
            }
        });
        if (result.isError)
            console.log("ERROR:", result.content, i)
        else console.log("SUCCESS", result.content)
    }

    for (let i = 0; i < 1; i++) {
        getCode(i);
    }

    // Close connection cleanly
    // await client.close();
}

main().catch(err => {
    console.error("Error running MCP client:", err);
    process.exit(1);
});
