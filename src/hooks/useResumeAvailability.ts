import { useEffect, useState } from 'react';

export type ResumeStatus = 'checking' | 'available' | 'unavailable';

export function useResumeAvailability(path: string): ResumeStatus {
  const [status, setStatus] = useState<ResumeStatus>('checking');

  useEffect(() => {
    let cancelled = false;

    fetch(path, { method: 'HEAD' })
      .then((response) => {
        if (!cancelled) setStatus(response.ok ? 'available' : 'unavailable');
      })
      .catch(() => {
        if (!cancelled) setStatus('unavailable');
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return status;
}
