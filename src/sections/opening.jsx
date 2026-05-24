import React, { useRef } from "react";
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
import servinglid2 from "../assets/images/servinglid2.svg";
import servinglidSoto from "../assets/images/servinglid-soto.svg";

import sendokImg from "../assets/images/sendok-retro.svg";
import piringImg from "../assets/images/piring-retro.svg";
import garpuImg from "../assets/images/garpu-retro.svg";

gsap.registerPlugin(ScrollTrigger);

const OpeningSequence = () => {
  const container = useRef();

  useGSAP(
    () => {
      // =========================
      // INITIAL STATE
      // =========================

      gsap.set(".type-line", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      });

      gsap.set(".reveal-line", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      });

      gsap.set("#globe-1", {
        opacity: 0,
        y: 300,
        rotate: -10,
      });

      gsap.set(".ingredient", {
        opacity: 0,
        y: 200,
        scale: 0.8,
      });

      gsap.set(".tv-sequence", {
        xPercent: 100,
      });

      gsap.set(".one-dish-section", {
        opacity: 0,
      });

      gsap.set(".one-dish-wrapper", {
        x: 200,
      });

      gsap.set(".dish-block", {
        x: 300,
        opacity: 0,
        y: 0,
      });

      // Serving lids — dari bawah, no opacity transition
      gsap.set(".lid-soto", { y: 500, opacity: 0});
      gsap.set(".lid-1", { y: 500,opacity: 0 });
      gsap.set(".lid-2", { y: 500, opacity: 0 });

      // Soto scene — hidden
      gsap.set(".soto-scene", { opacity: 0 });
      gsap.set(".soto-title", { opacity: 0, y: 40 });
      gsap.set(".soto-sendok", { opacity: 0, scale: 0.7, x: -60 });
      gsap.set(".soto-piring", { opacity: 0, scale: 0.7 });
      gsap.set(".soto-garpu", { opacity: 0, scale: 0.7, x: 60 });

      // =========================
      // INTRO TIMELINE (autoplay, no scroll)
      // =========================

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

      // =========================
      // TIMELINE (scroll-driven)
      // =========================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=4000",
          scrub: 0.7,
          pin: true,
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
        },
        0
      );

      // =========================
      // GLOBE KELUAR
      // =========================

      tl.to(
        "#globe-1",
        {
          y: -900,
          opacity: 0,
          scale: 0.7,
          duration: 2.5,
          ease: "power3.inOut",
        },
        "+=0"
      );

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
          duration: 2.5,
          ease: "power3.out",
        },
        "-=1.8"
      );

      // =========================
      // TYPEWRITER TEXT 2
      // =========================

      tl.to(
        ".line-3",
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.3,
          ease: "steps(20)",
        },
        "-=2.5"
      );

      tl.to(
        ".line-4",
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "steps(10)",
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
          stagger: 0.05,
          ease: "power4.inOut",
        },
        "+=0.3"
      );

      // =========================
      // TV SEQUENCE MASUK
      // =========================

      tl.to(
        ".tv-sequence",
        {
          xPercent: -32,
          duration: 3,
          ease: "power4.out",
        },
        "-=1.5"
      );

      // =========================
      // TV SEQUENCE KELUAR
      // =========================

      tl.to(
        ".tv-sequence",
        {
          xPercent: -200,
          duration: 3,
          ease: "power4.inOut",
        },
        "+=0.3"
      );

      // =========================
      // ONE DISH SECTION MASUK
      // =========================

      tl.to(
        ".one-dish-section",
        {
          opacity: 1,
          duration: 0.3,
        },
        "-=2.5"
      );

      tl.to(
        ".one-dish-wrapper",
        {
          x: 0,
          duration: 2,
          ease: "power4.out",
        },
        "<"
      );

      // =========================
      // ONE DISH TEXT MASUK
      // =========================

      tl.to(
        ".dish-block",
        {
          x: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        },
        "-=1.5"
      );

      // =========================
      // SERVING LIDS MASUK — geser dari bawah
      // =========================

      tl.to(
        [".lid-soto", ".lid-1", ".lid-2"],
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
        "-=2"
      );

      // =========================
      // DISH BLOCK KELUAR — geser ke atas
      // =========================

      tl.to(
        ".dish-block",
        {
          y: -300,
          opacity: 0,
          duration: 1.6,
          ease: "power3.inOut",
        },
        "+=0.5"
      );

      // =========================
      // LID 1 KELUAR — keangkat ke atas
      // =========================

      tl.to(
        ".lid-1",
        {
          y: -700,
          duration: 1.8,
          ease: "power3.inOut",
        },
        "<"
      );

      // =========================
      // LID 2 KELUAR — turun ke bawah
      // =========================

      tl.to(
        ".lid-2",
        {
          y: 700,
          duration: 1.8,
          ease: "power3.inOut",
        },
        "<"
      );

      // =========================
      // SOTO CENTERED — geser ke tengah
      // =========================

      tl.to(
        ".lid-soto",
        {
          x: -300,
          y: -50,
          duration: 2,
          ease: "power4.inOut",
        },
        "<"
      );

      // =========================
      // SOTO SCENE REVEAL
      // =========================

      tl.to(
        ".soto-scene",
        {
          opacity: 1,
          duration: 0.1,
        },
        "-=0.8"
      );

      // =========================
      // SOTO TITLE MASUK
      // =========================

      tl.to(
        ".soto-title",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // =========================
      // CUTLERY + PIRING MASUK — pop out
      // =========================

      tl.to(
        [".soto-sendok", ".soto-piring", ".soto-garpu"],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <section
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
          w-full
          h-full
          object-cover
        "
      />

      {/* OPENING TEXT */}
      <div
        className="
          text-group
          absolute
          left-[5%]
          top-[23%]
          z-30
        "
      >
        <div
          className="
            font-title
            text-brand-green
            leading-[0.82]
            tracking-[-0.05em]
            text-[5.7rem]
            drop-shadow-[0_1px_0_#00703C]
          "
        >
          <div className="overflow-hidden">
            <div className="type-line line-1 whitespace-nowrap">
              Across thousands
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="type-line line-2 whitespace-nowrap">
              of islands...
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="type-line line-3 whitespace-nowrap">
              flavors are never
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="type-line line-4 whitespace-nowrap">
              the same.
            </div>
          </div>
        </div>
      </div>

      {/* TV SEQUENCE */}
      <div className="absolute inset-0 overflow-hidden z-40">
        <div
          className="
            tv-sequence
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            flex
            items-center
            gap-24
            px-[10vw]
            will-change-transform
          "
        >
          {/* LANDS */}
          <div className="flex flex-col items-center shrink-0">
            <div className="font-title text-brand-green text-[5rem] leading-none tracking-[-0.05em] mb-[-2rem] text-center">
              Different<br />Lands
            </div>
            <img src={tvLands} alt="" className="w-[420px] object-contain" />
          </div>

          {/* CULTURES */}
          <div className="flex flex-col items-center shrink-0">
            <div className="font-title text-brand-green text-[5rem] leading-none tracking-[-0.05em] mb-[-2rem] text-center">
              Different<br />Cultures
            </div>
            <img src={tvCultures} alt="" className="w-[420px] object-contain" />
          </div>

          {/* HANDS */}
          <div className="flex flex-col items-center shrink-0">
            <div className="font-title text-brand-green text-[5rem] leading-none tracking-[-0.05em] mb-[-2rem] text-center">
              Different<br />Hands
            </div>
            <img src={tvHands} alt="" className="w-[420px] object-contain" />
          </div>
        </div>
      </div>

      {/* ONE DISH SECTION */}
      <div className="one-dish-section absolute inset-0 z-60 pointer-events-none">
        <div className="one-dish-wrapper w-full h-full">

          {/* DISH BLOCK TEXT */}
          <div
            className="
              dish-block
              absolute
              left-[6%]
              top-[18%]
              font-title
              text-brand-green
              leading-[0.82]
              tracking-[-0.05em]
              text-[5.7rem]
              drop-shadow-[0_1px_0_#00703C]
            "
          >
            <div className="whitespace-nowrap">Still... one dish</div>
            <div className="whitespace-nowrap">continues to</div>
            <div className="whitespace-nowrap">appear.</div>
          </div>

          {/* SERVING LIDS */}
          <div className="absolute right-[-5%] top-[10%] w-[1200px] h-[1200px]">

            {/* SOTO BASE */}
            <img
              src={servinglidSoto}
              alt=""
              className="
                lid-soto
                absolute
                top-[-115px]
                right-[-50px]
                w-[900px]
                z-[59]
                object-contain
              "
            />

            {/* LID 1 — tutup, keluar ke atas */}
            <img
              src={servinglid1}
              alt=""
              className="
                lid-1
                absolute
                bottom-[42%]
                right-[-13%]
                w-[950px]
                z-[62]
                object-contain
              "
            />

            {/* LID 2 — tatakan, keluar ke bawah */}
            <img
              src={servinglid2}
              alt=""
              className="
                lid-2
                absolute
                bottom-[-55%]
                right-[-15%]
                w-[2500px]
                h-[2500px]
                z-[61]
                object-contain
              "
            />
          </div>
        </div>
      </div>

      {/* SOTO SCENE — pisah dari one-dish-section */}
      <div className="soto-scene absolute inset-0 z-[54] pointer-events-none">

        {/* SOTO TITLE */}
        <div
          className="
            soto-title
            absolute
            top-[6%]
            left-1/2
            -translate-x-1/2
            font-title
            text-brand-green
            text-[6rem]
            leading-none
            tracking-[-0.05em]
            whitespace-nowrap
            z-[60]
          "
        >
          Soto
        </div>

        {/* SENDOK */}
        <img
          src={sendokImg}
          alt=""
          className="
            soto-sendok
            absolute
            right-[700px]
            top-[20%]
            -translate-y-1/2
            w-[700px]
            z-[55]
            object-contain
          "
        />

        {/* PIRING*/}
        <img
          src={piringImg}
          alt=""
          className="
            soto-piring
            absolute
            left-[650px]
            top-[25%]
            -translate-x-1/2
            -translate-y-[45%]
            w-[600px]
            z-[58]
            object-contain
          "
        />

        {/* GARPU*/}
        <img
          src={garpuImg}
          alt=""
          className="
            soto-garpu
            absolute
            left-[700px]
            top-[20%]
            -translate-y-1/2
            w-[700px]
            z-[55]
            object-contain
          "
        />
      </div>

      {/* GLOBE */}
      <img
        id="globe-1"
        src={globeImg}
        alt=""
        className="
          absolute
          right-[-15%]
          top-[-4%]
          w-[760px]
          z-20
          will-change-transform
        "
      />

      {/* TOMATO */}
      <img
        src={tomatoImg}
        alt=""
        className="
          ingredient
          absolute
          right-[3%]
          top-[10%]
          w-[450px]
          z-20
          will-change-transform
        "
      />

      {/* CABE */}
      <img
        src={cabeImg}
        alt=""
        className="
          ingredient
          absolute
          right-[-7%]
          bottom-[-30%]
          w-[630px]
          z-20
          will-change-transform
        "
      />

      {/* BAWANG */}
      <img
        src={bawangImg}
        alt=""
        className="
          ingredient
          absolute
          left-[30%]
          bottom-[-18%]
          w-[380px]
          z-20
          will-change-transform
        "
      />

      {/* GARLIC */}
      <img
        src={garlicImg}
        alt=""
        className="
          ingredient
          absolute
          left-[50%]
          bottom-[-3%]
          w-[360px]
          z-20
          will-change-transform
        "
      />
    </section>
  );
};

export default OpeningSequence;