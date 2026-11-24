/* 그림 배치 (배경 위에 클릭 요소 · 장식, 그 위에 마을 커튼)
   좌표는 그림 창 1280×720 기준. 요소는 [가운데 x, 바닥 y, 높이] 로 놓고, 너비는 그림 비율로 정해진다.
   - el:   클릭 요소 (scenes.js 의 핫스팟 id 와 같은 이름). 그림 파일 assets/el/<장면>-<id>.webp
           alt: { if: [조건], img: '다른 그림' } 이면 조건이 맞을 때 그 그림으로 바뀐다 (예: 잠긴 문 → 열린 문)
           box: [x, y, w, h] 를 주면 누르는 영역만 따로 정한다 (그림 없이 배경 속 통로 등)
   - deco: 누를 수 없는 장식. showIf 조건이 있으면 그때만 보인다.
   그림 파일이 없으면 그 요소는 지금처럼 임시 아이콘으로 보인다. */
(function () {
  const EF = window.EF;
  const CURTAIN = { '로즈메리': 'curtain-rosemary', '글렌위버': 'curtain-glenweaver', '루미나리아': 'curtain-luminaria' };
  EF.curtainFor = sc => (sc.kind === 'world' ? 'curtain-world' : CURTAIN[sc.village]);

  EF.ART = {
    // 마을 위치: 로즈메리 왼쪽 · 글렌위버 가운데 위 · 루미나리아 오른쪽
    WORLD_MAP: { el: {
      'go-rm': [330, 520, 165], 'go-gw': [628, 352, 200], 'go-lm': [930, 492, 160] } },

    // ===== 로즈메리 =====
    MAP_ROSEMARY: { el: {
      // 클로버의 집 왼쪽 · 시계탑 가운데 왼쪽 · 도서관은 뒤쪽(위)에서 잡화점과 조금 겹치게 · 잡화점 오른쪽 앞
      'm-home': [240, 562, 250], 'm-plaza': [505, 545, 290], 'm-lib': [860, 495, 250], 'm-shop': [1010, 592, 245] } },
    RM_HOME: { el: {
      desk: [320, 610, 265], drawer: [670, 612, 190], mirror: [990, 618, 335] } },
    RM_PLAZA: { el: {   // 시계탑 가운데 · 게시판 왼쪽 · 주민1 오른쪽
      clock: [640, 575, 400], board: [320, 618, 225], 'plaza-npc': [960, 640, 345] } },
    RM_LIBRARY_EXT: { el: {   // 문은 도서관 입구 자리에 꼭 맞게
      'lib-notice': [300, 615, 165], 'lib-door': [640, 503, 128], aria: [960, 640, 370] } },
    RM_LIBRARY_READING: { el: {
      ledger: [320, 622, 235], shelf: [640, 615, 445],
      'to-archive': { at: [1005, 610, 410], img: 'RM_LIBRARY_READING-to-archive-locked',
        alt: { if: [{ stageMin: 3 }, { solved: 'P-LEDGER' }], img: 'RM_LIBRARY_READING-to-archive-open' } } } },
    RM_LIBRARY_ARCHIVE: {
      el: { fragments: [340, 622, 170], 'archive-box': [670, 595, 360], 'to-secret': { box: [1058, 258, 104, 304] } },
      deco: [{ img: 'RM_LIBRARY_ARCHIVE-bookcase', at: [1105, 570, 330], showIf: [{ not: { solved: 'P-ARCHIVE' } }] }] },
    RM_LIBRARY_SECRET: { el: {
      journal: [400, 612, 225], 'old-record': [820, 612, 325] } },
    RM_BELLA_SHOP: { el: {
      bella: [270, 640, 360], display: [620, 632, 225], 'ledger-shop': [990, 628, 172] } },

    // ===== 글렌위버 ===== (집들은 땅 위에 서도록 조금 위로)
    MAP_GLENWEAVER: { el: {
      'm-tower': [280, 515, 320], 'm-oaks': [525, 535, 230], 'm-sienna': [785, 518, 250], 'm-house': [1010, 548, 215] } },
    GW_TOWER: { el: {   // 레버 장치는 화면 가운데
      birdhouse: [640, 470, 245], 'shift-log': [300, 625, 262] } },
    GW_OAKS: { el: {    // 회전 선반은 화면 가운데
      oaks: [290, 640, 360], 'shelf-spin': [640, 525, 330], 'old-thing': [990, 622, 225] } },
    GW_SIENNA: {
      el: { sienna: [270, 640, 360], rack: [580, 575, 240], cloak: [860, 262, 165], 'workbench-gw': [960, 640, 235] },
      deco: [{ img: 'GW_SIENNA-summer', at: [1030, 250, 140] }] },
    GW_HOUSE: { el: {   // 명부는 나무 기둥을 비켜 오른쪽으로
      'gw-resident': [560, 640, 370], registry: [1000, 405, 230] } },

    // ===== 루미나리아 ===== (카페 왼쪽 · 등대 가운데)
    MAP_LUMINARIA: { el: {
      'm-cafe': [300, 585, 255], 'm-atelier': [540, 565, 280], 'm-light': [790, 565, 300], 'm-harbor': [985, 470, 100] } },
    LM_LIGHTHOUSE: { el: {   // 우편함 왼쪽 · 노아 가운데 · 편지는 계산대 위에 비스듬히
      mailbox: [300, 625, 300], noa: [580, 640, 370], letter: { at: [985, 474, 78], rot: -14 } } },
    LM_ATELIER: { el: {      // 유리 작품은 왼쪽 창틀 위에 · 작업대는 바닥 가운데
      glass: [320, 548, 250], 'workbench-lm': [790, 648, 255] } },
    LM_CAFE: { el: {         // 메뉴판은 루루 왼쪽
      menu: [330, 636, 270], lulu: [530, 640, 360], jelly: [880, 285, 190] } },
    LM_HARBOR: {
      el: { pier: [430, 602, 150], sign: [960, 628, 262] },
      deco: [{ img: 'LM_HARBOR-boat', at: [760, 440, 160] }, { img: 'LM_HARBOR-turtle', at: [330, 478, 74] }] }
  };

  // 클로즈업 · 인물 그림 (assets/view, assets/npc 에 파일이 있으면 자동으로 쓴다. 예전 .png 목록도 그대로 받는다)
  EF.viewImg = id => (EF.artHas('view/' + id) ? EF.artSrc('view/' + id) : (EF.VIEW_IMAGES || []).includes(id) ? `assets/view/${id}.png` : null);
  EF.npcImg = id => (EF.artHas('npc/' + id) ? EF.artSrc('npc/' + id) : (EF.NPC_IMAGES || []).includes(id) ? `assets/npc/${id}.png` : null);
  EF.sceneBgSrc = () => { const sc = EF.SCENES[EF.state.scene]; return sc && EF.artHas('bg/' + sc.id) ? EF.artSrc('bg/' + sc.id) : null; };
  // 클로즈업 · 대화 뒤에 깔리는 흐린 장면 배경
  EF.blurBg = () => { const d = document.createElement('div'); d.className = 'cu-blur'; const s = EF.sceneBgSrc(); if (s) d.style.backgroundImage = `url(${s})`; return d; };
  // 단계별 사이트 배경: assets/page/page-stage<N>.webp
  EF.pageBg = stg => { for (let n = stg; n >= 1; n--) if (EF.artHas('page/page-stage' + n)) return EF.artSrc('page/page-stage' + n); return null; };

  // 있는 그림인지 · 비율
  EF.artHas = key => !!(EF.ART_FILES && EF.ART_FILES[key]);
  EF.artSrc = key => `assets/${key}.webp`;
  // [가운데 x, 바닥 y, 높이] → {x, y, w, h}
  EF.artBox = (key, at) => {
    const s = EF.ART_FILES[key], h = at[2], w = Math.round(h * s[0] / s[1]);
    return { x: Math.round(at[0] - w / 2), y: at[1] - h, w, h };
  };
})();

