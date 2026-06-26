"use client";

import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { QROptions } from "./qr-customizer";

const presets = [
  { 
    name: "WiFi", 
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`
  },
  {
    name: "WhatsApp",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="%2325D366"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.7c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`
  },
  {
    name: "Instagram",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="%23f09433"/><stop offset="25%" stop-color="%23e6683c"/><stop offset="50%" stop-color="%23dc2743"/><stop offset="75%" stop-color="%23cc2366"/><stop offset="100%" stop-color="%23bc1888"/></linearGradient></defs><path fill="url(%23ig)" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>`
  },
  {
    name: "Telegram",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="%230088cc"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>`
  },
  {
    name: "YouTube",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
  },
  {
    name: "Email",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="%23ea4335"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>`
  }
];

interface CenterIconUploadProps {
  options: QROptions;
  onChange: (options: QROptions) => void;
}

export function CenterIconUpload({ options, onChange }: CenterIconUploadProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const setLogo = (src: string) => {
    onChange({
      ...options,
      image: src,
      qrOptions: { ...options.qrOptions, errorCorrectionLevel: "H" },
    });
    if (options.qrOptions.errorCorrectionLevel !== "H") {
      showToast();
    }
  };

  const removeLogo = () => {
    onChange({
      ...options,
      image: "",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const updateSize = (size: number) => {
    onChange({
      ...options,
      imageOptions: { ...options.imageOptions, imageSize: size, margin: 5, hideBackgroundDots: true },
    });
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 p-6 space-y-6 mt-8 relative">
      {toastVisible && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-4 py-2 rounded-lg shadow-lg dark:bg-zinc-100 dark:text-zinc-900 z-50">
          Error correction set to High for best scan accuracy
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Center Logo</h3>
        {options.image && (
          <button 
            onClick={removeLogo}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Upload Button or Preview */}
        <div className="shrink-0">
          {options.image ? (
            <div className="h-16 w-16 rounded-full border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-zinc-50 flex items-center justify-center p-2">
              <img src={options.image} alt="Logo" className="w-full h-full object-contain" />
            </div>
          ) : (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
            >
              <Upload className="h-5 w-5" />
            </button>
          )}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/svg+xml" 
            className="hidden" 
          />
        </div>

        {/* Quick Presets */}
        <div className="flex-1 space-y-2">
          <p className="text-xs font-medium text-zinc-500">Quick Icons</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setLogo(preset.src)}
                className={`h-8 w-8 rounded-lg border flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 transition-colors ${
                  options.image === preset.src 
                    ? "border-violet-500 ring-1 ring-violet-500" 
                    : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                }`}
                title={preset.name}
              >
                <img src={preset.src} alt={preset.name} className="h-5 w-5 object-contain" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {options.image && (
        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Icon Size</h3>
            <span className="text-xs text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
              {Math.round((options.imageOptions?.imageSize || 0.4) * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={(options.imageOptions?.imageSize || 0.4) * 100}
            onChange={(e) => updateSize(parseInt(e.target.value) / 100)}
            className="w-full accent-violet-600"
          />
        </div>
      )}
    </div>
  );
}
