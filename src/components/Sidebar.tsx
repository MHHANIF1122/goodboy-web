"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="logo">{collapsed ? "GB" : "GoodBoy 🐱"}</h2>
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className="nav">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          🏠 Home
        </Link>
        <Link
          href="/whitepaper"
          className={pathname === "/whitepaper" ? "active" : ""}
        >
          📘 Whitepaper
        </Link>
        <Link
          href="/education"
          className={pathname === "/education" ? "active" : ""}
        >
          🧠 Education
        </Link>
        <Link
          href="/meme-lab"
          className={pathname === "/meme-lab" ? "active" : ""}
        >
          🎨 Meme Lab
        </Link>
      </nav>
    </aside>
  );
}
