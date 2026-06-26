import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function EmailForm({ value = "", onChange }: QRFormProps) {
  const [to, setTo] = useState(value);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTo(value);
  }, [value]);

  useEffect(() => {
    if (!to) {
      onChange("");
      return;
    }
    let qrValue = `mailto:${to}`;
    const params = new URLSearchParams();
    if (subject) params.append("subject", subject);
    if (body) params.append("body", body);
    
    const queryString = params.toString();
    if (queryString) {
      qrValue += `?${queryString}`;
    }
    onChange(qrValue);
  }, [to, subject, body, onChange]);

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="To (example@email.com)"
        className={inputClassName}
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        className={inputClassName}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Body"
        rows={4}
        className={inputClassName}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </div>
  );
}
