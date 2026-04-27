import { NextResponse } from 'next/server';
import { getCronLog } from '@/data/cronLog';

export const dynamic = 'force-dynamic';

export async function GET() {
  const log = getCronLog();
  return NextResponse.json({ log });
}
