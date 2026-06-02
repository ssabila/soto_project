// JourneySection.jsx — enhanced culinary journey with rich soto profiles
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyContent } from '../data/storytext.js'

import { useSectionTransition } from '../hooks/useSectionTransition'

import imgBetawi   from '../assets/images/soto-betawi.webp'
import imgLamongan from '../assets/images/soto-lamongan.webp'
import imgKudus    from '../assets/images/soto-kudus.webp'
import imgPadang   from '../assets/images/soto-padang.webp'
import imgBanjar   from '../assets/images/soto-banjar.webp'
import imgMakasar  from '../assets/images/coto-makasar.webp'

import filmstripBg  from '../assets/images/background-2.webp'
import bingkaiRetro from '../assets/images/bingkai-retro.webp'
import decor1 from '../assets/images/decor-retro.svg'
import decor2 from '../assets/images/decor-retro-1.svg'
import decor3 from '../assets/images/decor-retro2.svg'
import decor4 from '../assets/images/decor-retro-3.svg'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [imgBetawi, imgLamongan, imgKudus, imgPadang, imgBanjar, imgMakasar]
const DECORS  = [decor1, decor2, decor3, decor4]
const PARALLAX_FACTOR = 0.3

//  Soto data with rich culinary profiles 
const SOTO_PROFILES = [
  {
    id: 'soto-betawi',
    name: 'Soto Betawi',
    region: 'Jakarta',
    provinsi: 'DKI Jakarta',
    kuah: 'Coconut Milk & Milk Broth',
    kuahDesc: 'Creamy, savory, with a pale golden color',
    kuahColor: '#f5e6c3',
    karakterRasa: ['Savory', 'Rich', 'Creamy'],
    ciriKhas: 'A luxurious mix of beef offal, tomatoes, fried potatoes, and emping crackers',
    sajian: 'Served hot with pickled cucumbers and green chili sambal',
    icon: '',
    accentColor: '#c9880a',
    tagline: 'The rich flavors of the capital city',
  },

  {
    id: 'soto-lamongan',
    name: 'Soto Lamongan',
    region: 'Lamongan',
    provinsi: 'East Java',
    kuah: 'Clear Chicken Broth',
    kuahDesc: 'Light golden, delicate yet packed with spices',
    kuahColor: '#fef3c7',
    karakterRasa: ['Fresh', 'Savory', 'Light'],
    ciriKhas: 'Topped with koya — a unique savory powder made from shrimp crackers',
    sajian: 'Served with boiled egg, bean sprouts, glass noodles, and crispy fried shallots',
    icon: '',
    accentColor: '#c2380f',
    tagline: 'Its magic lies in the topping',
  },

  {
    id: 'soto-kudus',
    name: 'Soto Kudus',
    region: 'Kudus',
    provinsi: 'Central Java',
    kuah: 'Clear Beef or Buffalo Broth',
    kuahDesc: 'Light and clear with a comforting ginger aroma',
    kuahColor: '#fef9ec',
    karakterRasa: ['Delicate', 'Aromatic', 'Light'],
    ciriKhas: 'Traditionally made with buffalo meat instead of beef, reflecting local heritage',
    sajian: 'Served in a small bowl, topped with fried shallots and scallions',
    icon: '',
    accentColor: '#4d7c0f',
    tagline: 'Small bowl, deep meaning',
  },

  {
    id: 'soto-padang',
    name: 'Soto Padang',
    region: 'Padang',
    provinsi: 'West Sumatra',
    kuah: 'Spiced Beef Broth',
    kuahDesc: 'Reddish broth rich in turmeric and dried chilies',
    kuahColor: '#fce7d0',
    karakterRasa: ['Spicy', 'Bold', 'Robust'],
    ciriKhas: 'Features crispy fried beef slices added to the hot broth just before serving',
    sajian: 'Served with rice vermicelli, potato fritters, and Padang-style red crackers',
    icon: '',
    accentColor: '#c2380f',
    tagline: 'Every spoonful is full of courage',
  },

  {
    id: 'soto-banjar',
    name: 'Soto Banjar',
    region: 'Banjarmasin',
    provinsi: 'South Kalimantan',
    kuah: 'Aromatic Chicken Broth',
    kuahDesc: 'Pale yellow with notes of cinnamon, cardamom, and cloves',
    kuahColor: '#fef5e4',
    karakterRasa: ['Aromatic', 'Warm', 'Gentle'],
    ciriKhas: 'Distinctive use of spices rarely found in other sotos, such as cinnamon and star anise',
    sajian: 'Typically served with ketupat or lontong, boiled egg, and potato fritters',
    icon: '',
    accentColor: '#854F0B',
    tagline: 'Warmth from the banks of the Barito River',
  },

  {
    id: 'coto-makassar',
    name: 'Coto Makassar',
    region: 'Makassar',
    provinsi: 'South Sulawesi',
    kuah: 'Rich Peanut-Based Broth',
    kuahDesc: 'Dark brown, thick, and infused with more than 40 spices',
    kuahColor: '#e8d5b0',
    karakterRasa: ['Intense', 'Spice-Rich', 'Nutty'],
    ciriKhas: 'Slow-cooked for hours and traditionally paired with buras (banana leaf rice cakes)',
    sajian: 'Best enjoyed with buras — neither ketupat nor steamed rice will do',
    icon: '',
    accentColor: '#633806',
    tagline: 'Forty spices in a single bowl',
  },
];

