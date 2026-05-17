// API real para consumir datos de Avalanche
const API_BASE = 'https://hackathon-avalanche-latam.onrender.com';

// ============================================
// INTERFACES PARA CADA ENDPOINT
// ============================================

export interface TopEntity {
  entity: string;
  transactions: number;
}

export interface TopVolume {
  entity: string;
  volume: number;
}

export interface Hub {
  entity: string;
  connections: number;
}

export interface HighRiskTransfer {
  from: string;
  to: string;
  amount: number;
  timestamp: string;
}

export interface AMLScore {
  entity: string;
  txs: number;
  volume: number;
  max_tx: number;
  risk_score: number;
}

export interface LayeringPath {
  path: {
    start: any;
    end: any;
    segments: any[];
    length: number;
  };
}

export interface CircularPath {
  path: {
    start: any;
    end: any;
    segments: any[];
    length: number;
  };
}

// ============================================
// FUNCIONES DE FETCH CON CACHÉ
// ============================================

let cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 60000; // 60 segundos

async function fetchWithCache<T>(url: string): Promise<T> {
  const now = Date.now();
  if (cache[url] && (now - cache[url].timestamp) < CACHE_DURATION) {
    return cache[url].data as T;
  }
  
  try {
    const response = await fetch(`${API_BASE}${url}`);
    if (!response.ok) throw new Error(`Error fetching ${url}`);
    const data = await response.json();
    cache[url] = { data, timestamp: now };
    return data as T;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return [] as T;
  }
}

// 1. Top entidades por número de transacciones
export async function fetchTopEntities(): Promise<TopEntity[]> {
  return fetchWithCache<TopEntity[]>('/analytics/top-entities');
}

// 2. Top entidades por volumen
export async function fetchTopVolume(): Promise<TopVolume[]> {
  return fetchWithCache<TopVolume[]>('/analytics/top-volume');
}

// 3. Hubs (entidades con más conexiones)
export async function fetchHubs(): Promise<Hub[]> {
  return fetchWithCache<Hub[]>('/analytics/hubs');
}

// 4. Transferencias de alto riesgo
export async function fetchHighRiskTransfers(): Promise<HighRiskTransfer[]> {
  return fetchWithCache<HighRiskTransfer[]>('/analytics/high-risk');
}

// 5. AML Score por entidad
export async function fetchAMLScore(): Promise<AMLScore[]> {
  return fetchWithCache<AMLScore[]>('/analytics/aml-score');
}

// 6. Patrones de layering
export async function fetchLayeringPaths(): Promise<LayeringPath[]> {
  return fetchWithCache<LayeringPath[]>('/analytics/layering');
}

// 7. Patrones circulares
export async function fetchCircularPaths(): Promise<CircularPath[]> {
  return fetchWithCache<CircularPath[]>('/analytics/circular');
}

// 8. Obtener todos los datos de una vez
export async function fetchAllAnalytics() {
  const [topEntities, topVolume, hubs, highRisk, amlScore, layering, circular] = await Promise.all([
    fetchTopEntities(),
    fetchTopVolume(),
    fetchHubs(),
    fetchHighRiskTransfers(),
    fetchAMLScore(),
    fetchLayeringPaths(),
    fetchCircularPaths()
  ]);
  
  return { topEntities, topVolume, hubs, highRisk, amlScore, layering, circular };
}

// ============================================
// FUNCIONES AGREGADAS PARA COMPATIBILIDAD
// ============================================

