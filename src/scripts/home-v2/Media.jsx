// Media — redesigned as a card grid using the site visual system
// (eyebrow + media name in branded cards w/ green-glow hover).
function Media() {
  const [ref, seen] = window.useReveal();
  return (
    <section className="section section-sm">
      <div className="container">
        <div style={{marginBottom: 28, textAlign: 'center', maxWidth: 720, margin: '0 auto 28px'}}>
          <div className="eyebrow" style={{justifyContent:'center'}}>NoPing na mídia</div>
          <h3 style={{fontSize:36, marginTop:12, color:'var(--fg)'}}>Reconhecido pela <em style={{fontStyle:'normal', color:'var(--green)'}}>imprensa gamer</em>.</h3>
        </div>
        <div ref={ref} className={`media-grid reveal ${seen ? "in" : ""}`}>
          {window.MEDIA.map((m, i) => (
            <div key={i} className="media-card" style={{ transitionDelay: `${i * 40}ms` }}>
              <span className="media-eyebrow">VEÍCULO</span>
              <span className="media-name">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Media = Media;
