export const transformRecords = (records = [], mapping = {}) => {
  return records.map((record) => {
    const crmRecord = {};
    const extraFields = [];

    for (const [csvHeader, value] of Object.entries(record)) {
      const crmField = mapping[csvHeader];

      if (crmField) {
        crmRecord[crmField] = value;
      } else if (value) {
        extraFields.push(`${csvHeader}: ${value}`);
      }
    }

    // ⭐ Merge existing crm_note with extra fields
    const notes = [];

    if (crmRecord.crm_note) {
      notes.push(crmRecord.crm_note);
    }

    notes.push(...extraFields);

    if (notes.length > 0) {
      crmRecord.crm_note = notes.join(" | ");
    }

    return crmRecord;
  });
};