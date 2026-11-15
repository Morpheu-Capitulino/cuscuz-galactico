import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { Skull, Globe, CheckCircle, Info, AlertTriangle, Pickaxe, Droplets, Settings, Rocket, Trophy } from 'lucide-react';
import { useBaseSimulation } from './useBaseSimulation';
import { BaseHUD } from './BaseHUD';
import { ColonyMap } from './ColonyMap';
import { CrewPanel } from './CrewPanel';
import { CommandCenter } from './ManagementPanel';
import { GameModals } from './GameModals';
import { LumiTutorial } from './LumiTutorial';
import { AnimatePresence, motion } from 'framer-motion';
import { sfx } from './soundEffects';

function VictoryGoalTracker() {
  const store = useGameStore();
  if (store.isTrainingMode) return null;

  const isEn = store.language === 'en';
  const habLvl = store.moduleLevels['habitat'] || 0;
  const purLvl = store.moduleLevels['purifier'] || 0;
  const grnLvl = store.moduleLevels['greenhouse'] || 0;
  const resCount = store.research.length;

  const totalPoints = Math.min(3, habLvl) + Math.min(3, purLvl) + Math.min(3, grnLvl) + Math.min(4, resCount);
  const pct = Math.floor((totalPoints / 13) * 100);

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 rounded-xl px-4 py-1.5 flex items-center gap-3 shadow-lg pointer-events-auto" title={isEn ? "Upgrade Habitat, Purifier & Greenhouse to Lvl 3 + Complete all 4 Researches" : "Melhore Abrigo, Filtro e Estufa para o Nível 3 + Conclua as 4 Pesquisas"}>
      <Trophy size={14} className="text-yellow-400 shrink-0" />
      <div className="flex flex-col w-36 md:w-48">
        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-cyan-300 mb-0.5">
          <span>{isEn ? 'Colony Self-Sufficiency' : 'Autossuficiência Lunar'}</span>
          <span className="text-yellow-400">{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

function BottomNotificationBar() {
  const { notifications, removeNotification, language } = useGameStore();
  const isEn = language === 'en';
  const prevCountRef = useRef(notifications.length);

  // Toca som de sucesso sempre que entra uma nova notificação na fila
  useEffect(() => {
    if (notifications.length > prevCountRef.current) {
      sfx.playSuccess();
    }
    prevCountRef.current = notifications.length;
  }, [notifications.length]);

  const rewardQueue = notifications.filter(n => !!n.rewards);
  const currentReward = rewardQueue[0];

  const generalQueue = notifications.filter(n => !n.rewards);
  const currentGeneral = generalQueue[0];

  useEffect(() => {
    if (currentGeneral) {
      const timer = setTimeout(() => removeNotification(currentGeneral.id), 4500);
      return () => clearTimeout(timer);
    }
  }, [currentGeneral, removeNotification]);

  const ICONS: Record<string, any> = {
    success: <CheckCircle size={16} className="text-emerald-400" />,
    info: <Info size={16} className="text-cyan-400" />,
    alert: <AlertTriangle size={16} className="text-red-400" />
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {currentReward && (
          <motion.div
            key={`reward-popup-${currentReward.id}`}
            initial={{ opacity: 0, y: -40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[65] pointer-events-auto"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-emerald-400 rounded-2xl px-6 py-4 shadow-[0_0_50px_rgba(16,185,129,0.4)] flex flex-col items-center text-center min-w-[320px] relative">
              {rewardQueue.length > 1 && (
                <span className="absolute top-2.5 right-3 text-[9px] font-black bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  1/{rewardQueue.length}
                </span>
              )}

              <div className="flex items-center gap-2 text-emerald-400 font-black text-xs tracking-[0.2em] uppercase mb-1">
                <Rocket size={16} className="animate-bounce" />
                <span>{currentReward.title}</span>
              </div>
              <p className="text-slate-200 text-xs font-medium mb-3">{currentReward.message}</p>
              
              <div className="text-[9px] font-black text-emerald-300/80 uppercase tracking-widest mb-1.5">
                {isEn ? 'Resources Acquired' : 'Recursos Coletados'}
              </div>

              <div className="flex items-center justify-center gap-4 bg-slate-950/90 px-5 py-2.5 rounded-xl border border-emerald-500/40 shadow-inner">
                {!!currentReward.rewards.regolith && (
                  <div className="flex items-center gap-1.5 text-slate-200 font-black text-base">
                    <Pickaxe size={18} className="text-slate-400" />
                    <span>+{currentReward.rewards.regolith}</span>
                  </div>
                )}
                {!!currentReward.rewards.ice && (
                  <div className="flex items-center gap-1.5 text-blue-300 font-black text-base">
                    <Droplets size={18} className="text-blue-400" />
                    <span>+{currentReward.rewards.ice}</span>
                  </div>
                )}
                {!!currentReward.rewards.parts && (
                  <div className="flex items-center gap-1.5 text-orange-300 font-black text-base">
                    <Settings size={18} className="text-orange-400" />
                    <span>+{currentReward.rewards.parts}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => { sfx.playClick(); removeNotification(currentReward.id); }}
                className="mt-3 w-full text-[10px] font-black uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-500 py-2 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-colors"
              >
                {rewardQueue.length > 1 
                  ? (isEn ? `COLLECT (${rewardQueue.length - 1} NEXT)` : `RECEBER (+${rewardQueue.length - 1} NA FILA)`)
                  : (isEn ? 'COLLECT' : 'RECEBER')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!currentGeneral ? (
        <div className="flex-none h-10 bg-[#02050a] border-t border-cyan-950 flex items-center px-4 z-40" />
      ) : (
        <div className="flex-none h-10 bg-[#040a16] border-t border-cyan-900/60 flex items-center px-4 z-40 relative shadow-[0_-5px_20px_rgba(6,182,212,0.1)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGeneral.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-4 w-full"
            >
              <div className="flex items-center gap-2">
                {ICONS[currentGeneral.type]}
                <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{currentGeneral.title}</h4>
              </div>
              
              <div className="w-px h-4 bg-slate-700 mx-1" />
              
              <p className="text-[11px] text-cyan-100 font-medium truncate flex-1">{currentGeneral.message}</p>

              {generalQueue.length > 1 && (
                <span className="text-[9px] font-black text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-700/50">
                  +{generalQueue.length - 1} {isEn ? 'in queue' : 'na fila'}
                </span>
              )}

              <button 
                onClick={() => { sfx.playClick(); removeNotification(currentGeneral.id); }}
                className="text-[9px] font-black text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
              >
                OK
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default function BaseBuilder() {
  const store = useGameStore();
  const isEn = store.language === 'en';
  const navigate = useNavigate();
  
  const { activeEvent, setActiveEvent, lumiMessage, setLumiMessage } = useBaseSimulation();
  
  const pendingTask = store.pendingTask;
  const setPendingTask = store.setPendingTask;
  
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'construcao'|'exploracao'|'descobertas'>('construcao');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Toca a sirene quando ocorre uma emergência da NASA
  useEffect(() => {
    if (activeEvent) sfx.playAlert();
  }, [activeEvent]);

  // Toca fanfarra na vitória ou alerta na derrota
  useEffect(() => {
    if (store.missionStatus === 'vitoria') sfx.playVictory();
    else if (store.missionStatus === 'derrota') sfx.playAlert();
  }, [store.missionStatus]);

  useEffect(() => {
    if (store.tutorialStep === 'SUPPLIES_ARRIVAL' && !store.isTrainingMode) {
      store.startTutorial();
    }
  }, [store]);

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
    const isWin = store.missionStatus === 'vitoria';
    return (
      <div className="fixed inset-0 bg-[#02050a] z-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-lg w-full bg-slate-900/90 border-2 rounded-3xl p-8 shadow-2xl flex flex-col items-center"
             style={{ borderColor: isWin ? '#10b981' : '#ef4444' }}>
          {!isWin ? (
            <Skull size={80} className="text-red-500 mb-6 animate-pulse" />
          ) : (
            <Globe size={80} className="text-emerald-400 mb-6 animate-bounce" />
          )}
          <h1 className={`text-3xl md:text-4xl font-black tracking-[0.2em] uppercase mb-3 ${!isWin ? 'text-red-500' : 'text-emerald-400'}`}>
            {!isWin 
              ? (isEn ? 'THE COLONY FELL' : 'A COLÔNIA CAIU') 
              : (isEn ? 'SELF-SUFFICIENT COLONY!' : 'COLÔNIA AUTOSSUSTENTÁVEL!')}
          </h1>
          <p className="text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
            {!isWin
              ? (isEn ? 'Without vital resources, the crew could not endure the harsh lunar environment.' : 'Sem recursos vitais suficientes, a tripulação não resistiu ao ambiente hostil da Lua.')
              : (isEn ? `Congratulations, Commander! In ${store.clock.day} days, you mastered all technologies and upgraded all life support systems to Level 3!` : `Parabéns, Comandante! Em ${store.clock.day} dias, você dominou todas as tecnologias e elevou os suportes vitais ao Nível 3!`)}
          </p>
          <button 
            onClick={() => { sfx.playClick(); store.resetGame(); navigate('/'); }} 
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black tracking-widest py-4 px-8 rounded-xl transition-colors shadow-lg uppercase text-xs"
          >
            {isEn ? 'PLAY AGAIN' : 'JOGAR NOVAMENTE'}
          </button>
        </div>
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
          <VictoryGoalTracker />
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