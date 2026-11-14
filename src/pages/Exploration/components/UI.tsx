// src/pages/Exploration/components/UI.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Pickaxe, Settings, Droplets, ShoppingCart, X, Crosshair, Activity, Bot, Package, Shield, Rocket, Layers, Cpu, Magnet, Target } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';

export const IndicatorItem = ({ icon: Icon, color, value, label, onRefill, disabled, costNode }: any) => (
  <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/50 p-1.5 pr-2 rounded-lg relative group w-full md:w-auto shadow-sm">
    <div className="p-1 bg-slate-950 rounded-md shrink-0 border border-slate-800">
      <Icon size={14} className={`text-${color}-400 ${value <= 20 ? 'animate-pulse text-red-500 drop-shadow-[0_0_5px_red]' : ''}`} />
    </div>
    <div className="flex flex-col w-20 md:w-24 gap-1">
      <div className="flex justify-between text-[9px] font-black text-slate-400 tracking-wider leading-none">
        <span>{label}</span>
        <span className={value <= 20 ? 'text-red-400' : ''}>{Math.floor(value)}%</span>
      </div>
      <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div className={`h-full bg-${color}-400 transition-all duration-700 ease-linear ${value <= 20 ? 'bg-red-500' : ''}`} style={{ width: `${value}%` }} />
      </div>
    </div>
    {onRefill && (
      <button onClick={onRefill} disabled={disabled} className={`ml-1 px-2 py-0.5 bg-${color}-900/40 hover:bg-${color}-700 border border-${color}-700/50 rounded transition-colors disabled:opacity-30 disabled:hover:bg-${color}-900/40 cursor-pointer`}>
        <span className="text-[10px] font-black text-white">+</span>
      </button>
    )}
    {costNode && (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none bg-slate-950 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-50 transition-opacity font-black flex items-center gap-1 shadow-xl">
        CUSTO <ChevronRight size={10} className="text-slate-500" /> {costNode}
      </div>
    )}
  </div>
);

