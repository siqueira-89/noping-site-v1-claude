/* ===== Kaspersky-inspired Globe =====
   - Deep black sphere, dark grey continents with subtle labels
   - 300+ city pillars (colorful vertical spikes) for every NoPing PoP
   - Soft green atmospheric glow, starfield backdrop
   - Drag-to-rotate, inertia, auto-spin idle
   - Thin arc tracers between cities (traffic attacks-style)
   - Style modes: "realistic" (Kaspersky look), "wireframe", "dots"
*/

const LAND_POLYS = [
  // North America
  [[-168,66],[-156,71],[-140,70],[-125,60],[-122,49],[-124,40],[-118,33],[-104,28],[-97,26],[-88,30],[-80,25],[-77,35],[-72,41],[-66,45],[-57,50],[-65,57],[-78,63],[-95,60],[-110,70],[-130,73],[-158,72]],
  // Central America
  [[-108,25],[-95,18],[-85,15],[-78,9],[-82,8],[-90,14],[-100,17],[-108,25]],
  // South America
  [[-80,12],[-73,11],[-65,10],[-52,4],[-48,-2],[-40,-5],[-35,-8],[-37,-15],[-39,-22],[-48,-25],[-55,-33],[-65,-40],[-70,-53],[-72,-52],[-72,-42],[-75,-30],[-80,-12],[-80,-4],[-79,2],[-77,7],[-80,12]],
  // Europe
  [[-10,37],[-5,43],[0,48],[4,51],[9,54],[13,55],[18,58],[22,66],[25,69],[20,70],[10,65],[5,60],[-3,58],[-6,55],[-10,52],[-10,45],[-10,37]],
  // Africa
  [[-17,21],[-12,14],[-5,5],[6,4],[9,0],[13,-5],[18,-12],[20,-25],[23,-34],[28,-33],[33,-26],[40,-15],[44,-3],[50,9],[48,12],[42,14],[38,18],[32,23],[25,30],[15,32],[5,33],[-6,32],[-12,27],[-17,21]],
  [[26,30],[32,30],[40,25],[48,28],[55,25],[60,28],[55,35],[45,38],[38,36],[30,35],[26,30]],
  // Russia
  [[25,57],[40,60],[60,62],[80,66],[100,70],[120,72],[140,72],[155,68],[170,66],[178,66],[178,72],[160,74],[140,76],[120,76],[95,77],[70,74],[45,72],[30,68],[25,57]],
  [[68,22],[72,24],[78,30],[85,28],[92,25],[95,22],[97,16],[92,12],[85,8],[80,6],[75,8],[72,15],[68,22]],
  [[80,45],[95,45],[110,42],[122,40],[128,38],[130,30],[122,25],[115,22],[108,20],[100,22],[95,28],[85,35],[80,45]],
  [[130,34],[136,35],[141,38],[144,42],[141,44],[138,40],[134,36],[130,34]],
  [[95,5],[105,3],[115,0],[125,-3],[135,-5],[140,-4],[135,-8],[120,-9],[105,-8],[95,-6],[95,5]],
  [[113,-22],[122,-18],[130,-13],[140,-12],[145,-15],[150,-24],[148,-36],[138,-38],[128,-33],[118,-33],[113,-30],[113,-22]],
  [[166,-46],[173,-41],[178,-38],[176,-41],[171,-45],[166,-46]],
  [[-50,60],[-40,63],[-25,70],[-20,80],[-30,83],[-45,80],[-55,75],[-55,65],[-50,60]],
  [[43,-12],[48,-15],[50,-22],[47,-25],[44,-22],[43,-12]],
  [[-6,50],[-3,52],[-2,55],[-4,58],[-7,57],[-8,54],[-6,50]],
];

function project(lng, lat, lambda0, phi0, R) {
  const λ = (lng - lambda0) * Math.PI / 180;
  const φ = lat * Math.PI / 180;
  const φ0 = phi0 * Math.PI / 180;
  const cosC = Math.sin(φ0)*Math.sin(φ) + Math.cos(φ0)*Math.cos(φ)*Math.cos(λ);
  if (cosC < 0) return null;
  const x = R * Math.cos(φ) * Math.sin(λ);
  const y = R * (Math.cos(φ0)*Math.sin(φ) - Math.sin(φ0)*Math.cos(φ)*Math.cos(λ));
  return { x, y, depth: cosC };
}
function pip(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi + 1e-9) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}
function isOnLand(lng, lat) {
  for (const p of LAND_POLYS) if (pip(lng, lat, p)) return true;
  return false;
}
function greatCircle(a, b, n) {
  const toV = (p) => {
    const φ = p.lat*Math.PI/180, λ = p.lng*Math.PI/180;
    return [Math.cos(φ)*Math.cos(λ), Math.cos(φ)*Math.sin(λ), Math.sin(φ)];
  };
  const fromV = ([x,y,z]) => ({ lat: Math.asin(Math.max(-1,Math.min(1,z)))*180/Math.PI, lng: Math.atan2(y,x)*180/Math.PI });
  const va = toV(a), vb = toV(b);
  const dot = va[0]*vb[0]+va[1]*vb[1]+va[2]*vb[2];
  const Ω = Math.acos(Math.max(-1, Math.min(1, dot)));
  if (Ω < 1e-6) return [a,b];
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const s1 = Math.sin((1-t)*Ω)/Math.sin(Ω);
    const s2 = Math.sin(t*Ω)/Math.sin(Ω);
    out.push(fromV([va[0]*s1+vb[0]*s2, va[1]*s1+vb[1]*s2, va[2]*s1+vb[2]*s2]));
  }
  return out;
}

