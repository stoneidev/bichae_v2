import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, geminiApiKey } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'Target product URL is required.' },
        { status: 400 }
      );
    }

    const apiKey = geminiApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Gemini API Key not found. Please provide one in the admin console or configure GEMINI_API_KEY in Cloudflare Pages.' },
        { status: 401 }
      );
    }

    // Call Gemini API to parse and generate luxury english curation editorial using Google Search Grounding tool
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are a high-end global K-beauty expert editor.
Analyze the product details of the official brand product store page at this exact URL: ${url}

IMPORTANT: Since the server cannot crawl this page directly, use your Google Search grounding tool to look up, retrieve, and verify the exact details of this K-beauty product from this URL. Find its exact name, brand heritage, description, key ingredients, and complete INCI list.

Translate all details into a premium luxury beauty editorial format (similar to Vogue, Chanel, or Tom Ford styling) strictly in English.

Generate a JSON object strictly matching the following schema. Do not output any markdown block wrappers, comments, or extra text. Just return a clean, parseable JSON:

{
  "reportId": "046",
  "productName": "Exact Product Name in English",
  "brandName": "Brand Name (e.g. d'Alba, SKIN1004)",
  "brandDescription": "A premium summary of the brand heritage and concept.",
  "brandWebsite": "${url}",
  "category": "One of: Sun Care, Essence & Serum, Moisturizer, Toner & Mist, Hair Care",
  "volume": "e.g. 50ml",
  "msrpUsd": "MSRP retail price in USD (e.g. 28.00 - convert from KRW if needed, approx $1 for every 1300 KRW)",
  "productDescription": "Short description focusing on texture and key benefits.",
  "fullInciList": "Complete INCI ingredients list separated by commas, translated to English.",
  "ewgStatus": "EWG Green Grade Verified",
  "editorNote": "A luxurious review of the product formulation, feel, and daily clinically routine (approx 100-150 words).",
  "ingredients": [
    {
      "name": "Key Ingredient 1 Name (e.g. White Truffle)",
      "description": "Scientific efficacy and benefits (approx 15-20 words).",
      "tagColor": "var(--brand-rose)"
    },
    {
      "name": "Key Ingredient 2 Name",
      "description": "Benefits...",
      "tagColor": "var(--brand-sage)"
    },
    {
      "name": "Key Ingredient 3 Name",
      "description": "Benefits...",
      "tagColor": "#3B82F6"
    }
  ],
  "reviews": [
    {
      "platform": "YOUTUBE",
      "badgeColor": "#FF0000",
      "scoreSummary": "Consensus score / context (e.g. dermatology creators)",
      "quote": "A glowing, realistic viral review quote in English.",
      "analysisMeta": "Combined views or posts metrics"
    },
    {
      "platform": "REDDIT",
      "badgeColor": "#FF4500",
      "scoreSummary": "r/AsianBeauty user review summary",
      "quote": "A realistic Reddit skincare addict review quote.",
      "analysisMeta": "Upvote counts"
    },
    {
      "platform": "INSTAGRAM",
      "badgeColor": "#E1306C",
      "scoreSummary": "Instagram trending context",
      "quote": "A realistic aesthetic Instagram reel quote.",
      "analysisMeta": "Post/Tag count metrics"
    }
  ]
}`;

    const geminiPayload = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      tools: [
        {
          googleSearch: {}
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    };

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geminiPayload)
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      return NextResponse.json(
        { success: false, error: `Gemini API returned an error: ${errText}` },
        { status: 502 }
      );
    }

    const geminiData = await geminiResponse.json();
    const resultText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      return NextResponse.json(
        { success: false, error: 'Gemini did not return any parseable content.' },
        { status: 502 }
      );
    }

    // Try parsing to verify it is valid JSON
    const parsedData = JSON.parse(resultText);

    return NextResponse.json({ success: true, draft: parsedData });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
