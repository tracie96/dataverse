import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  COHORT5_META,
  COHORT5_TRACK_LIST,
  COHORT5_TRACKS,
  getTrackFeeUsd,
  type Cohort5TrackId,
} from '@/config/cohort5';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      trackId,
      specialization,
      experience,
      motivation,
      portfolio,
      linkedin,
      github,
    } = body;

    if (!firstName || !lastName || !email || !country || !city || !trackId || !experience || !motivation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const track = COHORT5_TRACKS[trackId as Cohort5TrackId];
    if (!track) {
      return NextResponse.json({ error: 'Invalid track selected' }, { status: 400 });
    }

    if (track.requiresSpecialization && !specialization) {
      return NextResponse.json(
        { error: 'Specialization is required for Data Analytics Intermediate track' },
        { status: 400 }
      );
    }

    const programFeeUsd = getTrackFeeUsd();

    const { data, error } = await supabase
      .from('cohort5_applications')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase(),
          phone: phone || null,
          country,
          city,
          track_id: trackId,
          specialization: specialization || null,
          experience,
          motivation,
          portfolio_url: portfolio || null,
          linkedin_url: linkedin || null,
          github_url: github || null,
          application_type: 'paid',
          scholarship_status: 'none',
          program_fee_usd: programFeeUsd,
          payment_completed: false,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save application: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Application registered successfully. You can proceed to payment.',
      data: data[0],
      applicationId: data[0]?.id,
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const email = new URL(request.url).searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('cohort5_applications')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch application: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
