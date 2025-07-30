import { MCPClient } from "mcp-client";


const client = new MCPClient({
    name: "Test",
    version: "1.0.0",
});

await client.connect({
    type: "sse",
    url: "https://79d15bf41c44.ngrok-free.app/sse",
});

const tools = await client.getAllTools()

const getFigmaCode = async (id, i) => {
    const code = await client.callTool({
        name: "get_code",
        arguments: {
            nodeId: id,
            clientLanguages: "javascript, html, css",
            clientFrameworks: "react, tailwind",
            clientName: "test"
        }
    })
    console.log(`Got code for ${i}\n`, code)
}

for (let i = 0; i < 30; i++) {
    getFigmaCode(`1-82`, i);
}



