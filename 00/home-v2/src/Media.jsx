function Media() {
  return (
    <section className="section section-sm">
      <div className="container">
        <div style={{marginBottom: 32}}>
          <div className="eyebrow">NoPing na mídia</div>
          <h3 style={{fontSize:36, marginTop:12}}>Reconhecido pela imprensa gamer.</h3>
        </div>
        <div className="media-row">
          {window.MEDIA.map((m, i) => (
            <div key={i} className="media-logo">{m}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Media = Media;
