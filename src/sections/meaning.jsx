import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { storyContent } from "../data/storytext";
import { useSectionTransition } from '../hooks/useSectionTransition'

// Import Assets
import bawangMerah from "../assets/images/bawang-merah.webp";
import cabe from "../assets/images/cabe.webp";
import bungaRetro from "../assets/images/bunga-retro.webp";
import starRetro from "../assets/images/star.svg";
import daunJeruk from "../assets/images/daun-jeruk.webp";
import asap from "../assets/images/asap.webp";
import bgDecor3 from "../assets/images/background-3.webp";
import bgDecor4 from "../assets/images/background-4.webp";
import bgDecor5 from "../assets/images/background-5.webp";

const PHASE1_NODES = [
  {
    src: daunJeruk,
    endX: "14vw",
    endY: "18vh",
    startOffX: "35vw",
    startOffY: "40vh",
    delay: 0.3,
    rotate: 25,
    type: "decor",
  },
  {
    src: bawangMerah,
    endX: "22vw",
    endY: "-16vh",
    startOffX: "40vw",
    startOffY: "-35vh",
    delay: 0.5,
    rotate: 45,
    type: "decor",
  },
  {
    src: bungaRetro,
    endX: "-22vw",
    endY: "-20vh",
    startOffX: "-45vw",
    startOffY: "-45vh",
    delay: 0.4,
    rotate: 60,
    type: "decor",
  },
  {
    src: cabe,
    endX: "-18vw",
    endY: "16vh",
    startOffX: "-38vw",
    startOffY: "35vh",
    delay: 0.2,
    rotate: -15,
    type: "decor",
  },
  {
    src: starRetro,
    endX: "16vw",
    endY: "-14vh",
    startOffX: "35vw",
    startOffY: "-30vh",
    delay: 0.6,
    rotate: 35,
    type: "decor",
  },
];

const PHASE2_NODES = [
  {
    src: cabe,
    endX: "-28vw",
    endY: "-8vh",
    startOffX: "-50vw",
    startOffY: "25vh",
    delay: 0.2,
    rotate: 15,
    type: "decor",
  },
  {
    src: bungaRetro,
    endX: "-18vw",
    endY: "-24vh",
    startOffX: "-20vw",
    startOffY: "-50vh",
    delay: 0.4,
    rotate: 45,
    type: "decor",
  },
  {
    src: bawangMerah,
    endX: "-8vw",
    endY: "22vh",
    startOffX: "-30vw",
    startOffY: "45vh",
    delay: 0.7,
    rotate: -20,
    type: "decor",
  },
  {
    src: starRetro,
    endX: "8vw",
    endY: "22vh",
    startOffX: "6vw",
    startOffY: "50vh",
    delay: 0.6,
    rotate: 20,
    type: "decor",
  },
  {
    src: daunJeruk,
    endX: "16vw",
    endY: "-10vh",
    startOffX: "40vw",
    startOffY: "-28vh",
    delay: 0.2,
    rotate: 30,
    type: "decor",
  },
  {
    src: starRetro,
    endX: "28vw",
    endY: "-14vh",
    startOffX: "50vw",
    startOffY: "-48vh",
    delay: 0.8,
    rotate: -45,
    type: "decor",
  },
  {
    src: cabe,
    endX: "10vw",
    endY: "18vh",
    startOffX: "28vw",
    startOffY: "42vh",
    delay: 0.3,
    rotate: 25,
    type: "decor",
  },
  {
    src: bungaRetro,
    endX: "-10vw",
    endY: "0vh",
    startOffX: "-22vw",
    startOffY: "14vh",
    delay: 0.5,
    rotate: 60,
    type: "decor",
  },
];

