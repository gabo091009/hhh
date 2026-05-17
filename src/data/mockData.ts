import type { CompanyData } from '../types';

export interface AMLAlert {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'DRIFT' | 'INFO';
  title: string;
  desc: string;
  time: string;
  color?: string;
  action?: boolean;
}

export interface TimelineEvent {
  id: string;
  type: string;
  amount: number;
  counterparty: string;
  date: string;
  txHash: string | null;
}

export interface AnchorRecord {
  id: string;
  title: string;
  hash: string;
  block: string;
  status: string;
  time: string;
  date: string;
  color: string;
  isUrgent?: boolean;
}

export interface Allocation {
  inventory: number;
  payroll: number;
  logistics: number;
  marketing: number;
  unknown?: number;
}

export interface CapitalScores {
  trust: number;
  compliance: number;
  alignment: number;
  repaymentProbability: number;
}

export interface RoadmapItem {
  phase: string;
  status: 'done' | 'in-progress' | 'pending';
}

export interface RecentUpload {
  file: string;
  status: string;
  meta: string;
}

export interface Entity {
  role: string;
  name: string;
  type: string;
  color: string;
}

export const mockCompany: CompanyData = {
  name: 'TechSupply LATAM',
  industry: 'Institutional Logistics',
  lei: '549300H8M7R1K9D2W345',
  alphaScore: 740,
  metrics: { liquidity: 82, compliance: 95, riskMitigation: 64 },
  scores: { credit: 780, liquidity: 82, compliance: 95, operationalStability: 88, financialReadiness: 74 },
  amlAlerts: [
    { id: '1', level: 'CRITICAL', title: 'High Velocity Drift', desc: 'Detected 2 matches on SDN profile.', time: '14:22:01', color: '#ef4444', action: true },
    { id: '2', level: 'WARNING', title: 'Smurfing Attempt', desc: 'Layering attempt flagged in block #12,894,031', time: '12:15:45', color: '#f59e0b' },
    { id: '3', level: 'DRIFT', title: 'Geo-Proxy Detected', desc: 'Origin switched from London to Cayman.', time: '09:45:12', color: '#0BF2FF' },
    { id: '4', level: 'CRITICAL', title: 'Capital Velocity Spike', desc: '$4.2M across 14 layers in 40s.', time: '11:08:33', color: '#ef4444', action: true },
  ],
  timelineEvents: [
    { id: 'ev1', type: 'invoice', amount: 5000, counterparty: 'Cliente Corp', date: '2026-05-10T14:00:00Z', txHash: '0xabc123...def456' },
    { id: 'ev2', type: 'payment', amount: 5000, counterparty: 'Cliente Corp', date: '2026-05-12T09:30:00Z', txHash: '0xdef789...ghi012' },
    { id: 'ev3', type: 'loan_disbursed', amount: 20000, counterparty: 'Banco Futuro', date: '2026-05-14T11:00:00Z', txHash: '0xghi345...jkl678' },
    { id: 'ev4', type: 'late_payment', amount: 1200, counterparty: 'Proveedor Y', date: '2026-05-15T08:00:00Z', txHash: null },
    { id: 'ev5', type: 'aml_flag', amount: 0, counterparty: 'Brokerage XYZ', date: '2026-05-12T07:00:00Z', txHash: '0xaml123...flag456' },
  ],
  anchorRecords: [
    { id: 'a1', title: 'Neural Invoice Sync', hash: '0x74a...829b', block: '#12,894,031', status: 'Anchored', time: '14:22:10 UTC', date: '24 Oct 2025', color: '#0DFF88' },
    { id: 'a2', title: 'Cross-Border Payment', hash: '0x12a...49ff', block: '#12,894,008', status: 'Verified', time: '12:05:44 UTC', date: '24 Oct 2025', color: '#0BF2FF' },
    { id: 'a3', title: 'AML Escalation Event', hash: '0x33e...f110', block: '#12,893,982', status: 'Critical', time: '09:12:01 UTC', date: '24 Oct 2025', color: '#ef4444', isUrgent: true },
    { id: 'a4', title: 'Capital Allocation Lock', hash: '0x55f...a23', block: '#12,894,050', status: 'Pending', time: '16:45:00 UTC', date: '24 Oct 2025', color: '#f59e0b' },
  ],
  declaredAllocation: { inventory: 40, payroll: 30, logistics: 20, marketing: 10 },
  actualAllocation: { inventory: 35, payroll: 28, logistics: 22, marketing: 8, unknown: 7 },
  capitalScores: { trust: 82, compliance: 88, alignment: 78, repaymentProbability: 91 },
  roadmap: [
    { phase: 'MVP Hackathon', status: 'done' },
    { phase: 'Open Finance APIs', status: 'in-progress' },
    { phase: 'Monitoreo AML Automatizado', status: 'in-progress' },
    { phase: 'Integracion Bancaria Institucional', status: 'pending' },
    { phase: 'Compliance y Reporting Regulatorio', status: 'pending' },
  ],
  recentUploads: [
    { file: 'Q3_Bank_Statements_Santander.pdf', status: 'processed', meta: '14.2 MB • Processed' },
    { file: 'ERP_Sync_TechSupply_LATAM.json', status: 'parsing', meta: '1.8 MB • Active Analysis...' },
    { file: 'R2M_Invoices_Agoraega_Oat.zip', status: 'processed', meta: '5.3 MB • Processed' },
  ],
  entities: [
    { role: 'PYME', name: 'TechSupply S.A.', type: 'ANCHOR', color: '#A855F7' },
    { role: 'SUPPLIER', name: 'FabriCorp Global', type: 'UPSTREAM', color: '#0BF2FF' },
    { role: 'BUYER', name: 'RetailHub Mx', type: 'DOWNSTREAM', color: '#0DFF88' },
    { role: 'BANK', name: 'Santander Int.', type: 'CUSTODIAN', color: '#A855F7' },
  ],
  aiRecommendations: [
    'Mejorar diversificación de clientes para subir Credit Score.',
    'Mantener índice de liquidez por encima de 80%.',
    'Revisar concentración de ingresos en Cliente Corp (60%).',
    'Implementar controles AML adicionales para reducir riesgo de smurfing.',
  ],
};

