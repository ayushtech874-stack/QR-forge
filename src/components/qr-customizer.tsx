"use client";

import { Info } from "lucide-react";

export interface QROptions {
  width: number;
  height: number;
  image?: string;
  imageOptions?: {
    imageSize: number;
    margin: number;
    hideBackgroundDots: boolean;
  };
  dotsOptions: { type: string; color: string };
  backgroundOptions: { color: string };
  cornersSquareOptions: { type: string };
  qrOptions: { errorCorrectionLevel: string };
}

export const defaultQROptions: QROptions = {
  width: 300,
  height: 300,
  image: "",
  imageOptions: {
    imageSize: 0.4,
    margin: 5,
    hideBackgroundDots: true,
  },
  dotsOptions: { type: "rounded", color: "#7c3aed" },
  backgroundOptions: { color: "#ffffff" },
  cornersSquareOptions: { type: "extra-rounded" },
  qrOptions: { errorCorrectionLevel: "H" },
};

interface QRCustomizerProps {
  options: QROptions;
  onChange: (options: QROptions) => void;
}

const dotStyles = [
  { id: "square", label: "Square", radius: "rounded-none" },
  { id: "dots", label: "Dots", radius: "rounded-full" },
  { id: "rounded", label: "Rounded", radius: "rounded-sm" },
  { id: "extra-rounded", label: "Extra-Rounded", radius: "rounded-md" },
  { id: "classy", label: "Classy", radius: "rounded-[4px] rounded-tr-xl" },
  { id: "classy-rounded", label: "Classy-Rounded", radius: "rounded-full rounded-tr-none" },
];

const cornerStyles = [
  { id: "square", label: "Square", radius: "rounded-none" },
  { id: "dot", label: "Dot", radius: "rounded-full" },
  { id: "extra-rounded", label: "Extra-Rounded", radius: "rounded-xl" },
];

export function QRCustomizer({ options, onChange }: QRCustomizerProps) {
  const updateOptions = (updates: Partial<QROptions>) => {
    onChange({ ...options, ...updates });
  };

  const updateDots = (updates: Partial<QROptions["dotsOptions"]>) => {
    updateOptions({ dotsOptions: { ...options.dotsOptions, ...updates } });
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 p-6 space-y-8 mt-8">
      {/* Colors Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Colors</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative overflow-hidden rounded-full h-8 w-8 border border-zinc-200 dark:border-zinc-700">
              <input
                type="color"
                value={options.dotsOptions.color}
                onChange={(e) => updateDots({ color: e.target.value })}
                className="absolute -top-2 -left-2 h-12 w-12 cursor-pointer"
              />
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Dot Color</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative overflow-hidden rounded-full h-8 w-8 border border-zinc-200 dark:border-zinc-700">
              <input
                type="color"
                value={options.backgroundOptions.color}
                onChange={(e) => updateOptions({ backgroundOptions: { color: e.target.value } })}
                className="absolute -top-2 -left-2 h-12 w-12 cursor-pointer"
              />
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Background Color</span>
          </label>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Dot Style Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Dot Style</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {dotStyles.map((style) => {
            const isActive = options.dotsOptions.type === style.id;
            return (
              <button
                key={style.id}
                onClick={() => updateDots({ type: style.id })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  isActive
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-1 ring-violet-500"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <div className="grid grid-cols-2 gap-1 mb-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-2.5 w-2.5 bg-current ${style.radius}`} />
                  ))}
                </div>
                <span className="text-xs font-medium">{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Corner Style Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Corner Style</h3>
        <div className="grid grid-cols-3 gap-3">
          {cornerStyles.map((style) => {
            const isActive = options.cornersSquareOptions.type === style.id;
            return (
              <button
                key={style.id}
                onClick={() => updateOptions({ cornersSquareOptions: { type: style.id } })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  isActive
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-1 ring-violet-500"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <div className={`h-5 w-5 border-2 border-current mb-2 ${style.radius}`} />
                <span className="text-xs font-medium">{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Error Correction Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Error Correction</h3>
          <div className="group relative flex items-center justify-center">
            <Info className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-48 rounded-lg bg-zinc-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block dark:bg-zinc-100 dark:text-zinc-900 z-10 text-center">
              Higher = more scannable when logo is added
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {["L", "M", "Q", "H"].map((level) => {
            const isActive = options.qrOptions.errorCorrectionLevel === level;
            return (
              <button
                key={level}
                onClick={() => updateOptions({ qrOptions: { errorCorrectionLevel: level } })}
                className={`flex-1 py-2 text-sm font-medium rounded-xl border transition-all ${
                  isActive
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-1 ring-violet-500"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* QR Size Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">QR Size</h3>
          <span className="text-xs text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{options.width}px</span>
        </div>
        <input
          type="range"
          min="200"
          max="500"
          step="10"
          value={options.width}
          onChange={(e) => {
            const size = parseInt(e.target.value);
            updateOptions({ width: size, height: size });
          }}
          className="w-full accent-violet-600"
        />
      </div>
    </div>
  );
}
