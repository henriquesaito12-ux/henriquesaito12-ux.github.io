// ============================
// Custom Cursor
// ============================

const cursor = document.getElementById('cursor');

if (cursor) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    const w = cursor.offsetWidth / 2;
    cursor.style.left = (cursorX - w) + 'px';
    cursor.style.top = (cursorY - w) + 'px';
    requestAnimationFrame(updateCursor);
  }

  requestAnimationFrame(updateCursor);

  const hoverTargets = document.querySelectorAll('a, button, .folder, input');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Dark section detection
  const darkSections = document.querySelectorAll('.dark-section');
  darkSections.forEach((section) => {
    section.addEventListener('mouseenter', () => cursor.classList.add('light'));
    section.addEventListener('mouseleave', () => cursor.classList.remove('light'));
  });

  // Dock hover — liquid glass cursor
  const dock = document.querySelector('.dock');
  if (dock) {
    dock.addEventListener('mouseenter', () => {
      cursor.classList.remove('hover');
      cursor.classList.add('dock-hover');
    });
    dock.addEventListener('mouseleave', () => {
      cursor.classList.remove('dock-hover');
    });
  }
}

// ============================
// Fade-in on scroll
// ============================

const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

function assignStaggerDelays() {
  const parents = new Set();
  fadeElements.forEach((el) => parents.add(el.parentElement));
  parents.forEach((parent) => {
    const children = parent.querySelectorAll(':scope > .fade-in');
    children.forEach((child, i) => {
      child.dataset.delay = i * 120;
    });
  });
}

assignStaggerDelays();
fadeElements.forEach((el) => observer.observe(el));

// ============================
// Dock — active section tracking
// ============================

const dockItems = document.querySelectorAll('.dock__item[data-section]');
const allSections = document.querySelectorAll('section[id], div[id]');

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scroll = window.scrollY;
      let current = '';

      allSections.forEach((section) => {
        const top = section.offsetTop - 200;
        if (scroll >= top) {
          current = section.getAttribute('id');
        }
      });

      dockItems.forEach((item) => {
        item.classList.remove('active');
        if (item.dataset.section === current) {
          item.classList.add('active');
        }
      });

      ticking = false;
    });
    ticking = true;
  }
});

// ============================
// Smooth scroll for dock links
// ============================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const targetY = target.getBoundingClientRect().top + window.scrollY - 20;
      const startY = window.scrollY;
      const diff = targetY - startY;
      let start;

      function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / 800, 1);
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, startY + diff * ease);
        if (elapsed < 800) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }
  });
});

// ============================
// Password Modal (Home page cards)
// ============================

const modal = document.getElementById('passwordModal');
const modalForm = document.getElementById('passwordModalForm');
const modalInput = document.getElementById('passwordModalInput');
const modalError = document.getElementById('passwordModalError');
const modalClose = document.getElementById('passwordClose');
const modalBackdrop = document.getElementById('passwordBackdrop');

const PROJECT_PASSWORD = 'saito2026';
let pendingHref = null;
let pendingProject = null;

function openModal(href, projectId) {
  if (sessionStorage.getItem('unlocked_' + projectId) === 'true') {
    window.location.href = href;
    return;
  }

  pendingHref = href;
  pendingProject = projectId;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  modalInput.value = '';
  modalError.textContent = '';
  modalInput.classList.remove('error');

  setTimeout(() => modalInput.focus(), 100);
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  pendingHref = null;
  pendingProject = null;
}

if (modal && modalForm) {
  document.querySelectorAll('.folder__overlay-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const folder = btn.closest('.folder');
      openModal(folder.dataset.href, folder.dataset.project);
    });
  });

  document.querySelectorAll('.folder').forEach((folder) => {
    folder.addEventListener('click', () => {
      openModal(folder.dataset.href, folder.dataset.project);
    });
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = modalInput.value.trim();

    if (value === PROJECT_PASSWORD) {
      sessionStorage.setItem('unlocked_' + pendingProject, 'true');
      window.location.href = pendingHref;
    } else {
      modalInput.classList.add('error');
      modalError.textContent = 'Senha incorreta. Tente novamente.';
      setTimeout(() => modalInput.classList.remove('error'), 500);
    }
  });

  modalInput.addEventListener('input', () => {
    modalError.textContent = '';
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// ============================
// Password Gate (Project pages)
// ============================

const gate = document.getElementById('passwordGate');
const gateForm = document.getElementById('passwordForm');
const gateInput = document.getElementById('passwordInput');
const gateError = document.getElementById('passwordError');

if (gate && gateForm) {
  const projectId = gate.dataset.project;
  const projectPassword = gate.dataset.password;

  if (sessionStorage.getItem('unlocked_' + projectId) === 'true') {
    gate.classList.add('unlocked');
  }

  gateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = gateInput.value.trim();

    if (value === projectPassword) {
      sessionStorage.setItem('unlocked_' + projectId, 'true');
      gate.classList.add('unlocked');
    } else {
      gateInput.classList.add('error');
      gateError.textContent = 'Senha incorreta. Tente novamente.';
      setTimeout(() => gateInput.classList.remove('error'), 500);
    }
  });

  gateInput.addEventListener('input', () => {
    gateError.textContent = '';
  });
}

