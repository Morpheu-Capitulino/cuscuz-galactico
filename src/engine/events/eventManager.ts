import type { GameState } from '../../store/gameStore';

// Define o peso matemático dos eventos sobre a base
export const calculateEventImpact = (activeEvents: string[]) => {
  let consumptionMultipliers = {
    energy: 1,
    water: 1
  };

  if (activeEvents.includes('SOLAR_STORM')) {
    // A tempestade dobra o gasto de energia para manter o Radiation Shelter funcionando
    consumptionMultipliers.energy = 2;
  }

  if (activeEvents.includes('WATER_SHORTAGE')) {
    consumptionMultipliers.water = 1.5;
  }

  return consumptionMultipliers;
};