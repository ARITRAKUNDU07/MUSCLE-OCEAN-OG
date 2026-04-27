import { NextResponse } from 'next/server';
import { mockMembers } from '@/data/members';
import { addCronLogEntry } from '@/data/cronLog';
import type { UrgencyLevel } from '@/lib/sendExpiryReminder';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Security: verify CRON_SECRET. Allow manual triggers from admin panel.
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isManual = request.headers.get('x-manual-trigger') === 'true';

  if (cronSecret && !isManual && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const results: { name: string; email: string; daysLeft: number; status: string }[] = [];

  for (const member of mockMembers) {
    const tillDate = new Date(member.validTill);
    tillDate.setHours(0, 0, 0, 0);
    const diffMs = tillDate.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    let urgency: UrgencyLevel | null = null;
    if (diffDays === 7) urgency = '7day';
    else if (diffDays === 3) urgency = '3day';

    if (!urgency) continue;

    // Simulate sending email (10% random failure for testing)
    const isSuccess = Math.random() > 0.1;

    addCronLogEntry({
      id: `cron-${member.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      memberName: member.name,
      email: member.email,
      plan: member.plan,
      expiresOn: member.validTill,
      daysLeft: diffDays,
      status: isSuccess ? 'Sent' : 'Failed',
      error: isSuccess ? undefined : 'Simulated failure',
    });

    results.push({
      name: member.name,
      email: member.email,
      daysLeft: diffDays,
      status: isSuccess ? 'Sent' : 'Failed',
    });
  }

  return NextResponse.json({
    success: true,
    checkedAt: new Date().toISOString(),
    totalMembers: mockMembers.length,
    remindersProcessed: results.length,
    results,
  });
}
