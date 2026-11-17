/* 오버레이: 조사 텍스트(INSPECT) · 대화(DIALOGUE) · 퍼즐(PUZZLE) · 엔딩, 그리고 큐 처리. */
(function () {
  const EF = window.EF, UI = EF.UI, h = EF.h;

  function scrim() { const s = h('div', 'scrim'); UI.stage.append(s); return s; }
  function closeWith(node, done) {
    node.remove(); UI.dismiss = null; done();
  }

  UI.showText = function (it, done) {
    const sc = scrim(), box = h('div', 'textbox');
    if (it.who) box.append(h('div', 'who', it.who));
    box.append(h('div', 'body', it.text));
    if (it.note && EF.CONFIG.showMemo) box.append(h('div', 'note', '✔ ' + it.note));
    box.append(h('div', 'next', '▼ 클릭'));
    sc.append(box);
    const close = () => closeWith(sc, done);
    sc.onclick = close; UI.dismiss = close;
  };

  UI.showSay = function (it, done) {
    const n = EF.NPCS[it.npc];
    // 인물 크롭: 배경 속 인물을 누르면 따로 그린 인물 그림이 그림 창 전체에 뜨고, 대화창이 그 위에 얹힌다
    const cu = h('div', 'closeup npc-cu');
    if (EF.NPC_IMAGES.includes(it.npc)) cu.style.background = `url(assets/npc/${it.npc}.png) center/cover no-repeat`;
    else {
      cu.style.background = `radial-gradient(ellipse at 50% 38%, ${n.color} 0%, #2b2638 85%)`;
      cu.append(h('div', 'npc-ph', n.name), h('div', 'cv-tag', `임시 그림 · assets/npc/${it.npc}.png`));
    }
    UI.stage.append(cu);
    const sc = scrim(), box = h('div', 'textbox dialogue');
    const pages = it.pages || [{ who: it.npc, text: EF.npcLine(it.npc, it.ctx) }];
    const por = h('div', 'portrait'), head = h('div', 'dhead'), body = h('div', 'body');
    const btn = h('button', 'btn close'), count = h('span', 'dcount');
    const col = h('div', 'dcol'); col.append(head, body);
    const side = h('div', 'dside'); side.append(count, btn);
    box.append(por, col, side);
    sc.append(box);
    let i = 0;
    const draw = () => {
      const pg = pages[i], who = EF.NPCS[pg.who] || n;
      por.textContent = who.name[0]; por.style.background = who.color;
      box.classList.toggle('is-clover', pg.who === 'clover');
      head.innerHTML = '';
      head.append(h('b', '', who.name)); // 이름만 보인다 (역할·설정 문구는 화면에 쓰지 않음)
      if (it.ctx && pg.who === it.npc) head.append(h('span', 'ctx', it.ctx));
      body.textContent = pg.text;
      const last = i === pages.length - 1;
      btn.textContent = last ? '닫기' : '다음 ▶';
      count.textContent = pages.length > 1 ? `${i + 1} / ${pages.length}` : '';
    };
    const close = () => { cu.remove(); closeWith(sc, done); };
    const next = () => { if (i < pages.length - 1) { i++; draw(); } else close(); };
    btn.onclick = e => { e.stopPropagation(); next(); };
    sc.onclick = e => { if (e.target === sc) next(); };
    UI.dismiss = next; // Enter/Space/Esc: 다음 장, 마지막 장이면 닫기
    draw();
  };

  // 엔딩: 오류가 화면을 덮고 창 밖의 아리아가 바라보다가, 사이트가 강제로 초기화된다 (glitch.js G.finale).
  //       예전 엔딩 카드(EF.TEXT.ending)는 연출을 쓸 수 없을 때만 쓴다.
  //       마지막 퍼즐의 창문 클로즈업(it.view)을 띄운 채로 시작한다.
  UI.showEnding = function (done, it = {}) {
    if (EF.Glitch && EF.Glitch.finale) {
      UI.showView({ view: it.view || 'v-atelier' }, () => {}); // 창문은 닫히지 않는다 (done 은 부르지 않는다: 곧 초기화)
      UI.busy = true; UI.dismiss = () => {};
      const cus = UI.stage.querySelectorAll('.closeup'); EF.Glitch.finale(cus[cus.length - 1]);
      return;
    }
    const sc = scrim(); sc.classList.add('dim');
    const card = h('div', 'ending');
    card.append(h('h2', '', EF.TEXT.ending.title));
    EF.TEXT.ending.body.split('\n').forEach(l => card.append(h('p', '', l || ' ')));
    const b = h('button', 'btn primary', EF.TEXT.ending.btn);
    card.append(b); sc.append(card);
    const close = () => closeWith(sc, done);
    b.onclick = close; UI.dismiss = close;
  };

  // ---------- 퍼즐 ----------
  // 유형별 화면은 pz.js(EF.PZ). 건너뛰기 없음 · 닫아도 미해결 유지 · 오답 EF.HINT_AFTER(3)회부터 힌트.
  // 퍼즐 창은 Esc(또는 닫기 버튼)로만 닫힌다. Enter/Space 로는 닫히지 않는다.
  UI.showPuzzle = function (pid, done) {
    const p = EF.PUZZLES[pid], sc = scrim(); sc.classList.add('dim');
    const card = h('div', 'puzzle pz-' + p.type);
    const head = h('div', 'phead');
    head.append(h('h3', '', p.title));
    if (p.level) head.append(h('span', 'plevel', p.level));
    card.append(head, h('p', 'prompt', p.prompt));
    const area = h('div', 'parea');
    const msg = h('div', 'pmsg', '');
    const hint = h('div', 'phint');
    const actions = h('div', 'pactions');
    const cancel = h('button', 'btn', '닫기 (Esc)');
    const okBtn = h('button', 'btn primary', '확인'); okBtn.disabled = true;
    actions.append(cancel, okBtn);
    card.append(area, msg, hint, actions); sc.append(card);

    const fails = () => EF.state.fails[pid] || 0;
    const showHint = () => {
      if (fails() >= EF.HINT_AFTER && p.hint) { hint.textContent = '힌트 · ' + p.hint; hint.classList.add('on'); }
    };
    const close = solved => {
      sc.remove(); UI.dismiss = null; UI.dismissEscOnly = false;
      done(solved ? EF.solvePuzzle(pid) : []);
    };
    let isOk = () => false;
    const submit = () => {
      if (okBtn.disabled) return;
      if (isOk()) { close(true); return; }
      EF.state.fails[pid] = fails() + 1;
      msg.textContent = p.fail;
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
      showHint();
    };
    const api = {
      ready: on => { okBtn.disabled = !on; },
      clear: () => { msg.textContent = ''; },
      submit,
      close: () => close(false)
    };
    const make = EF.PZ[p.type];
    if (make) isOk = make(p, area, api);
    else console.warn('알 수 없는 퍼즐 유형', p.type);
    showHint(); // 이미 3번 틀린 퍼즐은 다시 열어도 힌트가 보인다

    okBtn.onclick = submit;
    cancel.onclick = () => close(false);
    UI.dismiss = () => close(false);
    UI.dismissEscOnly = true;
  };

  // ---------- 큐 처리 ----------
  UI.run = function (queue) {
    UI.busy = true;
    UI.render();
    const next = () => {
      // 엔딩이 들어 있으면: 마지막 퍼즐의 창문 클로즈업과 함께 엔딩만 바로 시작한다 (단계 알림 · 알림 글은 건너뜀)
      if (queue.some(x => x.t === 'ending') && queue[0].t !== 'ending') { const v = queue.find(x => x.t === 'view'); queue.splice(0, queue.length, { t: 'ending', view: v && v.view }); }
      const it = queue.shift();
      if (!it) { UI.busy = false; UI.render(); return; }
      switch (it.t) {
        case 'toast': UI.toast(it.text, it.kind); UI.render(); next(); break;
        case 'hint': if (EF.Guide) EF.Guide.note(it.text); next(); break;
        case 'text': UI.showText(it, next); break;
        case 'view': UI.showView(it, next); break;
        case 'shake': UI.shake(); next(); break;
        case 'say': UI.showSay(it, next); break;
        case 'puzzle': UI.showPuzzle(it.id, q => { queue.unshift(...q); next(); }); break;
        case 'stage': UI.render(); UI.banner(it.stage); next(); break;
        case 'ending': UI.render(); UI.showEnding(next, it); break;
        default: next();
      }
    };
    next();
  };
})();
