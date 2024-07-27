"use client";
import { useState } from "react";
import { Button } from "@components/ui/common";

interface VerificationInputProps {
  onVerify: (email: string) => void;
}

export default function VerificationInput({
  onVerify,
}: VerificationInputProps) {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button
        onClick={() => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
}

