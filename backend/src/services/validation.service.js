/**
 * Validates transformed CRM records and categorizes them.
 * Records lacking both email and mobile/phone contact details are skipped.
 */
export const validateRecords = (records = []) => {
  const valid = [];
  const skipped = [];

  records.forEach((record, index) => {
    const email = record.email ? String(record.email).trim() : "";
    const phone = record.mobile_without_country_code ? String(record.mobile_without_country_code).trim() : "";
    const name = record.name ? String(record.name).trim() : "";

    if (!email && !phone) {
      skipped.push({
        rowNumber: index + 2, // 1-indexed, plus 1 for header row
        name: name || "Unknown Lead",
        email: email,
        mobile_without_country_code: phone,
        company: record.company || "",
        reason: "No contact information provided (both Email and Phone Number are missing)"
      });
    } else {
      valid.push(record);
    }
  });

  return { valid, skipped };
};