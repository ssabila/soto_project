import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import background5 from "../assets/images/background-5.svg";

gsap.registerPlugin(ScrollTrigger);

/* ═════════════════════════════════════════════════════════════
   COLORS
═════════════════════════════════════════════════════════════ */
const C = {
  cream: "#fafdda",
  brown: "#2c1309",
  rust: "#c2380f",
  burntOrange: "#d05a1f",
  saffron: "#c9880a",
  darkSaffron: "#9f6708",
  deepRed: "#8f2410",

  green: "#22a83a",
  deepGreen: "#14521c",

  tomato: "#f63b1c",
  warmYellow: "#ffbd59",
};

/* decoration elements */
const spiceDots = [
  { top: "7%", left: "5%", size: 11, color: C.rust, opacity: 0.82 },
  { top: "11%", left: "87%", size: 7, color: C.brown, opacity: 0.42 },
  { top: "20%", left: "93%", size: 15, color: C.saffron, opacity: 0.72 },
  { top: "78%", left: "4%", size: 13, color: C.deepRed, opacity: 0.78 },
  { top: "87%", left: "93%", size: 9, color: C.darkSaffron, opacity: 0.7 },
  { top: "73%", left: "89%", size: 6, color: C.rust, opacity: 0.78 },
  { top: "69%", left: "2%", size: 10, color: C.burntOrange, opacity: 0.72 },
  { top: "91%", left: "48%", size: 5, color: C.deepRed, opacity: 0.68 },
  { top: "5%", left: "51%", size: 7, color: C.darkSaffron, opacity: 0.62 },
  { top: "50%", left: "1%", size: 5, color: C.brown, opacity: 0.38 },
  { top: "45%", left: "96%", size: 8, color: C.rust, opacity: 0.75 },
  { top: "31%", left: "7%", size: 6, color: C.brown, opacity: 0.32 },
  { top: "61%", left: "94%", size: 11, color: C.saffron, opacity: 0.64 },
  { top: "16%", left: "24%", size: 5, color: C.deepRed, opacity: 0.58 },
  { top: "84%", left: "22%", size: 8, color: C.burntOrange, opacity: 0.62 },
];

const introQuoteParts = [
  { text: "In", className: "" },
  { text: "the", className: "" },
  { text: "end,", className: "" },
  { text: "soto", className: "text-[#f63b1c]" },
  { text: "is", className: "" },
  { text: "not", className: "" },
  { text: "just", className: "" },
  { text: "one", className: "" },
  { text: "recipe.", className: "" },

  { text: "It", className: "" },
  { text: "is", className: "" },
  { text: "a", className: "" },
  { text: "shared", className: "italic" },
  { text: "idea,", className: "italic" },
  { text: "shaped", className: "" },
  { text: "by", className: "" },
  { text: "local", className: "" },

  { text: "taste,", className: "text-[#ffbd59]" },
  { text: "local", className: "" },
  { text: "ingredients,", className: "text-[#ffbd59]" },
  { text: "and", className: "" },
  { text: "local", className: "" },
  { text: "culture.", className: "text-[#ffbd59]" },
];

