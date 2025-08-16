import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing',
    NODE_ENV: process.env.NODE_ENV || 'Not set'
  };

  return NextResponse.json({
    message: 'Environment variables check',
    environment: envVars,
    timestamp: new Date().toISOString()
  });
}
