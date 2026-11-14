export interface EventOption {
  text: { pt: string; en: string };
  costType: 'regolith' | 'ice' | 'parts' | 'solarPower';
  cost: number;
}

export interface GameEvent {
  id: string;
  targetRoom: string;
  minRisk: number; 
  title: { pt: string; en: string };
  desc: { pt: string; en: string };
  options: EventOption[];
}

export const EXPLORATION_EVENTS: GameEvent[] = [
  {
    id: 'solar_flare',
    targetRoom: 'radar', 
    minRisk: 1, 
    title: { pt: 'ERUPÇÃO SOLAR', en: 'SOLAR FLARE' },
    desc: { pt: 'Radar superaquecendo devido à radiação solar!', en: 'Radar overheating due to solar radiation!' },
    options: [
      { text: { pt: 'Resfriar (20 Gelo)', en: 'Cool down (20 Ice)' }, costType: 'ice', cost: 20 },
      { text: { pt: 'Sacrificar (15 Peças)', en: 'Sacrifice (15 Parts)' }, costType: 'parts', cost: 15 }
    ]
  },
  {
    id: 'meteor_shower',
    targetRoom: 'cargo', 
    minRisk: 3, // Só aparece quando o jogador comprar upgrades e subir o risco
    title: { pt: 'IMPACTO DE METEORO', en: 'METEOR IMPACT' },
    desc: { pt: 'Casco de carga perfurado por micro-meteoritos!', en: 'Cargo hull breached by micro-meteorites!' },
    options: [
      { text: { pt: 'Remendar (30 Regolito)', en: 'Patch (30 Regolith)' }, costType: 'regolith', cost: 30 },
      { text: { pt: 'Isolar Área (10 Gelo)', en: 'Seal Area (10 Ice)' }, costType: 'ice', cost: 10 }
    ]
  },
  {
    id: 'engine_failure',
    targetRoom: 'engine', 
    minRisk: 5, // Evento crítico de final de fase
    title: { pt: 'FALHA DO MOTOR', en: 'ENGINE FAILURE' },
    desc: { pt: 'Propulsores perdendo potência. Risco de queda orbital!', en: 'Thrusters losing power. Orbital decay imminent!' },
    options: [
      { text: { pt: 'Bypass (50 Peças)', en: 'Bypass (50 Parts)' }, costType: 'parts', cost: 50 },
      { text: { pt: 'Injetar Regolito (60 Regolito)', en: 'Inject Regolith (60 Regolith)' }, costType: 'regolith', cost: 60 }
    ]
  }
];