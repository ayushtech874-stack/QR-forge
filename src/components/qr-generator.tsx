"use client";

import { useState } from "react";
import { QRTypeSelector, type QRType } from "./qr-type-selector";
import {
  URLForm, WhatsAppForm, InstagramForm, YouTubeForm,
  EmailForm, PhoneForm, WiFiForm, UPIForm,
  VCardForm, TextForm, LocationForm
} from "./forms";
import { LiveQRPreview } from "./live-qr-preview";
import { QRCustomizer, defaultQROptions, type QROptions } from "./qr-customizer";
import { CenterIconUpload } from "./center-icon-upload";
import { RecentQRs } from "./recent-qrs";
import { BatchMode } from "./batch-mode";
import { ScanTest } from "./scan-test";

export function QRGenerator() {
  const [selectedType, setSelectedType] = useState<QRType>("URL");
  const [inputValue, setInputValue] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [qrOptions, setQrOptions] = useState<QROptions>(defaultQROptions);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("text");
    setInputValue(text);
    
    if (text.includes("wa.me") || text.includes("whatsapp")) {
      setSelectedType("WhatsApp");
    } else if (text.includes("instagram.com")) {
      setSelectedType("Instagram");
    } else if (text.includes("youtube.com") || text.includes("youtu.be")) {
      setSelectedType("YouTube");
    } else if (text.includes("@") && !text.includes(" ")) {
      setSelectedType("Email");
    } else if (/^\+?\d+$/.test(text.replace(/[\s-]/g, ""))) {
      setSelectedType("Phone");
    } else if (text.startsWith("http://") || text.startsWith("https://") || text.includes("www.")) {
      setSelectedType("URL");
    }
  };

  const renderInputForm = () => {
    switch (selectedType) {
      case "URL": return <URLForm value={inputValue} onChange={setQrValue} />;
      case "WhatsApp": return <WhatsAppForm value={inputValue} onChange={setQrValue} />;
      case "Instagram": return <InstagramForm value={inputValue} onChange={setQrValue} />;
      case "YouTube": return <YouTubeForm value={inputValue} onChange={setQrValue} />;
      case "Email": return <EmailForm value={inputValue} onChange={setQrValue} />;
      case "Phone": return <PhoneForm value={inputValue} onChange={setQrValue} />;
      case "WiFi": return <WiFiForm value={inputValue} onChange={setQrValue} />;
      case "UPI": return <UPIForm value={inputValue} onChange={setQrValue} />;
      case "vCard": return <VCardForm onChange={setQrValue} />;
      case "Text": return <TextForm value={inputValue} onChange={setQrValue} />;
      case "Location": return <LocationForm value={inputValue} onChange={setQrValue} />;
      default: return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8" onPaste={handlePaste}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">Select QR Code Type</h2>
        <QRTypeSelector 
          selectedType={selectedType} 
          onSelect={(type) => {
            setSelectedType(type);
            setInputValue("");
          }} 
        />
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-8 items-start justify-center">
        {/* Left Column: Form and Customizer Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 transition-all duration-300">
            <h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Enter {selectedType} Details
            </h3>
            <div key={selectedType} className="animate-in fade-in slide-in-from-right-4 duration-300">
              {renderInputForm()}
            </div>
          </div>
          
          <CenterIconUpload options={qrOptions} onChange={setQrOptions} />
          <QRCustomizer options={qrOptions} onChange={setQrOptions} />
        </div>

        {/* Right Column: Live Preview Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:sticky lg:top-24 z-20">
          <LiveQRPreview value={qrValue} options={qrOptions} />
          <div className="w-[260px] md:w-[300px]">
            <ScanTest />
          </div>
        </div>
      </div>

      <RecentQRs 
        currentQR={{ selectedType, inputValue, qrValue, qrOptions }} 
        onReuse={(historyItem) => {
          setSelectedType(historyItem.type);
          setInputValue(historyItem.inputValue);
          setQrValue(historyItem.qrValue);
          setQrOptions(historyItem.qrOptions);
        }}
      />

      <BatchMode options={qrOptions} />
    </div>
  );
}
