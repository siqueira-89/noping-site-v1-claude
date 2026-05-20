function Tech({ tweaks }) {
  const [ref, seen] = window.useReveal();
  const copy = window.COPY[tweaks.copyTone] || window.COPY.competitivo;
  return (
    <section className="section">
      <div className="container">
        <div className="tech-head">
          <div>
            <div className="eyebrow">Tecnologia NoPing</div>
            <h2 className="section-title" style={{marginTop:16}}
              dangerouslySetInnerHTML={{ __html: copy.techTitle }} />
          </div>
          <div>
            <p style={{fontSize:16,lineHeight:1.6,maxWidth:480}}>{copy.techSub}</p>
          </div>
        </div>
        <div ref={ref} className={`features-grid reveal ${seen ? "in" : ""}`}>
          {window.FEATURES.map((f, i) => {
            const IconComp = window.Ico[f.icon];
            return (
              <div key={i} className="feature-cell">
                <div className="feature-icon">{IconComp && <IconComp/>}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-copy">{f.copy}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
window.Tech = Tech;
