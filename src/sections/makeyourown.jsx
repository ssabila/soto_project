import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import backgroundGame from "../assets/images/background-gamestart.webp";
import mangkokMeja from "../assets/images/mangkokmeja-game.webp";

import kuahBiasa from "../assets/images/kuah-biasa.webp";
import kuahBening from "../assets/images/kuah-bening.webp";
import kuahSantan from "../assets/images/kuah-santan.webp";
import kuahCoto from "../assets/images/kuah-coto.webp";

import toppingAyam from "../assets/images/topping-ayam.webp";
import toppingDaging from "../assets/images/topping-daging.webp";
import toppingBabat from "../assets/images/topping-babat.webp";

import pelengkapKoya from "../assets/images/pelengkap-koya.webp";
import pelengkapTauge from "../assets/images/pelengkap-tauge.webp";
import pelengkapBawang from "../assets/images/pelengkap-bawang.webp";

import tambahanTelur from "../assets/images/tambahan-telur.webp";
import tambahanKerupukudang from "../assets/images/tambahan-kerupukudang.webp";
import tambahanLimau from "../assets/images/tambahan-limau.webp";
import tambahanEmping from "../assets/images/tambahan-emping.webp";

import gameTitle from "../assets/images/game-title.webp";

// warna
const C = {
  brown: "#2c1309",
  rust: "#c2380f",
  scarlet: "#e83a2a",
  saffron: "#c9880a",
  burntOrange: "#d05a1f",
};

// dots dekorasi
const spiceDots = [
  { top: "7%", left: "5%", size: 11, color: C.rust, opacity: 0.72 },
  { top: "11%", left: "87%", size: 7, color: C.brown, opacity: 0.38 },
  { top: "20%", left: "93%", size: 15, color: C.saffron, opacity: 0.58 },
  { top: "78%", left: "4%", size: 13, color: C.scarlet, opacity: 0.62 },
  { top: "87%", left: "93%", size: 9, color: C.burntOrange, opacity: 0.58 },
  { top: "73%", left: "89%", size: 6, color: C.brown, opacity: 0.34 },
  { top: "69%", left: "2%", size: 10, color: C.rust, opacity: 0.62 },
  { top: "91%", left: "48%", size: 5, color: C.brown, opacity: 0.35 },
  { top: "5%", left: "51%", size: 7, color: C.saffron, opacity: 0.58 },
  { top: "50%", left: "1%", size: 5, color: C.burntOrange, opacity: 0.52 },
  { top: "45%", left: "96%", size: 8, color: C.scarlet, opacity: 0.58 },
];

//data game
const KUAH_LIST = [
  {
    id: "biasa",
    label: "Kuah Kuning",
    img: kuahBiasa,
    desc: "Gurih & hangat",
    group: "kuah",
  },
  {
    id: "bening",
    label: "Kuah Bening",
    img: kuahBening,
    desc: "Segar & ringan",
    group: "kuah",
  },
  {
    id: "santan",
    label: "Kuah Santan",
    img: kuahSantan,
    desc: "Creamy & enak",
    group: "kuah",
  },
  {
    id: "coto",
    label: "Kuah Coto",
    img: kuahCoto,
    desc: "Kaya rempah",
    group: "kuah",
  },
];

const TOPPING_LIST = [
  { id: "ayam", label: "Ayam", img: toppingAyam, group: "topping" },
  { id: "daging", label: "Daging", img: toppingDaging, group: "topping" },
  { id: "babat", label: "Babat", img: toppingBabat, group: "topping" },
];

const PELENGKAP_LIST = [
  { id: "koya", label: "Koya", img: pelengkapKoya, group: "pelengkap" },
  { id: "tauge", label: "Tauge", img: pelengkapTauge, group: "pelengkap" },
  { id: "bawang", label: "Bawang", img: pelengkapBawang, group: "pelengkap" },
];

const TAMBAHAN_LIST = [
  { id: "telur", label: "Telur", img: tambahanTelur, group: "tambahan" },
  { id: "limau", label: "Limau", img: tambahanLimau, group: "tambahan" },
  { id: "emping", label: "Emping", img: tambahanEmping, group: "tambahan" },
  {
    id: "kerupuk",
    label: "Kerupuk Udang",
    img: tambahanKerupukudang,
    group: "tambahan",
  },
];

const ALL_ITEMS = [
  ...KUAH_LIST,
  ...TOPPING_LIST,
  ...PELENGKAP_LIST,
  ...TAMBAHAN_LIST,
];

const STEPS = [
  {
    key: "kuah",
    label: "Kuah",
    hint: "Pilih kuah soto kamu",
    items: KUAH_LIST,
  },
  {
    key: "topping",
    label: "Isi",
    hint: "Pilih isi utama soto kamu",
    items: TOPPING_LIST,
  },
  {
    key: "pelengkap",
    label: "Taburan",
    hint: "Pilih taburan soto kamu",
    items: PELENGKAP_LIST,
  },
  {
    key: "tambahan",
    label: "Extra",
    hint: "Pilih extra terakhir",
    items: TAMBAHAN_LIST,
  },
];

function getItemById(id) {
  return ALL_ITEMS.find((item) => item.id === id);
}

function getSelectedByGroup(bowlItems, group) {
  return bowlItems
    .map(getItemById)
    .filter(Boolean)
    .find((item) => item.group === group);
}

function replaceGroupItem(prev, group, nextId) {
  return prev
    .filter((id) => {
      const item = getItemById(id);
      return item?.group !== group;
    })
    .concat(nextId);
}

