import { useGameStore } from '../../store/gameStore';
import { STRUCTURES, EXPEDITIONS, RESEARCH_TREE } from './data';
import { Target, FlaskConical, Lock, CheckCircle2, Rocket, Pickaxe, Droplets, Settings, ArrowRight, Home, Sprout, Sun, Shield, HeartPulse, BedDouble, Info, ChevronLeft, ChevronRight, Hammer } from 'lucide-react';
import type { PendingTask } from '../../store/gameStore';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, any> = {
  habitat: Home, purifier: Droplets, greenhouse: Sprout,
  solar: Sun, radiation: Shield, medical: HeartPulse, dormitory: BedDouble
};

export function CommandCenter({ isOpen, setIsOpen, activeTab, setActiveTab, selectedId, setSelectedId, setPendingTask, setLumiMessage }: { 
  isOpen: boolean; setIsOpen: (v: boolean) => void;
  activeTab: 'construcao'|'exploracao'|'descobertas'; setActiveTab: (t: any) => void;
  selectedId: string | null; setSelectedId: (id: string | null) => void;
  setPendingTask: (task: PendingTask | null) => void;
  setLumiMessage: (msg: string) => void;
}) {
  const store = useGameStore();

  const handleTabChange = (tab: 'construcao'|'exploracao'|'descobertas') => {
    setActiveTab(tab);
    setSelectedId(null);
    if (!isOpen) setIsOpen(true);

    // MÁGICA AQUI: O clique na aba aciona o avanço do tutorial!
    if (store.tutorialStep === 'EXPLORATION_INTRO' && tab === 'exploracao') {
      store.advanceTutorial('RESEARCH_INTRO');
    }
    else if (store.tutorialStep === 'RESEARCH_INTRO' && tab === 'descobertas') {
      store.endTutorial(); // Finaliza e reseta os recursos!
    }
  };

  const handleHoverStructure = (id: string) => {
    const s = STRUCTURES.find(x => x.id === id);
    if (!s) return;
    const lvl = store.moduleLevels[id] || 0;
    const isWIP = store.buildingModules.some(b => b.id === id) || store.upgradingModules?.some(u => u.id === id);
    
    let msg = `Comandante, o ${s.name} ${s.desc.toLowerCase()}`;
    if (isWIP) msg = `Nossos robôs estão trabalhando no ${s.name}. Ficará pronto em breve!`;
    else if (lvl === 0) msg = `Ainda precisamos construir o ${s.name}. Ele será essencial.`;
    else if (lvl === 3) msg = `Nosso ${s.name} já atingiu o nível máximo de eficiência!`;
    else msg = `Nosso ${s.name} está operante no Nível ${lvl}. Podemos melhorá-lo ainda mais.`;
    
    setLumiMessage(msg);
  };

  const renderStructuresList = () => (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-2 gap-4">
        {STRUCTURES.map(s => {
          const Icon = ICON_MAP[s.id];
          const lvl = store.moduleLevels[s.id] || 0;
          const isWIP = store.buildingModules.some(b => b.id === s.id) || store.upgradingModules?.some(u => u.id === s.id);
          
          return (
            <button 
              key={s.id}
              data-tutorial={s.id === 'habitat' && !selectedId ? 'build-habitat' : undefined}
              onMouseEnter={() => handleHoverStructure(s.id)}
              onClick={() => setSelectedId(s.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all group overflow-hidden ${lvl > 0 ? 'bg-cyan-950/20 border-cyan-900/50 hover:border-cyan-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}`}
            >
              <Icon size={32} className={`mb-2 transition-transform group-hover:scale-110 ${lvl > 0 ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-slate-500'}`} />
              <span className={`text-[9px] font-black tracking-widest uppercase text-center ${lvl > 0 ? 'text-cyan-100' : 'text-slate-400'}`}>{s.name}</span>
              
              {isWIP && <div className="absolute inset-0 bg-yellow-500/10 border border-yellow-500/50 animate-pulse rounded-xl" />}
              {lvl > 0 && <span className="absolute top-1.5 right-1.5 text-[8px] font-black bg-cyan-900 px-1 rounded text-cyan-100">L{lvl}</span>}
            </button>
          )
        })}
      </div>
    </div>
  );

  const renderStructureDetails = () => {
    if (!selectedId) return null;
    const s = STRUCTURES.find(x => x.id === selectedId);
    if (!s) return null;

    const Icon = ICON_MAP[s.id];
    const currentLvl = store.moduleLevels?.[s.id] || 0;
    
    const wipModule = store.buildingModules.find(b => b.id === s.id) || store.upgradingModules?.find(u => u.id === s.id);
    const progress = wipModule ? Math.floor(wipModule.progress) : 0;
    const isWIP = !!wipModule;
    const isMax = currentLvl >= 3;
    const nextLvlData = s.levels[currentLvl]; 
    
    const canAfford = !isMax && nextLvlData && (
      store.isTrainingMode || (
        store.inventory.regolith >= (nextLvlData.cost.regolith || 0) && 
        store.inventory.parts >= (nextLvlData.cost.parts || 0) && 
        store.inventory.ice >= (nextLvlData.cost.ice || 0)
      )
    );

    return (
      <div className="flex flex-col h-full bg-slate-900">
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-950/50">
          <button 
            onClick={() => setSelectedId(null)} 
            data-tutorial={s.id !== 'habitat' && (store.tutorialStep === 'BUILD_HABITAT' || store.tutorialStep === 'ASSIGN_ENGINEER') ? 'build-habitat' : undefined} 
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
          >
            <ChevronLeft size={16}/>
          </button>
          <Icon size={24} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          <h2 className="text-sm font-black uppercase text-white tracking-widest">{s.name}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{s.desc}</p>
          
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-auto">
            <h4 className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Info size={12}/> EVOLUÇÃO E BENEFÍCIOS</h4>
            <div className="flex flex-col gap-3">
              {s.levels.map((lvl, idx) => {
                const statusClass = currentLvl > idx ? 'text-emerald-400' : currentLvl === idx ? 'text-cyan-300' : 'text-slate-600';
                return (
                  <div key={idx} className={`flex flex-col p-2 rounded-lg border border-transparent transition-colors hover:bg-slate-900 cursor-default ${currentLvl === idx ? 'bg-slate-900/50 border-cyan-900/50' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase ${statusClass}`}>NÍVEL {idx + 1}</span>
                      {currentLvl > idx ? <CheckCircle2 size={12} className="text-emerald-500" /> : currentLvl === idx ? <span className="text-[8px] bg-cyan-900/80 px-1 rounded text-cyan-100 uppercase">Próximo</span> : <Lock size={12} className="text-slate-600" />}
                    </div>
                    <span className={`text-[10px] leading-snug ${currentLvl > idx ? 'text-slate-300' : currentLvl === idx ? 'text-cyan-100' : 'text-slate-500'}`}>{lvl.effect}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {isWIP && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                <span>Progresso da Obra</span>
                <span className="text-yellow-400">{progress}%</span>
              </div>
              <div data-tutorial={s.id === 'habitat' ? 'habitat-progress' : undefined} className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-yellow-400 transition-all duration-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          {isMax ? (
             <span className="flex items-center justify-center w-full py-2.5 rounded-lg text-[10px] font-black text-purple-400 bg-purple-950/40 border border-purple-900/40 uppercase tracking-widest"><CheckCircle2 size={14} className="mr-1.5"/> CAPACIDADE MÁXIMA</span>
          ) : isWIP ? (
             <span className="flex items-center justify-center w-full py-2.5 rounded-lg text-[10px] font-black text-yellow-400 bg-yellow-950/40 border border-yellow-900/40 uppercase tracking-widest animate-pulse"><Hammer size={14} className="mr-1.5"/> OBRA EM ANDAMENTO...</span>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-center gap-3 text-[10px] font-black bg-slate-900 py-2 rounded-lg border border-slate-800">
                 {!!nextLvlData?.cost.regolith && <span className="flex items-center gap-1 text-slate-300"><Pickaxe size={12}/> {nextLvlData.cost.regolith}</span>}
                 {!!nextLvlData?.cost.ice && <span className="flex items-center gap-1 text-blue-300"><Droplets size={12}/> {nextLvlData.cost.ice}</span>}
                 {!!nextLvlData?.cost.parts && <span className="flex items-center gap-1 text-orange-300"><Settings size={12}/> {nextLvlData.cost.parts}</span>}
              </div>
              <button 
                data-tutorial={s.id === 'habitat' ? (store.tutorialStep === 'ASSIGN_ENGINEER' && !store.pendingTask ? 'assign-engineer' : 'build-habitat') : undefined}
                onClick={() => setPendingTask({ type: currentLvl === 0 ? 'building' : 'upgrade', targetId: s.id, title: s.name, data: { cost: nextLvlData.cost, currentLvl } })} 
                disabled={!canAfford} 
                className={`w-full py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors shadow-lg flex items-center justify-center gap-1.5 ${canAfford ? 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              >
                {currentLvl === 0 ? 'CONSTRUIR' : 'MELHORAR'} <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderExplorationList = () => (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto scrollbar-hide">
      {EXPEDITIONS.map(exp => {
        const isActive = store.activeExpedition?.id === exp.id;
        return (
          <button 
            key={exp.id} onMouseEnter={() => setLumiMessage(`A expedição ${exp.name} tem risco ${exp.risk}. Pode nos trazer recursos cruciais!`)}
            onClick={() => setSelectedId(exp.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all group flex flex-col gap-3 shadow-lg ${isActive ? 'bg-slate-900 border-orange-500 shadow-orange-500/20' : 'bg-slate-900 border-slate-800 hover:border-orange-500/70'}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 group-hover:bg-orange-900/30 transition-colors">
                <Target size={16} className={isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-orange-400'} />
              </div>
              <h3 className={`text-xs font-black uppercase tracking-widest ${isActive ? 'text-orange-400' : 'text-slate-200 group-hover:text-white'}`}>{exp.name}</h3>
            </div>
            
            <div className="flex justify-between w-full text-[10px] font-black uppercase">
              <span className="text-slate-500">Perigo: <span className={exp.risk === 'Alto' ? 'text-red-500' : exp.risk === 'Moderado' ? 'text-yellow-400' : 'text-emerald-400'}>{exp.risk}</span></span>
              <span className="text-slate-500">Duração: <span className="text-white">{exp.duration}s</span></span>
            </div>
          </button>
        )
      })}
    </div>
  );

  const renderExplorationDetails = () => {
    if (!selectedId) return null;
    const exp = EXPEDITIONS.find(x => x.id === selectedId);
    if (!exp) return null;
    const isActive = store.activeExpedition?.id === exp.id;
    const activeExp = store.activeExpedition;

    return (
      <div className="flex flex-col h-full bg-slate-900">
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-950/50">
          <button onClick={() => setSelectedId(null)} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"><ChevronLeft size={16}/></button>
          <Target size={24} className="text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
          <h2 className="text-sm font-black uppercase text-white tracking-widest">{exp.name}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{exp.desc}</p>
          
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-around text-center mb-auto">
            <div>
               <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase block mb-1">Risco</span>
               <span className={`text-xs font-black uppercase ${exp.risk === 'Alto' ? 'text-red-400' : exp.risk === 'Moderado' ? 'text-yellow-400' : 'text-emerald-400'}`}>{exp.risk}</span>
            </div>
            <div className="w-px bg-slate-800" />
            <div>
               <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase block mb-1">Duração</span>
               <span className="text-xs font-black text-white uppercase">{exp.duration} Ciclos</span>
            </div>
          </div>

          {isActive && activeExp && (
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col mt-2 shadow-inner">
               <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
                 <span>Progresso da Missão</span>
                 <span className="text-orange-400">{Math.floor(activeExp.progress)}%</span>
               </div>
               <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700 mb-3">
                 <div className="h-full bg-orange-500 transition-all duration-300 shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ width: `${activeExp.progress}%` }} />
               </div>
               <div className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                 STATUS: <span className="text-white animate-pulse">{activeExp.status}</span>
               </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          {isActive ? (
            <span className="flex items-center justify-center w-full py-3 rounded-xl text-[10px] font-black text-orange-400 bg-orange-950/40 border border-orange-900/40 uppercase tracking-widest animate-pulse">
              <Rocket size={14} className="mr-1.5"/> MISSÃO EM ANDAMENTO
            </span>
          ) : (
            <button onClick={() => setPendingTask({ type: 'expedition', targetId: exp.id, title: exp.name, data: { exp } })} className="w-full py-3 rounded-xl text-[10px] font-black tracking-widest uppercase bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center gap-1.5 transition-colors">
              INICIAR EXPEDIÇÃO <Rocket size={14}/>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderResearchList = () => (
    <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto scrollbar-hide">
      {RESEARCH_TREE.map(r => {
        const isUnlocked = store.research.includes(r.id);
        const isActive = store.activeResearch?.id === r.id;
        return (
          <button 
            key={r.id} onMouseEnter={() => setLumiMessage(`Pesquisa: ${r.name}. ${r.desc}`)}
            onClick={() => setSelectedId(r.id)}
            className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all group ${isUnlocked ? 'bg-purple-950/20 border-purple-900/50 hover:border-purple-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}`}
          >
            <FlaskConical size={24} className={`mb-2 ${isUnlocked ? 'text-purple-400' : 'text-slate-500'}`} />
            <span className={`text-[8px] font-black tracking-widest uppercase text-center ${isUnlocked ? 'text-purple-100' : 'text-slate-400'}`}>{r.name}</span>
            {isUnlocked && <CheckCircle2 size={10} className="absolute top-1.5 right-1.5 text-purple-400" />}
            {isActive && <div className="absolute inset-0 bg-purple-500/10 border border-purple-500/50 animate-pulse rounded-xl" />}
          </button>
        )
      })}
    </div>
  );

  const renderResearchDetails = () => {
    if (!selectedId) return null;
    const r = RESEARCH_TREE.find(x => x.id === selectedId);
    if (!r) return null;

    const isUnlocked = store.research.includes(r.id);
    const hasReq = store.builtModules.includes(r.req);
    const canAfford = store.isTrainingMode || store.inventory.parts >= r.cost;
    const isActive = store.activeResearch?.id === r.id;

    return (
      <div className="flex flex-col h-full bg-slate-900">
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-950/50">
          <button onClick={() => setSelectedId(null)} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"><ChevronLeft size={16}/></button>
          <FlaskConical size={24} className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
          <h2 className="text-sm font-black uppercase text-white tracking-widest leading-tight">{r.name}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{r.desc}</p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
             <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase block mb-1">Estrutura Exigida</span>
             <span className={`text-[10px] font-black uppercase flex items-center gap-1.5 ${hasReq ? 'text-emerald-400' : 'text-red-400'}`}>
               {hasReq ? <CheckCircle2 size={14}/> : <Lock size={14}/>} {STRUCTURES.find(s => s.id === r.req)?.name}
             </span>
          </div>
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          {isUnlocked ? (
            <span className="flex items-center justify-center w-full py-2.5 rounded-lg text-[10px] font-black text-purple-400 bg-purple-950/40 border border-purple-900/40 uppercase tracking-widest"><CheckCircle2 size={14} className="mr-1.5"/> TECNOLOGIA DOMINADA</span>
          ) : isActive ? (
            <span className="flex items-center justify-center w-full py-2.5 rounded-lg text-[10px] font-black text-purple-400 bg-purple-950/40 border border-purple-900/40 uppercase tracking-widest animate-pulse"><FlaskConical size={14} className="mr-1.5"/> PESQUISA EM ANDAMENTO</span>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-center gap-3 text-[10px] font-black bg-slate-900 py-2 rounded-lg border border-slate-800">
                 <span className="flex items-center gap-1 text-orange-300"><Settings size={12}/> {r.cost} Peças</span>
              </div>
              <button 
                onClick={() => setPendingTask({ type: 'research', targetId: r.id, title: r.name, data: { cost: r.cost, duration: r.duration } })} 
                disabled={!canAfford || (!hasReq && !store.isTrainingMode)} 
                className={`w-full py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 ${(canAfford && hasReq) || store.isTrainingMode ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              >
                {!hasReq && !store.isTrainingMode ? 'REQUER ESTRUTURA' : 'INICIAR PESQUISA'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Verifica se o tutorial atual já permite aceder a funcionalidades avançadas
  const canAccessExploration = store.tutorialStep === 'EXPLORATION_INTRO' || store.tutorialStep === 'RESEARCH_INTRO' || store.tutorialStep === 'COMPLETED';
  const canAccessResearch = store.tutorialStep === 'RESEARCH_INTRO' || store.tutorialStep === 'COMPLETED';

  return (
    <motion.div 
      initial={false}
      animate={{ width: isOpen ? (window.innerWidth > 768 ? 340 : 280) : 64 }}
      className="h-full bg-[#050b14]/95 backdrop-blur-xl border-r border-cyan-900/60 flex flex-col z-30 pointer-events-auto select-none shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
    >
      <div className="flex-none flex flex-col h-full bg-slate-950 border-r border-slate-800">
        <div className="flex h-12 bg-slate-900 border-b border-cyan-900/50">
          {!isOpen ? (
            <button 
              onClick={() => setIsOpen(true)} 
              className="w-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              <ChevronRight size={20}/>
            </button>
          ) : (
            <>
              {/* O botão Construção está sempre disponível */}
              <button 
                onClick={() => handleTabChange('construcao')} 
                data-tutorial={(activeTab !== 'construcao' && (store.tutorialStep === 'BUILD_HABITAT' || store.tutorialStep === 'ASSIGN_ENGINEER')) ? 'build-habitat' : undefined}
                className={`flex-1 flex justify-center items-center transition-colors ${activeTab === 'construcao' ? 'text-cyan-300 bg-cyan-950/30 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Hammer size={16}/>
              </button>
              
              {/* Abas desativadas até ser a altura certa do tutorial */}
              <button 
                onClick={() => canAccessExploration && handleTabChange('exploracao')} 
                data-tutorial="exploration-tab"
                disabled={!canAccessExploration}
                className={`flex-1 flex justify-center items-center transition-colors 
                  ${!canAccessExploration ? 'opacity-20 cursor-not-allowed' : 
                   activeTab === 'exploracao' ? 'text-cyan-300 bg-cyan-950/30 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Target size={16}/>
              </button>

              <button 
                onClick={() => canAccessResearch && handleTabChange('descobertas')} 
                data-tutorial="research-tab"
                disabled={!canAccessResearch}
                className={`flex-1 flex justify-center items-center transition-colors 
                  ${!canAccessResearch ? 'opacity-20 cursor-not-allowed' : 
                   activeTab === 'descobertas' ? 'text-cyan-300 bg-cyan-950/30 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <FlaskConical size={16}/>
              </button>

              <button onClick={() => setIsOpen(false)} className="w-10 flex items-center justify-center text-slate-500 hover:text-slate-300 border-l border-slate-800"><ChevronLeft size={16}/></button>
            </>
          )}
        </div>
        
        {isOpen && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {selectedId ? (
               activeTab === 'construcao' ? renderStructureDetails() :
               activeTab === 'exploracao' ? renderExplorationDetails() :
               renderResearchDetails()
            ) : (
               activeTab === 'construcao' ? renderStructuresList() :
               activeTab === 'exploracao' ? renderExplorationList() :
               renderResearchList()
            )}
          </div>
        )}
        
        {!isOpen && (
           <div className="flex-1 flex flex-col items-center gap-6 py-6">
             <button 
               onClick={() => handleTabChange('construcao')} 
               data-tutorial={store.tutorialStep === 'BUILD_HABITAT' || store.tutorialStep === 'ASSIGN_ENGINEER' ? 'build-habitat' : undefined} 
               className={`p-2 rounded-lg ${activeTab === 'construcao' ? 'bg-cyan-900 text-cyan-300' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <Hammer size={20}/>
             </button>

             <button 
               onClick={() => canAccessExploration && handleTabChange('exploracao')} 
               data-tutorial="exploration-tab" 
               disabled={!canAccessExploration}
               className={`p-2 rounded-lg 
                 ${!canAccessExploration ? 'opacity-20 cursor-not-allowed' : 
                  activeTab === 'exploracao' ? 'bg-orange-900 text-orange-300' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <Target size={20}/>
             </button>

             <button 
               onClick={() => canAccessResearch && handleTabChange('descobertas')} 
               data-tutorial="research-tab" 
               disabled={!canAccessResearch}
               className={`p-2 rounded-lg 
                 ${!canAccessResearch ? 'opacity-20 cursor-not-allowed' : 
                  activeTab === 'descobertas' ? 'bg-purple-900 text-purple-300' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <FlaskConical size={20}/>
             </button>
           </div>
        )}
      </div>
    </motion.div>
  );
}