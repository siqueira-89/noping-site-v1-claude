function Stats() {
  const [ref, seen] = window.useReveal();
  return (
    <section className="section section-sm">
      <div className="container">
        <div ref={ref} className={`stats-grid reveal ${seen ? "in" : ""}`}>
          {window.STATS.map((s, i) => (
            <div key={i} className="stat-card">
              {s.prefix && <div className="prefix">{s.prefix}</div>}
              <div className="value">
                {s.value.replace("+", "")}{s.value.includes("+") && <span className="plus">+</span>}
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Stats = Stats;
