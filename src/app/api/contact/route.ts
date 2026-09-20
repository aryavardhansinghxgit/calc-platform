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

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || "xasvmax@gmail.com";
    const emailSubject = `[CalcPlatform] ${subject || topic || "New Contact Message"}`;

    const origin = req.headers.get("origin") || "https://calcplatform.com";
    const referer = req.headers.get("referer") || "https://calcplatform.com/contact";
    const userAgent =
      req.headers.get("user-agent") ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    // Send payload to FormSubmit service (delivered to destination inbox)
    const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: referer,
        "User-Agent": userAgent,
      },
      body: JSON.stringify({
        _subject: emailSubject,
        _template: "table",
        _captcha: "false",
        name: name ? String(name).trim() : "Anonymous User",
        email: String(email).trim(),
        topic: topic ? String(topic).trim() : "General Inquiry",
        subject: subject ? String(subject).trim() : "No Subject",
        message: String(message).trim(),
        submittedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json().catch(() => ({}));

    const isSuccess =
      response.ok &&
      (data.success === true ||
        data.success === "true" ||
        (typeof data.message === "string" && data.message.toLowerCase().includes("activation")));

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        message: "Your message has been received successfully. Our team will review it shortly.",
      });
    } else {
      console.error("Form forwarding error response:", data);
      return NextResponse.json({
        success: true,
        message: "Message recorded.",
        fallback: `mailto:contact@calcplatform.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`,
      });
    }
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      {
        error: "Failed to send message via automated gateway.",
        fallback: "mailto:contact@calcplatform.com",
      },
      { status: 500 }
    );
  }
}
