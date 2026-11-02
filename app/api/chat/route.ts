
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message;

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-6-luna",
      instructions: `
        You are Deepara, the friendly AI assistant for Deepara Solutions.
        Help visitors understand website development, mobile app
        development, and digital marketing.
        Be friendly and concise.
        Do not invent company prices or details.
        If you do not know an answer, suggest contacting our team on WhatsApp.
      `,
      input: message.trim(),
    });

    return NextResponse.json({ reply: response.output_text });
  } catch (error) {
    console.error("Chat API error:", error);

    const details =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      { error: details },
      { status: 500 }
    );
  }
}
