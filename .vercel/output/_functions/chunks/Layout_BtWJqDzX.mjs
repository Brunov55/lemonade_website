import { U as createRenderInstruction, T as renderTemplate, D as renderSlot, b9 as renderHead, a4 as addAttribute } from './sequence_B-NdYflH.mjs';
import { c as createComponent } from './astro-component_C7jb8nKK.mjs';
import 'piccolore';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Caracal Lemonade POS System"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="icon" type="image/svg+xml" href="/src/assets/caracal.jpeg"><meta name="generator"', "><title>", '</title><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet"><!-- Script bloqueante para evitar flash de tema blanco (FOUC) --><script>\n			if (\n				localStorage.getItem("theme") === "dark" ||\n				(!("theme" in localStorage) &&\n					window.matchMedia("(prefers-color-scheme: dark)").matches)\n			) {\n				document.documentElement.classList.add("dark");\n			} else {\n				document.documentElement.classList.remove("dark");\n			}\n		<\/script>', '</head> <body class="min-h-screen flex flex-col"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/home/bruno/web-projects/caracal_lemonade/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
