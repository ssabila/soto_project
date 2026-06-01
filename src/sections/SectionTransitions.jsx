/**
 * SectionTransitions.jsx
 *
 * Sistem transisi antar section untuk web story Soto Indonesia.
 * Setiap transisi bertema kuliner: steam, splash, filmstrip pull,
 * tablecloth wipe, sauce drip, dll.
 *
 * CARA PAKAI:
 * 1. Import komponen ini di App.jsx
 * 2. Tambahkan <SectionTransitions /> sebagai child pertama di <main>
 * 3. Pastikan setiap section punya atribut data-section="nama-section"
 *    (sudah ada di kode yang existing)
 *
 * DEPENDENCIES: gsap, gsap/ScrollTrigger — sudah ada di project.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   PALETTE — sesuai dengan brand colors project
═══════════════════════════════════════════════════════════════ */
const P = {
  cream:       "#fafdda",
  brown:       "#2c1309",
  rust:        "#c2380f",
  orange:      "#ff9721",
  yellow:      "#fff073",
  green:       "#24a733",
  warmBg:      "#FFF1D6",
  saffron:     "#c9880a",
};

/* ═══════════════════════════════════════════════════════════════
   DEFINISI TRANSISI
   Setiap entry:
     from   → data-section asal
     to     → data-section tujuan
     type   → nama handler transisi
     color  → warna dominan overlay
═══════════════════════════════════════════════════════════════ */
const TRANSITIONS = [
  { from: "opening",       to: "question",       type: "steamRise",       color: P.cream      },
  { from: "question",      to: "journey",        type: "filmstripPull",   color: P.brown      },
  { from: "journey",       to: "unity",          type: "spiceSplash",     color: P.orange     },
  { from: "unity",         to: "meaning",        type: "ingredientMorph", color: P.warmBg     },
  { from: "meaning",       to: "closing",        type: "bowlWipe",        color: P.cream      },
  { from: "closing",       to: "makeyourownsoto",type: "tableclothPull",  color: P.yellow     },
  { from: "makeyourownsoto",to: "about",         type: "steamCurtain",    color: P.brown      },
  { from: "about",         to: "footer",         type: "sauceDrip",       color: "#ffbd59"    },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS — SVG path generators
═══════════════════════════════════════════════════════════════ */

/** Zigzag SVG path untuk efek filmstrip */
function makeFilmstripPath(w, h, strips = 8) {
  const step = w / strips;
  let d = `M0,0`;
  for (let i = 0; i <= strips; i++) {
    const x = i * step;
    d += ` L${x},${i % 2 === 0 ? 0 : h * 0.04}`;
  }
  d += ` L${w},${h} L0,${h} Z`;
  return d;
}

/** Drip path — sauce menetes dari atas */
function makeDripPath(width, drips = 10) {
  const step = width / drips;
  let d = `M0,0 L${width},0`;
  for (let i = drips; i >= 0; i--) {
    const x = i * step;
    const dropLen = 60 + Math.sin(i * 1.7) * 40;
    const cx = x + step * 0.5;
    d += ` C${cx},${dropLen} ${cx},${dropLen * 1.3} ${x},${dropLen * 0.8}`;
  }
  d += " Z";
  return d;
}

/* ═══════════════════════════════════════════════════════════════
   OVERLAY FACTORY — membuat div overlay yang bisa dianimasikan
═══════════════════════════════════════════════════════════════ */
function createOverlay(styles = {}) {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position:   "fixed",
    top:        "0",
    left:       "0",
    width:      "100vw",
    height:     "100vh",
    zIndex:     "99999",
    pointerEvents: "none",
    ...styles,
  });
  document.body.appendChild(el);
  return el;
}

/* ═══════════════════════════════════════════════════════════════
   SVG OVERLAY FACTORY
═══════════════════════════════════════════════════════════════ */
function createSvgOverlay(svgContent, styles = {}) {
  const el = createOverlay(styles);
  el.innerHTML = svgContent;
  return el;
}

/* ═══════════════════════════════════════════════════════════════
   TRANSITION HANDLERS
   Setiap handler menerima { overlay, color, done }
   dan menjalankan animasi masuk + keluar, lalu memanggil done().
═══════════════════════════════════════════════════════════════ */

