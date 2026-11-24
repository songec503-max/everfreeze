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
    const target = p.target || [0, 0, 0, 0]; // 조각마다 ▲ 가 가리켜야 할 쪽
    return () => cells.every((c, i) => c.p === i && c.r === target[i]);
  };
})();

/* ===== 퍼즐 그림 부품 (assets/puzzle/*.webp) =====
   그림이 있으면 같은 규칙 그대로, 보이는 모습만 그림으로 바꾼다. 부품이 없으면 위의 기본 모양을 쓴다. */
(function () {
  const EF = window.EF, PZ = EF.PZ, h = EF.h;
  const has = k => EF.artHas('puzzle/' + k), src = k => EF.artSrc('puzzle/' + k);
  const img = (k, cls) => { const i = h('img', cls || ''); i.src = src(k); i.alt = ''; i.draggable = false; return i; };

  // --- 서랍 자물쇠 · 지워진 쪽수: 자물쇠 판(또는 책 쪽) 위에 숫자 바퀴가 굴러간다 ---
  const baseDial = PZ.dial, baseCipher = PZ.cipher;
  function drumRow(p, api) {
    const vals = Array(p.digits).fill(0), row = h('div', 'pa-drums');
    for (let i = 0; i < p.digits; i++) {
      const d = h('div', 'pa-drum'); d.style.backgroundImage = `url(${src('drawer-wheel')})`;
      const strip = h('div', 'pa-strip');
      for (let n = -1; n <= 10; n++) strip.append(h('span', '', String((n + 10) % 10)));
      d.append(strip);
      const set = dd => { vals[i] = (vals[i] + dd + 10) % 10; strip.style.transform = `translateY(${-(vals[i] + 1) * 100 / 12}%)`; api.clear(); };
      const up = h('button', 'pa-arrow up', '▲'), dn = h('button', 'pa-arrow dn', '▼');
      up.onclick = () => set(1); dn.onclick = () => set(-1);
      d.onwheel = e => { e.preventDefault(); set(e.deltaY < 0 ? 1 : -1); };
      const col = h('div', 'pa-drumcol'); col.append(up, d, dn); row.append(col); set(0);
    }
    return { row, vals };
  }
  PZ.dial = function (p, area, api) {
    if (!(has('drawer-lock') && has('drawer-wheel'))) return baseDial(p, area, api);
    const plate = h('div', 'pa-plate lock'); plate.append(img('drawer-lock', 'pa-bg'));
    const { row, vals } = drumRow(p, api); plate.append(row);
    area.append(plate); api.ready(true);
    return () => vals.join('') === p.answer;
  };
  PZ.cipher = function (p, area, api) {
    if (!(has('oldrec-page') && has('drawer-wheel'))) return baseCipher(p, area, api);
    const plate = h('div', 'pa-plate page'); plate.append(img('oldrec-page', 'pa-bg'));
    const { row, vals } = drumRow(p, api); plate.append(row);
    const legend = h('div', 'cipher-legend'); p.legend.forEach(s => legend.append(h('span', '', `${s} = ?`)));
    area.append(plate, legend); api.ready(true);
    return () => vals.join('') === p.answer;
  };

  // --- 회전 선반: 받침 위에 나이테 링 4개가 각각 돈다 (홈 10개 = 숫자 0~9) ---
  const baseRings = PZ.rings;
  PZ.rings = function (p, area, api) {
    const keys = ['shelf-ring1', 'shelf-ring2', 'shelf-ring3', 'shelf-ring4'];
    if (!(has('shelf-base') && keys.every(has))) return baseRings(p, area, api);
    const vals = Array(p.digits).fill(0), wrap = h('div', 'pa-rings');
    const stack = h('div', 'pa-ringstack'); stack.append(img('shelf-base', 'pa-bg'));
    const sizes = [0.86, 0.66, 0.47, 0.3], ctl = h('div', 'pa-ringctl'), sets = [];
    // 누른 곳이 가운데에서 얼마나 떨어졌는지로 어느 링인지 정한다 (링이 겹쳐 있어서)
    const ringAt = e => { const b = stack.getBoundingClientRect(), dx = e.clientX - b.left - b.width / 2, dy = e.clientY - b.top - b.height / 2;
      const d = Math.hypot(dx, dy) / b.width * 2; for (let i = sizes.length - 1; i >= 0; i--) if (d <= sizes[i] * .98) return i; return -1; };
    stack.onclick = e => { const i = ringAt(e); if (i >= 0) sets[i](1); };
    stack.oncontextmenu = e => { const i = ringAt(e); if (i >= 0) { e.preventDefault(); sets[i](-1); } };
    stack.onwheel = e => { const i = ringAt(e); if (i >= 0) { e.preventDefault(); sets[i](e.deltaY < 0 ? 1 : -1); } };
    keys.forEach((k, i) => {
      const r = img(k, 'pa-ring'); r.style.width = r.style.height = sizes[i] * 100 + '%'; stack.append(r);
      const num = h('b', 'pa-ringnum', '0');
      const set = d => { vals[i] = (vals[i] + d + 10) % 10; r.style.transform = `translate(-50%,-50%) rotate(${vals[i] * 36}deg)`; num.textContent = vals[i]; api.clear(); };
      sets[i] = set;
      const line = h('div', 'pa-ringrow');
      const dn = h('button', 'wbtn', '◀'), up = h('button', 'wbtn', '▶'); dn.onclick = () => set(-1); up.onclick = () => set(1);
      line.append(h('span', 'pa-ringlbl', p.labels && p.labels[i] ? p.labels[i] : `${i + 1}번째`), dn, num, up); ctl.append(line);
      set(0);
    });
    wrap.append(stack, ctl); area.append(wrap); api.ready(true);
    return () => vals.join('') === p.answer;
  };

  // --- 우편함 시계: 시계판 위에 시침 · 분침 그림이 돈다 ---
  const baseClock = PZ.clock;
  PZ.clock = function (p, area, api) {
    if (!(has('mailbox-clock') && has('mailbox-hour') && has('mailbox-minute'))) return baseClock(p, area, api);
    let hr = 12, mn = 0;
    const face = h('div', 'pa-clock'); face.append(img('mailbox-clock', 'pa-bg'));
    const H = img('mailbox-hour', 'pa-hand hour'), M = img('mailbox-minute', 'pa-hand minute'); face.append(H, M);
    const label = h('div', 'clock-label');
    const draw = () => {
      H.style.transform = `rotate(${(hr % 12) * 30 + mn / 2}deg)`;
      M.style.transform = `rotate(${mn * 6}deg)`;
      label.textContent = `${hr}시 ${String(mn).padStart(2, '0')}분`;
    };
    const btn = (t, f) => { const b = h('button', 'btn small', t); b.onclick = () => { f(); draw(); api.clear(); }; return b; };
    const ctl = h('div', 'clock-ctl');
    ctl.append(h('span', 'cl-t', '시'), btn('◀', () => (hr = hr === 1 ? 12 : hr - 1)), btn('▶', () => (hr = hr === 12 ? 1 : hr + 1)),
      h('span', 'cl-t', '분'), btn('◀', () => (mn = (mn + 55) % 60)), btn('▶', () => (mn = (mn + 5) % 60)));
    const box = h('div', 'clockbox'), side = h('div', 'clock-side'); side.append(label, ctl); box.append(face, side);
    area.append(box); draw(); api.ready(true);
    return () => hr === p.answer.h && mn === p.answer.m;
  };

  // --- 새집 레버: 장치 바탕 위에 색 레버 그림 ---
  const baseLever = PZ.lever;
  PZ.lever = function (p, area, api) {
    if (!(has('lever-base') && p.levers.every(l => has('lever-' + l.key)))) return baseLever(p, area, api);
    let seq = [];
    const byKey = Object.fromEntries(p.levers.map(l => [l.key, l]));
    const dev = h('div', 'pa-levdev'); dev.append(img('lever-base', 'pa-bg'));
    const row = h('div', 'pa-levrow'); dev.append(row);
    const trail = h('div', 'lever-trail');
    const draw = () => {
      row.innerHTML = ''; trail.innerHTML = '';
      p.display.forEach(k => {
        const b = h('button', 'pa-lever' + (seq.includes(k) ? ' down' : '')); b.title = byKey[k].name;
        b.append(img('lever-' + k)); b.disabled = seq.includes(k);
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
    area.append(dev, foot); draw();
    return () => seq.every((k, i) => k === p.answer[i]);
  };

  // --- 기록 조각 슬라이드 · 유리 조각: 칸 · 조각을 그림으로 ---
  const TILE = { sun: 'archive-tile-sun', tower: 'archive-tile-tower', wave: 'archive-tile-wave' };
  const GLASS = { dawn: 'glass-dawn', noon: 'glass-noon', dusk: 'glass-dusk', night: 'glass-night' };
  const baseSlide = PZ.slide, baseGlass = PZ.glass;
  PZ.slide = function (p, area, api) {
    const ok = baseSlide(p, area, api);
    if (!p.rows.every(r => has(TILE[r.key])) || !has('archive-frame')) return ok;
    const grid = area.querySelector('.slidegrid'); if (!grid) return ok;
    grid.classList.add('pz-art'); grid.style.backgroundImage = `url(${src('archive-frame')})`;
    const paint = () => grid.querySelectorAll('.stile:not(.empty)').forEach(t => {
      const r = p.rows.find(x => x.icon === t.textContent || x.name === t.title);
      if (r) { t.style.backgroundImage = `url(${src(TILE[r.key])})`; t.classList.add('pic'); }
    });
    paint(); new MutationObserver(paint).observe(grid, { childList: true });
    return ok;
  };
  PZ.glass = function (p, area, api) {
    const ok = baseGlass(p, area, api);
    if (!p.pieces.every(x => has(GLASS[x.key])) || !has('glass-frame')) return ok;
    const grid = area.querySelector('.glassgrid'); if (!grid) return ok;
    grid.classList.add('pz-art'); grid.style.backgroundImage = `url(${src('glass-frame')})`;
    const paint = () => grid.querySelectorAll('.gpiece').forEach(g => {
      const pc = p.pieces.find(x => x.name === (g.querySelector('.gname') || {}).textContent);
      if (pc) { g.style.background = `url(${src(GLASS[pc.key])}) center/cover`; g.classList.add('pic'); }
    });
    paint(); new MutationObserver(paint).observe(grid, { childList: true });
    return ok;
  };

  // --- 등대 신호: 꺼진 램프 위에 누른 신호의 빛이 켜진다 ---
  const LIGHT = { morning: 'letter-light-morning', noon: 'letter-light-noon', evening: 'letter-light-evening', night: 'letter-light-night' };
  const baseSignal = PZ.signal;
  PZ.signal = function (p, area, api) {
    const ok = baseSignal(p, area, api);
    if (!has('letter-lamp') || !p.signals.every(s => has(LIGHT[s.key]))) return ok;
    const lamp = h('div', 'pa-lamp'); lamp.append(img('letter-lamp', 'pa-bg'));
    const glow = h('img', 'pa-glow'); glow.alt = ''; lamp.append(glow);
    area.prepend(lamp);
    area.querySelectorAll('.sig').forEach((b, i) => {
      const s = p.signals[i]; if (!s) return;
      b.addEventListener('click', () => {
        glow.src = src(LIGHT[s.key]); glow.classList.remove('on'); void glow.offsetWidth; glow.classList.add('on');
      });
      const ic = b.querySelector('.ico'); if (ic) { ic.textContent = ''; ic.append(img(LIGHT[s.key], 'pa-sigico')); }
    });
    return ok;
  };
})();
