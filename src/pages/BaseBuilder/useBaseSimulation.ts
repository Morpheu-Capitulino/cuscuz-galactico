import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { BASE_EVENTS, type BaseEvent } from './data';

const REAL_MS_PER_TICK = 1000;

export function useBaseSimulation() {
  const store = useGameStore();
  const [activeEvent, setActiveEvent] = useState<BaseEvent | null>(null);
  const [lumiMessage, setLumiMessage] = useState('Comandante! Gerencie a base e a tripulação com sabedoria.');

  // Motor Principal da Simulação
  useEffect(() => {
    if (store.isPaused || store.missionStatus !== 'jogando' || activeEvent || store.activeExpedition?.status === 'evento') return;
    
    const interval = setInterval(() => {
      store.tickBase();
      
      if (store.buildingModules.length > 0) store.progressBuildings(5 * store.simSpeed);
      if (store.upgradingModules?.length > 0) store.progressUpgrades(5 * store.simSpeed);
      if (store.activeExpedition) store.progressExpedition(5 * store.simSpeed);

      // Sorteio de Eventos Aleatórios na Base
      if (Math.random() < 0.002 * store.simSpeed && store.clock.day >= 2 && !activeEvent) {
        const ev = BASE_EVENTS[Math.floor(Math.random() * BASE_EVENTS.length)];
        store.togglePause(true);
        setActiveEvent(ev);
        setLumiMessage(`ATENÇÃO! ${ev.title}`);
      }
    }, REAL_MS_PER_TICK / store.simSpeed);

    return () => clearInterval(interval);
  }, [
    store.isPaused, store.simSpeed, store.missionStatus, activeEvent, 
    store.buildingModules, store.upgradingModules, store.activeExpedition,
    store.clock.day
  ]);

  // Mensagens Contextuais do L.U.M.I
  useEffect(() => {
    const tired = store.crew.find(c => c.energy < 20 && c.status === 'ativo');
    if (tired) {
      setLumiMessage(`Aviso: ${tired.name} está exausto. Ordene descanso antes que colapse!`);
    }
  }, [store.crew]);

  return { activeEvent, setActiveEvent, lumiMessage, setLumiMessage };
}