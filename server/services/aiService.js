const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

const VALID_CATEGORIES = [
  "food",
  "travel",
  "entertainment",
  "shopping",
  "bills",
  "other",
];

const buildSystemPrompt = () => {
  const today = new Date().toISOString().split("T")[0];

  return `You are an expense-parsing assistant for an expense tracker app.
Given a short piece of text describing an expense, extract structured data.

Today's date is ${today}. Resolve relative dates ("yesterday", "last Monday", "today") against this date.

Valid categories are ONLY: ${VALID_CATEGORIES.join(", ")}. Pick the closest match. If nothing fits, use "other".

Respond with ONLY a JSON object in this exact shape, no other text:
{
  "title": string (short, max 50 characters),
  "amount": number (positive, no currency symbols),
  "category": string (one of the valid categories above),
  "expenseDate": string (YYYY-MM-DD format),
  "description": string or null (optional extra context, max 200 characters)
}`;
};

const stripCodeFences = (text) => {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
};

const parseExpenseText = async (text) => {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: text,
    config: {
      systemInstruction: buildSystemPrompt(),
      responseMimeType: "application/json",
    },
  });

  const rawText = response.text;

  if (!rawText) {
    throw new Error("Empty response from Gemini");
  }

  const cleaned = stripCodeFences(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Gemini returned invalid JSON");
  }

  return parsed;
};

module.exports = { parseExpenseText, VALID_CATEGORIES };
