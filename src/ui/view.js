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
  let stage, wrap, sceneEl, decoEl, curtainEl, wm, hsEl, ptitle, pintro, tagline, counter, backEl, memoBtn, nbCount, firstRender = true;

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
    decoEl = h('div', 'deco'); curtainEl = h('div', 'curtain-img'); // 장식(누를 수 없음) · 마을 커튼 그림
    stage.append(sceneEl, decoEl, h('div', 'fx'), hsEl, curtainEl, backEl, UI.toastEl, UI.bannerEl);
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
        // 창(퍼즐 등)이 열려 있을 때 Space 가 페이지를 내려 막이 내려가지 않게 한다 (입력 칸은 제외)
        else if (UI.dismiss && e.key === ' ' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) e.preventDefault();
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
    UI.initStageCurtain(); // 오페라 커튼: 시작 화면 · 스크롤로 막 내리기 · 무대 뒤 (backstage.js)
    if (UI.initGuide) UI.initGuide(); // 월드맵 · 도움말 버튼과 안내 쪽지 (guide.js)
    if (EF.applyBrand) EF.applyBrand(); // 로고 · 앰블럼 그림 (art.js)
  };

  UI.fit = function () {
    if (!wrap.clientWidth) return;
    const s = wrap.clientWidth / 1280;
    wrap.style.height = Math.round(720 * s) + 'px';
    stage.style.transform = `scale(${s})`;
  };

  // 뒤로: 한 단계 위 장면(장소 → 마을 지도 → 월드맵)으로
  // 장소 소개 문구. intro 가 { 단계: 문구 } 이면 지금 단계 이하 중 가장 높은 단계의 문구를 쓴다.
  EF.introFor = function (sc, stg) {
    const it = sc.intro;
    if (!it) return sc.kind === 'world' ? EF.TEXT.site.worldIntro : EF.TEXT.site.mapIntro;
    if (typeof it === 'string') return it;
    const k = Object.keys(it).map(Number).filter(x => x <= stg).sort((a, b) => b - a)[0];
    return it[k] || it[Object.keys(it)[0]];
  };

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
    stage.dataset.stage = stg; document.body.dataset.stage = stg; document.documentElement.dataset.cur = Math.min(5, stg); // 단계별 마우스 포인터
    { const old = EF.PAGE_BG_IMAGES.filter(n => n <= stg).sort((a, b) => b - a)[0]; // 단계별 사이트 배경 그림
      const pb = EF.pageBg(stg) || (old ? `assets/page/stage${old}.png` : null);
      document.body.classList.toggle('page-bg', !!pb);
      document.body.style.backgroundImage = pb ? `url(${pb})` : ''; }
    if (EF.Glitch) EF.Glitch.set(stg); // 사이트 전체 오류 연출 (glitch.js)
    const bgId = sc.bgAlt && EF.check(sc.bgAlt.if) ? sc.bgAlt.id : sc.id; // 상태에 따라 바뀌는 그림(예: 비밀 통로 열림)
    const err = stg >= 4 && EF.BG_ERR_IMAGES.includes(bgId);
    const img = err ? `url(assets/bg/${bgId}_err.png) center/cover no-repeat, `
      : EF.artHas('bg/' + bgId) ? `url(${EF.artSrc('bg/' + bgId)}) center/cover no-repeat, `
      : EF.BG_IMAGES.includes(bgId) ? `url(assets/bg/${bgId}.png) center/cover no-repeat, ` : '';
    // 마을 커튼 그림 (있으면 CSS 커튼 대신 이 그림이 무대 틀이 된다)
    const ck = 'curtain/' + EF.curtainFor(sc), hasCurtain = EF.artHas(ck);
    curtainEl.style.backgroundImage = hasCurtain ? `url(${EF.artSrc(ck)})` : '';
    document.body.classList.toggle('has-curtain', hasCurtain);
    // 장식 (누를 수 없는 그림)
    const art = EF.ART[sc.id] || {};
    decoEl.innerHTML = '';
    (art.deco || []).forEach(d => {
      const key = 'el/' + d.img; if (!EF.artHas(key) || (d.showIf && !EF.check(d.showIf))) return;
      const bx = EF.artBox(key, d.at), im = h('img', 'deco-img'); im.src = EF.artSrc(key); im.alt = '';
      im.style.cssText = `left:${bx.x}px;top:${bx.y}px;width:${bx.w}px;height:${bx.h}px`; decoEl.append(im);
    });
    sceneEl.style.background = img + sc.bg;
    sceneEl.classList.toggle('err-img', err); // 오작동 그림이 있으면 CSS 색 효과는 끈다
    sceneEl.classList.toggle('has-img', !!img); // 그림이 있으면 '배경 이미지 자리' 글씨를 숨긴다
    // 그림이 있는 장면: 클릭할 곳은 평소엔 안 보이고 마우스를 올리면 테두리만 나타난다.
    // 그림이 없는(임시) 장면: 무엇이 어디 있는지 알 수 있게 아이콘을 희미하게 보여 준다.
    stage.classList.toggle('has-img', !!img);
    // 마을별 무대 틀 색 (로즈메리 장미 · 글렌위버 잎 · 루미나리아 바다 · 월드맵 금빛)
    document.body.dataset.village = { '로즈메리': 'rm', '글렌위버': 'gw', '루미나리아': 'lm' }[sc.village] || 'world';
    wm.textContent = sc.name;

    // 사이트 틀: 문구(단계에 따라 변화) · 페이지 설명
    tagline.textContent = EF.TEXT.site.tagline[stg];
    counter.textContent = EF.TEXT.site.counter[stg];
    if (nbCount) nbCount.textContent = Object.keys(st.evidence).length;
    ptitle.textContent = sc.name;
    pintro.textContent = EF.introFor(sc, stg);
    backEl.style.display = sc.parent ? '' : 'none';

    // 핫스팟
    hsEl.innerHTML = '';
    sc.hotspots.forEach(hp => {
      if (!EF.check(hp.showIf)) return;
      const b = h('button', `hs hs-${hp.kind}` + (hp.temp ? ' temp' : ''));
      let box = { x: hp.x, y: hp.y, w: hp.w, h: hp.h }, elImg = null;
      const ae = (art.el || {})[hp.id];
      if (ae) { // 그림 배치표(art.js)에 있으면 그 자리 · 그 그림으로
        const spec = Array.isArray(ae) ? { at: ae, img: `${sc.id}-${hp.id}` } : ae;
        const name = spec.alt && EF.check(spec.alt.if) ? spec.alt.img : (spec.img || `${sc.id}-${hp.id}`);
        if (spec.box) box = { x: spec.box[0], y: spec.box[1], w: spec.box[2], h: spec.box[3] };
        else if (spec.at && EF.artHas('el/' + name)) { box = EF.artBox('el/' + name, spec.at); elImg = EF.artSrc('el/' + name); }
      }
      b.style.cssText = `left:${box.x}px;top:${box.y}px;width:${box.w}px;height:${box.h}px`;
      b.dataset.id = hp.id;
      if (elImg) {
        const im = h('img', 'el-img'); im.src = elImg; im.alt = hp.label; im.draggable = false; b.append(im); b.classList.add('has-el');
        if (ae && ae.rot) b.style.transform = `rotate(${ae.rot}deg)`; // 비스듬히 놓인 물건
      }
      else if (ae && ae.box) b.classList.add('area'); // 배경 속 통로처럼 그림 없이 누르는 곳
      if (hp.npc && EF.NPCS[hp.npc]) { // 임시 그림일 때 인물은 색 동그라미 + 이름 첫 글자 (그림이 들어오면 숨겨진다)
        const n = EF.NPCS[hp.npc], ic = h('span', 'ico npc-ico', n.name[0]); ic.style.background = n.color; b.append(ic, h('span', 'lbl', hp.label));
      } else b.append(h('span', 'ico', hp.icon), h('span', 'lbl', hp.label));
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
