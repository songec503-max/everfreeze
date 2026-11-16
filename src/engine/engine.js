/* 규칙 엔진. 화면과 무관하게 state 를 바꾸고, 보여줄 것은 queue 로 돌려준다.
   action: go view shake text say toast grant puzzle flag deduce
   view: 크롭 창 열기(views.js 의 ID 또는 즉석 객체, caption 덮어쓰기 가능) / shake: 상호작용 불가 → 화면만 흔들림
   5단계(엔딩) 이후에는 grant puzzle flag deduce 가 차단된다. */
(function () {
  const EF = window.EF;
  const BLOCKED = ['grant', 'puzzle', 'flag', 'deduce'];

  EF.exec = function (actions, q) {
    const s = EF.state;
    let blocked = false;
    for (const a of actions) {
      const key = Object.keys(a)[0];
      if (EF.isEnded() && BLOCKED.includes(key)) { blocked = true; continue; }
      switch (key) {
        case 'go': s.scene = a.go; break;
        case 'view': q.push({ t: 'view', view: a.view, caption: a.caption }); break;
        case 'shake': q.push({ t: 'shake' }); break;
        case 'text': q.push({ t: 'text', text: a.text, note: a.note, who: a.who }); break;
        case 'say': q.push({ t: 'say', npc: a.say, ctx: a.ctx }); break;
        case 'toast': q.push({ t: 'toast', text: a.toast }); break;
        case 'grant':
          if (!s.evidence[a.grant]) {
            s.evidence[a.grant] = ++s.order;
            if (EF.CONFIG.showMemo) q.push({ t: 'toast', kind: 'gain', text: '📓 증거 등록 · ' + EF.EVIDENCE[a.grant].name });
          }
          break;
        case 'puzzle': q.push({ t: 'puzzle', id: a.puzzle }); break;
        case 'flag': s.flags[a.flag] = true; break;
        case 'deduce':
          if (!s.deduced[a.deduce]) {
            s.deduced[a.deduce] = true;
            const d = EF.DEDUCTIONS.find(x => x.id === a.deduce);
            if (EF.CONFIG.showMemo) q.push({ t: 'toast', kind: 'gain', text: '🧩 추리 기록 · ' + d.title });
          }
          break;
        default: console.warn('알 수 없는 액션', key);
      }
    }
    if (blocked) q.push({ t: 'toast', text: EF.TEXT.endedBlocked });
    if (!EF.CONFIG.showMemo) EF.autoDeduce();
  };

  // 메모를 숨긴 모드: 필요한 증거가 모두 모이면 추리를 사이트가 조용히 완료한다.
  // MAIN/선택 추리는 증거 조건, FINAL-01 은 MAIN 3개 + 4단계. 5단계(엔딩) 이후에는 새로 만들지 않는다.
  EF.autoDeduce = function () {
    if (EF.isEnded()) return;
    const s = EF.state;
    EF.DEDUCTIONS.forEach(d => {
      if (d.kind === 'final' || s.deduced[d.id]) return;
      if (d.requires.every(id => s.evidence[id])) s.deduced[d.id] = true;
    });
    if (!s.deduced['FINAL-01'] && EF.finalStatus().ready) s.deduced['FINAL-01'] = true;
  };

  // 단계가 올랐으면 알림(+엔딩)을 queue 끝에 붙인다
  EF.afterStage = function (before, q) {
    const now = EF.getStage();
    if (now > before) {
      q.push({ t: 'stage', stage: now });
      if (now === 5) q.push({ t: 'ending' });
    }
  };

  // 핫스팟 클릭: 첫 번째로 통과하는 규칙 실행
  EF.click = function (hotspot) {
    const q = [], before = EF.getStage();
    const rule = hotspot.rules.find(r => EF.check(r.if));
    if (rule) EF.exec(rule.do, q);
    EF.afterStage(before, q);
    return q;
  };

  EF.solvePuzzle = function (pid) {
    const q = [], before = EF.getStage(), p = EF.PUZZLES[pid];
    EF.state.solved[pid] = true;
    if (p.success) q.push(p.view ? { t: 'view', view: p.view, caption: p.success } : { t: 'text', text: p.success });
    EF.exec(p.onSolve || [], q);
    EF.afterStage(before, q);
    return q;
  };

  // 추리 연결: picks 가 requires 와 같은 집합이면 성공
  EF.tryDeduce = function (id, picks) {
    const d = EF.DEDUCTIONS.find(x => x.id === id), q = [];
    if (EF.isEnded()) { q.push({ t: 'toast', text: EF.TEXT.endedBlocked }); return { ok: false, q }; }
    const ok = d.requires.length === picks.length && d.requires.every(r => picks.includes(r));
    if (ok) EF.exec([{ deduce: id }], q);
    return { ok, q };
  };

  EF.finalStatus = function () {
    const mains = EF.DEDUCTIONS.filter(d => d.kind === 'main' && EF.state.deduced[d.id]).length;
    return { mains, stageOk: EF.getStage() >= 4, ready: mains === 3 && EF.getStage() >= 4 };
  };
  EF.tryFinal = function () {
    const q = [];
    if (EF.isEnded()) { q.push({ t: 'toast', text: EF.TEXT.endedBlocked }); return { ok: false, q }; }
    if (!EF.finalStatus().ready) return { ok: false, q };
    EF.exec([{ deduce: 'FINAL-01' }], q);
    return { ok: true, q };
  };

  EF.npcLine = function (npcId) {
    const n = EF.NPCS[npcId];
    const l = (n.lines || []).find(x => EF.check(x.if));
    return l ? l.text : EF.TEXT.npcPlaceholder;
  };
})();
