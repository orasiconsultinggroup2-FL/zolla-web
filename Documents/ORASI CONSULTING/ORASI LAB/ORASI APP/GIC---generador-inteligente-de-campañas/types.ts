
export enum PhaseType {
  CONCIENCIA = 'Conciencia',
  AUTORIDAD = 'Autoridad',
  CONVERSACION = 'Conversación',
  CIERRE = 'Cierre'
}

export enum TrafficLight {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN'
}

export interface HistoryEntry {
  timestamp: string;
  day: number;
  phase: PhaseType;
  theme: string;
  metric: string;
  target: number;
  actual: number;
  efficiency: number;
  status: TrafficLight;
  dms: number;
  sales: number;
  shares: number;
  linkClicks: number;
  authorityScore: number;
  strategicAlignment: number;
}

export interface CampaignDay {
  day: number;
  phase: PhaseType;
  theme: string;
  cta: string;
  metricLabel: string;
  channel: string;
  postType: string;
  copyApproved: string;
  targetValue: number;
  actualValue?: number;
  published?: boolean;
  publishedPlatforms?: string[]; // Nueva propiedad para seguimiento detallado
  generatedCopy?: string;
  imageUrl?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  totalDays: number;
  currentDay: number;
  realCurrentDay?: number; // Día real según calendario para bloqueo
  days: CampaignDay[];
  history?: HistoryEntry[];
  config?: {
    consultantName: string;
    targetMarket: string;
    globalGoal: string;
  };
}

export type ViewType = 'cover' | 'hub' | 'tasks' | 'creative' | 'analytics' | 'history' | 'manual' | 'settings';
