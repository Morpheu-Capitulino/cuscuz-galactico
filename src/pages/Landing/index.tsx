import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ==========================================
// COMPONENTES DE FUNDO E ESTRELAS
// ==========================================
const stars = [
  { top: "10%", left: "5%", size: "text-xl", delay: "0s", opacity: 0.8 },
  { top: "5%", left: "19%", size: "text-sm", delay: "1.2s", opacity: 0.65 },
  { top: "14%", left: "23%", size: "text-3xl", delay: "0.4s", opacity: 1 },
  { top: "4%", left: "47%", size: "text-lg", delay: "1.8s", opacity: 0.8 },
  { top: "14%", left: "72%", size: "text-2xl", delay: "0.8s", opacity: 0.9 },
  { top: "19%", left: "84%", size: "text-3xl", delay: "1.5s", opacity: 0.9 },
  { top: "26%", left: "28%", size: "text-2xl", delay: "0.5s", opacity: 0.9 },
  { top: "31%", left: "73%", size: "text-lg", delay: "1.1s", opacity: 0.75 },
  { top: "38%", left: "96%", size: "text-xl", delay: "0.2s", opacity: 0.75 },
  { top: "43%", left: "7%", size: "text-2xl", delay: "1.7s", opacity: 0.85 },
  { top: "52%", left: "33%", size: "text-lg", delay: "0.9s", opacity: 0.85 },
  { top: "57%", left: "65%", size: "text-xl", delay: "1.4s", opacity: 0.9 },
  { top: "65%", left: "4%", size: "text-lg", delay: "0.6s", opacity: 0.7 },
  { top: "72%", left: "27%", size: "text-2xl", delay: "1.3s", opacity: 0.85 },
  { top: "78%", left: "58%", size: "text-lg", delay: "0.3s", opacity: 0.8 },
  { top: "48%", left: "91%", size: "text-xl", delay: "1.9s", opacity: 0.85 },
];

function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
      {stars.map((star, index) => (
        <span
          key={index}
          className={`absolute ${star.size} animate-pulse text-white`}
          style={{
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            animationDelay: star.delay,
            textShadow: "0 0 12px rgba(255,255,255,.8)",
          }}
        >
          ✦
        </span>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_20%,rgba(2,4,25,.42)_100%)]" />
    </div>
  );
}

function MeteorShower() {
  const meteors = [
    { top: "0%", left: "40%", delay: "0s", duration: "4s" },
    { top: "-10%", left: "80%", delay: "1.2s", duration: "3.5s" },
    { top: "10%", left: "110%", delay: "2.5s", duration: "4.2s" },
    { top: "30%", left: "120%", delay: "0.8s", duration: "5s" },
    { top: "-20%", left: "60%", delay: "3.2s", duration: "3.8s" },
    { top: "50%", left: "110%", delay: "2.1s", duration: "4.5s" },
    { top: "20%", left: "80%", delay: "4.5s", duration: "3.2s" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {meteors.map((m, i) => (
        <div
          key={i}
          className="absolute h-[2px] w-[150px]"
          style={{
            top: m.top,
            left: m.left,
            animation: `meteor-fall ${m.duration} linear infinite`,
            animationDelay: m.delay,
            background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(56,189,248,0.8) 20%, transparent 100%)",
          }}
        >
          <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_4px_#38bdf8]" />
        </div>
      ))}
    </div>
  );
}

