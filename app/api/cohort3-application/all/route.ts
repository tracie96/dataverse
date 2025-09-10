import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
    
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - please contact support' },
        { status: 500 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const track = searchParams.get('track');
    const paymentStatus = searchParams.get('payment_status');
    const search = searchParams.get('search');

    // Build query
    let query = supabase
      .from('cohort3_applications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (track) {
      query = query.eq('track', track);
    }
    
    if (paymentStatus) {
      query = query.eq('payment_completed', paymentStatus === 'true');
    }
    
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applications: ' + error.message },
        { status: 500 }
      );
    }

    // Get total payment statistics
    const { count: paidCount, error: paidError } = await supabase
      .from('cohort3_applications')
      .select('*', { count: 'exact', head: true })
      .eq('payment_completed', true);

    const { count: pendingCount, error: pendingError } = await supabase
      .from('cohort3_applications')
      .select('*', { count: 'exact', head: true })
      .eq('payment_completed', false);

    if (paidError || pendingError) {
      console.error('Error fetching payment stats:', paidError || pendingError);
    }

    return NextResponse.json({ 
      data: data || [], 
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      paymentStats: {
        paid: paidCount || 0,
        pending: pendingCount || 0
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
