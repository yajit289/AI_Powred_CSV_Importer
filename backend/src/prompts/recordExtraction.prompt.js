import { CRM_FIELDS } from "../constants/crmFileds.js";

export const buildRecordExtractionPrompt = (records) => `
You are an AI that converts transformed CSV records into GrowEasy CRM records.

Return ONLY a valid JSON array.
Do not include markdown, explanations, or code fences.

Each output object MUST:
- Contain ONLY these CRM fields:
${CRM_FIELDS.join(", ")}
- Preserve the same order as the input records.
- Return one output object per input record.

====================
GENERAL RULES
====================

1. Populate only the CRM fields listed above.
2. If a value cannot be determined confidently, return "".
3. Never guess, invent, or hallucinate data.
4. Ignore unknown fields.
5. Dates must be in a format parseable by:
   new Date(value)

====================
PHONE RULES
====================

If a phone number contains a country code:

Input:
+91 9876543210

Output:
country_code="+91"
mobile_without_country_code="9876543210"

If multiple phone numbers exist:

Example:
+91 9876543210,+1 2125551234

- Use the first number.
- Append remaining numbers to crm_note.
- Preserve existing crm_note.

====================
EMAIL RULES
====================

If multiple emails exist:

john@gmail.com,john.office@gmail.com

- Use the first email.
- Append remaining emails to crm_note.
- Preserve existing crm_note.

====================
CRM STATUS MAPPING
====================

Interested -> GOOD_LEAD_FOLLOW_UP
Customer didn't answer -> DID_NOT_CONNECT
Not Interested -> BAD_LEAD
Sale Completed -> SALE_DONE

If no confident mapping exists:
return "".

====================
DATA SOURCE MAPPING
====================

Meridian Tower -> meridian_tower
Eden Park -> eden_park
Varah Swamy -> varah_swamy
Sarjapur Plots -> sarjapur_plots
Leads On Demand -> leads_on_demand

If no confident mapping exists:
return "".

====================
CRM NOTE RULES
====================

Never overwrite crm_note.

Always preserve existing content.

Append additional information using readable text, for example:

Additional Emails:
a@gmail.com
b@gmail.com

Additional Phone Numbers:
+1 2125551234

====================
EXAMPLES
====================

Input:
{
  "crm_status":"Interested",
  "data_source":"Meridian Tower"
}

Output:
{
  "crm_status":"GOOD_LEAD_FOLLOW_UP",
  "data_source":"meridian_tower"
}

Input:
{
  "mobile_without_country_code":"+91 9876543210"
}

Output:
{
  "country_code":"+91",
  "mobile_without_country_code":"9876543210"
}

Input:
{
  "email":"a@gmail.com,b@gmail.com"
}

Output:
{
  "email":"a@gmail.com",
  "crm_note":"Additional Email: b@gmail.com"
}

====================
INPUT RECORDS
====================

${JSON.stringify(records)}
`;