/** 1. STEAM RISE — uap soto naik dari bawah layar */
function steamRise({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Buat beberapa "puff" steam
  const puffs = Array.from({ length: 7 }, (_, i) => {
    const el = createOverlay({
      width:         `${80 + i * 30}px`,
      height:        `${120 + i * 40}px`,
      borderRadius:  "50% 50% 40% 40%",
      background:    `radial-gradient(ellipse at 50% 60%, ${color}ee, ${color}00)`,
      bottom:        "0",
      top:           "auto",
      left:          `${(W / 8) * i + W * 0.05}px`,
      filter:        "blur(18px)",
      opacity:       "0",
      transform:     "scaleX(1.4)",
    });
    return el;
  });

  // Full-screen overlay untuk wipe
  const wipe = createOverlay({
    background: color,
    transform:  "translateY(100%)",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      puffs.forEach((p) => p.remove());
      wipe.remove();
      done();
    },
  });

  // Steam puffs naik
  tl.to(puffs, {
    opacity:  0.9,
    y:        `-${H * 0.6}px`,
    duration: 0.7,
    stagger:  0.07,
    ease:     "power1.out",
  });

  // Full wipe naik
  tl.to(wipe, {
    y:        "0%",
    duration: 0.55,
    ease:     "power2.inOut",
  }, "-=0.25");

  // Hold sebentar, lalu turun keluar dari atas
  tl.to(wipe, {
    y:        "-100%",
    duration: 0.55,
    ease:     "power2.inOut",
    delay:    0.12,
  });

  tl.to(puffs, {
    opacity:  0,
    duration: 0.3,
    stagger:  0.05,
  }, "<");
}

