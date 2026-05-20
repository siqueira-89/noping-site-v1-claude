// Reveal-on-scroll hook
function useReveal() {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}
window.useReveal = useReveal;

// Animated number counter
function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!active) { setValue(0); return; }
    let raf; const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}
window.useCountUp = useCountUp;

// Tweak hook — pulls from localStorage or DEFAULTS in page
function useTweaks() {
  const defaultsEl = document.getElementById('tweak-defaults');
  let defaults = { globeStyle: "realistic", heroLayout: "split", density: "balanced", copyTone: "competitivo", typeDirection: "grotesk" };
  try {
    const raw = defaultsEl.textContent.match(/\{[\s\S]*?\}/);
    if (raw) defaults = { ...defaults, ...JSON.parse(raw[0]) };
  } catch(e){}

  const [tweaks, setTweaks] = React.useState(defaults);

  const update = React.useCallback((edits) => {
    setTweaks(prev => ({ ...prev, ...edits }));
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    } catch(e){}
  }, []);

  // Apply body attrs
  React.useEffect(() => {
    document.body.dataset.type = tweaks.typeDirection;
    document.body.dataset.density = tweaks.density;
  }, [tweaks.typeDirection, tweaks.density]);

  return [tweaks, update];
}
window.useTweaks = useTweaks;
