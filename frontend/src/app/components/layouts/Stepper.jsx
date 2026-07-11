import { Check } from "lucide-react";

const steps = [
  { id: 1, name: "Upload" },
  { id: 2, name: "Preview" },
  { id: 3, name: "Import" },
  { id: 4, name: "Results" },
];

export default function Stepper({ currentStep = 1 }) {
  return (
    <div className="mt-8 flex items-center justify-center px-4">
      <div className="flex w-full max-w-3xl items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-1 items-center last:flex-initial">
              <div className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300
                    ${isCompleted
                      ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-100"
                      : isActive
                        ? "bg-white border-violet-600 text-violet-600 ring-4 ring-violet-50 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-400"
                    }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 stroke-[3]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`ml-3 hidden text-sm font-medium sm:inline whitespace-nowrap transition-colors duration-300
                    ${isActive
                      ? "text-slate-900 font-semibold"
                      : isCompleted
                        ? "text-slate-600"
                        : "text-slate-400"
                    }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Connecting Line */}
              {index !== steps.length - 1 && (
                <div className="mx-4 h-[2px] min-w-[2rem] flex-1 transition-all duration-500">
                  <div
                    className={`h-full w-full rounded-full transition-all duration-500
                      ${isCompleted ? "bg-violet-600" : "bg-slate-200"}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}