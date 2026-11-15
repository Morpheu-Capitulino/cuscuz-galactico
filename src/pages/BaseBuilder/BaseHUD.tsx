import type { ReactNode } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Pickaxe, Droplets, Settings, Wind, Coffee, BatteryCharging, Shield, Play, Pause, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';

function safePercent(value: unknown, fallback = 0) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(100, n));
}

function Indicator({
  icon,
  label,
  val,
  color
}: {
  icon: ReactNode;
  label: string;
  val: number | undefined | null;
  color: string;
}) {
  const safeVal = safePercent(val);
  const isCrit = safeVal <= 20;

  return (
    <div className={`flex flex-col w-14 md:w-20 lg:w-24 ${isCrit ? 'animate-pulse' : ''}`}>
      <div className="flex justify-between items-center text-[8px] md:text-[9px] font-black text-slate-300 mb-1">
        <span className="flex items-center gap-1">
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </span>
        <span className={isCrit ? 'text-red-400' : 'text-white'}>
          {Math.floor(safeVal)}%
        </span>
      </div>
      <div className="w-full h-1.5 md:h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 shadow-inner">
        <motion.div
          animate={{ width: `${safeVal}%` }}
          className={`h-full ${isCrit ? 'bg-red-500' : color}`}
          transition={{ ease: 'linear', duration: 0.5 }}
        />
      </div>
    </div>
  );
}

export function BaseHUD() {
  const store = useGameStore();
  const formattedTime = `${String(store.clock.h).padStart(2, '0')}:${String(store.clock.m).padStart(2, '0')}`;

  const toggleLanguage = () => {
    store.setLanguage(store.language === 'pt' ? 'en' : 'pt');
  };

  return (
    <header className="flex-none bg-[#050b14] border-b border-cyan-900/50 p-2 md:p-3 shadow-2xl z-50 flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* RELÓGIO E CONTROLES (Com âncora do tutorial) */}
        <div data-tutorial="play-button" className="bg-slate-900/80 backdrop-blur-md border border-cyan-800/50 rounded-xl p-1.5 px-3 flex items-center gap-3 shadow-inner">
          <div className="text-right border-r border-slate-700/50 pr-3">
            <p className="text-[9px] font-bold text-cyan-500 tracking-widest uppercase">
              {store.language === 'en' ? 'Day' : 'Dia'} {store.clock.day}
            </p>
            <p className={`font-mono text-lg font-black tracking-wider ${store.isPaused ? 'text-slate-500' : 'text-cyan-300'}`}>{formattedTime}</p>
          </div>
          <div className="flex gap-1 items-center">
            <button onClick={() => store.togglePause()} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
              {store.isPaused ? <Play size={14}/> : <Pause size={14}/>}
            </button>
            <button onClick={() => store.setSimSpeed(1)} className={`p-1.5 rounded-lg text-[10px] font-black transition-colors ${store.simSpeed === 1 ? 'bg-cyan-900 border border-cyan-500/50 text-cyan-300' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>1x</button>
            <button onClick={() => store.setSimSpeed(2)} className={`p-1.5 rounded-lg text-[10px] font-black transition-colors ${store.simSpeed === 2 ? 'bg-cyan-900 border border-cyan-500/50 text-cyan-300' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>2x</button>
            
            {/* SELETOR DE IDIOMA */}
            <div className="w-px h-6 bg-slate-700 mx-1"></div>
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-1 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors border border-slate-700"
              title={store.language === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            >
              <Globe2 size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">{store.language}</span>
            </button>
          </div>
        </div>
        
        {/* RECURSOS (Com âncora do tutorial) */}
        <div data-tutorial="hud-resources" className="flex gap-3 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[11px] font-black shadow-inner">
           <div className="flex items-center gap-1.5 px-2 text-slate-300" title={store.language === 'en' ? 'Regolith' : 'Regolito'}><Pickaxe size={14} className="text-slate-500"/> {Math.floor(store.inventory.regolith)}</div>
           <div className="flex items-center gap-1.5 px-2 border-l border-slate-700 text-blue-300" title={store.language === 'en' ? 'Ice' : 'Gelo'}><Droplets size={14} className="text-blue-500"/> {Math.floor(store.inventory.ice)}</div>
           <div className="flex items-center gap-1.5 px-2 border-l border-slate-700 text-orange-300" title={store.language === 'en' ? 'Parts' : 'Peças'}><Settings size={14} className="text-orange-500"/> {Math.floor(store.inventory.parts)}</div>
        </div>
      </div>
      
      {/* INDICADORES DE SOBREVIVÊNCIA */}
      <div className="flex gap-3 md:gap-5 w-full sm:w-auto justify-between sm:justify-end px-2 sm:px-0">
          <Indicator icon={<Wind size={14} />} label="O2" val={store.indicators.o2 ?? 0} color="bg-cyan-400" />
          <Indicator icon={<Droplets size={14} />} label={store.language === 'en' ? 'WATER' : 'ÁGUA'} val={store.indicators.water ?? 0} color="bg-blue-400" />
          <Indicator icon={<Coffee size={14} />} label={store.language === 'en' ? 'FOOD' : 'COMIDA'} val={store.indicators.food ?? 0} color="bg-emerald-400" />
          <Indicator icon={<BatteryCharging size={14} />} label={store.language === 'en' ? 'POWER' : 'ENERGIA'} val={store.indicators.energy ?? 0} color="bg-yellow-400" />
          <Indicator icon={<Shield size={14} />} label={store.language === 'en' ? 'SHIELD' : 'ESCUDO'} val={store.indicators.shield ?? 0} color="bg-indigo-400" />
      </div>
    </header>
  );
}