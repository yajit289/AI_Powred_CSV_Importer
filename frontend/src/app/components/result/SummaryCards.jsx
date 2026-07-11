import { CheckCircle2, AlertTriangle, PlayCircle } from "lucide-react";

export default function SummaryCards({ totalProcessed = 0, totalImported = 0, totalSkipped = 0 }) {
  const cards = [
    {
      label: "Total Processed",
      value: totalProcessed,
      icon: PlayCircle,
      color: "text-slate-600 bg-slate-50 border-slate-100",
      description: "Total rows parsed from CSV",
    },
    {
      label: "Successfully Imported",
      value: totalImported,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      description: "Mapped and sent to CRM",
    },
    {
      label: "Skipped Records",
      value: totalSkipped,
      icon: AlertTriangle,
      color: totalSkipped > 0
        ? "text-rose-600 bg-rose-50 border-rose-100"
        : "text-slate-400 bg-slate-50 border-slate-100",
      description: "Missing critical contact details",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`flex flex-col rounded-2xl border p-6 bg-white shadow-sm transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">{card.label}</span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.color.split(" ")[0]} ${card.color.split(" ")[1]}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-slate-800">
                {card.value.toLocaleString()}
              </h3>
              <p className="mt-1.5 text-xs text-slate-400 font-medium">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
