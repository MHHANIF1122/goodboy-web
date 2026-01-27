"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <div className={`app-layout ${collapsed ? "collapsed" : ""} ${dark ? "dark" : ""}`}>
      <aside className="sidebar">
        <button
          className="toggle-btn"
          onClick={() => setDark(!dark)}
        >
          {dark ? "🙉" : "🙈"}
        </button>

        <div className="sidebar-header">
          <h2 className="logo">{collapsed ? "GB" : "GoodBoy"}</h2>

          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "›" : "‹"}
          </button>
        </div>

        <nav className="nav">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>

          <Link href="/whitepaper" className={pathname === "/whitepaper" ? "active" : ""}>
            Whitepaper
          </Link>

          <Link href="/education" className={pathname === "/education" ? "active" : ""}>
            Education
          </Link>

          <Link href="/meme-lab" className={pathname === "/meme-lab" ? "active" : ""}>
            Meme Lab
          </Link>
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}
