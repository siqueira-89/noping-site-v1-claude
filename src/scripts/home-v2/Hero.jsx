// Live animated HUD: ping varies in state-dependent range, chart scrolls in sync,
// FPS animates with gauge. Used by Hero.

function useAnimatedValue({ state, badMin, badMax, goodMin, goodMax, speed = 1 }) {
  const [v, setV] = React.useState(state === "bad" ? (badMin+badMax)/2 : (goodMin+goodMax)/2);
  const stateRef = React.useRef(state);
  const valRef = React.useRef(v);
  stateRef.current = state;

  React.useEffect(() => {
    let tgt = valRef.current;
    let nextSwitch = 0;
    let last = performance.now();
    const pickTarget = () => {
      const isBad = stateRef.current === "bad";
      const min = isBad ? badMin : goodMin;
      const max = isBad ? badMax : goodMax;
      return min + Math.random() * (max - min);
    };
    tgt = pickTarget();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      const isBad = stateRef.current === "bad";
      const k = (isBad ? 6 : 3) * speed;
      valRef.current += (tgt - valRef.current) * Math.min(1, dt * k);
      if (now >= nextSwitch) {
        tgt = pickTarget();
        nextSwitch = now + (isBad ? 200 + Math.random()*450 : 400 + Math.random()*700);
      }
      setV(valRef.current);
    }, 50);
    return () => clearInterval(id);
  }, [badMin, badMax, goodMin, goodMax, speed]);
  return v;
}

// Rolling chart that tracks live ping value in real-time
function PingChart({ state, value }) {
  const width = 210, height = 48, n = 56;
  const bufRef = React.useRef(Array(n).fill(state === "bad" ? 180 : 3));
  const valRef = React.useRef(value);
  const [, force] = React.useReducer(x => x+1, 0);
  valRef.current = value;

  React.useEffect(() => {
    bufRef.current = Array(n).fill(state === "bad" ? 180 : 3);
  }, [state]);

  React.useEffect(() => {
    const id = setInterval(() => {
      bufRef.current.push(valRef.current);
      if (bufRef.current.length > n) bufRef.current.shift();
      force();
    }, 60);
    return () => clearInterval(id);
  }, []);

  const buf = bufRef.current;
  const max = state === "bad" ? 320 : 8;
  const min = state === "bad" ? 40 : 1;
  const step = width / (n - 1);
  const color = state === "bad" ? "#FF7A1A" : "#9CFF2E";
  const colorHi = state === "bad" ? "#FFC48A" : "#C4FF5E";
  const pts = buf.map((v, i) => {
    const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
    const y = height - 3 - t * (height - 8);
    return { x: i*step, y };
  });
  const lineStr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg className="ping-chart" viewBox={`0 0 ${width} ${height}`}>
      {/* grid */}
      {[0.25, 0.5, 0.75].map((g, i) => (
        <line key={i} x1="0" y1={height*g} x2={width} y2={height*g}
          stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      ))}
      <polygon points={`0,${height} ${lineStr} ${width},${height}`} fill={color} opacity="0.18"/>
      <polyline points={lineStr} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
      {/* live current indicator */}
      {last && (
        <>
          <line x1={last.x} y1={last.y} x2={last.x} y2={height} stroke={colorHi} strokeWidth="0.6" opacity="0.6" strokeDasharray="1 2"/>
          <circle cx={last.x} cy={last.y} r="2.5" fill={colorHi}/>
          <circle cx={last.x} cy={last.y} r="5" fill={color} opacity="0.3"/>
        </>
      )}
    </svg>
  );
}

