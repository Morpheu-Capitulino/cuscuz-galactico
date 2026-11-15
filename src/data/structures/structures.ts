// src/data/structures/structures.ts
import type { Inventory, BaseIndicators } from '../../store/gameStore';

export interface StructureDefinition {
  id: string;
  name: string;
  description: string;
  cost: Partial<Inventory>;
  effects: Partial<BaseIndicators>;
}

export const STRUCTURES: StructureDefinition[] = [
  {
    id: 'habitat',
    name: 'Abrigo Principal',
    description: 'Módulo central pressurizado que gera e mantém o oxigénio da tripulação.',
    cost: { regolith: 30, parts: 15 },
    effects: { o2: 20 }
  },
  {
    id: 'purifier',
    name: 'Filtro de Água',
    description: 'Extrai e purifica o gelo lunar para garantir água potável contínua.',
    cost: { regolith: 25, ice: 20, parts: 10 },
    effects: { water: 25 }
  },
  {
    id: 'greenhouse',
    name: 'Estufa Hidropónica',
    description: 'Cultivo selado de vegetais espaciais ricos em nutrientes.',
    cost: { regolith: 30, ice: 25, parts: 20 },
    effects: { food: 25, o2: 5 }
  },
  {
    id: 'solar',
    name: 'Painéis Solares',
    description: 'Capta a radiação solar para alimentar todos os sistemas vitais da base.',
    cost: { regolith: 20, parts: 25 },
    effects: { energy: 30 }
  },
  {
    id: 'radiation',
    name: 'Escudo de Radiação',
    description: 'Campo defletor magnético contra tempestades solares e micrometeoritos.',
    cost: { regolith: 50, parts: 35 },
    effects: { shield: 35 }
  },
  {
    id: 'medical',
    name: 'Posto Médico',
    description: 'Unidade de tratamento intensivo para recuperação da saúde dos astronautas.',
    cost: { regolith: 35, ice: 15, parts: 30 },
    effects: { o2: 5 }
  },
  {
    id: 'dormitory',
    name: 'Dormitório da Tripulação',
    description: 'Alojamentos isolados que aceleram a recuperação de energia e fadiga.',
    cost: { regolith: 40, parts: 20 },
    effects: { energy: 10 }
  }
];