"use client";

import { useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { toJpeg, toPng } from "html-to-image";
import { Copy } from "lucide-react";

interface DownloadBarProps {
  qrCode: QRCodeStyling | null;
  qrRef: React.RefObject<HTMLDivElement>;
  disabled: boolean;
}

export function DownloadBar({ qrCode, qrRef, disabled }: DownloadBarProps) {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const downloadPNG = async () => {
    if (!qrCode || disabled) return;
    await qrCode.download({ extension: "png", name: "qrforge-code" });
    showToast("PNG Downloaded ✓");
  };

  const downloadSVG = async () => {
    if (!qrCode || disabled) return;
    await qrCode.download({ extension: "svg", name: "qrforge-code" });
    showToast("SVG Downloaded ✓");
  };

  const downloadJPEG = async () => {
    if (!qrRef.current || disabled) return;
    try {
      const dataUrl = await toJpeg(qrRef.current, { 
        quality: 1, 
        backgroundColor: '#ffffff'
      });
      const link = document.createElement("a");
      link.download = "qrforge-code.jpeg";
      link.href = dataUrl;
      link.click();
      showToast("JPEG Downloaded ✓");
    } catch (err) {
      console.error(err);
      showToast("Error downloading JPEG");
    }
  };

  const copyToClipboard = async () => {
    if (!qrRef.current || disabled) return;
    try {
      const dataUrl = await toPng(qrRef.current, { 
        backgroundColor: '#ffffff'
      });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      showToast("Copied to clipboard ✓");
    } catch (err) {
      console.error(err);
      showToast("Error copying to clipboard");
    }
  };

  return (
    <>
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-sm font-medium px-6 py-3 rounded-full shadow-2xl dark:bg-white dark:text-zinc-900 z-50 animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full">
        <button
          onClick={downloadPNG}
          disabled={disabled}
          className="px-4 py-2.5 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-violet-600/20"
        >
          Download PNG
        </button>
        <button
          onClick={downloadSVG}
          disabled={disabled}
          className="px-4 py-2.5 text-sm font-medium rounded-xl border border-violet-600 text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download SVG
        </button>
        <button
          onClick={downloadJPEG}
          disabled={disabled}
          className="px-4 py-2.5 text-sm font-medium rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download JPEG
        </button>
        <button
          onClick={copyToClipboard}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy className="h-4 w-4" />
          Copy
        </button>
      </div>
    </>
  );
}
