function FpsBooster({ tweaks }) {
  const [ref, seen] = window.useReveal();
  const copy = window.COPY[tweaks.copyTone] || window.COPY.competitivo;
  const fps = window.useCountUp(240, seen, 1600);

  // Animated bars: climbing from left→right, bad to good
  const bars = React.useMemo(() => {
    return [...Array(40)].map((_, i) => {
      const t = i / 39;
      const target = 40 + t * 140 + Math.sin(i * 0.6) * 8;
      return Math.round(target);
    });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="fps-section">
          <div className="fps-visual">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-mute)' }}>
              <span>FPS / tempo de partida</span>
              <span>● LIVE</span>
            </div>
            <div className="fps-bars">
              {bars.map((b, i) => {
                const heightPct = seen ? (b / 200) * 100 : 8;
                const col = i < 10 ? "var(--bad)" : i < 18 ? "#E8B454" : "var(--green)";
                return <div key={i} className="bar" style={{ height: `${heightPct}%`, background: col, transition: `height .7s var(--ease-out) ${i * 20}ms` }}/>;
              })}
            </div>
            <div style={{display:'flex', alignItems:'end', justifyContent:'space-between'}}>
              <div className="fps-number">{Math.round(fps)}<span className="unit">FPS</span></div>
              <div className="pill pill--good">+ 512% vs baseline</div>
            </div>
          </div>

          <div ref={ref}>
            <div className="eyebrow">FPS Booster</div>
            <h2 className="section-title" style={{marginTop:16, marginBottom:24}}
              dangerouslySetInnerHTML={{ __html: copy.fpsTitle }} />
            <p style={{fontSize:16, lineHeight:1.6, marginBottom:28}}>{copy.fpsSub}</p>

            <div className="fps-compare-row">
              <div className="fps-compare-cell" style={{borderColor:'rgba(255,122,26,0.3)'}}>
                <div className="l">Sem NoPing</div>
                <div className="v" style={{color:'var(--bad-hi)'}}>39 FPS</div>
              </div>
              <div className="fps-compare-cell" style={{borderColor:'rgba(156,255,46,0.35)'}}>
                <div className="l">Com NoPing</div>
                <div className="v" style={{color:'var(--green)'}}>200 FPS</div>
              </div>
            </div>

            <div style={{marginTop:24, display:'flex', flexDirection:'column', gap:8}}>
              {[
                ["CPU liberada", "35%"],
                ["RAM otimizada", "28%"],
                ["Processos em background suspensos", "42"],
              ].map(([l, v], i) => (
                <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'10px 14px', border:'1px solid var(--line)', borderRadius:8, fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.08em', textTransform:'uppercase'}}>
                  <span style={{color:'var(--fg-dim)'}}>{l}</span>
                  <span style={{color:'var(--green)'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.FpsBooster = FpsBooster;
