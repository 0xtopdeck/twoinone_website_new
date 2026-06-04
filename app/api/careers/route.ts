import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const cv = formData.get("cv") as File;
    const token = formData.get("token") as string;

    const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for");
    if (!(await verifyTurnstile(token, ip))) {
      return NextResponse.json(
        { success: false, error: "Bot verification failed" },
        { status: 400 }
      );
    }

    if (!cv) {
      return NextResponse.json({ success: false, error: "No CV provided" }, { status: 400 });
    }

    const cvBuffer = Buffer.from(await cv.arrayBuffer());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || "business@twoinone.llc",
      replyTo: email,
      subject: `New Job Application: ${name} - ${position}`,
      text: `Applicant Name: ${name}\nApplicant Email: ${email}\nPosition Applied For: ${position}`,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json({ success: false, error: "Failed to process application" }, { status: 500 });
  }
}