// Deterministic colors for pillars — cycling palette like Kaspersky
const PILLAR_COLORS_GOOD = ["#9CFF2E", "#4EF0C8", "#4ED7FF", "#C4FF5E"];
const PILLAR_COLORS_BAD  = ["#FF7A1A", "#FF4577", "#FFB74E", "#FF2E5E"];
const LA_COORDS = { lng: -118.24, lat: 34.05 };

// Stable "hash" from city name to color index
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Runtime load of high-res land polygons from CDN (Natural Earth 110m)
// Falls back to the low-poly LAND_POLYS above if fetch fails.
let LAND_CACHE = null;
let LAND_PROMISE = null;
function loadHighResLand() {
  if (LAND_CACHE) return Promise.resolve(LAND_CACHE);
  if (LAND_PROMISE) return LAND_PROMISE;
  const urls = [
    "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json",
    "https://unpkg.com/world-atlas@2/land-110m.json",
  ];
  LAND_PROMISE = (async () => {
    for (const url of urls) {
      try {
        const r = await fetch(url);
        if (!r.ok) continue;
        const topo = await r.json();
        // Decode TopoJSON land arcs -> array of [lng,lat] rings
        const { arcs, transform, objects } = topo;
        const tx = transform ? transform.scale : [1,1];
        const tt = transform ? transform.translate : [0,0];
        const decodedArcs = arcs.map(arc => {
          let x = 0, y = 0;
          return arc.map(([dx, dy]) => {
            x += dx; y += dy;
            return [x * tx[0] + tt[0], y * tx[1] + tt[1]];
          });
        });
        const resolveArc = (i) => i >= 0 ? decodedArcs[i] : decodedArcs[~i].slice().reverse();
        const resolveRing = (arcIdxs) => {
          const ring = [];
          arcIdxs.forEach((idx, k) => {
            const seg = resolveArc(idx);
            ring.push(...(k === 0 ? seg : seg.slice(1)));
          });
          return ring;
        };
        const land = objects.land;
        const polys = [];
        const walk = (geom) => {
          if (geom.type === "Polygon") polys.push(resolveRing(geom.arcs[0]));
          else if (geom.type === "MultiPolygon") geom.arcs.forEach(poly => polys.push(resolveRing(poly[0])));
          else if (geom.type === "GeometryCollection") geom.geometries.forEach(walk);
        };
        walk(land);
        LAND_CACHE = polys;
        return LAND_CACHE;
      } catch(e) { /* try next */ }
    }
    LAND_CACHE = LAND_POLYS;
    return LAND_CACHE;
  })();
  return LAND_PROMISE;
}

