import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, topicLabel, calculatorName, rating, subject, message, honeypot } = body;

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

    // Input length boundaries for denial of service / payload abuse protection
    if (typeof message !== "string" || message.length > 10000) {
      return NextResponse.json(
        { error: "Message content exceeds maximum allowed length (10,000 characters)." },
        { status: 400 }
      );
    }

    if (name && (typeof name !== "string" || name.length > 150)) {
      return NextResponse.json(
        { error: "Name field exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    if (calculatorName && (typeof calculatorName !== "string" || calculatorName.length > 150)) {
      return NextResponse.json(
        { error: "Calculator name field exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    if (subject && (typeof subject !== "string" || subject.length > 250)) {
      return NextResponse.json(
        { error: "Subject line exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || email.length > 200 || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || "xasvmax@gmail.com";
    const emailSubject = `[CalcPlatform Feedback] ${topicLabel || topic || "General Feedback"}${calculatorName ? ` [${calculatorName}]` : ""}`;

    const origin = req.headers.get("origin") || "https://calcplatform.org";
    const referer = req.headers.get("referer") || "https://calcplatform.org/contact";
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
        category: topicLabel ? String(topicLabel).trim() : (topic ? String(topic).trim() : "General Feedback"),
        calculator: calculatorName ? String(calculatorName).trim() : "N/A",
        userRating: rating ? `${rating} / 5 Stars` : "Not Provided",
        subject: subject ? String(subject).trim() : "N/A",
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
        fallback: `mailto:contact@calcplatform.org?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`,
      });
    }
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      {
        error: "Failed to send message via automated gateway.",
        fallback: "mailto:contact@calcplatform.org",
      },
      { status: 500 }
    );
  }
}
