// src/pages/BaseBuilder/index.tsx
import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Bot, Hammer, Home, Zap, Droplets, CheckCircle2, AlertTriangle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DICTIONARY = {
  en: {
    lumiIntro: "BLUEPRINT MODE ACTIVATED. Commander, the solar storm is approaching. Use the extracted Regolith and Ice to construct our Primary Base modules.",
    lumiSuccess: "ALL MODULES ONLINE! Life support is stable. The colony is ready for the next phase. Outstanding work, Commander!",
    btnBuild: "CONSTRUCT",
    btnBuilt: "ONLINE",
    hudRegolith: "REGOLITH",
    hudIce: "WATER ICE",
    structures: [
      { id: 'habitat', name: "HABITAT HQ", desc: "3D-printed regolith shielding to protect the crew from solar radiation.", costReg: 40, costIce: 0, icon: <Home size={32} /> },
      { id: 'purifier', name: "H2O PURIFIER", desc: "Melts and filters sub-surface ice into breathable oxygen and drinking water.", costReg: 0, costIce: 30, icon: <Droplets size={32} /> },
      { id: 'solar', name: "SOLAR ARRAY", desc: "High-efficiency panels to power the life support systems indefinitely.", costReg: 10, costIce: 10, icon: <Zap size={32} /> }
    ],
    missionComplete: "MISSION ACCOMPLISHED"
  },
  pt: {
    lumiIntro: "MODO PROJETO ATIVADO. Comandante, a tempestade solar se aproxima. Use o Regolito e o Gelo extraídos para construir os módulos da Base Primária.",
    lumiSuccess: "TODOS OS MÓDULOS ONLINE! Suporte à vida estável. A colônia está pronta para a próxima fase. Excelente trabalho, Comandante!",
    btnBuild: "CONSTRUIR",
    btnBuilt: "ONLINE",
    hudRegolith: "REGOLITO",
    hudIce: "GELO",
    structures: [
      { id: 'habitat', name: "HABITAT PRINCIPAL", desc: "Escudo de regolito impresso em 3D para proteger a tripulação da radiação.", costReg: 40, costIce: 0, icon: <Home size={32} /> },
      { id: 'purifier', name: "PURIFICADOR H2O", desc: "Derrete e filtra o gelo subterrâneo em água potável e oxigênio.", costReg: 0, costIce: 30, icon: <Droplets size={32} /> },
      { id: 'solar', name: "MATRIZ SOLAR", desc: "Painéis de alta eficiência para alimentar os sistemas de suporte à vida.", costReg: 10, costIce: 10, icon: <Zap size={32} /> }
    ],
    missionComplete: "MISSÃO CONCLUÍDA"
  }
};

type Lang = 'en' | 'pt';

