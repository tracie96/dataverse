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

    // Get application ID from applicationData (application should be saved already)
    const applicationId = applicationData?.applicationId;
    
    if (!applicationId) {
      console.error('Missing applicationId in applicationData:', applicationData);
      return NextResponse.json(
        { error: 'Missing applicationId. Please ensure your application was registered first.' },
        { status: 400 }
      );
    }

    // Update the specific application with payment info using application ID
    const { data, error } = await supabase
      .from('cohort4_applications')
      .update({
        payment_completed: true,
        payment_id: paymentIntentId,
        payment_method: paymentMethod,
        payment_date: new Date().toISOString(),
      })
      .eq('id', applicationId)
      .select();

    if (error) {
      console.error('Supabase error saving/updating application:', error);
      return NextResponse.json(
        { error: 'Failed to save application: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application saved successfully with payment confirmation',
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