function Globe({ state = "bad", style = "realistic", size = 560, className = "",
                 cameraRot = null, cameraLerp = 0, cameraZoom = 1, cameraCue = 0,
                 routes = null, pillarsAlpha = 1,
                 badRouteProgress = 1, goodRoutesOn = false, speedParticles = false,
                 pillarsIgniteT = 1 }) {
  // cameraRot {lng,lat}: target rotation when cueing — but user can always drag/zoom
  // cameraCue: incrementing number; each change re-snaps camera to cameraRot + cameraZoom
  // routes: { bad: [{lng,lat,city}], good: [[{...}, ...], ...] }
  const [rot, setRot] = React.useState({ lng: -60, lat: -8 });
  // cueActive: whether we're currently lerping to the cue target. User interaction cancels it.
  const cueRef = React.useRef({ active: false, target: null, zoomTarget: 1 });
  const [landData, setLandData] = React.useState(LAND_CACHE || LAND_POLYS);
  React.useEffect(() => {
    if (LAND_CACHE) { setLandData(LAND_CACHE); return; }
    loadHighResLand().then(d => setLandData(d));
  }, []);
  const velRef = React.useRef({ lng: 5, lat: 0 });
  const draggingRef = React.useRef(false);
  const lastRef = React.useRef({ x: 0, y: 0, t: 0 });
  const wrapRef = React.useRef(null);
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    let raf, last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const cue = cueRef.current;
      const scripted = cameraRot && !draggingRef.current && !cue.userOverride;
      if (scripted) {
        // Continuous scripted camera (choreography)
        setRot(r => {
          const k = Math.min(1, dt * (cameraLerp || 2.5));
          const dlng = ((cameraRot.lng - r.lng + 540) % 360) - 180;
          return {
            lng: r.lng + dlng * k,
            lat: r.lat + (cameraRot.lat - r.lat) * k
          };
        });
        velRef.current = { lng: 0, lat: 0 };
      } else if (cue.active && cue.target && !draggingRef.current) {
        // One-shot cue lerp (user clicked Sem/Com button)
        setRot(r => {
          const k = Math.min(1, dt * (cameraLerp || 2.5));
          const dlng = ((cue.target.lng - r.lng + 540) % 360) - 180;
          const newLng = r.lng + dlng * k;
          const newLat = r.lat + (cue.target.lat - r.lat) * k;
          if (Math.abs(dlng) < 0.3 && Math.abs(cue.target.lat - r.lat) < 0.3) {
            cueRef.current.active = false;
          }
          return { lng: newLng, lat: newLat };
        });
        velRef.current = { lng: 0, lat: 0 };
      } else if (!draggingRef.current) {
        // User in control — NO auto-drift, NO inertia. Globe stops where user released.
        velRef.current = { lng: 0, lat: 0 };
      }
      setTick(t => t + dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [cameraLerp, cameraRot?.lng, cameraRot?.lat]);

  // Fire cue when cameraCue changes
  React.useEffect(() => {
    if (cameraRot) {
      cueRef.current = { active: true, target: cameraRot, zoomTarget: cameraZoom, userOverride: false };
      setUserZoom(cameraZoom);
    }
  }, [cameraCue]);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    cueRef.current.active = false;
    cueRef.current.userOverride = true; // block scripted until next explicit cue
    lastRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velRef.current = { lng: 0, lat: 0 };
    wrapRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastRef.current.x;
    const dy = e.clientY - lastRef.current.y;
    const dt = Math.max(1, now - lastRef.current.t) / 1000;
    // Kaspersky-style: drag direction matches motion, weighty feel
    const dLng = -dx * 0.15;
    const dLat = dy * 0.12;
    setRot(r => ({
      lng: ((r.lng + dLng + 180) % 360 + 360) % 360 - 180,
      lat: Math.max(-70, Math.min(70, r.lat + dLat))
    }));
    // Dampened velocity for inertia
    velRef.current = {
      lng: velRef.current.lng * 0.5 + (dLng / dt) * 0.5,
      lat: velRef.current.lat * 0.5 + (dLat / dt) * 0.5
    };
    lastRef.current = { x: e.clientX, y: e.clientY, t: now };
  };
  const onPointerUp = (e) => {
    draggingRef.current = false;
    wrapRef.current?.releasePointerCapture?.(e.pointerId);
  };

  // Zoom: user wheel zoom + cue zoom combined. userZoom is user's multiplier.
  const [userZoom, setUserZoom] = React.useState(1);
  const [zoom, setZoom] = React.useState(cameraZoom);
  React.useEffect(() => {
    let raf, last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      // target zoom priority: scripted (auto mode) > cue > userZoom
      const cue = cueRef.current;
      const scripted = cameraRot && !cue.userOverride;
      const target = scripted ? cameraZoom
                   : cue.active ? cue.zoomTarget
                   : userZoom;
      setZoom(z => z + (target - z) * Math.min(1, dt * 2.2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [userZoom, cameraZoom, cameraRot]);

  // Wheel handler — user zoom
  const onWheel = (e) => {
    e.preventDefault();
    cueRef.current.active = false;
    cueRef.current.userOverride = true;
    const delta = -e.deltaY * 0.0015;
    setUserZoom(z => Math.max(0.75, Math.min(6.0, z + delta * z)));
  };
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const R_CLIP = (size / 2 - 18);          // fixed disk radius — don't change with zoom
  const R = R_CLIP * zoom;                 // projection radius — grows with zoom so we see detail
  const cx = size / 2, cy = size / 2;

  // Continent paths
  const landPaths = React.useMemo(() => {
    const paths = [];
    landData.forEach((poly) => {
      const pts = [];
      poly.forEach(([lng, lat]) => {
        const p = project(lng, lat, rot.lng, rot.lat, R);
        if (p) pts.push(`${(cx + p.x).toFixed(1)},${(cy - p.y).toFixed(1)}`);
      });
      if (pts.length > 2) paths.push(`M${pts.join(" L")} Z`);
    });
    return paths;
  }, [rot.lng, rot.lat, R, cx, cy, landData]);

  // Dot texture for land
  const dots = React.useMemo(() => {
    if (style === "wireframe") return [];
    const out = [];
    const step = style === "dots" ? 3 : 4;
    for (let lat = -80; lat <= 82; lat += step) {
      const cosLat = Math.cos(lat * Math.PI / 180);
      const lngStep = Math.max(step, step / Math.max(0.15, cosLat));
      for (let lng = -180; lng <= 180; lng += lngStep) {
        let onLand = false;
        for (const pp of landData) { if (pip(lng, lat, pp)) { onLand = true; break; } }
        if (!onLand) continue;
        const p = project(lng, lat, rot.lng, rot.lat, R);
        if (!p) continue;
        out.push({ x: cx + p.x, y: cy - p.y, d: p.depth });
      }
    }
    return out;
  }, [rot.lng, rot.lat, R, cx, cy, style, landData]);

  const wire = React.useMemo(() => {
    if (style !== "wireframe") return { m: [], p: [] };
    const meridians = [], parallels = [];
    for (let lng = -180; lng < 180; lng += 15) {
      const pts = [];
      for (let lat = -80; lat <= 80; lat += 3) {
        const p = project(lng, lat, rot.lng, rot.lat, R);
        if (p) pts.push(`${(cx + p.x).toFixed(1)},${(cy - p.y).toFixed(1)}`);
        else if (pts.length) { meridians.push(pts.join(" ")); pts.length = 0; }
      }
      if (pts.length) meridians.push(pts.join(" "));
    }
    for (let lat = -60; lat <= 80; lat += 15) {
      const pts = [];
      for (let lng = -180; lng <= 180; lng += 3) {
        const p = project(lng, lat, rot.lng, rot.lat, R);
        if (p) pts.push(`${(cx + p.x).toFixed(1)},${(cy - p.y).toFixed(1)}`);
        else if (pts.length) { parallels.push(pts.join(" ")); pts.length = 0; }
      }
      if (pts.length) parallels.push(pts.join(" "));
    }
    return { m: meridians, p: parallels };
  }, [rot.lng, rot.lat, R, cx, cy, style]);

  // Project every PoP
  const popPoints = React.useMemo(() => {
    return (window.POPS || []).map((pop, i) => {
      const p = project(pop.lng, pop.lat, rot.lng, rot.lat, R);
      if (!p) return null;
      const palette = state === "bad" ? PILLAR_COLORS_BAD : PILLAR_COLORS_GOOD;
      const color = palette[hashStr(pop.city) % palette.length];
      // Pillar height proportional to tier + subtle breathing animation
      const baseH = pop.tier === 0 ? 32 : pop.tier === 1 ? 24 : pop.tier === 2 ? 18 : 13;
      const breathe = 1 + Math.sin(tick*2 + hashStr(pop.city) * 0.31) * 0.12;
      const h = baseH * breathe * (0.55 + p.depth * 0.5);
      return { ...pop, i, sx: cx + p.x, sy: cy - p.y, depth: p.depth, color, h };
    }).filter(Boolean);
  }, [rot.lng, rot.lat, R, cx, cy, tick, state]);

  // Sort back-to-front for proper z-depth on pillars
  const popsSorted = React.useMemo(() => [...popPoints].sort((a,b) => a.depth - b.depth), [popPoints]);

  // Traffic arcs — choreographed routes OR default São Paulo fallback
  const sao = { lng: -46.63, lat: -23.55 };
  const arcs = React.useMemo(() => {
    // If choreography routes supplied, use those
    if (routes) {
      const out = [];
      // BAD: single zig-zag route drawn progressively (badRouteProgress 0..1)
      if (routes.bad && routes.bad.length > 1 && badRouteProgress > 0) {
        const pts = [];
        const segCount = routes.bad.length - 1;
        const totalUnit = segCount;
        const upto = badRouteProgress * totalUnit;
        for (let i = 0; i < segCount; i++) {
          const t0 = i, t1 = i + 1;
          if (upto <= t0) break;
          const a = routes.bad[i], b = routes.bad[i+1];
          const frac = Math.min(1, upto - t0);
          const N = 8;
          for (let j = 0; j <= N; j++) {
            const t = (j / N) * frac;
            // jitter for jagged look
            const jx = Math.sin(j*2.3 + i*1.7 + tick*3) * 0.6;
            const jy = Math.cos(j*2.1 + i*1.3 + tick*2.5) * 0.4;
            pts.push({ lng: a.lng + (b.lng - a.lng)*t + jx, lat: a.lat + (b.lat - a.lat)*t + jy });
          }
        }
        const segs = []; let cur = [];
        pts.forEach(pt => {
          const pr = project(pt.lng, pt.lat, rot.lng, rot.lat, R);
          if (pr) cur.push(`${(cx + pr.x).toFixed(1)},${(cy - pr.y).toFixed(1)}`);
          else if (cur.length) { segs.push(cur.join(" ")); cur = []; }
        });
        if (cur.length) segs.push(cur.join(" "));
        const pulse = 0.5 + Math.sin(tick*3)*0.5;
        out.push({ segs, color: "#FF3B3B", bad: true, width: 1.8, opacity: 0.45 + pulse*0.5, dashed: true });
      }
      // GOOD: 3 direct routes, continuous green pulse
      if (goodRoutesOn && routes.good) {
        routes.good.forEach((route, ri) => {
          const allPts = [];
          for (let i = 0; i < route.length - 1; i++) {
            const gc = greatCircle(route[i], route[i+1], 20);
            allPts.push(...(i === 0 ? gc : gc.slice(1)));
          }
          const segs = []; let cur = [];
          allPts.forEach(pt => {
            const pr = project(pt.lng, pt.lat, rot.lng, rot.lat, R);
            if (pr) cur.push(`${(cx + pr.x).toFixed(1)},${(cy - pr.y).toFixed(1)}`);
            else if (cur.length) { segs.push(cur.join(" ")); cur = []; }
          });
          if (cur.length) segs.push(cur.join(" "));
          const ph = (tick * 2 + ri * 2.1) % 4;
          const pulse = ph < 1 ? ph : ph < 2 ? 1 : ph < 3 ? 3 - ph : 0;
          out.push({ segs, color: "#9CFF2E", bad: false, width: 1.4, opacity: 0.6 + pulse*0.4, dashed: false });
        });
      }
      return out;
    }
    // Default fallback (no choreography)
    const all = (window.POPS || []).filter(p => !p.home);
    let picks;
    if (state === "bad") {
      picks = [all.find(p=>p.city==="Tokyo"), all.find(p=>p.city==="Frankfurt"), all.find(p=>p.city==="Los Angeles"), all.find(p=>p.city==="Moscow")].filter(Boolean);
    } else {
      picks = [...all].sort((a,b)=>(a.tier||9)-(b.tier||9)).slice(0, 22);
    }
    return picks.map((d, idx) => {
      const raw = greatCircle(sao, d, 36);
      const pts = state === "bad"
        ? raw.map((pt, i) => {
            if (i === 0 || i === 36) return pt;
            const wob = Math.sin(i * 0.8 + idx + tick*1.2) * 10;
            return { lng: pt.lng + wob, lat: pt.lat + wob*0.4 };
          })
        : raw;
      const segs = []; let cur = [];
      pts.forEach(pt => {
        const pr = project(pt.lng, pt.lat, rot.lng, rot.lat, R);
        if (pr) cur.push(`${(cx + pr.x).toFixed(1)},${(cy - pr.y).toFixed(1)}`);
        else if (cur.length) { segs.push(cur.join(" ")); cur = []; }
      });
      if (cur.length) segs.push(cur.join(" "));
      const palette = state === "bad" ? PILLAR_COLORS_BAD : PILLAR_COLORS_GOOD;
      const color = palette[idx % palette.length];
      return { segs, color, bad: state === "bad", width: state === "bad" ? 1.3 : 0.75, opacity: state === "bad" ? 0.75 : 0.55, dashed: state === "bad" };
    });
  }, [rot.lng, rot.lat, R, cx, cy, state, tick, routes, badRouteProgress, goodRoutesOn]);

  const atmosColor = state === "bad" ? "rgba(255,122,26,0.22)" : "rgba(156,255,46,0.26)";
  const rimColor   = state === "bad" ? "rgba(255,122,26,0.45)" : "rgba(156,255,46,0.5)";

  return (
    <div
      ref={wrapRef}
      className={`globe-wrap ${className}`}
      style={{ width: size, height: size, cursor: draggingRef.current ? 'grabbing' : 'grab', touchAction:'none' }}
      data-state={state} data-style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Starfield + speed particles (warp effect when goodRoutesOn) */}
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}
        style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        {[...Array(speedParticles ? 700 : 140)].map((_,i) => {
          const seed = (i * 9301 + 49297) % 233280;
          const rx = (seed % 1000) / 1000;
          const ry = ((seed * 7) % 1000) / 1000;
          const baseR = 0.3 + ((seed * 13) % 100) / 140;
          const opacity = 0.15 + ((seed * 17) % 100) / 180;
          const twinkle = 0.7 + Math.sin(tick*2 + i) * 0.3;
          // Warp: when speedParticles, stars streak radially outward from center
          if (speedParticles) {
            const ang = Math.atan2(ry - 0.5, rx - 0.5);
            const baseDist = Math.hypot(rx - 0.5, ry - 0.5);
            const warp = ((tick * 0.15 + (seed % 100) / 100) % 0.55);
            const dist = baseDist + warp;
            const sx = 0.5 + Math.cos(ang) * dist;
            const sy = 0.5 + Math.sin(ang) * dist;
            if (sx < 0 || sx > 1 || sy < 0 || sy > 1) return null;
            const streakLen = Math.min(12, warp * 45);
            const x2 = sx * size - Math.cos(ang) * streakLen;
            const y2 = sy * size - Math.sin(ang) * streakLen;
            const fade = 1 - warp / 0.55;
            return (
              <line key={i}
                x1={sx*size} y1={sy*size} x2={x2} y2={y2}
                stroke="#9CFF2E"
                strokeWidth={baseR * 1.2}
                strokeLinecap="round"
                opacity={0.7 * fade}
              />
            );
          }
          return <circle key={i} cx={rx*size} cy={ry*size} r={baseR} fill="#C8D6E8" opacity={opacity * twinkle}/>;
        })}
      </svg>

      <div className="globe-halo" style={{
        background: `radial-gradient(circle, ${atmosColor} 0%, transparent 62%)`,
        filter: 'blur(20px)',
      }}/>

      {/* Globe SVG — size is fixed. Zoom is applied to projected coordinates inside,
          so the visible disk stays the same size but we see more/less of the sphere surface. */}
      <svg className="globe-svg" viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs>
          <radialGradient id="sphereShade" cx="38%" cy="30%" r="80%">
            <stop offset="0%"  stopColor={state === "bad" ? "#1a140d" : "#0f1f24"}/>
            <stop offset="30%" stopColor={state === "bad" ? "#100c08" : "#071318"}/>
            <stop offset="65%" stopColor="#030609"/>
            <stop offset="100%" stopColor="#000103"/>
          </radialGradient>
          <radialGradient id="terminator" cx="30%" cy="25%" r="90%">
            <stop offset="50%" stopColor="transparent"/>
            <stop offset="85%" stopColor="rgba(0,0,0,0.5)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.85)"/>
          </radialGradient>
          <radialGradient id="sphereHighlight" cx="32%" cy="22%" r="45%">
            <stop offset="0%" stopColor={state === "bad" ? "rgba(255,180,100,0.08)" : "rgba(156,255,46,0.1)"}/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <radialGradient id="atmos" cx="50%" cy="50%" r="58%">
            <stop offset="76%" stopColor="transparent"/>
            <stop offset="100%" stopColor={atmosColor}/>
          </radialGradient>
          <radialGradient id="rim" cx="50%" cy="50%" r="50%">
            <stop offset="91%" stopColor="transparent"/>
            <stop offset="99%" stopColor={rimColor}/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4"/>
          </filter>
          <filter id="heavyGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
          <clipPath id="sphereClip"><circle cx={cx} cy={cy} r={R_CLIP}/></clipPath>
        </defs>

        {/* Atmosphere */}
        <circle cx={cx} cy={cy} r={R_CLIP + 16} fill="url(#atmos)"/>

        {/* Base sphere */}
        <circle cx={cx} cy={cy} r={R_CLIP} fill="url(#sphereShade)"/>
        {/* Top-left highlight for 3D volume */}
        <circle cx={cx} cy={cy} r={R_CLIP} fill="url(#sphereHighlight)"/>

        <g clipPath="url(#sphereClip)">
          {/* Realistic: Kaspersky-style solid continents w/ extruded 3D feel */}
          {style === "realistic" && (
            <g>
              {/* Deep shadow below — gives extrusion depth */}
              {landPaths.map((d, i) => (
                <path key={`s3-${i}`} d={d}
                  fill="rgba(0,0,0,0.9)"
                  transform="translate(3.5, 3.5)"/>
              ))}
              {landPaths.map((d, i) => (
                <path key={`s2-${i}`} d={d}
                  fill="rgba(0,0,0,0.75)"
                  transform="translate(2.2, 2.2)"/>
              ))}
              {landPaths.map((d, i) => (
                <path key={`s1-${i}`} d={d}
                  fill="rgba(0,0,0,0.55)"
                  transform="translate(1, 1)"/>
              ))}
              {/* Main solid continent body */}
              {landPaths.map((d, i) => (
                <path key={i} d={d}
                  fill="#14181c"
                  stroke={state === "bad" ? "rgba(255,140,60,0.45)" : "rgba(170,255,70,0.5)"}
                  strokeWidth="0.5"
                  strokeLinejoin="round"/>
              ))}
              {/* Top-left highlight rim — 3D lift */}
              {landPaths.map((d, i) => (
                <path key={`hl-${i}`} d={d}
                  fill="none"
                  stroke={state === "bad" ? "rgba(255,200,140,0.28)" : "rgba(210,255,150,0.32)"}
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                  transform="translate(-0.8, -0.8)"/>
              ))}
            </g>
          )}

          {style === "dots" && dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={0.85}
              fill={state==="bad" ? "#FFA25E" : "#9CFF2E"} opacity={0.35 + d.d*0.55}/>
          ))}

          {style === "wireframe" && (
            <g fill="none" strokeWidth="0.5">
              {wire.m.map((pts, i) => <polyline key={`m${i}`} points={pts}
                stroke={state==="bad" ? "rgba(255,122,26,0.2)" : "rgba(156,255,46,0.22)"}/>)}
              {wire.p.map((pts, i) => <polyline key={`p${i}`} points={pts}
                stroke={state==="bad" ? "rgba(255,122,26,0.2)" : "rgba(156,255,46,0.22)"}/>)}
              {landPaths.map((d, i) => (
                <path key={`w${i}`} d={d} fill="none"
                  stroke={state==="bad" ? "rgba(255,122,26,0.55)" : "rgba(156,255,46,0.6)"} strokeWidth="1"/>
              ))}
            </g>
          )}

          {/* Terminator (night shading) */}
          <circle cx={cx} cy={cy} r={R_CLIP} fill="url(#terminator)"/>

          {/* Traffic arcs — drawn before pillars */}
          <g>
            {arcs.map((a, i) =>
              a.segs.map((seg, j) => (
                <polyline key={`a${i}-${j}`} points={seg}
                  fill="none"
                  stroke={a.color}
                  strokeWidth={a.width != null ? a.width : (a.bad ? 1.3 : 0.75)}
                  strokeDasharray={a.dashed ? "2 4" : "none"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={a.opacity != null ? a.opacity : (a.bad ? 0.75 : 0.55)}
                  filter="url(#softGlow)"
                />
              ))
            )}
          </g>

          {/* City pillars — one per PoP, Kaspersky-style */}
          <g>
            {popsSorted.map((p) => {
              // Cascade ignite: each pillar reveals based on its distance from LA
              const distFromLA = Math.hypot(p.lng - LA_COORDS.lng, p.lat - LA_COORDS.lat);
              const maxDist = 180; // roughly antipode
              const threshold = (distFromLA / maxDist);
              const ignite = Math.max(0, Math.min(1, (pillarsIgniteT - threshold) * 4));
              const baseOpacity = (0.4 + p.depth * 0.6) * pillarsAlpha * ignite;
              const scale = 0.3 + ignite * 0.7;
              // base glow on land
              return (
                <g key={p.i} opacity={baseOpacity}>
                  {/* Ground glow */}
                  <circle cx={p.sx} cy={p.sy} r={3} fill={p.color} opacity="0.25" filter="url(#heavyGlow)"/>
                  {/* Pillar */}
                  <line x1={p.sx} y1={p.sy} x2={p.sx} y2={p.sy - p.h * scale}
                    stroke={p.color} strokeWidth="1.1" strokeLinecap="round"
                    filter="url(#softGlow)" opacity="0.95"/>
                  {/* Pillar tip */}
                  <circle cx={p.sx} cy={p.sy - p.h * scale} r={1.2} fill={p.color}/>
                  {/* Base dot */}
                  <circle cx={p.sx} cy={p.sy} r={0.9} fill={p.color}/>
                  {/* City label — only visible when zoomed in ~3x USA view (zoom > 4.2) */}
                  {zoom > 4.2 && p.depth > 0.2 && (
                    <text
                      x={p.sx + 4} y={p.sy - p.h * scale - 3}
                      fill={p.color}
                      fontFamily="var(--font-mono)"
                      fontSize={Math.min(10, 4 + (zoom - 4) * 2.2)}
                      fontWeight="600"
                      letterSpacing="0.1em"
                      opacity={Math.min(1, (zoom - 4.2) * 2.5) * (0.5 + p.depth * 0.5)}
                      filter="url(#softGlow)"
                    >{p.city.toUpperCase()}</text>
                  )}
                </g>
              );
            })}
          </g>

          {/* HQ São Paulo — only when not scripted */}
          {!routes && (() => {
            const home = popPoints.find(p => p.home);
            if (!home) return null;
            const c = state === "bad" ? "#FFC48A" : "#C4FF5E";
            return (
              <g>
                <circle cx={home.sx} cy={home.sy} r={5 + Math.sin(tick*3)*1.2}
                  fill="none" stroke={c} strokeWidth="1.2" opacity="0.8"/>
                <circle cx={home.sx} cy={home.sy} r={9 + Math.sin(tick*3)*2}
                  fill="none" stroke={c} strokeWidth="0.6" opacity="0.4"/>
                <circle cx={home.sx} cy={home.sy} r={2.2} fill={c}/>
              </g>
            );
          })()}

          {/* Route city markers — LA (player) & Chicago (server) + waypoints */}
          {routes && (() => {
            const la = routes.bad && routes.bad[0];
            const chi = routes.bad && routes.bad[routes.bad.length - 1];
            const markerNodes = [];
            // Bad-route waypoints (visited ones get highlight as progress advances)
            if (routes.bad && badRouteProgress > 0) {
              const visitedCount = Math.ceil(badRouteProgress * (routes.bad.length - 1));
              routes.bad.slice(1, -1).forEach((wp, idx) => {
                const visited = idx < visitedCount - 1;
                const pr = project(wp.lng, wp.lat, rot.lng, rot.lat, R);
                if (!pr) return;
                const x = cx + pr.x, y = cy - pr.y;
                const pulse = visited ? (0.6 + Math.sin(tick*4 + idx)*0.4) : 0.25;
                markerNodes.push(
                  <g key={`wp-${idx}`} opacity={pulse}>
                    <circle cx={x} cy={y} r={visited ? 3 : 2} fill="none"
                      stroke="#FF3B3B" strokeWidth="1" filter="url(#softGlow)"/>
                    <circle cx={x} cy={y} r={1.2} fill="#FF3B3B"/>
                  </g>
                );
              });
            }
            // Endpoint LA — player
            if (la) {
              const pr = project(la.lng, la.lat, rot.lng, rot.lat, R);
              if (pr) {
                const x = cx + pr.x, y = cy - pr.y;
                const col = goodRoutesOn ? "#9CFF2E" : "#FF3B3B";
                markerNodes.push(
                  <g key="la">
                    <circle cx={x} cy={y} r={8 + Math.sin(tick*3)*2} fill="none" stroke={col} strokeWidth="1" opacity="0.5"/>
                    <circle cx={x} cy={y} r={12 + Math.sin(tick*3)*3} fill="none" stroke={col} strokeWidth="0.5" opacity="0.3"/>
                    <circle cx={x} cy={y} r={3.5} fill={col}/>
                    <circle cx={x} cy={y} r={1.5} fill="#000"/>
                    <text x={x + 10} y={y - 8} fill={col} fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" letterSpacing="0.15em">LOS ANGELES</text>
                    <text x={x + 10} y={y + 3} fill="rgba(255,255,255,0.5)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.1em">● PLAYER</text>
                  </g>
                );
              }
            }
            // Endpoint Chicago — server
            if (chi) {
              const pr = project(chi.lng, chi.lat, rot.lng, rot.lat, R);
              if (pr) {
                const x = cx + pr.x, y = cy - pr.y;
                const col = goodRoutesOn ? "#9CFF2E" : "#FF3B3B";
                markerNodes.push(
                  <g key="chi">
                    <circle cx={x} cy={y} r={8 + Math.sin(tick*3 + 1)*2} fill="none" stroke={col} strokeWidth="1" opacity="0.5"/>
                    <rect x={x-3} y={y-3} width="6" height="6" fill={col} transform={`rotate(45 ${x} ${y})`}/>
                    <rect x={x-1.5} y={y-1.5} width="3" height="3" fill="#000" transform={`rotate(45 ${x} ${y})`}/>
                    <text x={x - 10} y={y - 10} textAnchor="end" fill={col} fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" letterSpacing="0.15em">CHICAGO</text>
                    <text x={x - 10} y={y + 1} textAnchor="end" fill="rgba(255,255,255,0.5)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.1em">◆ SERVER</text>
                  </g>
                );
              }
            }
            return markerNodes;
          })()}
        </g>

        {/* Rim */}
        <circle cx={cx} cy={cy} r={R_CLIP} fill="url(#rim)"/>
        <circle cx={cx} cy={cy} r={R_CLIP} fill="none"
          stroke={state === "bad" ? "rgba(255,122,26,0.4)" : "rgba(156,255,46,0.45)"} strokeWidth="0.7"/>
      </svg>

      {/* Rotating outer ticks */}
      <svg viewBox="0 0 100 100"
        style={{ transform: `rotate(${rot.lng * 0.25}deg)`, position:'absolute', inset:0, pointerEvents:'none' }}>
        {[...Array(72)].map((_, i) => (
          <line key={i}
            x1="50" y1="1.5" x2="50" y2={i % 6 === 0 ? "4.5" : "2.8"}
            stroke={state === "bad" ? "rgba(255,122,26,0.3)" : "rgba(156,255,46,0.3)"}
            strokeWidth={i % 6 === 0 ? 0.35 : 0.18}
            transform={`rotate(${i * 5} 50 50)`}
          />
        ))}
      </svg>

      {/* Drag hint */}
      <div style={{
        position:'absolute', bottom: 6, left: '50%', transform:'translateX(-50%)',
        fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'0.2em',
        color:'var(--fg-faint)', textTransform:'uppercase', pointerEvents:'none',
        whiteSpace:'nowrap'
      }}>
        ◐ ARRASTE · ROLE P/ ZOOM · {(window.POPS||[]).length} POPs
      </div>
    </div>
  );
}

window.Globe = Globe;
