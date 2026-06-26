import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function YouTubeForm({ value = "", onChange }: QRFormProps) {
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
      placeholder="YouTube video or channel URL"
      className={inputClassName}
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    />
  );
}
