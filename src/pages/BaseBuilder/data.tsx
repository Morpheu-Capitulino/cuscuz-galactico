import type { ReactNode } from 'react';
import { Home, Droplets, Sprout, Sun, Shield, HeartPulse, BedDouble } from 'lucide-react';
import type { Inventory, BaseIndicators } from '../../store/gameStore';

export type StructureId = 'habitat' | 'purifier' | 'greenhouse' | 'solar' | 'radiation' | 'medical' | 'dormitory';

export interface BilingualText {
  pt: string;
  en: string;
}

export interface StructureLevel {
  effect: BilingualText;
  cost: Partial<Inventory>;
}

export interface StructureDef {
  id: StructureId;
  name: BilingualText;
  desc: BilingualText;
  levels: StructureLevel[];
  icon: ReactNode;
}

export const STRUCTURES: StructureDef[] = [
  { 
    id: 'habitat', 
    name: { pt: 'ABRIGO PRINCIPAL', en: 'MAIN HABITAT' }, 
    desc: { pt: 'O coração da base! Fornece oxigênio para a equipe.', en: 'The heart of the base! Provides oxygen to the crew.' }, 
    levels: [
      { effect: { pt: 'Suporte de vida básico', en: 'Basic life support' }, cost: { regolith: 100, ice: 0, parts: 25 } },
      { effect: { pt: 'Eficiência de oxigênio', en: 'Oxygen efficiency' }, cost: { regolith: 150, ice: 0, parts: 45 } },
      { effect: { pt: 'Recuperação passiva', en: 'Passive recovery' }, cost: { regolith: 220, ice: 0, parts: 85 } }
    ], icon: <Home size={24} /> 
  },
  { 
    id: 'purifier', 
    name: { pt: 'FILTRO DE ÁGUA', en: 'WATER PURIFIER' }, 
    desc: { pt: 'Transforma gelo bruto em água potável.', en: 'Transforms raw ice into drinkable water.' }, 
    levels: [
      { effect: { pt: 'Reciclagem básica', en: 'Basic recycling' }, cost: { regolith: 50, ice: 40, parts: 20 } },
      { effect: { pt: 'Reduz consumo', en: 'Reduced consumption' }, cost: { regolith: 80, ice: 55, parts: 40 } },
      { effect: { pt: 'Eficiência máxima', en: 'Maximum efficiency' }, cost: { regolith: 120, ice: 70, parts: 65 } }
    ], icon: <Droplets size={24} /> 
  },
  { 
    id: 'greenhouse', 
    name: { pt: 'ESTUFA DE PLANTAS', en: 'GREENHOUSE' }, 
    desc: { pt: 'Jardim para cultivar alimentos.', en: 'Garden to grow food for the crew.' }, 
    levels: [
      { effect: { pt: 'Produção básica', en: 'Basic production' }, cost: { regolith: 60, ice: 35, parts: 25 } },
      { effect: { pt: 'Produção acelerada', en: 'Accelerated growth' }, cost: { regolith: 90, ice: 55, parts: 50 } },
      { effect: { pt: 'Super colheita', en: 'Super harvest' }, cost: { regolith: 150, ice: 85, parts: 75 } }
    ], icon: <Sprout size={24} /> 
  },
  { 
    id: 'solar', 
    name: { pt: 'PAINÉIS SOLARES', en: 'SOLAR PANELS' }, 
    desc: { pt: 'Matriz solar para energizar a base.', en: 'Solar array to power the base.' }, 
    levels: [
      { effect: { pt: 'Geração básica', en: 'Basic generation' }, cost: { regolith: 80, ice: 0, parts: 20 } },
      { effect: { pt: 'Geração melhorada', en: 'Improved generation' }, cost: { regolith: 120, ice: 0, parts: 45 } },
      { effect: { pt: 'Armazenamento extra', en: 'Extra storage' }, cost: { regolith: 180, ice: 0, parts: 80 } }
    ], icon: <Sun size={24} /> 
  },
  { 
    id: 'radiation', 
    name: { pt: 'ESCUDO PROTETOR', en: 'DEFLECTOR SHIELD' }, 
    desc: { pt: 'Barreira magnética contra radiação.', en: 'Magnetic barrier against radiation.' }, 
    levels: [
      { effect: { pt: 'Proteção básica', en: 'Basic protection' }, cost: { regolith: 150, ice: 25, parts: 30 } },
      { effect: { pt: 'Resiste a tempestades', en: 'Storm resistance' }, cost: { regolith: 220, ice: 55, parts: 55 } },
      { effect: { pt: 'Bloqueio total', en: 'Total block' }, cost: { regolith: 320, ice: 90, parts: 110 } }
    ], icon: <Shield size={24} /> 
  },
  { 
    id: 'medical', 
    name: { pt: 'ENFERMARIA', en: 'MEDICAL BAY' }, 
    desc: { pt: 'Módulo hospitalar para a tripulação.', en: 'Hospital module for the crew.' }, 
    levels: [
      { effect: { pt: 'Recuperação médica', en: 'Medical recovery' }, cost: { regolith: 90, ice: 30, parts: 50 } },
      { effect: { pt: 'Tratamento rápido', en: 'Fast treatment' }, cost: { regolith: 130, ice: 45, parts: 85 } },
      { effect: { pt: 'Regeneração celular', en: 'Cellular regeneration' }, cost: { regolith: 200, ice: 75, parts: 130 } }
    ], icon: <HeartPulse size={24} /> 
  },
  { 
    id: 'dormitory', 
    name: { pt: 'DORMITÓRIO', en: 'CREW QUARTERS' }, 
    desc: { pt: 'Alojamentos para restauração de energia.', en: 'Living quarters for energy restoration.' }, 
    levels: [
      { effect: { pt: 'Descanso básico', en: 'Basic rest' }, cost: { regolith: 70, ice: 20, parts: 40 } },
      { effect: { pt: 'Sono reparador', en: 'Restful sleep' }, cost: { regolith: 110, ice: 35, parts: 75 } },
      { effect: { pt: 'Recarga otimizada', en: 'Optimized recharge' }, cost: { regolith: 160, ice: 55, parts: 105 } }
    ], icon: <BedDouble size={24} /> 
  }
];

