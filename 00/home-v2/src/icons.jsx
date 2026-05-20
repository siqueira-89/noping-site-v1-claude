// Simple inline SVG icon set
const Ico = {
  timer: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13V8M9 2h6M12 5V2" strokeLinecap="round" />
    </svg>
  ),
  gauge: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M3 14a9 9 0 0118 0" strokeLinecap="round"/>
      <path d="M12 14l4-4" strokeLinecap="round"/>
      <circle cx="12" cy="14" r="1.2" fill="currentColor"/>
    </svg>
  ),
  link: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M10 14a4 4 0 01 0 -5.6l2-2a4 4 0 015.6 5.6l-1 1"/>
      <path d="M14 10a4 4 0 010 5.6l-2 2a4 4 0 01-5.6-5.6l1-1"/>
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/>
    </svg>
  ),
  wifi: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M5 12a10 10 0 0114 0M8 15a6 6 0 018 0M11 18a1.5 1.5 0 012 0" strokeLinecap="round"/>
    </svg>
  ),
  globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>
    </svg>
  ),
  chart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M4 19V5M4 19h16M8 15l3-4 3 3 5-7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  target: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>
    </svg>
  ),
  mic: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <rect x="9" y="3" width="6" height="12" rx="3"/>
      <path d="M5 11a7 7 0 0014 0M12 18v3" strokeLinecap="round"/>
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7 5l12 7-12 7V5z"/>
    </svg>
  ),
  plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
    </svg>
  ),
  download: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M12 3v12M6 11l6 6 6-6M5 21h14" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  gamepad: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M6 9h2m-1-1v2M16 10h.01M18 9h.01" strokeLinecap="round"/>
      <rect x="2" y="6" width="20" height="12" rx="5"/>
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  brazil: (p) => <span {...p} style={{fontSize:'14px'}}>🇧🇷</span>,
  sparks: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" strokeLinecap="round"/>
    </svg>
  ),
  zap: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 2L4 14h6l-2 8 10-12h-6l1-8z"/>
    </svg>
  ),
  instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  ),
  x: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18 3h3l-7.5 9L22 21h-6l-5-6.5L5 21H2l8-9.5L2 3h6l4.5 6L18 3z"/>
    </svg>
  ),
  discord: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20 5a17 17 0 00-4-1l-.2.4c1.5.4 2.7 1 3.9 2-2-1-4-1.4-6.2-1.4S9.3 5.4 7.3 6.4c1.2-1 2.4-1.6 3.9-2L11 4a17 17 0 00-4 1C4.2 9 3.5 13 3.8 17c1.6 1.2 3.2 2 4.8 2.4l1-1.4c-.9-.3-1.7-.8-2.5-1.4.2.1.4.3.6.4 2 1 4 1.4 6.2 1.4s4.2-.5 6.2-1.4c.2-.1.4-.3.6-.4-.8.6-1.6 1.1-2.5 1.4l1 1.4c1.6-.4 3.2-1.2 4.8-2.4.3-4-.4-8-3-12zM9 14.5c-1 0-1.8-1-1.8-2.2S8 10 9 10s1.8 1 1.8 2.2-.8 2.3-1.8 2.3zm6 0c-1 0-1.8-1-1.8-2.2S14 10 15 10s1.8 1 1.8 2.2-.8 2.3-1.8 2.3z"/>
    </svg>
  ),
  tiktok: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M16 3h-3v12a3 3 0 11-3-3v-3a6 6 0 106 6V9a7 7 0 004 1V7a4 4 0 01-4-4z"/>
    </svg>
  ),
};

window.Ico = Ico;
