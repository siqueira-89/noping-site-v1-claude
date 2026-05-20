function CtaBanner({ tweaks }) {
  const copy = window.COPY[tweaks.copyTone] || window.COPY.competitivo;
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner">
          <div>
            <div className="eyebrow"><window.Ico.zap style={{width:12,height:12}}/> Acesso instantâneo</div>
            <h2 style={{marginTop:18, marginBottom:18, fontSize:54, lineHeight:1}}>{copy.ctaTitle}</h2>
            <p style={{fontSize:16, marginBottom:28, maxWidth:480}}>{copy.ctaSub}</p>
            <div style={{display:'flex', gap:12}}>
              <button className="btn btn--primary btn--lg">{copy.heroCtaPrimary} <window.Ico.arrow style={{width:14,height:14}}/></button>
              <button className="btn btn--ghost btn--lg">Ver planos</button>
            </div>
          </div>
          <div className="cta-visual">
            <div style={{textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:72, color:'var(--green)', letterSpacing:'-0.04em', lineHeight:1}}>1<span style={{fontSize:20, color:'var(--fg-dim)'}}>dia</span></div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', color:'var(--fg-mute)', marginTop:10}}>Acesso Pro · Sem cartão</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.CtaBanner = CtaBanner;