export const RESEARCH_TREE = [
  { id: 'r_water', name: { pt: 'Super Filtros', en: 'Super Filters' }, desc: { pt: 'Desbloqueia melhorias avançadas do Filtro.', en: 'Unlocks advanced Filter upgrades.' }, cost: 30, req: 'purifier', duration: 80 },
  { id: 'r_farm', name: { pt: 'Agricultura Lunar', en: 'Lunar Agriculture' }, desc: { pt: 'Sementes geneticamente modificadas.', en: 'Genetically modified seeds.' }, cost: 40, req: 'greenhouse', duration: 100 },
  { id: 'r_solar', name: { pt: 'Engenharia Avançada', en: 'Advanced Engineering' }, desc: { pt: 'Baterias e estruturas otimizadas.', en: 'Optimized batteries and structures.' }, cost: 60, req: 'solar', duration: 120 },
  { id: 'r_med', name: { pt: 'Medicina Espacial', en: 'Space Medicine' }, desc: { pt: 'Técnicas avançadas de cura celular.', en: 'Advanced cellular healing techniques.' }, cost: 45, req: 'medical', duration: 90 },
];

export const EXPEDITIONS = [
  { id: 'e1', name: { pt: 'Caverna Congelada', en: 'Frozen Cave' }, desc: { pt: 'Uma gruta escura com altas concentrações de gelo.', en: 'A dark cave with high ice concentrations.' }, duration: 140, risk: { pt: 'Moderado', en: 'Moderate' }, reward: { ice: 45, regolith: 10 } },
  { id: 'e2', name: { pt: 'Cemitério de Naves', en: 'Ship Graveyard' }, desc: { pt: 'Destroços de antigas sondas. Rico em peças.', en: 'Debris from old probes. Rich in parts.' }, duration: 200, risk: { pt: 'Alto', en: 'High' }, reward: { parts: 40, regolith: 20 } },
  { id: 'e3', name: { pt: 'Montanha de Pedras', en: 'Stone Mountain' }, desc: { pt: 'Formação rochosa perfeita para mineração.', en: 'Rock formation perfect for mining.' }, duration: 110, risk: { pt: 'Baixo', en: 'Low' }, reward: { regolith: 65 } },
];