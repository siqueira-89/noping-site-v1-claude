// Game art — placeholder "poster" art using color + typography (no external images)
function GameArt({ game }) {
  const [c1, c2] = game.gradient;
  return (
    <div className="art" style={{ background: `linear-gradient(160deg, ${c1} 0%, ${c2} 60%, #060808 100%)` }}>
      {/* large abstract shape */}
      <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',opacity:0.35}}>
        <defs>
          <radialGradient id={`g-${game.id}`}>
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <circle cx="80" cy="30" r="55" fill={`url(#g-${game.id})`}/>
        <polygon points="0,120 60,60 120,160 0,160" fill="rgba(0,0,0,0.4)"/>
        <polygon points="40,80 80,50 120,120 80,160 40,160" fill="rgba(255,255,255,0.06)"/>
      </svg>
    </div>
  );
}

function MultiGame() {
  const [ref, seen] = window.useReveal();
  const games = window.GAMES;
  return (
    <section className="section">
      <div className="container">
        <div className="multigame">
          <div>
            <div className="eyebrow"><window.Ico.gamepad style={{width:14,height:14}}/> Jogue sem limites</div>
            <h2 className="section-title" style={{marginTop:18, marginBottom:24}}>
              Melhore seu FPS em <em>mais de 2000 jogos</em> com uma assinatura.
            </h2>
            <p style={{fontSize:16, maxWidth:440, marginBottom:28}}>
              Dos FPS competitivos aos MMOs clássicos — o NoPing otimiza tudo que você joga, em qualquer plataforma.
            </p>
            <button className="btn btn--ghost btn--lg">Ver lista completa <window.Ico.arrow style={{width:14,height:14}}/></button>

            <div style={{ marginTop: 40, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
              {[["Battle royale","120+"],["MOBA","40+"],["FPS","180+"],["MMO","85+"],["Racing","60+"],["Fighting","55+"]].map(([l,v],i)=>(
                <div key={i} style={{padding:'10px 12px', border:'1px solid var(--line)', borderRadius:8}}>
                  <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--fg-mute)'}}>{l}</div>
                  <div style={{fontFamily:'var(--font-display)', fontSize:22, color:'var(--green)'}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={ref} className={`game-tiles reveal ${seen ? "in" : ""}`}>
            {games.slice(0, 12).map((g, i) => (
              <div key={g.id} className="game-tile" style={{ transitionDelay: `${i * 40}ms` }}>
                <GameArt game={g}/>
                <div className="overlay"/>
                <div className="label">{g.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.MultiGame = MultiGame;
