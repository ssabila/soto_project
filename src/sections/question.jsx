import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storyContent } from "../data/storytext.js";

import imgSereh from "../assets/images/sereh.webp";
import imgSoto from "../assets/images/soto-retro.webp";
import imgMangkok from "../assets/images/mangkok.webp";
import imgAsap from "../assets/images/asap.webp";
import imgBawangM from "../assets/images/bawang-merah.webp";
import imgBawangP from "../assets/images/bawang-putih.webp";
import imgDaunJeruk from "../assets/images/daun-jeruk.webp";
import imgGrain from "../assets/images/grain.webp";
import imgKunyit from "../assets/images/kunyit.webp";
import imgBlits from "../assets/images/blits.webp";
import imgStar from "../assets/images/star.svg";

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  { src: imgBawangM, name: "Shallots", rot: -14, size: 140 },
  { src: imgBawangP, name: "Garlic", rot: 10, size: 120 },
  { src: imgSereh, name: "Lemongrass", rot: -8, size: 160 },
  { src: imgDaunJeruk, name: "Citrus Leaves", rot: 12, size: 130 },
  { src: imgKunyit, name: "Turmeric", rot: -6, size: 150 },
];

const ING_POS = [
  { top: "12%", left: "6%" },
  { top: "60%", left: "4%" },
  { top: "22%", right: "5%" },
  { top: "68%", right: "6%" },
  { top: "42%", left: "8%" },
];

const ING_POS_MOBILE = [
  { top: "10%", left: "2%" },
  { top: "62%", left: "1%" },
  { top: "18%", right: "1%" },
  { top: "70%", right: "2%" },
  { top: "42%", left: "2%" },
];

const SPILL_COLORS = [
  "#c2410c",
  "#eab308",
  "#4d7c0f",
  "#f97316",
  "#fbbf24",
  "#c2380f",
  "#fff073",
  "#84cc16",
  "#fb923c",
  "#a16207",
];

const qLines = storyContent.question.lines;

const introWords = "What is soto??".split(" ");

const q0Parts = qLines[0].split("…");
const saLine1Words = q0Parts[0].trim().split(" ");
const q0Part2Words = q0Parts[1].trim().split(" ");
const saLine2Word = (q0Part2Words.shift() || "carry") + "…";

const sbWords = q0Part2Words;

const scTitleWords = "What makes them all".split(" ");
const scSotoWord = "soto?";

const scDescDesktop =
  "Though each region has its own version, they all share the same foundation: a comforting bowl of spiced broth, meat, vegetables, and aromatic seasonings. Soto is a beloved Indonesian soup enjoyed in countless forms across the Indonesian archipelago.";

const scDescMobile =
  "Despite their differences, every Soto shares the same foundation: spiced broth, meat, vegetables, and aromatic seasonings.";
  
