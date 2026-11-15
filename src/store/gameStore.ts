import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TutorialStepId = 
  | 'SUPPLIES_ARRIVAL' | 'HUD_RESOURCES' | 'CREW_INTRO' 
  | 'BUILD_HABITAT' | 'ASSIGN_ENGINEER' | 'ACTIVATE_SIMULATION' 
  | 'WAIT_PROGRESS' | 'EXPLORATION_INTRO' | 'RESEARCH_INTRO' | 'COMPLETED';

export type AssignmentTarget = 'building' | 'upgrade' | 'research' | 'expedition';

export type PendingTask = {
  type: AssignmentTarget;
  targetId: string;
  title: string;
  data: any;
};

export interface Inventory {
  regolith: number;
  ice: number;
  parts: number;
}

export interface BaseIndicators {
  o2: number;
  water: number;
  food: number;
  energy: number;
  shield: number;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  health: number;
  energy: number;
  status: 'ativo' | 'descansando' | 'incapacitado';
  assignment: { type: AssignmentTarget, targetId: string } | null;
}

export interface GameState {
  language: string;
  setLanguage: (lang: string) => void;
  inventory: Inventory;
  indicators: BaseIndicators;
  
  laserLevel: number;
  radarLevel: number;
  droneLevel: number;
  cargoLevel: number;
  shieldLevel: number;
  engineLevel: number;
  armorLevel: number;
  coreLevel: number;
  scoopLevel: number;
  turretLevel: number;
  
  // === ESTADOS DO DIÁRIO DE BORDO ===
  unlockedEvents: string[];
  unlockEvent: (eventId: string) => void;
  
  updateIndicator: (type: keyof BaseIndicators, amount: number) => void;
  upgradeEquipment: (equipment: string, cost: Partial<Inventory>) => void;
  
  clock: { h: number, m: number, day: number };
  isPaused: boolean;
  simSpeed: number;
  
  crew: CrewMember[];
  
  moduleLevels: Record<string, number>;
  builtModules: string[];
  buildingModules: { id: string, progress: number, cost: Partial<Inventory> }[];
  upgradingModules: { id: string, progress: number, cost: Partial<Inventory> }[];
  
  research: string[];
  activeResearch: { id: string, progress: number, duration: number } | null;
  activeExpedition: { id: string, progress: number, status: string, duration: number, currentEvent?: any, expData?: any } | null;
  
  notifications: any[];
  missionStatus: 'jogando' | 'vitoria' | 'derrota';
  
  pendingTask: PendingTask | null;

  tutorialStep: TutorialStepId;
  isTrainingMode: boolean;
  preTutorialInventory: Inventory | null;

  setPendingTask: (task: PendingTask | null) => void;
  startTutorial: () => void;
  advanceTutorial: (step: TutorialStepId) => void;
  endTutorial: () => void;
  setTutorialStep: (step: TutorialStepId) => void;

  togglePause: (force?: boolean) => void;
  setSimSpeed: (speed: number) => void;
  setCrewStatus: (id: string, status: CrewMember['status']) => void;
  assignCrew: (id: string, assignment: CrewMember['assignment']) => void;
  unassignCrew: (id: string) => void;
  collectResource: (type: keyof Inventory, amount: number) => void;
  applyEventDamage: (dmg: { type: keyof BaseIndicators, amount: number }) => void;
  
  startBuilding: (id: string, cost: Partial<Inventory>) => void;
  startUpgrade: (id: string, cost: Partial<Inventory>) => void;
  startResearch: (id: string, cost: number, duration: number) => void;
  startExpedition: (exp: any) => void;
  resolveExpeditionEvent: (option: any) => void;
  removeNotification: (id: string) => void;
  resetGame: () => void;
  
  tickSimulation: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      language: 'pt',
      setLanguage: (lang) => set({ language: lang }),
      
      inventory: { regolith: 0, ice: 0, parts: 0 }, 
      indicators: { o2: 100, water: 100, food: 100, energy: 100, shield: 100 },
      
