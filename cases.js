(() => {
 let selected='C0204', milestone=0;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 window.mountRealCases=(host,lang)=>{
  const all=window.RCB_CASES;
  const L=v=>typeof v==='string'?v:v[lang];
  const ui=lang==='zh'?{
   select:'查看案例',reason:'为什么选这个案例',messages:'需求如何演进',original:'查看原始用户摘录',source:'原始用户消息',focus:'这一轮说明什么',checks:'展示关注点 · 根据用户需求归纳',record:'历史记录中的观察',preview:'打开历史产物',excerpt:'来源摘录 JSON ↓',close:'关闭预览',note:'以下均选自现有任务。历史产物与需求示意分别标注；原文摘录可展开，译文与关注点由本站整理。',scope:'历史产物预览；不代表完整验收通过。',game:'操作：← → / A D 移动，空格射击。游戏带合成音效。',fitness:'这是历史静态设计稿；登录、统计及按钮文案不代表已实现功能。',view:'查看大图'
  }:{select:'View case',reason:'Why this case',messages:'How the request evolves',original:'Read the original user excerpt',source:'Original user message',focus:'What this turn shows',checks:'Display focus · summarized from user requirements',record:'Observation from the historical record',preview:'Open historical artifact',excerpt:'Source excerpts JSON ↓',close:'Close preview',note:'Selected from existing tasks. Historical artifacts and requirements illustrations are labeled separately. Expand original excerpts; translations and focus points are editorial.',scope:'Historical artifact preview; not proof of full acceptance.',game:'Controls: ← → / A D to move; Space to fire. The game includes synthesized audio.',fitness:'This is a historical static mockup. Sign-in, statistics, and button labels do not imply working features.',view:'Enlarge image'};
  host.innerHTML=`<p class="case-collection-note">${ui.note}</p><div class="real-case-grid">${all.map(c=>`<button class="real-case-card" data-case="${c.id}" aria-label="${ui.select}：${escape(L(c.title))}" aria-pressed="${selected===c.id}"><div class="case-card-image"><img src="assets/cases/${c.image}" alt="${escape(L(c.visualLabel)+': '+L(c.title))}" loading="lazy"><span>${L(c.visualLabel)}</span></div><div class="case-card-copy"><div class="case-card-meta">${c.id} · ${L(c.language)}</div><h3>${L(c.title)}</h3><p>${L(c.category)}</p><span class="case-card-link">${ui.select} ↗</span></div></button>`).join('')}</div><div class="case-explorer" id="case-explorer"></div><dialog class="case-preview-dialog"><div class="case-preview-top"><span class="case-preview-name"></span><button class="case-preview-close" aria-label="${ui.close}">×</button></div><p class="case-preview-context"></p><div class="case-preview-body"></div></dialog>`;
  const explorer=host.querySelector('.case-explorer');
  const dialog=host.querySelector('dialog');
  function openPreview(c){
   host.querySelector('.case-preview-name').textContent=`${c.id} · ${L(c.title)}`;
   host.querySelector('.case-preview-context').textContent=c.artifact ? (c.kind==='game'?ui.game:ui.fitness) : L(c.visualNote);
   host.querySelector('.case-preview-body').innerHTML=c.artifact?`<iframe title="${escape(L(c.title))}" src="assets/cases/${c.artifact.file}" sandbox="${c.artifact.sandbox}" allow="fullscreen" allowfullscreen></iframe>`:`<img src="assets/cases/${c.image}" alt="${escape(L(c.visualLabel))}">`;
   dialog.showModal();
  }
  function renderDetail(){
   const c=all.find(x=>x.id===selected);milestone=Math.min(milestone,c.turns.length-1);const t=c.turns[milestone];
   host.querySelectorAll('[data-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.case===selected)));
   explorer.innerHTML=`<div class="case-detail-heading"><div><span class="case-id">${c.id} · ${L(c.category)}</span><h3>${L(c.title)}</h3><p>${L(c.summary)}</p></div><a href="assets/cases/${c.id}-excerpts.json" download>${ui.excerpt}</a></div><div class="case-detail-columns"><div class="case-evidence"><button class="case-evidence-image" aria-label="${c.artifact?ui.preview:ui.view}"><img src="assets/cases/${c.image}" alt="${escape(L(c.visualLabel))}"><span>${c.artifact?ui.preview:ui.view} ↗</span></button><div class="case-evidence-kind">${L(c.visualLabel)}</div><p class="case-evidence-note">${L(c.visualNote)}</p><div class="case-why"><strong>${ui.reason}</strong><p>${L(c.why)}</p></div></div><div class="case-conversation"><h4>${ui.messages}</h4><div class="case-milestones" aria-label="${ui.messages}">${c.turns.map((v,i)=>`<button data-milestone="${i}" aria-pressed="${i===milestone}"><span>${String(i+1).padStart(2,'0')}</span>${L(v.title)}</button>`).join('')}</div><article class="case-turn" aria-live="polite"><span class="case-source">${ui.source} #${t.sourceIndex}</span><h4>${L(t.title)}</h4><p class="case-translated">${L(t.translation)}</p><details class="case-original"><summary>${ui.original} · ${L(c.language)}</summary><blockquote lang="${c.id==='C0204'?'de':c.id==='C0327'?'fr':'es'}">${escape(t.original)}</blockquote></details><p class="case-turn-focus">${L(t.focus)}</p></article><div class="case-checks"><h4>${ui.checks}</h4><ul>${L(c.checks).map(x=>`<li>${x}</li>`).join('')}</ul></div></div></div><div class="case-record"><strong>${ui.record}</strong><p>${L(c.takeaway)}</p></div>`;
   explorer.querySelector('.case-evidence-image').addEventListener('click',()=>openPreview(c));
   explorer.querySelectorAll('[data-milestone]').forEach(b=>b.addEventListener('click',()=>{milestone=Number(b.dataset.milestone);renderDetail();explorer.querySelector(`[data-milestone="${milestone}"]`).focus({preventScroll:true});}));
  }
  host.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.case;milestone=0;renderDetail();}));
  function close(){dialog.close();host.querySelector('.case-preview-body').replaceChildren();}
  host.querySelector('.case-preview-close').addEventListener('click',close);
  dialog.addEventListener('close',()=>host.querySelector('.case-preview-body').replaceChildren());
  dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
  renderDetail();
 };
})();
