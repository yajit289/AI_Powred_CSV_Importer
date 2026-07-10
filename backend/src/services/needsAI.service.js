export const needsAI = (record) => {
  // Missing country code but has mobile
  if (
    record.mobile_without_country_code &&
    !record.country_code
  ) {
    return true;
  }

  // Multiple emails
  if (
    record.email &&
    record.email.includes(",")
  ) {
    return true;
  }

  // Multiple mobiles
  if (
    record.mobile_without_country_code &&
    record.mobile_without_country_code.includes(",")
  ) {
    return true;
  }

  // Missing CRM Status
  if (!record.crm_status) {
    return true;
  }

  // Missing Data Source
  if (!record.data_source) {
    return true;
  }

  return false;
};