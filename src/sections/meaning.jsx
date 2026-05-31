import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { storyContent } from "../data/storytext";

// Import Assets
import sotoBetawi from "../assets/images/soto-betawi.svg";
import sotoLamongan from "../assets/images/soto-lamongan.svg";
import sotoKudus from "../assets/images/soto-kudus.svg";
import sotoPadang from "../assets/images/soto-padang.svg";
import sotoBanjar from "../assets/images/soto-banjar.svg";
import cotoMakassar from "../assets/images/coto-makasar.svg";

// Decor Assets
import bawangMerah from "../assets/images/bawang-merah.webp";
import cabe from "../assets/images/cabe.svg";
import bungaRetro from "../assets/images/bunga-retro.svg";
import starRetro from "../assets/images/star.svg";
import daunJeruk from "../assets/images/daun-jeruk.webp";
import asap from "../assets/images/asap.webp";

// Background Assets
import bgDecor1 from "../assets/images/background-1.svg";
import bgDecor2 from "../assets/images/background-2.svg";
import pattern from "../assets/images/retro-bg-pattern-v2.svg";

const mapNodes = [
  // Sumatra Area
  { src: sotoPadang, startX: "-45vw", startY: "-40vh", endX: "-30vw", endY: "-15vh", delay: 0, rotate: -10, type: 'bowl' },
  { src: cabe, startX: "-50vw", startY: "20vh", endX: "-35vw", endY: "-5vh", delay: 0.2, rotate: 15, type: 'decor' },
  { src: bungaRetro, startX: "-30vw", startY: "-50vh", endX: "-22vw", endY: "-28vh", delay: 0.4, rotate: 45, type: 'decor' },

  // Java Area
  { src: sotoBetawi, startX: "-15vw", startY: "45vh", endX: "-15vw", endY: "18vh", delay: 0.3, rotate: 5, type: 'bowl' },
  { src: sotoKudus, startX: "5vw", startY: "-40vh", endX: "-2vw", endY: "20vh", delay: 0.1, rotate: -5, type: 'bowl' },
  { src: sotoLamongan, startX: "40vw", startY: "50vh", endX: "10vw", endY: "15vh", delay: 0.5, rotate: 8, type: 'bowl' },
  { src: bawangMerah, startX: "-25vw", startY: "35vh", endX: "-8vw", endY: "28vh", delay: 0.7, rotate: -20, type: 'decor' },
  { src: starRetro, startX: "0vw", startY: "45vh", endX: "5vw", endY: "30vh", delay: 0.6, rotate: 20, type: 'decor' },

  // Kalimantan Area
  { src: sotoBanjar, startX: "20vw", startY: "-50vh", endX: "2vw", endY: "-15vh", delay: 0.3, rotate: -12, type: 'bowl' },
  { src: daunJeruk, startX: "35vw", startY: "-20vh", endX: "12vw", endY: "-10vh", delay: 0.2, rotate: 30, type: 'decor' },

  // Sulawesi Area
  { src: cotoMakassar, startX: "50vw", startY: "25vh", endX: "22vw", endY: "-2vh", delay: 0.6, rotate: 10, type: 'bowl' },
  { src: starRetro, startX: "45vw", startY: "-40vh", endX: "35vw", endY: "-10vh", delay: 0.8, rotate: -45, type: 'decor' },
  { src: bungaRetro, startX: "50vw", startY: "5vh", endX: "40vw", endY: "15vh", delay: 0.5, rotate: 90, type: 'decor' },
];