const PHASE3_NODES = [
  {
    src: bungaRetro,
    endX: "-20vw",
    endY: "20vh",
    startOffX: "-38vw",
    startOffY: "42vh",
    delay: 0.1,
    rotate: -20,
    type: "decor",
  },
  {
    src: starRetro,
    endX: "20vw",
    endY: "-18vh",
    startOffX: "42vw",
    startOffY: "-38vh",
    delay: 0.3,
    rotate: 15,
    type: "decor",
  },
  {
    src: cabe,
    endX: "18vw",
    endY: "18vh",
    startOffX: "34vw",
    startOffY: "38vh",
    delay: 0.5,
    rotate: 25,
    type: "decor",
  },
  {
    src: bawangMerah,
    endX: "-18vw",
    endY: "-20vh",
    startOffX: "-34vw",
    startOffY: "-42vh",
    delay: 0.2,
    rotate: -10,
    type: "decor",
  },
  {
    src: starRetro,
    endX: "0vw",
    endY: "26vh",
    startOffX: "0vw",
    startOffY: "50vh",
    delay: 0.4,
    rotate: 60,
    type: "decor",
  },
  {
    src: daunJeruk,
    endX: "-26vw",
    endY: "5vh",
    startOffX: "-44vw",
    startOffY: "18vh",
    delay: 0.6,
    rotate: -35,
    type: "decor",
  },
  {
    src: bungaRetro,
    endX: "5vw",
    endY: "-22vh",
    startOffX: "8vw",
    startOffY: "-55vh",
    delay: 0.2,
    rotate: 45,
    type: "decor",
  },
];

const AFTERGLOW = [
  {
    src: bungaRetro,
    x: "25vw",
    y: "-45vh",
    scale: 0.4,
    rotate: 30,
    spd: 5.2,
    op: 0.16,
  },
  {
    src: starRetro,
    x: "-45vw",
    y: "40vh",
    scale: 0.32,
    rotate: -20,
    spd: 6.4,
    op: 0.13,
  },
  {
    src: cabe,
    x: "45vw",
    y: "-30vh",
    scale: 0.28,
    rotate: 55,
    spd: 7.1,
    op: 0.12,
  },
  {
    src: starRetro,
    x: "-25vw",
    y: "-40vh",
    scale: 0.26,
    rotate: -60,
    spd: 4.8,
    op: 0.1,
  },
  {
    src: bungaRetro,
    x: "55vw",
    y: "35vh",
    scale: 0.34,
    rotate: 75,
    spd: 8.0,
    op: 0.11,
  },
  {
    src: daunJeruk,
    x: "-50vw",
    y: "-20vh",
    scale: 0.28,
    rotate: -35,
    spd: 5.6,
    op: 0.09,
  },
];

