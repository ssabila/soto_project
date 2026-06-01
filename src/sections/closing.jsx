import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

/* komponen */
export default function ClosingSection() {
  const containerRef = useRef(null);

  const brownLayerRef = useRef(null);
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

      /* Initial quote states */
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

      /* Brown overlay states */
      gsap.set(brownLayerRef.current, {
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

      /* quote1 masuk */
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

      /* quote 2 masuk */
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

      /* zoom out brown layer */
      tl.to(
        brownLayerRef.current,
        {
          scale: 1.08,
          opacity: 0,
          duration: 1.05,
          ease: "power2.inOut",
        },
        "+=0.05"
      );

      /* Dots muncul*/
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

      /* final layout */
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
            mb-[clamp(1.4rem,3.5vh,2.5rem)]
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
              text-[#c2380f]
              [-webkit-text-stroke:0.35px_currentColor]
              [text-shadow:1px_1px_0_rgba(194,56,15,0.15)]

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
            bg-[#c2380f]
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
            border-[#c2380f]/60
            bg-[#fafdda]/55
            px-[clamp(1.5rem,4vw,2.8rem)]
            py-[clamp(1.2rem,3.2vh,2rem)]
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
              text-[clamp(0.75rem,1.2vw,0.95rem)]
              font-normal
              leading-relaxed
              tracking-[0.03em]
              text-[#2c1309]
              text-center
            "
          >
            From Aceh to Papua, soto takes a thousand forms —
            each one is a reflection of the hands that made it, the
            land it came from, and the table it was shared on.
          </p>
        </div>

      </div>

      {/* brown layer */}
      <div
        ref={brownLayerRef}
        className="
          absolute
          inset-0
          z-[6]
          h-full
          w-full
          bg-[#2c1309]
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
              text-[#fafdda]
              [-webkit-text-stroke:0.45px_currentColor]
              [text-shadow:1px_1px_0_rgba(250,253,218,0.18)]

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
              text-[#fafdda]
              [-webkit-text-stroke:0.42px_currentColor]
              [text-shadow:1px_1px_0_rgba(250,253,218,0.16)]

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