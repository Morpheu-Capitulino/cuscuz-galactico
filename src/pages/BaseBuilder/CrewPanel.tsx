import { useState } from 'react';
import { useGameStore, type CrewMember } from '../../store/gameStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function CrewPanel() {
  const store = useGameStore();
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null);

  const getHealthColor = (val: number) => val > 70 ? 'bg-emerald-400' : val > 40 ? 'bg-yellow-400' : 'bg-red-500';
  const getEnergyColor = (val: number) => val > 70 ? 'bg-cyan-400' : val > 40 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <>
      {/* Unit Frames - Compactados, contidos DENTRO do espaço do mapa */}
      <div className="absolute right-2 top-2 bottom-2 overflow-y-auto overflow-x-hidden flex flex-col gap-1.5 z-40 pointer-events-none select-none pr-1 scrollbar-hide w-36 md:w-40">
        
        <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded flex items-center justify-between px-1.5 py-0.5 pointer-events-auto">
          <span className="text-[8px] font-black text-slate-300 flex items-center gap-1 uppercase tracking-widest"><Users size={9} className="text-cyan-500"/> TRIPULAÇÃO</span>
          <span className="text-[8px] font-mono text-cyan-400">{store.crew.length}/4</span>
        </div>

        {store.crew.map(member => {
          const isCrit = member.health < 40 || member.energy < 30;
          const inc = member.status === 'incapacitado';
          
          return (
            <motion.div 
              key={member.id} 
              whileHover={{ scale: 1.02, x: -2 }}
              onClick={() => setSelectedCrew(member)}
              className={`pointer-events-auto w-full bg-slate-950/85 backdrop-blur-md border ${inc ? 'border-red-600' : isCrit ? 'border-amber-500/80' : 'border-slate-700/60'} rounded p-1.5 flex flex-col shadow-lg relative overflow-hidden cursor-pointer hover:border-cyan-400/80 transition-all`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${inc ? 'bg-red-600' : 'bg-cyan-500'}`} />
              
              <div className="flex justify-between items-start mb-1 ml-1">
                <div className="overflow-hidden leading-none">
                  <h4 className={`text-[9px] md:text-[10px] font-black uppercase truncate ${inc ? 'text-red-500' : 'text-slate-100'}`}>{member.name}</h4>
                  <span className="text-[7px] md:text-[8px] text-cyan-500 font-bold tracking-wider block mt-0.5">{member.role}</span>
                </div>
                <span className={`text-[6px] md:text-[7px] px-1 py-0.5 rounded font-black whitespace-nowrap border ${member.status === 'descansando' ? 'bg-indigo-950 text-indigo-300 border-indigo-700/50' : member.status === 'incapacitado' ? 'bg-red-950 text-red-300 border-red-700/50' : 'bg-slate-900 text-slate-400 border-slate-700'}`}>
                  {member.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1 ml-1 mt-1">
                <div className="relative h-1.5 bg-slate-900 rounded-sm border border-slate-800 overflow-hidden">
                  <motion.div layout className={`h-full ${getHealthColor(member.health)}`} style={{width: `${member.health}%`}} />
                </div>
                <div className="relative h-1.5 bg-slate-900 rounded-sm border border-slate-800 overflow-hidden">
                  <motion.div layout className={`h-full ${getEnergyColor(member.energy)}`} style={{width: `${member.energy}%`}} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Interativo Individual */}
      <AnimatePresence>
        {selectedCrew && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-cyan-800 p-5 rounded-2xl max-w-[280px] w-full shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              <h2 className="text-base font-black mb-0.5 uppercase">{selectedCrew.name}</h2>
              <p className="text-cyan-400 text-[9px] md:text-[10px] font-bold mb-3 uppercase tracking-widest">{selectedCrew.role}</p>
              
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 mb-4">
                 <p className="text-[8px] text-slate-400 mb-1 uppercase font-bold tracking-widest">Diagnóstico L.U.M.I:</p>
                 <p className="text-xs font-bold text-slate-200 leading-snug">
                   {selectedCrew.status === 'incapacitado' ? 'Atenção Crítica! Este membro sofreu um colapso. Requer tempo na Enfermaria ou Dormitório.' 
                   : selectedCrew.energy < 40 ? 'Sinais de exaustão extrema detectados. Recomendo repouso imediato.' 
                   : 'Parâmetros vitais estáveis. Pronto para servir.'}
                 </p>
              </div>

              <div className="flex gap-2">
                {selectedCrew.status === 'ativo' ? (
                  <button onClick={() => { store.setCrewStatus(selectedCrew.id, 'descansando'); setSelectedCrew(null); }} className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg font-black text-[9px] text-white tracking-widest transition-colors">DESCANSO</button>
                ) : selectedCrew.status === 'descansando' ? (
                  <button onClick={() => { store.setCrewStatus(selectedCrew.id, 'ativo'); setSelectedCrew(null); }} className="flex-1 bg-cyan-600 hover:bg-cyan-500 py-2 rounded-lg font-black text-[9px] text-white tracking-widest transition-colors">RETORNAR À ATIVA</button>
                ) : (
                  <button disabled className="flex-1 bg-red-900/30 border border-red-500/50 py-2 rounded-lg font-black text-[9px] text-red-400 tracking-widest cursor-not-allowed">INCAPACITADO</button>
                )}
                <button onClick={() => setSelectedCrew(null)} className="px-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-black text-slate-300 transition-colors">X</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}