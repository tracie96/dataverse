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

    const {
      firstName,
      lastName,
      phone,
      country,
      city,
      trackLevel,
      track,
      specialization,
      experience,
      motivation,
      portfolio,
      linkedin,
      github
    } = applicationData || {};

    const { data: existingApplication, error: checkError } = await supabase
      .from('cohort4_applications')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking for existing application:', checkError);
      return NextResponse.json(
        { error: 'Failed to check application: ' + checkError.message },
        { status: 500 }
      );
    }

    let data;
    let error;

    if (existingApplication) {
      // Application exists, update it with bank transfer info
      const { data: updateData, error: updateError } = await supabase
        .from('cohort4_applications')
        .update({
          payment_completed: true,
          payment_id: transferId,
          payment_method: 'bank-transfer',
          payment_date: new Date().toISOString(),
        })
        .eq('email', email.toLowerCase())
        .select();
      
      data = updateData;
      error = updateError;
    } else if (applicationData) {
      // Application doesn't exist, create it with bank transfer info
      const { data: insertData, error: insertError } = await supabase
        .from('cohort4_applications')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            phone: phone || null,
            country,
            city,
            track_level: trackLevel,
            track,
            specialization: specialization || null,
            experience,
            motivation,
            portfolio_url: portfolio || null,
            linkedin_url: linkedin || null,
            github_url: github || null,
            payment_completed: true,
            payment_id: transferId,
            payment_method: 'bank-transfer',
            payment_date: new Date().toISOString(),
          }
        ])
        .select();
      
      data = insertData;
      error = insertError;
    } else {
      return NextResponse.json(
        { error: 'Application data is required to save bank transfer' },
        { status: 400 }
      );
    }

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

