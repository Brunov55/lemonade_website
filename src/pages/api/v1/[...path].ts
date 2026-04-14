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

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error del Proxy Astro" }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
};
