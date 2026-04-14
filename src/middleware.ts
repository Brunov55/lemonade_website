import { defineMiddleware } from 'astro:middleware';

// REGLA #2: El Guardián de Rutas (Middleware SSR)
export const onRequest = defineMiddleware(async ({ url, request, redirect }, next) => {
  // Ignorar assets estáticos, llamadas API internas y rutas públicas
  const isStatic = url.pathname.startsWith('/_') || url.pathname.includes('.') || url.pathname === '/';
  if (isStatic) {
    // Redirigir al dashboard si un usuario ya autenticado entra a /
    if (url.pathname === '/') {
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        return redirect('/dashboard');
      }
      return next();
    }
    return next();
  }

  // Cualquier otra ruta del sistema (/dashboard, /insumos, /analitica, etc) se considera protegida
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return redirect('/');
  }

  try {
    // Hacemos GET a Spring Boot para validar el JWT
    const response = await fetch(`${import.meta.env.API_URL}/auth/me`, {
      headers: {
        'cookie': cookieHeader // Inyectamos la cookie tal cual vino del navegador del cliente
      }
    });
    
    // Si el backend dice 401 Unauthorized, regresamos al login (/)
    if (!response.ok) {
      return redirect('/');
    }
    
    // Si dice 200 OK, lo dejamos pasar
  } catch (e) {
    // Manejo de backend caído (Timeout)
    console.error("Error validando sesión con Spring Boot:", e);
    // Podrías mostrar una pantalla de error 500, pero por seguridad y flujo, rebotar a login (/)
    return redirect('/');
  }
  
  return next();
});
