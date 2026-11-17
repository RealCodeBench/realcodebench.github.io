(function () {
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.mountDimensions = function (host, lang) {
    const data = window.REAL_DIMENSIONS;
    const zh = lang === 'zh';
    const names = new Intl.DisplayNames([zh ? 'zh-CN' : 'en'], {type:'language'});
    let selected = 'engineering';
    const t = (a,b) => zh ? a : b;
    const chip = value => `<li>${escape(value)}</li>`;
    function row(r) {
      const language = r.kind === 'languages';
      const items = language ? r.allValues.slice(0,10).map(code => `${names.of(code)} · ${code}`) : r.items.map(x => x[lang]);
      const all = language ? r.allValues.map(code => `${names.of(code)} · ${code}`) : r.allValues;
      return `<article class="dimension-row"><div class="dimension-label"><h3>${escape(r.title[lang])}</h3><p>${escape(r.description[lang])}</p>${r.kind==='example'?`<a href="#showcase">${t('C0587 · 真实案例','C0587 · Real example')} ↗</a>`:''}</div><div class="dimension-values"><ul class="dimension-chips">${items.map(chip).join('')}</ul>${all.length>items.length?`<details class="dimension-all"><summary>${t('查看全部','View all')} ${all.length} ${t('项记录取值','recorded values')}</summary>${!zh&&!language?'<p class="original-label-note">Original source labels are retained in Chinese.</p>':''}<ul class="dimension-chips">${all.map(chip).join('')}</ul></details>`:''}</div></article>`;
    }
    host.innerHTML = `<div class="dimension-heading"><div><p class="dimension-eyebrow">SCENARIO DIMENSIONS</p><h2>${t('真实场景，由哪些维度构成？','What makes up a real-world scenario?')}</h2><p>${t('展开已有取值，看看任务、用户和环境如何共同定义一次真实交付。','Explore recorded values across the task, user and environment that shape a real delivery.')}</p></div><a class="dimension-download" href="assets/dimension-values.json" download>${t('取值清单 JSON','Values JSON')} ↓</a></div><div class="dimension-tabs" role="tablist" aria-label="${t('场景维度','Scenario dimensions')}">${data.groups.map((g,i)=>`<button role="tab" id="dimension-tab-${g.id}" data-dimension="${g.id}" aria-controls="dimension-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}"><span class="dimension-tab-index">0${i+1}</span><span><strong>${escape(g.title[lang])}</strong><small>${escape(g.subtitle[lang])}</small></span><span aria-hidden="true">↗</span></button>`).join('')}</div><div id="dimension-panel" class="dimension-panel" role="tabpanel" tabindex="0"></div><p class="dimension-footnote">${t('取值来自 2026-10-20 的 600 个候选任务标注快照，默认展示代表项；展开可看该快照的全部记录值。取值可能多选、粒度不同，不代表最终基准规模或已验收覆盖。背景与偏好等自由文本字段以真实例子呈现。','Values come from a 600-candidate annotation snapshot dated 2026-10-20. Representative values appear first; expand to see all values recorded in that snapshot. Labels may overlap and vary in granularity; they do not indicate final benchmark size or verified coverage. Free-text fields use real examples.')}</p>`;
    const panel = host.querySelector('#dimension-panel');
    const tabs = [...host.querySelectorAll('[role="tab"]')];
    function show(id) {
      selected = id;
      const g = data.groups.find(x=>x.id===id);
      tabs.forEach(b=>{const active=b.dataset.dimension===id;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
      panel.setAttribute('aria-labelledby',`dimension-tab-${id}`);
      panel.innerHTML=g.rows.map(row).join('')+`<div class="dimension-context">${id==='engineering'?t('这五个维度并列描述任务；目标、初始状态、约束和验收要求由具体任务定义。','These five dimensions describe tasks in parallel; each task separately specifies goals, initial state, constraints and acceptance.'):id==='user'?t('用户状态只会逐步、部分显露；意图链数量与交错关系尚未统一标注，不用对话轮数或配置节点数代替。','User state is only progressively and partially disclosed. Intent-chain counts and interleaving are not uniformly annotated; turn counts or configured nodes are not substitutes.'):t('环境描述与工程任务关联；未知配置保留未知，不把“未声明”当作“不存在”。','Environment descriptions are tied to the task. Unknown configuration remains unknown; undeclared does not mean absent.')}</div>`;
    }
    tabs.forEach((button,i)=>{
      button.addEventListener('click',()=>show(button.dataset.dimension));
      button.addEventListener('keydown',event=>{
        let next;
        if(event.key==='ArrowRight')next=(i+1)%tabs.length;
        else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
        else if(event.key==='Home')next=0;
        else if(event.key==='End')next=tabs.length-1;
        else return;
        event.preventDefault();tabs[next].focus();show(tabs[next].dataset.dimension);
      });
    });
    show(selected);
  };
})();
