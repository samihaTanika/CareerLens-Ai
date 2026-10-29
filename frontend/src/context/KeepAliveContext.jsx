import { createContext, useContext, useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://careerlens-backend-gy5k.onrender.com';

const KeepAliveContext = createContext({
  status: 'checking', // 'online' | 'waking' | 'checking'
  lastPing: null,
  latencyMs: null,
});

export function KeepAliveProvider({ children }) {
  const [status, setStatus] = useState('checking');
  const [lastPing, setLastPing] = useState(null);
  const [latencyMs, setLatencyMs] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const pingBackend = async () => {
      const startTime = performance.now();
      try {
        const response = await fetch(`${BACKEND_URL}/api/health`, {
          method: 'GET',
          cache: 'no-store',
          headers: { 'Accept': 'application/json' },
        });

        if (isMounted) {
          const latency = Math.round(performance.now() - startTime);
          if (response.ok) {
            setStatus('online');
            setLatencyMs(latency);
            setLastPing(new Date());
          } else {
            setStatus('waking');
          }
        }
      } catch {
        if (isMounted) {
          setStatus('waking');
        }
      }
    };

    // Ping immediately on application mount
    pingBackend();

    // Set interval to ping every 10 seconds (10,000ms) to prevent Render sleep
    const interval = setInterval(pingBackend, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <KeepAliveContext.Provider value={{ status, lastPing, latencyMs }}>
      {children}
    </KeepAliveContext.Provider>
  );
}

export function useKeepAlive() {
  return useContext(KeepAliveContext);
}
