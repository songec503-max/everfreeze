/* 무대 뒤: 게임에서는 나오지 않는 설정 자료(그래픽노블 · 아트북 · 영상).
   - 페이지를 아래로 내리면 그림 창에 커튼이 위에서 내려와 닫힌다(스크롤에 따라 내려옴, 올리면 다시 걷힘).
   - 커튼 아래 '무대 뒤' 책에서 세 쪽을 넘겨 본다. 지금은 "들어올 예정" 자리표시만 있다.
   - 작업물이 오면 아래 PAGES 의 body 만 바꾸면 된다. */
(function () {
  const EF = window.EF, UI = EF.UI, h = EF.h;

  const PAGES = [
    { id: 'novel', tab: '그래픽노블', icon: '📖',
      body: '<div class="ph-frame tall"><b>그래픽노블</b><span>이 자리에 EVERFREEZE 그래픽노블이 들어올 예정입니다.</span></div>' },
    { id: 'artbook', tab: '아트북', icon: '🎨',
      body: '<div class="ph-grid">' + ['캐릭터', '환경', '랜드마크', '키 비주얼'].map(t => `<div class="ph-frame"><b>${t}</b><span>아트북 이미지가 들어올 예정입니다.</span></div>`).join('') + '</div>' },
    { id: 'video', tab: '영상', icon: '🎬',
      body: '<div class="ph-frame wide"><b>▶ 영상</b><span>이 자리에 EVERFREEZE 영상이 들어올 예정입니다.</span></div>' }
  ];

  UI.initBackstage = function () {
    const site = document.getElementById('site');
    const foot = document.getElementById('foot');
    const stage = UI.stage, wrap = document.getElementById('stagewrap');

    // ---- 그림 창 위로 내려오는 커튼 ----
    const drop = h('div', 'drop-curtain');
    const cue = h('div', 'drop-cue');
    cue.append(h('b', '', '막이 내렸습니다'), h('span', '', '▲ 눌러서 무대로 돌아가기'));
    drop.append(h('div', 'drop-fringe'), cue);
    stage.append(drop);
    drop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // ---- 무대 뒤 책 ----
    const sec = h('section', 'backstage'); sec.id = 'backstage';
    const head = h('div', 'bs-head');
    head.append(h('div', 'bs-title', '무대 뒤'), h('div', 'bs-sub', '게임 속에서는 보이지 않는 이야기 · 그래픽노블 · 아트북 · 영상'));
    const tabs = h('div', 'bs-tabs');
    const book = h('div', 'bs-book');
    const leaves = PAGES.map((p, i) => {
      const lf = h('div', 'bs-leaf');
      lf.innerHTML = `<div class="bs-page-head"><span class="bs-ico">${p.icon}</span><h3>${p.tab}</h3><span class="bs-no">${i + 1} / ${PAGES.length}</span></div><div class="bs-page-body">${p.body}</div>`;
      book.append(lf);
      const t = h('button', 'bs-tab', p.tab); t.onclick = () => go(i); tabs.append(t);
      return lf;
    });
    const prev = h('button', 'bs-turn prev', '◀ 이전 쪽'), next = h('button', 'bs-turn next', '다음 쪽 ▶');
    const nav = h('div', 'bs-nav'); nav.append(prev, next);
    sec.append(head, tabs, book, nav);
    site.insertBefore(sec, foot);

    // 무대와 무대 뒤 사이: 누르면 내려가는 종이 표
    const ticket = h('button', 'bs-ticket');
    ticket.innerHTML = '<span>▼</span> 무대 뒤 이야기 보기 <small>그래픽노블 · 아트북 · 영상</small>';
    ticket.onclick = () => sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    site.insertBefore(ticket, sec);

    let cur = 0;
    function go(i, dir) {
      if (i < 0 || i >= PAGES.length) return;
      const from = leaves[cur], to = leaves[i];
      if (i !== cur) {
        const d = dir || (i > cur ? 1 : -1);
        from.classList.remove('on', 'in-next', 'in-prev'); from.classList.add(d > 0 ? 'out-next' : 'out-prev');
        to.classList.remove('out-next', 'out-prev'); to.classList.add('on', d > 0 ? 'in-next' : 'in-prev');
        setTimeout(() => from.classList.remove('out-next', 'out-prev'), 700);
      } else to.classList.add('on');
      cur = i;
      [...tabs.children].forEach((t, j) => t.classList.toggle('on', j === i));
      prev.disabled = i === 0; next.disabled = i === PAGES.length - 1;
    }
    prev.onclick = () => go(cur - 1, -1);
    next.onclick = () => go(cur + 1, 1);
    go(0);

    // ---- 스크롤에 따라 커튼이 내려온다 ----
    function onScroll() {
      const r = wrap.getBoundingClientRect();
      // 맨 위에서는 완전히 걷혀 있다. 60px 넘게 내리면 내려오기 시작해, 그림 창 높이의 60%만큼 더 내리면 다 닫힌다
      const p = Math.max(0, Math.min(1, (scrollY - 60) / (r.height * 0.6)));
      drop.style.transform = `translateY(${(p - 1) * 100}%)`;
      drop.classList.toggle('shut', p > 0.98);
      stage.classList.toggle('curtained', p > 0.02);
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
  };
})();
