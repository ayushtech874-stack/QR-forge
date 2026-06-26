import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function PhoneForm({ value = "", onChange }: QRFormProps) {
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState(value);

  useEffect(() => {
    setPhone(value);
  }, [value]);

  useEffect(() => {
    if (!phone) {
      onChange("");
      return;
    }
    const cleanPhone = phone.replace(/[^\d]/g, "");
    const fullPhone = phone.startsWith("+") ? cleanPhone : `${countryCode.replace("+", "")}${cleanPhone}`;
    onChange(`tel:+${fullPhone}`);
  }, [countryCode, phone, onChange]);

  return (
    <div className="space-y-4">
      <select 
        className={inputClassName}
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      >
        <option value="+1">+1 (US)</option>
        <option value="+44">+44 (UK)</option>
        <option value="+91">+91 (IN)</option>
        <option value="+61">+61 (AU)</option>
        <option value="+81">+81 (JP)</option>
        <option value="+49">+49 (DE)</option>
        <option value="+33">+33 (FR)</option>
        <option value="+86">+86 (CN)</option>
        <option value="+55">+55 (BR)</option>
      </select>
      <input 
        type="tel"
        placeholder="Phone number"
        className={inputClassName}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  );
}
