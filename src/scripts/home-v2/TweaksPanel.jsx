function TweaksPanel({ tweaks, setTweaks, editMode }) {
  const set = (k, v) => setTweaks({ [k]: v });

  const groups = [
    { key: "globeStyle", label: "Estilo do Globo", options: [["realistic","Realista"],["wireframe","Wireframe"],["dots","Pontilhado"]] },
    { key: "heroLayout", label: "Layout do Hero",  options: [["split","Globo à direita"],["center","Centralizado"]] },
    { key: "density",    label: "Densidade",       options: [["minimal","Mínimo"],["balanced","Balanceado"],["dense","Carregado"]] },
    { key: "copyTone",   label: "Tom do Copy",     options: [["tecnico","Técnico"],["emocional","Emocional"],["competitivo","Competitivo"]] },
    { key: "typeDirection", label: "Tipografia",   options: [["grotesk","Grotesk"],["display","Display gamer"]] },
  ];

  return (
    <div className={`tweaks-panel ${editMode ? "" : "hidden"}`}>
      <div className="tweaks-head">
        <h4>▸ Tweaks</h4>
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.15em',color:'var(--fg-mute)'}}>LIVE</span>
      </div>
      <div className="tweaks-body">
        {groups.map(g => (
          <div key={g.key} className="tweak-group">
            <label>{g.label}</label>
            <div className="tweak-options">
              {g.options.map(([v, l]) => (
                <button key={v} className={`tweak-btn ${tweaks[g.key] === v ? "active" : ""}`} onClick={() => set(g.key, v)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.TweaksPanel = TweaksPanel;
