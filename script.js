/* ══════════════════════════════════════
   KIDDIPOD — SHARED SCRIPT
══════════════════════════════════════ */

/* ── STARS ── */
function generateStars() {
  const starsEl = document.getElementById('stars');
  if (!starsEl) return;
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      animation-delay:${(Math.random() * 3).toFixed(2)}s;
      animation-duration:${(Math.random() * 2 + 2).toFixed(2)}s;
    `;
    starsEl.appendChild(s);
  }
}
generateStars();

/* ══════════════════════════════════════
   SESSION STORAGE
══════════════════════════════════════ */
function saveCompanion(name, img, color) {
  sessionStorage.setItem('companion_name',  name);
  sessionStorage.setItem('companion_img',   img);
  sessionStorage.setItem('companion_color', color);
}
function loadCompanion() {
  return {
    name:  sessionStorage.getItem('companion_name'),
    img:   sessionStorage.getItem('companion_img'),
    color: sessionStorage.getItem('companion_color') || '#FFD93D',
  };
}
function saveBook(id) { sessionStorage.setItem('selected_book', id); }
function loadBook()   { return sessionStorage.getItem('selected_book'); }

/* ══════════════════════════════════════
   GUIDE BANNER
══════════════════════════════════════ */
const companionQuotes = {
  'Jimmy Neutron':  "Gotta blast! Let's discover something amazing today!",
  'Dr. Heinz':      "Behold! My Story-Listener-inator is fully activated!",
  'Sandy Cheeks':   "Yeehaw! Ready to learn somethin' real fun today?",
  'Stewie Griffin': "Yes, well. Let's get on with it, shall we? Science awaits.",
};

function renderGuideBanner() {
  const banner = document.getElementById('guideBanner');
  if (!banner) return;
  const c = loadCompanion();
  if (!c.name) return;
  banner.querySelector('.guide-banner-img').src           = c.img;
  banner.querySelector('.guide-banner-img').alt           = c.name;
  banner.querySelector('.guide-banner-name').textContent  = c.name;
  banner.querySelector('.guide-banner-speech').textContent =
    companionQuotes[c.name] || "Let's explore this story together!";
  banner.style.setProperty('--guide-color', c.color);
  banner.classList.add('visible');
}

/* ══════════════════════════════════════
   CHARACTER PAGE
══════════════════════════════════════ */
function selectCompanion(cardEl, name, img, color) {
  document.querySelectorAll('.companion-card').forEach(c => c.classList.remove('selected-active'));
  cardEl.classList.add('selected-active');
  saveCompanion(name, img, color);
  const panel = document.getElementById('popupProceed');
  const btn   = document.getElementById('btnProceedLabel');
  if (panel && btn) {
    btn.textContent      = `Start Adventure with ${name}! 🚀`;
    btn.style.background = color;
    panel.classList.add('visible');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function proceedToShelf() {
  window.location.href = 'innerpage.html';
}

/* ══════════════════════════════════════
   BOOK DATA — 8 books, exactly 2 per character
   Jimmy Neutron  → goodnight, rockets
   Dr. Heinz      → peterpan, littleprince
   Sandy Cheeks   → petethecat, windandsun
   Stewie Griffin → blackhole, cosmicdust
══════════════════════════════════════ */
const characterBooks = {
  'Jimmy Neutron':  ['goodnight', 'rockets'],
  'Dr. Heinz':      ['peterpan', 'littleprince'],
  'Sandy Cheeks':   ['petethecat', 'windandsun'],
  'Stewie Griffin': ['blackhole', 'cosmicdust'],
};

const books = {
  goodnight: {
    image:    'bgImage/goodnightspaceman.jpg',
    series:   'Picture Book',
    title:    'Goodnight Spaceman',
    author:   'by Michelle Robinson',
    duration: '2:09 min listen',
    summary:  'Goodnight Spaceman is a sweet and soothing bedtime story about a little boy who dreams of being an astronaut. As the stars come out and the moon rises, he says goodnight to each planet, rocket, and galaxy — until sleep carries him gently into the cosmos.',
    audio:    'Audio/Goodnight_Spaceman_-_Read_Aloud.mp3',
    badge:    'Bedtime',
    spineColor:  '#64b5f6',
    coverBg:     '#0d2b5e',
    badgeBg:     '#bbdefb',
    badgeColor:  '#0a2040',
    seriesColor: '#64b5f6',
  },
  rockets: {
    image:    'bgImage/rockets.jpg',
    series:   'Amazing Machines',
    title:    'Roaring Rockets',
    author:   'by Tony Mitton',
    duration: '3:55 min listen',
    summary:  'Roaring Rockets takes little ones on a thrilling journey into space! With bouncy, rhyming text and bright illustrations, children discover how rockets are built, how they launch, and what astronauts get up to once they reach the stars.',
    audio:    'Audio/Roaring_Rockets_by_Tony_Mitton.mp3',
    badge:    'Science',
    spineColor:  '#ef9a9a',
    coverBg:     '#3e0000',
    badgeBg:     '#ffcdd2',
    badgeColor:  '#4a0000',
    seriesColor: '#ef9a9a',
  },
  peterpan: {
    image:    'bgImage/peterpan.png',
    series:   'Classic Tale',
    title:    'Peter Pan',
    author:   'by J. M. Barrie',
    duration: '9:54 min listen',
    summary:  'Peter Pan is a classic tale about a mischievous boy who refuses to grow up, living in magical Neverland with fairies, the Lost Boys, and the evil Captain Hook. Peter whisks the Darling children from London to his world of adventures, pirates, and wonder.',
    audio:    'Audio/Peter_Pan_Read_Along_Storybook.mp3',
    badge:    'Classic',
    spineColor:  '#80cbc4',
    coverBg:     '#00251a',
    badgeBg:     '#b2dfdb',
    badgeColor:  '#00251a',
    seriesColor: '#80cbc4',
  },
  littleprince: {
    image:    'bgImage/little prince.jpg',
    series:   'Classic Tale',
    title:    'The Little Prince',
    author:   'by Antoine de Saint-Exupéry',
    duration: '3:35 min listen',
    summary:  'A tiny prince lives alone on a small planet with a proud rose he loves dearly. When he travels the universe, he meets a fox, a snake, and a pilot lost in the desert — and slowly learns that what is truly important is invisible to the eye.',
    audio:    'Audio/The_Little_Prince.mp3',
    badge:    'Classic',
    spineColor:  '#ffb74d',
    coverBg:     '#3e1a00',
    badgeBg:     '#ffe0b2',
    badgeColor:  '#3e1a00',
    seriesColor: '#ffb74d',
  },
  petethecat: {
    image:    'bgImage/petethecat.jpg',
    series:   'Picture Book',
    title:    'Pete the Cat: Out of This World',
    author:   'by James Dean',
    duration: '3:38 min listen',
    summary:  'Pete the Cat blasts off on an out-of-this-world adventure! Dressed in his astronaut suit, Pete zooms past stars, visits friendly aliens, and discovers that the coolest thing in the universe is having fun wherever you go.',
    audio:    'Audio/Pete_the_Cat_Out_of_This_World__Animated_Book__Read_aloud.mp3',
    badge:    'Adventure',
    spineColor:  '#FF6B9D',
    coverBg:     '#1a0030',
    badgeBg:     '#ffd6ec',
    badgeColor:  '#4a0020',
    seriesColor: '#FF6B9D',
  },
  blackhole: {
    image:    'bgImage/blackhole.jpg',
    series:   'Cosmic Story',
    title:    'There Was a Black Hole That Swallowed the Universe',
    author:   'by Christine Baldacchino',
    duration: '4:42 min listen',
    summary:  'A tiny but mighty black hole is hungry — and it starts swallowing everything in the universe, one thing at a time! Stars, planets, rocket ships, even words disappear into it. A delightfully funny and clever tale about something very, very BIG.',
    audio:    'Audio/There_Was_A_BLACK_HOLE_That_Swallowed_The_Universe.mp3',
    badge:    'Funny',
    spineColor:  '#B39DDB',
    coverBg:     '#0d001f',
    badgeBg:     '#e8daff',
    badgeColor:  '#1a0040',
    seriesColor: '#B39DDB',
  },
  windandsun: {
    image:    'bgImage/windandsun.jpg',
    series:   'Fable',
    title:    'The Wind and the Sun',
    author:   'by Aesop',
    duration: '3:21 min listen',
    summary:  'The Wind and the Sun have a friendly argument: who is stronger? They decide to settle it by seeing who can make a traveler remove his coat first. The Wind blows and blows, but the Sun has a warmer idea — and teaches a gentle lesson about kindness.',
    audio:    'Audio/The_Wind_and_the_Sun_-_US_English_accent__TheFableCottage_com_.mp3',
    badge:    'Fable',
    spineColor:  '#FFD93D',
    coverBg:     '#2a1a00',
    badgeBg:     '#fff9c4',
    badgeColor:  '#4a3800',
    seriesColor: '#FFD93D',
  },
  cosmicdust: {
    image:    'bgImage/cosmicdust.jpg',
    series:   'Sci-Fi Tale',
    title:    'The Cosmic Dust Crisis!',
    author:   'by AumSum Science',
    duration: '6:02 min listen',
    summary:  'Planet Zara is running out of stardust — and without it, the stars will go dark forever! A brave little robot named Pip sets off across the galaxy to find the last cosmic dust cloud and save the night sky before bedtime.',
    audio:    'Audio/The_Cosmic_Dust_Crisis_.mp3',
    badge:    'Sci-Fi',
    spineColor:  '#1DD1A1',
    coverBg:     '#001a12',
    badgeBg:     '#b8fff0',
    badgeColor:  '#003322',
    seriesColor: '#1DD1A1',
  },
};

/* ══════════════════════════════════════
   INNER PAGE — render books for companion
══════════════════════════════════════ */
function renderBookShelf() {
  const grid = document.getElementById('booksGrid');
  if (!grid) return;
  const c = loadCompanion();
  const ids = (c.name && characterBooks[c.name]) ? characterBooks[c.name] : Object.keys(books);

  grid.innerHTML = '';

  // Always 2 books per character — centre them nicely
  grid.style.gridTemplateColumns = 'repeat(2, minmax(0, 400px))';
  grid.style.justifyContent = 'center';

  ids.forEach(id => {
    const b = books[id];
    if (!b) return;
    const card = document.createElement('div');
    card.className = 'book-card';
    card.style.cssText = `--spine-color:${b.spineColor};--cover-bg:${b.coverBg};--badge-bg:${b.badgeBg};--badge-color:${b.badgeColor};--series-color:${b.seriesColor};`;
    card.onclick = () => openBook(id);
    card.innerHTML = `
      <span class="genre-badge">${b.badge}</span>
      <div class="book-cover"><img src="${b.image}" alt="${b.title}"></div>
      <div class="book-info">
        <div class="book-series">${b.series}</div>
        <div class="book-title">${b.title}</div>
        <div class="book-author">${b.author}</div>
        <div class="book-desc">"${b.summary.slice(0,90)}…"</div>
      </div>`;
    grid.appendChild(card);
  });
}

function openBook(id) {
  saveBook(id);
  window.location.href = 'story.html';
}

/* ══════════════════════════════════════
   STORY PAGE — populate + audio player
══════════════════════════════════════ */
function populateStory() {
  const id   = loadBook();
  const book = books[id];
  if (!book) return;

  document.getElementById('detailCover').src             = book.image;
  document.getElementById('detailCover').alt             = book.title;
  document.getElementById('detailSeries').textContent    = book.series;
  document.getElementById('detailTitle').textContent     = book.title;
  document.getElementById('detailAuthor').textContent    = book.author;
  document.getElementById('detailSummary').textContent   = book.summary;

  const audio = document.getElementById('storyAudio');
  audio.src = book.audio;
  audio.load();
  document.getElementById('playBtn').textContent = '▶';
  document.getElementById('durationLabel').textContent = book.duration;
}

function toggleAudio() {
  const audio = document.getElementById('storyAudio');
  const btn   = document.getElementById('playBtn');
  if (!audio.src || audio.src === window.location.href) { btn.textContent = '▶'; return; }
  if (audio.paused) { audio.play(); btn.textContent = '⏸'; }
  else              { audio.pause(); btn.textContent = '▶'; }
}

/* ── Scrubber / Progress Bar ── */
function initScrubber() {
  const audio = document.getElementById('storyAudio');
  const track = document.getElementById('progressTrack');
  const fill  = document.getElementById('progressFill');
  const thumb = document.getElementById('progressThumb');
  const curEl = document.getElementById('currentTime');
  const durEl = document.getElementById('totalTime');
  if (!audio || !track) return;

  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2,'0')}`;
  }

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    fill.style.width  = pct + '%';
    thumb.style.left  = pct + '%';
    curEl.textContent = fmtTime(audio.currentTime);
    durEl.textContent = fmtTime(audio.duration);
  });

  audio.addEventListener('loadedmetadata', () => {
    durEl.textContent = fmtTime(audio.duration);
  });

  function seekTo(e) {
    const rect   = track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct    = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    if (audio.duration) audio.currentTime = pct * audio.duration;
  }

  let dragging = false;
  track.addEventListener('mousedown',  e => { dragging = true; seekTo(e); });
  track.addEventListener('touchstart', e => { dragging = true; seekTo(e); }, { passive: true });
  document.addEventListener('mousemove',  e => { if (dragging) seekTo(e); });
  document.addEventListener('touchmove',  e => { if (dragging) seekTo(e); }, { passive: true });
  document.addEventListener('mouseup',    () => { dragging = false; });
  document.addEventListener('touchend',   () => { dragging = false; });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('detailCover')) { populateStory(); initScrubber(); }
  if (document.getElementById('booksGrid'))   renderBookShelf();
  if (document.getElementById('guideBanner')) renderGuideBanner();
  const audioEl = document.getElementById('storyAudio');
  if (audioEl) {
    audioEl.addEventListener('ended', () => {
      document.getElementById('playBtn').textContent = '▶';
    });
  }
});
