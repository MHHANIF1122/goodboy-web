"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      style={{
        marginBottom: "1rem",
        background: "none",
        border: "none",
        color: "#2563eb",
        cursor: "pointer",
        fontSize: "0.9rem",
      }}
    >
      &lt; Back
    </button>
  );
}