      laserLevel: 1, radarLevel: 1, droneLevel: 0, cargoLevel: 1, shieldLevel: 0, 
      engineLevel: 1, armorLevel: 0, coreLevel: 1, scoopLevel: 0, turretLevel: 0,

      // === FUNÇÕES DO DIÁRIO DE BORDO ===
      unlockedEvents: [],
      unlockEvent: (eventId) => set(s => ({
        unlockedEvents: s.unlockedEvents.includes(eventId) ? s.unlockedEvents : [...s.unlockedEvents, eventId]
      })),

      updateIndicator: (type, amount) => set(s => ({
        indicators: { ...s.indicators, [type]: Math.min(100, Math.max(0, s.indicators[type] + amount)) }
      })),

      upgradeEquipment: (equipment, cost) => set(s => {
        const currentLevel = (s as any)[equipment] as number;
        const nextState: any = { [equipment]: currentLevel + 1 };
        
        if (!s.isTrainingMode) {
          nextState.inventory = {
            regolith: s.inventory.regolith - (cost.regolith || 0),
            ice: s.inventory.ice - (cost.ice || 0),
            parts: s.inventory.parts - (cost.parts || 0)
          };
        }
        return nextState;
      }),

      clock: { h: 6, m: 0, day: 1 },
      isPaused: true,
      simSpeed: 1,

      crew: [
        { id: '1', name: 'Cmd. Hayes', role: 'Comandante', health: 100, energy: 100, status: 'ativo', assignment: null },
        { id: '2', name: 'Eng. Torres', role: 'Engenheiro', health: 100, energy: 100, status: 'ativo', assignment: null },
        { id: '3', name: 'Dr. Vance', role: 'Médico', health: 100, energy: 100, status: 'ativo', assignment: null },
        { id: '4', name: 'Bio. Sato', role: 'Astrobiólogo', health: 100, energy: 100, status: 'ativo', assignment: null }
      ],
      
      moduleLevels: {},
      builtModules: [],
      buildingModules: [],
      upgradingModules: [],
      
      research: [],
      activeResearch: null,
      activeExpedition: null,
      
      notifications: [],
      missionStatus: 'jogando',
      pendingTask: null,

      tutorialStep: 'SUPPLIES_ARRIVAL',
      isTrainingMode: false,
      preTutorialInventory: null,

      setPendingTask: (task) => set({ pendingTask: task }),

      startTutorial: () => set((state) => {
        if (state.isTrainingMode) return state; 
        
        return {
          tutorialStep: 'SUPPLIES_ARRIVAL',
          isTrainingMode: true,
          preTutorialInventory: { ...state.inventory }, 
          inventory: { regolith: 99999999, ice: 99999999, parts: 99999999 }
        };
      }),

      advanceTutorial: (step) => set({ tutorialStep: step }),

      // =========================================================
      // O SEGREDO DO RESET INTELIGENTE ESTÁ AQUI
      // =========================================================
      endTutorial: () => set((state) => {
        // Pega a fotografia tirada antes do tutorial
        const inherited = state.preTutorialInventory || { regolith: 0, ice: 0, parts: 0 };
        
        // KIT DE EMERGÊNCIA: Se o jogador pulou a fase da Nave para testar
        // ou se a criança coletou muito pouco, garantimos um mínimo vital usando Math.max!
        const finalInv = {
          regolith: Math.max(150, inherited.regolith),
          ice: Math.max(50, inherited.ice),
          parts: Math.max(20, inherited.parts)
        };

        return {
          tutorialStep: 'COMPLETED',
          isTrainingMode: false,
          inventory: finalInv, 
          preTutorialInventory: null, 
          
          indicators: { o2: 100, water: 100, food: 100, energy: 100, shield: 100 },
          clock: { h: 6, m: 0, day: 1 }, 
          isPaused: true, 
          builtModules: [], 
          moduleLevels: {},
          buildingModules: [],
          upgradingModules: [],
          research: [],
          activeResearch: null,
          activeExpedition: null,
          pendingTask: null,
          notifications: [],
          crew: [ 
            { id: '1', name: 'Cmd. Hayes', role: 'Comandante', health: 100, energy: 100, status: 'ativo', assignment: null },
            { id: '2', name: 'Eng. Torres', role: 'Engenheiro', health: 100, energy: 100, status: 'ativo', assignment: null },
            { id: '3', name: 'Dr. Vance', role: 'Médico', health: 100, energy: 100, status: 'ativo', assignment: null },
            { id: '4', name: 'Bio. Sato', role: 'Astrobiólogo', health: 100, energy: 100, status: 'ativo', assignment: null }
          ]
        };
      }),

