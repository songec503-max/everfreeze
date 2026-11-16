/* 퍼즐 유형별 화면. overlays.js 의 퍼즐 창이 EF.PZ[type](p, area, api) 를 부른다.
   api.ready(bool)  : '확인' 버튼을 켜고 끈다
   api.clear()      : 오답 문구를 지운다
   돌려주는 함수     : 지금 화면 상태가 정답이면 true
   유형: pick order code dial clock lever rings slide cipher signal glass */
(function () {
  const EF = window.EF, h = EF.h;
  const PZ = (EF.PZ = {});

  // ---------- 하나 고르기 ----------
  PZ.pick = function (p, area, api) {
    let sel = -1;
    const list = h('div', 'pz-list');
    p.options.forEach((o, i) => {
      const b = h('button', 'opt', o);
      b.onclick = () => { sel = i; [...list.children].forEach((c, j) => c.classList.toggle('on', j === i)); api.ready(true); api.clear(); };
      list.append(b);
    });
    area.append(list);
    return () => sel === p.answer;
  };

  // ---------- 순서대로 누르기 (items 는 정답 순서, shuffle 은 화면 배치) ----------
  PZ.order = function (p, area, api) {
    let seq = [];
    const seqEl = h('div', 'seq'), pool = h('div', 'pool');
    const draw = () => {
      seqEl.innerHTML = ''; pool.innerHTML = '';
      p.items.forEach((_, i) => {
        const slot = h('div', 'slot', seq[i] !== undefined ? p.items[seq[i]] : String(i + 1));
        if (seq[i] !== undefined) slot.classList.add('filled');
        seqEl.append(slot);
      });
      p.shuffle.forEach(idx => {
        const b = h('button', 'opt', p.items[idx]); b.disabled = seq.includes(idx);
        b.onclick = () => { seq.push(idx); api.clear(); draw(); };
        pool.append(b);
      });
      const reset = h('button', 'btn small', '처음부터'); reset.onclick = () => { seq = []; api.clear(); draw(); };
      pool.append(reset);
      api.ready(seq.length === p.items.length);
    };
    area.append(seqEl, pool); draw();
    return () => seq.every((v, i) => v === i);
  };

  // ---------- 숫자 입력 ----------
  function codeInput(p, api) {
    const inp = h('input', 'code'); inp.maxLength = p.digits || 4; inp.inputMode = 'numeric'; inp.placeholder = '숫자';
    inp.oninput = () => { inp.value = inp.value.replace(/\D/g, ''); api.ready(inp.value.length === (p.digits || inp.value.length)); api.clear(); };
    inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') api.submit(); else if (e.key === 'Escape') api.close(); };
    setTimeout(() => inp.focus(), 30);
    return inp;
  }
  PZ.code = function (p, area, api) {
    const inp = codeInput(p, api); area.append(inp);
    return () => inp.value === p.answer;
  };

  // ---------- 다이얼 / 회전 링 (숫자 칸을 ▲▼ 로 돌린다) ----------
  function wheels(p, area, api, cls) {
    const vals = Array(p.digits).fill(0), row = h('div', 'wheels ' + cls);
    for (let i = 0; i < p.digits; i++) {
      const w = h('div', 'wheel'), num = h('div', 'wnum', '0');
      const up = h('button', 'wbtn', '▲'), dn = h('button', 'wbtn', '▼');
      const set = d => { vals[i] = (vals[i] + d + 10) % 10; num.textContent = vals[i]; w.style.setProperty('--rot', vals[i] * 36 + 'deg'); api.clear(); };
      up.onclick = () => set(1); dn.onclick = () => set(-1);
      num.onwheel = e => { e.preventDefault(); set(e.deltaY < 0 ? 1 : -1); };
      w.append(up, num, dn);
      if (p.labels) w.append(h('div', 'wlabel', p.labels[i] || ' '));
      row.append(w);
    }
    area.append(row); api.ready(true);
    return () => vals.join('') === p.answer;
  }
  PZ.dial = (p, area, api) => wheels(p, area, api, 'dial');
  PZ.rings = (p, area, api) => wheels(p, area, api, 'rings');

  // ---------- 시계 맞추기 (시 1~12, 분 5분 단위) ----------
  PZ.clock = function (p, area, api) {
    let hr = 12, mn = 0;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 200 200'); svg.setAttribute('class', 'clockface');
    const el = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); svg.append(e); return e; };
    el('circle', { cx: 100, cy: 100, r: 92, class: 'cf-rim' });
    for (let i = 1; i <= 12; i++) {
      const a = i * Math.PI / 6, t = el('text', { x: 100 + 74 * Math.sin(a), y: 100 - 74 * Math.cos(a) + 6, class: 'cf-num' });
      t.textContent = i;
    }
    const hh = el('line', { x1: 100, y1: 100, x2: 100, y2: 52, class: 'cf-h' });
    const mh = el('line', { x1: 100, y1: 100, x2: 100, y2: 28, class: 'cf-m' });
    el('circle', { cx: 100, cy: 100, r: 5, class: 'cf-pin' });
    const label = h('div', 'clock-label');
    const draw = () => {
      hh.setAttribute('transform', `rotate(${(hr % 12) * 30 + mn / 2} 100 100)`);
      mh.setAttribute('transform', `rotate(${mn * 6} 100 100)`);
      label.textContent = `${hr}시 ${String(mn).padStart(2, '0')}분`;
    };
    const btn = (t, f) => { const b = h('button', 'btn small', t); b.onclick = () => { f(); draw(); api.clear(); }; return b; };
    const ctl = h('div', 'clock-ctl');
    ctl.append(
      h('span', 'cl-t', '시'), btn('◀', () => (hr = hr === 1 ? 12 : hr - 1)), btn('▶', () => (hr = hr === 12 ? 1 : hr + 1)),
      h('span', 'cl-t', '분'), btn('◀', () => (mn = (mn + 55) % 60)), btn('▶', () => (mn = (mn + 5) % 60)));
    const box = h('div', 'clockbox'); box.append(svg, h('div', 'clock-side'));
    box.lastChild.append(label, ctl);
    area.append(box); draw(); api.ready(true);
    return () => hr === p.answer.h && mn === p.answer.m;
  };

  // ---------- 레버 순서 ----------
  PZ.lever = function (p, area, api) {
    let seq = [];
    const byKey = Object.fromEntries(p.levers.map(l => [l.key, l]));
    const row = h('div', 'levers'), trail = h('div', 'lever-trail');
    const draw = () => {
      row.innerHTML = ''; trail.innerHTML = '';
      p.display.forEach(k => {
        const l = byKey[k], b = h('button', 'lever' + (seq.includes(k) ? ' down' : ''));
        b.style.setProperty('--c', l.color);
        b.append(h('span', 'knob'), h('span', 'stick'), h('span', 'lname', l.name));
        b.disabled = seq.includes(k);
        b.onclick = () => { seq.push(k); api.clear(); draw(); };
        row.append(b);
      });
      p.levers.forEach((_, i) => {
        const k = seq[i], d = h('span', 'dot', k ? byKey[k].name : String(i + 1));
        if (k) { d.classList.add('on'); d.style.background = byKey[k].color; }
        trail.append(d);
      });
      api.ready(seq.length === p.levers.length);
    };
    const reset = h('button', 'btn small', '레버 되돌리기'); reset.onclick = () => { seq = []; api.clear(); draw(); };
    const foot = h('div', 'row center'); foot.append(trail, reset);
    area.append(row, foot); draw();
    return () => seq.every((k, i) => k === p.answer[i]);
  };

  // ---------- 슬라이드 3×3 (같은 그림 조각끼리는 바꿔도 같음, 줄마다 그림이 맞으면 정답) ----------
  PZ.slide = function (p, area, api) {
    // 정답 배치: 줄 r 에 rows[r] 조각 3개, 마지막 칸은 빈칸(null)
    let cells = [];
    p.rows.forEach((rw, r) => { for (let c = 0; c < 3; c++) cells.push(r === 2 && c === 2 ? null : r); });
    const solved = () => cells.every((v, i) => (i === 8 ? v === null : v === Math.floor(i / 3)));
    const nb = i => [i - 3, i + 3, i % 3 ? i - 1 : -1, i % 3 < 2 ? i + 1 : -1].filter(j => j >= 0 && j < 9);
    const swap = i => { const e = cells.indexOf(null); [cells[e], cells[i]] = [cells[i], cells[e]]; };
    // 정답에서 무작위로 밀어 섞는다(항상 풀 수 있음). 같은 상태면 다시 섞는다.
    do {
      let prev = -1;
      for (let k = 0; k < (p.scramble || 60); k++) {
        const opts = nb(cells.indexOf(null)).filter(j => j !== prev);
        const j = opts[Math.floor(Math.random() * opts.length)];
        prev = cells.indexOf(null); swap(j);
      }
    } while (solved());
    const grid = h('div', 'slidegrid');
    const draw = () => {
      grid.innerHTML = '';
      cells.forEach((v, i) => {
        const t = h('button', v === null ? 'stile empty' : 'stile', v === null ? '' : p.rows[v].icon);
        if (v !== null) t.title = p.rows[v].name;
        const movable = v !== null && nb(i).includes(cells.indexOf(null));
        t.classList.toggle('movable', movable);
        t.onclick = () => { if (movable) { swap(i); api.clear(); draw(); } };
        grid.append(t);
      });
    };
    area.append(grid); draw(); api.ready(true);
    return solved;
  };

  // ---------- 암호 해독 (기호 → 숫자) ----------
  PZ.cipher = function (p, area, api) {
    const sym = h('div', 'cipher-syms');
    p.symbols.forEach(s => sym.append(h('span', 'csym', s)));
    const legend = h('div', 'cipher-legend');
    p.legend.forEach(s => legend.append(h('span', '', `${s} = ?`)));
    const inp = codeInput(p, api);
    area.append(sym, legend, inp);
    return () => inp.value === p.answer;
  };

  // ---------- 등대 신호 (같은 신호를 여러 번 쓸 수 있음) ----------
  PZ.signal = function (p, area, api) {
    let seq = [];
    const byKey = Object.fromEntries(p.signals.map(s => [s.key, s]));
    const slots = h('div', 'seq'), pad = h('div', 'sigpad');
    const draw = () => {
      slots.innerHTML = '';
      p.answer.forEach((_, i) => {
        const k = seq[i], s = h('div', 'slot' + (k ? ' filled' : ''), k ? `${byKey[k].icon} ${byKey[k].name}` : String(i + 1));
        slots.append(s);
      });
      [...pad.querySelectorAll('.sig')].forEach(b => (b.disabled = seq.length >= p.answer.length));
      api.ready(seq.length === p.answer.length);
    };
    p.signals.forEach(s => {
      const b = h('button', 'sig'); b.append(h('span', 'ico', s.icon), h('span', '', s.name));
      b.onclick = () => { seq.push(s.key); api.clear(); draw(); };
      pad.append(b);
    });
    const undo = h('button', 'btn small', '하나 지우기'); undo.onclick = () => { seq.pop(); api.clear(); draw(); };
    const reset = h('button', 'btn small', '처음부터'); reset.onclick = () => { seq = []; api.clear(); draw(); };
    pad.append(undo, reset);
    area.append(slots, pad); draw();
    return () => seq.length === p.answer.length && seq.every((k, i) => k === p.answer[i]);
  };

  // ---------- 유리 조각 2×2 (칸 0 왼위 → 1 오위 → 2 오아래 → 3 왼아래) ----------
  PZ.glass = function (p, area, api) {
    const cells = p.start.map(x => ({ p: x.p, r: x.r }));
    const POS = [0, 1, 3, 2]; // 칸 번호 → 2×2 그리드에서의 위치(행 우선)
    let sel = -1;
    const grid = h('div', 'glassgrid');
    const draw = () => {
      grid.innerHTML = '';
      const order = [];
      cells.forEach((c, i) => (order[POS[i]] = i));
      order.forEach(i => {
        const c = cells[i], pc = p.pieces[c.p];
        const cell = h('div', 'gcell' + (sel === i ? ' sel' : ''));
        const piece = h('button', 'gpiece');
        piece.style.background = pc.color;
        piece.style.transform = `rotate(${c.r * 90}deg)`;
        piece.append(h('span', 'gtri', '▲'), h('span', 'gname', pc.name));
        piece.onclick = () => {
          api.clear();
          if (sel === -1) sel = i;
          else if (sel === i) sel = -1;
          else { [cells[sel], cells[i]] = [cells[i], cells[sel]]; sel = -1; }
          draw();
        };
        const rot = h('button', 'grot', '⟳'); rot.title = '돌리기';
        rot.onclick = () => { c.r = (c.r + 1) % 4; api.clear(); draw(); };
        cell.append(piece, rot); grid.append(cell);
      });
    };
    area.append(grid); draw(); api.ready(true);
    return () => cells.every((c, i) => c.p === i && c.r === 0);
  };
})();
