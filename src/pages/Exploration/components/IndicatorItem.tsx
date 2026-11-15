// src/pages/Exploration/components/IndicatorItem.tsx
import { ChevronRight } from 'lucide-react';

const colorStyles: Record<string, { bg: string, text: string, border: string, shadow: string, hover: string, pulse: string }> = {
  teal: { bg: 'bg-teal-400', text: 'text-teal-400', border: 'border-teal-700', shadow: 'shadow-[0_0_15px_teal]', hover: 'hover:bg-teal-700', pulse: 'bg-teal-900' },
  cyan: { bg: 'bg-cyan-400', text: 'text-cyan-400', border: 'border-cyan-700', shadow: 'shadow-[0_0_15px_cyan]', hover: 'hover:bg-cyan-700', pulse: 'bg-cyan-900' },
  blue: { bg: 'bg-blue-400', text: 'text-blue-400', border: 'border-blue-700', shadow: 'shadow-[0_0_15px_blue]', hover: 'hover:bg-blue-700', pulse: 'bg-blue-900' },
  yellow: { bg: 'bg-yellow-400', text: 'text-yellow-400', border: 'border-yellow-700', shadow: 'shadow-[0_0_15px_yellow]', hover: 'hover:bg-yellow-700', pulse: 'bg-yellow-900' },
};

export function IndicatorItem({ icon: Icon, color, value, label, onRefill, disabled, costNode }: any) {
  const style = colorStyles[color] || colorStyles.cyan;
  const isCritical = value <= 20;

  return (
    <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl shadow-lg relative group transition-all">
      <Icon size={20} className={`${style.text} ${isCritical ? 'animate-pulse text-red-500' : ''} shrink-0`} />
      
      <div className="w-24 md:w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-linear ${isCritical ? 'bg-red-500 shadow-[0_0_15px_red]' : `${style.bg} ${style.shadow}`}`} 
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }} 
        />
      </div>
      
      {onRefill && (
        <button 
          onClick={onRefill} 
          disabled={disabled} 
          className={`px-3 py-1 flex items-center justify-center ${style.pulse} ${style.hover} border-2 ${style.border} rounded-lg transition-transform active:scale-95 disabled:opacity-40 shrink-0 cursor-pointer`}
        >
          <span className="text-white font-black text-xs md:text-sm uppercase tracking-wider">+ {label}</span>
        </button>
      )}
      
      {costNode && (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none bg-slate-950 ${style.text} text-xs px-4 py-2 rounded-lg border border-slate-700 whitespace-nowrap z-50 transition-opacity font-black shadow-2xl flex items-center gap-2`}>
          CUSTO <ChevronRight size={12} className="mx-1" /> {costNode}
        </div>
      )}
    </div>
  );
}