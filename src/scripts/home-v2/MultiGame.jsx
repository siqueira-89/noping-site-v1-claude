// Map game ids to real assets in /src/assets/games. Falls back to
// the catalog folder when no card art exists, then to the abstract
// SVG placeholder. Detects base path for sub-folder pages.
const GAME_ASSETS = {
  valorant:  "src/assets/games/cards/valorant.webp",
  cs2:       "src/assets/games/cards/cs2.webp",
  fortnite:  "src/assets/games/cards/fortnite.webp",
  dota2:     "src/assets/games/cards/dota2.webp",
  minecraft: "src/assets/games/cards/minecraft.webp",
  // catalog fallbacks (no card art yet)
  lol:       "src/assets/games/catalog/lol.webp",
  pubg:      "src/assets/games/catalog/pubg.webp",
  r6:        "src/assets/games/catalog/r6.webp",
  wow:       "src/assets/games/catalog/wow.webp",
  apex:      "src/assets/games/catalog/apex.webp",
  overwatch: "src/assets/games/catalog/overwatch.webp",
  gta:       "src/assets/games/catalog/gta5.webp",
  marvelrivals: "src/assets/games/catalog/marvelrivals.webp",
  albion:    "src/assets/games/catalog/albion.webp",
};

// Game art — uses real asset when available; otherwise renders a
// generative SVG poster matching the home-v2 placeholder look.
function GameArt({ game }) {
  const asset = GAME_ASSETS[game.id];
  if (asset) {
    // Detect base prefix so the path works at site root (/) and at
    // sub-folder pages alike. Mirrors detectBase() pattern from
    // src/components/header.js + src/scripts/pages/home.js.
    const path = window.location.pathname.replace(/\\/g, '/');
    const segments = path.split('/').slice(0, -1).filter(Boolean);
    const knownPages = new Set(['affiliates','download','games','support','prices','claro']);
    const base = knownPages.has(segments[segments.length - 1] || '') ? '../' : '';
    return (
      <>
        <div className="art" style={{ backgroundImage: `url(${base + asset})` }}/>
        <div className="art-overlay"/>
      </>
    );
  }
  const [c1, c2] = game.gradient;
  return (
    <div className="art" style={{ background: `linear-gradient(160deg, ${c1} 0%, ${c2} 60%, #060808 100%)` }}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.MultiGame = MultiGame;
