/* 퍼즐 9종 (문장·정답·단서 모두 임시). 기준: 프레임워크 09 퍼즐·단서 연결망.
   type 별 화면은 src/ui/pz.js 에 있다.
     pick(하나 고르기) order(순서대로 누르기) code(숫자 입력) dial(다이얼) clock(시계 맞추기)
     lever(레버 순서) rings(회전 링) slide(슬라이드 3×3) cipher(암호 해독) signal(등대 신호) glass(유리 조각 2×2)
   공통: title level prompt hint(오답 3회부터 보임) success fail onSolve clueAt(단서 위치 메모)
   - 건너뛰기 없음. 닫아도 미해결로 남는다. 오답 수는 EF.state.fails[퍼즐ID].
   - 단서는 항상 "다른 마을"에 둔다. 정답을 바꾸면 해당 단서 문장(scenes.js)도 같이 바꿀 것. */
(function () {
  const EF = window.EF;
  EF.HINT_AFTER = 3; // 오답 몇 번부터 힌트를 보여 줄지

  EF.PUZZLES = {
    // ===== 로즈메리 =====
    'P-DRAWER': {
      title: '서랍 자물쇠', type: 'dial', digits: 3, answer: '417', level: '쉬움',
      prompt: '서랍에 세 자리 숫자 다이얼 자물쇠가 걸려 있다.',
      hint: '배가 정시에 들어온다고 했다. 항구에서 그 시각을 본 적이 있다.',
      success: '딸깍, 하고 서랍이 열렸다. 같은 하루를 적은 메모가 여러 장 나왔다. (클로버의 과거 메모)',
      fail: '다이얼이 움직이지 않는다.',
      onSolve: [{ grant: 'R-02' }],
      clueAt: '루미나리아 · 항구 · 표지판 (입항 시각 4시 17분)'
    },
    'P-LEDGER': {
      title: '대출 장부 대조', type: 'pick', answer: 3, level: '쉬움',
      prompt: '대출 장부에 같은 책을 빌려 간 사람들의 이름이 적혀 있다. 이상한 이름은 누구일까?',
      options: ['토비', '마렌', '페넬', '하나', '로완'],
      hint: '글렌위버의 마을 주택에 주민 명부가 있다. 장부의 이름과 하나씩 맞춰 보자.',
      success: '명부에 없는 이름이 장부에 적혀 있다. 존재한 적 없는 사람이 같은 책을 반복해서 빌려 갔다.',
      fail: '그 사람은 명부에 있는 것 같다.',
      onSolve: [{ grant: 'R-05' }],
      clueAt: '글렌위버 · 마을 주택 · 주민 명부 (명부에 없는 이름 = 하나)'
    },
    'P-ARCHIVE': {
      title: '기록 조각 복원', type: 'slide', level: '어려움',
      prompt: '찢어진 기록 조각이 틀 안에 뒤섞여 있다. 빈칸 옆의 조각을 눌러 밀어서 그림을 완성하자.',
      // 위에서부터 줄마다 올 그림. 빈칸은 맨 아래 오른쪽.
      rows: [{ key: 'sun', icon: '☀️', name: '해' }, { key: 'tower', icon: '🕰️', name: '시계탑' }, { key: 'wave', icon: '🌊', name: '물결' }],
      scramble: 60,
      hint: '글렌위버 공방의 망토 도안을 떠올려 보자. 위에는 해, 가운데에는 시계탑, 아래에는 물결이다.',
      success: '조각이 이어졌다. 마을 전경이 그려진 기록이 복원되었다. 그리고 책장 뒤에서 무언가 열리는 소리가 났다.',
      fail: '그림이 이어지지 않는다.',
      onSolve: [{ grant: 'R-10' }],
      clueAt: '글렌위버 · 시에나의 계절 망토 공방 · 망토 (완성 도안)'
    },
    'P-OLDREC': {
      title: '지워진 쪽수 해독', type: 'cipher', digits: 4, answer: '2737', level: '매우 어려움',
      prompt: '기록의 쪽수가 지워지고 기호만 남아 있다. 기호마다 숫자 하나를 뜻하는 것 같다.',
      symbols: ['▲', '★', '●', '★'],
      legend: ['★', '●', '▲'],
      hint: '★은 시에나 공방 작업대, ●은 우체국 등대 우편함, ▲는 광장 게시판에서 본 숫자다. 각 장소의 글에 적혀 있다.',
      success: '지워진 쪽수가 드러났다. 이 기록은 아주 오래전부터 이어져 왔다.',
      fail: '아무 일도 일어나지 않는다.',
      onSolve: [{ grant: 'R-11' }],
      clueAt: '공방 작업대(★=망토 7단계) · 등대 우편함(●=편지 3통) · 광장 게시판(▲=공지 2장)'
    },

    // ===== 글렌위버 =====
    'P-BIRDHOUSE': {
      title: '새집 교대 장치', type: 'lever', level: '쉬움',
      prompt: '새집 장치에 색이 다른 레버 네 개가 있다. 올바른 순서로 당겨야 장치가 움직인다.',
      levers: [{ key: 'blue', name: '파랑', color: '#5b8fd9' }, { key: 'pink', name: '분홍', color: '#e59ac0' },
               { key: 'yellow', name: '노랑', color: '#e8c547' }, { key: 'green', name: '초록', color: '#5fb37a' }],
      answer: ['blue', 'pink', 'yellow', 'green'],
      display: ['yellow', 'blue', 'green', 'pink'], // 화면에 놓인 순서
      hint: '이 순서를 어디선가 본 적이 있다. 루미나리아 카페의 해파리 조명이 켜지는 순서다.',
      success: '톱니가 멈추고 장치의 안쪽이 보였다. 낮과 밤이 "재생"되는 느낌이다.',
      fail: '레버가 툭 하고 원래 자리로 돌아갔다.',
      onSolve: [{ grant: 'R-06' }],
      clueAt: '루미나리아 · 루루의 카페 · 해파리 조명 (파랑 분홍 노랑 초록)'
    },
    'P-SHELF': {
      title: '나이테 회전 선반', type: 'rings', digits: 4, answer: '5911', level: '어려움',
      prompt: '나이테 모양의 링 네 개를 돌려 숫자를 맞추면 선반이 열린다고 한다.',
      labels: ['바깥', '', '', '안쪽'],
      hint: '멈춘 시계의 시각이 열쇠다. 열람실 책장의 나이테 해설대로, 분이 먼저 오고 시가 뒤에 온다.',
      success: '선반이 덜컥, 하고 멈췄다. 같은 숫자가 되풀이되던 흔적이 드러났다.',
      fail: '링이 헛돈다.',
      onSolve: [{ grant: 'R-07' }],
      clueAt: '로즈메리 · 광장 시계(11시 59분) + 도서관 열람실 책장(분 먼저, 시 나중)'
    },

    // ===== 루미나리아 =====
    'P-MAILBOX': {
      title: '우편함 시계', type: 'clock', answer: { h: 6, m: 20 }, level: '쉬움',
      prompt: '우편함 위에 작은 시계가 달려 있다. 우편이 도착하는 시각에 맞추면 우편함이 열린다.',
      hint: '로즈메리 잡화점 장부의 마지막 줄에 우편 마차가 도착하는 시각이 적혀 있었다.',
      success: '찰칵, 우편함이 열렸다. 배달된 적 없는 편지가 매일 같은 자리에 다시 도착한다.',
      fail: '시계가 째깍거릴 뿐 아무 일도 없다.',
      onSolve: [{ grant: 'R-09' }],
      clueAt: '로즈메리 · 벨라의 잡화점 · 장부 (우편 마차 6시 20분)'
    },
    'P-LETTER': {
      title: '등대 신호 편지', type: 'signal', level: '쉬움',
      prompt: '봉인된 편지에 "하루의 순서대로 신호를 보내라"고 적혀 있다. 등대 불빛을 다섯 번 비춰 보자.',
      signals: [{ key: 'morning', name: '아침', icon: '🌅' }, { key: 'noon', name: '낮', icon: '☀️' },
                { key: 'evening', name: '저녁', icon: '🌇' }, { key: 'night', name: '밤', icon: '🌙' }],
      answer: ['morning', 'noon', 'evening', 'night', 'night'],
      hint: '복원된 기록에 적힌 하루의 순서를 떠올려 보자. 아침, 낮, 저녁, 밤 순서로 같은 신호를 다시 보내면 된다.',
      success: '봉인이 풀렸다. 클로버에게 보낸 것 같은, 부치지 못한 편지다. 소인의 날짜가 지워져 있다.',
      fail: '불빛이 바다 위에서 흩어졌다.',
      onSolve: [{ grant: 'R-12' }],
      clueAt: '로즈메리 · 자료 보관실 · 기록 조각 (하루의 순서: 아침 낮 저녁 밤)'
    },
    'P-ATELIER': {
      title: '유리 조각 맞추기', type: 'glass', level: '어려움',
      prompt: '네 개의 유리 조각을 틀에 맞추자. 조각을 눌러 고른 뒤 다른 칸을 누르면 자리가 바뀌고, ⟳ 로 돌릴 수 있다.',
      // 칸 순서: 0 왼쪽 위 → 1 오른쪽 위 → 2 오른쪽 아래 → 3 왼쪽 아래 (시계 방향)
      pieces: [{ key: 'dawn', name: '새벽', color: '#c8b8e8' }, { key: 'noon', name: '한낮', color: '#f3dc8a' },
               { key: 'dusk', name: '노을', color: '#f0a986' }, { key: 'night', name: '밤', color: '#5a6a9a' }],
      start: [{ p: 2, r: 1 }, { p: 0, r: 2 }, { p: 3, r: 0 }, { p: 1, r: 3 }], // 처음 놓인 조각(p)과 회전(r×90°)
      hint: '하루는 시계 방향으로 흐른다. 왼쪽 위의 새벽에서 시작해, 새집 탑의 교대 순서를 따라 놓아 보자.',
      success: '유리 조각이 하나의 장면으로 이어졌다. 아무도 보지 않는 장면이었다.',
      fail: '빛이 어긋난다.',
      onSolve: [{ grant: 'R-13' }],
      clueAt: '글렌위버 · 새집 탑 · 교대 기록(새벽 한낮 노을 밤) + 로즈메리 · 광장 시계(시계 방향)'
    }
  };
})();
