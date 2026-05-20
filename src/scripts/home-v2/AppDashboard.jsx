function AppDashboard() {
  const [ref, seen] = window.useReveal();
  const [activeGame, setActiveGame] = React.useState(0);
  const games = window.GAMES.slice(0, 10);

  React.useEffect(() => {
    if (!seen) return;
    const t = setInterval(() => setActiveGame(a => (a + 1) % 6), 2000);
    return () => clearInterval(t);
  }, [seen]);

  const featured = games[activeGame] || games[0];

  return (
    <section className="section">
      <div className="container">
        <div className="app-section">
          <div ref={ref} className={`reveal ${seen ? "in" : ""}`}>
            <div className="app-frame">
              <div className="app-titlebar">
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div className="dots"><span className="dot"/><span className="dot"/><span className="dot"/></div>
                  <div className="title">NOPING v3.0</div>
                </div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--green)',letterSpacing:'0.15em'}}>● ONLINE · 12ms</div>
              </div>
              <div className="app-body">
                <div className="app-side">
                  <div className="side-item active"><window.Ico.globe style={{width:16,height:16}}/>Desktop</div>
                  <div className="side-item"><window.Ico.gamepad style={{width:16,height:16}}/>Console <span className="badge">Em breve</span></div>
                  <div className="side-item"><window.Ico.wifi style={{width:16,height:16}}/>Mobile</div>
                  <div className="side-item"><window.Ico.link style={{width:16,height:16}}/>Multi Internet</div>
                  <div className="side-item"><window.Ico.zap style={{width:16,height:16}}/>Boost FPS</div>
                  <div className="side-item"><window.Ico.target style={{width:16,height:16}}/>Aim Trainer</div>
                  <div className="side-item"><window.Ico.gauge style={{width:16,height:16}}/>Pro Settings</div>
                  <div className="side-item"><window.Ico.mic style={{width:16,height:16}}/>AudioPad</div>
                  <div style={{marginTop:'auto',fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.2em',color:'var(--fg-faint)'}}>VERSION 3.0</div>
                </div>
                <div className="app-main">
                  <div className="app-search">🔍  Buscar um jogo...</div>
                  <div className="app-hero-card" style={{background:`linear-gradient(135deg, ${featured.color}30 0%, transparent 60%), #0f1519`, borderColor: `${featured.color}44`}}>
                    <div>
                      <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.2em',color:featured.color,textTransform:'uppercase'}}>JOGO FOCADO</div>
                      <div className="h-title" style={{marginTop:4}}>{featured.name}</div>
                      <div className="h-sub">Rota otimizada para {featured.name}. 1ms na melhor rota disponível agora.</div>
                    </div>
                    <div style={{display:'flex', gap:8}}>
                      <div className="pill pill--good" style={{fontSize:10}}>1 MS · ATIVO</div>
                      <div className="pill" style={{fontSize:10}}>CPU 62%</div>
                    </div>
                  </div>
                  <div className="app-chips">
                    {["Redução ping","Boost FPS","Pro Settings","AudioPad","Aim Trainer","Replay X"].map((c,i)=>(
                      <div key={i} className={`app-chip ${i===4?'active':''}`}>{c}</div>
                    ))}
                  </div>
                  <div className="app-gamegrid">
                    {games.map((g,i)=>(
                      <div key={i} style={{background:`linear-gradient(135deg,${g.color}aa,#0a0d10)`, border: i===activeGame?`1px solid ${g.color}`:''}}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow"><window.Ico.zap style={{width:12,height:12}}/> Boost Instantâneo</div>
            <h2 className="section-title" style={{marginTop:18, marginBottom:24}}>
              Ative o NoPing em <em>poucos cliques</em>.
            </h2>
            <p style={{fontSize:16, marginBottom:20, lineHeight:1.6}}>
              NoPing é uma plataforma intuitiva, leve e fácil de usar. Em instantes você está preparado para entregar sua melhor performance no seu jogo favorito.
            </p>
            <p style={{fontSize:16, marginBottom:32, lineHeight:1.6}}>
              O roteamento por IA seleciona o melhor servidor dentre +2000 PoPs ao redor do mundo — automaticamente, para cada partida.
            </p>
            <div style={{display:'flex', alignItems:'center', gap:16, padding:'20px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', marginBottom:28}}>
              <div style={{display:'flex'}}>
                {['#9CFF2E','#2EE6FF','#8A5BFF','#FF7A1A'].map((c,i)=>(
                  <div key={i} style={{width:32,height:32,borderRadius:'50%',background:c,border:'2px solid #0a0d10',marginLeft:i?-10:0}}/>
                ))}
              </div>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:22,color:'var(--fg)',letterSpacing:'-0.02em'}}>+3.000.000</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--fg-mute)'}}>Usuários ativos</div>
              </div>
            </div>
            <button className="btn btn--dark btn--lg">Veja como funciona <window.Ico.play style={{width:10,height:10}}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}
window.AppDashboard = AppDashboard;
