import { useEffect, useState, useRef } from "react";

const NAV_SECTIONS = [
  { id: "opening", label: "Opening" },
  { id: "question", label: "The Question" },
  { id: "journey", label: "Journey Begins" },
  { id: "unity", label: "Unity" },
  { id: "meaning", label: "Meaning" },
  { id: "closing", label: "Closing" },
  { id: "makeyourownsoto", label: "Make Your Own Soto" },
  { id: "about", label: "About Us" },
];

export default function ScrollNavigator() {
  const [activeSection, setActiveSection] = useState("opening");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [prevActive, setPrevActive] = useState("opening");
  const [animating, setAnimating] = useState(false);
  const animTimerRef = useRef(null);

  /* ── find active section ─────────────────────────────── */
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollCheckPoint = window.scrollY + window.innerHeight * 0.45;
      let current = NAV_SECTIONS[0].id;

      NAV_SECTIONS.forEach((item) => {
        const el =
          document.querySelector(`[data-section="${item.id}"]`) ||
          document.getElementById(item.id);
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollCheckPoint >= top) current = item.id;
      });

      setActiveSection((prev) => {
        if (prev !== current) {
          setPrevActive(prev);
          clearTimeout(animTimerRef.current);
          setAnimating(true);
          animTimerRef.current = setTimeout(() => setAnimating(false), 400);
        }
        return current;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
      clearTimeout(animTimerRef.current);
    };
  }, []);

  /* ── scroll to section ───────────────────────────────── */
  const scrollToSection = (id) => {
    const target =
      document.querySelector(`[data-section="${id}"]`) ||
      document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/*navigator */}
      <nav
        className="
          fixed right-5 top-1/2 z-[9999]
          hidden -translate-y-1/2 flex-col items-end gap-[10px]
          md:flex
        "
        aria-label="Story navigation"
      >
        {NAV_SECTIONS.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredSection === item.id;
          const wasActive = prevActive === item.id && animating;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredSection(item.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="group relative flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 outline-none"
              aria-label={`Go to ${item.label}`}
            >
              {/* ── Tooltip ─────────────────────────────── */}
              <span
                className={`
                  pointer-events-none relative
                  rounded-full px-3 py-[5px]
                  font-[InriaSerif] text-[0.68rem] font-bold
                  tracking-[0.10em] whitespace-nowrap
                  transition-all duration-300 ease-out
                  ${
                    isHovered || (animating && isActive)
                      ? "translate-x-0 opacity-100"
                      : "translate-x-2 opacity-0"
                  }
                  ${
                    isActive
                      ? "bg-[#ffbd59] text-[#2c1309] shadow-[0_3px_0_rgba(44,19,9,0.22)]"
                      : "bg-[#2c1309] text-[#fafdda] shadow-[0_3px_0_rgba(0,0,0,0.18)]"
                  }
                `}
              >
                {/* Left arrow tip */}
                <span
                  className={`
                    absolute left-0 top-1/2 -translate-x-[5px] -translate-y-1/2
                    border-[5px] border-transparent
                    transition-[border-right-color] duration-300
                    ${isActive ? "border-r-[#ffbd59]" : "border-r-[#2c1309]"}
                  `}
                />
                {item.label}
              </span>

              {/* ── Dot ─────────────────────────────────── */}
              <span className="relative flex h-5 w-5 items-center justify-center">
                {/* Ping ring for active */}
                {isActive && (
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-[#ffbd59] opacity-40"
                    style={{
                      animation:
                        "navPing 1.4s cubic-bezier(0,0,0.2,1) infinite",
                    }}
                  />
                )}

                {/* Dot itself */}
                <span
                  className={`
                    relative block rounded-full border-2
                    transition-all duration-300 ease-out
                    ${
                      isActive
                        ? "h-3.5 w-3.5 border-[#2c1309] bg-[#ffbd59] shadow-[0_0_0_4px_rgba(255,189,89,0.22)]"
                        : isHovered
                          ? "h-3 w-3 border-[#2c1309] bg-[#ffbd59]/70"
                          : "h-2 w-2 border-[#2c1309]/60 bg-[#fafdda]"
                    }
                    ${animating && wasActive ? "scale-[0.6] opacity-60" : "scale-100 opacity-100"}
                  `}
                  style={{
                    transitionDelay: animating && isActive ? "60ms" : "0ms",
                  }}
                />
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── Mobile bottom dots ────────────────────────── */}
      <div
        className="
          fixed bottom-4 left-1/2 z-[9999] flex
          -translate-x-1/2 items-center gap-2
          rounded-full border border-[#2c1309]/20
          bg-[#fafdda]/85 px-4 py-2
          shadow-[0_4px_24px_rgba(44,19,9,0.18)]
          backdrop-blur-sm
          md:hidden
        "
        aria-hidden="true"
      >
        {NAV_SECTIONS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-label={`Go to ${item.label}`}
              className={`
                block rounded-full border-[1.5px] transition-all duration-300
                ${
                  isActive
                    ? "h-3 w-3 border-[#2c1309] bg-[#ffbd59] shadow-[0_0_0_3px_rgba(255,189,89,0.3)]"
                    : "h-2 w-2 border-[#2c1309]/50 bg-[#2c1309]/20"
                }
              `}
            />
          );
        })}
      </div>

      {/* ── Keyframe for ping ─────────────────────────── */}
      <style>{`
        @keyframes navPing {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </>
  );
}
