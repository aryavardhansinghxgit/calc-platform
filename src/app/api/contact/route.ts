import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, subject, message, honeypot } = body;

    // Spam honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message processed" });
    }

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    const targetEmail = "xasvmax@gmail.com";
    const emailSubject = `[CalcPlatform] ${subject || topic || "New Contact Message"}`;

    // Send payload to FormSubmit service (delivers directly to xasvmax@gmail.com)
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: emailSubject,
        _template: "table",
        _captcha: "false",
        name: name || "Anonymous User",
        email: email,
        topic: topic || "General Inquiry",
        subject: subject || "No Subject",
        message: message,
        submittedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (response.ok && data.success !== "false") {
      return NextResponse.json({ success: true, message: "Email forwarded successfully." });
    } else {
      console.error("Form forwarding error response:", data);
      return NextResponse.json({
        success: true,
        message: "Message recorded.",
        fallback: `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`,
      });
    }
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      {
        error: "Failed to send message via automated gateway.",
        fallback: "mailto:xasvmax@gmail.com",
      },
      { status: 500 }
    );
  }
}
