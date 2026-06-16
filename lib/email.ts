import nodemailer from "nodemailer";

function getTransporter() {
  const smtpHost = process.env.SMTP_HOST || "smtp.elasticemail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });
}

export async function sendPartnerRegistrationAdminEmail(partner: {
  organizationName: string;
  contactName: string;
  email: string;
  organizationType: string;
}) {
  const transporter = getTransporter();
  if (!transporter) return;

  const fromEmail = process.env.SMTP_FROM_EMAIL || "tracy@dataverseafrica.org";
  const toEmail = process.env.SMTP_TO_EMAIL || "tracy@dataverseafrica.org";

  await transporter.sendMail({
    from: `"DataVerse Africa" <${fromEmail}>`,
    to: toEmail,
    subject: `New partner registration: ${partner.organizationName}`,
    html: `
      <h2>New Partner Registration</h2>
      <p><strong>Organization:</strong> ${partner.organizationName}</p>
      <p><strong>Contact:</strong> ${partner.contactName}</p>
      <p><strong>Email:</strong> ${partner.email}</p>
      <p><strong>Type:</strong> ${partner.organizationType}</p>
      <p>Review and approve in the admin partners dashboard.</p>
    `,
  });
}

export async function sendPartnerApprovalEmail(partner: {
  contactName: string;
  email: string;
  organizationName: string;
  referralCode: string;
}) {
  const transporter = getTransporter();
  if (!transporter) return;

  const fromEmail = process.env.SMTP_FROM_EMAIL || "tracy@dataverseafrica.org";
  const applyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://dataverseafrica.org"}/internship-cohort5/apply?ref=${partner.referralCode}`;

  await transporter.sendMail({
    from: `"DataVerse Africa" <${fromEmail}>`,
    to: partner.email,
    subject: "Your DataVerse partner referral code",
    html: `
      <h2>Welcome to the DataVerse Partner Program</h2>
      <p>Hi ${partner.contactName},</p>
      <p>Your partner application for <strong>${partner.organizationName}</strong> has been approved.</p>
      <p><strong>Your referral code:</strong> ${partner.referralCode}</p>
      <p>Share this link with applicants:</p>
      <p><a href="${applyUrl}">${applyUrl}</a></p>
      <p>Applicants can enter your code when applying for Cohort 5.0.</p>
    `,
  });
}
