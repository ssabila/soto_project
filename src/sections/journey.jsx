// JourneySection.jsx — responsive, no white bg, image fits inside frame
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyContent } from '../data/storytext.js'

import imgBetawi   from '../assets/images/soto-betawi.svg'
import imgLamongan from '../assets/images/soto-lamongan.svg'
import imgKudus    from '../assets/images/soto-kudus.svg'
import imgPadang   from '../assets/images/soto-padang.svg'
import imgBanjar   from '../assets/images/soto-banjar.svg'
import imgMakasar  from '../assets/images/coto-makasar.svg'

import filmstripBg  from '../assets/images/background-2.svg'
import bingkaiRetro from '../assets/images/bingkai-retro.svg'
import decor1 from '../assets/images/decor-retro.svg'
import decor2 from '../assets/images/decor-retro-1.svg'
import decor3 from '../assets/images/decor-retro2.svg'
import decor4 from '../assets/images/decor-retro-3.svg'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [imgBetawi, imgLamongan, imgKudus, imgPadang, imgBanjar, imgMakasar]
const DECORS  = [decor1, decor2, decor3, decor4]

const SOTO_RATINGS = [
  { richness: 4, spicy: 3, complexity: 4, texture: 4 },
  { richness: 3, spicy: 4, complexity: 3, texture: 3 },
  { richness: 2, spicy: 2, complexity: 3, texture: 2 },
  { richness: 4, spicy: 5, complexity: 4, texture: 4 },
  { richness: 3, spicy: 2, complexity: 4, texture: 3 },
  { richness: 4, spicy: 2, complexity: 3, texture: 3 }
]

const RATING_CONFIG = [
  { key: 'richness',   label: 'Richness',    filledEmoji: '🟡', emptyEmoji: '⚪' },
  { key: 'spicy',      label: 'Spicy Level', filledEmoji: '🌶️', emptyEmoji: '⚪' },
  { key: 'complexity', label: 'Complexity',  filledEmoji: '⭐', emptyEmoji: '☆'  },
  { key: 'texture',    label: 'Texture',     filledEmoji: '🔶', emptyEmoji: '🔷' },
]

const PARALLAX_FACTOR = 0.3

// ─── Responsive CSS diinjek ke <head> via useEffect ───────────────────────────
// TIDAK menggunakan <style> tag di dalam JSX karena menyebabkan
// "removeChild: node is not a child" error saat React & GSAP sama-sama
// memanipulasi DOM pada proses unmount.
const RESPONSIVE_CSS = `
  .journey-card {
    flex-direction: row !important;
    padding: 36px 40px !important;
    gap: 48px !important;
  }
  .journey-frame-container {
    width: min(42vw, 66vh) !important;
    height: min(42vw, 66vh) !important;
  }
  .journey-text-container { gap: 20px !important; }
  .journey-ratings-grid   { grid-template-columns: 1fr 1fr !important; }
  .journey-decor          { width: 110px !important; }

  @media (max-width: 1024px) {
    .journey-card {
      padding: 28px 32px !important;
      gap: 32px !important;
    }
    .journey-frame-container {
      width: min(38vw, 52vh) !important;
      height: min(38vw, 52vh) !important;
    }
    .journey-text-container { gap: 14px !important; }
    .journey-decor          { width: 80px !important; }
  }

  @media (max-width: 768px) {
    .journey-card {
      flex-direction: column !important;
      padding: 24px 20px !important;
      gap: 20px !important;
      overflow-y: auto !important;
      justify-content: flex-start !important;
      align-items: center !important;
    }
    .journey-frame-container {
      width: min(60vw, 38vh) !important;
      height: min(60vw, 38vh) !important;
      flex-shrink: 0 !important;
    }
    .journey-text-container {
      gap: 10px !important;
      height: auto !important;
      width: 100% !important;
    }
    .journey-ratings-grid { gap: 8px 20px !important; }
    .journey-decor        { width: 60px !important; }
  }

  @media (max-width: 480px) {
    .journey-card {
      padding: 18px 14px !important;
      gap: 14px !important;
      border-radius: 18px !important;
    }
    .journey-frame-container {
      width: min(72vw, 34vh) !important;
      height: min(72vw, 34vh) !important;
    }
    .journey-ratings-grid { gap: 6px 12px !important; }
    .journey-decor        { width: 44px !important; }
    .journey-content-wrapper {
      width: 96vw !important;
      height: 90vh !important;
    }
  }
`

