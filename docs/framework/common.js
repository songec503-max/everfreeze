/* 09·10 연결망 공통: 사이트 데이터 요약 · 상자 · 선 그리기 */
(function () {
  const EF = window.EF;
  const F = (window.FW = {});
  F.esc = t => String(t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  F.cut = (t, n = 70) => (t = String(t)).length > n ? t.slice(0, n) + '…' : t;
  F.VILLAGE_OF = id => /^(RM_|MAP_ROSEMARY)/.test(id) ? '로즈메리' : /^(GW_|MAP_GLENWEAVER)/.test(id) ? '글렌위버' : /^(LM_|MAP_LUMINARIA)/.test(id) ? '루미나리아' : '';
  F.VCLS = { '로즈메리': 'v-rm', '글렌위버': 'v-gw', '루미나리아': 'v-lm' };
  // 다른 마을 퍼즐의 단서를 주는 곳 (장면, 핫스팟) → 퍼즐, 단서 내용
  F.CLUES = [
    ['RM_LIBRARY_READING', 'shelf', 'P-SHELF', '읽는 법: 바깥 링부터, 분(긴 바늘) 먼저'],
    ['RM_PLAZA', 'board', 'P-OLDREC', '▲ = 공지 2장'],
    ['RM_PLAZA', 'clock', 'P-SHELF', '시계 11시 59분'], ['RM_PLAZA', 'clock', 'P-ATELIER', '바늘은 늘 시계 방향'],
    ['RM_BELLA_SHOP', 'ledger-shop', 'P-MAILBOX', '우편 마차 6:20'],
    ['RM_LIBRARY_ARCHIVE', 'fragments', 'P-LETTER', '하루의 순서: 아침 → 낮 → 저녁 → 밤 → 밤'],
    ['GW_HOUSE', 'registry', 'P-LEDGER', '명부에 없는 이름 = 하나'],
    ['GW_TOWER', 'shift-log', 'P-ATELIER', '교대 순서: 새벽 → 한낮 → 노을 → 밤'],
    ['GW_SIENNA', 'workbench-gw', 'P-OLDREC', '★ = 망토 7단계(7번째 땀)'],
    ['GW_SIENNA', 'cloak', 'P-ARCHIVE', '완성 도안: 위 해 · 가운데 시계탑 · 아래 물결'],
    ['LM_HARBOR', 'sign', 'P-DRAWER', '입항 시각 4:17'],
    ['LM_CAFE', 'jelly', 'P-BIRDHOUSE', '조명 순서: 파랑 → 분홍 → 노랑 → 초록'],
    ['LM_LIGHTHOUSE', 'mailbox', 'P-OLDREC', '● = 편지 3통']
  ];
  // 퍼즐·증거가 있는 곳
  F.PUZ = {}; F.GRANT = {};
  Object.values(EF.SCENES).forEach(sc => sc.hotspots.forEach(hp => hp.rules.forEach(r => (r.do || []).forEach(a => {
    if (a.puzzle) F.PUZ[a.puzzle] = { sc, hp, rules: hp.rules };
    if (a.grant && !F.GRANT[a.grant]) F.GRANT[a.grant] = { sc, hp, how: '클릭' };
  }))));
  Object.entries(EF.PUZZLES).forEach(([pid, p]) => (p.onSolve || []).forEach(a => {
    if (a.grant) F.GRANT[a.grant] = { sc: F.PUZ[pid].sc, hp: F.PUZ[pid].hp, how: `퍼즐 ${p.level}`, pid };
  }));
  F.place = (sc, hp) => `${F.VILLAGE_OF(sc.id)} · ${sc.name}${hp ? ' · ' + hp.label : ''}`;
  // 장면에 들어가는 조건(사이트 규칙 기준)
  const SCENE_GATE = { RM_LIBRARY_READING: [2, '열람실 입장'], RM_LIBRARY_ARCHIVE: [3, '열람실 퍼즐 완료 후'], RM_LIBRARY_SECRET: [3, '기록 조각 퍼즐 완료 후'] };
  F.opens = pid => {
    const { sc, rules } = F.PUZ[pid];
    const lock = rules.find(r => (r.do || []).some(a => a.shake));
    let n = 1, note = '';
    if (lock) {
      const c = lock.if[0].not;
      if (c.stageMin) n = c.stageMin;
      if (c.flag === 'ariaConfronted') note = '아리아 대면 후';
    }
    const g = SCENE_GATE[sc.id];
    if (g && g[0] > n) { n = g[0]; note = note || g[1]; } else if (g && !note && g[0] === n) note = g[1];
    if (pid === 'P-ATELIER') n = 4;
    return `${n}단계~` + (note ? ` (${note})` : '');
  };
  F.TYPE_KO = { pick: '고르기', dial: '다이얼', rings: '회전 링', code: '숫자', cipher: '암호', lever: '레버', clock: '시계', slide: '슬라이드', signal: '등대 신호', glass: '유리 조각', order: '순서' };
  F.answer = p => {
    switch (p.type) {
      case 'pick': return `${p.options[p.answer]} (명부에 없는 이름)`;
      case 'dial': case 'code': return p.answer;
      case 'rings': return `바깥→안쪽 링 ${p.answer.split('').join(' · ')} (${p.answer})`;
      case 'cipher': return `${p.symbols.join(' ')} → ${p.answer}  (★=7 · ●=3 · ▲=2)`;
      case 'lever': return p.answer.map(k => p.levers.find(l => l.key === k).name).join(' → ');
      case 'clock': return `${p.answer.h}시 ${p.answer.m}분`;
      case 'slide': return `3×3 그림 완성 (위 ${p.rows[0].name} · 가운데 ${p.rows[1].name} · 아래 ${p.rows[2].name})`;
      case 'signal': return p.answer.map(k => p.signals.find(s => s.key === k).name).join(' · ');
      case 'glass': return '새벽(왼위) · 한낮(오위) · 노을(오아래) · 밤(왼아래), ▲ 모두 위';
    }
    return '';
  };
  F.viewText = id => {
    const d = EF.VIEWS[id]; if (!d) return '';
    switch (d.kind) {
      case 'pic': return `그림 ${d.icon || ''}`;
      case 'doc': return [d.head, (d.rows || []).slice(0, 1).map(r => [].concat(r).join(' ')).join(''), d.foot].filter(Boolean).join(' · ') + ((d.rows || []).length > 1 ? ` … (${d.rows.length}줄)` : '');
      case 'strip': return d.items.join(' → ');
      case 'clock': return `시계 ${d.h}:${String(d.m).padStart(2, '0')}`;
      case 'lights': return `불빛이 차례로 켜짐`;
      case 'pattern': return d.rows.join(' / ');
      case 'steps': return `${d.mark || ''} 바느질 ${d.done}/${d.total}에서 멈춤`;
      case 'pins': return `종이 ${d.items.length}장 ${d.items[0].icon || ''}${d.items[0].text || ''} ${d.items[0].mark || ''}`;
      case 'stack': return `${d.icon} ${d.count}통 ${d.mark || ''}`;
      case 'ringguide': return '나이테 1→4 · 긴 바늘① 짧은 바늘②';
    }
    return '';
  };
  F.el = (cls, html) => { const d = document.createElement('div'); d.className = cls; if (html !== undefined) d.innerHTML = html; return d; };

  // 선 그리기: links = [[a, b, style, opts]]
  F.draw = function (wrap, svg, links) {
    const W = wrap.getBoundingClientRect();
    const R = e => { const r = e.getBoundingClientRect(); return { x: r.left - W.left, y: r.top - W.top, w: r.width, h: r.height }; };
    svg.setAttribute('width', W.width); svg.setAttribute('height', wrap.scrollHeight);
    const STY = {
      chain: ['#555', '', 2, true], gate: ['#4a7fd0', '3 4', 1.6, true], gain: ['#e08a1e', '', 1.6, true],
      stage: ['#d9534f', '6 4', 1.4, true], ded: ['#7b5cc4', '', 1.6, true], clue: ['#a0703c', '6 4', 1.5, true], move: ['#3d8b57', '', 1.6, true]
    };
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    Object.entries(STY).forEach(([k, s]) => defs.innerHTML += `<marker id="m-${k}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${s[0]}"/></marker>`);
    svg.append(defs);
    links.forEach(([a, b, st, o = {}]) => {
      const A = R(a), B = R(b), s = STY[st];
      let d;
      if (o.down) { const x = A.x + A.w / 2; d = `M${x},${A.y + A.h} V${B.y - 2}`; }
      else {
        const x1 = A.x + A.w, y1 = A.y + (o.ay != null ? o.ay : A.h / 2), x2 = B.x, y2 = B.y + (o.by != null ? o.by : B.h / 2);
        const k = Math.max(40, (x2 - x1) / 2);
        d = o.elbow ? `M${x1},${y1} H${x1 + 18} V${y2} H${x2 - 2}` : `M${x1},${y1} C${x1 + k},${y1} ${x2 - k},${y2} ${x2 - 2},${y2}`;
      }
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', s[0]); p.setAttribute('stroke-width', s[2]);
      if (s[1]) p.setAttribute('stroke-dasharray', s[1]);
      if (s[3]) p.setAttribute('marker-end', `url(#m-${st})`);
      p.setAttribute('opacity', o.op || '.9');
      svg.append(p);
    });
  };
  F.legend = el => {
    const L = [['이동 · 해금', '#3d8b57', ''], ['획득(증거·흔적)', '#e08a1e', ''], ['단계 누적', '#d9534f', '6 4'], ['추리 재료', '#7b5cc4', ''], ['조건 · 게이트', '#4a7fd0', '3 4'], ['단서 제공 → 퍼즐', '#a0703c', '6 4'], ['연쇄', '#555', '']];
    L.forEach(([t, c, da]) => el.insertAdjacentHTML('beforeend', `<span class="ln"><svg width="40" height="8"><line x1="0" y1="4" x2="34" y2="4" stroke="${c}" stroke-width="2" ${da ? `stroke-dasharray="${da}"` : ''}/><path d="M32,0 L40,4 L32,8z" fill="${c}"/></svg>${t}</span>`));
    [['로즈메리', '#9b7fd6', '#f1ecfb'], ['글렌위버', '#6fae6a', '#eaf5e4'], ['루미나리아', '#6f9ad6', '#e6f0fb'], ['흔적 R', '#d9765c', '#fbe3dc'], ['조건 · 해금', '#5f9a50', '#fff']].forEach(([t, b, f]) => el.insertAdjacentHTML('beforeend', `<span><span class="chip" style="border-color:${b};background:${f}"></span>${t}</span>`));
  };
})();
