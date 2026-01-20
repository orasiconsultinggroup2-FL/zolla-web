
export enum RiskLevel {
  LOW = 'Bajo',
  MEDIUM = 'Medio',
  HIGH = 'Alto',
  CRITICAL = 'Crítico'
}

export enum CasePhase {
  PREVENTION = 'Prevención',
  TENSION = 'Tensión Latente',
  CRISIS = 'Crisis Abierta',
  NEGOTIATION = 'Mesa de Diálogo',
  POST_AGREEMENT = 'Seguimiento Acuerdos'
}

export enum ActorPosture {
  ALLY = 'Aliado',
  NEUTRAL = 'Neutro',
  CRITIC = 'Crítico',
  OPPONENT = 'Opositor',
  RADICAL = 'Radical'
}

export enum UserRole {
  MANAGER = 'Gerencia',
  SUPERVISOR = 'Supervisor',
  RELATIONIST = 'Relacionista',
  ADMIN = 'Admin'
}

export enum UserBelt {
  LEVEL_1 = 'Nivel 1 – Básico',
  LEVEL_2 = 'Nivel 2 – Intermedio',
  LEVEL_3 = 'Nivel 3 – Avanzado'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  belt: UserBelt;
  company?: string;
  avatarUrl?: string;
}

export interface Actor {
  id: string;
  name: string;
  role: string;
  organization: string;
  posture: ActorPosture;
  influence: number;
  interests: string[];
  caseId?: string;
}

export interface PNRData {
  id: string;
  caseId: string;
  parties: string[];
  // MAAN y Alternativas
  myAlternatives: string;
  myMaan: string;
  myReservationPoint: string; // Nuevo
  theirAlternatives: string;
  theirMaan: string;
  theirReservationPoint: string; // Nuevo
  // Intereses
  myInterests: string;
  theirInterests: string;
  // Opciones y Legitimidad
  options: string;
  legitimacyCriteria: string;
  legitimacyFairness: string;
  // Comunicación y Relación
  communicationQuestions: string;
  communicationMessage: string;
  relationshipCurrent: string;
  relationshipDesired: string;
  relationshipActions: string;
  // Compromiso
  agreementTopics: string;
  agreementCommitment: string;
  completed: boolean;
  updatedAt: string;
}

export enum AARType {
  NORMAL = 'Normal',
  CRITICAL = 'Crítico'
}

export interface AARData {
  id: string;
  caseId: string;
  date: string;
  authorId: string;
  type: AARType;
  intent: string;
  reality: string;
  why: string;
  nextTime: string;
  risks: string;
  correctiveActions: string;
  criticalContext?: string;
  criticalNotes?: string;
}

export interface Alert {
  id: string;
  caseId: string;
  date: string;
  type: string;
  risk: RiskLevel;
  comment: string;
}

export interface HistoryEvent {
  id: string;
  caseId: string;
  date: string;
  userId: string;
  type: string;
  detail: string;
}

// Added LibraryCase interface to fix import error in mockData.ts
export interface LibraryCase {
  id: string;
  title: string;
  countryRegion: string;
  conflictType: string;
  sector: string;
  risk: RiskLevel;
  difficulty: string;
  summary: string;
  lessons?: string;
}

export interface AIAnalysis {
    caseId: string;
    score: number;
    summary: string;
    expertInterests: string;
    expertOptions: string;
    expertLegitimacy: string;
    susskindCritique: string; // Crítica estilo Lawrence Susskind
    uryAdvice: string; // Consejo estilo William Ury
}

export interface Case {
  id: string;
  title: string;
  description: string;
  territory: string;
  countryRegion: string;
  phase: CasePhase;
  risk: RiskLevel;
  startDate: string;
  updatedAt: string;
  financialImpact: number;
  ownerId: string;
  sector: string;
  caseType: string;
  complexity: 'Baja' | 'Media' | 'Alta';
  objective: string;
  keyRisks: string[];
  scenarios: string;
  usage: string;
  nextSteps: string;
  improvementOpportunities: string;
  caseStatus: string;
  lastReviewDate: string;
  actors: Actor[];
  history?: Omit<HistoryEvent, 'caseId'>[];
  aiAnalysis?: AIAnalysis; // Link to the analysis
}