// ==========================================
// TELA DE LOADING (METEOROS GIGANTES COM FOGO ATRÁS)
// ==========================================
function BigMeteorsLoading({ isLoaded }: { isLoaded: boolean }) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShouldRender(false), 1000); 
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!shouldRender) return null;

  const bigMeteors = [
    { w: 900, h: 300, top: "-10%", left: "80%", dur: "1.8s", del: "0s", type: "fire" },
    { w: 600, h: 200, top: "15%", left: "100%", dur: "1.2s", del: "0.2s", type: "blue" },
    { w: 850, h: 280, top: "45%", left: "115%", dur: "1.7s", del: "0.1s", type: "fire" },
    { w: 500, h: 160, top: "-20%", left: "50%", dur: "1.0s", del: "0.5s", type: "blue" },
    { w: 1000, h: 350, top: "5%", left: "130%", dur: "2.2s", del: "0.7s", type: "fire" },
    { w: 550, h: 180, top: "60%", left: "95%", dur: "1.4s", del: "0.3s", type: "blue" },
    { w: 750, h: 250, top: "35%", left: "140%", dur: "1.6s", del: "0.6s", type: "fire" },
    { w: 800, h: 260, top: "-30%", left: "70%", dur: "1.9s", del: "0.4s", type: "blue" },
    { w: 1100, h: 380, top: "25%", left: "150%", dur: "2.4s", del: "0.8s", type: "fire" },
    { w: 450, h: 150, top: "75%", left: "80%", dur: "1.1s", del: "0.9s", type: "blue" },
  ];

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#03051d] transition-opacity duration-1000 ease-in-out ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bigMeteors.map((m, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: m.top,
              left: m.left,
              width: m.w,
              height: m.h,
              animation: `big-meteor-fall ${m.dur} linear infinite ${m.del}`,
              opacity: 0, 
            }}
          >
            <svg viewBox="0 0 800 200" className="h-full w-full">
              <defs>
                <radialGradient id={`rock-grad-${i}`} cx="30%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>
                <linearGradient id={`tail-${m.type}-${i}`} x1="0.05" y1="0.5" x2="1" y2="0.5">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="15%" stopColor={m.type === 'fire' ? "#fef08a" : "#cffafe"} stopOpacity="0.9" />
                  <stop offset="40%" stopColor={m.type === 'fire' ? "#ea580c" : "#0284c7"} stopOpacity="0.8" />
                  <stop offset="70%" stopColor={m.type === 'fire' ? "#7f1d1d" : "#1e3a8a"} stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
                <linearGradient id={`smoke-${m.type}-${i}`} x1="0.2" y1="0.5" x2="1" y2="0.5">
                  <stop offset="0%" stopColor={m.type === 'fire' ? "#450a0a" : "#0f172a"} stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#000000" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
                <filter id={`blur-heavy-${i}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="15" />
                </filter>
                <filter id={`blur-light-${i}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id={`glow-rock-${i}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Fumaça e Cauda posicionadas ATRÁS da pedra (no lado direito da pedra SVG) */}
              <path d="M 120 100 Q 350 0 750 70 Q 850 100 750 130 Q 350 200 120 100 Z" fill={`url(#smoke-${m.type}-${i})`} filter={`url(#blur-heavy-${i})`} />
              <path d="M 80 100 Q 300 30 650 90 Q 750 100 650 110 Q 300 170 80 100 Z" fill={`url(#tail-${m.type}-${i})`} filter={`url(#blur-heavy-${i})`} />
              <path d="M 60 100 Q 200 60 400 95 Q 450 100 400 105 Q 200 140 60 100 Z" fill="#ffffff" filter={`url(#blur-light-${i})`} opacity="0.9" />

              {/* Fragmentos se soltando */}
              <circle cx="200" cy="70" r="4" fill={m.type === 'fire' ? "#fde047" : "#7dd3fc"} filter={`url(#blur-light-${i})`} />
              <circle cx="300" cy="140" r="6" fill={m.type === 'fire' ? "#f97316" : "#0ea5e9"} filter={`url(#blur-light-${i})`} opacity="0.8" />
              <circle cx="450" cy="85" r="3" fill={m.type === 'fire' ? "#ef4444" : "#2563eb"} />
              <circle cx="550" cy="115" r="8" fill={m.type === 'fire' ? "#ea580c" : "#0284c7"} filter={`url(#blur-light-${i})`} opacity="0.6" />
              
              {/* ROCHA NA PONTA ESQUERDA */}
              <g transform="translate(40, 55)">
                <path d="M 0 45 C 5 15, 35 -5, 60 5 C 85 15, 100 5, 120 25 C 140 45, 125 75, 100 85 C 80 95, 95 120, 60 110 C 25 100, -5 75, 0 45 Z" fill={`url(#rock-grad-${i})`} />
                <ellipse cx="40" cy="40" rx="10" ry="18" fill="#020617" opacity="0.7" transform="rotate(25 40 40)" />
                <ellipse cx="80" cy="70" rx="16" ry="9" fill="#020617" opacity="0.6" transform="rotate(-15 80 70)" />
                <ellipse cx="90" cy="35" rx="12" ry="18" fill="#020617" opacity="0.8" transform="rotate(40 90 35)" />
                <path d="M 60 15 Q 80 30 100 25" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                {/* Escudo de Calor brilhando na frente da rocha */}
                <path d="M -2 45 C 3 15, 30 0, 50 5" fill="none" stroke={m.type === 'fire' ? "#fef08a" : "#cffafe"} strokeWidth="8" filter={`url(#glow-rock-${i})`} opacity="0.9" />
                <path d="M -2 45 C 3 15, 30 0, 50 5" fill="none" stroke="#ffffff" strokeWidth="3" />
              </g>
            </svg>
          </div>
        ))}
      </div>
      
      <div role="status" aria-live="polite" className="absolute z-10 text-center animate-pulse rounded-2xl bg-black/40 px-8 py-4 backdrop-blur-sm border border-white/10">
        <span className="text-2xl font-black italic tracking-[0.3em] text-white/80 drop-shadow-md">
          PREPARANDO MISSÃO...
        </span>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTES PRINCIPAIS DO JOGO
// ==========================================
function BrandLogo() {
  return (
    <a href="#home" aria-label="Astro Mission" className="absolute left-1/2 top-2 flex -translate-x-1/2 flex-col items-center leading-none">
      <svg viewBox="0 0 190 78" className="w-32 drop-shadow-[0_4px_8px_rgba(0,0,0,.5)]">
        <ellipse cx="94" cy="39" rx="75" ry="23" transform="rotate(-13 94 39)" fill="none" stroke="#173b91" strokeWidth="7" />
        <path d="M35 51 Q88 2 148 19" fill="none" stroke="#2563eb" strokeWidth="5" />
        <circle cx="113" cy="17" r="16" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="3" />
        <path d="M102 16 Q113 6 124 15 Q118 23 106 24Z" fill="#bfdbfe" opacity=".9" />
        <path d="M99 29 Q127 23 145 30" fill="none" stroke="#f8fafc" strokeWidth="2" />
        <text x="95" y="45" textAnchor="middle" fontSize="25" fontWeight="900" fontStyle="italic" fill="#fff" stroke="#173a91" strokeWidth="5" paintOrder="stroke">Astro</text>
        <text x="95" y="67" textAnchor="middle" fontSize="26" fontWeight="1000" fontStyle="italic" fill="#144ed5" stroke="#93c5fd" strokeWidth="5" paintOrder="stroke">Mission</text>
      </svg>
    </a>
  );
}

