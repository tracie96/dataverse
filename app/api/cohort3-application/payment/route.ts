import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
    
    console.log({supabaseUrl, supabaseKey});
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - please contact support' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await request.json();
    console.log('Received request body:', body);
    
    const {
      paymentIntentId,
      applicationData,
      paymentMethod = 'stripe'
    } = body;

    if (!paymentIntentId || !applicationData) {
      console.error('Missing required fields:', { paymentIntentId: !!paymentIntentId, applicationData: !!applicationData });
      return NextResponse.json(
        { error: 'Missing required fields: paymentIntentId and applicationData' },
        { status: 400 }
      );
    }

    if (!applicationData.email) {
      console.error('Missing email in applicationData:', applicationData);
      return NextResponse.json(
        { error: 'Missing email in applicationData' },
        { status: 400 }
      );
    }


    const { data, error } = await supabase
      .from('cohort3_applications')
      .update({
        payment_completed: true,
        payment_id: paymentIntentId,
        payment_method: paymentMethod,
        payment_date: new Date().toISOString(),
      })
      .eq('email', applicationData.email)
      .select();

    if (error) {
      console.error('Supabase error updating payment:', error);
      return NextResponse.json(
        { error: 'Failed to update payment status: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error updating payment:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
