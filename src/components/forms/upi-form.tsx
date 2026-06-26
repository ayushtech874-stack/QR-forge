import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function UPIForm({ value = "", onChange }: QRFormProps) {
  const [upiId, setUpiId] = useState(value);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setUpiId(value);
  }, [value]);

  useEffect(() => {
    if (!upiId) {
      onChange("");
      return;
    }
    let qrValue = `upi://pay?pa=${encodeURIComponent(upiId)}`;
    if (name) qrValue += `&pn=${encodeURIComponent(name)}`;
    if (amount) qrValue += `&am=${encodeURIComponent(amount)}`;
    onChange(qrValue);
  }, [upiId, name, amount, onChange]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="UPI ID (e.g., john@upi)"
        className={inputClassName}
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Payee Name"
        className={inputClassName}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Optional Amount"
        className={inputClassName}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
}
