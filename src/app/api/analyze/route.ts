import { NextRequest, NextResponse } from "next/server";
import {
  LISTING_ANALYSIS_SYSTEM_PROMPT,
  buildAnalysisUserPrompt,
} from "@/lib/prompts";
import { ListingData, AuditResult } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please set ANTHROPIC_API_KEY." },
        { status: 500 }
      );
    }

    const body: { listing: ListingData } = await request.json();
    const { listing } = body;

    if (!listing || !listing.title || !listing.description) {
      return NextResponse.json(
        { error: "Listing title and description are required." },
        { status: 400 }
      );
    }

    const userPrompt = buildAnalysisUserPrompt(listing);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 4096,
        system: LISTING_ANALYSIS_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Claude API error:", errorData);
      return NextResponse.json(
        { error: "Failed to analyze listing. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      return NextResponse.json(
        { error: "No analysis received from AI." },
        { status: 502 }
      );
    }

    // Parse the JSON response from Claude
    let result: AuditResult;
    try {
      // Strip any markdown code fences if present
      const cleaned = content
        .replace(/^```json?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      result = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Claude response:", content);
      return NextResponse.json(
        { error: "Failed to parse AI analysis. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
