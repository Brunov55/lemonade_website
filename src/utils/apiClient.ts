// src/utils/apiClient.ts
// El "Envoltorio" Global para el cliente Vanilla JS (Browser)

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${import.meta.env.PUBLIC_API_URL}${endpoint}`;
  
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // REGLA #1: Envía la Cookie Invisible siempre
    });
  } catch (networkError) {
    // REGLA #4: Manejo Global de Errores - Intercepción de Red Caída (Offline)
    console.error("Fallo de red al conectar con el API:", networkError);
    throw new Error("No hay conexión con el servidor. Revisa tu internet.");
  }

  // Si recibimos 401, la sesión expiró o la cookie es inválida
  if (response.status === 401) {
    window.location.href = '/login';
    return null;
  }

  if (!response.ok) {
    let errorMsg = 'Error en el servidor';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch(e) {
      errorMsg = `Error HTTP: ${response.status}`;
    }
    throw new Error(errorMsg);
  }

  // Si la respuesta es vacía (ej. 204 No Content), regresamos null en lugar de romper el JSON.parse
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }

  return response.json();
};
