// FAQ — replicates the global FAQ markup used on /affiliates so
// the visual treatment matches across pages. Uses faq.js global
// accordion behaviour (initFAQ + .faq-item.active toggling).
function Faq() {
  const ref = React.useRef(null);

  // Initialize the global accordion behaviour once the markup is in DOM.
  React.useEffect(() => {
    if (window.NoPingFAQ && ref.current) {
      window.NoPingFAQ.init(ref.current);
    }
  }, []);

  return (
    <section className="section section-four" id="faq">
      <div className="container">
        <div className="faq-grid" ref={ref}>
          <div className="faq-left">
            <div className="eyebrow" style={{marginBottom: 12}}>SUPORTE</div>
            <h2 className="faq-title">Perguntas Frequentes</h2>
            <p className="faq-desc">
              Explore nossa seção de perguntas frequentes para encontrar respostas
              a todas as suas dúvidas. De detalhes sobre assinatura a suporte
              técnico, cobrimos tudo para garantir uma experiência tranquila.
            </p>
            <div className="faq-btn-group">
              <a href="#trial" className="faq-btn green">TESTE GRATUITO AGORA</a>
              <a href="#support" className="faq-btn purple">CENTRAL DE AJUDA</a>
            </div>
          </div>

          <div className="faq-accordion">
            {window.FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${i === 0 ? 'active' : ''}`}>
                <button className="faq-trigger" type="button">
                  <span className="faq-question">{f.q}</span>
                  <span className="faq-icon-indicator">+</span>
                </button>
                <div className="faq-content">
                  <div className="faq-answer-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Faq = Faq;