      setTutorialStep: (step) => set({ tutorialStep: step }),
      togglePause: (force) => set(s => ({ isPaused: force !== undefined ? force : !s.isPaused })),
      setSimSpeed: (speed) => set({ simSpeed: speed }),
      
      setCrewStatus: (id, status) => set(s => ({
        crew: s.crew.map(c => c.id === id ? { ...c, status } : c)
      })),

      assignCrew: (id, assignment) => set(s => ({
        crew: s.crew.map(c => c.id === id ? { ...c, assignment } : c)
      })),

      unassignCrew: (id) => set(s => ({
        crew: s.crew.map(c => c.id === id ? { ...c, assignment: null } : c)
      })),

      collectResource: (type, amount) => set(s => ({
        inventory: { ...s.inventory, [type]: Math.max(0, s.inventory[type] + amount) }
      })),

      applyEventDamage: (dmg) => set(s => ({
        indicators: { ...s.indicators, [dmg.type]: Math.max(0, s.indicators[dmg.type] - dmg.amount) }
      })),

      startBuilding: (id, cost) => set(s => {
        const nextState: any = { buildingModules: [...s.buildingModules, { id, progress: 0, cost }] };
        if (!s.isTrainingMode) {
          nextState.inventory = {
            regolith: s.inventory.regolith - (cost.regolith || 0),
            ice: s.inventory.ice - (cost.ice || 0),
            parts: s.inventory.parts - (cost.parts || 0)
          };
        }
        return nextState;
      }),

      startUpgrade: (id, cost) => set(s => {
        const nextState: any = { upgradingModules: [...s.upgradingModules, { id, progress: 0, cost }] };
        if (!s.isTrainingMode) {
          nextState.inventory = {
            regolith: s.inventory.regolith - (cost.regolith || 0),
            ice: s.inventory.ice - (cost.ice || 0),
            parts: s.inventory.parts - (cost.parts || 0)
          };
        }
        return nextState;
      }),

      startResearch: (id, cost, duration) => set(s => {
        const nextState: any = { activeResearch: { id, progress: 0, duration } };
        if (!s.isTrainingMode) {
          nextState.inventory = { ...s.inventory, parts: s.inventory.parts - cost };
        }
        return nextState;
      }),

      startExpedition: (exp) => set({
        activeExpedition: { id: exp.id, progress: 0, status: 'ida', duration: exp.duration, expData: exp }
      }),

      resolveExpeditionEvent: (_option) => set(s => {
        if (!s.activeExpedition) return s;
        return { 
          activeExpedition: { ...s.activeExpedition, status: 'ida', currentEvent: undefined },
          isPaused: false
        };
      }),

      removeNotification: (id) => set(s => ({
        notifications: s.notifications.filter(n => n.id !== id)
      })),

