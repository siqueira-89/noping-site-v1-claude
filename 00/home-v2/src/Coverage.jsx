function Coverage() {
  const [ref, seen] = window.useReveal();
  // Generate dot map using equirectangular projection mask onto a world shape
  // Use LAND_POLYS from Globe.jsx via window if exposed — else a static sprinkle within continent boxes
  const dots = React.useMemo(() => {
    const out = [];
    const W = 1600, H = 750;
    const polyCheck = (lng, lat) => {
      // Use the same polygons from globe — duplicated inline to avoid coupling
      const polys = [
        [[-168,66],[-156,71],[-125,60],[-118,33],[-104,28],[-80,25],[-66,45],[-57,50],[-78,63],[-110,70],[-158,72]],
        [[-80,12],[-52,4],[-35,-8],[-55,-33],[-72,-52],[-75,-30],[-80,-4]],
        [[-10,37],[4,51],[20,56],[30,60],[27,65],[10,64],[-10,45]],
        [[-17,21],[13,-5],[20,-25],[40,-15],[50,9],[32,23],[-6,32],[-17,21]],
        [[25,57],[80,66],[140,72],[170,66],[178,72],[120,76],[45,72],[25,57]],
        [[68,22],[95,22],[97,16],[85,8],[72,15]],
        [[80,45],[122,40],[130,30],[115,22],[100,22],[80,45]],
        [[113,-22],[145,-15],[150,-24],[128,-33],[113,-30]],
      ];
      for (const p of polys) {
        let inside = false;
        for (let i=0, j=p.length-1; i<p.length; j=i++){
          const xi=p[i][0], yi=p[i][1], xj=p[j][0], yj=p[j][1];
          if (((yi>lat)!=(yj>lat)) && (lng<(xj-xi)*(lat-yi)/(yj-yi+1e-9)+xi)) inside=!inside;
        }
        if (inside) return true;
      }
      return false;
    };
    for (let lat = -55; lat <= 70; lat += 2) {
      const step = Math.max(2, 3 / Math.cos(lat*Math.PI/180));
      for (let lng = -170; lng <= 180; lng += step) {
        if (polyCheck(lng, lat)) {
          const x = (lng + 180) / 360 * W;
          const y = (90 - lat) / 180 * H;
          out.push({ x, y });
        }
      }
    }
    return out;
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto'}}>
          <div className="eyebrow"><window.Ico.globe style={{width:14,height:14}}/> Rede global</div>
          <h2 className="section-title" style={{marginTop:18, marginBottom:20}}>
            +2000 servidores em <em>+150 países</em>.
          </h2>
          <p style={{fontSize:16, marginBottom:28}}>
            De São Paulo a Tóquio, do Cairo a Sydney — a rede NoPing está em todo lugar que você joga. Rota perfeita, onde você estiver.
          </p>
          <button className="btn btn--primary">Ver todos os servidores <window.Ico.arrow style={{width:14,height:14}}/></button>
        </div>
        <div ref={ref} className={`coverage-map reveal ${seen ? "in" : ""}`}>
          <svg viewBox="0 0 1600 750" preserveAspectRatio="xMidYMid meet" style={{width:'100%',height:'100%'}}>
            <defs>
              <radialGradient id="covGlow">
                <stop offset="0%" stopColor="#9CFF2E" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#9CFF2E" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {dots.map((d, i) => {
              const isHub = i % 47 === 0;
              return isHub
                ? <g key={i}>
                    <circle cx={d.x} cy={d.y} r="14" fill="url(#covGlow)"/>
                    <circle cx={d.x} cy={d.y} r="2.6" fill="#C6FF6E"/>
                  </g>
                : <circle key={i} cx={d.x} cy={d.y} r="1.3" fill="#9CFF2E" opacity={0.55}/>;
            })}
          </svg>
          <div style={{position:'absolute', bottom:20, left:20, display:'flex', gap:20, fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-mute)'}}>
            <span><span style={{color:'var(--green)'}}>●</span> PoPs ativos</span>
            <span>Atualizado: agora</span>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Coverage = Coverage;