function FpsDial({ value, state }) {
  const color = state === "bad" ? "#FFA25E" : "#9CFF2E";
  const radius = 26;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(1, value / 360);
  return (
    <div className="fps-meter">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
        <circle cx="32" cy="32" r={radius} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${circ * pct * 0.75} ${circ}`}
          strokeDashoffset={circ * 0.125}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div>
        <div className="val" style={{ color }}>{Math.round(value)}<span style={{fontSize:'12px', color:'var(--fg-mute)', marginLeft:4}}>FPS</span></div>
      </div>
    </div>
  );
}

// Cinematic US-route choreography
// Timeline (ends on GOOD state running forever):
//   0.0 - 1.5   : globe FAR (zoom 0.85), idle
//   1.5 - 3.5   : camera pans + zooms in on USA (zoom 1.4)
//   3.5 - 5.5   : BAD state — jagged red route draws quickly in 2s
//   5.5 - 11.5  : HOLD bad for 6s — route pulses, packet loss jitters, pain sinks in
//   11.5 - 12.5 : FLIP — cascade ignite
//   12.5 - ∞    : GOOD state — 3 green direct routes pulse, all pillars lit, warp stars
const BAD_ROUTE = [
  { city: "Los Angeles",  lng: -118.24, lat: 34.05 },
  { city: "San Jose",     lng: -121.89, lat: 37.34 },
  { city: "Sacramento",   lng: -121.49, lat: 38.58 },
  { city: "Salt Lake City", lng: -111.89, lat: 40.76 },
  { city: "Las Vegas",    lng: -115.14, lat: 36.17 },
  { city: "Denver",       lng: -104.99, lat: 39.74 },
  { city: "Kansas City",  lng:  -94.58, lat: 39.10 },
  { city: "Dallas",       lng:  -96.80, lat: 32.78 },
  { city: "Atlanta",      lng:  -84.39, lat: 33.75 },
  { city: "Indianapolis", lng:  -86.16, lat: 39.77 },
  { city: "Chicago",      lng:  -87.63, lat: 41.88 },
];
const LA  = { lng: -118.24, lat: 34.05 };
const CHI = { lng:  -87.63, lat: 41.88 };
const GOOD_ROUTES = [
  [LA, { lng: -104.99, lat: 39.74 }, CHI], // via Denver
  [LA, { lng: -112.07, lat: 33.45 }, { lng: -94.58, lat: 39.10 }, CHI], // via Phoenix -> KC
  [LA, { lng: -111.89, lat: 40.76 }, { lng: -93.27, lat: 44.98 }, CHI], // via Salt Lake City -> Minneapolis
];
const CAM_IDLE = { lng: -60, lat: -8 };
const CAM_USA  = { lng: -98, lat: 40 };

function useChoreography(enabled) {
  const [phase, setPhase] = React.useState({
    state: "bad", cameraRot: CAM_IDLE, cameraLerp: 2.5, cameraZoom: 0.85,
    routes: null, badRouteProgress: 0, goodRoutesOn: false,
    pillarsAlpha: 0.35, pillarsIgniteT: 0.15, speedParticles: false, t: 0
  });
  React.useEffect(() => {
    if (!enabled) return;
    let raf, start = performance.now();
    let finished = false;
    const loop = (now) => {
      const elapsed = (now - start) / 1000;
      // After first full cycle (13s), stay in GOOD forever
      const t = finished ? 13 : elapsed;
      if (elapsed >= 13 && !finished) finished = true;
      let next;
      if (t < 1.5) {
        next = { state: "bad", cameraRot: CAM_IDLE, cameraLerp: 1.2, cameraZoom: 0.85,
          routes: null, badRouteProgress: 0, goodRoutesOn: false,
          pillarsAlpha: 0.3, pillarsIgniteT: 0.15, speedParticles: false, t };
      } else if (t < 3.5) {
        const p = (t - 1.5) / 2.0;
        next = { state: "bad", cameraRot: CAM_USA, cameraLerp: 1.6, cameraZoom: 0.85 + p * 0.55,
          routes: { bad: BAD_ROUTE, good: GOOD_ROUTES }, badRouteProgress: 0,
          goodRoutesOn: false, pillarsAlpha: 0.2, pillarsIgniteT: 0.1, speedParticles: false, t };
      } else if (t < 5.5) {
        const p = (t - 3.5) / 2.0; // fast 2s draw
        next = { state: "bad", cameraRot: CAM_USA, cameraLerp: 1.8, cameraZoom: 1.4,
          routes: { bad: BAD_ROUTE, good: GOOD_ROUTES }, badRouteProgress: p,
          goodRoutesOn: false, pillarsAlpha: 0.15, pillarsIgniteT: 0.1, speedParticles: false, t };
      } else if (t < 11.5) {
        // Hold bad for 6s — full route visible, pulses, pain sinks in
        next = { state: "bad", cameraRot: CAM_USA, cameraLerp: 1.8, cameraZoom: 1.4,
          routes: { bad: BAD_ROUTE, good: GOOD_ROUTES }, badRouteProgress: 1,
          goodRoutesOn: false, pillarsAlpha: 0.15, pillarsIgniteT: 0.1, speedParticles: false, t };
      } else if (t < 12.5) {
        const p = (t - 11.5) / 1.0;
        next = { state: "good", cameraRot: CAM_USA, cameraLerp: 2, cameraZoom: 1.4,
          routes: { bad: BAD_ROUTE, good: GOOD_ROUTES }, badRouteProgress: 1 - p,
          goodRoutesOn: p > 0.3, pillarsAlpha: 0.3 + p * 0.7,
          pillarsIgniteT: 0.1 + p * 1.4, speedParticles: p > 0.5, t };
      } else {
        next = { state: "good", cameraRot: CAM_USA, cameraLerp: 2, cameraZoom: 1.4,
          routes: { bad: BAD_ROUTE, good: GOOD_ROUTES }, badRouteProgress: 0,
          goodRoutesOn: true, pillarsAlpha: 1, pillarsIgniteT: 1.5, speedParticles: true, t };
      }
      setPhase(next);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);
  return phase;
}

function Hero({ tweaks }) {
  const [manual, setManual] = React.useState(null); // null = choreo, 'bad'|'good' = manual override
  const [cueN, setCueN] = React.useState(0);
  const phase = useChoreography(manual === null);
  const state = manual || phase.state;

  const set = (s) => { setManual(s); setCueN(n => n + 1); }; // bump cue -> re-snap camera

  // live ping + fps animated values
  const ping = useAnimatedValue({ state, badMin: 80, badMax: 300, goodMin: 2, goodMax: 5 });
  const fps  = useAnimatedValue({ state, badMin: 10, badMax: 80, goodMin: 250, goodMax: 350, speed: 0.8 });
  const loss = useAnimatedValue({ state, badMin: 0, badMax: 70, goodMin: 0, goodMax: 0, speed: 1.2 });

  // When manual clicked, camera cue = USA + zoom; when auto, let choreography drive
  const cueRot  = manual === null ? phase.cameraRot  : CAM_USA;
  const cueZoom = manual === null ? phase.cameraZoom : 1.4;

  const copy = window.COPY[tweaks.copyTone] || window.COPY.competitivo;
  const isCenter = tweaks.heroLayout === "center";
  const size = isCenter ? 620 : 560;

  return (
    <section className="hero" data-layout={tweaks.heroLayout} data-state={state}>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-badge-row"><span className="dot"/> {copy.heroBadge}</div>
            <h1>
              {copy.heroTitle.split(" ").map((w, i) => {
                const emphasize = tweaks.copyTone === "competitivo" ? ["lag.", "deveria."] :
                                  tweaks.copyTone === "emocional" ? ["diferença", "tiro."] :
                                  ["Roteamento", "inteligente."];
                return <span key={i}>{emphasize.includes(w) ? <em>{w}</em> : w} </span>;
              })}
            </h1>
            <p className="lead">{copy.heroSub}</p>
            <div className="hero-ctas">
              <button className="btn btn--primary btn--lg">
                {copy.heroCtaPrimary} <window.Ico.arrow style={{width:16,height:16}}/>
              </button>
              <button className="btn btn--ghost btn--lg">
                <window.Ico.download style={{width:16,height:16}}/> {copy.heroCtaSecondary}
              </button>
            </div>

            {tweaks.density !== "minimal" && (
              <div style={{ marginTop: 40, display:'flex', gap: 28, color:'var(--fg-mute)', fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase' }}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><window.Ico.check style={{width:14,height:14,color:'var(--green)'}}/> +3M players</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}><window.Ico.check style={{width:14,height:14,color:'var(--green)'}}/> +2000 jogos</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}><window.Ico.check style={{width:14,height:14,color:'var(--green)'}}/> +150 países</div>
              </div>
            )}
          </div>

          <div className="hero-visual">
            <div style={{ position: 'relative' }}>
              <window.Globe
                state={state}
                style={tweaks.globeStyle}
                size={size}
                cameraRot={cueRot}
                cameraLerp={phase.cameraLerp}
                cameraZoom={cueZoom}
                cameraCue={cueN + (manual === null ? 0 : 0)}
                routes={manual === null ? phase.routes : { bad: BAD_ROUTE, good: GOOD_ROUTES }}
                badRouteProgress={manual === null ? phase.badRouteProgress : (state === "bad" ? 1 : 0)}
                goodRoutesOn={manual === null ? phase.goodRoutesOn : (state === "good")}
                pillarsAlpha={manual === null ? phase.pillarsAlpha : (state === "bad" ? 0.35 : 1)}
                pillarsIgniteT={manual === null ? phase.pillarsIgniteT : (state === "good" ? 1.6 : 0.35)}
                speedParticles={manual === null ? phase.speedParticles : (state === "good")}
              />

              <div className="hud-float" style={{ top: 30, right: -30 }}>
                <div className={`hud ${state === "bad" ? "hud--bad" : "hud--good"}`}>
                  <div className="hud-tick" style={{ color: state === "bad" ? "var(--bad)" : "var(--green)" }}/>
                  <div className="label" style={{ color: state === "bad" ? "var(--bad-hi)" : "var(--green)" }}>
                    <span>{state === "bad" ? "SEM NOPING" : "COM NOPING"}</span>
                    <span style={{ color:'var(--fg-faint)'}}>●LIVE</span>
                  </div>
                  <div className="sub">{
                    state === "bad"
                      ? (manual === "bad" ? "Roteamento público · 10 hops · packet loss" :
                         phase.badRouteProgress > 0 ? `Roteamento público · ${Math.ceil(phase.badRouteProgress * 10)} hops` : "Ping instável · packet loss")
                      : (manual === "good" ? "3 rotas NoPing · failover ativo" :
                         phase.goodRoutesOn ? "3 rotas NoPing · failover ativo" : "Rota otimizada · estável")
                  }</div>
                  <PingChart state={state} value={ping}/>
                  <div className="ping" style={{ color: state === "bad" ? "var(--bad-hi)" : "var(--green-hi)" }}>
                    {Math.round(ping)}<span style={{ fontSize: 14, color: 'var(--fg-mute)', marginLeft: 4 }}>MS</span>
                  </div>
                  <div style={{
                    marginTop: 8, display:'flex', justifyContent:'space-between', alignItems:'center',
                    fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'0.15em',
                    textTransform:'uppercase', color:'var(--fg-mute)',
                    borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: 6
                  }}>
                    <span>Packet loss</span>
                    <span style={{ color: state === "bad" ? "var(--bad-hi)" : "var(--green-hi)", fontWeight: 700 }}>
                      {loss.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="hud-float" style={{ bottom: 40, left: -40, width: 200 }}>
                <div className={`hud ${state === "bad" ? "hud--bad" : "hud--good"}`}>
                  <div className="label" style={{ color: 'var(--fg-mute)' }}>
                    <span>FPS</span>
                    <span style={{ color: state === "bad" ? "var(--bad-hi)" : "var(--green)"}}>{state === "bad" ? "DROP" : "STABLE"}</span>
                  </div>
                  <FpsDial value={fps} state={state}/>
                </div>
              </div>
            </div>

            <div className="hero-toggle">
              <button className={state === "bad" ? "active" : ""} onClick={() => set("bad")}>Sem NoPing</button>
              <button className={state === "good" ? "active" : ""} onClick={() => set("good")}>Com NoPing</button>
            </div>
          </div>
        </div>

        <div className="hero-rail">
          <div className="hero-rail-item"><span className="v">300ms → <span style={{color:'var(--green)'}}>2ms</span></span><span className="l">Redução de ping</span></div>
          <div className="hero-rail-item"><span className="v">40 → <span style={{color:'var(--green)'}}>300</span> FPS</span><span className="l">Ganho de frames</span></div>
          <div className="hero-rail-item"><span className="v">+2000</span><span className="l">Servidores global</span></div>
          <div className="hero-rail-item"><span className="v">+3M</span><span className="l">Players ativos</span></div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
