(() => {
 let selected='C0204';
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const display={
  C0204:{name:{zh:'复古游戏',en:'Retro game'},steps:{zh:['用单个 HTML 交付游戏，包含 Canvas、脚本和样式。','放慢速度、补充音效，并修复全屏退出。','进入全屏后，游戏画面仍然没有放大。','HUD 仍被裁切，用户要求共享容器与等比缩放。'],en:['Deliver the game in one HTML file with Canvas, scripts, and styles.','Slow the action, add sound, and repair fullscreen exit.','Entering fullscreen still does not enlarge the game.','The HUD remains clipped; the user asks for a shared container and proportional scaling.']}},
  C0150:{name:{zh:'圆屏表盘',en:'Round watch face'},steps:{zh:['排开重叠元素，同时容纳时间、日期和运动指标。','用图标替代文字，让步数、心率和电量沿底部圆弧排列。','继续调整日期大小与透明度、温度配色和图标背景。'],en:['Resolve overlaps while fitting time, date, and fitness metrics.','Replace text with icons and arrange metrics along the lower arc.','Refine date size and opacity, temperature colors, and icon backgrounds.']}},
  C0327:{name:{zh:'交通灯与网页',en:'Traffic lights & web'},steps:{zh:['自动周期只走绿、黄、红；维护模式只让黄灯闪烁。','区分传感器与实体按钮，并在日志中标明来源。','网页按钮发出的请求，仍没有被正确记录。','用户再次列出同步等问题，要求逐个处理。'],en:['Keep normal cycles green, amber, and red; flash only amber in maintenance.','Distinguish sensor and physical-button events in the logs.','The web button still fails to produce the expected logged event.','The user lists synchronization and other recurring issues to fix one by one.']}},
  C0587:{name:{zh:'第一款健身 App',en:'A first fitness app'},steps:{zh:['想管理多种训练计划，同时需要网页版与逐步指导。','优先免费方案，再明确邮箱、Apple 和 Google 登录需求。','先生成可以查看的 HTML 设计稿，继续确认想法。','设计稿之后，用户指出已有笔记目录被重复创建。'],en:['Plan different workouts, with a web version and step-by-step guidance.','Prefer free options, then clarify email, Apple, and Google sign-in.','Create a viewable HTML mockup to help refine the idea.','After the mockup, the user flags a duplicate folder in the existing notes workspace.']}}
 };
 window.mountRealCases=(host,lang)=>{
  const all=window.RCB_CASES;
  const L=v=>typeof v==='string'?v:v[lang];
  const ui=lang==='zh'?{
   select:'查看案例',messages:'需求如何演进',original:'原始需求与译文',source:'原始用户消息',checks:'验收关注点',record:'历史记录中的观察',preview:'打开历史产物',excerpt:'下载来源摘录 JSON',close:'关闭预览',note:'以下均选自现有任务。译文与展示摘要由本站整理；消息编号来自历史记录，不代表评测轮次。',game:'操作：← → / A D 移动，空格射击。游戏带合成音效。',fitness:'这是历史静态设计稿；登录、统计及按钮文案不代表已实现功能。',view:'查看大图',details:'来源与说明',artifact:'画面来源',gameCaption:'历史 HTML 产物 · 尚非完整验收结果',fitnessCaption:'历史静态设计稿 · 界面数据为示例',illustrationCaption:'需求示意图 · 非实机运行画面',fitnessPreview:'查看静态设计稿'
  }:{select:'View case',messages:'How the request evolves',original:'Original requests and translations',source:'Original user message',checks:'Acceptance focus',record:'Observation from the historical record',preview:'Open historical artifact',excerpt:'Download source excerpts JSON',close:'Close preview',note:'Selected from existing tasks. Translations and display summaries are editorial. Message numbers refer to the historical record, not evaluation rounds.',game:'Controls: ← → / A D to move; Space to fire. The game includes synthesized audio.',fitness:'This is a historical static mockup. Sign-in, statistics, and button labels do not imply working features.',view:'Enlarge image',details:'Sources and notes',artifact:'Visual source',gameCaption:'Historical HTML artifact · Not proof of full acceptance',fitnessCaption:'Historical static mockup · Illustrative interface data',illustrationCaption:'Requirements illustration · Not a device screenshot',fitnessPreview:'View static mockup'};
  host.innerHTML=`<div class="real-case-grid" role="group" aria-label="${ui.select}">${all.map(c=>`<button class="real-case-card" data-case="${c.id}" aria-label="${ui.select}：${escape(L(c.title))}" aria-pressed="${selected===c.id}"><span class="case-card-image"><img src="assets/cases/${c.image}" alt="" loading="lazy"></span><span class="case-card-copy"><strong>${escape(L(display[c.id].name))}</strong><span>${escape(L(c.visualLabel))}</span></span></button>`).join('')}</div><div class="case-explorer" id="case-explorer"></div><dialog class="case-preview-dialog"><div class="case-preview-top"><span class="case-preview-name"></span><button class="case-preview-close" aria-label="${ui.close}">×</button></div><p class="case-preview-context"></p><div class="case-preview-body"></div></dialog>`;
  const explorer=host.querySelector('.case-explorer');
  const dialog=host.querySelector('dialog');
  function openPreview(c){
   host.querySelector('.case-preview-name').textContent=`${c.id} · ${L(c.title)}`;
   host.querySelector('.case-preview-context').textContent=c.artifact ? (c.kind==='game'?ui.game:ui.fitness) : L(c.visualNote);
   host.querySelector('.case-preview-body').innerHTML=c.artifact?`<iframe title="${escape(L(c.title))}" src="assets/cases/${c.artifact.file}" sandbox="${c.artifact.sandbox}" allow="fullscreen" allowfullscreen></iframe>`:`<img src="assets/cases/${c.image}" alt="${escape(L(c.visualLabel))}">`;
   dialog.showModal();
  }
  function renderDetail(){
   const c=all.find(x=>x.id===selected);
   const preview=c.kind==='fitness'?ui.fitnessPreview:c.artifact?ui.preview:ui.view;
   const caption=c.kind==='fitness'?ui.fitnessCaption:c.artifact?ui.gameCaption:ui.illustrationCaption;
   const originalLang=c.id==='C0204'?'de':c.id==='C0327'?'fr':'es';
   host.querySelectorAll('[data-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.case===selected)));
   explorer.innerHTML=`<div class="case-detail-columns"><figure class="case-evidence"><div class="case-id">${c.id} · ${escape(L(c.category))}</div><p class="case-lead">${escape(L(c.summary))}</p><button class="case-evidence-image" aria-label="${preview}"><img src="assets/cases/${c.image}" alt="${escape(L(c.title)+' · '+L(c.visualLabel))}"><span>${preview} ↗</span></button><figcaption class="case-evidence-kind">${caption}</figcaption></figure><div class="case-conversation"><h3>${ui.messages}</h3><ol class="case-timeline">${c.turns.map((t,i)=>`<li><span class="case-step-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div><h4>${escape(L(t.title))}</h4><p>${escape(L(display[c.id].steps)[i])}</p></div></li>`).join('')}</ol></div></div><details class="case-sources"><summary>${ui.details}<span>${c.id} · ${escape(L(c.language))}</span></summary><div class="case-source-intro"><p>${ui.note}</p><a href="assets/cases/${c.id}-excerpts.json" download>${ui.excerpt} ↓</a></div><div class="case-source-columns"><div><section class="case-source-block"><h4>${ui.artifact}</h4><p>${escape(L(c.visualNote))}</p></section><section class="case-source-block"><h4>${ui.record}</h4><p>${escape(L(c.takeaway))}</p></section><section class="case-source-block"><h4>${ui.checks}</h4><ul>${L(c.checks).map(x=>`<li>${escape(x)}</li>`).join('')}</ul></section></div><section class="case-originals"><h4>${ui.original}</h4>${c.turns.map(t=>`<article><span>${ui.source} #${t.sourceIndex}</span><blockquote lang="${originalLang}">${escape(t.original)}</blockquote><p>${escape(L(t.translation))}</p></article>`).join('')}</section></div></details>`;
   explorer.querySelector('.case-evidence-image').addEventListener('click',()=>openPreview(c));
  }
  host.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.case;renderDetail();}));
  function close(){dialog.close();host.querySelector('.case-preview-body').replaceChildren();}
  host.querySelector('.case-preview-close').addEventListener('click',close);
  dialog.addEventListener('close',()=>host.querySelector('.case-preview-body').replaceChildren());
  dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
  renderDetail();
 };
})();
