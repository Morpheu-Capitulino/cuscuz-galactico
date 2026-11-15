import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { AlertTriangle, UserPlus, Zap, Pickaxe, Droplets, Settings, Skull } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PendingTask } from '../../store/gameStore';
import { sfx } from './soundEffects';

interface GameModalsProps {
  activeEvent: any | null;
  setActiveEvent: (ev: any | null) => void;
  setLumiMessage: (msg: string) => void;
  pendingTask: PendingTask | null;
  setPendingTask: (task: PendingTask | null) => void;
}

export function GameModals({ activeEvent, setActiveEvent, setLumiMessage, pendingTask, setPendingTask }: GameModalsProps) {
  const store = useGameStore();
  const isEn = store.language === 'en';
  
  const [eventOutcome, setEventOutcome] = useState<{ msg: string, isBad: boolean } | null>(null);

  const handleBaseEventChoice = (choice: any) => {
    const inv = store.inventory;
    
    if (choice.cost.parts && inv.parts < choice.cost.parts) return;
    if (choice.cost.regolith && inv.regolith < choice.cost.regolith) return;
    if (choice.cost.ice && inv.ice < choice.cost.ice) return;
    
    if (choice.cost.parts) store.collectResource('parts', -choice.cost.parts);
    if (choice.cost.regolith) store.collectResource('regolith', -choice.cost.regolith);
    if (choice.cost.ice) store.collectResource('ice', -choice.cost.ice);
    
    const isBad = !!(choice.dmg && choice.dmg.amount > 0);
    if (isBad) store.applyEventDamage(choice.dmg);
    
    setActiveEvent(null);
    
    setEventOutcome({
      msg: choice.outcomeMsg || (isEn ? 'Emergency successfully contained.' : 'Emergência resolvida com sucesso.'),
      isBad: isBad
    });
  };

  const closeOutcome = () => {
    setEventOutcome(null);
    store.togglePause(false); 
  };

  const handleAssignAndStart = (crewId: string, crewName: string, role: string) => {
    if (!pendingTask) return;
    
    if (pendingTask.type === 'building' || pendingTask.type === 'upgrade') {
      sfx.playBuild();
      if (pendingTask.data.currentLvl === 0) store.startBuilding(pendingTask.targetId, pendingTask.data.cost);
      else store.startUpgrade(pendingTask.targetId, pendingTask.data.cost);
    } else if (pendingTask.type === 'research') {
      sfx.playResearch(); // <-- Som de laboratório ao iniciar pesquisa
      store.startResearch(pendingTask.targetId, pendingTask.data.cost, pendingTask.data.duration);
    } else if (pendingTask.type === 'expedition') {
      sfx.playExpedition(); // <-- Som de partida do Rover
      store.startExpedition(pendingTask.data.exp);
    }

    store.assignCrew(crewId, { type: pendingTask.type, targetId: pendingTask.targetId });
    setLumiMessage(isEn ? `${crewName} started [${pendingTask.title}]. ${role} specialty activated if compatible!` : `${crewName} assumiu a missão [${pendingTask.title}]. Especialidade de ${role} ativada se compatível!`);
    
    setPendingTask(null);
  };

  const availableCrew = store.crew.filter(c => c.status === 'ativo' && !c.assignment);

  const hasAffordableOption = activeEvent?.options.some((opt: any) => {
    const inv = store.inventory;
    return (!opt.cost.parts || inv.parts >= opt.cost.parts) &&
           (!opt.cost.regolith || inv.regolith >= opt.cost.regolith) &&
           (!opt.cost.ice || inv.ice >= opt.cost.ice);
  });

  return (
    <>
      <AnimatePresence>
        {pendingTask && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl p-5 max-w-sm w-full shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-700/50 pb-3">
                  <div className="p-2 bg-cyan-950 rounded-lg"><UserPlus size={20} className="text-cyan-400" /></div>
                  <div>
                    <h2 className="text-cyan-400 font-black text-sm tracking-widest uppercase">{isEn ? 'ASSIGN CREW' : 'OBRIGATÓRIO DESIGNAR'}</h2>
                    <p className="text-slate-300 text-[10px] uppercase font-bold">{isEn ? 'Task' : 'Tarefa'}: {pendingTask.title}</p>
                  </div>
                </div>
                
                {availableCrew.length === 0 ? (
                  <div className="text-center py-4 bg-red-950/30 border border-red-900/50 rounded-xl mb-4">
                    <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">{isEn ? 'No crew available' : 'Nenhuma equipe disponível'}</p>
                    <p className="text-slate-400 text-[9px] mt-1 px-4">{isEn ? 'All astronauts are busy, resting, or incapacitated.' : 'Todos os astronautas estão ocupados, descansando ou incapacitados.'}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {store.crew.map(c => {
                      const isAvailable = c.status === 'ativo' && !c.assignment;
                      const isOptimal = 
                        (pendingTask.type === 'building' || pendingTask.type === 'upgrade') && c.role === 'Engenheiro' ||
                        (pendingTask.type === 'research') && c.role === 'Astrobiólogo' ||
                        (pendingTask.type === 'expedition') && (c.role === 'Comandante' || c.role === 'Astrobiólogo');
                      
                      return (
                        <button 
                          key={c.id} 
                          disabled={!isAvailable} 
                          data-tutorial={c.role === 'Engenheiro' ? 'assign-engineer' : undefined}
                          onClick={() => handleAssignAndStart(c.id, c.name, c.role)} 
                          className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${isAvailable ? 'bg-slate-800 border-slate-600 hover:border-cyan-400 hover:bg-slate-700 cursor-pointer' : 'bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed'}`}
                        >
                          <div>
                            <h4 className="text-[11px] font-black uppercase text-white">{c.name}</h4>
                            <span className="text-[9px] text-cyan-400 font-bold">{c.role}</span>
                          </div>
                          <div className="text-right flex flex-col items-end gap-1">
                            {!isAvailable ? (
                              <span className="text-[8px] font-black text-amber-500 bg-amber-950 px-1.5 py-0.5 rounded uppercase">{isEn ? 'Busy / Rest' : 'Ocupado / Descanso'}</span>
                            ) : isOptimal ? (
                              <span className="text-[8px] font-black text-emerald-400 bg-emerald-950 border border-emerald-900/50 px-1.5 py-0.5 rounded uppercase flex items-center gap-1"><Zap size={8}/> {isEn ? 'Max Bonus' : 'Bônus Máximo'}</span>
                            ) : (
                              <span className="text-[8px] font-black text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded uppercase">{isEn ? 'Normal' : 'Suporte Comum'}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                <button onClick={() => setPendingTask(null)} className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-black tracking-widest text-slate-300 transition-colors">{isEn ? 'CANCEL' : 'CANCELAR'}</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-slate-900 border-2 border-red-500 rounded-2xl p-6 max-w-lg w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                <AlertTriangle size={50} className="text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-red-400 font-black text-lg tracking-[0.2em] mb-2 uppercase">{isEn ? 'L.U.M.I. ALERT!' : 'ALERTA DA L.U.M.I!'}</h2>
                <h3 className="text-white font-bold text-base mb-3 uppercase">{activeEvent.title}</h3>
                <p className="text-slate-300 text-[11px] mb-5 leading-relaxed">{activeEvent.desc}</p>
                
                <div className="flex flex-col gap-2.5">
                  {activeEvent.options.map((opt: any, i: number) => {
                    const canAfford = 
                      (!opt.cost.parts || store.inventory.parts >= opt.cost.parts) &&
                      (!opt.cost.regolith || store.inventory.regolith >= opt.cost.regolith) &&
                      (!opt.cost.ice || store.inventory.ice >= opt.cost.ice);

                    return (
                      <button 
                        key={i} 
                        onClick={() => handleBaseEventChoice(opt)} 
                        disabled={!canAfford} 
                        className={`p-3 rounded-xl border flex justify-between items-center transition-colors uppercase ${canAfford ? 'bg-slate-800 border-slate-600 hover:bg-slate-700 text-white' : 'bg-slate-900 border-red-900/40 text-slate-600 cursor-not-allowed'}`}
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-bold text-[10px]">{opt.text}</span>
                          <div className="flex gap-2 text-[9px] font-black">
                            {!!opt.cost.regolith && <span className="flex items-center gap-1 text-slate-400"><Pickaxe size={10}/> {opt.cost.regolith}</span>}
                            {!!opt.cost.ice && <span className="flex items-center gap-1 text-blue-400"><Droplets size={10}/> {opt.cost.ice}</span>}
                            {!!opt.cost.parts && <span className="flex items-center gap-1 text-orange-400"><Settings size={10}/> {opt.cost.parts}</span>}
                          </div>
                        </div>
                        {opt.dmg && opt.dmg.amount > 0 && <span className="text-red-400 font-black text-[9px] ml-4 bg-red-950/50 px-2 py-1 rounded">{isEn ? 'DAMAGE RISK' : 'RISCO DE DANO'}</span>}
                      </button>
                    )
                  })}

                  {!hasAffordableOption && (
                    <button 
                      onClick={() => {
                        store.applyEventDamage({ type: 'shield', amount: 50 }); 
                        setActiveEvent(null);
                        setEventOutcome({
                          msg: isEn ? "We didn't have enough resources to react in time! The base suffered a critical impact and our shields took brutal damage." : 'Nós não tínhamos recursos suficientes para reagir a tempo! A base sofreu um impacto crítico e os nossos escudos cederam brutalmente.',
                          isBad: true
                        });
                      }}
                      className="mt-4 p-3 rounded-xl border-2 border-red-600 bg-red-950 hover:bg-red-900 text-white flex justify-center items-center transition-colors uppercase shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse"
                    >
                      <Skull size={14} className="mr-2" />
                      <span className="font-black text-[10px]">{isEn ? 'TAKE THE HIT (NO RESOURCES)' : 'SOFRER O IMPACTO (SEM RECURSOS)'}</span>
                    </button>
                  )}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {eventOutcome && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <div className={`bg-[#071a3b] border-2 ${eventOutcome.isBad ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]' : 'border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.3)]'} rounded-2xl p-6 max-w-md w-full text-center flex flex-col items-center relative overflow-hidden`}>
                
                <div className={`absolute top-0 left-0 w-full h-1.5 ${eventOutcome.isBad ? 'bg-red-500' : 'bg-cyan-400'}`} />
                
                <div className="w-20 h-20 mb-4 shrink-0 relative">
                  <div className={`absolute inset-0 rounded-full blur-xl opacity-40 ${eventOutcome.isBad ? 'bg-red-500' : 'bg-cyan-400'}`} />
                  <img src="/LUMI_robozinho.png" alt="L.U.M.I." className="w-full h-full object-contain relative z-10 animate-[float_3s_ease-in-out_infinite]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                
                <h2 className={`font-black text-base tracking-[0.2em] mb-4 uppercase ${eventOutcome.isBad ? 'text-red-400' : 'text-cyan-400'}`}>
                   {eventOutcome.isBad ? (isEn ? 'CONSEQUENCE ALERT' : 'ALERTA DE CONSEQUÊNCIA') : (isEn ? 'L.U.M.I. REPORT' : 'RELATÓRIO DA L.U.M.I.')}
                </h2>
                
                <p className="text-slate-200 text-sm mb-6 leading-relaxed bg-[#0c1424] p-4 rounded-xl border border-slate-700 shadow-inner">
                  {eventOutcome.msg}
                </p>
                
                <button onClick={closeOutcome} className={`w-full py-3 rounded-xl font-black tracking-widest uppercase transition-colors text-white ${eventOutcome.isBad ? 'bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_rgba(8,145,178,0.5)]'}`}>
                  {isEn ? 'UNDERSTOOD' : 'ENTENDIDO'}
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}