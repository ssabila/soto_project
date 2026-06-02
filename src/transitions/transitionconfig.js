/**
 * transitionConfig.js
 *
 * File ini adalah "single source of truth" untuk semua animasi transisi.
 * Di-import oleh:
 *   - useSectionTransition.js  → pakai HANDLERS + TRANSITIONS
 *   - SectionTransitions.jsx   → (opsional) jika masih dipakai sebagai fallback
 *
 * Yang WAJIB di-export:
 *   P           — palette warna
 *   createOverlay — factory overlay DOM
 *   HANDLERS    — map nama → fungsi animasi
 *   TRANSITIONS — array definisi pasangan from→to
 */

import gsap from "gsap";

/* ═══════════════════════════════════════
   PALETTE
═══════════════════════════════════════ */
export const P = {
  cream:   "#fafdda",
  brown:   "#2c1309",
  rust:    "#c2380f",
  orange:  "#ff9721",
  yellow:  "#fff073",
  green:   "#24a733",
  warmBg:  "#FFF1D6",
  saffron: "#c9880a",
};

/* ═══════════════════════════════════════
   OVERLAY FACTORY
═══════════════════════════════════════ */
export function createOverlay(styles = {}) {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position:      "fixed",
    top:           "0",
    left:          "0",
    width:         "100vw",
    height:        "100vh",
    zIndex:        "99999",
    pointerEvents: "none",
    ...styles,
  });
  document.body.appendChild(el);
  return el;
}

/* ═══════════════════════════════════════
   HANDLER: STEAM RISE
   opening → question
═══════════════════════════════════════ */
function steamRise({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const puffs = Array.from({ length: 7 }, (_, i) => {
    return createOverlay({
      width:        `${80 + i * 30}px`,
      height:       `${120 + i * 40}px`,
      borderRadius: "50% 50% 40% 40%",
      background:   `radial-gradient(ellipse at 50% 60%, ${color}ee, ${color}00)`,
      bottom:       "0",
      top:          "auto",
      left:         `${(W / 8) * i + W * 0.05}px`,
      filter:       "blur(18px)",
      opacity:      "0",
      transform:    "scaleX(1.4)",
    });
  });

  const wipe = createOverlay({
    background: `linear-gradient(to bottom, ${color} 60%, ${P.brown}44 100%)`,
    transform:  "translateY(100%)",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      puffs.forEach((p) => p.remove());
      wipe.remove();
      done();
    },
  });

  tl.to(puffs, {
    opacity:  0.9,
    y:        `-${H * 0.6}px`,
    duration: 0.7,
    stagger:  0.07,
    ease:     "power1.out",
  });

  tl.to(wipe, {
    y:        "0%",
    duration: 0.55,
    ease:     "power2.inOut",
  }, "-=0.25");

  tl.to(wipe, {
    y:        "-100%",
    duration: 0.55,
    ease:     "power2.inOut",
    delay:    0.12,
  });

  tl.to(puffs, { opacity: 0, duration: 0.3, stagger: 0.05 }, "<");
}

/* ═══════════════════════════════════════
   HANDLER: LIQUID SPLASH
   question → journey
═══════════════════════════════════════ */
function liquidSplash({ done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const splashColors = [P.rust, P.orange, P.saffron, P.brown, P.cream];
  const circles = splashColors.map((c) => {
    return createOverlay({
      width:           "20px",
      height:          "20px",
      borderRadius:    "50%",
      background:      c,
      left:            `${W / 2 - 10}px`,
      top:             `${H / 2 - 10}px`,
      opacity:         "0",
      transformOrigin: "center center",
    });
  });

  const COLORS_SPLASH = [P.rust, P.orange, P.yellow, P.saffron, "#d05a1f", P.green];
  const particles = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const dist  = 80 + Math.random() * 160;
    const size  = 5 + Math.random() * 12;
    const el    = createOverlay({
      width:        `${size}px`,
      height:       `${size}px`,
      borderRadius: i % 3 === 0 ? "50%" : `${25 + Math.random() * 30}%`,
      background:   COLORS_SPLASH[i % COLORS_SPLASH.length],
      left:         `${W / 2 - size / 2}px`,
      top:          `${H / 2 - size / 2}px`,
      opacity:      "0",
    });
    return { el, angle, dist };
  });

  const fullOverlay = createOverlay({
    background:      `linear-gradient(160deg, ${P.cream} 0%, ${P.rust} 40%, ${P.brown} 100%)`,
    opacity:         "0",
    transform:       "scale(0.02)",
    borderRadius:    "50%",
    transformOrigin: "center center",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      circles.forEach((c) => c.remove());
      particles.forEach((p) => p.el.remove());
      fullOverlay.remove();
      done();
    },
  });

  tl.to(particles.map((p) => p.el), {
    opacity:  1,
    x:        (i) => Math.cos(particles[i].angle) * particles[i].dist * 3.0,
    y:        (i) => Math.sin(particles[i].angle) * particles[i].dist * 2.5,
    scale:    "random(0.4, 2.2)",
    rotation: "random(-200, 200)",
    duration: 0.5,
    stagger:  0.008,
    ease:     "expo.out",
  }, 0);

  tl.to(circles, {
    opacity:      1,
    scale:        (i) => 25 + i * 5,
    borderRadius: "0%",
    duration:     0.55,
    stagger:      0.04,
    ease:         "power3.inOut",
  }, 0);

  tl.to(fullOverlay, {
    opacity:      1,
    scale:        3.5,
    borderRadius: "0%",
    duration:     0.48,
    ease:         "power3.inOut",
  }, 0.12);

  tl.to(particles.map((p) => p.el), {
    opacity:  0,
    duration: 0.2,
    stagger:  0.005,
  }, 0.38);

  tl.to(circles, {
    opacity:  0,
    duration: 0.15,
    stagger:  0.02,
  }, 0.4);

  tl.to(fullOverlay, {
    y:        "-105vh",
    duration: 0.6,
    ease:     "power3.inOut",
    delay:    0.05,
  }, 0.45);
}