// Komponen per-huruf dengan efek uap
function WavyText({ text, className, style }) {
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          animate={{
            y: char === " " ? 0 : [0, -5, 1, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.2 + (i % 4) * 0.35,
            delay: i * 0.045,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Single MapNode
function MapNode({ node, scrollYProgress, inRange, outRange }) {
  const [inStartRaw, inEndRaw] = inRange;
  const [outStartRaw, outEndRaw] = outRange;

  const inStart = Math.max(0, inStartRaw);
  const inEnd = Math.min(1, Math.max(inStart, inEndRaw));
  const outStart = Math.min(1, Math.max(inEnd, outStartRaw));
  const outEnd = Math.min(1, Math.max(outStart, outEndRaw));

  const x = useTransform(
    scrollYProgress,
    [inStart, inEnd],
    [node.startOffX, node.endX],
  );
  const y = useTransform(
    scrollYProgress,
    [inStart, inEnd],
    [node.startOffY, node.endY],
  );
  const scale = useTransform(
    scrollYProgress,
    [inStart, inEnd],
    [node.type === "bowl" ? 1.5 : 0.6, 1],
  );
  const rotate = useTransform(
    scrollYProgress,
    [inStart, inEnd],
    [node.rotate * 3, node.rotate],
  );

  const op1 = Math.max(0, inStart - 0.05);
  const op2 = Math.max(op1, Math.min(1, inStart + 0.1));
  const op3 = Math.max(op2, Math.min(1, outStart));
  const op4 = Math.max(op3, Math.min(1, outEnd));

  const opacity = useTransform(
    scrollYProgress,
    [op1, op2, op3, op4],
    [0, 0.8, 1, 0],
  );

  const sizeClass =
    node.type === "bowl" ? "w-20 md:w-32 lg:w-36" : "w-12 md:w-16 lg:w-20";

  return (
    <motion.div className="absolute" style={{ x, y, opacity, scale, rotate }}>
      <motion.img
        src={node.src}
        alt=""
        aria-hidden="true"
        className={`object-contain drop-shadow-2xl cursor-pointer select-none ${sizeClass}`}
        animate={{
          y: ["-4%", "4%", "-4%"],
          rotate: [node.rotate - 2, node.rotate + 2, node.rotate - 2],
        }}
        transition={{
          repeat: Infinity,
          duration: 4 + node.delay * 1.5,
          ease: "easeInOut",
          delay: node.delay,
        }}
        whileHover={{
          scale: 1.2,
          filter: "drop-shadow(0px 0px 18px rgba(255,151,33,0.8))",
          transition: { duration: 0.2 },
        }}
      />
    </motion.div>
  );
}

// Komponen Utama
export default function MeaningSection() {
  const containerRef = useRef(null);
  const transitionRef = useSectionTransition("meaning", 600, { autoScroll: true })  // ✅ aktifkan auto-scroll ke section ini saat transisi;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
    Timing:
    - Scroll section dipanjangkan ke 950vh.
    - Tiap teks punya fase fade in, stay, fade out.
    - Blur dikurangin biar lebih clean.
  */

  const bg3Op = useTransform(scrollYProgress, [0.0, 0.3, 0.42], [1, 1, 0]);

  const bg4Op = useTransform(
    scrollYProgress,
    [0.36, 0.48, 0.64, 0.74],
    [0, 1, 1, 0],
  );

  const bg5Op = useTransform(scrollYProgress, [0.68, 0.78, 1.0], [0, 1, 1]);

  // PHASE 1: "Soto is more than a dish."
  const t1Opacity = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.3, 0.38],
    [0, 1, 1, 0],
  );

  const t1Y = useTransform(scrollYProgress, [0.0, 0.08, 0.38], [60, 0, -35]);

  const t1Blur = useTransform(
    scrollYProgress,
    [0.0, 0.08],
    ["blur(6px)", "blur(0px)"],
  );

  const t1Scale = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.38],
    [0.88, 1, 1.03],
  );

  const steamOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.3, 0.38],
    [0, 0.65, 0.65, 0],
  );

  const steamY = useTransform(scrollYProgress, [0.0, 0.38], [100, -200]);

  const steamScale = useTransform(scrollYProgress, [0.0, 0.38], [0.9, 1.7]);

  // PHASE 2: "It is a reflection of a nation."
  const t2Opacity = useTransform(
    scrollYProgress,
    [0.38, 0.48, 0.66, 0.74],
    [0, 1, 1, 0],
  );

  const t2Y = useTransform(scrollYProgress, [0.38, 0.48, 0.74], [30, 0, -30]);

  const t2Blur = useTransform(
    scrollYProgress,
    [0.38, 0.48],
    ["blur(4px)", "blur(0px)"],
  );

  const t2Scale = useTransform(
    scrollYProgress,
    [0.38, 0.48, 0.74],
    [0.84, 1, 1.04],
  );

  // PHASE 3: "Diverse… yet deeply connected."
  const t3aOpacity = useTransform(scrollYProgress, [0.72, 0.8], [0, 1]);

  const t3aY = useTransform(scrollYProgress, [0.72, 0.8], [40, 0]);

  const t3aBlur = useTransform(
    scrollYProgress,
    [0.72, 0.8],
    ["blur(4px)", "blur(0px)"],
  );

  const t3yetOpacity = useTransform(scrollYProgress, [0.8, 0.86], [0, 1]);

  const t3yetScale = useTransform(scrollYProgress, [0.8, 0.86], [0.65, 1]);

  const t3yetBlur = useTransform(
    scrollYProgress,
    [0.8, 0.86],
    ["blur(3px)", "blur(0px)"],
  );

  const t3bOpacity = useTransform(scrollYProgress, [0.86, 0.94], [0, 1]);

  const t3bScale = useTransform(scrollYProgress, [0.86, 0.96], [0.82, 1]);

  const t3bBlur = useTransform(
    scrollYProgress,
    [0.86, 0.94],
    ["blur(5px)", "blur(0px)"],
  );

  return (
    <motion.section
      ref={(el) => {
        containerRef.current   = el   // untuk framer-motion scroll
        transitionRef.current  = el   // untuk useSectionTransition
      }}
      data-section="meaning" 
      className="relative h-[700vh]"
      style={{ fontFamily: "var(--font-body, 'InriaSerif', serif)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background SVGs */}
        <motion.img
          src={bgDecor3}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[-1]"
          style={{ opacity: bg3Op }}
        />

        <motion.img
          src={bgDecor4}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[-1]"
          style={{ opacity: bg4Op }}
        />

        <motion.img
          src={bgDecor5}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[-1]"
          style={{ opacity: bg5Op }}
        />

        {/* Afterglow */}
        <div className="absolute inset-0 pointer-events-none z-[5]">
          {AFTERGLOW.map((item, i) => (
            <motion.img
              key={`ag-${i}`}
              src={item.src}
              alt=""
              aria-hidden="true"
              className="absolute object-contain"
              style={{
                width: "clamp(20px, 3.5vw, 44px)",
                left: "50%",
                top: "50%",
                x: item.x,
                y: item.y,
                opacity: item.op,
                scale: item.scale,
                rotate: item.rotate,
              }}
              animate={{
                y: [item.y, `calc(${item.y} - 14px)`, item.y],
                rotate: [item.rotate, item.rotate + 10, item.rotate],
              }}
              transition={{
                repeat: Infinity,
                duration: item.spd,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Map Nodes */}
        <div className="absolute inset-0 flex items-center justify-center z-[30]">
          {PHASE1_NODES.map((node, i) => (
            <MapNode
              key={`p1-${i}`}
              node={node}
              scrollYProgress={scrollYProgress}
              inRange={[0.0, 0.14]}
              outRange={[0.32, 0.4]}
            />
          ))}

          {PHASE2_NODES.map((node, i) => (
            <MapNode
              key={`p2-${i}`}
              node={node}
              scrollYProgress={scrollYProgress}
              inRange={[0.4, 0.52]}
              outRange={[0.68, 0.75]}
            />
          ))}

          {PHASE3_NODES.map((node, i) => (
            <MapNode
              key={`p3-${i}`}
              node={node}
              scrollYProgress={scrollYProgress}
              inRange={[0.72, 0.82]}
              outRange={[0.96, 1.0]}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-[40] pointer-events-none text-center px-4 md:px-10">
          {/* Phase 1 */}
          <motion.div
            className="absolute flex flex-col items-center gap-2"
            style={{
              opacity: t1Opacity,
              y: t1Y,
              scale: t1Scale,
              filter: t1Blur,
            }}
          >
            <motion.img
              src={asap}
              alt=""
              aria-hidden="true"
              className="absolute -top-36 md:-top-52 w-[260%] max-w-[700px] object-contain mix-blend-screen pointer-events-none"
              style={{
                opacity: steamOpacity,
                y: steamY,
                scale: steamScale,
              }}
            />

            <motion.span
              className="text-[11px] md:text-xs tracking-[0.38em] uppercase mb-1 italic opacity-70"
              style={{
                color: "#f63b1c",
                fontFamily: "var(--font-body, 'InriaSerif', serif)",
                fontWeight: "bold",
              }}
              animate={{ opacity: [0.55, 0.8, 0.55] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
            >
              arising from the depths of the bowl
            </motion.span>

            <WavyText
              text={
                storyContent.meaning.lines[0] ?? "Soto is more than a dish."
              }
              className="text-[#1A0B04] font-bold italic text-2xl md:text-4xl lg:text-5xl tracking-wide leading-relaxed"
              style={{ fontFamily: "var(--font-body, 'InriaSerif', serif)" }}
            />

            <svg
              viewBox="0 0 300 18"
              className="w-48 md:w-72 mt-1 opacity-45"
              fill="none"
            >
              <path
                d="M10 9 Q75 2 150 9 Q225 16 290 9"
                stroke="#FF9721"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="9" r="2.5" fill="#FF9721" opacity="0.7" />
              <circle cx="290" cy="9" r="2.5" fill="#FF9721" opacity="0.7" />
              <circle cx="150" cy="9" r="2" fill="#FFF073" opacity="0.9" />
            </svg>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            className="absolute flex flex-col items-center gap-3"
            style={{
              opacity: t2Opacity,
              scale: t2Scale,
              y: t2Y,
              filter: t2Blur,
            }}
          >
            <motion.h2
              className="text-[#FFF073] font-bold text-3xl md:text-5xl lg:text-6xl tracking-widest leading-tight"
              style={{
                fontFamily: "var(--font-title, 'Beachfly', serif)",
                textShadow:
                  "0 0 40px rgba(255,240,115,0.30), 0 6px 20px rgba(0,0,0,0.8)",
              }}
            >
              {storyContent.meaning.lines[1] ??
                "It is a reflection of a nation."}
            </motion.h2>

            <div className="flex items-center gap-4 opacity-45 mt-1">
              <svg viewBox="0 0 24 24" className="w-4 md:w-5 fill-[#FF9721]">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>

              <svg viewBox="0 0 40 6" className="w-24 md:w-32" fill="none">
                <path
                  d="M4 3 Q20 0.5 36 3"
                  stroke="#FF9721"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>

              <svg viewBox="0 0 24 24" className="w-4 md:w-5 fill-[#FF9721]">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Phase 3 */}
        <div className="absolute inset-0 flex items-center justify-center z-[50] pointer-events-none text-center px-4 md:px-10">
          <div className="flex flex-col items-center gap-3 md:gap-5">
            <motion.h2
              className="text-[#FFF5D1] font-bold italic text-2xl md:text-4xl lg:text-5xl tracking-wider"
              style={{
                opacity: t3aOpacity,
                y: t3aY,
                filter: t3aBlur,
                fontFamily: "var(--font-body, 'InriaSerif', serif)",
                textShadow:
                  "0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,1)",
              }}
            >
              Diverse…
            </motion.h2>

            <motion.span
              className="text-[#FF9721] italic text-xl md:text-3xl lg:text-4xl"
              style={{
                opacity: t3yetOpacity,
                scale: t3yetScale,
                filter: t3yetBlur,
                fontFamily: "var(--font-body, 'InriaSerif', serif)",
                textShadow:
                  "0 0 24px rgba(255,151,33,0.55), 0 2px 12px rgba(0,0,0,1)",
              }}
            >
              yet
            </motion.span>

            <motion.div className="flex flex-col items-center gap-1">
              <motion.h2
                className="font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.08em]"
                style={{
                  opacity: t3bOpacity,
                  scale: t3bScale,
                  filter: t3bBlur,
                  fontFamily: "var(--font-title, 'Beachfly', serif)",
                  color: "var(--color-brand-yellow, #fff073)",
                  textShadow:
                    "0 0 32px rgba(255,240,115,0.5), 0 0 64px rgba(255,151,33,0.28), 0 8px 32px rgba(0,0,0,1)",
                }}
              >
                deeply connected.
              </motion.h2>

              <motion.svg
                viewBox="0 0 400 14"
                className="w-56 md:w-96"
                fill="none"
                style={{ opacity: t3bOpacity }}
                animate={{ opacity: [0.35, 0.8, 0.35] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M10 7 Q100 2 200 7 Q300 12 390 7"
                  stroke="#FFF073"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M30 10 Q100 6 200 10 Q300 14 370 10"
                  stroke="#FF9721"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