/** 2. FILMSTRIP PULL — menarik gulungan film retro dari kanan */
function filmstripPull({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="display:block">
      <rect width="${W}" height="${H}" fill="${color}" />
      <!-- Lubang filmstrip atas -->
      ${Array.from({ length: 14 }, (_, i) =>
        `<rect x="${i * (W / 13)}" y="10" width="${W / 17}" height="28"
               rx="4" fill="${P.cream}" opacity="0.85"/>`
      ).join("")}
      <!-- Lubang filmstrip bawah -->
      ${Array.from({ length: 14 }, (_, i) =>
        `<rect x="${i * (W / 13)}" y="${H - 38}" width="${W / 17}" height="28"
               rx="4" fill="${P.cream}" opacity="0.85"/>`
      ).join("")}
      <!-- Garis tengah filmstrip -->
      <line x1="0" y1="${H / 2}" x2="${W}" y2="${H / 2}"
            stroke="${P.orange}" stroke-width="1.5" stroke-dasharray="12 8" opacity="0.4"/>
      <!-- "SOTO" watermark diagonal -->
      <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
            font-family="serif" font-size="${W * 0.18}" font-weight="900"
            fill="${P.rust}" opacity="0.08" transform="rotate(-6,${W/2},${H/2})">SOTO</text>
    </svg>
  `;

  const overlay = createSvgOverlay(svg, { transform: "translateX(110%)" });

  const tl = gsap.timeline({
    onComplete: () => { overlay.remove(); done(); },
  });

  // Tarik masuk dari kanan
  tl.to(overlay, { x: "0%", duration: 0.6, ease: "power3.inOut" });
  // Tahan
  tl.to({}, { duration: 0.15 });
  // Tarik keluar ke kiri
  tl.to(overlay, { x: "-110%", duration: 0.6, ease: "power3.inOut" });
}

/** 3. SPICE SPLASH — partikel rempah muncul dari tengah dan memenuh layar */
function spiceSplash({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Background utama
  const bg = createOverlay({
    background: color,
    opacity:    "0",
    transform:  "scale(0.05)",
    borderRadius: "50%",
    transformOrigin: "center center",
  });

  // Partikel "rempah" — lingkaran + persegi kecil berwarna
  const SPICE_COLORS = [P.rust, P.brown, P.yellow, P.green, P.saffron, "#d05a1f"];
  const particles = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const dist  = 60 + Math.random() * 140;
    const size  = 6 + Math.random() * 14;
    const el    = createOverlay({
      width:         `${size}px`,
      height:        `${size}px`,
      borderRadius:  i % 3 === 0 ? "50%" : `${20 + Math.random() * 30}%`,
      background:    SPICE_COLORS[i % SPICE_COLORS.length],
      left:          `${W / 2 - size / 2}px`,
      top:           `${H / 2 - size / 2}px`,
      opacity:       "0",
      boxShadow:     `0 2px 8px rgba(44,19,9,0.3)`,
    });
    return { el, angle, dist };
  });

  const tl = gsap.timeline({
    onComplete: () => {
      bg.remove();
      particles.forEach((p) => p.el.remove());
      done();
    },
  });

  // Partikel meledak dari tengah
  tl.to(particles.map((p) => p.el), {
    opacity: 1,
    x: (i) => Math.cos(particles[i].angle) * particles[i].dist * 2.5,
    y: (i) => Math.sin(particles[i].angle) * particles[i].dist * 2,
    scale:    "random(0.5, 2.5)",
    rotation: "random(-180, 180)",
    duration: 0.55,
    stagger:  0.01,
    ease:     "expo.out",
  }, 0);

  // BG circle expand
  tl.to(bg, {
    opacity:      1,
    scale:        4,
    borderRadius: "0%",
    duration:     0.5,
    ease:         "power3.inOut",
  }, 0.1);

  // Partikel hilang
  tl.to(particles.map((p) => p.el), {
    opacity:  0,
    scale:    0,
    duration: 0.25,
    stagger:  0.008,
  }, 0.45);

  // BG shrink keluar ke atas
  tl.to(bg, {
    y:        "-110vh",
    duration: 0.55,
    ease:     "power3.inOut",
  }, 0.55);
}

/** 4. INGREDIENT MORPH — bahan makanan mengisi layar dengan clip-path morph */
function ingredientMorph({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Lingkaran-lingkaran yang merge menjadi fullscreen
  const MORPH_COLORS = [P.rust, P.orange, P.saffron, P.green, color];
  const circles = Array.from({ length: 5 }, (_, i) => {
    const positions = [
      { l: "0%",   t: "0%"   },
      { l: "75%",  t: "0%"   },
      { l: "50%",  t: "50%"  },
      { l: "0%",   t: "75%"  },
      { l: "80%",  t: "70%"  },
    ];
    const el = createOverlay({
      width:         "12vw",
      height:        "12vw",
      borderRadius:  "50%",
      background:    MORPH_COLORS[i],
      left:          positions[i].l,
      top:           positions[i].t,
      transform:     "translate(-50%, -50%) scale(0)",
      opacity:       "0.9",
      mixBlendMode:  "normal",
      filter:        "blur(2px)",
    });
    return el;
  });

  // Final white flash overlay
  const flash = createOverlay({
    background: color,
    opacity:    "0",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      circles.forEach((c) => c.remove());
      flash.remove();
      done();
    },
  });

  // Circles mekar bergantian
  tl.to(circles, {
    scale:    18,
    duration: 0.7,
    stagger:  0.06,
    ease:     "power3.inOut",
  }, 0);

  // Flash putih di tengah
  tl.to(flash, {
    opacity:  1,
    duration: 0.2,
    ease:     "power2.out",
  }, 0.5);

  // Semua hilang bersama flash memudar
  tl.to([...circles, flash], {
    opacity:  0,
    duration: 0.35,
    ease:     "power2.in",
  }, 0.65);
}

/** 5. BOWL WIPE — mangkok besar dari kiri ke kanan */
function bowlWipe({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const R = Math.max(W, H) * 0.85;

  // Lingkaran besar — representasi mangkok soto dari samping
  const bowl = createOverlay({
    width:         `${R * 2}px`,
    height:        `${R * 2}px`,
    borderRadius:  "50%",
    background:    `radial-gradient(circle at 48% 45%, ${color} 55%, ${P.saffron} 100%)`,
    top:           `${H / 2 - R}px`,
    left:          `${-R * 2.2}px`,
    boxShadow:     `inset 0 -${R * 0.1}px ${R * 0.08}px rgba(44,19,9,0.18)`,
    border:        `4px solid ${P.saffron}40`,
  });

  // "Kuah" dalam mangkok
  const kuah = createOverlay({
    width:         `${R * 1.2}px`,
    height:        `${R * 0.3}px`,
    borderRadius:  "50%",
    background:    `radial-gradient(ellipse, ${P.orange}cc, ${P.rust}88)`,
    top:           `${H / 2 + R * 0.15}px`,
    left:          `${-R * 1.6}px`,
    filter:        "blur(8px)",
    opacity:       "0.8",
  });

  const tl = gsap.timeline({
    onComplete: () => { bowl.remove(); kuah.remove(); done(); },
  });

  // Bowl menggelinding dari kiri ke kanan
  tl.to([bowl, kuah], {
    x:        `${W + R * 2.5}px`,
    duration: 0.9,
    ease:     "power2.inOut",
  }, 0);

  // Sedikit bounce vertikal saat lewat
  tl.to(bowl, {
    y:        "-30px",
    duration: 0.25,
    ease:     "power1.out",
    yoyo:     true,
    repeat:   1,
  }, 0.2);
}

/** 6. TABLECLOTH PULL — taplak meja ditarik ke bawah, reveal konten */
function tableclothPull({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Taplak — kotak-kotak checkered pattern khas dapur
  const canvas = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Gambar checkered pattern
  const size = 40;
  for (let r = 0; r < Math.ceil(H / size) + 1; r++) {
    for (let c = 0; c < Math.ceil(W / size) + 1; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? color : P.rust;
      ctx.fillRect(c * size, r * size, size, size);
    }
  }

  // Border dekoratif atas taplak
  ctx.strokeStyle = P.brown;
  ctx.lineWidth   = 6;
  ctx.strokeRect(0, 0, W, H);

  // Fringe (rumbai) di bawah taplak
  const fringeH = 28;
  const fringeCount = Math.ceil(W / 14);
  ctx.fillStyle = P.saffron;
  for (let i = 0; i < fringeCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 14, H - fringeH);
    ctx.lineTo(i * 14 + 7, H);
    ctx.lineTo(i * 14 + 14, H - fringeH);
    ctx.fill();
  }

  const tablecloth = createOverlay({
    backgroundImage: `url(${canvas.toDataURL()})`,
    backgroundSize:  "100% 100%",
    transformOrigin: "top center",
  });

  // Crease lines — kerutan taplak
  const creases = Array.from({ length: 5 }, (_, i) => {
    return createOverlay({
      height:     "2px",
      background: `rgba(44,19,9,${0.06 + i * 0.04})`,
      top:        `${(H / 6) * (i + 1)}px`,
      filter:     "blur(1px)",
      transform:  "scaleX(0.9)",
      transformOrigin: "center",
    });
  });

  const tl = gsap.timeline({
    onComplete: () => {
      tablecloth.remove();
      creases.forEach((c) => c.remove());
      done();
    },
  });

  // Taplak slide masuk dari atas
  tl.fromTo(tablecloth,
    { y: "-102%" },
    { y: "0%", duration: 0.5, ease: "power3.out" },
    0
  );

  // Krease muncul
  tl.fromTo(creases,
    { opacity: 0, scaleX: 0.7 },
    { opacity: 1, scaleX: 0.9, duration: 0.25, stagger: 0.04 },
    0.3
  );

  // Taplak ditarik ke bawah dengan dramatis
  tl.to(tablecloth, {
    y:        "102%",
    duration: 0.7,
    ease:     "power4.in",
    delay:    0.1,
  }, 0.5);

  tl.to(creases, {
    opacity:  0,
    duration: 0.2,
    stagger:  0.03,
  }, 0.6);
}

/** 7. STEAM CURTAIN — tirai uap turun dari atas */
function steamCurtain({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Multiple steam strips — lebar tidak merata biar organik
  const strips = Array.from({ length: 9 }, (_, i) => {
    const w = W / 9 + (Math.sin(i * 1.3) * W * 0.04);
    const el = createOverlay({
      width:        `${w + 4}px`,
      height:       "0px",
      left:         `${(W / 9) * i - 2}px`,
      top:          "0",
      background:   i % 2 === 0
        ? `linear-gradient(to bottom, ${color}, ${color}cc)`
        : `linear-gradient(to bottom, ${P.brown}ee, ${color}aa)`,
      borderRadius: "0 0 40% 40%",
      opacity:      "0.97",
    });
    return el;
  });

  const tl = gsap.timeline({
    onComplete: () => { strips.forEach((s) => s.remove()); done(); },
  });

  // Strip turun dengan stagger — mirip tirai + uap
  tl.to(strips, {
    height:   "110vh",
    duration: 0.55,
    stagger:  { each: 0.045, from: "center" },
    ease:     "power3.inOut",
  });

  // Hold
  tl.to({}, { duration: 0.1 });

  // Strip naik
  tl.to(strips, {
    height:   "0px",
    y:        "-110vh",
    duration: 0.5,
    stagger:  { each: 0.04, from: "edges" },
    ease:     "power3.inOut",
  });
}

/** 8. SAUCE DRIP — saus menetes dari atas ke bawah */
function sauceDrip({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Drips — SVG path menetes
  const dripCount = 11;
  const dripPaths = Array.from({ length: dripCount }, (_, i) => {
    const x     = (W / dripCount) * i + (W / dripCount) * 0.5;
    const dropH = 80 + Math.sin(i * 1.7 + 2) * 55;
    const w     = 18 + Math.sin(i * 2.3) * 10;
    // Bentuk tetesan saus yang realistis
    return `
      <path d="
        M${x - w / 2},0
        L${x + w / 2},0
        L${x + w * 0.3},${dropH * 0.6}
        Q${x + w * 0.4},${dropH} ${x},${dropH}
        Q${x - w * 0.4},${dropH} ${x - w * 0.3},${dropH * 0.6}
        Z
      " fill="${color}" opacity="${0.8 + (i % 3) * 0.07}"/>
    `;
  }).join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${W}" height="${H}"
         style="display:block">
      <!-- BG penuh -->
      <rect width="${W}" height="${H}" fill="${color}" y="-${H}" id="bg-rect"/>
      <!-- Drip paths -->
      <g id="drips" transform="translate(0,-140)">${dripPaths}</g>
    </svg>
  `;

  const overlay = createSvgOverlay(svg);

  const tl = gsap.timeline({
    onComplete: () => { overlay.remove(); done(); },
  });

  // Drips turun dulu
  tl.to(overlay.querySelector("#drips"), {
    y:        H * 0.15,
    duration: 0.45,
    ease:     "power2.out",
  });

  // Background naik mengisi layar dari bawah
  tl.to(overlay.querySelector("#bg-rect"), {
    y:        H,
    duration: 0.5,
    ease:     "power3.inOut",
  }, 0.2);

  // Semua hilang ke bawah
  tl.to(overlay, {
    y:        "110%",
    duration: 0.55,
    ease:     "power3.inOut",
    delay:    0.15,
  });
}

/* ═══════════════════════════════════════════════════════════════
   DISPATCHER — pilih handler berdasarkan type
═══════════════════════════════════════════════════════════════ */
const HANDLERS = {
  steamRise:       steamRise,
  filmstripPull:   filmstripPull,
  spiceSplash:     spiceSplash,
  ingredientMorph: ingredientMorph,
  bowlWipe:        bowlWipe,
  tableclothPull:  tableclothPull,
  steamCurtain:    steamCurtain,
  sauceDrip:       sauceDrip,
};

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION-BASED TRIGGER
   Menggunakan IntersectionObserver untuk men-detect perpindahan
   section, lalu fire transisi jika bukan karena scroll balik.
═══════════════════════════════════════════════════════════════ */
function setupTransitions() {
  let lastSection = null;
  let isAnimating = false;
  let lastScrollY = window.scrollY;

  // Build lookup berdasarkan from → to
  const lookup = {};
  TRANSITIONS.forEach((t) => {
    lookup[`${t.from}→${t.to}`] = t;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentScrollY = window.scrollY;
        const scrollingDown  = currentScrollY >= lastScrollY;
        lastScrollY = currentScrollY;

        const sectionId = entry.target.dataset.section;
        if (!sectionId || sectionId === lastSection) return;

        if (scrollingDown && lastSection) {
          const key = `${lastSection}→${sectionId}`;
          const def = lookup[key];

          if (def && !isAnimating) {
            isAnimating = true;
            const handler = HANDLERS[def.type];
            if (handler) {
              handler({
                color: def.color,
                done: () => { isAnimating = false; },
              });
            } else {
              isAnimating = false;
            }
          }
        }

        lastSection = sectionId;
      });
    },
    {
      // Section dianggap "entered" saat 25% terlihat
      threshold: [0.25],
    }
  );

  // Observe semua sections
  const sections = document.querySelectorAll("[data-section]");
  sections.forEach((s) => observer.observe(s));

  return () => observer.disconnect();
}

/* ═══════════════════════════════════════════════════════════════
   KOMPONEN UTAMA
═══════════════════════════════════════════════════════════════ */
export default function SectionTransitions() {
  const cleanupRef = useRef(null);

  useEffect(() => {
    // Tunggu sedikit agar semua section sudah mount
    const timer = setTimeout(() => {
      cleanupRef.current = setupTransitions();
    }, 800);

    return () => {
      clearTimeout(timer);
      cleanupRef.current?.();
    };
  }, []);

  // Tidak ada DOM yang dirender — komponen ini murni logic
  return null;
}