function GalaxyTrail() {
  const trail = "M -90 320 C 105 425 280 505 465 490 C 650 477 785 423 865 520 C 956 630 813 682 690 752 C 590 810 685 875 820 900 C 905 916 978 950 1055 1010";
  return (
    <svg aria-hidden="true" viewBox="0 0 1424 1072" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-[8] h-full w-full">
      <defs>
        <linearGradient id="galaxy-gradient" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#1668ed" />
          <stop offset="28%" stopColor="#347cfb" />
          <stop offset="52%" stopColor="#8b45f5" />
          <stop offset="70%" stopColor="#d34df0" />
          <stop offset="86%" stopColor="#51c7ff" />
          <stop offset="100%" stopColor="#7770ff" />
        </linearGradient>
        <linearGradient id="galaxy-inner" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#53d7ff" />
          <stop offset="45%" stopColor="#d4a2ff" />
          <stop offset="75%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#69d9ff" />
        </linearGradient>
        <filter id="galaxy-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="23" />
        </filter>
      </defs>
      <path d={trail} fill="none" stroke="#6339fa" strokeWidth="148" strokeLinecap="round" opacity=".72" filter="url(#galaxy-blur)" />
      <path d={trail} fill="none" stroke="url(#galaxy-gradient)" strokeWidth="94" strokeLinecap="round" opacity=".96" />
      <path d={trail} fill="none" stroke="#2424a9" strokeWidth="17" strokeLinecap="round" opacity=".42" />
      <path d={trail} fill="none" stroke="url(#galaxy-inner)" strokeWidth="7" strokeLinecap="round" opacity=".92" />
      <path d={trail} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 29" opacity=".9" />
    </svg>
  );
}

function SpacePlanets() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {/* SATURNO */}
      <div className="absolute -right-24 top-[12%] h-56 w-72 md:-right-20 md:top-[10%] md:h-64 md:w-80">
        <div className="absolute left-[-8%] top-1/2 h-24 w-[116%] -translate-y-1/2 rotate-[-20deg] rounded-[50%] border-[16px] border-[#173b91] bg-[#1e40af]/15 shadow-[0_0_24px_rgba(37,99,235,.32)] md:h-28 md:border-[19px]" />
        <div className="absolute left-[-4%] top-1/2 h-16 w-[108%] -translate-y-1/2 rotate-[-20deg] rounded-[50%] border-[5px] border-[#60a5fa]/75 md:h-20" />
        <div className="absolute right-[9%] top-1/2 h-44 w-44 -translate-y-1/2 overflow-hidden rounded-full border border-[#93c5fd]/40 bg-[radial-gradient(circle_at_33%_27%,#93c5fd_0%,#3b82f6_38%,#1e3a8a_72%,#071a44_100%)] shadow-[inset_-22px_-13px_30px_rgba(3,12,38,.55),0_0_45px_rgba(37,99,235,.32)] md:right-[10%] md:h-52 md:w-52">
          <span className="absolute -left-2 top-[23%] h-3 w-full rotate-[7deg] bg-[#1e3a8a]/35" />
          <span className="absolute -left-2 top-[35%] h-5 w-full -rotate-[5deg] bg-[#93c5fd]/45" />
          <span className="absolute -left-2 top-[48%] h-3 w-full rotate-[4deg] bg-[#1e40af]/35" />
          <span className="absolute -left-2 top-[61%] h-5 w-full -rotate-[6deg] bg-[#60a5fa]/40" />
          <span className="absolute -left-2 top-[74%] h-3 w-full rotate-[3deg] bg-[#172554]/35" />
          <span className="absolute left-[22%] top-[18%] h-8 w-14 rounded-full bg-white/10 blur-md" />
        </div>
      </div>

      {/* LUA */}
      <div className="absolute -bottom-40 -left-36 h-[390px] w-[390px] rounded-full border border-slate-200/20 bg-[radial-gradient(circle_at_34%_28%,#e5e7eb_0%,#aeb8c8_34%,#68758d_68%,#27334e_100%)] shadow-[inset_-36px_-28px_55px_rgba(8,15,36,.62),0_0_55px_rgba(148,163,184,.25)] md:-bottom-44 md:-left-32 md:h-[455px] md:w-[455px]">
        <span className="absolute left-[28%] top-[23%] h-9 w-12 rounded-[50%] bg-slate-500/35 shadow-[inset_3px_3px_7px_rgba(15,23,42,.35),0_2px_2px_rgba(255,255,255,.12)]" />
        <span className="absolute left-[57%] top-[36%] h-6 w-9 rounded-[50%] bg-slate-600/35 shadow-[inset_2px_2px_5px_rgba(15,23,42,.4)]" />
        <span className="absolute left-[20%] top-[55%] h-8 w-11 rounded-[50%] bg-slate-600/35 shadow-[inset_3px_3px_6px_rgba(15,23,42,.4)]" />
        <span className="absolute left-[66%] top-[65%] h-12 w-16 rounded-[50%] bg-slate-600/30 shadow-[inset_4px_4px_8px_rgba(15,23,42,.4)]" />
        <span className="absolute left-[43%] top-[76%] h-5 w-8 rounded-[50%] bg-slate-500/35 shadow-[inset_2px_2px_4px_rgba(15,23,42,.4)]" />
        <span className="absolute left-[75%] top-[22%] h-5 w-7 rounded-[50%] bg-slate-600/30 shadow-[inset_2px_2px_4px_rgba(15,23,42,.4)]" />
        <span className="absolute left-[12%] top-[39%] h-4 w-6 rounded-[50%] bg-slate-500/35" />
      </div>
    </div>
  );
}