function getSotoName(kuahId, toppingId, pelengkapId, tambahanId) {
  if (!kuahId) return "Soto Spesialmu";

  if (kuahId === "santan" && toppingId === "daging") {
    return "Soto Betawi Daging";
  }

  if (kuahId === "santan" && toppingId === "ayam") {
    return "Soto Ayam Santan";
  }

  if (kuahId === "bening" && toppingId === "ayam" && pelengkapId === "koya") {
    return "Soto Lamongan Koya";
  }

  if (kuahId === "bening" && toppingId === "ayam") {
    return "Soto Bening Ayam";
  }

  if (kuahId === "coto" && toppingId === "babat") {
    return "Coto dengan Babat";
  }

  if (kuahId === "coto" && toppingId === "daging") {
    return "Coto dengan Daging ";
  }

  if (kuahId === "biasa" && toppingId === "ayam" && pelengkapId === "koya") {
    return "Soto Lamongan";
  }

  if (kuahId === "biasa" && toppingId === "daging") {
    return "Soto Daging";
  }

  if (kuahId === "biasa" && toppingId === "babat") {
    return "Soto Babat";
  }

  if (tambahanId === "telur") {
    return "Soto Telur Sederhana";
  }

  return "Soto Racikan Ala Kamu";
}

function getResultCopy(kuah, topping, pelengkap, tambahan) {
  const vibes = [];

  if (kuah?.id === "santan") vibes.push("creamy");
  if (kuah?.id === "bening") vibes.push("fresh");
  if (kuah?.id === "coto") vibes.push("bold");
  if (kuah?.id === "biasa") vibes.push("classic");

  if (topping?.id === "ayam") vibes.push("comforting");
  if (topping?.id === "daging") vibes.push("rich");
  if (topping?.id === "babat") vibes.push("berani");

  if (pelengkap?.id === "koya") vibes.push("gurih");
  if (tambahan?.id === "limau") vibes.push("segar");

  if (vibes.length === 0) {
    return "Racikan kamu sederhana, tapi tetap siap jadi comfort food.";
  }

  return `Racikan kamu terasa ${vibes
    .slice(0, 3)
    .join(", ")}. Selamat menikmati sotomu!.`;
}

// frame
const frameShellClassName = [
  "relative mx-auto",
  "h-[68svh] w-[90vw]",
  "sm:h-[68svh] sm:w-[88vw]",
  "md:h-auto md:aspect-[16/9] md:w-[min(84vw,940px)]",
  "lg:w-[min(78vw,1000px)]",
  "xl:w-[min(72vw,1100px)]",
].join(" ");

const frameCardClassName = [
  "relative h-full w-full overflow-hidden",
  "rounded-[1.25rem] border-[3px] border-[#fafdda] bg-black",
  "shadow-[0_24px_80px_rgba(0,0,0,0.38)]",
  "sm:rounded-[1.5rem] md:rounded-[1.75rem]",
].join(" ");

function IngredientCard({
  item,
  selected,
  disabled,
  onSelect,
  onDragStart,
  compact = false,
}) {
  return (
    <button
      type="button"
      draggable={!disabled}
      data-id={item.id}
      onClick={() => !disabled && onSelect(item.id)}
      onDragStart={disabled ? undefined : onDragStart}
      className={[
        "group relative flex shrink-0 flex-col items-center justify-center overflow-hidden",
        "select-none touch-manipulation transition-all duration-200",
        "rounded-2xl border-[2.5px]",
        compact
          ? "h-[86px] w-[86px] p-[6px] sm:h-[96px] sm:w-[96px]"
          : "min-h-[clamp(92px,11.8vw,132px)] p-[clamp(7px,1vw,12px)]",
        selected
          ? "border-[#2a1f0e] bg-[#ff9721] shadow-[0_5px_0_rgba(42,31,14,0.28)]"
          : "border-[#d4a574] bg-[#fffef5] shadow-[0_4px_0_rgba(42,31,14,0.14)]",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-grab hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_7px_0_rgba(42,31,14,0.22)] active:translate-y-0 active:scale-95 active:cursor-grabbing",
      ].join(" ")}
    >
      {selected && (
        <span className="absolute right-1 top-1 z-20 rounded-full border-2 border-[#2a1f0e] bg-[#fafdda] px-1 text-[0.55rem] font-regular text-[#2a1f0e]">
          ✓
        </span>
      )}

      <div
        className={[
          "pointer-events-none relative flex items-center justify-center",
          compact ? "h-[48px] w-[62px]" : "h-[clamp(44px,5.5vw,70px)] w-full",
        ].join(" ")}
      >
        <img
          src={item.img}
          alt=""
          className={[
            item.group === "topping"
              ? "h-[260%] w-[260%]"
              : item.group === "pelengkap"
                ? "h-[350%] w-[350%]"
                : item.group === "tambahan"
                  ? "h-[230%] w-[230%]"
                  : "h-[145%] w-[145%]",
            "max-w-none object-contain transition-transform duration-200 group-hover:scale-110",
          ].join(" ")}
          style={{
            transform:
              item.group === "tambahan"
                ? "translate(-25px, 12px)"
                : "translate(0px, 0px)",
          }}
          draggable={false}
        />
      </div>

      <span
        className={[
          "pointer-events-none mt-1 text-center font-body font-black leading-tight tracking-[-0.02em]",
          selected ? "text-[#2a1f0e]" : "text-[#5a3e28]",
          compact
            ? "text-[0.55rem] sm:text-[0.6rem]"
            : "text-[clamp(0.58rem,1.15vw,0.85rem)]",
        ].join(" ")}
      >
        {item.label}
      </span>

      {!compact && item.desc && (
        <span className="pointer-events-none mt-[2px] text-center font-body text-[clamp(0.42rem,0.8vw,0.58rem)] font-bold text-[#8a6a3a]">
          {item.desc}
        </span>
      )}
    </button>
  );
}

