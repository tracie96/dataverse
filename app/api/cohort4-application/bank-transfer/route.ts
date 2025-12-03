import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      transferName, 
      bankName, 
      accountNumber, 
      reference,
      receiptUrl,
      applicationData // Full application data to save
    } = await request.json();

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

    const transferId = `NGN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Get application ID from applicationData (application should be saved already)
    const applicationId = applicationData?.applicationId;
    
    if (!applicationId) {
      console.error('Missing applicationId in applicationData:', applicationData);
      return NextResponse.json(
        { error: 'Missing applicationId. Please ensure your application was registered first.' },
        { status: 400 }
      );
    }

    // Update the specific application with bank transfer info using application ID
    const { data, error } = await supabase
      .from('cohort4_applications')
      .update({
        payment_completed: false, // Pending manual verification
        payment_id: transferId,
        payment_method: 'bank-transfer',
        payment_date: new Date().toISOString(),
        transfer_name: transferName,
        receipt_url: receiptUrl,
      })
      .eq('id', applicationId)
      .select();

    if (error) {
      console.error('Supabase error saving bank transfer:', error);
      return NextResponse.json(
        { error: 'Failed to save application: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Bank transfer details saved:', { 
      transferId, 
      email, 
      transferName,
      applicationId: data[0]?.id
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Bank transfer details saved successfully. Payment will be verified within 24-48 hours.',
      transferId: transferId,
      applicationId: data[0]?.id
    });

  } catch (error) {
    console.error('Error processing bank transfer:', error);
    return NextResponse.json(
      { error: 'Error processing bank transfer: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

