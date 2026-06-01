import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═════════════════════════════════════════════════════════════
   COLORS
═════════════════════════════════════════════════════════════ */
const C = {
  cream: "#fafdda",
  brown: "#2a1f0e",
  ink: "#2a1f0e",
  rust: "#c2380f",
  orange: "#ff9721",
  saffron: "#c9880a",
  scarlet: "#c2380f",
  banana: "#f4d35e",
};

/* ===============================
   DECORATION DOTS
================================ */
const spiceDots = [
  { top: "7%", left: "5%", size: 11, color: C.saffron },
  { top: "11%", left: "87%", size: 7, color: C.scarlet },
  { top: "20%", left: "93%", size: 15, color: C.banana },
  { top: "78%", left: "4%", size: 13, color: C.scarlet },
  { top: "87%", left: "93%", size: 9, color: C.saffron },
  { top: "73%", left: "89%", size: 6, color: C.banana },
  { top: "69%", left: "2%", size: 10, color: C.saffron },
  { top: "91%", left: "48%", size: 5, color: C.scarlet },
  { top: "5%", left: "51%", size: 7, color: C.banana },
  { top: "50%", left: "1%", size: 5, color: C.saffron },
  { top: "45%", left: "96%", size: 8, color: C.scarlet },
];

/* ═════════════════════════════════════════════════════════════
   COMPONENT
═════════════════════════════════════════════════════════════ */
export default function ClosingSection() {
  const containerRef = useRef(null);

  const creamLayerRef = useRef(null);
  const dotsRef = useRef(null);

  const quote1Ref = useRef(null);
  const quote2Ref = useRef(null);

  const quote1WordRefs = useRef([]);
  const quote2WordRefs = useRef([]);

  const finalLayoutRef = useRef(null);
  const topLineRef = useRef(null);
  const midLineRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const quoteCardRef = useRef(null);
  const footerRef = useRef(null);

  const QUOTE_1 = "Because in the end, soto was never just about taste.";

  const QUOTE_2 =
    "It was about how many differences could still feel like home at one table.";

  const splitWords = (text, refArray) => {
    refArray.current = [];

    return text.split(" ").map((word, i) => (
      <span
        key={`${word}-${i}`}
        ref={(el) => {
          if (el) refArray.current[i] = el;
        }}
        className="
          mr-[0.25em]
          inline-block
          will-change-[transform,opacity,filter]
        "
      >
        {word}
      </span>
    ));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const q1 = quote1WordRefs.current;
      const q2 = quote2WordRefs.current;

      /* Initial text quote states */
      gsap.set(q1, {
        y: 42,
        opacity: 0,
        filter: "blur(8px)",
      });

      gsap.set(q2, {
        y: 24,
        opacity: 0,
        filter: "blur(12px)",
      });

      /* Layer states */
      gsap.set(creamLayerRef.current, {
        opacity: 1,
        scale: 1,
        transformOrigin: "center center",
      });

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
        filter: "blur(12px)",
      });

      gsap.set(quoteCardRef.current, {
        y: 28,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.98,
      });

      gsap.set(footerRef.current, {
        y: 18,
        opacity: 0,
        filter: "blur(8px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4400",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      /* ═════════════════════════════════════════════════════
         1. Quote 1 masuk
      ═════════════════════════════════════════════════════ */
      tl.to(q1, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.055,
      });

      tl.to({}, { duration: 0.8 });

      /* Quote 1 keluar */
      tl.to(q1, {
        y: -46,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.75,
        ease: "power2.in",
        stagger: {
          each: 0.035,
          from: "start",
        },
      });

      tl.to({}, { duration: 0.22 });

      /* ═════════════════════════════════════════════════════
         2. Quote 2 masuk
      ═════════════════════════════════════════════════════ */
      tl.to(q2, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.055,
      });

      tl.to({}, { duration: 0.95 });

      /* Quote 2 keluar */
      tl.to(q2, {
        y: -46,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.8,
        ease: "power2.in",
        stagger: {
          each: 0.035,
          from: "start",
        },
      });

      /* ═════════════════════════════════════════════════════
         3. Cream ke brown: zoom out + fade
      ═════════════════════════════════════════════════════ */
      tl.to(
        creamLayerRef.current,
        {
          scale: 1.08,
          opacity: 0,
          duration: 1.05,
          ease: "power2.inOut",
        },
        "+=0.05"
      );

      /* Dots muncul */
      tl.to(
        dotsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.55"
      );

      /* ═════════════════════════════════════════════════════
         4. Final layout masuk
      ═════════════════════════════════════════════════════ */
      tl.to(topLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      });

      tl.to(
        titleLine1Ref.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
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
          duration: 0.75,
          ease: "power3.out",
        },
        "-=0.45"
      );

      tl.to(
        midLineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.65,
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
          duration: 0.75,
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
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      tl.to({}, { duration: 1.3 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[#2a1f0e]
      "
    >
      {/* BROWN BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          z-0
          h-full
          w-full
          bg-[#2a1f0e]
        "
      >
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
              className="absolute rounded-full"
              style={{
                top: dot.top,
                left: dot.left,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                backgroundColor: dot.color,
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      </div>

      {/* FINAL BROWN LAYOUT */}
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
        {/* TOP LINE */}
        <div
          ref={topLineRef}
          className="
            mb-[clamp(1.4rem,3.5vh,2.5rem)]
            h-[2px]
            w-[min(48vw,580px)]
            bg-[#c9880a]
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
              text-[#fafdda]
              [-webkit-text-stroke:0.45px_currentColor]
              [text-shadow:1px_1px_0_rgba(250,253,218,0.18)]

              text-[clamp(2.6rem,8.6vw,6.6rem)]
              sm:text-[clamp(3rem,8.2vw,7rem)]
              md:text-[clamp(4rem,7.3vw,7.4rem)]
              lg:text-[clamp(4.7rem,6.9vw,7.8rem)]
              xl:text-[clamp(5.2rem,6.6vw,8.4rem)]
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
              text-[#ff9721]
              [-webkit-text-stroke:0.35px_currentColor]
              [text-shadow:1px_1px_0_rgba(255,151,33,0.16)]

              text-[clamp(2rem,6.9vw,4.8rem)]
              sm:text-[clamp(2.4rem,6.5vw,5.2rem)]
              md:text-[clamp(3.1rem,5.9vw,5.8rem)]
              lg:text-[clamp(3.7rem,5.3vw,6.2rem)]
              xl:text-[clamp(4.1rem,5vw,6.6rem)]
            "
          >
            Now, it's your turn to create one.
          </h2>
        </div>

        {/* MIDDLE LINE */}
        <div
          ref={midLineRef}
          className="
            mt-[clamp(1.7rem,4.5vh,3rem)]
            h-[2px]
            w-[min(48vw,580px)]
            bg-[#c9880a]
          "
        />

        {/* QUOTE CARD */}
        <div
          ref={quoteCardRef}
          className="
            relative
            mt-[clamp(1.8rem,5vh,3rem)]
            w-[min(82vw,500px)]
            rounded-[1rem]
            border
            border-[#c9880a]/55
            px-[clamp(1.5rem,4vw,2.8rem)]
            py-[clamp(1.2rem,3.2vh,2rem)]
            text-center
            shadow-[0_0_28px_rgba(0,0,0,0.12)]
          "
        >
          {/* CORNER BRACKETS */}
<span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-[#c9880a]" />
<span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-[#c9880a]" />
<span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-[#c9880a]" />
<span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-[#c9880a]" />

<p
  className="
    font-serif
    text-[clamp(0.75rem,1.2vw,0.95rem)]
    font-normal
    leading-relaxed
    tracking-[0.03em]
    text-[#fafdda]
    text-center
  "
>
  From Aceh to Papua, soto takes a thousand forms —
  each one is a reflection of the hands that made it, the
  land it came from, and the table it was shared on.
</p>

{/* <p
  className="
    mt-4
    text-center
    font-serif
    text-[clamp(0.72rem,1.3vw,0.9rem)]
    font-black
    uppercase
    tracking-[0.16em]
    text-[#f4d35e]
  "
>
  Indonesia — Satu Selera, Seribu Rasa
</p> */}
        </div>

        {/* FOOTER */}
        {/* <p
          ref={footerRef}
          className="
            mt-[clamp(1.8rem,5vh,3rem)]
            font-serif
            text-[clamp(0.62rem,1vw,0.75rem)]
            uppercase
            tracking-[0.45em]
            text-[#f4d35e]
          "
        >
          A story by Kicau Mania Team
        </p> */}
      </div>

      {/* CREAM LAYER WITH QUOTES */}
      <div
        ref={creamLayerRef}
        className="
          absolute
          inset-0
          z-[6]
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
            flex
            items-center
            justify-center
            px-[clamp(1.5rem,5vw,4rem)]
            text-center
          "
        >
          {/* Quote 1 */}
          <div
            ref={quote1Ref}
            className="
              absolute
              left-1/2
              top-1/2
              w-[min(88vw,980px)]
              -translate-x-1/2
              -translate-y-1/2

              font-title
              font-black
              leading-none
              tracking-[-0.025em]
              text-[#2a1f0e]
              [-webkit-text-stroke:0.45px_currentColor]
              [text-shadow:1px_1px_0_rgba(42,31,14,0.18)]

              text-[clamp(2.8rem,11vw,5.4rem)]
              sm:text-[clamp(3.2rem,9vw,6rem)]
              md:text-[clamp(3.8rem,7vw,7rem)]
              lg:text-[clamp(4.2rem,6.6vw,7.7rem)]
              xl:text-[clamp(4.6rem,6.5vw,8.4rem)]
            "
          >
            {splitWords(QUOTE_1, quote1WordRefs)}
          </div>

          {/* Quote 2 */}
          <div
            ref={quote2Ref}
            className="
              absolute
              left-1/2
              top-1/2
              w-[min(90vw,1080px)]
              -translate-x-1/2
              -translate-y-1/2

              font-title
              font-black
              leading-none
              tracking-[-0.025em]
              text-[#2a1f0e]
              [-webkit-text-stroke:0.42px_currentColor]
              [text-shadow:1px_1px_0_rgba(42,31,14,0.16)]

              text-[clamp(2.35rem,9.5vw,4.7rem)]
              sm:text-[clamp(2.8rem,8vw,5.3rem)]
              md:text-[clamp(3.3rem,6.2vw,6.1rem)]
              lg:text-[clamp(3.6rem,5.7vw,6.6rem)]
              xl:text-[clamp(4rem,5.5vw,7.2rem)]
            "
          >
            {splitWords(QUOTE_2, quote2WordRefs)}
          </div>
        </div>
      </div>
    </section>
  );
}