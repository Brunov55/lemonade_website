import{a as y}from"./apiClient.3g2r6-Z8.js";const s=document.getElementById("total-monto"),n=document.getElementById("total-ventas-display"),h=document.querySelectorAll(".btn-venta"),p=document.getElementById("ventas-list"),e=document.getElementById("ventas-count"),v=o=>o.toLowerCase().includes("mineral")?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 2v3a1 1 0 001 1h2a1 1 0 001-1V2M9 6h6l1.5 3v11a2 2 0 01-2 2H9.5a2 2 0 01-2-2V9L9 6z"></path>':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>';h.forEach(o=>{o.addEventListener("click",async c=>{const l=c.currentTarget,a=l.dataset.product||"Venta",r=parseFloat(l.dataset.price||"0");if(!s||!n)return;const d=parseFloat(s.innerText),u=d+r;s.innerText=u.toFixed(2),n.classList.add("text-accent","scale-110"),setTimeout(()=>n.classList.remove("text-accent","scale-110"),300);const m=document.getElementById("empty-state");if(m&&m.remove(),e){const i=parseInt(e.innerText.split(" ")[0]);e.innerText=`${i+1} items`}const x=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),t=document.createElement("div");t.className="bg-theme-surface p-4 neo-border neo-shadow flex justify-between items-center transition-all opacity-0 -translate-y-4",t.innerHTML=`
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 border-[3px] border-theme-border flex items-center justify-center font-bold bg-primary text-theme-border">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							${v(a)}
						</svg>
					</div>
					<div>
						<p class="font-display font-bold text-sm text-theme-text">${a}</p>
						<p class="text-xs font-bold text-theme-muted uppercase">Hoy • ${x}</p>
					</div>
				</div>
				<p class="font-bold text-accent">+$${r.toFixed(2)}</p>
			`,p&&(p.prepend(t),requestAnimationFrame(()=>{t.classList.remove("opacity-0","-translate-y-4"),t.classList.add("opacity-100","translate-y-0")}));try{await y("/sales",{method:"POST",body:JSON.stringify({product:a,price:r})}),setTimeout(()=>{t.classList.add("border-theme-border")},1e3)}catch(i){s.innerText=d.toFixed(2),n.classList.add("text-red-500"),setTimeout(()=>n.classList.remove("text-red-500"),500),t.remove(),e&&(e.innerText=`${parseInt(e.innerText.split(" ")[0])-1} items`),alert(`Venta fallida: ${i.message}`)}})});
