import type { ReactNode } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Pickaxe, Droplets, Settings, Wind, Coffee, BatteryCharging, Shield, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

function Indicator({ icon, label, val, color }: { icon: ReactNode, label: string, val: number, color: string }) {
  const isCrit = val <= 20;
  return (
    <div className={`flex flex-col w-14 md:w-20 lg:w-24 ${isCrit ? 'animate-pulse' : ''}`}>
       <div className="flex justify-between items-center text-[8px] md:text-[9px] font-black text-slate-300 mb-1">
         <span className="flex items-center gap-1">{icon} <span className="hidden sm:inline">{label}</span></span>
         <span className={isCrit ? 'text-red-400' : 'text-white'}>{Math.floor(val)}%</span>
       </div>
       <div className="w-full h-1.5 md:h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 shadow-inner">
         <motion.div animate={{ width: `${val}%` }} className={`h-full ${isCrit ? 'bg-red-500' : color}`} transition={{ ease: 'linear', duration: 0.5 }} />
       </div>
    </div>
  );
}

export function BaseHUD() {
  const store = useGameStore();
  const formattedTime = `${String(store.clock.h).padStart(2, '0')}:${String(store.clock.m).padStart(2, '0')}`;

  return (
    <header className="flex-none bg-slate-950 border-b border-cyan-900/50 p-2 md:p-3 shadow-2xl z-50 flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex items-center gap-2 md:gap-4">
        
        <div className="bg-slate-900/80 backdrop-blur-md border border-cyan-800/50 rounded-xl p-1.5 px-3 flex items-center gap-3">
          <div className="text-right border-r border-slate-700/50 pr-3">
            <p className="text-[9px] font-bold text-cyan-500 tracking-widest">DIA {store.clock.day}</p>
            <p className={`font-mono text-lg font-black ${store.isPaused ? 'text-slate-500' : 'text-cyan-300'}`}>{formattedTime}</p>
          </div>
          <div className="flex gap-1">
            <button onClick={() => store.togglePause()} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
              {store.isPaused ? <Play size={14}/> : <Pause size={14}/>}
            </button>
            <button onClick={() => store.setSimSpeed(1)} className={`p-1.5 rounded text-[10px] font-bold transition-colors ${store.simSpeed === 1 ? 'bg-cyan-900/80 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>1x</button>
            <button onClick={() => store.setSimSpeed(2)} className={`p-1.5 rounded text-[10px] font-bold transition-colors ${store.simSpeed === 2 ? 'bg-cyan-900/80 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>2x</button>
          </div>
        </div>
        
        <div className="flex gap-2 md:gap-3 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-800 text-[10px] md:text-xs font-mono font-bold">
           <div className="flex items-center gap-1 px-1 md:px-2 text-slate-300" title="Regolito"><Pickaxe size={14}/> {store.inventory.regolith}</div>
           <div className="flex items-center gap-1 px-1 md:px-2 border-l border-slate-700 text-blue-300" title="Gelo"><Droplets size={14}/> {store.inventory.ice}</div>
           <div className="flex items-center gap-1 px-1 md:px-2 border-l border-slate-700 text-orange-300" title="Peças"><Settings size={14}/> {store.inventory.parts}</div>
        </div>
      </div>
      
      <div className="flex gap-2 md:gap-4 w-full sm:w-auto justify-between sm:justify-end px-2 sm:px-0">
         <Indicator icon={<Wind size={14} />} label="O2" val={store.indicators.o2} color="bg-cyan-400" />
         <Indicator icon={<Droplets size={14} />} label="ÁGUA" val={store.indicators.water} color="bg-blue-400" />
         <Indicator icon={<Coffee size={14} />} label="COMIDA" val={store.indicators.food} color="bg-emerald-400" />
         <Indicator icon={<BatteryCharging size={14} />} label="ENERGIA" val={store.indicators.energy} color="bg-yellow-400" />
         <Indicator icon={<Shield size={14} />} label="ESCUDO" val={store.indicators.shield} color="bg-indigo-400" />
      </div>
    </header>
  );
}