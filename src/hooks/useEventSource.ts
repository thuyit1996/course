import { useEffect, useRef, useState } from 'react';

export function useEventSourceWithAutoReconnect<T = any>(
  url?: string,
  retryDelay = 3000
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Event | null>(null);
  const sourceRef = useRef<EventSource | null>(null);
  const retryRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!url) return;

    let isUnmounted = false;

    const connect = () => {
      if (isUnmounted) return;

      const source = new EventSource(url);
      sourceRef.current = source;
      source.addEventListener('score', event => {
        try {
          const parsed = JSON.parse(event.data);
          setData(parsed);
        } catch (e) {
          console.error('❌ JSON parse error', e);
        }
      })

      source.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setData(parsed);
        } catch (e) {
          console.error('❌ JSON parse error', e);
        }
      };

      source.onerror = (event: any) => {
        console.warn('⚠️ SSE error:', event);
        try {
          const parsed = JSON.parse(event.data);
          setError(parsed);
        } catch (e) {
          console.error('❌ JSON parse error', e);
        }
        source.close();

        if (!isUnmounted) {
          retryRef.current = setTimeout(() => {
            if (source.readyState === EventSource.CLOSED) {
              connect(); // 🔁 reconnect nếu đã đóng
            }
          }, retryDelay);
        }
      };
    };

    connect();

    return () => {
      isUnmounted = true;
      sourceRef.current?.close();
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [url, retryDelay]);

  return { data, error };
}
