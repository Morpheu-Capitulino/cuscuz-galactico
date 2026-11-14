// src/pages/Exploration/components/IndicatorItem.tsx
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function IndicatorItem({ icon: Icon, color, value, label, onRefill, disabled, costNode }: any) {
  return (
    <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl shadow-lg relative group transition-all">
      <Icon size={20} className={`text-${color}-400${value <= 20 ? 'animate-pulse text-red-500' : ''} shrink-0`} />
      <div className="w-24 md:w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-${color}-400 transition-all duration-500 ease-linear ${value <= 20 ? 'bg-red-500 shadow-[0_0_15px_red]' : `shadow-[0_0_15px_${color}]`}`} style={{ width: `${value}%` }} />
      </div>
      <button onClick={onRefill} disabled={disabled} className={`px-3 py-1 flex items-center justify-center bg-${color}-900 hover:bg-${color}-700 border-2 border-${color}-700 rounded-lg transition-transform active:scale-95 disabled:opacity-40 shrink-0 cursor-pointer`}>
        <span className="text-white font-black text-xs md:text-sm uppercase tracking-wider">+ {label}</span>
      </button>
      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none bg-slate-950 text-${color}-300 text-xs px-4 py-2 rounded-lg border border-${color}-900 whitespace-nowrap z-50 transition-opacity font-black shadow-2xl flex items-center gap-2`}>
        CUSTO <ChevronRight size={12} className="mx-1" /> {costNode}
      </div>
    </div>
  );
}