      resetGame: () => set({
        inventory: { regolith: 0, ice: 0, parts: 0 },
        indicators: { o2: 100, water: 100, food: 100, energy: 100, shield: 100 },
        laserLevel: 1, radarLevel: 1, droneLevel: 0, cargoLevel: 1, shieldLevel: 0, engineLevel: 1, armorLevel: 0, coreLevel: 1, scoopLevel: 0, turretLevel: 0,
        clock: { h: 6, m: 0, day: 1 },
        isPaused: true,
        crew: [
          { id: '1', name: 'Cmd. Hayes', role: 'Comandante', health: 100, energy: 100, status: 'ativo', assignment: null },
          { id: '2', name: 'Eng. Torres', role: 'Engenheiro', health: 100, energy: 100, status: 'ativo', assignment: null },
          { id: '3', name: 'Dr. Vance', role: 'Médico', health: 100, energy: 100, status: 'ativo', assignment: null },
          { id: '4', name: 'Bio. Sato', role: 'Astrobiólogo', health: 100, energy: 100, status: 'ativo', assignment: null }
        ],
        moduleLevels: {},
        builtModules: [],
        buildingModules: [],
        upgradingModules: [],
        research: [],
        activeResearch: null,
        activeExpedition: null,
        notifications: [],
        missionStatus: 'jogando',
        pendingTask: null,
        tutorialStep: 'SUPPLIES_ARRIVAL',
        isTrainingMode: false,
        preTutorialInventory: null
      }),

