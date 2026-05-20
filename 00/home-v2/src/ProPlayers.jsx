function ProPlayers() {
  const [ref, seen] = window.useReveal();
  return (
    <section className="section">
      <div className="container">
        <div style={{maxWidth:720}}>
          <div className="eyebrow">Pro players</div>
          <h2 className="section-title" style={{marginTop:18, marginBottom:18}}>Quem usa <em>NoPing</em>.</h2>
          <p style={{fontSize:16, maxWidth:560}}>Para estar sempre na frente dos adversários, os maiores pro players e influenciadores usam NoPing.</p>
        </div>
        <div ref={ref} className={`pros-grid reveal ${seen ? "in" : ""}`}>
          {window.PROS.map((p, i) => (
            <div key={i} className="pro-card" style={{ '--tint': p.tint }}>
              <div className="pro-avatar">
                {/* generative silhouette portrait using initials */}
                <svg viewBox="0 0 100 100" style={{width:'85%', height:'100%'}}>
                  <defs>
                    <radialGradient id={`proBg${i}`}>
                      <stop offset="0%" stopColor={p.tint} stopOpacity="0.9"/>
                      <stop offset="100%" stopColor={p.tint} stopOpacity="0.2"/>
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="38" r="24" fill={`url(#proBg${i})`}/>
                  <path d="M 20 100 Q 20 70 50 70 Q 80 70 80 100 Z" fill={p.tint} opacity="0.7"/>
                  <text x="50" y="46" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="18" fill="#fff" opacity="0.9">{p.handle.slice(0,2)}</text>
                </svg>
              </div>
              <div className="body">
                <div className="handle">{p.handle} <span style={{fontSize:14}}>{p.country}</span></div>
                <div className="role">{p.role}</div>
                <div className="quote">"{p.quote}"</div>
                <div className="foot">
                  <span><window.Ico.gamepad style={{width:12,height:12, display:'inline', verticalAlign:'middle', marginRight:6}}/>{p.game}</span>
                  <div className="socials">
                    <window.Ico.instagram/><window.Ico.x/><window.Ico.tiktok/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProPlayers = ProPlayers;