export default function MeaningSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bg1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const bg1Rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const bg2Y = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const bg2Rotate = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const bgGlowOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 0.6]);

  const t1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
  const t1Blur = useTransform(scrollYProgress, [0, 0.1], ["blur(12px)", "blur(0px)"]);
  const t1Y = useTransform(scrollYProgress, [0, 0.25], [40, -40]);

  const steamOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 0.8, 0.8, 0]);
  const steamY = useTransform(scrollYProgress, [0, 0.25], [60, -150]);
  const steamScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.5]);

  const t2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const t2Scale = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0.8, 1, 1.1]);
  const t2Y = useTransform(scrollYProgress, [0.25, 0.55], [20, -20]);

  const lineOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 0.8]);
  const pathLength = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  const fullText3 = storyContent.meaning.lines[2] || "Diverse… yet deeply connected.";
  const splitIndex = fullText3.indexOf("yet");
  const text3Part1 = fullText3.slice(0, splitIndex); 
  const text3Part2 = fullText3.slice(splitIndex);    

  const t3aOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const t3aY = useTransform(scrollYProgress, [0.65, 0.75], [30, 0]);
  const t3bOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const t3bScale = useTransform(scrollYProgress, [0.75, 0.85], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[450vh] bg-[#2C1309] font-inria">
      
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        <div
          className="absolute inset-0 z-0 opacity-15"
          style={{ backgroundImage: `url(${pattern})`, backgroundSize: "300px" }}
        />

        <motion.img
          src={bgDecor1}
          alt="Background Decor 1"
          className="absolute w-[120vw] md:w-[80vw] opacity-10 object-contain mix-blend-color-dodge pointer-events-none"
          style={{ y: bg1Y, rotate: bg1Rotate, left: "-10vw", top: "-10vh" }}
        />
        <motion.img
          src={bgDecor2}
          alt="Background Decor 2"
          className="absolute w-[120vw] md:w-[80vw] opacity-10 object-contain mix-blend-color-dodge pointer-events-none"
          style={{ y: bg2Y, rotate: bg2Rotate, right: "-10vw", bottom: "-10vh" }}
        />

        <motion.div 
          className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(252,211,77,0.15)_0%,transparent_65%)] pointer-events-none"
          style={{ opacity: bgGlowOpacity }}
        />

        <motion.svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-[0_0_12px_rgba(252,211,77,0.9)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ opacity: lineOpacity }}
          animate={{ filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <motion.path d="M 20 35 Q 35 45 35 68" fill="none" stroke="#FCD34D" strokeWidth="0.25" strokeDasharray="1 1" style={{ pathLength }} />
          <motion.path d="M 35 68 Q 45 75 60 65" fill="none" stroke="#FCD34D" strokeWidth="0.25" strokeDasharray="1 1" style={{ pathLength }} />
          <motion.path d="M 52 35 Q 50 50 60 65" fill="none" stroke="#FCD34D" strokeWidth="0.25" strokeDasharray="1 1" style={{ pathLength }} />
          <motion.path d="M 52 35 Q 65 40 72 48" fill="none" stroke="#FCD34D" strokeWidth="0.25" strokeDasharray="1 1" style={{ pathLength }} />
          <motion.path d="M 60 65 Q 68 58 72 48" fill="none" stroke="#FCD34D" strokeWidth="0.25" strokeDasharray="1 1" style={{ pathLength }} />
        </motion.svg>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          {mapNodes.map((node, i) => {
            const x = useTransform(scrollYProgress, [0.25, 0.65], [node.startX, node.endX]);
            const y = useTransform(scrollYProgress, [0.25, 0.65], [node.startY, node.endY]);
            const opacity = useTransform(scrollYProgress, [0, 0.15, 0.65], [0.1, 0.3, 1]);
            const scale = useTransform(scrollYProgress, [0.25, 0.65], [node.type === 'bowl' ? 1.3 : 0.8, 1]);
            const nodeRotate = useTransform(scrollYProgress, [0.25, 0.65], [node.rotate * 2, node.rotate]);

            return (
              <motion.div 
                key={i} 
                style={{ x, y, opacity, scale, rotate: nodeRotate }} 
                className="absolute"
              >
                <motion.img
                  src={node.src}
                  alt="Soto Element"
                  className={`object-contain drop-shadow-2xl cursor-pointer ${
                    node.type === 'bowl' ? 'w-16 md:w-28 lg:w-32' : 'w-8 md:w-12 lg:w-16'
                  }`}
                  animate={{ y: ["-5%", "5%", "-5%"], rotate: [node.rotate - 3, node.rotate + 3, node.rotate - 3] }}
                  transition={{ repeat: Infinity, duration: 4 + node.delay * 2, ease: "easeInOut", delay: node.delay }}
                  whileHover={{ 
                    scale: 1.15, 
                    filter: "drop-shadow(0px 0px 15px rgba(252,211,77,0.6))",
                    transition: { duration: 0.2 } 
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none text-center px-6 md:px-12">
          
          <motion.div className="absolute flex flex-col items-center" style={{ opacity: t1Opacity, y: t1Y, filter: t1Blur }}>
            <motion.img
              src={asap}
              alt="steam"
              className="absolute -top-40 md:-top-56 w-[250%] max-w-[800px] object-contain mix-blend-screen pointer-events-none"
              style={{ opacity: steamOpacity, y: steamY, scale: steamScale }}
            />
            <h2 className="text-[#FFF5D1] font-inria font-bold italic text-3xl md:text-5xl lg:text-6xl tracking-wide leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {storyContent.meaning.lines[0]}
            </h2>
          </motion.div>

          <motion.h2
            className="absolute text-[#FCD34D] font-beachfly text-4xl md:text-6xl lg:text-7xl tracking-widest drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
            style={{ opacity: t2Opacity, scale: t2Scale, y: t2Y }}
          >
            {storyContent.meaning.lines[1]}
          </motion.h2>

          <div className="absolute flex flex-col items-center gap-3 md:gap-6 mt-40 md:mt-56">
            <motion.h2
              className="text-[#FFF5D1] font-inria font-bold italic text-3xl md:text-5xl lg:text-6xl tracking-wider drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
              style={{ opacity: t3aOpacity, y: t3aY }}
            >
              {text3Part1}
            </motion.h2>
            <motion.h2
              className="text-[#FCD34D] font-beachfly text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.1em] drop-shadow-[0_0_25px_rgba(252,211,77,0.5)]"
              style={{ opacity: t3bOpacity, scale: t3bScale }}
            >
              {text3Part2}
            </motion.h2>
          </div>

        </div>
      </div>
    </section>
  );
}