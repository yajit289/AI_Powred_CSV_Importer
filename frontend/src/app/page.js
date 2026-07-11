"use client";

import { useState } from "react";
import { toast } from "sonner";
import Header from "@/app/components/layouts/Header.jsx";
import PageContainer from "@/app/components/layouts/PageContainer.jsx";
import Stepper from "@/app/components/layouts/Stepper.jsx";
import UploadCard from "@/app/components/upload/UploadCard.jsx";
import PreviewStats from "@/app/components/preview/PreviewStats.jsx";
import PreviewTable from "@/app/components/preview/PreviewTable.jsx";
import ProcessingState from "@/app/components/import/ProcessingState.jsx";
import SummaryCards from "@/app/components/result/SummaryCards.jsx";
import ResultTable from "@/app/components/result/ResultTable.jsx";
import SkippedTable from "@/app/components/result/SkippedTable.jsx";

import useCsvParser from "@/hooks/useCsvParser";
import useImport from "@/hooks/useImport";
import { AlertCircle, RefreshCw, ChevronLeft, ChevronRight, FileSpreadsheet } from "lucide-react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);

  const {
    headers,
    rows,
    error: parseError,
    isParsing,
    parseCsv,
    resetParser,
  } = useCsvParser();

  const {
    isImporting,
    error: importError,
    result,
    importFile,
    resetImport,
  } = useImport();

  const handleFileSelected = async (selectedFile) => {
    setFile(selectedFile);
    const parseResult = await parseCsv(selectedFile);
    if (parseResult.error) {
      toast.error(parseResult.error);
    } else {
      toast.success(`Parsed ${parseResult.rows.length} rows successfully!`);
      setCurrentStep(2);
    }
  };

  const handleChooseAnother = () => {
    setFile(null);
    resetParser();
    resetImport();
    setCurrentStep(1);
  };

  const handleConfirmImport = async () => {
    setCurrentStep(3);
    const importResult = await importFile(file);
    if (importResult && importResult.success) {
      setCurrentStep(4);
      toast.success("CRM Leads imported and enriched successfully!");
    } else {
      toast.error(importResult.message || "Failed to process import.");
    }
  };

  const handleImportAnother = () => {
    setFile(null);
    resetParser();
    resetImport();
    setCurrentStep(1);
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <PageContainer>
        {/* Header */}
        <Header />

        {/* Dynamic Stepper */}
        <Stepper currentStep={currentStep} />

        {/* Main Work Area */}
        <div className="mt-10">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <UploadCard onFileSelected={handleFileSelected} />
          )}

          {/* Step 2: Preview */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-8">
              {/* Stats Cards */}
              <PreviewStats
                fileName={file?.name}
                fileSize={file?.size}
                totalRows={rows.length}
                totalCols={headers.length}
              />

              {/* CSV Original Structure Table */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-violet-600" />
                  Original CSV Structure Preview
                </h3>
                <PreviewTable headers={headers} rows={rows} />
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={handleChooseAnother}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Choose Another File
                </button>

                <button
                  type="button"
                  onClick={handleConfirmImport}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all"
                >
                  Confirm Import
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Processing & Errors */}
          {currentStep === 3 && (
            <div>
              {importError ? (
                /* Error Dashboard */
                <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-white p-12 text-center shadow-sm">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <AlertCircle className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-800">
                    Import Processing Failed
                  </h3>
                  <p className="mb-8 text-sm text-slate-500">
                    An error occurred while our AI normalizer was building your CRM leads.
                  </p>

                  <div className="mb-8 rounded-xl bg-red-50/50 border border-red-100 p-4 text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-500">Error Details</p>
                    <p className="mt-1 text-sm font-semibold text-red-700">{importError}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={handleChooseAnother}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back to Start
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmImport}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 cursor-pointer transition-all"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Retry Import
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic Indeterminate Loading Progress Screen */
                <ProcessingState fileName={file?.name} />
              )}
            </div>
          )}

          {/* Step 4: Results Dashboard */}
          {currentStep === 4 && result && (
            <div className="flex flex-col gap-10">
              {/* Summary Stats Cards */}
              <SummaryCards
                totalProcessed={result.summary?.totalProcessed}
                totalImported={result.summary?.totalImported}
                totalSkipped={result.summary?.totalSkipped}
              />

              {/* Success Enriched CRM Records Grid */}
              <ResultTable records={result.enrichedRecords} />

              {/* Skipped Table Callout */}
              <SkippedTable records={result.skippedRecords} />

              {/* Reset to import again */}
              <div className="flex justify-center border-t border-slate-200 pt-8">
                <button
                  type="button"
                  onClick={handleImportAnother}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 cursor-pointer transition-all"
                >
                  Import Another CSV File
                </button>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </main>
  );
}