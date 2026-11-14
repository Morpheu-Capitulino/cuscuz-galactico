// src/pages/Exploration/index.tsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Bot, Pickaxe, Droplets, ChevronRight, Globe, Rocket, Radar, Target, Cpu, Info, Zap, Flame, Crosshair, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DICTIONARY = {
  en: {
    tut1: "Touchdown confirmed. The sector is currently dark. Initialize the Orbital Scanner to map the terrain.",
    tut2: "Scanning sector...",
    tut3: "Active Radar Online! Anomalies will decay if not extracted. Hover over them for scientific data. Extract 50 Regolith and 30 Ice to meet the quota. Upgrade your gear to speed up!",
    tut4: "Mission Quota Achieved! The Base Builder is unlocked. Deploy when ready, or stay to build combo multipliers and farm rare Helium-3!",
    btnScan: "INITIATE SCAN",
    btnBuild: "DEPLOY HABITAT",
    hudRegolith: "REGOLITH",
    hudIce: "WATER ICE",
    descRegolith: "COMPOSITION: Silicate & Oxides. USAGE: 3D printing base structures.",
    descIce: "COMPOSITION: H2O. USAGE: Life support (Water & Oxygen).",
    upgrades: "GEAR UPGRADES",
    upgLaser: "Laser Drill",
    upgLaserDesc: "Extracts more resources per click.",
    upgRadar: "Advanced Radar",
    upgRadarDesc: "Finds more anomalies, faster.",
    cost: "COST",
    level: "LVL"
  },
  pt: {
    tut1: "Pouso confirmado. O setor está escuro. Inicialize o Scanner Orbital para mapear o terreno.",
    tut2: "Escaneando setor...",
    tut3: "Radar Ativo Online! As anomalias vão evaporar se não forem extraídas. Passe o mouse para ver os dados científicos. Extraia 50 Regolitos e 30 Gelos. Evolua seu traje para ir mais rápido!",
    tut4: "Cota da Missão Atingida! Menu de Construção desbloqueado. Avance quando quiser, ou fique para gerar Combos e farmar Hélio-3 raro!",
    btnScan: "INICIAR SCANNER",
    btnBuild: "CONSTRUIR BASE",
    hudRegolith: "REGOLITO",
    hudIce: "GELO",
    descRegolith: "COMPOSIÇÃO: Silicatos e Óxidos. USO: Impressão 3D de estruturas.",
    descIce: "COMPOSIÇÃO: H2O. USO: Suporte à vida (Água e Oxigênio).",
    upgrades: "UPGRADES DO TRAJE",
    upgLaser: "Broca Laser",
    upgLaserDesc: "Extrai mais recursos por clique.",
    upgRadar: "Radar Avançado",
    upgRadarDesc: "Acha mais anomalias, mais rápido.",
    cost: "CUSTO",
    level: "NÍVEL"
  }
};

type Lang = 'en' | 'pt';
interface Anomaly { id: number; x: number; y: number; type: 'regolith' | 'ice' | 'he3'; expiresAt: number; }
interface FloatingText { id: number; x: number; y: number; text: string; color: string; }

// METAS DA FASE
const REGOLITH_QUOTA = 50;
const ICE_QUOTA = 30;

