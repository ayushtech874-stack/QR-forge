import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function URLForm({ value = "", onChange }: QRFormProps) {
  const [url, setUrl] = useState(value);

  useEffect(() => {
    setUrl(value);
  }, [value]);

  useEffect(() => {
    onChange(url);
  }, [url, onChange]);

  return (
    <input
      type="url"
      placeholder="Paste any link here..."
      className={inputClassName}
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    />
  );
}
