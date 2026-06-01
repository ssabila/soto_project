import { useEffect, useState } from "react";

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

  useEffect(() => {
    let ticking = false;

    const getSectionTop = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY;
    };

    const updateActiveSection = () => {
      const scrollCheckPoint = window.scrollY + window.innerHeight * 0.45;

      let current = NAV_SECTIONS[0].id;

      NAV_SECTIONS.forEach((item) => {
        const el = document.querySelector(`[data-section='${item.id}']`);
        if (!el) return;

        const sectionTop = getSectionTop(el);

        if (scrollCheckPoint >= sectionTop) {
          current = item.id;
        }
      });

      setActiveSection(current);
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
    };
  }, []);

  const scrollToSection = (id) => {
    const target = document.querySelector(`[data-section='${id}']`);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className="
        fixed right-5 top-1/2 z-[9999]
        hidden -translate-y-1/2 flex-col items-end gap-3
        md:flex
      "
      aria-label="Story navigation"
    >
      {NAV_SECTIONS.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className="
              group flex cursor-pointer items-center gap-3
              border-0 bg-transparent p-0 outline-none
            "
            aria-label={`Go to ${item.label}`}
          >
            {/* LABEL: muncul pas hover */}
            <span
              className="
                pointer-events-none
                translate-x-2 rounded-full
                bg-[#2c1309] px-3 py-1
                font-[InriaSerif] text-[0.72rem] font-bold
                tracking-[0.12em] text-[#fafdda]
                opacity-0 shadow-[0_3px_0_rgba(0,0,0,0.2)]
                transition-all duration-300
                group-hover:translate-x-0
                group-hover:opacity-100
              "
            >
              {item.label}
            </span>

            {/* DOT */}
            <span
              className={`
                block rounded-full border-2 transition-all duration-300
                ${
                  isActive
                    ? "h-3.5 w-3.5 border-[#2c1309] bg-[#ffbd59] shadow-[0_0_0_5px_rgba(255,189,89,0.28)]"
                    : "h-2.5 w-2.5 border-[#2c1309]/70 bg-[#fafdda] group-hover:scale-125 group-hover:bg-[#ffbd59]"
                }
              `}
            />
          </button>
        );
      })}
    </nav>
  );
}