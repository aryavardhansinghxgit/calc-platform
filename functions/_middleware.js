export const onRequest = async (context) => {
  const response = await context.next();
  const host = context.request.headers.get("host") || "";

  // Automatically prevent search engines from indexing the *.pages.dev staging/preview domains
  if (host.includes(".pages.dev")) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
};
