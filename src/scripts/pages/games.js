/* ============================================================
   /games — page script
   - Hero card-deck (5-card 3D stack rotation)
   - Search + filter dropdowns (sort, genre)
   ============================================================ */

(function () {
  'use strict';

  // ---------- Card Deck ----------

  function initDeck() {
    const stack = document.getElementById('deck-stack');
    if (!stack) return;
    const cards = Array.from(stack.querySelectorAll('.gcard'));
    const dots  = Array.from(document.querySelectorAll('.deck-idx-strip .dot'));

    function activeIndex() {
      const a = cards.findIndex(c => c.classList.contains('s3'));
      return a < 0 ? 0 : a;
    }

    function syncDots() {
      const idx = activeIndex();
      dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    }

    function rotate(direction) {
      const classes = cards.map(c => (c.className.match(/s[1-5]/) || ['s3'])[0]);
      // 'next' (right arrow) → activeIndex moves RIGHT (+1)
      // 'prev' (left  arrow) → activeIndex moves LEFT  (-1)
      if (direction === 'next') classes.unshift(classes.pop());
      else                       classes.push(classes.shift());
      cards.forEach((c, i) => { c.className = c.className.replace(/s[1-5]/, classes[i]); });
      syncDots();
    }

    const prev = document.getElementById('deck-prev');
    const next = document.getElementById('deck-next');
    if (prev) prev.addEventListener('click', () => { rotate('prev'); restartAuto(); });
    if (next) next.addEventListener('click', () => { rotate('next'); restartAuto(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-i'), 10);
        let current = activeIndex();
        if (target === current) return;
        let diff = target - current;
        if (diff >  2) diff -= 5;
        if (diff < -2) diff += 5;
        const steps = Math.abs(diff);
        // diff > 0 means target is to the right of current → rotate 'next'
        const dir   = diff > 0 ? 'next' : 'prev';
        for (let i = 0; i < steps; i++) rotate(dir);
        restartAuto();
      });
    });

    // Autoplay loop — advances every 5s. Pauses while the user hovers
    // the deck (or any control), resumes on mouseleave.
    let autoTimer = null;
    function startAuto() { stopAuto(); autoTimer = setInterval(() => rotate('next'), 5000); }
    function stopAuto()  { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function restartAuto() { startAuto(); }

    const deckStage = stack.closest('.deck-stage') || stack.parentElement;
    if (deckStage) {
      deckStage.addEventListener('mouseenter', stopAuto);
      deckStage.addEventListener('mouseleave', startAuto);
    }
    startAuto();

    syncDots();
  }

  // ---------- Filter dropdowns ----------

  function initFilters() {
    const sortBtn      = document.getElementById('sort-btn');
    const genreBtn     = document.getElementById('genre-btn');
    const sortDropdown = document.getElementById('sort-dropdown');
    const genreDropdown= document.getElementById('genre-dropdown');
    if (!sortBtn || !genreBtn) return;

    function closeAll() {
      document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('open'));
    }
    function toggle(dropdown) {
      const open = dropdown.classList.contains('open');
      closeAll();
      if (!open) dropdown.classList.add('open');
    }

    sortBtn.addEventListener('click', e => { e.stopPropagation(); toggle(sortDropdown); });
    genreBtn.addEventListener('click', e => { e.stopPropagation(); toggle(genreDropdown); });
    document.addEventListener('click', closeAll);

    [sortDropdown, genreDropdown].forEach(dd => {
      if (!dd) return;
      dd.querySelectorAll('.opt').forEach(opt => {
        opt.addEventListener('click', e => {
          e.stopPropagation();
          dd.querySelectorAll('.opt').forEach(o => o.classList.remove('sel'));
          opt.classList.add('sel');
          const labelId = dd.id === 'sort-dropdown' ? 'sort-label' : 'genre-label';
          const labelEl = document.getElementById(labelId);
          if (labelEl) labelEl.textContent = opt.textContent;
          dd.classList.remove('open');
        });
      });
    });
  }

  function boot() {
    initDeck();
    initFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
