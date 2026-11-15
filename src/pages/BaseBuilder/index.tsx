import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { Skull, Globe, CheckCircle, Info, AlertTriangle, Pickaxe, Droplets, Settings } from 'lucide-react';
import { useBaseSimulation } from './useBaseSimulation';
import { BaseHUD } from './BaseHUD';
import { ColonyMap } from './ColonyMap';
import { CrewPanel } from './CrewPanel';
import { CommandCenter } from './ManagementPanel';
import { GameModals } from './GameModals';
import { LumiTutorial } from './LumiTutorial';
import { AnimatePresence, motion } from 'framer-motion';

function BottomNotificationBar() {
  const { notifications, removeNotification } = useGameStore();
  const latest = notifications[notifications.length - 1];

  useEffect(() => {
    if (latest) {
      const timer = setTimeout(() => removeNotification(latest.id), 6000);
      return () => clearTimeout(timer);
    }
  }, [latest, removeNotification]);

  if (!latest) return <div className="flex-none h-10 bg-[#02050a] border-t border-cyan-950 flex items-center px-4 z-40" />;

  const ICONS = {
    success: <CheckCircle size={16} className="text-emerald-400" />,
    info: <Info size={16} className="text-cyan-400" />,
    alert: <AlertTriangle size={16} className="text-red-400" />
  };

  return (
    <div className="flex-none h-10 bg-[#040a16] border-t border-cyan-900/60 flex items-center px-4 z-40 relative shadow-[0_-5px_20px_rgba(6,182,212,0.1)]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={latest.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex items-center gap-4 w-full"
        >
          <div className="flex items-center gap-2">
            {ICONS[latest.type]}
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{latest.title}</h4>
          </div>
          
          <div className="w-px h-4 bg-slate-700 mx-1" />
          
          <p className="text-[11px] text-cyan-100 font-medium truncate flex-1">{latest.message}</p>
          
          {latest.rewards && (
            <div className="flex gap-4 text-[10px] font-black bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
               {!!latest.rewards.regolith && <span className="flex items-center gap-1.5 text-slate-300"><Pickaxe size={12}/> {latest.rewards.regolith}</span>}
               {!!latest.rewards.ice && <span className="flex items-center gap-1.5 text-blue-300"><Droplets size={12}/> {latest.rewards.ice}</span>}
               {!!latest.rewards.parts && <span className="flex items-center gap-1.5 text-orange-300"><Settings size={12}/> {latest.rewards.parts}</span>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function BaseBuilder() {
  const store = useGameStore();
  const navigate = useNavigate();
  
  const { activeEvent, setActiveEvent, lumiMessage, setLumiMessage } = useBaseSimulation();
  
  const pendingTask = store.pendingTask;
  const setPendingTask = store.setPendingTask;
  
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'construcao'|'exploracao'|'descobertas'>('construcao');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // === MAGIA AQUI: Inicia o tutorial assim que a tela da Base Builder abre ===
  useEffect(() => {
    if (store.tutorialStep === 'SUPPLIES_ARRIVAL' && !store.isTrainingMode) {
      store.startTutorial(); // Tira a foto do inventário da nave e dá 99.999.999
    }
  }, [store]);

  // === LIMPEZA DE INTERFACE AO FINALIZAR O TUTORIAL ===
  useEffect(() => {
    if (store.tutorialStep === 'COMPLETED') {
      setActiveTab('construcao'); 
      setSelectedNode(null); 
      setIsLeftPanelOpen(true); 
      setActiveEvent(null); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.tutorialStep]);

  const handleSelectNodeFromMap = (id: string, tab: 'construcao'|'exploracao'|'descobertas') => {
    setActiveTab(tab);
    setSelectedNode(id);
    setIsLeftPanelOpen(true);
  };

  if (store.missionStatus !== 'jogando') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4 text-center">
        {store.missionStatus === 'derrota' ? (
          <Skull size={80} className="text-red-500 mb-6 mx-auto animate-pulse" />
        ) : (
          <Globe size={80} className="text-emerald-500 mb-6 mx-auto animate-bounce" />
        )}
        <h1 className={`text-4xl md:text-5xl font-black tracking-[0.3em] uppercase mb-4 ${store.missionStatus === 'derrota' ? 'text-red-500' : 'text-emerald-400'}`}>
          {store.missionStatus === 'derrota' ? 'A COLÔNIA CAIU' : 'MISSÃO CONCLUÍDA!'}
        </h1>
        <button 
          onClick={() => { store.resetGame(); navigate('/'); }} 
          className="bg-slate-800 text-white font-black tracking-widest py-4 px-8 rounded-xl border-2 border-slate-600 hover:bg-slate-700"
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh w-full bg-[#02050a] font-sans text-white overflow-hidden select-none relative">
      <BaseHUD />

      <div className="flex-1 flex overflow-hidden relative">
        <CommandCenter 
          isOpen={isLeftPanelOpen} 
          setIsOpen={setIsLeftPanelOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedId={selectedNode}
          setSelectedId={setSelectedNode}
          setPendingTask={setPendingTask}
          setLumiMessage={setLumiMessage}
        />

        <div className="flex-1 relative bg-black/50">
          <ColonyMap 
            lumiMessage={lumiMessage} 
            selectedNode={selectedNode} 
            onSelectNode={handleSelectNodeFromMap} 
          />
        </div>

        <CrewPanel />
      </div>

      <BottomNotificationBar />
      <LumiTutorial />

      <GameModals 
        activeEvent={activeEvent} 
        setActiveEvent={setActiveEvent} 
        setLumiMessage={setLumiMessage} 
        pendingTask={pendingTask}
        setPendingTask={setPendingTask}
      />
    </div>
  );
}