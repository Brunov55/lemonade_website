import { c as createComponent } from './astro-component_C7jb8nKK.mjs';
import 'piccolore';
import { B as maybeRenderHead, a4 as addAttribute, T as renderTemplate } from './sequence_B-NdYflH.mjs';
import { r as renderComponent } from './entrypoint_c_WGUk6R.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_BtWJqDzX.mjs';
import { $ as $$Image } from './_astro_assets_BLBOvTw6.mjs';
import { $ as $$BottomNav } from './BottomNav_iZPdvdSs.mjs';
import { s as salesService } from './salesService_Dj9egKCp.mjs';

const $$ProductButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductButton;
  const { title, subtitle, price, imageSrc } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button class="btn-venta bg-theme-surface p-3 neo-border neo-shadow flex flex-col items-center gap-3 active:neo-shadow-active transition-all w-full group"${addAttribute(`${title} ${subtitle}`, "data-product")}${addAttribute(price, "data-price")}> <!-- Contenedor cuadrado para las imágenes --> <div class="w-full aspect-square bg-primary border-[3px] border-theme-border flex items-center justify-center overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": imageSrc, "alt": `${title} ${subtitle}`, "class": "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none" })} </div> <div class="text-center pb-1 w-full pointer-events-none"> <p class="font-display font-bold leading-tight text-base text-theme-text uppercase tracking-tight">${title}</p> <p class="text-theme-muted font-bold text-xs mb-1 uppercase">${subtitle}</p> <p class="font-bold text-accent text-xl">$${price}</p> </div> </button>`;
}, "/home/bruno/web-projects/caracal_lemonade/src/components/ProductButton.astro", void 0);

const caracalImg = new Proxy({"src":"/_astro/caracal.t4hDhdV8.jpeg","width":1254,"height":1254,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/bruno/web-projects/caracal_lemonade/src/assets/caracal.jpeg";
							}
							
							return target[name];
						}
					});

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const cookieHeader = Astro2.request.headers.get("cookie");
  let totalVentas = await salesService.getTodaySalesTotal(cookieHeader);
  const ventasRecientes = await salesService.getRecentSales(cookieHeader);
  const hoy = (/* @__PURE__ */ new Date()).toDateString();
  const ventasHoy = ventasRecientes.filter((v) => v.date.toDateString() === hoy);
  if (totalVentas === 0 && ventasHoy.length > 0) {
    totalVentas = ventasHoy.reduce((acc, venta) => acc + (venta.price || 0), 0);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard - Caracal Lemonade" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="bg-primary pt-12 pb-6 px-6 border-b-[3px] border-theme-border neo-shadow text-center sticky top-0 z-40"> <p class="text-theme-border font-bold text-sm uppercase tracking-widest mb-1 opacity-90">Ventas de Hoy</p> <h1 class="text-5xl font-display font-bold text-theme-border transition-all duration-300" id="total-ventas-display"> <span class="text-2xl align-top mr-1">$</span><span id="total-monto">${totalVentas.toFixed(2)}</span> </h1> </header> <main class="flex-1 px-4 py-8 pb-24"> <h2 class="text-xl font-display uppercase tracking-tight font-bold mb-4 px-2 text-theme-text">Venta Rápida</h2> <div class="grid grid-cols-2 gap-4 mb-8"> ${renderComponent($$result2, "ProductButton", $$ProductButton, { "title": "Natural", "subtitle": "500ml", "price": 25, "imageSrc": caracalImg })} ${renderComponent($$result2, "ProductButton", $$ProductButton, { "title": "Mineral", "subtitle": "500ml", "price": 35, "imageSrc": caracalImg })} ${renderComponent($$result2, "ProductButton", $$ProductButton, { "title": "Natural", "subtitle": "1 Litro", "price": 45, "imageSrc": caracalImg })} ${renderComponent($$result2, "ProductButton", $$ProductButton, { "title": "Mineral", "subtitle": "1 Litro", "price": 65, "imageSrc": caracalImg })} </div> <section> <div class="flex justify-between items-center mb-4 px-2"> <h2 class="text-xl font-display uppercase tracking-tight font-bold text-theme-text">Registro de Hoy</h2> <span class="text-xs font-bold text-theme-surface bg-theme-border px-2 py-1 border-2 border-theme-border shadow-[2px_2px_0px_0px_var(--color-theme-border)]" id="ventas-count">${ventasHoy.length} items</span> </div> <div class="flex flex-col gap-3" id="ventas-list"> ${ventasHoy.length > 0 ? ventasHoy.map((venta) => {
    const isMineral = (venta.product || venta.productName || "").toLowerCase().includes("mineral");
    return renderTemplate`<div class="bg-theme-surface p-4 neo-border neo-shadow flex justify-between items-center transition-all group"> <div class="flex items-center gap-3"> <div class="w-10 h-10 border-[3px] border-theme-border flex items-center justify-center font-bold bg-primary text-theme-border"> ${isMineral ? renderTemplate`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 2v3a1 1 0 001 1h2a1 1 0 001-1V2M9 6h6l1.5 3v11a2 2 0 01-2 2H9.5a2 2 0 01-2-2V9L9 6z"></path></svg>` : renderTemplate`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path></svg>`} </div> <div> <p class="font-display font-bold text-sm text-theme-text">$${venta.product || venta.productName || "Venta"}</p> <p class="text-xs font-bold text-theme-muted uppercase">Hoy • ${venta.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p> </div> </div> <p class="font-bold text-accent">+$${venta.price.toFixed(2)}</p> </div>`;
  }) : renderTemplate`<p id="empty-state" class="text-center text-sm text-theme-muted py-6 bg-theme-surface rounded-2xl border border-dashed border-theme-border">Aún no hay ventas registradas hoy.</p>`} </div> </section> </main> ${renderComponent($$result2, "BottomNav", $$BottomNav, {})} ` })} ${renderScript($$result, "/home/bruno/web-projects/caracal_lemonade/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/bruno/web-projects/caracal_lemonade/src/pages/index.astro", void 0);

const $$file = "/home/bruno/web-projects/caracal_lemonade/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
