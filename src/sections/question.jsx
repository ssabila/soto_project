import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import imgSereh      from '../assets/images/sereh.webp'
import imgSoto       from '../assets/images/soto.webp'
import imgAsap       from '../assets/images/asap.webp'
import imgBawangM    from '../assets/images/bawang-merah.webp'
import imgBawangP    from '../assets/images/bawang-putih.webp'
import imgDaunJeruk  from '../assets/images/daun-jeruk.webp'
import imgGrain      from '../assets/images/grain.webp'
import imgKunyit     from '../assets/images/kunyit.webp'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────
   INGREDIENT DATA
   used in Scene A — floating one-by-one as user scrolls
───────────────────────────────────────────────────────────── */
const INGREDIENTS = [
  { src: imgBawangM,   name: 'Bawang Merah', rot: -14, size: 140 },
  { src: imgBawangP,   name: 'Bawang Putih', rot:  10, size: 120 },
  { src: imgSereh,     name: 'Sereh',         rot:  -8, size: 160 },
  { src: imgDaunJeruk, name: 'Daun Jeruk',    rot:  12, size: 130 },
  { src: imgKunyit,    name: 'Kunyit',         rot:  -6, size: 150 },
]

/* ─────────────────────────────────────────────────────────────
   POSITIONS — scattered around stage (% units)
   [top, left] in viewport percent
───────────────────────────────────────────────────────────── */
const ING_POS = [
  { top: '12%', left: '6%'  },
  { top: '60%', left: '4%'  },
  { top: '22%', right: '5%' },
  { top: '68%', right: '6%' },
  { top: '42%', left: '8%'  },
]

