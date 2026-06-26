import { useState, useEffect } from "react";
import { inputClassName, QRFormProps } from "./shared-styles";

export function VCardForm({ onChange }: QRFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (!firstName && !lastName) {
      onChange("");
      return;
    }
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;
    onChange(vcard);
  }, [firstName, lastName, phone, email, website, company, onChange]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="First Name"
          className={inputClassName}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className={inputClassName}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <input
        type="tel"
        placeholder="Phone Number"
        className={inputClassName}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        className={inputClassName}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="url"
        placeholder="Website"
        className={inputClassName}
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company"
        className={inputClassName}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
    </div>
  );
}
