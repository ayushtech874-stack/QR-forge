"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { QrCode } from "lucide-react";
import { DownloadBar } from "./download-bar";

interface LiveQRPreviewProps {
  value: string;
  options?: any;
}

const defaultOptions = {
  width: 300,
  height: 300,
  dotsOptions: { type: "rounded", color: "#7c3aed" },
  backgroundOptions: { color: "#ffffff" },
  cornersSquareOptions: { type: "extra-rounded" },
  qrOptions: { errorCorrectionLevel: "H" as const },
};

export function LiveQRPreview({ value, options = {} }: LiveQRPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const [qrCode] = useState<QRCodeStyling | null>(() => {
    if (typeof window !== "undefined") {
      return new QRCodeStyling({ ...defaultOptions, ...options });
    }
    return null;
  });

  useEffect(() => {
    if (ref.current && qrCode) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode || !value) return;
    qrCode.update({ data: value, ...defaultOptions, ...options });
  }, [qrCode, value, options]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative mx-auto flex items-center justify-center p-2">
        {/* Animated Glowing Border Background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 bg-[length:200%_200%] animate-border-glow opacity-50 blur-md dark:opacity-75"></div>
        
        {/* Card Wrapper */}
        <div className="relative z-10 flex h-[260px] w-[260px] md:h-[300px] md:w-[300px] items-center justify-center rounded-2xl bg-white p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <div 
            ref={ref} 
            className={`flex h-full w-full items-center justify-center bg-white rounded-xl [&>canvas]:max-w-full [&>canvas]:h-auto [&>svg]:max-w-full [&>svg]:h-auto ${!value ? "hidden" : ""}`} 
          />
          
          {!value && (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
              <QrCode className="h-12 w-12 text-zinc-400 mb-2 opacity-50" strokeWidth={1.5} />
              <p className="text-sm font-medium text-zinc-500 text-center px-4">
                Enter details to preview QR
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Download Action Bar */}
      <DownloadBar qrCode={qrCode} qrRef={ref} disabled={!value} />
    </div>
  );
}
