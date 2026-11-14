import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MissionStatus = 'jogando' | 'vitoria' | 'derrota';
export type SimSpeed = 1 | 2 | 4;
export type CrewStatus = 'ativo' | 'descansando' | 'incapacitado';

export interface Inventory {
  regolith: number;
  ice: number;
  parts: number;
  solarPower: number;
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
  status: CrewStatus;
}

export interface ExpeditionChoice {
  text: string;
  cost?: Partial<Inventory>;
  dmg?: { type: keyof BaseIndicators | 'rover'; amount: number };
  reward?: Partial<Inventory>;
}

export interface ExpeditionEvent {
  id: string;
  title: string;
  desc: string;
  options: ExpeditionChoice[];
}

export interface ActiveExpedition {
  id: string;
  name: string;
  progress: number; // 0 a 100
  duration: number;
  reward: Partial<Inventory>;
  status: 'ida' | 'evento' | 'retorno';
  currentEvent: ExpeditionEvent | null;
  roverHealth: number;
}

export interface GameState {
  missionStatus: MissionStatus;
  
  // Exploração Legada
  inventory: Inventory;
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
  
  collectResource: (resource: keyof Inventory, amount: number) => void;
  upgradeLaser: () => void;
  upgradeRadar: () => void;
  upgradeDrones: () => void;
  upgradeCargo: () => void;
  updateIndicator: (indicator: keyof BaseIndicators, amount: number) => void;
  upgradeEquipment: (equipment: keyof GameState, cost: Partial<Inventory>) => void;
  
  // Base Builder
  builtModules: string[];
  moduleLevels: Record<string, number>; 
  buildingModules: { id: string; progress: number }[];
  upgradingModules: { id: string; progress: number }[];
  
  clock: { day: number; h: number; m: number };
  indicators: BaseIndicators;
  simSpeed: SimSpeed;
  isPaused: boolean;
  crew: CrewMember[];
  research: string[];
  activeExpedition: ActiveExpedition | null;
  dayObjectives: number; 

  setSimSpeed: (speed: SimSpeed) => void;
  togglePause: (force?: boolean) => void;
  
  startBuilding: (moduleId: string, cost: Partial<Inventory>) => void;
  progressBuildings: (amount: number) => void;
  startUpgrade: (moduleId: string, cost: Partial<Inventory>) => void;
  progressUpgrades: (amount: number) => void;
  
  unlockResearch: (researchId: string, cost: number) => void;
  startExpedition: (exp: any) => void;
  progressExpedition: (amount: number) => void;
  resolveExpeditionEvent: (choice: ExpeditionChoice) => void;
  
  tickBase: () => void;
  applyEventDamage: (dmg: { type: keyof BaseIndicators; amount: number }) => void;
  setCrewStatus: (crewId: string, status: CrewStatus) => void;
  
  resetGame: () => void;
}

