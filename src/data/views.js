/* 크롭 창(클로즈업). 조사 요소를 누르면 하단 글상자 대신 이 창이 열린다.
   직접 설명하지 않고, 보이는 것(그림·종이·표)과 짧은 은유 한 줄(caption)로만 전한다. 전부 임시.
   kind:
     pic      그림 한 장. assets/view/<ID>.png 를 넣고 EF.VIEW_IMAGES 에 ID 를 적으면 그 그림이 나온다(없으면 임시 아이콘).
     doc      종이·표지판·장부. head(제목) rows(줄: 문자열 또는 [칸,칸…]) cols(표 머리) foot(맨 아래) paper(note|sign|ledger|book)
     clock    시계(h, m)
     lights   차례로 켜지는 불빛(colors)
     pattern  줄마다 같은 문양(rows: 아이콘 3개)
     steps    바느질 단계(total 중 done 에서 멈춤)
     pins     게시판 종이(items)
     stack    겹친 물건(icon, count)
   caption 이 없으면 그림만 보인다. */
(function () {
  const EF = window.EF;
  EF.VIEW_IMAGES = []; // 예: ['v-oldthing'] → assets/view/v-oldthing.png
  const same = (row, n) => Array.from({ length: n }, () => row.slice());

  EF.VIEWS = {
    // ===== 로즈메리 · 클로버의 집 =====
    'v-desk': { title: '책상 위 노트', kind: 'doc', paper: 'note',
      rows: ['오늘도 광장의 시계를 올려다보았다.', '벨라의 가게에 들렀다.', '도서관은 닫혀 있었다.', '……', ''],
      caption: '쓴 기억이 없는 글씨가, 내 손 모양을 하고 있다.' },
    'v-drawer': { title: '서랍 속 메모', kind: 'pins', paper: 'drawer',
      items: same(['오늘: 광장 → 잡화점 → 집'], 6).map(x => x[0]),
      caption: '같은 하루가 여러 번 접혀 있다.' },
    'v-mirror': { title: '거울', kind: 'pic', icon: '🪞', tone: ['#f4e4d4', '#b9a38c'],
      caption: '거울 속의 나는 반 박자 늦게 웃는다.' },

    // ===== 로즈메리 · 광장 =====
    'v-clock': { title: '시계탑', kind: 'clock', h: 11, m: 59,
      caption: '바늘은 한 방향으로만 걷는다. 그런데 어디에도 닿지 않는다.' },
    'v-board': { title: '게시판', kind: 'pins', paper: 'cork',
      items: ['공지 — 내일 광장 청소가 있습니다.', '공지 — 내일 광장 청소가 있습니다.'],
      caption: '떼어 낸 자리에, 같은 종이가 다시 자란다.' },

    // ===== 로즈메리 · 도서관 =====
    'v-libnotice': { title: '출입 제한 안내문', kind: 'doc', paper: 'sign',
      rows: ['도서관 출입은', '사서가 허락한 사람에 한함'],
      caption: '문은 열려 있는데, 들어갈 수 없다.' },
    'v-book': { title: '「나이테 읽는 법」', kind: 'doc', paper: 'book', head: '나이테 읽는 법',
      rows: ['나이테 선반은 바깥 링부터 읽는다.', '시계의 숫자는 분이 먼저, 시가 나중이다.'],
      caption: '같은 제목의 책들이 서로를 베껴 쓰고 있다.' },
    'v-ledger': { title: '대출 장부', kind: 'doc', paper: 'ledger', cols: ['날짜', '이름', '책', '비고'],
      rows: same(['봄 3일', '하나', '「첫 번째 하루」', '처음 대출'], 4),
      caption: '없는 사람의 손이, 같은 책을 계속 처음 빌려 간다.' },
    'v-record': { title: '복원된 기록', kind: 'doc', paper: 'note', head: '하루의 순서',
      rows: ['아침 → 낮 → 저녁 → 밤,', '그리고 다시 밤.'],
      caption: '조각난 하루가 다시 붙었다.' },
    'v-archivebox': { title: '보관함', kind: 'pic', icon: '🗃️', tone: ['#b9ad99', '#6f5a48'],
      caption: '비어 있는 칸들이 무언가의 모양을 기억하고 있다.' },
    'v-journal': { title: '관찰일지', kind: 'doc', paper: 'book', head: '관찰일지 — 내일',
      rows: ['클로버, 광장에서 시계를 올려다봄.', '클로버, 잡화점 장부를 넘겨 봄.', '클로버, 이 일지를 펼침.'],
      caption: '아직 오지 않은 하루가 이미 적혀 있다.' },
    'v-oldrec': { title: '오래된 기록', kind: 'doc', paper: 'book', head: 'p. 2737',
      rows: ['같은 날.', '같은 날.', '같은 날.', '같은 날.', '같은 날.'],
      caption: '가장 오래된 장에도, 오늘이 적혀 있다.' },

    // ===== 로즈메리 · 벨라의 잡화점 =====
    'v-display': { title: '진열대', kind: 'pic', icon: '🧺', tone: ['#f1ddc0', '#b98f6a'],
      caption: '먼지가 내려앉지 못하는 자리가 있다.' },
    'v-shopledger': { title: '잡화점 장부', kind: 'doc', paper: 'ledger', cols: ['날짜', '품목', '수량'],
      rows: [['봄 3일', '밀가루', '2봉'], ['봄 3일', '등잔 기름', '1병'], ['봄 3일', '실 한 타래', '1'], ['봄 3일', '밀가루', '2봉']],
      foot: '우편 마차 도착 6:20' },

    // ===== 글렌위버 =====
    'v-birdhouse': { title: '새집 장치', kind: 'pic', icon: '🐦', tone: ['#cfd9ee', '#8c8f7a'],
      caption: '톱니는 앞으로 가는 척, 같은 자리로 돌아온다.' },
    'v-shiftlog': { title: '주야 교대 기록', kind: 'doc', paper: 'ledger', head: '주야 교대 기록',
      cols: ['날짜', '새벽', '한낮', '노을', '밤', '확인'],
      rows: same(['봄 3일', '05:12:00', '11:59:00', '17:44:00', '23:59:00', '✓'], 7) },
    'v-shelf': { title: '회전 선반', kind: 'pic', icon: '🌀', tone: ['#e8d8b4', '#9b7b52'],
      caption: '나이테는 더 늘어나지 않는다.' },
    'v-oldthing': { title: '오래된 물건', kind: 'pic', icon: '🪵', tone: ['#5a4630', '#2e2418'] },
    'v-cloak': { title: '망토 완성 도안', kind: 'pattern', rows: ['☀️', '🕰️', '🌊'],
      caption: '계절은 바뀌는데, 수놓인 하늘은 그대로다.' },
    'v-workbench': { title: '작업대', kind: 'steps', total: 10, done: 7,
      caption: '바늘은 같은 땀에서 언제나 멈춘다.' },
    'v-registry': { title: '세 마을 주민 명부', kind: 'doc', paper: 'ledger', cols: ['로즈메리', '글렌위버', '루미나리아'],
      rows: [['클로버', '오크스', '노아'], ['벨라', '시에나', '루루'], ['아리아', '마렌', '로완'], ['토비', '페넬', '']] },

    // ===== 루미나리아 =====
    'v-mailbox': { title: '우편함', kind: 'stack', icon: '✉️', count: 3,
      caption: '보낸 사람 없는 편지가, 매일 같은 무게로 돌아온다.' },
    'v-letter': { title: '편지', kind: 'doc', paper: 'note', head: '클로버에게,',
      rows: ['……', '(나머지는 번져서 읽을 수 없다)'], foot: '소인 ▒▒▒▒' },
    'v-glassart': { title: '유리 작품', kind: 'pic', icon: '🔮', tone: ['#e9e4f4', '#9f93bd'],
      caption: '유리 속 마을은 이쪽보다 조금 늦게 움직인다.' },
    'v-atelier': { title: '이어 붙인 유리', kind: 'pic', icon: '🪟', tone: ['#c8b8e8', '#5a6a9a'],
      caption: '아무도 보지 않는 장면.' },
    'v-menu': { title: '메뉴판', kind: 'doc', paper: 'sign', head: '오늘의 메뉴',
      rows: ['해파리 젤리 소다', '진주 크림 파이'], foot: '(어제의 메뉴)',
      caption: '고르기도 전에, 이미 골라져 있다.' },
    'v-jelly': { title: '해파리 조명', kind: 'lights', colors: ['#5b8fd9', '#e59ac0', '#e8c547', '#5fb37a'],
      caption: '빛이 손님보다 한 걸음 먼저 도착한다.' },
    'v-pier': { title: '선착장', kind: 'pic', icon: '👣', tone: ['#cfe6f2', '#9ec6dc'],
      caption: '발자국은 늘 같은 깊이로 패여 있다.' },
    'v-sign': { title: '항구 표지판', kind: 'doc', paper: 'sign', head: '루미나리아 항구',
      rows: ['입항 4:17', '오늘도 정시에 들어옵니다.'] }
  };
})();
