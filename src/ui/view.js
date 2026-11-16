/* 화면(View): 옛날 홈페이지 같은 사이트 틀(머리말·본문·푸터) 안에 장면 그림(1280x720)을 넣어 그린다.
   - 마을/장소 이동은 그림 창 안의 클릭 요소로만 한다(메뉴·경로 링크 없음).
   - 뒤로가기: 그림 아래쪽 가장자리에 마우스를 대면 커서가 아래 화살표로 바뀌고, 클릭하면 한 단계 나간다.
   - 주소(#장소ID)와 브라우저 뒤로가기도 동작한다. */
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
  let stage, wrap, sceneEl, wm, hsEl, ptitle, pintro, tagline, counter, backEl, memoBtn, nbCount, firstRender = true;

  UI.init = function () {
    stage = UI.stage = $('stage'); wrap = $('stagewrap');
    ptitle = $('ptitle'); pintro = $('pintro'); tagline = $('tagline'); counter = $('counter');
    stage.innerHTML = '';
    sceneEl = h('div', 'scene'); wm = h('div', 'wm'); sceneEl.append(wm);
    hsEl = h('div', 'hotspots');
    UI.toastEl = h('div', 'toasts');
    UI.bannerEl = h('div', 'banner');
    backEl = h('div', 'edge-back'); backEl.onclick = () => UI.goBack();
    backEl.append(h('div', 'edge-arrow')); // 뒤로 갈 수 있다는 표시(항상 희미하게 보이고, 마우스를 대면 진해짐)
    stage.append(sceneEl, h('div', 'fx'), hsEl, backEl, UI.toastEl, UI.bannerEl);
    // 메모 버튼은 설정(showMemo)을 켰을 때만 만든다
    if (EF.CONFIG.showMemo) {
      memoBtn = h('button', 'memo-btn', '📓 메모 ('); nbCount = h('b', '', '0'); memoBtn.append(nbCount, ')');
      memoBtn.onclick = () => UI.openNotebook();
      stage.append(memoBtn);
    }
    EF.Debug.init(stage);

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
        // 퍼즐 창(dismissEscOnly)은 Esc 로만 닫힌다
        if (UI.dismiss && (e.key === 'Escape' || !UI.dismissEscOnly)) { e.preventDefault(); UI.dismiss(); }
      } else if (EF.CONFIG.showMemo && (e.key === 'n' || e.key === 'N') && !UI.busy) UI.openNotebook();
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
    if (!wrap.clientWidth) return;
    const s = wrap.clientWidth / 1280;
    wrap.style.height = Math.round(720 * s) + 'px';
    stage.style.transform = `scale(${s})`;
  };

  // 뒤로: 한 단계 위 장면(장소 → 마을 지도 → 월드맵)으로
  UI.goBack = function () {
    if (UI.busy) return;
    const sc = EF.SCENES[EF.state.scene];
    if (sc.parent) { EF.state.scene = sc.parent; UI.render(); }
  };

  UI.render = function (fromHistory) {
    const st = EF.state, sc = EF.SCENES[st.scene], stg = EF.getStage();
    UI.visited[sc.id] = true;
    if (!fromHistory && location.hash !== '#' + sc.id) {
      if (firstRender) history.replaceState(null, '', '#' + sc.id); else history.pushState(null, '', '#' + sc.id);
    }
    firstRender = false;
    document.title = `${sc.name} · EVERFREEZE`;
    stage.dataset.stage = stg; document.body.dataset.stage = stg;
    const bgId = sc.bgAlt && EF.check(sc.bgAlt.if) ? sc.bgAlt.id : sc.id; // 상태에 따라 바뀌는 그림(예: 비밀 통로 열림)
    const err = stg >= 4 && EF.BG_ERR_IMAGES.includes(bgId);
    const img = err ? `url(assets/bg/${bgId}_err.png) center/cover no-repeat, `
      : EF.BG_IMAGES.includes(bgId) ? `url(assets/bg/${bgId}.png) center/cover no-repeat, ` : '';
    sceneEl.style.background = img + sc.bg;
    sceneEl.classList.toggle('err-img', err); // 오작동 그림이 있으면 CSS 색 효과는 끈다
    sceneEl.classList.toggle('has-img', !!img); // 그림이 있으면 '배경 이미지 자리' 글씨를 숨긴다
    wm.textContent = sc.name;

    // 사이트 틀: 문구(단계에 따라 변화) · 페이지 설명
    tagline.textContent = EF.TEXT.site.tagline[stg];
    counter.textContent = EF.TEXT.site.counter[stg];
    if (nbCount) nbCount.textContent = Object.keys(st.evidence).length;
    ptitle.textContent = sc.name;
    pintro.textContent = sc.intro || (sc.kind === 'world' ? EF.TEXT.site.worldIntro : EF.TEXT.site.mapIntro);
    backEl.style.display = sc.parent ? '' : 'none';

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

  // 아직 상호작용할 수 없는 것을 눌렀을 때: 글 없이 그림만 살짝 흔들린다
  UI.shake = function () {
    stage.classList.remove('nudge'); void stage.offsetWidth; stage.classList.add('nudge');
    clearTimeout(UI._nudgeT); UI._nudgeT = setTimeout(() => stage.classList.remove('nudge'), 450);
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
