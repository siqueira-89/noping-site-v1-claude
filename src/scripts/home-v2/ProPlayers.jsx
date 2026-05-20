// Pro Players — uses the same `affiliate-card` markup + styles as
// the /affiliates page reference. Real ambassador photos from
// src/assets/affiliates/cards/. Detects base path for sub-folders.
const SocialSvg = {
  ig: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path></svg>,
  x:  () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>,
  tik: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>,
  yt:  () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path></svg>,
};

const GamepadIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"></path>
  </svg>
);

const BadgeIcon = ({ highlight }) => highlight
  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01M17 12h.01M7 12h.01"></path></svg>;

const HOME_PROS = [
  { handle: "LESTRIPEZ", flag: "de", badge: "INFLUENCIADOR",          highlight: false, quote: "Minha conexão ficou MUITO mais estável. Parei de sentir lag nas partidas e até notei uma melhora na minha performance. Agora posso focar no jogo sem me preocupar com a latência e queda de FPS.", game: "FORTNITE", img: "src/assets/affiliates/cards/lestripez.png", socials: ["ig","x","tik","yt"] },
  { handle: "VETT",      flag: "br", badge: "5X CAMPEÃO BRASILEIRO",  highlight: true,  quote: "Sem uma conexão boa, não dá pra jogar Point Blank no nível que eu preciso. Com a NoPing, finalmente consigo focar no jogo e esquecer os problemas de latência.", game: "PB",       img: "src/assets/affiliates/cards/vett.png",      socials: ["ig","x","tik","yt"] },
  { handle: "SACY",      flag: "br", badge: "CAMPEÃO MUNDIAL VALORANT", highlight: true, quote: "Depois que comecei a usar a NoPing, meu jogo mudou completamente. Como pro player de Valorant, cada frame é decisivo nos duelos e nas execuções de utility, e a diferença na latência é absurda.", game: "VALORANT", img: "src/assets/affiliates/cards/sacy.png",      socials: ["ig","x","tik","yt"] },
  { handle: "COLDZERA",  flag: "br", badge: "2X MELHOR DO MUNDO CS:GO", highlight: true, quote: "Ping alto pode destruir qualquer jogada, por isso a NoPing faz parte da minha rotina. Zero travadas, ping baixo sempre e aquela confiança de que posso focar só na minha mira e estratégia.", game: "CS2",      img: "src/assets/affiliates/cards/coldzera.png",  socials: ["ig","x","tik"] },
  { handle: "ARKANE",    flag: "br", badge: "INFLUENCIADOR",          highlight: false, quote: "Já joguei com conexões instáveis e sei como isso atrapalha o desempenho. Com a NoPing, posso jogar com mais precisão e sem lag, o que faz toda a diferença quando a pressão aumenta.", game: "FORTNITE", img: "src/assets/affiliates/cards/arkane.png",    socials: ["ig","x"] },
  { handle: "SUJA",      flag: "es", badge: "INFLUENCIADOR",          highlight: false, quote: "Para evoluir no Fortnite, você precisa de foco total no jogo, sem distrações ou problemas técnicos. Uma conexão estável faz toda a diferença na hora de aplicar o que você aprende.", game: "FORTNITE", img: "src/assets/affiliates/cards/suja.png",      socials: ["ig","x","tik","yt"] },
  { handle: "BRTT",      flag: "br", badge: "CAMPEÃO LOL",            highlight: true,  quote: "Todo jogador de LoL sabe que o lag vai rolar na pior hora possível. Com a NoPing, minha conexão fica estável e sem aquelas travadas irritantes que podem acabar com a partida.", game: "LOL",      img: "src/assets/affiliates/cards/brtt.png",      socials: ["ig","x","tik","yt"] },
];

function ProPlayers() {
  const [ref, seen] = window.useReveal();
  const containerRef = React.useRef(null);
  const trackRef     = React.useRef(null);
  const thumbRef     = React.useRef(null);

  // Detect base path so the asset URL works at /index.html AND
  // /claro/index.html etc. (mirrors header.js convention).
  const path = window.location.pathname.replace(/\\/g, '/');
  const segments = path.split('/').slice(0, -1).filter(Boolean);
  const knownPages = new Set(['affiliates','download','games','support','prices','claro']);
  const base = knownPages.has(segments[segments.length - 1] || '') ? '../' : '';

  // Boot the GLOBAL carousel (the exact same animation as /affiliates).
  // Once the refs are in DOM, NoPingCarousel.init wires auto-scroll +
  // progress thumb + pause-on-interact behavior. Identical UX.
  React.useEffect(() => {
    if (!window.NoPingCarousel || !window.NoPingCarousel.init) return;
    if (!containerRef.current || !trackRef.current || !thumbRef.current) return;
    const handle = window.NoPingCarousel.init({
      container: containerRef.current,
      track:     trackRef.current,
      thumb:     thumbRef.current,
      autoDelay: 4000,
      scrollAmount: 330
    });
    return () => { if (handle && handle.stop) handle.stop(); };
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div style={{maxWidth:720}}>
          <div className="eyebrow">Pro players</div>
          <h2 className="section-title" style={{marginTop:18, marginBottom:18}}>Quem usa <em>NoPing</em>.</h2>
          <p style={{fontSize:16, maxWidth:560}}>Para estar sempre na frente dos adversários, os maiores pro players e influenciadores usam NoPing.</p>
        </div>

        {/* Same markup as /affiliates: container + track + progress thumb.
            Loaded behavior comes from src/components/carousel.js. */}
        <div ref={ref} className={`hero-affiliates-cards reveal ${seen ? "in" : ""}`} style={{marginTop:32}}>
          <div className="affiliates-carousel-container" ref={containerRef}>
            <div className="affiliates-track" ref={trackRef}>
              {HOME_PROS.map((p, i) => (
                <div key={i} className="affiliate-card">
                  <div className="card-image-container">
                    <img src={base + p.img} alt={p.handle} className="affiliate-avatar"/>
                  </div>
                  <div className="card-content">
                    <div className="card-content-inner">
                      <div className="card-header">
                        <span className="affiliate-name">
                          {p.handle}
                          <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/${p.flag}.svg`} className="affiliate-flag" alt={p.flag.toUpperCase()}/>
                        </span>
                        <div className={`affiliate-badge ${p.highlight ? 'highlight' : ''}`}>
                          <BadgeIcon highlight={p.highlight}/>
                          <span>{p.badge}</span>
                        </div>
                      </div>
                      <p className="affiliate-text">{p.quote}</p>
                    </div>
                    <div className="card-footer-wrapper">
                      <div className="card-divider"></div>
                      <div className="card-footer">
                        <span className="affiliate-game"><GamepadIcon/><span>{p.game}</span></span>
                        <div className="affiliate-socials">
                          {p.socials.map(s => (
                            <a key={s} href="#" className="social-icon-link">{React.createElement(SocialSvg[s])}</a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="affiliates-progress-bar-container">
            <div className="affiliates-progress-bar-track">
              <div className="affiliates-progress-bar-thumb" ref={thumbRef}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.ProPlayers = ProPlayers;
