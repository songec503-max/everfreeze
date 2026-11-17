/* 장면 + 핫스팟 + 규칙.
   - 좌표는 1280x720 기준 px. (x,y,w,h)
   - 핫스팟 rules 는 위에서부터 검사해 "처음 통과한 규칙"의 do 를 실행한다.
   - intro: 장소 소개 문구. { 단계: 문구 } 로 쓰면 지금 단계 이하에서 가장 높은 단계의 문구가 나온다.
   - 조사(inspect)를 누르면 그 물건의 클로즈업 장면(views.js 의 view)이 열린다. 글로 설명하지 않는다.
   - 아직 상호작용할 수 없는 것(단계 미달·잠김)은 글 없이 화면이 살짝 흔들린다(shake).
   - temp:true 는 임시 요소(힌트 표시를 켜면 점선으로 보임).
   - 배경 이미지는 assets/bg/<장면ID>.png 를 넣고 EF.BG_IMAGES 에 ID 를 적으면 적용된다. */
(function () {
  const EF = window.EF;
  const TX = EF.TEXT;

  // ---------- 배경 헬퍼 ----------
  const room = (wall, floor, at = 66) =>
    `linear-gradient(180deg, ${wall} 0%, ${wall} ${at}%, ${floor} ${at}%, ${floor} 100%)`;
  const sky = (top, bottom, ground, at = 64) =>
    `linear-gradient(180deg, ${top} 0%, ${bottom} ${at}%, ${ground} ${at}%, ${ground} 100%)`;

  // ---------- 핫스팟 헬퍼 ----------
  const hs = (kind, id, label, icon, box, rules, o = {}) =>
    Object.assign({ kind, id, label, icon, x: box[0], y: box[1], w: box[2], h: box[3], rules, temp: false }, o);

  const SHAKE = [{ shake: true }];
  // 잠김 규칙: min(단계 미달) 또는 lock(조건 미충족) → 흔들림
  const lockRule = o => {
    if (o.min) return { if: [{ not: { stageMin: o.min } }], do: SHAKE };
    if (o.lock) return { if: [{ not: o.lock }], do: SHAKE };
    return null;
  };
  // 엔딩 이후: 같은 클로즈업이 열리지만 색이 빠져 있다(모든 것이 멈춘 듯 고요)
  const quiet = (view, icon) => [{ view: view || { kind: 'pic', icon } }];

  // 조사: 클로즈업을 연다. grant 가 있으면 첫 클릭에 증거를 조용히 등록한다.
  function inspect(id, label, icon, box, o) {
    const r = [], lk = lockRule(o), v = [{ view: o.view }];
    if (lk) r.push(lk);
    if (o.grant) {
      r.push({ if: [{ has: o.grant }], do: v });
      r.push({ if: [{ ended: true }], do: quiet(o.view) });
      r.push({ do: [...v, { grant: o.grant }] });
    } else r.push({ do: v });
    return hs('inspect', id, label, icon, box, r, { temp: o.temp !== false, showIf: o.showIf });
  }

  // 퍼즐: 풀고 나면 view(풀린 모습)를 클로즈업으로 다시 볼 수 있다.
  function puzzle(id, label, icon, box, pid, o = {}) {
    const r = [], lk = lockRule(o);
    if (lk) r.push(lk);
    r.push({ if: [{ solved: pid }], do: [{ view: EF.PUZZLES[pid].view }] });
    r.push({ if: [{ ended: true }], do: quiet(null, icon) });
    r.push({ do: [{ puzzle: pid }] });
    return hs('puzzle', id, label, icon, box, r, { temp: o.temp !== false, showIf: o.showIf });
  }

  const npc = (id, label, icon, box, npcId, o = {}) =>
    hs('npc', id, label, icon, box, o.rules || [{ do: [{ say: npcId }] }], { temp: !!o.temp });

  const move = (id, label, icon, box, to, o = {}) =>
    hs('move', id, label, icon, box, o.rules || [{ do: [{ go: to }] }], { temp: !!o.temp, showIf: o.showIf });

  // ---------- 장면 ----------
  // 배경 이미지를 넣은 장면 ID 를 여기에 적으면 assets/bg/<ID>.png 가 사용된다. 예: ['RM_HOME']
  EF.BG_IMAGES = [];
  // 오작동 배경(선택): 4단계부터 assets/bg/<ID>_err.png 를 쓴다. 넣은 장면 ID 를 적는다. 없으면 CSS 색 효과만.
  EF.BG_ERR_IMAGES = [];

  const S = (EF.SCENES = {});
  const add = s => (S[s.id] = s);

  // ===== 월드맵 =====
  add({
    id: 'WORLD_MAP', name: '월드맵', kind: 'world', bg: sky('#cfe3f5', '#eaf0e6', '#d8e6c8', 55),
    intro: { 1: '세 마을이 하나의 섬 위에 모여 있다. 가고 싶은 마을을 눌러 보세요.', 3: '세 마을이 하나의 섬 위에 모여 있다. 바다 건너는 늘 안개 낀 것처럼 흐릿하다.', 5: '세 마을이 하나의 섬 위에 멈춰 있다.' },
    hotspots: [
      // 배치: 섬 지도 기준 — 글렌위버 북서쪽 숲, 루미나리아 북동쪽 해안(항구), 로즈메리 남쪽 가운데
      move('go-gw', '글렌위버', '🍂', [400, 105, 225, 175], 'MAP_GLENWEAVER'),
      move('go-lm', '루미나리아', '🐚', [745, 140, 240, 180], 'MAP_LUMINARIA'),
      move('go-rm', '로즈메리', '🌿', [610, 410, 230, 180], 'MAP_ROSEMARY')
    ]
  });

  // ===== 마을 지도 =====
  add({
    id: 'MAP_ROSEMARY', name: '로즈메리', kind: 'map', parent: 'WORLD_MAP', village: '로즈메리',
    bg: sky('#e6def2', '#eef0e4', '#cfe3c2'),
    intro: { 1: '장밋빛 지붕이 가지런한 로즈메리. 시계탑 종소리에 맞춰 하루가 흘러간다.', 3: '장밋빛 지붕이 가지런한 로즈메리. 종소리가 오늘도 같은 때에 울린다. 어제도, 그제도.', 5: '장밋빛 지붕이 가지런한 로즈메리. 종소리가 더는 울리지 않는다.' },
    hotspots: [
      move('m-home', '클로버의 집', '🏠', [110, 270, 220, 170], 'RM_HOME', { temp: true }),
      move('m-plaza', '광장 · 시계탑', '⏰', [370, 150, 240, 210], 'RM_PLAZA', { temp: true }),
      move('m-lib', '도서관', '📚', [670, 240, 240, 190], 'RM_LIBRARY_EXT'),
      move('m-shop', '벨라의 잡화점', '🛒', [950, 270, 220, 170], 'RM_BELLA_SHOP')
    ]
  });
  add({
    id: 'MAP_GLENWEAVER', name: '글렌위버', kind: 'map', parent: 'WORLD_MAP', village: '글렌위버',
    bg: sky('#f6e6c8', '#f1ecd2', '#b9c99a'),
    intro: { 1: '숲과 나무가 지붕이 되는 마을, 글렌위버. 새들이 낮과 밤을 교대로 지킨다.', 3: '숲과 나무가 지붕이 되는 마을, 글렌위버. 새들의 노래가 매번 같은 마디에서 끊긴다.', 5: '숲과 나무가 지붕이 되는 마을, 글렌위버. 새들이 날갯짓을 멈춘 채 떠 있다.' },
    hotspots: [
      move('m-tower', '주야 교대 새집 탑', '🐦', [110, 160, 250, 230], 'GW_TOWER'),
      move('m-oaks', '나이테 회전형 만물상', '🌳', [400, 260, 260, 190], 'GW_OAKS'),
      move('m-sienna', '시에나의 계절 망토 공방', '🧵', [700, 200, 260, 190], 'GW_SIENNA'),
      move('m-house', '마을 주택', '🏡', [990, 290, 190, 160], 'GW_HOUSE', { temp: true })
    ]
  });
  add({
    id: 'MAP_LUMINARIA', name: '루미나리아', kind: 'map', parent: 'WORLD_MAP', village: '루미나리아',
    bg: sky('#cfeaf0', '#e4f2ef', '#efe5d2'),
    intro: { 1: '바닷바람과 진주빛이 머무는 루미나리아. 바다거북이 편지를 싣고 오간다.', 3: '바닷바람과 진주빛이 머무는 루미나리아. 파도가 같은 모양으로 밀려왔다가 같은 모양으로 돌아간다.', 5: '바닷바람과 진주빛이 머무는 루미나리아. 파도가 밀려오다 만 채 멈춰 있다.' },
    hotspots: [
      move('m-light', '바다거북 우체국 등대', '🗼', [110, 140, 250, 260], 'LM_LIGHTHOUSE'),
      move('m-atelier', '펄 루미너스 아틀리에', '🔮', [400, 250, 260, 190], 'LM_ATELIER'),
      move('m-cafe', '루루의 카페', '☕', [700, 270, 240, 170], 'LM_CAFE'),
      move('m-harbor', '항구', '⚓', [980, 300, 200, 160], 'LM_HARBOR', { temp: true })
    ]
  });

  // ===== 로즈메리 =====
  add({
    id: 'RM_HOME', name: '클로버의 집', kind: 'location', parent: 'MAP_ROSEMARY', village: '로즈메리',
    bg: room('#f4e4d4', '#c9a27e'), intro: { 1: '클로버가 사는 아늑한 집. 모든 것이 제자리에 있다.', 3: '클로버가 사는 아늑한 집. 모든 것이 제자리에 있다. 어제 옮겨 둔 것까지도, 원래 자리로.', 5: '클로버가 사는 아늑한 집. 모든 것이 제자리에 있다. 앞으로도 영원히.' },
    hotspots: [
      inspect('desk', '책상', '📝', [120, 300, 260, 150], { view: 'v-desk', grant: 'O-04' }),
      puzzle('drawer', '서랍', '🗄️', [470, 330, 220, 150], 'P-DRAWER'),
      inspect('mirror', '거울', '🪞', [820, 160, 170, 300], { view: 'v-mirror' })
    ]
  });

  add({
    id: 'RM_PLAZA', name: '광장 · 시계탑', kind: 'location', parent: 'MAP_ROSEMARY', village: '로즈메리',
    bg: sky('#d8e8f5', '#eef2ec', '#d9d2c0'), intro: { 1: '마을 한가운데 시계탑이 서 있는 광장. 오후 1시의 햇살이 따뜻하다.', 3: '마을 한가운데 시계탑이 서 있는 광장. 햇살은 오늘도 오후 1시의 각도로 비춘다.', 5: '시계탑 아래 광장. 그림자가 움직이지 않는다.' },
    hotspots: [
      inspect('clock', '시계', '🕰️', [150, 120, 230, 300], { view: 'v-clock', grant: 'R-01' }),
      inspect('board', '게시판', '📌', [520, 260, 230, 180], { min: 2, view: 'v-board', grant: 'R-04' }),
      npc('plaza-npc', '주민', '🧑', [860, 280, 150, 200], 'resident', { temp: true })
    ]
  });

  // --- 도서관(외부) + 하위 장소 3곳 ---
  add({
    id: 'RM_LIBRARY_EXT', name: '도서관', kind: 'location', parent: 'MAP_ROSEMARY', village: '로즈메리',
    bg: sky('#e0d6ee', '#ebe6dd', '#c9d8b5'), intro: { 1: '조용한 기록의 공간. 입구 앞에 아리아가 서 있다.', 2: '도서관 문이 조금 열려 있다. 아리아가 미소 짓고 있다.', 4: '아리아가 같은 자리에 서 있다. 처음부터 한 걸음도 움직이지 않은 것처럼.', 5: '도서관 문 앞, 아리아가 미소 지은 채 멈춰 있다.' },
    hotspots: [
      inspect('lib-notice', '출입 제한 안내문', '📄', [170, 330, 190, 140], { view: 'v-libnotice', grant: 'LIB-BLOCK' }),
      hs('move', 'lib-door', '도서관 문', '🚪', [470, 200, 260, 280], [
        { if: [{ stageMin: 2 }], do: [{ go: 'RM_LIBRARY_READING' }] },
        { if: [{ has: 'LIB-BLOCK' }], do: [{ say: 'aria', ctx: '출입 차단' }] },
        { do: [{ say: 'aria', ctx: '출입 차단' }, { grant: 'LIB-BLOCK' }] }
      ]),
      npc('aria', '아리아', '👤', [820, 250, 150, 230], 'aria', {
        rules: [
          { if: [{ flag: 'ariaConfronted' }], do: [{ say: 'aria', ctx: '대화' }] },
          { if: [{ deduced: 'FINAL-01' }, { stageMin: 4 }, { notEnded: true }],
            do: [{ say: 'aria', ctx: '대면' }, { flag: 'ariaConfronted' }] },
          { if: [{ stageMin: 2 }], do: [{ say: 'aria', ctx: '대화' }] },
          { do: [{ say: 'aria', ctx: '출입 차단' }] }
        ]
      })
    ]
  });

  add({
    id: 'RM_LIBRARY_READING', name: '도서관 열람실', kind: 'location', parent: 'RM_LIBRARY_EXT', village: '로즈메리',
    bg: room('#d9cdb8', '#8d6e55'), intro: { 1: '책이 빼곡한 열람실. 종이 냄새가 난다.', 3: '책이 빼곡한 열람실. 몇 권은 펼칠 때마다 같은 쪽이 펼쳐진다.', 5: '책이 빼곡한 열람실. 책장을 넘겨도 다음 장이 나오지 않는다.' },
    hotspots: [
      puzzle('ledger', '대출 장부', '📒', [130, 330, 220, 140], 'P-LEDGER'),
      inspect('shelf', '책장', '📚', [440, 150, 260, 320], { view: 'v-book' }),
      // 3단계 + 대출 장부 퍼즐을 풀어야 열린다. 아니면 흔들림.
      hs('move', 'to-archive', '자료 보관실 문', '🔒', [850, 190, 200, 280], [
        { if: [{ stageMin: 3 }, { solved: 'P-LEDGER' }], do: [{ go: 'RM_LIBRARY_ARCHIVE' }] },
        { do: SHAKE }
      ])
    ]
  });

  add({
    id: 'RM_LIBRARY_ARCHIVE', name: '자료 보관실', kind: 'location', parent: 'RM_LIBRARY_READING', village: '로즈메리',
    // 기록 조각 퍼즐을 풀면 비밀 통로가 열린 그림(assets/bg/RM_LIBRARY_ARCHIVE_open.png)으로 바뀐다
    bgAlt: { if: [{ solved: 'P-ARCHIVE' }], id: 'RM_LIBRARY_ARCHIVE_open' },
    bg: room('#b9ad99', '#6f5a48'), intro: { 1: '오래된 자료가 잠든 곳. 공기가 차갑다.', 4: '오래된 자료가 잠든 곳. 누군가 방금 전까지 여기 있었던 것 같다.', 5: '오래된 자료가 잠든 곳. 먼지조차 내려앉지 않는다.' },
    hotspots: [
      puzzle('fragments', '기록 조각', '🧩', [150, 320, 240, 150], 'P-ARCHIVE'),
      inspect('archive-box', '보관함', '🗃️', [480, 230, 230, 240], { view: 'v-archivebox' }),
      move('to-secret', '비밀 기록실 출입구', '🕳️', [850, 200, 200, 270], 'RM_LIBRARY_SECRET', {
        showIf: [{ solved: 'P-ARCHIVE' }] })
    ]
  });

  add({
    id: 'RM_LIBRARY_SECRET', name: '비밀 기록실', kind: 'location', parent: 'RM_LIBRARY_ARCHIVE', village: '로즈메리',
    bg: room('#5b5268', '#3b3446'), intro: { 1: '숨겨진 기록이 남은 방. 아무도 오지 않은 지 오래된 듯하다.', 4: '아무도 오지 않은 방인데, 의자에 아직 온기가 남아 있다.', 5: '숨겨진 기록이 남은 방. 더는 아무것도 적히지 않는다.' },
    hotspots: [
      inspect('journal', '관찰일지', '📓', [200, 290, 230, 170], { view: 'v-journal', grant: 'C-03' }),
      puzzle('old-record', '오래된 기록', '📜', [600, 240, 260, 220], 'P-OLDREC', { min: 4 })
    ]
  });

  add({
    id: 'RM_BELLA_SHOP', name: '벨라의 잡화점', kind: 'location', parent: 'MAP_ROSEMARY', village: '로즈메리',
    bg: room('#f1ddc0', '#b98f6a'), intro: { 1: '없는 게 없는 작은 잡화점. 벨라가 가게를 지킨다.', 3: '없는 게 없는 작은 잡화점. 선반 위 물건의 수가 매일 정확히 같다.', 5: '없는 게 없는 작은 잡화점. 오르골 소리가 한 음에서 멈춰 있다.' },
    hotspots: [
      npc('bella', '벨라', '🧑‍🌾', [150, 260, 160, 220], 'bella'),
      inspect('display', '진열대', '🧺', [560, 300, 220, 160], { view: 'v-display', grant: 'O-01' }),
      inspect('ledger-shop', '장부', '📖', [870, 310, 200, 130], { view: 'v-shopledger', grant: 'R-03' })
    ]
  });

  // ===== 글렌위버 =====
  add({
    id: 'GW_TOWER', name: '주야 교대 새집 탑', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#cfd9ee', '#8c8f7a'), intro: { 1: '낮과 밤이 교대하는 새집 탑. 새들이 시간에 맞춰 들고 난다.', 3: '낮과 밤이 교대하는 새집 탑. 새들이 들고 나는 순서가 단 한 번도 바뀌지 않는다.', 5: '새집 탑. 낮도 밤도 교대하지 않는다.' },
    hotspots: [
      puzzle('birdhouse', '새집 장치', '🐦', [170, 160, 260, 300], 'P-BIRDHOUSE', { min: 2 }),
      inspect('shift-log', '교대 기록', '📋', [620, 300, 240, 160], { view: 'v-shiftlog', grant: 'C-01' })
    ]
  });

  add({
    id: 'GW_OAKS', name: '나이테 회전형 만물상', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#e8d8b4', '#9b7b52'), intro: { 1: '나이테 모양 선반이 천천히 도는 만물상.', 3: '나이테 모양 선반이 천천히 도는 만물상. 선반은 돌고 있지만 나이테는 늘어나지 않는다.', 5: '나이테 만물상. 선반이 멈춰 있다.' },
    hotspots: [
      npc('oaks', '오크스', '🧔', [130, 260, 150, 220], 'oaks'),
      puzzle('shelf-spin', '회전 선반', '🌀', [420, 170, 260, 300], 'P-SHELF', { min: 3 }),
      inspect('old-thing', '오래된 물건', '🪵', [800, 320, 220, 140], { view: 'v-oldthing', grant: 'O-03' })
    ]
  });

  add({
    id: 'GW_SIENNA', name: '시에나의 계절 망토 공방', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#f2d9d3', '#b88f7a'), intro: { 1: '계절마다 다른 망토를 짓는 공방.', 3: '계절마다 다른 망토를 짓는 공방. 걸린 망토는 많은데 완성된 것은 하나도 없다.', 5: '계절 망토 공방. 바늘이 일곱 번째 땀에 꽂힌 채 멈춰 있다.' },
    hotspots: [
      npc('sienna', '시에나', '👩‍🎨', [130, 270, 150, 210], 'sienna'),
      inspect('cloak', '망토', '🧥', [400, 190, 230, 280], { view: 'v-cloak' }),
      inspect('workbench-gw', '작업대', '🪡', [760, 320, 260, 150], { min: 3, view: 'v-workbench', grant: 'R-08' })
    ]
  });

  add({
    id: 'GW_HOUSE', name: '마을 주택', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#efe5cf', '#c3a77f'), intro: { 1: '숲속 마을의 평범한 집. 찻물 끓는 소리가 난다.', 3: '숲속 마을의 평범한 집. 찻물 끓는 소리가 난다. 아까부터 계속.', 5: '숲속 마을의 평범한 집. 찻물 끓는 소리마저 멈췄다.' },
    hotspots: [
      npc('gw-resident', '주민', '🧑', [520, 260, 150, 220], 'resident', { temp: true }),
      inspect('registry', '주민 명부', '📜', [860, 230, 220, 230], { view: 'v-registry' })
    ]
  });

  // ===== 루미나리아 =====
  add({
    id: 'LM_LIGHTHOUSE', name: '바다거북 우체국 등대', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: room('#d3ebf0', '#e3d7bd'), intro: { 1: '바다거북이 지키는 우체국 등대. 편지 냄새와 바다 냄새가 섞여 있다.', 3: '바다거북이 지키는 우체국 등대. 우편함은 비워도 비워도 같은 무게로 차 있다.', 5: '우체국 등대. 등대 불빛이 한 방향을 비춘 채 멈춰 있다.' },
    hotspots: [
      npc('noa', '노아', '🧑‍✈️', [130, 270, 150, 210], 'noa'),
      puzzle('mailbox', '우편함', '📮', [420, 280, 200, 180], 'P-MAILBOX', { min: 3 }),
      puzzle('letter', '편지', '✉️', [780, 320, 200, 130], 'P-LETTER', { min: 4 })
    ]
  });

  add({
    id: 'LM_ATELIER', name: '펄 루미너스 아틀리에', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: room('#e9e4f4', '#c9bfd9'), intro: { 1: '진주빛 유리가 빛나는 아틀리에.', 4: '진주빛 유리가 빛나는 아틀리에. 유리 조각들이 무언가를 기다리듯 작업대 위에 놓여 있다.', 5: '진주빛 아틀리에. 유리 속 장면이 이쪽을 바라보고 있다.' },
    hotspots: [
      inspect('glass', '유리 작품', '🔮', [160, 170, 250, 300], { view: 'v-glassart' }),
      // 아리아와 마주한 뒤에만 열린다. 그 전에는 흔들림.
      puzzle('workbench-lm', '작업대', '🛠️', [640, 300, 280, 160], 'P-ATELIER', { lock: { flag: 'ariaConfronted' } })
    ]
  });

  add({
    id: 'LM_CAFE', name: '루루의 카페', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: room('#d6f0f1', '#a8d0cf'), intro: { 1: '해파리 조명이 떠다니는 카페. 달콤한 냄새가 난다.', 3: '해파리 조명이 떠다니는 카페. 조명이 손님보다 먼저 자리를 찾아간다.', 5: '해파리 카페. 조명이 빛을 머금은 채 멈춰 있다.' },
    hotspots: [
      npc('lulu', '루루', '👩‍🍳', [130, 270, 150, 210], 'lulu'),
      inspect('menu', '메뉴판', '🍵', [400, 190, 200, 200], { view: 'v-menu' }),
      inspect('jelly', '해파리 조명', '🪼', [760, 100, 240, 280], { view: 'v-jelly', grant: 'C-02' })
    ]
  });

  add({
    id: 'LM_HARBOR', name: '항구', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: sky('#cfe6f2', '#9ec6dc', '#e6d9bd', 55), intro: { 1: '배가 드나드는 작은 항구. 배는 늘 정시에 들어온다.', 3: '배가 드나드는 작은 항구. 늘 같은 배가, 아무도 태우지 않은 채 들어온다.', 5: '작은 항구. 배가 수평선에 걸린 채 멈춰 있다.' },
    hotspots: [
      inspect('pier', '선착장', '⛵', [200, 320, 260, 150], { view: 'v-pier', grant: 'O-02' }),
      inspect('sign', '표지판', '🪧', [720, 280, 180, 190], { view: 'v-sign' })
    ]
  });
})();
