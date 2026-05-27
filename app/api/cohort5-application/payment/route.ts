import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { paymentIntentId, applicationData, paymentMethod = 'stripe' } = await request.json();

    if (!paymentIntentId || !applicationData?.applicationId) {
      return NextResponse.json(
        { error: 'Missing required fields: paymentIntentId and applicationId' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('cohort5_applications')
      .update({
        payment_completed: true,
        payment_id: paymentIntentId,
        payment_method: paymentMethod,
        payment_date: new Date().toISOString(),
      })
      .eq('id', applicationData.applicationId)
      .select();

    if (error) {
      return NextResponse.json({ error: 'Failed to update payment: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed successfully',
      data: data[0],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
