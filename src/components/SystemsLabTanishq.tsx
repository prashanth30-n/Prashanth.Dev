import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, RotateCcw, Play, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface RequestLog {
  id: string;
  timestamp: string;
  status: 200 | 429;
  latencyNs: number;
  message: string;
}

export const SystemsLabTanishq: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ratelimiter' | 'pubo' | 'lore'>('ratelimiter');

  // Rate Limiter
  const [capacity, setCapacity] = useState(10);
  const [refillRate, setRefillRate] = useState(4);
  const [tokens, setTokens] = useState(10);
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const lastRefillTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSec = (now - lastRefillTimeRef.current) / 1000;
      lastRefillTimeRef.current = now;

      setTokens((prev) => {
        const added = elapsedSec * refillRate;
        return Math.min(capacity, Number((prev + added).toFixed(2)));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [capacity, refillRate]);

  const fireRequest = (count = 1) => {
    const newLogs: RequestLog[] = [];
    let currentTokens = tokens;

    for (let i = 0; i < count; i++) {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      const latencyNs = Math.floor(95 + Math.random() * 45);

      if (currentTokens >= 1) {
        currentTokens -= 1;
        newLogs.unshift({
          id: `${Date.now()}-${i}`,
          timestamp: timeStr,
          status: 200,
          latencyNs,
          message: `CAS decrement: Token consumed (Remaining: ${currentTokens.toFixed(1)})`
        });
      } else {
        newLogs.unshift({
          id: `${Date.now()}-${i}`,
          timestamp: timeStr,
          status: 429,
          latencyNs,
          message: `CAS check: Capacity exceeded. Rejected 429 Too Many Requests.`
        });
      }
    }

    setTokens(Math.max(0, currentTokens));
    setLogs((prev) => [...newLogs, ...prev].slice(0, 15));
  };

  return (
    <section className="space-y-4 pb-10 border-b border-zinc-200 dark:border-zinc-800/80">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-50/60 dark:bg-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              Systems Lab & Interactive Sandboxes
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Live non-blocking rate limiter, request trace lifecycle, and skill generation
            </p>
          </div>
        </div>

        <button className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121314] space-y-5 animate-in fade-in duration-150">
          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <button
              onClick={() => setActiveTab('ratelimiter')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                activeTab === 'ratelimiter'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Go Token Bucket
            </button>
            <button
              onClick={() => setActiveTab('pubo')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                activeTab === 'pubo'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Pubo Request Flow
            </button>
          </div>

          {activeTab === 'ratelimiter' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-500">Capacity:</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{capacity} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={capacity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCapacity(val);
                      setTokens((prev) => Math.min(prev, val));
                    }}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-500">Refill Rate:</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{refillRate} tokens/s</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={refillRate}
                    onChange={(e) => setRefillRate(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>

              {/* Progress gauge */}
              <div className="space-y-1.5 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Tokens in Bucket:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    {tokens.toFixed(1)} / {capacity}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-100 ${
                      tokens > 2 ? 'bg-emerald-500' : tokens > 0 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, (tokens / capacity) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Fire buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => fireRequest(1)}
                  className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:opacity-90 flex items-center gap-1.5"
                >
                  <Zap className="h-3 w-3" />
                  <span>Fire Request</span>
                </button>
                <button
                  onClick={() => fireRequest(5)}
                  className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  Burst (5x)
                </button>
                <button
                  onClick={() => {
                    setTokens(capacity);
                    setLogs([]);
                  }}
                  className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  title="Reset"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Logs */}
              <div className="max-h-40 overflow-y-auto space-y-1.5 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/70 font-mono text-[11px]">
                {logs.length === 0 ? (
                  <div className="text-zinc-400 py-2">Click "Fire Request" to trigger atomic token checks.</div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className={`flex items-center justify-between gap-2 p-1.5 rounded ${
                        log.status === 200
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                          : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30'
                      }`}
                    >
                      <span className="truncate">{log.message}</span>
                      <span className="tabular-nums shrink-0 text-zinc-500">{log.latencyNs}ns</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'pubo' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-zinc-950 text-cyan-400 border border-zinc-800 overflow-x-auto">
                <pre className="text-[11px] leading-relaxed">
{`// Pubo Layered Request Lifecycle (POST /api/v1/posts/publish)
1. Edge Echo Router       ──► Route matched & TLS validated (~0.21ms)
2. Echo Middleware Chain  ──► CORS, RateLimiter (100 req/m), UUID TraceID (~0.12ms)
3. Clerk JWT Auth         ──► Stateless middleware validation, 0 DB trips (~0.30ms)
4. Post Handler           ──► DTO unmarshal & validation (~0.15ms)
5. Post Service           ──► Concurrent dispatch to Bluesky & LinkedIn (~1.20ms)
6. Post Repository        ──► PostgreSQL ACID commit & Redis Asynq task (~2.10ms)
Result: 201 Created with JSON DTO in ~4.08ms total.`}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
