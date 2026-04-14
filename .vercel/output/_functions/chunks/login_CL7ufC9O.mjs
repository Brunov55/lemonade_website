import { c as createComponent } from './astro-component_C7jb8nKK.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_B-NdYflH.mjs';
import { r as renderComponent } from './entrypoint_c_WGUk6R.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_BtWJqDzX.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const isLoggedOut = Astro2.url.searchParams.get("logout") === "true";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login - Caracal Lemonade" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col justify-center items-center h-screen px-6 bg-theme-bg"> <div class="w-full max-w-sm bg-theme-surface p-8 rounded-3xl shadow-sm border border-theme-border"> <div class="w-24 h-24 bg-ocean-100 dark:bg-ocean-900 rounded-full mx-auto mb-6 flex items-center justify-center border border-ocean-200 dark:border-ocean-800"> <span class="text-4xl">🍋</span> </div> <h1 class="text-2xl font-poppins font-bold text-center text-theme-text mb-2">Bienvenido</h1> <p class="text-sm text-center text-theme-muted mb-8">Ingresa para operar el punto de venta</p> ${isLoggedOut && renderTemplate`<div class="bg-green-50/50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/50 p-3 rounded-xl text-xs font-semibold mb-4 text-center">Sesión cerrada correctamente.</div>`} <form id="login-form" class="flex flex-col gap-4"> <div> <label class="block text-xs font-semibold text-theme-muted mb-1">Usuario</label> <input type="text" id="username" placeholder="Tu usuario" required class="w-full bg-theme-bg border border-theme-border text-theme-text text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-colors"> </div> <div> <label class="block text-xs font-semibold text-theme-muted mb-1">Contraseña</label> <input type="password" id="password" placeholder="••••••••" required class="w-full bg-theme-bg border border-theme-border text-theme-text text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none transition-colors"> </div> <p id="error-msg" class="text-rose-500 text-xs font-semibold hidden text-center mt-2"></p> <button type="submit" class="w-full bg-primary text-theme-surface hover:opacity-80 font-bold rounded-xl text-sm px-5 py-3.5 text-center mt-4 transition-all duration-300">
Entrar al Sistema
</button> </form> </div> </main> ` })} ${renderScript($$result, "/home/bruno/web-projects/caracal_lemonade/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/bruno/web-projects/caracal_lemonade/src/pages/login.astro", void 0);

const $$file = "/home/bruno/web-projects/caracal_lemonade/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
