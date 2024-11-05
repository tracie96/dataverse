import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 587,
      auth: {
        user: "tracy",
        pass: "upJesus1996",
      },
    });

    try {
      await transporter.sendMail({
        from: '"Your Name" <your_email>',
        to: "tracy@dataverseafrica.org",
        subject: "Welcome to our Community",
        text: `New user email: ${email}`,
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email sending failed", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
