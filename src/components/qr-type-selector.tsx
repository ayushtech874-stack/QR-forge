"use client";

import { 
  Link2, MessageCircle, Camera, Video, Mail, 
  Phone, Wifi, IndianRupee, IdCard, Type, MapPin 
} from "lucide-react";

export const qrTypes = [
  { id: "URL", label: "URL", icon: Link2 },
  { id: "WhatsApp", label: "WhatsApp", icon: MessageCircle },
  { id: "Instagram", label: "Instagram", icon: Camera },
  { id: "YouTube", label: "YouTube", icon: Video },
  { id: "Email", label: "Email", icon: Mail },
  { id: "Phone", label: "Phone", icon: Phone },
  { id: "WiFi", label: "WiFi", icon: Wifi },
  { id: "UPI", label: "UPI", icon: IndianRupee },
  { id: "vCard", label: "vCard", icon: IdCard },
  { id: "Text", label: "Text", icon: Type },
  { id: "Location", label: "Location", icon: MapPin },
] as const;

export type QRType = typeof qrTypes[number]["id"];

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelect: (type: QRType) => void;
}

export function QRTypeSelector({ selectedType, onSelect }: QRTypeSelectorProps) {
  return (
    <div className="w-full relative">
      <div 
        className="flex w-full items-center gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}} />
        {qrTypes.map((type) => {
          const Icon = type.icon;
          const isActive = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`
                flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                ${isActive 
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" 
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
