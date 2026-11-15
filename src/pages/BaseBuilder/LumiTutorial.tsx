import { useEffect, useState } from 'react';
import { useGameStore, type TutorialStepId } from '../../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Database } from 'lucide-react';

interface BilingualText {
  pt: string;
  en: string;
}

interface StepConfig {
  title: BilingualText;
  message: BilingualText;
  targetId?: string;
  actionLabel?: BilingualText;
  requireAction?: boolean;
  next?: TutorialStepId;
}

const STEPS: Record<TutorialStepId, StepConfig> = {
  SUPPLIES_ARRIVAL: {
    title: { pt: 'CARGA RECEBIDA!', en: 'CARGO RECEIVED!' },
    message: {
      pt: 'Comandante, finalmente pousamos! Nossa nave acabou de transferir os suprimentos iniciais para a colônia. Agora podemos começar a preparar nossa base lunar!',
      en: 'Commander, we finally landed! Our ship just transferred the initial supplies to the colony. Now we can start preparing our lunar base!'
    },
    requireAction: false,
    next: 'HUD_RESOURCES'
  },
  HUD_RESOURCES: {
    title: { pt: 'PAINEL DE CONTROLE', en: 'CONTROL PANEL' },
    message: {
      pt: 'Antes de começarmos, precisamos entender o painel. Aqui você acompanha os materiais que recebemos e nossos indicadores de sobrevivência.',
      en: 'Before we begin, let us understand the HUD. Here you track the materials we received and our vital survival indicators.'
    },
    targetId: 'hud-resources',
    requireAction: false,
    next: 'CREW_INTRO'
  },
  CREW_INTRO: {
    title: { pt: 'NOSSA TRIPULAÇÃO', en: 'OUR CREW' },
    message: {
      pt: 'Esta é nossa equipe! Cada astronauta possui uma profissão e uma habilidade especial. Precisamos cuidar da saúde e da energia de todos.',
      en: 'This is our team! Each astronaut has a profession and a special skill. We must take care of everyone\'s health and energy.'
    },
    targetId: 'crew-panel',
    requireAction: false,
    next: 'BUILD_HABITAT'
  },
  BUILD_HABITAT: {
    title: { pt: 'PRIMEIRA CONSTRUÇÃO', en: 'FIRST CONSTRUCTION' },
    message: {
      pt: 'Vamos construir nosso abrigo! Selecione o Abrigo Principal e clique em CONSTRUIR. No modo de treinamento, você tem materiais infinitos!',
      en: 'Let\'s build our shelter! Select the Main Habitat and click BUILD. In training mode, you have infinite materials!'
    },
    targetId: 'build-habitat',
    actionLabel: { pt: 'CLIQUE EM CONSTRUIR', en: 'CLICK TO BUILD' },
    requireAction: true
  },
  ASSIGN_ENGINEER: {
    title: { pt: 'MÃO NA MASSA', en: 'HANDS ON DECK' },
    message: {
      pt: 'Para acelerar, designe o Engenheiro Torres para a obra. Ele é o especialista nisso.',
      en: 'To speed things up, assign Engineer Torres to the job. He is the specialist for this.'
    },
    targetId: 'assign-engineer',
    actionLabel: { pt: 'SELECIONE O ENGENHEIRO', en: 'SELECT THE ENGINEER' },
    requireAction: true
  },
  ACTIVATE_SIMULATION: {
    title: { pt: 'INICIAR O TEMPO', en: 'START TIME' },
    message: {
      pt: 'A equipe está pronta! Clique no botão PLAY no painel superior para que o relógio ande e o trabalho avance!',
      en: 'The crew is ready! Click the PLAY button on the top panel so the clock ticks and the work progresses!'
    },
    targetId: 'play-button',
    actionLabel: { pt: 'CLIQUE NO PLAY', en: 'CLICK PLAY' },
    requireAction: true
  },
  WAIT_PROGRESS: {
    title: { pt: 'ACOMPANHANDO A OBRA', en: 'TRACKING PROGRESS' },
    message: {
      pt: 'Muito bem! O tempo está passando. Observe a barra de progresso do nosso módulo até ele ficar pronto.',
      en: 'Great job! Time is moving. Watch our module\'s progress bar until it is completed.'
    },
    targetId: 'habitat-progress',
    requireAction: true 
  },
  EXPLORATION_INTRO: {
    title: { pt: 'BUSCA POR MATERIAIS', en: 'SEARCH FOR MATERIALS' },
    message: {
      pt: 'CONSEGUIMOS! Nosso Abrigo está pronto! Quando precisar de mais recursos, acesse a aba EXPLORAÇÃO e envie nosso rover em missões.',
      en: 'WE DID IT! Our Habitat is ready! Whenever you need more resources, open the EXPLORATION tab and send our rover on missions.'
    },
    targetId: 'exploration-tab',
    actionLabel: { pt: 'ABRA A EXPLORAÇÃO', en: 'OPEN EXPLORATION' },
    requireAction: true
  },
  RESEARCH_INTRO: {
    title: { pt: 'TECNOLOGIAS', en: 'TECHNOLOGIES' },
    message: {
      pt: 'Em DESCOBERTAS, podemos usar Peças para desenvolver novas tecnologias e melhorar a colônia. Agora você está no comando. Boa sorte!',
      en: 'In DISCOVERIES, we can use Parts to develop new technologies and upgrade the colony. You are in command now. Good luck!'
    },
    targetId: 'research-tab',
    actionLabel: { pt: 'ABRA AS DESCOBERTAS', en: 'OPEN DISCOVERIES' },
    requireAction: true
  },
  COMPLETED: { title: { pt: '', en: '' }, message: { pt: '', en: '' } }
};

