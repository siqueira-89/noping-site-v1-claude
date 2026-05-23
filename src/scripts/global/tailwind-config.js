/* ============================================================
   Tailwind CSS — config compartilhado (Play CDN)
   ============================================================
   Estende o tema do Tailwind com os tokens do design system
   ("The Kinetic Pulse" — --np-*). Os utilitários gerados a
   partir dele preservam a semântica dos tokens:

     bg-np-primary       → #93FF18  (neon green)
     text-np-fg-2        → rgba(255,255,255,0.72)
     p-np-md             → 24px (8pt grid)
     rounded-np-pill     → 9999px
     shadow-np-glow-lg   → 0 0 32px rgba(147,255,24,0.55)
     font-np-mono        → JetBrains Mono
     font-np-display     → Bai Jamjuree

   Preflight é desativado porque o projeto já carrega seu
   próprio reset (src/styles/global/reset.css). Isso evita
   conflitos com tipografia, listas e bordas existentes.
   ============================================================ */

window.tailwind = window.tailwind || {};
tailwind.config = {
  corePlugins: {
    preflight: false,
    /* O projeto já tem .container próprio em src/styles/global/layout.css
       (max-width 1360px + padding 32px). O .container do Tailwind tem
       max-width responsivo por breakpoint, o que conflita visualmente. */
    container: false,
  },
  theme: {
    extend: {
      colors: {
        'np-primary': {
          DEFAULT: '#93FF18',
          dim: '#6BBD10',
          soft: 'rgba(147, 255, 24, 0.10)',
          glow: 'rgba(147, 255, 24, 0.55)',
        },
        'np-claro': '#DA291C',
        'np-bg': {
          DEFAULT: '#000000',
          2: '#05070A',
          3: '#0a0c0e',
        },
        'np-surface': {
          DEFAULT: '#1D2028',
          elev: '#12141A',
        },
        'np-fg': {
          1: '#FFFFFF',
          2: 'rgba(255, 255, 255, 0.72)',
          3: 'rgba(255, 255, 255, 0.52)',
          4: 'rgba(255, 255, 255, 0.34)',
          dim: 'rgba(244, 246, 247, 0.72)',
          mute: 'rgba(244, 246, 247, 0.52)',
          faint: 'rgba(244, 246, 247, 0.34)',
        },
        'np-border': {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          strong: 'rgba(255, 255, 255, 0.15)',
          hover: 'rgba(255, 255, 255, 0.40)',
        },
        'np-cyan': '#2ECDFF',
        'np-purple': '#8A5BFF',
        'np-warning': '#FFB218',
        'np-danger': '#FF7A1A',
        'np-good': '#1AE5A0',
      },
      fontFamily: {
        'np-display': ['"Bai Jamjuree"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'np-body':    ['"Bai Jamjuree"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'np-mono':    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      /* Spacing token compartilhado entre padding/margin/gap/width/height */
      spacing: {
        'np-xs':  '8px',
        'np-sm':  '16px',
        'np-md':  '24px',
        'np-lg':  '40px',
        'np-xl':  '64px',
        'np-2xl': '96px',
        'np-3xl': '128px',
        'header': '72px',
      },
      maxWidth: {
        'np-container': '1280px',
      },
      borderRadius: {
        'np-sm':   '8px',
        'np-md':   '12px',
        'np-lg':   '16px',
        'np-xl':   '24px',
        'np-pill': '9999px',
      },
      boxShadow: {
        'np-card':    '0 2px 12px rgba(0, 0, 0, 0.40)',
        'np-elev':    '0 20px 40px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
        'np-glow-sm': '0 0 8px  rgba(147, 255, 24, 0.55)',
        'np-glow-md': '0 0 16px rgba(147, 255, 24, 0.55)',
        'np-glow-lg': '0 0 32px rgba(147, 255, 24, 0.55)',
      },
      letterSpacing: {
        'np-tight': '-0.02em',
        'np-wide':   '0.04em',
        'np-wider':  '0.10em',
        'np-mega':   '0.20em',
      },
      lineHeight: {
        'np-tight':  '1.1',
        'np-snug':   '1.3',
        'np-normal': '1.5',
        'np-loose':  '1.7',
      },
      transitionTimingFunction: {
        'np-ease': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        'np-fast': '120ms',
        'np-base': '250ms',
        'np-slow': '400ms',
      },
      backdropBlur: {
        'np-glass': '16px',
      },
    },
  },
};