export const ShopModal = ({ isOpen, onClose, t, laserLevel, radarLevel, droneLevel, cargoLevel, shieldLevel, engineLevel, armorLevel, coreLevel, scoopLevel, turretLevel, regolith, ice, parts }: any) => {
  const { upgradeEquipment } = useGameStore(state => state);

  const laserCost = Math.floor(40 * Math.pow(1.3, laserLevel - 1));
  const radarCost = Math.floor(40 * Math.pow(1.3, radarLevel - 1));
  const droneCost = Math.floor(80 * Math.pow(1.3, droneLevel));
  const cargoCost = Math.floor(100 * Math.pow(1.3, cargoLevel - 1));
  const shieldCost = Math.floor(150 * Math.pow(1.3, shieldLevel));
  const engineCost = Math.floor(150 * Math.pow(1.3, engineLevel - 1));
  const armorCost = Math.floor(100 * Math.pow(1.3, armorLevel));
  const coreCost = Math.floor(200 * Math.pow(1.3, coreLevel - 1));
  const scoopCost = Math.floor(100 * Math.pow(1.3, scoopLevel));
  const turretCost = Math.floor(200 * Math.pow(1.3, turretLevel));

  const upgrades = [
    { id: 'laser', name: t.upgLaser, desc: t.upgLaserDesc, icon: <Crosshair size={18} className="text-cyan-400"/>, lvl: laserLevel, action: () => upgradeEquipment('laserLevel', { regolith: laserCost }), cost: laserCost, costIcon: <Pickaxe size={14}/>, color: 'cyan', res: regolith },
    { id: 'radar', name: t.upgRadar, desc: t.upgRadarDesc, icon: <Activity size={18} className="text-blue-400"/>, lvl: radarLevel, action: () => upgradeEquipment('radarLevel', { ice: radarCost }), cost: radarCost, costIcon: <Droplets size={14}/>, color: 'blue', res: ice },
    { id: 'drone', name: t.upgDrone, desc: t.upgDroneDesc, icon: <Bot size={18} className="text-orange-400"/>, lvl: droneLevel, action: () => upgradeEquipment('droneLevel', { parts: droneCost }), cost: droneCost, costIcon: <Settings size={14}/>, color: 'orange', res: parts },
    { id: 'cargo', name: t.upgCargo, desc: t.upgCargoDesc, icon: <Package size={18} className="text-purple-400"/>, lvl: cargoLevel, action: () => upgradeEquipment('cargoLevel', { regolith: cargoCost, ice: cargoCost }), cost: cargoCost, costIcon: <><Pickaxe size={14}/> + <Droplets size={14}/></>, color: 'purple', res: Math.min(regolith, ice) },
    { id: 'shield', name: t.upgShield, desc: t.upgShieldDesc, icon: <Shield size={18} className="text-teal-400"/>, lvl: shieldLevel, action: () => upgradeEquipment('shieldLevel', { ice: shieldCost, parts: shieldCost }), cost: shieldCost, costIcon: <><Droplets size={14}/> + <Settings size={14}/></>, color: 'teal', res: Math.min(ice, parts) },
    { id: 'engine', name: t.upgEngine, desc: t.upgEngineDesc, icon: <Rocket size={18} className="text-yellow-400"/>, lvl: engineLevel, action: () => upgradeEquipment('engineLevel', { regolith: engineCost, parts: engineCost }), cost: engineCost, costIcon: <><Pickaxe size={14}/> + <Settings size={14}/></>, color: 'yellow', res: Math.min(regolith, parts) },
    { id: 'armor', name: t.upgArmor, desc: t.upgArmorDesc, icon: <Layers size={18} className="text-slate-300"/>, lvl: armorLevel, action: () => upgradeEquipment('armorLevel', { regolith: armorCost }), cost: armorCost, costIcon: <Pickaxe size={14}/>, color: 'slate', res: regolith },
    { id: 'core', name: t.upgCore, desc: t.upgCoreDesc, icon: <Cpu size={18} className="text-indigo-400"/>, lvl: coreLevel, action: () => upgradeEquipment('coreLevel', { parts: coreCost }), cost: coreCost, costIcon: <Settings size={14}/>, color: 'indigo', res: parts },
    { id: 'scoop', name: t.upgScoop, desc: t.upgScoopDesc, icon: <Magnet size={18} className="text-pink-400"/>, lvl: scoopLevel, action: () => upgradeEquipment('scoopLevel', { parts: scoopCost, ice: scoopCost }), cost: scoopCost, costIcon: <><Settings size={14}/> + <Droplets size={14}/></>, color: 'pink', res: Math.min(parts, ice) },
    { id: 'turret', name: t.upgTurret, desc: t.upgTurretDesc, icon: <Target size={18} className="text-yellow-400"/>, lvl: turretLevel, action: () => upgradeEquipment('turretLevel', { parts: turretCost, regolith: turretCost }), cost: turretCost, costIcon: <><Settings size={14}/> + <Pickaxe size={14}/></>, color: 'yellow', res: Math.min(parts, regolith) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[95] pointer-events-auto" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute top-0 bottom-0 right-0 w-full md:w-[650px] bg-slate-900/95 border-l-2 border-cyan-500/50 flex flex-col z-[100] shadow-[0_0_80px_rgba(8,145,178,0.4)] pointer-events-auto">
            <div className="p-6 border-b-2 border-cyan-900/50 flex items-center justify-between bg-slate-950">
              <h2 className="text-cyan-400 font-black uppercase tracking-widest text-xl flex items-center gap-3"><ShoppingCart size={24}/> {t.upgrades}</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl transition-colors hover:bg-red-900"><X size={24}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {upgrades.map((upg, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border-2 transition-all shadow-lg flex flex-col justify-between ${upg.res >= upg.cost ? `border-${upg.color}-500/50 bg-slate-800` : 'border-slate-800 bg-slate-950/80'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-2"><div className="flex items-center gap-3"><div className={`p-2 bg-slate-900 rounded-lg shadow-inner`}>{upg.icon}</div> <h3 className="text-slate-100 font-black text-sm uppercase tracking-wider">{upg.name}</h3></div><span className={`text-${upg.color}-300 font-mono font-black text-xs bg-${upg.color}-950 px-3 py-1 rounded-md border border-${upg.color}-800`}>LVL {upg.lvl}</span></div>
                      <p className="text-slate-400 text-xs mb-4 leading-relaxed font-mono min-h-[34px] bg-black/30 p-2 rounded-md">{upg.desc}</p>
                    </div>
                    <button onClick={upg.action} disabled={upg.res < upg.cost} className={`w-full py-3.5 rounded-xl text-sm font-black flex justify-center items-center gap-2 transition-transform active:scale-95 shadow-md mt-auto ${upg.res >= upg.cost ? `bg-${upg.color}-600 hover:bg-${upg.color}-500 text-white shadow-[0_0_15px_rgba(var(--tw-colors-${upg.color}-500),0.4)]` : 'bg-slate-900 text-slate-600 border border-slate-800'}`}>{upg.cost} {upg.costIcon}</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};