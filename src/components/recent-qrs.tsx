"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { History, RefreshCw } from "lucide-react";
import { QROptions } from "./qr-customizer";
import { QRType } from "./qr-type-selector";

export interface QRHistoryItem {
  id: string;
  type: QRType;
  inputValue: string;
  qrValue: string;
  qrOptions: QROptions;
  timestamp: number;
}

interface RecentQRsProps {
  currentQR: {
    selectedType: QRType;
    inputValue: string;
    qrValue: string;
    qrOptions: QROptions;
  };
  onReuse: (item: QRHistoryItem) => void;
}

function MiniQRPreview({ value, options }: { value: string; options: QROptions }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    
    // Scale down image margin for the mini preview
    const miniOptions = { ...options };
    if (miniOptions.imageOptions) {
      miniOptions.imageOptions = { ...miniOptions.imageOptions, margin: 1 };
    }

    const qrCode = new QRCodeStyling({
      ...miniOptions,
      width: 80,
      height: 80,
      data: value
    });
    
    ref.current.innerHTML = "";
    qrCode.append(ref.current);
  }, [value, options]);

  return <div ref={ref} className="h-[80px] w-[80px] rounded-lg overflow-hidden bg-white shrink-0 shadow-sm border border-zinc-200 dark:border-zinc-700 [&>canvas]:h-full [&>canvas]:w-full [&>svg]:h-full [&>svg]:w-full" />;
}

function timeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export function RecentQRs({ currentQR, onReuse }: RecentQRsProps) {
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const { selectedType, inputValue, qrValue, qrOptions } = currentQR;

  useEffect(() => {
    const saved = localStorage.getItem("qrforge_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!qrValue) return;

    const timer = setTimeout(() => {
      setHistory(prev => {
        const newItem: QRHistoryItem = {
          id: crypto.randomUUID(),
          type: selectedType,
          inputValue,
          qrValue,
          qrOptions,
          timestamp: Date.now()
        };
        
        const isDuplicate = prev.length > 0 && 
                            prev[0].qrValue === qrValue && 
                            JSON.stringify(prev[0].qrOptions) === JSON.stringify(qrOptions) &&
                            prev[0].type === selectedType;
        
        if (isDuplicate) return prev;

        const updated = [newItem, ...prev].slice(0, 6);
        localStorage.setItem("qrforge_history", JSON.stringify(updated));
        return updated;
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedType, inputValue, qrValue, qrOptions]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("qrforge_history");
  };

  if (history.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          <History className="h-5 w-5" /> Recent
        </h2>
        <button 
          onClick={clearHistory}
          className="text-sm font-medium text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map(item => (
          <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md">
            <MiniQRPreview value={item.qrValue} options={item.qrOptions} />
            <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-100 rounded-full dark:text-violet-300 dark:bg-violet-900/30">
                    {item.type}
                  </span>
                  <span className="text-xs text-zinc-500 whitespace-nowrap ml-2">{timeAgo(item.timestamp)}</span>
                </div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate" title={item.qrValue}>
                  {item.qrValue}
                </p>
              </div>
              <button 
                onClick={() => {
                  onReuse(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="self-start flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors mt-2"
              >
                <RefreshCw className="h-3 w-3" /> Reuse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
