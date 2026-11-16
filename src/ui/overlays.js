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
    const n = EF.NPCS[it.npc], sc = scrim(), box = h('div', 'textbox dialogue');
    const por = h('div', 'portrait', n.name[0]); por.style.background = n.color;
    const head = h('div', 'dhead');
    head.append(h('b', '', n.name), h('span', 'role', n.role));
    if (it.ctx) head.append(h('span', 'ctx', it.ctx));
    const body = h('div', 'body', EF.npcLine(it.npc));
    const btn = h('button', 'btn close', '닫기');
    const col = h('div', 'dcol'); col.append(head, body);
    box.append(por, col, btn);
    sc.append(box);
    const close = () => closeWith(sc, done);
    btn.onclick = e => { e.stopPropagation(); close(); };
    sc.onclick = e => { if (e.target === sc) close(); };
    UI.dismiss = close;
  };

  UI.showEnding = function (done) {
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
      const it = queue.shift();
      if (!it) { UI.busy = false; UI.render(); return; }
      switch (it.t) {
        case 'toast': UI.toast(it.text, it.kind); UI.render(); next(); break;
        case 'text': UI.showText(it, next); break;
        case 'view': UI.showView(it, next); break;
        case 'shake': UI.shake(); next(); break;
        case 'say': UI.showSay(it, next); break;
        case 'puzzle': UI.showPuzzle(it.id, q => { queue.unshift(...q); next(); }); break;
        case 'stage': UI.render(); UI.banner(it.stage); next(); break;
        case 'ending': UI.render(); UI.showEnding(next); break;
        default: next();
      }
    };
    next();
  };
})();