export default function JourneySection() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const panelsRef  = useRef([])
  const bgRef      = useRef(null)

  // Inject responsive CSS ke <head> — aman dari konflik React/GSAP DOM
  useEffect(() => {
    const styleEl = document.createElement('style')
    styleEl.setAttribute('data-journey', 'responsive')
    styleEl.textContent = RESPONSIVE_CSS
    document.head.appendChild(styleEl)
    return () => {
      // Cek dulu sebelum removeChild agar tidak error jika sudah terhapus
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl)
      }
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current

      const scrollTween = gsap.to(wrapperRef.current, {
        x: () => -(wrapperRef.current.scrollWidth - window.innerWidth),
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + wrapperRef.current.scrollWidth,
          onUpdate: (self) => {
            const totalMove = wrapperRef.current.scrollWidth - window.innerWidth
            gsap.set(bgRef.current, { x: -self.progress * totalMove * PARALLAX_FACTOR })
          }
        }
      })

      panels.forEach((panel, i) => {
        const img        = panel.querySelector('.j-img')
        const texts      = panel.querySelectorAll('.j-text-line')
        const regionName = panel.querySelector('.j-region')
        const stars      = panel.querySelectorAll('.j-star')
        const decors     = panel.querySelectorAll('.j-decor')
        const frame      = panel.querySelector('.j-frame')
        const divider    = panel.querySelector('.j-divider')

        gsap.set(frame, { rotation: gsap.utils.random(-2, 2) })

        gsap.to(regionName, {
          x: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        })

        gsap.to(img, {
          xPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        })

        decors.forEach(dec => {
          gsap.to(dec, {
            yPercent: gsap.utils.random(-20, 20),
            rotation: gsap.utils.random(-15, 15),
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 65%',
            toggleActions: 'play none none reverse'
          }
        })

        tl.fromTo(stars,
          { opacity: 0, scale: 0, rotation: -15 },
          { opacity: 1, scale: 1, rotation: 0, stagger: 0.04, duration: 0.4, ease: 'back.out(2)' }
        )

        if (divider) {
          tl.fromTo(divider,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.2'
          )
        }

        tl.fromTo(texts,
          { opacity: 0, y: 16, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ─── HELPERS ──────────────────────────────────────────────────────────────

  const renderStars = (rating, config) => Array.from({ length: 5 }, (_, idx) => (
    <span
      key={idx}
      className="j-star"
      style={{
        display: 'inline-block',
        fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)',
        lineHeight: 1,
        filter: idx < rating ? 'none' : 'grayscale(1) opacity(0.3)',
      }}
    >
      {idx < rating ? config.filledEmoji : config.emptyEmoji}
    </span>
  ))

  const renderTitle = (name) => {
    return name.split(' ').map((word, wIdx, arr) => (
      <span
        key={wIdx}
        style={{ display: 'inline-flex', alignItems: 'baseline', marginRight: wIdx < arr.length - 1 ? '0.25em' : 0 }}
      >
        <span style={S.titleFirstChar}>{word.charAt(0)}</span>
        <span style={S.titleRest}>{word.slice(1)}</span>
      </span>
    ))
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <section ref={sectionRef} style={S.container}>
      <div ref={bgRef} style={S.bgLayer} />

      <div ref={wrapperRef} style={S.wrapper}>
        {storyContent.regions.map((region, i) => {
          const rating   = SOTO_RATINGS[i] || SOTO_RATINGS[0]
          const fullName = i === 5 ? 'Coto Makassar' : region.name

          return (
            <div
              key={region.id}
              ref={el => (panelsRef.current[i] = el)}
              style={S.panel}
            >
              <div className="journey-content-wrapper" style={S.contentWrapper}>
                <div className="journey-card" style={S.card}>

                  {/* ── KIRI: Foto dalam bingkai ── */}
                  <div className="j-frame journey-frame-container" style={S.frameContainer}>
                    <img src={bingkaiRetro} alt="" style={S.frameBg} />
                    {/*
                     * imgMask — area pas di dalam lubang bingkai, TANPA background.
                     * Asset gambar sudah transparan, tidak perlu warna apapun.
                     */}
                    <div style={S.imgMask}>
                      <img
                        className="j-img"
                        src={IMAGES[i]}
                        alt={region.name}
                        style={S.img}
                      />
                    </div>
                  </div>

                  {/* ── KANAN: Konten ── */}
                  <div className="journey-text-container" style={S.textContainer}>

                    <div style={S.indexBadge}>
                      #{String(i + 1).padStart(2, '0')}
                    </div>

                    <h3 className="j-region" style={S.titleWrapper}>
                      {renderTitle(fullName)}
                    </h3>

                    <div className="j-divider" style={S.divider} />

                    <div className="journey-ratings-grid" style={S.ratingsGrid}>
                      {RATING_CONFIG.map((cfg) => (
                        <div key={cfg.key} style={S.ratingItem}>
                          <span style={S.ratingLabel}>{cfg.label}</span>
                          <div style={S.starsRow}>
                            {renderStars(rating[cfg.key], cfg)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ ...S.divider, margin: '2px 0 6px' }} />

                    <div style={S.linesWrapper}>
                      {region.lines.map((line, li) => (
                        <p key={li} className="j-text-line" style={{
                          ...S.textLine,
                          ...(li === region.lines.length - 1 ? S.textLineQuote : {})
                        }}>
                          {li === region.lines.length - 1 ? `"${line}"` : line}
                        </p>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

              {/* Decors */}
              <img src={DECORS[i % 4]}     alt="" className="j-decor journey-decor" style={{ ...S.decor, top: '12%',    left: '8%'   }} />
              <img src={DECORS[(i+1) % 4]} alt="" className="j-decor journey-decor" style={{ ...S.decor, bottom: '12%', right: '6%'  }} />
              <img src={DECORS[(i+2) % 4]} alt="" className="j-decor journey-decor" style={{ ...S.decor, top: '8%',     right: '32%' }} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const S = {
  container: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFF8E7',
  },

  bgLayer: {
    position: 'absolute',
    top: 0, left: 0,
    width: `${storyContent.regions.length * 130}vw`,
    height: '100%',
    backgroundImage: `url(${filmstripBg})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'repeat-x',
    zIndex: 0,
    willChange: 'transform',
  },

  wrapper: {
    display: 'flex',
    width: `${storyContent.regions.length * 100}vw`,
    height: '100%',
    position: 'relative',
    zIndex: 2,
  },

  panel: {
    width: '100vw',
    height: '100vh',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  decor: {
    position: 'absolute',
    width: '110px',
    zIndex: 10,
    pointerEvents: 'none',
  },

  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '92vw',
    height: '86vh',
    maxWidth: '1400px',
    zIndex: 2,
  },

  card: {
    backgroundColor: '#FFF2D6',
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,233,195,0.45) 0, rgba(255,233,195,0.45) 6px, rgba(255,242,214,0.45) 6px, rgba(255,242,214,0.45) 12px)',
    border: '3px solid #D9A65B',
    borderRadius: '28px',
    padding: '36px 40px',
    boxShadow: '8px 8px 0 rgba(201,138,42,0.55), 0 16px 40px rgba(0,0,0,0.12)',
    width: '100%',
    height: '100%',
    position: 'relative',
    transform: 'rotate(-0.5deg)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '48px',
  },

  // ── Foto ──────────────────────────────────────────────────────────────────

  frameContainer: {
    position: 'relative',
    width: 'min(42vw, 66vh)',
    height: 'min(42vw, 66vh)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bingkai SVG sedikit overflow agar ornamen tepi terlihat
  frameBg: {
    position: 'absolute',
    width: '130%',
    height: '130%',
    objectFit: 'contain',
    zIndex: 3,
    pointerEvents: 'none',
  },

  /*
   * imgMask — area di dalam lubang bingkai.
   * TIDAK ada backgroundColor maupun border berwarna,
   * karena asset gambar sudah di-remove background-nya.
   * 78% = perkiraan luas area "dalam" bingkai retro.
   * Sesuaikan jika terlalu besar/kecil terhadap SVG bingkai.
   */
  imgMask: {
    position: 'relative',
    zIndex: 2,
    width: '78%',
    height: '78%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '4px',
  },

  // contain agar gambar soto (yang mungkin tidak square) tidak terpotong
  img: {
    width: '110%',
    height: '110%',
    objectFit: 'contain',
    position: 'absolute',
    top: '-5%',
    left: '-5%',
  },

  // ── Teks ──────────────────────────────────────────────────────────────────

  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: 0,
    height: '100%',
    justifyContent: 'center',
  },

  indexBadge: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
    color: '#B8860B',
    letterSpacing: '0.2em',
    fontStyle: 'italic',
    opacity: 0.8,
  },

  titleWrapper: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    lineHeight: 1.05,
    gap: 0,
  },

  titleFirstChar: {
    fontFamily: 'Beachfly, serif',
    fontSize: 'clamp(2.8rem, 5.5vw, 6rem)',
    color: '#1a1a1a',
    fontWeight: 'normal',
    lineHeight: 1,
  },

  titleRest: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(2rem, 4vw, 4.6rem)',
    color: '#1a1a1a',
    fontWeight: 'normal',
    lineHeight: 1,
  },

  divider: {
    height: '2px',
    background: 'linear-gradient(to right, #D9A65B, #f0c878, #D9A65B)',
    borderRadius: '2px',
    margin: '0 0 4px',
    transformOrigin: 'left center',
  },

  ratingsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px 32px',
  },

  ratingItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  ratingLabel: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
    color: '#8B6914',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 'bold',
  },

  starsRow: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'nowrap',
  },

  linesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  textLine: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.85rem, 1.3vw, 1.15rem)',
    color: '#444',
    lineHeight: 1.55,
    margin: 0,
  },

  textLineQuote: {
    fontStyle: 'italic',
    color: '#8B6914',
    fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)',
    borderLeft: '4px solid #D9A65B',
    paddingLeft: '12px',
    marginTop: '4px',
  },
}