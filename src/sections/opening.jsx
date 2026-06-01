import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import globeImg from "../assets/images/globe-1.svg";
import bgImg from "../assets/images/background-1.svg";

import cabeImg from "../assets/images/cabe.svg";
import tomatoImg from "../assets/images/tomato.svg";
import bawangImg from "../assets/images/bawang-retro.svg";
import garlicImg from "../assets/images/garlic-retro.svg";

import tvLands from "../assets/images/tv-lands.png";
import tvCultures from "../assets/images/tv-cultures.png";
import tvHands from "../assets/images/tv-hands.png";

import servinglid1 from "../assets/images/servinglid1.svg";
import servinglidSoto from "../assets/images/servinglid-soto.svg";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DEBUGGER VIEWPORT
   Hapus <ScreenDebugger /> nanti kalau layout udah final.
========================================================= */
const ScreenDebugger = () => {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getBreakpoint = () => {
    if (size.width >= 1536) return "2xl";
    if (size.width >= 1280) return "xl";
    if (size.width >= 1024) return "lg";
    if (size.width >= 768) return "md";
    if (size.width >= 640) return "sm";
    return "base";
  };

  return (
    <div
      className="
        fixed
        left-3
        bottom-3
        z-[9999]
        rounded-md
        bg-black/70
        px-3
        py-2
        text-xs
        font-mono
        text-white
        pointer-events-none
      "
    >
      <div>w: {size.width}px</div>
      <div>h: {size.height}px</div>
      <div>bp: {getBreakpoint()}</div>
    </div>
  );
};

/* =========================================================
   SHARED COLORS
========================================================= */
const COLOR_INK = "#2a1f0e";
const COLOR_RUST = "#c2380f";
const COLOR_ORANGE = "#ff9721";

/* =========================================================
   SHARED POSITION ANCHOR
========================================================= */
const SCENE_ANCHOR_Y = `
  top-[38%]
  min-[560px]:top-[42%]
  min-[620px]:top-[46%]
  sm:top-[45%]
  md:top-[50%]
  lg:top-[48%]
  xl:top-[20%]
  2xl:top-[50%]
`;

const STILL_ANCHOR_Y = `
  top-[34%]
  sm:top-[34%]
  md:top-[35%]
  lg:top-[34%]
  xl:top-[33%]
  2xl:top-[33%]
`;

const ONE_DISH_ANCHOR_Y = `
  top-[25%]
  sm:top-[31%]
  md:top-[25%]
  lg:top-[31%]
  xl:top-[25%]
  2xl:top-[25%]
`;

const SOTO_ANCHOR_Y = `
  top-[40%]
  sm:top-[40%]
  md:top-[40%]
  lg:top-[40%]
  xl:top-[40%]
  2xl:top-[40%]
`;