export function LumiTutorial() {
  const store = useGameStore();
  const isEn = store.language === 'en';
  const lang = isEn ? 'en' : 'pt';
  const stepId = store.tutorialStep;
  const config = STEPS[stepId];
  
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  useEffect(() => {
    if (!config?.targetId) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(`[data-tutorial="${config.targetId}"]`);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null); 
      }
    };

    updateRect();
    const interval = setInterval(updateRect, 500);
    window.addEventListener('resize', updateRect);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateRect);
    };
  }, [config?.targetId]);

  useEffect(() => {
    if (stepId === 'BUILD_HABITAT' && store.pendingTask?.targetId === 'habitat') {
      store.advanceTutorial('ASSIGN_ENGINEER');
    }
    else if (stepId === 'ASSIGN_ENGINEER' && store.buildingModules.some(m => m.id === 'habitat')) {
      store.advanceTutorial('ACTIVATE_SIMULATION');
    }
    else if (stepId === 'ACTIVATE_SIMULATION' && !store.isPaused) {
      store.advanceTutorial('WAIT_PROGRESS');
    }
    else if (stepId === 'WAIT_PROGRESS' && store.builtModules.includes('habitat')) {
      store.advanceTutorial('EXPLORATION_INTRO');
    }
  }, [store.buildingModules, store.isPaused, store.builtModules, stepId, store.pendingTask]);

  if (stepId === 'COMPLETED') return null;

  let lumiPosition = { bottom: '20px', left: '20px', top: 'auto', right: 'auto' };
  
  if (targetRect) {
    const isTopHalf = targetRect.top < window.innerHeight / 2;
    const isLeftHalf = targetRect.left < window.innerWidth / 2;
    
    if (isLeftHalf) {
      lumiPosition.left = 'auto'; lumiPosition.right = '40px';
    } else {
      lumiPosition.right = 'auto'; lumiPosition.left = '40px';
    }

    if (isTopHalf) {
      lumiPosition.top = 'auto'; lumiPosition.bottom = '40px';
    } else {
      lumiPosition.bottom = 'auto'; lumiPosition.top = '80px';
    }
  }

  return (
    <>
      <AnimatePresence>
        {targetRect && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed z-[80] rounded-xl pointer-events-none transition-all duration-300"
            style={{
              top: targetRect.top - 10,
              left: targetRect.left - 10,
              width: targetRect.width + 20,
              height: targetRect.height + 20,
              border: '3px solid #22d3ee',
              boxShadow: '0 0 0 9999px rgba(0, 5, 15, 0.85), inset 0 0 15px rgba(34,211,238,0.2)'
            }}
          >
            {config.actionLabel && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cyan-950 text-cyan-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded border border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-bounce">
                {config.actionLabel[lang]}
              </div>
            )}
          </motion.div>
        )}
        
        {!targetRect && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm pointer-events-none" 
           />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stepId === 'SUPPLIES_ARRIVAL' && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[85] bg-slate-900 border-2 border-emerald-500 p-6 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center flex flex-col items-center"
          >
            <Database size={40} className="text-emerald-400 mb-3 animate-bounce" />
            <h2 className="text-emerald-400 font-black text-xl tracking-[0.2em] mb-4">
              {isEn ? 'UNLOADING COMPLETE' : 'DESCARGA CONCLUÍDA'}
            </h2>
            <div className="flex gap-6 text-2xl font-black font-mono">
              <span className="text-slate-300 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{isEn ? 'Regolith' : 'Pedras'}</span> +99.999.999
              </span>
              <span className="text-blue-300 flex flex-col items-center gap-1">
                <span className="text-[10px] text-blue-500 uppercase tracking-widest">{isEn ? 'Ice' : 'Gelo'}</span> +99.999.999
              </span>
              <span className="text-orange-300 flex flex-col items-center gap-1">
                <span className="text-[10px] text-orange-500 uppercase tracking-widest">{isEn ? 'Parts' : 'Peças'}</span> +99.999.999
              </span>
            </div>
            <p className="mt-4 text-[10px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-950/50 px-4 py-1.5 rounded-full">
              {isEn ? 'Training Mode Activated' : 'Modo de Treinamento Ativado'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed z-[90] flex items-end gap-3 max-w-[340px] md:max-w-md pointer-events-auto"
        style={lumiPosition}
      >
        <div className="w-20 md:w-24 shrink-0 pointer-events-none">
          <img src="/LUMI_robozinho.png" alt="L.U.M.I." className="w-full h-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] animate-[float_4s_ease-in-out_infinite]" />
        </div>
        
        <div className="bg-[#071a3b]/95 backdrop-blur-xl border-2 border-cyan-400/50 rounded-2xl p-5 shadow-[0_0_40px_rgba(6,182,212,0.3)] relative">
          <h4 className="text-[10px] font-black text-cyan-400 tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
            <Bot size={14}/> {config.title[lang]}
          </h4>
          <p className="text-sm text-cyan-50 font-medium leading-relaxed mb-4">{config.message[lang]}</p>
          
          <div className="flex gap-2 justify-end">
            {!config.requireAction && config.next && (
              <button 
                onClick={() => {
                  if (config.next === 'COMPLETED') {
                    store.endTutorial();
                  } else {
                    store.advanceTutorial(config.next!);
                  }
                }} 
                className="bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-black tracking-widest px-5 py-2.5 rounded-lg transition-colors shadow-lg"
              >
                {config.actionLabel ? config.actionLabel[lang] : (isEn ? 'CONTINUE' : 'CONTINUAR')}
              </button>
            )}
            
            {showSkipConfirm ? (
              <div className="flex gap-2">
                <button onClick={() => store.endTutorial()} className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-black tracking-widest px-4 py-2.5 rounded-lg transition-colors">
                  {isEn ? 'EXIT NOW' : 'SAIR AGORA'}
                </button>
                <button onClick={() => setShowSkipConfirm(false)} className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-black tracking-widest px-4 py-2.5 rounded-lg transition-colors">
                  {isEn ? 'BACK' : 'VOLTAR'}
                </button>
              </div>
            ) : (
              <button onClick={() => setShowSkipConfirm(true)} className="bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] font-black tracking-widest px-4 py-2.5 rounded-lg transition-colors border border-slate-700">
                {isEn ? 'SKIP' : 'PULAR'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}