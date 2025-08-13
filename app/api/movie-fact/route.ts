import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: NextRequest) {
  try {
    const { movieName } = await request.json();

    if (!movieName) {
      return NextResponse.json({ error: "Movie name is required" }, { status: 400 });
    }

    const prompt = `Give me one fun and interesting fact about the movie "${movieName}".`;

    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY || "",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ error: "Failed to fetch fact from Gemini" }, { status: 500 });
    }

    const data = await res.json();


    const fact =
        data.candidates?.[0]?.content?.parts?.[0]?.text || 
        data.contents?.[0]?.parts?.[0]?.text || 
        null;

    return NextResponse.json({ fact });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
