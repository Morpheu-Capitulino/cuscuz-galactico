// src/pages/Briefing/index.tsx
import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Bot, Rocket, MapPin, Clock, Users, ShieldAlert, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DICIONÁRIO DE DADOS (INGLÊS / PORTUGUÊS) ---
const DICTIONARY = {
  en: {
    lumiTransmission: "INCOMING TRANSMISSION...\nGreetings, Cadet. I am L.U.M.I., your Lunar Utility Mission Intelligence. Humanity is counting on you to establish our first sustainable base.\n\nResources are scarce and the environment is unforgiving. Manage energy, water, oxygen, and keep the crew alive.\n\nGood luck, Commander.",
    detailsTitle: "Mission Details",
    deployBtn: "Deploy Base",
    receiving: "Receiving Data...",
    parameters: [
      {
        id: 'dest',
        icon: <MapPin size={18} />,
        label: "Destination",
        value: "Lunar South Pole",
        lore: "The South Pole harbors deep, permanently shadowed craters containing water ice. This ice is crucial for producing drinking water and extracting oxygen for the crew."
      },
      {
        id: 'dur',
        icon: <Clock size={18} />,
        label: "Duration",
        value: "7 Simulated Days",
        lore: "A massive solar storm is projected to hit our sector in exactly 7 days. The base's life support and radiation shielding must be fully operational before it arrives."
      },
      {
        id: 'crew',
        icon: <Users size={18} />,
        label: "Crew Roster",
        value: "4 Astronauts",
        lore: "A specialized team consisting of a Commander, a Systems Engineer, an Astrobiologist, and a Medical Officer. Their survival depends entirely on your resource management."
      },
      {
        id: 'status',
        icon: <ShieldAlert size={18} />,
        label: "Initial Status",
        value: "Critical Alert",
        danger: true,
        lore: "Landers have dropped initial supplies, but life support systems are offline. Oxygen and battery reserves are draining quickly. Immediate action required upon deployment."
      }
    ]
  },
  pt: {
    lumiTransmission: "TRANSMISSÃO RECEBIDA...\nSaudações, Cadete. Sou L.U.M.I., sua Inteligência de Missão Utilitária Lunar. A humanidade conta com você para estabelecer nossa primeira base sustentável.\n\nOs recursos são escassos e o ambiente é implacável. Gerencie energia, água, oxigênio e mantenha a tripulação viva.\n\nBoa sorte, Comandante.",
    detailsTitle: "Detalhes da Missão",
    deployBtn: "Iniciar Missão",
    receiving: "Recebendo Dados...",
    parameters: [
      {
        id: 'dest',
        icon: <MapPin size={18} />,
        label: "Destino",
        value: "Polo Sul Lunar",
        lore: "O Polo Sul abriga crateras profundas e permanentemente sombreadas contendo gelo de água. Este gelo é crucial para produzir água potável e extrair oxigênio para a tripulação."
      },
      {
        id: 'dur',
        icon: <Clock size={18} />,
        label: "Duração",
        value: "7 Dias Simulados",
        lore: "Uma tempestade solar massiva atingirá nosso setor em exatamente 7 dias. O suporte à vida e a blindagem contra radiação da base devem estar totalmente operacionais antes disso."
      },
      {
        id: 'crew',
        icon: <Users size={18} />,
        label: "Tripulação",
        value: "4 Astronautas",
        lore: "Uma equipe especializada formada por um Comandante, um Engenheiro de Sistemas, um Astrobiólogo e um Oficial Médico. A sobrevivência deles depende inteiramente da sua gestão."
      },
      {
        id: 'status',
        icon: <ShieldAlert size={18} />,
        label: "Status Inicial",
        value: "Alerta Crítico",
        danger: true,
        lore: "Os módulos deixaram suprimentos iniciais, mas os sistemas de suporte à vida estão offline. Reservas de oxigênio e bateria estão caindo. Ação imediata necessária."
      }
    ]
  }
};

type Lang = 'en' | 'pt';

