import Groq from "groq-sdk";
import { buildHeaderMappingPrompt } from "../prompts/headerMapping.prompt.js";
import { buildRecordExtractionPrompt } from "../prompts/recordExtraction.prompt.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const parseAIResponse = (text) => {
  return JSON.parse(
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
};

export const mapUnknownHeaders = async (headers = []) => {
  if (!headers.length) {
    return {
      success: true,
      mapping: {},
    };
  }

  try {
    const prompt = buildHeaderMappingPrompt(headers);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0].message.content;

    return {
      success: true,
      mapping: parseAIResponse(content),
    };
  } catch (error) {
    console.error("AI Header Mapping Error:", error);
    throw error;
  }
};

export const extractCRMRecords = async (records = []) => {
  if (!records.length) return [];

  try {
    const prompt = buildRecordExtractionPrompt(records);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0].message.content;

    return parseAIResponse(content);
  } catch (error) {
    console.error("AI Record Enrichment Error:", error);
    throw error;
  }
};