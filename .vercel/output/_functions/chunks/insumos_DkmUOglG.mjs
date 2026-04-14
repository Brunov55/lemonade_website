import { c as createComponent } from './astro-component_C7jb8nKK.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_B-NdYflH.mjs';
import { r as renderComponent } from './entrypoint_c_WGUk6R.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_BtWJqDzX.mjs';
import { $ as $$BottomNav } from './BottomNav_iZPdvdSs.mjs';
import { e as expenseService } from './expenseService_D3oZj-wh.mjs';

const $$Insumos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Insumos;
  const cookieHeader = Astro2.request.headers.get("cookie");
  const totalGastado = await expenseService.getTotalExpenses(cookieHeader);
  const gastosRecientes = await expenseService.getRecentExpenses(cookieHeader);
  const variableOptions = [
    "Limón Eureka",
    "Ácido Cítrico",
    "Vasos 16oz",
    "Vasos 32oz",
    "Azúcar",
    "Otros"
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Insumos - Caracal Lemonade" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="bg-primary pt-12 pb-6 px-6 border-b-[3px] border-theme-border neo-shadow text-center sticky top-0 z-40"> <p class="text-theme-border opacity-90 font-bold text-sm uppercase tracking-widest mb-1">Inversión General</p> <h1 class="text-4xl font-display font-bold text-theme-border drop-shadow-sm transition-all duration-300" id="total-gastos-display"> <span class="text-xl align-top mr-1">-$</span><span id="total-monto">${totalGastado.toFixed(2)}</span> </h1> </header> <main class="flex-1 px-4 py-6"> <!-- Insumos Fijos --> <section class="mb-8"> <h2 class="text-xl font-display font-bold uppercase tracking-tight mb-4 px-2 text-theme-text">Insumos Fijos</h2> <div class="grid grid-cols-2 gap-4"> <button class="btn-fixed bg-theme-surface p-4 neo-border neo-shadow flex flex-col items-center justify-center gap-2 active:neo-shadow-active transition-all" data-item="Mix de Moras" data-amount="239" data-fixed="true"> <span class="text-3xl mb-1">🫐</span> <p class="font-display font-bold uppercase tracking-tight leading-tight text-xs text-center text-theme-text">Mix de Moras</p> <p class="text-theme-muted font-bold text-[10px] mb-1">1.81kg</p> <p class="font-bold text-accent">-$239</p> </button> <button class="btn-fixed bg-theme-surface p-4 neo-border neo-shadow flex flex-col items-center justify-center gap-2 active:neo-shadow-active transition-all" data-item="Fresas Congeladas" data-amount="249" data-fixed="true"> <span class="text-3xl mb-1">🍓</span> <p class="font-display font-bold uppercase tracking-tight leading-tight text-xs text-center text-theme-text">Fresas Congeladas</p> <p class="text-theme-muted font-bold text-[10px] mb-1">2.72kg</p> <p class="font-bold text-accent">-$249</p> </button> </div> </section> <!-- Insumos Variables --> <section class="mb-8 bg-theme-surface p-5 neo-border neo-shadow"> <h2 class="text-xl font-display font-bold uppercase tracking-tight mb-4 text-theme-text">Insumo Variable</h2> <form id="expense-form" class="flex flex-col gap-4"> <div> <label class="block text-xs font-bold uppercase text-theme-muted mb-1">Producto</label> <select id="expense-type" required class="w-full bg-theme-bg neo-border text-theme-text font-bold text-sm focus:ring-0 focus:outline-none block p-3 transition-colors appearance-none"> <option value="" disabled selected>Selecciona un producto</option> ${variableOptions.map((opt) => renderTemplate`<option${addAttribute(opt, "value")}>${opt}</option>`)} </select> </div> <!-- Contenedor oculto para el nombre cuando es "Otros" --> <div id="other-container" class="hidden"> <label class="block text-xs font-bold uppercase text-theme-muted mb-1">Nombre del Producto</label> <input type="text" id="other-name" placeholder="Ej. Hielo, Servilletas..." class="w-full bg-theme-bg neo-border text-theme-text font-bold text-sm focus:ring-0 focus:outline-none block p-3 transition-colors"> </div> <div> <label class="block text-xs font-bold uppercase text-theme-muted mb-1">Precio Gastado ($)</label> <input type="number" id="expense-amount" step="0.01" placeholder="Ej. 150.50" required class="w-full bg-theme-bg neo-border text-theme-text font-bold text-sm focus:ring-0 focus:outline-none block p-3 transition-colors"> </div> <button type="submit" id="submit-btn" class="w-full bg-accent text-white font-display font-bold uppercase tracking-widest text-sm px-5 py-3.5 text-center mt-2 neo-border neo-shadow active:neo-shadow-active transition-all">
Registrar Gasto
</button> </form> </section> <!-- Historial Reciente de Gastos --> <section> <h2 class="text-xl font-display font-bold uppercase tracking-tight mb-4 px-2 text-theme-text">Últimos Gastos</h2> <div class="flex flex-col gap-3"> ${gastosRecientes.length > 0 ? gastosRecientes.map((gasto) => renderTemplate`<div class="bg-theme-surface p-4 neo-border neo-shadow flex justify-between items-center"> <div class="flex items-center gap-3"> <div class="w-10 h-10 border-[3px] border-theme-border bg-accent flex items-center justify-center text-white font-bold"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </div> <div> <p class="font-display font-bold uppercase text-sm text-theme-text">${gasto.item}</p> <p class="text-xs font-bold text-theme-muted uppercase">${gasto.date.toLocaleDateString()} ${gasto.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p> </div> </div> <p class="font-bold text-accent">-$${gasto.amount}</p> </div>`) : renderTemplate`<p class="text-center text-sm text-theme-muted py-4">No hay gastos registrados aún.</p>`} </div> </section> </main> ${renderComponent($$result2, "BottomNav", $$BottomNav, {})} ` })} ${renderScript($$result, "/home/bruno/web-projects/caracal_lemonade/src/pages/insumos.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/bruno/web-projects/caracal_lemonade/src/pages/insumos.astro", void 0);

const $$file = "/home/bruno/web-projects/caracal_lemonade/src/pages/insumos.astro";
const $$url = "/insumos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Insumos,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
