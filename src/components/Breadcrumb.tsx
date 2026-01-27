"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
      <Link href="/">🏠 Home</Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={index}>
            {" / "}
            <Link href={href}>{label}</Link>
          </span>
        );
      })}
    </nav>
  );
}
