import { FileText, Layers, Hash, HardDrive } from "lucide-react";
import formatBytes from "@/utils/formatBytes";

export default function PreviewStats({ fileName, fileSize, totalRows, totalCols }) {
  const stats = [
    {
      label: "File Name",
      value: fileName,
      icon: FileText,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Total Rows",
      value: totalRows.toLocaleString(),
      icon: Hash,
      color: "text-violet-600 bg-violet-50",
    },
    {
      label: "Total Columns",
      value: totalCols.toLocaleString(),
      icon: Layers,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "File Size",
      value: formatBytes(fileSize),
      icon: HardDrive,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
              <h4 className="mt-1 truncate text-lg font-bold text-slate-800">
                {stat.value}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}
