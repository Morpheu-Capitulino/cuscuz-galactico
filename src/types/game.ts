
export type Screen = 'landing' | 'briefing' | 'exploration' | 'base-builder' | 'report';
export type MissionStatus = 'playing' | 'victory' | 'defeat';

language: 'en' | 'pt';
setLanguage: (lang: 'en' | 'pt') => void;

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

// É esta a exportação que está a faltar!
export interface GameState {
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