"use client";

import { useState } from "react";
import QRCodeStyling from "qr-code-styling";
import JSZip from "jszip";
import { ChevronDown, ChevronUp, UploadCloud, FileType } from "lucide-react";
import { QROptions } from "./qr-customizer";
import { QRTypeSelector, QRType } from "./qr-type-selector";

interface BatchModeProps {
  options: QROptions;
}

function formatBatchValue(type: QRType, raw: string) {
  const val = raw.trim();
  switch (type) {
    case "URL": return val.startsWith("http") ? val : `https://${val}`;
    case "Phone": return `tel:${val.replace(/[\s-]/g, "")}`;
    case "WhatsApp": return `https://wa.me/${val.replace(/[\s+]/g, "")}`;
    case "Email": return `mailto:${val}`;
    case "Instagram": return val.includes("instagram.com") ? val : `https://instagram.com/${val.replace("@", "")}`;
    default: return val;
  }
}

export function BatchMode({ options }: BatchModeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [csvData, setCsvData] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<QRType>("URL");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        // Parse CSV: split by newline, then comma, take first col, filter empty
        const lines = text.split(/\r?\n/);
        const parsed = lines
          .map(line => line.split(",")[0].trim())
          .filter(val => val.length > 0);
        
        if (parsed.length > 50) {
          setError(`Found ${parsed.length} items. Max limit is 50 per batch.`);
          setCsvData([]);
        } else if (parsed.length === 0) {
          setError("No valid data found in CSV.");
          setCsvData([]);
        } else {
          setCsvData(parsed);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const generateZip = async () => {
    if (csvData.length === 0) return;
    setIsGenerating(true);
    setProgress(0);
    setError(null);

    try {
      const zip = new JSZip();
      const folder = zip.folder("qrforge-batch");

      for (let i = 0; i < csvData.length; i++) {
        const rawValue = csvData[i];
        const formattedData = formatBatchValue(selectedType, rawValue);

        const qr = new QRCodeStyling({
          ...options,
          data: formattedData
        });

        const blob = await qr.getRawData("png");
        if (blob && folder) {
          folder.file(`qr-${i + 1}.png`, blob);
        }

        setProgress(Math.round(((i + 1) / csvData.length) * 100));
      }

      if (folder) {
        const content = await folder.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrforge-batch.zip";
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during generation.");
    } finally {
      setIsGenerating(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 mt-8 mb-16">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
      >
        <span className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
          <FileType className="h-5 w-5 text-violet-600" />
          Batch Generate
        </span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
      </button>

      {isOpen && (
        <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-8 animate-in slide-in-from-top-4 fade-in">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 text-center">Batch Data Type</h3>
            <QRTypeSelector 
              selectedType={selectedType} 
              onSelect={setSelectedType} 
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Upload CSV</h3>
            
            <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group cursor-pointer overflow-hidden">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isGenerating}
              />
              <UploadCloud className="h-8 w-8 text-zinc-400 group-hover:text-violet-500 mb-3 transition-colors" />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Click or drag CSV file here</p>
              <p className="text-xs text-zinc-500 mt-1">One column of values. Max 50 rows.</p>
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          </div>

          {csvData.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Preview ({csvData.length} items)
                </h3>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                {csvData.slice(0, 5).map((row, idx) => (
                  <div key={idx} className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 last:border-0 truncate">
                    {row}
                  </div>
                ))}
                {csvData.length > 5 && (
                  <div className="px-4 py-2 text-xs font-medium text-zinc-500 italic bg-zinc-100 dark:bg-zinc-950">
                    ...and {csvData.length - 5} more
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-4">
                <button
                  onClick={generateZip}
                  disabled={isGenerating}
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-violet-600/20"
                >
                  {isGenerating ? "Generating..." : "Generate & Download ZIP"}
                </button>

                {(isGenerating || progress > 0) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-violet-600 dark:text-violet-400">
                      <span>{progress === 100 ? "Complete!" : "Processing..."}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-violet-600 transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
