// src/pages/Exploration/index.tsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Pickaxe, Droplets, Radar, Settings, ShoppingCart, BookOpen, Flame, AlertTriangle, HeartPulse, Wrench, Wind, BatteryCharging, Shield, Rocket, Activity, Info, X, Mountain, FastForward, Zap, Star, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DICTIONARY, MANUAL_CONTENT, GAME_EVENTS, PLANETS, TARGET_DISTANCE } from './constants';
import { IndicatorItem, ShopModal, LogbookModal } from './components/UI';

// ==========================================
// CONFIGURAÇÕES DO JOGO 
// ==========================================
const GAME_CONFIG = {
  // Meteor Madness (Tempestade de Meteoros)
  madnessCheckInterval: 8000,      // Tempo entre cada teste de Madness (em ms)
  madnessBaseChance: 0.12,         // Chance inicial (12%)
  madnessMaxBonusChance: 0.28,     // Bônus máximo somado no fim da viagem (12% + 28% = 40%)
  madnessDuration: 15000,          // Quanto tempo dura o evento Madness (em ms)
  madnessSpawnInterval: 120,       // Quão rápido os itens caem DURANTE o Madness (menor = mais rápido)

  // Spawn Normal (Viagem Comum)
  baseSpawnInterval: 1000,         // Velocidade de queda normal (1.0s)
  hyperdriveSpawnInterval: 700,    // Velocidade de queda no Hyperdrive
  
  // Chances de Itens DURANTE O METEOR MADNESS (Apenas perigos)
  madnessHazardRatio: {
    meteor: 0.85, // 85% pedra gigante
    hazard: 0.15  // 15% fogo
  },

  // Chances de Perigos (Pedra Gigante e Fogo) NA VIAGEM NORMAL
  normalDangerBaseChance: 0.20,    // 20% no início
  normalDangerMaxBonus: 0.35,      // +35% no final (Total 55% no fim)
  
  // Se for cair um perigo, qual a chance de ser Fogo ou Pedra?
  dangerRatio: {
    meteor: 0.50, // 50% Pedra gigante
    hazard: 0.50  // 50% Fogo vermelho
  },

  // Se NÃO for perigo, quais as chances dos recursos bons caírem? (soma = 1.0)
  resourceChances: {
    he3: 0.04,     // 4% Nitro Roxo (> 0.96)
    star: 0.10,    // 10% Bateria (> 0.86)
    parts: 0.20,   // 20% Peças Laranja (> 0.66)
    ice: 0.16,     // 16% Gelo Azul (> 0.50)
    regolith: 0.50 // 50% Pedra Cinza (O resto)
  }
};
// ==========================================

type Lang = 'en' | 'pt';

interface Anomaly { id: number; startX: number; duration: number; type: 'regolith' | 'ice' | 'parts' | 'he3' | 'hazard' | 'meteor' | 'star'; size: 'sm' | 'md' | 'lg'; createdAt: number; expiresAt: number; }
interface FloatingText { id: number; x: number; y: number; text: string; color: string; }
interface Projectile { id: number; x: number; y: number; }
interface Explosion { id: number; x: number; y: number; color: string; }