// Obtener datos de la empresa (simulado desde whales/top entities)
export async function fetchCompanyData() {
  const [topVolume, topEntities, amlScore] = await Promise.all([
    fetchTopVolume(),
    fetchTopEntities(),
    fetchAMLScore()
  ]);
  
  const mainEntity = topVolume[0] || { entity: 'Unknown', volume: 0 };
  const mainEntityData = amlScore.find(a => a.entity === mainEntity.entity);
  
  return {
    name: 'FlowTrace Analytics',
    industry: 'Blockchain Intelligence',
    lei: mainEntity.entity,
    alphaScore: Math.floor(Math.random() * 300) + 600,
    metrics: {
      liquidity: Math.floor(Math.random() * 30) + 70,
      compliance: Math.floor(Math.random() * 20) + 75,
      riskMitigation: Math.floor(Math.random() * 40) + 50
    },
    scores: {
      credit: Math.floor(mainEntity.volume / 50000),
      liquidity: Math.floor(Math.random() * 30) + 70,
      compliance: mainEntityData ? Math.floor(100 - (mainEntityData.risk_score / 1000000)) : 85,
      operationalStability: Math.floor(Math.random() * 30) + 65,
      financialReadiness: Math.floor(Math.random() * 30) + 70
    },
    amlAlerts: [] as any[],
    timelineEvents: [] as any[],
    anchorRecords: [] as any[],
    declaredAllocation: { inventory: 40, payroll: 30, logistics: 20, marketing: 10 },
    actualAllocation: { inventory: 35, payroll: 28, logistics: 22, marketing: 8, unknown: 7 },
    capitalScores: { trust: 82, compliance: 88, alignment: 78, repaymentProbability: 91 },
    roadmap: [] as any[],
    recentUploads: [] as any[],
    entities: [] as any[],
    aiRecommendations: []
  };
}

// Obtener alertas AML (desde high-risk)
export async function fetchAMLAlerts() {
  const highRisk = await fetchHighRiskTransfers();
  return highRisk.slice(0, 10).map((tx, idx) => ({
    id: `alert-${idx}`,
    level: 'CRITICAL',
    title: 'Alto Riesgo Detectado',
    desc: `Transferencia de $${(tx.amount / 1e6).toFixed(2)}M de ${tx.from.slice(0, 8)} a ${tx.to.slice(0, 8)}`,
    time: new Date(tx.timestamp).toLocaleTimeString(),
    color: '#ef4444',
    action: true
  }));
}

// Obtener eventos de timeline (desde high-risk)
export async function fetchTimelineEvents() {
  const transfers = await fetchHighRiskTransfers();
  return transfers.slice(0, 15).map((tx, idx) => ({
    id: `event-${idx}`,
    type: tx.amount > 5000000 ? 'high_risk_transfer' : 'transfer',
    amount: tx.amount,
    counterparty: tx.to.slice(0, 12),
    date: tx.timestamp,
    txHash: `0x${Math.random().toString(36).substring(2, 10)}`
  }));
}

// Obtener registros de anclaje (simulado desde layering)
export async function fetchAnchorRecords() {
  const layering = await fetchLayeringPaths();
  return layering.slice(0, 5).map((item, idx) => ({
    id: `anchor-${idx}`,
    title: `Anclaje de Capa ${idx + 1}`,
    hash: item.path.start.identity.id?.slice(0, 12) || `0x${Math.random().toString(36).substring(2, 12)}`,
    block: `#${Math.floor(Math.random() * 10000000)}`,
    status: item.path.length > 2 ? 'Critical' : 'Anchored',
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    color: item.path.length > 2 ? '#ef4444' : '#0DFF88',
    isUrgent: item.path.length > 2
  }));
}

// Obtener scores (desde top entities y whales)
export async function fetchScores() {
  const [topEntities, topVolume] = await Promise.all([fetchTopEntities(), fetchTopVolume()]);
  const avgTx = topEntities.reduce((sum, e) => sum + e.transactions, 0) / (topEntities.length || 1);
  const avgVolume = topVolume.reduce((sum, e) => sum + e.volume, 0) / (topVolume.length || 1);
  
  return {
    credit: Math.floor(avgVolume / 50000),
    liquidity: Math.floor(Math.random() * 30) + 70,
    compliance: Math.floor(Math.random() * 20) + 75,
    operationalStability: Math.floor(Math.random() * 30) + 65,
    financialReadiness: Math.floor(avgTx) % 100
  };
}

// Obtener asignación de fondos (simulado)
export async function fetchFundAllocation() {
  return {
    declared: { inventory: 40, payroll: 30, logistics: 20, marketing: 10 },
    actual: { inventory: 35, payroll: 28, logistics: 22, marketing: 8, unknown: 7 }
  };
}

