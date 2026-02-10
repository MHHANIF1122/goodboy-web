import Breadcrumb from "../../components/Breadcrumb";
import PageTransition from "../../components/PageTransition";
import TokenomicChart from "../../components/TokenomicChart";

export default function Tokenomics() {
  return (
    <PageTransition>
    <Breadcrumb />
    <main className="whitepaper">
      <section className="wp-hero">
      <h1>📄 Tokenomics</h1>
      </section>

      <details className="accordion">
      <summary>Token Information</summary>  
      <ul className="accordion-content">
        <p>
        <li><strong>Name :</strong> GoodBoy</li>
        <li><strong>Symbol :</strong> GOBO</li>
        <li><strong>Chain :</strong> BSC (BEP-20)</li>
        <li><strong>Total Supply :</strong> 100,000,000</li>
        <li><strong>Decimals :</strong> 6</li>
        <li><strong>Supply :</strong> Fixed (No Minting)</li>
        <li><strong>Contract Mechanism :</strong> Auto-Liquidity with Reducible and Finalizable Fees</li>
        </p>
      </ul>
      </details>

    <details className="accordion">
      <summary>Distribution Chart</summary>
      <div className="chart-box">
      <TokenomicChart />
      </div>
      <p className="token-legend">
        <span style={{ color: "#2496c0" }}>
          Treasury: 30%</span>
        <span style={{ color: "#46798c" }}>
          Liquidity: 15%</span>
        <span style={{ color: "#44ef97de" }}>
          Pre-Sale: 15%</span>
        <span style={{ color: "#16a34a" }}>
          Investor: 15%</span>
        <span style={{ color: "#c3800c" }}>
          Team: 10%</span>
        <span style={{ color: "#f59e0b" }}>
          Community: 5%</span>
        <span style={{ color: "#ef4444" }}>
          Building: 5%</span>
        <span style={{ color: "#f07676" }}>
          Marketing: 5%</span>
      </p>
    </details>

    <details className="accordion">
      <summary>Distribution Supply</summary> 
       <ul className="accordion-content">
          <li><strong>Deployer Allocation :</strong> 0</li>
           <p>Used exclusively for contract administration.</p>
          <li><strong>Treasury Allocation :</strong> 30.000.000 
           <a 
              href="https://www.pinksale.finance/pinklock/bsc/record/1444745"
              target="_blank"
              rel="noopener noreferrer"
              className= "proof-box">
              <em>" View Lock Proof "</em></a></li>

           <p>Locked 100% on Pinklock for support long-term sustainability and strategic growth.</p>
          <li><strong>LP Allocation :</strong> 15.000.000</li>
           <p>Public market liquidity and will be lock after final pairing.</p>
          <li><strong>Pre-Sale :</strong> 15.000.000</li>
           <p>For liquidity reinforcement sale, 100% funds will be paired into liquidity.</p>
          <li><strong>Investor :</strong> 15.000.000</li>
           <p>Investor and partnership.</p>
          <li><strong>Developer Team:</strong> 10.000.000 
           <a 
              href="https://www.pinksale.finance/pinklock/bsc/record/1444764"
              target="_blank"
              rel="noopener noreferrer"
              className= "proof-box">
              <em>" View Lock Proof "</em></a></li>
           <p>Vested on-chain 50% over 24 months via Pinklock with gradual monthly release.</p>
          <li><strong>Community Allocation:</strong> 5.000.000</li>
           <p>Events, Contests, and Rewards.</p>
          <li><strong>Building Allocation:</strong> 5.000.000</li>
           <p>Project scaling, operational, and tooling.</p>
          <li><strong>Marketing :</strong> 5.000.000</li>
           <p>Marketing and advertising.</p>
          <li><strong>External Supply :</strong></li>
           <p>A portion of the total supply is held by external addresses 
             for investor & pre-sale.</p>
       </ul>
      </details>

    <details className="accordion">
      <summary>Liquidity Roadmap</summary>
      <ul className="accordion-content">
        <p><strong>Phase 1 – Genesis</strong>
        <li>Liquidity: 15,000,000 GOBO / BNB</li>
        <li>LP is 100% locked</li>
        <li>Buy fee: 1%, Sell fee: 2%</li>
        <li>100% of fees are used for automatic liquidity generation</li>
        <li>No dev team or treasury fee extraction</li>
        </p>

        <p><strong>Phase 2 – Growth</strong>
        <li>Trading volume increases</li>
        <li>Fees continuously add liquidity to the pool</li>
        <li>Liquidity grows organically from market activity</li>
        </p>  

        <p><strong>Phase 3 – Maturity</strong>
        <li>Target liquidity milestone reached = GOBO/500 BNB</li>
        <li>Transaction fees finalized at 0%</li>
        <li>Liquidity locked 100%</li>
        <li>Ownership is renounced</li>
        </p>
      </ul>
      </details>

      <details className="accordion">
      <summary>Fee Model</summary>
      <ul className="accordion-content">
        <p>
        <li>Buy Fee: 1%</li>
        <li>Sell Fee: 2%</li>
        All fees are automatically converted into liquidity and added to the pool. 
        Fees can only be reduced, permanently disabled, and finalized.
        </p>
      </ul>
      </details>

      <details className="accordion">
      <summary>Transparency & Vesting</summary>
      <div className="accordion-content">
        <p>
        The deployer (owner) wallet holds zero GOBO tokens and is used exclusively for 
        contract administration. Tokens are distributed across dedicated wallets to 
        ensure transparency and eliminate conflicts of interest. Liquidity is 
        provided transparently and locked. Developer tokens are vested on-chain with a 
        scheduled release to ensure long-term commitment.
        </p>
      </div>
      </details>

      <details className="accordion">
      <summary>Community Distribution</summary>
      <div className="accordion-content">
        <p>
        Community allocation is distributed through events, contests, and
        participation rewards. Education content focuses on building strong
        personal character.
        </p>
      </div>
      </details>
    </main>
    </PageTransition>  
    );
}