function SidePanel({
  title,
  items,
  selectedId,
  onSelect,
  onDragStart,
  side = "left",
}) {
  return (
    <div
      className={[
        "absolute top-[24%] z-40 hidden flex-col gap-[clamp(7px,0.9vw,10px)] md:flex",
        "rounded-2xl border-[2.5px] border-[#d4a574]",
        "bg-[rgba(255,248,231,0.98)] p-[clamp(8px,1vw,11px)]",
        "w-[clamp(94px,11.5vw,136px)]",
        side === "left" ? "left-[1.8%]" : "right-[1.8%]",
      ].join(" ")}
    >
      <p className="border-b border-[#d4a574] pb-2 text-center font-title text-[clamp(0.6rem,1.15vw,0.88rem)] font-regular uppercase tracking-wide text-[#8a6a3a]">
        {title}
      </p>

      {items.map((item) => (
        <IngredientCard
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          disabled={selectedId === item.id}
          onSelect={onSelect}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
}

function MobileIngredientTray({
  title,
  hint,
  items,
  selectedId,
  onSelect,
  onDragStart,
}) {
  return (
    <div className="absolute bottom-[2.4%] left-1/2 z-40 flex w-[92%] -translate-x-1/2 flex-col gap-2 md:hidden">
      <div className="mx-auto rounded-full bg-[rgba(42,31,14,0.86)] px-3 py-1 text-center">
        <p className="font-title text-[0.55rem] font-regular uppercase tracking-[0.12em] text-[#fafdda]">
          {title}
        </p>
        <p className="font-title text-[0.5rem] font-regular text-[#ffcf8a]">
          {hint}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto rounded-2xl border-[2.5px] border-[#d4a574] bg-[rgba(255,248,231,0.96)] p-2 scrollbar-hide">
        {items.map((item) => (
          <IngredientCard
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            disabled={selectedId === item.id}
            onSelect={onSelect}
            onDragStart={onDragStart}
            compact
          />
        ))}
      </div>
    </div>
  );
}

function StepTab({ label, active, done, locked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={[
        "shrink min-w-0 rounded-full border-[2px]",
        "px-[clamp(6px,1.9vw,22px)] py-[clamp(5px,1.4vw,10px)]",
        "font-title text-[clamp(0.52rem,2.25vw,1rem)] font-regular leading-none transition-all duration-200",
        active
          ? "border-[#2a1f0e] bg-[#ff9721] text-[#2a1f0e]"
          : done
            ? "border-[#8a6a3a] bg-[#fafdda] text-[#8a6a3a]"
            : locked
              ? "border-[#8a6a3a]/40 bg-[rgba(250,253,218,0.36)] text-[#8a6a3a]/45"
              : "border-[#c8a86a] bg-[rgba(250,253,218,0.75)] text-[#8a6a3a]",
      ].join(" ")}
    >
      <span className="hidden sm:inline">{done && !active ? "✓ " : ""}</span>
      {label}
    </button>
  );
}

function SotoStackPreview({
  kuah,
  topping,
  pelengkap,
  tambahan,
  resultMode = false,
}) {
  return (
    <>
      {kuah && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            height: "55%",
            width: "58%",
            top: "24%",
            left: "21%",
            zIndex: 2,
          }}
        >
          <img
            src={kuah.img}
            alt={kuah.label}
            className={[
              "max-h-none max-w-none shrink-0 object-contain",
              resultMode
                ? "h-[170%] w-[205%]"
                : "h-[150%] w-[180%] min-[620px]:h-[188%] min-[620px]:w-[204%] sm:h-[185%] sm:w-[200%] md:h-[181%] md:w-[196%] lg:h-[176%] lg:w-[192%] xl:h-[172%] xl:w-[188%]",
            ].join(" ")}
            draggable={false}
          />
        </div>
      )}

      {topping && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            height: "55%",
            width: "58%",
            top: "24%",
            left: "21%",
            zIndex: 3,
          }}
        >
          <img
            src={topping.img}
            alt={topping.label}
            className={[
              "max-h-none max-w-none object-contain",
              resultMode
                ? "h-[150%] w-[165%]"
                : "h-[clamp(200px,26vw,280px)] w-[clamp(200px,26vw,280px)] min-[620px]:h-[clamp(220px,24vw,300px)] min-[620px]:w-[clamp(220px,24vw,300px)] sm:h-[clamp(240px,22vw,320px)] sm:w-[clamp(240px,22vw,320px)] md:h-[clamp(260px,20vw,340px)] md:w-[clamp(260px,20vw,340px)] lg:h-[clamp(260px,18vw,320px)] lg:w-[clamp(260px,18vw,320px)] xl:h-[clamp(240px,16vw,300px)] xl:w-[clamp(240px,16vw,300px)]",
            ].join(" ")}
            style={{ animation: "sotoBowlPop 0.3s ease" }}
            draggable={false}
          />
        </div>
      )}

      {pelengkap && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            height: "55%",
            width: "58%",
            top: "23%",
            left: "21%",
            zIndex: 4,
          }}
        >
          <img
            src={pelengkap.img}
            alt={pelengkap.label}
            className={[
              "max-h-none max-w-none object-contain",
              resultMode
                ? "h-[120%] w-[120%]"
                : "h-[clamp(144px,23.7vw,212px)] w-[clamp(144px,23.7vw,212px)] min-[620px]:h-[clamp(161px,22vw,237px)] min-[620px]:w-[clamp(161px,22vw,237px)] sm:h-[clamp(178px,20.3vw,263px)] sm:w-[clamp(178px,20.3vw,263px)] md:h-[clamp(186px,18.6vw,270px)] md:w-[clamp(186px,18.6vw,270px)] lg:h-[clamp(186px,16.9vw,254px)] lg:w-[clamp(186px,16.9vw,254px)] xl:h-[clamp(169px,15.2vw,229px)] xl:w-[clamp(169px,15.2vw,229px)]",
            ].join(" ")}
            style={{ animation: "sotoBowlPop 0.3s ease" }}
            draggable={false}
          />
        </div>
      )}

      {tambahan && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            height: "55%",
            width: "58%",
            top: "18%",
            left: "25%",
            zIndex: 5,
          }}
        >
          <img
            src={tambahan.img}
            alt={tambahan.label}
            className={[
              "max-h-none max-w-none object-contain",
              resultMode
                ? "h-[135%] w-[135%]"
                : "h-[clamp(137px,22vw,208px)] w-[clamp(137px,22vw,208px)] min-[620px]:h-[clamp(156px,21vw,234px)] min-[620px]:w-[clamp(156px,21vw,234px)] sm:h-[clamp(169px,20vw,254px)] sm:w-[clamp(169px,20vw,254px)] md:h-[clamp(182px,18vw,273px)] md:w-[clamp(182px,18vw,273px)] lg:h-[clamp(182px,16vw,260px)] lg:w-[clamp(182px,16vw,260px)] xl:h-[clamp(169px,14vw,234px)] xl:w-[clamp(169px,14vw,234px)]",
            ].join(" ")}
            style={{ animation: "sotoBowlPop 0.3s ease" }}
            draggable={false}
          />
        </div>
      )}
    </>
  );
}

