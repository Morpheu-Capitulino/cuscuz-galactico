import { ReactNode } from 'react';
import { Home, Droplets, Sprout, Sun, Shield, HeartPulse, BedDouble } from 'lucide-react';
import type { Inventory, BaseIndicators } from '../../store/gameStore';

export type StructureId = 'habitat' | 'purifier' | 'greenhouse' | 'solar' | 'radiation' | 'medical' | 'dormitory';

export interface StructureLevel {
  effect: string;
  cost: Partial<Inventory>;
}

export interface StructureDef {
  id: StructureId;
  name: string;
  desc: string;
  levels: StructureLevel[];
  icon: ReactNode;
}

export const STRUCTURES: StructureDef[] = [
  { 
    id: 'habitat', name: 'ABRIGO PRINCIPAL', desc: 'O coração da base! Fornece oxigênio para a equipe.', 
    levels: [
      { effect: 'Suporte de vida básico', cost: { regolith: 100, ice: 0, parts: 25 } },
      { effect: 'Eficiência de oxigênio melhorada', cost: { regolith: 150, ice: 0, parts: 40 } },
      { effect: 'Recuperação passiva de saúde', cost: { regolith: 200, ice: 0, parts: 80 } }
    ], icon: <Home size={24} /> 
  },
  { 
    id: 'purifier', name: 'FILTRO DE ÁGUA', desc: 'Transforma gelo bruto em água potável.', 
    levels: [
      { effect: 'Reciclagem básica', cost: { regolith: 50, ice: 40, parts: 20 } },
      { effect: 'Reduz consumo de água', cost: { regolith: 80, ice: 50, parts: 35 } },
      { effect: 'Eficiência máxima', cost: { regolith: 120, ice: 60, parts: 60 } }
    ], icon: <Droplets size={24} /> 
  },
  { 
    id: 'greenhouse', name: 'ESTUFA DE PLANTAS', desc: 'Jardim botânico para cultivar alimentos na Lua.', 
    levels: [
      { effect: 'Produção básica', cost: { regolith: 60, ice: 35, parts: 25 } },
      { effect: 'Produção acelerada', cost: { regolith: 90, ice: 50, parts: 45 } },
      { effect: 'Super colheita', cost: { regolith: 140, ice: 80, parts: 70 } }
    ], icon: <Sprout size={24} /> 
  },
  { 
    id: 'solar', name: 'PAINÉIS SOLARES', desc: 'Matriz solar para manter a base energizada.', 
    levels: [
      { effect: 'Geração básica', cost: { regolith: 80, ice: 0, parts: 20 } },
      { effect: 'Geração melhorada', cost: { regolith: 120, ice: 0, parts: 40 } },
      { effect: 'Armazenamento extra', cost: { regolith: 180, ice: 0, parts: 75 } }
    ], icon: <Sun size={24} /> 
  },
  { 
    id: 'radiation', name: 'ESCUDO PROTETOR', desc: 'Barreira magnética contra radiação e detritos.', 
    levels: [
      { effect: 'Proteção básica', cost: { regolith: 150, ice: 25, parts: 30 } },
      { effect: 'Resiste a tempestades', cost: { regolith: 200, ice: 50, parts: 50 } },
      { effect: 'Bloqueio total de radiação', cost: { regolith: 300, ice: 80, parts: 100 } }
    ], icon: <Shield size={24} /> 
  },
  { 
    id: 'medical', name: 'ENFERMARIA', desc: 'Módulo hospitalar para a tripulação.', 
    levels: [
      { effect: 'Recuperação médica', cost: { regolith: 90, ice: 30, parts: 50 } },
      { effect: 'Tratamento rápido', cost: { regolith: 130, ice: 45, parts: 80 } },
      { effect: 'Regeneração celular', cost: { regolith: 200, ice: 70, parts: 120 } }
    ], icon: <HeartPulse size={24} /> 
  },
  { 
    id: 'dormitory', name: 'DORMITÓRIO AVANÇADO', desc: 'Alojamentos para restauração de energia.', 
    levels: [
      { effect: 'Descanso básico', cost: { regolith: 70, ice: 20, parts: 40 } },
      { effect: 'Sono reparador', cost: { regolith: 110, ice: 35, parts: 70 } },
      { effect: 'Recarga otimizada', cost: { regolith: 160, ice: 50, parts: 100 } }
    ], icon: <BedDouble size={24} /> 
  }
];

export const RESEARCH_TREE = [
  { id: 'r_water', name: 'Super Filtros', desc: 'Desbloqueia melhorias avançadas do Filtro.', cost: 30, req: 'purifier' },
  { id: 'r_farm', name: 'Agricultura Lunar', desc: 'Sementes geneticamente modificadas.', cost: 40, req: 'greenhouse' },
  { id: 'r_solar', name: 'Engenharia Avançada', desc: 'Baterias e estruturas otimizadas.', cost: 60, req: 'solar' },
  { id: 'r_med', name: 'Medicina Espacial', desc: 'Técnicas avançadas de cura.', cost: 45, req: 'medical' },
];

export const EXPEDITIONS = [
  { id: 'e1', name: 'Caverna Congelada', desc: 'Uma gruta escura com altas concentrações de gelo de água.', duration: 120, risk: 'Moderado', reward: { ice: 40, regolith: 10 } },
  { id: 'e2', name: 'Cemitério de Naves', desc: 'Destroços de antigas sondas. Perigoso, mas rico em peças.', duration: 180, risk: 'Alto', reward: { parts: 35, regolith: 20 } },
  { id: 'e3', name: 'Montanha de Pedras', desc: 'Formação rochosa densa perfeita para mineração de regolito.', duration: 90, risk: 'Baixo', reward: { regolith: 60 } },
];

export interface BaseEvent {
  id: string;
  title: string;
  desc: string;
  options: {
    text: string;
    cost: Partial<Inventory>;
    dmg?: { type: keyof BaseIndicators; amount: number };
  }[];
}

export const BASE_EVENTS: BaseEvent[] = [
  { 
    id: 'dust_storm', title: 'TEMPESTADE DE POEIRA LUNAR!', 
    desc: 'Alerta vermelho! Um furacão de poeira cobriu os painéis. A energia vai despencar se não agirmos rápido!', 
    options: [
      { text: 'Limpar Painéis (Gasta 10 Peças)', cost: { parts: 10 }, dmg: { type: 'energy', amount: 0 } }, 
      { text: 'Apagar as Luzes (Perde 30% Energia)', cost: {}, dmg: { type: 'energy', amount: 30 } },
      { text: 'Deixar Bater (Danifica o Escudo)', cost: {}, dmg: { type: 'shield', amount: 40 } }
    ] 
  }
];