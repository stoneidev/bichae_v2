import { NextRequest, NextResponse } from 'next/server';

// LOCAL DEV ONLY — blocked in production builds
// This endpoint fetches the product page HTML directly (no WAF issues locally)
// then passes the full HTML context to Gemini for accurate extraction.
export const runtime = 'edge';

const SCHEMA_PROMPT = `You are a high-end global K-beauty expert editor.

Below is the raw HTML content of an official Korean brand product store page.
Carefully extract all product details from this HTML and translate them into a premium luxury beauty editorial format (similar to Vogue, Chanel, or Tom Ford styling), strictly in English.

Generate a JSON object strictly matching the following schema. Do not output any markdown block wrappers, comments, or extra text. Just return clean, parseable JSON:

{
  "reportId": "047",
  "productName": "Exact Product Name in English",
  "brandName": "Brand Name",
  "brandDescription": "A premium summary of the brand heritage and concept.",
  "brandWebsite": "official store URL",
  "category": "One of: Sun Care, Essence & Serum, Moisturizer, Toner & Mist, Hair Care",
  "volume": "e.g. 50ml",
  "msrpUsd": "MSRP retail price in USD (convert from KRW if needed, approx $1 per 1350 KRW)",
  "productDescription": "Short description focusing on texture and key benefits (2-3 sentences).",
  "fullInciList": "Complete INCI ingredients list separated by commas, in English.",
  "ewgStatus": "EWG Green Grade Verified",
  "editorNote": "A luxurious editorial review of the product formulation, feel, and daily routine (approx 100-150 words).",
  "ingredients": [
    { "name": "Key Ingredient 1", "description": "Scientific efficacy (15-20 words).", "tagColor": "var(--brand-rose)" },
    { "name": "Key Ingredient 2", "description": "Benefits...", "tagColor": "var(--brand-sage)" },
    { "name": "Key Ingredient 3", "description": "Benefits...", "tagColor": "#3B82F6" }
  ],
  "reviews": [
    { "platform": "YOUTUBE", "badgeColor": "#FF0000", "scoreSummary": "Channel/context", "quote": "A glowing realistic viral review quote.", "analysisMeta": "Combined views/metrics" },
    { "platform": "REDDIT", "badgeColor": "#FF4500", "scoreSummary": "r/AsianBeauty context", "quote": "A realistic Reddit skincare quote.", "analysisMeta": "Upvote counts" },
    { "platform": "INSTAGRAM", "badgeColor": "#E1306C", "scoreSummary": "Instagram trending context", "quote": "A realistic aesthetic Instagram quote.", "analysisMeta": "Post/Tag count metrics" }
  ],
  "dermalScience": {
    "title": "Clinical mechanism headline specific to this product",
    "description": "One paragraph (2-3 sentences) explaining the clinical/dermatological mechanism.",
    "cards": [
      { "icon": "flask", "title": "Key Active Ingredient 1", "body": "Clinical efficacy (2-3 sentences)." },
      { "icon": "microscope", "title": "Key Active Ingredient 2 or complex", "body": "Clinical efficacy (2-3 sentences)." }
    ]
  },
  "buyerGuide": {
    "title": "How to Select [product type] — specific to this category",
    "description": "One sentence intro for selecting this product type.",
    "steps": [
      { "step": "01", "title": "Selection criterion 1", "desc": "Explanation." },
      { "step": "02", "title": "Selection criterion 2", "desc": "Explanation." },
      { "step": "03", "title": "Selection criterion 3", "desc": "Explanation." }
    ]
  },
  "applicationSteps": {
    "title": "Application protocol title specific to this product",
    "description": "One sentence describing the goal of this protocol.",
    "steps": [
      { "label": "STEP 1 • PREPARATION", "title": "Step 1 title", "body": "Step 1 instruction." },
      { "label": "STEP 2 • APPLICATION", "title": "Step 2 title", "body": "Step 2 instruction." },
      { "label": "STEP 3 • LOCK IN", "title": "Step 3 title", "body": "Step 3 instruction." }
    ]
  },
  "makerStory": {
    "brandDisplayName": "Brand display name (e.g. d'Alba — 달바 글로벌)",
    "story": "2-3 sentence brand heritage paragraph.",
    "certifications": [
      { "icon": "leaf", "label": "Certification or notable fact 1" },
      { "icon": "shield", "label": "Certification or notable fact 2" },
      { "icon": "award", "label": "Certification or notable fact 3" },
      { "icon": "check", "label": "Certification or notable fact 4" }
    ],
    "storeName": "Official store name",
    "storeUrl": "Official store URL",
    "storeShipping": "Shipping info string",
    "reviewTags": ["emoji Tag 1","emoji Tag 2","emoji Tag 3","emoji Tag 4","emoji Tag 5","emoji Tag 6","emoji Tag 7","emoji Tag 8","emoji Tag 9","emoji Tag 10","emoji Tag 11","emoji Tag 12","emoji Tag 13"]
  }
}

--- PRODUCT PAGE HTML BELOW ---
`;

export async function POST(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  if (!isLocalhost && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ success: false, error: 'This endpoint is only available in local development.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { url, geminiApiKey } = body;

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required.' }, { status: 400 });
    }

    const apiKey = geminiApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'Gemini API Key not found.' }, { status: 401 });
    }

    // Fetch the product page directly from local server (bypasses WAF)
    let pageHtml = '';
    try {
      const pageRes = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8',
        },
      });
      if (pageRes.ok) {
        const raw = await pageRes.text();
        // Strip script/style tags and truncate to keep Gemini context manageable
        pageHtml = raw
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<!--[\s\S]*?-->/g, '')
          .slice(0, 60000);
      }
    } catch (fetchErr) {
      pageHtml = `[Could not fetch page directly. Error: ${fetchErr}]`;
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiPayload = {
      contents: [{ parts: [{ text: SCHEMA_PROMPT + pageHtml }] }],
      tools: [{ googleSearch: {} }],
      generationConfig: {},
    };

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return NextResponse.json({ success: false, error: `Gemini API error: ${errText}` }, { status: 502 });
    }

    const geminiData = await geminiRes.json();
    const resultText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!resultText) {
      return NextResponse.json({ success: false, error: 'Gemini returned no content.' }, { status: 502 });
    }

    // Extract JSON from response (may be wrapped in ```json ... ``` fences)
    const jsonMatch = resultText.match(/```json\s*([\s\S]*?)```/) || resultText.match(/(\{[\s\S]*\})/);
    const jsonStr = jsonMatch ? jsonMatch[1] : resultText;
    const parsed = JSON.parse(jsonStr.trim());
    return NextResponse.json({ success: true, draft: parsed });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
