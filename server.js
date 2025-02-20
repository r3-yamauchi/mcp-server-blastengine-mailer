#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { BlastEngine, Transaction } from 'blastengine';

const server = new Server({
    name: "blastengine-mailer",
    version: "0.0.1",
}, {
    capabilities: {
        resources: {},
        tools: {},
        prompts: {},
    },
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "send_email",
                description: "Send an email using Blastengine API",
                inputSchema: {
                    type: "object",
                    properties: {
                        to: {
                            type: "string",
                            description: "Recipient email address"
                        },
                        from: {
                            type: "string",
                            description: "Sender email address"
                        },
                        subject: {
                            type: "string",
                            description: "Email subject"
                        },
                        text: {
                            type: "string",
                            description: "Email body"
                        }
                    },
                    required: ["to", "from", "subject", "text"]
                }
            }
        ]
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "send_email": {
            const to = String(request.params.arguments?.to);
            const from = String(request.params.arguments?.from);
            const subject = String(request.params.arguments?.subject);
            const text = String(request.params.arguments?.text);

            if (!to || !from || !subject || !text) {
                throw new Error("宛先、送信元、件名、本文は必須です。");
            }

            try {
                // BlastEngineクライアントの初期化
                const client = new BlastEngine(process.env.BLASTENGINE_USER_ID, process.env.BLASTENGINE_API_KEY);

                // メールの送信
                const transaction = new Transaction;

                transaction
                    .setFrom(from)
                    .setSubject(subject)
                    .setTo(to)
                    .setText(text);

                const res = await transaction.send();

                return {
                    content: [{ type: "text", text: `${to} にメールを送信しました。 delivery_id: ${res.delivery_id}` }],
                };
            } catch (error) {
                console.error("メール送信エラー:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `${to} へのメール送信に失敗しました: ${error.message}`,
                        },
                    ],
                    isError: true,
                };
            }
        }
        default:
            throw new Error("Unknown tool");
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log('Connected to blastengine-mailer.');
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});