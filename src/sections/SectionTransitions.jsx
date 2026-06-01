import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* palet warna */
const P = {
  cream: "#fafdda",
  brown: "#2c1309",
  rust: "#c2380f",
  orange: "#ff9721",
  yellow: "#fff073",
  green: "#24a733",
  warmBg: "#FFF1D6",
  saffron: "#c9880a",
};

/* overlay*/
function createOverlay(styles = {}) {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "99999",
    pointerEvents: "none",
    ...styles,
  });
  document.body.appendChild(el);
  return el;
}

/* steam rise */
function steamRise({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const puffs = Array.from({ length: 7 }, (_, i) => {
    return createOverlay({
      width: `${80 + i * 30}px`,
      height: `${120 + i * 40}px`,
      borderRadius: "50% 50% 40% 40%",
      background: `radial-gradient(ellipse at 50% 60%, ${color}ee, ${color}00)`,
      bottom: "0",
      top: "auto",
      left: `${(W / 8) * i + W * 0.05}px`,
      filter: "blur(18px)",
      opacity: "0",
      transform: "scaleX(1.4)",
    });
  });

  const wipe = createOverlay({
    background: `linear-gradient(to bottom, ${color} 60%, ${P.brown}44 100%)`,
    transform: "translateY(100%)",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      puffs.forEach((p) => p.remove());
      wipe.remove();
      done();
    },
  });

  tl.to(puffs, {
    opacity: 0.9,
    y: `-${H * 0.6}px`,
    duration: 0.7,
    stagger: 0.07,
    ease: "power1.out",
  });

  tl.to(
    wipe,
    {
      y: "0%",
      duration: 0.55,
      ease: "power2.inOut",
    },
    "-=0.25",
  );

  tl.to(wipe, {
    y: "-100%",
    duration: 0.55,
    ease: "power2.inOut",
    delay: 0.12,
  });

  tl.to(puffs, { opacity: 0, duration: 0.3, stagger: 0.05 }, "<");
}

