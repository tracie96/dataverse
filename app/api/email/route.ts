import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    let transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 587,
      auth: {
        user: "tracy",
        pass: "upJesus1996",
      },
    });

    await transporter.sendMail({
      from: '"DataVerse Africa" <tracy@dataverseafrica.org>',
      to: "tracy@dataverseafrica.org",
      subject: "Welcome to our Community",
      text: `New user email: ${email}`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { message: "Email sending failed", error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
