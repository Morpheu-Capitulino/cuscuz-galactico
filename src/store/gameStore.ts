import { create } from 'zustand';

export type Screen = 'landing' | 'briefing' | 'exploration' | 'base-builder' | 'report';
export type MissionStatus = 'playing' | 'victory' | 'defeat';


// Módulo 03: Recursos extraídos fisicamente do mapa
export interface Inventory {
  regolith: number;
  ice: number;
  solarPower: number;
}

// Módulo 04/05: Barras de sobrevivência da base
export interface BaseIndicators {
  oxygen: number;
  water: number;
  energy: number;
  food: number;
  protection: number;
}

export interface GameState {
  currentScreen: Screen;
  day: number;
  astronauts: number;
  missionStatus: MissionStatus;
  
  inventory: Inventory;
  indicators: BaseIndicators;
  builtStructures: string[];
  activeEvents: string[];

  setScreen: (screen: Screen) => void;
  collectResource: (resource: keyof Inventory, amount: number) => void;
  buildStructure: (structureId: string, cost: Partial<Inventory>) => boolean;
  triggerEvent: (eventId: string) => void;
  processTurn: () => void;
}

const INITIAL_INVENTORY: Inventory = { regolith: 0, ice: 0, solarPower: 0 };
const INITIAL_INDICATORS: BaseIndicators = { oxygen: 100, water: 100, energy: 100, food: 100, protection: 50 };

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'landing',
  day: 1,
  astronauts: 4, 
  missionStatus: 'playing',
  
  inventory: { ...INITIAL_INVENTORY },
  indicators: { ...INITIAL_INDICATORS },
  builtStructures: [],
  activeEvents: [],

  setScreen: (screen) => set({ currentScreen: screen }),

  collectResource: (resource, amount) => set((state) => ({
    inventory: {
      ...state.inventory,
      [resource]: state.inventory[resource] + amount
    }
  })),

  buildStructure: (structureId, cost) => {
    const state = get();
    
    // Trava para impedir prédios duplicados
    if (state.builtStructures.includes(structureId)) {
      return false;
    }

    // Validação rígida: falha se faltar qualquer recurso exigido
    for (const [key, value] of Object.entries(cost)) {
      const resourceKey = key as keyof Inventory;
      if (state.inventory[resourceKey] < (value as number)) {
        return false; 
      }
    }

    set((state) => {
      const newInventory = { ...state.inventory };
      for (const [key, value] of Object.entries(cost)) {
        newInventory[key as keyof Inventory] -= (value as number);
      }
      return {
        inventory: newInventory,
        builtStructures: [...state.builtStructures, structureId]
      };
    });
    return true;
  },

  triggerEvent: (eventId) => set((state) => ({
    activeEvents: [...state.activeEvents, eventId]
  })),

  processTurn: () => {
    // A lógica matemática diária e integração com eventos/produção 
    // será conectada aqui assim que os módulos da engine estiverem importados.
    set((state) => ({
      day: state.day + 1
    }));
  }
}));