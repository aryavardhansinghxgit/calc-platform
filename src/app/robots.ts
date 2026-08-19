import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calcplatform.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/404", "/500", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/404", "/500", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/404", "/500", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
