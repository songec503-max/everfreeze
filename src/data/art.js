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
    WORLD_MAP: { el: {
      'go-gw': [480, 335, 235], 'go-lm': [905, 365, 200], 'go-rm': [690, 600, 205] } },

    // ===== 로즈메리 =====
    MAP_ROSEMARY: { el: {
      'm-home': [255, 575, 255], 'm-plaza': [505, 540, 285], 'm-lib': [785, 560, 270], 'm-shop': [1040, 590, 250] } },
    RM_HOME: { el: {
      desk: [300, 610, 265], drawer: [670, 612, 190], mirror: [1000, 618, 335] } },
    RM_PLAZA: { el: {
      'plaza-npc': [1010, 612, 300] } },
    RM_LIBRARY_EXT: { el: {
      'lib-notice': [270, 600, 165], aria: [1000, 615, 330] } },
    RM_LIBRARY_READING: { el: {
      ledger: [300, 622, 235], shelf: [640, 600, 380],
      'to-archive': { at: [1000, 604, 345], img: 'RM_LIBRARY_READING-to-archive-locked',
        alt: { if: [{ stageMin: 3 }, { solved: 'P-LEDGER' }], img: 'RM_LIBRARY_READING-to-archive-open' } } } },
    RM_LIBRARY_ARCHIVE: {
      el: { fragments: [330, 622, 170], 'archive-box': [680, 595, 360], 'to-secret': { box: [1058, 258, 104, 304] } },
      // 퍼즐을 풀기 전에는 책장이 비밀 통로를 막고 있다
      deco: [{ img: 'RM_LIBRARY_ARCHIVE-bookcase', at: [1105, 570, 330], showIf: [{ not: { solved: 'P-ARCHIVE' } }] }] },
    RM_LIBRARY_SECRET: { el: {
      journal: [380, 612, 225], 'old-record': [820, 612, 325] } },
    RM_BELLA_SHOP: { el: {
      bella: [235, 620, 320], display: [610, 632, 225], 'ledger-shop': [1000, 628, 172] } },

    // ===== 글렌위버 =====
    MAP_GLENWEAVER: { el: {
      'm-tower': [255, 565, 330], 'm-oaks': [520, 585, 235], 'm-sienna': [790, 565, 255], 'm-house': [1040, 600, 220] } },
    GW_TOWER: { el: {
      birdhouse: [770, 500, 250], 'shift-log': [420, 622, 262] } },
    GW_OAKS: { el: {
      oaks: [260, 620, 320], 'shelf-spin': [640, 565, 330], 'old-thing': [1000, 622, 225] } },
    GW_SIENNA: {
      el: { sienna: [230, 620, 320], rack: [560, 565, 232], cloak: [870, 262, 175], 'workbench-gw': [960, 632, 232] },
      deco: [{ img: 'GW_SIENNA-summer', at: [1040, 252, 150] }] },
    GW_HOUSE: { el: {
      'gw-resident': [560, 620, 330], registry: [960, 405, 235] } },

    // ===== 루미나리아 =====
    MAP_LUMINARIA: { el: {
      'm-light': [255, 565, 300], 'm-atelier': [520, 565, 285], 'm-cafe': [780, 585, 262], 'm-harbor': [1010, 470, 105] } },
    LM_LIGHTHOUSE: { el: {
      noa: [250, 620, 330], mailbox: [560, 622, 300], letter: [1010, 462, 92] } },
    LM_ATELIER: { el: {
      glass: [330, 485, 285], 'workbench-lm': [860, 628, 232] } },
    LM_CAFE: { el: {
      lulu: [420, 622, 320], menu: [650, 622, 280], jelly: [880, 285, 190] } },
    LM_HARBOR: {
      el: { pier: [420, 602, 150], sign: [985, 628, 262] },
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
