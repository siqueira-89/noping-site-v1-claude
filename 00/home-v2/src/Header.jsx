function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <img src="assets/noping-logo.webp" alt="NoPing" />
      </div>
      <nav>
        <a href="#">Jogos</a>
        <a href="#" className="has-plus">Preços</a>
        <a href="#">Download</a>
        <a href="#">Afiliados</a>
        <a href="#">Suporte</a>
        <a href="#">Blog</a>
      </nav>
      <div className="right">
        <span className="lang">🇧🇷 PT ▾</span>
        <a href="#" style={{fontSize:'13px', color:'var(--fg-dim)', fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase'}}>Login</a>
        <button className="btn btn--primary btn--sm">Teste Grátis</button>
      </div>
    </header>
  );
}
window.Header = Header;