/* liquid splash question ke journey */
function liquidSplash({ done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const splashColors = [P.rust, P.orange, P.saffron, P.brown, P.cream];

  const circles = splashColors.map((c) => {
    const el = createOverlay({
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: c,
      left: `${W / 2 - 10}px`,
      top: `${H / 2 - 10}px`,
      opacity: "0",
      transformOrigin: "center center",
    });
    return el;
  });

  /* Partikel rempah kecil-kecil yang bertebaran */
  const COLORS_SPLASH = [
    P.rust,
    P.orange,
    P.yellow,
    P.saffron,
    "#d05a1f",
    P.green,
  ];
  const particles = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const dist = 80 + Math.random() * 160;
    const size = 5 + Math.random() * 12;
    const el = createOverlay({
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: i % 3 === 0 ? "50%" : `${25 + Math.random() * 30}%`,
      background: COLORS_SPLASH[i % COLORS_SPLASH.length],
      left: `${W / 2 - size / 2}px`,
      top: `${H / 2 - size / 2}px`,
      opacity: "0",
    });
    return { el, angle, dist };
  });

  /* Full-screen overlay gradasi cream → brown */
  const fullOverlay = createOverlay({
    background: `linear-gradient(160deg, ${P.cream} 0%, ${P.rust} 40%, ${P.brown} 100%)`,
    opacity: "0",
    transform: "scale(0.02)",
    borderRadius: "50%",
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

  tl.to(
    particles.map((p) => p.el),
    {
      opacity: 1,
      x: (i) => Math.cos(particles[i].angle) * particles[i].dist * 3.0,
      y: (i) => Math.sin(particles[i].angle) * particles[i].dist * 2.5,
      scale: "random(0.4, 2.2)",
      rotation: "random(-200, 200)",
      duration: 0.5,
      stagger: 0.008,
      ease: "expo.out",
    },
    0,
  );

  tl.to(
    circles,
    {
      opacity: 1,
      scale: (i) => 25 + i * 5,
      borderRadius: "0%",
      duration: 0.55,
      stagger: 0.04,
      ease: "power3.inOut",
    },
    0,
  );

  tl.to(
    fullOverlay,
    {
      opacity: 1,
      scale: 3.5,
      borderRadius: "0%",
      duration: 0.48,
      ease: "power3.inOut",
    },
    0.12,
  );

  tl.to(
    particles.map((p) => p.el),
    {
      opacity: 0,
      duration: 0.2,
      stagger: 0.005,
    },
    0.38,
  );

  tl.to(
    circles,
    {
      opacity: 0,
      duration: 0.15,
      stagger: 0.02,
    },
    0.4,
  );

  tl.to(
    fullOverlay,
    {
      y: "-105vh",
      duration: 0.6,
      ease: "power3.inOut",
      delay: 0.05,
    },
    0.45,
  );
}

/* FILMSTRIP PULL (journey → unity)*/
function filmstripPull({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  /* Canvas filmstrip */
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  /* Background utama — gradasi sepia ke brown */
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, color);
  grad.addColorStop(0.5, P.saffron + "cc");
  grad.addColorStop(1, P.brown);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  /* Lubang filmstrip atas & bawah */
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

  /* Garis tengah */
  ctx.setLineDash([14, 10]);
  ctx.strokeStyle = P.orange + "55";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  /* Watermark SOTO */
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate((-6 * Math.PI) / 180);
  ctx.font = `900 ${W * 0.18}px serif`;
  ctx.fillStyle = P.rust + "14";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SOTO", 0, 0);
  ctx.restore();

  const overlay = createOverlay({
    backgroundImage: `url(${canvas.toDataURL()})`,
    backgroundSize: "100% 100%",
    transform: "translateX(110%)",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.remove();
      done();
    },
  });

  tl.to(overlay, { x: "0%", duration: 0.6, ease: "power3.inOut" });
  tl.to({}, { duration: 0.1 });
  tl.to(overlay, { x: "-110%", duration: 0.6, ease: "power3.inOut" });
}

/* SPICE SPLASH (unity → meaning)
 */
