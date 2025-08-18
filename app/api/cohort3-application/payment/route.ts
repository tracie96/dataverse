import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PUT(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - please contact support' },
        { status: 500 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await request.json();
    const { email, paymentId } = body;

    if (!email || !paymentId) {
      return NextResponse.json(
        { error: 'Email and payment ID are required' },
        { status: 400 }
      );
    }

    // Update payment status in Supabase
    const { data, error } = await supabase
      .from('cohort3_applications')
      .update({
        payment_completed: true,
        payment_id: paymentId
      })
      .eq('email', email.toLowerCase())
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update payment status: ' + error.message },
        { status: 500 }
      );
    }

    if (data.length === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
