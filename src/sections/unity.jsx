import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { storyContent } from '../data/storytext';

// Bowls
import sotoMakasar from '../assets/images/coto-makasar.svg';
import sotoBanjar from '../assets/images/soto-banjar.svg';
import sotoBetawi from '../assets/images/soto-betawi.svg';
import sotoKudus from '../assets/images/soto-kudus.svg';
import sotoLamongan from '../assets/images/soto-lamongan.svg';
import sotoPadang from '../assets/images/soto-padang.svg';

// Ingredients (Sesuai dengan permintaan yang baru)
import rempah from '../assets/images/rempah.svg';
import daging from '../assets/images/daging.svg';
import santan from '../assets/images/santan.svg';
import dagingSapi from '../assets/images/daging-sapi.svg';
import jerukNipis from '../assets/images/jeruk-nipis.svg';
// Kita tetap pakai beberapa yang lama untuk meramaikan efek konfeti
import cabe from '../assets/images/cabe.svg';
import bawangRetro from '../assets/images/bawang-retro.svg';

// Decors
import bungaRetro from '../assets/images/bunga-retro.svg';
import starRetro from '../assets/images/star.svg';
import decorRetro from '../assets/images/decor-retro.svg';
import decorRetro2 from '../assets/images/decor-retro2.svg';
import globe from '../assets/images/globe-1.svg';
import retroPattern from '../assets/images/retro-bg-pattern-v2.svg';
import grainOverlay from '../assets/images/grain.webp';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ─── Static constants ──────────────────────────────────────────────────────

const BOWLS       = [sotoMakasar, sotoBanjar, sotoBetawi, sotoKudus, sotoLamongan, sotoPadang];
const INGREDIENTS = [rempah, daging, santan, dagingSapi, jerukNipis, cabe, bawangRetro];
const DECORS      = [bungaRetro, starRetro, decorRetro, decorRetro2, globe];
const COLORS      = ['#eab308', '#c2410c', '#4d7c0f', '#f97316', '#451a03', '#84cc16', '#fbbf24'];

const BOWL_POS = [
  { top: '12%', left: '10%' },
  { top: '72%', left: '8%'  },
  { top: '15%', left: '78%' },
  { top: '68%', left: '76%' },
  { top: '42%', left: '4%'  },
  { top: '38%', left: '86%' },
];

const BLOBS = [
  { w: 500, h: 380, color: '#eab308', top: '8%',  left: '5%',  br: '60% 40% 55% 45%' },
  { w: 320, h: 420, color: '#c2410c', top: '58%', left: '72%', br: '45% 55% 40% 60%' },
  { w: 450, h: 300, color: '#4d7c0f', top: '78%', left: '18%', br: '55% 45% 62% 38%' },
  { w: 280, h: 360, color: '#f97316', top: '5%',  left: '58%', br: '38% 62% 45% 55%' },
  { w: 480, h: 260, color: '#451a03', top: '32%', left: '42%', br: '50% 50% 38% 62%' },
  { w: 350, h: 450, color: '#84cc16', top: '82%', left: '55%', br: '62% 38% 55% 45%' },
  { w: 260, h: 300, color: '#fbbf24', top: '22%', left: '32%', br: '42% 58% 48% 52%' },
  { w: 400, h: 220, color: '#eab308', top: '62%', left: '38%', br: '56% 44% 40% 60%' },
];

const DECOR_POS = [
  { top: '10%', left: '88%', size: '9vw'  },
  { top: '80%', left: '4%',  size: '10vw' },
  { top: '48%', left: '92%', size: '8vw'  },
  { top: '20%', left: '2%',  size: '11vw' },
  { top: '70%', left: '62%', size: '7vw'  },
];

// Target penyebaran konfeti (Diperbanyak agar memenuhi ruang)
const ING_TARGETS = [
  { x: -380, y: -250, r: 45,   s: 1.2  },
  { x:  380, y: -220, r: -30,  s: 1.0  },
  { x: -250, y:  300, r: 120,  s: 1.4  },
  { x:  420, y:  260, r: -80,  s: 0.9  },
  { x: -450, y:   40, r: 160,  s: 1.1  },
  { x:  250, y: -350, r: -150, s: 1.3  },
  { x:  120, y:  380, r:  90,  s: 1.0  },
  { x: -320, y: -380, r: -45,  s: 0.8  },
  { x:  480, y:  120, r:  30,  s: 1.1  },
  { x: -500, y:  160, r: -120, s: 0.9  },
  { x:  180, y: -400, r:  60,  s: 1.15 },
  { x: -150, y:  400, r: -90,  s: 0.9  },
  { x:  450, y:  -80, r:  45,  s: 1.25 },
  { x:  -80, y: -420, r: -60,  s: 0.85 },
];

