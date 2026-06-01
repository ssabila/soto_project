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
    greeting: "Halo, aku",
    name: "Sabila Bintang Kusuma Dewi",
    nickname: "Bila",
    photo: fotoBila,
    rotate: "-3deg",
    accentColor: "#c2380f",
    bio: "Namaku Sabila Bintang Kusuma Dewi atau biasa dipanggil Bila. Sekarang aku duduk di tingkat 3 di Polstat STIS dengan peminatan Sistem Informasi. Di web ini aku yang buat konten dan isi website soto ini loh!!",
  },
  {
    id: "dhira",
    greeting: "Halo, aku",
    name: "Qurany Nadhira Tsabita",
    nickname: "Dhira",
    photo: fotoDhira,
    rotate: "3deg",
    accentColor: "#25a734",
    bio: "Namaku Qurany Nadhira Tsabita atau biasa dipanggil Dhira. Sekarang aku duduk di tingkat 3 di Polstat STIS dengan peminatan Sistem Informasi. Di web ini aku yang buat opening, closing, footer, dan game interaktifnya loh!!",
  },
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
    gsap.set(cursor, { opacity: 1 });

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
    objectPosition: "center 0.1%",
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
          maxWidth: "1280px",
          minHeight: "clamp(430px, 62vh, 650px)",
          display: "grid",
          placeItems: "center",
          padding: "0 clamp(2rem, 5vw, 5.5rem)",
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
              gap: "clamp(1rem, 3vw, 4rem)",
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
                  width: "clamp(330px, 37vw, 520px)",
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
    flex: "0 1 760px",
    minWidth: "480px",
    maxWidth: "760px",
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
                    fontSize: "clamp(2rem, 5.2vw, 4rem)",
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
                    fontSize: "clamp(2.7rem, 5.6vw, 5.6rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    color: "#2a1f0e",
                    WebkitTextStroke: "0.5px #2a1f0e",
                    margin: 0,
                    maxWidth: "760px",
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
                  maxWidth: "590px",
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
          .about-slide {
            gap: clamp(2rem, 3.4vw, 4.2rem) !important;
            justify-content: center !important;
          }

          .about-photo {
            width: clamp(380px, 35vw, 540px) !important;
          }

          .about-text {
            flex-basis: 680px !important;
            max-width: 680px !important;
            transform: translateX(-1.2rem);
          }

          .about-text h2 {
            font-size: clamp(3.2rem, 5.4vw, 5.6rem) !important;
            max-width: 680px !important;
          }

          .about-bio-box {
            max-width: 590px !important;
          }
        }

        /* LAPTOP / HALFSCREEN */
        @media (max-width: 1279px) {
          .about-stage {
            max-width: 1180px !important;
            padding-left: clamp(1.4rem, 3.5vw, 3.8rem) !important;
            padding-right: clamp(1.4rem, 3.5vw, 3.8rem) !important;
          }

          .about-slide {
            gap: clamp(1rem, 2.8vw, 2.8rem) !important;
            justify-content: center !important;
          }

          .about-photo {
            width: clamp(300px, 34vw, 450px) !important;
          }

          .about-text {
            min-width: 420px !important;
            flex-basis: 620px !important;
            max-width: 620px !important;
            transform: translateX(-0.8rem);
          }

          .about-text h2 {
            font-size: clamp(2.7rem, 5.3vw, 5rem) !important;
            max-width: 620px !important;
          }

          .about-bio-box {
            max-width: 560px !important;
          }
        }

        /* TABLET: MASIH BERSAMPINGAN */
        @media (max-width: 1024px) {
          .about-stage {
            max-width: 980px !important;
            padding-left: clamp(1rem, 2.6vw, 2.2rem) !important;
            padding-right: clamp(1rem, 2.6vw, 2.2rem) !important;
          }

          .about-slide {
            gap: clamp(0.8rem, 2.2vw, 1.8rem) !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .about-photo {
            width: clamp(250px, 31vw, 350px) !important;
          }

          .about-text {
            min-width: 390px !important;
            flex-basis: 560px !important;
            max-width: 560px !important;
            transform: translateX(-0.6rem);
          }

          .about-text h2 {
            font-size: clamp(2.35rem, 4.8vw, 4.25rem) !important;
            line-height: 0.95 !important;
            max-width: 560px !important;
          }

          .about-bio-box {
            max-width: 510px !important;
          }
        }

        /* TABLET KECIL / HALFSCREEN SEMPIT: TETAP SAMPINGAN */
        @media (max-width: 900px) {
          .about-slide {
            gap: clamp(0.6rem, 1.8vw, 1.4rem) !important;
          }

          .about-photo {
            width: clamp(220px, 29vw, 300px) !important;
          }

          .about-text {
            min-width: 360px !important;
            flex-basis: 500px !important;
            max-width: 500px !important;
            transform: translateX(-0.4rem);
          }

          .about-text h2 {
            font-size: clamp(2.1rem, 4.4vw, 3.65rem) !important;
            line-height: 0.96 !important;
            max-width: 500px !important;
          }

          .about-bio-box {
            max-width: 470px !important;
          }

          .about-bio-text {
            font-size: clamp(0.78rem, 1.55vw, 0.95rem) !important;
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
            font-size: clamp(2.35rem, 10.2vw, 4.35rem) !important;
            line-height: 0.94 !important;
            text-align: center !important;
            max-width: 500px !important;
            width: 100% !important;
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
            font-size: clamp(2.15rem, 9.6vw, 3.6rem) !important;
            line-height: 0.95 !important;
            max-width: 460px !important;
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
            font-size: clamp(2rem, 8.8vw, 3.25rem) !important;
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