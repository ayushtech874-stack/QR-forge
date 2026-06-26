import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function WiFiForm({ onChange }: QRFormProps) {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("WPA");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!ssid) {
      onChange("");
      return;
    }
    const type = security === "None" ? "nopass" : security;
    const qrValue = `WIFI:T:${type};S:${ssid};P:${password};H:${hidden};;`;
    onChange(qrValue);
  }, [ssid, password, security, hidden, onChange]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Network Name (SSID)"
        className={inputClassName}
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="password"
          placeholder="Password"
          className={inputClassName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={security === "None"}
        />
        <select
          className={`${inputClassName} w-32 shrink-0`}
          value={security}
          onChange={(e) => setSecurity(e.target.value)}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="None">None</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <input
          type="checkbox"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
          className="rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
        />
        Hidden Network
      </label>
    </div>
  );
}
