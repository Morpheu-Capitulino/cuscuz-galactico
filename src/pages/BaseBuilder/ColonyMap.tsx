import { useGameStore } from '../../store/gameStore';
import { Target, Bot, Construction, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { sfx } from './soundEffects';

interface ColonyMapProps {
  lumiMessage: string;
  selectedNode: string | null;
  onSelectNode: (id: string, tab: 'construcao'|'exploracao'|'descobertas') => void;
}

// ==========================================
// BALÕES DE FALA DINÂMICOS DA TRIPULAÇÃO (ITEM 4)
// ==========================================
function CrewSpeechBubble() {
  const store = useGameStore();
  const isEn = store.language === 'en';
  const [chatter, setChatter] = useState<{ name: string; role: string; text: string; pos: string } | null>(null);

  useEffect(() => {
    if (store.isPaused || store.isTrainingMode) return;

    const interval = setInterval(() => {
      const activeCrew = store.crew.filter(c => c.status !== 'incapacitado');
      if (activeCrew.length === 0) return;

      const speaker = activeCrew[Math.floor(Math.random() * activeCrew.length)];
      let text = '';

      // Prioridade 1: Emergências de Sobrevivência
      if (store.indicators.o2 < 30) {
        text = isEn ? "Air is getting thin... We need the Main Habitat upgraded!" : "O ar está ficando rarefeito... Precisamos melhorar o Abrigo!";
      } else if (store.indicators.water < 30) {
        text = isEn ? "My canteen is nearly dry! Check the Water Purifier!" : "Meu cantil está quase seco! Olhem o Filtro de Água!";
      } else if (store.indicators.food < 30) {
        text = isEn ? "Stomach is rumbling... Space rations are running low!" : "Meu estômago está roncando... As rações estão acabando!";
      } else if (speaker.energy < 35) {
        text = isEn ? "I'm exhausted... Need some rest in the Crew Quarters soon." : "Estou exausto... Preciso descansar no Dormitório logo.";
      } 
      // Prioridade 2: Comentários sobre a Tarefa Atual
      else if (speaker.assignment?.type === 'building' || speaker.assignment?.type === 'upgrade') {
        text = isEn ? "Welding the titanium plates! This module will look great!" : "Soldando as placas de titânio! Esse módulo vai ficar incrível!";
      } else if (speaker.assignment?.type === 'research') {
        text = isEn ? "Eureka! These lunar samples are revealing new secrets!" : "Eureka! Essas amostras lunares estão revelando segredos!";
      } else if (speaker.assignment?.type === 'expedition') {
        text = isEn ? "Rover telemetry nominal. Scanning craters for minerals!" : "Telemetria do Rover normal. Escaneando crateras por minérios!";
      } 
      // Prioridade 3: Comentários Gerais / Humor Espacial
      else {
        const casualPt = [
          "A vista da Terra daqui de cima nunca perde a graça!",
          "Saudades de comer um cuscuz quentinho com café...",
          "Sistemas estáveis, Comandante! Prontos para a próxima ordem.",
          "A gravidade lunar deixa até as caixas pesadas levinhas!"
        ];
        const casualEn = [
          "The view of Earth from up here never gets old!",
          "I miss eating warm galactic couscous with coffee...",
          "Systems stable, Commander! Ready for your next order.",
          "Lunar gravity makes even heavy cargo feel like feathers!"
        ];
        const list = isEn ? casualEn : casualPt;
        text = list[Math.floor(Math.random() * list.length)];
      }

      const positions = [
        'bottom-[38%] left-[32%]',
        'bottom-[42%] left-[52%]',
        'bottom-[35%] left-[60%]',
        'bottom-[30%] left-[40%]'
      ];

      setChatter({
        name: speaker.name,
        role: speaker.role,
        text,
        pos: positions[Math.floor(Math.random() * positions.length)]
      });

      setTimeout(() => setChatter(null), 5500);
    }, 9000);

    return () => clearInterval(interval);
  }, [store.isPaused, store.isTrainingMode, store.indicators, store.crew, isEn]);

  return (
    <AnimatePresence>
      {chatter && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className={`absolute ${chatter.pos} z-30 max-w-[230px] pointer-events-none`}
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-400/60 rounded-2xl rounded-bl-none p-3 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
            <div className="flex items-center gap-1.5 mb-1">
              <MessageSquare size={10} className="text-cyan-400" />
              <span className="text-[9px] font-black text-cyan-300 uppercase tracking-wider">{chatter.name}</span>
            </div>
            <p className="text-[10px] text-white font-medium leading-snug italic">"{chatter.text}"</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// ASTRONAUTA PERDIDO — GRAVIDADE ZERO
// ==========================================
function FloatingAstronaut() {
  const [boost, setBoost] = useState(false);
  const [clicks, setClicks] = useState(0);
  const boostTimeoutRef = useRef<number | null>(null);

  function activateBoost() {
    sfx.playThruster(); // <-- Barulho de jato propulsor a gás/plasma!
    setClicks(prev => prev + 1);
    setBoost(true);
    if (boostTimeoutRef.current !== null) {
      window.clearTimeout(boostTimeoutRef.current);
    }
    boostTimeoutRef.current = window.setTimeout(() => {
      setBoost(false);
      boostTimeoutRef.current = null;
    }, 5000);
  }

  useEffect(() => {
    return () => {
      if (boostTimeoutRef.current !== null) {
        window.clearTimeout(boostTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="absolute top-[13%] left-[45%] z-[6] cursor-pointer"
      title="Astronauta perdido — clique para ativar o propulsor"
      animate={{ x: [0, 65, -25, 45, 0], y: [0, -35, 20, -25, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      onClick={activateBoost}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        animate={{
          rotate: [0, 55, 120, 185, 250, 310, 360],
          rotateX: [0, 12, -8, 15, -10, 5, 0],
          rotateY: [0, -10, 15, -8, 12, -5, 0],
        }}
        transition={{
          rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformOrigin: 'center center', transformPerspective: 600, willChange: 'transform' }}
      >
        <motion.div
          animate={{ rotate: boost ? -8 : 0, scale: boost ? 1.08 : 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ transformOrigin: '50% 70%' }}
        >
          <AnimatePresence>
            {boost && (
              <>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.2 }}
                  animate={{ opacity: [0.6, 1, 0.7, 1], scaleX: [0.8, 1.4, 0.9, 1.3], scaleY: [0.8, 1.2, 0.9, 1.1] }}
                  exit={{ opacity: 0, scaleX: 0, scaleY: 0.4 }}
                  transition={{ duration: 0.22, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-[-34px] top-[55%] w-12 h-3 rounded-full bg-gradient-to-l from-orange-400 via-yellow-300 to-transparent blur-sm origin-right pointer-events-none"
                />
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.2 }}
                  animate={{ opacity: [0.3, 0.9, 0.4, 1], scaleX: [0.7, 1.5, 0.8, 1.3] }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-[-28px] top-[65%] w-10 h-2 rounded-full bg-cyan-300 blur-md origin-right pointer-events-none"
                />
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], x: [-5, -35 - i * 8], y: [0, (i - 1) * 15], scale: [0.5, 1.2, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, delay: i * 0.12, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute left-0 top-[58%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee] pointer-events-none"
                  />
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                  className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-orange-400/60 bg-black/85 px-3 py-1.5 text-[9px] font-black text-orange-300 shadow-lg pointer-events-none"
                >
                  PROPULSOR ATIVADO!
                </motion.div>
                {clicks >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-cyan-400/50 bg-cyan-950/90 px-2 py-1 text-[8px] font-black text-cyan-200 pointer-events-none"
                  >
                    Houston, temos estilo.
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] relative z-10">
            <path d="M 50 100 Q 60 120 40 140 T 70 180" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4,4" />
            <rect x="25" y="30" width="50" height="50" rx="10" fill="#94a3b8" />
            <rect x="30" y="35" width="40" height="40" rx="8" fill="#cbd5e1" />
            <motion.path d="M 40 75 L 35 95" fill="none" stroke="#f8fafc" strokeWidth="14" strokeLinecap="round" animate={{ d: boost ? 'M 40 75 L 29 93' : 'M 40 75 L 35 95' }} transition={{ duration: 0.7 }} />
            <motion.path d="M 60 75 L 65 95" fill="none" stroke="#f8fafc" strokeWidth="14" strokeLinecap="round" animate={{ d: boost ? 'M 60 75 L 70 93' : 'M 60 75 L 65 95' }} transition={{ duration: 0.7 }} />
            <circle cx="35" cy="95" r="7" fill="#64748b" />
            <circle cx="65" cy="95" r="7" fill="#64748b" />
            <motion.path d="M 30 50 Q 10 40 15 25" fill="none" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" animate={{ d: boost ? 'M 30 50 Q 5 45 5 20' : 'M 30 50 Q 10 40 15 25' }} transition={{ duration: 0.6 }} />
            <motion.path d="M 70 50 Q 90 40 85 25" fill="none" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" animate={{ d: boost ? 'M 70 50 Q 95 45 95 20' : 'M 70 50 Q 90 40 85 25' }} transition={{ duration: 0.6 }} />
            <circle cx="15" cy="25" r="6" fill="#64748b" />
            <circle cx="85" cy="25" r="6" fill="#64748b" />
            <rect x="30" y="40" width="40" height="40" rx="15" fill="#ffffff" />
            <path d="M 35 60 L 65 60" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="50" cy="30" r="22" fill="#ffffff" />
            <circle cx="50" cy="30" r="23" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <motion.rect x="35" y="20" width="30" height="16" rx="8" animate={{ fill: boost ? '#ea580c' : '#0284c7' }} transition={{ duration: 0.5 }} />
            <motion.rect x="38" y="22" width="24" height="6" rx="3" animate={{ fill: boost ? '#fed7aa' : '#38bdf8' }} transition={{ duration: 0.5 }} />
            <line x1="68" y1="20" x2="80" y2="10" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <motion.circle cx="80" cy="10" r="3" animate={{ fill: boost ? '#facc15' : '#ef4444', scale: boost ? [1, 1.6, 1] : [1, 1.2, 1] }} transition={{ duration: boost ? 0.25 : 1, repeat: Infinity }} />
          </svg>

          <motion.div
            animate={{ opacity: boost ? [0.5, 1, 0.6] : [0.2, 0.45, 0.2], scale: boost ? [1, 1.4, 1.1] : [1, 1.1, 1] }}
            transition={{ duration: boost ? 0.3 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-5 rounded-full blur-xl pointer-events-none ${boost ? 'bg-orange-400/70' : 'bg-cyan-400/30'}`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MeteorShowerAmbient() {
  const [meteors, setMeteors] = useState<{ id: number, top: string, dur: string, delay: string, size: number }[]>([]);

  useEffect(() => {
    const m = Array.from({ length: 4 }).map((_, i) => ({
      id: i, top: `${Math.random() * 30}%`, dur: `${5 + Math.random() * 5}s`, delay: `${Math.random() * 8}s`, size: 20 + Math.random() * 30
    }));
    setMeteors(m);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      <style>{`
        @keyframes amb-meteor-img {
          0% { transform: translate3d(20vw, -20vh, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate3d(-120vw, 120vh, 0) rotate(-180deg); opacity: 0; }
        }
      `}</style>
      {meteors.map(m => (
        <div key={m.id} className="absolute flex items-center" style={{ top: m.top, left: '100%', animation: `amb-meteor-img ${m.dur} linear infinite ${m.delay}` }}>
          <div className="absolute left-0 top-1/2 h-[2px] w-[2px] rounded-full bg-white shadow-[0_0_8px_2px_#38bdf8] z-0" />
          <img src="/meteor_detailed.png" alt="Meteoro" style={{ width: m.size }} className="opacity-80 z-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      ))}
    </div>
  );
}

function getEvolutionStyles(level: number) {
  const scale = level === 3 ? 1.4 : level === 2 ? 1.2 : 1.0;
  const glow = level === 3 ? 'drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]' 
             : level === 2 ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
             : 'drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]';
  return { scale, glow };
}

export function ColonyMap({ lumiMessage, selectedNode, onSelectNode }: ColonyMapProps) {
  const store = useGameStore();
  const isBuilt = (id: string) => store.builtModules.includes(id);
  const isWIP = (id: string) => store.buildingModules.some(b => b.id === id) || store.upgradingModules?.some(u => u.id === id);
  const getModuleProgress = (id: string) => store.buildingModules.find(b => b.id === id)?.progress || store.upgradingModules?.find(u => u.id === id)?.progress || 0;
  const getModuleLevel = (id: string) => store.moduleLevels[id] || (isBuilt(id) ? 1 : 0);
  
  const hasShield = isBuilt('radiation');
  const shieldLevel = getModuleLevel('radiation');

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#010409] via-[#05101f] to-[#0f172a] overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={`star-${i}`} className="absolute bg-white rounded-full opacity-60"
               style={{ width: Math.random() * 2 + 'px', height: Math.random() * 2 + 'px', top: Math.random() * 60 + '%', left: Math.random() * 100 + '%', animation: `pulse ${2 + Math.random() * 3}s infinite alternate` }} />
        ))}
      </div>
      
      <MeteorShowerAmbient />
      <FloatingAstronaut />
      <CrewSpeechBubble />

      <div className="absolute top-[8%] left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full animate-[pulse_10s_infinite_alternate] pointer-events-none">
        <img src="/earth.png" alt="Planeta Terra" className="w-full h-full object-cover drop-shadow-[0_0_40px_rgba(59,130,246,0.5)] opacity-90" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>

      <svg className="absolute bottom-[35%] w-full h-[30%] opacity-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,100 L0,50 Q10,30 25,60 T50,40 T80,70 T100,20 L100,100 Z" fill="#1e293b" />
        <path d="M0,100 L0,70 Q15,40 35,70 T65,50 T90,80 L100,60 L100,100 Z" fill="#0f172a" />
      </svg>

      <div className="absolute bottom-0 w-full h-[45%] overflow-hidden bg-gradient-to-b from-[#081020] via-[#050b14] to-black border-t-2 border-cyan-900/30 shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 w-full h-10 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)', backgroundSize: '80px 80px', transform: 'perspective(600px) rotateX(70deg)', transformOrigin: 'top center' }} />
        <svg viewBox="0 0 1424 400" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-70 pointer-events-none">
          <defs>
            <linearGradient id="crater-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="crater-edge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 50 Q 250 90 500 40 T 1000 70 T 1424 50 L 1424 400 L 0 400 Z" fill="#060c18" />
          <path d="M0 130 Q 400 200 750 110 T 1424 160 L 1424 400 L 0 400 Z" fill="#040812" />
          <g opacity="0.9">
            <ellipse cx="280" cy="160" rx="140" ry="35" fill="url(#crater-grad)" />
            <ellipse cx="280" cy="160" rx="140" ry="35" fill="none" stroke="url(#crater-edge)" strokeWidth="4" />
            <ellipse cx="1100" cy="240" rx="200" ry="50" fill="url(#crater-grad)" />
            <ellipse cx="1100" cy="240" rx="200" ry="50" fill="none" stroke="url(#crater-edge)" strokeWidth="5" />
            <ellipse cx="700" cy="310" rx="110" ry="25" fill="url(#crater-grad)" />
            <ellipse cx="700" cy="310" rx="110" ry="25" fill="none" stroke="url(#crater-edge)" strokeWidth="3" />
            <ellipse cx="150" cy="330" rx="70" ry="18" fill="url(#crater-grad)" />
            <ellipse cx="150" cy="330" rx="70" ry="18" fill="none" stroke="url(#crater-edge)" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <MapNode id="habitat" level={getModuleLevel('habitat')} pos="bottom-[25%] left-[45%]" isBuilt={isBuilt('habitat')} isWip={isWIP('habitat')} progress={getModuleProgress('habitat')} isSelected={selectedNode === 'habitat'} onSelect={() => { sfx.playClick(); onSelectNode('habitat', 'construcao'); }}>
        <svg width="100" height="60" viewBox="0 0 100 60" className={getEvolutionStyles(getModuleLevel('habitat')).glow} style={{ transform: `scale(${getEvolutionStyles(getModuleLevel('habitat')).scale})`, transition: 'transform 0.5s' }}>
          <path d="M 10 60 Q 10 10 50 10 Q 90 10 90 60 Z" fill="#083344" stroke="#06b6d4" strokeWidth="2"/>
          <path d="M 20 60 Q 20 20 50 20 Q 80 20 80 60 Z" fill="#164e63" opacity="0.7"/>
          <rect x="40" y="40" width="20" height="20" fill="#020617" stroke="#22d3ee" strokeWidth="1"/>
          {getModuleLevel('habitat') >= 2 && <circle cx="50" cy="20" r="4" fill="#22d3ee" />}
          {getModuleLevel('habitat') === 3 && <rect x="30" y="45" width="40" height="2" fill="#22d3ee" />}
        </svg>
      </MapNode>

      <MapNode id="purifier" level={getModuleLevel('purifier')} pos="bottom-[33%] left-[63%]" isBuilt={isBuilt('purifier')} isWip={isWIP('purifier')} progress={getModuleProgress('purifier')} isSelected={selectedNode === 'purifier'} onSelect={() => { sfx.playClick(); onSelectNode('purifier', 'construcao'); }}>
        <svg width="60" height="80" viewBox="0 0 60 80" className={getEvolutionStyles(getModuleLevel('purifier')).glow} style={{ transform: `scale(${getEvolutionStyles(getModuleLevel('purifier')).scale})`, transition: 'transform 0.5s' }}>
          <rect x="10" y="20" width="15" height="60" rx="5" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2"/>
          <rect x="30" y="10" width="20" height="70" rx="5" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2"/>
          {getModuleLevel('purifier') === 3 && <path d="M 25 50 L 30 50" stroke="#3b82f6" strokeWidth="3" />}
        </svg>
      </MapNode>

      <MapNode id="greenhouse" level={getModuleLevel('greenhouse')} pos="bottom-[18%] left-[66%]" isBuilt={isBuilt('greenhouse')} isWip={isWIP('greenhouse')} progress={getModuleProgress('greenhouse')} isSelected={selectedNode === 'greenhouse'} onSelect={() => { sfx.playClick(); onSelectNode('greenhouse', 'construcao'); }}>
        <svg width="90" height="50" viewBox="0 0 90 50" className={getEvolutionStyles(getModuleLevel('greenhouse')).glow} style={{ transform: `scale(${getEvolutionStyles(getModuleLevel('greenhouse')).scale})`, transition: 'transform 0.5s' }}>
          <path d="M 5 50 Q 5 5 45 5 Q 85 5 85 50 Z" fill="#064e3b" stroke="#10b981" strokeWidth="2" opacity="0.8"/>
          <path d="M 20 50 C 20 30, 30 20, 45 40 C 60 20, 70 30, 70 50 Z" fill="#10b981"/>
          {getModuleLevel('greenhouse') >= 2 && <circle cx="45" cy="20" r="5" fill="#34d399" />}
        </svg>
      </MapNode>

      <MapNode id="solar" level={getModuleLevel('solar')} pos="bottom-[26%] left-[28%]" isBuilt={isBuilt('solar')} isWip={isWIP('solar')} progress={getModuleProgress('solar')} isSelected={selectedNode === 'solar'} onSelect={() => { sfx.playClick(); onSelectNode('solar', 'construcao'); }}>
        <svg width="80" height="50" viewBox="0 0 80 50" className={getEvolutionStyles(getModuleLevel('solar')).glow} style={{ transform: `scale(${getEvolutionStyles(getModuleLevel('solar')).scale})`, transition: 'transform 0.5s' }}>
          <polygon points="10,50 30,10 45,10 25,50" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1"/>
          <polygon points="40,50 60,10 75,10 55,50" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1"/>
          {getModuleLevel('solar') === 3 && <polygon points="70,50 90,10 105,10 85,50" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1"/>}
        </svg>
      </MapNode>

      <MapNode id="medical" level={getModuleLevel('medical')} pos="bottom-[32%] left-[38%]" isBuilt={isBuilt('medical')} isWip={isWIP('medical')} progress={getModuleProgress('medical')} isSelected={selectedNode === 'medical'} onSelect={() => { sfx.playClick(); onSelectNode('medical', 'construcao'); }}>
        <svg width="70" height="40" viewBox="0 0 70 40" className={getEvolutionStyles(getModuleLevel('medical')).glow} style={{ transform: `scale(${getEvolutionStyles(getModuleLevel('medical')).scale})`, transition: 'transform 0.5s' }}>
          <rect x="5" y="5" width="60" height="35" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
          <rect x="30" y="15" width="10" height="15" fill="#ef4444"/>
          <rect x="25" y="20" width="20" height="5" fill="#ef4444"/>
        </svg>
      </MapNode>

      <MapNode id="dormitory" level={getModuleLevel('dormitory')} pos="bottom-[20%] left-[30%]" isBuilt={isBuilt('dormitory')} isWip={isWIP('dormitory')} progress={getModuleProgress('dormitory')} isSelected={selectedNode === 'dormitory'} onSelect={() => { sfx.playClick(); onSelectNode('dormitory', 'construcao'); }}>
        <svg width="100" height="30" viewBox="0 0 100 30" className={getEvolutionStyles(getModuleLevel('dormitory')).glow} style={{ transform: `scale(${getEvolutionStyles(getModuleLevel('dormitory')).scale})`, transition: 'transform 0.5s' }}>
          <rect x="5" y="5" width="90" height="25" rx="10" fill="#312e81" stroke="#6366f1" strokeWidth="2"/>
          <circle cx="20" cy="17" r="5" fill="#818cf8"/>
          <circle cx="40" cy="17" r="5" fill="#818cf8"/>
          {getModuleLevel('dormitory') >= 2 && <circle cx="60" cy="17" r="5" fill="#818cf8"/>}
          {getModuleLevel('dormitory') === 3 && <circle cx="80" cy="17" r="5" fill="#818cf8"/>}
        </svg>
      </MapNode>

      {hasShield && (
        <div 
          className={`absolute bottom-[10%] left-[20%] w-[60%] h-[70%] pointer-events-none rounded-t-full border-t-[3px] backdrop-blur-[1px] transition-all z-10 
          ${shieldLevel === 3 ? 'border-indigo-300 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-[0_-20px_80px_rgba(99,102,241,0.3)]' 
          : shieldLevel === 2 ? 'border-indigo-400/60 bg-gradient-to-b from-indigo-500/15 to-transparent shadow-[0_-20px_60px_rgba(99,102,241,0.2)]' 
          : 'border-indigo-400/30 bg-gradient-to-b from-indigo-500/10 to-transparent shadow-[0_-20px_40px_rgba(99,102,241,0.1)]'}`} 
        />
      )}

      <AnimatePresence>
        {store.activeExpedition && store.activeExpedition.status !== 'evento' && (
          <motion.div 
            onClick={() => { sfx.playClick(); onSelectNode(store.activeExpedition!.id, 'exploracao'); }}
            initial={{ x: 200, opacity: 0 }} 
            animate={{ x: store.activeExpedition.status === 'ida' ? -150 : 200, opacity: 1 }} 
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} 
            className="absolute bottom-[12%] left-[50%] z-20 cursor-pointer hover:scale-110 transition-transform"
          >
             <div className="relative flex flex-col items-center justify-center">
               <span className="absolute -top-6 text-[8px] bg-[#0c1424]/90 px-2.5 py-0.5 rounded-md text-orange-400 font-black whitespace-nowrap tracking-wider border border-orange-600/50 shadow-lg z-20">
                 {store.activeExpedition.status === 'ida' ? (store.language === 'en' ? 'ROVER EXPLORING...' : 'ROVER EXPLORANDO...') : (store.language === 'en' ? 'ROVER RETURNING...' : 'ROVER RETORNANDO...')}
               </span>
               <img 
                 src="/craft_miner.png" 
                 alt="Rover" 
                 className={`w-24 drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)] ${store.activeExpedition.status === 'retorno' ? 'scale-x-[-1]' : ''}`} 
                 onError={(e) => { e.currentTarget.style.display = 'none'; }} 
               />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {store.tutorialStep === 'COMPLETED' && lumiMessage && (
        <div className="absolute bottom-6 left-6 z-40 max-w-[240px] pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={lumiMessage}
            className="bg-[#071a3b]/90 backdrop-blur-md border border-cyan-500/50 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex gap-3 items-start pointer-events-auto"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-cyan-900/50 flex items-center justify-center relative">
              <Bot size={24} className="text-cyan-400 absolute z-0" />
              <img src="/LUMI_robozinho.png" alt="L.U.M.I." className="absolute inset-0 w-full h-full object-contain z-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-cyan-400 tracking-[0.2em] mb-0.5">L.U.M.I. SYSTEM</span>
              <p className="text-[10px] text-cyan-50 font-medium leading-snug">{lumiMessage}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function MapNode({ children, id, pos, isBuilt, isWip, progress, isSelected, level, onSelect }: { children: ReactNode, id: string, pos: string, isBuilt: boolean, isWip: boolean, progress: number, isSelected: boolean, level: number, onSelect: () => void }) {
  const store = useGameStore();
  const assigned = store.crew.find(c => c.assignment?.targetId === id);
  const isUnbuilt = !isBuilt && !isWip;

  return (
    <div onClick={onSelect} className={`absolute ${pos} flex flex-col items-center justify-end group z-10 cursor-pointer transition-all ${isSelected ? 'drop-shadow-[0_0_25px_#22d3ee]' : 'hover:scale-105'}`}>
      {isUnbuilt ? (
        <div className="w-16 h-8 bg-cyan-950/20 border-2 border-dashed border-cyan-900/50 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
          <div className="w-4 h-1.5 rounded-full bg-cyan-900/50" />
        </div>
      ) : isWip ? (
        <div className="flex flex-col items-center relative">
          <span className="absolute -top-7 text-[9px] font-black text-yellow-400 bg-black/80 px-2 py-0.5 rounded shadow-lg border border-yellow-900/50 z-20">
            {Math.floor(progress)}%
          </span>
          <Construction size={18} className="text-yellow-500 animate-pulse mb-1.5" />
          <div className="w-16 h-12 bg-slate-800/80 border border-dashed border-yellow-500/50 rounded-lg flex items-center justify-center relative">
            <div className="w-full h-1.5 bg-slate-900 mx-1.5 overflow-hidden rounded-full">
              <div className="h-full bg-yellow-400 transition-all duration-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ width: `${progress}%` }} />
            </div>
            {assigned && <span className="absolute -bottom-2 -right-2 text-emerald-400 bg-emerald-950 p-1 rounded-full"><Target size={10}/></span>}
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          {children}
          {level > 1 && (
             <span className="absolute -bottom-3 text-[7px] font-black bg-cyan-900 text-cyan-100 px-1.5 py-0.5 rounded-full shadow-lg border border-cyan-700">
               Lvl {level}
             </span>
          )}
        </div>
      )}
    </div>
  );
}