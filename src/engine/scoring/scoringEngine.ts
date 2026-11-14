import type { BaseIndicators } from '../../store/gameStore';

export const evaluateMissionStatus = (day: number, indicators: BaseIndicators): 'playing' | 'victory' | 'defeat' => {
  const isDefeat = indicators.energy <= 0 || indicators.water <= 0 || indicators.oxygen <= 0 || indicators.food <= 0;
  
  if (isDefeat) return 'defeat';
  // A vitória só é garantida se o jogador sobreviver até o final do 7º dia
  if (day > 7) return 'victory';
  
  return 'playing';
};