/* ═══════════════════════════════════════
   HANDLER: FILMSTRIP PULL
   journey → unity
═══════════════════════════════════════ */
function filmstripPull({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const canvas  = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  const ctx     = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0,   color);
  grad.addColorStop(0.5, P.saffron + "cc");
  grad.addColorStop(1,   P.brown);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const holeW = Math.floor(W / 17);
  const holeH = 28;
  const count = 16;
  for (let i = 0; i < count; i++) {
    const x = Math.floor((i * W) / (count - 1)) - holeW / 2;
    ctx.fillStyle = P.cream + "cc";
    ctx.beginPath();
    ctx.roundRect(x, 8, holeW, holeH, 4);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(x, H - holeH - 8, holeW, holeH, 4);
    ctx.fill();
  }

  ctx.setLineDash([14, 10]);
  ctx.strokeStyle = P.orange + "55";
  ctx.lineWidth   = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-6 * Math.PI / 180);
  ctx.font         = `900 ${W * 0.18}px serif`;
  ctx.fillStyle    = P.rust + "14";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SOTO", 0, 0);
  ctx.restore();

  const overlay = createOverlay({
    backgroundImage: `url(${canvas.toDataURL()})`,
    backgroundSize:  "100% 100%",
    transform:       "translateX(110%)",
  });

  const tl = gsap.timeline({
    onComplete: () => { overlay.remove(); done(); },
  });

  tl.to(overlay, { x: "0%",    duration: 0.6, ease: "power3.inOut" });
  tl.to({},      { duration: 0.1 });
  tl.to(overlay, { x: "-110%", duration: 0.6, ease: "power3.inOut" });
}

