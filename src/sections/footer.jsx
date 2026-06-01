import footerBg from "../assets/images/footer.webp";

const scrollToSection = (sectionId) => {
  const el =
    document.querySelector(`[data-section='${sectionId}']`) ||
    document.getElementById(sectionId);

  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function FooterSection() {
  const actions = [
    {
      label: "Replay Story",
      target: "opening",
    },
    {
      label: "Create Another Soto",
      target: "makeyourownsoto",
    },
    {
      label: "Back to Journey",
      target: "journey",
    },
  ];

  return (
    <section
      id="footer"
      data-section="footer"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#ffbd59]

        min-h-[clamp(245px,34vh,330px)]
        md:min-h-[clamp(300px,39vh,390px)]
      "
    >
      {/*scrap bg */}
      <img
        src={footerBg}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          h-[112%]
          w-full
          translate-y-[8px]
          object-cover
          object-[center_18%]

          md:h-[110%]
          md:translate-y-[10px]
          md:object-[center_10%]
        "
      />

      {/* MAIN CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[clamp(205px,29vh,280px)]
          w-full
          max-w-[1120px]
          flex-col
          justify-end

          px-[clamp(1.5rem,6vw,2.5rem)]
          pb-[clamp(3rem,6vh,3.8rem)]
          pt-[clamp(3.5rem,8vh,4.5rem)]

          md:min-h-[clamp(255px,34vh,330px)]
          md:px-[clamp(1.5rem,5vw,4rem)]
          md:pb-[clamp(3.2rem,6vh,4.2rem)]
          md:pt-[clamp(3.8rem,8vh,5.8rem)]
        "
      >
        <div
          className="
            grid
            w-full
            translate-y-[10px]
            grid-cols-2
            items-start
            gap-8
            text-left

            md:translate-y-[18px]
            md:grid-cols-[1fr_auto_1.35fr_auto_1fr]
            md:items-center
            md:gap-7
          "
        >
          {/* link kiri*/}
          <nav
            className="
              flex
              flex-col
              items-start
              gap-2
            "
            aria-label="Footer navigation"
          >
            <p
              className="
                mb-1
                font-title
                text-[clamp(13px,3.4vw,15px)]
                font-black
                tracking-[0.04em]
                text-[#3f3727]

                md:text-[clamp(13.5px,1.4vw,16px)]
              "
            >
              Explore
            </p>

            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => scrollToSection(action.target)}
                className="
                  group
                  cursor-pointer
                  border-none
                  bg-transparent
                  p-0
                  text-left
                  font-['InriaSerif-Regular']
                  text-[clamp(12px,3vw,13.5px)]
                  font-normal
                  leading-none
                  tracking-[0.02em]
                  text-[#3f3727]/90
                  transition-all
                  duration-200
                  ease-out

                  hover:translate-x-1
                  hover:text-[#d2230d]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#d2230d]/70
                  focus-visible:ring-offset-4
                  focus-visible:ring-offset-[#ffbd59]

                  md:text-[clamp(13px,1.3vw,15px)]
                "
              >
                {action.label}
                <span
                  className="
                    ml-1
                    inline-block
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:translate-x-1
                    group-hover:opacity-100
                  "
                >
                  →
                </span>
              </button>
            ))}
          </nav>

          {/* DIVIDER */}
          <div
            className="
              hidden
              h-[100px]
              w-px
              bg-[#3f3727]/22
              md:block
            "
          />

          {/* center*/}
          <div
            className="
              hidden
              flex-col
              items-center
              text-center

              md:flex
            "
          >
            <p
              className="
                font-title
                text-[clamp(1.45rem,2.8vw,2.05rem)]
                font-black
                leading-[0.95]
                tracking-[-0.02em]
                text-[#3f3727]
                drop-shadow-[0_2px_0_rgba(250,253,218,0.25)]
              "
            >
              Soto Across the Islands
            </p>

            <p
              className="
                mt-3
                max-w-[410px]
                font-['InriaSerif-Regular']
                text-[clamp(13px,1.35vw,15px)]
                font-normal
                italic
                leading-relaxed
                tracking-[0.01em]
                text-[#3f3727]/85
              "
            >
              A web story about soto, culture, and flavors across Indonesia.
            </p>
          </div>

          {/* DIVIDER */}
          <div
            className="
              hidden
              h-[100px]
              w-px
              bg-[#3f3727]/22
              md:block
            "
          />

          {/* link kanan*/}
          <div
            className="
              flex
              flex-col
              items-end
              gap-2
              text-right
            "
          >
            <p
              className="
                font-title
                text-[clamp(13px,3.4vw,15px)]
                font-black
                tracking-[0.04em]
                text-[#3f3727]

                md:text-[clamp(13.5px,1.4vw,16px)]
              "
            >
              Contact Us
            </p>

            <div
              className="
                flex
                flex-col
                gap-1
                font-['InriaSerif-Regular']
                text-[clamp(11.5px,2.8vw,13px)]
                font-normal
                leading-relaxed
                tracking-[0.02em]
                text-[#3f3727]/90

                md:text-[clamp(13px,1.3vw,15px)]
              "
            >
              <a
                href="mailto:222313323@stis.ac.id"
                className="
                  transition-colors
                  duration-200
                  hover:text-[#d2230d]
                "
              >
                222313323@stis.ac.id
              </a>

              <a
                href="mailto:222313363@stis.ac.id"
                className="
                  transition-colors
                  duration-200
                  hover:text-[#d2230d]
                "
              >
                222313363@stis.ac.id
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="
          absolute
          bottom-0
          left-0
          z-20
          flex
          w-full
          items-center
          justify-center
          bg-[#463f2d]/18
          px-5
          py-[clamp(0.55rem,1.25vh,0.75rem)]

          md:justify-between
          md:px-[clamp(3rem,7vw,6rem)]
          md:py-[clamp(0.6rem,1.35vh,0.8rem)]
        "
      >
        <p
          className="
            text-center
            font-['InriaSerif-Regular']
            text-[clamp(10px,2.55vw,11.5px)]
            font-bold
            tracking-[0.035em]
            text-[#3f3727]/80

            md:text-left
            md:text-[clamp(11px,1.1vw,12.5px)]
          "
        >
          © 2026 Kicau Mania Team. All rights reserved.
        </p>

        <p
          className="
            hidden
            font-['InriaSerif-Regular']
            text-[clamp(11px,1.1vw,12.5px)]
            font-bold
            tracking-[0.035em]
            text-[#3f3727]/72
            md:block
          "
        >
          Web Design Paradoks
        </p>
      </div>
    </section>
  );
}