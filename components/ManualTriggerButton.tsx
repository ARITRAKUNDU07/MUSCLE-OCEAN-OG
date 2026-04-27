"use client";

import { useState } from 'react';

interface ManualTriggerButtonProps {
  onResult: (message: string) => void;
  onLogRefresh: () => void;
}

export default function ManualTriggerButton({ onResult, onLogRefresh }: ManualTriggerButtonProps) {
  const [running, setRunning] = useState(false);

  const handleTrigger = async () => {
    setRunning(true);
    try {
      const res = await fetch('/api/cron/expiry-reminder', {
        headers: { 'x-manual-trigger': 'true' }
      });
      const data = await res.json();

      if (data.remindersProcessed === 0) {
        onResult('No members expiring in 3 or 7 days found.');
      } else {
        const sentCount = data.results.filter((r: any) => r.status === 'Sent').length;
        onResult(`${sentCount} expiry reminder email${sentCount !== 1 ? 's' : ''} sent out of ${data.remindersProcessed} found.`);
      }
      onLogRefresh();
    } catch {
      onResult('Failed to trigger expiry check. Try again.');
    } finally {
      setRunning(false);
    }
  };

  return (
    <button
      onClick={handleTrigger}
      disabled={running}
      style={{
        background: running ? '#333' : 'transparent',
        color: running ? '#888' : '#CCFF00',
        border: '1px solid rgba(204,255,0,0.3)',
        padding: '8px 18px',
        borderRadius: '8px',
        cursor: running ? 'not-allowed' : 'pointer',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s ease',
      }}
    >
      {running ? (
        <>
          <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
          Running...
        </>
      ) : (
        <>🔄 Run Expiry Check Now</>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
