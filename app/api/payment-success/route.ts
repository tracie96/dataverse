import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, applicationData, paymentMethod } = await request.json();

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

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update the application with payment information
    const { data, error } = await supabase
      .from('cohort3_applications')
      .update({
        payment_completed: true,
        payment_id: paymentIntentId,
        payment_method: paymentMethod || 'stripe',
        payment_date: new Date().toISOString()
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

    console.log('Payment successful and updated:', { 
      paymentIntentId, 
      applicationData, 
      paymentMethod,
      updatedRecord: data 
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Payment processed successfully and application updated',
      applicationId: data[0]?.id,
      paymentId: paymentIntentId
    });

  } catch (error) {
    console.error('Error processing payment success:', error);
    return NextResponse.json(
      { error: 'Error processing payment success: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
