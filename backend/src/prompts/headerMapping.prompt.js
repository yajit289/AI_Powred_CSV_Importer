import { CRM_FIELDS } from "../constants/crmFileds.js";

export const buildHeaderMappingPrompt = (headers) => `
You are an expert CRM data mapping assistant.

Your task is to map uploaded CSV headers to GrowEasy CRM fields.

Available CRM Fields:

${CRM_FIELDS.map((field) => `- ${field}`).join("\n")}

Instructions:

1. Match each CSV header to the MOST appropriate CRM field.
2. If no confident mapping exists, return null.
3. Never invent new CRM fields.
4. Never map two headers to the same CRM field unless absolutely necessary.
5. Return ONLY valid JSON.
6. Do NOT include markdown.
7. Do NOT explain your reasoning.

CSV Headers:

${JSON.stringify(headers)}

Expected Response:

{
  "Department": null,
  "Salary": null,
  "City": "city"
}
`;