      tickSimulation: () => set(s => {
        if (s.isPaused) return s;

        const nextState = { ...s };
        const speedMultiplier = s.simSpeed * 2;
        const isEn = s.language === 'en';
        
        // 1. RELÓGIO
        let newM = s.clock.m + speedMultiplier;
        let newH = s.clock.h;
        let newDay = s.clock.day;
        if (newM >= 60) {
          newH += Math.floor(newM / 60);
          newM = newM % 60;
        }
        if (newH >= 24) {
          newDay += Math.floor(newH / 24);
          newH = newH % 24;
        }
        nextState.clock = { h: newH, m: newM, day: newDay };

        // 2. CONSTRUÇÕES
        if (s.buildingModules.length > 0) {
          nextState.buildingModules = s.buildingModules.map(mod => {
            const hasEngineer = nextState.crew.some(c => c.assignment?.targetId === mod.id && c.role === 'Engenheiro');
            let buildSpeed = hasEngineer ? speedMultiplier * 1.5 : speedMultiplier;
            if (s.isTrainingMode) buildSpeed *= 15; 
            return { ...mod, progress: Math.min(100, mod.progress + buildSpeed) };
          });

          const finished = nextState.buildingModules.filter(m => m.progress >= 100);
          if (finished.length > 0) {
            nextState.builtModules = [...s.builtModules, ...finished.map(m => m.id)];
            finished.forEach(m => {
              nextState.moduleLevels = { ...nextState.moduleLevels, [m.id]: 1 };
              nextState.crew = nextState.crew.map(c => c.assignment?.targetId === m.id ? { ...c, assignment: null } : c);
              nextState.notifications = [...nextState.notifications, {
                id: Date.now().toString() + Math.random(),
                type: 'success',
                title: isEn ? 'CONSTRUCTION FINISHED' : 'CONSTRUÇÃO FINALIZADA',
                message: isEn ? 'New module successfully built!' : 'Novo módulo construído com sucesso!'
              }];
            });
            nextState.buildingModules = nextState.buildingModules.filter(m => m.progress < 100);
          }
        }

        // 3. UPGRADES
        if (s.upgradingModules.length > 0) {
          nextState.upgradingModules = s.upgradingModules.map(mod => {
            const hasEngineer = nextState.crew.some(c => c.assignment?.targetId === mod.id && c.role === 'Engenheiro');
            let buildSpeed = hasEngineer ? speedMultiplier * 1.5 : speedMultiplier;
            if (s.isTrainingMode) buildSpeed *= 15;
            return { ...mod, progress: Math.min(100, mod.progress + buildSpeed) };
          });

          const finishedUpgrades = nextState.upgradingModules.filter(m => m.progress >= 100);
          if (finishedUpgrades.length > 0) {
            finishedUpgrades.forEach(m => {
              nextState.moduleLevels = { ...nextState.moduleLevels, [m.id]: (nextState.moduleLevels[m.id] || 1) + 1 };
              nextState.crew = nextState.crew.map(c => c.assignment?.targetId === m.id ? { ...c, assignment: null } : c);
              nextState.notifications = [...nextState.notifications, {
                id: Date.now().toString() + Math.random(),
                type: 'success',
                title: isEn ? 'UPGRADE FINISHED' : 'MELHORIA FINALIZADA',
                message: isEn ? 'Module successfully upgraded!' : 'O módulo foi aprimorado com sucesso!'
              }];
            });
            nextState.upgradingModules = nextState.upgradingModules.filter(m => m.progress < 100);
          }
        }

        // 4. PESQUISAS
        if (s.activeResearch) {
          const res = s.activeResearch;
          const hasBio = nextState.crew.some(c => c.assignment?.targetId === res.id && c.role === 'Astrobiólogo');
          let resSpeed = hasBio ? speedMultiplier * 1.5 : speedMultiplier;
          if (s.isTrainingMode) resSpeed *= 15;
          
          const increment = resSpeed * (100 / (res.duration || 100));
          const newProg = res.progress + increment;
          
          if (newProg >= 100) {
            nextState.research = [...s.research, res.id];
            nextState.activeResearch = null;
            nextState.crew = nextState.crew.map(c => c.assignment?.targetId === res.id ? { ...c, assignment: null } : c);
            nextState.notifications = [...nextState.notifications, {
              id: Date.now().toString() + Math.random(),
              type: 'info',
              title: isEn ? 'RESEARCH COMPLETED' : 'PESQUISA CONCLUÍDA',
              message: isEn ? 'New technology unlocked!' : 'Nova tecnologia desbloqueada!'
            }];
          } else {
            nextState.activeResearch = { ...res, progress: newProg };
          }
        }

        // 5. EXPEDIÇÕES (ROVER)
        if (s.activeExpedition && s.activeExpedition.status !== 'evento') {
          const exp = s.activeExpedition;
          const hasCmd = nextState.crew.some(c => c.assignment?.targetId === exp.id && (c.role === 'Comandante' || c.role === 'Astrobiólogo'));
          let expSpeed = hasCmd ? speedMultiplier * 1.5 : speedMultiplier;
          if (s.isTrainingMode) expSpeed *= 15; 
          
          const increment = expSpeed * (100 / (exp.duration || 100));
          const newProg = exp.progress + increment;
          
          if (newProg >= 100) {
             const rew = exp.expData?.reward || {};
             const expName = typeof exp.expData?.name === 'object' 
               ? exp.expData.name[isEn ? 'en' : 'pt'] 
               : (exp.expData?.name || (isEn ? 'its mission' : 'sua missão'));

             nextState.inventory = {
               regolith: nextState.inventory.regolith + (rew.regolith || 0),
               ice: nextState.inventory.ice + (rew.ice || 0),
               parts: nextState.inventory.parts + (rew.parts || 0)
             };
             nextState.notifications = [...nextState.notifications, {
               id: Date.now().toString() + Math.random(),
               type: 'success',
               title: isEn ? 'MISSION COMPLETED' : 'MISSÃO CONCLUÍDA',
               message: isEn ? `The rover returned from ${expName}!` : `O rover regressou de ${expName}!`,
               rewards: rew
             }];
             nextState.activeExpedition = null;
             nextState.crew = nextState.crew.map(c => c.assignment?.targetId === exp.id ? { ...c, assignment: null } : c);
          } else {
             const newStatus = newProg < 50 ? 'ida' : 'retorno';
             nextState.activeExpedition = { ...exp, progress: newProg, status: newStatus };
          }
        }

        // ===============================================================
        // 5.5 LIMPEZA AUTOMÁTICA DE MISSÕES FANTASMAS (GARBAGE COLLECTOR)
        // ===============================================================
        nextState.crew = nextState.crew.map(c => {
          if (!c.assignment) return c;
          const { type, targetId } = c.assignment;
          const isStillActive =
            (type === 'building' && nextState.buildingModules.some(m => m.id === targetId)) ||
            (type === 'upgrade' && nextState.upgradingModules.some(m => m.id === targetId)) ||
            (type === 'research' && nextState.activeResearch?.id === targetId) ||
            (type === 'expedition' && nextState.activeExpedition?.id === targetId);

          return isStillActive ? c : { ...c, assignment: null };
        });

        // 6. MOTOR DE SOBREVIVÊNCIA E FADIGA (Lê nextState.crew em vez de s.crew!)
        if (!s.isTrainingMode) {
          const baseConsumption = (speedMultiplier * 0.1);
          const o2Regen = (nextState.moduleLevels['habitat'] || 0) * 0.15;
          const waterRegen = (nextState.moduleLevels['purifier'] || 0) * 0.15;
          const foodRegen = (nextState.moduleLevels['greenhouse'] || 0) * 0.15;
          const energyRegen = (nextState.moduleLevels['solar'] || 0) * 0.15;

          nextState.indicators = {
            o2: Math.max(0, Math.min(100, s.indicators.o2 - baseConsumption + o2Regen)),
            water: Math.max(0, Math.min(100, s.indicators.water - baseConsumption + waterRegen)),
            food: Math.max(0, Math.min(100, s.indicators.food - baseConsumption + foodRegen)),
            energy: Math.max(0, Math.min(100, s.indicators.energy - baseConsumption + energyRegen)),
            shield: s.indicators.shield
          };

          const isSuffocatingOrStarving = nextState.indicators.o2 <= 0 || nextState.indicators.water <= 0 || nextState.indicators.food <= 0;

          nextState.crew = nextState.crew.map(c => {
            let newEnergy = c.energy;
            let newHealth = c.health;
            let newStatus = c.status;
            let newAssignment = c.assignment;

            if (c.status === 'incapacitado') {
              newEnergy = Math.min(100, c.energy + (speedMultiplier * 0.05));
              if (newEnergy > 20) newStatus = 'descansando';
            } 
            else if (c.status === 'descansando') {
              const dormLevel = nextState.moduleLevels['dormitory'] || 0;
              const medLevel = nextState.moduleLevels['medical'] || 0;
              
              const energyRecovery = 0.1 + (dormLevel * 0.15); 
              newEnergy = Math.min(100, c.energy + (speedMultiplier * energyRecovery));
              
              if (medLevel > 0) {
                newHealth = Math.min(100, c.health + (speedMultiplier * (medLevel * 0.1)));
              }
            } 
            else { 
              const isWorking = !!c.assignment;
              const energyDrop = isWorking ? 0.15 : 0.05;
              newEnergy -= (speedMultiplier * energyDrop);
            }

            if (isSuffocatingOrStarving) {
              newHealth -= (speedMultiplier * 0.3);
            }

            if (newEnergy <= 0) {
              newEnergy = 0;
              newStatus = 'incapacitado';
              newAssignment = null;
            }

            if (newHealth <= 0) {
              newHealth = 0;
              newStatus = 'incapacitado';
              newAssignment = null; 
            }

            return { ...c, energy: newEnergy, health: newHealth, status: newStatus, assignment: newAssignment };
          });
          
          // CONDIÇÃO DE DERROTA: Se toda a tripulação desmaiar
          if (nextState.crew.every(c => c.status === 'incapacitado' || c.health <= 0)) {
            nextState.missionStatus = 'derrota';
            nextState.isPaused = true;
          }

          // ===============================================================
          // 7. CONDIÇÃO DE VITÓRIA (COLÔNIA AUTOSSUSTENTÁVEL)
          // ===============================================================
          const isHabitatMax = (nextState.moduleLevels['habitat'] || 0) >= 3;
          const isPurifierMax = (nextState.moduleLevels['purifier'] || 0) >= 3;
          const isGreenhouseMax = (nextState.moduleLevels['greenhouse'] || 0) >= 3;
          const allResearched = nextState.research.length >= 4;

          if (isHabitatMax && isPurifierMax && isGreenhouseMax && allResearched) {
            nextState.missionStatus = 'vitoria';
            nextState.isPaused = true;
          }
        }

        return nextState;
      })
    }),
    {
      name: 'cuscuz-galactico-save',
    }
  )
);