export default function QuestionSection() {
  const pinWrapRef  = useRef(null)
  const stageRef    = useRef(null)

  // Scene A refs
  const saEyebrowRef = useRef(null)
  const saLine1Ref   = useRef(null)
  const saLine2Ref   = useRef(null)
  const saRuleRef    = useRef(null)
  const saStampTL    = useRef(null)
  const saStampTR    = useRef(null)
  const saAsterisk   = useRef(null)
  // individual ingredient image refs (5 items)
  const ingRefs      = useRef(INGREDIENTS.map(() => ({ img: null, label: null })))

  // Scene B refs
  const sbSceneRef  = useRef(null)
  const sbLabelRef  = useRef(null)
  const sbWordRefs  = useRef([null, null, null, null])
  const sbBodyRef   = useRef(null)
  const sbTicketRef = useRef(null)

  // Scene C refs
  const scSceneRef   = useRef(null)
  const scSotoRef    = useRef(null)
  const scAsapRef    = useRef(null)
  const scEyebrowRef = useRef(null)
  const scDividerRef = useRef(null)
  const scWordRefs   = useRef([null, null, null, null])
  const scSotoWordRef= useRef(null)
  const scSubRef     = useRef(null)

  const pipRefs     = useRef([null, null, null])
  const scrollCueRef= useRef(null)
  const currentScene= useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ══ UTILITIES ═══════════════════════════════════════════════ */
      function jitter(targets, { delay = 0, stagger = 0.1, dur = 0.7 } = {}) {
        const els = Array.isArray(targets) ? targets : [targets]
        return gsap.fromTo(els.filter(Boolean),
          {
            opacity:  0,
            y:        () => gsap.utils.random(30, 60),
            x:        () => gsap.utils.random(-8, 8),
            rotation: () => gsap.utils.random(-6, 6),
            skewX:    () => gsap.utils.random(-4, 4),
          },
          {
            opacity: 1, y: 0, x: 0, rotation: 0, skewX: 0,
            duration: dur, delay,
            stagger: { each: stagger, ease: 'power2.inOut' },
            ease: 'back.out(1.5)',
          }
        )
      }

      function microLive(el, amp = 1, spd = 3.8) {
        if (!el) return
        gsap.to(el, {
          x: `+=${amp}`, y: `+=${amp * 0.5}`, rotation: `+=${amp * 0.4}`,
          duration: spd, ease: 'sine.inOut', yoyo: true, repeat: -1,
          delay: Math.random() * 2,
        })
      }

      function setPip(i) {
        pipRefs.current.forEach((p, j) => {
          if (!p) return
          p.style.opacity    = j === i ? '0.9' : '0.22'
          p.style.transform  = j === i ? 'scale(1.6)' : 'scale(1)'
          p.style.background = j === i ? '#c2380f' : '#5a4220'
        })
      }

      /* ══ SCENE A helpers ═════════════════════════════════════════ */
      // reset A elements to hidden
      function resetA() {
        gsap.set(saEyebrowRef.current, { opacity: 0 })
        gsap.set(saRuleRef.current, { width: 0 })
        gsap.set([saStampTL.current, saStampTR.current, saAsterisk.current], { opacity: 0 })
        stageRef.current?.querySelectorAll('.sa-word').forEach(w => gsap.set(w, { opacity: 0 }))
        ingRefs.current.forEach(r => {
          if (r.img)   gsap.set(r.img,   { opacity: 0, scale: 0.5, rotation: gsap.utils.random(-20, 20) })
          if (r.label) gsap.set(r.label, { opacity: 0 })
        })
      }

      function playSceneA_In() {
        const tl = gsap.timeline()
        tl.fromTo(saEyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' })
        tl.add(jitter(
          [...saLine1Ref.current.querySelectorAll('.sa-word'),
           ...saLine2Ref.current.querySelectorAll('.sa-word')],
          { stagger: 0.14, dur: 0.78 }
        ), '-=0.8')
        tl.to(saRuleRef.current, { width: 'clamp(120px,22vw,240px)', duration: 1, ease: 'power3.out' }, '-=0.4')
        tl.fromTo([saStampTL.current, saStampTR.current],
          { opacity: 0, scale: 0.55 },
          { opacity: 1, scale: 1, stagger: 0.35, duration: 0.8, ease: 'back.out(2)' }, '-=0.8')
        tl.fromTo(saAsterisk.current,
          { opacity: 0, scale: 0.3, rotation: -90 },
          { opacity: 0.5, scale: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1,0.6)' }, '-=1')

        // ingredients appear ONE BY ONE with staggered delay
        ingRefs.current.forEach((r, i) => {
          tl.fromTo(r.img,
            { opacity: 0, scale: 0.4, rotation: gsap.utils.random(-25, 25), y: 30 },
            { opacity: 1, scale: 1, rotation: INGREDIENTS[i].rot,
              y: 0, duration: 1.0, ease: 'elastic.out(1,0.55)' },
            `-=${i === 0 ? 0.3 : -0.1}` // each after the previous by 0.1s gap
          )
          tl.fromTo(r.label,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.6')
        })

        tl.call(() => {
          stageRef.current?.querySelectorAll('.sa-word').forEach(w => microLive(w, 1.0, 3.5))
          microLive(saAsterisk.current, 2.5, 6)
          microLive(saStampTL.current, 0.5, 4.5)
          microLive(saStampTR.current, 0.5, 5)
          ingRefs.current.forEach((r, i) => microLive(r.img, 1.2 + i * 0.3, 4 + i * 0.5))
        })
      }

      function playSceneA_Out() {
        // headline words scatter
        const words = [...(stageRef.current?.querySelectorAll('.sa-word') ?? [])]
        gsap.to(words, {
          opacity: 0,
          rotation: () => gsap.utils.random(-30, 30),
          scale: 0.3,
          y: () => gsap.utils.random(-80, 80),
          x: () => gsap.utils.random(-40, 40),
          stagger: { each: 0.06, from: 'random' },
          duration: 0.55, ease: 'power2.in',
        })
        // ingredients SPIN OUT dramatically
        ingRefs.current.forEach((r, i) => {
          gsap.to(r.img, {
            opacity: 0,
            rotation: `+=${gsap.utils.random(200, 360)}`,
            scale: 0,
            duration: 0.6 + i * 0.08,
            delay: i * 0.06,
            ease: 'power2.in',
          })
          gsap.to(r.label, { opacity: 0, duration: 0.3, delay: i * 0.05 })
        })
        gsap.to([saEyebrowRef.current, saRuleRef.current,
                 saStampTL.current, saStampTR.current, saAsterisk.current],
          { opacity: 0, duration: 0.4, stagger: 0.05 })
      }

      /* ══ SCENE B helpers ═════════════════════════════════════════ */
      function resetB() {
        gsap.set([sbLabelRef.current, sbBodyRef.current, sbTicketRef.current,
                  ...sbWordRefs.current.filter(Boolean)], { opacity: 0 })
      }

      function playSceneB_In() {
        gsap.set(sbSceneRef.current, { opacity: 1, pointerEvents: 'auto' })
        const tl = gsap.timeline()
        tl.fromTo(sbLabelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
        tl.add(jitter(sbWordRefs.current.filter(Boolean), { stagger: 0.14, dur: 0.72 }), '-=0.5')
        tl.fromTo(sbBodyRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, '-=0.3')
        tl.fromTo(sbTicketRef.current,
          { opacity: 0, scale: 0.5, rotation: -8 },
          { opacity: 1, scale: 1, rotation: -1.5, duration: 0.8, ease: 'back.out(2)' }, '-=0.3')
        tl.call(() => {
          sbWordRefs.current.filter(Boolean).forEach(w => microLive(w, 0.9, 3.2))
          microLive(sbTicketRef.current, 1, 5)
        })
      }

      function playSceneB_Out(onDone) {
        gsap.to(sbSceneRef.current, {
          opacity: 0, duration: 0.45, ease: 'power2.in',
          onComplete() {
            gsap.set(sbSceneRef.current, { pointerEvents: 'none' })
            resetB()
            onDone?.()
          },
        })
      }

      /* ══ SCENE C helpers ═════════════════════════════════════════ */
      function resetC() {
        gsap.set([scSotoRef.current, scAsapRef.current,
                  scEyebrowRef.current, scDividerRef.current,
                  scSotoWordRef.current, scSubRef.current,
                  ...scWordRefs.current.filter(Boolean)], { opacity: 0 })
      }

      function playSceneC_In() {
        gsap.set(scSceneRef.current, { opacity: 1, pointerEvents: 'auto' })
        const tl = gsap.timeline()

        // soto bowl rises up with steam
        tl.fromTo(scSotoRef.current,
          { opacity: 0, y: 60, scale: 0.75 },
          { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power3.out' })

        // asap (steam image) fades in and drifts upward forever
        tl.fromTo(scAsapRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.85, y: 0, duration: 1.5, ease: 'power2.out' }, '-=1.2')

        // start perpetual steam drift
        gsap.to(scAsapRef.current, {
          y: -30, opacity: 0.4, duration: 3.5,
          ease: 'power1.inOut', yoyo: true, repeat: -1,
        })
        gsap.to(scAsapRef.current, {
          x: 8, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1,
        })

        tl.fromTo([scEyebrowRef.current, scDividerRef.current],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: 'power2.out' }, '-=0.8')
        tl.add(jitter(scWordRefs.current.filter(Boolean), { stagger: 0.14, dur: 0.72 }), '-=0.5')
        tl.fromTo(scSotoWordRef.current,
          { opacity: 0, y: 70, scaleY: 1.5, scaleX: 0.6 },
          { opacity: 1, y: 0, scaleY: 1, scaleX: 1, duration: 1.4, ease: 'elastic.out(1,0.5)' }, '-=0.2')
        tl.fromTo(scSubRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '-=0.4')

        tl.call(() => {
          microLive(scSotoRef.current, 1.5, 5)
          scWordRefs.current.filter(Boolean).forEach(w => microLive(w, 0.9, 3.5))
          microLive(scSotoWordRef.current, 1.6, 4)
          gsap.to(scSotoWordRef.current, {
            color: ['#ff9721', '#f63b1c', '#ff9721'],
            duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
          })
        })
      }

      function playSceneC_Out(onDone) {
        gsap.to(scSceneRef.current, {
          opacity: 0, duration: 0.45, ease: 'power2.in',
          onComplete() {
            gsap.set(scSceneRef.current, { pointerEvents: 'none' })
            resetC()
            onDone?.()
          },
        })
      }

      /* ══ INIT ════════════════════════════════════════════════════ */
      gsap.set(sbSceneRef.current, { opacity: 0, pointerEvents: 'none' })
      gsap.set(scSceneRef.current, { opacity: 0, pointerEvents: 'none' })
      resetA()
      resetB()
      resetC()

      pinWrapRef.current.style.height = window.innerHeight * 3.5 + 'px'

      playSceneA_In()
      setPip(0)

      gsap.set(scrollCueRef.current, { opacity: 0 })
      gsap.to(scrollCueRef.current, { opacity: 1, duration: 1.2, delay: 2.8 })
      gsap.to(scrollCueRef.current, { y: 9, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      /* ══ SCROLL ORCHESTRATION ════════════════════════════════════ */
      ScrollTrigger.create({
        trigger: pinWrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate(self) {
          const p = self.progress
          let target = 0
          if (p >= 0.28 && p < 0.60) target = 1
          if (p >= 0.60)              target = 2

          if (target === currentScene.current) return
          const prev = currentScene.current
          currentScene.current = target
          setPip(target)
          gsap.to(scrollCueRef.current, { opacity: 0, duration: 0.3 })

          // A → B
          if (prev === 0 && target === 1) {
            playSceneA_Out()
            setTimeout(() => playSceneB_In(), 520)
          }
          // B → A
          if (prev === 1 && target === 0) {
            playSceneB_Out(() => { resetA(); playSceneA_In() })
          }
          // B → C
          if (prev === 1 && target === 2) {
            playSceneB_Out(() => playSceneC_In())
          }
          // C → B
          if (prev === 2 && target === 1) {
            playSceneC_Out(() => { resetB(); playSceneB_In() })
          }
          // A → C fast scroll
          if (prev === 0 && target === 2) {
            playSceneA_Out()
            setTimeout(() => playSceneC_In(), 520)
          }
          // C → A
          if (prev === 2 && target === 0) {
            playSceneC_Out(() => { resetA(); playSceneA_In() })
          }
        },
      })
    }, pinWrapRef)

    return () => ctx.revert()
  }, [])

  /* ════════════════════════════════════════════════════════════
     JSX
  ════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── progress pips ── */}
      <div style={S.pips}>
        {[0, 1, 2].map(i => (
          <div key={i} ref={el => pipRefs.current[i] = el}
            style={{ ...S.pip, ...(i === 0 ? S.pipActive : {}) }} />
        ))}
      </div>

      {/* ── scroll cue ── */}
      <div ref={scrollCueRef} style={S.scrollCue} aria-hidden="true">
        <span style={S.scrollTxt}>scroll</span>
        <span style={S.scrollLine} />
      </div>

      {/* ── PIN WRAPPER ── */}
      <div ref={pinWrapRef} style={S.pinWrap}>
        <div ref={stageRef} style={S.stage}>

          {/* grain texture overlay */}
          <img src={imgGrain} alt="" aria-hidden="true" style={S.grainOverlay} />
          {/* paper ruled lines */}
          <div style={S.ruledLines} />
          {/* left red margin line */}
          <div style={S.marginLine} />

          {/* ═══════ SCENE A ═══════ */}
          <div style={S.scene}>

            {/* corner stamps */}
            <div ref={saStampTL} style={{ ...S.stamp, top: 52, left: 'clamp(72px,10vw,140px)', transform: 'rotate(-5deg)' }}>
              Nusantara Collection
            </div>
            <div ref={saStampTR} style={{ ...S.stamp, top: 60, right: 'clamp(24px,5vw,80px)', transform: 'rotate(3deg)' }}>
              Est. Abad XVI
            </div>
            <div ref={saAsterisk} style={S.asterisk}>✳</div>

            {/* ── floating ingredient images scattered around stage ── */}
            {INGREDIENTS.map((ing, i) => (
              <div key={ing.name} style={{ ...S.ingWrap, ...ING_POS[i] }}>
                <img
                  ref={el => ingRefs.current[i].img = el}
                  src={ing.src} alt={ing.name}
                  style={{ ...S.ingImg, width: ing.size }}
                />
                <p ref={el => ingRefs.current[i].label = el} style={S.ingLabel}>
                  {ing.name}
                </p>
              </div>
            ))}

            {/* ── central headline ── */}
            <div style={S.sceneAContent}>
              <p ref={saEyebrowRef} style={S.eyebrow}>— Bab II : The Question —</p>
              <div style={S.lineWrap}>
                <div ref={saLine1Ref} style={S.headlineLine}>
                  {['How', 'can', 'one', 'dish'].map((w, i) => (
                    <span key={w} className="sa-word" style={{
                      ...S.headWord,
                      ...(i === 1 ? S.wordAccent : {}),
                      ...(i === 3 ? S.wordWarm   : {}),
                    }}>{w}</span>
                  ))}
                </div>
                <div ref={saLine2Ref} style={S.headlineLine}>
                  <span className="sa-word" style={S.headWord}>carry…</span>
                </div>
              </div>
              <div ref={saRuleRef} style={S.rule} />
            </div>
          </div>

          {/* ═══════ SCENE B — ingredients scattered + "so many different identities" ═══════ */}
          <div ref={sbSceneRef} style={{ ...S.scene, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p ref={sbLabelRef} style={{ ...S.eyebrow, marginBottom: 16 }}>Dari seluruh penjuru nusantara</p>
            <div style={S.lineWrap}>
              {[
                [['so', false], ['many', true]],
                [['different', false]],
                [['identities.', false]],
              ].map((line, li) => (
                <div key={li} style={S.headlineLine}>
                  {line.map(([w, it], wi) => {
                    const idx = li === 0 ? wi : li + 1
                    return (
                      <span key={w}
                        ref={el => sbWordRefs.current[li === 0 ? wi : li === 1 ? 2 : 3] = el}
                        style={{ ...S.headWord, fontSize: 'clamp(3rem,7.5vw,7rem)', ...(it ? S.wordAccent : {}) }}>
                        {w}
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
            <p ref={sbBodyRef} style={{ ...S.bodyText, marginTop: 20 }}>
              Setiap daerah membawa rempahnya sendiri.<br />
              Setiap tangan meninggalkan jejaknya sendiri.
            </p>
            <div ref={sbTicketRef} style={S.ticket}>
              <span style={S.ticketText}>6 Rempah · 34 Provinsi · 1 Nama</span>
            </div>
          </div>

          {/* ═══════ SCENE C — soto + asap + "What makes them all… soto?" ═══════ */}
          <div ref={scSceneRef} style={S.scene}>
            <div style={S.sceneCLayout}>

              {/* left: soto image + steam */}
              <div style={S.sotoImgWrap}>
                <img ref={scAsapRef} src={imgAsap} alt="" aria-hidden="true" style={S.asapImg} />
                <img ref={scSotoRef} src={imgSoto} alt="Semangkuk soto" style={S.sotoImg} />
              </div>

              {/* right: text */}
              <div style={S.sceneСText}>
                <p ref={scEyebrowRef} style={S.eyebrow}>— Pertanyaan Terakhir —</p>
                <div ref={scDividerRef} style={S.divider} />
                <div style={S.lineWrap}>
                  <div style={S.headlineLine}>
                    {['What', 'makes', 'them', 'all…'].map((w, i) => (
                      <span key={w}
                        ref={el => scWordRefs.current[i] = el}
                        style={{ ...S.headWord, fontSize: 'clamp(2.4rem,5vw,5rem)', ...(i >= 2 ? S.wordAccent : {}) }}>
                        {w}
                      </span>
                    ))}
                  </div>
                  <div>
                    <span ref={scSotoWordRef} style={S.sotoWord}>soto?</span>
                  </div>
                </div>
                <p ref={scSubRef} style={{ ...S.bodyText, maxWidth: 360, marginTop: 18 }}>
                  Jawaban ada di dalam mangkuk itu.<br />Selalu ada.
                </p>
              </div>
            </div>
          </div>

        </div>{/* /stage */}
      </div>{/* /pin-wrap */}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════════════ */
const Q = {
  cream : '#f9fdda', creamD: '#eee8b8',
  ink   : '#2a1f0e', ink2  : '#5a4220',
  rust  : '#c2380f', gold  : '#c9880a',
  orange: '#ff9721', yellow: '#fff073',
}

const S = {
  pinWrap : { position: 'relative', width: '100%' },

  stage: {
    position: 'sticky', top: 0,
    width: '100%', height: '100vh',
    overflow: 'hidden',
    backgroundColor: Q.cream,
  },

  /* paper texture */
  grainOverlay: {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    opacity: 0.18,
    mixBlendMode: 'multiply',
    zIndex: 1, pointerEvents: 'none',
  },
  ruledLines: {
    position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
    backgroundImage: `repeating-linear-gradient(
      to bottom,
      transparent 0px, transparent 38px,
      rgba(42,31,14,0.09) 38px, rgba(42,31,14,0.09) 39px
    )`,
  },
  marginLine: {
    position: 'absolute', top: 0, bottom: 0,
    left: 'clamp(48px,7vw,88px)', width: 2,
    background: 'rgba(194,56,15,0.18)',
    zIndex: 1, pointerEvents: 'none',
  },

  /* generic scene base */
  scene: {
    position: 'absolute', inset: 0, zIndex: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },

  /* stamps */
  stamp: {
    position: 'absolute',
    border: `2px solid ${Q.rust}`, color: Q.rust,
    fontFamily: 'InriaSerif, Lora, serif',
    fontSize: '0.55rem', letterSpacing: '0.22em',
    textTransform: 'uppercase', padding: '5px 10px',
    whiteSpace: 'nowrap', zIndex: 20,
  },
  asterisk: {
    position: 'absolute', bottom: '8%', right: 'clamp(20px,5vw,80px)',
    fontSize: '6.5rem', color: Q.yellow,
    fontFamily: 'Beachfly, Playfair Display, serif',
    textShadow: `3px 3px 0 ${Q.gold}`,
    lineHeight: 1, userSelect: 'none', zIndex: 20, willChange: 'transform',
  },

  /* ingredient floating images */
  ingWrap: {
    position: 'absolute', zIndex: 15,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    pointerEvents: 'none',
  },
  ingImg: {
    height: 'auto',
    filter: 'drop-shadow(0 8px 20px rgba(42,31,14,0.22))',
    willChange: 'transform, opacity',
    display: 'block',
  },
  ingLabel: {
    fontFamily: 'InriaSerif, Lora, serif',
    fontStyle: 'italic',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    color: Q.ink2,
    textTransform: 'uppercase',
    margin: 0,
    willChange: 'opacity',
  },

  /* scene A central content */
  sceneAContent: {
    position: 'relative', zIndex: 16,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', textAlign: 'center',
    padding: '0 clamp(20px,6vw,80px)',
  },

  eyebrow: {
    fontFamily: 'InriaSerif, Lora, serif',
    fontSize: 'clamp(0.58rem,1vw,0.72rem)',
    letterSpacing: '0.42em', textTransform: 'uppercase',
    color: Q.rust, marginBottom: 20,
    willChange: 'transform, opacity',
  },
  lineWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  headlineLine: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', lineHeight: 1.0 },
  headWord: {
    display: 'inline-block',
    fontFamily: 'Beachfly, Playfair Display, serif',
    fontWeight: 900,
    fontSize: 'clamp(4.2rem,10vw,9.2rem)',
    color: Q.ink, lineHeight: 1.0,
    letterSpacing: '-0.025em', paddingRight: '0.14em',
    willChange: 'transform, opacity',
  },
  wordAccent: { color: Q.rust, fontStyle: 'italic' },
  wordWarm  : { color: Q.orange },

  rule: {
    height: 3,
    background: `linear-gradient(90deg,${Q.rust},${Q.orange},${Q.gold})`,
    borderRadius: 2, marginTop: 14,
  },

  /* scene B */
  bodyText: {
    fontStyle: 'italic',
    fontSize: 'clamp(0.82rem,1.4vw,1rem)',
    color: Q.ink2, lineHeight: 1.8,
    fontFamily: 'InriaSerif, Lora, serif',
    textAlign: 'center',
  },
  ticket: {
    background: Q.yellow, border: `2px solid ${Q.ink}`,
    padding: '6px 16px', display: 'inline-block',
    transform: 'rotate(-1.5deg)', marginTop: 24,
    boxShadow: `3px 3px 0 ${Q.ink}`,
    willChange: 'transform, opacity',
  },
  ticketText: {
    fontFamily: 'InriaSerif, Lora, serif',
    fontSize: '0.6rem', letterSpacing: '0.22em',
    textTransform: 'uppercase', color: Q.ink,
  },

  /* scene C */
  sceneCLayout: {
    display: 'flex', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: 'clamp(24px,5vw,80px)',
    padding: '0 clamp(20px,6vw,80px)',
    width: '100%', maxWidth: 1100,
    flexWrap: 'wrap',
  },
  sotoImgWrap: {
    position: 'relative',
    flexShrink: 0,
    width: 'clamp(220px,35vw,440px)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
  },
  asapImg: {
    position: 'absolute',
    bottom: '70%', left: '10%', right: '10%',
    width: '80%',
    opacity: 0,
    objectFit: 'contain',
    filter: 'blur(1px)',
    willChange: 'transform, opacity',
    pointerEvents: 'none',
    zIndex: 2,
  },
  sotoImg: {
    width: '100%', height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 16px 40px rgba(42,31,14,0.3))',
    willChange: 'transform, opacity',
    position: 'relative', zIndex: 3,
  },
  sceneСText: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'flex-start', textAlign: 'left',
    flex: 1, minWidth: 240,
  },
  divider: {
    width: 1, height: 44, marginBottom: 20,
    background: `linear-gradient(to bottom, transparent, ${Q.gold}, transparent)`,
    willChange: 'opacity',
  },
  sotoWord: {
    display: 'inline-block',
    fontFamily: 'Beachfly, Playfair Display, serif', fontWeight: 900,
    fontSize: 'clamp(4rem,10vw,9rem)',
    color: Q.orange, fontStyle: 'italic',
    letterSpacing: '-0.025em', lineHeight: 1.0,
    willChange: 'transform, opacity',
  },

  /* pips */
  pips: {
    position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)',
    display: 'flex', flexDirection: 'column', gap: 10, zIndex: 999,
  },
  pip: {
    width: 6, height: 6, borderRadius: '50%',
    background: '#5a4220', opacity: 0.22,
    transition: 'opacity 0.3s, transform 0.3s, background 0.3s',
  },
  pipActive: { opacity: 0.9, transform: 'scale(1.6)', background: '#c2380f' },

  /* scroll cue */
  scrollCue: {
    position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
    zIndex: 999, display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 5, opacity: 0, willChange: 'transform',
  },
  scrollTxt: {
    fontFamily: 'InriaSerif, Lora, serif', fontSize: '0.58rem',
    letterSpacing: '0.3em', textTransform: 'uppercase', color: Q.ink2,
  },
  scrollLine: { width: 1, height: 34, background: Q.ink2, display: 'block' },
}