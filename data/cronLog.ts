export interface CronLogEntry {
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

// In-memory log store (resets on server restart — replace with DB in production)
let cronLog: CronLogEntry[] = [];

export function addCronLogEntry(entry: CronLogEntry) {
  cronLog.unshift(entry); // newest first
  // Keep only last 200 entries
  if (cronLog.length > 200) {
    cronLog = cronLog.slice(0, 200);
  }
}

export function getCronLog(): CronLogEntry[] {
  return [...cronLog];
}

export function clearCronLog() {
  cronLog = [];
}