export default function BaseBuilder() {
  const globalLang = useGameStore((state) => state.language);
  const setGlobalLang = useGameStore((state) => state.setLanguage);
  const [localLang, setLocalLang] = useState<Lang>('en');
  const lang = (globalLang || localLang) as Lang;
  const setLang = (newLang: Lang) => { if (setGlobalLang) setGlobalLang(newLang); setLocalLang(newLang); };

  // Pegando os recursos do jogo anterior
  const regolith = useGameStore((state) => state.inventory?.regolith ?? state.resources?.regolith ?? 0);
  const ice = useGameStore((state) => state.inventory?.ice ?? state.resources?.ice ?? 0);
  const collectResource = useGameStore((state) => state.collectResource);
  
  const [builtModules, setBuiltModules] = useState<string[]>([]);
  const t = DICTIONARY[lang];
  const allBuilt = builtModules.length === t.structures.length;

  // Máquina de escrever da LUMI
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    const textToType = allBuilt ? t.lumiSuccess : t.lumiIntro;
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < textToType.length) {
        setDisplayedText(textToType.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [allBuilt, lang, t.lumiIntro, t.lumiSuccess]);

  // Função para construir um módulo
  const handleBuild = (id: string, costReg: number, costIce: number) => {
    if (regolith >= costReg && ice >= costIce) {
      if (collectResource) {
        if (costReg > 0) collectResource('regolith', -costReg);
        if (costIce > 0) collectResource('ice', -costIce);
      }
      setBuiltModules(prev => [...prev, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#071324] relative overflow-hidden font-sans select-none flex flex-col">
      
      {/* BACKGROUND ESTILO BLUEPRINT (Grade de Engenharia) */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#071324_100%)] z-0 pointer-events-none" />

      {/* HEADER / HUD */}
      <header className="relative z-50 flex items-center justify-between p-4 md:p-6 border-b border-sky-900/50 bg-[#0a192f]/80 backdrop-blur-md shadow-xl">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3 bg-[#0d233a] border border-sky-800 p-2.5 rounded-lg shadow-lg">
            <div className="text-sky-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              {t.hudRegolith}: <span className="text-white text-base font-mono">{regolith}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#0d233a] border border-blue-800 p-2.5 rounded-lg shadow-lg">
            <div className="text-blue-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              {t.hudIce}: <span className="text-white text-base font-mono">{ice}</span>
            </div>
          </div>
        </div>

        <div className="flex bg-[#0d233a] border border-sky-900/50 rounded-lg overflow-hidden backdrop-blur-md shadow-lg">
          <div className="px-3 py-2 bg-sky-900/30 flex items-center justify-center border-r border-sky-900/50"><Globe size={16} className="text-sky-500" /></div>
          <button onClick={() => setLang('en')} className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors ${lang === 'en' ? 'bg-sky-600 text-white' : 'text-sky-400/50 hover:bg-sky-900'}`}>EN</button>
          <button onClick={() => setLang('pt')} className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors ${lang === 'pt' ? 'bg-sky-600 text-white' : 'text-sky-400/50 hover:bg-sky-900'}`}>PT</button>
        </div>
      </header>

      {/* ÁREA DE CONSTRUÇÃO */}
      <main className="flex-1 relative z-10 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
        
        {/* LISTA DE MÓDULOS (Esquerda) */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {t.structures.map((struct, index) => {
            const isBuilt = builtModules.includes(struct.id);
            const canAfford = regolith >= struct.costReg && ice >= struct.costIce;
            
            return (
              <motion.div 
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2 }}
                key={struct.id} 
                className={`relative p-5 rounded-xl border-2 flex items-center gap-4 transition-all duration-300
                  ${isBuilt ? 'bg-sky-900/20 border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'bg-[#0d233a]/80 border-sky-900 hover:border-sky-700'}
                `}
              >
                {/* Ícone */}
                <div className={`p-4 rounded-lg border-2 ${isBuilt ? 'bg-sky-500/20 border-sky-400 text-sky-400' : 'bg-[#0a192f] border-sky-900 text-sky-700'}`}>
                  {struct.icon}
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h3 className={`font-bold uppercase tracking-widest text-sm mb-1 ${isBuilt ? 'text-sky-300' : 'text-sky-100'}`}>{struct.name}</h3>
                  <p className="text-sky-200/50 text-[10px] md:text-xs font-mono leading-relaxed mb-3">{struct.desc}</p>
                  
                  {/* Custos */}
                  {!isBuilt && (
                    <div className="flex gap-3">
                      {struct.costReg > 0 && <span className={`text-[10px] font-bold font-mono px-2 py-1 rounded ${regolith >= struct.costReg ? 'bg-slate-800 text-slate-300' : 'bg-red-950 text-red-400'}`}>REG: {struct.costReg}</span>}
                      {struct.costIce > 0 && <span className={`text-[10px] font-bold font-mono px-2 py-1 rounded ${ice >= struct.costIce ? 'bg-blue-900/50 text-blue-300' : 'bg-red-950 text-red-400'}`}>ICE: {struct.costIce}</span>}
                    </div>
                  )}
                </div>

                {/* Botão de Construir */}
                <div className="shrink-0">
                  {isBuilt ? (
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-xs tracking-widest bg-sky-950 px-4 py-2 rounded-lg border border-sky-800">
                      <CheckCircle2 size={16} /> {t.btnBuilt}
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleBuild(struct.id, struct.costReg, struct.costIce)}
                      disabled={!canAfford}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all
                        ${canAfford ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg active:scale-95' : 'bg-[#0a192f] text-sky-800 cursor-not-allowed border border-sky-900'}
                      `}
                    >
                      <Hammer size={14} /> {t.btnBuild}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* VISUALIZAÇÃO DA BASE (Direita) */}
        <div className="w-full md:w-1/2 h-[400px] bg-[#0a192f]/50 border-2 border-sky-900/50 rounded-2xl relative flex items-center justify-center shadow-2xl overflow-hidden">
          {/* Fundo de grade menor */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
          
          <AnimatePresence>
            {!allBuilt ? (
               <motion.div exit={{ opacity: 0, scale: 0.8 }} className="absolute flex flex-col items-center gap-2 text-sky-800 opacity-50">
                 <Hammer size={48} className="animate-pulse" />
                 <span className="font-mono text-sm tracking-widest uppercase">AWAITING CONSTRUCTION</span>
               </motion.div>
            ) : (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
                 className="relative z-10 flex flex-col items-center gap-6"
               >
                 <div className="w-48 h-48 bg-sky-500/20 border-4 border-sky-400 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(56,189,248,0.5)] relative">
                   <Home size={80} className="text-sky-300 drop-shadow-[0_0_15px_rgba(56,189,248,1)]" />
                   
                   {/* Orbitais animados da base concluída */}
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-[-20px] rounded-full border border-sky-400/30 border-dashed" />
                   <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-[-40px] rounded-full border border-sky-400/20" />
                 </div>
                 
                 <div className="bg-sky-950 border border-sky-400 px-6 py-2 rounded-full text-sky-400 font-bold tracking-[0.3em] text-sm shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-pulse">
                   {t.missionComplete}
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER: LUMI BRIEFING */}
      <footer className="relative z-50 p-6 bg-gradient-to-t from-[#020617] via-[#071324] to-transparent flex items-end">
        <div className="max-w-4xl flex items-center gap-6 w-full mx-auto md:mx-0">
          <div className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500 shadow-xl
            ${allBuilt ? 'bg-sky-900 border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.4)]' : 'bg-[#0d233a] border-sky-700'}
          `}>
            <Bot size={32} className={`transition-colors ${allBuilt ? 'text-sky-300' : 'text-sky-600'}`} />
          </div>
          
          <div className={`flex-1 backdrop-blur-md border p-4 md:p-5 rounded-xl rounded-bl-none relative shadow-xl transition-all duration-500
            ${allBuilt ? 'bg-sky-950/90 border-sky-400' : 'bg-[#0d233a]/90 border-sky-800'}
          `}>
            <div className={`absolute -left-3 bottom-4 w-0 h-0 border-r-[12px] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent transition-colors
              ${allBuilt ? 'border-r-sky-950/90' : 'border-r-[#0d233a]/90'}
            `}></div>
            
            <h4 className={`font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2 ${allBuilt ? 'text-sky-400' : 'text-sky-600'}`}>
              L.U.M.I. System {allBuilt ? <CheckCircle2 size={14} className="text-sky-400" /> : <AlertTriangle size={14} className="text-sky-500 animate-pulse" />}
            </h4>
            <p className={`font-mono text-sm md:text-base leading-relaxed min-h-[48px] ${allBuilt ? 'text-sky-100 font-bold' : 'text-sky-200/70'}`}>
              {displayedText}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}