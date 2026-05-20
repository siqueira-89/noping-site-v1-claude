function App() {
  const [tweaks, setTweaks] = window.useTweaks();
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e.data && e.data.type;
      if (t === '__activate_edit_mode') setEditMode(true);
      if (t === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e){}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // NOTE: Header / Footer come from the GLOBAL site components
  // (src/components/header.js + src/components/footer.js) — rendered
  // OUTSIDE this React tree via `#global-header` / `#global-footer`
  // placeholders. Do NOT render <window.Header/> or <window.Footer/> here.
  // The TweaksPanel is intentionally hidden in production (CSS rule).
  return (
    <>
      <window.Hero tweaks={tweaks}/>
      <window.Stats/>
      <window.Tech tweaks={tweaks}/>
      <window.FpsBooster tweaks={tweaks}/>
      <window.MultiGame/>
      <window.AppDashboard/>
      <window.Coverage/>
      <window.ProPlayers/>
      <window.Media/>
      <window.CtaBanner tweaks={tweaks}/>
      <window.Faq/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