// Subir documento (mock)
export async function uploadDocument(file: File, onProgress?: (progress: number) => void) {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (onProgress) onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        resolve({ success: true, message: 'Document uploaded successfully' });
      }
    }, 200);
  });
}

// Screening AML (simulado desde aml-score)
export async function runAMLScreening(entity: string) {
  const amlScore = await fetchAMLScore();
  const found = amlScore.find(a => a.entity === entity);
  return {
    score: found ? (found.risk_score / 1e6) : Math.random() * 100,
    matches: found && found.risk_score > 10000000 ? ['OFAC SDN', 'UN Security Council'] : [],
    confidence: found ? Math.floor(100 - (found.risk_score / 1e8)) : 85
  };
}

// Anclar evento (mock)
export async function anchorEvent(hash: string) {
  return {
    success: true,
    block: `#${Math.floor(Math.random() * 10000000)}`,
    timestamp: new Date().toISOString()
  };
}
// ============================================
// NUEVA FUNCIÓN: Extraer datos de Snowtrace
// ============================================

export interface SnowtraceTransaction {
  hash: string;
  status: 'Success' | 'Failed' | 'Pending';
  block: number;
  timestamp: string;
  value: number;
  fee: number;
  gasPrice: number;
  from: string;
  to: string;
  network: string;
}

// Extraer información de una transacción usando Snowtrace
export async function fetchTransactionFromSnowtrace(txHash: string): Promise<SnowtraceTransaction | null> {
  try {
    // Usar Snowtrace API (ScamSniffer o similar)
    const response = await fetch(`https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan/api?module=transaction&action=gettxinfo&txhash=${txHash}`);
    
    if (!response.ok) {
      // Fallback: intentar con la API pública de Snowtrace
      const fallbackResponse = await fetch(`https://testnet.snowtrace.io/api?module=transaction&action=gettxinfo&txhash=${txHash}`);
      if (!fallbackResponse.ok) throw new Error('Transaction not found');
      const data = await fallbackResponse.json();
      return parseSnowtraceResponse(data);
    }
    
    const data = await response.json();
    return parseSnowtraceResponse(data);
  } catch (error) {
    console.error('Error fetching from Snowtrace:', error);
    return null;
  }
}

function parseSnowtraceResponse(data: any): SnowtraceTransaction | null {
  if (!data || data.status !== '1') return null;
  
  const result = data.result;
  return {
    hash: result.hash,
    status: result.isError === '0' ? 'Success' : 'Failed',
    block: parseInt(result.blockNumber),
    timestamp: new Date(parseInt(result.timeStamp) * 1000).toISOString(),
    value: parseFloat(result.value) / 1e18, // Convertir de Wei a AVAX
    fee: parseFloat(result.gasUsed) * parseFloat(result.gasPrice) / 1e18,
    gasPrice: parseFloat(result.gasPrice) / 1e9, // nAVAX
    from: result.from,
    to: result.to,
    network: result.chainId === '43113' ? 'Fuji Testnet' : 'Avalanche Mainnet'
  };
}

// Función para buscar transacciones por dirección
export async function fetchTransactionsByAddress(address: string, network: 'mainnet' | 'testnet' = 'testnet') {
  const baseUrl = network === 'mainnet' 
    ? 'https://api.snowtrace.io/api' 
    : 'https://testnet.snowtrace.io/api';
    
  try {
    const response = await fetch(`${baseUrl}?module=account&action=txlist&address=${address}&sort=desc`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching transactions by address:', error);
    return [];
  }
}

// Función para obtener el balance de una dirección
export async function fetchBalance(address: string, network: 'mainnet' | 'testnet' = 'testnet') {
  const baseUrl = network === 'mainnet' 
    ? 'https://api.snowtrace.io/api' 
    : 'https://testnet.snowtrace.io/api';
    
  try {
    const response = await fetch(`${baseUrl}?module=account&action=balance&address=${address}`);
    if (!response.ok) throw new Error('Failed to fetch balance');
    const data = await response.json();
    return parseFloat(data.result) / 1e18; // Convertir a AVAX
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
}