/* =========================================================
   FLOATING ASSETS
========================================================= */
const floatingAssets = [
  {
    id: "tomato",
    src: tomatoImg,
    className: `
      right-[-2.5rem]
      top-[9%]
      w-[clamp(150px,48vw,230px)]

      sm:right-[-2rem]
      sm:top-[9%]
      sm:w-[clamp(170px,44vw,260px)]

      md:right-[4%]
      md:top-[8%]
      md:w-[clamp(240px,30vw,380px)]

      lg:right-[5%]
      lg:top-[7%]
      lg:w-[clamp(290px,29vw,430px)]

      xl:right-[6%]
      xl:top-[6%]
      xl:w-[clamp(340px,28vw,500px)]
    `,
  },

  {
    id: "cabe",
    src: cabeImg,
    className: `
      right-[-5rem]
      bottom-[25%]
      min-[620px]:bottom-[-2%]
      w-[clamp(220px,68vw,340px)]

      sm:right-[-5.5rem]
      sm:bottom-[24%]
      sm:w-[clamp(250px,65vw,380px)]

      md:right-[-7%]
      md:bottom-[22%]
      md:w-[clamp(360px,42vw,570px)]

      lg:right-[-8%]
      lg:bottom-[-18%]
      lg:w-[clamp(430px,40vw,630px)]

      xl:right-[-7%]
      xl:bottom-[-20%]
      xl:w-[clamp(470px,35vw,670px)]

      2xl:right-[-8%]
      2xl:bottom-[-10%]
      2xl:w-[clamp(520px,34vw,720px)]
    `,
  },

  {
    id: "bawang",
    src: bawangImg,
    className: `
      left-[1.5rem]
      bottom-[33%]
      min-[620px]:bottom-[8%]
      w-[clamp(120px,36vw,180px)]

      sm:left-[-0.5rem]
      sm:top-[35%]
      sm:w-[clamp(140px,34vw,210px)]

      md:left-[10%]
      md:top-[50%]
      md:w-[clamp(180px,25vw,320px)]

      lg:left-[15%]
      lg:top-[48%]
      lg:w-[clamp(230px,25vw,380px)]

      xl:left-[30%]
      xl:top-[60%]
      xl:w-[clamp(280px,24vw,420px)]

      2xl:left-[20%]
      2xl:top-[60%]
      2xl:w-[clamp(300px,23vw,440px)]
    `,
  },

  {
    id: "garlic",
    src: garlicImg,
    className: `
      left-[38%]
      bottom-[40%]
      min-[620px]:bottom-[20%]
      w-[clamp(115px,34vw,175px)]

      sm:left-[33%]
      sm:bottom-[28%]
      sm:w-[clamp(135px,32vw,200px)]

      md:left-[43%]
      md:bottom-[35%]
      md:w-[clamp(170px,24vw,300px)]

      lg:left-[48%]
      lg:bottom-[-6%]
      lg:w-[clamp(230px,25vw,370px)]

      xl:left-[52%]
      xl:bottom-[5%]
      xl:w-[clamp(280px,24vw,430px)]

      2xl:left-[53%]
      2xl:bottom-[10%]
      2xl:w-[clamp(300px,23vw,450px)]
    `,
  },
];

/* =========================================================
   TV ITEMS
========================================================= */
const tvItems = [
  {
    first: "Different",
    second: "Lands",
    img: tvLands,
  },
  {
    first: "Different",
    second: "Cultures",
    img: tvCultures,
  },
  {
    first: "Different",
    second: "Hands",
    img: tvHands,
  },
];

