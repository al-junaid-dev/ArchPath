import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fieldOfStudy, classLevel, interests } = body;

    const systemPrompt = `You are an expert career architect. A student in ${classLevel} is studying ${fieldOfStudy} with interests in ${interests}.
    You must generate a 4-step modern career roadmap. 
    You MUST output ONLY a valid JSON object. Do not include any markdown formatting, backticks, or introductory text.
    Use exactly this JSON schema:
    {
      "title": "String (e.g., 'Full Stack Developer Roadmap')",
      "overview": "String (A 2-sentence summary of the path)",
      "steps": [
        {
          "phase": "String (e.g., 'Phase 1: Foundation')",
          "duration": "String (e.g., 'Months 1-3')",
          "focus": "String (What is the main goal of this phase)",
          "actionItems": ["Array of Strings (Specific tasks/skills to learn)"]
        }
      ]
    }`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" }, // This forces Groq to return pure JSON!
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;
    
    if (!aiResponse) throw new Error("No response from AI");

    // We parse the string into an actual JavaScript object
    const roadmapData = JSON.parse(aiResponse);

    return NextResponse.json({ roadmap: roadmapData });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
  }
}