import { useEffect, useRef } from "react";
import gsap from "gsap";

import backgroundUs from "../assets/images/background-us.svg";
import fotoDhira from "../assets/images/foto-dhira.svg";
import fotoBila from "../assets/images/foto-bila.svg";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const members = [
  {
    id: "bila",
    greeting: "Halo! aku",
    name: "Sabila Bintang Kusuma Dewi",
    nickname: "Bila",
    photo: fotoBila,
    rotate: "-3deg",
    accentColor: "#c2380f",
    bio: "Namaku Sabila Bintang Kusuma Dewi. Aku mahasiswa tingkat 3 Politeknik statistika STIS. Dalam web story ini, aku mengerjakan konten dan isi website, mulai dari informasi, sampai narasi tentang beragam masakan soto di Indonesia.",
 },
  {
    id: "dhira",
    greeting: "Halo! aku",
    name: "Qurany Nadhira Tsabita",
    nickname: "Dhira",
    photo: fotoDhira,
    rotate: "3deg",
    accentColor: "#c2380f",
    bio: "Namaku Qurany Nadhira Tsabita. Aku mahasiswa tingkat 3 Politeknik statistika STIS. Di web ini aku yang mengerjakan bagian opening, closing, footer dan game interaktif membuat soto, sampai section about us yang kamu lihat sekarang!.", },
];

