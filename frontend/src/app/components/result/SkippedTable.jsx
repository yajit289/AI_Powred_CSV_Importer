import { AlertOctagon, CheckCircle } from "lucide-react";

export default function SkippedTable({ records = [] }) {
  if (!records || records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/30 p-8 text-center shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-emerald-800">100% Successfully Imported!</h4>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">
            All rows passed validation. No records were skipped.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <AlertOctagon className="h-5 w-5 text-rose-500" />
          Skipped Records ({records.length})
        </h3>
      </div>

      <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
        <div className="max-h-[350px] overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="sticky top-0 z-10 border-b border-rose-100 bg-rose-50/50 shadow-[0_1px_0_0_rgba(254,226,226,1)]">
                <th className="whitespace-nowrap px-6 py-3.5 font-semibold text-rose-800 w-[100px]">
                  Row #
                </th>
                <th className="whitespace-nowrap px-6 py-3.5 font-semibold text-rose-800">
                  Lead Name
                </th>
                <th className="whitespace-nowrap px-6 py-3.5 font-semibold text-rose-800">
                  Company
                </th>
                <th className="whitespace-nowrap px-6 py-3.5 font-semibold text-rose-800">
                  Skip Reason
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {records.map((record, index) => (
                <tr key={index} className="hover:bg-rose-50/20 transition-colors">
                  <td className="px-6 py-3.5 font-bold text-rose-600">
                    #{record.rowNumber}
                  </td>
                  <td className="px-6 py-3.5">
                    <p className="font-semibold text-slate-800">
                      {record.name || "Unknown Lead"}
                    </p>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 font-medium">
                    {record.company || "—"}
                  </td>
                  <td className="px-6 py-3.5">
                    <p className="font-semibold text-rose-600">
                      {record.reason}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
