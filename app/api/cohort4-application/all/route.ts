import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication token
    const authHeader = request.headers.get('authorization');
    const authToken = authHeader?.replace('Bearer ', '');
    
    // Verify admin token
    const expectedToken = process.env.ADMIN_AUTH_TOKEN;
    if (!expectedToken || authToken !== expectedToken) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid authentication token' },
        { status: 401 }
      );
    }

    // Check environment variables
    // Support both naming conventions for compatibility
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
      console.error('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing');
      console.error('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:', process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing');
      return NextResponse.json(
        { 
          error: 'Server configuration error - please contact support',
          details: 'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) in your .env.local file'
        },
        { status: 500 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const trackLevel = searchParams.get('track_level');
    const track = searchParams.get('track');
    const paymentStatus = searchParams.get('payment_status');
    const search = searchParams.get('search');
    const distinctEmails = searchParams.get('distinct_emails') === 'true';

    // Handle distinct emails request
    if (distinctEmails) {
      const { data, error } = await supabase
        .from('cohort4_applications')
        .select('email')
        .not('email', 'is', null);

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch distinct emails: ' + error.message },
          { status: 500 }
        );
      }

      // Get unique emails
      const uniqueEmails = Array.from(new Set(data?.map(item => item.email).filter(Boolean)));
      
      return NextResponse.json({ 
        emails: uniqueEmails,
        count: uniqueEmails.length
      });
    }

    // Build query for regular data
    let query = supabase
      .from('cohort4_applications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (trackLevel) {
      query = query.eq('track_level', trackLevel);
    }
    
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

    // Get distinct payment statistics
    const { data: paidData, error: paidError } = await supabase
      .from('cohort4_applications')
      .select('email')
      .eq('payment_completed', true)
      .not('email', 'is', null);

    const { data: pendingData, error: pendingError } = await supabase
      .from('cohort4_applications')
      .select('email')
      .eq('payment_completed', false)
      .not('email', 'is', null);

    if (paidError || pendingError) {
      console.error('Error fetching payment stats:', paidError || pendingError);
    }

    // Get unique counts for paid and pending
    const uniquePaidEmails = Array.from(new Set(paidData?.map(item => item.email).filter(Boolean)));
    const uniquePendingEmails = Array.from(new Set(pendingData?.map(item => item.email).filter(Boolean)));
    
    const paidCount = uniquePaidEmails.length;
    const pendingCount = uniquePendingEmails.length;

    // Get statistics by track level
    const { data: beginnersData } = await supabase
      .from('cohort4_applications')
      .select('email')
      .eq('track_level', 'beginners')
      .not('email', 'is', null);
    
    const { data: intermediateData } = await supabase
      .from('cohort4_applications')
      .select('email')
      .eq('track_level', 'intermediate')
      .not('email', 'is', null);

    const beginnersCount = Array.from(new Set(beginnersData?.map(item => item.email).filter(Boolean))).length;
    const intermediateCount = Array.from(new Set(intermediateData?.map(item => item.email).filter(Boolean))).length;

    return NextResponse.json({ 
      data: data || [], 
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      paymentStats: {
        paid: paidCount || 0,
        pending: pendingCount || 0
      },
      trackStats: {
        beginners: beginnersCount || 0,
        intermediate: intermediateCount || 0
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