function Spaceship() {
  return (
    <div className="absolute left-[7%] top-[27%] z-[24] w-44 -rotate-[7deg] animate-[float_5s_ease-in-out_infinite] md:left-[10%] md:top-[26%] md:w-[290px]">
      <svg viewBox="0 0 340 190" className="h-auto w-full drop-shadow-[0_10px_18px_rgba(0,0,0,.4)]">
        <defs>
          <linearGradient id="ship-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="55%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="ship-flame" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0" />
            <stop offset="55%" stopColor="#38bdf8" stopOpacity=".9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M105 78 C65 47 29 47 0 70 C37 66 52 91 4 112 C55 108 79 119 112 101Z" fill="url(#ship-flame)" />
        <path d="M111 83 C70 76 45 86 15 95" fill="none" stroke="#7dd3fc" strokeWidth="5" opacity=".8" />
        <path d="M119 72 L78 22 Q72 13 87 18 L161 61Z" fill="#f97316" stroke="#24345b" strokeWidth="6" />
        <path d="M122 111 L76 153 Q69 162 88 157 L165 119Z" fill="#f97316" stroke="#24345b" strokeWidth="6" />
        <path d="M182 65 L172 27 L217 62Z" fill="#94a3b8" stroke="#24345b" strokeWidth="5" />
        <path d="M72 94 C100 47 190 34 276 73 Q319 94 277 119 C194 158 108 140 72 94Z" fill="url(#ship-body)" stroke="#263b69" strokeWidth="7" />
        <path d="M89 91 Q126 68 167 65" fill="none" stroke="#fff" strokeWidth="7" opacity=".9" />
        <path d="M195 66 Q235 53 269 79 Q288 98 263 115 Q227 130 196 108 Q179 91 195 66Z" fill="#082344" stroke="#38bdf8" strokeWidth="6" />
        <path d="M211 72 Q236 64 254 79" fill="none" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" opacity=".85" />
        <circle cx="142" cy="96" r="15" fill="#2563eb" />
        <ellipse cx="142" cy="96" rx="25" ry="7" fill="none" stroke="#173b91" strokeWidth="4" transform="rotate(-18 142 96)" />
        <circle cx="142" cy="96" r="5" fill="#173b91" />
        <path d="M76 80 L55 77 L52 111 L80 108Z" fill="#f97316" stroke="#24345b" strokeWidth="5" />
      </svg>
    </div>
  );
}

function MoonSurface() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-[18] h-[27%] w-full">
      <svg viewBox="0 0 1424 330" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="moon-ground" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <path d="M0 244 C120 253 185 219 285 204 C397 188 455 145 560 144 C658 143 710 162 799 127 C892 90 1007 75 1114 99 C1221 122 1320 99 1424 105 L1424 330 L0 330Z" fill="url(#moon-ground)" stroke="#bfdbfe" strokeWidth="8" />
        <ellipse cx="590" cy="245" rx="48" ry="15" fill="#786ba8" opacity=".35" transform="rotate(-12 590 245)" />
        <ellipse cx="590" cy="239" rx="34" ry="9" fill="#51477d" opacity=".45" transform="rotate(-12 590 239)" />
        <ellipse cx="775" cy="195" rx="27" ry="10" fill="#8476b3" opacity=".35" transform="rotate(-17 775 195)" />
        <ellipse cx="975" cy="270" rx="42" ry="13" fill="#786ba8" opacity=".32" transform="rotate(-9 975 270)" />
        <ellipse cx="1190" cy="187" rx="35" ry="12" fill="#786ba8" opacity=".32" transform="rotate(-13 1190 187)" />
        <ellipse cx="1320" cy="255" rx="57" ry="16" fill="#786ba8" opacity=".3" transform="rotate(-10 1320 255)" />
        <ellipse cx="385" cy="285" rx="24" ry="8" fill="#786ba8" opacity=".3" />
        <path d="M530 251 Q590 222 647 245" fill="none" stroke="#fff" strokeWidth="5" opacity=".35" />
        <path d="M1120 213 Q1180 188 1230 210" fill="none" stroke="#fff" strokeWidth="4" opacity=".3" />
      </svg>
    </div>
  );
}

