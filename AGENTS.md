# Master Document: Caracal Lemonade POS & Dashboard

## 1. Contexto del Negocio (Business Context)
**"Caracal Lemonade"** es un emprendimiento real de venta de limonadas (físico/en calle). La mascota y concepto visual giran en torno a un Caracal, transmitiendo energía, frescura y agilidad.
- **El Problema:** Llevar el control manual de las ventas, calcular las ganancias reales tras restar los insumos (hielo, vasos, fruta, azúcar) y ver el rendimiento histórico es tedioso y propenso a errores.
- **La Solución:** Un sistema POS (Point of Sale) a la medida, diseñado para operarse **exclusivamente desde el celular del dueño mientras atiende a los clientes bajo el sol**. 
- **Factores Críticos de Éxito:**
  1. **Velocidad:** Registrar una venta no debe tomar más de un toque (1-Tap).
  2. **Legibilidad:** Alto contraste (por la luz del sol) y botones gigantes (para no fallar el toque al cobrar rápido).
  3. **Precisión Financiera:** Separar claramente Ingresos (Ventas) de Inversión (Gastos fijos/variables) para obtener la **Ganancia Neta Real**.

## 2. Roadmap y Plan de Ejecución (Fases del Proyecto)

### ✅ Fase 1: Frontend Estático y UI/UX (COMPLETADA)
Construcción del "cascarón" visual y la experiencia de usuario.
- **Framework:** Astro 6 + TailwindCSS v4.
- **Arquitectura:** Hexagonal (Puertos y Adaptadores). La UI consume datos de `src/services/` (mocks actuales) para desacoplar la vista de la lógica.
- **Hitos logrados:** Layout Mobile-First, Dashboard de Ventas Rápidas, Módulo de Insumos (Gastos variables/fijos), Módulo de Analítica con gráficos dinámicos (Vanilla JS) y Sistema de Diseño implementado.

### ⏳ Fase 2: Backend API y Base de Datos (PRÓXIMA)
Construcción del motor transaccional y persistencia de datos.
- **Framework:** Spring Boot (Java/Kotlin).
- **Base de Datos:** PostgreSQL.
- **Autenticación:** JWT manejado estrictamente mediante cookies `HTTP-Only`, `Secure` y `SameSite=Strict`. Ningún token expuesto en el cliente.
- **Modelo de Datos Sugerido (Entidades Principales):**
  - `User` (id, username, password_hash, role)
  - `Sale` (id, product_name, price, created_at)
  - `Expense` (id, item_name, amount, is_fixed, created_at)

### 🔮 Fase 3: Integración y Puesta en Producción (FUTURA)
- Conectar los servicios de Astro (`salesService.ts` y `expenseService.ts`) a los endpoints reales de Spring Boot usando `fetch`.
- Despliegue del Frontend (ej. Vercel, Netlify o servidor propio Node).
- Despliegue del Backend (ej. Railway, Render, AWS o VPS).

## 3. Catálogo y Reglas de Negocio

### 3.1. Productos (Ingresos)
- **Limonada Natural (500ml)** - $25 MXN
- **Limonada Mineral (500ml)** - $35 MXN
- **Limonada Natural (1 Litro)** - $45 MXN
- **Limonada Mineral (1 Litro)** - $65 MXN

### 3.2. Insumos (Inversión)
Para calcular el **Balance General** (Ganancia Neta = Ventas - Inversión).
- **Fijos (1-Tap):**
  - Mix de moras (1.81kg) - $239 MXN
  - Fresas congeladas (2.72kg) - $249 MXN
- **Variables (Requieren Input Manual):**
  - Limón Eureka, Ácido cítrico, Vasos 16oz, Vasos 32oz, Azúcar.
  - *Otros:* Requiere capturar el "Nombre del producto" y el "Precio gastado".

## 4. Contrato de API RESTful (Spring Boot)
Para integrar la Fase 1 con la Fase 2 sin romper el frontend, Spring Boot debe cumplir este contrato exacto:

### 4.1. Autenticación (Security)
- `POST /api/v1/auth/login`: Valida credenciales. **Retorna 200 OK y una cookie Set-Cookie con el JWT**. No expone el token en el JSON.
- `POST /api/v1/auth/logout`: Limpia la cookie del JWT.
- `GET /api/v1/auth/me`: Retorna 200 OK si la cookie es válida (para proteger las rutas en Astro middleware).