function spiceSplash({ color, done }) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const bg = createOverlay({
    background: `radial-gradient(circle at center, ${P.orange} 0%, ${color} 55%, ${P.warmBg} 100%)`,
    opacity: "0",
    transform: "scale(0.05)",
    borderRadius: "50%",
    transformOrigin: "center center",
  });

  const SPICE_COLORS = [
    P.rust,
    P.brown,
    P.yellow,
    P.green,
    P.saffron,
    "#d05a1f",
  ];
  const particles = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const dist = 60 + Math.random() * 140;
    const size = 6 + Math.random() * 14;
    const el = createOverlay({
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: i % 3 === 0 ? "50%" : `${20 + Math.random() * 30}%`,
      background: SPICE_COLORS[i % SPICE_COLORS.length],
      left: `${W / 2 - size / 2}px`,
      top: `${H / 2 - size / 2}px`,
      opacity: "0",
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

  tl.to(
    particles.map((p) => p.el),
    {
      opacity: 1,
      x: (i) => Math.cos(particles[i].angle) * particles[i].dist * 2.5,
      y: (i) => Math.sin(particles[i].angle) * particles[i].dist * 2,
      scale: "random(0.5, 2.5)",
      rotation: "random(-180, 180)",
      duration: 0.55,
      stagger: 0.01,
      ease: "expo.out",
    },
    0,
  );

  tl.to(
    bg,
    {
      opacity: 1,
      scale: 4,
      borderRadius: "0%",
      duration: 0.5,
      ease: "power3.inOut",
    },
    0.1,
  );

  tl.to(
    particles.map((p) => p.el),
    {
      opacity: 0,
      scale: 0,
      duration: 0.25,
      stagger: 0.008,
    },
    0.45,
  );

  tl.to(
    bg,
    {
      y: "-110vh",
      duration: 0.55,
      ease: "power3.inOut",
    },
    0.55,
  );
}

/* map*/
const HANDLERS = {
  steamRise: steamRise,
  liquidSplash: liquidSplash,
  filmstripPull: filmstripPull,
  spiceSplash: spiceSplash,
};

/* 
   from/to = data-section value
*/
const TRANSITIONS = [
  { from: "opening", to: "question", type: "steamRise", color: P.cream },
  { from: "question", to: "journey", type: "liquidSplash", color: P.brown },
  { from: "journey", to: "unity", type: "filmstripPull", color: P.saffron },
  { from: "unity", to: "meaning", type: "spiceSplash", color: P.orange },
];

/* ─── Setup transitions ─── */
function setupTransitions() {
  let isAnimating = false;
  let lastFiredTransition = null;

  const lookup = {};
  TRANSITIONS.forEach((t) => {
    lookup[`${t.from}→${t.to}`] = t;
  });

  function fireTransition(key) {
    const def = lookup[key];
    if (!def || isAnimating) return;
    if (lastFiredTransition === key) return;

    lastFiredTransition = key;
    isAnimating = true;

    const handler = HANDLERS[def.type];
    if (handler) {
      handler({
        color: def.color,
        done: () => {
          isAnimating = false;
          /* Reset setelah beberapa saat agar bisa re-fire jika scroll balik */
          setTimeout(() => {
            lastFiredTransition = null;
          }, 1200);
        },
      });
    } else {
      isAnimating = false;
    }
  }

  /* ─── Helper: cari section element ─── */
  function getSection(name) {
    return (
      document.querySelector(`[data-section="${name}"]`) ||
      document.getElementById(name)
    );
  }

  /* ─── ScrollTrigger untuk setiap pasang from→to ─── */
  const triggers = [];

  TRANSITIONS.forEach((t) => {
    const fromEl = getSection(t.from);
    if (!fromEl) return;

    const trigger = ScrollTrigger.create({
      trigger: fromEl,
      start: "bottom 80%" /* saat 80% dari bawah section "from" terlihat */,
      end: "bottom top" /* saat section "from" benar-benar keluar */,
      onLeave: () => fireTransition(`${t.from}→${t.to}`),
    });

    triggers.push(trigger);
  });

  const checkPinnedInterval = setInterval(() => {
    /* Tunggu hingga semua ScrollTrigger (dari section lain) sudah dibuat */
    const allSTs = ScrollTrigger.getAll();
    if (allSTs.length < 3) return; /* Belum siap */

    clearInterval(checkPinnedInterval);

    allSTs.forEach((st) => {
      if (!st.pin || !st.trigger) return;

      const sectionEl = st.trigger;
      const sectionId = sectionEl.dataset?.section || sectionEl.id;
      if (!sectionId) return;

      /* Cari transisi yang FROM = section ini */
      const transitionDef = TRANSITIONS.find((t) => t.from === sectionId);
      if (!transitionDef) return;

      /* Override: buat trigger di akhir pin spacer */
      const originalOnLeave = st.vars?.onLeave;
      if (!st._transitionAdded) {
        st._transitionAdded = true;
        st.vars.onLeave = (...args) => {
          originalOnLeave?.(...args);
          setTimeout(() => {
            fireTransition(`${transitionDef.from}→${transitionDef.to}`);
          }, 50);
        };
        /* Update ScrollTrigger dengan handler baru */
        if (st._kill) return; /* already killed */
      }
    });
  }, 600);

  return () => {
    clearInterval(checkPinnedInterval);
    triggers.forEach((t) => {
      try {
        t.kill();
      } catch (error) {
        console.warn("Failed to kill ScrollTrigger:", error);
      }
    });
  };
}

/*komponen utama */
export default function SectionTransitions() {
  const cleanupRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      cleanupRef.current = setupTransitions();
    }, 1000);

    return () => {
      clearTimeout(timer);
      cleanupRef.current?.();
    };
  }, []);

  return null;
}
