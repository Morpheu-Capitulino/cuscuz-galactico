import { motion, AnimatePresence } from 'framer-motion';
import { Pickaxe, Settings, Droplets, ShoppingCart, X, Crosshair, Activity, Bot, Package, Shield, Rocket, Layers, Cpu, Magnet, Target, ChevronRight, Archive, Fingerprint, Database, FileText } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';

const colorStyles: Record<string, any> = {
  teal: { bg: 'bg-teal-400', text: 'text-teal-400', border: 'border-teal-700', shadow: 'shadow-[0_0_15px_teal]', hover: 'hover:bg-teal-700', pulse: 'bg-teal-900' },
  cyan: { bg: 'bg-cyan-400', text: 'text-cyan-400', border: 'border-cyan-700', shadow: 'shadow-[0_0_15px_cyan]', hover: 'hover:bg-cyan-700', pulse: 'bg-cyan-900' },
  blue: { bg: 'bg-blue-400', text: 'text-blue-400', border: 'border-blue-700', shadow: 'shadow-[0_0_15px_blue]', hover: 'hover:bg-blue-700', pulse: 'bg-blue-900' },
  yellow: { bg: 'bg-yellow-400', text: 'text-yellow-400', border: 'border-yellow-700', shadow: 'shadow-[0_0_15px_yellow]', hover: 'hover:bg-yellow-700', pulse: 'bg-yellow-900' },
};

