import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GAME_EVENTS } from './constants'; // Importando os eventos da NASA do seu amigo!

export function useBaseSimulation() {
  const isPaused = useGameStore(state => state.isPaused);
  const tickSimulation = useGameStore(state => state.tickSimulation);
  const isTrainingMode = useGameStore(state => state.isTrainingMode);
  const language = useGameStore(state => state.language) || 'pt';
  const togglePause = useGameStore(state => state.togglePause);

  const [activeEvent, setActiveEvent] = useState<any | null>(null);
  const [lumiMessage, setLumiMessage] = useState<string>('');

  const ticksRef = useRef(0);

  useEffect(() => {
    let timer: number;
    
    if (!isPaused) {
      timer = window.setInterval(() => {
        tickSimulation();
        
        // ==========================================
        // MOTOR DE EVENTOS ALEATÓRIOS DA NASA
        // ==========================================
        if (!isTrainingMode && !activeEvent) {
          ticksRef.current += 1;
          
          // A cada 20 "ciclos" de tempo, há 25% de chance de ocorrer uma emergência
          if (ticksRef.current >= 20) {
            ticksRef.current = 0;
            
            if (Math.random() < 0.25) {
              // Sorteia um evento do arquivo constants
              const randomNasaEvent = GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
              
              // Adaptador: Traduz a estrutura do seu amigo para a estrutura do Modal da Base
              const mappedEvent = {
                id: randomNasaEvent.id,
                title: randomNasaEvent.title[language as keyof typeof randomNasaEvent.title] || randomNasaEvent.title.pt,
                desc: randomNasaEvent.desc[language as keyof typeof randomNasaEvent.desc] || randomNasaEvent.desc.pt,
                options: randomNasaEvent.options.map(opt => ({
                  text: opt.text[language as keyof typeof opt.text] || opt.text.pt,
                  cost: { [opt.costType]: opt.cost },
                  // Se o hpMod for negativo, aplica dano ao ESCUDO da base (para não matar a tripulação injustamente)
                  dmg: opt.hpMod < 0 ? { type: 'shield', amount: Math.abs(opt.hpMod) } : undefined,
                  // Passamos a consequência para a L.U.M.I. contar depois!
                  outcomeMsg: opt.outcome[language as keyof typeof opt.outcome] || opt.outcome.pt
                }))
              };
              
              setActiveEvent(mappedEvent);
              togglePause(true); // Pausa o jogo automaticamente para a criança poder ler e pensar!
            }
          }
        }
      }, 1000); 
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [isPaused, tickSimulation, isTrainingMode, activeEvent, language, togglePause]);

  return {
    activeEvent,
    setActiveEvent,
    lumiMessage,
    setLumiMessage
  };
}