export default function PageMobile(){
  return (
<header className="mobile-header">
      <div className="mobile-header-inner">
       <img src="/goodboy.png" className="logo-dexm" />
       
      <div className="mobile-actions">
      <a
        href="https://pancakeswap.finance/swap?outputCurrency=0xa2dcC92FEb648487EFf083945a17Dc944Eefcd4A"
        target="_blank"
        className="mobile-btn buy">
        <img src="/cake.svg" className="logo-dexs" /> 
        <span>BUY</span>
      </a>
      
      <a
        href="https://www.geckoterminal.com/bsc/pools/0x8b69823ac74fd2a1492598359279a15a706f0ead?utm_source=embed"
        target="_blank"
        className="mobile-btn market"> 
        <img src="/gecko.svg" className="logo-dexs" />
        <strong>DEX</strong>
      </a>
    </div>
    </div>
    </header>
);
}