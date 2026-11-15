import { motion, AnimatePresence } from 'framer-motion';

export type LumiMood = 'idle' | 'speaking' | 'happy' | 'thinking' | 'alert' | 'launching';

interface LumiCharacterProps {
  mood: LumiMood;
  launchProgress?: number;
  className?: string;
}

export function LumiCharacter({ mood = 'idle', launchProgress = 0, className = '' }: LumiCharacterProps) {
  // O segredo para um PNG ganhar vida: Squash and Stretch (Comprimir e Esticar)
  const imgVariants = {
    idle: {
      y: [0, -8, 0],
      scaleY: [1, 0.97, 1], // Achata levemente quando desce
      scaleX: [1, 1.02, 1], // Alarga levemente quando desce
      rotate: [-1, 2, -1],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
    },
    speaking: {
      y: [0, -12, 0],
      scaleY: [1, 1.05, 0.97, 1], // Pula e estica
      scaleX: [1, 0.96, 1.03, 1],
      rotate: [-2, 3, -1, 2, -2],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
    },
    happy: {
      y: [0, -25, 0],
      scaleY: [1, 1.12, 0.92, 1], // Pulo alto com muito estiramento
      scaleX: [1, 0.9, 1.08, 1],
      rotate: [-5, 5, -5],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
    },
    thinking: {
      y: [0, -4, 0],
      scaleY: [1, 0.98, 1],
      rotate: [6, 10, 6], // Fica inclinadinha analisando
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    },
    alert: {
      y: [0, -5, 0],
      x: [-2, 2, -2, 2, 0], // Tremidinha de susto
      scaleY: [1, 0.95, 1],
      transition: { duration: 0.4, repeat: Infinity }
    },
    launching: {
      y: [0, -2, 2, -2, 0],
      x: [-2, 2, -2, 2, 0], // Vibração intensa de foguete
      scaleY: [1, 0.98, 1.02, 1],
      transition: { duration: 0.1, repeat: Infinity }
    }
  };

  // Cores da aura de acordo com a emoção
  const glowColor =
    mood === 'alert' ? 'rgba(239,68,68,0.3)' : // Vermelho
    mood === 'happy' ? 'rgba(52,211,153,0.3)' : // Verde
    mood === 'thinking' ? 'rgba(168,85,247,0.3)' : // Roxo
    'rgba(34,211,238,0.2)'; // Ciano padrão

  return (
    <div className={`relative flex flex-col items-center justify-end ${className}`}>
      
      {/* AURA GLOW AO REDOR DA PERSONAGEM */}
      <motion.div
        animate={{ backgroundColor: glowColor, scale: mood === 'launching' ? 1.5 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full blur-3xl -z-10"
      />

      {/* BALÕES DE EXPRESSÃO (Flutuando acima da cabeça, estilo Game/Anime) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {mood === 'alert' && (
            <motion.div key="alert" initial={{ opacity: 0, y: 10, scale: 0 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="text-red-500 font-black text-3xl drop-shadow-[0_0_10px_#ef4444]">!</motion.div>
          )}
          {mood === 'thinking' && (
            <motion.div key="thinking" initial={{ opacity: 0, y: 10, scale: 0 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="text-purple-400 font-black text-2xl drop-shadow-[0_0_10px_#a855f7]">?</motion.div>
          )}
          {mood === 'happy' && (
            <motion.div key="happy" initial={{ opacity: 0, y: 10, scale: 0 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="text-emerald-400 font-black text-2xl drop-shadow-[0_0_10px_#34d399]">✨</motion.div>
          )}
          {mood === 'speaking' && (
            <motion.div key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-end justify-center gap-1 bg-cyan-950/80 border border-cyan-500/50 px-2 py-1.5 rounded-full backdrop-blur-sm shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              {[0, 1, 2].map(i => (
                <motion.div key={i} animate={{ height: ['4px', '12px', '4px'] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 bg-cyan-400 rounded-full" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PERSONAGEM PNG COM SQUASH & STRETCH APLICADO */}
      <motion.div
        variants={imgVariants}
        animate={mood}
        className="relative z-10 w-full h-full flex items-end justify-center"
        style={{ transformOrigin: 'bottom center' }} // Faz ela "esticar" a partir da base
      >
        <img
          src="/LUMI_robozinho.png"
          alt="L.U.M.I."
          className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
        />

        {/* Jatos do propulsor grudados na base dela */}
        <motion.div
          animate={{
            height: mood === 'launching' ? 60 + launchProgress / 2 : mood === 'happy' ? 35 : 15,
            opacity: mood === 'launching' ? [0.7, 1, 0.7] : [0.3, 0.7, 0.3],
            scaleX: mood === 'launching' ? [0.8, 1.3, 0.8] : 1
          }}
          transition={{ duration: mood === 'launching' ? 0.05 : 1.5, repeat: Infinity }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-cyan-300 via-cyan-500 to-transparent blur-md rounded-full -z-10"
        />
      </motion.div>

      {/* SOMBRA NO CHÃO (Fica fixa no piso e encolhe quando ela pula, dando noção 3D) */}
      <motion.div
        animate={
          mood === 'happy' ? { scale: [1, 0.5, 1], opacity: [0.6, 0.1, 0.6] } :
          mood === 'speaking' ? { scale: [1, 0.8, 1], opacity: [0.6, 0.3, 0.6] } :
          mood === 'idle' ? { scale: [1, 0.85, 1], opacity: [0.6, 0.35, 0.6] } :
          { scale: 1, opacity: 0.6 }
        }
        transition={{
          duration: mood === 'happy' ? 1.2 : mood === 'speaking' ? 2.2 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/60 blur-md rounded-[100%] -z-20 pointer-events-none"
      />
    </div>
  );
}