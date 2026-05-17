import { useState } from 'react';
import { fetchTransactionFromSnowtrace, type SnowtraceTransaction } from '../api';
import { Loader2, Search, ExternalLink, CheckCircle, XCircle, Clock, Hash, Calendar, DollarSign, Gauge, ArrowRight } from 'lucide-react';

export function TransactionExplorer() {
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<SnowtraceTransaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!txHash.trim()) return;
    
    setLoading(true);
    setError(null);
    setTransaction(null);
    
    try {
      const result = await fetchTransactionFromSnowtrace(txHash);
      if (result) {
        setTransaction(result);
      } else {
        setError('Transacción no encontrada. Verifica el hash e intenta nuevamente.');
      }
    } catch (err) {
      setError('Error al conectar con Snowtrace. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tighter">Transaction Explorer</h2>
        <p className="text-white/50 text-sm mt-1">Buscar transacciones en Avalanche C-Chain (Snowtrace)</p>
      </div>

      {/* Buscador */}
      <div className="flex gap-3">
        <input
          type="text"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="0x... (Transaction Hash)"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-sm placeholder:text-white/20 focus:outline-none focus:border-[var(--secondary)]/50"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/80 transition-all flex items-center gap-2 font-mono text-sm"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          Buscar
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Resultados */}
      {transaction && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {transaction.status === 'Success' ? (
                  <CheckCircle size={20} className="text-[var(--tertiary)]" />
                ) : (
                  <XCircle size={20} className="text-red-400" />
                )}
                <span className={`text-sm font-mono font-bold ${transaction.status === 'Success' ? 'text-[var(--tertiary)]' : 'text-red-400'}`}>
                  {transaction.status}
                </span>
              </div>
              <a
                href={`https://testnet.snowtrace.io/tx/${transaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-white/40 hover:text-[var(--secondary)] transition-colors flex items-center gap-1"
              >
                Ver en Snowtrace <ExternalLink size={10} />
              </a>
            </div>

            {/* Hash */}
            <div className="mb-3 p-2 rounded-lg bg-white/5">
              <p className="text-[9px] font-mono text-white/40">TRANSACTION HASH</p>
              <p className="text-xs font-mono text-white/70 break-all">{transaction.hash}</p>
            </div>

            {/* Grid de detalles */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-1 mb-1">
                  <Hash size={10} className="text-white/40" />
                  <p className="text-[8px] font-mono text-white/40">BLOCK</p>
                </div>
                <p className="text-sm font-mono text-white">{transaction.block.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar size={10} className="text-white/40" />
                  <p className="text-[8px] font-mono text-white/40">TIMESTAMP</p>
                </div>
                <p className="text-xs font-mono text-white">{new Date(transaction.timestamp).toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign size={10} className="text-white/40" />
                  <p className="text-[8px] font-mono text-white/40">VALUE</p>
                </div>
                <p className="text-sm font-mono text-[var(--tertiary)]">{transaction.value.toFixed(6)} AVAX</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-1 mb-1">
                  <Gauge size={10} className="text-white/40" />
                  <p className="text-[8px] font-mono text-white/40">GAS PRICE</p>
                </div>
                <p className="text-sm font-mono text-[var(--secondary)]">{transaction.gasPrice.toFixed(2)} nAVAX</p>
              </div>
            </div>

            {/* From / To */}
            <div className="mt-3 p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1">
                  <p className="text-[8px] font-mono text-white/40">FROM</p>
                  <p className="text-[9px] font-mono text-white/50 break-all">{transaction.from}</p>
                </div>
                <ArrowRight size={12} className="text-white/30" />
                <div className="flex-1">
                  <p className="text-[8px] font-mono text-white/40">TO</p>
                  <p className="text-[9px] font-mono text-white/50 break-all">{transaction.to}</p>
                </div>
              </div>
            </div>

            {/* Fee */}
            <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-[9px] font-mono text-yellow-400">TRANSACTION FEE</p>
              <p className="text-sm font-mono text-yellow-400">{transaction.fee.toFixed(8)} AVAX</p>
            </div>
          </div>

          {/* Acciones adicionales */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (transaction.from) {
                  setTxHash('');
                  // Aquí podrías buscar transacciones por dirección
                }
              }}
              className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs font-mono"
            >
              Ver más transacciones de esta dirección
            </button>
          </div>
        </div>
      )}

      {/* Ejemplo de transacción precargada */}
      {!transaction && !loading && !error && (
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-white/50 mb-2">🔍 Busca cualquier transacción de Avalanche</p>
          <p className="text-[10px] font-mono text-white/30">
            Ejemplo: <span className="text-[var(--secondary)]">0xaabfd94b3b0fcdd13cd62bec44ac006e71d8b27183c960d8a36a04eee0a75919</span>
          </p>
        </div>
      )}
    </div>
  );
}