export default function ClosingSection() {
  const containerRef = useRef(null);

  const greenLayerRef = useRef(null);
  const dotsRef = useRef(null);

  const introQuoteTextRef = useRef(null);
  const introQuoteCharRefs = useRef([]);
  const typeCursorRef = useRef(null);

  const finalLayoutRef = useRef(null);
  const topLineRef = useRef(null);
  const midLineRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const quoteCardRef = useRef(null);
  const footerRef = useRef(null);

  const renderStyledIntroQuote = () => {
    introQuoteCharRefs.current = [];

    let charIndex = 0;

    return introQuoteParts.map((part, wordIndex) => (
      <span
        key={`${part.text}-${wordIndex}`}
        className={`
          mr-[0.24em]
          inline-block
          ${part.className}
        `}
      >
        {part.text.split("").map((char, i) => {
          const currentIndex = charIndex;
          charIndex += 1;

          return (
            <span
              key={`${part.text}-${wordIndex}-${i}`}
              ref={(el) => {
                if (el) introQuoteCharRefs.current[currentIndex] = el;
              }}
              className="
                inline-block
                will-change-[opacity,transform,filter]
              "
            >
              {char}
            </span>
          );
        })}
      </span>
    ));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const introChars = introQuoteCharRefs.current.filter(Boolean);

      /* ═════════════════════════════════════════════
         INITIAL STATES
      ═════════════════════════════════════════════ */

      gsap.set(introQuoteTextRef.current, {
        opacity: 1,
      });

      gsap.set(introChars, {
        opacity: 0,
        y: 0,
        filter: "blur(0px)",
      });

      gsap.set(typeCursorRef.current, {
        opacity: 0,
      });

      /* Green batik intro layer */
      gsap.set(greenLayerRef.current, {
        opacity: 1,
        scale: 1,
        transformOrigin: "center center",
      });

      /* Dots muncul di final cream */
      gsap.set(dotsRef.current, {
        opacity: 0,
        scale: 0.96,
      });

      /* Final layout states */
      gsap.set(finalLayoutRef.current, {
        opacity: 1,
      });

      gsap.set([topLineRef.current, midLineRef.current], {
        scaleX: 0,
        transformOrigin: "center center",
        opacity: 0,
      });

      gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
        y: 36,
        opacity: 0,
        filter: "blur(8px)",
      });

      gsap.set(quoteCardRef.current, {
        y: 28,
        opacity: 0,
        filter: "blur(6px)",
        scale: 0.98,
      });

      gsap.set(footerRef.current, {
        y: 18,
        opacity: 0,
        filter: "blur(4px)",
      });

      /* ═════════════════════════════════════════════
         AUTO TYPEWRITER INTRO ANIMATION
         Jalan saat closing mulai masuk viewport
      ═════════════════════════════════════════════ */

      const introInTl = gsap.timeline({ paused: true });

      introInTl
        .to(typeCursorRef.current, {
          opacity: 1,
          duration: 0.15,
          ease: "none",
        })
        .to(
          introChars,
          {
            opacity: 1,
            duration: 0.015,
            ease: "none",
            stagger: {
              each: 0.035,
              from: "start",
            },
          },
          "<"
        )
        .to(typeCursorRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => introInTl.play(),
      });

      /* Cursor blink selama typewriter jalan */
      gsap.to(typeCursorRef.current, {
        opacity: 0.18,
        duration: 0.45,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      /* ═════════════════════════════════════════════
         PINNED SCROLL TIMELINE
      ═════════════════════════════════════════════ */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      /*
        Hold dulu.
        Karena teks typewriter auto masuk sebelum pin,
        bagian ini bikin user sempet baca sebelum keluar.
      */
      tl.to({}, { duration: 1.5 });

      /* Intro quote keluar */
      tl.to(introChars, {
        y: -36,
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.7,
        ease: "power2.in",
        stagger: {
          each: 0.006,
          from: "start",
        },
      });

      tl.to(
        typeCursorRef.current,
        {
          opacity: 0,
          duration: 0.15,
          ease: "none",
        },
        "<"
      );

      /* Green batik layer fade out to cream */
      tl.to(
        greenLayerRef.current,
        {
          scale: 1.04,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.05"
      );

      /* Dots muncul */
      tl.to(
        dotsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "power2.out",
        },
        "-=0.55"
      );

      /* Final layout masuk */
      tl.to(topLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
      });

      tl.to(
        titleLine1Ref.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.35"
      );

      tl.to(
        titleLine2Ref.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.45"
      );

      tl.to(
        midLineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.25"
      );

      tl.to(
        quoteCardRef.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.to(
        footerRef.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.2"
      );

      tl.to({}, { duration: 0.8 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="closing"
      data-section="closing"
      ref={containerRef}
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[#fafdda]
      "
    >
      {/* CREAM FINAL BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          z-0
          h-full
          w-full
          bg-[#fafdda]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_42%,rgba(194,56,15,0.07),transparent_42%),radial-gradient(circle_at_18%_82%,rgba(201,136,10,0.09),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(44,19,9,0.055),transparent_28%)]
          "
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
          }}
        />

        {/* SCATTERED DOTS */}
        <div
          ref={dotsRef}
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
          "
        >
          {spiceDots.map((dot, i) => (
            <span
              key={i}
              className="
                absolute
                rounded-full
                shadow-[0_2px_8px_rgba(44,19,9,0.14)]
              "
              style={{
                top: dot.top,
                left: dot.left,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                backgroundColor: dot.color,
                opacity: dot.opacity,
              }}
            />
          ))}
        </div>
      </div>

      {/* FINAL CREAM CONTENT */}
      <div
        ref={finalLayoutRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          flex
          flex-col
          items-center
          justify-center
          px-[clamp(1.2rem,4vw,4rem)]
          text-center
        "
      >
        <div
          ref={topLineRef}
          className="
            mb-[clamp(1.2rem,3vh,2.2rem)]
            h-[2px]
            w-[min(48vw,580px)]
            bg-[#c2380f]
          "
        />

        {/* TITLE */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <h1
            ref={titleLine1Ref}
            className="
              whitespace-nowrap
              font-title
              font-black
              leading-none
              tracking-[-0.035em]
              text-[#2c1309]
              [-webkit-text-stroke:0.45px_currentColor]
              [text-shadow:1px_1px_0_rgba(44,19,9,0.18)]

              text-[clamp(2.35rem,8vw,6.4rem)]
              sm:text-[clamp(2.8rem,7.8vw,6.8rem)]
              md:text-[clamp(3.8rem,7vw,7.2rem)]
              lg:text-[clamp(4.5rem,6.6vw,7.7rem)]
              xl:text-[clamp(5rem,6.3vw,8.2rem)]
            "
          >
            Every bowl tells a story.
          </h1>

          <h2
            ref={titleLine2Ref}
            className="
              mt-[clamp(0.35rem,1vh,0.8rem)]
              whitespace-nowrap
              font-title
              font-black
              italic
              leading-none
              tracking-[-0.04em]
              text-[#c2380f]
              [-webkit-text-stroke:0.35px_currentColor]
              [text-shadow:1px_1px_0_rgba(194,56,15,0.15)]

              text-[clamp(1.8rem,6.4vw,4.6rem)]
              sm:text-[clamp(2.25rem,6vw,5rem)]
              md:text-[clamp(3rem,5.6vw,5.6rem)]
              lg:text-[clamp(3.5rem,5.1vw,6rem)]
              xl:text-[clamp(3.9rem,4.8vw,6.4rem)]
            "
          >
            Now, it's your turn to create one.
          </h2>
        </div>

        {/* MIDDLE LINE */}
        <div
          ref={midLineRef}
          className="
            mt-[clamp(1.4rem,3.8vh,2.6rem)]
            h-[2px]
            w-[min(48vw,580px)]
            bg-[#c2380f]
          "
        />

        {/* QUOTE CARD */}
        <div
          ref={quoteCardRef}
          className="
            relative
            mt-[clamp(1.4rem,4vh,2.5rem)]
            w-[min(84vw,520px)]
            rounded-[1rem]
            border
            border-[#c2380f]/60
            bg-[#fafdda]/55
            px-[clamp(1.35rem,4vw,2.7rem)]
            py-[clamp(1.1rem,3vh,1.8rem)]
            text-center
            shadow-[0_14px_34px_rgba(44,19,9,0.12)]
            backdrop-blur-[1px]
          "
        >
          <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-[#c2380f]" />
          <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-[#c2380f]" />
          <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-[#c2380f]" />
          <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-[#c2380f]" />

          <p
            className="
              font-serif
              text-center
              text-[clamp(0.75rem,1.2vw,0.95rem)]
              font-normal
              leading-relaxed
              tracking-[0.03em]
              text-[#2c1309]
            "
          >
            From Aceh to Papua, soto takes a thousand forms — each one is a
            reflection of the hands that made it, the land it came from, and
            the table it was shared on.
          </p>
        </div>

        <div ref={footerRef} className="hidden" />
      </div>

      {/* GREEN BATIK INTRO LAYER */}
      <div
        ref={greenLayerRef}
        className="
          absolute
          inset-0
          z-[6]
          h-full
          w-full
          overflow-hidden
          bg-[#22a83a]
        "
      >
        {/* background-5 pattern */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
            bg-cover
            bg-center
            bg-repeat
          "
          style={{
            backgroundImage: `url(${background5})`,
          }}
        />

        {/* glow cream tipis aja, gradient gelap dihapus biar seamless */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_46%,rgba(250,253,218,0.04),transparent_52%)]
          "
        />

        {/* INTRO QUOTE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-[clamp(1.2rem,5vw,5rem)]
            text-center
          "
        >
          <div
            ref={introQuoteTextRef}
            className="
              absolute
              left-1/2
              top-1/2
              w-[min(90vw,1120px)]
              -translate-x-1/2
              -translate-y-1/2

              font-title
              font-black
              leading-[0.95]
              tracking-[-0.035em]
              text-[#fafdda]

              [-webkit-text-stroke:0.35px_rgba(250,253,218,0.35)]
              [text-shadow:0_2px_10px_rgba(20,82,28,0.32),0_1px_2px_rgba(0,0,0,0.18)]

              text-[clamp(2.15rem,8.7vw,4.6rem)]
              sm:text-[clamp(2.55rem,7.4vw,5.3rem)]
              md:text-[clamp(3.1rem,5.9vw,6rem)]
              lg:text-[clamp(3.5rem,5.2vw,6.6rem)]
              xl:text-[clamp(3.9rem,4.9vw,7rem)]
            "
          >
            {renderStyledIntroQuote()}

            {/* TYPEWRITER CURSOR */}
            <span
              ref={typeCursorRef}
              className="
                ml-[0.12em]
                inline-block
                h-[0.86em]
                w-[0.055em]
                translate-y-[0.08em]
                rounded-full
                bg-[#fafdda]
                align-baseline
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}