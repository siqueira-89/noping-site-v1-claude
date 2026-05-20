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

  return (
    <>
      <window.Header/>
      <window.Hero tweaks={tweaks}/>
      <window.Stats/>
      <div className="divider-rule"/>
      <window.Tech tweaks={tweaks}/>
      <window.FpsBooster tweaks={tweaks}/>
      <window.MultiGame/>
      <window.AppDashboard/>
      <window.Coverage/>
      <window.ProPlayers/>
      <window.Media/>
      <window.CtaBanner tweaks={tweaks}/>
      <window.Faq/>
      <window.Footer/>
      <window.TweaksPanel tweaks={tweaks} setTweaks={setTweaks} editMode={editMode}/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
