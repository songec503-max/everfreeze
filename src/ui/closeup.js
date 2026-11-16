/* 크롭 창(클로즈업). 조사 요소를 누르면 옛날 사이트의 작은 팝업 창처럼 열려,
   그 요소를 가까이 본 그림(또는 종이·표)과 짧은 은유 한 줄을 보여 준다.
   닫기: × / 창 바깥 클릭 / Esc·Enter·Space. 그림 데이터는 src/data/views.js. */
(function () {
  const EF = window.EF, UI = EF.UI, h = EF.h;
  const NS = 'http://www.w3.org/2000/svg';
  const R = {}; // kind 별 그리기

  R.pic = (v, id) => {
    const box = h('div', 'cv-pic');
    if (id && EF.VIEW_IMAGES.includes(id)) {
      box.style.backgroundImage = `url(assets/view/${id}.png)`;
      box.classList.add('has-img');
    } else {
      const [a, b] = v.tone || ['#e9e4dc', '#9c9284'];
      box.style.background = `radial-gradient(ellipse at 50% 45%, ${a} 0%, ${b} 100%)`;
      box.append(h('div', 'cv-icon', v.icon || '?'));
      if (id) box.append(h('div', 'cv-tag', `크롭 이미지 자리 · assets/view/${id}.png`));
    }
    return box;
  };

  R.doc = v => {
    const box = h('div', 'cv-doc paper-' + (v.paper || 'note'));
    if (v.head) box.append(h('div', 'd-head', v.head));
    if (v.cols || v.rows.some(Array.isArray)) {
      const t = h('table', 'd-table');
      if (v.cols) { const tr = h('tr'); v.cols.forEach(c => tr.append(h('th', '', c))); t.append(tr); }
      v.rows.forEach(r => { const tr = h('tr'); [].concat(r).forEach(c => tr.append(h('td', '', c))); t.append(tr); });
      box.append(t);
    } else v.rows.forEach(r => box.append(h('p', 'd-line', r || ' ')));
    if (v.foot) box.append(h('div', 'd-foot', v.foot));
    return box;
  };

  R.clock = v => {
    const box = h('div', 'cv-clock');
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 200 200');
    const el = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); svg.append(e); return e; };
    el('circle', { cx: 100, cy: 100, r: 94, class: 'ck-rim' });
    for (let i = 0; i < 60; i++) {
      const a = i * Math.PI / 30, r1 = i % 5 ? 86 : 80;
      el('line', { x1: 100 + r1 * Math.sin(a), y1: 100 - r1 * Math.cos(a), x2: 100 + 90 * Math.sin(a), y2: 100 - 90 * Math.cos(a), class: i % 5 ? 'ck-tick' : 'ck-tick big' });
    }
    ['XII', 'III', 'VI', 'IX'].forEach((n, i) => {
      const a = i * Math.PI / 2, t = el('text', { x: 100 + 66 * Math.sin(a), y: 100 - 66 * Math.cos(a) + 7, class: 'ck-num' }); t.textContent = n;
    });
    el('line', { x1: 100, y1: 100, x2: 100, y2: 50, class: 'ck-h', transform: `rotate(${(v.h % 12) * 30 + v.m / 2} 100 100)` });
    el('line', { x1: 100, y1: 108, x2: 100, y2: 22, class: 'ck-m', transform: `rotate(${v.m * 6} 100 100)` });
    el('circle', { cx: 100, cy: 100, r: 5, class: 'ck-pin' });
    box.append(svg);
    return box;
  };

  R.lights = v => {
    const box = h('div', 'cv-lights');
    const n = v.colors.length;
    v.colors.forEach((c, i) => {
      const b = h('div', 'bulb'); b.style.setProperty('--c', c);
      b.style.animationDelay = (i * 0.7) + 's'; b.style.animationDuration = (n * 0.7 + 1.2) + 's';
      box.append(b);
    });
    return box;
  };

  R.pattern = v => {
    const box = h('div', 'cv-pattern');
    v.rows.forEach(icon => { const r = h('div', 'p-row'); for (let i = 0; i < 3; i++) r.append(h('span', '', icon)); box.append(r); });
    return box;
  };

  R.steps = v => {
    const box = h('div', 'cv-steps');
    const row = h('div', 's-row');
    for (let i = 1; i <= v.total; i++) {
      const d = h('div', 's-dot' + (i < v.done ? ' done' : i === v.done ? ' stop' : ''), i <= v.done ? String(i) : '');
      if (i === v.done) d.append(h('span', 's-needle', '🪡'));
      row.append(d);
    }
    box.append(row);
    return box;
  };

  R.pins = v => {
    const box = h('div', 'cv-pins paper-' + (v.paper || 'cork'));
    v.items.forEach((t, i) => {
      const n = h('div', 'pin-note', t);
      n.style.transform = `rotate(${[-3, 2, -1, 3, -2, 1][i % 6]}deg)`;
      box.append(n);
    });
    return box;
  };

  R.stack = v => {
    const box = h('div', 'cv-stack');
    for (let i = 0; i < v.count; i++) {
      const s = h('div', 'st-item', v.icon);
      s.style.transform = `translate(${i * 26 - (v.count - 1) * 13}px, ${i * -10}px) rotate(${(i - 1) * 6}deg)`;
      box.append(s);
    }
    return box;
  };

  // it: { view: 'v-…' | {kind…}, caption? }
  UI.showView = function (it, done) {
    const id = typeof it.view === 'string' ? it.view : null;
    const v = id ? EF.VIEWS[id] : (it.view || { kind: 'pic' });
    if (!v) { console.warn('알 수 없는 크롭 창', it.view); done(); return; }
    const caption = it.caption !== undefined ? it.caption : v.caption;

    const sc = h('div', 'scrim cscrim');
    const win = h('div', 'cwin' + (EF.isEnded() ? ' quiet' : ''));
    const bar = h('div', 'cbar');
    const x = h('button', 'cx', '×'); x.title = '닫기';
    bar.append(h('span', 'ctitle', v.title || ''), x);
    const pane = h('div', 'cpane');
    pane.append((R[v.kind] || R.pic)(v, id));
    win.append(bar, pane);
    if (caption) win.append(h('div', 'ccap', caption));
    sc.append(win); UI.stage.append(sc);

    const close = () => { sc.remove(); UI.dismiss = null; done(); };
    x.onclick = e => { e.stopPropagation(); close(); };
    sc.onclick = e => { if (e.target === sc) close(); };
    UI.dismiss = close;
  };
})();
