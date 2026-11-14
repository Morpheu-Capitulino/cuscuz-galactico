import { EXPLORATION_EVENTS } from '../../data/events';
import type { GameEvent } from '../../data/events';

// O motor calcula a probabilidade e sorteia baseado no teto de dificuldade
export const pullRandomEvent = (currentRiskLevel: number): GameEvent | null => {
  const availableEvents = EXPLORATION_EVENTS.filter(ev => ev.minRisk <= currentRiskLevel);
  
  if (availableEvents.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableEvents.length);
  return availableEvents[randomIndex];
};