const RESPONSIVE_CSS = `
  .journey-card {
    flex-direction: row !important;
    padding: 28px 32px !important;
    gap: 36px !important;
  }
  .journey-frame-container {
    width: min(42vw, 68vh) !important;
    height: min(42vw, 68vh) !important;
    flex-shrink: 0 !important;
  }
  .journey-text-container { 
    gap: 10px !important; 
    overflow: hidden !important;
  }
  .journey-decor { width: 100px !important; }

  /* ── Title: never clip, scale with container ── */
  .journey-title-wrapper {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: baseline !important;
    white-space: nowrap !important;
    overflow: visible !important;
    line-height: 1 !important;
    gap: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
  }
  .journey-title-first {
    font-family: Beachfly, serif;
    font-size: clamp(2rem, 4.2vw, 5rem) !important;
    font-weight: normal !important;
    line-height: 1 !important;
    color: #1a1a1a !important;
    flex-shrink: 0 !important;
  }
  .journey-title-rest {
    font-family: Mathreal, serif !important;
    font-size: clamp(1.45rem, 2.9vw, 3.7rem) !important;
    font-weight: normal !important;
    line-height: 1 !important;
    color: #1a1a1a !important;
    flex-shrink: 0 !important;
  }
  .journey-title-space {
    display: inline-block !important;
    width: 0.22em !important;
    flex-shrink: 0 !important;
  }

  @media (max-width: 1024px) {
    .journey-card {
      padding: 22px 24px !important;
      gap: 24px !important;
    }
    .journey-frame-container {
      width: min(40vw, 56vh) !important;
      height: min(40vw, 56vh) !important;
    }
    .journey-decor { width: 72px !important; }
    .journey-title-first {
      font-size: clamp(1.9rem, 3.8vw, 4.2rem) !important;
    }
    .journey-title-rest {
      font-size: clamp(1.35rem, 2.7vw, 3.2rem) !important;
    }
  }

  @media (max-width: 768px) {
    .journey-card {
      flex-direction: column !important;
      padding: 18px 16px !important;
      gap: 14px !important;
      overflow-y: auto !important;
      justify-content: flex-start !important;
      align-items: center !important;
    }
    .journey-frame-container {
      width: min(68vw, 42vh) !important;
      height: min(68vw, 42vh) !important;
      flex-shrink: 0 !important;
    }
    .journey-text-container {
      gap: 8px !important;
      height: auto !important;
      width: 100% !important;
      align-items: center !important;
      text-align: center !important;
    }
    .journey-decor { width: 52px !important; }

    /* Center title on mobile/tablet */
    .journey-title-wrapper {
      justify-content: center !important;
      flex-wrap: wrap !important;
      white-space: normal !important;
      text-align: center !important;
    }
    .journey-title-first {
      font-size: clamp(2.2rem, 8vw, 3.8rem) !important;
    }
    .journey-title-rest {
      font-size: clamp(1.6rem, 5.8vw, 2.8rem) !important;
    }

    /* Center other elements too */
    .journey-tags-row {
      justify-content: center !important;
    }
    .journey-index-row {
      justify-content: center !important;
      flex-direction: column !important;
      align-items: center !important;
      gap: 4px !important;
    }
    .ciri-khas-block {
      text-align: left !important;
    }
    .sajian-block {
      text-align: left !important;
    }
    .journey-tagline {
      display: block !important;
      text-align: center !important;
    }
    .journey-lines-wrapper {
      align-items: center !important;
    }
    .journey-lines-wrapper p {
      text-align: center !important;
    }
    .journey-lines-wrapper .j-text-line-quote {
      border-left: none !important;
      border-top: 3px solid #D9A65B !important;
      padding-left: 0 !important;
      padding-top: 6px !important;
    }
  }

  @media (max-width: 480px) {
    .journey-card {
      padding: 14px 12px !important;
      gap: 12px !important;
      border-radius: 16px !important;
    }
    .journey-frame-container {
      width: min(80vw, 36vh) !important;
      height: min(80vw, 36vh) !important;
    }
    .journey-decor { width: 40px !important; }
    .journey-content-wrapper {
      width: 96vw !important;
      height: 94vh !important;
    }
    .journey-title-first {
      font-size: clamp(2rem, 9.5vw, 3.2rem) !important;
    }
    .journey-title-rest {
      font-size: clamp(1.45rem, 7vw, 2.4rem) !important;
    }
  }

  /* Kuah tag pills */
  .kuah-pill {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 100px;
    font-family: InriaSerif, serif;
    font-size: clamp(0.55rem, 0.9vw, 0.72rem);
    font-style: italic;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  /* Rasa tag */
  .rasa-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 100px;
    font-family: InriaSerif, serif;
    font-size: clamp(0.52rem, 0.85vw, 0.68rem);
    font-weight: bold;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1.5px solid;
  }

  /* Ciri khas block */
  .ciri-khas-block {
    border-left: 3px solid;
    padding-left: 10px;
    font-family: InriaSerif, serif;
    font-size: clamp(0.72rem, 1.1vw, 0.88rem);
    line-height: 1.5;
    font-style: italic;
    color: #5a3e28;
  }

  /* Info grid */
  .info-row {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-family: InriaSerif, serif;
    font-size: clamp(0.62rem, 1vw, 0.8rem);
    line-height: 1.45;
    color: #5a3e28;
  }
  .info-label {
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: clamp(0.52rem, 0.82vw, 0.66rem);
    color: #8B6914;
    white-space: nowrap;
    padding-top: 1px;
    min-width: 52px;
  }

  /* Tagline stamp */
  .tagline-stamp {
    font-family: InriaSerif, serif;
    font-size: clamp(0.6rem, 0.95vw, 0.78rem);
    font-style: italic;
    letter-spacing: 0.05em;
    opacity: 0.72;
    padding: 5px 12px;
    border-radius: 100px;
    border: 1.5px dashed;
    display: inline-block;
    margin-top: 2px;
  }

  /* Sajian block */
  .sajian-block {
    font-family: InriaSerif, serif;
    font-size: clamp(0.65rem, 1vw, 0.82rem);
    line-height: 1.55;
    color: #6b4c2a;
    background: rgba(217, 166, 91, 0.12);
    border-radius: 8px;
    padding: 7px 10px;
  }

  /* Kuah visual bar */
  .kuah-bar {
    height: 6px;
    border-radius: 3px;
    margin-top: 3px;
    opacity: 0.7;
  }

  /* Provinsi badge */
  .provinsi-badge {
    font-family: InriaSerif, serif;
    font-size: clamp(0.5rem, 0.78vw, 0.62rem);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #B8860B;
    font-style: italic;
    opacity: 0.8;
  }
`

