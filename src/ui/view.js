/* 화면(View): 옛날 홈페이지 같은 사이트 틀(머리말·메뉴·본문·푸터) 안에 장면 그림(1280x720)을 넣어 그린다.
   장면 = 사이트의 "페이지". 주소(#장소ID)와 브라우저 뒤로가기가 동작한다. */
(function () {
  const EF = window.EF;
  const $ = id => document.getElementById(id);
  const h = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  EF.h = h;
  const UI = (EF.UI = { busy: false, hints: false, dismiss: null, visited: {} });
  let stage, wrap, sceneEl, wm, hsEl, navEl, crumbsEl, ptitle, pintro, tagline, counter, nbCount, firstRender = true;

  UI.init = function () {
    stage = UI.stage = $('stage'); wrap = $('stagewrap');
    navEl = $('nav'); crumbsEl = $('crumbs'); ptitle = $('ptitle'); pintro = $('pintro');
    tagline = $('tagline'); counter = $('counter');
    stage.innerHTML = '';
    sceneEl = h('div', 'scene'); wm = h('div', 'wm'); sceneEl.append(wm);
    hsEl = h('div', 'hotspots');
    UI.toastEl = h('div', 'toasts');
    UI.bannerEl = h('div', 'banner');
    stage.append(sceneEl, h('div', 'fx'), hsEl, UI.toastEl, UI.bannerEl);
    EF.Debug.init(stage);

    // 상단 메뉴
    EF.TEXT.site.nav.forEach(([label, id]) => {
      const a = h('a', 'navitem', label); a.href = '#' + id; a.dataset.scene = id;
      a.onclick = e => { e.preventDefault(); UI.goto(id); };
      navEl.append(a);
    });
    const memo = h('a', 'navitem nav-memo', '📓 메모'); memo.href = '#'; nbCount = h('b', '', '0');
    memo.append(' (', nbCount, ')');
    memo.onclick = e => { e.preventDefault(); UI.openNotebook(); };
    navEl.append(memo);

    // 클릭 힌트(처음 접속한 사람을 위한 보조) / DEV
    $('hintLink').onclick = e => {
      e.preventDefault(); UI.hints = !UI.hints; stage.classList.toggle('hints', UI.hints);
      e.target.textContent = UI.hints ? '클릭할 수 있는 곳 표시 끄기' : '클릭할 수 있는 곳 표시하기';
    };
    if (/[?&]dev\b/.test(location.search)) {
      const d = h('a', 'devlink', 'DEV'); d.href = '#'; d.onclick = e => { e.preventDefault(); EF.Debug.toggle(); };
      $('devSlot').append(d);
    }

    addEventListener('resize', UI.fit);
    addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') { EF.Debug.toggle(); return; }
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        if (UI.dismiss) { e.preventDefault(); UI.dismiss(); }
      } else if ((e.key === 'n' || e.key === 'N') && !UI.busy) UI.openNotebook();
    });
    // 브라우저 뒤로/앞으로: 이미 방문한 페이지로만 이동 허용(주소창으로 잠긴 곳 우회 방지)
    addEventListener('popstate', () => {
      const id = location.hash.slice(1);
      if (UI.busy || !EF.SCENES[id] || !UI.visited[id]) { history.replaceState(null, '', '#' + EF.state.scene); return; }
      if (id !== EF.state.scene) { EF.state.scene = id; UI.render(true); }
    });
    UI.render();
    UI.fit();
  };

  UI.fit = function () {
    const s = wrap.clientWidth / 1280;
    wrap.style.height = Math.round(720 * s) + 'px';
    stage.style.transform = `scale(${s})`;
  };

  // 메뉴/경로 링크로 이동
  UI.goto = function (id) {
    if (UI.busy || !EF.SCENES[id] || id === EF.state.scene) return;
    EF.state.scene = id; UI.render();
  };

  UI.render = function (fromHistory) {
    const st = EF.state, sc = EF.SCENES[st.scene], stg = EF.getStage();
    UI.visited[sc.id] = true;
    // 주소 갱신 (페이지 이동처럼)
    if (!fromHistory && location.hash !== '#' + sc.id) {
      if (firstRender) history.replaceState(null, '', '#' + sc.id); else history.pushState(null, '', '#' + sc.id);
    }
    firstRender = false;
    document.title = `${sc.name} · EVERFREEZE`;
    stage.dataset.stage = stg; document.body.dataset.stage = stg;
    const img = EF.BG_IMAGES.includes(sc.id) ? `url(assets/bg/${sc.id}.png) center/cover no-repeat, ` : '';
    sceneEl.style.background = img + sc.bg;
    wm.textContent = sc.name;

    // 사이트 틀: 문구(단계에 따라 변화) · 메뉴 · 경로 · 페이지 설명
    tagline.textContent = EF.TEXT.site.tagline[stg];
    counter.textContent = EF.TEXT.site.counter[stg];
    nbCount.textContent = Object.keys(st.evidence).length;
    [...navEl.querySelectorAll('.navitem[data-scene]')].forEach(a => {
      const on = a.dataset.scene === sc.id || (sc.village && a.textContent === sc.village);
      a.classList.toggle('on', !!on);
    });
    crumbsEl.innerHTML = '';
    const chain = []; for (let c = sc; c; c = EF.SCENES[c.parent]) chain.unshift(c);
    if (sc.parent) {
      const b = h('a', 'back', '◀ 뒤로'); b.href = '#'; b.onclick = e => { e.preventDefault(); UI.goto(sc.parent); };
      crumbsEl.append(b, h('span', 'sep', '|'));
    }
    chain.forEach((c, i) => {
      if (i) crumbsEl.append(h('span', 'sep', '›'));
      if (i < chain.length - 1) {
        const a = h('a', 'crumb', c.name); a.href = '#'; a.onclick = e => { e.preventDefault(); UI.goto(c.id); };
        crumbsEl.append(a);
      } else crumbsEl.append(h('span', 'crumb now', c.name));
    });
    ptitle.textContent = sc.name;
    pintro.textContent = sc.intro || (sc.kind === 'world' ? EF.TEXT.site.worldIntro : EF.TEXT.site.mapIntro);

    // 핫스팟
    hsEl.innerHTML = '';
    sc.hotspots.forEach(hp => {
      if (!EF.check(hp.showIf)) return;
      const b = h('button', `hs hs-${hp.kind}` + (hp.temp ? ' temp' : ''));
      b.style.cssText = `left:${hp.x}px;top:${hp.y}px;width:${hp.w}px;height:${hp.h}px`;
      b.dataset.id = hp.id;
      b.append(h('span', 'ico', hp.icon), h('span', 'lbl', hp.label));
      b.onclick = () => { if (UI.busy) return; UI.run(EF.click(hp)); };
      hsEl.append(b);
    });
  };

  UI.toast = function (text, kind) {
    const t = h('div', 'toast' + (kind ? ' ' + kind : ''), text);
    UI.toastEl.append(t);
    setTimeout(() => t.classList.add('out'), 2600);
    setTimeout(() => t.remove(), 3200);
  };

  // 단계가 오르면 숫자 대신 짧은 위화감 문구만 보여 준다
  UI.banner = function () {
    UI.bannerEl.innerHTML = '';
    UI.bannerEl.append(h('b', '', EF.TEXT.site.stageNotice));
    UI.bannerEl.classList.remove('show'); void UI.bannerEl.offsetWidth; UI.bannerEl.classList.add('show');
  };
})();
