import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials not configured in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - please contact support' },
        { status: 500 }
      );
    }

    // Verify credentials
    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Use the ADMIN_AUTH_TOKEN from environment variables
    // This token must be set in .env.local and will be used for API authentication
    const authToken = process.env.ADMIN_AUTH_TOKEN;
    
    if (!authToken) {
      console.error('ADMIN_AUTH_TOKEN not configured in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - please contact support' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      token: authToken,
      message: 'Authentication successful'
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
