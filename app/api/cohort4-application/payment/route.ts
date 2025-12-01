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

    // Extract application data
    const {
      firstName,
      lastName,
      email,
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
    } = applicationData;

    // Check if application already exists (shouldn't happen with new flow, but check anyway)
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
      // Application exists, update it with payment info
      const { data: updateData, error: updateError } = await supabase
        .from('cohort4_applications')
        .update({
          payment_completed: true,
          payment_id: paymentIntentId,
          payment_method: paymentMethod,
          payment_date: new Date().toISOString(),
        })
        .eq('email', email.toLowerCase())
        .select();
      
      data = updateData;
      error = updateError;
    } else {
      // Application doesn't exist, create it with payment info
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
            payment_id: paymentIntentId,
            payment_method: paymentMethod,
            payment_date: new Date().toISOString(),
          }
        ])
        .select();
      
      data = insertData;
      error = insertError;
    }

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