export default function Exploration() {
  // LÓGICA DE IDIOMA GLOBAL
  const globalLang = useGameStore((state) => state.language);
  const setGlobalLang = useGameStore((state) => state.setLanguage);
  const [localLang, setLocalLang] = useState<Lang>('en');
  const lang = (globalLang || localLang) as Lang;
  const setLang = (newLang: Lang) => { if (setGlobalLang) setGlobalLang(newLang); setLocalLang(newLang); };

  // ZUSTAND RESOURCES
  const regolith = useGameStore((state) => state.inventory?.regolith ?? state.resources?.regolith ?? 0);
  const ice = useGameStore((state) => state.inventory?.ice ?? state.resources?.ice ?? 0);
  const collectResource = useGameStore((state) => state.collectResource);
  const setScreen = useGameStore((state) => state.setScreen);

  const t = DICTIONARY[lang];

  // ESTADOS DO JOGO
  const [tutorialStep, setTutorialStep] = useState(0); 
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  
  const [laserLevel, setLaserLevel] = useState(1);
  const [radarLevel, setRadarLevel] = useState(1);
  const [combo, setCombo] = useState(1.0);
  
  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [displayedText, setDisplayedText] = useState("");
  const [isLumiTyping, setIsLumiTyping] = useState(false);
  const [isRadarPulsing, setIsRadarPulsing] = useState(false);

  // AVANÇO AUTOMÁTICO DE TUTORIAL (QUOTA)
  useEffect(() => {
    if (tutorialStep === 3 && regolith >= REGOLITH_QUOTA && ice >= ICE_QUOTA) {
      setTutorialStep(4);
    }
  }, [regolith, ice, tutorialStep]);

  // TEXTO DA LUMI
  useEffect(() => {
    const messages = [ "", t.tut1, t.tut2, t.tut3, t.tut4 ];
    const msg = messages[tutorialStep] || "";
    
    if (typingRef.current) clearInterval(typingRef.current);
    let i = 0;
    setDisplayedText("");
    setIsLumiTyping(true);
    
    typingRef.current = setInterval(() => {
      if (i < msg.length) {
        setDisplayedText(msg.slice(0, i + 1));
        i++;
      } else {
        if (typingRef.current) clearInterval(typingRef.current);
        setIsLumiTyping(false);
      }
    }, 25);
    return () => { if (typingRef.current) clearInterval(typingRef.current); };
  }, [tutorialStep, t]);

  // SEQUÊNCIA DE POUSO
  useEffect(() => {
    if (tutorialStep === 0) {
      const timer = setTimeout(() => setTutorialStep(1), 3000);
      return () => clearTimeout(timer);
    }
  }, [tutorialStep]);

  // SPAWNER DINÂMICO (RADAR)
  useEffect(() => {
    if (tutorialStep >= 3) {
      const spawnRate = Math.max(1000, 3500 - (radarLevel * 350)); 
      
      const spawnInterval = setInterval(() => {
        setIsRadarPulsing(true);
        setTimeout(() => setIsRadarPulsing(false), 500);

        const numToSpawn = Math.floor(Math.random() * 2) + radarLevel; 
        const newAnomalies: Anomaly[] = [];
        const now = Date.now();

        for (let i = 0; i < numToSpawn; i++) {
          const rand = Math.random();
          const type = rand > 0.92 ? 'he3' : rand > 0.6 ? 'ice' : 'regolith';
          
          newAnomalies.push({
            id: now + i,
            x: Math.floor(Math.random() * 75) + 10,
            y: Math.floor(Math.random() * 65) + 15,
            expiresAt: now + 5000 + (Math.random() * 3000) // Duram de 5 a 8 segundos para dar tempo de ler a Lore
          });
        }
        setAnomalies(prev => [...prev, ...newAnomalies]);
      }, spawnRate);

      return () => clearInterval(spawnInterval);
    }
  }, [tutorialStep, radarLevel]);

  // LIMPEZA DE ANOMALIAS EXPIRADAS
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setAnomalies(prev => prev.filter(a => a.expiresAt > now));
    }, 500);
    return () => clearInterval(cleanupInterval);
  }, []);

  // FUNÇÕES DO JOGO
  const handleScan = () => {
    setTutorialStep(2);
    setTimeout(() => setTutorialStep(3), 2000); 
  };

  const handleCollect = useCallback((e: React.MouseEvent, anomaly: Anomaly) => {
    setAnomalies(prev => prev.filter(a => a.id !== anomaly.id));

    // Lógica do Combo
    let currentCombo = combo;
    currentCombo = Math.min(3.0, currentCombo + 0.2);
    setCombo(currentCombo);
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = setTimeout(() => setCombo(1.0), 1000); 

    // Matemática de Coleta (Multiplicado pelo Nível do Laser e pelo Combo)
    const baseAmount = anomaly.type === 'he3' ? 25 : anomaly.type === 'ice' ? 5 : 10;
    const finalAmount = Math.floor(baseAmount * (1 + (laserLevel * 0.5)) * currentCombo);

    if (collectResource) {
      if (anomaly.type === 'he3') {
        collectResource('regolith', finalAmount);
        collectResource('ice', finalAmount);
      } else {
        collectResource(anomaly.type, finalAmount);
      }
    }

    // Texto Animado
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20); 
    const y = e.clientY - rect.top + (Math.random() * 40 - 20);

    const isMaxCombo = currentCombo >= 3.0;
    const color = anomaly.type === 'he3' ? 'text-purple-400' : anomaly.type === 'ice' ? 'text-blue-300' : isMaxCombo ? 'text-orange-400' : 'text-slate-300';
    const textToShow = anomaly.type === 'he3' ? `RARE +${finalAmount}!` : currentCombo > 1.0 ? `+${finalAmount} (x${currentCombo.toFixed(1)})` : `+${finalAmount}`;

    const newText = { id: Date.now(), x, y, text: textToShow, color };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(item => item.id !== newText.id)), 800);
  }, [collectResource, combo, laserLevel]);

  // CUSTOS DOS UPGRADES
  const laserCost = Math.floor(30 * Math.pow(1.5, laserLevel - 1));
  const radarCost = Math.floor(20 * Math.pow(1.6, radarLevel - 1));

  const buyLaser = () => { if (regolith >= laserCost && collectResource) { collectResource('regolith', -laserCost); setLaserLevel(prev => prev + 1); } };
  const buyRadar = () => { if (ice >= radarCost && collectResource) { collectResource('ice', -radarCost); setRadarLevel(prev => prev + 1); } };

  const progRegolith = Math.min((regolith / REGOLITH_QUOTA) * 100, 100);
  const progIce = Math.min((ice / ICE_QUOTA) * 100, 100);
  const isMaxCombo = combo >= 3.0;
  const isQuotaMet = regolith >= REGOLITH_QUOTA && ice >= ICE_QUOTA;

  return (
    <motion.div 
      animate={isMaxCombo ? { x: [-2, 2, -2, 2, 0], y: [-2, 2, -2, 2, 0] } : {}} transition={{ repeat: isMaxCombo ? Infinity : 0, duration: 0.1 }}
      className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a1a] to-black relative overflow-hidden font-sans select-none flex flex-col"
    >
      {/* TELA DE POUSO (Step 0) */}
      <AnimatePresence>
        {tutorialStep === 0 && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            <motion.div animate={{ y: [-400, 0, -15, 0], scale: [0.5, 1, 1, 1] }} transition={{ duration: 1.5, ease: "easeOut" }} className="flex flex-col items-center gap-4 relative">
              <div className="w-24 h-24 bg-slate-800 border-2 border-cyan-500 rounded-t-full rounded-b-xl flex items-center justify-center shadow-[0_0_50px_rgba(8,145,178,0.8)] relative z-10"><Rocket size={40} className="text-cyan-400 -mt-2" /></div>
              <motion.div animate={{ height: [80, 20, 0], opacity: [1, 0.5, 0] }} transition={{ duration: 1.5 }} className="w-8 bg-gradient-to-b from-orange-500 to-transparent absolute -bottom-10 rounded-full blur-md" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-12 text-cyan-500 font-mono tracking-[0.4em] font-bold text-lg animate-pulse">LANDING SUCCESSFUL</motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY ESCURO (Steps 1 e 2) */}
      {tutorialStep === 1 && <div className="absolute inset-0 z-[40] bg-black/80 backdrop-blur-md pointer-events-none transition-all duration-700" />}
      <AnimatePresence>
        {tutorialStep === 2 && (
          <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 3, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2.5, ease: "easeOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-cyan-400 bg-cyan-500/20 z-[45] pointer-events-none" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRadarPulsing && tutorialStep >= 3 && (
          <motion.div initial={{ scale: 0, opacity: 0.2 }} animate={{ scale: 2.5, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[3px] border-cyan-500/20 z-0 pointer-events-none" />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse pointer-events-none" />

      {/* HEADER / HUD COM BARRAS DE PROGRESSO */}
      <header className="relative z-50 flex flex-wrap items-center justify-between p-4 md:p-6 border-b border-cyan-900/50 bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(8,145,178,0.1)]">
        <div className="flex gap-4 md:gap-6 items-center">
          
          <div className="flex flex-col gap-2 w-32 md:w-44 bg-slate-900/80 border border-slate-700 p-2.5 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-slate-800 rounded text-slate-400 border border-slate-600"><Pickaxe size={16} /></div>
              <div>
                <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">{t.hudRegolith}</p>
                <p className="text-sm font-mono font-bold text-white leading-none mt-0.5"><span className={regolith >= REGOLITH_QUOTA ? 'text-cyan-400' : ''}>{regolith}</span> <span className="text-slate-600 text-[10px]">/ {REGOLITH_QUOTA}</span></p>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-slate-400 transition-all duration-300 ease-out" style={{ width: `${progRegolith}%` }} /></div>
          </div>

          <div className="flex flex-col gap-2 w-32 md:w-44 bg-slate-900/80 border border-blue-900/50 p-2.5 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-950 rounded text-blue-400 border border-blue-800"><Droplets size={16} /></div>
              <div>
                <p className="text-[9px] text-blue-500/70 font-bold tracking-widest uppercase">{t.hudIce}</p>
                <p className="text-sm font-mono font-bold text-white leading-none mt-0.5"><span className={ice >= ICE_QUOTA ? 'text-blue-400' : ''}>{ice}</span> <span className="text-slate-600 text-[10px]">/ {ICE_QUOTA}</span></p>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${progIce}%` }} /></div>
          </div>

          {/* COMBO METER */}
          {tutorialStep >= 3 && (
            <div className="hidden md:flex flex-col gap-1 ml-2 items-center">
               <div className={`flex items-center gap-1 font-black italic text-xl ${isMaxCombo ? 'text-orange-500 animate-pulse' : 'text-slate-400'}`}>
                 {isMaxCombo ? <Flame size={20} /> : <Zap size={20} />} x{combo.toFixed(1)}
               </div>
               <div className="text-[8px] text-slate-500 tracking-widest uppercase font-bold">COMBO MULTIPLIER</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex bg-slate-900/80 border border-cyan-900/50 rounded-lg overflow-hidden backdrop-blur-md shadow-lg">
            <div className="px-3 py-2 bg-slate-800/50 flex items-center justify-center border-r border-cyan-900/50"><Globe size={16} className="text-cyan-500" /></div>
            <button onClick={() => setLang('en')} className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>EN</button>
            <button onClick={() => setLang('pt')} className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors ${lang === 'pt' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>PT</button>
          </div>
          
          <motion.button 
            whileHover={isQuotaMet ? { scale: 1.05 } : {}} whileTap={isQuotaMet ? { scale: 0.95 } : {}}
            onClick={() => { if(isQuotaMet) setScreen('base-builder'); }}
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg uppercase tracking-widest text-sm transition-all duration-300 border
              ${isQuotaMet ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400 shadow-[0_0_20px_rgba(8,145,178,0.5)] animate-pulse' : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-70'}
            `}
          >
            {t.btnBuild} {isQuotaMet && <ChevronRight size={18} />}
          </motion.button>
        </div>
      </header>

      {/* ÁREA CENTRAL DO JOGO */}
      <main className="flex-1 relative w-full h-full overflow-hidden flex flex-col md:flex-row">
        
        {/* MAPA DE EXPLORAÇÃO */}
        <div className="flex-1 relative">
          <AnimatePresence>
            {tutorialStep === 1 && !isLumiTyping && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}
                onClick={handleScan} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] flex flex-col items-center gap-4 group"
              >
                <div className="w-24 h-24 bg-cyan-950/80 border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(8,145,178,0.5)] group-hover:bg-cyan-900 group-hover:scale-110 transition-all duration-300 relative">
                  <Radar size={40} className="text-cyan-300 group-hover:animate-spin" />
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping opacity-50" />
                </div>
                <span className="text-cyan-300 font-bold tracking-[0.3em] bg-slate-900/80 px-4 py-2 rounded-lg border border-cyan-900">{t.btnScan}</span>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {tutorialStep >= 3 && anomalies.map(anomaly => (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ type: 'spring' }}
                style={{ top: `${anomaly.y}%`, left: `${anomaly.x}%` }}
                className="absolute w-20 h-20 md:w-28 md:h-28 cursor-crosshair z-30 group"
                onClick={(e) => handleCollect(e, anomaly)}
              >
                <div className={`w-full h-full rounded-full border-2 transition-transform flex flex-col items-center justify-center active:scale-75 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]
                  ${anomaly.type === 'he3' ? 'bg-purple-900/90 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.8)] rotate-45' : 
                    anomaly.type === 'ice' ? 'bg-blue-900/80 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 
                    'bg-slate-800/80 border-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.4)]'}
                `}>
                  {anomaly.type === 'he3' ? <Zap size={24} className="text-purple-300 mb-1 -rotate-45 animate-pulse" /> :
                   anomaly.type === 'ice' ? <Droplets size={24} className="text-blue-300 mb-1 opacity-70 group-hover:opacity-100" /> :
                   <Target size={24} className="text-cyan-300 mb-1 opacity-70 group-hover:opacity-100" />}
                </div>

                {/* O LORE ESTÁ AQUI (HOLOGRAFIA DATA LOG) */}
                {anomaly.type !== 'he3' && (
                  <div className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 w-56 backdrop-blur-md border p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.8)]
                    ${anomaly.type === 'ice' ? 'bg-blue-950/90 border-blue-900' : 'bg-slate-900/90 border-cyan-900'}
                  `}>
                    <div className={`flex items-center gap-2 mb-2 border-b pb-2 ${anomaly.type === 'ice' ? 'border-blue-900/50' : 'border-slate-700'}`}>
                      {anomaly.type === 'ice' ? <Info size={14} className="text-blue-500" /> : <Cpu size={14} className="text-cyan-500" />}
                      <span className={`text-[10px] font-bold tracking-widest ${anomaly.type === 'ice' ? 'text-blue-400' : 'text-cyan-400'}`}>DATA LOG</span>
                    </div>
                    <p className="text-slate-300 text-xs font-mono leading-relaxed">{anomaly.type === 'ice' ? t.descIce : t.descRegolith}</p>
                  </div>
                )}

                <AnimatePresence>
                  {floatingTexts.map(text => (
                    <motion.div key={text.id} initial={{ opacity: 1, y: text.y, x: text.x, scale: 0.5 }} animate={{ opacity: 0, y: text.y - 120, scale: 1.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className={`absolute pointer-events-none font-bold text-2xl md:text-4xl font-mono ${text.color} drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] z-50`}>
                      {text.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* PAINEL LATERAL DE UPGRADES */}
        {tutorialStep >= 3 && (
          <div className="w-full md:w-80 bg-slate-900/90 border-t md:border-t-0 md:border-l border-cyan-900/50 backdrop-blur-xl p-5 flex flex-col z-40 shadow-2xl">
            <div className="flex items-center gap-2 mb-6 border-b border-cyan-900/50 pb-3">
              <Cpu className="text-cyan-500" size={20} />
              <h2 className="text-cyan-400 font-bold uppercase tracking-widest text-sm">{t.upgrades}</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className={`p-4 rounded-xl border-2 transition-all ${regolith >= laserCost ? 'border-cyan-500/50 bg-slate-800 shadow-[0_0_15px_rgba(8,145,178,0.2)]' : 'border-slate-800 bg-slate-950 opacity-70'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-900 rounded text-cyan-400"><Crosshair size={16} /></div>
                    <h3 className="text-slate-200 font-bold text-sm uppercase">{t.upgLaser}</h3>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold text-xs bg-cyan-950 px-2 py-1 rounded">{t.level} {laserLevel}</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-relaxed mb-4">{t.upgLaserDesc}</p>
                <button onClick={buyLaser} disabled={regolith < laserCost} className={`w-full py-2.5 rounded flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${regolith >= laserCost ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                  <span>{t.cost}: {laserCost}</span> <Pickaxe size={12} className={regolith >= laserCost ? 'text-white' : 'text-slate-500'} />
                </button>
              </div>

              <div className={`p-4 rounded-xl border-2 transition-all ${ice >= radarCost ? 'border-blue-500/50 bg-slate-800 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-slate-800 bg-slate-950 opacity-70'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-900 rounded text-blue-400"><Activity size={16} /></div>
                    <h3 className="text-slate-200 font-bold text-sm uppercase">{t.upgRadar}</h3>
                  </div>
                  <span className="text-blue-400 font-mono font-bold text-xs bg-blue-950 px-2 py-1 rounded">{t.level} {radarLevel}</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-relaxed mb-4">{t.upgRadarDesc}</p>
                <button onClick={buyRadar} disabled={ice < radarCost} className={`w-full py-2.5 rounded flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${ice >= radarCost ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                  <span>{t.cost}: {radarCost}</span> <Droplets size={12} className={ice >= radarCost ? 'text-white' : 'text-slate-500'} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER: TERMINAL DA LUMI */}
      <footer className="relative z-[80] p-4 md:p-6 bg-slate-950 border-t border-cyan-900/50 flex items-end">
        <div className="max-w-4xl flex items-center gap-4 md:gap-6 w-full mx-auto md:mx-0">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-800 border-2 border-cyan-500/50 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(8,145,178,0.3)]">
            <Bot size={28} className="text-cyan-400" />
          </div>
          
          <div className="flex-1">
            <h4 className="text-cyan-500 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
              L.U.M.I. System <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-400"></div>
            </h4>
            <p className="text-slate-200 font-mono text-xs md:text-sm leading-relaxed min-h-[40px]">
              {displayedText}
              {isLumiTyping && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />}
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}