export default function QuestionSection() {
  const pinWrapRef = useRef(null);
  const stageRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Angka 1024px biasanya mencakup layar iPad/Tablet dan Mobile
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    
    handleResize(); // Cek saat pertama kali render
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scene A
  const saIntroRef = useRef(null);
  const saLine1Ref = useRef(null);
  const saLine2Ref = useRef(null);
  const saRuleRef = useRef(null);
  const saStampTL = useRef(null);
  const saStampTR = useRef(null);
  const saAsterisk = useRef(null);

  // Scene B
  const sbSceneRef = useRef(null);
  const sbLabelRef = useRef(null);
  const sbWordRefs = useRef([null, null, null, null]);
  const sbBodyRef = useRef(null);
  const sbMangkokRef = useRef(null);
  const mangkokWrapRef = useRef(null);
  const spillDropsRef = useRef([]);
  const ingRefs = useRef(
    INGREDIENTS.map(() => ({ img: null, label: null, wrap: null })),
  );

  // Scene C
  const scSceneRef = useRef(null);
  const scSotoRef = useRef(null);
  const scAsapRef = useRef(null);
  const scBlitsRef = useRef(null);
  const scStarRef = useRef(null);
  const scTitleRef = useRef(null);
  const scSotoWordRef = useRef(null);
  const scDescRef = useRef(null);

  const scrollCueRef = useRef(null);
  const currentScene = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");

    const handleChange = () => {
      setIsMobile(media.matches);
    };

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      function jitter(targets, { delay = 0, stagger = 0.1, dur = 0.7 } = {}) {
        const els = Array.isArray(targets) ? targets : [targets];

        return gsap.fromTo(
          els.filter(Boolean),
          {
            opacity: 0,
            y: () => gsap.utils.random(30, 60),
            x: () => gsap.utils.random(-8, 8),
            rotation: () => gsap.utils.random(-6, 6),
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: 0,
            duration: dur,
            delay,
            stagger: { each: stagger, ease: "power2.inOut" },
            ease: "back.out(1.5)",
          },
        );
      }

      function microLive(el, amp = 1, spd = 3.8) {
        if (!el) return;

        gsap.to(el, {
          x: `+=${amp}`,
          y: `+=${amp * 0.5}`,
          rotation: `+=${amp * 0.4}`,
          duration: spd,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
        });
      }

      /* SCENE A */
      function resetA() {
        const saWords = stageRef.current?.querySelectorAll(".sa-word") ?? [];

        gsap.killTweensOf([
          saRuleRef.current,
          saStampTL.current,
          saStampTR.current,
          saAsterisk.current,
          ...saWords,
        ]);

        gsap.set(saRuleRef.current, { width: 0 });

        gsap.set([saStampTL.current, saStampTR.current, saAsterisk.current], {
          opacity: 0,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
        });

        saWords.forEach((w) =>
          gsap.set(w, {
            opacity: 0,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
          }),
        );
      }

      function playSceneA_In() {
        gsap.to(stageRef.current, { backgroundColor: Q.cream, duration: 1 });

        const tl = gsap.timeline();

        const saWords = [
          ...saIntroRef.current.querySelectorAll(".sa-word"),
          ...saLine1Ref.current.querySelectorAll(".sa-word"),
          ...saLine2Ref.current.querySelectorAll(".sa-word"),
        ];

        tl.fromTo(
          saWords,
          {
            opacity: 0,
            x: (i) =>
              i % 2 === 0 ? -window.innerWidth / 1.5 : window.innerWidth / 1.5,
            y: () => gsap.utils.random(-60, 60),
            rotation: (i) => (i % 2 === 0 ? -45 : 45),
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: "steps(8)",
          },
        );

        tl.to(
          saRuleRef.current,
          {
            width: "clamp(120px,22vw,240px)",
            duration: 1,
            ease: "steps(10)",
          },
          "-=0.8",
        );

        tl.fromTo(
          [saStampTL.current, saStampTR.current],
          { opacity: 0, scale: 0.55 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.35,
            duration: 0.8,
            ease: "steps(5)",
          },
          "-=0.8",
        );

        tl.fromTo(
          saAsterisk.current,
          { opacity: 0, scale: 0.3, rotation: -90 },
          {
            opacity: 0.5,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "steps(8)",
          },
          "-=1",
        );

        tl.call(() => {
          saWords.forEach((w) => microLive(w, 1.0, 3.5));
          microLive(saAsterisk.current, 2.5, 6);
          microLive(saStampTL.current, 0.5, 4.5);
          microLive(saStampTR.current, 0.5, 5);
        });
      }

      function playSceneA_Out() {
        const words = [
          ...(stageRef.current?.querySelectorAll(".sa-word") ?? []),
        ];

        gsap.to(words, {
          opacity: 0,
          rotation: () => gsap.utils.random(-30, 30),
          scale: 0.3,
          y: () => gsap.utils.random(-80, 80),
          x: () => gsap.utils.random(-40, 40),
          stagger: { each: 0.06, from: "random" },
          duration: 0.55,
          ease: "power2.in",
        });

        gsap.to(
          [
            saRuleRef.current,
            saStampTL.current,
            saStampTR.current,
            saAsterisk.current,
          ],
          { opacity: 0, duration: 0.4, stagger: 0.05 },
        );
      }

      /* SCENE B */
      function resetB() {
        const sbWords = sbWordRefs.current.filter(Boolean);
        // const currentPos = isMobile
        //   ? ING_POS_MOBILE[i]
        //   : ING_POS[i];

        gsap.killTweensOf([
          sbLabelRef.current,
          sbBodyRef.current,
          sbMangkokRef.current,
          mangkokWrapRef.current,
          ...sbWords,
        ]);

        gsap.set([sbLabelRef.current, sbBodyRef.current], {
          opacity: 0,
          y: 15,
        });

        sbWords.forEach((w) => gsap.set(w, { opacity: 0, scale: 1, y: 15 }));

        gsap.set(mangkokWrapRef.current, { opacity: 0, y: 150, scale: 0.5 });

        gsap.set(sbMangkokRef.current, {
          rotation: 0,
          x: 0,
          y: 0,
          transformOrigin: "50% 50%",
        });

        gsap.set(spillDropsRef.current.filter(Boolean), {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.2,
        });

        ingRefs.current.forEach((r, i) => {
          gsap.killTweensOf([r.img, r.label, r.wrap]);

          gsap.set(r.img, {
            opacity: 0,
            scale: 1,
            rotation: gsap.utils.random(-20, 20),
          });

          gsap.set(r.label, { opacity: 0, y: 8 });

          gsap.set(r.wrap, {
            top: ING_POS[i].top,
            left: ING_POS[i].left,
            right: ING_POS[i].right,
            bottom: "auto",
            xPercent: 0,
            yPercent: 0,
          });
        });

        gsap.set(sbSceneRef.current, { opacity: 0, pointerEvents: "none" });
      }

      function playSceneB_In() {
        gsap.set(sbSceneRef.current, { opacity: 1, pointerEvents: "auto" });

        const tl = gsap.timeline();

        tl.to([sbLabelRef.current, sbBodyRef.current], {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        });

        tl.add(
          jitter(sbWordRefs.current.filter(Boolean), {
            stagger: 0.14,
            dur: 0.72,
          }),
          "-=0.8",
        );

        ingRefs.current.forEach((r, i) => {
          const fromLeft = i % 2 !== 0;

          tl.fromTo(
            r.img,
            {
              opacity: 0,
              scale: 0.8,
              rotation: fromLeft ? -45 : 45,
              x: fromLeft ? -window.innerWidth / 1.5 : window.innerWidth / 1.5,
              y: gsap.utils.random(-60, 60),
            },
            {
              opacity: 1,
              scale: 1,
              rotation: INGREDIENTS[i].rot,
              x: 0,
              y: 0,
              duration: 1.5,
              ease: "steps(8)",
            },
            i === 0 ? "<" : "-=1.35",
          );

          tl.to(
            r.label,
            { opacity: 1, y: 0, duration: 0.5, ease: "steps(4)" },
            "-=1.2",
          );
        });

        tl.call(() => {
          sbWordRefs.current
            .filter(Boolean)
            .forEach((w) => microLive(w, 0.9, 3.2));

          ingRefs.current.forEach((r, i) =>
            microLive(r.img, 1.2 + i * 0.3, 4 + i * 0.5),
          );
        });
      }

      function playSceneB_To_Bowl() {
        const tl = gsap.timeline();
        const drops = spillDropsRef.current.filter(Boolean);

        tl.to(
          mangkokWrapRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "back.out(1.2)",
          },
          0,
        );

        ingRefs.current.forEach((r, i) => {
          tl.to(
            r.wrap,
            {
              top: "78%",
              left: "50%",
              right: "auto",
              xPercent: -50,
              yPercent: -50,
              duration: 1.1,
              ease: "power2.inOut",
            },
            0.1 + i * 0.08,
          );

          tl.to(
            r.img,
            {
              scale: 0.15,
              rotation: "+=240",
              opacity: 0,
              duration: 0.7,
              ease: "back.in(1.2)",
            },
            "-=0.4",
          );

          tl.to(r.label, { opacity: 0, duration: 0.2 }, "<");
        });

        tl.to(
          sbMangkokRef.current,
          { rotation: -7, duration: 0.2, ease: "power2.out" },
          "+=0.1",
        );

        tl.to(sbMangkokRef.current, {
          rotation: 7,
          duration: 0.18,
          ease: "power2.inOut",
        });

        tl.to(sbMangkokRef.current, {
          rotation: 0,
          duration: 0.18,
          ease: "power2.out",
        });

        tl.to({}, { duration: 0.25 });

        tl.set(sbMangkokRef.current, { transformOrigin: "15% 85%" });

        tl.to(sbMangkokRef.current, {
          rotation: 115,
          x: 50,
          y: -25,
          duration: 0.85,
          ease: "power3.inOut",
        });

        drops.forEach((drop, i) => {
          const angle = 10 + i * 14;
          const dist = 70 + i * 30;
          const rad = (angle * Math.PI) / 180;
          const tx = Math.cos(rad) * dist;
          const ty = Math.sin(rad) * dist;

          tl.fromTo(
            drop,
            { opacity: 0, x: 0, y: 0, scale: 0.1 },
            {
              opacity: 0.9,
              x: tx,
              y: ty,
              scale: 1,
              duration: 0.4 + (i % 4) * 0.06,
              ease: "expo.out",
            },
            `<${i * 0.025}`,
          );
        });

        tl.to(
          drops,
          {
            y: "+=280",
            opacity: 0,
            scale: 0.3,
            stagger: 0.02,
            duration: 0.7,
            ease: "power2.in",
          },
          "<0.2",
        );

        tl.to(sbMangkokRef.current, {
          rotation: 120,
          duration: 0.1,
          ease: "power1.out",
        });

        tl.to(sbMangkokRef.current, { rotation: 108, duration: 0.09 });
        tl.to(sbMangkokRef.current, { rotation: 116, duration: 0.09 });

        tl.to(
          mangkokWrapRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.65,
            duration: 0.5,
            ease: "power2.in",
          },
          "+=0.05",
        );

        return tl;
      }

      function playSceneB_From_Bowl() {
        const tl = gsap.timeline();

        gsap.set(sbMangkokRef.current, {
          rotation: 0,
          x: 0,
          y: 0,
          transformOrigin: "50% 50%",
        });

        gsap.set(spillDropsRef.current.filter(Boolean), {
          opacity: 0,
          x: 0,
          y: 0,
        });

        tl.to(
          mangkokWrapRef.current,
          {
            opacity: 0,
            y: 150,
            scale: 0.5,
            duration: 0.6,
            ease: "power2.in",
          },
          0,
        );

        ingRefs.current.forEach((r, i) => {
          tl.to(
            r.wrap,
            {
              top: ING_POS[i].top,
              left: ING_POS[i].left,
              right: ING_POS[i].right,
              xPercent: 0,
              yPercent: 0,
              duration: 1.0,
              ease: "power2.out",
            },
            Math.random() * 0.2,
          );

          tl.to(
            r.img,
            {
              scale: 1,
              rotation: "-=200",
              opacity: 1,
              duration: 0.8,
              ease: "back.out(1)",
            },
            "<",
          );

          tl.to(r.label, { opacity: 1, duration: 0.3 }, ">-0.3");
        });
      }

      function playSceneB_Out(direction = "down") {
        gsap.to(
          [
            sbLabelRef.current,
            sbBodyRef.current,
            ...sbWordRefs.current.filter(Boolean),
          ],
          {
            opacity: 0,
            y: direction === "down" ? -200 : 100,
            duration: 0.8,
            ease: "power2.inOut",
          },
        );

        gsap.to(mangkokWrapRef.current, {
          opacity: 0,
          y: direction === "down" ? 50 : 250,
          duration: 0.8,
          ease: "power2.inOut",
        });

        gsap.to(sbSceneRef.current, {
          y:
            direction === "down"
              ? -window.innerHeight / 1.5
              : window.innerHeight / 1.5,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
          onComplete: () =>
            gsap.set(sbSceneRef.current, { pointerEvents: "none", y: 0 }),
        });
      }

      function playSceneB_TextOut() {
        gsap.to(
          [
            sbLabelRef.current,
            sbBodyRef.current,
            ...sbWordRefs.current.filter(Boolean),
          ],
          {
            opacity: 0,
            y: -30,
            duration: 0.6,
            ease: "power2.inOut",
          },
        );
      }

      function setSceneB_Bowl_State() {
        gsap.set(sbSceneRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          y: 0,
        });

        gsap.set(
          [
            sbLabelRef.current,
            sbBodyRef.current,
            ...sbWordRefs.current.filter(Boolean),
          ],
          { opacity: 1, y: 0 },
        );

        gsap.set(mangkokWrapRef.current, { opacity: 1, y: 0, scale: 1 });

        gsap.set(sbMangkokRef.current, {
          rotation: 0,
          x: 0,
          y: 0,
          transformOrigin: "50% 50%",
        });

        gsap.set(spillDropsRef.current.filter(Boolean), { opacity: 0 });

        ingRefs.current.forEach((r) => {
          gsap.set(r.wrap, {
            top: "80%",
            left: "50%",
            right: "auto",
            xPercent: -50,
            yPercent: -50,
          });

          gsap.set(r.img, { scale: 1, opacity: 0, rotation: 180 });
          gsap.set(r.label, { opacity: 0 });
        });
      }

      /* SCENE C */
      function resetC() {
        const chars = scSceneRef.current?.querySelectorAll(".sc-char") || [];

        gsap.killTweensOf([
          scSotoRef.current,
          scAsapRef.current,
          scBlitsRef.current,
          scStarRef.current,
          scTitleRef.current,
          scSotoWordRef.current,
          scDescRef.current,
          ...chars,
          scSceneRef.current,
        ]);

        gsap.set(
          [
            scSotoRef.current,
            scAsapRef.current,
            scBlitsRef.current,
            scStarRef.current,
          ],
          { opacity: 0, scale: 0.5, rotation: 0 },
        );

        gsap.set([scTitleRef.current, scSotoWordRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
        });

        gsap.set(chars, { opacity: 0 });
        gsap.set(scDescRef.current, { opacity: 0, y: 18 });

        gsap.set(scSceneRef.current, {
          opacity: 0,
          y: window.innerHeight,
          pointerEvents: "none",
        });
      }

      function playSceneC_In() {
        gsap.set(scSceneRef.current, { pointerEvents: "auto" });

        const tl = gsap.timeline();

        gsap.to(scSceneRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        });

        gsap.to(stageRef.current, {
          backgroundColor: Q.ink,
          duration: 1.0,
          ease: "power2.inOut",
        });

        const chars = scSceneRef.current?.querySelectorAll(".sc-char") || [];

        tl.fromTo(
          chars,
          { opacity: 0, color: Q.gold },
          {
            opacity: 1,
            color: Q.cream,
            duration: 0.01,
            stagger: 0.03,
            ease: "none",
          },
          0.15,
        );

        tl.fromTo(
          scBlitsRef.current,
          { opacity: 0, scale: 0.1, rotation: -90 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1)",
          },
          0.55,
        );

        tl.fromTo(
          scStarRef.current,
          { opacity: 0, scale: 0.5, rotation: 45 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1.5)",
          },
          0.45,
        );

        gsap.to(scBlitsRef.current, {
          rotation: 360,
          duration: 30,
          ease: "none",
          repeat: -1,
        });

        gsap.to(scStarRef.current, {
          rotation: -360,
          duration: 40,
          ease: "none",
          repeat: -1,
        });

        tl.fromTo(
          scAsapRef.current,
          { opacity: 0, y: 60, scale: 0.7 },
          {
            opacity: 0.85,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          0.6,
        );

        tl.fromTo(
          scSotoRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.55,
            rotation: 10,
            x: 20,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            x: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          },
          0.85,
        );

        tl.to(
          scSotoRef.current,
          { x: -10, rotation: -5, duration: 0.07, ease: "power2.out" },
          "+=0.02",
        );

        tl.to(scSotoRef.current, { x: 12, rotation: 6, duration: 0.07 });
        tl.to(scSotoRef.current, { x: -7, rotation: -3, duration: 0.06 });
        tl.to(scSotoRef.current, { x: 5, rotation: 2, duration: 0.06 });

        tl.to(scSotoRef.current, {
          x: 0,
          rotation: 0,
          duration: 0.3,
          ease: "elastic.out(2, 0.35)",
        });

        tl.fromTo(
          scDescRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.1",
        );

        tl.call(() => {
          microLive(scSotoWordRef.current, 1.6, 4);

          gsap.to(scSotoWordRef.current, {
            color: [Q.orange, "#f63b1c", Q.orange],
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1,
          });

          gsap.to(scSotoRef.current, {
            y: "-=12",
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }

      function playSceneC_Out(onDone) {
        gsap.to(stageRef.current, {
          backgroundColor: Q.cream,
          duration: 0.8,
          ease: "power2.inOut",
        });

        gsap.to(scSceneRef.current, {
          opacity: 0,
          y: window.innerHeight,
          duration: 0.8,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(scSceneRef.current, { pointerEvents: "none" });
            resetC();
            onDone?.();
          },
        });
      }

      resetA();
      resetB();
      resetC();

      gsap.set(scrollCueRef.current, { opacity: 0 });

      let hasPlayedA = false;

      ScrollTrigger.create({
        trigger: pinWrapRef.current,
        pin: true,
        start: "top top",
        end: "+=400%",
        onEnter: () => {
          if (!hasPlayedA && currentScene.current === 0) {
            hasPlayedA = true;
            playSceneA_In();

            gsap.to(scrollCueRef.current, {
              opacity: 1,
              duration: 1.2,
              delay: 2.8,
            });

            gsap.to(scrollCueRef.current, {
              y: 9,
              duration: 1.6,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        },
        onLeaveBack: () => {
          if (hasPlayedA && currentScene.current === 0) {
            resetA();
            hasPlayedA = false;
          }
        },
        onUpdate(self) {
          const p = self.progress;
          let target = 0;

          if (p >= 0.2 && p < 0.45) target = 1;
          if (p >= 0.45 && p < 0.7) target = 2;
          if (p >= 0.7) target = 3;

          if (target === currentScene.current) return;

          const prev = currentScene.current;
          currentScene.current = target;

          gsap.to(scrollCueRef.current, { opacity: 0, duration: 0.3 });

          if (target === 1) {
            if (prev === 0) {
              playSceneA_Out();
              setTimeout(playSceneB_In, 500);
            } else if (prev === 2) {
              playSceneB_From_Bowl();
            } else if (prev === 3) {
              playSceneC_Out();
              setTimeout(() => {
                resetB();
                playSceneB_In();
              }, 500);
            }
          }

          if (target === 2) {
            if (prev === 1) {
              playSceneB_To_Bowl();
            } else if (prev === 3) {
              playSceneC_Out();
              setTimeout(setSceneB_Bowl_State, 100);
            } else if (prev === 0) {
              playSceneA_Out();
              setTimeout(() => {
                playSceneB_In();
                setTimeout(playSceneB_To_Bowl, 800);
              }, 500);
            }
          }

          if (target === 3) {
            if (prev === 2) {
              playSceneB_To_Bowl();
              setTimeout(playSceneB_TextOut, 1800);
              setTimeout(playSceneC_In, 2500);
            } else {
              playSceneB_Out("down");
              setTimeout(playSceneC_In, 400);
            }
          }

          if (target === 0) {
            if (prev === 1) {
              playSceneB_Out("up");
              setTimeout(() => {
                resetB();
                playSceneA_In();
              }, 500);
            } else if (prev > 1) {
              if (prev === 3) playSceneC_Out();
              else playSceneB_Out("up");

              setTimeout(() => {
                resetC();
                resetB();
                playSceneA_In();
              }, 600);
            }
          }
        },
      });
    }, pinWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="question" data-section="question" className="relative">
      <div ref={scrollCueRef} style={S.scrollCue} aria-hidden="true">
        <span style={S.scrollTxt}>scroll</span>
        <span style={S.scrollLine} />
      </div>

      <div ref={pinWrapRef} style={S.pinWrap}>
        <div ref={stageRef} style={S.stage}>
          <img
            src={imgGrain}
            alt=""
            aria-hidden="true"
            style={S.grainOverlay}
          />

          <div style={S.ruledLines} />
          <div style={S.marginLine} />

          {/* SCENE A */}
          <div style={S.scene}>
            <div
              ref={saStampTL}
              style={{
                ...S.stamp,
                top: isMobile ? 30 : 52, // Sedikit lebih ke atas di mobile
                left: isMobile ? 0 : "clamp(72px,10vw,140px)",
                right: isMobile ? 0 : "auto",
                margin: isMobile ? "0 auto" : "0",
                width: "fit-content", // Wajib agar margin auto bekerja
                transform: isMobile ? "rotate(0deg)" : "rotate(-5deg)",
              }}
            >
              Nusantara Collection
            </div>

            <div
              ref={saStampTR}
              style={{
                ...S.stamp,
                top: isMobile ? "auto" : 60,
                bottom: isMobile ? 80 : "auto", // Beri jarak dari bawah saat mobile
                left: isMobile ? 0 : "auto",
                right: isMobile ? 0 : "clamp(24px,5vw,80px)",
                margin: isMobile ? "0 auto" : "0",
                width: "fit-content", // Wajib agar margin auto bekerja
                transform: isMobile ? "rotate(0deg)" : "rotate(3deg)",
              }}
            >
              Est. Abad XVI
            </div>

            <div ref={saAsterisk} style={S.asterisk}>
              ✳
            </div>

            <div style={S.sceneAContent}>
              <div style={S.lineWrap}>
                <div ref={saIntroRef} style={S.headlineLine}>
                  {introWords.map((w, i) => (
                    <span
                      key={w + i}
                      className="sa-word"
                      style={{
                        ...S.headWord,
                        ...(i === 2 ? S.wordAccent : {}),
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>

                <div ref={saLine1Ref} style={S.headlineLine}>
                  {saLine1Words.map((w, i) => (
                    <span
                      key={w + i}
                      className="sa-word"
                      style={{
                        ...S.headWord,
                        ...(i === 1 ? S.wordAccent : {}),
                        ...(i === 3 ? S.wordWarm : {}),
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>

                <div ref={saLine2Ref} style={S.headlineLine}>
                  <span className="sa-word" style={S.headWord}>
                    {saLine2Word}
                  </span>
                </div>
              </div>

              <div ref={saRuleRef} style={S.rule} />
            </div>
          </div>

          {/* SCENE B */}
          <div
            ref={sbSceneRef}
            style={{
              ...S.scene,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
  
            {INGREDIENTS.map((ing, i) => {
              const currentPos = isMobile
                ? ING_POS_MOBILE[i]
                : ING_POS[i];

              return (
                <div
                  key={ing.name}
                  ref={(el) => {
                    if (ingRefs.current[i]) ingRefs.current[i].wrap = el;
                  }}
                  style={{
                    ...S.ingWrap,
                    top: currentPos.top,
                    left: currentPos.left,
                    right: currentPos.right,
                  }}
                >
                  <img
                    ref={(el) => {
                      if (ingRefs.current[i]) ingRefs.current[i].img = el;
                    }}
                    src={ing.src}
                    alt={ing.name}
                    style={{
                      ...S.ingImg,
                      width:
                        isMobile
                          ? ing.size * 0.6
                          : window.innerWidth <= 1024
                            ? ing.size * 0.8
                            : ing.size,
                    }}
                  />

                  <p
                    ref={(el) => {
                      if (ingRefs.current[i]) ingRefs.current[i].label = el;
                    }}
                    style={S.ingLabel}
                  >
                    {ing.name}
                  </p>
                </div>
              );
            })}
            <p ref={sbLabelRef} style={{ ...S.eyebrow, marginBottom: 16, textAlign:"center", maxWidth: isMobile ? "80%" : "none", lineHeight: 1.3 }}>
              From every corner of the Nusantara
            </p>

            <div style={S.lineWrap}>
              {[
                [
                  [sbWords[0] || "so", false],
                  [sbWords[1] || "many", true],
                ],
                [[sbWords[2] || "different", false]],
                [[sbWords.slice(3).join(" ") || "identities.", false]],
              ].map((line, li) => (
                <div key={li} style={S.headlineLine}>
                  {line.map(([w, it], wi) => (
                    <span
                      key={w + wi}
                      ref={(el) =>
                        (sbWordRefs.current[li === 0 ? wi : li === 1 ? 2 : 3] =
                          el)
                      }
                      style={{
                        ...S.headWord,
                        fontSize: "clamp(3rem,7.5vw,7rem)",
                        ...(it ? S.wordAccent : {}),
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <p ref={sbBodyRef} style={{ ...S.bodyText, marginTop: 20 }}>
              Each region brings its own spices.
              <br />
              Every hand leaves its own signature behind.
            </p>

            <div ref={mangkokWrapRef} style={S.mangkokWrap}>
              <img
                ref={sbMangkokRef}
                src={imgMangkok}
                alt="Empty Bowl"
                style={S.mangkokImgInner}
              />

              {SPILL_COLORS.map((color, i) => (
                <div
                  key={i}
                  ref={(el) => (spillDropsRef.current[i] = el)}
                  style={{
                    ...S.spillDrop,
                    width: `${9 + (i % 5) * 7}px`,
                    height: `${9 + (i % 5) * 7}px`,
                    backgroundColor: color,
                    borderRadius:
                      i % 3 === 0
                        ? "50%"
                        : `${30 + i * 4}% ${70 - i * 3}% ${
                            50 + i * 5
                          }% ${40 - i * 2}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* SCENE C */}
          <div
            ref={scSceneRef}
            style={{ ...S.scene, flexDirection: "column", padding: "20px" }}
          >
            <div ref={scTitleRef} style={S.sceneCTitle}>
              <div style={S.headlineLine}>
                {scTitleWords.map((w, i) => (
                  <span
                    key={w + i}
                    style={{
                      ...S.headWord,
                      color: Q.cream,
                      fontSize: "clamp(2.25rem,4.6vw,5rem)",
                    }}
                  >
                    {w.split("").map((c, ci) => (
                      <span key={ci} className="sc-char">
                        {c}
                      </span>
                    ))}
                    &nbsp;
                  </span>
                ))}
              </div>

              <div>
                <span
                  ref={scSotoWordRef}
                  style={{
                    ...S.sotoWord,
                    fontSize: "clamp(3.5rem,8vw,7.5rem)",
                  }}
                >
                  {scSotoWord.split("").map((c, i) => (
                    <span key={i} className="sc-char">
                      {c}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <div style={S.sotoImgsContainer}>
              <img ref={scBlitsRef} src={imgBlits} alt="" style={S.scBlits} />
              <img ref={scStarRef} src={imgStar} alt="" style={S.scStar} />
              <img ref={scAsapRef} src={imgAsap} alt="" style={S.scAsap} />

              <img
                ref={scSotoRef}
                src={imgSoto}
                alt="Soto Nusantara"
                style={S.scSoto}
              />
            </div>

            <p
              ref={scDescRef}
              style={{
                ...S.sceneCDesc,
                ...(isMobile ? S.sceneCDescMobile : S.sceneCDescDesktop),
              }}
            >
              {isMobile ? scDescMobile : scDescDesktop}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const Q = {
  cream: "#f9fdda",
  creamD: "#eee8b8",
  ink: "#2a1f0e",
  ink2: "#5a4220",
  rust: "#c2380f",
  gold: "#c9880a",
  orange: "#ff9721",
  yellow: "#fff073",
};

const S = {
  pinWrap: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },

  stage: {
    position: "relative",
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: Q.cream,
  },

  grainOverlay: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.18,
    mixBlendMode: "multiply",
    zIndex: 1,
    pointerEvents: "none",
  },

  ruledLines: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent 38px, rgba(42,31,14,0.09) 38px, rgba(42,31,14,0.09) 39px)`,
  },

  marginLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "clamp(48px,7vw,88px)",
    width: 2,
    background: "rgba(194,56,15,0.18)",
    zIndex: 1,
    pointerEvents: "none",
  },

  scene: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  stamp: {
    position: "absolute",
    border: `2px solid ${Q.rust}`,
    color: Q.rust,
    fontFamily: "InriaSerif, Lora, serif",
    fontSize: "0.55rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "5px 10px",
    whiteSpace: "nowrap",
    zIndex: 20,
  },

  asterisk: {
    position: "absolute",
    bottom: "8%",
    right: "clamp(20px,5vw,80px)",
    fontSize: "6.5rem",
    color: Q.yellow,
    fontFamily: "Playfair Display, serif",
    textShadow: `3px 3px 0 ${Q.gold}`,
    lineHeight: 1,
    userSelect: "none",
    zIndex: 20,
    willChange: "transform",
  },

  ingWrap: {
    position: "absolute",
    zIndex: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    pointerEvents: "none",
  },

  ingImg: {
    height: "auto",
    filter: "drop-shadow(0 8px 20px rgba(42,31,14,0.22))",
    willChange: "transform, opacity",
    display: "block",
  },

  ingLabel: {
    fontFamily: "InriaSerif, Lora, serif",
    fontStyle: "italic",
    fontSize: "0.65rem",
    letterSpacing: "0.18em",
    color: Q.ink2,
    textTransform: "uppercase",
    margin: 0,
    willChange: "opacity",
  },

  sceneAContent: {
    position: "relative",
    zIndex: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "0 clamp(20px,6vw,80px)",
  },

  eyebrow: {
    fontFamily: "InriaSerif, Lora, serif",
    fontSize: "clamp(0.58rem,1vw,0.72rem)",
    letterSpacing: "0.8em",
    textTransform: "uppercase",
    color: Q.rust,
    marginBottom: 20,
    willChange: "transform, opacity",
  },

  lineWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  headlineLine: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    lineHeight: 1.0,
  },

  headWord: {
    display: "inline-block",
    fontFamily: "Mathreal, Playfair Display, serif",
    fontWeight: 400,
    fontSize: "clamp(4.2rem,10vw,9.2rem)",
    color: Q.ink,
    lineHeight: 1.0,
    letterSpacing: "0.05em",
    paddingRight: "0.14em",
    willChange: "transform, opacity",
  },

  wordAccent: {
    color: Q.rust,
    fontStyle: "italic",
  },

  wordWarm: {
    color: Q.orange,
  },

  rule: {
    height: 3,
    background: `linear-gradient(90deg,${Q.rust},${Q.orange},${Q.gold})`,
    borderRadius: 2,
    marginTop: 14,
  },

  bodyText: {
    fontStyle: "italic",
    fontSize: "clamp(0.82rem,1.4vw,1rem)",
    color: Q.ink2,
    lineHeight: 1.8,
    fontFamily: "InriaSerif, Lora, serif",
    textAlign: "center",
  },

  mangkokWrap: {
    position: "absolute",
    bottom: "-40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "clamp(220px, 45vw, 500px)",
    zIndex: 14,
    display: "flex",
    justifyContent: "center",
    willChange: "transform, opacity",
  },

  mangkokImgInner: {
    width: "100%",
    height: "auto",
    filter: "drop-shadow(0 8px 20px rgba(42,31,14,0.22))",
    willChange: "transform",
    display: "block",
  },

  spillDrop: {
    position: "absolute",
    top: "35%",
    left: "60%",
    transform: "translate(-50%,-50%)",
    opacity: 0,
    zIndex: 15,
    willChange: "transform, opacity",
    pointerEvents: "none",
  },

  sceneCTitle: {
    position: "relative",
    zIndex: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "clamp(4px,1vh,12px)",
  },

  sotoImgsContainer: {
    position: "relative",
    width: "clamp(180px, 32vh, 360px)",
    height: "clamp(180px, 32vh, 360px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-6px",
    marginBottom: "clamp(8px,1.5vh,18px)",
  },

  scBlits: {
    position: "absolute",
    width: "132%",
    zIndex: 1,
    willChange: "transform, opacity",
  },

  scStar: {
    position: "absolute",
    width: "24%",
    top: "14%",
    right: "19%",
    zIndex: 5,
    willChange: "transform, opacity",
  },

  scSoto: {
    position: "relative",
    width: "100%",
    zIndex: 4,
    willChange: "transform, opacity",
  },

  scAsap: {
    position: "absolute",
    top: "-10%",
    left: "10%",
    width: "80%",
    opacity: 0,
    zIndex: 6,
    willChange: "opacity",
  },

  sotoWord: {
    display: "inline-block",
    fontFamily: "Mathreal, Playfair Display, serif",
    fontWeight: 400,
    color: Q.orange,
    fontStyle: "italic",
    letterSpacing: "0.025em",
    lineHeight: 0.9,
    willChange: "transform, opacity",
  },

  sceneCDesc: {
    position: "relative",
    zIndex: 12,
    margin: 0,
    boxSizing: "border-box",

    fontFamily: "InriaSerif, Lora, serif",
    fontStyle: "italic",
    color: "rgba(249,253,218,0.94)",
    textAlign: "center",

    background: "rgba(249,253,218,0.055)",
    border: "1px solid rgba(249,253,218,0.18)",
    borderRadius: "22px",
    boxShadow: `
      0 18px 45px rgba(0,0,0,0.18),
      inset 0 1px 0 rgba(249,253,218,0.12)
    `,
    backdropFilter: "blur(2px)",

    willChange: "transform, opacity",
  },

  sceneCDescDesktop: {
    width: "min(980px, 88vw)",
    padding: "clamp(18px,2.2vw,28px) clamp(34px,4vw,58px)",
    fontSize: "clamp(1.05rem,1.35vw,1.35rem)",
    lineHeight: 1.75,
  },

  sceneCDescMobile: {
    width: "min(92vw, 420px)",
    padding: "14px 18px",
    borderRadius: "18px",
    fontSize: "clamp(0.88rem,3.4vw,1rem)",
    lineHeight: 1.55,
  },

  scrollCue: {
    position: "fixed",
    bottom: 32,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    zIndex: 999,
    pointerEvents: "none",
  },

  scrollTxt: {
    fontFamily: "InriaSerif, Lora, serif",
    fontSize: "0.55rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: Q.rust,
  },

  scrollLine: {
    width: 1,
    height: 24,
    background: Q.rust,
  },
};
