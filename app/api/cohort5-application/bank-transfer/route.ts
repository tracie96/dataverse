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
    const { transferName, receiptUrl, applicationData } = await request.json();

    if (!applicationData?.applicationId) {
      return NextResponse.json(
        { error: 'Missing applicationId. Please register your application first.' },
        { status: 400 }
      );
    }

    const transferId = `NGN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const { data, error } = await supabase
      .from('cohort5_applications')
      .update({
        payment_completed: false,
        payment_id: transferId,
        payment_method: 'bank-transfer',
        payment_date: new Date().toISOString(),
        transfer_name: transferName,
        receipt_url: receiptUrl,
      })
      .eq('id', applicationData.applicationId)
      .select();

    if (error) {
      return NextResponse.json({ error: 'Failed to save bank transfer: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Bank transfer details saved. Payment will be verified within 24–48 hours.',
      transferId,
      applicationId: data[0]?.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing bank transfer: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
