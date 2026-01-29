"use client";
const CONTRACT = "0xa2dcC92FEb648487EFf083945a17Dc944Eefcd4A";

import { useState } from "react";
import PageMobile from "@/components/pagemobile"
import PageTransition from "@/components/PageTransition";

export default function Home() {

  const [copied, setCopied] = useState(false);
  const copyContract = async() => {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);

    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = CONTRACT;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      try {
      document.execCommand("copy");
      setCopied(true);
      } catch {
        alert("copy contract address not supported on this device");
      }
      document.body.removeChild(textarea);
    }
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <PageTransition>
    <PageMobile />
    <main className="home">
      <section className="hero"> 
        <div className="hero-left">
          <h1>
            <img src="/logocat2.png" className="hero-cat" />
          </h1>
          <strong>A meme driven community with character building education.</strong>
          
          <div className="contract-box">
            <span className="contract-label">Contract:</span>
            <span className="contract-address" id="contract">
              0xa2dcC92FEb648487EFf083945a17Dc944Eefcd4A
            </span>
            <button onClick={copyContract}>
             {copied ? "✅" : "📋"}
            </button>
          </div>

          <div className="hero-buttons">
            <a href="/tokenomics" className="btn primary">
              Tokenomics</a>

            <a href="https://x.com/Hallo_GoodBoy"
               target="_blank"
               className="btn ghost">
               Community</a>
          </div>
          </div>

        {/* RIGHT: ACTION CARDS */}
        <div className="hero-right">
          <a href="https://pancakeswap.finance/swap?outputCurrency=0xa2dcC92FEb648487EFf083945a17Dc944Eefcd4A"
             target="_blank"
             className="action-card buy">
            <span className="badge">BUY</span>
            <h4>BUY GOBO</h4>
            <p><img src="/pancakeswap.svg" className="logo-dex" /></p>
          </a>

          <a href="https://geckoterminal.com/id/bsc/pools/0x8b69823ac74fd2a1492598359279a15a706f0ead"
             target="_blank"
             className="action-card market">
            <span className="badge">LIVE</span>
            <h4>LIVE MARKET</h4>
            <p><img src="/geckoterminal_light.svg" className="logo-dex" /></p>
          </a>
        </div>
      </section>

      <section className="grid">
        <a href="/about" className="card">
          <img src="/aboutus.png" className="card-page" />
          <span className="badge">Active</span>
        </a>
      
        <a href="/education" className="card">
          <img src="/education.png" className="card-page" />
          <span className="badge">Active</span>
        </a>

        <a href="/meme-lab" className="card">
          <img src="/memelab.png" className="card-page" />
          <span className="badge">Active</span>
        </a>

        <a href="/roadmap" className="card">
          <img src="/roadmap.png" className="card-page" />
          <span className="badge">Active</span>
        </a>
      </section>

    </main>
    </PageTransition>
  );
}