export function IndicatorItem({ icon: Icon, color, value, label, onRefill, disabled, costNode }: any) {
  const style = colorStyles[color] || colorStyles.cyan;
  const isCritical = value <= 20;

  return (
    <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl shadow-lg relative group transition-all">
      <Icon size={20} className={`${style.text} ${isCritical ? 'animate-pulse text-red-500' : ''} shrink-0`} />
      
      <div className="w-24 md:w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-linear ${isCritical ? 'bg-red-500 shadow-[0_0_15px_red]' : `${style.bg} ${style.shadow}`}`} 
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }} 
        />
      </div>
      
      {onRefill && (
        <button 
          onClick={onRefill} 
          disabled={disabled} 
          className={`px-3 py-1 flex items-center justify-center ${style.pulse} ${style.hover} border-2 ${style.border} rounded-lg transition-transform active:scale-95 disabled:opacity-40 shrink-0 cursor-pointer`}
        >
          <span className="text-white font-black text-xs md:text-sm uppercase tracking-wider">+ {label}</span>
        </button>
      )}
      
      {costNode && (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none bg-slate-950 ${style.text} text-xs px-4 py-2 rounded-lg border border-slate-700 whitespace-nowrap z-50 transition-opacity font-black shadow-2xl flex items-center gap-2`}>
          <ChevronRight size={12} className="mx-1" /> {costNode}
        </div>
      )}
    </div>
  );
}

const shopStyles: Record<string, any> = {
  cyan: { text: 'text-cyan-400', border: 'border-cyan-500/30', bgBtn: 'bg-cyan-600', hoverBtn: 'hover:bg-cyan-500' },
  blue: { text: 'text-blue-400', border: 'border-blue-500/30', bgBtn: 'bg-blue-600', hoverBtn: 'hover:bg-blue-500' },
  orange: { text: 'text-orange-400', border: 'border-orange-500/30', bgBtn: 'bg-orange-600', hoverBtn: 'hover:bg-orange-500' },
  purple: { text: 'text-purple-400', border: 'border-purple-500/30', bgBtn: 'bg-purple-600', hoverBtn: 'hover:bg-purple-500' },
  teal: { text: 'text-teal-400', border: 'border-teal-500/30', bgBtn: 'bg-teal-600', hoverBtn: 'hover:bg-teal-500' },
  yellow: { text: 'text-yellow-400', border: 'border-yellow-500/30', bgBtn: 'bg-yellow-600', hoverBtn: 'hover:bg-yellow-500' },
  slate: { text: 'text-slate-300', border: 'border-slate-500/30', bgBtn: 'bg-slate-600', hoverBtn: 'hover:bg-slate-500' },
  indigo: { text: 'text-indigo-400', border: 'border-indigo-500/30', bgBtn: 'bg-indigo-600', hoverBtn: 'hover:bg-indigo-500' },
  pink: { text: 'text-pink-400', border: 'border-pink-500/30', bgBtn: 'bg-pink-600', hoverBtn: 'hover:bg-pink-500' },
};

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
    { id: 'laser', name: t.upgLaser, code: 'UPG-01', desc: t.upgLaserDesc, icon: <Crosshair size={22} className="text-cyan-400"/>, lvl: laserLevel, action: () => upgradeEquipment('laserLevel', { regolith: laserCost }), cost: laserCost, costIcon: <Pickaxe size={14}/>, color: 'cyan', res: regolith },
    { id: 'radar', name: t.upgRadar, code: 'UPG-02', desc: t.upgRadarDesc, icon: <Activity size={22} className="text-blue-400"/>, lvl: radarLevel, action: () => upgradeEquipment('radarLevel', { ice: radarCost }), cost: radarCost, costIcon: <Droplets size={14}/>, color: 'blue', res: ice },
    { id: 'drone', name: t.upgDrone, code: 'UPG-03', desc: t.upgDroneDesc, icon: <Bot size={22} className="text-orange-400"/>, lvl: droneLevel, action: () => upgradeEquipment('droneLevel', { parts: droneCost }), cost: droneCost, costIcon: <Settings size={14}/>, color: 'orange', res: parts },
    { id: 'cargo', name: t.upgCargo, code: 'UPG-04', desc: t.upgCargoDesc, icon: <Package size={22} className="text-purple-400"/>, lvl: cargoLevel, action: () => upgradeEquipment('cargoLevel', { regolith: cargoCost, ice: cargoCost }), cost: cargoCost, costIcon: <><Pickaxe size={14}/> + <Droplets size={14}/></>, color: 'purple', res: Math.min(regolith, ice) },
    { id: 'shield', name: t.upgShield, code: 'UPG-05', desc: t.upgShieldDesc, icon: <Shield size={22} className="text-teal-400"/>, lvl: shieldLevel, action: () => upgradeEquipment('shieldLevel', { ice: shieldCost, parts: shieldCost }), cost: shieldCost, costIcon: <><Droplets size={14}/> + <Settings size={14}/></>, color: 'teal', res: Math.min(ice, parts) },
    { id: 'engine', name: t.upgEngine, code: 'UPG-06', desc: t.upgEngineDesc, icon: <Rocket size={22} className="text-yellow-400"/>, lvl: engineLevel, action: () => upgradeEquipment('engineLevel', { regolith: engineCost, parts: engineCost }), cost: engineCost, costIcon: <><Pickaxe size={14}/> + <Settings size={14}/></>, color: 'yellow', res: Math.min(regolith, parts) },
    { id: 'armor', name: t.upgArmor, code: 'UPG-07', desc: t.upgArmorDesc, icon: <Layers size={22} className="text-slate-300"/>, lvl: armorLevel, action: () => upgradeEquipment('armorLevel', { regolith: armorCost }), cost: armorCost, costIcon: <Pickaxe size={14}/>, color: 'slate', res: regolith },
    { id: 'core', name: t.upgCore, code: 'UPG-08', desc: t.upgCoreDesc, icon: <Cpu size={22} className="text-indigo-400"/>, lvl: coreLevel, action: () => upgradeEquipment('coreLevel', { parts: coreCost }), cost: coreCost, costIcon: <Settings size={14}/>, color: 'indigo', res: parts },
    { id: 'scoop', name: t.upgScoop, code: 'UPG-09', desc: t.upgScoopDesc, icon: <Magnet size={22} className="text-pink-400"/>, lvl: scoopLevel, action: () => upgradeEquipment('scoopLevel', { parts: scoopCost, ice: scoopCost }), cost: scoopCost, costIcon: <><Settings size={14}/> + <Droplets size={14}/></>, color: 'pink', res: Math.min(parts, ice) },
    { id: 'turret', name: t.upgTurret, code: 'UPG-10', desc: t.upgTurretDesc, icon: <Target size={22} className="text-yellow-400"/>, lvl: turretLevel, action: () => upgradeEquipment('turretLevel', { parts: turretCost, regolith: turretCost }), cost: turretCost, costIcon: <><Settings size={14}/> + <Pickaxe size={14}/></>, color: 'yellow', res: Math.min(parts, regolith) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[200] pointer-events-auto" />
          
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute top-0 bottom-0 right-0 w-full md:w-[750px] bg-slate-950/80 backdrop-blur-3xl border-l border-cyan-900/50 flex flex-col z-[210] shadow-[-30px_0_60px_rgba(0,0,0,0.8)] pointer-events-auto">
            
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-950/50 to-transparent">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-950 rounded-lg border border-cyan-800 shadow-[0_0_15px_cyan]">
                  <ShoppingCart size={24} className="text-cyan-400"/>
                </div>
                <div>
                  <h2 className="text-white font-black uppercase tracking-[0.2em] text-xl leading-none">{t.shopTerminal}</h2>
                  <p className="text-cyan-500/80 font-mono text-[10px] uppercase tracking-widest mt-1">{t.shopSubtitle}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-900 hover:bg-red-900/80 p-3 rounded-xl transition-all border border-slate-700 hover:border-red-500/50">
                <X size={20}/>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#0891b2 transparent' }}>
              <div className="flex flex-col gap-4">
                {upgrades.map((upg, idx) => {
                  const style = shopStyles[upg.color] || shopStyles.slate;
                  const canBuy = upg.res >= upg.cost;
                  
                  return (
                    <div key={idx} className={`relative p-5 rounded-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 overflow-hidden group ${canBuy ? `bg-slate-900/60 hover:bg-slate-800/80 border ${style.border} hover:border-${upg.color}-400/60 shadow-lg` : 'bg-black/60 border border-white/5 opacity-75'}`}>
                      
                      {canBuy && <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-${upg.color}-500 to-transparent transition-opacity duration-500 pointer-events-none`} />}
                      
                      <div className="flex items-start gap-5 flex-1 z-10">
                        <div className={`p-4 rounded-xl bg-black/60 shadow-inner border border-white/10 ${style.text} flex shrink-0`}>
                          {upg.icon}
                        </div>
                        <div className="flex flex-col flex-1 w-full">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-slate-100 font-bold text-base uppercase tracking-wider">{upg.name}</h3>
                              <span className={`text-[9px] font-mono border border-white/10 px-2 py-0.5 rounded bg-black/50 ${canBuy ? 'text-green-400' : 'text-slate-500'}`}>{t.sysOk}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono tracking-widest">{upg.code}</span>
                          </div>
                          
                          <p className="text-slate-400 text-xs mt-2 leading-relaxed max-w-md line-clamp-2 min-h-[32px]">{upg.desc}</p>
                          
                          <div className="flex items-center gap-3 mt-4">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${style.text}`}>{t.lvl} {upg.lvl}</span>
                            <div className="flex gap-1.5 flex-1 max-w-[200px]">
                               {[...Array(5)].map((_, i) => (
                                  <div key={i} className={`h-1.5 flex-1 rounded-[1px] ${i < upg.lvl ? `bg-${upg.color}-400 shadow-[0_0_5px_currentColor]` : 'bg-white/10'}`} />
                               ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0 md:w-32 z-10 pt-4 md:pt-0 border-t md:border-t-0 border-white/10 md:pl-4 md:border-l">
                        <span className="text-[8px] text-slate-500 font-mono text-center tracking-widest uppercase">{t.fundsReq}</span>
                        <button onClick={upg.action} disabled={!canBuy} className={`w-full py-2.5 rounded-lg text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${canBuy ? `${style.bgBtn} ${style.hoverBtn} text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]` : 'bg-black/50 text-slate-500 border border-white/5 cursor-not-allowed'}`}>
                          {upg.cost} {upg.costIcon}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// TELA DO DIÁRIO DE BORDO (TEMA NASA CLASSIFIED / SCI-FI)
// ==========================================
export const LogbookModal = ({ isOpen, onClose, t, unlockedEvents = [], lang, gameEvents = [] }: any) => {
  const totalUnlocked = unlockedEvents.length;
  const totalEvents = gameEvents.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] pointer-events-auto flex items-center justify-center p-4 md:p-8" />
          
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="absolute inset-4 md:inset-12 bg-slate-900 border border-blue-900/50 rounded-lg flex flex-col z-[210] shadow-2xl pointer-events-auto overflow-hidden ring-1 ring-white/10">
            
            {/* Header Estilo Terminal */}
            <div className="p-4 md:p-6 border-b border-blue-900/50 flex items-center justify-between bg-slate-950 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-blue-950 rounded-lg border border-blue-800 shadow-[0_0_20px_rgba(30,58,138,0.5)]">
                  <Database size={24} className="text-blue-400"/>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-blue-100 font-bold uppercase tracking-widest text-lg md:text-xl leading-none">ARQUIVOS NASA</h2>
                    <span className="px-2 py-0.5 rounded bg-red-900/50 text-red-400 text-[9px] font-black border border-red-700/50 tracking-widest uppercase">Secret</span>
                  </div>
                  <p className="text-blue-500/80 font-mono text-[10px] md:text-xs tracking-[0.2em] mt-1.5 uppercase">Registros Recuperados: {totalUnlocked} / {totalEvents}</p>
                </div>
              </div>
              <button onClick={onClose} className="relative z-10 text-slate-500 hover:text-white bg-slate-900 hover:bg-blue-900/50 p-2.5 rounded-lg transition-all border border-slate-800 hover:border-blue-500/50">
                <X size={20}/>
              </button>
            </div>
            
            {/* Grid de Missões */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-900/50 relative" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e3a8a transparent' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {gameEvents.map((evt: any, idx: number) => {
                  const isUnlocked = unlockedEvents.includes(evt.id);
                  const numStr = String(idx + 1).padStart(3, '0');
                  
                  return (
                    <motion.div whileHover={isUnlocked ? { scale: 1.01, y: -2 } : {}} key={idx} className={`relative rounded-xl flex flex-col h-full transition-all duration-300 overflow-hidden ${isUnlocked ? 'bg-slate-800/80 border border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]' : 'bg-slate-950/80 border border-slate-800/80'}`}>
                      
                      {/* Faixa Superior do Card */}
                      <div className={`flex items-center justify-between px-4 py-2 border-b ${isUnlocked ? 'bg-blue-950/40 border-blue-900/50' : 'bg-slate-900/50 border-slate-800/50'}`}>
                         <span className={`font-mono text-[10px] tracking-widest uppercase ${isUnlocked ? 'text-blue-400' : 'text-slate-600'}`}>FILE_{numStr}</span>
                         {isUnlocked ? (
                           <div className="flex items-center gap-1.5">
                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                             <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Descriptografado</span>
                           </div>
                         ) : (
                           <span className="text-[9px] font-mono text-red-500/60 uppercase tracking-wider line-through decoration-red-500/30">Corrompido</span>
                         )}
                      </div>

                      <div className="p-5 flex flex-col flex-1 relative">
                        {isUnlocked ? (
                          <>
                            <h3 className="text-slate-100 font-bold text-sm md:text-base uppercase tracking-wide leading-tight mb-2 flex items-center gap-2">
                              <Archive className="text-blue-400 shrink-0" size={16} />
                              {evt.title[lang]}
                            </h3>
                            <p className="text-slate-400 text-xs font-mono leading-relaxed bg-black/30 p-3 rounded flex-1 border border-slate-700/50 mb-4 shadow-inner">
                              {evt.desc[lang]}
                            </p>
                            
                            {/* Fato Histórico (Ouro) */}
                            <div className="mt-auto relative pt-4">
                              <div className="absolute top-0 left-0 w-8 h-px bg-amber-500/50" />
                              <div className="flex items-center gap-2 mb-2">
                                <FileText size={14} className="text-amber-500" />
                                <span className="text-[9px] text-amber-500 font-black tracking-[0.15em] uppercase">{t.historyFact}</span>
                              </div>
                              <p className="text-amber-100/80 text-[11px] md:text-xs font-sans leading-relaxed pl-2 border-l-2 border-amber-500/20">
                                {evt.history[lang]}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-4 py-8 opacity-40 grayscale">
                            <Fingerprint size={48} className="text-slate-600 opacity-50" />
                            <div className="text-center px-4">
                              <h3 className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mb-2">{t.locked}</h3>
                              <p className="text-slate-500 text-[10px] md:text-xs font-mono">{t.lockedDesc}</p>
                            </div>
                            <div className="w-32 h-2 mt-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDQgNFpNNCBMIDBaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-30" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};