### 4.2. Módulo de Ventas (Sales)
- `POST /api/v1/sales`: Crea una venta. Body: `{ "product": "Limonada Natural 500ml", "price": 25.0 }`.
- `GET /api/v1/sales/total`: Retorna ventas históricas totales. Response: `{ "total": 12500.0 }`.
- `GET /api/v1/sales/today`: Retorna suma de ventas de hoy.
- `GET /api/v1/sales/recent`: Retorna lista de últimas ventas (`limit=10`).
- `GET /api/v1/sales/stats?period={hoy|semana|mes}`: Retorna métricas para los gráficos. 
  - Ejemplo `period=semana`: `[{"label": "L", "amount": 150}, ...]`

### 4.3. Módulo de Insumos (Expenses)
- `POST /api/v1/expenses`: Registra gasto. Body: `{ "item": "Hielo", "amount": 45.0, "isFixed": false }`.
- `GET /api/v1/expenses/total`: Retorna inversión general histórica.
- `GET /api/v1/expenses/recent`: Lista de gastos recientes.

## 5. Sistema de Diseño UI/UX
- **Mobile-First Estricto con toques "Neo-Brutalistas":** Diseñado para pantallas de celular. Botones responsivos con sombras sólidas desviadas (`box-shadow: 4px 4px 0px`) y bordes duros (`border: 3px solid`) que brindan un contraste absoluto bajo el sol, facilitando un toque rápido (1-Tap).
- **Paleta de Colores (Caracal Pop-Art):** Extraída directamente de la ilustración de la mascota, formando un esquema altamente energético y moderno:
  - **Fondo / Primario (Sky Blue):** `#4CB5F5` (Fondo vibrante que levanta el contraste de los demás elementos).
  - **Acento Primario (Ámbar Caracal):** `#F59E0B` (Naranja/Dorado cálido, utilizado para el CTA principal e interacción de productos).
  - **Acento Secundario (Magenta Neón):** `#E11D48` (Un rosa/magenta brillante para destacamento financiero, estados de éxito y "vasos especiales").
  - **Oscuros (Deep Navy):** `#0F172A` (Azul marino profundo, usado en lugar del negro puro para textos, bordes y el sombreado sólido Neo-Brutalista).
  - **Background / Superficie:** El tema utiliza un fondo azul cielo con tarjetas blancas para generar profundidad mediante contraste de bloques de color.
- **Tipografía (Editorial & Tech):** `Space Grotesk` (Títulos, para reflejar esa precisión cortante y ágil, tracking ajustado) y `Manrope` (Para labels, valores y el cuerpo).

## 8. Arquitectura de Integración Frontend-Backend (Conceptos Core)
Para la conexión entre Astro y Spring Boot, nos regiremos estrictamente por estos 5 pilares conceptuales:

### 1. El Paradigma de la Autenticación "Invisible"
El frontend jamás sabrá cuál es el token JWT. No lo guardará, leerá ni decodificará.
- **Flujo:** Al hacer POST a `/api/v1/auth/login`, el backend responderá con un `Set-Cookie`. El navegador lo guarda en su bóveda.
- **Regla:** Toda petición `fetch` desde el cliente debe configurarse explícitamente para incluir credenciales (`credentials: 'include'`).

### 2. El Guardián de Rutas (Astro Middleware)
Protección de rutas privadas desde el servidor (cero parpadeos en el cliente).
- **Flujo:** Un Middleware en Astro intercepta la petición a `/dashboard` o `/analitica`, extrae la cookie y hace un GET a `/api/v1/auth/me` en Spring Boot.
- **Regla:** Si es 200 OK, renderiza. Si es 401, redirección HTTP 302 instantánea al `/login`.

### 3. Carga Inicial Rápida (SSR) vs Interacciones Rápidas (Vanilla JS)
- **SSR para pintar la vista:** En el bloque servidor de Astro, se hacen los GETs inyectando la cookie del usuario en los headers. El HTML llega al celular ya calculado.
- **Vanilla JS para Operación 1-Tap:** Al tocar un botón de venta, se hace el POST a Spring Boot.
- **UI Optimista:** Al tocar, el total se actualiza *inmediatamente* en pantalla asumiendo éxito. Si falla (por red), se revierte y muestra error. Fundamental para la velocidad en la calle.

### 4. Manejo Global de Errores en el Cliente
- **Regla:** Crear un *wrapper* (envoltorio) centralizado para las llamadas `fetch` en Vanilla JS.
- **Comportamiento:** Si recibe 401, fuerza redirección a login. Si recibe 400, extrae el error estructurado de Spring Boot y muestra un Toast amigable.

### 5. Variables de Entorno y CORS
- **Regla:** Usar `PUBLIC_API_URL` para el cliente y `API_URL` para el servidor.
- **Seguridad:** Spring Boot debe tener una lista blanca estricta (CORS) que incluya el dominio de producción del frontend (ej. Vercel) para evitar bloqueos del navegador.
