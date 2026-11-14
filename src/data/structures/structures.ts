import type { Inventory } from '../../store/gameStore';

export interface StructureData {
  id: string;
  name: string;
  description: string;
  cost: Partial<Inventory>;
  iconRef: string; // Referência visual para o seu amigo renderizar
}

export const STRUCTURES: StructureData[] = [
  {
    id: 'lunar-habitat',
    name: 'Lunar Habitat',
    description: 'Abriga a tripulação e serve como centro de comando vital.',
    cost: { regolith: 50, ice: 10 },
    iconRef: 'home'
  },
  {
    id: 'solar-panel',
    name: 'Solar Panels',
    description: 'Gera energia constante para manter os sistemas da base.',
    cost: { regolith: 30 },
    iconRef: 'sun'
  },
  {
    id: 'water-recycler',
    name: 'Water Recycler',
    description: 'Purifica e recupera parte da água consumida pela tripulação.',
    cost: { regolith: 40, solarPower: 20 },
    iconRef: 'droplet'
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    description: 'Produz alimentos para sustentar os astronautas.',
    cost: { regolith: 30, ice: 30 },
    iconRef: 'leaf'
  },
  {
    id: 'radiation-shelter',
    name: 'Radiation Shelter',
    description: 'Proteção pesada contra emissões letais de tempestades solares.',
    cost: { regolith: 100 },
    iconRef: 'shield'
  }
];