/* 클로즈업 장면. 조사 요소를 누르면 그림 창 전체가 그 물건을 가까이 본 장면으로 바뀐다.
   설명 글은 쓰지 않는다. 힌트는 그림 속 사물(표시·숫자·순서·기호)로만 보여 준다. 전부 임시.
   돌아가기: 장면과 똑같이 그림 하단(▼)을 클릭.
   kind:
     pic        그림 한 장. assets/view/<ID>.png 를 넣고 EF.VIEW_IMAGES 에 ID 를 적으면 그 그림이 나온다(없으면 임시 아이콘).
     doc        종이·표지판·장부. head rows(줄: 문자열 또는 [칸,칸…]) cols(표 머리) foot paper(note|sign|ledger|book) blur
     strip      아이콘이 화살표로 이어진 띠(items)
     clock      시계(h, m)
     lights     차례로 켜지는 불빛(colors)
     pattern    줄마다 같은 문양(rows)
     steps      바느질 단계(total 중 done 에서 멈춤, mark = 붙은 표시)
     pins       붙은 종이들(items: {icon, text, mark})
     stack      겹친 물건(icon, count, mark)
     ringguide  「나이테 읽는 법」 그림(바깥 링부터, 긴 바늘 먼저) */
(function () {
  const EF = window.EF;
  EF.VIEW_IMAGES = []; // 예: ['v-oldthing'] → assets/view/v-oldthing.png
  const rep = (x, n) => Array.from({ length: n }, () => (Array.isArray(x) ? x.slice() : Object.assign({}, x)));

  EF.VIEWS = {
    // ===== 로즈메리 · 클로버의 집 =====
    'v-desk':   { kind: 'doc', paper: 'note', rows: ['🕰️ ✔', '🛒 ✔', '📚 ✖', '', ''] },             // 내 손글씨 같은데 쓴 기억이 없는 하루
    'v-drawer': { kind: 'pins', paper: 'drawer', items: rep({ text: '🕰️ → 🛒 → 🏠' }, 8) },        // 같은 하루가 여러 장
    'v-mirror': { kind: 'pic', icon: '🪞', tone: ['#f4e4d4', '#b9a38c'] },

    // ===== 로즈메리 · 광장 =====
    'v-clock':  { kind: 'clock', h: 11, m: 59 },                                                   // 11:59 · 시계 방향
    'v-board':  { kind: 'pins', paper: 'cork', items: rep({ icon: '🧹', mark: '▲' }, 2) },          // ▲ = 2

    // ===== 로즈메리 · 도서관 =====
    'v-libnotice': { kind: 'doc', paper: 'sign', rows: ['📚 🚫', '🔑 👤'] },
    'v-book':      { kind: 'ringguide' },                                                          // 바깥 링부터 · 분(긴 바늘) 먼저
    'v-ledger':    { kind: 'doc', paper: 'ledger', cols: ['📅', '👤', '📕'], rows: rep(['봄 3일', '하나', '첫 번째 하루'], 5) },
    'v-record':    { kind: 'strip', items: ['🌅', '☀️', '🌇', '🌙', '🌙'] },                       // 하루의 순서 + 다시 밤
    'v-archivebox': { kind: 'pic', icon: '🗃️', tone: ['#b9ad99', '#6f5a48'] },
    'v-journal':   { kind: 'doc', paper: 'book', head: '📅 +1', rows: ['🧑 🕰️', '🧑 📖', '🧑 📓 👁️'] },  // 내일의 클로버
    'v-oldrec':    { kind: 'pins', paper: 'drawer', items: rep({ icon: '📅', text: '봄 3일' }, 10) },

    // ===== 로즈메리 · 벨라의 잡화점 =====
    'v-display':    { kind: 'pic', icon: '🧺', tone: ['#f1ddc0', '#b98f6a'] },
    'v-shopledger': { kind: 'doc', paper: 'ledger', cols: ['📅', '📦', '#'],
      rows: [['봄 3일', '🌾', '2'], ['봄 3일', '🪔', '1'], ['봄 3일', '🧶', '1'], ['봄 3일', '🌾', '2']], foot: '🐴 ✉️  6:20' },

    // ===== 글렌위버 =====
    'v-birdhouse': { kind: 'pic', icon: '🐦', tone: ['#cfd9ee', '#8c8f7a'] },
    'v-shiftlog':  { kind: 'doc', paper: 'ledger', cols: ['📅', '🌅', '☀️', '🌇', '🌙', '✓'],
      rows: rep(['봄 3일', '05:12:00', '11:59:00', '17:44:00', '23:59:00', '✓'], 7) },             // 7일 내내 같은 날, 같은 초
    'v-shelf':     { kind: 'pic', icon: '🌀', tone: ['#e8d8b4', '#9b7b52'] },
    'v-oldthing':  { kind: 'pic', icon: '🪵', tone: ['#5a4630', '#2e2418'] },                       // 그림만
    'v-cloak':     { kind: 'pattern', rows: ['☀️', '🕰️', '🌊'] },                                   // 위 해 · 가운데 시계탑 · 아래 물결
    'v-workbench': { kind: 'steps', total: 10, done: 7, mark: '★' },                                // ★ = 7
    'v-registry':  { kind: 'doc', paper: 'ledger', cols: ['🌿', '🍂', '🐚'],
      rows: [['클로버', '오크스', '노아'], ['벨라', '시에나', '루루'], ['아리아', '마렌', '로완'], ['토비', '페넬', '']] }, // '하나' 없음

    // ===== 루미나리아 =====
    'v-mailbox':  { kind: 'stack', icon: '✉️', count: 3, mark: '●' },                               // ● = 3
    'v-letter':   { kind: 'doc', paper: 'note', head: '클로버에게,', rows: ['', '', '', ''], blur: true, foot: '▒▒▒▒' },
    'v-glassart': { kind: 'pic', icon: '🔮', tone: ['#e9e4f4', '#9f93bd'] },
    'v-atelier':  { kind: 'pic', icon: '🪟', tone: ['#c8b8e8', '#5a6a9a'] },
    'v-menu':     { kind: 'doc', paper: 'sign', cols: ['📅 −1', '📅'], rows: [['🍹', '🍹'], ['🥧', '🥧']] }, // 어제 = 오늘
    'v-jelly':    { kind: 'lights', colors: ['#5b8fd9', '#e59ac0', '#e8c547', '#5fb37a'] },          // 파랑 → 분홍 → 노랑 → 초록
    'v-pier':     { kind: 'pic', icon: '👣', tone: ['#cfe6f2', '#9ec6dc'] },
    'v-sign':     { kind: 'doc', paper: 'sign', rows: ['⚓ 루미나리아', '⛴️ 4:17'] }                   // 입항 4:17
  };
})();
