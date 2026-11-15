// Arquivo combinado: visual original da L.U.M.I. + carregamento e decolagem cinematográfica com nova L.U.M.I Viva.
import { useState, useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';
import { useGameStore } from '../../store/gameStore';

import {
  MapPin, Clock, Users, ShieldAlert, Globe, Fingerprint, ChevronRight, FastForward, Radio, Satellite, Orbit, Activity, Rocket, Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// NOVO: Importação do Componente da Personagem
import { LumiCharacter, type LumiMood } from '../../components/LumiCharacter';

// ==========================================
// ESTRELAS
// ==========================================
const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  x: (i * 37.7) % 100,
  y: (i * 61.3) % 100,
  size: (i % 3) + 1,
  duration: 2 + (i % 5),
  delay: (i % 7) * 0.4,
}));

function SpaceBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#030712]">
      <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-700/10 blur-[150px] -top-80 -left-60" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] bottom-[-300px] right-[-100px]" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px] top-1/3 left-1/3" />
      
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 top-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-slate-300 via-slate-500 to-slate-900 opacity-20 shadow-[0_0_120px_rgba(100,200,255,0.2)]"
      >
        <div className="absolute top-20 left-20 w-12 h-12 rounded-full bg-black/20 blur-md" />
        <div className="absolute bottom-28 right-24 w-20 h-20 rounded-full bg-black/20 blur-lg" />
        <div className="absolute top-48 right-28 w-8 h-8 rounded-full bg-black/20 blur-sm" />
      </motion.div>

      {STARS.map((star) => (
        <motion.div key={star.id} className="absolute rounded-full bg-white" style={{ width: star.size, height: star.size, top: `${star.y}%`, left: `${star.x}%` }} animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.5, 0.7] }} transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }} />
      ))}

      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" initial={{ x: '-20vw', y: `${15 + i * 25}vh`, opacity: 0 }} animate={{ x: '120vw', y: `${35 + i * 20}vh`, opacity: [0, 1, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i * 5, ease: 'linear' }} />
      ))}

      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <motion.div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" animate={{ top: ['-5%', '105%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  );
}

// ==========================================
// DICIONÁRIO
// ==========================================
const DICTIONARY = {
  en: {
    lumiTransmission: "INCOMING TRANSMISSION...\nGreetings, Cadet. I am L.U.M.I., your Lunar Utility Mission Intelligence. Humanity is counting on you to establish our first sustainable base.\n\nResources are scarce and the environment is unforgiving. Manage energy, water, oxygen, and keep the crew alive.\n\nGood luck, Commander.",
    detailsTitle: 'ORBITAL SCAN DATA', deployBtn: 'HOLD TO AUTHORIZE', receiving: 'RECEIVING DATA...', skipBtn: 'SKIP', launching: 'LAUNCHING...', launchSub: 'ROCKET ENGINES IGNITED', missionStarted: 'LUNAR MISSION INITIATED', preparing: 'PREPARING LUNAR DEPLOYMENT',
    parameters: [
      { id: 'dest', icon: <MapPin size={16} />, label: 'Destination', value: 'Lunar South Pole', danger: false, lore: 'The South Pole harbors deep, permanently shadowed craters containing water ice. This ice is crucial for producing drinking water and extracting oxygen for the crew.' },
      { id: 'dur', icon: <Clock size={16} />, label: 'Duration', value: '7 Simulated Days', danger: false, lore: "A massive solar storm is projected to hit our sector in exactly 7 days. The base's life support and radiation shielding must be fully operational before it arrives." },
      { id: 'crew', icon: <Users size={16} />, label: 'Crew Roster', value: '4 Astronauts', danger: false, lore: 'A specialized team consisting of a Commander, a Systems Engineer, an Astrobiologist, and a Medical Officer. Their survival depends entirely on your resource management.' },
      { id: 'status', icon: <ShieldAlert size={16} />, label: 'Initial Status', value: 'Critical Alert', danger: true, lore: 'Landers have dropped initial supplies, but life support systems are offline. Oxygen and battery reserves are draining quickly. Immediate action required upon deployment.' },
    ],
  },
  pt: {
    lumiTransmission: 'TRANSMISSÃO RECEBIDA...\nSaudações, Cadete. Sou L.U.M.I., sua Inteligência de Missão Utilitária Lunar. A humanidade conta com você para estabelecer nossa primeira base sustentável.\n\nOs recursos são escassos e o ambiente é implacável. Gerencie energia, água, oxigênio e mantenha a tripulação viva.\n\nBoa sorte, Comandante.',
    detailsTitle: 'DADOS DO ESCANEAMENTO', deployBtn: 'SEGURE PARA AUTORIZAR', receiving: 'RECEBENDO DADOS...', skipBtn: 'PULAR', launching: 'DECOLANDO...', launchSub: 'MOTORES DO FOGUETE ACIONADOS', missionStarted: 'MISSÃO LUNAR INICIADA', preparing: 'PREPARANDO DESEMBARQUE LUNAR',
    parameters: [
      { id: 'dest', icon: <MapPin size={16} />, label: 'Destino', value: 'Polo Sul Lunar', danger: false, lore: 'O Polo Sul abriga crateras profundas e permanentemente sombreadas contendo gelo de água. Este gelo é crucial para produzir água potável e extrair oxigênio para a tripulação.' },
      { id: 'dur', icon: <Clock size={16} />, label: 'Duração', value: '7 Dias Simulados', danger: false, lore: 'Uma tempestade solar massiva atingirá nosso setor em exatamente 7 dias. O suporte à vida e a blindagem contra radiação da base devem estar totalmente operacionais antes disso.' },
      { id: 'crew', icon: <Users size={16} />, label: 'Tripulação', value: '4 Astronautas', danger: false, lore: 'Uma equipe especializada formada por um Comandante, um Engenheiro de Sistemas, um Astrobiólogo e um Oficial Médico. A sobrevivência deles depende inteiramente da sua gestão.' },
      { id: 'status', icon: <ShieldAlert size={16} />, label: 'Status Inicial', value: 'Alerta Crítico', danger: true, lore: 'Os módulos deixaram suprimentos iniciais, mas os sistemas de suporte à vida estão offline. Reservas de oxigênio e bateria estão caindo. Ação imediata necessária.' },
    ],
  },
};

