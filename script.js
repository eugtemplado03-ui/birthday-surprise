/**
 * BIRTHDAY SURPRISE - COMPLETE INTERACTIVE SCRIPT
 * Features: Ultra-responsive Evasive 'No' button (Touch & Mouse Proximity),
 * Mobile Touch Swipe Gallery, Happy Birthday Song Web Audio Synth,
 * Floating Pink Rose & Lily Petals Canvas, 3D Cake & Candle Blowout,
 * Polaroid Photo Gallery, Wax-Sealed Letter, and Customizer.
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DEFAULT DATA & STATE
  // ==========================================
  const defaultData = {
    recipientName: 'Sweetheart',
    senderSignature: 'Forever Yours, with all my love ❤️',
    letterDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    letterBody: `Happy Birthday to the one who makes my everyday bloom like fresh lilies and roses! 🌸✨

From every laugh we've shared to all our little sweet moments, having you in my life is the greatest gift in the universe. Today is all about celebrating you, your kindness, your radiant smile, and the warmth you bring into my world.

May this new year of your life be blessed with endless happiness, blooming love, good health, and all the dreams your heart desires!

I hope this little surprise brings the biggest smile to your beautiful face! 🎂🌸🎉`,
    photos: [
      {
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ff9a9e"/><stop offset="99%" stop-color="%23fecfef"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g1)"/><circle cx="200" cy="180" r="75" fill="%23ffffff" opacity="0.9"/><text x="200" y="195" font-size="65" text-anchor="middle">🌸</text><text x="200" y="310" font-size="22" text-anchor="middle" fill="%23d63384" font-weight="bold" font-family="sans-serif">Sweetest Smile</text></svg>',
        caption: 'Sweetest Smile in the World 🌸'
      },
      {
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ffd1dc"/><stop offset="100%" stop-color="%23ffb3c6"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g2)"/><circle cx="200" cy="180" r="75" fill="%23ffffff" opacity="0.9"/><text x="200" y="195" font-size="65" text-anchor="middle">🌹</text><text x="200" y="310" font-size="22" text-anchor="middle" fill="%23c2185b" font-weight="bold" font-family="sans-serif">Precious Moments</text></svg>',
        caption: 'Precious Moments with You 🌹'
      },
      {
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ffe4e8"/><stop offset="100%" stop-color="%23ffccd5"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g3)"/><circle cx="200" cy="180" r="75" fill="%23ffffff" opacity="0.9"/><text x="200" y="195" font-size="65" text-anchor="middle">🌺</text><text x="200" y="310" font-size="22" text-anchor="middle" fill="%23ad1457" font-weight="bold" font-family="sans-serif">Pink Lily Dreams</text></svg>',
        caption: 'Cozy Talks & Beautiful Sunset 🌺'
      },
      {
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23fbc2eb"/><stop offset="100%" stop-color="%23ff8da1"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g4)"/><circle cx="200" cy="180" r="75" fill="%23ffffff" opacity="0.9"/><text x="200" y="195" font-size="65" text-anchor="middle">💖</text><text x="200" y="310" font-size="22" text-anchor="middle" fill="%23880e4f" font-weight="bold" font-family="sans-serif">Always & Forever</text></svg>',
        caption: 'Making Magical Memories Forever 💖'
      }
    ]
  };

  // Load from LocalStorage or Default
  let appData = JSON.parse(localStorage.getItem('birthday_surprise_data')) || defaultData;
  let dodgeCount = 0;
  let activePhotoIndex = 0;
  let isCandleBlown = false;
  let isLetterOpen = false;
  let isMusicPlaying = false;

  const wittyPhrases = [
    "Nice try! You can't say no! 😜",
    "Are you sure? Look at that glowing YES! 🥰",
    "Nope, this button runs on pink jet fuel! 🌸💨",
    "Error 404: 'No' option not found! 💖",
    "Nice reflexes, but love is faster! 🌹✨",
    "The only valid answer is YES! ✨",
    "Look how big the YES button is getting! 💖",
    "Resistance is futile, say YES! 🌺",
    "You can't resist! Just click Yes already! 😂",
    "Forever and always YES! 💘"
  ];

  // ==========================================
  // 2. DOM ELEMENTS SELECTION
  // ==========================================
  const stageIntro = document.getElementById('stage-intro');
  const stageCelebration = document.getElementById('stage-celebration');
  
  const displayRecipientName = document.getElementById('display-recipient-name');
  const heroRecipientName = document.getElementById('hero-recipient-name');
  
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const wittyPopup = document.getElementById('witty-popup');
  const wittyText = document.getElementById('witty-text');
  const evadeCounter = document.getElementById('evade-counter');
  const dodgeCountSpan = document.getElementById('dodge-count');
  
  const btnMusic = document.getElementById('btn-music');
  const musicStatus = document.getElementById('music-status');
  const btnConfetti = document.getElementById('btn-confetti');
  const btnCustomize = document.getElementById('btn-customize');
  const btnRestart = document.getElementById('btn-restart');
  
  const interactiveCake = document.getElementById('interactive-cake');
  const mainCandle = document.getElementById('main-candle');
  const btnBlowCandle = document.getElementById('btn-blow-candle');
  const btnBlowText = document.getElementById('btn-blow-text');
  const wishBanner = document.getElementById('wish-banner');
  const wishText = document.getElementById('wish-text');
  
  const polaroidStack = document.getElementById('polaroid-stack');
  const photoDots = document.getElementById('photo-dots');
  const btnPrevPhoto = document.getElementById('btn-prev-photo');
  const btnNextPhoto = document.getElementById('btn-next-photo');
  const btnAddPhotos = document.getElementById('btn-add-photos');
  
  const envelopeTrigger = document.getElementById('envelope-trigger');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const letterUnfolded = document.getElementById('letter-unfolded');
  const letterDisplayDate = document.getElementById('letter-display-date');
  const letterDisplaySalutation = document.getElementById('letter-display-salutation');
  const letterDisplayBody = document.getElementById('letter-display-body');
  const letterDisplaySignature = document.getElementById('letter-display-signature');
  const btnEditLetter = document.getElementById('btn-edit-letter');
  const btnFoldLetter = document.getElementById('btn-fold-letter');
  
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  
  const customizerModal = document.getElementById('customizer-modal');
  const btnCloseCustomizer = document.getElementById('btn-close-customizer');
  const inputRecipientName = document.getElementById('input-recipient-name');
  const inputSenderSignature = document.getElementById('input-sender-signature');
  const inputLetterBody = document.getElementById('input-letter-body');
  const inputPhotoUpload = document.getElementById('input-photo-upload');
  const uploadPreviews = document.getElementById('upload-previews');
  const btnSaveCustomizer = document.getElementById('btn-save-customizer');
  const btnResetDefaults = document.getElementById('btn-reset-defaults');

  // ==========================================
  // 3. HAPPY BIRTHDAY SONG - WEB AUDIO SYNTH
  // ==========================================
  let audioCtx = null;
  let songTimeoutIds = [];
  let songLoopTimeout = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playMusicBoxNote(freq, duration = 0.5, gainVal = 0.15) {
    if (!audioCtx || !freq) return;
    try {
      const now = audioCtx.currentTime;
      
      const osc1 = audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = audioCtx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      const gain1 = audioCtx.createGain();
      gain1.gain.setValueAtTime(gainVal, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const gain2 = audioCtx.createGain();
      gain2.gain.setValueAtTime(gainVal * 0.35, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(audioCtx.destination);
      gain2.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  function playChord(notes, duration = 0.8, gainVal = 0.08) {
    notes.forEach(f => playMusicBoxNote(f, duration, gainVal));
  }

  function playDodgeSound() {
    initAudioContext();
    if (!audioCtx) return;
    playMusicBoxNote(440 + Math.random() * 260, 0.12, 0.1);
  }

  function playCelebrationFanfare() {
    initAudioContext();
    if (!audioCtx) return;
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
      setTimeout(() => playMusicBoxNote(freq, 0.4, 0.2), i * 100);
    });
  }

  function playBlowoutSound() {
    initAudioContext();
    if (!audioCtx) return;
    try {
      const bufferSize = audioCtx.sampleRate * 0.4;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);
      filter.frequency.linearRampToValueAtTime(200, audioCtx.currentTime + 0.4);
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      whiteNoise.start();

      setTimeout(() => {
        [659.25, 783.99, 987.77, 1318.51, 1567.98].forEach((freq, idx) => {
          setTimeout(() => playMusicBoxNote(freq, 0.6, 0.18), idx * 80);
        });
      }, 300);
    } catch (e) {}
  }

  const happyBirthdaySong = [
    { note: 392.00, duration: 0.35, delay: 0 },
    { note: 392.00, duration: 0.25, delay: 350 },
    { note: 440.00, duration: 0.55, delay: 600, chord: [261.63, 329.63] },
    { note: 392.00, duration: 0.55, delay: 1200 },
    { note: 523.25, duration: 0.55, delay: 1800, chord: [196.00, 246.94] },
    { note: 493.88, duration: 1.1,  delay: 2400 },

    { note: 392.00, duration: 0.35, delay: 3700 },
    { note: 392.00, duration: 0.25, delay: 4050 },
    { note: 440.00, duration: 0.55, delay: 4300, chord: [196.00, 293.66] },
    { note: 392.00, duration: 0.55, delay: 4900 },
    { note: 587.33, duration: 0.55, delay: 5500, chord: [261.63, 329.63] },
    { note: 523.25, duration: 1.1,  delay: 6100 },

    { note: 392.00, duration: 0.35, delay: 7400 },
    { note: 392.00, duration: 0.25, delay: 7750 },
    { note: 783.99, duration: 0.55, delay: 8000, chord: [261.63, 392.00] },
    { note: 659.25, duration: 0.55, delay: 8600 },
    { note: 523.25, duration: 0.55, delay: 9200, chord: [174.61, 220.00] },
    { note: 493.88, duration: 0.55, delay: 9800 },
    { note: 440.00, duration: 1.1,  delay: 10400 },

    { note: 698.46, duration: 0.35, delay: 11700 },
    { note: 698.46, duration: 0.25, delay: 12050 },
    { note: 659.25, duration: 0.55, delay: 12300, chord: [261.63, 329.63] },
    { note: 523.25, duration: 0.55, delay: 12900 },
    { note: 587.33, duration: 0.55, delay: 13500, chord: [196.00, 246.94] },
    { note: 523.25, duration: 1.6,  delay: 14100, chord: [261.63, 329.63, 392.00] }
  ];

  const totalSongDuration = 16200;

  function playHappyBirthdaySong() {
    if (!audioCtx) initAudioContext();
    if (!audioCtx) return;

    isMusicPlaying = true;
    musicStatus.textContent = 'Happy Birthday 🎵';
    btnMusic.style.color = '#ff2d75';

    stopHappyBirthdaySong(false);

    happyBirthdaySong.forEach(step => {
      const tId = setTimeout(() => {
        if (!isMusicPlaying) return;
        playMusicBoxNote(step.note, step.duration, 0.18);
        if (step.chord) playChord(step.chord, step.duration * 1.5, 0.08);
      }, step.delay);
      songTimeoutIds.push(tId);
    });

    songLoopTimeout = setTimeout(() => {
      if (isMusicPlaying) playHappyBirthdaySong();
    }, totalSongDuration);
  }

  function stopHappyBirthdaySong(updateState = true) {
    songTimeoutIds.forEach(id => clearTimeout(id));
    songTimeoutIds = [];
    if (songLoopTimeout) {
      clearTimeout(songLoopTimeout);
      songLoopTimeout = null;
    }
    if (updateState) {
      isMusicPlaying = false;
      musicStatus.textContent = 'Off';
      btnMusic.style.color = '#ff2d75';
    }
  }

  btnMusic.addEventListener('click', () => {
    initAudioContext();
    if (isMusicPlaying) stopHappyBirthdaySong(true);
    else playHappyBirthdaySong();
  });

  // ==========================================
  // 4. FLOATING PINK ROSE & LILY PETALS CANVAS
  // ==========================================
  const ambientCanvas = document.getElementById('ambient-canvas');
  const ambientCtx = ambientCanvas.getContext('2d');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confettiCtx = confettiCanvas.getContext('2d');

  let floralParticles = [];
  let confettiParticles = [];

  function resizeCanvases() {
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  class FloralPetal {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * ambientCanvas.width;
      this.y = initial ? Math.random() * ambientCanvas.height : -30;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 1.1 + 0.5;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.opacity = Math.random() * 0.4 + 0.55;
      
      const rand = Math.random();
      if (rand < 0.45) this.type = 'rose-petal';
      else if (rand < 0.8) this.type = 'lily-petal';
      else if (rand < 0.92) this.type = 'lily-bloom';
      else this.type = 'sparkle';
    }
    update() {
      this.y += this.speedY;
      this.swayAngle += this.swaySpeed;
      this.x += Math.sin(this.swayAngle) * 1.1 + this.speedX;
      this.rotation += this.rotationSpeed;
      if (this.y > ambientCanvas.height + 40 || this.x < -40 || this.x > ambientCanvas.width + 40) {
        this.reset(false);
      }
    }
    draw() {
      ambientCtx.save();
      ambientCtx.translate(this.x, this.y);
      ambientCtx.rotate(this.rotation);
      ambientCtx.globalAlpha = this.opacity;

      if (this.type === 'rose-petal') {
        const grad = ambientCtx.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, '#ff4d79');
        grad.addColorStop(0.5, '#ff809f');
        grad.addColorStop(1, '#ffc2d4');
        ambientCtx.fillStyle = grad;
        ambientCtx.beginPath();
        ambientCtx.moveTo(0, -this.size);
        ambientCtx.bezierCurveTo(this.size * 0.9, -this.size * 0.5, this.size * 0.8, this.size * 0.7, 0, this.size);
        ambientCtx.bezierCurveTo(-this.size * 0.8, this.size * 0.7, -this.size * 0.9, -this.size * 0.5, 0, -this.size);
        ambientCtx.fill();
      } else if (this.type === 'lily-petal') {
        const grad = ambientCtx.createLinearGradient(0, -this.size * 1.3, 0, this.size * 1.3);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.2, '#ffa3c3');
        grad.addColorStop(0.8, '#ff3377');
        grad.addColorStop(1, '#d81458');
        ambientCtx.fillStyle = grad;
        ambientCtx.beginPath();
        ambientCtx.moveTo(0, -this.size * 1.3);
        ambientCtx.bezierCurveTo(this.size * 0.5, -this.size * 0.4, this.size * 0.4, this.size * 0.8, 0, this.size * 1.3);
        ambientCtx.bezierCurveTo(-this.size * 0.4, this.size * 0.8, -this.size * 0.5, -this.size * 0.4, 0, -this.size * 1.3);
        ambientCtx.fill();
      } else if (this.type === 'lily-bloom') {
        const pSize = this.size * 0.6;
        for (let i = 0; i < 6; i++) {
          ambientCtx.save();
          ambientCtx.rotate((i * Math.PI) / 3);
          const pGrad = ambientCtx.createLinearGradient(0, 0, 0, -pSize * 1.4);
          pGrad.addColorStop(0, '#ff4d79');
          pGrad.addColorStop(0.7, '#ff99b8');
          pGrad.addColorStop(1, '#ffffff');
          ambientCtx.fillStyle = pGrad;
          ambientCtx.beginPath();
          ambientCtx.moveTo(0, 0);
          ambientCtx.bezierCurveTo(pSize * 0.4, -pSize * 0.6, pSize * 0.3, -pSize * 1.2, 0, -pSize * 1.4);
          ambientCtx.bezierCurveTo(-pSize * 0.3, -pSize * 1.2, -pSize * 0.4, -pSize * 0.6, 0, 0);
          ambientCtx.fill();
          ambientCtx.restore();
        }
        ambientCtx.fillStyle = '#ffbe53';
        ambientCtx.beginPath();
        ambientCtx.arc(0, 0, pSize * 0.25, 0, Math.PI * 2);
        ambientCtx.fill();
      } else {
        ambientCtx.fillStyle = '#ffffff';
        ambientCtx.shadowColor = '#ff4d79';
        ambientCtx.shadowBlur = 8;
        ambientCtx.beginPath();
        ambientCtx.arc(0, 0, 2, 0, Math.PI * 2);
        ambientCtx.fill();
      }
      ambientCtx.restore();
    }
  }

  const particleCount = window.innerWidth < 600 ? 30 : 50;
  for (let i = 0; i < particleCount; i++) floralParticles.push(new FloralPetal());

  class Confetti {
    constructor(x, y) {
      this.x = x ?? window.innerWidth / 2;
      this.y = y ?? window.innerHeight / 2;
      this.size = Math.random() * 10 + 5;
      this.color = ['#ff2d75', '#ff758c', '#ffbe53', '#ffa6c8', '#ffffff', '#ff4d79', '#f77ca5'][Math.floor(Math.random() * 7)];
      this.speedX = (Math.random() - 0.5) * 16;
      this.speedY = Math.random() * -16 - 4;
      this.gravity = 0.42;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 14;
      this.opacity = 1;
      this.shape = Math.random() > 0.4 ? 'petal' : 'circle';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravity;
      this.rotation += this.rotationSpeed;
      this.speedX *= 0.98;
      if (this.speedY > 0) this.opacity -= 0.01;
    }
    draw() {
      confettiCtx.save();
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, this.opacity);
      confettiCtx.fillStyle = this.color;
      if (this.shape === 'petal') {
        confettiCtx.beginPath();
        confettiCtx.ellipse(0, 0, this.size / 2, this.size / 3.5, 0, 0, Math.PI * 2);
        confettiCtx.fill();
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, this.size / 2.5, 0, Math.PI * 2);
        confettiCtx.fill();
      }
      confettiCtx.restore();
    }
  }

  function triggerConfettiBurst(x, y, count = 100) {
    for (let i = 0; i < count; i++) confettiParticles.push(new Confetti(x, y));
  }

  btnConfetti.addEventListener('click', () => {
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, 90);
    playMusicBoxNote(880, 0.25, 0.15);
  });

  function animateCanvases() {
    ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
    floralParticles.forEach(p => { p.update(); p.draw(); });

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const c = confettiParticles[i];
      c.update();
      c.draw();
      if (c.opacity <= 0 || c.y > window.innerHeight + 50) confettiParticles.splice(i, 1);
    }
    requestAnimationFrame(animateCanvases);
  }
  requestAnimationFrame(animateCanvases);

  // ==========================================
  // 5. EVASIVE 'NO' BUTTON (MOBILE SAFE & ULTRA EVASIVE)
  // ==========================================
  function moveNoButton() {
    dodgeCount++;
    playDodgeSound();
    btnNo.classList.add('evading');

    const viewportW = window.innerWidth || document.documentElement.clientWidth;
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const btnWidth = btnNo.offsetWidth || 110;
    const btnHeight = btnNo.offsetHeight || 44;

    const padX = 16;
    const padTop = 68; // Below floating top buttons
    const padBottom = 24;

    const maxX = Math.max(padX, viewportW - btnWidth - padX);
    const maxY = Math.max(padTop, viewportH - btnHeight - padBottom);

    const randomX = Math.floor(Math.random() * (maxX - padX)) + padX;
    const randomY = Math.floor(Math.random() * (maxY - padTop)) + padTop;

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.transform = `rotate(${(Math.random() - 0.5) * 16}deg)`;

    const phrase = wittyPhrases[dodgeCount % wittyPhrases.length];
    wittyText.textContent = phrase;
    wittyPopup.classList.remove('show');
    void wittyPopup.offsetWidth;
    wittyPopup.classList.add('show');

    // Grow YES button safely for mobile
    const maxScale = window.innerWidth < 600 ? 1.35 : 1.65;
    const newScale = Math.min(maxScale, 1 + dodgeCount * 0.06);
    btnYes.style.transform = `scale(${newScale})`;
    btnYes.style.boxShadow = `0 ${10 + dodgeCount * 2}px ${26 + dodgeCount * 4}px rgba(255, 45, 117, ${Math.min(0.9, 0.45 + dodgeCount * 0.05)})`;

    evadeCounter.style.display = 'block';
    dodgeCountSpan.textContent = dodgeCount;
  }

  // Desktop hover
  btnNo.addEventListener('mouseenter', moveNoButton);
  btnNo.addEventListener('mouseover', moveNoButton);

  // Mobile Touch handlers (immediate avoidance on tap/touch/pointer)
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  }, { passive: false });

  btnNo.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  });

  btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  });

  // Global cursor radar
  document.addEventListener('mousemove', (e) => {
    if (!stageIntro.classList.contains('active')) return;
    const rect = btnNo.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    if (Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY) < 65) {
      moveNoButton();
    }
  });

  // Global mobile touch radar (dodges if finger touches nearby)
  document.addEventListener('touchmove', (e) => {
    if (!stageIntro.classList.contains('active') || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = btnNo.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    if (Math.hypot(touch.clientX - btnCenterX, touch.clientY - btnCenterY) < 70) {
      moveNoButton();
    }
  }, { passive: true });

  // ==========================================
  // 6. 'YES' BUTTON CLICK -> CELEBRATION
  // ==========================================
  btnYes.addEventListener('click', () => {
    initAudioContext();
    playCelebrationFanfare();
    setTimeout(playHappyBirthdaySong, 800);

    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 160);
    setTimeout(() => {
      triggerConfettiBurst(window.innerWidth * 0.25, window.innerHeight * 0.4, 80);
      triggerConfettiBurst(window.innerWidth * 0.75, window.innerHeight * 0.4, 80);
    }, 350);

    stageIntro.classList.remove('active');
    setTimeout(() => {
      stageIntro.style.display = 'none';
      stageCelebration.style.display = 'block';
      void stageCelebration.offsetWidth;
      stageCelebration.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  });

  // ==========================================
  // 7. INTERACTIVE 3D CAKE & CANDLE BLOWOUT
  // ==========================================
  function blowOutCandle() {
    if (isCandleBlown) {
      isCandleBlown = false;
      mainCandle.classList.remove('blown-out');
      wishBanner.classList.remove('wished');
      wishText.textContent = '✨ Candle is burning! Click to blow out ✨';
      btnBlowText.textContent = 'Blow Out Candle 🎂💨';
      playMusicBoxNote(587.33, 0.25, 0.15);
      return;
    }
    isCandleBlown = true;
    mainCandle.classList.add('blown-out');
    playBlowoutSound();
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2.5, 120);
    wishBanner.classList.add('wished');
    wishText.textContent = '🌟 WISH GRANTED! Happy Birthday! 🌸💖';
    btnBlowText.textContent = 'Light Candle Again 🕯️';

    // Record wish to backend
    fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: appData.recipientName,
        wishText: 'Candle blown out with love and endless wishes! 🎂✨',
        surpriseId: appData.id || 'general'
      })
    }).catch(() => {});
  }

  interactiveCake.addEventListener('click', blowOutCandle);
  btnBlowCandle.addEventListener('click', blowOutCandle);

  // ==========================================
  // 8. POLAROID PHOTO GALLERY (TOUCH SWIPE SUPPORT)
  // ==========================================
  function renderPolaroids() {
    polaroidStack.innerHTML = '';
    photoDots.innerHTML = '';
    const photos = appData.photos || [];

    photos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      if (idx === activePhotoIndex) card.classList.add('active');
      else if (idx === (activePhotoIndex + 1) % photos.length) card.classList.add('stacked-1');
      else if (idx === (activePhotoIndex + 2) % photos.length) card.classList.add('stacked-2');
      else { card.style.opacity = '0'; card.style.pointerEvents = 'none'; }

      card.innerHTML = `
        <div class="polaroid-photo-box"><img src="${photo.url}" alt="${photo.caption}"></div>
        <div class="polaroid-caption">${photo.caption}</div>
      `;

      card.addEventListener('click', () => {
        if (idx === activePhotoIndex) openLightbox(photo);
        else setActivePhoto(idx);
      });

      polaroidStack.appendChild(card);

      const dot = document.createElement('div');
      dot.className = `photo-dot ${idx === activePhotoIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => setActivePhoto(idx));
      photoDots.appendChild(dot);
    });
  }

  function setActivePhoto(index) {
    playMusicBoxNote(523.25, 0.1, 0.1);
    const count = appData.photos.length;
    activePhotoIndex = (index + count) % count;
    renderPolaroids();
  }

  btnPrevPhoto.addEventListener('click', () => setActivePhoto(activePhotoIndex - 1));
  btnNextPhoto.addEventListener('click', () => setActivePhoto(activePhotoIndex + 1));

  // Touch Swipe Gesture for Polaroids on Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  polaroidStack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  polaroidStack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActivePhoto(activePhotoIndex + 1); // Swiped Left
      else setActivePhoto(activePhotoIndex - 1);          // Swiped Right
    }
  }

  function openLightbox(photo) {
    lightboxImg.src = photo.url;
    lightboxCaption.textContent = photo.caption;
    lightboxModal.style.display = 'flex';
  }

  btnCloseLightbox.addEventListener('click', () => { lightboxModal.style.display = 'none'; });
  lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) lightboxModal.style.display = 'none'; });

  // ==========================================
  // 9. WAX-SEALED BIRTHDAY LETTER
  // ==========================================
  function openLetter() {
    isLetterOpen = true;
    playMusicBoxNote(659.25, 0.2, 0.15);
    setTimeout(() => playMusicBoxNote(880, 0.3, 0.15), 100);
    envelopeWrapper.style.display = 'none';
    letterUnfolded.style.display = 'block';
    triggerConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.6, 50);
  }

  function foldLetter() {
    isLetterOpen = false;
    letterUnfolded.style.display = 'none';
    envelopeWrapper.style.display = 'block';
  }

  envelopeTrigger.addEventListener('click', openLetter);
  btnFoldLetter.addEventListener('click', foldLetter);

  // ==========================================
  // 10. REPLAY & RESTART
  // ==========================================
  btnRestart.addEventListener('click', () => {
    stageCelebration.classList.remove('active');
    stageCelebration.style.display = 'none';
    stageIntro.style.display = 'block';
    void stageIntro.offsetWidth;
    stageIntro.classList.add('active');

    btnNo.classList.remove('evading');
    btnNo.style.left = '';
    btnNo.style.top = '';
    btnNo.style.transform = '';
    btnYes.style.transform = 'scale(1)';
    btnYes.style.boxShadow = '';
    wittyPopup.classList.remove('show');
    dodgeCount = 0;
    evadeCounter.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // 11. SURPRISE CUSTOMIZER MODAL
  // ==========================================
  function applyDataToUI() {
    displayRecipientName.textContent = appData.recipientName;
    heroRecipientName.textContent = appData.recipientName;
    letterDisplayDate.textContent = appData.letterDate || defaultData.letterDate;
    letterDisplaySalutation.textContent = `Dearest ${appData.recipientName},`;
    letterDisplayBody.textContent = appData.letterBody;
    letterDisplaySignature.textContent = appData.senderSignature;
    renderPolaroids();
  }

  function openCustomizer() {
    inputRecipientName.value = appData.recipientName;
    inputSenderSignature.value = appData.senderSignature;
    inputLetterBody.value = appData.letterBody;
    uploadPreviews.innerHTML = '';
    customizerModal.style.display = 'flex';
  }

  function closeCustomizer() {
    customizerModal.style.display = 'none';
  }

  btnCustomize.addEventListener('click', openCustomizer);
  btnEditLetter.addEventListener('click', openCustomizer);
  btnAddPhotos.addEventListener('click', openCustomizer);
  btnCloseCustomizer.addEventListener('click', closeCustomizer);

  customizerModal.addEventListener('click', (e) => {
    if (e.target === customizerModal) closeCustomizer();
  });

  inputPhotoUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    uploadPreviews.innerHTML = '';
    const newPhotos = [];
    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newPhotos.push({
          url: event.target.result,
          caption: file.name.replace(/\.[^/.]+$/, "") || `Memory #${i + 1}`
        });
        const thumb = document.createElement('img');
        thumb.src = event.target.result;
        thumb.className = 'preview-thumb';
        uploadPreviews.appendChild(thumb);
      };
      reader.readAsDataURL(file);
    });
    inputPhotoUpload.uploadedPhotos = newPhotos;
  });

  btnSaveCustomizer.addEventListener('click', () => {
    appData.recipientName = inputRecipientName.value.trim() || 'My Love';
    appData.senderSignature = inputSenderSignature.value.trim() || 'Forever Yours ❤️';
    appData.letterBody = inputLetterBody.value.trim() || defaultData.letterBody;

    if (inputPhotoUpload.uploadedPhotos && inputPhotoUpload.uploadedPhotos.length > 0) {
      appData.photos = inputPhotoUpload.uploadedPhotos;
      activePhotoIndex = 0;
    }

    localStorage.setItem('birthday_surprise_data', JSON.stringify(appData));
    applyDataToUI();
    playMusicBoxNote(783.99, 0.3, 0.2);
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, 70);

    // Call Backend API to create persistent share link
    const shareLinkGroup = document.getElementById('share-link-group');
    const inputShareUrl = document.getElementById('input-share-url');
    const copyBtnText = document.getElementById('copy-btn-text');

    try {
      btnSaveCustomizer.textContent = 'Saving Link... ✨';
      const res = await fetch('/api/surprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appData)
      });
      if (res.ok) {
        const result = await res.json();
        if (result && result.shareUrl) {
          inputShareUrl.value = result.shareUrl;
          if (shareLinkGroup) shareLinkGroup.style.display = 'block';
        }
      } else {
        const fallbackUrl = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(appData.recipientName)}&from=${encodeURIComponent(appData.senderSignature)}&msg=${encodeURIComponent(appData.letterBody)}`;
        inputShareUrl.value = fallbackUrl;
        if (shareLinkGroup) shareLinkGroup.style.display = 'block';
      }
    } catch (err) {
      const fallbackUrl = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(appData.recipientName)}&from=${encodeURIComponent(appData.senderSignature)}&msg=${encodeURIComponent(appData.letterBody)}`;
      inputShareUrl.value = fallbackUrl;
      if (shareLinkGroup) shareLinkGroup.style.display = 'block';
    } finally {
      btnSaveCustomizer.textContent = 'Saved! ✨ Click to Update';
    }
  });

  const btnCopyUrl = document.getElementById('btn-copy-url');
  const inputShareUrl = document.getElementById('input-share-url');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (btnCopyUrl) {
    btnCopyUrl.addEventListener('click', async () => {
      if (!inputShareUrl || !inputShareUrl.value) return;
      try {
        await navigator.clipboard.writeText(inputShareUrl.value);
        copyBtnText.textContent = 'Copied! 💖';
        setTimeout(() => { copyBtnText.textContent = 'Copy'; }, 2500);
      } catch (e) {
        inputShareUrl.select();
        document.execCommand('copy');
        copyBtnText.textContent = 'Copied! 💖';
        setTimeout(() => { copyBtnText.textContent = 'Copy'; }, 2500);
      }
    });
  }

  btnResetDefaults.addEventListener('click', () => {
    if (confirm("Reset all customizations back to default?")) {
      appData = JSON.parse(JSON.stringify(defaultData));
      localStorage.removeItem('birthday_surprise_data');
      applyDataToUI();
      closeCustomizer();
    }
  });

  // Async load from backend API if ?id=... or ?to=... is present
  async function loadInitialData() {
    const urlParams = new URLSearchParams(window.location.search);
    const surpriseId = urlParams.get('id');

    if (surpriseId) {
      try {
        const res = await fetch(`/api/surprise/${encodeURIComponent(surpriseId)}`);
        if (res.ok) {
          const json = await res.json();
          if (json && json.data) {
            appData = json.data;
            applyDataToUI();
            return;
          }
        }
      } catch (e) {
        console.log('Backend offline or query error, using local data');
      }
    }

    const toParam = urlParams.get('to') || urlParams.get('name');
    const fromParam = urlParams.get('from');
    const msgParam = urlParams.get('msg');
    if (toParam) appData.recipientName = toParam;
    if (fromParam) appData.senderSignature = fromParam;
    if (msgParam) appData.letterBody = msgParam;

    applyDataToUI();
  }

  loadInitialData();
})();
