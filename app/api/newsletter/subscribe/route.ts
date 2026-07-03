import { NextRequest, NextResponse } from 'next/server';
import { SYSTEME_GENERAL_NEWSLETTER_TAG_ID } from '@/config/systeme';
import { subscribeToNewsletter } from '@/lib/systeme';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const result = await subscribeToNewsletter({
      email,
      firstName: body.firstName,
      lastName: body.lastName,
      tagId: SYSTEME_GENERAL_NEWSLETTER_TAG_ID,
    });

    if (!result && !process.env.SYSTEME_IO_API_KEY) {
      return NextResponse.json(
        { error: 'Newsletter service is not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
    });
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
