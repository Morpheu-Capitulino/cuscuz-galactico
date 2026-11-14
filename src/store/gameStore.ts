import { create } from 'zustand';
// Certifique-se de que a função calculateEventImpact existe no eventManager.ts
import { calculateEventImpact } from '../engine/events/eventManager';

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
    
    // Validação rígida: o construtor falha se faltar qualquer recurso exigido
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
    const state = get();
    
    // Busca os multiplicadores de dano dos eventos ativos
    const impact = calculateEventImpact(state.activeEvents);

    // Consumo base diário estipulado para a tripulação com peso dos eventos
    const baseCosts = {
      energy: 20 * (impact.energy || 1),
      water: 15 * (impact.water || 1),
      oxygen: 20, 
      food: 10  
    };

    set((state) => {
      // 1. Processamento de Energia
      let newSolarPower = state.inventory.solarPower - baseCosts.energy;
      let newEnergyIndicator = state.indicators.energy;
      if (newSolarPower < 0) {
        newEnergyIndicator = Math.max(0, state.indicators.energy + newSolarPower);
        newSolarPower = 0;
      }

      // 2. Processamento de Água (Gelo derretido absorve o impacto antes do reservatório da base)
      let newIce = state.inventory.ice - baseCosts.water;
      let newWaterIndicator = state.indicators.water;
      if (newIce < 0) {
        newWaterIndicator = Math.max(0, state.indicators.water + newIce);
        newIce = 0;
      }

      // 3. Processamento de Oxigênio e Comida (Consumo direto na base)
      const newOxygenIndicator = Math.max(0, state.indicators.oxygen - baseCosts.oxygen);
      const newFoodIndicator = Math.max(0, state.indicators.food - baseCosts.food);

      // Verificação de falha crítica estrutural
      const isDefeat = newEnergyIndicator === 0 || newWaterIndicator === 0 || newOxygenIndicator === 0 || newFoodIndicator === 0;
      
      const nextDay = state.day + 1;
      const isVictory = nextDay > 7 && !isDefeat; // Vitória só conta ao sobreviver o 7º dia completo

      return {
        day: nextDay,
        inventory: {
          ...state.inventory,
          solarPower: newSolarPower,
          ice: newIce
        },
        indicators: {
          ...state.indicators,
          energy: newEnergyIndicator,
          water: newWaterIndicator,
          oxygen: newOxygenIndicator,
          food: newFoodIndicator
        },
        activeEvents: [], 
        missionStatus: isDefeat ? 'defeat' : (isVictory ? 'victory' : state.missionStatus)
      };
    });
  }
}));