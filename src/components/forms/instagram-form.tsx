import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function InstagramForm({ value = "", onChange }: QRFormProps) {
  const [username, setUsername] = useState(value);

  useEffect(() => {
    setUsername(value);
  }, [value]);

  useEffect(() => {
    if (!username) {
      onChange("");
      return;
    }
    const cleanUsername = username.trim();
    if (cleanUsername.startsWith("http://") || cleanUsername.startsWith("https://")) {
      onChange(cleanUsername);
    } else {
      const user = cleanUsername.replace("@", "");
      onChange(`https://instagram.com/${user}`);
    }
  }, [username, onChange]);

  return (
    <input
      type="text"
      placeholder="Instagram profile URL or username"
      className={inputClassName}
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
}
