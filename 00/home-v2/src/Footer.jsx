function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="cert-row">
            <span style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--fg-mute)'}}>Certificado por</span>
            <div className="cert">Microsoft Certified</div>
            <div className="cert">DigiCert Secured</div>
            <div className="cert">Google Cloud</div>
          </div>
          <div className="store-row">
            <div className="store-btn"> <window.Ico.download style={{width:18,height:18}}/>
              <div><div className="store-sub">Disponível</div><div>App Store</div></div>
            </div>
            <div className="store-btn"> <window.Ico.download style={{width:18,height:18}}/>
              <div><div className="store-sub">Disponível</div><div>Google Play</div></div>
            </div>
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-brand">
            <h3>Desbloqueie o potencial completo dos jogos com ping melhorado.</h3>
            <p>Aproveite o máximo da sua experiência gamer com soluções avançadas para diminuir o ping e aprimorar sua performance online.</p>
            <div className="ctas">
              <button className="btn btn--primary btn--sm">Teste NoPing</button>
              <button className="btn btn--dark btn--sm" style={{background:'#3B2985', borderColor:'#6A4FC9', color:'#e6deff'}}>Assine agora</button>
            </div>
          </div>
          <div className="footer-col">
            <h4>NoPing</h4>
            <ul>
              <li>Servidores</li><li>Jogos</li><li>Preços</li><li>Download</li><li>Teste Grátis</li><li>Afiliados</li><li>Quem Somos</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Tecnologia</h4>
            <ul>
              <li>Multi Conexão</li><li>Multi Internet</li><li>Boost FPS</li><li>Redução de Ping</li><li>Aim Trainer</li><li>AudioPad</li><li>Pro Settings</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ajuda</h4>
            <ul>
              <li>Tutorial Windows</li><li>Tutorial iOS</li><li>Tutorial Android</li><li>Suporte</li><li>Privacidade</li><li>Termos de Uso</li><li>FAQ</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Blog</h4>
            <ul>
              <li>O que é lag e como reduzir</li><li>O que é jitter?</li><li>Estabilidade de conexão</li><li>Guia completo de ping</li><li>Perda de pacotes</li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <span>© 2026 NoPing · Incrível Sistemas</span>
          <div style={{display:'flex', gap:24}}>
            <span>Discord</span><span>TikTok</span><span>Instagram</span><span>X</span><span>YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
