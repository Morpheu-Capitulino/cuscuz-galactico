import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { STRUCTURES, EXPEDITIONS, RESEARCH_TREE, type StructureId } from './data';
import { Target, FlaskConical, Lock, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';

export function ManagementPanel({ setLumiMessage }: { setLumiMessage: (msg: string) => void }) {
  const store = useGameStore();
  const [activeTab, setActiveTab] = useState<'construcao'|'exploracao'|'descobertas'>('construcao');

  const handleStartBuildingOrUpgrade = (moduleId: StructureId, currentLevel: number) => {
    const struct = STRUCTURES.find(s => s.id === moduleId);
    if (!struct) return;
    
    if (currentLevel === 0) {
      store.startBuilding(moduleId, struct.levels[0].cost);
      setLumiMessage(`Iniciando construção de ${struct.name}. O drone construtor está a caminho.`);
    } else {
      store.startUpgrade(moduleId, struct.levels[currentLevel].cost);
      setLumiMessage(`Melhoria de ${struct.name} para nível ${currentLevel + 1} iniciada.`);
    }
  };

  return (
    <section className="flex-none h-[260px] md:h-[280px] bg-slate-950 border-t border-cyan-900/60 flex flex-col z-30 pointer-events-auto select-none shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative">
      
      {/* 1. ÁREA DAS ABAS */}
      <div className="flex-none flex bg-slate-900/90 border-b border-cyan-900/40 px-2 sm:px-4">
        {['construcao', 'exploracao', 'descobertas'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab as any)} 
            className={`px-4 sm:px-5 py-3 font-black text-[10px] md:text-xs uppercase border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? 'border-cyan-400 text-cyan-300 bg-cyan-900/20' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            {tab === 'construcao' ? 'CONSTRUÇÃO & MELHORIAS' : tab}
          </button>
        ))}
      </div>
      
      {/* 2. ÁREA DE CONTEÚDO (Cartões Ilustrativos e Proporcionais) */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-3 md:p-4 flex gap-3 md:gap-4 items-stretch scrollbar-thin scrollbar-thumb-cyan-900/50 scrollbar-track-transparent">
        
        {/* ========================================================= */}
        {/* ABA: CONSTRUÇÃO & UPGRADES                                */}
        {/* ========================================================= */}
        {activeTab === 'construcao' && STRUCTURES.map(s => {
          const currentLvl = store.moduleLevels?.[s.id] || 0;
          const isBuilding = store.buildingModules.some((b: any) => b.id === s.id);
          const isUpgrading = store.upgradingModules?.some((u: any) => u.id === s.id);
          const isMax = currentLvl >= 3;
          const nextLvlData = s.levels[currentLvl]; 
          
          const canAfford = !isMax && nextLvlData && store.inventory.regolith >= (nextLvlData.cost.regolith || 0) && store.inventory.parts >= (nextLvlData.cost.parts || 0) && store.inventory.ice >= (nextLvlData.cost.ice || 0);

          return (
            <div key={s.id} className="w-[240px] md:w-[260px] flex-shrink-0 bg-slate-900/80 border border-slate-700/50 rounded-xl p-3 flex flex-col shadow-lg relative overflow-hidden">
               {/* Fundo ilustrativo marca d'água */}
               <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none transform rotate-12 scale-150">
                 {s.icon}
               </div>

               {/* Cabeçalho */}
               <div className="flex justify-between items-center mb-2 z-10">
                 <h3 className="text-xs font-black flex items-center gap-1.5 text-cyan-400 uppercase">
                   <span className="p-1 bg-cyan-950 rounded text-cyan-300">{s.icon}</span> 
                   {s.name}
                 </h3>
                 <span className="bg-slate-950 border border-slate-700 text-[10px] px-2 py-0.5 rounded font-black text-slate-300">NV {currentLvl}/3</span>
               </div>
               
               {/* Display de Informações Central */}
               <div className="flex-1 bg-slate-950/60 rounded-lg p-2 flex flex-col justify-center mb-3 z-10 border border-slate-800">
                 {currentLvl > 0 ? (
                   <p className="text-[10px] md:text-xs text-emerald-400 font-bold mb-1.5">ATUAL: {s.levels[currentLvl-1].effect}</p>
                 ) : (
                   <p className="text-[10px] md:text-[11px] text-slate-300 mb-1.5 leading-snug">{s.desc}</p>
                 )}
                 
                 {!isMax && nextLvlData && (
                   <div className="mt-auto bg-cyan-950/30 p-1.5 rounded border border-cyan-900/30">
                     <p className="text-[8px] text-cyan-500 font-black uppercase mb-0.5">Próximo Nível</p>
                     <p className="text-[10px] text-cyan-100 font-bold truncate">{nextLvlData.effect}</p>
                   </div>
                 )}
               </div>
               
               {/* Ações e Custos */}
               <div className="mt-auto z-10">
                 {isMax ? (
                   <span className="block w-full text-center text-[10px] font-black text-purple-400 bg-purple-950/50 border border-purple-900/50 py-2 rounded-lg tracking-widest">NÍVEL MÁXIMO</span>
                 ) : isBuilding || isUpgrading ? (
                   <span className="block w-full text-center text-[10px] font-black text-yellow-400 bg-yellow-950/50 border border-yellow-900/50 py-2 rounded-lg animate-pulse tracking-widest">TRABALHANDO...</span>
                 ) : (
                   <div className="flex flex-col gap-1.5">
                     <div className="flex justify-center gap-2 text-[9px] font-black bg-slate-950/80 py-1.5 rounded-lg border border-slate-800">
                       {!!nextLvlData?.cost.regolith && <span className="text-slate-300">PED: <span className="text-white">{nextLvlData.cost.regolith}</span></span>}
                       {!!nextLvlData?.cost.ice && <span className="text-blue-300">GEL: <span className="text-white">{nextLvlData.cost.ice}</span></span>}
                       {!!nextLvlData?.cost.parts && <span className="text-orange-300">PÇS: <span className="text-white">{nextLvlData.cost.parts}</span></span>}
                     </div>
                     <button onClick={() => handleStartBuildingOrUpgrade(s.id, currentLvl)} disabled={!canAfford} className={`w-full py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors shadow-md flex items-center justify-center gap-1 ${canAfford ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/50' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}>
                       {currentLvl === 0 ? 'CONSTRUIR' : 'MELHORAR'} <ArrowRight size={12} />
                     </button>
                   </div>
                 )}
               </div>
            </div>
          );
        })}

        {/* ========================================================= */}
        {/* ABA: EXPLORAÇÃO                                           */}
        {/* ========================================================= */}
        {activeTab === 'exploracao' && (
          <>
            {store.activeExpedition ? (
              <div className="w-full max-w-[400px] flex-shrink-0 bg-slate-900/80 border-2 border-orange-500/80 rounded-xl p-4 flex flex-col justify-center shadow-lg relative overflow-hidden">
                <Rocket size={80} className="absolute -right-4 -bottom-4 text-orange-500/10 rotate-45" />
                <h3 className="text-sm font-black text-orange-400 mb-1 uppercase flex items-center gap-2"><Target size={16}/> {store.activeExpedition.name}</h3>
                <p className="text-xs text-slate-300 mb-4 font-medium z-10">Rover autônomo está prospectando na superfície.</p>
                
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col mb-2 z-10">
                   <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest">
                     <span>Progresso</span>
                     <span className="text-orange-400">{Math.floor(store.activeExpedition.progress)}%</span>
                   </div>
                   <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                     <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${store.activeExpedition.progress}%` }} />
                   </div>
                </div>

                <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-auto z-10">
                   ESTADO: <span className="text-white animate-pulse">{store.activeExpedition.status}</span>
                </div>
              </div>
            ) : (
              EXPEDITIONS.map(exp => (
                <div key={exp.id} className="w-[240px] md:w-[260px] flex-shrink-0 bg-slate-900/80 border border-slate-700/50 rounded-xl p-3 flex flex-col shadow-lg relative overflow-hidden">
                  <Target size={60} className="absolute -right-4 -bottom-4 text-orange-500/10" />
                  
                  <div className="flex items-center gap-2 mb-2 z-10">
                    <span className="p-1 bg-orange-950 rounded text-orange-400"><Target size={14}/></span>
                    <h3 className="text-xs font-black text-orange-400 uppercase">{exp.name}</h3>
                  </div>
                  
                  <div className="flex-1 bg-slate-950/60 rounded-lg p-2.5 flex flex-col justify-center mb-3 z-10 border border-slate-800">
                    <p className="text-[10px] md:text-[11px] text-slate-300 leading-snug font-medium mb-3">{exp.desc}</p>
                    <div className="flex justify-between text-[9px] font-black bg-slate-900 p-1.5 rounded border border-slate-700">
                      <span className="text-slate-400">PERIGO: <span className={exp.risk === 'Alto' ? 'text-red-400' : exp.risk === 'Moderado' ? 'text-yellow-400' : 'text-emerald-400'}>{exp.risk}</span></span>
                      <span className="text-slate-400">DURAÇÃO: <span className="text-white">{exp.duration}s</span></span>
                    </div>
                  </div>
                  
                  <button onClick={() => { store.startExpedition(exp); setLumiMessage('Rover despachado. Fique atento a intercorrências no trajeto.'); }} className="w-full z-10 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-900/50 flex items-center justify-center gap-1.5">
                    INICIAR MISSÃO <Rocket size={12}/>
                  </button>
                </div>
              ))
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* ABA: DESCOBERTAS                                          */}
        {/* ========================================================= */}
        {activeTab === 'descobertas' && RESEARCH_TREE.map(r => {
          const isUnlocked = store.research.includes(r.id);
          const hasReq = store.builtModules.includes(r.req);
          const canAfford = store.inventory.parts >= r.cost;

          return (
            <div key={r.id} className={`w-[240px] md:w-[260px] flex-shrink-0 bg-slate-900/80 border rounded-xl p-3 flex flex-col shadow-lg relative overflow-hidden transition-colors ${isUnlocked ? 'border-purple-500/50' : 'border-slate-700/50'}`}>
              <FlaskConical size={70} className={`absolute -right-4 -bottom-4 rotate-12 ${isUnlocked ? 'text-purple-500/10' : 'text-slate-500/5'}`} />
              
              <div className="flex items-center gap-2 mb-2 z-10">
                <span className={`p-1.5 rounded-lg ${isUnlocked ? 'bg-purple-950 text-purple-400' : 'bg-slate-800 text-slate-500'}`}>
                  <FlaskConical size={14}/>
                </span>
                <h3 className={`text-xs font-black uppercase ${isUnlocked ? 'text-purple-400' : 'text-slate-300'}`}>{r.name}</h3>
              </div>
              
              <div className="flex-1 bg-slate-950/60 rounded-lg p-3 flex items-center mb-3 z-10 border border-slate-800">
                <p className="text-[10px] md:text-[11px] text-slate-300 leading-snug font-medium text-center w-full">{r.desc}</p>
              </div>
              
              <div className="mt-auto z-10">
                {isUnlocked ? (
                  <span className="flex items-center justify-center gap-1.5 w-full text-[10px] font-black tracking-widest text-purple-400 bg-purple-950/50 border border-purple-900/50 py-2 rounded-lg uppercase">
                    <CheckCircle2 size={12} /> DOMINADA
                  </span>
                ) : (
                  <button onClick={() => store.unlockResearch(r.id, r.cost)} disabled={!canAfford || !hasReq} className={`w-full py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors shadow-md flex items-center justify-center gap-1.5 ${canAfford && hasReq ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50' : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'}`}>
                    {hasReq ? `PESQUISAR (${r.cost} PÇS)` : <><Lock size={12}/> REQUER ESTRUTURA</>}
                  </button>
                )}
              </div>
            </div>
          )
        })}

      </div>
    </section>
  );
}