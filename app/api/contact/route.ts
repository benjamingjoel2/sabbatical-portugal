import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 422 });
  }
  if (parsed.data.company) return NextResponse.json({ ok: true }); // honeypot: silently drop bots

  console.log('[contact] new enquiry', JSON.stringify({ ...parsed.data, receivedAt: new Date().toISOString() }));
  // TODO: send to email (e.g. Resend/Postmark) and CRM (e.g. HubSpot/Pipedrive) once accounts exist.
  return NextResponse.json({ ok: true });
}
