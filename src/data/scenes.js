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
    intro: { 1: '로즈메리, 글렌위버, 루미나리아. 세 마을이 모여 있는 지도.', 3: '세 마을은 지도 위 같은 자리에 있다. 바다의 윤곽만 조금 어긋나 있다.', 5: '세 마을은 제자리에 있다. 마을 사이의 풍경이 종이처럼 찢겨 있다.' },
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
    intro: { 1: '장밋빛 지붕이 가지런한 로즈메리. 광장 한가운데 시계탑이 서 있다.', 3: '시계탑 종이 울린다. 바늘은 아직 그 시각에 닿지 않았다.', 5: '시계탑의 문자판이 옆으로 밀려 있다. 종소리는 한참 뒤에 들린다.' },
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
    intro: { 1: '오래된 나무에 둘러싸인 글렌위버. 낮과 밤이 바뀌면 숲에서 들려오는 소리도 달라진다.', 3: '숲의 노래가 매번 같은 마디에서 끊긴다.', 5: '숲에서는 낮의 지저귐과 밤의 울음소리가 한꺼번에 들린다.' },
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
    intro: { 1: '바다거북이 편지를 싣고 오가는 항구 마을. 밤이면 바다가 진주빛으로 물든다.', 3: '파도가 같은 모양으로 밀려왔다가 같은 모양으로 돌아간다.', 5: '바다에는 파도가 두 겹으로 겹쳐 있다. 두 파도가 서로 다른 방향으로 밀려온다.' },
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
    bg: room('#f4e4d4', '#c9a27e'), intro: { 1: '클로버가 사는 아늑한 집. 모든 것이 제자리에 있다.', 3: '분명 옮겨 둔 물건까지 원래 자리에 돌아와 있다.', 5: '옮겨 둔 물건이 원래 자리에도 있다.' },
    hotspots: [
      inspect('desk', '책상', '📝', [120, 300, 260, 150], { view: 'v-desk', grant: 'O-04' }),
      puzzle('drawer', '서랍', '🗄️', [470, 330, 220, 150], 'P-DRAWER'),
      inspect('mirror', '거울', '🪞', [820, 160, 170, 300], { view: 'v-mirror' })
    ]
  });

  add({
    id: 'RM_PLAZA', name: '광장 · 시계탑', kind: 'location', parent: 'MAP_ROSEMARY', village: '로즈메리',
    bg: sky('#d8e8f5', '#eef2ec', '#d9d2c0'), intro: { 1: '시계탑이 서 있는 마을 광장. 어느 골목에서 돌아와도 탑이 보인다.', 3: '시계판의 테두리가 한쪽으로 밀려 있다. 눈을 떼었다 봐도 그대로다.', 5: '시계판이 두 겹으로 어긋나 있다. 탑 아래 광장 바닥에는 틈이 벌어져 있다.' },
    hotspots: [
      inspect('clock', '시계', '🕰️', [150, 120, 230, 300], { view: 'v-clock', grant: 'R-01' }),
      inspect('board', '게시판', '📌', [520, 260, 230, 180], { min: 2, view: 'v-board', grant: 'R-04' }),
      npc('plaza-npc', '주민1', '🧑', [860, 280, 150, 200], 'resident1', { temp: true })
    ]
  });

  // --- 도서관(외부) + 하위 장소 3곳 ---
  add({
    id: 'RM_LIBRARY_EXT', name: '도서관', kind: 'location', parent: 'MAP_ROSEMARY', village: '로즈메리',
    bg: sky('#e0d6ee', '#ebe6dd', '#c9d8b5'), intro: { 1: '마을의 기록이 모인 도서관.', 2: '마을의 책과 자료가 모여 있는 조용한 곳. 도서관 입구에 다가서면, 문 너머의 소리까지 잦아드는 듯하다.', 3: '도서관의 문과 문틀이 조금 어긋나 있다.', 5: '도서관 문이 두 겹으로 보인다. 한쪽 문만 문틀에서 비껴나 있다.' },
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
    bg: room('#d9cdb8', '#8d6e55'), intro: { 1: '책이 빼곡한 열람실. 책을 펼치면 종이 냄새가 난다.', 3: '방금 덮은 책을 다시 펼쳤다. 같은 쪽이 나온다.', 5: '다른 책을 펼쳐도 같은 문장이 나온다.' },
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
    bg: room('#b9ad99', '#6f5a48'), intro: { 1: '오래된 자료를 모아 둔 보관실. 서류가 선반마다 정리되어 있다.', 3: '서류 사이에 빈자리가 있다. 그 자리만 먼지가 묻어 있지 않다.', 5: '선반의 서류가 서로 다른 자리에 겹쳐 보인다. 빈자리만 그대로다.' },
    hotspots: [
      puzzle('fragments', '기록 조각', '🧩', [150, 320, 240, 150], 'P-ARCHIVE'),
      inspect('archive-box', '보관함', '🗃️', [480, 230, 230, 240], { view: 'v-archivebox' }),
      move('to-secret', '비밀 기록실 출입구', '🕳️', [850, 200, 200, 270], 'RM_LIBRARY_SECRET', {
        showIf: [{ solved: 'P-ARCHIVE' }] })
    ]
  });

  add({
    id: 'RM_LIBRARY_SECRET', name: '비밀 기록실', kind: 'location', parent: 'RM_LIBRARY_ARCHIVE', village: '로즈메리',
    bg: room('#5b5268', '#3b3446'), intro: { 1: '숨겨진 기록이 남아 있는 방. 문 바깥에서는 보이지 않던 자리다.', 3: '오래 비어 있었던 방처럼 보인다. 의자에는 아직 온기가 남아 있다.', 5: '기록의 마지막 줄이 옅어졌다가 돌아온다. 그 아래는 비어 있다.' },
    hotspots: [
      inspect('journal', '관찰일지', '📓', [200, 290, 230, 170], { view: 'v-journal', grant: 'C-03' }),
      puzzle('old-record', '오래된 기록', '📜', [600, 240, 260, 220], 'P-OLDREC', { min: 4 })
    ]
  });

  add({
    id: 'RM_BELLA_SHOP', name: '벨라의 잡화점', kind: 'location', parent: 'MAP_ROSEMARY', village: '로즈메리',
    bg: room('#f1ddc0', '#b98f6a'), intro: { 1: '벨라가 가게를 지키는 작은 잡화점. 선반마다 생활용품이 놓여 있다.', 3: '비어 있던 선반 자리에 같은 물건이 다시 놓여 있다.', 5: '낡은 오르골에서 한 음이 난다. 곡은 이어지지 않고 그 음만 되풀이된다.' },
    hotspots: [
      npc('bella', '벨라', '🧑‍🌾', [150, 260, 160, 220], 'bella'),
      inspect('display', '진열대', '🧺', [560, 300, 220, 160], { view: 'v-display', grant: 'O-01' }),
      inspect('ledger-shop', '장부', '📖', [870, 310, 200, 130], { view: 'v-shopledger', grant: 'R-03' })
    ]
  });

  // ===== 글렌위버 =====
  add({
    id: 'GW_TOWER', name: '주야 교대 새집 탑', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#cfd9ee', '#8c8f7a'), intro: { 1: '낮에는 작은 동물과 곤충이, 밤에는 야행성 동물들이 새집 탑의 방을 드나든다.', 3: '새가 방을 떠났다. 지저귐은 빈방에서 계속 들린다.', 5: '같은 방에 낮의 새와 밤의 동물이 번갈아 나타난다. 방을 드나드는 소리는 한꺼번에 들린다.' },
    hotspots: [
      puzzle('birdhouse', '새집 장치', '🐦', [170, 160, 260, 300], 'P-BIRDHOUSE', { min: 2 }),
      inspect('shift-log', '교대 기록', '📋', [620, 300, 240, 160], { view: 'v-shiftlog', grant: 'C-01' })
    ]
  });

  add({
    id: 'GW_OAKS', name: '나이테 회전형 만물상', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#e8d8b4', '#9b7b52'), intro: { 1: '오래된 빈 고목 속 만물상. 나이테를 따라 놓인 선반이 천천히 돈다.', 3: '선반이 돌 때마다 같은 도토리 그릇이 눈앞을 지나간다. 그다음 물건은 나오지 않는다.', 5: '선반은 한쪽으로 도는데, 위에 놓인 물건들은 반대쪽으로 밀린다.' },
    hotspots: [
      npc('oaks', '오크스', '🧔', [130, 260, 150, 220], 'oaks'),
      puzzle('shelf-spin', '회전 선반', '🌀', [420, 170, 260, 300], 'P-SHELF', { min: 3 }),
      inspect('old-thing', '오래된 물건', '🪵', [800, 320, 220, 140], { view: 'v-oldthing', grant: 'O-03' })
    ]
  });

  add({
    id: 'GW_SIENNA', name: '시에나의 계절 망토 공방', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#f2d9d3', '#b88f7a'), intro: { 1: '시에나가 사계절의 바람을 거미줄 실과 함께 엮어 망토를 만드는 공방.', 3: '작업대 위 망토 자락이 흔들린다. 옆에 늘어진 실은 움직이지 않는다.', 5: '바늘은 다음 땀으로 넘어가는데, 방금 꿰맨 자리가 다시 풀린다.' },
    hotspots: [
      npc('sienna', '시에나', '👩‍🎨', [130, 270, 150, 210], 'sienna'),
      inspect('cloak', '망토', '🧥', [400, 190, 230, 280], { view: 'v-cloak' }),
      inspect('workbench-gw', '작업대', '🪡', [760, 320, 260, 150], { min: 3, view: 'v-workbench', grant: 'R-08' })
    ]
  });

  add({
    id: 'GW_HOUSE', name: '마을 주택', kind: 'location', parent: 'MAP_GLENWEAVER', village: '글렌위버',
    bg: room('#efe5cf', '#c3a77f'), intro: { 1: '숲속의 작은 집. 안에서 찻물 끓는 소리가 들린다.', 3: '찻물이 끓어오르는 소리가 들린다. 잠시 뒤, 똑같은 소리가 처음부터 다시 난다.', 5: '찻물 끓는 소리가 끊겼다가 한꺼번에 두 번 들린다.' },
    hotspots: [
      npc('gw-resident', '주민2', '🧑', [520, 260, 150, 220], 'resident2', { temp: true }),
      inspect('registry', '주민 명부', '📜', [860, 230, 220, 230], { view: 'v-registry' })
    ]
  });

  // ===== 루미나리아 =====
  add({
    id: 'LM_LIGHTHOUSE', name: '바다거북 우체국 등대', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: room('#d3ebf0', '#e3d7bd'), intro: { 1: '등대지기가 거북이 우체부들의 길을 살피는 곳. 이곳에서 출발한 편지에는 바다의 온기가 밴다.', 3: '편지를 꺼냈는데 우편함 안에 같은 편지가 또 들어 있다.', 5: '등대 불빛이 같은 구간을 두 번 비춘다. 정작 그다음 바닷길은 밝아지지 않는다.' },
    hotspots: [
      npc('noa', '노아', '🧑‍✈️', [130, 270, 150, 210], 'noa'),
      puzzle('mailbox', '우편함', '📮', [420, 280, 200, 180], 'P-MAILBOX', { min: 3 }),
      puzzle('letter', '편지', '✉️', [780, 320, 200, 130], 'P-LETTER', { min: 4 })
    ]
  });

  add({
    id: 'LM_ATELIER', name: '펄 루미너스 아틀리에', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: room('#e9e4f4', '#c9bfd9'), intro: { 1: '투명한 유리 외벽 너머로 작업장과 해파리 수조가 보이는 펄 루미너스 아틀리에.', 3: '수조의 해파리는 움직이는데, 유리벽에 비친 빛은 한 박자 늦게 따라온다.', 4: '수조의 빛이 꺼졌다. 유리벽 안에서는 아직 해파리가 빛나고 있다.' },
    hotspots: [
      inspect('glass', '유리 작품', '🔮', [160, 170, 250, 300], { view: 'v-glassart' }),
      // 아리아와 마주한 뒤에만 열린다. 그 전에는 흔들림.
      puzzle('workbench-lm', '작업대', '🛠️', [640, 300, 280, 160], 'P-ATELIER', { lock: { flag: 'ariaConfronted' } })
    ]
  });

  add({
    id: 'LM_CAFE', name: '루루의 카페', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: room('#d6f0f1', '#a8d0cf'), intro: { 1: '해초 디저트와 젤리를 내는 카페. 수조의 해파리빛이 테이블에 은은하게 번진다.', 3: '수조의 해파리는 빛나고 있는데 테이블 위 조명만 잠깐 꺼졌다.', 5: '테이블 위의 빛이 꺼졌다 켜진다. 빈자리부터 매번 같은 순서로 밝아진다.' },
    hotspots: [
      npc('lulu', '루루', '👩‍🍳', [130, 270, 150, 210], 'lulu'),
      inspect('menu', '메뉴판', '🍵', [400, 190, 200, 200], { view: 'v-menu' }),
      inspect('jelly', '해파리 조명', '🪼', [760, 100, 240, 280], { view: 'v-jelly', grant: 'C-02' })
    ]
  });

  add({
    id: 'LM_HARBOR', name: '항구', kind: 'location', parent: 'MAP_LUMINARIA', village: '루미나리아',
    bg: sky('#cfe6f2', '#9ec6dc', '#e6d9bd', 55), intro: { 1: '바닷바람이 드는 작은 항구. 물가에 서면 파도 소리가 가까이 들린다.', 3: '파도가 부두 가장자리에 닿는다. 물결은 움직이는데 소리가 들리지 않는다.', 5: '파도는 이미 부서졌다. 잠시 뒤에야 부두에 부딪치는 소리가 들린다.' },
    hotspots: [
      inspect('pier', '선착장', '⛵', [200, 320, 260, 150], { view: 'v-pier', grant: 'O-02' }),
      inspect('sign', '표지판', '🪧', [720, 280, 180, 190], { view: 'v-sign' })
    ]
  });
})();
