import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1A1A2E; border-bottom: 2px solid #C8A96E; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #4A5568; font-weight: 600; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #1A1A2E;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4A5568; font-weight: 600;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C8A96E;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4A5568; font-weight: 600;">Subject</td>
              <td style="padding: 8px 0; color: #1A1A2E;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f7fafc; border-radius: 8px; border-left: 4px solid #C8A96E;">
            <p style="margin: 0; color: #1A1A2E; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 24px; color: #4A5568; font-size: 12px;">
            Sent from fatwaanugerah.dev contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
