import { User, Mail, MapPin, Briefcase, Calendar, FileText } from "lucide-react";

const getStatusBadge = (status) => {
  const cleanStatus = String(status || "").trim();
  switch (cleanStatus) {
    case "GOOD_LEAD_FOLLOW_UP":
      return (
        <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 border border-violet-100">
          Good Lead
        </span>
      );
    case "SALE_DONE":
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
          Sale Completed
        </span>
      );
    case "DID_NOT_CONNECT":
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-100">
          No Connection
        </span>
      );
    case "BAD_LEAD":
      return (
        <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-100">
          Bad Lead
        </span>
      );
    default:
      return status ? (
        <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-100">
          {status}
        </span>
      ) : (
        <span className="text-slate-300">—</span>
      );
  }
};

const formatDataSource = (source) => {
  if (!source) return <span className="text-slate-300">—</span>;
  const formatted = source
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return <span className="font-semibold text-slate-600">{formatted}</span>;
};

export default function ResultTable({ records = [] }) {
  if (!records || records.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-400 font-medium">
        No records imported.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-violet-600" />
          Enriched CRM Leads ({records.length})
        </h3>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="max-h-[550px] overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-600">
                  Lead Details
                </th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-600">
                  Contact Info
                </th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-600">
                  Status
                </th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-600">
                  Project / Source
                </th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-600">
                  Location
                </th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-600">
                  Owner & Date
                </th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-600">
                  CRM Note & Desc
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record, index) => {
                // Formatting Location details
                const locationParts = [record.city, record.state, record.country].filter(
                  (part) => part && String(part).trim() !== ""
                );
                const locationString = locationParts.join(", ");

                // Formatting Phone number details
                const phoneString = [record.country_code, record.mobile_without_country_code]
                  .filter((p) => p && String(p).trim() !== "")
                  .join(" ");

                return (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    {/* Lead Details (Name and Company) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                          <User className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">
                            {record.name || "Unknown Lead"}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {record.company || "No Company"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info (Email and Phone) */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-slate-700 flex items-center gap-1.5">
                          {record.email ? (
                            <>
                              <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[200px]" title={record.email}>
                                {record.email}
                              </span>
                            </>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </p>
                        {phoneString && (
                          <p className="text-xs text-slate-400 font-medium pl-5">
                            {phoneString}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.crm_status)}
                    </td>

                    {/* Project / Data Source */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        {formatDataSource(record.data_source)}
                        {record.possession_time && (
                          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                            <Calendar className="h-2.5 w-2.5" />
                            Possession: {record.possession_time}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      {locationString ? (
                        <p className="text-slate-600 font-medium flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[150px]" title={locationString}>
                            {locationString}
                          </span>
                        </p>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Owner & Created At */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-xs">
                        <p className="font-semibold text-slate-700">
                          {record.lead_owner || "Unassigned"}
                        </p>
                        {record.created_at && (
                          <p className="text-slate-400 mt-0.5 font-medium">
                            {new Date(record.created_at).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* CRM Note & Description */}
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex flex-col gap-1 text-xs">
                        {record.crm_note ? (
                          <p className="text-slate-600 font-medium line-clamp-2" title={record.crm_note}>
                            <span className="font-bold text-violet-600">Note: </span>
                            {record.crm_note}
                          </p>
                        ) : null}
                        {record.description ? (
                          <p className="text-slate-400 italic line-clamp-1" title={record.description}>
                            "{record.description}"
                          </p>
                        ) : null}
                        {!record.crm_note && !record.description && (
                          <span className="text-slate-300">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
