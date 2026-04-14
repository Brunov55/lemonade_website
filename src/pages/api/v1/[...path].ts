import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ request, params }) => {
  // El API_URL viene del servidor (Spring Boot). Default = localhost
  const backendBaseUrl = import.meta.env.API_URL || 'http://localhost:8080/api/v1';
  const path = params.path || '';
  
  // Construir la URL destino sumando los search params (como ?period=today)
  const requestUrl = new URL(request.url);
  const targetUrl = new URL(`${backendBaseUrl}/${path}`);
  targetUrl.search = requestUrl.search;

  // Filtrar headers que podrían confundir al backend respecto al Host/Origin
  const headersToForward = new Headers(request.headers);
  headersToForward.delete('host');
  headersToForward.delete('origin');
  headersToForward.delete('referer');

  console.log(`[Proxy] Forwarding to: ${targetUrl.toString()}`);
  console.log(`[Proxy] Passing cookie: ${headersToForward.get('cookie')}`);

  try {
    // Definimos el cuerpo solo si NO es GET o HEAD (fetch lanza error si ponemos body en GET)
    const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
    
    const backendRequest = new Request(targetUrl.toString(), {
      method: request.method,
      headers: headersToForward,
      body: hasBody ? await request.clone().arrayBuffer() : undefined,
      redirect: 'manual'
    });

    const response = await fetch(backendRequest);

    // Clonar los headers de respuesta para enviarlos al cliente
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete('content-encoding');

    // MÁGIA DEL PROXY: Convertir la cookie cross-domain en una cookie First-Party
    const setCookieString = responseHeaders.get('set-cookie');
    if (setCookieString) {
      // Eliminar SameSite=None y Secure para que funcione perfecto como first-party, incluso en http (localhost)
      const sanitizedCookie = setCookieString
        .replace(/;\s*SameSite=None/gi, '; SameSite=Lax')
        .replace(/;\s*Secure/gi, '');
      responseHeaders.set('set-cookie', sanitizedCookie);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } catch (error: any) {
    console.error("Proxy fetch error:", error);
    if (error.cause) {
      console.error("Proxy fetch error cause:", error.cause);
    }
    return new Response(
      JSON.stringify({
        message: "Error del Proxy Astro",
        details: error.message,
        cause: error.cause ? error.cause.message || String(error.cause) : undefined,
        target: targetUrl.toString()
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