const OpeningSection = () => {
  const container = useRef();

  useGSAP(
    () => {
      const resetFinalScene = () => {
        gsap.set(".one-dish-section", {
          opacity: 0,
          overwrite: "auto",
        });

        gsap.set(".text-still", {
          opacity: 0,
          y: 30,
          overwrite: "auto",
        });

        gsap.set([".text-one-dish", ".text-continues"], {
          opacity: 0,
          y: 30,
          overwrite: "auto",
        });

        gsap.set(".text-soto-final", {
          opacity: 0,
          y: 35,
          overwrite: "auto",
        });

        gsap.set(".lid-soto", {
          opacity: 0,
          y: 18,
          scale: 0.82,
          overwrite: "auto",
        });

        gsap.set(".lid-1", {
          opacity: 0,
          y: 18,
          scale: 0.84,
          overwrite: "auto",
        });
      };

      gsap.set(".type-line", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      });

      gsap.set("#globe-1", {
        opacity: 0,
        y: 300,
        rotate: -10,
        force3D: true,
      });

      gsap.set(".ingredient", {
        opacity: 0,
        y: 180,
        scale: 0.85,
        force3D: true,
      });

      /*
        TV motion:
        Pakai x berbasis viewport, bukan xPercent.
        Ini lebih smooth karena jaraknya konsisten di berbagai ukuran layar.
      */
      gsap.set(".tv-sequence", {
        x: "105vw",
        opacity: 1,
        force3D: true,
        willChange: "transform",
      });

      resetFinalScene();

      const introTl = gsap.timeline({ delay: 0.3 });

      introTl.to(".line-1", {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "steps(18)",
      });

      introTl.to(".line-2", {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "steps(12)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=4600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          // ini yang bersihin elemen final pas balik ke atas
          onLeaveBack: () => {
            resetFinalScene();
          },

          // ini safety tambahan kalau refresh terjadi pas posisi scroll di atas
          onRefresh: (self) => {
            if (self.progress === 0) {
              resetFinalScene();
            }
          },
        },
      });

      // =========================
      // GLOBE MASUK
      // =========================
      tl.to(
        "#globe-1",
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 2,
          ease: "power3.out",
          overwrite: "auto",
        },
        0
      );

      // =========================
      // GLOBE KELUAR
      // =========================
      tl.to("#globe-1", {
        y: -850,
        opacity: 0,
        scale: 0.75,
        duration: 2.4,
        ease: "power3.inOut",
        overwrite: "auto",
      });

      // =========================
      // INGREDIENT MASUK
      // =========================
      tl.to(
        ".ingredient",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 2.3,
          ease: "power3.out",
          overwrite: "auto",
        },
        "-=1.8"
      );

      // =========================
      // TEXT LANJUTAN
      // =========================
      tl.to(
        ".line-3",
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.3,
          ease: "steps(20)",
          overwrite: "auto",
        },
        "-=2.3"
      );

      tl.to(
        ".line-4",
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "steps(10)",
          overwrite: "auto",
        },
        "-=0.5"
      );

      // =========================
      // TEXT + INGREDIENT KELUAR
      // =========================
      tl.to(
        [".ingredient", ".text-group"],
        {
          x: -1400,
          opacity: 0,
          duration: 2,
          stagger: 0.04,
          ease: "power4.inOut",
          overwrite: "auto",
        },
        "+=0.4"
      );

      // =========================
      // TV MASUK — SMOOTH
      // =========================
      tl.to(
        ".tv-sequence",
        {
          x: "8vw",
          duration: 3.1,
          ease: "power2.inOut",
          overwrite: "auto",
        },
        "-=2"
      );

      // =========================
      // TV HOLD — BENTAR AJA
      // =========================
      tl.to(".tv-sequence", {
        x: "8vw",
        duration: 0.8,
        ease: "none",
        overwrite: "auto",
      });

      // =========================
      // TV KELUAR — SMOOTH + BENER-BENER HILANG
      // =========================
      tl.to(
        ".tv-sequence",
        {
          x: "-280vw",
          opacity: 0,
          duration: 4.5,
          ease: "power2.inOut",
          overwrite: "auto",
        },
        ">"
      );

      // =========================
      // ONE DISH SECTION REVEAL
      // =========================
      tl.to(
        ".one-dish-section",
        {
          opacity: 1,
          duration: 0.2,
          overwrite: "auto",
        },
        "-=0.65"
      );

      // =========================
      // STILL MUNCUL
      // =========================
      tl.to(
        ".text-still",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: "auto",
        },
        "-=1"
      );

      // =========================
      // STILL ILANG
      // =========================
      tl.to(
        ".text-still",
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
          overwrite: "auto",
        },
        "+=0.45"
      );

      // =========================
      // ONE DISH TEXT MUNCUL
      // =========================
      tl.to(
        [".text-one-dish", ".text-continues"],
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: "auto",
        },
        "-=0.1"
      );

      // =========================
      // SERVING LID 1 POP IN
      // =========================
      tl.to(
        ".lid-1",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "back.out(1.6)",
          overwrite: "auto",
        },
        "+=0.6"
      );

      // =========================
      // SOTO BASE POP IN
      // =========================
      tl.to(
        ".lid-soto",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "back.out(1.6)",
          overwrite: "auto",
        },
        "+=0.35"
      );

      // =========================
      // LID 1 GESER KE ATAS
      // =========================
      tl.to(
        ".lid-1",
        {
          y: -360,
          opacity: 0,
          scale: 0.85,
          duration: 1.15,
          ease: "power4.inOut",
          overwrite: "auto",
        },
        "+=0.45"
      );

      tl.to(
        [".text-one-dish", ".text-continues"],
        {
          opacity: 0,
          y: -20,
          duration: 0.45,
          ease: "power2.in",
          overwrite: "auto",
        },
        "<"
      );

      // =========================
      // TEKS "SOTO" MUNCUL
      // =========================
      tl.to(
        ".text-soto-final",
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto",
        },
        ">-0.2"
      );

      // =========================
      // SOTO BASE POP
      // =========================
      tl.to(
        ".lid-soto",
        {
          scale: 1.5,
          duration: 1.2,
          ease: "back.out(1.4)",
          overwrite: "auto",
        },
        "<0.15"
      );

      /* =========================================================
         GSAP REFRESH FIX — SAFE VERSION
         Jangan pakai tl.invalidate() di resize.
         Jangan observe pinned container, biar gak refresh loop.
      ========================================================= */
      let resizeTimer;
      let rafId;

      const refreshGsap = () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
          cancelAnimationFrame(rafId);

          rafId = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }, 150);
      };

      window.addEventListener("resize", refreshGsap);
      window.addEventListener("orientationchange", refreshGsap);

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          refreshGsap();
        });
      }

      const images = container.current?.querySelectorAll("img") || [];

      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", refreshGsap);
        }
      });

      refreshGsap();

      return () => {
        clearTimeout(resizeTimer);
        cancelAnimationFrame(rafId);

        introTl.kill();
        tl.kill();

        window.removeEventListener("resize", refreshGsap);
        window.removeEventListener("orientationchange", refreshGsap);

        images.forEach((img) => {
          img.removeEventListener("load", refreshGsap);
        });
      };
    },
    { scope: container }
  );

  return (
    <section
  id="opening"
  data-section="opening"
  ref={container}
  className="
    relative
    h-screen
    w-full
    overflow-hidden
    bg-brand-cream
  "
>
      

      {/* BACKGROUND */}
      <img
        src={bgImg}
        alt=""
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* OPENING TEXT */}
      <div
        className="
          text-group
          absolute
          z-30

          left-[clamp(1rem,5vw,4rem)]
          top-[clamp(5rem,17vh,10rem)]
          w-[calc(100%-2rem)]

          md:left-[clamp(2rem,5vw,5rem)]
          md:top-[clamp(8rem,22vh,13rem)]

          lg:left-[clamp(3rem,5.5vw,6rem)]
          lg:top-[clamp(8rem,20vh,13rem)]

          xl:left-[clamp(4rem,6vw,7rem)]
          xl:top-[clamp(7rem,18vh,13rem)]
        "
      >
        <div
          className="
            font-title
            font-black
            text-[#2a1f0e]
            leading-none
            tracking-[-0.025em]
            [-webkit-text-stroke:0.45px_currentColor]
            [text-shadow:1px_1px_0_rgba(42,31,14,0.18)]

            text-[clamp(3.6rem,10vw,7rem)]
            sm:text-[clamp(4rem,9vw,7.5rem)]
            md:text-[clamp(4.2rem,7.5vw,8rem)]
            lg:text-[clamp(4.4rem,7vw,8.5rem)]
            xl:text-[clamp(4.6rem,7vw,9.2rem)]
          "
        >
          <div className="overflow-hidden">
            <div className="type-line line-1 whitespace-nowrap">
              Across{" "}
              <span className="text-[#25a734] italic">thousands</span>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="type-line line-2 whitespace-nowrap text-[#2a1f0e]">
              of islands...
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="type-line line-3 whitespace-nowrap">
              flavors are{" "}
              <span className="text-[#c2380f] italic">never</span>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="type-line line-4 whitespace-nowrap">
              the same.
            </div>
          </div>
        </div>
      </div>

      {/* ASSET STAGE */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <div
          className="
            relative
            mx-auto
            h-full
            w-[min(100vw,1600px)]
          "
        >
          {/* GLOBE */}
          <img
            id="globe-1"
            src={globeImg}
            alt=""
            className="
              absolute
              z-20
              will-change-transform

              right-[-38%]
              top-[19%]
              w-[clamp(310px,92vw,540px)]

              sm:right-[-34%]
              sm:top-[18%]
              sm:w-[clamp(360px,85vw,620px)]

              md:right-[-18%]
              md:top-[20%]
              md:w-[clamp(500px,58vw,760px)]

              lg:right-[-13%]
              lg:top-[11%]
              lg:w-[clamp(620px,56vw,880px)]

              xl:right-[-10%]
              xl:top-[8%]
              xl:w-[clamp(720px,55vw,980px)]
            "
          />

          {floatingAssets.map((asset) => (
            <img
              key={asset.id}
              src={asset.src}
              alt=""
              className={`
                ingredient
                absolute
                z-20
                will-change-transform
                ${asset.className}
              `}
            />
          ))}
        </div>
      </div>

      {/* TV SEQUENCE */}
      <div className="absolute inset-0 z-40 overflow-hidden pointer-events-none">
        <div
          className={`
            tv-sequence
            absolute
            left-0
            flex
            -translate-y-1/2
            items-center
            will-change-transform

            ${SCENE_ANCHOR_Y}

            gap-[clamp(2rem,6vw,5rem)]
            px-[clamp(2rem,8vw,9rem)]

            md:gap-[clamp(3rem,5vw,5.5rem)]
            md:px-[clamp(4rem,8vw,9rem)]

            xl:gap-[clamp(4rem,6vw,7rem)]
            xl:px-[clamp(6rem,9vw,10rem)]
          `}
        >
          {tvItems.map((item, index) => (
            <div key={index} className="flex shrink-0 flex-col items-center">
              <div
                className="
                  mb-[clamp(-1rem,-1.5vw,-0.6rem)]
                  text-center
                  font-title
                  font-black
                  leading-none
                  tracking-[-0.025em]
                  text-[#2a1f0e]
                  [-webkit-text-stroke:0.35px_currentColor]
                  [text-shadow:1px_1px_0_rgba(42,31,14,0.16)]

                  text-[clamp(2rem,9vw,3.5rem)]
                  sm:text-[clamp(2.4rem,8vw,4rem)]
                  md:text-[clamp(3rem,5.3vw,4.6rem)]
                  lg:text-[clamp(3.4rem,5.7vw,5.2rem)]
                  xl:text-[clamp(3.8rem,5.5vw,5.5rem)]
                "
              >
                <span>{item.first}</span>
                <br />
                <span className="text-[#ff9721]">{item.second}</span>
              </div>

              <img
                src={item.img}
                alt=""
                className="
                  object-contain

                  w-[clamp(230px,72vw,360px)]
                  sm:w-[clamp(270px,62vw,400px)]
                  md:w-[clamp(330px,34vw,430px)]
                  lg:w-[clamp(390px,35vw,480px)]
                  xl:w-[clamp(420px,34vw,520px)]
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* ONE DISH SECTION */}
      <div className="one-dish-section pointer-events-none absolute inset-0 z-60">
        {/* STILL TEXT */}
        <div
          className={`
            absolute
            left-1/2
            z-[70]
            flex
            w-full
            -translate-x-1/2
            -translate-y-1/2
            flex-col
            items-center
            justify-center
            px-4

            ${STILL_ANCHOR_Y}
          `}
        >
          <div
            className="
              text-still
              whitespace-nowrap
              text-center
              font-title
              font-black
              leading-none
              tracking-[-0.025em]
              text-[#2a1f0e]
              [-webkit-text-stroke:0.45px_currentColor]

              text-[clamp(3rem,14vw,5.5rem)]
              md:text-[clamp(4rem,8vw,6.8rem)]
              xl:text-[clamp(5rem,8vw,7.8rem)]
            "
          >
            Still...
          </div>
        </div>

        {/* ONE DISH TEXT */}
        <div
          className={`
            absolute
            left-1/2
            z-[70]
            flex
            w-full
            -translate-x-1/2
            -translate-y-1/2
            flex-col
            items-center
            justify-center
            gap-1
            px-4

            ${ONE_DISH_ANCHOR_Y}

            md:gap-2
          `}
        >
          <div
            className="
              text-one-dish
              whitespace-nowrap
              text-center
              font-title
              font-black
              leading-none
              tracking-[-0.025em]
              text-[#c2380f]
              italic
              
              [-webkit-text-stroke:0.45px_currentColor]

              text-[clamp(3rem,14vw,5.5rem)]
              md:text-[clamp(4rem,8vw,6.8rem)]
              xl:text-[clamp(5rem,8vw,7.8rem)]
            "
          >
            one dish
          </div>

          <div
            className="
              text-continues
              whitespace-nowrap
              text-center
              font-title
              font-black
              leading-none
              tracking-[-0.025em]
              text-[#2a1f0e]
              [-webkit-text-stroke:0.45px_currentColor]

              text-[clamp(2.3rem,10vw,4.6rem)]
              md:text-[clamp(3.6rem,7vw,6.2rem)]
              xl:text-[clamp(4.4rem,7vw,7rem)]
            "
          >
            continues to appear.
          </div>
        </div>

        {/* FINAL SOTO GROUP */}
        <div
          className={`
            absolute
            left-1/2
            z-[72]
            flex
            w-full
            -translate-x-1/2
            -translate-y-1/2
            flex-col
            items-center
            justify-center
            px-4

            ${SOTO_ANCHOR_Y}
          `}
        >
          <div
            className="
              text-soto-final
              translate-y-4
              whitespace-nowrap
              text-center
              font-title
              font-black
              leading-none
              tracking-[-0.025em]
              text-[#ff9721]
              italic
              [-webkit-text-stroke:0.5px_currentColor]

              text-[clamp(4.5rem,22vw,8rem)]
              md:text-[clamp(6rem,12vw,10rem)]
              xl:text-[clamp(7rem,13vw,12rem)]
            "
          >
            Soto
          </div>

          <div
            className="
              soto-reveal-stage
              relative
              mt-[-0.8rem]
              -translate-y-30
              flex
              items-center
              justify-center

              h-[clamp(190px,36vh,400px)]
              w-[clamp(320px,82vw,620px)]

              sm:mt-[-1rem]
              sm:h-[clamp(210px,36vh,430px)]
              sm:w-[clamp(360px,76vw,700px)]

              md:mt-[-1.4rem]
              md:h-[clamp(260px,40vh,480px)]
              md:w-[clamp(460px,62vw,780px)]

              lg:mt-[-1.8rem]
              lg:h-[clamp(300px,42vh,520px)]
              lg:w-[clamp(560px,58vw,840px)]

              xl:mt-[-2.2rem]
              xl:h-[clamp(320px,42vh,540px)]
              xl:w-[clamp(640px,55vw,900px)]
            "
          >
            <img
              src={servinglidSoto}
              alt=""
              className="
                lid-soto
                absolute
                left-1/2
                top-1/2
                xl:top-[10%]
                2xl:top-[10%]
                z-[65]
                w-full
                -translate-x-1/2
                -translate-y-1/2
                object-contain
              "
            />

            <img
              src={servinglid1}
              alt=""
              className="
                lid-1
                absolute
                left-1/2
                top-1/2
                xl:top-[20%]
                2xl:top-[20%]
                2xl:right-[60%]
                z-[66]
                w-[95%]
                -translate-x-[53%]
                -translate-y-1/2
                object-contain
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningSection;