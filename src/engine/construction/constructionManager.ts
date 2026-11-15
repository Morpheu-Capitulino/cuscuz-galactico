import type { BaseIndicators } from '../../store/gameStore';

// O contrato do que cada prédio gera por turno
const STRUCTURE_YIELDS: Record<string, Partial<BaseIndicators>> = {
  'solar-panel': { energy: 30 },
  'water-recycler': { water: 20 },
  'greenhouse': { food: 15 },
  'radiation-shelter': { shield: 20 }
};

export const calculateDailyProduction = (builtStructures: string[]) => {
  const totalProduction = { energy: 0, water: 0, food: 0, shield: 0 };

  builtStructures.forEach((structureId) => {
    const yieldData = STRUCTURE_YIELDS[structureId];
    if (yieldData) {
      totalProduction.energy += yieldData.energy || 0;
      totalProduction.water += yieldData.water || 0;
      totalProduction.food += yieldData.food || 0;
      totalProduction.shield += yieldData.shield || 0;
    }
  });

  return totalProduction;
};