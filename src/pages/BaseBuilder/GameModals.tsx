import { useGameStore } from '../../store/gameStore';
import type { BaseEvent } from './data';
import { AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface GameModalsProps {
  activeEvent: BaseEvent | null;
  setActiveEvent: (ev: BaseEvent | null) => void;
  setLumiMessage: (msg: string) => void;
}

export function GameModals({ activeEvent, setActiveEvent, setLumiMessage }: GameModalsProps) {
  const store = useGameStore();

  const handleBaseEventChoice = (choice: any) => {
    const inv = store.inventory;
    if (choice.cost.parts && inv.parts < choice.cost.parts) return;
    if (choice.cost.parts) store.collectResource('parts', -choice.cost.parts);
    if (choice.dmg) store.applyEventDamage(choice.dmg);
    
    setActiveEvent(null);
    store.togglePause(false);
    setLumiMessage('Situação resolvida. A simulação continua.');
  };

  return (
    <>
      {/* MODAL DE EVENTO DA EXPEDIÇÃO */}
      <AnimatePresence>
        {store.activeExpedition?.currentEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-slate-900 border-2 border-orange-500 rounded-2xl p-6 max-w-lg w-full text-center shadow-[0_0_50px_rgba(249,115,22,0.4)]">
                <AlertTriangle size={60} className="text-orange-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-orange-400 font-black text-xl tracking-[0.2em] mb-2 uppercase">TRANSMISSÃO DO ROVER</h2>
                <h3 className="text-white font-bold text-lg mb-4 uppercase">{store.activeExpedition.currentEvent.title}</h3>
                <p className="text-slate-300 text-sm mb-6">{store.activeExpedition.currentEvent.desc}</p>
                
                <div className="flex flex-col gap-3">
                  {store.activeExpedition.currentEvent.options.map((opt, i) => (
                    <button key={i} onClick={() => store.resolveExpeditionEvent(opt)} className="p-4 rounded-xl border border-slate-500 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex justify-between items-center">
                      <span>{opt.text}</span>
                      {opt.dmg && opt.dmg.amount > 0 && <span className="text-red-400">RISCO DE DANO</span>}
                      {opt.reward && <span className="text-emerald-400">RECOMPENSA EXTRA</span>}
                    </button>
                  ))}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE EVENTO DA BASE */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-slate-900 border-2 border-red-500 rounded-2xl p-6 max-w-lg w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                <AlertTriangle size={60} className="text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-red-400 font-black text-xl tracking-[0.2em] mb-2 uppercase">EMERGÊNCIA NA BASE!</h2>
                <h3 className="text-white font-bold text-lg mb-4 uppercase">{activeEvent.title}</h3>
                <p className="text-slate-300 text-sm mb-6">{activeEvent.desc}</p>
                
                <div className="flex flex-col gap-3">
                  {activeEvent.options.map((opt, i) => {
                    const canAfford = (!opt.cost.parts || store.inventory.parts >= opt.cost.parts);
                    return (
                      <button key={i} onClick={() => handleBaseEventChoice(opt)} disabled={!canAfford} className={`p-4 rounded-xl border font-bold text-xs flex justify-between items-center ${canAfford ? 'bg-slate-800 border-slate-500 hover:bg-slate-700 text-white' : 'bg-slate-900 border-red-900 text-slate-600 cursor-not-allowed'}`}>
                        <span>{opt.text}</span>
                        {opt.dmg && opt.dmg.amount > 0 && <span className="text-red-400">PERDE {opt.dmg.amount}% {opt.dmg.type.toUpperCase()}</span>}
                      </button>
                    )
                  })}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}