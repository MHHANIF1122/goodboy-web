import Breadcrumb from "../../components/Breadcrumb";
import PageTransition from "../../components/PageTransition";

export default function Roadmap() {
  return (
    <PageTransition>
    <Breadcrumb />
    <main className="roadmap">

      <section className="roadmap-hero">
        <h1>🗺️ Roadmap</h1>
        <p>Simple steps. Clear intentions. Long-term mindset.</p>
      </section>

      <section className="roadmap-flow">

  <div className="flow-row left done">
    <div className="flow-line" />
    <div className="flow-card">
      <span className="phase-tag">Phase -1</span>
      <span className="status done">Done</span>
      <h3>Foundation (Silent Build)</h3>
      <ul>
        <li>Idea & philosophy</li>
        <li>Tokenomic design</li>
        <li>Smart contract drafting</li>
        <li>Internal testing</li>
        <li>Brand & identity</li>
      </ul>
    </div>
  </div>

  <div className="flow-row right done">
    <div className="flow-line" />
    <div className="flow-card">
      <span className="phase-tag">Phase 0</span>
      <span className="status done">Done</span>
      <h3>Foundation Release</h3>
      <ul>
        <li>Smart contract token</li>
        <li>Website launch</li>
        <li>Whitepaper release</li>
        <li>Official X account</li>
        <li>Token deployment</li>
      </ul>
    </div>
  </div>

  <div className="flow-row left progress">
    <div className="flow-line" />
    <div className="flow-card">
      <span className="phase-tag">Phase 1</span>
      <span className="status progress">In Progress</span>
      <h3>Genesis Launch</h3>
      <ul>
        <li>Wallet distribution setup</li>
        <li>Liquidity pool initialization</li>
        <li>Liquidity & treasury 100% locked</li>
        <li>Community announcement</li>
      </ul>
    </div>
  </div>

  <div className="flow-row right planned">
    <div className="flow-line" />
    <div className="flow-card">
      <span className="phase-tag">Phase 2</span>
      <span className="status planned">Planned</span>
      <h3>Community Growth</h3>
      <ul>
        <li>Engagement & participation</li>
        <li>HODL</li>
        <li>LP target reached</li>
        <li>Trading fee → 0%</li>
        <li>Ownership renounced</li>
      </ul>
    </div>
  </div>

  <div className="flow-row left planned">
    <div className="flow-line" />
    <div className="flow-card">
      <span className="phase-tag">Phase 3</span>
      <span className="status planned">Planned</span>
      <h3>Recognition</h3>
      <ul>
        <li>Project validation</li>
        <li>CoinGecko listing</li>
        <li>CoinMarketCap listing</li>
        <li>Additional CEX listing</li>
      </ul>
    </div>
  </div>

  <div className="flow-row right planned">
    <div className="flow-line" />
    <div className="flow-card">
      <span className="phase-tag">Phase 4</span>
      <span className="status planned">Planned</span>
      <h3>Ecosystem Scaling</h3>
      <ul>
        <li>Coming soon...</li>
      </ul>
    </div>
  </div>

</section>

    </main>
    </PageTransition>
  );
}