// Datos adicionales para el Flow Graph
export const flowGraphData = {
  nodes: [
    { id: 'Main Custodian', type: 'custodian', value: 100, color: '#A855F7' },
    { id: 'Logistics Co.', type: 'supplier', value: 60, color: '#0BF2FF' },
    { id: 'Brokerage XYZ', type: 'flagged', value: 40, color: '#ef4444' },
    { id: 'TechSupply S.A.', type: 'anchor', value: 80, color: '#0DFF88' },
  ],
  edges: [
    { from: 'Main Custodian', to: 'Logistics Co.', amount: 450000, status: 'validated' },
    { from: 'Main Custodian', to: 'Brokerage XYZ', amount: 120000, status: 'blocked' },
    { from: 'TechSupply S.A.', to: 'Main Custodian', amount: 750000, status: 'settled' },
  ]
};

// Datos para el Timeline (ingresos vs egresos últimos 6 meses)
export const timelineData = {
  months: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  income: [65000, 72000, 68000, 80000, 85000, 78000],
  expense: [45000, 50000, 48000, 56000, 60000, 55000]
};

// Alertas para Streaming Logic
export const streamingEvents = [
  { type: 'CRITICAL', time: '14:22:01', title: 'CAPITAL VELOCITY SPIKE', description: 'Wallet [0x71...ea2] disseminated $4.2M across 14 layers in 40s.', action: 'EXECUTE_LOCK' },
  { type: 'DRIFT', time: '12:15:45', title: 'GEO-PROXY DETECTED', description: 'Origin switched from London Institutional to Cayman Private Cloud.' },
  { type: 'INFO', time: '09:04:12', title: 'NEW COUNTERPARTY', description: 'Brokerage XYZ interacted with Primary Custodian for first time.' }
];