type Lang = 'en' | 'pt';

export default function Briefing() {
  const [lang, setLang] = useState<Lang>('pt');
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lumiText, setLumiText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const launchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdProgressRef = useRef(0);
  const launchStartedRef = useRef(false);
  const hasNavigatedRef = useRef(false);

  const t = DICTIONARY[lang];

  // Lógica para determinar o Humor (Estado) da L.U.M.I dinamicamente
  let currentMood: LumiMood = 'idle';
  if (isLaunching || isPressing) currentMood = 'launching';
  else if (isTyping) currentMood = 'speaking';
  else if (expandedId === 'status') currentMood = 'alert';
  else if (expandedId === 'dest') currentMood = 'thinking';
  else if (expandedId === 'crew') currentMood = 'happy';

  useEffect(() => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    let index = 0;
    setLumiText('');
    setIsTyping(true);
    typingIntervalRef.current = setInterval(() => {
      index += 1;
      setLumiText(t.lumiTransmission.slice(0, index));
      if (index >= t.lumiTransmission.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, 22);
    return () => { if (typingIntervalRef.current) clearInterval(typingIntervalRef.current); };
  }, [t.lumiTransmission]);

  const handleSkipTyping = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setLumiText(t.lumiTransmission);
    setIsTyping(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isTyping || isLaunching || launchStartedRef.current || holdIntervalRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPressing(true);
    holdIntervalRef.current = setInterval(() => {
      const nextProgress = Math.min(holdProgressRef.current + 2, 100);
      holdProgressRef.current = nextProgress;
      setHoldProgress(nextProgress);
      if (nextProgress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        launchStartedRef.current = true;
        setIsPressing(false);
        setIsLaunching(true);
      }
    }, 35);
  };

  const handlePointerUp = () => {
    setIsPressing(false);
    if (holdIntervalRef.current) { clearInterval(holdIntervalRef.current); holdIntervalRef.current = null; }
    if (!launchStartedRef.current) { holdProgressRef.current = 0; setHoldProgress(0); }
  };

  useEffect(() => {
    if (!isLaunching) return;
    launchTimeoutRef.current = setTimeout(() => {
      if (hasNavigatedRef.current) return;
      hasNavigatedRef.current = true;
      navigate('/exploration');
    }, 3600);
    return () => { if (launchTimeoutRef.current) clearTimeout(launchTimeoutRef.current); };
  }, [isLaunching, navigate]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      if (launchTimeoutRef.current) clearTimeout(launchTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white font-sans select-none">
      <SpaceBackground />

      <motion.div
        animate={ isPressing ? {
            x: [0, -1 - holdProgress / 22, 1 + holdProgress / 22, -1 - holdProgress / 22, 0],
            y: [0, 0.5 + holdProgress / 35, -0.5 - holdProgress / 35, 0],
            rotate: [0, -0.08 - holdProgress / 650, 0.08 + holdProgress / 650, 0],
          } : { x: 0, y: 0, rotate: 0 }
        }
        transition={{ repeat: isPressing ? Infinity : 0, duration: isPressing ? Math.max(0.055, 0.12 - holdProgress / 1800) : 0.2, ease: 'linear' }}
        className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-10"
      >
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative">

          {/* IDIOMA */}
          <div className="absolute -top-10 right-0 z-50 flex items-center bg-slate-950/80 border border-cyan-900/50 rounded-lg overflow-hidden backdrop-blur-xl">
            <div className="px-3 py-2 border-r border-cyan-900/50"><Globe size={14} className="text-cyan-400" /></div>
            <button onClick={() => setLang('en')} className={`px-4 py-2 text-[10px] font-bold tracking-widest transition-all ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-cyan-500/50 hover:bg-cyan-950/50'}`}>EN</button>
            <button onClick={() => setLang('pt')} className={`px-4 py-2 text-[10px] font-bold tracking-widest transition-all ${lang === 'pt' ? 'bg-cyan-600 text-white' : 'text-cyan-500/50 hover:bg-cyan-950/50'}`}>PT</button>
          </div>

          {/* LADO ESQUERDO */}
          <div className="col-span-1 md:col-span-7 flex flex-col justify-end relative min-h-[540px]">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-500/20 bg-cyan-950/30 backdrop-blur-md">
                <Radio size={14} className="text-cyan-400 animate-pulse" />
                <span className="text-[10px] tracking-[0.25em] font-mono text-cyan-300">INCOMING TRANSMISSION</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Activity size={12} className="text-green-400" /> SYSTEM ONLINE
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -120, scale: 0.8, rotateY: -15, filter: 'blur(15px)' }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-950/80 backdrop-blur-2xl border-2 border-cyan-500/30 p-6 md:p-8 rounded-2xl rounded-bl-none shadow-[0_0_50px_rgba(8,145,178,0.15)] mb-10 relative"
            >
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="absolute -bottom-6 left-12 w-0 h-0 border-l-[15px] border-l-transparent border-t-[25px] border-t-slate-950/80 border-r-[15px] border-r-transparent" />
              <h3 className="text-cyan-400 font-bold tracking-[0.25em] uppercase mb-5 text-xs flex items-center gap-3">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" /></span>
                L.U.M.I. SYSTEM
              </h3>
              <div className="relative">
                <p className="text-slate-200 font-mono leading-[1.9] min-h-[190px] whitespace-pre-line text-sm md:text-base">
                  {lumiText}
                  {isTyping && <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse align-middle" />}
                </p>
                {isTyping && (
                  <button onClick={handleSkipTyping} className="absolute -bottom-4 right-0 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500 hover:text-cyan-300 transition-colors">
                    {t.skipBtn} <FastForward size={12} />
                  </button>
                )}
              </div>
            </motion.div>

            {/* AQUI ENTRA A NOVA PERSONAGEM L.U.M.I. */}
            <div className="flex items-end gap-8 ml-4">
              <LumiCharacter 
                mood={currentMood} 
                launchProgress={holdProgress} 
                className="w-36 h-36 md:w-44 md:h-44" 
              />

              <div className="pb-4 space-y-2">
                <div className="text-xs font-bold tracking-[0.2em] text-cyan-300">L.U.M.I.</div>
                <div className="text-[10px] text-slate-500 font-mono tracking-widest">LUNAR ASSISTANT</div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-cyan-400' : 'bg-green-400'} animate-pulse`} />
                  <span className={`text-[9px] ${isTyping ? 'text-cyan-400' : 'text-green-400'} font-mono tracking-widest`}>
                    {isTyping ? 'TRANSMITTING' : 'READY'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-center gap-7">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/30"><Satellite size={19} className="text-cyan-400" /></div>
              <div>
                <h1 className="text-sm font-bold text-cyan-300 uppercase tracking-[0.25em] font-mono">{t.detailsTitle}</h1>
                <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-1">MISSION INTELLIGENCE SYSTEM</p>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
            </motion.div>

            <div className="flex items-center gap-2 text-[9px] font-mono text-cyan-500/60 tracking-widest">
              <Orbit size={12} className="animate-spin" /> ORBITAL SCAN COMPLETED <span className="ml-auto text-green-400">100%</span>
            </div>

            <div className="flex flex-col gap-3">
              {t.parameters.map((param, index) => {
                const isExpanded = expandedId === param.id;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 40, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.7 + index * 0.15, duration: 0.6 }}
                    key={param.id}
                    onClick={() => setExpandedId(isExpanded ? null : param.id)}
                    className={`relative group cursor-pointer overflow-hidden rounded-xl backdrop-blur-xl border transition-all duration-300 ${param.danger ? 'border-red-500/30 bg-gradient-to-r from-red-950/50 to-slate-950/60 hover:border-red-400/60' : 'border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 to-slate-950/60 hover:border-cyan-400/60'}`}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${param.danger ? 'bg-gradient-to-r from-red-500/10 to-transparent' : 'bg-gradient-to-r from-cyan-500/10 to-transparent'}`} />
                    <div className="relative flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg border ${param.danger ? 'text-red-400 border-red-500/30 bg-red-950/50' : 'text-cyan-400 border-cyan-500/30 bg-cyan-950/50'}`}>{param.icon}</div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold block mb-1">{param.label}</span>
                          <span className={`font-mono text-sm tracking-wide ${param.danger ? 'text-red-300' : 'text-slate-200'}`}>{param.value}</span>
                        </div>
                      </div>
                      <ChevronRight size={17} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-cyan-300' : 'text-slate-600 group-hover:translate-x-1 group-hover:text-cyan-400'}`} />
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="relative overflow-hidden">
                          <div className="px-4 pb-4">
                            <div className="pt-3 border-t border-slate-700/50">
                              <p className={`text-xs font-mono leading-relaxed pl-3 border-l-2 ${param.danger ? 'border-red-500/50 text-red-200' : 'border-cyan-500/50 text-slate-400'}`}>{param.lore}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
              className={`mt-2 relative w-full rounded-xl border bg-slate-950/70 backdrop-blur-xl overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.08)] ${isPressing ? 'border-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.3)]' : 'border-cyan-500/40'}`}
            >
              <motion.div className="absolute inset-y-0 left-0 z-0 bg-gradient-to-r from-cyan-700/50 via-cyan-500/40 to-cyan-300/50" animate={{ width: `${holdProgress}%` }} transition={{ duration: 0.08, ease: 'linear' }} />
              <div className="absolute top-0 left-0 z-[1] h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent" style={{ width: `${holdProgress}%` }} />
              <button type="button" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onLostPointerCapture={handlePointerUp} disabled={isTyping || isLaunching} className={`relative z-10 w-full h-16 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] transition-all duration-300 text-xs touch-none ${isTyping || isLaunching ? 'text-slate-600 cursor-not-allowed' : 'text-cyan-300 hover:text-white active:scale-[0.98] cursor-pointer'}`}>
                {isTyping ? <><Radio size={18} className="animate-pulse" />{t.receiving}</> : isLaunching ? <><Rocket size={20} className="animate-pulse" />{t.launching}</> : <><Fingerprint size={22} className={isPressing ? 'animate-pulse text-cyan-100' : 'text-cyan-400'} />{t.deployBtn}{isPressing && <span className="absolute right-5 font-mono text-cyan-100 text-xs">{Math.floor(holdProgress)}%</span>}</>}
              </button>
            </motion.div>

            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-slate-600">
              <span>MISSION ID: LUNA-001</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> CONNECTION SECURE</span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isLaunching && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020617]/95">
            <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0.2, 0.8, 0.25, 0.9, 0.3], scale: [0.2, 1.5, 0.8, 1.8, 1] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute bottom-[-25%] left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
            {Array.from({ length: 24 }).map((_, index) => (
              <motion.span key={index} initial={{ y: '-20vh', opacity: 0 }} animate={{ y: '120vh', opacity: [0, 0.8, 0] }} transition={{ duration: 0.55 + (index % 5) * 0.12, repeat: Infinity, delay: (index % 8) * 0.08, ease: 'linear' }} className="absolute top-0 h-20 w-px bg-gradient-to-b from-transparent via-cyan-300 to-transparent" style={{ left: `${(index * 37) % 100}%` }} />
            ))}
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div initial={{ y: 180, scale: 0.7, rotate: -8 }} animate={{ y: -260, scale: [0.8, 1, 0.85], rotate: [0, -2, 2, 0] }} transition={{ duration: 3.2, ease: [0.2, 0.7, 0.35, 1] }} className="relative mb-8">
                <motion.div animate={{ scaleY: [0.8, 1.35, 0.9, 1.5], opacity: [0.75, 1, 0.8, 1] }} transition={{ duration: 0.16, repeat: Infinity }} className="absolute top-[78%] left-1/2 h-32 w-12 -translate-x-1/2 rounded-full bg-gradient-to-b from-yellow-200 via-orange-500 to-transparent blur-md" />
                <Rocket size={112} strokeWidth={1.2} className="relative z-10 rotate-[-45deg] text-slate-100 drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="absolute bottom-[-150px] w-[min(90vw,520px)]">
                <div className="mb-3 flex items-center justify-center gap-2 text-cyan-300">
                  <Zap size={18} className="animate-pulse" />
                  <p className="font-mono text-sm font-bold tracking-[0.25em] uppercase">{t.launching}</p>
                  <Zap size={18} className="animate-pulse" />
                </div>
                <p className="font-mono text-xs tracking-[0.2em] text-slate-400 uppercase">{t.launchSub}</p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3.1, ease: 'linear' }} className="h-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}