function LumiRobot({ isAppLoaded }: { isAppLoaded: boolean }) {
  return (
    <div className={`robot-container absolute bottom-[2%] right-[-3%] z-[35] w-[min(45vw,470px)] min-w-[270px] animate-[float_6s_ease-in-out_infinite] md:right-[3%] md:bottom-[2%] ${isAppLoaded ? "lumi-intro-wave" : ""}`}>
      {isAppLoaded && (
        <div
          role="status"
          className="lumi-speech absolute right-[3%] top-[-18%] z-20 w-[min(320px,82vw)] rounded-2xl border border-cyan-200/70 bg-[#071a3b]/95 px-4 py-3 text-center shadow-[0_0_30px_rgba(34,211,238,.32)] backdrop-blur-md sm:right-[8%] sm:top-[-20%] sm:px-5 sm:py-4"
        >
          <span className="mb-1 block text-[9px] font-black uppercase tracking-[.24em] text-cyan-300">LUMI • transmissão recebida</span>
          <p className="text-xs font-semibold leading-relaxed text-white sm:text-sm">
            Olá, astronauta! Me chamo LUMI. Você está pronto pra sua nova jornada?
          </p>
          <span aria-hidden="true" className="absolute -bottom-[9px] right-[22%] h-4 w-4 rotate-45 border-b border-r border-cyan-200/70 bg-[#071a3b]" />
        </div>
      )}
      <svg viewBox="0 0 500 520" className="h-auto w-full overflow-visible drop-shadow-[0_15px_24px_rgba(5,8,35,.45)]">
        <defs>
          <linearGradient id="lumi-white" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="65%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#8da9d5" />
          </linearGradient>
          <linearGradient id="lumi-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <ellipse cx="280" cy="492" rx="190" ry="19" fill="#4b4380" opacity=".35" />
        <path d="M226 356 Q195 390 168 427 Q147 455 173 475 Q204 496 247 472 L300 417Z" fill="url(#lumi-white)" stroke="#344568" strokeWidth="8" />
        <path d="M326 354 Q354 388 376 425 Q395 456 367 478 Q336 497 294 473 L268 416Z" fill="url(#lumi-white)" stroke="#344568" strokeWidth="8" />
        <path d="M174 449 Q202 441 226 460 L241 477 Q204 501 171 481 Q151 467 174 449Z" fill="#dbeafe" stroke="#344568" strokeWidth="7" />
        <path d="M315 459 Q344 435 371 450 Q391 469 368 486 Q335 501 304 479Z" fill="#dbeafe" stroke="#344568" strokeWidth="7" />
        <path d="M185 458 L207 484" stroke="#22d3ee" strokeWidth="10" strokeLinecap="round" />
        <path d="M326 460 L350 485" stroke="#22d3ee" strokeWidth="10" strokeLinecap="round" />
        <path d="M184 252 Q205 226 260 229 L343 246 Q378 264 375 323 L361 405 Q349 430 317 421 L213 409 Q182 396 180 365Z" fill="url(#lumi-white)" stroke="#344568" strokeWidth="9" />
        <path d="M213 278 Q278 300 346 278" fill="none" stroke="#8cc5ef" strokeWidth="8" opacity=".85" />
        <path d="M205 311 Q280 333 351 311" fill="none" stroke="#8cc5ef" strokeWidth="8" opacity=".85" />
        <circle cx="286" cy="354" r="27" fill="#2563eb" />
        <ellipse cx="286" cy="354" rx="44" ry="13" fill="none" stroke="#173b91" strokeWidth="5" transform="rotate(-18 286 354)" />
        <circle cx="286" cy="354" r="7" fill="#173b91" />
        <path d="M197 270 Q163 279 150 318 L137 352 Q134 373 155 379 Q174 383 185 361 L212 316Z" fill="url(#lumi-white)" stroke="#344568" strokeWidth="8" />
        <circle cx="151" cy="369" r="19" fill="#dbeafe" stroke="#344568" strokeWidth="7" />
        <g className="robot-arm-wave">
          <path d="M355 273 Q391 281 399 321 L411 354 Q416 376 394 384 Q374 389 364 366 L340 316Z" fill="url(#lumi-white)" stroke="#344568" strokeWidth="8" />
          <circle cx="398" cy="371" r="19" fill="#dbeafe" stroke="#344568" strokeWidth="7" />
        </g>
        <path d="M188 112 L168 52" stroke="#344568" strokeWidth="10" strokeLinecap="round" />
        <circle cx="165" cy="45" r="15" fill="#22d3ee" stroke="#344568" strokeWidth="6" />
        <path d="M377 112 L400 52" stroke="#344568" strokeWidth="10" strokeLinecap="round" />
        <circle cx="404" cy="45" r="15" fill="#22d3ee" stroke="#344568" strokeWidth="6" />
        <path d="M133 116 Q140 72 188 64 L355 67 Q406 78 419 130 L413 220 Q402 267 355 277 L190 271 Q139 260 128 219Z" fill="url(#lumi-white)" stroke="#344568" strokeWidth="10" />
        <path d="M155 103 Q185 80 220 82" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity=".9" />
        <rect x="111" y="143" width="35" height="90" rx="16" fill="#93c5fd" stroke="#344568" strokeWidth="8" />
        <rect x="402" y="143" width="35" height="90" rx="16" fill="#93c5fd" stroke="#344568" strokeWidth="8" />
        <circle cx="423" cy="188" r="12" fill="url(#lumi-blue)" />
        <circle cx="126" cy="188" r="12" fill="url(#lumi-blue)" />
        <rect x="153" y="111" width="245" height="139" rx="53" fill="#07152e" stroke="#52658b" strokeWidth="7" />
        <path d="M177 128 Q225 104 277 117" fill="none" stroke="#375078" strokeWidth="7" strokeLinecap="round" opacity=".55" />
        <g className="lumi-eye">
          <path d="M197 184 Q220 145 245 184" fill="none" stroke="#24d9ff" strokeWidth="15" strokeLinecap="round" />
          <path d="M197 184 Q220 145 245 184" fill="none" stroke="#b9f5ff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
        </g>
        <g className="lumi-eye">
          <path d="M302 184 Q326 145 350 184" fill="none" stroke="#24d9ff" strokeWidth="15" strokeLinecap="round" />
          <path d="M302 184 Q326 145 350 184" fill="none" stroke="#b9f5ff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
        </g>
        <path d="M267 65 L267 52" stroke="#344568" strokeWidth="7" />
        <circle cx="267" cy="45" r="9" fill="#173b91" />
      </svg>
      <div className="absolute bottom-[24%] left-[-9%] h-24 w-44 -rotate-[12deg] rounded-xl border-[3px] border-cyan-200 bg-cyan-400/20 shadow-[0_0_25px_rgba(34,211,238,.85)] backdrop-blur-sm md:h-28 md:w-52">
        <div className="absolute inset-2 rounded-lg border border-cyan-200/70">
          <div className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-100" />
          <div className="absolute left-1/2 top-1/2 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-full border-2 border-cyan-100" />
          <span className="absolute left-3 top-3 text-[9px] font-bold tracking-widest text-cyan-100">LUMI • MAP</span>
          <span className="absolute bottom-2 right-3 text-[8px] text-cyan-100">MISSION 01</span>
        </div>
      </div>
      <div className="absolute bottom-[19%] left-[-8%] h-14 w-48 rounded-full bg-cyan-300/35 blur-2xl" />
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL (PÁGINA)
// ==========================================
export default function AstroMissionLanding() {
  const navigate = useNavigate();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    // 2.8s para deixar os meteoros rasgarem a tela
    const timer = setTimeout(() => {
      setIsAppLoaded(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Mantém o foco dentro do guia e impede a página ao fundo de rolar.
  useEffect(() => {
    if (!showHowToPlay) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const dialog = document.getElementById("how-to-play-dialog");
    const closeButton = document.getElementById("how-to-play-close");

    document.body.style.overflow = "hidden";
    closeButton?.focus();

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setShowHowToPlay(false);
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeys);

    return () => {
      document.removeEventListener("keydown", handleDialogKeys);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [showHowToPlay]);

  return (
    <main
      id="home"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#03051d] font-sans text-white"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes lumi-wave {
          0%, 100% { transform: rotate(0deg); }
          18% { transform: rotate(-55deg); }
          38% { transform: rotate(-72deg); }
          58% { transform: rotate(-42deg); }
          78% { transform: rotate(-68deg); }
          90% { transform: rotate(-55deg); }
        }

        @keyframes lumi-blink {
          0%, 89%, 95%, 100% { transform: scaleY(1); }
          92% { transform: scaleY(0.08); }
        }

        .lumi-eye {
          transform-box: fill-box;
          transform-origin: center;
          animation: lumi-blink 3s infinite;
        }

        @keyframes lumi-speech-lifecycle {
          0% { opacity: 0; transform: translateY(14px) scale(.88); }
          10% { opacity: 1; transform: translateY(-2px) scale(1.02); }
          90% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-6px) scale(.96); }
        }

        .lumi-intro-wave .robot-arm-wave {
          animation: lumi-wave 1.1s ease-in-out 3;
          animation-delay: .25s;
        }

        .lumi-speech {
          transform-origin: 80% 100%;
          /* 0,625s de entrada + 5s visível + 0,625s de saída */
          animation: lumi-speech-lifecycle 6.25s cubic-bezier(.2,.8,.2,1) both;
          animation-delay: .4s;
        }
        
        @keyframes meteor-fall {
          0% { opacity: 0; transform: translate3d(150px, -150px, 0) rotate(-45deg); }
          15% { opacity: 1; }
          60% { opacity: 0; transform: translate3d(-1200px, 1200px, 0) rotate(-45deg); }
          100% { opacity: 0; transform: translate3d(-1200px, 1200px, 0) rotate(-45deg); }
        }

        /* METEOROS GIGANTES (Aceleração GPU nativa 60fps) */
        @keyframes big-meteor-fall {
          0% { 
            opacity: 0;
            transform: translate3d(20vw, -20vh, 0) rotate(-35deg); 
          }
          5% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            opacity: 0;
            transform: translate3d(-130vw, 130vh, 0) rotate(-35deg); 
          }
        }

        .robot-arm-wave {
          transform-box: view-box;
          transform-origin: 355px 273px;
        }

        .robot-container:hover .robot-arm-wave {
          animation: lumi-wave 1.1s ease-in-out 2;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}} />

      {/* TELA DE LOADING (METEOROS REALISTAS) */}
      <BigMeteorsLoading isLoaded={isAppLoaded} />

      {/* Fundo espacial e nebulosas */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,#10134a_0%,#080b32_48%,#020419_100%)]" />
        <div className="absolute -left-32 top-[20%] h-96 w-[46rem] rounded-full bg-blue-700/20 blur-[100px]" />
        <div className="absolute left-[38%] top-[35%] h-72 w-96 rounded-full bg-violet-700/20 blur-[110px]" />
        <div className="absolute right-[-10%] top-[46%] h-72 w-96 rounded-full bg-cyan-700/10 blur-[100px]" />
      </div>

      <StarField />
      <MeteorShower />
      <SpacePlanets />

      {/* Navegação superior */}
      <header className="relative z-50 mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 py-6 sm:px-8 md:px-12 md:py-8">
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-sm font-medium text-white/95 md:flex lg:gap-12">
          <a href="#home" className="transition hover:text-cyan-300">Home</a>
          <button type="button" onClick={() => setShowHowToPlay(true)} className="cursor-pointer transition-colors duration-300 hover:text-cyan-300">Como Jogar</button>
        </nav>

        <BrandLogo />

        <nav aria-label="Links adicionais" className="hidden items-center gap-8 text-sm font-medium text-white/95 md:flex lg:gap-12">
        </nav>

        <a
          href="#contact"
          className="ml-auto rounded-full border border-cyan-300/70 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/10 md:hidden"
        >
          Contact
        </a>
      </header>

      {/* Título principal */}
      <section className="relative z-30 mx-auto mt-10 flex w-full max-w-5xl flex-col items-center px-4 text-center sm:mt-12 md:mt-8">
        
        <div className="relative">
          {/* Órbita ao redor do título */}
          <svg
            aria-hidden="true"
            viewBox="0 0 760 300"
            className="pointer-events-none absolute -left-[8%] top-[-13%] z-0 h-[120%] w-[116%] overflow-visible"
          >
            <path
              d="M35 190 C130 80 260 70 395 56 C535 40 652 43 708 4"
              fill="none"
              stroke="#173b91"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M35 190 C130 80 260 70 395 56 C535 40 652 43 708 4"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <h1 className="relative z-10 flex flex-col items-center text-[clamp(3.8rem,9.6vw,8.7rem)] font-black italic leading-[0.78] tracking-[-0.075em]">
            <span
              className="text-white"
              style={{
                WebkitTextStroke: "2px #1747a5",
                textShadow: "0 7px 0 #173b91, 0 12px 28px rgba(37,99,235,.55)",
              }}
            >
              ASTRO
            </span>
            <span
              className="mt-3 text-[#173b91]"
              style={{
                WebkitTextStroke: "2px #93c5fd",
                textShadow: "0 7px 0 #071a44, 0 12px 24px rgba(37,99,235,.65)",
              }}
            >
              MISSION
            </span>
          </h1>
        </div>

        <p className="relative z-20 mt-7 text-sm font-medium tracking-wide text-white sm:text-lg md:mt-6">
          Construa • Administre • Sobreviva na Lua
        </p>

        {/* ASTEROIDE INTERATIVO — botão para iniciar o jogo */}
        <div className="group relative z-30 mt-7 flex items-center justify-center sm:mt-8">
          <div className="absolute -left-16 top-1/2 h-12 w-36 -translate-y-1/2 -rotate-12 rounded-full bg-cyan-400/25 blur-2xl transition-all duration-500 group-hover:bg-cyan-300/45 group-hover:blur-3xl" />
          <div className="absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-500/25 blur-2xl transition-all duration-500 group-hover:bg-blue-400/40" />

          <span aria-hidden="true" className="absolute -right-5 top-0 text-xl text-cyan-200 drop-shadow-[0_0_10px_#38bdf8] transition duration-500 group-hover:scale-125 group-hover:rotate-45">✦</span>
          <span aria-hidden="true" className="absolute -bottom-2 -left-5 text-lg text-blue-200 drop-shadow-[0_0_9px_#60a5fa] transition duration-500 group-hover:-translate-y-2">✧</span>
          <span aria-hidden="true" className="absolute -left-9 top-5 h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_#67e8f9]" />

          <button
            type="button"
            onClick={() => navigate('/briefing')}
            aria-label="Jogar Astro Mission"
            className="relative block w-[260px] cursor-pointer transition duration-300 ease-out hover:-translate-y-2 hover:scale-105 active:translate-y-0 active:scale-100 sm:w-[310px] bg-transparent border-none p-0 outline-none"
          >
            <svg
              viewBox="0 0 340 190"
              role="img"
              aria-label="Asteroide azul"
              className="h-auto w-full overflow-visible drop-shadow-[0_13px_15px_rgba(0,0,0,.45)] transition duration-500 group-hover:drop-shadow-[0_15px_25px_rgba(34,211,238,.45)]"
            >
              <defs>
                <linearGradient id="asteroid-rock" x1="10%" y1="0%" x2="90%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="28%" stopColor="#426ba8" />
                  <stop offset="65%" stopColor="#1e3a70" />
                  <stop offset="100%" stopColor="#091735" />
                </linearGradient>
                <filter id="asteroid-glow" x="-30%" y="-40%" width="160%" height="180%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
              </defs>

              <path d="M48 55 L83 27 L125 20 L157 9 L198 23 L235 18 L268 43 L301 51 L320 83 L310 118 L282 139 L247 151 L220 174 L176 166 L143 180 L108 159 L72 158 L42 130 L23 99Z" fill="#38bdf8" opacity=".35" filter="url(#asteroid-glow)" />
              <path d="M48 55 L83 27 L125 20 L157 9 L198 23 L235 18 L268 43 L301 51 L320 83 L310 118 L282 139 L247 151 L220 174 L176 166 L143 180 L108 159 L72 158 L42 130 L23 99Z" fill="url(#asteroid-rock)" stroke="#a5d8ff" strokeWidth="4" strokeLinejoin="round" />
              <path d="M83 27 L125 20 L157 9 L174 45 L133 64 L99 58Z" fill="#9ac6ed" opacity=".38" />
              <path d="M198 23 L235 18 L268 43 L251 73 L211 66Z" fill="#8bb8e6" opacity=".26" />
              <path d="M42 130 L72 158 L108 159 L115 120 L76 104Z" fill="#071a3d" opacity=".5" />
              <path d="M176 166 L143 180 L158 137 L198 119 L220 174Z" fill="#07152f" opacity=".48" />
              <path d="M268 43 L301 51 L320 83 L282 94 L251 73Z" fill="#b5dcff" opacity=".16" />
              <ellipse cx="92" cy="82" rx="18" ry="11" transform="rotate(-22 92 82)" fill="#102b55" opacity=".85" />
              <ellipse cx="88" cy="78" rx="12" ry="6" transform="rotate(-22 88 78)" fill="#8cb9e5" opacity=".42" />
              <ellipse cx="253" cy="105" rx="22" ry="13" transform="rotate(18 253 105)" fill="#0b2045" opacity=".8" />
              <ellipse cx="250" cy="101" rx="14" ry="7" transform="rotate(18 250 101)" fill="#8bb8e6" opacity=".35" />
              <ellipse cx="166" cy="42" rx="11" ry="7" transform="rotate(-12 166 42)" fill="#0c2348" opacity=".65" />
              <ellipse cx="137" cy="139" rx="13" ry="8" transform="rotate(20 137 139)" fill="#0b2045" opacity=".75" />
              <path d="M65 53 L84 38 L108 34" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity=".42" />
              <path d="M224 39 L240 34 L252 42" fill="none" stroke="#dbeafe" strokeWidth="3" strokeLinecap="round" opacity=".45" />
              <circle cx="294" cy="78" r="3" fill="#dbeafe" opacity=".8" />
              <circle cx="113" cy="112" r="2.5" fill="#bfdbfe" opacity=".8" />
            </svg>

            <span className="absolute inset-0 flex flex-col items-center justify-center pt-1 text-center">
              <span className="text-3xl font-black italic tracking-[0.12em] text-white drop-shadow-[0_3px_3px_rgba(0,0,0,.8)] sm:text-4xl">
                JOGAR
              </span>
              <span className="mt-1 text-[8px] font-bold tracking-[0.2em] text-blue-100/90 drop-shadow-[0_1px_3px_rgba(0,0,0,.9)]">
                INICIAR MISSÃO
              </span>
            </span>
          </button>
        </div>
      </section>

      <GalaxyTrail />
      <Spaceship />

      <section className="absolute bottom-[29%] left-5 z-30 max-w-[48%] border-l-2 border-cyan-400 pl-3 sm:hidden">
        <p className="text-[11px] leading-relaxed text-white/95">
          Explore space, learn new things and build a better tomorrow with
          Astro Mission!
        </p>
      </section>

      <MoonSurface />
      <LumiRobot isAppLoaded={isAppLoaded} />

      <footer
        id="contact"
        className="absolute bottom-2 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap text-[10px] text-white/60 sm:text-xs"
      >
        © Astro Mission • Explore the Universe
      </footer>

      {/* Modal de instruções — central de comando da missão */}
      {showHowToPlay && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#01030f]/90 px-3 py-5 backdrop-blur-xl sm:px-6"
          onClick={() => setShowHowToPlay(false)}
        >
          <section
            id="how-to-play-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="how-to-play-title"
            aria-describedby="how-to-play-objective"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-cyan-300/25 bg-[#071126] shadow-[0_30px_120px_rgba(0,0,0,.75),0_0_55px_rgba(14,165,233,.14)]"
          >
            {/* Moldura e detalhes de interface */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.045)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="absolute -right-28 -top-32 h-80 w-80 rounded-full border border-cyan-300/20" />
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-cyan-300/15" />
            </div>
            <div className="relative h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

            <button
              id="how-to-play-close"
              type="button"
              aria-label="Fechar instruções"
              onClick={() => setShowHowToPlay(false)}
              className="absolute right-4 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-slate-300 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-white"
            >
              ×
            </button>

            <div className="relative p-4 sm:p-6 lg:p-7">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-2xl shadow-[0_0_25px_rgba(34,211,238,.12)]">
                  🤖
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[.28em] text-cyan-300">Astro Mission • Guia rápido</p>
                  <p className="mt-1 text-sm font-semibold tracking-wider text-slate-400">O ESSENCIAL PARA COMEÇAR</p>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[.8fr_1.5fr] lg:gap-7">
                <div className="flex flex-col justify-center">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-blue-300">Sua missão</p>
                  <h2 id="how-to-play-title" className="max-w-sm text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl">
                    Como <span className="text-cyan-300">jogar?</span>
                  </h2>
                  <div className="mt-5 rounded-2xl border border-amber-300/25 bg-amber-300/[.07] p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">🌙</span>
                      <p className="text-xs font-black uppercase tracking-[.18em] text-amber-200">Objetivo</p>
                    </div>
                    <p id="how-to-play-objective" className="text-base leading-relaxed text-slate-200">
                      Mantenha a base lunar funcionando por <strong className="text-amber-200">7 dias</strong>.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[.22em] text-cyan-200">Faça 3 coisas</p>
                    <span className="font-mono text-xs text-slate-500">03 PASSOS</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { n: "01", icon: "🫁", title: "Monitore os recursos", desc: "Cuide do oxigênio, da água, da energia e dos alimentos." },
                      { n: "02", icon: "🧩", title: "Expanda a base", desc: "Use seus créditos para construir novos módulos." },
                      { n: "03", icon: "🤖", title: "Ajude o LUMI", desc: "Responda aos desafios do robô durante a missão." },
                    ].map((step) => (
                      <div key={step.n} className="group relative min-h-[160px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c1b36]/90 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-[#102442]">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[.08] text-xl">{step.icon}</div>
                          <span className="font-mono text-xs font-bold tracking-[.2em] text-cyan-300/80">/{step.n}</span>
                        </div>
                        <h3 className="mb-2 text-base font-extrabold text-white">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-300">{step.desc}</p>
                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">Boa sorte, astronauta!</p>
                <button
                  type="button"
                  onClick={() => navigate('/briefing')}
                  className="w-full rounded-xl border border-cyan-200/50 bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-[.16em] text-[#061126] shadow-[0_0_25px_rgba(34,211,238,.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_35px_rgba(34,211,238,.35)] active:translate-y-0 sm:w-auto"
                >
                  Entendi • Iniciar missão ↗
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}