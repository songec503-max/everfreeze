/* 오페라 커튼 · 무대 뒤
   그림 창 위에 오페라 극장 커튼 하나를 두고, 세 가지 순간에 쓴다.
   1) 시작: 커튼이 닫혀 있고 천장에서 줄로 로고가 매달려 있다. 누르면 로고가 줄에 끌려 천장 위로 사라지고 커튼이 양옆 위로 걷힌다.
   2) 휠을 내리면: 커튼이 양옆에서 닫히고 천장에서 "무대 뒤" 표가 줄에 매달려 내려온다. (바로 자료가 보이지 않는 한 단계)
      표를 누르면: 그래픽노블 · 아트북 · 영상 책자가 아래에서 올라온다. 탭이나 책장 모서리를 눌러 넘긴다(화살표 없음).
   3) 휠을 올리면: 책자 → 닫힌 커튼 → 커튼이 열려 다시 게임. 한 번 굴릴 때 한 단계씩.
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

  const T = { open: 1500, close: 1300, rise: 750, drop: 700 }; // 애니메이션 시간(ms)
  const wait = ms => new Promise(r => setTimeout(r, ms));

  UI.initStageCurtain = function () {
    const stage = UI.stage;
    // ---- 커튼 ----
    const op = h('div', 'opera closed');
    const L = h('div', 'drape left'), R = h('div', 'drape right');
    const val = h('div', 'opera-valance');
    // 천장에 줄로 매단 패 (로고 또는 '무대 뒤' 표)
    const hang = h('div', 'hang');
    const ropes = h('div', 'ropes');
    const sign = h('div', 'sign');
    hang.append(ropes, sign);
    op.append(L, R, hang, val);
    stage.append(op);

    // ---- 무대 뒤 책자 ----
    const book = h('div', 'program');
    const tabs = h('div', 'pg-tabs');
    const sheet = h('div', 'pg-sheet');
    const leaves = PAGES.map((p, i) => {
      const lf = h('div', 'pg-leaf');
      lf.innerHTML = `<div class="pg-head"><h3>${p.tab}</h3><span class="pg-no">${i + 1} / ${PAGES.length}</span></div><div class="pg-body">${p.body}</div>`;
      // 책장 모서리를 누르면 다음 쪽 / 앞쪽 (화살표 대신 접힌 모서리)
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
    shut.onclick = () => step(-1);
    book.append(tabs, sheet, shut);
    stage.append(book);

    let cur = 0;
    function go(i) {
      if (i < 0 || i >= PAGES.length || i === cur && leaves[i].classList.contains('on')) return;
      const d = i > cur ? 1 : -1, from = leaves[cur], to = leaves[i];
      if (from !== to) { from.classList.remove('on', 'in-back'); from.classList.add(d > 0 ? 'turn-away' : 'slide-away'); setTimeout(() => from.classList.remove('turn-away', 'slide-away'), 800); }
      to.classList.remove('turn-away', 'slide-away'); to.classList.add('on'); if (d < 0) to.classList.add('in-back');
      cur = i;
      [...tabs.children].forEach((t, j) => t.classList.toggle('on', j === i));
    }
    leaves[0].classList.add('on'); tabs.children[0].classList.add('on');

    // ---- 상태 ----
    // 'title' 닫힘+로고 → 'play' 열림 → 'gate' 닫힘+무대 뒤 표 → 'book' 책자
    const C = UI.curtain = { state: 'title', busy: true, el: op };
    const setSign = kind => {
      sign.className = 'sign ' + kind;
      sign.innerHTML = kind === 'logo' ? '<span class="logo-txt">EVERFREEZE</span>' : '<span class="gate-txt">무대 뒤</span><small>그래픽노블 · 아트북 · 영상</small>';
    };
    async function openFromClosed() {        // 패가 줄에 끌려 올라가고 → 커튼이 양옆 위로 걷힌다
      hang.classList.add('up'); await wait(T.rise);
      op.classList.remove('closed'); op.classList.add('opening'); await wait(T.open);
      op.classList.remove('opening'); op.classList.add('open');
    }
    async function closeToGate() {           // 커튼이 양옆에서 닫히고 → '무대 뒤' 표가 내려온다
      setSign('gate'); hang.classList.add('up');
      op.classList.remove('open'); op.classList.add('closed'); await wait(T.close);
      hang.classList.remove('up'); await wait(T.drop);
    }
    async function run(fn, next) {
      if (C.busy) return; C.busy = true; UI.busy = true;
      await fn(); C.state = next; C.busy = false; UI.busy = next !== 'play';
    }
    // dir: +1 = 휠 내림(닫기 쪽으로), -1 = 휠 올림(열기 쪽으로)
    function step(dir) {
      if (C.busy) return;
      const s = C.state;
      if (dir > 0 && s === 'play' && !UI.dismiss) run(closeToGate, 'gate');
      else if (dir < 0 && s === 'gate') run(openFromClosed, 'play');
      else if (dir < 0 && s === 'book') run(async () => { book.classList.remove('up'); await wait(700); }, 'gate');
    }
    C.step = step;
    sign.onclick = e => {
      e.stopPropagation();
      if (C.busy) return;
      if (C.state === 'title') run(openFromClosed, 'play');
      else if (C.state === 'gate') run(async () => { book.classList.add('up'); await wait(700); }, 'book');
    };
    op.onclick = () => { if (C.state === 'title') sign.onclick({ stopPropagation() {} }); };

    // 휠: 한 번 굴릴 때 한 단계 (애니메이션 중에는 무시)
    let lastWheel = 0;
    addEventListener('wheel', e => {
      if (C.state === 'play' && (UI.dismiss || document.querySelector('.closeup, .scrim'))) return; // 창이 열려 있을 땐 무시
      const now = Date.now();
      if (Math.abs(e.deltaY) < 4) return;
      e.preventDefault();
      if (now - lastWheel < 450) return;
      lastWheel = now;
      step(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });

    // 시작 화면
    setSign('logo');
    UI.busy = true;
    UI.dismiss = null;
    // 시작 화면에서 Enter/Space 로도 막을 올릴 수 있다
    addEventListener('keydown', e => {
      if (C.state === 'title' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sign.onclick({ stopPropagation() {} }); }
    });
    C.busy = false;
  };
})();
