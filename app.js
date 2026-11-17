const content = {
 zh: {
  nav:['真实案例','基准构成','评测视角','引用'], skip:'跳转到内容',
  introTitle:'从完成代码，到推进真实工作。',
  intro:'RealCodeBench 面向真实工程情境评估 Coding Agent：需求会演变，环境有约束，交付需要与用户持续协作。',
  showcaseTitle:'真实任务如何一步步变化？',
  showcaseDesc:'四个案例，看看最初的需求如何在反馈中变得具体。',
  evalTitle:'既看交付，也看过程。',
  evals:[['可用交付','交付物能否在目标环境中完成预期操作？','功能 · 约束 · 验收'],['持续进展','需求或环境变化后，能否推进任务并保留已实现能力？','连续性 · 能力回退'],['协作负担','用户需要多少次澄清、纠正和介入？','解释 · 反馈 · 干预']],
  evalNote:'与独立人类体验的一致性、分数优化是否改善体验，仍是研究验证目标。',
  figure:'查看完整场景图', figureCaption:'RealCodeBench 场景体系', zoom:'点击放大 ↗',
  footer:'Evaluating coding agents through real-world delivery.', top:'返回顶部 ↑'
 },
 en: {
  nav:['Real tasks','Benchmark design','Evaluation','Citation'], skip:'Skip to content',
  introTitle:'From completing code to advancing real work.',
  intro:'RealCodeBench evaluates coding agents in real engineering contexts: requirements evolve, environments impose constraints, and delivery takes collaboration.',
  showcaseTitle:'How does a real task evolve?',
  showcaseDesc:'Four cases follow the journey from an initial request to concrete feedback.',
  evalTitle:'The deliverable and the journey.',
  evals:[['Usable delivery','Does the artifact support the intended operations in its target environment?','Functionality · Constraints · Acceptance'],['Sustained progress','Can the agent advance the task while preserving capabilities as requirements or environments change?','Continuity · Regression'],['Collaboration burden','How much clarification, correction and intervention does the user need to provide?','Explanation · Feedback · Intervention']],
  evalNote:'Alignment with independent human experience, and whether score-driven optimization improves it, remain validation objectives.',
  figure:'Explore the full scenario diagram', figureCaption:'RealCodeBench scenario design', zoom:'Enlarge ↗',
  footer:'Evaluating coding agents through real-world delivery.', top:'Back to top ↑'
 }
};
const authors = [
 {name: 'Mengjie Ren', equal: true},
 {name: 'Guozhao Mo', equal: true},
 {name: 'Xingyu Li', equal: false},
 {name: 'Jie Lou', equal: false, lead: true}
];
const citationBibTeX = "@misc{ren2026realcodebench,\n  title  = {RealCodeBench},\n  author = {Ren, Mengjie and Mo, Guozhao and Li, Xingyu and Lou, Jie},\n  year   = {2026},\n  url    = {https://realcodebench.github.io/},\n  note   = {Project website}\n}\n";
let lang = 'zh';
try { lang = localStorage.getItem('rcb-language') === 'en' ? 'en' : 'zh'; } catch {}
const ids = ['showcase','framework','evaluation','citation'];
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function kicker(n,s){return `<div class="section-kicker"><b>${n}</b><span>${s}</span></div>`;}
function render(){
 const t = content[lang];
 document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
 document.title = lang === 'zh' ? 'RealCodeBench — 让评测回到真实交付' : 'RealCodeBench — Evaluating Real-World Delivery';
 document.getElementById('app').innerHTML = `
 <a class="skip" href="#main">${t.skip}</a>
 <header class="topbar"><div class="wrap nav"><a class="brand" href="#"><img src="assets/favicon.svg" alt="">RealCodeBench</a><nav class="nav-links" aria-label="${lang==='zh'?'主导航':'Main navigation'}">${t.nav.map((n,i)=>`<a href="#${ids[i]}">${n}</a>`).join('')}</nav><div class="lang" aria-label="Language"><button data-lang="zh" aria-label="切换为中文" aria-pressed="${lang==='zh'}">中</button><button data-lang="en" aria-label="Switch to English" aria-pressed="${lang==='en'}">EN</button></div></div></header>
 <main id="main"><section class="hero"><div class="wrap hero-inner"><div class="hero-copy"><h1>RealCodeBench</h1><h2>${lang === 'zh' ? '让 Coding Agent 的评测回到真实交付' : 'Evaluating Coding Agents through Real-World Delivery'}</h2><div class="authors" aria-label="${lang === 'zh' ? '作者及机构' : 'Authors and affiliations'}"><div class="author-list">${authors.map(a => `<span>${escapeHTML(a.name)}${a.equal ? '<sup aria-label="Equal contribution">*</sup>' : ''}${a.lead ? '<sup aria-label="Project Lead">†</sup>' : ''}</span>`).join('')}</div><div class="affiliations"><span>${lang === 'zh' ? '小红书' : 'Xiaohongshu'}</span><span class="affiliation-divider" aria-hidden="true"></span><img class="studio-logo" src="assets/dots-studio-logo.png" alt="dots studio"><span class="affiliation-divider" aria-hidden="true"></span><span class="author-note"><span>* ${lang === 'zh' ? '同等贡献' : 'Equal contribution'}</span><span>† ${lang === 'zh' ? '项目负责人' : 'Project Lead'}</span></span></div></div><div class="resource-pills" aria-label="${lang === 'zh' ? '项目资源' : 'Project resources'}">${['Paper','GitHub','Hugging Face','arXiv'].map((label,i)=>`${i===1?'<a class="resource-pill" href="https://github.com/RealCodeBench/realcodebench.github.io" target="_blank" rel="noopener noreferrer">':`<button class="resource-pill ${i===0?'paper-pill':''}" disabled>`}<span class="resource-icon" aria-hidden="true">${['▤','<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-4.3 1.3-4.3-2-6-2m12 5v-3.8a3.3 3.3 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8a5.4 5.4 0 0 0-1.5-3.8 5 5 0 0 0-.1-3.8s-1.2-.4-3.9 1.5a13.4 13.4 0 0 0-7 0C5.1.8 3.9 1.2 3.9 1.2a5 5 0 0 0-.1 3.8 5.4 5.4 0 0 0-1.5 3.8c0 5.3 3.2 6.5 6.2 6.8a3.3 3.3 0 0 0-.9 2.6V22"/></svg>','🤗','χ'][i]}</span>${label}${i===1?'</a>':'<small>Soon</small></button>'}`).join('')}</div></div><figure class="hero-video"><div class="video-stage"><video id="intro-video" controls playsinline preload="metadata" poster="assets/realcodebench-intro-poster.jpg" aria-label="${lang === 'zh' ? 'RealCodeBench 项目介绍，34 秒无声视频，含历史小游戏运行与健身 App 静态设计稿画面' : 'RealCodeBench introduction, 34-second silent video with historical game replay and fitness app design mockup'}"><source src="assets/realcodebench-intro.mp4" type="video/mp4"></video><button class="video-play" id="intro-play" aria-label="${lang === 'zh' ? '播放项目介绍视频' : 'Play project introduction'}"><svg width="30" height="34" viewBox="0 0 30 34" aria-hidden="true"><path d="M4 2L28 17L4 32Z" fill="currentColor"/></svg></button></div><figcaption><span>${lang === 'zh' ? '真实案例回放 · 34 秒 · 无声字幕版' : 'Historical artifact replay · 34s · Silent / Chinese captions'}</span><a href="assets/realcodebench-intro.mp4" download>${lang === 'zh' ? '下载视频 ↓' : 'Download ↓'}</a></figcaption></figure></div></section>
 <div class="wrap project-intro"><strong>${t.introTitle}</strong><p>${t.intro}</p></div>
 <div class="showcase-bg"><section id="showcase" class="wrap section"><div class="section-head"><div>${kicker('01','REAL TASKS')}<h2>${t.showcaseTitle}</h2><p class="section-intro">${t.showcaseDesc}</p></div></div><div id="real-cases"></div></section></div>
 <section id="framework" class="wrap section benchmark-section" aria-label="${lang==='zh'?'基准构成':'Benchmark design'}"><div id="dimensions" class="dimensions-section"></div><details class="framework-full"><summary>${t.figure}</summary><button class="figure-box" id="enlarge" aria-label="${t.zoom}"><img loading="lazy" src="assets/framework-${lang}.svg" alt="${lang==='zh'?'工程任务、用户与交互、执行环境共同构成场景':'Engineering task, user and interaction, and environment jointly define a scenario'}"><span class="figure-footer"><span>${t.figureCaption}</span><span>${t.zoom}</span></span></button></details></section>
 <section id="evaluation" class="wrap section evaluation-section">${kicker('03','EVALUATION')}<h2>${t.evalTitle}</h2><div class="evaluation">${t.evals.map(([title,question,focus],i)=>`<article class="eval-item"><span class="number">0${i+1}</span><h3>${title}</h3><p>${question}</p><small>${focus}</small></article>`).join('')}</div><p class="method-note">${t.evalNote}</p></section>
 <section id="citation" class="wrap citation-section" aria-labelledby="citation-title"><div class="citation-heading"><div><div class="section-kicker"><b>04</b><span>CITATION</span></div><h2 id="citation-title">${lang==='zh'?'引用 RealCodeBench':'Cite RealCodeBench'}</h2><p>${lang==='zh'?'如需引用当前项目，可使用以下 BibTeX。论文发布后将更新正式引用。':'To reference the current project, use the BibTeX below. A paper citation will follow its release.'}</p></div><div class="citation-actions"><button id="copy-citation" type="button">${lang==='zh'?'复制 BibTeX':'Copy BibTeX'}</button><a href="assets/realcodebench.bib" download>${lang==='zh'?'下载 .bib':'Download .bib'} ↓</a></div></div><pre class="citation-code"><code id="citation-bibtex">${escapeHTML(citationBibTeX)}</code></pre><p id="citation-status" class="citation-status" role="status" aria-live="polite"></p></section></main>
 <footer><div class="wrap footer-inner"><span class="footer-brand">RealCodeBench</span><p>${t.footer}</p><a href="#">${t.top}</a></div></footer>`;
 window.mountRealCases(document.getElementById('real-cases'),lang);
 window.mountDimensions(document.getElementById('dimensions'),lang);
 document.getElementById('copy-citation').addEventListener('click', async () => {
   const button = document.getElementById('copy-citation');
   const status = document.getElementById('citation-status');
   try {
     await navigator.clipboard.writeText(citationBibTeX);
     button.textContent = lang === 'zh' ? '已复制 ✓' : 'Copied ✓';
     status.textContent = lang === 'zh' ? 'BibTeX 已复制到剪贴板。' : 'BibTeX copied to clipboard.';
   } catch {
     const selection = window.getSelection(), range = document.createRange();
     range.selectNodeContents(document.getElementById('citation-bibtex'));
     selection.removeAllRanges(); selection.addRange(range);
     status.textContent = lang === 'zh' ? '已选中引用，请手动复制或下载 .bib 文件。' : 'Citation selected. Copy it manually or download the .bib file.';
   }
 });
 const introVideo = document.getElementById('intro-video');
 const introPlay = document.getElementById('intro-play');
 introPlay.addEventListener('click', async () => { try { await introVideo.play(); } catch { introPlay.hidden = true; introVideo.focus(); } });
 introVideo.addEventListener('play', () => { introPlay.hidden = true; });
 introVideo.addEventListener('pause', () => { introPlay.hidden = false; });
 introVideo.addEventListener('ended', () => { introPlay.hidden = false; });
 document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;try{localStorage.setItem('rcb-language',lang);}catch{}render();}));
 document.getElementById('enlarge').addEventListener('click',()=>{document.getElementById('large-figure').src=`assets/framework-${lang}.svg`;document.getElementById('figure-dialog').showModal();});
}
document.querySelector('.close-dialog').addEventListener('click',()=>document.getElementById('figure-dialog').close());
document.getElementById('figure-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});
render();
