/* 오페라 커튼 · 무대 뒤
   1) 시작: 그림 창에 커튼이 닫혀 있고 천장에서 줄로 로고가 매달려 있다.
      누르면 로고가 줄에 끌려 천장 위로 사라지고 커튼이 오페라 막처럼 양옆 위로 걷힌다.
   2) 페이지를 아래로 스크롤하면: 그림 창 커튼이 애니메이션으로 닫힌다. 맨 위로 돌아오면 다시 열린다.
   3) 장소 설명 칸 아래 '무대 뒤' 구역: 처음엔 닫힌 문(표)만 있고, 누르면 그래픽노블 · 아트북 · 영상 책자가 펼쳐진다.
      책자는 탭이나 접힌 책장 모서리로 넘긴다(화살표 없음).
   작업물이 오면 PAGES 의 body 만 바꾸면 된다. */
(function () {
  const EF = window.EF, UI = EF.UI, h = EF.h;

  const PAGES = [
    { id: 'novel', tab: '그래픽노블',
      body: '<div class="ph-frame tall"><b>그래픽노블</b><span>이 자리에 EVERFREEZE 그래픽노블이 들어올 예정입니다.</span></div>' },
    { id: 'artbook', tab: '아트북',
      body: '<div class="ph-grid">' + ['캐릭터', '환경', '랜드마크', '키 비주얼'].map(t => `<div class="ph-frame"><b>${t}</b><span>아트북 이미지가 들어올 예정입니다.</span></div>`).join('') + '</div>' },
    { id: 'video', tab: '영상',
      body: '<div class="ph-frame wide"><b>영상</b><span>이 자리에 EVERFREEZE 영상이 들어올 예정입니다.</span></div>' }
  ];

  const T = { open: 1500, close: 1300, rise: 750 }; // 애니메이션 시간(ms)
  const wait = ms => new Promise(r => setTimeout(r, ms));

  UI.initStageCurtain = function () {
    const stage = UI.stage;
    // ---- 그림 창 커튼 ----
    const op = h('div', 'opera closed');
    const L = h('div', 'drape left'), R = h('div', 'drape right'), val = h('div', 'opera-valance');
    const hang = h('div', 'hang'), ropes = h('div', 'ropes'), sign = h('div', 'sign logo');
    sign.innerHTML = '<span class="logo-txt">EVERFREEZE</span>';
    hang.append(ropes, sign);
    op.append(L, R, hang, val);
    // 커튼 그림(assets/opening/open-0~3: 닫힘 → 반쯤 → 묶임 → 다 걷힘)이 있으면 그림 장면으로 열고 닫는다
    const FR = [0, 1, 2, 3].map(i => 'opening/open-' + i);
    const frames = FR.every(k => EF.artHas(k)) ? FR.map(k => EF.artSrc(k)) : null;
    let frameImg = null;
    if (frames) {
      op.classList.add('has-frames', 'shut');
      frameImg = h('img', 'op-frame'); frameImg.src = frames[0]; frameImg.alt = ''; op.insertBefore(frameImg, hang);
      frames.forEach(u => { const pre = new Image(); pre.src = u; }); // 미리 불러 둔다
    }
    stage.append(op); document.body.classList.add('stage-closed');

    // 상태: 'title'(닫힘+로고) → 'play'(열림) ⇄ 'down'(스크롤로 닫힘)
    const C = UI.curtain = { state: 'title', busy: false, el: op };
    async function run(fn, next) {
      if (C.busy) return; C.busy = true; UI.busy = true; document.body.classList.add('stage-closed');
      await fn(); C.state = next; C.busy = false; UI.busy = next !== 'play';
      document.body.classList.toggle('stage-closed', next !== 'play');
      onScroll(); // 애니메이션 중에 스크롤이 바뀌었으면 이어서 맞춘다
    }
    const step = T.open / 5;
    const openDrapes = async () => {
      op.classList.remove('closed'); op.classList.add('opening');
      if (frames) { frameImg.style.opacity = 1; for (let i = 1; i < frames.length; i++) { await wait(step); frameImg.src = frames[i]; op.classList.remove('shut'); } await wait(step); frameImg.style.opacity = 0; await wait(step); }
      else await wait(T.open);
      op.classList.remove('opening'); op.classList.add('open');
    };
    const closeDrapes = async () => {
      op.classList.remove('open'); op.classList.add('closed');
      if (frames) { frameImg.src = frames[frames.length - 1]; frameImg.style.opacity = 1; for (let i = frames.length - 2; i >= 0; i--) { await wait(T.close / 4); frameImg.src = frames[i]; } op.classList.add('shut'); }
      else await wait(T.close);
    };

    // 시작: 로고가 줄에 끌려 올라가고 → 커튼이 걷힌다
    const start = () => { if (C.state === 'title' && !C.busy) run(async () => { hang.classList.add('up'); await wait(T.rise); await openDrapes(); }, 'play').then(() => UI.onCurtainOpen && UI.onCurtainOpen()); }; // 처음 막이 열리면 안내 쪽지
    sign.onclick = e => { e.stopPropagation(); start(); };
    op.onclick = start;
    addEventListener('keydown', e => { if (C.state === 'title' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); start(); } });

    // ---- 스크롤: 내리면 막이 내리고, 맨 위로 오면 막이 오른다 ----
    const wrap = document.getElementById('stagewrap');
    function onScroll() {
      if (C.busy || C.state === 'title') return;
      const r = wrap.getBoundingClientRect();
      const down = r.top < -r.height * 0.25;   // 그림 창이 4분의 1 넘게 위로 지나가면 닫는다
      const up = r.top > -r.height * 0.1;      // 거의 다 다시 보이면 연다
      if (down && C.state === 'play' && !UI.dismiss) run(closeDrapes, 'down');
      else if (up && C.state === 'down') run(openDrapes, 'play');
    }
    addEventListener('scroll', onScroll, { passive: true });

    // ---- 무대 뒤 구역 (장소 설명 칸 아래) ----
    const site = document.getElementById('site'), foot = document.getElementById('foot');
    const sec = h('section', 'backstage'); sec.id = 'backstage';
    const head = h('div', 'bs-head');
    head.append(h('div', 'bs-title', '무대 뒤'), h('div', 'bs-sub', '게임 속에서는 보이지 않는 이야기'));
    // 한 단계: 닫힌 무대 뒤 문(표). 누르면 책자가 펼쳐진다
    const gate = h('button', 'bs-gate');
    gate.innerHTML = '<span class="gate-txt">무대 뒤로 들어가기</span><small>그래픽노블 · 아트북 · 영상</small>';
    const book = h('div', 'program');
    const tabs = h('div', 'pg-tabs'), sheet = h('div', 'pg-sheet');
    const leaves = PAGES.map((p, i) => {
      const lf = h('div', 'pg-leaf');
      lf.innerHTML = `<div class="pg-head"><h3>${p.tab}</h3><span class="pg-no">${i + 1} / ${PAGES.length}</span></div><div class="pg-body">${p.body}</div>`;
      const nx = h('div', 'pg-corner next'), pv = h('div', 'pg-corner prev');
      nx.title = '다음 쪽'; pv.title = '앞 쪽';
      nx.onclick = () => go(i + 1); pv.onclick = () => go(i - 1);
      if (i < PAGES.length - 1) lf.append(nx);
      if (i > 0) lf.append(pv);
      sheet.append(lf);
      const t = h('button', 'pg-tab', p.tab); t.onclick = () => go(i); tabs.append(t);
      return lf;
    });
    const shut = h('button', 'pg-shut', '책자 덮기');
    book.append(tabs, sheet, shut);
    sec.append(head, gate, book);
    site.insertBefore(sec, foot);

    let cur = 0;
    function go(i) {
      if (i < 0 || i >= PAGES.length || i === cur) return;
      const d = i > cur ? 1 : -1, from = leaves[cur], to = leaves[i];
      from.classList.remove('on', 'in-back'); from.classList.add(d > 0 ? 'turn-away' : 'slide-away');
      setTimeout(() => from.classList.remove('turn-away', 'slide-away'), 800);
      to.classList.remove('turn-away', 'slide-away'); to.classList.add('on'); if (d < 0) to.classList.add('in-back');
      cur = i;
      [...tabs.children].forEach((t, j) => t.classList.toggle('on', j === i));
    }
    leaves[0].classList.add('on'); tabs.children[0].classList.add('on');
    // 무대 뒤로 들어갈 때도 커튼이 걷히며 책자가 드러난다 (시작 커튼 그림 open-0~3 을 그대로 쓴다)
    gate.onclick = async () => {
      if (sec.classList.contains('open')) return;
      sec.classList.add('open');
      const fr = [0, 1, 2, 3].map(i => 'opening/open-' + i);
      if (fr.every(k => EF.artHas(k))) {
        const cv = h('div', 'bs-curtain'), im = h('img'); im.src = EF.artSrc(fr[0]); im.alt = ''; cv.append(im); book.append(cv);
        book.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await wait(700);
        for (let i = 1; i < fr.length; i++) { im.src = EF.artSrc(fr[i]); cv.style.background = 'none'; await wait(T.open / 5); }
        cv.classList.add('gone'); await wait(400); cv.remove();
      } else setTimeout(() => book.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
    };
    shut.onclick = () => sec.classList.remove('open');
  };
})();
