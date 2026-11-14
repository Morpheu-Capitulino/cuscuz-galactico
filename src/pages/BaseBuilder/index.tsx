import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { Skull, Globe } from 'lucide-react';
import { useBaseSimulation } from './useBaseSimulation';
import { BaseHUD } from './BaseHUD';
import { ColonyMap } from './ColonyMap';
import { CrewPanel } from './CrewPanel';
import { ManagementPanel } from './ManagementPanel';
import { GameModals } from './GameModals';

export default function BaseBuilder() {
  const store = useGameStore();
  const navigate = useNavigate();
  
  const { activeEvent, setActiveEvent, lumiMessage, setLumiMessage } = useBaseSimulation();

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
          className="bg-slate-800 text-white font-black tracking-widest py-4 px-8 rounded-xl border-2 border-slate-600 hover:bg-slate-700 transition-colors"
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }

  return (
    // Estrutura Flexbox rígida para manter 100% da tela: Topo(Fixo) -> Meio(Expansível) -> Fundo(Fixo)
    <div className="flex flex-col h-dvh w-full bg-[#02050a] font-sans text-white overflow-hidden select-none relative">
      
      <BaseHUD />

      {/* REGIÃO CENTRAL: MAPA + TRIPULAÇÃO */}
      {/* min-h-0 impede que o flex-1 expanda além do espaço disponível na tela */}
      <div className="flex-1 relative min-h-0 w-full overflow-hidden">
        <ColonyMap lumiMessage={lumiMessage} />
        
        {/* A Tripulação flutua DENTRO dos limites desta div central */}
        <CrewPanel />
      </div>

      <ManagementPanel setLumiMessage={setLumiMessage} />

      <GameModals 
        activeEvent={activeEvent} 
        setActiveEvent={setActiveEvent} 
        setLumiMessage={setLumiMessage} 
      />
      
    </div>
  );
}