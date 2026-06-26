import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function LocationForm({ value = "", onChange }: QRFormProps) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [inputUrl, setInputUrl] = useState(value);

  useEffect(() => {
    setInputUrl(value);
  }, [value]);

  useEffect(() => {
    if (inputUrl.includes("@")) {
      const match = inputUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        setLat(match[1]);
        setLng(match[2]);
      }
    }
  }, [inputUrl]);

  useEffect(() => {
    if (!lat || !lng) {
      onChange("");
      return;
    }
    onChange(`geo:${lat},${lng}`);
  }, [lat, lng, onChange]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          className={inputClassName}
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className={inputClassName}
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          Or paste a Google Maps link to auto-extract coordinates:
        </p>
        <input
          type="url"
          placeholder="https://www.google.com/maps/..."
          className={inputClassName}
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
      </div>
    </div>
  );
}
