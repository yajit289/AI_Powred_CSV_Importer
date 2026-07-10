import { parseCSV } from "./csv.service.js";
import { analyzeHeaders } from "./header.service.js";
import { mapHeaders } from "./mappingServices.js";
import { mapUnknownHeaders, extractCRMRecords } from "./ai.service.js"
import { transformRecords } from "./transform.service.js";
import { createBatches } from "./batch.service.js";
export const importLeads = async (buffer) => {
  try {
    //prase csv
    const { headers, records } = await parseCSV(buffer)
    //Analyze Headers
    const headerInfo = analyzeHeaders(headers)
    //Rule Based Header Mapping
    const mappedHeaders = mapHeaders(headerInfo.headers);
    //AI Header Mapping
    const aiResult = await mapUnknownHeaders(mappedHeaders.unresolved);
    //Merge Rule+AI Mapping
    const finalMapping = { ...mappedHeaders.mapping, ...aiResult.mapping };
    // transform Records
    const transformedRecords = transformRecords(records, finalMapping)
    //batching
    const batches = createBatches(transformedRecords);
    // AI Records Enrichment
    const enrichedRecords = [];
    for (const batch of batches) {
      const enrichedBatch  = await extractCRMRecords(batch);

      enrichedRecords.push(...enrichedBatch );
    }
    console.log(enrichedRecords)

    return {
      success: true,
      mappedHeaders,
      headerInfo,
      finalMapping,
      transformedRecords,
      enrichedRecords
    };

  } catch (error) {
    throw error;
  }

}