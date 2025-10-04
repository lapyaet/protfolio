import { mailOptions, transporter } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message, subject, phone } = body;

  if (!name || !email || !message || !subject || !phone) {
    return NextResponse.json({ status: "Please fill all the fields!" });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: subject,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    return NextResponse.json({ status: "Message sent successfully!" });
  } catch (err) {
    return NextResponse.json({ status: "Something went wrong!" });
  }
}
