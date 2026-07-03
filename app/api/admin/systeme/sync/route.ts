import { NextRequest, NextResponse } from 'next/server';
import { getSystemeTagIdForApplication } from '@/config/systeme';
import type { Cohort5Specialization, Cohort5TrackId } from '@/config/cohort5';
import { verifyAdminToken } from '@/lib/admin-auth';
import { getSupabaseServer } from '@/lib/supabase-server';
import { syncApplicantToSysteme } from '@/lib/systeme';

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.SYSTEME_IO_API_KEY) {
    return NextResponse.json({ error: 'SYSTEME_IO_API_KEY is not configured' }, { status: 503 });
  }

  try {
    const supabase = getSupabaseServer();
    const { data: applications, error } = await supabase
      .from('cohort5_applications')
      .select('first_name, last_name, email, phone, track_id, specialization')
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let synced = 0;
    const failures: { email: string; error: string }[] = [];

    for (const app of applications ?? []) {
      try {
        const tagId = getSystemeTagIdForApplication(
          app.track_id as Cohort5TrackId,
          app.specialization as Cohort5Specialization | null
        );

        await syncApplicantToSysteme({
          email: app.email,
          firstName: app.first_name,
          lastName: app.last_name,
          phone: app.phone,
          tagId,
        });

        synced += 1;
      } catch (syncError) {
        failures.push({
          email: app.email,
          error: syncError instanceof Error ? syncError.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      total: applications?.length ?? 0,
      synced,
      failed: failures.length,
      failures,
    });
  } catch (error) {
    console.error('Systeme.io bulk sync failed:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
