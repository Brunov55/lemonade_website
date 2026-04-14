import { a8 as defineMiddleware, ah as sequence } from './chunks/sequence_B-NdYflH.mjs';
import 'piccolore';
import 'clsx';

const onRequest$1 = defineMiddleware(async ({ url, request, redirect }, next) => {
  const isStatic = url.pathname.startsWith("/_") || url.pathname.includes(".") || url.pathname === "/login";
  if (isStatic) {
    if (url.pathname === "/login") {
      return next();
    }
    return next();
  }
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return redirect("/login");
  }
  try {
    const response = await fetch(`${"http://localhost:8080/api/v1"}/auth/me`, {
      headers: {
        "cookie": cookieHeader
        // Inyectamos la cookie tal cual vino del navegador del cliente
      }
    });
    if (!response.ok) {
      return redirect("/login");
    }
  } catch (e) {
    console.error("Error validando sesión con Spring Boot:", e);
    return redirect("/login");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
