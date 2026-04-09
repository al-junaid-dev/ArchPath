import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, profile, roadmap } = body;

    const systemMessage = {
      role: 'system',
      content: `You are an expert career mentor advising a student.
      Profile: Studying ${profile.field_of_study}, Class level: ${profile.class_level}.
      
      You MUST output ONLY a valid JSON object. Do not use markdown backticks around the JSON.
      Use exactly this schema:
      {
        "message": "Your helpful response string formatted in markdown",
        "emotion": "Choose exactly one: 'neutral', 'analyzing', 'celebrating', or 'empathetic'"
      }
      
      Rules for emotion:
      - 'neutral': Standard factual answers.
      - 'analyzing': When explaining complex technical concepts or breaking down a hard problem.
      - 'celebrating': When the user completes a goal, shows enthusiasm, or needs motivation.
      - 'empathetic': When the user is confused, frustrated, or asking for beginner help.`
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemMessage, ...messages],
      model: 'llama-3.1-8b-instant',
      temperature: 0.6,
      max_tokens: 1024,
      response_format: { type: "json_object" }, // Force JSON!
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");
    return NextResponse.json(aiResponse);

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}