// ============================
// Language Toggle + Translation
// ============================

let currentLang = 'pt';

const wordsPt = ['processo', 'impacto real', 'pessoas', 'clareza'];
const wordsEn = ['process', 'real impact', 'people', 'clarity'];

let isTransitioning = false;

function applyLanguage(lang) {
  if (isTransitioning) return;
  isTransitioning = true;
  currentLang = lang;

  const elements = document.querySelectorAll('[data-pt][data-en]');
  const placeholders = document.querySelectorAll('[data-pt-placeholder][data-en-placeholder]');

  // Swap text at the halfway point (150ms) of the 300ms flip
  setTimeout(() => {
    elements.forEach((el) => {
      el.innerHTML = el.dataset[lang];
    });
    placeholders.forEach((el) => {
      el.placeholder = el.dataset[lang + 'Placeholder'];
    });
  }, 150);

  // Add flip class to all elements simultaneously
  elements.forEach((el) => {
    el.style.perspective = '600px';
    el.classList.add('lang-flip');
  });

  // Cleanup after animation
  setTimeout(() => {
    elements.forEach((el) => {
      el.classList.remove('lang-flip');
      el.style.perspective = '';
    });
    isTransitioning = false;
  }, 300);

  // Update toggle visual immediately
  const opts = document.querySelectorAll('.header__lang-opt');
  opts.forEach((opt) => {
    if (opt.dataset.lang === lang) {
      opt.classList.add('header__lang-opt--active');
    } else {
      opt.classList.remove('header__lang-opt--active');
    }
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

const langToggle = document.getElementById('langToggle');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    applyLanguage(newLang);
  });
}

// ============================
// Typewriter Effect
// ============================

const typewriterEl = document.getElementById('typewriter');

if (typewriterEl) {
  const TYPING_SPEED = 80;
  const ERASE_SPEED = 40;
  const PAUSE = 2000;
  let wordIndex = 0;

  function getWords() {
    return currentLang === 'en' ? wordsEn : wordsPt;
  }

  function typeWord(word, callback) {
    let i = 0;
    function tick() {
      typewriterEl.textContent = word.slice(0, i + 1);
      i++;
      if (i < word.length) {
        setTimeout(tick, TYPING_SPEED);
      } else {
        setTimeout(callback, PAUSE);
      }
    }
    tick();
  }

  function eraseWord(callback) {
    let text = typewriterEl.textContent;
    function tick() {
      text = text.slice(0, -1);
      typewriterEl.textContent = text;
      if (text.length > 0) {
        setTimeout(tick, ERASE_SPEED);
      } else {
        setTimeout(callback, 300);
      }
    }
    tick();
  }

  function loop() {
    const words = getWords();
    typeWord(words[wordIndex], function () {
      eraseWord(function () {
        wordIndex = (wordIndex + 1) % words.length;
        loop();
      });
    });
  }

  loop();
}

// ============================
// Logo + Home scroll to top
// ============================

const logoLink = document.getElementById('logoLink');
const dockHome = document.getElementById('dockHome');

function scrollToTop(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (logoLink) logoLink.addEventListener('click', scrollToTop);
if (dockHome) dockHome.addEventListener('click', scrollToTop);

// ============================
// Sobre — Profissional / Pessoal toggle
// ============================

(function () {
  var toggle = document.getElementById('sobreToggle');
  var textPro = document.getElementById('sobreTextPro');
  var textPer = document.getElementById('sobreTextPer');
  var photoPro = document.getElementById('sobrePhotoPro');
  var photoPes = document.getElementById('sobrePhotoPes');
  if (!toggle || !textPro || !textPer || !photoPro || !photoPes) return;

  var btns = toggle.querySelectorAll('.sobre__toggle-btn');
  var sobreSection = document.getElementById('sobre');
  var sobreTitle = sobreSection ? sobreSection.querySelector('.section__title') : null;
  var currentMode = 'profissional';
  var animating = false;

  function swap() {
    var newMode = currentMode === 'profissional' ? 'pessoal' : 'profissional';
    currentMode = newMode;

    btns.forEach(function (b) {
      b.classList.toggle('sobre__toggle-btn--active', b.dataset.mode === newMode);
    });

    var hiding = newMode === 'pessoal' ? textPro : textPer;
    var showing = newMode === 'pessoal' ? textPer : textPro;

    hiding.classList.remove('sobre__text-state--active');
    hiding.style.display = 'none';

    showing.style.display = 'block';
    showing.classList.add('sobre__text-state--active');

    if (newMode === 'pessoal') {
      photoPro.classList.add('swapped');
      photoPes.classList.add('swapped');
    } else {
      photoPro.classList.remove('swapped');
      photoPes.classList.remove('swapped');
    }
  }

  btns.forEach(function (btn) { btn.addEventListener('click', swap); });
  photoPro.addEventListener('click', swap);
  photoPes.addEventListener('click', swap);
})();

// ============================
// Ilustrações — Auto-scroll carousel
// ============================

(function () {
  var carousel = document.querySelector('.ilustracoes__grid');
  var dotsContainer = document.getElementById('iluDots');
  if (!carousel || !dotsContainer) return;

  var items = carousel.querySelectorAll('.ilustracoes__item');
  var count = items.length;
  if (!count) return;

  var current = 0;
  var paused = false;
  var timer = null;

  // Create dots
  for (var i = 0; i < count; i++) {
    var dot = document.createElement('button');
    dot.className = 'ilustracoes__dot' + (i === 0 ? ' ilustracoes__dot--active' : '');
    dot.type = 'button';
    dot.dataset.index = i;
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.index));
      resetTimer();
    });
    dotsContainer.appendChild(dot);
  }

  var dots = dotsContainer.querySelectorAll('.ilustracoes__dot');

  function goTo(index) {
    current = index;
    var itemLeft = items[current].offsetLeft - carousel.offsetLeft;
    carousel.scrollTo({ left: itemLeft, behavior: 'smooth' });
    dots.forEach(function (d, i) {
      d.classList.toggle('ilustracoes__dot--active', i === current);
    });
  }

  function next() {
    goTo((current + 1) % count);
  }

  function startTimer() {
    timer = setInterval(function () {
      if (!paused) next();
    }, 3000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  carousel.addEventListener('mouseenter', function () { paused = true; });
  carousel.addEventListener('mouseleave', function () { paused = false; });

  startTimer();
})();