export default function Briefing() {
  const setScreen = useGameStore((state) => state.setScreen);
  
  // Novos estados para Idioma e Acordeão Interativo
  const [lang, setLang] = useState<Lang>('en');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const [lumiText, setLumiText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // t guarda todos os textos baseados na língua escolhida
  const t = DICTIONARY[lang];

  // Efeito da caixa de fala do jogo (Reinicia quando troca de idioma)
  useEffect(() => {
    let i = 0;
    setLumiText('');
    setIsTyping(true);
    
    const typingInterval = setInterval(() => {
      if (i < t.lumiTransmission.length) {
        setLumiText(t.lumiTransmission.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 25); // Velocidade do texto

    return () => clearInterval(typingInterval);
  }, [lang, t.lumiTransmission]);

  return (
    // Fundo de Galáxia 
    <div className="flex items-center justify-center min-h-screen p-4 md:p-10 bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a1a] to-black relative overflow-hidden font-sans">
      
      {/* Botão de Troca de Idioma (Topo Direita) */}
      <div className="absolute top-6 right-6 z-50 flex bg-slate-900/80 border border-cyan-900/50 rounded-lg overflow-hidden backdrop-blur-md">
        <div className="px-3 py-2 bg-slate-800/50 flex items-center justify-center border-r border-cyan-900/50">
          <Globe size={16} className="text-cyan-500" />
        </div>
        <button 
          onClick={() => setLang('en')}
          className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang('pt')}
          className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors ${lang === 'pt' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          PT
        </button>
      </div>

      {/* Efeito de estrelas CSS provisório para não ficar vazio até a arte chegar */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* COLUNA ESQUERDA: PERSONAGEM (LUMI) E CAIXA DE DIÁLOGO */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-end relative h-[500px]">
          
          {/* Caixa de Diálogo (Speech Bubble estilo RPG) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/90 backdrop-blur-sm border-2 border-cyan-500/50 p-6 md:p-8 rounded-2xl rounded-bl-none shadow-[0_0_30px_rgba(8,145,178,0.2)] mb-8 relative"
          >
            {/* O triângulo que aponta para o robô */}
            <div className="absolute -bottom-6 left-12 w-0 h-0 border-l-[15px] border-l-transparent border-t-[25px] border-t-slate-900/90 border-r-[15px] border-r-transparent filter drop-shadow-[0_4px_0px_rgba(8,145,178,0.5)]"></div>
            
            <h3 className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              L.U.M.I. System
            </h3>
            
            <p className="text-slate-200 font-mono leading-relaxed min-h-[140px] whitespace-pre-line text-lg">
              {lumiText}
              {isTyping && <span className="inline-block w-3 h-5 bg-cyan-400 ml-1 animate-pulse align-middle" />}
            </p>
          </motion.div>

          {/* O Robô (Animação de flutuar e respirar) */}
          <motion.div 
            animate={{ 
              y: [0, -15, 0], // Flutua para cima e para baixo
              rotate: [0, 2, -2, 0] // Leve inclinação como se olhasse
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }}
            className="w-40 h-40 ml-4 relative"
          >
            {/* AQUI O SEU AMIGO VAI COLOCAR A IMAGEM DELE! */}
            <div className="w-full h-full bg-slate-800 border-4 border-cyan-400 rounded-3xl shadow-[0_0_40px_rgba(8,145,178,0.5)] flex items-center justify-center">
               <Bot size={80} className="text-cyan-300" />
            </div>
            
            {/* Sombra no chão para dar profundidade */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-4 bg-cyan-900/50 blur-xl rounded-full"></div>
          </motion.div>

        </div>

        {/* COLUNA DIREITA: HUD DA MISSÃO (ACORDEÃO INTERATIVO) */}
        <div className="col-span-1 md:col-span-5 flex flex-col justify-center gap-6">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl"
          >
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-700/50 pb-4">
              {t.detailsTitle}
            </h1>

            {/* Renderização Dinâmica do Acordeão */}
            <div className="flex flex-col gap-3">
              {t.parameters.map((param) => {
                const isExpanded = expandedId === param.id;
                
                return (
                  <div 
                    key={param.id} 
                    className={`rounded-lg border transition-all duration-300 overflow-hidden cursor-pointer ${param.danger ? 'border-red-900/50 hover:border-red-500/50 bg-red-950/20' : 'border-slate-800 hover:border-cyan-800/50 bg-slate-950/50'}`}
                    onClick={() => setExpandedId(isExpanded ? null : param.id)}
                  >
                    {/* Header da Linha */}
                    <div className="flex items-center justify-between p-3 select-none">
                      <div className={`flex items-center gap-3 ${param.danger ? 'text-red-400' : 'text-cyan-500'}`}>
                        {param.icon}
                        <span className="text-xs uppercase tracking-widest font-bold">{param.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-200 font-mono text-sm tracking-wide">{param.value}</span>
                        <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Conteúdo Expandido (Lore Científica/Contexto) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4"
                        >
                          <div className={`text-sm font-mono p-3 rounded-md border ${param.danger ? 'bg-red-950/50 border-red-900/30 text-red-200' : 'bg-slate-900/80 border-slate-700/50 text-slate-300'}`}>
                            {param.lore}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Botão de Start do Jogo */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setScreen('exploration')}
            disabled={isTyping}
            className={`w-full flex items-center justify-center gap-3 font-bold py-6 px-8 rounded-xl uppercase tracking-[0.2em] transition-all duration-300 text-lg
              ${isTyping 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border-2 border-slate-700' 
                : 'bg-cyan-600 text-white shadow-[0_0_30px_rgba(8,145,178,0.5)] hover:shadow-[0_0_50px_rgba(8,145,178,0.8)] border-2 border-cyan-400 hover:bg-cyan-500'
              }`}
          >
            {isTyping ? t.receiving : t.deployBtn}
            {!isTyping && <Rocket size={24} className="animate-pulse" />}
          </motion.button>
          
        </div>

      </div>
    </div>
  );
}