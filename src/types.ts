export type ViewType = 
  | 'ingesta' 
  | 'scores' 
  | 'aml' 
  | 'flow' 
  | 'timeline' 
  | 'avalanche' 
  | 'use-of-funds' 
  | 'roadmap' 
  | 'analytics'
  | 'tools';

export interface CompanyData {
  name: string;
  industry: string;
  lei: string;
  alphaScore: number;
  metrics: {
    liquidity: number;
    compliance: number;
    riskMitigation: number;
  };
  scores: {
    credit: number;
    liquidity: number;
    compliance: number;
    operationalStability: number;
    financialReadiness: number;
  };
  amlAlerts: Array<{
    id: string;
    level: string;
    title: string;
    desc: string;
    time: string;
    color: string;
    action?: boolean;
  }>;
  timelineEvents: Array<{
    id: string;
    type: string;
    amount: number;
    counterparty: string;
    date: string;
    txHash: string | null;
  }>;
  anchorRecords: Array<{
    id: string;
    title: string;
    hash: string;
    block: string;
    status: string;
    time: string;
    date: string;
    color: string;
    isUrgent?: boolean;
  }>;
  declaredAllocation: {
    inventory: number;
    payroll: number;
    logistics: number;
    marketing: number;
  };
  actualAllocation: {
    inventory: number;
    payroll: number;
    logistics: number;
    marketing: number;
    unknown?: number;
  };
  capitalScores: {
    trust: number;
    compliance: number;
    alignment: number;
    repaymentProbability: number;
  };
  roadmap: Array<{
    phase: string;
    status: 'done' | 'in-progress' | 'pending';
  }>;
  recentUploads: Array<{
    file: string;
    status: string;
    meta: string;
  }>;
  entities: Array<{
    role: string;
    name: string;
    type: string;
    color: string;
  }>;
  aiRecommendations: string[];
}