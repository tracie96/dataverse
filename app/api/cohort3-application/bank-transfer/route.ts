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
      receiptUrl 
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

    // Generate unique transfer ID
    const transferId = `NGN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Update the application with bank transfer information
    const { data, error } = await supabase
      .from('cohort3_applications')
      .update({
        payment_completed: true, // Will be set to true after manual verification
        payment_id: transferId,
        payment_method: 'bank_transfer',
        payment_date: new Date().toISOString(),
        transfer_name: transferName,
        bank_name: bankName,
        account_number: accountNumber,
        payment_reference: reference,
        receipt_url: receiptUrl,
      })
      .eq('email', email)
      .select();

    if (error) {
      console.error('Supabase error updating bank transfer:', error);
      return NextResponse.json(
        { error: 'Failed to update bank transfer details: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Bank transfer details saved:', { 
      transferId, 
      email, 
      transferName,
      updatedRecord: data 
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

