import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, memberId } = await req.json();

    if (!email || !memberId) {
      return NextResponse.json({ error: 'Missing email or memberId' }, { status: 400 });
    }

    // Simulate sending an email (random failure 10% of the time to allow testing retry logic)
    const isSuccess = Math.random() > 0.1;

    if (!isSuccess) {
      return NextResponse.json({ error: 'Failed to send email (simulated failure)' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Renewal email sent to ${email}` });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
