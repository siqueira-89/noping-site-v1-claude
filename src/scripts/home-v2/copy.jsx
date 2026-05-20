// Copy bank — três tons (técnico, emocional, competitivo)
const COPY = {
  tecnico: {
    heroTitle: "Roteamento inteligente. Ping mínimo. FPS maximizado.",
    heroSub: "NoPing usa IA para escolher a melhor rota entre +2000 PoPs em tempo real, reduzindo latência e perda de pacotes em qualquer jogo online.",
    heroCtaPrimary: "Iniciar teste grátis",
    heroCtaSecondary: "Baixar NoPing",
    heroBadge: "Tecnologia de roteamento IA v3.0",

    techTitle: "A engenharia por trás do <em>menor ping do mundo</em>.",
    techSub: "Uma pilha completa de otimização de rede — do seu cliente até o servidor do jogo.",

    fpsTitle: "Boost de FPS com <em>realocação de recursos</em>.",
    fpsSub: "Nosso agente desliga processos não-essenciais e libera até 35% de CPU/RAM para o jogo em foco.",

    ctaTitle: "Teste grátis. Acesso instantâneo.",
    ctaSub: "1 dia de acesso premium, sem cartão, sem compromisso.",
  },
  emocional: {
    heroTitle: "Sinta a diferença antes do primeiro tiro.",
    heroSub: "Jogue como se estivesse na LAN do mundial. NoPing elimina o lag que rouba suas jogadas — do clutch à build final.",
    heroCtaPrimary: "Jogar agora",
    heroCtaSecondary: "Instalar NoPing",
    heroBadge: "Confiado por +3 milhões de players",

    techTitle: "A tecnologia que <em>te devolve o controle</em>.",
    techSub: "Cada feature foi construída para uma coisa só: você ganhar mais partidas.",

    fpsTitle: "Seu PC, <em>no limite máximo</em>.",
    fpsSub: "Liberamos tudo que o jogo precisa e desligamos o que atrapalha. Você só sente a diferença.",

    ctaTitle: "Entre no jogo. Sem desculpa.",
    ctaSub: "1 dia grátis. Zero compromisso. Só performance.",
  },
  competitivo: {
    heroTitle: "Pro players não jogam com lag. Você não deveria.",
    heroSub: "NoPing é a vantagem competitiva de campeões mundiais de CS2, Valorant e Fortnite. +2000 servidores, IA de roteamento, 99% de redução no ping.",
    heroCtaPrimary: "Entrar no NoPing",
    heroCtaSecondary: "Download Windows",
    heroBadge: "Usado por campeões mundiais",

    techTitle: "Tecnologia <em>nível torneio</em>, na sua casa.",
    techSub: "A mesma stack que entrega performance em finais mundiais — rodando no seu PC em 2 cliques.",

    fpsTitle: "Suba de rank com <em>FPS estável</em>.",
    fpsSub: "Até 60% mais FPS. Sem drops no clutch. Sem desculpa técnica.",

    ctaTitle: "Assuma o controle. Teste grátis.",
    ctaSub: "24 horas de acesso pro. Veja a diferença no primeiro ranked.",
  }
};

window.COPY = COPY;

// Games catalog (placeholders = SVG generativos)
const GAMES = [
  { id: "valorant",  name: "VALORANT",       color: "#FF4655", gradient: ["#FF4655", "#1a1a2e"] },
  { id: "cs2",       name: "COUNTER-STRIKE 2", color: "#F2A73C", gradient: ["#F2A73C", "#1e2a3a"] },
  { id: "fortnite",  name: "FORTNITE",       color: "#9B51FF", gradient: ["#9B51FF", "#1a0d33"] },
  { id: "lol",       name: "LEAGUE OF LEGENDS", color: "#C89B3C", gradient: ["#C89B3C", "#0A1428"] },
  { id: "pubg",      name: "PUBG",           color: "#F39200", gradient: ["#F39200", "#2a1a0a"] },
  { id: "r6",        name: "RAINBOW SIX",    color: "#13537D", gradient: ["#13537D", "#0a1520"] },
  { id: "wow",       name: "WORLD OF WARCRAFT", color: "#4DC1FF", gradient: ["#4DC1FF", "#0a1a2a"] },
  { id: "dota2",     name: "DOTA 2",         color: "#D4342D", gradient: ["#D4342D", "#1a0a0a"] },
  { id: "marvelrivals", name: "MARVEL RIVALS", color: "#E6243C", gradient: ["#E6243C", "#1a0a0a"] },
  { id: "albion",    name: "ALBION ONLINE",  color: "#E0C270", gradient: ["#E0C270", "#1a1a1a"] },
  { id: "minecraft", name: "MINECRAFT",      color: "#5D8B3A", gradient: ["#5D8B3A", "#0e1a0a"] },
  { id: "apex",      name: "APEX LEGENDS",   color: "#DA292A", gradient: ["#DA292A", "#1a1a1a"] },
  { id: "overwatch", name: "OVERWATCH 2",    color: "#F99E1A", gradient: ["#F99E1A", "#1a1a2a"] },
  { id: "gta",       name: "GTA ONLINE",     color: "#67A5A0", gradient: ["#67A5A0", "#0a1a1a"] },
];
window.GAMES = GAMES;

