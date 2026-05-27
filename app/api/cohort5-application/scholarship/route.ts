import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { COHORT5_META } from '@/config/cohort5';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createClient(supabaseUrl, supabaseKey);
}

function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const authToken = authHeader?.replace('Bearer ', '');
  const expectedToken = process.env.ADMIN_AUTH_TOKEN;
  return !!expectedToken && authToken === expectedToken;
}

export async function GET() {
  try {
    const supabase = getSupabase();

    const { count: pendingCount } = await supabase
      .from('cohort5_applications')
      .select('*', { count: 'exact', head: true })
      .eq('application_type', 'scholarship')
      .eq('scholarship_status', 'pending');

    const { count: approvedCount } = await supabase
      .from('cohort5_applications')
      .select('*', { count: 'exact', head: true })
      .eq('application_type', 'scholarship')
      .eq('scholarship_status', 'approved');

    const used = (pendingCount ?? 0) + (approvedCount ?? 0);
    const remaining = Math.max(0, COHORT5_META.maxScholarships - used);

    return NextResponse.json({
      maxScholarships: COHORT5_META.maxScholarships,
      pending: pendingCount ?? 0,
      approved: approvedCount ?? 0,
      used,
      remaining,
      available: remaining > 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabase();
    const { applicationId, status } = await request.json();

    if (!applicationId || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'applicationId and valid status required' }, { status: 400 });
    }

    if (status === 'approved') {
      const { count } = await supabase
        .from('cohort5_applications')
        .select('*', { count: 'exact', head: true })
        .eq('application_type', 'scholarship')
        .eq('scholarship_status', 'approved');

      if ((count ?? 0) >= COHORT5_META.maxScholarships) {
        return NextResponse.json({ error: 'Scholarship quota is full' }, { status: 409 });
      }
    }

    const { data, error } = await supabase
      .from('cohort5_applications')
      .update({
        scholarship_status: status,
        payment_completed: status === 'approved',
        payment_method: 'scholarship',
        program_fee_usd: 0,
      })
      .eq('id', applicationId)
      .eq('application_type', 'scholarship')
      .select();

    if (error) {
      return NextResponse.json({ error: 'Failed to update scholarship: ' + error.message }, { status: 500 });
    }

    if (!data?.length) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
