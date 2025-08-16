import { NextRequest, NextResponse } from 'next/server';
import { NIGERIAN_BANK_DETAILS } from '../../../config/bank-details';

// Use the centralized bank details configuration
const BANK_DETAILS = NIGERIAN_BANK_DETAILS;

export async function POST(request: NextRequest) {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      bankName, 
      accountNumber, 
      amount, 
      reference 
    } = await request.json();

    // Validate required fields
    if (!fullName || !email || !phone || !bankName || !accountNumber) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Generate unique reference number
    const uniqueReference = `NGN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Store transfer request (in production, save to database)
    const transferRequest = {
      id: uniqueReference,
      fullName,
      email,
      phone,
      bankName,
      accountNumber,
      amount,
      reference: reference || uniqueReference,
      status: 'pending',
      createdAt: new Date().toISOString(),
      bankDetails: BANK_DETAILS
    };

    // In production, save to database here
    console.log('Bank transfer request:', transferRequest);

    return NextResponse.json({
      success: true,
      transferId: uniqueReference,
      bankDetails: BANK_DETAILS,
      message: 'Bank transfer request created successfully. Please complete the transfer and upload proof.'
    });

  } catch (error) {
    console.error('Error creating bank transfer request:', error);
    return NextResponse.json(
      { message: 'Error creating bank transfer request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return bank details for display
  return NextResponse.json({
    bankDetails: BANK_DETAILS,
    instructions: BANK_DETAILS.instructions
  });
}
