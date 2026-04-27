"use client";

import { useState, useEffect } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  memberName: string;
  email: string;
  plan: string;
  expiresOn: string;
  daysLeft: number;
  status: 'Sent' | 'Failed';
  error?: string;
}

export default function CronLogTable() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLog = async () => {
    try {
      const res = await fetch('/api/cron/log');
      const data = await res.json();
      setLog(data.log || []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLog(); }, []);

  if (loading) {
    return <p style={{ color: '#888', padding: '20px' }}>Loading log...</p>;
  }

  if (log.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p style={{ color: '#555', fontSize: '1rem' }}>No automated reminders sent yet.</p>
        <p style={{ color: '#444', fontSize: '0.85rem' }}>Use the manual trigger to test, or wait for the daily cron.</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Date & Time', 'Member', 'Email', 'Plan', 'Expires On', 'Days Left', 'Status'].map(h => (
              <th key={h} style={{
                padding: '12px 15px', textAlign: 'left',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                color: '#CCFF00', fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.1rem', whiteSpace: 'nowrap'
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {log.map(entry => (
            <tr key={entry.id} style={{ transition: 'background 0.2s' }}>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#aaa', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                {new Date(entry.timestamp).toLocaleString()}
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
                {entry.memberName}
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#aaa', fontSize: '0.9rem' }}>
                {entry.email}
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#ccc' }}>
                {entry.plan}
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#ccc', whiteSpace: 'nowrap' }}>
                {new Date(entry.expiresOn).toLocaleDateString()}
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                <span style={{
                  background: entry.daysLeft <= 3 ? 'rgba(255,68,68,0.15)' : 'rgba(255,193,7,0.15)',
                  color: entry.daysLeft <= 3 ? '#FF4444' : '#FFC107',
                  padding: '3px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>
                  {entry.daysLeft}d
                </span>
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{
                  background: entry.status === 'Sent' ? 'rgba(204,255,0,0.15)' : 'rgba(255,68,68,0.15)',
                  color: entry.status === 'Sent' ? '#CCFF00' : '#FF4444',
                  padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>
                  {entry.status === 'Sent' ? '✅' : '❌'} {entry.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Export the fetch function so parent can refresh
export { CronLogTable };
