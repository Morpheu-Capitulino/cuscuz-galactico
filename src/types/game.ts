export type Screen = 'landing' | 'briefing' | 'exploration' | 'base-builder' | 'report';
export type MissionStatus = 'playing' | 'victory' | 'defeat';

export interface Resources {
  regolith: number;
  ice: number;
  solarEnergy: number;
}

export interface Indicators {
  oxygen: number;
  water: number;
  energy: number;
  food: number;
  protection: number;
}

// Agora sim, o idioma está guardado corretamente dentro do Estado do Jogo!
export interface GameState {
  language: 'en' | 'pt';
  setLanguage: (lang: 'en' | 'pt') => void;
  
  currentScreen: Screen;
  day: number;
  missionStatus: MissionStatus;
  resources: Resources;
  indicators: Indicators;
  builtStructures: string[];
  
  setScreen: (screen: Screen) => void;
  collectResource: (type: keyof Resources, amount: number) => void;
  buildStructure: (structureId: string, cost: number, resourceType: keyof Resources) => boolean;
  processDailyTick: () => void;
}