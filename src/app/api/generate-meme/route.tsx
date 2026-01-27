import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// di atas POST
const cooldown = new Map();

function canGenerate(ip: string) {
  const last = cooldown.get(ip) || 0;
  const now = Date.now();

  if (now - last < 30_000) return false;

  cooldown.set(ip, now);
  return true;
}

export async function POST(req: Request) {

  try {

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      );
    }

    // Prompt engineering sederhana
    const finalPrompt = `
Create a wholesome, positive, and family-friendly cartoon meme.

Main character:
- Cute cat mascot named GOBO
- Soft pastel colors
- Friendly smile
- Wearing green hoodie
- Smart, kind, disciplined personality

Style:
- Digital illustration
- High quality
- Clean background
- Social media friendly
- Square format

Rules:
- No violence
- No sexual content
- No drugs
- No politics
- No hate
- No offensive symbols

Theme:
${prompt}

Make it inspirational, funny, and suitable for all ages.
`;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: finalPrompt,
      size: "1024x1024",
    });

    if (!result.data || result.data.length === 0) {
        throw new Error("Image generation failed: no data returned");
    }
    
    const imageBase64 = result.data[0].b64_json;

    return NextResponse.json({
      imageBase64,
    });

  } catch (err) {
    console.error("AI generate error:", err);

    return NextResponse.json(
      { error: "Generate failed" },
      { status: 500 }
    );
  }
}