export default function JourneySection() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const panelsRef  = useRef([])
  const bgRef      = useRef(null)

  const transitionRef = useSectionTransition('journey', 600, { autoScroll: false })

  useEffect(() => {
    const styleEl = document.createElement('style')
    styleEl.setAttribute('data-journey', 'responsive')
    styleEl.textContent = RESPONSIVE_CSS
    document.head.appendChild(styleEl)
    return () => { if (document.head.contains(styleEl)) document.head.removeChild(styleEl) }
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
          },
        },
      })

      panels.forEach((panel) => {
        if (!panel) return

        const img      = panel.querySelector('.j-img')
        const frame    = panel.querySelector('.j-frame')
        const divider  = panel.querySelector('.j-divider')
        const decors   = panel.querySelectorAll('.j-decor')
        const regionEl = panel.querySelector('.j-region')

        // Entrance animation targets
        const indexBadge   = panel.querySelector('.j-index-badge')
        const provinsiEl   = panel.querySelector('.j-provinsi')
        const tagsRow      = panel.querySelector('.j-tags-row')
        const kuahBlock    = panel.querySelector('.j-kuah-block')
        const ciriBlock    = panel.querySelector('.j-ciri-block')
        const sajianBlock  = panel.querySelector('.j-sajian-block')
        const taglineEl    = panel.querySelector('.j-tagline')
        const infoRows     = panel.querySelectorAll('.j-info-row')

        // Set initial frame rotation
        if (frame) gsap.set(frame, { rotation: gsap.utils.random(-2, 2) })

        // Parallax: region name
        if (regionEl) {
          gsap.to(regionEl, {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
        }

        // Parallax: photo
        if (img) {
          gsap.to(img, {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
        }

        // Parallax: decors
        decors.forEach((dec) => {
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
            },
          })
        })

        // ── Staggered entrance timeline ──────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 65%',
            toggleActions: 'play none none reverse',
          },
        })

        // Index + provinsi
        tl.fromTo(
          [indexBadge, provinsiEl].filter(Boolean),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out' }
        )

        // Region name
        tl.fromTo(
          regionEl,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'back.out(1.4)' },
          '-=0.2'
        )

        // Divider
        if (divider) {
          tl.fromTo(divider, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        }

        // Tags row (rasa karakteristik)
        if (tagsRow) {
          tl.fromTo(
            tagsRow.querySelectorAll('.rasa-tag'),
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, stagger: 0.07, duration: 0.35, ease: 'back.out(2)' },
            '-=0.15'
          )
        }

        // Kuah block
        if (kuahBlock) {
          tl.fromTo(
            kuahBlock,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.1'
          )
        }

        // Info rows
        if (infoRows.length > 0) {
          tl.fromTo(
            infoRows,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, stagger: 0.06, duration: 0.38, ease: 'power2.out' },
            '-=0.1'
          )
        }

        // Ciri khas
        if (ciriBlock) {
          tl.fromTo(
            ciriBlock,
            { opacity: 0, x: -14, filter: 'blur(3px)' },
            { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' },
            '-=0.05'
          )
        }

        // Sajian
        if (sajianBlock) {
          tl.fromTo(
            sajianBlock,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.1'
          )
        }

        // Tagline last — like a stamp
        if (taglineEl) {
          tl.fromTo(
            taglineEl,
            { opacity: 0, scale: 0.85, rotation: -3 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
            '-=0.05'
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={(el) => {
        sectionRef.current    = el
        transitionRef.current = el
      }}
      data-section="journey"
      style={S.container}
    >
      <div ref={bgRef} style={S.bgLayer} />

      <div ref={wrapperRef} style={S.wrapper}>
        {storyContent.regions.map((region, i) => {
          const profile = SOTO_PROFILES[i]
          const fullName = i === 5 ? 'Coto Makassar' : region.name

          return (
            <div
              key={region.id}
              ref={(el) => (panelsRef.current[i] = el)}
              style={S.panel}
            >
              <div className="journey-content-wrapper" style={S.contentWrapper}>
                <div className="journey-card" style={S.card}>

                  {/* LEFT: Retro photo frame */}
                  <div className="j-frame journey-frame-container" style={S.frameContainer}>
                    <img src={bingkaiRetro} alt="" style={S.frameBg} />
                    <div style={S.imgMask}>
                      <img className="j-img" src={IMAGES[i]} alt={region.name} style={S.img} />
                    </div>

                    {/* Kuah color swatch — retro label inside frame bottom */}
                    <div style={{
                      ...S.frameKuahLabel,
                      background: profile.kuahColor,
                      borderTop: `2px solid ${profile.accentColor}88`,
                    }}>
                      <span style={{ ...S.frameKuahText, color: profile.accentColor }}>
                        {profile.icon} {profile.kuah}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT: Rich culinary text content */}
                  <div className="journey-text-container" style={S.textContainer}>

                    {/* Index + provinsi */}
                    <div className="journey-index-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="j-index-badge" style={S.indexBadge}>
                        #{String(i + 1).padStart(2, '0')} / 06
                      </span>
                      <span className="j-provinsi provinsi-badge">
                        {profile.provinsi}
                      </span>
                    </div>

                    {/* Soto name — CSS classes handle responsive sizing & center on mobile */}
                    <h3 className="j-region journey-title-wrapper">
                      {fullName.split(' ').map((word, wIdx, arr) => (
                        <span key={wIdx} style={{ display: 'inline-flex', alignItems: 'baseline', flexShrink: 0 }}>
                          <span className="journey-title-first">{word.charAt(0)}</span>
                          <span className="journey-title-rest">{word.slice(1)}</span>
                          {wIdx < arr.length - 1 && (
                            <span className="journey-title-space" aria-hidden="true" />
                          )}
                        </span>
                      ))}
                    </h3>

                    <div className="j-divider" style={S.divider} />

                    {/* ── RASA TAGS ──────────────────────────────────── */}
                    <div className="j-tags-row journey-tags-row" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {profile.karakterRasa.map((rasa, ri) => (
                        <span
                          key={ri}
                          className="rasa-tag"
                          style={{
                            color: profile.accentColor,
                            borderColor: `${profile.accentColor}88`,
                            background: `${profile.accentColor}14`,
                          }}
                        >
                          {rasa}
                        </span>
                      ))}
                    </div>

                    {/*  KUAH BLOCK  */}
                    <div className="j-kuah-block" style={S.kuahBlock}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <span style={{ ...S.sectionIcon, color: profile.accentColor }}>◈</span>
                        <span style={S.sectionLabel}>Broth Characteristics</span>
                      </div>
                      <p style={{ ...S.kuahDesc, margin: '3px 0 4px' }}>{profile.kuahDesc}</p>
                      <div
                        className="kuah-bar"
                        style={{ background: `linear-gradient(to right, ${profile.accentColor}cc, ${profile.kuahColor})`, width: '100%' }}
                      />
                    </div>

                    {/*  INFO ROWS: Sajian & Ciri Khas  */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>

                      {/* Ciri Khas */}
                      <div
                        className="j-ciri-block ciri-khas-block"
                        style={{ borderLeftColor: profile.accentColor }}
                      >
                        <span style={{ display: 'block', fontStyle: 'normal', fontSize: 'clamp(0.5rem,0.78vw,0.62rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: profile.accentColor, marginBottom: '2px', fontWeight: 'bold' }}>
                          ✦ Signature Features
                        </span>
                        {profile.ciriKhas}
                      </div>

                      {/* Sajian */}
                      <div className="j-sajian-block sajian-block">
                        <span style={{ display: 'block', fontSize: 'clamp(0.5rem,0.78vw,0.62rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: profile.accentColor, marginBottom: '2px', fontWeight: 'bold' }}>
                          ⬡ Serving Style
                        </span>
                        {profile.sajian}
                      </div>
                    </div>

                    {/*  STORY LINES  */}
                    <div style={S.divider} />
                    <div className="journey-lines-wrapper" style={S.linesWrapper}>
                      {region.lines.map((line, li) => (
                        <p
                          key={li}
                          className={`j-text-line${li === region.lines.length - 1 ? ' j-text-line-quote' : ''}`}
                          style={{
                            ...S.textLine,
                            ...(li === region.lines.length - 1 ? { ...S.textLineQuote, borderLeftColor: profile.accentColor } : {}),
                          }}
                        >
                          {li === region.lines.length - 1 ? `"${line}"` : line}
                        </p>
                      ))}
                    </div>

                    {/*  TAGLINE STAMP  */}
                    <span
                      className="j-tagline journey-tagline tagline-stamp"
                      style={{
                        color: profile.accentColor,
                        borderColor: `${profile.accentColor}66`,
                        background: `${profile.accentColor}0d`,
                      }}
                    >
                      {profile.tagline}
                    </span>

                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <img src={DECORS[i % 4]}     alt="" className="j-decor journey-decor" style={{ ...S.decor, top: '10%', left: '7%' }} />
              <img src={DECORS[(i+1) % 4]} alt="" className="j-decor journey-decor" style={{ ...S.decor, bottom: '10%', right: '5%' }} />
              <img src={DECORS[(i+2) % 4]} alt="" className="j-decor journey-decor" style={{ ...S.decor, top: '7%', right: '30%' }} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
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
    top: 0,
    left: 0,
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
    width: '100px',
    zIndex: 10,
    pointerEvents: 'none',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '94vw',
    height: '88vh',
    maxWidth: '1460px',
    zIndex: 2,
  },
  card: {
    backgroundColor: '#FFF2D6',
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,233,195,0.45) 0, rgba(255,233,195,0.45) 6px, rgba(255,242,214,0.45) 6px, rgba(255,242,214,0.45) 12px)',
    border: '3px solid #D9A65B',
    borderRadius: '28px',
    padding: '28px 32px',
    boxShadow: '8px 8px 0 rgba(201,138,42,0.55), 0 16px 40px rgba(0,0,0,0.12)',
    width: '100%',
    height: '100%',
    position: 'relative',
    transform: 'rotate(-0.5deg)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '36px',
    overflow: 'hidden',
  },
  frameContainer: {
    position: 'relative',
    width: 'min(42vw, 68vh)',
    height: 'min(42vw, 68vh)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameBg: {
    position: 'absolute',
    width: '180%',
    height: '180%',
    objectFit: 'contain',
    zIndex: 3,
    pointerEvents: 'none',
  },
  imgMask: {
    position: 'relative',
    zIndex: 2,
    width: '65.5%',
    height: '65.5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  img: {
    width: '110%',
    height: '110%',
    objectFit: 'contain',
    position: 'absolute',
    top: '-5%',
    left: '-5%',
  },
  frameKuahLabel: {
    position: 'absolute',
    bottom: '17%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 4,
    padding: '4px 12px',
    borderRadius: '100px',
    whiteSpace: 'nowrap',
  },
  frameKuahText: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.52rem, 0.82vw, 0.7rem)',
    fontStyle: 'italic',
    letterSpacing: '0.04em',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: 0,
    height: '100%',
    justifyContent: 'center',
    overflow: 'visible',
  },
  indexBadge: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.62rem, 1vw, 0.82rem)',
    color: '#B8860B',
    letterSpacing: '0.2em',
    fontStyle: 'italic',
    opacity: 0.8,
  },
  titleWrapper: {
    /* handled by .journey-title-wrapper CSS class */
  },
  titleFirstChar: {
    /* handled by .journey-title-first CSS class */
  },
  titleRest: {
    /* handled by .journey-title-rest CSS class */
  },
  divider: {
    height: '2px',
    background: 'linear-gradient(to right, #D9A65B, #f0c878, #D9A65B)',
    borderRadius: '2px',
    margin: '1px 0',
    transformOrigin: 'left center',
  },
  kuahBlock: {
    background: 'rgba(217, 166, 91, 0.1)',
    borderRadius: '8px',
    padding: '8px 10px',
  },
  sectionIcon: {
    fontSize: 'clamp(0.65rem, 1vw, 0.82rem)',
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.52rem, 0.82vw, 0.66rem)',
    color: '#8B6914',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 'bold',
  },
  kuahDesc: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
    color: '#6b4c2a',
    lineHeight: 1.45,
    fontStyle: 'italic',
  },
  linesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  textLine: {
    fontFamily: 'InriaSerif, serif',
    fontSize: 'clamp(0.78rem, 1.2vw, 1rem)',
    color: '#555',
    lineHeight: 1.5,
    margin: 0,
  },
  textLineQuote: {
    fontStyle: 'italic',
    color: '#8B6914',
    fontSize: 'clamp(0.74rem, 1.1vw, 0.95rem)',
    borderLeft: '4px solid #D9A65B',
    paddingLeft: '10px',
    marginTop: '2px',
  },
}