const CULTURE_TARGETS = [
  { x: -260, y: -200, r: -18 },
  { x:  240, y: -180, r:  22 },
  { x: -200, y:  220, r:  -8 },
  { x:  280, y:  190, r:  15 },
  { x: -320, y:   20, r: -12 },
  { x:  180, y: -280, r:  20 },
];

const BOWL_PHASE1 = [
  { x: -160, y: -140, r: -12 },
  { x:  180, y: -160, r:   8 },
  { x: -200, y:  160, r: -18 },
  { x:  190, y:  150, r:  14 },
  { x: -150, y:   50, r:  -8 },
  { x:  170, y:  -50, r:  20 },
];

const PHASE1_TARGETS = [
  { x: -200, y: -220, r: -30 },
  { x:  260, y: -200, r:  20 },
  { x: -180, y:  240, r: -40 },
  { x:  280, y:  220, r:  30 },
  { x: -240, y:   80, r: -20 },
  { x:  220, y: -100, r:  45 },
];

const BOWL_PHASE2 = [
  { x: -350, y: -260, r: -25 },
  { x:  320, y: -280, r:  15 },
  { x: -300, y:  280, r: -30 },
  { x:  340, y:  260, r:  22 },
  { x: -260, y:   80, r: -15 },
  { x:  300, y:  -80, r:  35 },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function Unity() {
  const spacerRef  = useRef(null);
  const panelRef   = useRef(null);

  const bowlRefs    = useRef([]);
  const blobRefs    = useRef([]);
  const decorRefs   = useRef([]);
  const islandRefs  = useRef([]);
  const ingRefs     = useRef([]);
  const cultureRefs = useRef([]);
  const funkyLinesRef = useRef(null);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const sotoRef  = useRef(null);

  const lines = storyContent.unity.lines;

  useEffect(() => {
    const bowls    = bowlRefs.current.filter(Boolean);
    const blobs    = blobRefs.current.filter(Boolean);
    const decors   = decorRefs.current.filter(Boolean);
    const islands  = islandRefs.current.filter(Boolean);
    const ings     = ingRefs.current.filter(Boolean);
    const cultures = cultureRefs.current.filter(Boolean);

    // ── Initial states ──────────────────────────────────────────────────
    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current,
              text4Ref.current, text5Ref.current], { autoAlpha: 0, y: 50 });
    gsap.set(sotoRef.current,  { autoAlpha: 0, scale: 0.3, rotation: -15 });
    gsap.set(islands,          { autoAlpha: 0, scale: 0 });
    
    // Bahan-bahan disiapkan sangat kecil di tengah sebelum konfeti
    gsap.set(ings,             { autoAlpha: 0, x: 0, y: 0, scale: 0.1, rotation: 0 });
    gsap.set(cultures,         { autoAlpha: 0, scale: 0 });
    
    // Container wavy lines visible, tapi semua jalurnya "tersembunyi" pakai dashoffset
    gsap.set(funkyLinesRef.current, { autoAlpha: 1 });

    // ── Ambient float ───────────────────────────────────────────────────
    gsap.to(bowls, {
      y: 'random(-18, 18)', x: 'random(-10, 10)', rotation: 'random(-8, 8)',
      duration: 'random(2, 4)', repeat: -1, yoyo: true, ease: 'sine.inOut',
      stagger: { each: 0.4, from: 'random' },
    });
    gsap.to(blobs, {
      scale: 'random(0.9, 1.15)', x: 'random(-30, 30)', y: 'random(-30, 30)',
      duration: 'random(4, 8)', repeat: -1, yoyo: true, ease: 'sine.inOut',
      stagger: { each: 0.6, from: 'random' },
    });
    gsap.to(decors, {
      rotation: 'random(-15, 15)', y: 'random(-20, 20)',
      duration: 'random(3, 5)', repeat: -1, yoyo: true, ease: 'sine.inOut',
      stagger: { each: 0.5, from: 'random' },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panelRef.current,
        start: 'top top',
        end: '+=500%',
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // ═══ PHASE 0 ─ "Each bowl tells a different story." ════════════════
    tl.to(text1Ref.current, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 0)
      .to(bowls, {
        x: (i) => BOWL_PHASE1[i]?.x ?? 0,
        y: (i) => BOWL_PHASE1[i]?.y ?? 0,
        rotation: (i) => BOWL_PHASE1[i]?.r ?? 0,
        duration: 2, ease: 'power1.inOut', stagger: 0.08,
      }, 0.5)
      .to(text1Ref.current, { autoAlpha: 0, y: -40, duration: 1 }, '+=0.8');

    // ═══ TRANSITION - Psychedelic funky lines appear! ══════════════════
    tl.to('.funky-path', {
      strokeDashoffset: 0, // Garis seakan-akan digambar pelan-pelan
      duration: 2.5,
      ease: 'power2.inOut',
      stagger: 0.15
    }, '-=0.5');

    // ═══ PHASE 1 ─ "Different islands." (Motion Path Mangkuk) ══════════
    tl.to(text2Ref.current, { autoAlpha: 1, y: 0, duration: 1.4, ease: 'back.out(1.7)' }, '<0.5')
      .to(bowls, {
        // Mangkuk menggunakan jalur melengkung (tidak lurus)
        motionPath: {
          path: (i) => {
            const start = BOWL_PHASE1[i] || { x: 0, y: 0 };
            const end = PHASE1_TARGETS[i] || { x: 0, y: 0 };
            // Titik kendali untuk menciptakan kurva unik tiap mangkuk
            const controlPointX = start.x + (i % 2 === 0 ? -120 : 120);
            const controlPointY = start.y + (i % 2 === 0 ? 150 : -150);
            return [
              { x: controlPointX, y: controlPointY },
              { x: end.x, y: end.y }
            ];
          },
          curviness: 1.5,
        },
        rotation: (i) => PHASE1_TARGETS[i]?.r ?? 0,
        ease: 'sine.inOut', duration: 3.5, stagger: 0.15,
      }, '<0.2')
      .to(islands, {
        autoAlpha: 1, scale: 1,
        x: (i) => [-220, 200, -160, 180, -50][i] ?? 0,
        y: (i) => [-180, -140, 160, 170, -80][i] ?? 0,
        rotation: (i) => [-15, 10, -8, 18, -5][i] ?? 0,
        stagger: 0.1, duration: 1.4, ease: 'back.out(2)',
      }, '-=1.8')
      .to(text2Ref.current, { autoAlpha: 0, y: -40, duration: 1 }, '+=0.5');

    // ═══ PHASE 2 ─ "Different ingredients." (Confetti Burst!) ══════════
    tl.to(text3Ref.current, { autoAlpha: 1, y: 0, duration: 1.4, ease: 'back.out(1.7)' })
      .to(bowls, {
        x: (i) => BOWL_PHASE2[i]?.x ?? 0,
        y: (i) => BOWL_PHASE2[i]?.y ?? 0,
        rotation: (i) => BOWL_PHASE2[i]?.r ?? 0,
        ease: 'power2.inOut', duration: 2.5, stagger: 0.08,
      }, '<')
      .to(ings, {
        autoAlpha: 1,
        // Menyebar jauh layaknya konfeti yang ringan & penuh energi
        x: (i) => ING_TARGETS[i % ING_TARGETS.length].x * gsap.utils.random(1.2, 1.6),
        y: (i) => ING_TARGETS[i % ING_TARGETS.length].y * gsap.utils.random(1.2, 1.6),
        rotation: (i) => ING_TARGETS[i % ING_TARGETS.length].r + gsap.utils.random(-200, 200),
        scale: (i) => ING_TARGETS[i % ING_TARGETS.length].s * gsap.utils.random(0.9, 1.4),
        stagger: { amount: 0.4, from: 'center' }, // Meledak dari tengah!
        duration: 2.8, 
        ease: 'back.out(2.5)', // Spring effect tinggi (bouncy)
      }, '-=2.2')
      .to(text3Ref.current, { autoAlpha: 0, y: -40, duration: 1 }, '+=0.8');

    // ═══ PHASE 3 ─ "Different philosophies." ═══════════════════════════
    tl.to(text4Ref.current, { autoAlpha: 1, y: 0, duration: 1.4, ease: 'back.out(1.5)' })
      .to([...bowls, ...ings], {
        x: (i) => gsap.utils.wrap(
          [-400, 360, -320, 340, -280, 320, -380, 350, -250, 310, -190, 290, -360, 380,
           -420, 370, -310, 350, -270, 330], i),
        y: (i) => gsap.utils.wrap(
          [-300, -280, 300, 290, 100, -120, -260, 260, 80, -100, 320, -310, 200, -200,
           -290, 270, 310, -300, 90, -110], i),
        rotation: (i) => gsap.utils.wrap(
          [-35, 25, -45, 35, -20, 40, -160, 150, -90, 80, 120, -130, 55, -60,
           -40, 30, -50, 45, -25, 50], i),
        ease: 'sine.inOut', duration: 3, stagger: 0.06,
      }, '<')
      .to(cultures, {
        autoAlpha: 1, scale: 1,
        x: (i) => CULTURE_TARGETS[i].x,
        y: (i) => CULTURE_TARGETS[i].y,
        rotation: (i) => CULTURE_TARGETS[i].r,
        stagger: { amount: 0.7, from: 'random' },
        duration: 1.8, ease: 'back.out(2)',
      }, '-=1.8')
      .to(text4Ref.current, { autoAlpha: 0, y: -40, duration: 1 }, '+=0.5');

    // ═══ PHASE 4 ─ Grand Vortex ════════════════════════════════════════
    tl.to([...bowls, ...ings, ...islands, ...cultures], {
        x: 0, y: 0, scale: 0.05, rotation: '+=480', autoAlpha: 0,
        stagger: { amount: 1.5, from: 'random' },
        duration: 4, ease: 'power3.in',
      })
      .to(blobs, {
        scale: 0.05, rotation: '-=360', autoAlpha: 0,
        stagger: 0.05, duration: 4, ease: 'power3.in',
      }, '<')
      .to(decors, {
        scale: 0.1, autoAlpha: 0, rotation: '+=180',
        stagger: 0.06, duration: 2.5, ease: 'power2.in',
      }, '<0.5')
      .to('.funky-path', {
        autoAlpha: 0, duration: 1.5 // Garis menghilang
      }, '<0.5');

    // ═══ PHASE 5 ─ "Yet they all share the same name." ══════════════════
    tl.to(text5Ref.current, { autoAlpha: 1, y: 0, duration: 2, ease: 'expo.out' });

    // ═══ PHASE 6 ─ SOTO grand finale ════════════════════════════════════
    tl.to(text5Ref.current, { autoAlpha: 0, y: -40, duration: 1 }, '+=0.6')
      .to(blobs, {
        autoAlpha: 0.5,
        scale: (i) => [1.8, 2.2, 1.5, 2.5, 1.3, 1.9, 2.0, 1.6][i] ?? 1.5,
        rotation: '+=180', stagger: 0.07, duration: 3, ease: 'expo.out',
      }, '<')
      .to(decors, {
        autoAlpha: 0.65, scale: 1, rotation: '+=20',
        stagger: 0.1, duration: 2.5, ease: 'back.out(1.4)',
      }, '<')
      .to(bowls, {
        x: (i) => [-500, 420, -380, 460, -440, 390][i] ?? 0,
        y: (i) => [-320, -340, 340, 320, 120, -130][i] ?? 0,
        scale: 0.5, autoAlpha: 0.25, rotation: '+=360',
        stagger: 0.1, duration: 2.5, ease: 'back.out(1.2)',
      }, '<0.3')
      .to(sotoRef.current, {
        autoAlpha: 1, scale: 1, rotation: 0,
        duration: 2.5, ease: 'elastic.out(1, 0.5)',
      }, '-=1.5');

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf([
        ...bowls, ...blobs, ...decors, ...islands, ...ings, ...cultures,
        text1Ref.current, text2Ref.current, text3Ref.current,
        text4Ref.current, text5Ref.current, sotoRef.current,
        '.funky-path'
      ].filter(Boolean));
    };
  }, []);

  const S = {
    outer: {
      position: 'relative',
      width: '100%',
    },
    panel: {
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#FFF1D6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    textCenter: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '24px',
      textAlign: 'center',
      pointerEvents: 'none',
    },
  };

  return (
    <div ref={spacerRef} style={S.outer}>
      <div ref={panelRef} style={S.panel}>

        {/* ── Texture Overlays ─────────────────────────────────────── */}
        <img src={retroPattern} alt="" style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', opacity:0.4, mixBlendMode:'multiply', zIndex:0,
        }}/>
        <img src={grainOverlay} alt="" style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', opacity:0.22, mixBlendMode:'multiply', zIndex:0,
        }}/>

        {/* ── Wavy Groovy Lines (Animate Draw) ─────────────────────── */}
        <svg ref={funkyLinesRef} viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            opacity:0.25, zIndex:1, pointerEvents:'none' }}>
          {[...Array(9)].map((_, i) => (
            <path key={i} className="funky-path"
              d={`M-100,${70 + i*85} C180,${30 + i*85} 420,${120 + i*85} 600,${75 + i*85} S920,${18 + i*85} 1300,${85 + i*85}`}
              fill="none" stroke={COLORS[i % COLORS.length]}
              strokeWidth={i%2===0 ? 3.5 : 2}
              // Trick untuk memunculkan garis dengan animasi GSAP strokeDashoffset
              strokeDasharray="100" strokeDashoffset="100" pathLength="100"
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <circle key={`circle-${i}`} className="funky-path"
              cx={120 + i*240} cy={400 + (i%2===0 ? -140 : 140)}
              r={35 + i*18} fill="none" stroke={COLORS[(i+2)%COLORS.length]}
              strokeWidth="2.5" 
              strokeDasharray="100" strokeDashoffset="100" pathLength="100"
              opacity="0.85"/>
          ))}
        </svg>

        {/* ── Background Blobs ──────────────────────────────────────── */}
        {BLOBS.map((b, i) => (
          <div key={`blob-${i}`}
            ref={(el) => (blobRefs.current[i] = el)}
            style={{
              position: 'absolute',
              width: b.w, height: b.h,
              backgroundColor: b.color,
              top: b.top, left: b.left,
              transform: 'translate(-50%, -50%)',
              borderRadius: b.br,
              opacity: 0.55,
              mixBlendMode: 'multiply',
              filter: 'blur(48px)',
              zIndex: 1,
            }}
          />
        ))}

        {/* ── Background Decors ─────────────────────────────────────── */}
        {DECOR_POS.map((d, i) => (
          <img key={`decor-${i}`}
            ref={(el) => (decorRefs.current[i] = el)}
            src={DECORS[i % DECORS.length]} alt=""
            style={{
              position: 'absolute',
              top: d.top, left: d.left,
              width: d.size, maxWidth: '115px',
              opacity: 0.55, zIndex: 5,
              filter: 'drop-shadow(2px 4px 8px rgba(69,26,3,0.25))',
            }}
          />
        ))}

        {/* ── Bowls ─────────────────────────────────────────────────── */}
        {BOWLS.map((bowl, i) => (
          <img key={`bowl-${i}`}
            ref={(el) => (bowlRefs.current[i] = el)}
            src={bowl} alt={`Soto ${i+1}`}
            style={{
              position: 'absolute',
              top: BOWL_POS[i].top, left: BOWL_POS[i].left,
              width: `${13 + (i%3)*2}vw`, maxWidth: '155px',
              zIndex: 20,
              filter: 'drop-shadow(3px 6px 14px rgba(69,26,3,0.3))',
            }}
          />
        ))}

        {/* ── Island Decors ─────────────────────────────────────────── */}
        {[...Array(5)].map((_, i) => (
          <div key={`island-${i}`}
            ref={(el) => (islandRefs.current[i] = el)}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 15, padding: '12px', borderRadius: '24px',
              border: '4px dashed #FFF1D6',
              backgroundColor: COLORS[i % COLORS.length],
              opacity: 0,
            }}>
            <img src={globe} alt="" style={{ width: `${6+i}vw`, maxWidth: '72px' }}/>
          </div>
        ))}

        {/* ── Ingredient Confetti (Diperbanyak) ─────────────────────── */}
        {[...INGREDIENTS, ...INGREDIENTS].map((ing, i) => (
          <img key={`ing-${i}`}
            ref={(el) => (ingRefs.current[i] = el)}
            src={ing} alt=""
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: i < INGREDIENTS.length ? `${7+(i%4)}vw` : `${5+(i%3)}vw`,
              maxWidth: i < INGREDIENTS.length ? '85px' : '65px',
              zIndex: 30, opacity: 0,
              filter: 'drop-shadow(2px 4px 8px rgba(69,26,3,0.2))',
            }}
          />
        ))}

        {/* ── Culture Doodles ───────────────────────────────────────── */}
        {[...Array(6)].map((_, i) => (
          <img key={`culture-${i}`}
            ref={(el) => (cultureRefs.current[i] = el)}
            src={DECORS[i % DECORS.length]} alt=""
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${11+(i%3)*2}vw`, maxWidth: '125px',
              zIndex: 25, opacity: 0,
              padding: '10px', border: '4px dashed #c2410c',
              borderRadius: '50%', background: 'rgba(255,245,225,0.9)',
              boxShadow: '0 4px 20px rgba(69,26,3,0.15)',
            }}
          />
        ))}

        {/* ── Texts ─────────────────────────────────────────────────── */}
        <div style={S.textCenter}>

          <p ref={text1Ref} style={{
            position:'absolute', opacity:0,
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2rem, 5.5vw, 5rem)',
            fontWeight: 900, color: '#451a03',
            lineHeight: 1.1, textTransform: 'uppercase',
            textShadow: '3px 3px 0 rgba(255,241,214,0.85)',
            maxWidth: '80vw',
          }}>
            {lines[0]}
          </p>

          <h2 ref={text2Ref} style={{
            position:'absolute', opacity:0,
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            fontWeight: 900, color: '#c2410c',
            lineHeight: 1, textTransform: 'uppercase', fontStyle: 'italic',
            WebkitTextStroke: '2px #fff',
            filter: 'drop-shadow(6px 6px 0 rgba(69,26,3,0.6))',
          }}>
            {lines[1]}
          </h2>

          <h2 ref={text3Ref} style={{
            position:'absolute', opacity:0,
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            fontWeight: 900, color: '#4d7c0f',
            lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.03em',
            WebkitTextStroke: '2px #FFF5E1',
            filter: 'drop-shadow(6px 6px 0 rgba(69,26,3,0.5))',
          }}>
            {lines[2]}
          </h2>

          <h2 ref={text4Ref} style={{
            position:'absolute', opacity:0,
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.5rem, 8vw, 8rem)',
            fontWeight: 900, color: '#eab308',
            lineHeight: 1.05, textTransform: 'uppercase',
            textShadow: '5px 5px 0 #451a03, -2px -2px 0 #451a03',
          }}>
            {lines[3]}
          </h2>

          <div ref={text5Ref} style={{ position:'absolute', opacity:0 }}>
            <h2 style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(1.8rem, 5vw, 4.8rem)',
              fontWeight: 900, color: '#451a03',
              lineHeight: 1.15, textTransform: 'uppercase',
              background: '#FFF5E1',
              padding: 'clamp(1.2rem, 2.5vw, 2.2rem) clamp(2rem, 5vw, 4rem)',
              border: '6px dashed #c2410c', borderRadius: '50px',
              boxShadow: '8px 8px 0 #c2410c',
              textAlign: 'center', maxWidth: '80vw',
            }}>
              {lines[4]}
            </h2>
          </div>

          <h1 ref={sotoRef} style={{
            position:'absolute', opacity:0,
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(14vw, 20vw, 26vw)',
            fontWeight: 900, lineHeight: 0.88,
            textTransform: 'uppercase', letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #c2410c 0%, #eab308 45%, #4d7c0f 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            WebkitTextStroke: '4px #451a03',
            filter: 'drop-shadow(10px 10px 0 rgba(69,26,3,0.35))',
          }}>
            SOTO
          </h1>

        </div>
      </div>
    </div>
  );
}