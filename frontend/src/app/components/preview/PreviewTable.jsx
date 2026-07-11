export default function PreviewTable({ headers, rows }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="max-h-[400px] overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
                {/* Index header */}
                <th className="whitespace-nowrap px-4 py-3 font-bold text-slate-500 pl-6 w-12 text-center">
                  #
                </th>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600 last:pr-6"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Row number */}
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-400 pl-6 w-12 text-center">
                    {idx + 1}
                  </td>
                  {headers.map((header) => {
                    const val = row[header];
                    return (
                      <td
                        key={header}
                        className="whitespace-nowrap px-4 py-3 text-slate-700 last:pr-6 max-w-xs truncate"
                        title={val !== undefined && val !== null ? String(val) : ""}
                      >
                        {val !== undefined && val !== null && String(val).trim() !== "" ? String(val) : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
