import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calcplatform.com";
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/calculators/", "/category/", "/contact", "/about", "/privacy", "/terms"],
        disallow: ["/404", "/500", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/calculators/", "/category/", "/contact", "/about", "/privacy", "/terms"],
        disallow: ["/404", "/500", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/calculators/", "/category/", "/contact", "/about", "/privacy", "/terms"],
        disallow: ["/404", "/500", "/api/"],
      },
      {
        userAgent: "Applebot",
        allow: ["/", "/calculators/", "/category/", "/contact", "/about", "/privacy", "/terms"],
        disallow: ["/404", "/500", "/api/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: ["/", "/calculators/", "/category/", "/contact", "/about", "/privacy", "/terms"],
        disallow: ["/404", "/500", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
