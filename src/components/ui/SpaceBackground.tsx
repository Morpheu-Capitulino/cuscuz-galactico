import { motion } from 'framer-motion';

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Fundo espacial */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Nebulosas */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-700/10 blur-[150px] -top-80 -left-60" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] bottom-[-300px] right-[-100px]" />

      {/* Lua */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 top-1/4 w-[420px] h-[420px] rounded-full
        bg-gradient-to-br from-slate-300 via-slate-500 to-slate-900
        opacity-20 blur-[1px] shadow-[0_0_100px_rgba(100,200,255,0.2)]"
      >
        <div className="absolute top-20 left-20 w-12 h-12 rounded-full bg-black/20 blur-md" />
        <div className="absolute bottom-28 right-24 w-20 h-20 rounded-full bg-black/20 blur-lg" />
      </motion.div>

      {/* Estrelas */}
      {Array.from({ length: 70 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.7, 1.5, 0.7],
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Meteoros */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          initial={{ x: '-20vw', y: `${20 + i * 25}vh`, opacity: 0 }}
          animate={{
            x: '120vw',
            y: `${50 + i * 15}vh`,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 4,
            ease: 'linear',
          }}
        />
      ))}

      {/* Grade de escaneamento */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}