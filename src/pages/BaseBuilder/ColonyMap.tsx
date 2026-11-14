import { useGameStore } from '../../store/gameStore';
import { Target, Bot, Construction } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ColonyMapProps {
  lumiMessage: string;
}

export function ColonyMap({ lumiMessage }: ColonyMapProps) {
  const store = useGameStore();

  const isBuilt = (id: string) => store.builtModules.includes(id);
  const isWIP = (id: string) => store.buildingModules.some(b => b.id === id) || store.upgradingModules?.some(u => u.id === id);
  const hasShield = isBuilt('radiation');

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#010409] via-[#05101f] to-[#0f172a] overflow-hidden">
      
      {/* ESPAÇO PROFUNDO E ESTRELAS */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={`star-${i}`} className="absolute bg-white rounded-full opacity-60"
               style={{
                 width: Math.random() * 2 + 'px', height: Math.random() * 2 + 'px',
                 top: Math.random() * 60 + '%', left: Math.random() * 100 + '%',
                 animation: `pulse ${2 + Math.random() * 3}s infinite alternate`
               }} />
        ))}
      </div>

      {/* PLANETA TERRA REALISTA */}
      <div className="absolute top-[8%] left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-[#1e3a8a] shadow-[0_0_40px_rgba(59,130,246,0.3),inset_-15px_-15px_25px_rgba(0,0,0,0.8)] border border-blue-400/20">
        <svg viewBox="0 0 100 100" className="absolute w-[150%] h-[150%] top-[-20%] left-[-20%] fill-emerald-600 opacity-70 rotate-12 pointer-events-none">
           <path d="M45,20 C50,15 60,25 65,30 C70,35 60,45 55,40 C50,35 40,25 45,20 Z" />
           <path d="M20,50 C25,45 35,50 40,60 C45,70 30,80 20,70 C10,60 15,55 20,50 Z" />
           <path d="M70,60 C75,55 85,60 90,70 C95,80 80,90 70,80 C60,70 65,65 70,60 Z" />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute w-full h-full fill-white opacity-40 animate-[spin_120s_linear_infinite] pointer-events-none">
           <path d="M10,40 Q20,30 30,45 T50,40 T70,55 Q80,50 90,60 Q80,70 60,65 T40,75 T20,60 Q10,60 10,40 Z" />
           <path d="M30,10 Q40,5 50,20 T70,15 Q80,20 75,30 T50,35 T30,25 Q20,20 30,10 Z" />
        </svg>
        <div className="absolute inset-0 rounded-full shadow-[inset_5px_5px_15px_rgba(191,219,254,0.3)] pointer-events-none" />
      </div>

      {/* RELEVO LUNAR AO FUNDO (Montanhas) */}
      <svg className="absolute bottom-[35%] w-full h-[30%] opacity-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,100 L0,50 Q10,30 25,60 T50,40 T80,70 T100,20 L100,100 Z" fill="#1e293b" />
        <path d="M0,100 L0,70 Q15,40 35,70 T65,50 T90,80 L100,60 L100,100 Z" fill="#0f172a" />
      </svg>

      {/* SUPERFÍCIE LUNAR PRINCIPAL (Chão) */}
      <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-b from-[#1e293b] to-[#020617] border-t border-slate-700/50 shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-[20%] left-[15%] w-32 h-10 rounded-[50%] bg-gradient-to-b from-black/40 to-transparent border-t border-slate-600/30" />
        <div className="absolute top-[40%] left-[65%] w-48 h-16 rounded-[50%] bg-gradient-to-b from-black/40 to-transparent border-t border-slate-600/30" />
        <div className="absolute top-[10%] right-[10%] w-20 h-6 rounded-[50%] bg-gradient-to-b from-black/40 to-transparent border-t border-slate-600/30" />
      </div>


      {/* CONSTRUÇÕES (Subidas um pouco no eixo bottom para não conflitar com painel de gerencimento) */}
      <ModuleWrapper id="habitat" name="ABRIGO" pos="bottom-[25%] left-[45%]" isBuilt={isBuilt('habitat')} isWip={isWIP('habitat')}>
        <div className="w-24 md:w-28 h-14 md:h-16 bg-cyan-950/80 backdrop-blur-md rounded-t-full border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative overflow-hidden">
           <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] border-t-2 border-cyan-400/50 rounded-t-full opacity-50" />
           <div className="absolute bottom-0 w-full h-3 md:h-4 bg-slate-800" />
        </div>
      </ModuleWrapper>

      <ModuleWrapper id="purifier" name="FILTRO" pos="bottom-[33%] left-[63%]" isBuilt={isBuilt('purifier')} isWip={isWIP('purifier')}>
        <div className="flex gap-1.5 md:gap-2 items-end">
          <div className="w-6 md:w-8 h-12 md:h-16 bg-blue-900/80 rounded-t-xl border border-blue-500/50 flex flex-col justify-end overflow-hidden"><div className="h-[70%] bg-blue-500/40 w-full border-t border-blue-300" /></div>
          <div className="w-6 md:w-8 h-16 md:h-20 bg-blue-900/80 rounded-t-xl border border-blue-500/50 flex flex-col justify-end overflow-hidden"><div className="h-[40%] bg-blue-500/40 w-full border-t border-blue-300" /></div>
        </div>
      </ModuleWrapper>

      <ModuleWrapper id="greenhouse" name="ESTUFA" pos="bottom-[18%] left-[66%]" isBuilt={isBuilt('greenhouse')} isWip={isWIP('greenhouse')}>
        <div className="w-20 md:w-24 h-10 md:h-12 bg-emerald-950/60 backdrop-blur-sm rounded-t-3xl border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-end justify-center overflow-hidden">
          <div className="w-full h-6 flex justify-around px-2 opacity-80">
            <div className="w-2 md:w-3 h-full bg-emerald-500 rounded-t-full" />
            <div className="w-2 md:w-3 h-5 bg-emerald-400 rounded-t-full mt-1" />
            <div className="w-2 md:w-3 h-7 bg-emerald-600 rounded-t-full -mt-1" />
          </div>
        </div>
      </ModuleWrapper>

      <ModuleWrapper id="solar" name="PAINÉIS" pos="bottom-[26%] left-[28%]" isBuilt={isBuilt('solar')} isWip={isWIP('solar')}>
        <div className="flex gap-2 md:gap-3">
           <div className="w-8 md:w-10 h-10 md:h-14 bg-blue-950 border border-blue-400 transform -skew-x-12 shadow-lg flex flex-col gap-1 p-1">
             <div className="flex-1 bg-blue-600/50" /><div className="flex-1 bg-blue-600/50" />
           </div>
           <div className="w-8 md:w-10 h-10 md:h-14 bg-blue-950 border border-blue-400 transform -skew-x-12 shadow-lg flex flex-col gap-1 p-1">
             <div className="flex-1 bg-blue-600/50" /><div className="flex-1 bg-blue-600/50" />
           </div>
        </div>
      </ModuleWrapper>

      <ModuleWrapper id="medical" name="MÉDICO" pos="bottom-[32%] left-[38%]" isBuilt={isBuilt('medical')} isWip={isWIP('medical')}>
        <div className="w-16 md:w-20 h-10 md:h-12 bg-slate-200 rounded-lg shadow-xl relative border border-slate-400">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
             <div className="w-2 h-6 bg-red-500 absolute rounded-sm" />
             <div className="w-6 h-2 bg-red-500 absolute rounded-sm" />
           </div>
        </div>
      </ModuleWrapper>

      <ModuleWrapper id="dormitory" name="DORMITÓRIO" pos="bottom-[20%] left-[30%]" isBuilt={isBuilt('dormitory')} isWip={isWIP('dormitory')}>
        <div className="w-28 md:w-32 h-8 md:h-10 bg-indigo-950/90 rounded-xl border border-indigo-500/50 flex items-center justify-evenly">
          {[1,2,3,4].map(i => <div key={i} className="w-3 md:w-4 h-3 md:h-4 rounded-full bg-cyan-400/20 shadow-[inset_0_0_5px_#22d3ee]" />)}
        </div>
      </ModuleWrapper>

      {/* ESCUDO HOLO */}
      {hasShield && (
        <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[70%] pointer-events-none rounded-t-full border-t-[3px] border-indigo-400/30 bg-gradient-to-b from-indigo-500/10 to-transparent backdrop-blur-[1px] shadow-[0_-20px_60px_rgba(99,102,241,0.1)] transition-all" />
      )}
      {isWIP('radiation') && !hasShield && (
        <div className="absolute bottom-[15%] left-[45%] flex flex-col items-center">
          <Bot size={20} className="text-yellow-400 animate-bounce mb-1" />
          <p className="text-[8px] font-bold text-yellow-400 bg-black/50 px-1.5 rounded">ESCUDO EM MONTAGEM</p>
        </div>
      )}

      {/* EXPEDIÇÃO / ROVER */}
      <AnimatePresence>
        {store.activeExpedition && store.activeExpedition.status !== 'evento' && (
          <motion.div 
            initial={{ x: 200, opacity: 0 }} 
            animate={{ x: store.activeExpedition.status === 'ida' ? -150 : 200, opacity: 1 }} 
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} 
            className="absolute bottom-[10%] left-[50%] z-20 pointer-events-none"
          >
             <div className="w-12 h-6 md:w-14 md:h-8 bg-slate-700 border-2 border-orange-500 rounded-lg flex items-center justify-center shadow-2xl relative">
               <div className="absolute -left-1.5 -bottom-1.5 w-3 h-3 bg-slate-900 rounded-full border border-slate-500 animate-spin" />
               <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-slate-900 rounded-full border border-slate-500 animate-spin" />
               <Target size={12} className="text-orange-400" />
               <span className="absolute -top-4 text-[6px] md:text-[7px] bg-black/80 px-1.5 py-0.5 rounded text-orange-300 font-bold whitespace-nowrap tracking-wider border border-orange-500/30">
                 {store.activeExpedition.status === 'ida' ? 'ROVER EXPLORANDO...' : 'ROVER RETORNANDO...'}
               </span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENSAGEM L.U.M.I. (Posicionada com mais segurança, adaptável ao conteúdo) */}
      <div className="absolute bottom-2 left-2 z-40 max-w-[200px] md:max-w-[260px] pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={lumiMessage}
          className="bg-cyan-950/60 backdrop-blur-md border border-cyan-500/50 rounded-xl p-2 md:p-3 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex gap-2.5 items-start pointer-events-auto"
        >
          <div className="p-1 md:p-1.5 bg-cyan-900/80 rounded-lg flex-shrink-0 relative overflow-hidden">
            <Bot size={16} className="text-cyan-400 relative z-10" />
            <div className="absolute inset-0 bg-cyan-400/20 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] md:text-[8px] font-black text-cyan-500 tracking-[0.2em] mb-0.5">L.U.M.I. SYSTEM</span>
            <p className="text-[9px] md:text-[10px] text-cyan-50 font-medium leading-snug">{lumiMessage}</p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

function ModuleWrapper({ children, id, name, pos, isBuilt, isWip }: { children: React.ReactNode, id: string, name: string, pos: string, isBuilt: boolean, isWip: boolean }) {
  if (!isBuilt && !isWip) return null;
  
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`absolute ${pos} flex flex-col items-center justify-end group`}>
      {isWip && !isBuilt ? (
        <div className="flex flex-col items-center">
          <Construction size={18} className="text-yellow-500 animate-pulse mb-1.5" />
          <div className="w-14 h-10 bg-slate-800/80 border border-dashed border-yellow-500/50 rounded-lg flex items-center justify-center">
            <div className="w-full h-1 bg-slate-900 mx-1.5 overflow-hidden"><div className="h-full bg-yellow-400 animate-[pulse_1s_infinite]" style={{ width: '50%' }} /></div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {children}
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-600 text-[7px] px-1.5 py-0.5 rounded font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {name}
            {isWip && <span className="text-yellow-400 ml-1">(UPGRADE)</span>}
          </span>
        </div>
      )}
    </motion.div>
  );
}