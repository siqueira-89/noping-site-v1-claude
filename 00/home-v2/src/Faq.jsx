function Faq() {
  return (
    <section className="section">
      <div className="container">
        <div className="faq-grid">
          <div>
            <div className="eyebrow">FAQ</div>
            <h2 className="section-title" style={{marginTop:18, marginBottom:20}}>Perguntas <em>Frequentes</em></h2>
            <p style={{fontSize:15, maxWidth:360, marginBottom:28}}>
              De assinatura a suporte técnico, cobrimos tudo que você precisa para uma experiência tranquila.
            </p>
            <div style={{display:'flex', gap:10}}>
              <button className="btn btn--primary">Teste Grátis</button>
              <button className="btn btn--dark" style={{background:'#3B2985', borderColor:'#6A4FC9', color:'#e6deff'}}>Central de ajuda</button>
            </div>
          </div>
          <div className="faq-list">
            {window.FAQS.map((f, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary>
                  {f.q}
                  <window.Ico.plus className="faq-icon" style={{width:14,height:14}}/>
                </summary>
                <div className="answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Faq = Faq;
