import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || "smtp.elasticemail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const fromEmail = process.env.SMTP_FROM_EMAIL || "tracy@dataverseafrica.org";
    const toEmail = process.env.SMTP_TO_EMAIL || "tracy@dataverseafrica.org";

    if (!smtpUser || !smtpPass) {
      console.error('Missing SMTP credentials in environment variables');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Create transporter
    let transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send enquiry email
    await transporter.sendMail({
      from: `"DataVerse Africa Enquiry" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
            New Enquiry Received
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #3B82F6; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This enquiry was sent from the DataVerse Africa website contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: `
New Enquiry Received

Name: ${name}
Email: ${email}

Message:
${message}

---
This enquiry was sent from the DataVerse Africa website contact form.
Reply directly to this email to respond to ${name}.
      `,
    });

    return NextResponse.json({ 
      success: true,
      message: "Enquiry sent successfully. We'll get back to you soon!" 
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { 
        error: "Failed to send enquiry. Please try again later or contact us directly.",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


