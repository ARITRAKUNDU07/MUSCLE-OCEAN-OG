/**
 * Generates an HTML email for membership expiry reminders.
 * Supports 7-day and 3-day urgency levels.
 */

export type UrgencyLevel = '7day' | '3day';

interface ReminderEmailOptions {
  memberName: string;
  plan: string;
  expiryDate: string;
  urgency: UrgencyLevel;
}

export function generateReminderEmailHTML({ memberName, plan, expiryDate, urgency }: ReminderEmailOptions): string {
  const isUrgent = urgency === '3day';
  const daysLeft = isUrgent ? 3 : 7;
  const accentColor = isUrgent ? '#FF4444' : '#CCFF00';
  const subjectEmoji = isUrgent ? '🚨' : '⚠️';
  const headerText = isUrgent
    ? `ONLY 3 DAYS LEFT — ACT NOW!`
    : `Your Membership Expires in 7 Days`;
  const urgencyBanner = isUrgent
    ? `<div style="background:#FF4444;color:#fff;text-align:center;padding:12px;font-weight:bold;font-size:16px;letter-spacing:1px;">⏰ URGENT — EXPIRING IN 3 DAYS</div>`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;">
    ${urgencyBanner}
    <!-- Header -->
    <div style="text-align:center;padding:30px 20px 10px;">
      <h1 style="color:${accentColor};font-size:28px;margin:0;letter-spacing:2px;">MUSCLE OCEAN</h1>
      <p style="color:#888;font-size:12px;margin:4px 0 0;">by Hunny Bhardwaj</p>
    </div>

    <!-- Icon -->
    <div style="text-align:center;padding:20px 0;">
      <div style="display:inline-block;width:60px;height:60px;border-radius:50%;background:${isUrgent ? 'rgba(255,68,68,0.15)' : 'rgba(204,255,0,0.1)'};line-height:60px;font-size:28px;">${subjectEmoji}</div>
    </div>

    <!-- Main -->
    <div style="padding:0 30px;">
      <h2 style="color:#fff;text-align:center;font-size:22px;margin:0 0 20px;">${headerText}</h2>
      <p style="color:#ccc;font-size:15px;line-height:1.6;text-align:center;">
        Hey <strong style="color:#fff">${memberName}</strong>, your <strong style="color:${accentColor}">${plan}</strong> membership expires on <strong style="color:#fff">${expiryDate}</strong>.
      </p>
      <p style="color:#999;font-size:14px;line-height:1.6;text-align:center;">
        ${isUrgent
          ? 'This is your final reminder. Renew immediately to avoid losing gym access!'
          : 'Renew now to keep your streak going and avoid losing access.'}
      </p>

      <!-- CTA Button -->
      <div style="text-align:center;margin:30px 0;">
        <a href="https://muscleocean.vercel.app/#pricing" style="display:inline-block;background:${accentColor};color:${isUrgent ? '#fff' : '#000'};text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:bold;font-size:16px;letter-spacing:1px;">
          ${isUrgent ? '🔥 RENEW IMMEDIATELY' : 'RENEW BEFORE IT EXPIRES'}
        </a>
      </div>

      <!-- Plans -->
      <div style="background:#2a2a2a;border-radius:10px;padding:20px;margin:20px 0;">
        <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 14px;text-align:center;">Our Plans</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 14px;color:#ccc;border-bottom:1px solid #333;">1 Month</td>
            <td style="padding:10px 14px;color:${accentColor};font-weight:bold;text-align:right;border-bottom:1px solid #333;">₹1,500</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;color:#ccc;border-bottom:1px solid #333;">3 Months</td>
            <td style="padding:10px 14px;color:${accentColor};font-weight:bold;text-align:right;border-bottom:1px solid #333;">₹3,600</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;color:#ccc;">6 Months</td>
            <td style="padding:10px 14px;color:${accentColor};font-weight:bold;text-align:right;">₹6,000</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:30px 20px;border-top:1px solid #333;">
      <p style="color:#555;font-size:12px;margin:0;">MUSCLE OCEAN — Najafgarh, New Delhi</p>
      <p style="color:#444;font-size:11px;margin:6px 0 0;">This is an automated reminder. Please do not reply.</p>
    </div>
  </div>
</body>
</html>`;
}

export function getReminderSubject(memberName: string, urgency: UrgencyLevel): string {
  return urgency === '3day'
    ? `🚨 URGENT: ${memberName}, Your Membership Expires in 3 Days!`
    : `⚠️ ${memberName}, Your MUSCLE OCEAN Membership Expires in 7 Days!`;
}