/* ═══════════════════════════════════════
   HANDLER: SPICE SPLASH
   unity → meaning
═══════════════════════════════════════ */
function spiceSplash({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const bg = createOverlay({
    background:      `radial-gradient(circle at center, ${P.orange} 0%, ${color} 55%, ${P.warmBg} 100%)`,
    opacity:         "0",
    transform:       "scale(0.05)",
    borderRadius:    "50%",
    transformOrigin: "center center",
  });

  const SPICE_COLORS = [P.rust, P.brown, P.yellow, P.green, P.saffron, "#d05a1f"];
  const particles = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const dist  = 60 + Math.random() * 140;
    const size  = 6 + Math.random() * 14;
    const el    = createOverlay({
      width:        `${size}px`,
      height:       `${size}px`,
      borderRadius: i % 3 === 0 ? "50%" : `${20 + Math.random() * 30}%`,
      background:   SPICE_COLORS[i % SPICE_COLORS.length],
      left:         `${W / 2 - size / 2}px`,
      top:          `${H / 2 - size / 2}px`,
      opacity:      "0",
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

  tl.to(particles.map((p) => p.el), {
    opacity:  1,
    x:        (i) => Math.cos(particles[i].angle) * particles[i].dist * 2.5,
    y:        (i) => Math.sin(particles[i].angle) * particles[i].dist * 2,
    scale:    "random(0.5, 2.5)",
    rotation: "random(-180, 180)",
    duration: 0.55,
    stagger:  0.01,
    ease:     "expo.out",
  }, 0);

  tl.to(bg, {
    opacity:      1,
    scale:        4,
    borderRadius: "0%",
    duration:     0.5,
    ease:         "power3.inOut",
  }, 0.1);

  tl.to(particles.map((p) => p.el), {
    opacity:  0,
    scale:    0,
    duration: 0.25,
    stagger:  0.008,
  }, 0.45);

  tl.to(bg, {
    y:        "-110vh",
    duration: 0.55,
    ease:     "power3.inOut",
  }, 0.55);
}

/* ═══════════════════════════════════════
   HANDLER: INGREDIENT MORPH
   meaning → closing
═══════════════════════════════════════ */
function ingredientMorph({ color, done }) {
  const MORPH_COLORS = [P.rust, P.orange, P.saffron, P.green, color];
  const positions    = [
    { l: "0%",  t: "0%"  },
    { l: "75%", t: "0%"  },
    { l: "50%", t: "50%" },
    { l: "0%",  t: "75%" },
    { l: "80%", t: "70%" },
  ];

  const circles = Array.from({ length: 5 }, (_, i) =>
    createOverlay({
      width:        "12vw",
      height:       "12vw",
      borderRadius: "50%",
      background:   MORPH_COLORS[i],
      left:         positions[i].l,
      top:          positions[i].t,
      transform:    "translate(-50%, -50%) scale(0)",
      opacity:      "0.9",
      filter:       "blur(2px)",
    })
  );

  const flash = createOverlay({
    background: `linear-gradient(135deg, ${color} 0%, ${P.cream} 100%)`,
    opacity:    "0",
  });

  const tl = gsap.timeline({
    onComplete: () => { circles.forEach((c) => c.remove()); flash.remove(); done(); },
  });

  tl.to(circles, { scale: 18, duration: 0.7, stagger: 0.06, ease: "power3.inOut" }, 0);
  tl.to(flash,   { opacity: 1, duration: 0.2, ease: "power2.out" }, 0.5);
  tl.to([...circles, flash], { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.65);
}

/* ═══════════════════════════════════════
   HANDLER: BOWL WIPE
   closing → makeyourownsoto
═══════════════════════════════════════ */
function bowlWipe({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const R = Math.max(W, H) * 0.85;

  const bowl = createOverlay({
    width:        `${R * 2}px`,
    height:       `${R * 2}px`,
    borderRadius: "50%",
    background:   `radial-gradient(circle at 48% 45%, ${color} 55%, ${P.saffron} 100%)`,
    top:          `${H / 2 - R}px`,
    left:         `${-R * 2.2}px`,
    boxShadow:    `inset 0 -${R * 0.1}px ${R * 0.08}px rgba(44,19,9,0.18)`,
    border:       `4px solid ${P.saffron}40`,
  });

  const kuah = createOverlay({
    width:        `${R * 1.2}px`,
    height:       `${R * 0.3}px`,
    borderRadius: "50%",
    background:   `radial-gradient(ellipse, ${P.orange}cc, ${P.rust}88)`,
    top:          `${H / 2 + R * 0.15}px`,
    left:         `${-R * 1.6}px`,
    filter:       "blur(8px)",
    opacity:      "0.8",
  });

  const tl = gsap.timeline({
    onComplete: () => { bowl.remove(); kuah.remove(); done(); },
  });

  tl.to([bowl, kuah], {
    x:        `${W + R * 2.5}px`,
    duration: 0.9,
    ease:     "power2.inOut",
  }, 0);

  tl.to(bowl, {
    y:        "-30px",
    duration: 0.25,
    ease:     "power1.out",
    yoyo:     true,
    repeat:   1,
  }, 0.2);
}

/* ═══════════════════════════════════════
   HANDLER: TABLECLOTH PULL
   makeyourownsoto → about
═══════════════════════════════════════ */
function tableclothPull({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const canvas  = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  const ctx     = canvas.getContext("2d");

  const size = 40;
  for (let r = 0; r < Math.ceil(H / size) + 1; r++) {
    for (let c = 0; c < Math.ceil(W / size) + 1; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? color : P.rust;
      ctx.fillRect(c * size, r * size, size, size);
    }
  }

  ctx.strokeStyle = P.brown;
  ctx.lineWidth   = 6;
  ctx.strokeRect(0, 0, W, H);

  const fringeH     = 28;
  const fringeCount = Math.ceil(W / 14);
  ctx.fillStyle     = P.saffron;
  for (let i = 0; i < fringeCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 14,      H - fringeH);
    ctx.lineTo(i * 14 + 7,  H);
    ctx.lineTo(i * 14 + 14, H - fringeH);
    ctx.fill();
  }

  const tablecloth = createOverlay({
    backgroundImage: `url(${canvas.toDataURL()})`,
    backgroundSize:  "100% 100%",
    transformOrigin: "top center",
  });

  const tl = gsap.timeline({
    onComplete: () => { tablecloth.remove(); done(); },
  });

  tl.fromTo(tablecloth, { y: "-102%" }, { y: "0%",   duration: 0.5, ease: "power3.out" }, 0);
  tl.to(tablecloth,                      { y: "102%", duration: 0.7, ease: "power4.in", delay: 0.1 }, 0.5);
}

/* ═══════════════════════════════════════
   HANDLER: STEAM CURTAIN
   about → footer
═══════════════════════════════════════ */
function steamCurtain({ color, done }) {
  const W = window.innerWidth;

  const strips = Array.from({ length: 9 }, (_, i) => {
    const w = W / 9 + Math.sin(i * 1.3) * W * 0.04;
    return createOverlay({
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
  });

  const tl = gsap.timeline({
    onComplete: () => { strips.forEach((s) => s.remove()); done(); },
  });

  tl.to(strips, {
    height:   "110vh",
    duration: 0.55,
    stagger:  { each: 0.045, from: "center" },
    ease:     "power3.inOut",
  });

  tl.to({}, { duration: 0.1 });

  tl.to(strips, {
    height:   "0px",
    y:        "-110vh",
    duration: 0.5,
    stagger:  { each: 0.04, from: "edges" },
    ease:     "power3.inOut",
  });
}

/* ═══════════════════════════════════════
   HANDLER: SAUCE DRIP
   → footer (transisi terakhir)
═══════════════════════════════════════ */
function sauceDrip({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const dripCount = 11;
  const dripPaths = Array.from({ length: dripCount }, (_, i) => {
    const x     = (W / dripCount) * i + (W / dripCount) * 0.5;
    const dropH = 80 + Math.sin(i * 1.7 + 2) * 55;
    const w     = 18 + Math.sin(i * 2.3) * 10;
    return `<path d="M${x - w / 2},0 L${x + w / 2},0 L${x + w * 0.3},${dropH * 0.6} Q${x + w * 0.4},${dropH} ${x},${dropH} Q${x - w * 0.4},${dropH} ${x - w * 0.3},${dropH * 0.6} Z" fill="${color}" opacity="${0.8 + (i % 3) * 0.07}"/>`;
  }).join("");

  const overlay = createOverlay();
  overlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="display:block">
    <rect width="${W}" height="${H}" fill="${color}" y="-${H}" id="bg-rect"/>
    <g id="drips" transform="translate(0,-140)">${dripPaths}</g>
  </svg>`;

  const tl = gsap.timeline({
    onComplete: () => { overlay.remove(); done(); },
  });

  tl.to(overlay.querySelector("#drips"),   { y: H * 0.15, duration: 0.45, ease: "power2.out" });
  tl.to(overlay.querySelector("#bg-rect"), { y: H,        duration: 0.5,  ease: "power3.inOut" }, 0.2);
  tl.to(overlay,                           { y: "110%",   duration: 0.55, ease: "power3.inOut", delay: 0.15 });
}

/* ═══════════════════════════════════════
   HANDLERS MAP  ← WAJIB export
   Key harus cocok persis dengan field "type"
   di array TRANSITIONS di bawah.
═══════════════════════════════════════ */
export const HANDLERS = {
  steamRise,
  liquidSplash,
  filmstripPull,
  spiceSplash,
  ingredientMorph,
  bowlWipe,
  tableclothPull,
  steamCurtain,
  sauceDrip,
};

/* ═══════════════════════════════════════
   TRANSITIONS ARRAY  ← WAJIB export
   Urutan array = urutan section di halaman.
   "from" dan "to" harus cocok dengan nilai
   data-section="..." di masing-masing <section>.
═══════════════════════════════════════ */
export const TRANSITIONS = [
  { from: "opening",         to: "question",        type: "steamRise",       color: P.cream   },
  { from: "question",        to: "journey",          type: "liquidSplash",    color: P.brown   },
  { from: "journey",         to: "unity",            type: "filmstripPull",   color: P.saffron },
  { from: "unity",           to: "meaning",          type: "spiceSplash",     color: P.orange  },
  { from: "meaning",         to: "closing",          type: "ingredientMorph", color: P.warmBg  },
  { from: "closing",         to: "makeyourownsoto",  type: "bowlWipe",        color: P.cream   },
  { from: "makeyourownsoto", to: "about",            type: "tableclothPull",  color: P.yellow  },
  { from: "about",           to: "footer",           type: "steamCurtain",    color: P.brown   },
];