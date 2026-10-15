import { NextResponse } from 'next/server';
import { plannerSchema } from '@/lib/schemas';
import { likelyVisaPath } from '@/components/planner/visaPath';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = plannerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 422 });
  }
  const visa = likelyVisaPath(parsed.data);
  const payload = { ...parsed.data, visaGuidance: visa.path, receivedAt: new Date().toISOString() };

  console.log('[season-request] new planner submission', JSON.stringify(payload));
  // TODO: forward to email (specialist inbox) and CRM, create a deal, and send the guest a confirmation email.
  return NextResponse.json({ ok: true, visaPath: visa.path });
}
