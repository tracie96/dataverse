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
      github,
      agreeToTerms
    } = body;

    if (!firstName || !lastName || !email || !country || !city || !trackLevel || !track || !experience || !motivation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For intermediate track, specialization is required
    if (trackLevel === 'intermediate' && !specialization) {
      return NextResponse.json(
        { error: 'Specialization is required for intermediate track' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingApplication, error: checkError } = await supabase
      .from('cohort4_applications')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking email uniqueness:', checkError);
      return NextResponse.json(
        { error: 'Failed to validate email: ' + checkError.message },
        { status: 500 }
      );
    }

    if (existingApplication) {
      return NextResponse.json(
        { error: 'An application with this email address already exists. Please use a different email or contact support if you believe this is an error.' },
        { status: 409 }
      );
    }

    console.log({body});
    // Insert into Supabase
    const { data, error } = await supabase
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
          payment_completed: false
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save application: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application saved successfully',
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

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - please contact support' },
        { status: 500 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    // Get application by email
    const { data, error } = await supabase
      .from('cohort4_applications')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return NextResponse.json({ data: null });
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch application: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