// ============================
// Ilustração Modal + Zoom + Drag
// ============================

(function () {
  var modal = document.getElementById('iluModal');
  var backdrop = document.getElementById('iluBackdrop');
  var closeBtn = document.getElementById('iluClose');
  var img = document.getElementById('iluImg');
  var zoomIn = document.getElementById('iluZoomIn');
  var zoomOut = document.getElementById('iluZoomOut');
  var resetBtn = document.getElementById('iluReset');
  if (!modal || !img) return;

  var scale = 1;
  var dragX = 0, dragY = 0;
  var startX = 0, startY = 0;
  var isDragging = false;

  function updateTransform() {
    img.style.transform = 'scale(' + scale + ') translate(' + dragX + 'px, ' + dragY + 'px)';
  }

  function openModal(src, alt) {
    scale = 1;
    dragX = 0;
    dragY = 0;
    img.src = src;
    img.alt = alt || '';
    updateTransform();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.ilustracoes__item').forEach(function (item) {
    item.addEventListener('click', function () {
      var image = item.querySelector('.ilustracoes__img');
      if (image) openModal(image.src, image.alt);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  zoomIn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (scale < 3) { scale = Math.min(scale + 0.5, 3); updateTransform(); }
  });

  zoomOut.addEventListener('click', function (e) {
    e.stopPropagation();
    if (scale > 1) { scale = Math.max(scale - 0.5, 1); updateTransform(); }
    if (scale === 1) { dragX = 0; dragY = 0; updateTransform(); }
  });

  resetBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    scale = 1; dragX = 0; dragY = 0; updateTransform();
  });

  img.addEventListener('mousedown', function (e) {
    if (scale <= 1) return;
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - dragX;
    startY = e.clientY - dragY;
    img.classList.add('dragging');
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    dragX = e.clientX - startX;
    dragY = e.clientY - startY;
    updateTransform();
  });

  document.addEventListener('mouseup', function () {
    if (isDragging) {
      isDragging = false;
      img.classList.remove('dragging');
    }
  });
})();

// ============================
// Organic "ghost cursor" nudge animation
// ============================

(function () {
  var items = document.querySelectorAll('.skill-item, .stack-item');
  if (!items.length) return;

  var active = [];

  function nudge() {
    // Pick 2-3 random elements
    var count = 2 + Math.floor(Math.random() * 2);
    var indices = [];
    while (indices.length < count && indices.length < items.length) {
      var idx = Math.floor(Math.random() * items.length);
      if (indices.indexOf(idx) === -1) indices.push(idx);
    }

    indices.forEach(function (i) {
      var el = items[i];
      // Skip if already being nudged
      if (active.indexOf(i) !== -1) return;
      active.push(i);

      // Random direction and distance (10-20px)
      var angle = Math.random() * Math.PI * 2;
      var dist = 10 + Math.random() * 10;
      var tx = Math.cos(angle) * dist;
      var ty = Math.sin(angle) * dist;

      el.style.transition = 'transform 0.6s ease-out';
      el.style.transform = 'translate(' + tx.toFixed(1) + 'px, ' + ty.toFixed(1) + 'px)';

      // Return to original position
      setTimeout(function () {
        el.style.transition = 'transform 0.8s ease-in-out';
        el.style.transform = '';
      }, 1200);

      // Cleanup
      setTimeout(function () {
        el.style.transition = '';
        var pos = active.indexOf(i);
        if (pos !== -1) active.splice(pos, 1);
      }, 2000);
    });
  }

  setInterval(nudge, 3000);
})();