export default function Exploration() {
  const navigate = useNavigate();
  const [localLang, setLocalLang] = useState<Lang>('pt');
  const globalLangStore = useGameStore(state => state.language);
  const setGlobalLang = useGameStore(state => state.setLanguage);
  
  const lang = (globalLangStore || localLang) as Lang;
  const changeLang = (l: Lang) => { if (setGlobalLang) setGlobalLang(l); setLocalLang(l); };

  const { regolith, ice, parts } = useGameStore(state => state.inventory);
  const { laserLevel, radarLevel, droneLevel, cargoLevel, shieldLevel, engineLevel, armorLevel, coreLevel, scoopLevel, turretLevel, unlockedEvents, unlockEvent } = useGameStore(state => state);
  const { collectResource, updateIndicator } = useGameStore(state => state);

  const indicatorsStore = useGameStore(state => state.indicators) || { o2: 100, water: 100, energy: 100 };
  const o2 = indicatorsStore.o2 ?? 100;
  const water = indicatorsStore.water ?? 100;
  const energy = indicatorsStore.energy ?? 100;

  const [shipHealth, setShipHealth] = useState(100); 
  const t = DICTIONARY[lang];
  const [tutorialStep, setTutorialStep] = useState(1); 
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [combo, setCombo] = useState(1.0);
  const [nitroActive, setNitroActive] = useState(false);
  const nitroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [eventTimeLeft, setEventTimeLeft] = useState(30); 
  const [eventResolution, setEventResolution] = useState<{ text: string, hpMod: number, costType: string, cost: number } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isLogbookOpen, setIsLogbookOpen] = useState(false);
  
  const [distance, setDistance] = useState(0);
  const distanceRef = useRef(distance); 
  const anomaliesRef = useRef<Anomaly[]>([]);
  useEffect(() => { anomaliesRef.current = anomalies; }, [anomalies]);

  const [shakeScreen, setShakeScreen] = useState(false);
  const [setTurretFlash] = useState(false);
  const [meteorMadness, setMeteorMadness] = useState(false);
  const meteorMadnessTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const eventTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isMenuOpen = isShopOpen || isManualOpen || isLogbookOpen;
  const isEventActive = activeEvent !== null || eventResolution !== null;
  const isEndState = gameOver || hasWon;
  const isTutorialPhase = tutorialStep < 19;
  const canMoveAndShoot = !isMenuOpen && !isEventActive && !isEndState;
  const canDrainAndTravel = !isMenuOpen && !isEventActive && !isEndState && !isTutorialPhase;

  const [displayedText, setDisplayedText] = useState("");
  const [isLumiTyping, setIsLumiTyping] = useState(false);

  const shipRef = useRef<HTMLDivElement>(null);
  const shipPos = useRef({ x: 50, y: 85 });
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const keys = useRef({ w: false, a: false, s: false, d: false });

  const shipScale = 1 + (armorLevel * 0.08) + (cargoLevel * 0.05); 
  const shipScaleRef = useRef(shipScale);
  const diff = Math.min(1, distance / TARGET_DISTANCE);
  
  useEffect(() => { projectilesRef.current = projectiles; }, [projectiles]);
  useEffect(() => { shipScaleRef.current = shipScale; }, [shipScale]);
  useEffect(() => { distanceRef.current = distance; }, [distance]);

  useEffect(() => {
    setShipHealth(100); 
    setDistance(0); 
    setCombo(1.0);
    useGameStore.setState(s => ({ indicators: { ...s.indicators, o2: 100, water: 100, energy: 100 } }));
  }, []);

  const isHyperdrive = combo >= 3.0 || engineLevel > 2; 
  const isWarpSpeed = isHyperdrive || nitroActive;

  const triggerScreenShake = useCallback(() => { 
    setShakeScreen(true); 
    setTimeout(() => setShakeScreen(false), 500); 
  }, []);

  const spawnFloatingText = useCallback((x: number, y: number, text: string, color: string) => {
    const newText = { id: Date.now() + Math.random(), x, y, text, color };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(item => item.id !== newText.id)), 1200);
  }, []);

  const spawnExplosion = useCallback((x: number, y: number, color: string) => {
    const newExp = { id: Date.now() + Math.random(), x, y, color };
    setExplosions(prev => [...prev, newExp]);
    setTimeout(() => setExplosions(prev => prev.filter(item => item.id !== newExp.id)), 500);
  }, []);

  const resetAllResources = useCallback(() => {
  useGameStore.setState({
    inventory: { regolith: 0, ice: 0, parts: 0 },
    indicators: { o2: 100, water: 100, food: 100, energy: 100, shield: 100 },
    laserLevel: 1, radarLevel: 1, cargoLevel: 1, engineLevel: 1, coreLevel: 1,
    droneLevel: 0, shieldLevel: 0, armorLevel: 0, scoopLevel: 0, turretLevel: 0
  });
}, []);

  const finishTutorial = useCallback(() => {
    resetAllResources();
    setShipHealth(100); 
    setAnomalies([]); 
    setProjectiles([]);
    setTutorialStep(19); 
  }, [resetAllResources]);

  const handleScan = () => {
    if (tutorialStep === 1) {
      setTutorialStep(2);
      setTimeout(() => setTutorialStep(3), 300);
    }
  };

  const repairCostReg = 10 + Math.floor(diff * 50); 
  const repairCostPts = 5 + Math.floor(diff * 30);  
  const canRepair = regolith >= repairCostReg && parts >= repairCostPts && shipHealth < 100 && canDrainAndTravel;

  const handleRepair = useCallback(() => {
    if (canRepair) {
      collectResource('regolith', -repairCostReg); 
      collectResource('parts', -repairCostPts);
      setShipHealth(prev => Math.min(100, prev + 30)); 
      spawnFloatingText(shipPos.current.x, shipPos.current.y, "+30 HP", "text-teal-400");
    } else {
      spawnFloatingText(shipPos.current.x, shipPos.current.y, t.insufficientResources, "text-red-500");
    }
  }, [canRepair, repairCostReg, repairCostPts, collectResource, spawnFloatingText, t]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['w', 'W', 'ArrowUp'].includes(e.key)) keys.current.w = true;
      if (['a', 'A', 'ArrowLeft'].includes(e.key)) keys.current.a = true;
      if (['s', 'S', 'ArrowDown'].includes(e.key)) keys.current.s = true;
      if (['d', 'D', 'ArrowRight'].includes(e.key)) keys.current.d = true;
      
      if (e.code === 'Space' && canMoveAndShoot) {
         e.preventDefault();
         const currentEnergy = useGameStore.getState().indicators?.energy ?? 0;
         
         if (currentEnergy > 1 || isTutorialPhase) { 
             setProjectiles(prev => [...prev, { id: Date.now(), x: shipPos.current.x, y: shipPos.current.y - 5 }]);
             if (!isTutorialPhase) useGameStore.getState().updateIndicator('energy', -2); 
         } else {
             spawnFloatingText(shipPos.current.x, shipPos.current.y, t.noEnergy, "text-red-500");
         }
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['w', 'W', 'ArrowUp'].includes(e.key)) keys.current.w = false;
      if (['a', 'A', 'ArrowLeft'].includes(e.key)) keys.current.a = false;
      if (['s', 'S', 'ArrowDown'].includes(e.key)) keys.current.s = false;
      if (['d', 'D', 'ArrowRight'].includes(e.key)) keys.current.d = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); }
  }, [canMoveAndShoot, isTutorialPhase, spawnFloatingText, t]); 

  const handleCollectInternal = useCallback((anomaly: Anomaly, cx: number, cy: number, isHitByShip: boolean) => {
    let expColor = 'slate';
    if (anomaly.type === 'meteor') expColor = 'stone';
    else if (anomaly.type === 'hazard') expColor = 'red';
    else if (anomaly.type === 'he3') expColor = 'purple';
    else if (anomaly.type === 'parts') expColor = 'orange';
    else if (anomaly.type === 'ice') expColor = 'blue';
    else if (anomaly.type === 'star') expColor = 'yellow';
    spawnExplosion(cx, cy, expColor);

    if (anomaly.type === 'hazard' || anomaly.type === 'meteor') {
      if (isTutorialPhase) {
          spawnFloatingText(cx, cy, t.destroyed, 'text-slate-400');
          if (tutorialStep === 8 && anomaly.type === 'meteor') setTutorialStep(9);
          if (tutorialStep === 9 && anomaly.type === 'hazard') setTutorialStep(10);
          return;
      }

      if (isHitByShip) {
        collectResource('regolith', -Math.max(10, Math.floor(useGameStore.getState().inventory.regolith * 0.1))); 
        collectResource('ice', -Math.max(10, Math.floor(useGameStore.getState().inventory.ice * 0.1)));
        
        setCombo(1.0);
        const baseDamage = anomaly.type === 'meteor' ? 15 : 25;
        const scaledDamage = Math.floor(baseDamage * (1 + (distanceRef.current / TARGET_DISTANCE)));
        
        setShipHealth(h => Math.max(0, h - scaledDamage)); 
        triggerScreenShake();
        spawnFloatingText(cx, cy, t.hazardHit, 'text-red-500');

        const eventChance = anomaly.type === 'meteor' ? 0.30 : 0.60;
        if (Math.random() < eventChance) {
            setTimeout(() => {
                const randEvent = GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
                setActiveEvent(randEvent);
                setEventTimeLeft(30);
                spawnFloatingText(cx, cy - 10, t.structuralFailure, 'text-orange-500');
            }, 100);
        } else {
            setTimeout(() => {
                spawnFloatingText(cx, cy - 10, t.systemStabilized, 'text-teal-400');
            }, 100);
        }
      } else {
        spawnFloatingText(cx, cy, t.destroyed, 'text-slate-400');
        if (anomaly.type === 'meteor') {
            collectResource('regolith', 5); 
            spawnFloatingText(cx, cy + 5, "+5", 'text-slate-300');
        }
      }
      return;
    }

    if (tutorialStep === 3 && anomaly.type === 'regolith') setTutorialStep(4);
    if (tutorialStep === 4 && anomaly.type === 'ice') setTutorialStep(5);
    if (tutorialStep === 5 && anomaly.type === 'parts') setTutorialStep(6);
    if (tutorialStep === 6 && anomaly.type === 'star') setTutorialStep(7);
    if (tutorialStep === 7 && anomaly.type === 'he3') setTutorialStep(8);
    
    if (isTutorialPhase) {
        spawnFloatingText(cx, cy, t.collected, 'text-slate-300');
        return; 
    }

    let currentCombo = combo;
    if (anomaly.type !== 'he3' && anomaly.type !== 'star') {
      const maxCombo = 3.0 + (cargoLevel * 0.5);
      currentCombo = Math.min(maxCombo, currentCombo + 0.2);
      setCombo(currentCombo);
      if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
      comboTimeoutRef.current = setTimeout(() => setCombo(1.0), 1500); 
    }

    const sizeMultiplier = anomaly.size === 'sm' ? 2.5 : anomaly.size === 'lg' ? 0.3 : 1.0;
    const baseAmount = anomaly.type === 'he3' ? 100 : anomaly.type === 'parts' ? 6 : anomaly.type === 'star' ? 40 : anomaly.type === 'ice' ? 15 : 20; 
    const multi = (1 + (laserLevel * 0.2)) * (1 + (coreLevel * 0.15)) * (isHyperdrive ? currentCombo * 1.5 : currentCombo) * sizeMultiplier;
    const finalAmount = Math.max(1, Math.floor(baseAmount * multi) + (scoopLevel * 3));

    if (anomaly.type === 'star') {
        updateIndicator('energy', finalAmount);
        spawnFloatingText(cx, cy, t.batteryPlus, 'text-yellow-400');
    } else if (anomaly.type === 'ice') {
        collectResource('ice', finalAmount); 
        updateIndicator('o2', finalAmount * 1.2);
        updateIndicator('water', finalAmount * 1.2);
        spawnFloatingText(cx, cy, `+${finalAmount} H2O/O2`, 'text-blue-300');
    } else if (anomaly.type === 'he3') { 
        collectResource('regolith', finalAmount); 
        collectResource('ice', finalAmount); 
        collectResource('parts', 15); 
        setNitroActive(true);
        if (nitroTimerRef.current) clearTimeout(nitroTimerRef.current);
        nitroTimerRef.current = setTimeout(() => setNitroActive(false), 4000);
        spawnFloatingText(cx, cy, t.nitroActive, 'text-fuchsia-400');
    } else { 
        collectResource(anomaly.type, finalAmount); 
        const color = anomaly.type === 'parts' ? 'text-orange-400' : 'text-slate-300';
        spawnFloatingText(cx, cy, `+${finalAmount}`, color);
    }
  }, [collectResource, updateIndicator, combo, laserLevel, cargoLevel, coreLevel, scoopLevel, tutorialStep, isTutorialPhase, isHyperdrive, t, triggerScreenShake, spawnFloatingText, spawnExplosion]);

  const handleCollectRef = useRef(handleCollectInternal);
  useEffect(() => { handleCollectRef.current = handleCollectInternal; }, [handleCollectInternal]);

  useEffect(() => {
    if (!canMoveAndShoot) return;
    
    let animationFrameId: number;
    let lastTime = performance.now(); 

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      let dx = 0; let dy = 0;
      const baseShipSpeed = 0.035 + (engineLevel * 0.015); 
      const speed = baseShipSpeed * (nitroActive ? 2.5 : 1) * dt; 
      
      if (keys.current.w) dy -= speed;
      if (keys.current.s) dy += speed;
      if (keys.current.a) dx -= speed;
      if (keys.current.d) dx += speed;

      if (dx !== 0 || dy !== 0) {
         shipPos.current.x = Math.max(5, Math.min(95, shipPos.current.x + dx));
         shipPos.current.y = Math.max(15, Math.min(90, shipPos.current.y + dy));
         if (shipRef.current) {
            shipRef.current.style.left = `${shipPos.current.x}%`;
            shipRef.current.style.top = `${shipPos.current.y}%`;
            shipRef.current.style.transform = `translate(-50%, -50%) scale(${shipScaleRef.current})`;
         }
      }

      if (projectilesRef.current.length > 0) {
         let needsCleanup = false;
         projectilesRef.current.forEach(p => {
             p.y -= (0.15 + (laserLevel * 0.03)) * dt;
             const el = document.getElementById(`proj-${p.id}`);
             if (el) el.style.top = `${p.y}%`;
             if (p.y < -5) needsCleanup = true;
         });
         if (needsCleanup) setProjectiles(prev => prev.filter(p => p.y >= -5));
      }

      const now = Date.now();
      const hitProjectiles = new Set<number>();
      const toCollect: { anom: Anomaly, cx: number, cy: number, byShip: boolean }[] = [];
      let hasChanges = false;

      const nextAnomalies = anomaliesRef.current.filter(anom => {
         const progress = (now - anom.createdAt) / (anom.duration * 1000);
         let currentY = -30 + (progress * 150); 
         
         if (isTutorialPhase && tutorialStep >= 3 && tutorialStep <= 10) {
            currentY = Math.min(currentY, 35); 
         }
         
         const el = document.getElementById(`anom-${anom.id}`);
         if (el) {
             el.style.top = `${currentY}%`;
         }

         const currentX = anom.startX;

         let hitProj = false;
         for (let p of projectilesRef.current) {
            const hitBoxRange = 5 + (laserLevel * 0.5);
            if (!hitProjectiles.has(p.id) && Math.hypot(currentX - p.x, currentY - p.y) < hitBoxRange) {
                hitProj = true;
                hitProjectiles.add(p.id);
                toCollect.push({ anom, cx: currentX, cy: currentY, byShip: false });
                break;
            }
         }
         if (hitProj) { hasChanges = true; return false; }

         const hitRadius = 7 * shipScaleRef.current;
         if (Math.hypot(currentX - shipPos.current.x, currentY - shipPos.current.y) < hitRadius) {
             toCollect.push({ anom, cx: currentX, cy: currentY, byShip: true });
             hasChanges = true;
             return false;
         }
         
         if (currentY > 120 && !(isTutorialPhase && currentY === 35)) {
           hasChanges = true;
           return false;
         }

         return true; 
      });

      if (hasChanges) {
         if (hitProjectiles.size > 0) setProjectiles(prev => prev.filter(p => !hitProjectiles.has(p.id)));
         toCollect.forEach(c => handleCollectRef.current(c.anom, c.cx, c.cy, c.byShip));
         setAnomalies(nextAnomalies); 
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [canMoveAndShoot, isTutorialPhase, tutorialStep, engineLevel, laserLevel, nitroActive]);

  useEffect(() => {
    if (!canDrainAndTravel) return;
    const drainTimer = setInterval(() => { 
      updateIndicator('o2', -1); updateIndicator('water', -1); updateIndicator('energy', -1); 
    }, 600); 
    
    const penaltyTimer = setInterval(() => {
      const currentO2 = useGameStore.getState().indicators?.o2 ?? 100;
      if (currentO2 <= 0) { setShipHealth(h => Math.max(0, h - 5)); triggerScreenShake(); }
    }, 1000);
    return () => { clearInterval(drainTimer); clearInterval(penaltyTimer); };
  }, [canDrainAndTravel, triggerScreenShake, updateIndicator]);

  useEffect(() => {
    if (shipHealth <= 0 && !gameOver && !hasWon) { 
      setGameOver(true); setActiveEvent(null); setEventResolution(null); setMeteorMadness(false);
      if (eventTimerRef.current) clearInterval(eventTimerRef.current); 
    }
    if (distance >= TARGET_DISTANCE && !hasWon) { 
      setHasWon(true); setActiveEvent(null); setEventResolution(null); setAnomalies([]); setMeteorMadness(false);
      if (eventTimerRef.current) clearInterval(eventTimerRef.current); 
    }
  }, [shipHealth, gameOver, distance, hasWon]);

  useEffect(() => {
    if (!hasWon || gameOver) return;
    const transitionTimer = window.setTimeout(() => { navigate('/base-builder'); }, 6000); 
    return () => window.clearTimeout(transitionTimer);
  }, [hasWon, gameOver, navigate]);

  const restartGame = () => {
    resetAllResources();
    setShipHealth(100); setDistance(0); setCombo(1.0); setAnomalies([]); setTutorialStep(19); setGameOver(false); setMeteorMadness(false);
  };

  useEffect(() => {
    if (!canDrainAndTravel) return;
    const distTimer = setInterval(() => { 
      const currentEnergy = useGameStore.getState().indicators?.energy ?? 100;
      const speedMultiplier = currentEnergy <= 0 ? 0.4 : 1.0; 
      setDistance(prev => Math.min(TARGET_DISTANCE, prev + ((isHyperdrive ? 25 * engineLevel : 6 * engineLevel) * speedMultiplier * (nitroActive ? 4 : 1)))); 
    }, 100);
    return () => clearInterval(distTimer);
  }, [canDrainAndTravel, isHyperdrive, engineLevel, nitroActive]);

  useEffect(() => {
    if (!canDrainAndTravel) return;
    const madnessInterval = setInterval(() => {
        const currentDiff = Math.min(1, distanceRef.current / TARGET_DISTANCE);
        const madnessChance = GAME_CONFIG.madnessBaseChance + (currentDiff * GAME_CONFIG.madnessMaxBonusChance); 

        if (Math.random() < madnessChance && !meteorMadness) {
            setMeteorMadness(true);
            spawnFloatingText(50, 20, lang === 'pt' ? "REGIÃO INFESTADA DE METEOROS!" : "METEOR INFESTED REGION!", "text-red-500 text-3xl font-black");
            if (meteorMadnessTimer.current) clearTimeout(meteorMadnessTimer.current);
            meteorMadnessTimer.current = setTimeout(() => { setMeteorMadness(false); }, GAME_CONFIG.madnessDuration); 
        }
    }, GAME_CONFIG.madnessCheckInterval); 
    return () => clearInterval(madnessInterval);
  }, [canDrainAndTravel, meteorMadness, lang, spawnFloatingText]);

  useEffect(() => {
    if (isEventActive) return;
    if (tutorialStep >= 3 && tutorialStep <= 10 && anomalies.length === 0) {
      let type: Anomaly['type'] = 'regolith';
      if (tutorialStep === 4) type = 'ice';
      if (tutorialStep === 5) type = 'parts';
      if (tutorialStep === 6) type = 'star';
      if (tutorialStep === 7) type = 'he3';
      if (tutorialStep === 8) type = 'meteor';
      if (tutorialStep === 9) type = 'hazard';
      setAnomalies([{ id: Date.now(), startX: 50, type, duration: 3, size: 'md', createdAt: Date.now(), expiresAt: Date.now() + 25000 }]);
    }
  }, [tutorialStep, anomalies.length, isEventActive]);

  useEffect(() => {
    if (tutorialStep < 19) return; 
    if (!canMoveAndShoot || isEventActive) return; 
    
    const intervalTime = meteorMadness ? GAME_CONFIG.madnessSpawnInterval : (isHyperdrive ? GAME_CONFIG.hyperdriveSpawnInterval : GAME_CONFIG.baseSpawnInterval);
    const spawnInterval = setInterval(() => {
      const numToSpawn = radarLevel > 2 ? (Math.random() > 0.3 ? 3 : 2) : (Math.random() > 0.8 ? 3 : 2); 
      const newAnomalies: Anomaly[] = [];
      const now = Date.now();
      
      const currentDiff = Math.min(1, distanceRef.current / TARGET_DISTANCE);
      
      for (let i = 0; i < numToSpawn; i++) {
        const rand = Math.random();
        let type: Anomaly['type'] = 'regolith';
        
        if (meteorMadness) {
            type = Math.random() < GAME_CONFIG.madnessHazardRatio.meteor ? 'meteor' : 'hazard';
        } else {
            const dangerChance = GAME_CONFIG.normalDangerBaseChance + (currentDiff * GAME_CONFIG.normalDangerMaxBonus); 
            
            if (rand < dangerChance) {
                type = Math.random() < GAME_CONFIG.dangerRatio.meteor ? 'meteor' : 'hazard';
            } else {
                const randType = Math.random();
                if (randType > (1 - GAME_CONFIG.resourceChances.he3)) type = 'he3';
                else if (randType > (1 - GAME_CONFIG.resourceChances.he3 - GAME_CONFIG.resourceChances.star)) type = 'star';
                else if (randType > (1 - GAME_CONFIG.resourceChances.he3 - GAME_CONFIG.resourceChances.star - GAME_CONFIG.resourceChances.parts)) type = 'parts';
                else if (randType > (GAME_CONFIG.resourceChances.regolith)) type = 'ice'; 
                else type = 'regolith';
            }
        }

        const sizeRand = Math.random();
        const size = sizeRand < 0.20 ? 'sm' : sizeRand > 0.80 ? 'lg' : 'md';
        const startX = 5 + Math.random() * 90; 
        const speedFactor = 1 - (currentDiff * 0.30) - (engineLevel * 0.05);
        const baseDur = (size === 'sm' ? 1.5 : size === 'lg' ? 4.5 : 3.0) * speedFactor; 
        const duration = isHyperdrive ? baseDur * 0.7 : baseDur;
        
        newAnomalies.push({ id: now + Math.random(), type, startX, duration, size, createdAt: now, expiresAt: now + (duration * 1000) });
      }
      setAnomalies(prev => [...prev, ...newAnomalies]);
    }, intervalTime); 
    
    return () => clearInterval(spawnInterval);
  }, [tutorialStep, canMoveAndShoot, isEventActive, radarLevel, isHyperdrive, meteorMadness, engineLevel]);

  useEffect(() => {
    let msg = "";
    if (hasWon) {
        msg = t.arrival;
    } else { 
        const messages = [ 
          "", t.tut1, t.tut2, t.tut3, t.tut4, t.tut5, t.tut6, t.tut7, t.tut8, t.tut9, t.tut10, t.tut11, t.tut12, t.tut13, t.tut14, t.tut15, t.tut16, t.tut17, t.tut18, "" 
        ]; 
        msg = messages[tutorialStep] || ""; 
    }
    
    if (typingRef.current) clearInterval(typingRef.current);
    let i = 0; 
    setDisplayedText(""); 
    setIsLumiTyping(true);
    
    if(!isTutorialPhase && !hasWon) { 
      setIsLumiTyping(false); 
      return; 
    }
    
    typingRef.current = setInterval(() => {
      if (i < msg.length) { 
        setDisplayedText(msg.slice(0, i + 1)); 
        i++; 
      } else { 
        clearInterval(typingRef.current!); 
        setIsLumiTyping(false); 
      }
    }, 20);
    
    return () => { if (typingRef.current) clearInterval(typingRef.current); };
  }, [tutorialStep, t, hasWon, lang, isTutorialPhase]);

  useEffect(() => {
    if (tutorialStep === 10) { const t = setTimeout(() => setTutorialStep(11), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 11) { const t = setTimeout(() => setTutorialStep(12), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 12) { const t = setTimeout(() => setTutorialStep(13), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 13) { const t = setTimeout(() => setTutorialStep(14), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 14) { const t = setTimeout(() => setTutorialStep(15), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 15) { const t = setTimeout(() => setTutorialStep(16), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 16) { const t = setTimeout(() => setTutorialStep(17), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 17) { const t = setTimeout(() => setTutorialStep(18), 6000); return () => clearTimeout(t); }
    if (tutorialStep === 19) { finishTutorial(); }
  }, [tutorialStep, finishTutorial]);

  useEffect(() => {
    if (droneLevel > 0 && canDrainAndTravel) {
      const droneTimer = setInterval(() => {
        collectResource('regolith', droneLevel * 5); 
        collectResource('ice', droneLevel * 3);
        spawnFloatingText(shipPos.current.x, shipPos.current.y, `${t.dronesPlus} +${droneLevel*5}`, 'text-slate-400');
      }, 3000);
      return () => clearInterval(droneTimer);
    }
  }, [droneLevel, canDrainAndTravel, collectResource, spawnFloatingText, t]);

  useEffect(() => {
    if (!canDrainAndTravel || meteorMadness) return;
    const currentDiff = Math.min(1, distanceRef.current / TARGET_DISTANCE);
    
    const minTime = 20000 - (currentDiff * 10000); 
    const maxTime = 15000 - (currentDiff * 5000); 
    const timeToNextEvent = minTime + Math.random() * maxTime; 
    
    const eventTimer = setTimeout(() => {
      const randomEventChance = Math.random() < 0.05;
      
      if (shieldLevel > 0 && Math.random() < 0.3 && !randomEventChance) {
         spawnFloatingText(shipPos.current.x, shipPos.current.y, "ESCUDO BLOQUEOU AMEAÇA!", 'text-cyan-400');
      } else if (randomEventChance) {
         const randEvent = GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
         setActiveEvent(randEvent);
         setEventTimeLeft(30); 
      }
    }, timeToNextEvent);
    return () => clearTimeout(eventTimer);
  }, [canDrainAndTravel, shieldLevel, spawnFloatingText, meteorMadness, distance]);

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

  const handleEventChoice = (option: any, isTimeout: boolean = false) => {
    if (eventTimerRef.current) clearInterval(eventTimerRef.current); 
    
    if (activeEvent && activeEvent.id) {
        unlockEvent(activeEvent.id);
    }

    const currentInventory = useGameStore.getState().inventory;
    const reqCost = option.cost;
    const hasEnough = option.costType === 'none' ? true : currentInventory[option.costType as keyof typeof currentInventory] >= reqCost;
    
    if (option.costType !== 'none' && hasEnough) { collectResource(option.costType as any, -reqCost); }
    let finalHpMod = option.hpMod;
    if (finalHpMod < 0 && armorLevel > 0) { finalHpMod = Math.min(0, finalHpMod + (armorLevel * 8)); }
    setShipHealth(prev => Math.max(0, prev + finalHpMod));
    if (finalHpMod < 0) triggerScreenShake();

    let resolutionText = option.outcome[lang];
    if (isTimeout) resolutionText = `${t.eventTimeout} ${resolutionText}`;

    setEventResolution({ text: resolutionText, hpMod: finalHpMod, costType: option.costType, cost: option.cost });
    setActiveEvent(null);
  };

  const getResourceName = (type: string) => {
    if (type === 'ice') return 'H2O / O2';
    if (type === 'parts') return 'Peças';
    if (type === 'regolith') return 'Pedras';
    return type;
  };

  const [stars] = useState(() => Array.from({ length: 80 }).map(() => ({ id: Math.random(), x: Math.random() * 100, baseDuration: 1.5 + Math.random() * 3, delay: Math.random() * -5, size: Math.random() > 0.9 ? 3 : 1 })));

  const thrusterColorOuter = nitroActive ? 'bg-fuchsia-500 shadow-[0_0_30px_fuchsia]' : engineLevel >= 5 ? 'bg-purple-500 shadow-[0_0_20px_purple]' : engineLevel >= 3 ? 'bg-cyan-400 shadow-[0_0_20px_cyan]' : 'bg-orange-500 shadow-[0_0_15px_orange]';
  const thrusterColorInner = nitroActive ? 'bg-white shadow-[0_0_40px_white]' : engineLevel >= 5 ? 'bg-fuchsia-300 shadow-[0_0_30px_fuchsia]' : engineLevel >= 3 ? 'bg-cyan-200 shadow-[0_0_30px_white]' : 'bg-yellow-400 shadow-[0_0_20px_yellow]';
  const thrusterH1 = nitroActive ? 100 : (isHyperdrive ? 50 + engineLevel*10 : 20 + engineLevel*5);
  const thrusterH2 = nitroActive ? 130 : (isHyperdrive ? 80 + engineLevel*15 : 35 + engineLevel*8);
  const projectileWidth = 1.5 + (laserLevel * 0.8);
  const shieldGlow = shieldLevel * 15;

  return (
    <motion.div animate={shakeScreen ? { x: [-20, 20, -20, 20, 0], filter: 'brightness(1.5)' } : { filter: 'brightness(1)' }} transition={{ duration: 0.5 }} className={`h-screen w-screen bg-[#020617] relative overflow-hidden font-sans select-none flex flex-col transition-colors duration-1000 ${isWarpSpeed && !gameOver && !hasWon ? 'bg-indigo-950/40' : meteorMadness ? 'bg-red-950/30' : ''}`}>
      
      <AnimatePresence>
        {shipHealth <= 20 && !gameOver && !hasWon && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 border-[12px] border-red-600/50 bg-red-900/10 pointer-events-none z-[190] animate-pulse" />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        {stars.map((star) => (
          <motion.div key={star.id} initial={{ y: '-10vh', x: `${star.x}vw` }} animate={{ y: '110vh' }} transition={{ duration: isWarpSpeed ? star.baseDuration * 0.2 : star.baseDuration, repeat: Infinity, ease: 'linear', delay: star.delay }} className={`absolute rounded-full ${isWarpSpeed ? 'bg-cyan-200 shadow-[0_0_15px_cyan]' : 'bg-slate-200 shadow-[0_0_5px_white]'}`} style={{ width: star.size, height: isWarpSpeed ? star.size * 15 : star.size * 3, opacity: star.size > 2 ? 0.9 : 0.6 }} />
        ))}
        {PLANETS.map((planet) => (
          <motion.div key={planet.id} initial={{ y: '-50vh', rotate: 0 }} animate={{ y: '120vh', rotate: 15 }} transition={{ duration: isWarpSpeed ? planet.duration * 0.5 : planet.duration, repeat: Infinity, ease: 'linear', delay: planet.delay }} style={{ left: planet.x }} className={`absolute top-0 rounded-full bg-gradient-to-bl ${planet.color} ${planet.size} blur-[3px] opacity-60 shadow-[inset_-40px_-40px_80px_rgba(0,0,0,0.9)]`} />
        ))}
      </div>

      <AnimatePresence>
        {tutorialStep === 1 && !isLumiTyping && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} onClick={handleScan} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] flex flex-col items-center gap-3 cursor-pointer pointer-events-auto">
            <div className="w-24 h-24 bg-cyan-950/90 border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(8,145,178,0.8)] hover:scale-105 transition-transform"><Radar size={40} className="text-cyan-300 animate-spin" /></div>
            <span className="text-cyan-300 font-bold tracking-widest bg-slate-900/90 px-6 py-2.5 rounded-lg border border-cyan-900 shadow-lg text-sm uppercase">{t.btnScan}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {isTutorialPhase && tutorialStep >= 3 && tutorialStep <= 10 && (
         <div className="absolute inset-0 bg-black/80 z-[45] pointer-events-none transition-opacity duration-1000" />
      )}
      
      {isTutorialPhase && tutorialStep === 17 && (
         <div className="absolute inset-0 bg-black/85 z-[140] pointer-events-none transition-opacity duration-500" />
      )}

      {isTutorialPhase && (
        <button onClick={finishTutorial} className="absolute bottom-6 right-6 z-[120] flex items-center gap-2 px-5 py-3 bg-cyan-950/90 hover:bg-cyan-900 text-cyan-300 text-xs font-black uppercase tracking-widest rounded-xl border border-cyan-500/50 backdrop-blur-md transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] cursor-pointer pointer-events-auto hover:scale-105">
           <FastForward size={16} /> {t.skipTutorial}
        </button>
      )}

      {/* ========================================== */}
      {/* HEADER CORRIGIDO (BARRAS NUNCA QUEBRAM) */}
      {/* ========================================== */}
      <header className="relative z-[150] flex flex-col md:flex-row gap-4 px-4 py-2 md:px-6 md:py-3 bg-slate-950/80 backdrop-blur-md border-b border-cyan-900/30 items-center justify-between shadow-xl pointer-events-auto">
        
        {/* Lado Esquerdo: Barras de Status (Isoladas e flex-nowrap) */}
        <div className="flex flex-nowrap items-center justify-start gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" style={{ scrollbarWidth: 'none' }}>
          
          <button onClick={handleRepair} disabled={!canRepair} className={`shrink-0 relative flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors group shadow-sm ${canRepair ? 'bg-teal-900/60 hover:bg-teal-800 border-teal-500/50 cursor-pointer shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-slate-900/50 border-slate-800/50 opacity-50 cursor-not-allowed'}`}>
            <Wrench size={14} className={canRepair ? "text-teal-300 group-hover:animate-bounce" : "text-slate-500"} />
            <div className="flex flex-col text-left leading-none">
              <span className={`text-[9px] font-black uppercase tracking-wider ${canRepair ? "text-teal-400" : "text-slate-500"}`}>{t.repair}</span>
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-300">
                <span className={regolith < repairCostReg ? "text-red-400" : ""}>-{repairCostReg} <Pickaxe size={8} className="inline text-slate-400"/></span>
                <span className={parts < repairCostPts ? "text-red-400" : ""}>-{repairCostPts} <Settings size={8} className="inline text-orange-400"/></span>
              </div>
            </div>
          </button>
          
          <div className="shrink-0"><IndicatorItem icon={HeartPulse} color="teal" value={shipHealth} label="HP" /></div>
          <div className="shrink-0"><IndicatorItem icon={Wind} color="cyan" value={o2} label="O2" /></div>
          <div className="shrink-0"><IndicatorItem icon={Droplets} color="blue" value={water} label="H2O" /></div>
          <div className="shrink-0"><IndicatorItem icon={BatteryCharging} color="yellow" value={energy} label="PWR" /></div>
        </div>

        {/* Lado Direito: Recursos, Distância e Botões */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
          
          {/* Inventário */}
          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-700/50 px-3 py-1.5 rounded-full shadow-inner shrink-0">
            <div className="flex items-center gap-1.5"><Pickaxe size={14} className="text-slate-400" /><span className="text-sm font-mono font-bold text-white">{regolith}</span></div>
            <div className="w-px h-4 bg-slate-700/50" />
            <div className="flex items-center gap-1.5"><Droplets size={14} className="text-blue-400" /><span className="text-sm font-mono font-bold text-white">{ice}</span></div>
            <div className="w-px h-4 bg-slate-700/50" />
            <div className="flex items-center gap-1.5"><Settings size={14} className="text-orange-400" /><span className="text-sm font-mono font-bold text-white">{parts}</span></div>
          </div>

          {!isTutorialPhase && (
            <div className="flex flex-col items-end shrink-0 px-2">
              <span className="text-[9px] text-cyan-500 font-black uppercase tracking-wider">{t.distanceTitle}</span>
              <span className="text-sm font-mono font-bold text-white drop-shadow-[0_0_5px_cyan]">{Math.floor(distance)} <span className="text-[10px] text-slate-500">/ {TARGET_DISTANCE}</span></span>
            </div>
          )}
          
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setIsLogbookOpen(true)} className="px-3 py-1.5 bg-blue-950/60 hover:bg-blue-900 text-blue-300 rounded-lg border border-blue-800/50 text-[10px] font-black uppercase flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(30,58,138,0.3)] cursor-pointer pointer-events-auto">
                <Archive size={14} /> <span className="hidden sm:inline">{t.logbook}</span>
            </button>

            <button onClick={() => setIsManualOpen(true)} className="p-2 bg-indigo-950/50 hover:bg-indigo-900/80 text-indigo-300 rounded-lg border border-indigo-800/50 transition-colors shadow-sm cursor-pointer pointer-events-auto"><BookOpen size={16} /></button>
            <button onClick={() => { setIsShopOpen(true); }} className={`px-3 py-1.5 bg-cyan-950/50 hover:bg-cyan-900/80 text-cyan-300 rounded-lg border border-cyan-800/50 text-[10px] font-black uppercase flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer pointer-events-auto ${tutorialStep === 17 ? 'animate-pulse ring-4 ring-cyan-400 shadow-[0_0_40px_cyan] relative z-[160]' : ''}`}><ShoppingCart size={14} /> <span className="hidden sm:inline">{t.upgrades}</span></button>
            
            <div className="flex bg-slate-900/80 border border-slate-700/50 rounded-lg overflow-hidden shadow-sm pointer-events-auto">
              <button onClick={() => changeLang('en')} className={`px-2 py-1.5 text-[9px] font-black transition-colors ${lang === 'en' ? 'bg-cyan-700 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>EN</button>
              <button onClick={() => changeLang('pt')} className={`px-2 py-1.5 text-[9px] font-black transition-colors ${lang === 'pt' ? 'bg-cyan-700 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>PT</button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative w-full h-full overflow-hidden block">
        <AnimatePresence>
          {explosions.map(exp => (
            <motion.div
              key={exp.id}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ left: `${exp.x}%`, top: `${exp.y}%`, position: 'absolute', transform: 'translate(-50%, -50%)' }}
              className={`w-16 h-16 rounded-full blur-md pointer-events-none z-[80] bg-${exp.color}-400 shadow-[0_0_30px_rgba(255,255,255,0.8)]`}
            />
          ))}
        </AnimatePresence>

        {projectiles.map(p => (
           <div key={p.id} id={`proj-${p.id}`} style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${projectileWidth}px`, position: 'absolute', transform: 'translate(-50%, -50%)' }} className={`h-8 rounded-full z-[65] pointer-events-none ${nitroActive ? 'bg-fuchsia-400 shadow-[0_0_15px_fuchsia]' : 'bg-cyan-400 shadow-[0_0_15px_cyan]'}`} />
        ))}

        <div ref={shipRef} style={{ left: `50%`, top: `85%`, position: 'absolute', transform: `translate(-50%, -50%) scale(${shipScale})` }} className={`z-[60] flex flex-col items-center justify-center pointer-events-none w-24 h-24 ${gameOver ? 'grayscale opacity-10' : 'opacity-100'}`}>
           
           {shieldLevel > 0 && (<motion.div layout className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl -z-10 animate-pulse" style={{ boxShadow: `0 0 ${shieldGlow}px rgba(34,211,238,0.6)` }} />)}
           
           {shipHealth <= 40 && !gameOver && !hasWon && (
             <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="absolute -bottom-2 text-orange-500 drop-shadow-[0_0_15px_red] z-50">
                <Flame size={36} />
             </motion.div>
           )}

           <div className="relative flex flex-col items-center z-30 drop-shadow-[0_0_15px_cyan]">
              {armorLevel >= 3 && <div className="absolute -left-3 top-1/2 w-1 h-10 bg-slate-400 rounded-full" />}
              {armorLevel >= 3 && <div className="absolute -right-3 top-1/2 w-1 h-10 bg-slate-400 rounded-full" />}
              
              {laserLevel >= 3 && <div className="absolute -left-1 top-4 w-1 h-6 bg-cyan-400 rounded-t-full shadow-[0_0_10px_cyan]" />}
              {laserLevel >= 3 && <div className="absolute -right-1 top-4 w-1 h-6 bg-cyan-400 rounded-t-full shadow-[0_0_10px_cyan]" />}
              
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-transparent border-b-slate-200"></div>
              <div className="w-6 h-10 bg-slate-800 rounded-b-lg border-x-2 border-b-2 border-slate-500 flex items-center justify-center">
                 <div className="w-2 h-4 bg-cyan-500/50 rounded-full blur-[1px]"></div>
              </div>

              {cargoLevel >= 3 && <div className="absolute -bottom-2 w-8 h-3 bg-purple-800 border border-purple-400 rounded-sm z-40"></div>}
           </div>

           <div className="absolute top-[80%] left-1/2 -translate-x-1/2 flex gap-2 -z-10 mt-2">
              <motion.div animate={{ height: [`${thrusterH1}px`, `${thrusterH2}px`] }} transition={{ repeat: Infinity, duration: 0.05 }} className={`w-2.5 rounded-b-full blur-[2px] ${thrusterColorOuter}`} />
              <motion.div animate={{ height: [`${thrusterH1 + 10}px`, `${thrusterH2 + 20}px`] }} transition={{ repeat: Infinity, duration: 0.08 }} className={`w-3.5 rounded-b-full blur-[2px] ${thrusterColorInner}`} />
              <motion.div animate={{ height: [`${thrusterH1}px`, `${thrusterH2}px`] }} transition={{ repeat: Infinity, duration: 0.06 }} className={`w-2.5 rounded-b-full blur-[2px] ${thrusterColorOuter}`} />
           </div>
        </div>

        {!activeEvent && !eventResolution && !gameOver && !hasWon && anomalies.map(anomaly => {
          let sizeClass = 'w-16 h-16 md:w-20 md:h-20'; let iconSize = 28;
          if (anomaly.size === 'sm') { sizeClass = 'w-12 h-12 md:w-14 md:h-14'; iconSize = 20; } 
          else if (anomaly.size === 'lg') { sizeClass = 'w-24 h-24 md:w-28 md:h-28'; iconSize = 40; }

          const zIndex = (isTutorialPhase && tutorialStep >= 3 && tutorialStep <= 10) ? 'z-[55]' : 'z-[50]';

          return (
            <div 
              key={anomaly.id}
              id={`anom-${anomaly.id}`}
              style={{ left: `${anomaly.startX}%`, top: '-30%', position: 'absolute', transform: 'translateX(-50%)' }} 
              className={`cursor-crosshair group pointer-events-auto ${zIndex}`} 
              onMouseDown={() => {
                const progress = (Date.now() - anomaly.createdAt) / (anomaly.duration * 1000);
                let currentY = -30 + (progress * 150);
                if (isTutorialPhase && tutorialStep >= 3 && tutorialStep <= 10) currentY = Math.min(currentY, 35);

                handleCollectRef.current(anomaly, anomaly.startX, currentY, false);
                setAnomalies(prev => prev.filter(a => a.id !== anomaly.id));
              }}
            >
              <div className={`w-full h-full border-4 transition-transform flex flex-col items-center justify-center shadow-2xl backdrop-blur-md ${sizeClass} ${(anomaly.type === 'ice' || anomaly.type === 'meteor' || anomaly.type === 'star') ? 'animate-[spin_4s_linear_infinite_reverse]' : 'animate-[spin_4s_linear_infinite]'}
                ${anomaly.type === 'meteor' ? 'bg-stone-900/95 border-stone-500 rounded-xl shadow-[0_0_30px_#78716c]' :
                  anomaly.type === 'hazard' ? 'bg-red-900/95 border-red-500 rounded-full shadow-[0_0_40px_red]' : 
                  anomaly.type === 'he3' ? 'bg-purple-900/95 border-purple-400 rotate-45 rounded-3xl shadow-[0_0_30px_purple]' : 
                  anomaly.type === 'star' ? 'bg-yellow-900/95 border-yellow-400 rounded-full shadow-[0_0_30px_yellow]' : 
                  anomaly.type === 'parts' ? 'bg-orange-900/95 border-orange-400 rounded-2xl shadow-[0_0_20px_orange]' : 
                  anomaly.type === 'ice' ? 'bg-blue-900/95 border-blue-400 rounded-full shadow-[0_0_20px_blue]' : 
                  'bg-slate-700/95 border-slate-300 rounded-xl shadow-[0_0_20px_white]'} `}>
                
                {anomaly.type === 'meteor' ? <Mountain size={iconSize} className={`text-stone-400 drop-shadow-[0_0_10px_#a8a29e] animate-[spin_4s_linear_infinite]`} /> :
                 anomaly.type === 'hazard' ? <Flame size={iconSize} className="text-red-400 drop-shadow-[0_0_10px_red] animate-pulse" /> : 
                 anomaly.type === 'he3' ? <Zap size={iconSize} className="text-purple-300 -rotate-45 drop-shadow-[0_0_10px_purple]" /> : 
                 anomaly.type === 'star' ? <Star size={iconSize} className="text-yellow-300 drop-shadow-[0_0_10px_yellow] animate-pulse" /> : 
                 anomaly.type === 'parts' ? <Settings size={iconSize} className="text-orange-300 drop-shadow-[0_0_10px_orange]" /> : 
                 anomaly.type === 'ice' ? <Droplets size={iconSize} className="text-blue-300 drop-shadow-[0_0_10px_blue]" /> : 
                 <Pickaxe size={iconSize} className="text-slate-200 drop-shadow-[0_0_10px_white]" />}
              </div>
            </div>
          );
        })}

        <AnimatePresence>
          {floatingTexts.map(text => (
            <motion.div 
              key={text.id} 
              initial={{ opacity: 1, y: 0, scale: 0.5 }} 
              animate={{ opacity: 0, y: -60, scale: 1.2 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              style={{ left: `${text.x}%`, top: `${text.y}%` }}
              className={`absolute pointer-events-none font-black text-xl md:text-3xl font-mono ${text.color} drop-shadow-[0_0_10px_rgba(0,0,0,1)] z-[110] whitespace-nowrap -translate-x-1/2 -translate-y-1/2`}
            >
              {text.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      <ShopModal isOpen={isShopOpen} onClose={() => { setIsShopOpen(false); if(tutorialStep === 17) setTutorialStep(18); }} t={t} laserLevel={laserLevel} radarLevel={radarLevel} droneLevel={droneLevel} cargoLevel={cargoLevel} shieldLevel={shieldLevel} engineLevel={engineLevel} armorLevel={armorLevel} coreLevel={coreLevel} scoopLevel={scoopLevel} turretLevel={turretLevel} regolith={regolith} ice={ice} parts={parts} />
      
      <LogbookModal isOpen={isLogbookOpen} onClose={() => setIsLogbookOpen(false)} t={t} unlockedEvents={unlockedEvents} lang={lang} gameEvents={GAME_EVENTS} />

      <AnimatePresence>
        {activeEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-4 pointer-events-auto">
            <div className="max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
              <div className="h-1 bg-slate-800 w-full">
                 <div className="h-full bg-cyan-500 transition-all duration-1000 ease-linear" style={{ width: `${(eventTimeLeft / 30) * 100}%` }} />
              </div>
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <Activity size={28} className="text-cyan-500 mb-4" />
                <h2 className="text-slate-400 font-bold text-xs tracking-[0.2em] mb-2 uppercase">{t.eventAnomaly}</h2>
                <div className="flex items-center gap-2 mb-4"><h3 className="text-white font-black text-xl uppercase tracking-wider">{activeEvent.title[lang]}</h3><span className="text-cyan-400 font-mono text-sm bg-slate-950 px-2 py-0.5 rounded border border-slate-800">T-{eventTimeLeft}s</span></div>
                <p className="text-slate-300 font-mono text-sm leading-relaxed bg-slate-950/50 p-5 rounded-lg border border-slate-800 mb-6 w-full">{activeEvent.desc[lang]}</p>
                <div className="grid grid-cols-2 w-full gap-4">
                  {activeEvent.options.map((opt: any, idx: number) => {
                    const inventory = useGameStore.getState().inventory;
                    const reqCost = opt.cost;
                    const hasEnough = opt.costType === 'none' ? true : inventory[opt.costType as keyof typeof inventory] >= reqCost;
                    return (
                      <button key={idx} onClick={() => handleEventChoice(opt)} disabled={!hasEnough} className={`p-4 rounded-lg border flex flex-col transition-colors text-left ${!hasEnough ? 'bg-slate-950/50 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-cyan-500/50 active:scale-[0.99]'}`}>
                        <div className="flex flex-col justify-center items-start w-full gap-2">
                          <span className="font-mono text-sm font-bold uppercase tracking-wider">{opt.text[lang]}</span>
                          {opt.costType !== 'none' && opt.cost > 0 && (<span className="text-[10px] font-black text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">{opt.cost} {opt.costType.toUpperCase()}</span>)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {eventResolution && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-4 pointer-events-auto">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 md:p-8 flex flex-col items-center text-center">
              <Info size={32} className="text-slate-400 mb-4" />
              <h2 className="font-bold text-xs tracking-[0.2em] uppercase text-slate-400 mb-4">{t.eventReport}</h2>
              <p className="text-slate-200 text-sm leading-relaxed font-mono bg-slate-950/50 p-5 rounded-lg border border-slate-800 mb-6 w-full text-left">{eventResolution.text}</p>
              
              <div className="w-full grid grid-cols-1 gap-4 mb-6">
                 {eventResolution.cost > 0 && (
                   <div className="bg-slate-950/50 border border-slate-800 text-slate-300 font-mono text-xs px-4 py-3 rounded-lg flex items-center justify-center gap-3">
                     <Settings size={16} /> {t.eventConsumption} <span className="font-black text-orange-400">-{eventResolution.cost} {getResourceName(eventResolution.costType)}</span>
                   </div>
                 )}
                 {eventResolution.hpMod < 0 ? (
                   <div className="bg-red-950/30 border border-red-900/50 text-red-400 font-mono text-xs p-4 rounded-lg flex flex-col items-center gap-2">
                     <div className="flex items-center gap-3"><AlertTriangle size={16} /> <span>{t.eventCompromised}</span></div>
                     <span className="font-black text-xl bg-red-950 px-3 py-1 rounded border border-red-900 mt-2">{t.eventDamage} {eventResolution.hpMod} HP</span>
                     {armorLevel > 0 && <span className="text-teal-400 mt-2 text-[10px]">{t.eventMitigated}</span>}
                   </div>
                 ) : (
                   <div className="bg-teal-950/30 border border-teal-900/50 text-teal-400 font-mono text-xs px-4 py-3 rounded-lg flex items-center gap-3 justify-center">
                     <Shield size={16} /> {t.eventSafe}
                   </div>
                 )}
              </div>
              <button onClick={() => setEventResolution(null)} className="px-8 py-3 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 text-xs font-black uppercase tracking-widest rounded-lg border border-cyan-800 transition-colors w-full md:w-auto">{t.eventConfirm}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameOver && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-[300] flex flex-col items-center justify-center p-4 pointer-events-auto">
            <AlertTriangle size={64} className="text-red-500/80 mb-6" />
            <h1 className="text-red-500/90 font-black text-4xl md:text-5xl tracking-[0.2em] uppercase mb-4">{t.catastrophicFailure}</h1>
            <p className="text-slate-300 font-mono text-sm mb-12 text-center max-w-xl bg-slate-900 p-5 rounded-lg border border-red-900/30">
              {t.catastrophicDesc}
            </p>
            <button onClick={restartGame} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-4 px-12 rounded-lg border border-slate-600 uppercase tracking-[0.2em] transition-colors">{t.restartSimulation}</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasWon && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, backgroundColor: 'rgba(255, 255, 255, 1)' }} transition={{ duration: 3 }} className="absolute inset-0 z-[500] flex flex-col items-center justify-center pointer-events-auto">
            <motion.div initial={{ y: 50, scale: 0.8, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="flex flex-col items-center text-center">
              <Rocket size={64} className="text-slate-800 mb-6" />
              <h1 className="text-slate-900 font-black text-4xl md:text-5xl uppercase tracking-[0.2em] mb-4">{t.landingSuccess}</h1>
              <p className="text-slate-600 font-mono font-bold tracking-widest uppercase">{t.initiatingProtocols}</p>
            </motion.div>
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

      <AnimatePresence>
        {isTutorialPhase && !isEventActive && !isEndState && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute bottom-6 left-6 z-[300] flex items-end gap-3 pointer-events-none">
            
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0 drop-shadow-[0_0_15px_rgba(8,145,178,0.9)] relative">
              <img src="/LUMI_robozinho.png" alt="L.U.M.I." className="w-full h-full object-contain" />
            </div>
            
            <div className="relative bg-slate-900/95 border border-cyan-700/50 p-4 md:p-5 rounded-2xl rounded-bl-none shadow-[0_0_20px_rgba(8,145,178,0.4)] max-w-sm md:max-w-lg pointer-events-auto backdrop-blur-md text-left">
              <div className="absolute -left-2 bottom-0 w-0 h-0 border-r-[12px] border-r-cyan-700/50 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" />
              <div className="absolute -left-[9px] bottom-[2px] w-0 h-0 border-r-[10px] border-r-slate-900/95 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent" />
              <h4 className="text-cyan-500 font-black text-[10px] md:text-xs uppercase tracking-widest mb-1">L.U.M.I. System</h4>
              <p className="text-slate-100 font-mono text-xs md:text-sm leading-relaxed">{displayedText}{isLumiTyping && <span className="inline-block w-2 h-4 md:h-5 bg-cyan-400 ml-1.5 animate-pulse align-middle" />}</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}