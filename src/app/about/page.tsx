import Breadcrumb from "../../components/Breadcrumb";
import PageTransition from "../../components/PageTransition";

export default function About () {
  return (
    <PageTransition>
    <Breadcrumb />
    <main className="whitepaper">
      <section className="wp-hero">
      <h1>🔎 Let's Get To Know Our Concept</h1>
      <a
        href="/whitepaper"
        target="_blank">
        <button className="proof-box">
        <strong>Read Whitepaper</strong>
        </button>
      </a>
      </section>
      
      <section className="wp-card center">
      <h2> Introduction</h2>
      <p>
         GoodBoy is a community-driven meme project that demonstrate how a meme coin can 
         be built in transparent, fair, and responsible way. GoodBoy is not just about price action, its about the process of collective learning, exploring how a community 
         can grow with integrity, dicipline, and good character.</p>
      <p>
         Within GoodBoy community, we promote education, creativity, and active participation to 
         cultivate awareness, responsibility, and positive value. Becoming a GoodBoy in a truest sense.
         GoodBoy was created as a response to low-trust meme tokens and opaque launches. 
         It aims to show that a meme coin can be honest, educational, and community-oriented.</p>
      </section>

      <section className="wp-card center">
      <h2> Philosophy</h2>
      <p>
        GoodBoy is designed for long-term sustainability rather than short-term speculation. 
        Liquidity grows from usage, not promises. The system prioritizes transparency, low risk, 
        and gradual organic growth. The core philosophy of GoodBoy is character building. 
        We believe that strong communities are built on values, discipline, and transparency.
      </p>
      </section>

    <section className="wp-callout">
      <h3>Disclaimer</h3>
      <p>
        GoodBoy is a community and educational project. This document does not
        constitute financial advice. Participants are responsible for their own
        decisions.
      </p>
       </section>
    </main>
    </PageTransition>  
    );
}