const INITIAL_INVENTORY: Inventory = { regolith: 0, ice: 0, parts: 0, solarPower: 0 };
const INITIAL_INDICATORS: BaseIndicators = { o2: 100, water: 100, food: 100, energy: 100, shield: 100 };
const INITIAL_CREW: CrewMember[] = [
  { id: 'c1', name: 'Cmd. Hayes', role: 'Comandante', health: 100, energy: 100, status: 'ativo' },
  { id: 'c2', name: 'Eng. Torres', role: 'Engenheiro', health: 100, energy: 100, status: 'ativo' },
  { id: 'c3', name: 'Dr. Vance', role: 'Médico', health: 100, energy: 100, status: 'ativo' },
  { id: 'c4', name: 'Bio. Sato', role: 'Astrobiólogo', health: 100, energy: 100, status: 'ativo' }
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      missionStatus: 'jogando',
      
      inventory: { ...INITIAL_INVENTORY },
      laserLevel: 1, radarLevel: 1, droneLevel: 0, cargoLevel: 1,
      shieldLevel: 0, engineLevel: 1, armorLevel: 0, coreLevel: 1, scoopLevel: 0, turretLevel: 0,

      builtModules: [],
      moduleLevels: {}, 
      buildingModules: [],
      upgradingModules: [],
      
      clock: { day: 1, h: 8, m: 0 },
      indicators: { ...INITIAL_INDICATORS },
      simSpeed: 1,
      isPaused: true,
      crew: INITIAL_CREW,
      research: [],
      activeExpedition: null,
      dayObjectives: 1,

      collectResource: (resource, amount) => set((state) => ({
        inventory: { ...state.inventory, [resource]: Math.max(0, state.inventory[resource] + amount) }
      })),

      upgradeLaser: () => set((state) => ({ laserLevel: state.laserLevel + 1 })),
      upgradeRadar: () => set((state) => ({ radarLevel: state.radarLevel + 1 })),
      upgradeDrones: () => set((state) => ({ droneLevel: state.droneLevel + 1 })),
      upgradeCargo: () => set((state) => ({ cargoLevel: state.cargoLevel + 1 })),

      upgradeEquipment: (equipment, cost) => set((state) => {
        const newInv = { ...state.inventory };
        if (cost.regolith) newInv.regolith -= cost.regolith;
        if (cost.ice) newInv.ice -= cost.ice;
        if (cost.parts) newInv.parts -= cost.parts;
        return { inventory: newInv, [equipment]: (state[equipment as keyof GameState] as number) + 1 };
      }),

      updateIndicator: (indicator, amount) => set((state) => ({
        indicators: { ...state.indicators, [indicator]: Math.max(0, Math.min(100, state.indicators[indicator] + amount)) }
      })),

      setSimSpeed: (speed) => set({ simSpeed: speed }),
      togglePause: (force) => set((state) => ({ isPaused: force !== undefined ? force : !state.isPaused })),

      startBuilding: (moduleId, cost) => set((state) => {
        const newInv = { ...state.inventory };
        if (cost.regolith) newInv.regolith -= cost.regolith;
        if (cost.ice) newInv.ice -= cost.ice;
        if (cost.parts) newInv.parts -= cost.parts;
        return { inventory: newInv, buildingModules: [...state.buildingModules, { id: moduleId, progress: 0 }] };
      }),

      progressBuildings: (amount) => set((state) => {
        const newBuiltModules = [...state.builtModules];
        const newModuleLevels = { ...state.moduleLevels };
        const engBonus = state.research.includes('r_bots') ? 1.5 : 1.0;
        
        const updated = state.buildingModules.map(b => {
          const next = b.progress + (amount * engBonus);
          if (next >= 100) {
            newBuiltModules.push(b.id);
            newModuleLevels[b.id] = 1; 
          }
          return { ...b, progress: next };
        }).filter(b => b.progress < 100);
        
        return { buildingModules: updated, builtModules: newBuiltModules, moduleLevels: newModuleLevels };
      }),

      startUpgrade: (moduleId, cost) => set((state) => {
        const newInv = { ...state.inventory };
        if (cost.regolith) newInv.regolith -= cost.regolith;
        if (cost.ice) newInv.ice -= cost.ice;
        if (cost.parts) newInv.parts -= cost.parts;
        return { inventory: newInv, upgradingModules: [...(state.upgradingModules || []), { id: moduleId, progress: 0 }] };
      }),

      progressUpgrades: (amount) => set((state) => {
        const newModuleLevels = { ...state.moduleLevels };
        const engBonus = state.research.includes('r_bots') ? 1.5 : 1.0;
        
        const updated = (state.upgradingModules || []).map(u => {
          const next = u.progress + (amount * engBonus);
          if (next >= 100) {
            newModuleLevels[u.id] = (newModuleLevels[u.id] || 1) + 1;
          }
          return { ...u, progress: next };
        }).filter(u => u.progress < 100);
        
        return { upgradingModules: updated, moduleLevels: newModuleLevels };
      }),

      unlockResearch: (researchId, costParts) => set((state) => ({
        inventory: { ...state.inventory, parts: state.inventory.parts - costParts },
        research: [...state.research, researchId]
      })),

      startExpedition: (exp) => set((state) => ({ 
        activeExpedition: { 
          ...exp, progress: 0, status: 'ida', currentEvent: null, roverHealth: 100 
        } 
      })),

      progressExpedition: (amount) => set((state) => {
        const exp = state.activeExpedition;
        if (!exp || exp.status === 'evento') return state;

        // Converte o "amount" (ticks) em progresso percentual (0-100)
        const progressIncrement = (amount / exp.duration) * 100;
        const nextProgress = exp.progress + progressIncrement;

        // Switch Ida / Retorno
        let nextStatus = exp.status;
        if (nextProgress >= 50 && exp.status === 'ida') {
           nextStatus = 'retorno';
        }

        // Sistema de Eventos Aleatórios durante a expedição
        let nextEvent = exp.currentEvent;
        if (Math.random() < 0.02 && nextProgress > 10 && nextProgress < 90) {
           // Sorteia evento se não houver um
           nextStatus = 'evento';
           nextEvent = {
             id: 'rand_ev',
             title: 'OBSTÁCULO DETECTADO!',
             desc: 'O rover encontrou terreno perigoso bloqueando a rota principal.',
             options: [
               { text: 'Desviar (Atrasa a missão)', cost: {}, dmg: { type: 'rover', amount: 0 } },
               { text: 'Forçar Passagem (Risco de Dano)', cost: {}, dmg: { type: 'rover', amount: 25 }, reward: { regolith: 15 } }
             ]
           };
        }

        // Fim da expedição
        if (nextProgress >= 100) {
          const rew = exp.reward;
          const newInv = { ...state.inventory };
          if (rew.regolith) newInv.regolith += rew.regolith;
          if (rew.ice) newInv.ice += rew.ice;
          if (rew.parts) newInv.parts += rew.parts;
          return { inventory: newInv, activeExpedition: null };
        }

        return { activeExpedition: { ...exp, progress: nextProgress, status: nextStatus, currentEvent: nextEvent } };
      }),

      resolveExpeditionEvent: (choice) => set((state) => {
        const exp = state.activeExpedition;
        if (!exp) return state;

        const newInv = { ...state.inventory };
        if (choice.cost?.regolith) newInv.regolith -= choice.cost.regolith;
        if (choice.cost?.ice) newInv.ice -= choice.cost.ice;
        if (choice.cost?.parts) newInv.parts -= choice.cost.parts;

        if (choice.reward?.regolith) newInv.regolith += choice.reward.regolith;
        if (choice.reward?.ice) newInv.ice += choice.reward.ice;
        if (choice.reward?.parts) newInv.parts += choice.reward.parts;

        let newRoverHealth = exp.roverHealth;
        if (choice.dmg && choice.dmg.type === 'rover') {
           newRoverHealth -= choice.dmg.amount;
        }

        // Se o rover quebrar, falha a expedição
        if (newRoverHealth <= 0) {
           return { inventory: newInv, activeExpedition: null };
        }

        return { 
          inventory: newInv, 
          activeExpedition: { 
            ...exp, 
            status: exp.progress >= 50 ? 'retorno' : 'ida', 
            currentEvent: null, 
            roverHealth: newRoverHealth 
          } 
        };
      }),

      applyEventDamage: (dmg) => set((state) => {
        const shieldLvl = state.moduleLevels['radiation'] || 0;
        const mitigation = shieldLvl === 2 ? 0.8 : shieldLvl === 3 ? 0.5 : 1; 
        const finalDmg = dmg.type === 'shield' ? dmg.amount : dmg.amount * mitigation;
        return {
          indicators: { ...state.indicators, [dmg.type]: Math.max(0, state.indicators[dmg.type as keyof BaseIndicators] - finalDmg) }
        };
      }),

      setCrewStatus: (crewId, status) => set((state) => ({
        crew: state.crew.map(c => {
          if (c.id !== crewId) return c;
          if (c.status === 'incapacitado' && status !== 'incapacitado') return c; // Somente cura tira do incapacitado
          return { ...c, status };
        })
      })),

      tickBase: () => set((state) => {
        if (state.missionStatus !== 'jogando') return state;

        let { day, h, m } = state.clock;
        m += 10; 
        if (m >= 60) { m = 0; h++; }
        if (h >= 24) { h = 0; day++; }

        let { o2, water, food, energy, shield } = state.indicators;
        const levels = state.moduleLevels || {};
        const baseDrain = 0.15; 
        
        const habLvl = levels['habitat'] || 0;
        const o2Drain = habLvl === 0 ? baseDrain : habLvl === 1 ? 0 : habLvl >= 2 ? -0.1 : 0;
        
        const purLvl = levels['purifier'] || 0;
        const waterDrain = purLvl === 0 ? baseDrain : purLvl === 1 ? 0.05 : purLvl >= 2 ? -0.05 : 0;
        
        const farmLvl = levels['greenhouse'] || 0;
        const foodDrain = farmLvl === 0 ? baseDrain : farmLvl === 1 ? 0.05 : farmLvl >= 2 ? -0.1 : 0;
        
        const solLvl = levels['solar'] || 0;
        const energyDrain = solLvl === 0 ? baseDrain : solLvl === 1 ? 0 : solLvl >= 2 ? -0.2 : 0;

        o2 = Math.min(100, Math.max(0, o2 - o2Drain));
        water = Math.min(100, Math.max(0, water - waterDrain));
        food = Math.min(100, Math.max(0, food - foodDrain));
        energy = Math.min(100, Math.max(0, energy - energyDrain));

        const medLvl = levels['medical'] || 0;
        const dormLvl = levels['dormitory'] || 0;

        let newCrew = state.crew.map(c => {
          let newHealth = c.health;
          let newEnergy = c.energy;

          if (o2 < 10 || food < 10 || water < 10) {
            newHealth = Math.max(0, newHealth - 0.2);
          }

          if (c.status === 'ativo') {
            newEnergy = Math.max(0, newEnergy - 0.1);
          } else if (c.status === 'descansando') {
            const energyRecovery = dormLvl === 3 ? 0.8 : dormLvl === 2 ? 0.5 : dormLvl === 1 ? 0.3 : 0.15;
            newEnergy = Math.min(100, newEnergy + energyRecovery);
            
            if (medLvl > 0 || habLvl === 3) {
              const healthRecovery = medLvl === 3 ? 0.5 : medLvl === 2 ? 0.3 : medLvl === 1 ? 0.15 : 0.05;
              newHealth = Math.min(100, newHealth + healthRecovery);
            }
          }

          const forcedStatus = newHealth <= 0 ? 'incapacitado' : newEnergy <= 0 ? 'descansando' : c.status;
          return { ...c, health: newHealth, energy: newEnergy, status: forcedStatus };
        });

        const isDead = newCrew.every(c => c.health === 0) || o2 === 0;
        let status = state.missionStatus;
        if (isDead) status = 'derrota';
        if (day > 7) status = 'vitoria';

        return {
          clock: { day, h, m },
          indicators: { o2, water, food, energy, shield },
          crew: newCrew,
          missionStatus: status,
          dayObjectives: Math.max(state.dayObjectives, day)
        };
      }),

      resetGame: () => set({
        inventory: { ...INITIAL_INVENTORY },
        laserLevel: 1, radarLevel: 1, droneLevel: 0, cargoLevel: 1,
        shieldLevel: 0, engineLevel: 1, armorLevel: 0, coreLevel: 1, scoopLevel: 0, turretLevel: 0,
        builtModules: [], moduleLevels: {}, buildingModules: [], upgradingModules: [], research: [], activeExpedition: null,
        indicators: { ...INITIAL_INDICATORS }, crew: INITIAL_CREW,
        clock: { day: 1, h: 8, m: 0 }, missionStatus: 'jogando', dayObjectives: 1, isPaused: true
      })
    }),
    { 
      name: 'astro-mission-colony-data',
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        crew: persistedState.crew?.map((c: any) => ({ ...c, status: c.status === 'active' ? 'ativo' : c.status === 'resting' ? 'descansando' : c.status || 'ativo' })) || currentState.crew,
        moduleLevels: persistedState.moduleLevels || {},
        upgradingModules: persistedState.upgradingModules || [],
        missionStatus: persistedState.missionStatus === 'playing' ? 'jogando' : (persistedState.missionStatus === 'defeat' ? 'derrota' : (persistedState.missionStatus === 'victory' ? 'vitoria' : 'jogando'))
      })
    }
  )
);