/* 로고 · 앰블럼 (assets/brand/logo.webp · emblem.webp 가 있으면 자동으로 쓴다)
   - 로고: 첫 화면 커튼 앞에 매달린 표지판 · 사이트 머리글
   - 앰블럼: 머리글 양옆 · 설명 칸 귀퉁이 · 바닥글 장식 */
(function () {
  const EF = window.EF;
  EF.applyBrand = function () {
    const logo = EF.artHas('brand/logo') && EF.artSrc('brand/logo'), emb = EF.artHas('brand/emblem') && EF.artSrc('brand/emblem');
    const mk = (src, cls, alt) => { const i = document.createElement('img'); i.src = src; i.className = cls; i.alt = alt || ''; i.draggable = false; return i; };
    if (logo) {
      document.querySelectorAll('.sign.logo .logo-txt').forEach(t => t.replaceWith(mk(logo, 'logo-img', 'EVERFREEZE')));
      const ml = document.querySelector('#masthead .logo');
      if (ml && !ml.querySelector('img')) { ml.textContent = ''; ml.append(mk(logo, 'logo-img mast', 'EVERFREEZE')); }
      document.body.classList.add('has-logo');
    }
    if (emb) {
      const mh = document.getElementById('masthead');
      if (mh && !mh.querySelector('.emblem')) { mh.append(mk(emb, 'emblem mast-l'), mk(emb, 'emblem mast-r')); }
      const cap = document.getElementById('caption'); if (cap && !cap.querySelector('.emblem')) cap.append(mk(emb, 'emblem cap'));
      const ft = document.getElementById('foot'); if (ft && !ft.querySelector('.emblem')) ft.prepend(mk(emb, 'emblem foot'));
      const bs = document.querySelector('.bs-head'); if (bs && !bs.querySelector('.emblem')) bs.prepend(mk(emb, 'emblem bs'));
    }
  };
})();
