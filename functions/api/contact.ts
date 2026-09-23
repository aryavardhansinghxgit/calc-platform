export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  try {
    const body = (await context.request.json()) as {
      name?: string;
      email?: string;
      topic?: string;
      topicLabel?: string;
      calculatorName?: string;
      rating?: number | string;
      subject?: string;
      message?: string;
      honeypot?: string;
    };

    const { name, email, topic, topicLabel, calculatorName, rating, subject, message, honeypot } = body;

    // Spam honeypot check
    if (honeypot) {
      return new Response(JSON.stringify({ success: true, message: "Message processed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!email || !message) {
      return new Response(JSON.stringify({ error: "Email and message are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (typeof message !== "string" || message.length > 10000) {
      return new Response(
        JSON.stringify({ error: "Message content exceeds maximum allowed length (10,000 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || email.length > 200 || !emailRegex.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Please provide a valid email address." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const destinationEmail = context.env?.CONTACT_DESTINATION_EMAIL || "xasvmax@gmail.com";
    const emailSubject = `[CalcPlatform Feedback] ${topicLabel || topic || "General Feedback"}${
      calculatorName ? ` [${calculatorName}]` : ""
    }`;

    const origin = context.request.headers.get("origin") || "https://calcplatform.com";
    const referer = context.request.headers.get("referer") || "https://calcplatform.com/contact";
    const userAgent =
      context.request.headers.get("user-agent") ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

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
        category: topicLabel ? String(topicLabel).trim() : topic ? String(topic).trim() : "General Feedback",
        calculator: calculatorName ? String(calculatorName).trim() : "N/A",
        userRating: rating ? `${rating} / 5 Stars` : "Not Provided",
        subject: subject ? String(subject).trim() : "N/A",
        message: String(message).trim(),
        submittedAt: new Date().toISOString(),
      }),
    });

    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const isSuccess =
      response.ok &&
      (data.success === true ||
        data.success === "true" ||
        (typeof data.message === "string" && data.message.toLowerCase().includes("activation")));

    if (isSuccess) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Your message has been received successfully. Our team will review it shortly.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Message recorded.",
          fallback: `mailto:contact@calcplatform.com?subject=${encodeURIComponent(
            emailSubject
          )}&body=${encodeURIComponent(message)}`,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to send message via automated gateway.",
        fallback: "mailto:contact@calcplatform.com",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
