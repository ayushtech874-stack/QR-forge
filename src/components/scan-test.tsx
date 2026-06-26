"use client";

import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Camera, CheckCircle2, X } from "lucide-react";

export function ScanTest() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          setScanResult(decodedText);
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 2500);
          
          // Stop scanning
          if (scannerRef.current) {
            scannerRef.current.clear().catch(console.error);
            scannerRef.current = null;
          }
          setIsScanning(false);
        },
        () => {
          // ignore errors silently while scanning
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  return (
    <div className="w-full flex flex-col items-center mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="h-4 w-4" />
          Successfully scanned!
        </div>
      )}

      {!isScanning ? (
        <button
          onClick={() => {
            setScanResult(null);
            setIsScanning(true);
          }}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-xl text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/30 transition-colors shadow-sm border border-violet-200 dark:border-violet-900 bg-white dark:bg-zinc-950 w-full justify-center"
        >
          <Camera className="h-4 w-4" />
          Scan Test with Camera
        </button>
      ) : (
        <div className="w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Scanning QR...</h3>
            <button 
              onClick={() => {
                if (scannerRef.current) {
                  scannerRef.current.clear().catch(console.error);
                  scannerRef.current = null;
                }
                setIsScanning(false);
              }}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div id="reader" className="w-full overflow-hidden rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 [&_video]:w-full [&_video]:rounded-lg [&_button]:mt-4 [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-lg [&_button]:bg-violet-600 [&_button]:text-white [&_a]:hidden" />
        </div>
      )}
      
      {scanResult && !isScanning && (
        <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200 dark:bg-green-950/30 dark:border-green-900 text-sm text-green-800 dark:text-green-300 w-full break-all animate-in fade-in slide-in-from-top-2">
          <strong>Result:</strong> {scanResult}
        </div>
      )}
    </div>
  );
}