function FinalSotoPreview({ kuah, topping, pelengkap, tambahan }) {
  return (
    <div
      className="
        relative mx-auto
        h-[clamp(140px,23vw,230px)]
        w-[clamp(190px,32vw,310px)]
      "
    >
      <img
        src={mangkokMeja}
        alt=""
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-contain"
        draggable={false}
      />

      <SotoStackPreview
        kuah={kuah}
        topping={topping}
        pelengkap={pelengkap}
        tambahan={tambahan}
        resultMode
      />
    </div>
  );
}

// komponen utama
const Makeyourownsoto = () => {
  const container = useRef(null);
  const hasPlayed = useRef(false);
  const playTimeline = useRef(null);
  const dragItemId = useRef(null);
  const bowlRef = useRef(null);
  const toastTimerRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedKuah, setSelectedKuah] = useState(null);
  const [bowlItems, setBowlItems] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [toast, setToast] = useState({ msg: "", show: false });
  const [result, setResult] = useState(null);

  const kuah = selectedKuah
    ? KUAH_LIST.find((k) => k.id === selectedKuah)
    : null;

  const topping = getSelectedByGroup(bowlItems, "topping");
  const pelengkap = getSelectedByGroup(bowlItems, "pelengkap");
  const tambahan = getSelectedByGroup(bowlItems, "tambahan");

  const hasRequiredBase = Boolean(selectedKuah && topping);
  const currentStep = STEPS[step];
  const currentItems = currentStep?.items ?? [];

  const selectedCurrentId =
    currentStep.key === "kuah"
      ? selectedKuah
      : getSelectedByGroup(bowlItems, currentStep.key)?.id;

  const leftItems = currentItems.slice(0, Math.ceil(currentItems.length / 2));
  const rightItems = currentItems.slice(Math.ceil(currentItems.length / 2));

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true });

    window.clearTimeout(toastTimerRef.current);

    toastTimerRef.current = window.setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 1700);
  }, []);

  useGSAP(
    () => {
      gsap.set(".soto-loading-dots", {
        opacity: 0,
        overwrite: "auto",
      });

      gsap.set(".soto-actual-game", {
        opacity: 0,
        pointerEvents: "none",
        overwrite: "auto",
      });

      gsap.set(".soto-frame-blackout", {
        opacity: 0,
        overwrite: "auto",
      });

      return () => {
        playTimeline.current?.kill();
        window.clearTimeout(toastTimerRef.current);
      };
    },
    { scope: container },
  );

  const handlePlay = () => {
    if (hasPlayed.current) return;

    hasPlayed.current = true;

    const q = gsap.utils.selector(container);
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    playTimeline.current = tl;

    tl.set(q(".soto-play-button"), {
      pointerEvents: "none",
    });

    tl.to(
      [q(".soto-play-button"), q(".soto-game-title")],
      {
        opacity: 0,
        y: -14,
        scale: 0.95,
        duration: 0.38,
        stagger: 0.08,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      q(".soto-game-bg"),
      {
        opacity: 0.25,
        scale: 1.04,
        filter: "blur(3px)",
        duration: 0.45,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      q(".soto-loading-dots"),
      {
        opacity: 1,
        duration: 0.28,
        ease: "power2.out",
      },
      "-=0.08",
    );

    tl.to(q(".soto-loading-dots"), {
      opacity: 1,
      duration: 0.6,
      ease: "none",
    });

    tl.to(q(".soto-loading-dots"), {
      opacity: 0,
      duration: 0.24,
      ease: "power2.in",
    });

    tl.to(
      q(".soto-frame-blackout"),
      {
        opacity: 1,
        duration: 0.45,
        ease: "power2.inOut",
      },
      "-=0.05",
    );

    tl.set(q(".soto-actual-game"), {
      opacity: 0,
      pointerEvents: "none",
      onComplete: () => setGameStarted(true),
    });

    tl.to({}, { duration: 0.05 });

    tl.to(q(".soto-actual-game"), {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    tl.set(q(".soto-actual-game"), {
      pointerEvents: "auto",
    });

    tl.to(q(".soto-frame-blackout"), {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
    });
  };

  const goNextStep = useCallback((group) => {
    if (group === "kuah") {
      window.setTimeout(() => setStep(1), 420);
      return;
    }

    if (group === "topping") {
      window.setTimeout(() => setStep(2), 420);
      return;
    }

    if (group === "pelengkap") {
      window.setTimeout(() => setStep(3), 420);
    }
  }, []);

  const handlePick = useCallback(
    (itemId) => {
      const item = getItemById(itemId);
      if (!item) return;

      if (item.group === "kuah") {
        setSelectedKuah(item.id);
        setBowlItems((prev) => replaceGroupItem(prev, "kuah", item.id));
        showToast(`${item.label} dipilih. Lanjut pilih isi soto!`);
        goNextStep("kuah");
        return;
      }

      if (!selectedKuah) {
        showToast("Kuah dulu bestie, biar sotonya punya pondasi.");
        setStep(0);
        return;
      }

      if (item.group === "topping") {
        setBowlItems((prev) => replaceGroupItem(prev, "topping", item.id));
        showToast(
          `${item.label} dipilih. Lanjut pilih taburan atau sajikan soto.`,
        );
        goNextStep("topping");
        return;
      }

      if (!topping && item.group !== "topping") {
        showToast("Pilih isi dulu, baru topping lucu-lucuan.");
        setStep(1);
        return;
      }

      if (item.group === "pelengkap") {
        setBowlItems((prev) => replaceGroupItem(prev, "pelengkap", item.id));
        showToast(
          `${item.label} ditabur. Lanjut pilih topping ekstra atau sajikan soto.`,
        );
        goNextStep("pelengkap");
        return;
      }

      if (item.group === "tambahan") {
        setBowlItems((prev) => replaceGroupItem(prev, "tambahan", item.id));
        showToast(`${item.label} jadi topping pelengkap, sajikan soto!.`);
      }
    },
    [selectedKuah, topping, showToast, goNextStep],
  );

  const onDragStart = (e) => {
    dragItemId.current = e.currentTarget.dataset.id;
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (dragItemId.current) {
      handlePick(dragItemId.current);
    }

    dragItemId.current = null;
  };

  const resetGame = () => {
    setStep(0);
    setSelectedKuah(null);
    setBowlItems([]);
    setResult(null);
    setIsDragOver(false);
  };

  const handleBackToStart = () => {
    resetGame();
    setGameStarted(false);
    hasPlayed.current = false;

    const q = gsap.utils.selector(container);

    gsap.set(q(".soto-game-title"), {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: "filter",
    });

    gsap.set(q(".soto-play-button"), {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: "auto",
    });

    gsap.set(q(".soto-game-bg"), {
      opacity: 1,
      scale: 1,
      filter: "none",
    });

    gsap.set(q(".soto-actual-game"), {
      opacity: 0,
      pointerEvents: "none",
    });

    gsap.set(q(".soto-frame-blackout"), {
      opacity: 0,
    });
  };

  const handleStepClick = (i) => {
    if (i === 0) {
      setStep(0);
      return;
    }

    if (i === 1 && !selectedKuah) {
      showToast("Kuah dulu, baru isi. Soto juga butuh komitmen.");
      setStep(0);
      return;
    }

    if (i > 1 && !topping) {
      showToast("Isi dulu ya, biar nggak cuma kuah doang.");
      setStep(1);
      return;
    }

    setStep(i);
  };

  const handleFinish = () => {
    if (!selectedKuah) {
      showToast("Pilih kuah dulu ya!");
      setStep(0);
      return;
    }

    if (!topping) {
      showToast("Isi utama belum dipilih.");
      setStep(1);
      return;
    }

    const resultKuah = KUAH_LIST.find((k) => k.id === selectedKuah);
    const resultTopping = getSelectedByGroup(bowlItems, "topping");
    const resultPelengkap = getSelectedByGroup(bowlItems, "pelengkap");
    const resultTambahan = getSelectedByGroup(bowlItems, "tambahan");

    setResult({
      name: getSotoName(
        resultKuah?.id,
        resultTopping?.id,
        resultPelengkap?.id,
        resultTambahan?.id,
      ),
      copy: getResultCopy(
        resultKuah,
        resultTopping,
        resultPelengkap,
        resultTambahan,
      ),
      kuah: resultKuah,
      topping: resultTopping,
      pelengkap: resultPelengkap,
      tambahan: resultTambahan,
    });
  };

  return (
    <section
      id="makeyourownsoto"
      data-section="makeyourownsoto"
      ref={container}
      className="relative w-full overflow-hidden bg-[#fafdda]"
    >
      {/* BG GRADIENT */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#fafdda_0%,#ffbd59_100%)]" />

      {/* SPICE DOTS */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
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
              opacity: dot.opacity,
              boxShadow: `0 2px ${dot.size * 1.4}px rgba(44,19,9,0.16)`,
              transform: `rotate(${i * 17}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center px-4 py-[clamp(3rem,10vh,6rem)]">
        <div
          className={`z-20 ${frameShellClassName}`}
          style={{ perspective: "1200px" }}
        >
          <div className={`soto-game-card ${frameCardClassName}`}>
            {/* BACKGROUND */}
            <img
              src={backgroundGame}
              alt=""
              className="soto-game-bg pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
            />

            {/* VIGNETTE */}
            <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_70px_rgba(42,31,14,0.26)]" />

            {/* TITLE */}
            <img
              src={gameTitle}
              alt="Make Your Own Soto"
              className="
                soto-game-title pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 object-contain
                top-[clamp(6.3rem,24vh,9.8rem)] w-[clamp(290px,78vw,400px)]
                sm:top-[clamp(1.7rem,6.3vh,2.9rem)] sm:w-[clamp(320px,62vw,520px)]
                md:top-[clamp(0.55rem,1.9vh,1.2rem)] md:w-[clamp(430px,52vw,650px)]
                lg:top-[clamp(1rem,3.2vh,2.2rem)] lg:w-[clamp(500px,42vw,700px)]
                xl:top-[clamp(1rem,3vh,2rem)] xl:w-[clamp(560px,38vw,760px)]
              "
            />

            {/* PLAY BUTTON */}
            <div
              className="
                soto-play-button absolute left-1/2 z-[90] -translate-x-1/2
                bottom-[clamp(1.2rem,4vh,2.2rem)]
                sm:bottom-[clamp(1.3rem,4vh,2.4rem)]
                md:bottom-[clamp(1.4rem,3.6vh,2.4rem)]
              "
            >
              <button
                type="button"
                onClick={handlePlay}
                className="
                  cursor-pointer select-none rounded-full border-[3px] border-[#2a1f0e]
                  bg-[#fafdda] font-title font-regular tracking-[-0.02em] text-[#2a1f0e]
                  shadow-[0_7px_0_rgba(42,31,14,0.25)] transition-all duration-200 ease-out
                  hover:-translate-y-1 hover:scale-105 hover:bg-[#ff9721]
                  hover:shadow-[0_10px_0_rgba(42,31,14,0.28)]
                  active:translate-y-1 active:scale-95 active:shadow-[0_3px_0_rgba(42,31,14,0.25)]
                  focus:outline-none focus:ring-4 focus:ring-[#ff9721]/50
                  px-[clamp(1.3rem,5vw,2.2rem)] py-[clamp(0.55rem,1.8vh,0.8rem)]
                  text-[clamp(1.2rem,5vw,1.8rem)]
                  sm:px-[clamp(1.6rem,4.5vw,2.5rem)] sm:text-[clamp(1.35rem,4.2vw,2rem)]
                  md:px-[clamp(1.8rem,3.5vw,2.7rem)] md:text-[clamp(1.45rem,2.8vw,2.1rem)]
                "
              >
                Play
              </button>
            </div>

            {/* LOADING DOTS */}
            <div className="soto-loading-dots pointer-events-none absolute left-1/2 top-1/2 z-[95] flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 opacity-0">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-3 w-3 rounded-full bg-[#fafdda]"
                  style={{
                    animation: `sotoDotPulse 1s ease-in-out ${i * 0.22}s infinite`,
                  }}
                />
              ))}
            </div>

            {/* transisi */}
            <div className="soto-frame-blackout pointer-events-none absolute inset-0 z-[100] bg-black opacity-0" />

            {/* GAME */}
            <div className="soto-actual-game pointer-events-none absolute inset-0 z-[110] opacity-0">
              {gameStarted && (
                <div className="relative h-full w-full overflow-hidden">
                  {/* BG GAME */}
                  <img
                    src={backgroundGame}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(42,31,14,0.22)]" />

                  {/* TOP BAR */}
                  <div
                    className="
    absolute
    left-1/2
    top-[2%]
    z-50
    w-[calc(100%-18px)]
    -translate-x-1/2

    md:left-0
    md:right-0
    md:w-auto
    md:translate-x-0
    md:px-[2%]
  "
                  >
                    {/* MOBILE TOP BAR */}
                    <div
                      className="
      flex
      flex-col
      items-center
      gap-1.5

      md:hidden
    "
                    >
                      {/* ACTION ROW */}
                      <div
                        className="
        flex
        w-full
        items-center
        justify-between
        gap-2
      "
                      >
                        <button
                          type="button"
                          onClick={handleBackToStart}
                          className="
          shrink-0
          rounded-full
          border-[2.5px]
          border-[#2a1f0e]
          bg-[#fafdda]
          px-[clamp(11px,3.2vw,28px)]
          py-[clamp(5px,1.5vw,11px)]
          font-title
          text-[clamp(0.65rem,2.8vw,1.18rem)]
          font-regular
          text-[#2a1f0e]
          shadow-[0_4px_0_rgba(42,31,14,0.25)]
          transition-all
          hover:-translate-y-0.5
          hover:bg-white
          active:translate-y-0.5
        "
                        >
                          BACK
                        </button>

                        <button
                          type="button"
                          onClick={handleFinish}
                          className={[
                            "shrink-0 rounded-full border-[2.5px] border-[#2a1f0e]",
                            "px-[clamp(11px,3.2vw,28px)] py-[clamp(5px,1.5vw,11px)]",
                            "font-title text-[clamp(0.65rem,2.8vw,1.18rem)] font-regular text-[#2a1f0e]",
                            "shadow-[0_4px_0_rgba(42,31,14,0.25)] transition-all active:translate-y-0.5",
                            hasRequiredBase
                              ? "bg-[#e83a2a] text-[#fafdda] hover:-translate-y-0.5 hover:bg-[#ff5040]"
                              : "bg-[#c8a86a] text-[#5a3e28] opacity-80 hover:bg-[#d8b879]",
                          ].join(" ")}
                        >
                          FINISH
                        </button>
                      </div>

                      {/* STEP ROW */}
                      <div
                        className="
        flex
        w-full
        items-center
        justify-center
        gap-[3px]
      "
                      >
                        {STEPS.map((s, i) => {
                          const locked =
                            (i === 1 && !selectedKuah) ||
                            (i > 1 && (!selectedKuah || !topping));

                          const done =
                            (i === 0 && !!selectedKuah) ||
                            (i === 1 && !!topping) ||
                            (i === 2 && !!pelengkap) ||
                            (i === 3 && !!tambahan);

                          return (
                            <StepTab
                              key={s.label}
                              label={s.label}
                              active={step === i}
                              done={done}
                              locked={locked}
                              onClick={() => handleStepClick(i)}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* DESKTOP TOP BAR */}
                    <div
                      className="
      hidden

      md:grid
      md:grid-cols-[auto_1fr_auto]
      md:items-center
      md:gap-4
    "
                    >
                      {/* LEFT: BACK */}
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={handleBackToStart}
                          className="
          shrink-0
          rounded-full
          border-[3px]
          border-[#2a1f0e]
          bg-[#fafdda]
          px-[clamp(14px,3.6vw,28px)]
          py-[clamp(7px,1.2vw,11px)]
          font-title
          text-[clamp(0.9rem,1.9vw,1.18rem)]
          font-regular 
          text-[#2a1f0e]
          shadow-[0_5px_0_rgba(42,31,14,0.25)]
          transition-all
          hover:-translate-y-0.5
          hover:bg-white
          active:translate-y-0.5
        "
                        >
                          BACK
                        </button>
                      </div>

                      {/* tahapan pembuatan */}
                      <div className="flex justify-center">
                        <div
                          className="
          flex
          items-center
          justify-center
          gap-[8px]
        "
                        >
                          {STEPS.map((s, i) => {
                            const locked =
                              (i === 1 && !selectedKuah) ||
                              (i > 1 && (!selectedKuah || !topping));

                            const done =
                              (i === 0 && !!selectedKuah) ||
                              (i === 1 && !!topping) ||
                              (i === 2 && !!pelengkap) ||
                              (i === 3 && !!tambahan);

                            return (
                              <StepTab
                                key={s.label}
                                label={s.label}
                                active={step === i}
                                done={done}
                                locked={locked}
                                onClick={() => handleStepClick(i)}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* tombol FINISH */}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleFinish}
                          className={[
                            "shrink-0 rounded-full border-[3px] border-[#2a1f0e]",
                            "px-[clamp(14px,3.6vw,28px)] py-[clamp(7px,1.2vw,11px)]",
                            "font-title text-[clamp(0.9rem,1.9vw,1.18rem)] font-regular",
                            "shadow-[0_5px_0_rgba(42,31,14,0.25)] transition-all active:translate-y-0.5",
                            hasRequiredBase
                              ? "bg-[#e83a2a] text-[#fafdda] hover:-translate-y-0.5 hover:bg-[#ff5040]"
                              : "bg-[#c8a86a] text-[#5a3e28] opacity-80 hover:bg-[#d8b879]",
                          ].join(" ")}
                        >
                          FINISH
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP PANELS */}
                  {leftItems.length > 0 && (
                    <SidePanel
                      title={currentStep.label}
                      items={leftItems}
                      selectedId={selectedCurrentId}
                      onSelect={handlePick}
                      onDragStart={onDragStart}
                      side="left"
                    />
                  )}

                  {rightItems.length > 0 && (
                    <SidePanel
                      title={currentStep.label}
                      items={rightItems}
                      selectedId={selectedCurrentId}
                      onSelect={handlePick}
                      onDragStart={onDragStart}
                      side="right"
                    />
                  )}

                  {/* CENTER BOWL */}
                  <div
                    ref={bowlRef}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className="
                      absolute left-1/2 z-20 transition-all duration-200
                      top-[48%] h-[clamp(235px,48%,470px)] w-[clamp(260px,54%,560px)]
                      md:top-[65%] md:h-[clamp(260px,52%,560px)] md:w-[clamp(280px,55%,580px)]
                    "
                    style={{
                      filter: isDragOver
                        ? "drop-shadow(0 0 16px rgba(255,151,33,0.95))"
                        : "none",
                      transform: isDragOver
                        ? "translate(-50%, -55%) scale(1.045)"
                        : "translate(-50%, -50%)",
                    }}
                  >
                    <img
                      src={mangkokMeja}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                      style={{ zIndex: 1 }}
                      draggable={false}
                    />

                    <SotoStackPreview
                      kuah={kuah}
                      topping={topping}
                      pelengkap={pelengkap}
                      tambahan={tambahan}
                    />
                  </div>

                  {/* MOBILE TRAY */}
                  <MobileIngredientTray
                    title={currentStep.label}
                    hint={currentStep.hint}
                    items={currentItems}
                    selectedId={selectedCurrentId}
                    onSelect={handlePick}
                    onDragStart={onDragStart}
                  />

                  {/* TOAST */}
                  <div
                    className={[
                      "pointer-events-none absolute left-1/2 z-[70] -translate-x-1/2",
                      "rounded-full bg-[rgba(42,31,14,0.94)] px-[clamp(16px,2.5vw,24px)] py-[clamp(8px,1vw,12px)]",
                      "font-body text-[clamp(0.72rem,1.2vw,0.92rem)] font-bold text-[#fafdda]",
                      "transition-all duration-300 whitespace-nowrap shadow-[0_5px_0_rgba(0,0,0,0)]",
                      toast.show
                        ? "top-[17%] opacity-100 md:top-[14%]"
                        : "top-[15%] opacity-0 md:top-[12%]",
                    ].join(" ")}
                  >
                    {toast.msg}
                  </div>

                  {/* DESKTOP STEP GUIDE */}
                  <div className="pointer-events-none absolute bottom-[3%] left-1/2 z-30 hidden -translate-x-1/2 md:block">
                    <p
                      className="
                        whitespace-nowrap rounded-full bg-[rgba(42,31,14,0.9)]
                        px-[clamp(16px,2.5vw,24px)] py-[clamp(8px,1vw,12px)]
                        font-body text-[clamp(0.72rem,1.15vw,0.95rem)] font-normal text-[#fafdda]
                        shadow-[0_4px_0_rgba(0,0,0,0)]
                      "
                    >
                      {step === 0
                        ? "Pilih kuah soto — klik card atau drag ke mangkok"
                        : step === 1
                          ? "Pilih isi utama soto — klik card atau drag ke mangkok"
                          : step === 2
                            ? "Pilih taburan soto — klik card atau drag ke mangkok"
                            : "Pilih extra topping soto — klik card atau drag ke mangkok"}
                    </p>
                  </div>

                  {/* RESULT OVERLAY */}
                  {result && (
                    <div className="absolute inset-0 z-[90] flex items-center justify-center bg-[rgba(42,31,14,0.87)] px-4">
                      <div
                        className="
                          relative flex max-w-[86%] flex-col items-center gap-2 overflow-hidden
                          rounded-2xl border-[3px] border-[#2a1f0e]
                          bg-[#fafdda]
                          px-[clamp(18px,4vw,38px)]
                          py-[clamp(14px,3vw,28px)]
                          text-center shadow-[0_8px_0_rgba(42,31,14,0.35)]
                          sm:max-w-[76%]
                          md:max-w-[66%]
                        "
                        style={{ transform: "rotate(-1deg)" }}
                      >
                        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ff9721]/25" />
                        <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#e83a2a]/15" />

                        <p className="relative z-10 font-title text-[clamp(0.5rem,1vw,0.72rem)] font-regular uppercase tracking-[0.18em] text-[#8a6a3a]">
                          Your soto is ready!
                        </p>

                        <h2 className="relative z-10 font-title text-[clamp(1.15rem,3.5vw,2.35rem)] font-regular leading-tight tracking-tight text-[#2a1f0e]">
                          {result.name}
                        </h2>

                        <FinalSotoPreview
                          kuah={result.kuah}
                          topping={result.topping}
                          pelengkap={result.pelengkap}
                          tambahan={result.tambahan}
                        />

                        <p className="relative z-10 max-w-[34rem] font-body text-[clamp(0.52rem,1vw,0.76rem)] font-bold leading-snug text-[#5a3e28]">
                          {result.copy}
                        </p>

                        <div className="relative z-10 flex flex-wrap justify-center gap-1">
                          {[
                            result.kuah,
                            result.topping,
                            result.pelengkap,
                            result.tambahan,
                          ]
                            .filter(Boolean)
                            .map((item) => (
                              <span
                                key={item.id}
                                className="rounded-full border border-[#d4a574] bg-[#fffef5] px-2 py-1 font-body text-[clamp(0.45rem,0.85vw,0.62rem)] font-bold text-[#5a3e28]"
                              >
                                {item.label}
                              </span>
                            ))}
                        </div>

                        <div className="relative z-10 mt-1 flex flex-wrap justify-center gap-2">
                          <button
                            type="button"
                            onClick={resetGame}
                            className="
                              rounded-full border-[2.5px] border-[#2a1f0e]
                              bg-[#ff9721]
                              px-[clamp(10px,2.5vw,20px)]
                              py-[5px]
                              font-title text-[clamp(0.6rem,1.2vw,0.82rem)]
                              font-regular text-[#2a1f0e]
                              shadow-[0_4px_0_rgba(42,31,14,0.25)]
                              transition-all hover:-translate-y-0.5 active:translate-y-0.5
                            "
                          >
                            Buat lagi
                          </button>

                          <button
                            type="button"
                            onClick={handleBackToStart}
                            className="
                              rounded-full border-[2.5px] border-[#2a1f0e]
                              bg-[#fafdda]
                              px-[clamp(10px,2.5vw,20px)]
                              py-[5px]
                              font-title text-[clamp(0.6rem,1.2vw,0.82rem)]
                              font-regular text-[#2a1f0e]
                              shadow-[0_4px_0_rgba(42,31,14,0.18)]
                              transition-all hover:-translate-y-0.5 hover:bg-white active:translate-y-0.5
                            "
                          >
                            Replay game
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sotoDotPulse {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes sotoBowlPop {
          from {
            transform: scale(0) rotate(-15deg);
            opacity: 0;
          }

          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Makeyourownsoto;
