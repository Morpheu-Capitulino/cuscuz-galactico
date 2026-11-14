// src/pages/Exploration/index.tsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Bot, Pickaxe, Droplets, Radar, Target, Zap, Crosshair, Activity, Settings, Package, ShoppingCart, BookOpen, Flame, AlertTriangle, HeartPulse, Wrench, Wind, Timer, BatteryCharging, Cpu, Shield, Rocket, Layers, Magnet, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DICTIONARY, MANUAL_CONTENT, GAME_EVENTS, PLANETS, TARGET_DISTANCE } from './constants';
import { IndicatorItem, ShopModal } from './components/UI';

type Lang = 'en' | 'pt';
interface Anomaly { id: number; startX: number; duration: number; type: 'regolith' | 'ice' | 'parts' | 'he3' | 'hazard'; size: 'sm' | 'md' | 'lg'; expiresAt: number; }
interface FloatingText { id: number; x: number; y: number; text: string; color: string; }

export default function Exploration() {
  const navigate = useNavigate();
  const [localLang, setLocalLang] = useState<Lang>('pt');
  const globalLangStore = useGameStore(state => state.language);
  const setGlobalLang = useGameStore(state => state.setLanguage);
  
  const lang = (globalLangStore || localLang) as Lang;
  const changeLang = (l: Lang) => { if (setGlobalLang) setGlobalLang(l); setLocalLang(l); };

  const { regolith, ice, parts } = useGameStore(state => state.inventory);
  const { laserLevel, radarLevel, droneLevel, cargoLevel, shieldLevel, engineLevel, armorLevel, coreLevel, scoopLevel, turretLevel } = useGameStore(state => state);
  const { collectResource, updateIndicator } = useGameStore(state => state);

  const indicatorsStore = useGameStore(state => state.indicators) || { o2: 100, water: 100, energy: 100 };
  const o2 = indicatorsStore.o2 ?? 100;
  const water = indicatorsStore.water ?? 100;
  const energy = indicatorsStore.energy ?? 100;

  const setO2 = (amount: number) => updateIndicator('o2', amount);
  const setWater = (amount: number) => updateIndicator('water', amount);
  const setEnergy = (amount: number) => updateIndicator('energy', amount);

  const [shipHealth, setShipHealth] = useState(100); 
  const t = DICTIONARY[lang];

  const [tutorialStep, setTutorialStep] = useState(1); 
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [combo, setCombo] = useState(1.0);
  
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [eventTimeLeft, setEventTimeLeft] = useState(30); 
  const [eventResolution, setEventResolution] = useState<{ text: string, hpMod: number } | null>(null);
  
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  
  const [distance, setDistance] = useState(0);
  const distanceRef = useRef(distance); 

  const [shakeScreen, setShakeScreen] = useState(false);
  const [turretFlash, setTurretFlash] = useState(false);

  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const eventTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [displayedText, setDisplayedText] = useState("");
  const [isLumiTyping, setIsLumiTyping] = useState(false);

  useEffect(() => {
    setShipHealth(100); setDistance(0); setTutorialStep(1); setCombo(1.0);
    useGameStore.setState(s => ({ indicators: { ...s.indicators, o2: 100, water: 100, energy: 100 } }));
  }, []);

  const isTutorialPhase = tutorialStep < 11; 
  const isHyperdrive = combo >= 3.0 || engineLevel > 2; 

  useEffect(() => { distanceRef.current = distance; }, [distance]);

  const triggerScreenShake = () => { setShakeScreen(true); setTimeout(() => setShakeScreen(false), 500); };

  // --- CÁLCULO DINÂMICO DE DIFICULDADE ---
  const diff = Math.min(1, distance / TARGET_DISTANCE);
  const costO2 = 5 + Math.floor(diff * 15);      
  const costH2O = 5 + Math.floor(diff * 15);     
  const costPWR = 3 + Math.floor(diff * 9);      
  const repairCostReg = 10 + Math.floor(diff * 30); 
  const repairCostPts = 5 + Math.floor(diff * 15);  

  const spawnFloatingText = (x: number, y: number, text: string, color: string) => {
    const newText = { id: Date.now() + Math.random(), x, y, text, color };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(item => item.id !== newText.id)), 1200);
  };

  const refillO2 = () => { if (ice >= costO2) { collectResource('ice', -costO2); setO2(30); spawnFloatingText(50, 50, "+30 O2", "text-cyan-300"); } };
  const refillWater = () => { if (ice >= costH2O) { collectResource('ice', -costH2O); setWater(30); spawnFloatingText(50, 50, "+30 H2O", "text-blue-300"); } };
  const refillEnergy = () => { if (parts >= costPWR) { collectResource('parts', -costPWR); setEnergy(30); spawnFloatingText(50, 50, "+30 PWR", "text-yellow-400"); } };
  
  const handleRepair = () => {
    if (regolith >= repairCostReg && parts >= repairCostPts && shipHealth < 100) {
      collectResource('regolith', -repairCostReg); collectResource('parts', -repairCostPts);
      setShipHealth(prev => Math.min(100, prev + 30)); 
      spawnFloatingText(50, 50, "+30 HP", "text-teal-400");
    }
  };

  // DRENAGEM
  useEffect(() => {
    if (tutorialStep >= 11 && !activeEvent && !eventResolution && !gameOver && !hasWon) {
      const drainTimer = setInterval(() => { setO2(-1); setWater(-1); setEnergy(-1); }, 1500);
      const penaltyTimer = setInterval(() => {
        const currentO2 = useGameStore.getState().indicators?.o2 ?? 100;
        if (currentO2 <= 0) { setShipHealth(h => Math.max(0, h - 5)); triggerScreenShake(); }
      }, 1000);
      return () => { clearInterval(drainTimer); clearInterval(penaltyTimer); };
    }
  }, [tutorialStep, activeEvent, eventResolution, gameOver, hasWon]);

  // DERROTA / VITÓRIA
  useEffect(() => {
    if (shipHealth <= 0 && !gameOver && !hasWon) { setGameOver(true); setActiveEvent(null); setEventResolution(null); if (eventTimerRef.current) clearInterval(eventTimerRef.current); }
    if (distance >= TARGET_DISTANCE && !hasWon) { setHasWon(true); setActiveEvent(null); setEventResolution(null); setAnomalies([]); if (eventTimerRef.current) clearInterval(eventTimerRef.current); }
  }, [shipHealth, gameOver, distance, hasWon]);

  useEffect(() => {
    if (!hasWon || gameOver) return;
    const transitionTimer = window.setTimeout(() => { navigate('/base-builder'); }, 4000);
    return () => window.clearTimeout(transitionTimer);
  }, [hasWon, gameOver, navigate]);

  const restartGame = () => {
    setShipHealth(100); setDistance(0); setCombo(1.0); setAnomalies([]); setTutorialStep(11); setGameOver(false);
    useGameStore.setState(s => ({ indicators: { ...s.indicators, o2: 100, water: 100, energy: 100 } }));
  };

  // NARRATIVA
  useEffect(() => {
    let msg = "";
    if (hasWon) {
        msg = t.arrival;
    } else { 
        const messages = [ 
          "", 
          t.tut1, 
          t.tut2, 
          t.tut3, 
          t.tut4, 
          t.tut5, 
          t.tut6, 
          t.tut7, 
          t.tut8, 
          lang === 'pt' ? "LOJA DE UPGRADES: Gaste seus recursos no botão 'UPGRADES' no topo direito! Evolua a nave com Lasers, Drones e Motores para suportar os perigos da jornada." : "UPGRADE SHOP: Spend your resources on the 'UPGRADES' button at the top right! Evolve your ship to survive the journey's dangers.", 
          lang === 'pt' ? "META: Sobreviva e alcance os 10.000 LY. Fique atento a problemas repentinos na nave! Ao atingir a meta, faremos o pouso seguro para você construir a sua Base Planetária." : "GOAL: Survive and reach 10,000 LY. Watch out for sudden ship problems! Upon reaching the goal, we will land safely so you can build your Planetary Base.", 
          "" 
        ]; 
        msg = messages[tutorialStep] || ""; 
    }
    if (typingRef.current) clearInterval(typingRef.current);
    let i = 0; setDisplayedText(""); setIsLumiTyping(true);
    if(tutorialStep >= 11 && !hasWon) { setIsLumiTyping(false); return; }
    typingRef.current = setInterval(() => {
      if (i < msg.length) { setDisplayedText(msg.slice(0, i + 1)); i++; } else { clearInterval(typingRef.current!); setIsLumiTyping(false); }
    }, 20);
    return () => { if (typingRef.current) clearInterval(typingRef.current); };
  }, [tutorialStep, t, hasWon, lang]);

  useEffect(() => {
    if (tutorialStep === 6) { const t1 = setTimeout(() => setTutorialStep(7), 6000); return () => clearTimeout(t1); }
    if (tutorialStep === 7) { const t2 = setTimeout(() => setTutorialStep(8), 5000); return () => clearTimeout(t2); }
    if (tutorialStep === 8) { const t3 = setTimeout(() => setTutorialStep(9), 7000); return () => clearTimeout(t3); }
    if (tutorialStep === 9) { const t4 = setTimeout(() => setTutorialStep(10), 7500); return () => clearTimeout(t4); }
    if (tutorialStep === 10) { const t5 = setTimeout(() => setTutorialStep(11), 8000); return () => clearTimeout(t5); }
  }, [tutorialStep]);

  useEffect(() => {
    if (tutorialStep >= 11 && !activeEvent && !eventResolution && !gameOver && !hasWon) {
      const distTimer = setInterval(() => { 
        const currentEnergy = useGameStore.getState().indicators?.energy ?? 100;
        const speedMultiplier = currentEnergy <= 0 ? 0.4 : 1.0; 
        setDistance(prev => Math.min(TARGET_DISTANCE, prev + ((isHyperdrive ? 25 * engineLevel : 6 * engineLevel) * speedMultiplier))); 
      }, 100);
      return () => clearInterval(distTimer);
    }
  }, [tutorialStep, isHyperdrive, activeEvent, eventResolution, gameOver, hasWon, engineLevel]);

  const [stars] = useState(() => Array.from({ length: 80 }).map(() => ({ id: Math.random(), x: Math.random() * 100, baseDuration: 1.5 + Math.random() * 3, delay: Math.random() * -5, size: Math.random() > 0.9 ? 3 : 1 })));

  // GERAÇÃO DE ANOMALIAS NO TUTORIAL
  useEffect(() => {
    if (activeEvent || eventResolution || gameOver || hasWon) return;
    if (tutorialStep >= 3 && tutorialStep <= 5 && anomalies.length === 0) {
      const type = tutorialStep === 3 ? 'regolith' : tutorialStep === 4 ? 'ice' : 'parts';
      setAnomalies([{ id: Date.now(), startX: 50, type, duration: 25, size: 'md', expiresAt: Date.now() + 25000 }]);
    }
    if (tutorialStep === 6 && anomalies.length === 0) {
      setAnomalies([{ id: Date.now(), startX: 50, type: 'hazard', duration: 15, size: 'md', expiresAt: Date.now() + 15000 }]);
    }
  }, [tutorialStep, anomalies.length, activeEvent, eventResolution, gameOver, hasWon]);

  // GERADOR PRINCIPAL
  useEffect(() => {
    if (activeEvent || eventResolution || gameOver || hasWon || tutorialStep < 11) return;
    const spawnInterval = setInterval(() => {
      const progress = distanceRef.current / TARGET_DISTANCE;
      const numToSpawn = radarLevel > 2 ? (Math.random() > 0.4 ? 3 : 2) : 2; 
      const newAnomalies: Anomaly[] = [];
      const now = Date.now();
      
      for (let i = 0; i < numToSpawn; i++) {
        const rand = Math.random();
        const hazardChance = Math.min(0.20, 0.05 + (progress * 0.15)); 
        const partsChance = 0.70 - (radarLevel * 0.02); 
        const he3Chance = 0.96;
        
        let type: Anomaly['type'] = 'regolith';
        if (rand < hazardChance) type = 'hazard';
        else if (rand > he3Chance) type = 'he3';
        else if (rand > partsChance) type = 'parts';
        else if (rand > 0.3) type = 'ice';

        const sizeRand = Math.random();
        const size = sizeRand < 0.20 ? 'sm' : sizeRand > 0.80 ? 'lg' : 'md';
        const startX = 15 + Math.random() * 70;
        
        const speedFactor = 1 - (progress * 0.30); 
        const baseDur = (size === 'sm' ? 1.5 : size === 'lg' ? 4.5 : 3.0) * speedFactor; 
        const duration = isHyperdrive ? baseDur * 0.7 : baseDur;
        
        newAnomalies.push({ id: now + Math.random(), type, startX, duration, size, expiresAt: now + (duration * 1000) });
      }
      setAnomalies(prev => [...prev, ...newAnomalies]);
    }, isHyperdrive ? 900 : 1400); 
    return () => clearInterval(spawnInterval);
  }, [tutorialStep, radarLevel, activeEvent, eventResolution, gameOver, hasWon, isHyperdrive, cargoLevel]);

  // DRONES
  useEffect(() => {
    if (droneLevel > 0 && tutorialStep >= 11 && !activeEvent && !gameOver && !hasWon) {
      const droneTimer = setInterval(() => {
        collectResource('regolith', droneLevel * 5); 
        collectResource('ice', droneLevel * 3);
        spawnFloatingText(50, 50, `DRONES +${droneLevel*5}`, 'text-slate-400');
      }, 3000);
      return () => clearInterval(droneTimer);
    }
  }, [droneLevel, tutorialStep, activeEvent, gameOver, hasWon, collectResource]);

  // SISTEMA DE EVENTOS GARANTIDO
  useEffect(() => {
    if (tutorialStep >= 11 && !activeEvent && !eventResolution && !gameOver && !hasWon) {
      const timeToNextEvent = 15000 + Math.random() * 10000; // Entre 15s e 25s
      
      const eventTimer = setTimeout(() => {
        if (shieldLevel > 0 && Math.random() < 0.3) {
           spawnFloatingText(50, 50, "ESCUDO BLOQUEOU AMEAÇA!", 'text-cyan-400');
        } else {
           const randEvent = GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
           setActiveEvent(randEvent);
           setEventTimeLeft(30); 
        }
      }, timeToNextEvent);
      
      return () => clearTimeout(eventTimer);
    }
  }, [tutorialStep, activeEvent, eventResolution, gameOver, hasWon, shieldLevel]);

  useEffect(() => {
    if (activeEvent && eventTimeLeft > 0) {
      eventTimerRef.current = setInterval(() => { setEventTimeLeft(prev => prev - 1); }, 1000);
      return () => { if (eventTimerRef.current) clearInterval(eventTimerRef.current); };
    } else if (activeEvent && eventTimeLeft <= 0) {
      if (eventTimerRef.current) clearInterval(eventTimerRef.current);
      const criticalFailureOption = activeEvent.options[activeEvent.options.length - 1]; 
      handleEventChoice(criticalFailureOption, true);
    }
  }, [activeEvent, eventTimeLeft]);

  useEffect(() => {
    if (activeEvent || eventResolution || gameOver || hasWon) return;
    const cleanup = setInterval(() => { setAnomalies(prev => prev.filter(a => a.expiresAt > Date.now())); }, 1000);
    return () => clearInterval(cleanup);
  }, [activeEvent, eventResolution, gameOver, hasWon]);

  const handleScan = () => { if (tutorialStep === 1) { setTutorialStep(2); setTimeout(() => setTutorialStep(3), 300); } };

  const handleCollect = useCallback((e: React.MouseEvent, anomaly: Anomaly) => {
    e.stopPropagation();
    if (activeEvent || eventResolution || gameOver || hasWon) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setAnomalies(prev => prev.filter(a => a.id !== anomaly.id));

    if (anomaly.type === 'hazard') {
      collectResource('regolith', -Math.max(10, Math.floor(regolith * 0.1))); 
      collectResource('ice', -Math.max(10, Math.floor(ice * 0.1)));
      setCombo(1.0);
      setShipHealth(h => Math.max(0, h - 20)); 
      triggerScreenShake();
      spawnFloatingText(e.clientX - rect.left, e.clientY - rect.top, t.hazardHit || "PERIGO!", 'text-red-500');
      return;
    }

    if (tutorialStep === 3 && anomaly.type !== 'regolith') return; 
    if (tutorialStep === 4 && anomaly.type !== 'ice') return; 
    if (tutorialStep === 5 && anomaly.type !== 'parts') return; 

    let currentCombo = combo;
    if (tutorialStep >= 11 && anomaly.type !== 'he3') {
      const maxCombo = 3.0 + (cargoLevel * 0.5);
      currentCombo = Math.min(maxCombo, currentCombo + 0.2);
      setCombo(currentCombo);
      if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
      comboTimeoutRef.current = setTimeout(() => setCombo(1.0), 1500); 
    }

    const sizeMultiplier = anomaly.size === 'sm' ? 2.5 : anomaly.size === 'lg' ? 0.3 : 1.0;
    const baseAmount = anomaly.type === 'he3' ? 100 : anomaly.type === 'parts' ? 6 : anomaly.type === 'ice' ? 15 : 20; 
    const multi = (1 + (laserLevel * 0.2)) * (1 + (coreLevel * 0.15)) * (isHyperdrive ? currentCombo * 1.5 : currentCombo) * sizeMultiplier;
    const finalAmount = Math.max(1, Math.floor(baseAmount * multi) + (scoopLevel * 3));

    if (anomaly.type === 'he3') { collectResource('regolith', finalAmount); collectResource('ice', finalAmount); collectResource('parts', 15); } 
    else { collectResource(anomaly.type, finalAmount); }

    if (tutorialStep === 3) setTutorialStep(4);
    else if (tutorialStep === 4) setTutorialStep(5);
    else if (tutorialStep === 5) setTutorialStep(6);

    const color = anomaly.type === 'he3' ? 'text-purple-400' : anomaly.type === 'parts' ? 'text-orange-400' : anomaly.type === 'ice' ? 'text-blue-300' : 'text-slate-300';
    spawnFloatingText(e.clientX - rect.left, e.clientY - rect.top, `+${finalAmount}`, color);
  }, [collectResource, combo, laserLevel, cargoLevel, coreLevel, scoopLevel, tutorialStep, activeEvent, eventResolution, gameOver, hasWon, isHyperdrive, t, regolith, ice]);

  const handleEventChoice = (option: any, isTimeout: boolean = false) => {
    if (eventTimerRef.current) clearInterval(eventTimerRef.current); 

    const currentInventory = useGameStore.getState().inventory;
    const reqCost = option.cost;
    const hasEnough = option.costType === 'none' ? true : currentInventory[option.costType as keyof typeof currentInventory] >= reqCost;
    
    if (option.costType !== 'none' && hasEnough) { collectResource(option.costType as any, -reqCost); }

    let finalHpMod = option.hpMod;
    if (finalHpMod < 0 && armorLevel > 0) { finalHpMod = Math.min(0, finalHpMod + (armorLevel * 8)); }

    setShipHealth(prev => Math.max(0, prev + finalHpMod));
    if (finalHpMod < 0) triggerScreenShake();

    let resolutionText = option.outcome[lang];
    if (isTimeout) resolutionText = `FALHA NO SISTEMA: TEMPO DE DECISÃO ESGOTADO! ${resolutionText}`;

    setEventResolution({ text: resolutionText, hpMod: finalHpMod });
    setActiveEvent(null);
  };

  const getCargoWidth = () => cargoLevel === 1 ? 'w-24' : cargoLevel === 2 ? 'w-28' : cargoLevel === 3 ? 'w-36' : 'w-44';
  const getRadarWidth = () => radarLevel === 1 ? 'w-16' : radarLevel === 2 ? 'w-20' : radarLevel === 3 ? 'w-28' : 'w-36';
  const getLaserHeight = () => laserLevel === 1 ? 'h-16' : laserLevel === 2 ? 'h-24' : laserLevel === 3 ? 'h-32' : 'h-40';
  const getCockpitGlow = () => coreLevel === 1 ? 'bg-cyan-900/50' : coreLevel === 2 ? 'bg-cyan-600/80 shadow-[0_0_10px_cyan]' : 'bg-cyan-400 shadow-[0_0_20px_cyan]';

  const isMaxComboCombo = combo >= (3.0 + (cargoLevel * 0.5));

  return (
    <motion.div animate={shakeScreen ? { x: [-20, 20, -20, 20, 0], filter: 'brightness(1.5)' } : { filter: 'brightness(1)' }} transition={{ duration: 0.5 }} className={`h-screen w-screen bg-[#020617] relative overflow-hidden font-sans select-none flex flex-col transition-colors duration-1000 ${isHyperdrive && !gameOver && !hasWon ? 'bg-indigo-950/40' : ''}`}>
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        {stars.map((star) => (
          <motion.div key={star.id} initial={{ y: '-10vh', x: `${star.x}vw` }} animate={{ y: '110vh' }} transition={{ duration: isHyperdrive ? star.baseDuration * 0.2 : star.baseDuration, repeat: Infinity, ease: 'linear', delay: star.delay }} className={`absolute rounded-full ${isHyperdrive ? 'bg-cyan-200 shadow-[0_0_15px_cyan]' : 'bg-slate-200 shadow-[0_0_5px_white]'}`} style={{ width: star.size, height: isHyperdrive ? star.size * 15 : star.size * 3, opacity: star.size > 2 ? 0.9 : 0.6 }} />
        ))}
        {PLANETS.map((planet) => (
          <motion.div key={planet.id} initial={{ y: '-50vh', rotate: 0 }} animate={{ y: '120vh', rotate: 15 }} transition={{ duration: isHyperdrive ? planet.duration * 0.5 : planet.duration, repeat: Infinity, ease: 'linear', delay: planet.delay }} style={{ left: planet.x }} className={`absolute top-0 rounded-full bg-gradient-to-bl ${planet.color} ${planet.size} blur-[3px] opacity-60 shadow-[inset_-40px_-40px_80px_rgba(0,0,0,0.9)]`} />
        ))}
      </div>

      {isTutorialPhase && <div className="absolute inset-0 z-[40] bg-black/85 backdrop-blur-sm pointer-events-none transition-all duration-500" />}

      {/* HUD DISCRETO E FUNCIONAL */}
      <header className="relative z-[80] flex flex-col md:flex-row gap-4 px-4 py-2 md:px-6 md:py-3 bg-slate-950/80 backdrop-blur-md border-b border-cyan-900/30 items-center justify-between shadow-xl">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          <button onClick={handleRepair} disabled={regolith < repairCostReg || parts < repairCostPts || shipHealth >= 100} className="flex items-center gap-2 bg-teal-900/40 hover:bg-teal-800 disabled:opacity-50 text-teal-100 px-3 py-1.5 rounded-lg border border-teal-700/50 transition-colors group cursor-pointer shadow-sm">
            <Wrench size={14} className="group-hover:animate-bounce" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] font-black uppercase text-teal-400 tracking-wider">{t.repair}</span>
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-300">
                <span>-{repairCostReg} <Pickaxe size={8} className="inline text-slate-400"/></span>
                <span>-{repairCostPts} <Settings size={8} className="inline text-orange-400"/></span>
              </div>
            </div>
          </button>
          
          <IndicatorItem icon={HeartPulse} color="teal" value={shipHealth} label="HP" />
          <IndicatorItem icon={Wind} color="cyan" value={o2} label="O2" onRefill={refillO2} disabled={ice < costO2} costNode={<>{costO2} <Droplets size={10} className="inline text-blue-400"/></>} />
          <IndicatorItem icon={Droplets} color="blue" value={water} label="H2O" onRefill={refillWater} disabled={ice < costH2O} costNode={<>{costH2O} <Droplets size={10} className="inline text-blue-400"/></>} />
          <IndicatorItem icon={BatteryCharging} color="yellow" value={energy} label="PWR" onRefill={refillEnergy} disabled={parts < costPWR} costNode={<>{costPWR} <Settings size={10} className="inline text-orange-400"/></>} />
        </div>

        <div className="hidden md:flex items-center gap-4 bg-slate-900/60 border border-slate-700/50 px-4 py-1.5 rounded-full shadow-inner">
          <div className="flex items-center gap-1.5"><Pickaxe size={14} className="text-slate-400" /><span className="text-sm font-mono font-bold text-white">{regolith}</span></div>
          <div className="w-px h-4 bg-slate-700/50" />
          <div className="flex items-center gap-1.5"><Droplets size={14} className="text-blue-400" /><span className="text-sm font-mono font-bold text-white">{ice}</span></div>
          <div className="w-px h-4 bg-slate-700/50" />
          <div className="flex items-center gap-1.5"><Settings size={14} className="text-orange-400" /><span className="text-sm font-mono font-bold text-white">{parts}</span></div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {tutorialStep >= 11 && (
            <div className="flex flex-col items-end mr-2">
              <span className="text-[9px] text-cyan-500 font-black uppercase tracking-wider">Distância</span>
              <span className="text-sm font-mono font-bold text-white drop-shadow-[0_0_5px_cyan]">{Math.floor(distance)} <span className="text-[10px] text-slate-500">/ {TARGET_DISTANCE}</span></span>
            </div>
          )}
          
          <div className="flex gap-2">
            <button onClick={() => setIsManualOpen(true)} className="p-2 bg-indigo-950/50 hover:bg-indigo-900/80 text-indigo-300 rounded-lg border border-indigo-800/50 transition-colors shadow-sm"><BookOpen size={16} /></button>
            <button onClick={() => setIsShopOpen(true)} className="px-3 py-1.5 bg-cyan-950/50 hover:bg-cyan-900/80 text-cyan-300 rounded-lg border border-cyan-800/50 text-[10px] font-black uppercase flex items-center gap-1.5 transition-colors shadow-sm"><ShoppingCart size={14} /> {t.upgrades}</button>
            
            <div className="flex bg-slate-900/80 border border-slate-700/50 rounded-lg overflow-hidden ml-2 shadow-sm">
              <button onClick={() => changeLang('en')} className={`px-2 py-1.5 text-[9px] font-black transition-colors ${lang === 'en' ? 'bg-cyan-700 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>EN</button>
              <button onClick={() => changeLang('pt')} className={`px-2 py-1.5 text-[9px] font-black transition-colors ${lang === 'pt' ? 'bg-cyan-700 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>PT</button>
            </div>
          </div>
        </div>
      </header>

      {/* A SUA NAVE NO CENTRO DA TELA */}
      <main className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden">
        <motion.div animate={isMaxComboCombo ? { y: [-2, 2, -2, 2, 0] } : isHyperdrive ? { y: [-1, 1, -1] } : {}} transition={{ repeat: Infinity, duration: isHyperdrive ? 0.05 : 0.1 }} className={`absolute z-[20] flex items-center justify-center pointer-events-none transition-opacity duration-700 ${isTutorialPhase ? 'opacity-30 blur-md' : 'opacity-100'} ${gameOver ? 'grayscale opacity-10' : ''}`}>
             <div className="relative flex flex-col items-center">
                {shieldLevel > 0 && (<motion.div layout className="absolute inset-[-70px] rounded-[100px] border-4 border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_40px_rgba(34,211,238,0.2)] animate-pulse z-[100]" />)}
                {droneLevel > 0 && (<motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4 / Math.min(droneLevel, 3), ease: "linear" }} className="absolute inset-[-90px] z-[90] rounded-full border border-dotted border-slate-600/40"><div className="absolute top-0 left-1/2 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_15px_orange]" />{droneLevel > 1 && <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-orange-400 rounded-full shadow-[0_0_15px_orange]" />}</motion.div>)}
                <motion.div layout className={`w-8 md:w-10 bg-gradient-to-b from-slate-600 to-slate-900 border-x-2 border-t-2 border-slate-500 rounded-t-full flex flex-col items-center pt-2 relative z-30 shadow-2xl ${getLaserHeight()}`}><Crosshair size={18} className={laserLevel > 1 ? 'text-cyan-400' : 'text-slate-500'} />{laserLevel > 1 && <div className="w-1 h-2/3 bg-cyan-400 mt-2 rounded-full shadow-[0_0_15px_cyan]" />}</motion.div>
                <div className="flex items-center justify-center relative w-full -mt-6 z-20">
                  {laserLevel > 1 && <div className="w-2 h-16 bg-slate-600 border-2 border-slate-500 rounded-t-full relative mr-[-4px] z-10"><div className="w-full h-4 bg-cyan-400 shadow-[0_0_10px_cyan] absolute top-0 rounded-t-full"/></div>}
                  {scoopLevel > 0 && <motion.div layout className="w-6 h-20 bg-slate-700 border-y-2 border-l-2 border-cyan-600/50 rounded-l-full mr-[-4px] z-10 shadow-[0_0_10px_rgba(8,145,178,0.5)] flex items-center justify-center"><Magnet size={12} className="text-cyan-400"/></motion.div>}
                  <motion.div layout className={`${getRadarWidth()} h-32 md:h-40 bg-slate-800 border-t-4 border-l-4 border-slate-600 rounded-tl-[60px] rounded-bl-2xl flex flex-col items-center justify-center relative shadow-xl overflow-hidden`}><Activity size={24} className={radarLevel > 1 ? 'text-blue-400' : 'text-slate-500'} />{radarLevel > 1 && <div className="absolute top-4 left-4 w-12 h-12 border border-blue-500/40 rounded-full animate-ping" />}</motion.div>
                  <motion.div layout className={`${getCargoWidth()} h-40 md:h-48 bg-slate-900 border-4 border-slate-700 rounded-2xl flex flex-col items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,1)] relative z-40 mx-[-12px]`}>
                    {turretLevel > 0 && (<div className="absolute -top-4 w-6 h-6 bg-slate-700 border-2 border-slate-500 rounded-full flex items-center justify-center z-50 shadow-xl"><Target size={12} className={turretFlash ? 'text-yellow-400' : 'text-slate-400'} />{turretFlash && <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping" />}</div>)}
                    {armorLevel > 0 && (<div className="absolute inset-[-4px] border-4 border-slate-400 rounded-2xl opacity-60 flex flex-col justify-between p-2"><div className="w-full h-2 bg-slate-500 rounded-full" /><div className="w-full h-2 bg-slate-500 rounded-full" /></div>)}
                    <div className={`absolute top-2 w-10 md:w-12 h-16 md:h-20 border-2 border-cyan-500/50 rounded-t-full rounded-b-xl flex items-center justify-center z-50 ${getCockpitGlow()} transition-colors`}>{coreLevel > 1 && <Cpu size={16} className="text-white opacity-80" />}</div>
                    <Package size={28} className={`mt-16 ${cargoLevel > 1 ? 'text-purple-400' : 'text-slate-600'}`} />
                    <div className="text-[10px] font-mono text-slate-400 mt-1 tracking-widest bg-black/80 px-2 py-1 rounded border border-slate-700">CRG-{cargoLevel}</div>
                  </motion.div>
                  <motion.div layout className={`${getRadarWidth()} h-32 md:h-40 bg-slate-800 border-t-4 border-r-4 border-slate-600 rounded-tr-[60px] rounded-br-2xl flex flex-col items-center justify-center relative shadow-xl overflow-hidden`}><Bot size={24} className={droneLevel > 0 ? 'text-orange-400' : 'text-slate-500'} />{droneLevel > 0 && <div className="absolute right-4 bottom-4 w-4 h-4 bg-orange-500 rounded-full animate-bounce shadow-[0_0_15px_orange]" />}</motion.div>
                  {scoopLevel > 0 && <motion.div layout className="w-6 h-20 bg-slate-700 border-y-2 border-r-2 border-cyan-600/50 rounded-r-full ml-[-4px] z-10 shadow-[0_0_10px_rgba(8,145,178,0.5)] flex items-center justify-center"><Magnet size={12} className="text-cyan-400"/></motion.div>}
                  {laserLevel > 1 && <div className="w-2 h-16 bg-slate-600 border-2 border-slate-500 rounded-t-full relative ml-[-4px] z-10"><div className="w-full h-4 bg-cyan-400 shadow-[0_0_10px_cyan] absolute top-0 rounded-t-full"/></div>}
                </div>
                <div className="flex relative -mt-6 z-10">
                  {engineLevel > 1 && <div className="w-4 h-16 bg-slate-700 border-x-2 border-b-2 border-slate-500 rounded-b-xl shadow-lg mt-[-8px]"/>}
                  <motion.div layout className="w-28 md:w-36 h-12 md:h-16 bg-slate-800 border-x-4 border-b-4 border-slate-600 rounded-b-3xl flex items-center justify-center shadow-2xl relative">
                    {!gameOver && !hasWon && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 flex gap-3">
                        <motion.div animate={{ height: isHyperdrive ? ['90px', '140px'] : ['50px', '70px'] }} transition={{ repeat: Infinity, duration: 0.05 }} className={`w-4 rounded-b-full blur-[2px] ${isHyperdrive ? 'bg-cyan-400 shadow-[0_0_20px_cyan]' : 'bg-orange-500'}`} />
                        <motion.div animate={{ height: isHyperdrive ? ['120px', '180px'] : ['70px', '100px'] }} transition={{ repeat: Infinity, duration: 0.08 }} className={`w-6 md:w-8 rounded-b-full blur-[2px] ${isHyperdrive ? 'bg-cyan-200 shadow-[0_0_30px_white]' : 'bg-yellow-400'}`} />
                        <motion.div animate={{ height: isHyperdrive ? ['90px', '140px'] : ['50px', '70px'] }} transition={{ repeat: Infinity, duration: 0.06 }} className={`w-4 rounded-b-full blur-[2px] ${isHyperdrive ? 'bg-cyan-400 shadow-[0_0_20px_cyan]' : 'bg-orange-500'}`} />
                      </div>
                    )}
                  </motion.div>
                  {engineLevel > 1 && <div className="w-4 h-16 bg-slate-700 border-x-2 border-b-2 border-slate-500 rounded-b-xl shadow-lg mt-[-8px]"/>}
                </div>
             </div>
        </motion.div>

        <AnimatePresence>
          {tutorialStep === 1 && !isLumiTyping && (
            <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} onClick={handleScan} className="absolute z-[70] flex flex-col items-center gap-3 cursor-pointer pointer-events-auto">
              <div className="w-24 h-24 bg-cyan-950/90 border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(8,145,178,0.8)] hover:scale-105 transition-transform"><Radar size={40} className="text-cyan-300 animate-spin" /></div>
              <span className="text-cyan-300 font-bold tracking-widest bg-slate-900/90 px-6 py-2.5 rounded-lg border border-cyan-900 shadow-lg text-sm uppercase">{t.btnScan}</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* METEOROS COM QUEDA E TAMANHOS NORMAIS */}
        {!activeEvent && !eventResolution && !gameOver && !hasWon && anomalies.map(anomaly => {
          let sizeClass = 'w-20 h-20 md:w-24 md:h-24'; let iconSize = 32;
          if (anomaly.size === 'sm') { sizeClass = 'w-14 h-14 md:w-16 md:h-16'; iconSize = 24; } 
          else if (anomaly.size === 'lg') { sizeClass = 'w-28 h-28 md:w-32 md:h-32'; iconSize = 48; }
          
          const isTutItem = isTutorialPhase && tutorialStep >= 3 && tutorialStep <= 6;

          return (
            <motion.div key={anomaly.id} 
              initial={{ top: '-30%', x: '-50%', rotate: 0 }} 
              animate={{ top: '120%', x: '-50%', rotate: anomaly.type === 'ice' ? 180 : 360 }} 
              style={{ left: `${anomaly.startX}%`, position: 'absolute' }} 
              transition={{ duration: isTutItem ? 25 : anomaly.duration, ease: 'linear' }} 
              className={`${sizeClass} cursor-crosshair group pointer-events-auto ${isTutorialPhase ? 'z-[100]' : 'z-[60]'}`} 
              onMouseDown={(e) => handleCollect(e as any, anomaly)}
            >
              <div className={`w-full h-full border-4 transition-transform flex flex-col items-center justify-center hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-md ${anomaly.type === 'hazard' ? 'bg-red-900/95 border-red-500 rounded-full animate-pulse shadow-[0_0_40px_red]' : anomaly.type === 'he3' ? 'bg-purple-900/95 border-purple-400 rotate-45 rounded-3xl shadow-[0_0_30px_purple]' : anomaly.type === 'parts' ? 'bg-orange-900/95 border-orange-400 rounded-2xl shadow-[0_0_20px_orange]' : anomaly.type === 'ice' ? 'bg-blue-900/95 border-blue-400 rounded-full shadow-[0_0_20px_blue]' : 'bg-slate-700/95 border-slate-300 rounded-xl shadow-[0_0_20px_white]'} `}>
                {anomaly.type === 'hazard' ? <Flame size={iconSize} className="text-red-400 drop-shadow-[0_0_10px_red]" /> : anomaly.type === 'he3' ? <Zap size={iconSize} className="text-purple-300 -rotate-45 drop-shadow-[0_0_10px_purple]" /> : anomaly.type === 'parts' ? <Settings size={iconSize} className="text-orange-300 drop-shadow-[0_0_10px_orange]" /> : anomaly.type === 'ice' ? <Droplets size={iconSize} className="text-blue-300 drop-shadow-[0_0_10px_blue]" /> : <Pickaxe size={iconSize} className="text-slate-200 drop-shadow-[0_0_10px_white]" />}
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {floatingTexts.map(text => (
            <motion.div key={text.id} initial={{ opacity: 1, y: text.y, x: text.x, scale: 0.5 }} animate={{ opacity: 0, y: text.y - 120, scale: 1.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className={`absolute pointer-events-none font-black text-3xl md:text-5xl font-mono ${text.color} drop-shadow-[0_0_20px_rgba(0,0,0,1)] z-[110]`}>
              {text.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      <ShopModal 
        isOpen={isShopOpen} 
        onClose={() => setIsShopOpen(false)} 
        t={t} 
        laserLevel={laserLevel} radarLevel={radarLevel} droneLevel={droneLevel} cargoLevel={cargoLevel} shieldLevel={shieldLevel} engineLevel={engineLevel} armorLevel={armorLevel} coreLevel={coreLevel} scoopLevel={scoopLevel} turretLevel={turretLevel} 
        regolith={regolith} ice={ice} parts={parts} 
      />

      {/* MODAL DE EVENTO - ESTILO TERMINAL CIENTÍFICO */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-4 pointer-events-auto">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
              
              {/* Barra de Tempo Fina e Discreta */}
              <div className="h-1 bg-slate-800 w-full">
                 <div className="h-full bg-cyan-500 transition-all duration-1000 ease-linear" style={{ width: `${(eventTimeLeft / 30) * 100}%` }} />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <Activity size={28} className="text-cyan-500 mb-4" />
                <h2 className="text-slate-400 font-bold text-xs tracking-[0.2em] mb-2 uppercase">Anomalia Detectada</h2>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white font-black text-xl uppercase tracking-wider">{activeEvent.title[lang]}</h3>
                  <span className="text-cyan-400 font-mono text-sm bg-slate-950 px-2 py-0.5 rounded border border-slate-800">T-{eventTimeLeft}s</span>
                </div>
                
                <p className="text-slate-300 font-mono text-sm leading-relaxed bg-slate-950/50 p-5 rounded-lg border border-slate-800 mb-6 w-full">{activeEvent.desc[lang]}</p>
                
                <div className="flex flex-col w-full gap-3">
                  {activeEvent.options.map((opt: any, idx: number) => {
                    const inventory = useGameStore.getState().inventory;
                    const reqCost = opt.cost;
                    const hasEnough = opt.costType === 'none' ? true : inventory[opt.costType as keyof typeof inventory] >= reqCost;

                    return (
                      <button key={idx} onClick={() => handleEventChoice(opt)} disabled={!hasEnough} className={`p-4 rounded-lg border flex items-center justify-between transition-colors text-left ${!hasEnough ? 'bg-slate-950/50 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-cyan-500/50 active:scale-[0.99]'}`}>
                        <span className="font-mono text-xs uppercase tracking-wider">{opt.text[lang]}</span>
                        {opt.costType !== 'none' && opt.cost > 0 && (
                          <span className="text-[10px] font-black text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 shrink-0 ml-4">{opt.cost} {opt.costType.toUpperCase()}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESOLUÇÃO DO EVENTO - RELATÓRIO TÉCNICO */}
      <AnimatePresence>
        {eventResolution && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-4 pointer-events-auto">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 md:p-8 flex flex-col items-center text-center">
              <Info size={32} className="text-slate-400 mb-4" />
              <h2 className="font-bold text-xs tracking-[0.2em] uppercase text-slate-400 mb-4">Relatório de Diagnóstico</h2>
              
              <p className="text-slate-200 text-sm leading-relaxed font-mono bg-slate-950/50 p-5 rounded-lg border border-slate-800 mb-6 w-full text-left">{eventResolution.text}</p>
              
              {eventResolution.hpMod < 0 && (
                <div className="bg-red-950/30 border border-red-900/50 text-red-400 font-mono text-xs px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
                  <AlertTriangle size={16} /> <span>Integridade Estrutural Comprometida: <strong>{eventResolution.hpMod} HP</strong></span>
                </div>
              )}
              
              <button onClick={() => setEventResolution(null)} className="px-8 py-3 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 text-xs font-black uppercase tracking-widest rounded-lg border border-cyan-800 transition-colors w-full md:w-auto">Confirmar Leitura</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAME OVER CIENTÍFICO */}
      <AnimatePresence>
        {gameOver && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-[300] flex flex-col items-center justify-center p-4 pointer-events-auto">
            <AlertTriangle size={64} className="text-red-500/80 mb-6" />
            <h1 className="text-red-500/90 font-black text-4xl md:text-5xl tracking-[0.2em] uppercase mb-4">Falha Catastrófica</h1>
            <p className="text-slate-300 font-mono text-sm mb-12 text-center max-w-xl bg-slate-900 p-5 rounded-lg border border-red-900/30">
              Despressurização crítica no vácuo espacial. A falta de redundância técnica e recursos resultou no colapso estrutural da nave. A tripulação foi perdida na escuridão orbital.
            </p>
            <div className="flex gap-8 mb-12 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl w-full max-w-xl justify-center">
               <div className="text-center"><p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Ponto de Falha</p><p className="text-cyan-400 font-mono font-bold text-2xl">{distance.toLocaleString()} <span className="text-xs text-slate-500">LY</span></p></div>
               <div className="w-px bg-slate-700"></div>
               <div className="text-center"><p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Taxa de Eficiência</p><p className="text-purple-400 font-mono font-bold text-2xl">{(3.0 + (cargoLevel * 0.5)).toFixed(1)}x</p></div>
            </div>
            <button onClick={restartGame} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-4 px-12 rounded-lg border border-slate-600 uppercase tracking-[0.2em] transition-colors">Reiniciar Simulação</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isManualOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsManualOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[95] pointer-events-auto" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute top-0 bottom-0 left-0 w-full md:w-[500px] bg-slate-900/95 border-r-2 border-indigo-500/50 flex flex-col z-[100] shadow-[0_0_80px_rgba(79,70,229,0.4)] pointer-events-auto">
              <div className="p-6 border-b-2 border-indigo-900/50 flex items-center justify-between bg-slate-950">
                <h2 className="text-indigo-400 font-black uppercase tracking-widest text-xl flex items-center gap-3"><BookOpen size={24}/> {t.manual}</h2>
                <button onClick={() => setIsManualOpen(false)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl transition-colors hover:bg-red-900"><X size={24}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                {MANUAL_CONTENT[lang].map((item, idx) => (
                  <div key={idx} className={`bg-slate-800/50 p-5 rounded-2xl border-2 shadow-lg ${idx === 2 || idx === 3 ? 'border-red-500/50 bg-red-950/20' : 'border-slate-700/50'}`}>
                    <div className="flex items-center gap-4 mb-3"><div className="p-3 bg-slate-900 rounded-xl shadow-inner border border-slate-800">{item.icon}</div><h3 className={`font-black text-base tracking-[0.1em] uppercase ${idx === 2 || idx === 3 ? 'text-red-400' : 'text-slate-200'}`}>{item.title}</h3></div>
                    <p className="text-slate-400 text-sm leading-relaxed font-mono bg-black/20 p-3 rounded-lg">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* BALÃO DE TUTORIAL FLUTUANTE */}
      <AnimatePresence>
        {tutorialStep < 11 && !gameOver && !hasWon && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute bottom-6 left-6 z-[80] flex items-end gap-3 pointer-events-none">
            <div className="w-12 h-12 bg-slate-900 border-2 border-cyan-500/80 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(8,145,178,0.5)] relative">
              <Bot size={24} className="text-cyan-400" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
            </div>
            
            <div className="relative bg-slate-900/95 border border-cyan-700/50 p-3.5 rounded-2xl rounded-bl-none shadow-2xl max-w-sm pointer-events-auto backdrop-blur-md">
              <div className="absolute -left-2 bottom-0 w-0 h-0 border-r-[10px] border-r-cyan-700/50 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent" />
              <div className="absolute -left-[7px] bottom-[1px] w-0 h-0 border-r-[9px] border-r-slate-900/95 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent" />
              
              <h4 className="text-cyan-500 font-black text-[9px] uppercase tracking-widest mb-1">L.U.M.I. System</h4>
              <p className="text-slate-200 font-mono text-xs md:text-sm leading-relaxed">{displayedText}{isLumiTyping && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}