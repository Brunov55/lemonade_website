import { c as createComponent } from './astro-component_C7jb8nKK.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_B-NdYflH.mjs';
import { r as renderComponent } from './entrypoint_c_WGUk6R.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_BtWJqDzX.mjs';
import { $ as $$BottomNav } from './BottomNav_iZPdvdSs.mjs';
import { s as salesService } from './salesService_Dj9egKCp.mjs';
import { e as expenseService } from './expenseService_D3oZj-wh.mjs';

const $$Analitica = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Analitica;
  const cookieHeader = Astro2.request.headers.get("cookie");
  const totalVentas = await salesService.getTotalSales(cookieHeader);
  const totalGastado = await expenseService.getTotalExpenses(cookieHeader);
  const gananciaNeta = totalVentas - totalGastado;
  const ventasRecientes = await salesService.getRecentSales(cookieHeader);
  const todayData = await salesService.getTodayData(cookieHeader);
  const weeklyData = await salesService.getWeeklyData(cookieHeader);
  const monthlyData = await salesService.getMonthlyData(cookieHeader);
  const esPositivo = gananciaNeta >= 0;
  const gananciaColor = esPositivo ? "text-white" : "text-rose-300";
  const getMax = (data) => data.length > 0 ? Math.max(...data.map((d) => d.amount)) : 0;
  const maxToday = getMax(todayData);
  const maxWeek = getMax(weeklyData);
  const maxMonth = getMax(monthlyData);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Historial - Caracal Lemonade" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="bg-primary pt-12 pb-6 px-6 rounded-b-3xl shadow-sm text-center sticky top-0 z-40"> <p class="text-white opacity-90 font-semibold text-sm uppercase tracking-widest mb-1">Balance General</p> <div class="flex items-center justify-center gap-2"> <h1${addAttribute(`text-4xl font-poppins font-bold drop-shadow-sm ${gananciaColor}`, "class")}> <span class="text-xl align-top mr-1">${esPositivo ? "+$" : "-$"}</span>${Math.abs(gananciaNeta).toFixed(2)} </h1> </div> <div class="mt-4 flex justify-between bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/20"> <div class="text-center w-1/2 border-r border-white/20"> <p class="text-[10px] text-white opacity-80 font-bold uppercase tracking-wider mb-1">Ventas</p> <p class="text-base font-bold text-white">$${totalVentas.toFixed(2)}</p> </div> <div class="text-center w-1/2"> <p class="text-[10px] text-rose-200 opacity-90 font-bold uppercase tracking-wider mb-1">Inversión</p> <p class="text-base font-bold text-rose-300">-$${totalGastado.toFixed(2)}</p> </div> </div> </header> <main class="flex-1 px-4 py-6"> <section class="mb-6"> <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide" id="date-filters"> <button class="filter-btn shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold bg-theme-bg border border-theme-border text-theme-muted active:scale-95 transition-colors" data-filter="hoy">Hoy</button> <button class="filter-btn shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-theme-surface shadow-md border border-primary active:scale-95 transition-colors" data-filter="semana">Esta Sem.</button> <button class="filter-btn shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold bg-theme-bg border border-theme-border text-theme-muted active:scale-95 transition-colors" data-filter="mes">Este Mes</button> <div class="shrink-0 flex items-center bg-theme-bg border border-theme-border rounded-full px-3 py-1.5 text-theme-muted"> <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <input type="date" class="bg-transparent text-xs font-semibold outline-none w-24 cursor-pointer text-theme-text"> </div> </div> </section> <section class="mb-8 bg-theme-surface p-5 rounded-3xl shadow-sm border border-theme-border"> <div class="flex justify-between items-center mb-6"> <h2 id="chart-title" class="text-md font-poppins font-semibold text-theme-text">Rendimiento (Semana)</h2> <select class="text-xs font-bold text-theme-text bg-theme-bg border border-theme-border outline-none rounded-lg px-2 py-1 cursor-pointer transition-colors"> <option>Ingresos ($)</option> <option>Unidades</option> </select> </div> <!-- Gráfico: HOY (Barras Horizontales) --> <div id="chart-hoy" class="chart-container hidden"> <div class="flex flex-col gap-4 mt-2"> ${todayData.length > 0 ? todayData.map((d) => {
    const widthPercent = maxToday > 0 ? Math.max(d.amount / maxToday * 100, 2) : 0;
    const isMax = d.amount === maxToday && d.amount > 0;
    return renderTemplate`<div class="w-full"> <div class="flex justify-between items-end mb-1 px-1"> <span class="text-xs font-semibold text-theme-muted">${d.label}</span> <span class="text-xs font-bold text-theme-text">$${d.amount.toFixed(2)}</span> </div> <div class="w-full bg-theme-bg rounded-full h-3.5 overflow-hidden border border-theme-border/50"> <div${addAttribute(`h-full rounded-full transition-all duration-500 ${isMax ? "bg-primary" : "bg-accent opacity-80"}`, "class")}${addAttribute(`width: ${widthPercent}%`, "style")}></div> </div> </div>`;
  }) : renderTemplate`<div class="py-8 text-center text-sm text-theme-muted">No hay datos de hoy</div>`} </div> </div> <!-- Gráfico: SEMANA (Barras Horizontales) --> <div id="chart-semana" class="chart-container"> <div class="flex flex-col gap-4 mt-2"> ${weeklyData.length > 0 ? weeklyData.map((d) => {
    const widthPercent = maxWeek > 0 ? Math.max(d.amount / maxWeek * 100, 2) : 0;
    const isMax = d.amount === maxWeek && d.amount > 0;
    return renderTemplate`<div class="w-full"> <div class="flex justify-between items-end mb-1 px-1"> <span class="text-xs font-semibold text-theme-muted">${d.label}</span> <span class="text-xs font-bold text-theme-text">$${d.amount.toFixed(2)}</span> </div> <div class="w-full bg-theme-bg rounded-full h-3.5 overflow-hidden border border-theme-border/50"> <div${addAttribute(`h-full rounded-full transition-all duration-500 ${isMax ? "bg-primary" : "bg-accent opacity-80"}`, "class")}${addAttribute(`width: ${widthPercent}%`, "style")}></div> </div> </div>`;
  }) : renderTemplate`<div class="py-8 text-center text-sm text-theme-muted">No hay datos de esta semana</div>`} </div> </div> <!-- Gráfico: MES (Barras Horizontales) --> <div id="chart-mes" class="chart-container hidden"> <div class="flex flex-col gap-4 mt-2"> ${monthlyData.length > 0 ? monthlyData.map((d) => {
    const widthPercent = maxMonth > 0 ? Math.max(d.amount / maxMonth * 100, 2) : 0;
    const isMax = d.amount === maxMonth && d.amount > 0;
    return renderTemplate`<div class="w-full"> <div class="flex justify-between items-end mb-1 px-1"> <span class="text-xs font-semibold text-theme-muted">${d.label}</span> <span class="text-xs font-bold text-theme-text">$${d.amount.toFixed(2)}</span> </div> <div class="w-full bg-theme-bg rounded-full h-3.5 overflow-hidden border border-theme-border/50"> <div${addAttribute(`h-full rounded-full transition-all duration-500 ${isMax ? "bg-primary" : "bg-accent opacity-80"}`, "class")}${addAttribute(`width: ${widthPercent}%`, "style")}></div> </div> </div>`;
  }) : renderTemplate`<div class="py-8 text-center text-sm text-theme-muted">No hay datos de este mes</div>`} </div> </div> </section> <section> <h2 class="text-lg font-poppins font-semibold mb-4 px-2 text-theme-text">Transacciones</h2> <div class="flex flex-col gap-3"> ${ventasRecientes.length > 0 ? ventasRecientes.map((venta) => {
    const isMineral = (venta.product || venta.productName || "").toLowerCase().includes("mineral");
    return renderTemplate`<div class="bg-theme-surface p-4 rounded-2xl shadow-sm border border-theme-border flex justify-between items-center group"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-ocean-50 text-ocean-600 dark:bg-ocean-800 dark:text-ocean-300"> ${isMineral ? renderTemplate`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 2v3a1 1 0 001 1h2a1 1 0 001-1V2M9 6h6l1.5 3v11a2 2 0 01-2 2H9.5a2 2 0 01-2-2V9L9 6z"></path></svg>` : renderTemplate`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path></svg>`} </div> <div> <p class="font-poppins font-semibold text-sm text-theme-text">${venta.product || venta.productName || "Venta"}</p> <p class="text-xs text-theme-muted">${venta.date.toLocaleDateString()} • ${venta.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p> </div> </div> <p class="font-bold text-accent">+$${venta.price.toFixed(2)}</p> </div>`;
  }) : renderTemplate`<p class="text-center text-sm text-theme-muted py-6 bg-theme-surface rounded-2xl border border-dashed border-theme-border">Aún no hay transacciones.</p>`} </div> </section> </main> ${renderComponent($$result2, "BottomNav", $$BottomNav, {})} ` })} ${renderScript($$result, "/home/bruno/web-projects/caracal_lemonade/src/pages/analitica.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/bruno/web-projects/caracal_lemonade/src/pages/analitica.astro", void 0);

const $$file = "/home/bruno/web-projects/caracal_lemonade/src/pages/analitica.astro";
const $$url = "/analitica";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Analitica,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
