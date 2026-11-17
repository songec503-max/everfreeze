/* 친절한 안내
   1) 처음 막이 열리면 안내 쪽지 4장 (누를 곳 · 이동 · 단서와 힌트 · 세계의 어긋남과 무대 뒤)
   2) 그림 창 바로 위(머리글 점선 아래): [월드맵] 버튼(마을 지도·세부 장소에서) · [도움말] 버튼(언제든 안내 쪽지 다시 보기) · [처음부터] 버튼(사이트 초기화)
   3) 처음 한 번만 뜨는 짧은 도움말(그림 창 위쪽): 처음 흔들림 · 처음 퍼즐 · 처음 단계가 오를 때
   문장은 아래 PAGES · TIPS 에서 고친다. */
(function () {
  const EF = window.EF, UI = EF.UI, h = EF.h;

  const PAGES = [
    { title: 'EVERFREEZE에 오신 것을 환영해요',
      body: '세 마을을 돌아다니며 그림 속 물건과 사람을 눌러 살펴보세요.\n마우스를 올렸을 때 테두리가 생기는 곳이 누를 수 있는 곳이에요.\n사람을 누르면 이야기를 나눌 수 있어요.' },
    { title: '돌아다니는 방법',
      body: '마을과 장소를 눌러 안으로 들어가요.\n그림 아래쪽 ▼ 를 누르면 한 단계 뒤로 돌아가요.\n그림 창 위 [월드맵] 버튼을 누르면 언제든 처음 지도로 돌아가요.\n물건을 가까이 본 화면에서도 ▼ 를 누르면 원래 장면으로 돌아가요.' },
    { title: '단서와 퍼즐',
      body: '물건을 누르면 가까이 들여다볼 수 있어요.\n그 안에 숫자나 기호가 숨어 있기도 해요.\n한 마을의 퍼즐 단서는 다른 마을에 있어요.\n여러 마을을 오가며 기억해 두세요.\n퍼즐을 3번 틀리면 힌트가 나와요.\n그림이 흔들리는 곳은 아직 열리지 않은 곳이에요.' },
    { title: '무언가 이상하다면',
      body: '단서를 모을수록 세계가 조금씩 어긋나고, 그때마다 새로운 곳이 열려요.\n막힐 때는 아직 가 보지 않은 장소나\n다시 말을 걸어 보지 않은 사람을 찾아보세요.\n페이지를 아래로 내리면 \'무대 뒤\' 이야기도 볼 수 있어요.' }
  ];
  const TIPS = {
    shake:  '아직은 열 수 없어요. 다른 곳을 먼저 둘러보세요.',
    puzzle: '3번 틀리면 힌트가 나와요. 닫아도 괜찮아요. (Esc)',
    stage:  '세계가 어긋나기 시작했어요. 새로운 곳이 열렸을지도 몰라요.'
  };

  const seen = {}; // 이번 방문에서 이미 보여 준 도움말

  // ---- 처음 한 번만 뜨는 짧은 도움말 (누르기를 막지 않는다) ----
  function tip(key) {
    if (seen[key]) return; seen[key] = true;
    const t = h('div', 'gtip', TIPS[key]);
    UI.stage.append(t);
    requestAnimationFrame(() => t.classList.add('on'));
    setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 500); }, 4200);
  }
  function note(text) { // 상황에 따른 도움말 (매번)
    UI.stage.querySelectorAll('.gtip').forEach(t => t.remove());
    const t = h('div', 'gtip', text); UI.stage.append(t);
    requestAnimationFrame(() => t.classList.add('on'));
    setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 500); }, 5200);
  }
  EF.Guide = { tip, note };
  const wrap = (name, key) => { const f = UI[name]; UI[name] = function () { tip(key); return f.apply(this, arguments); }; };
  wrap('shake', 'shake'); wrap('showPuzzle', 'puzzle'); // ▼ 돌아가기 안내는 [도움말]에만 둔다
  const banner = UI.banner; UI.banner = function () { banner.apply(this, arguments); setTimeout(() => tip('stage'), 1200); };

  // ---- 안내 쪽지 ----
  function openGuide() {
    if (UI.busy || UI.dismiss) return;
    UI.busy = true;
    const sc = h('div', 'scrim dim guide-scrim'), card = h('div', 'guide');
    const title = h('h3'), body = h('div', 'g-body'), dots = h('div', 'g-dots');
    const prev = h('button', 'btn', '이전'), next = h('button', 'btn primary');
    const nav = h('div', 'g-nav'); nav.append(prev, dots, next);
    card.append(title, body, nav); sc.append(card); UI.stage.append(sc);
    let i = 0;
    const draw = () => {
      title.textContent = PAGES[i].title; body.textContent = PAGES[i].body;
      dots.innerHTML = PAGES.map((_, j) => `<span class="${j === i ? 'on' : ''}"></span>`).join('');
      prev.style.visibility = i ? 'visible' : 'hidden';
      next.textContent = i === PAGES.length - 1 ? '시작하기' : '다음';
    };
    const close = () => { sc.remove(); UI.dismiss = null; UI.busy = false; UI.render(); };
    const go = d => { i += d; if (i >= PAGES.length) close(); else { i = Math.max(0, i); draw(); } };
    next.onclick = () => go(1); prev.onclick = () => go(-1);
    UI.dismiss = () => go(1); // Enter/Space: 다음 장, 마지막 장에서 닫힘. Esc 도 다음/닫기
    draw();
  }
  EF.Guide.open = openGuide;

  // ---- 사이트 초기화: 확인한 뒤 처음 상태(닫힌 막 · 1단계)로 다시 연다 ----
  function askReset() {
    if (UI.busy || UI.dismiss) return;
    UI.busy = true;
    const sc = h('div', 'scrim dim guide-scrim'), card = h('div', 'guide confirm');
    const yes = h('button', 'btn primary', '예, 처음부터'), no = h('button', 'btn', '아니요');
    const nav = h('div', 'g-nav'); nav.append(no, yes);
    card.append(h('h3', '', '처음부터 다시 할까요?'), h('div', 'g-body', '모은 단서와 풀어 둔 퍼즐, 세계의 어긋남이 모두 사라지고\n막이 닫힌 첫 화면으로 돌아가요.'), nav);
    sc.append(card); UI.stage.append(sc);
    const close = () => { sc.remove(); UI.dismiss = null; UI.busy = false; };
    no.onclick = close; UI.dismiss = close; // Esc/Enter: 취소 (실수로 지우지 않게)
    yes.onclick = () => { location.href = location.pathname + location.search; }; // 주소의 #장면 을 지우고 새로 연다
  }
  EF.Guide.reset = askReset;

  // ---- 그림 창 왼쪽 위 버튼 ----
  UI.initGuide = function () {
    const bar = h('div', 'stage-tags pre'); // 머리글 점선 아래, 그림 창 바로 위
    const map = h('button', 'stag map', '월드맵'), help = h('button', 'stag help', '도움말'), reset = h('button', 'stag reset', '처음부터');
    reset.title = '사이트 초기화';
    reset.onclick = e => { e.stopPropagation(); askReset(); };
    map.title = '월드맵으로 돌아가기'; help.title = '안내 다시 보기';
    map.onclick = e => { e.stopPropagation(); if (UI.busy) return; EF.state.scene = 'WORLD_MAP'; UI.render(); };
    help.onclick = e => { e.stopPropagation(); openGuide(); };
    bar.append(reset, help, map); // 순서: 처음부터 · 도움말 · 월드맵
    // 지금 누를 수 없는 버튼(클로즈업 · 대화 · 퍼즐 · 안내 창이 열려 있을 때)은 색을 빼서 꺼진 것처럼 보이게 한다
    const sync = () => {
      const off = !!(UI.busy || UI.dismiss);
      [reset, help, map].forEach(b => { b.classList.toggle('off', off); b.disabled = off; b.setAttribute('aria-disabled', off); });
    };
    setInterval(sync, 150); sync();
    const wrap = document.getElementById('stagewrap'); wrap.parentNode.insertBefore(bar, wrap);
    UI.guideBar = { bar, map };
    map.style.display = EF.SCENES[EF.state.scene].kind === 'world' ? 'none' : '';
  };
  // 장면이 바뀔 때: 월드맵에서는 [월드맵] 버튼을 숨긴다
  const render = UI.render;
  UI.render = function () {
    const r = render.apply(this, arguments);
    if (UI.guideBar) UI.guideBar.map.style.display = EF.SCENES[EF.state.scene].kind === 'world' ? 'none' : '';
    return r;
  };
  // 처음 막이 열렸을 때 안내 쪽지
  UI.onCurtainOpen = function () { if (UI.guideBar) UI.guideBar.bar.classList.remove('pre'); if (!seen.welcome) { seen.welcome = true; openGuide(); } };
})();
