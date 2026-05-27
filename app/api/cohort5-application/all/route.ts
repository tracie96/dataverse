import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { COHORT5_TRACKS } from '@/config/cohort5';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const authToken = authHeader?.replace('Bearer ', '');
    const expectedToken = process.env.ADMIN_AUTH_TOKEN;

    if (!expectedToken || authToken !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const trackId = searchParams.get('track_id');
    const paymentStatus = searchParams.get('payment_status');
    const scholarshipStatus = searchParams.get('scholarship_status');
    const applicationType = searchParams.get('application_type');
    const search = searchParams.get('search');

    let query = supabase
      .from('cohort5_applications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (trackId) query = query.eq('track_id', trackId);
    if (paymentStatus) query = query.eq('payment_completed', paymentStatus === 'true');
    if (scholarshipStatus) query = query.eq('scholarship_status', scholarshipStatus);
    if (applicationType) query = query.eq('application_type', applicationType);
    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await query.range(from, to);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch applications: ' + error.message }, { status: 500 });
    }

    const { data: allApps } = await supabase.from('cohort5_applications').select('track_id, payment_completed, application_type, scholarship_status');

    const trackStats: Record<string, number> = {};
    Object.keys(COHORT5_TRACKS).forEach((id) => {
      trackStats[id] = allApps?.filter((a) => a.track_id === id).length ?? 0;
    });

    const paidCount = allApps?.filter((a) => a.payment_completed && a.application_type === 'paid').length ?? 0;
    const pendingCount = allApps?.filter((a) => !a.payment_completed && a.application_type === 'paid').length ?? 0;
    const scholarshipPending =
      allApps?.filter((a) => a.application_type === 'scholarship' && a.scholarship_status === 'pending').length ?? 0;
    const scholarshipApproved =
      allApps?.filter((a) => a.application_type === 'scholarship' && a.scholarship_status === 'approved').length ?? 0;

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      paymentStats: { paid: paidCount, pending: pendingCount },
      scholarshipStats: { pending: scholarshipPending, approved: scholarshipApproved },
      trackStats,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