// Pro players / testimonials
const PROS = [
  { handle: "COLDZERA",  role: "2X MAJOR CHAMPION", game: "CS2",       country: "🇧🇷", tint: "#F2A73C",
    quote: "Ping alto destrói qualquer jogada. Zero travada, ping baixo, e aquela confiança de focar só na mira.", },
  { handle: "SACY",      role: "CAMPEÃO MUNDIAL VALORANT", game: "VALORANT", country: "🇧🇷", tint: "#FF4655",
    quote: "Cada frame é decisivo nos duelos e execuções de utility. A diferença na latência é absurda.", },
  { handle: "ARKANE",    role: "INFLUENCIADOR",     game: "FORTNITE",  country: "🇧🇷", tint: "#9B51FF",
    quote: "Já joguei com conexões instáveis e nada estraga mais um desempenho. Com NoPing, precisão total.", },
  { handle: "LESTRIPEZ", role: "INFLUENCIADOR",     game: "FORTNITE",  country: "🇩🇪", tint: "#9B51FF",
    quote: "Minha conexão ficou MUITO mais estável. Zero lag, sem me preocupar com latência ou queda de FPS.", },
];
window.PROS = PROS;

// Stats
const STATS = [
  { value: "2000+", label: "Servidores em todo o mundo" },
  { value: "2000+", label: "Jogos suportados" },
  { value: "99%",   label: "Redução no ping", prefix: "Até" },
  { value: "100%",  label: "Redução na perda de pacotes", prefix: "Até" },
];
window.STATS = STATS;

// Features
const FEATURES = [
  { icon: "timer",   title: "REDUÇÃO DE PING",     copy: "Conexão de ultra baixa latência com IA de roteamento em tempo real." },
  { icon: "gauge",   title: "BOOST DE FPS",        copy: "Libera até 35% mais CPU/RAM para o jogo. FPS até 60% maior." },
  { icon: "link",    title: "MULTI CONEXÃO",       copy: "Usa múltiplos servidores simultâneos — elimina jitter e ping spike." },
  { icon: "shield",  title: "BLOQUEIO DE IP",      copy: "Jogue de qualquer região, livre de firewall ou bloqueio regional." },
  { icon: "wifi",    title: "MULTI INTERNET",      copy: "Combina LAN + Wi-Fi em uma única conexão redundante e mais rápida." },
  { icon: "globe",   title: "GPS DE INTERNET",     copy: "IA escolhe a melhor rota dentre +2000 servidores em tempo real." },
  { icon: "chart",   title: "DADOS EM TEMPO REAL", copy: "Monitora CPU, GPU, RAM, ping e perda de pacotes durante a partida." },
  { icon: "target",  title: "AIM TRAINER",         copy: "Alvos dinâmicos, cores distintas e recuo realista para treinar mira." },
  { icon: "mic",     title: "AUDIOPAD",            copy: "Modifica timbre da voz, reproduz sons e memes direto no in-game." },
];
window.FEATURES = FEATURES;

// POPs are defined in pops.jsx (300+ real cities)

// Media logos (placeholders — nomes)
const MEDIA = ["ADRENALINE", "CLARO", "IGN", "FREEMMOSTATION", "UOL JOGOS", "TECMUNDO", "THE ENEMY"];
window.MEDIA = MEDIA;

// FAQ
const FAQS = [
  { q: "O que é NoPing?",
    a: "NoPing é uma plataforma de otimização de rede que usa IA para escolher a melhor rota entre você e o servidor do jogo, reduzindo drasticamente o ping e a perda de pacotes." },
  { q: "Como ativar o teste gratuito de 1 dia?",
    a: "Crie uma conta, baixe o app e clique em 'Iniciar teste'. 24 horas de acesso premium, sem precisar de cartão." },
  { q: "Como usar o NoPing?",
    a: "Abra o app, busque seu jogo, clique em 'Ativar'. O NoPing cuida do resto — roteamento, FPS e otimização de rede." },
  { q: "Como saber se meu ping está otimizado?",
    a: "O painel mostra latência em tempo real — antes e depois. Você vê a queda instantânea." },
  { q: "Quantos jogos o NoPing suporta?",
    a: "Mais de 2000 títulos em PC, console e mobile. Se o seu jogo não está na lista, você pode solicitar." },
  { q: "Como adicionar um jogo ao NoPing?",
    a: "No app, vá em 'Adicionar jogo', busque pelo nome e selecione. Se não estiver na biblioteca, use 'Solicitar jogo'." },
];
window.FAQS = FAQS;