/* ═══════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════ */
export default function AboutUs() {
  const containerRef = useRef(null);
  const isMountedRef = useRef(true);
  const timeoutsRef = useRef([]);

  const slideRefs = useRef([]);
  const photoRefs = useRef([]);
  const headerRefs = useRef([]);
  const greetRefs = useRef([]);
  const nameRefs = useRef([]);
  const bioBoxRefs = useRef([]);
  const pillRefs = useRef([]);
  const bioRefs = useRef([]);
  const cursorRefs = useRef([]);

  /* ─── helpers ─── */
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const wait = (ms) =>
    new Promise((resolve) => {
      const id = setTimeout(resolve, ms);
      timeoutsRef.current.push(id);
    });

  const getDelay = (char, base = 42) => {
    if (char === ".") return 250;
    if (char === ",") return 120;
    if (char === " ") return 24;
    if (char === "!") return 170;
    return base + Math.random() * 18;
  };

  const typeText = async (target, cursor, text) => {
    if (!target || !cursor) return;

    target.textContent = "";
    gsap.set(cursor, { opacity: 0 });

    for (let i = 0; i <= text.length; i++) {
      if (!isMountedRef.current) return;
      target.textContent = text.slice(0, i);
      await wait(getDelay(text[i] || ""));
    }
  };

  /* ─── main effect ─── */
  useEffect(() => {
    isMountedRef.current = true;
    clearAllTimeouts();

    const ctx = gsap.context(() => {
      slideRefs.current.forEach((el, i) => {
        if (!el) return;

        gsap.set(el, { opacity: 0, pointerEvents: "none" });

        gsap.set(photoRefs.current[i], {
          x: -70,
          opacity: 0,
          scale: 0.9,
          rotate: members[i].rotate,
          filter: "blur(6px)",
        });

        gsap.set(headerRefs.current[i], { y: 22, opacity: 0 });
        gsap.set(greetRefs.current[i], { y: -30, opacity: 0 });
        gsap.set(nameRefs.current[i], { y: 24, opacity: 0, scale: 0.95 });
        gsap.set(bioBoxRefs.current[i], { y: 10, opacity: 0 });
        gsap.set(pillRefs.current[i], { scale: 0, opacity: 0 });

        if (bioRefs.current[i]) bioRefs.current[i].textContent = "";
        if (cursorRefs.current[i]) {
          gsap.set(cursorRefs.current[i], { opacity: 0 });
        }
      });

      const playMember = async (idx) => {
        const slide = slideRefs.current[idx];
        const photo = photoRefs.current[idx];
        const header = headerRefs.current[idx];
        const greet = greetRefs.current[idx];
        const nameEl = nameRefs.current[idx];
        const bioBox = bioBoxRefs.current[idx];
        const pill = pillRefs.current[idx];
        const bio = bioRefs.current[idx];
        const cursor = cursorRefs.current[idx];
        const member = members[idx];

        if (!slide) return;

        if (bio) bio.textContent = "";
        if (cursor) gsap.set(cursor, { opacity: 0 });

        gsap.set(slide, { opacity: 1, pointerEvents: "auto" });

        gsap.set(photo, {
          x: -70,
          opacity: 0,
          scale: 0.9,
          filter: "blur(6px)",
          rotate: member.rotate,
        });

        gsap.set(header, { y: 22, opacity: 0 });
        gsap.set(greet, { y: -30, opacity: 0 });
        gsap.set(nameEl, { y: 24, opacity: 0, scale: 0.95 });
        gsap.set(bioBox, { y: 10, opacity: 0 });
        gsap.set(pill, { scale: 0, opacity: 0 });

        /* IN */
        const inTl = gsap.timeline();

        inTl
          .to(photo, {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
          })
          .to(
            header,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .to(
            greet,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.45"
          )
          .to(
            nameEl,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.5)",
            },
            "-=0.35"
          )
          .to(
            bioBox,
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.1"
          )
          .to(
            pill,
            {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              ease: "back.out(2.2)",
            },
            "-=0.25"
          );

        await inTl;
        await wait(300);
        await typeText(bio, cursor, member.bio);
        await wait(2400);

        /* OUT */
        const outTl = gsap.timeline();

        outTl
          .to([cursor, bioBox, nameEl, greet], {
            opacity: 0,
            y: -16,
            stagger: 0.04,
            duration: 0.45,
            ease: "power2.in",
          })
          .to(
            photo,
            {
              x: 60,
              opacity: 0,
              scale: 0.92,
              filter: "blur(6px)",
              duration: 0.7,
              ease: "power3.in",
            },
            "-=0.3"
          );

        await outTl;

        gsap.set(slide, { opacity: 0, pointerEvents: "none" });
        await wait(350);
      };

      const loop = async () => {
        await wait(600);

        while (isMountedRef.current) {
          for (let i = 0; i < members.length; i++) {
            if (!isMountedRef.current) break;
            await playMember(i);
          }
        }
      };

      loop();
    }, containerRef);

    return () => {
      isMountedRef.current = false;
      clearAllTimeouts();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      data-section="about"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#645c46",
      }}
    >
      {/* ── FULL BG ── */}
      <img
        src={backgroundUs}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 0.5%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── STAGE ── */}
      <div
        className="about-stage"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1640px",
          minHeight: "clamp(430px, 62vh, 650px)",
          display: "grid",
          placeItems: "center",
          padding: "0 clamp(1.5rem, 4vw, 4.5rem)",
        }}
      >
        {members.map((member, idx) => (
          <div
            key={member.id}
            ref={(el) => {
              slideRefs.current[idx] = el;
            }}
            className="about-slide"
            style={{
              gridRow: 1,
              gridColumn: 1,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(0.5rem, 2vw, 2.6rem)",
              flexWrap: "nowrap",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {/* ── FOTO POLAROID ── */}
            <div
              className="about-photo-wrap"
              style={{
                flex: "0 0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                ref={(el) => {
                  photoRefs.current[idx] = el;
                }}
                src={member.photo}
                alt={member.name}
                draggable="false"
                className="about-photo"
                style={{
                  display: "block",
                  width: "clamp(330px, 34vw, 500px)",
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 24px 45px rgba(42,31,14,0.3))",
                  transformOrigin: "center bottom",
                  userSelect: "none",
                  rotate: member.rotate,
                }}
              />
            </div>

            {/* ── TEXT SIDE ── */}
            <div
              className="about-text"
              style={{
                flex: "0 1 min(52vw, 1040px)",
                minWidth: "620px",
                maxWidth: "1040px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* WRAPPER NAMA / HEADER */}
              <div
                ref={(el) => {
                  headerRefs.current[idx] = el;
                }}
                className="about-header"
                style={{
                  width: "100%",
                  marginBottom: "clamp(1rem, 1.8vw, 1.4rem)",
                }}
              >
                <span
                  ref={(el) => {
                    greetRefs.current[idx] = el;
                  }}
                  className="font-serif italic"
                  style={{
                    display: "block",
                    fontSize: "clamp(2rem, 4.6vw, 3.8rem)",
                    color: "#2a1f0e",
                    lineHeight: 1,
                    marginBottom: "-0.15em",
                    opacity: 0.88,
                  }}
                >
                  {member.greeting}
                </span>

                <h2
                  ref={(el) => {
                    nameRefs.current[idx] = el;
                  }}
                  className="font-title font-black"
                  style={{
                    fontSize: "clamp(2.7rem, 5vw, 5.25rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.055em",
                    color: "#2a1f0e",
                    WebkitTextStroke: "0.5px #2a1f0e",
                    margin: 0,
                    maxWidth: "1040px",
                  }}
                >
                  {member.name}
                </h2>
              </div>

              {/* WRAPPER ABOUT ME + DESKRIPSI */}
              <div
                ref={(el) => {
                  bioBoxRefs.current[idx] = el;
                }}
                className="about-bio-box"
                style={{
                  width: "100%",
                  maxWidth: "620px",
                  minHeight: "clamp(160px, 22vh, 205px)",
                  position: "relative",
                }}
              >
                <span
                  ref={(el) => {
                    pillRefs.current[idx] = el;
                  }}
                  className="about-pill font-title font-bold"
                  style={{
                    display: "inline-block",
                    border: `2px solid ${member.accentColor}`,
                    color: member.accentColor,
                    background: "transparent",
                    fontSize: "clamp(0.74rem, 1.4vw, 0.92rem)",
                    letterSpacing: "0.05em",
                    padding: "4px 16px",
                    borderRadius: "100px",
                    marginBottom: "0.85rem",
                  }}
                >
                  About Me
                </span>

                <p
                  className="font-serif about-bio-text"
                  style={{
                    fontSize: "clamp(0.86rem, 1.75vw, 1.05rem)",
                    color: "#2a1f0e",
                    lineHeight: 1.72,
                    margin: 0,
                    opacity: 0.86,
                  }}
                >
                  <span
                    ref={(el) => {
                      bioRefs.current[idx] = el;
                    }}
                  />
                  <span
                    ref={(el) => {
                      cursorRefs.current[idx] = el;
                    }}
                    style={{
                      display: "inline-block",
                      width: "2px",
                      height: "1em",
                      background: member.accentColor,
                      marginLeft: "2px",
                      verticalAlign: "middle",
                      animation: "cursorBlink 1s step-end infinite",
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* DESKTOP BESAR */
        @media (min-width: 1280px) {
          .about-stage {
            max-width: 1640px !important;
            padding-left: clamp(1.5rem, 3vw, 4rem) !important;
            padding-right: clamp(1.5rem, 3vw, 4rem) !important;
          }

          .about-slide {
            gap: clamp(0.8rem, 2vw, 2.6rem) !important;
            justify-content: center !important;
          }

          .about-photo {
            width: clamp(360px, 31vw, 500px) !important;
          }

          .about-text {
            flex-basis: 1040px !important;
            min-width: 620px !important;
            max-width: 1040px !important;
            transform: translateX(-1.4rem);
          }

          .about-text h2 {
            font-size: clamp(3rem, 4.75vw, 5.25rem) !important;
            max-width: 1040px !important;
            letter-spacing: -0.055em !important;
          }

          .about-bio-box {
            max-width: 620px !important;
          }
        }

        /* LAPTOP / HALFSCREEN */
        @media (max-width: 1279px) {
          .about-stage {
            max-width: 1320px !important;
            padding-left: clamp(1rem, 2.4vw, 2.8rem) !important;
            padding-right: clamp(1rem, 2.4vw, 2.8rem) !important;
          }

          .about-slide {
            gap: clamp(0.6rem, 1.8vw, 1.8rem) !important;
            justify-content: center !important;
          }

          .about-photo {
            width: clamp(280px, 30vw, 410px) !important;
          }

          .about-text {
            min-width: 560px !important;
            flex-basis: 920px !important;
            max-width: 920px !important;
            transform: translateX(-1rem);
          }

          .about-text h2 {
            font-size: clamp(2.55rem, 4.55vw, 4.8rem) !important;
            max-width: 920px !important;
            letter-spacing: -0.055em !important;
          }

          .about-bio-box {
            max-width: 590px !important;
          }
        }

        /* TABLET: SAMA KAYAK MOBILE, FOTO ATAS TEKS BAWAH */
@media (max-width: 1024px) {
  [data-section="about"] {
    min-height: 100svh !important;
  }

  .about-stage {
    min-height: 100svh !important;
    max-width: 760px !important;
    padding: clamp(1.4rem, 3vw, 2.4rem) clamp(1.2rem, 4vw, 2.4rem) !important;
    align-items: center !important;
  }

  .about-slide {
    flex-direction: column !important;
    flex-wrap: nowrap !important;
    justify-content: center !important;
    align-items: center !important;
    gap: clamp(0.9rem, 2vw, 1.35rem) !important;
    text-align: center !important;
  }

  .about-photo-wrap {
    width: 100% !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .about-photo {
    width: clamp(270px, 52vw, 390px) !important;
    max-width: 100% !important;
  }

  .about-text {
    width: min(92vw, 600px) !important;
    min-width: 0 !important;
    max-width: 600px !important;
    flex: 0 1 auto !important;
    align-items: center !important;
    text-align: center !important;
    transform: none !important;
  }

  .about-header {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    width: 100% !important;
    margin-bottom: clamp(0.75rem, 1.6vw, 1rem) !important;
  }

  .about-text h2 {
    font-size: clamp(2.45rem, 7vw, 4.45rem) !important;
    line-height: 0.94 !important;
    text-align: center !important;
    max-width: 600px !important;
    width: 100% !important;
    letter-spacing: -0.055em !important;
  }

  .about-bio-box {
    width: 100% !important;
    max-width: 520px !important;
    min-height: clamp(150px, 20vh, 190px) !important;
    text-align: center !important;
  }

  .about-pill {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .about-bio-text {
    font-size: clamp(0.84rem, 2.1vw, 1rem) !important;
    line-height: 1.68 !important;
    text-align: center !important;
  }
}

/* TABLET KECIL / MOBILE LANDSCAPE */
@media (max-width: 900px) {
  .about-stage {
    max-width: 680px !important;
    padding: 1.6rem 1.25rem !important;
  }

  .about-slide {
    gap: 0.95rem !important;
  }

  .about-photo {
    width: clamp(245px, 54vw, 350px) !important;
  }

  .about-text {
    width: min(94vw, 560px) !important;
    max-width: 560px !important;
  }

  .about-text h2 {
    font-size: clamp(2.25rem, 7.4vw, 4rem) !important;
    max-width: 560px !important;
  }

  .about-bio-box {
    max-width: 500px !important;
  }

  .about-bio-text {
    font-size: clamp(0.82rem, 2.2vw, 0.98rem) !important;
    line-height: 1.65 !important;
  }
}

        /* MOBILE: FOTO TENGAH, DESKRIPSI DI BAWAH */
        @media (max-width: 767px) {
          [data-section="about"] {
            min-height: 100svh !important;
          }

          .about-stage {
            min-height: 100svh !important;
            padding: 1.8rem 1.15rem !important;
            align-items: center !important;
          }

          .about-slide {
            flex-direction: column !important;
            flex-wrap: nowrap !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 0.9rem !important;
            text-align: center !important;
          }

          .about-photo-wrap {
            width: 100% !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .about-photo {
            width: clamp(245px, 74vw, 340px) !important;
            max-width: 100% !important;
          }

          .about-text {
            width: min(94vw, 500px) !important;
            min-width: 0 !important;
            max-width: 500px !important;
            flex: 0 1 auto !important;
            align-items: center !important;
            text-align: center !important;
            transform: none !important;
          }

          .about-header {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
            margin-bottom: 0.85rem !important;
          }

          .about-text h2 {
            font-size: clamp(2.25rem, 9.6vw, 4.1rem) !important;
            line-height: 0.94 !important;
            text-align: center !important;
            max-width: 500px !important;
            width: 100% !important;
            letter-spacing: -0.055em !important;
          }

          .about-bio-box {
            width: 100% !important;
            max-width: 440px !important;
            min-height: 175px !important;
            text-align: center !important;
          }

          .about-pill {
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .about-bio-text {
            font-size: clamp(0.82rem, 3.4vw, 0.98rem) !important;
            line-height: 1.68 !important;
            text-align: center !important;
          }
        }

        /* MOBILE SUPER SEMPIT */
        @media (max-width: 480px) {
          .about-text {
            width: min(95vw, 460px) !important;
            max-width: 460px !important;
          }

          .about-text h2 {
            font-size: clamp(2.05rem, 9vw, 3.45rem) !important;
            line-height: 0.95 !important;
            max-width: 460px !important;
            letter-spacing: -0.055em !important;
          }

          .about-bio-box {
            max-width: 410px !important;
          }
        }

        /* MOBILE PENDEK */
        @media (max-width: 767px) and (max-height: 760px) {
          .about-stage {
            padding-top: 1.1rem !important;
            padding-bottom: 1.1rem !important;
          }

          .about-photo {
            width: clamp(215px, 62vw, 295px) !important;
          }

          .about-text h2 {
            font-size: clamp(1.95rem, 8.4vw, 3.15rem) !important;
          }

          .about-bio-box {
            min-height: 145px !important;
          }

          .about-bio-text {
            font-size: clamp(0.76rem, 3.1vw, 0.9rem) !important;
            line-height: 1.55 !important;
          }
        }
      `}</style>
    </section>
  );
}