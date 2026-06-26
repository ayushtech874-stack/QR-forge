import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function TextForm({ value = "", onChange }: QRFormProps) {
  const [text, setText] = useState(value);
  const maxLength = 300;

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    onChange(text);
  }, [text, onChange]);

  return (
    <div className="space-y-2">
      <textarea
        placeholder="Enter your text here..."
        rows={4}
        maxLength={maxLength}
        className={inputClassName}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="text-right text-xs text-zinc-500 dark:text-zinc-400">
        {text.length} / {maxLength} characters
      </div>
    </div>
  );
}
