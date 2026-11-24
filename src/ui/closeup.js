/* 클로즈업 장면. 조사 요소를 누르면 그림 창 전체가 그 물건을 가까이 본 장면으로 바뀐다.
   글로 설명하지 않는다(제목·설명 문장 없음). 힌트는 그림 속 사물로만 보인다.
   돌아가기: 장면과 똑같이 그림 하단(▼ 띠)을 클릭. 키보드는 Esc.
   그림 데이터는 src/data/views.js. */
(function () {
  const EF = window.EF, UI = EF.UI, h = EF.h;
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (svg, tag, at, text) => {
    const e = document.createElementNS(NS, tag);
    for (const k in at) e.setAttribute(k, at[k]);
    if (text !== undefined) e.textContent = text;
    svg.append(e); return e;
  };
  const newSvg = (w, hh) => { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', `0 0 ${w} ${hh}`); return s; };
  const R = {}; // kind 별 그리기

  R.pic = (v, id) => {
    const box = h('div', 'cv-pic');
    if (id && EF.viewImg(id)) {
      box.style.backgroundImage = `url(${EF.viewImg(id)})`;
      box.classList.add('has-img');
    } else {
      const [a, b] = v.tone || ['#e9e4dc', '#9c9284'];
      box.style.background = `radial-gradient(ellipse at 50% 45%, ${a} 0%, ${b} 100%)`;
      box.append(h('div', 'cv-icon', v.icon || '?'));
      if (id) box.append(h('div', 'cv-tag', `임시 그림 · assets/view/${id}.png`));
    }
    return box;
  };

  R.doc = v => {
    const box = h('div', 'cv-doc paper-' + (v.paper || 'note') + (v.blur ? ' blur' : ''));
    const sheet = h('div', 'd-sheet');
    if (v.head) sheet.append(h('div', 'd-head', v.head));
    if (v.cols || v.rows.some(Array.isArray)) {
      const t = h('table', 'd-table');
      if (v.cols) { const tr = h('tr'); v.cols.forEach(c => tr.append(h('th', '', c))); t.append(tr); }
      v.rows.forEach(r => { const tr = h('tr'); [].concat(r).forEach(c => tr.append(h('td', '', c))); t.append(tr); });
      sheet.append(t);
    } else v.rows.forEach(r => sheet.append(h('p', 'd-line', r || ' ')));
    if (v.foot) sheet.append(h('div', 'd-foot', v.foot));
    box.append(sheet);
    return box;
  };

  R.strip = v => {
    const box = h('div', 'cv-strip');
    const sheet = h('div', 'st-sheet');
    if (v.rtl) { // 오른쪽 끝(●)에서 시작해 왼쪽으로 읽는다: 화면에는 거꾸로 놓고 화살표는 ←
      const items = v.items.slice().reverse();
      items.forEach((icon, i) => { if (i) sheet.append(h('span', 'st-arrow', '←')); sheet.append(h('span', 'st-icon', icon)); });
      sheet.append(h('span', 'st-start', '●'));
    } else v.items.forEach((icon, i) => { if (i) sheet.append(h('span', 'st-arrow', '→')); sheet.append(h('span', 'st-icon', icon)); });
    box.append(sheet);
    return box;
  };

  R.clock = v => {
    const box = h('div', 'cv-clock');
    const svg = newSvg(200, 200);
    svgEl(svg, 'circle', { cx: 100, cy: 100, r: 94, class: 'ck-rim' });
    for (let i = 0; i < 60; i++) {
      const a = i * Math.PI / 30, r1 = i % 5 ? 86 : 80;
      svgEl(svg, 'line', { x1: 100 + r1 * Math.sin(a), y1: 100 - r1 * Math.cos(a), x2: 100 + 90 * Math.sin(a), y2: 100 - 90 * Math.cos(a), class: i % 5 ? 'ck-tick' : 'ck-tick big' });
    }
    ['XII', 'III', 'VI', 'IX'].forEach((n, i) => {
      const a = i * Math.PI / 2;
      svgEl(svg, 'text', { x: 100 + 66 * Math.sin(a), y: 100 - 66 * Math.cos(a) + 7, class: 'ck-num' }, n);
    });
    // 시계 방향 표시(바늘은 늘 이 방향으로만 돈다)
    svgEl(svg, 'path', { d: 'M 128 30 A 76 76 0 0 1 170 72', class: 'ck-dir' });
    svgEl(svg, 'path', { d: 'M 170 72 l -9 -2 m 9 2 l 1 -9', class: 'ck-dir' });
    svgEl(svg, 'line', { x1: 100, y1: 100, x2: 100, y2: 50, class: 'ck-h', transform: `rotate(${(v.h % 12) * 30 + v.m / 2} 100 100)` });
    svgEl(svg, 'line', { x1: 100, y1: 108, x2: 100, y2: 22, class: 'ck-m', transform: `rotate(${v.m * 6} 100 100)` });
    svgEl(svg, 'circle', { cx: 100, cy: 100, r: 5, class: 'ck-pin' });
    box.append(svg);
    return box;
  };

  R.lights = v => {
    const box = h('div', 'cv-lights');
    const n = v.colors.length;
    const LAMP = { '#e8c547': 'yellow', '#5b8fd9': 'blue', '#5fb37a': 'green', '#e59ac0': 'pink' }; // 해파리 조명 그림(있으면)
    const useImg = v.colors.every(c => EF.artHas('el/jelly-' + LAMP[c]));
    if (useImg) box.classList.add('lamps');
    v.colors.forEach((c, i) => {
      const b = useImg ? h('img', 'bulb lamp') : h('div', 'bulb'); b.style.setProperty('--c', c);
      if (useImg) { b.src = EF.artSrc('el/jelly-' + LAMP[c]); b.alt = ''; }
      const k = v.order ? v.order.indexOf(i) : i; // 몇 번째로 켜지는지
      b.style.animationDelay = (k * 0.7) + 's'; b.style.animationDuration = (n * 0.7 + 1.2) + 's';
      box.append(b);
    });
    return box;
  };

  // 망토 옷걸이: 가로 봉에 옷걸이가 줄지어 있고, 옷걸이마다 꼬리표가 크게 달려 있다
  R.rack = v => {
    const box = h('div', 'cv-rack');
    const bar = h('div', 'rk-bar'), row = h('div', 'rk-row');
    v.items.forEach(it => {
      const hg = h('div', 'rk-hanger' + (it.color ? '' : ' empty'));
      hg.append(h('div', 'rk-hook'));
      if (it.color) { const c = h('div', 'rk-cloak'); c.style.setProperty('--c', it.color); hg.append(c); }
      const tag = h('div', 'rk-tag'); tag.append(h('span', 'rk-ico', it.tag), h('span', 'rk-name', it.name));
      hg.append(tag); row.append(hg);
    });
    box.append(bar, row);
    return box;
  };

  // 망토 완성 도안: 벽에 핀으로 꽂힌 모눈 도안 종이. 망토 모양 안이 가로 세 띠로 나뉘고, 띠마다 같은 문양이 수놓여 있다.
  R.pattern = v => {
    const box = h('div', 'cv-pattern');
    const sheet = h('div', 'pt-sheet');
    ['tl', 'tr', 'bl', 'br'].forEach(k => sheet.append(h('span', 'pt-pin ' + k)));
    const cloak = h('div', 'pt-cloak');
    const ol = newSvg(440, 470); ol.setAttribute('class', 'pt-outline'); ol.setAttribute('preserveAspectRatio', 'none');
    svgEl(ol, 'polygon', { points: '158,3 282,3 437,85 412,467 28,467 3,85' });
    cloak.append(ol, h('div', 'pt-collar'));
    v.rows.forEach(icon => { const r = h('div', 'p-row'); for (let i = 0; i < 4; i++) r.append(h('span', '', icon)); cloak.append(r); });
    sheet.append(cloak, h('div', 'pt-scissors', '✂'));
    box.append(sheet);
    return box;
  };

  // 천 위의 바느질 줄: 앞쪽 땀은 실로 꿰매져 있고, 바늘이 마지막 땀에 꽂힌 채 멈춰 있다. 남은 자리는 바늘구멍만.
  // (누르는 버튼이 아니라 보기만 하는 단서 · 번호 없이 땀 수를 세게 한다)
  R.steps = v => {
    const box = h('div', 'cv-steps');
    const cloth = h('div', 's-cloth');
    if (v.mark) cloth.append(h('div', 's-tag', v.mark));
    const row = h('div', 's-row');
    for (let i = 1; i <= v.total; i++) {
      const st = h('div', 's-st' + (i <= v.done ? ' sewn' : ''));
      if (i === v.done) { st.classList.add('last'); st.append(h('span', 's-needle')); }
      row.append(st);
    }
    cloth.append(row); box.append(cloth);
    return box;
  };

  R.pins = v => {
    const box = h('div', 'cv-pins paper-' + (v.paper || 'cork'));
    v.items.forEach((it, i) => {
      const n = h('div', 'pin-note');
      if (it.icon) n.append(h('div', 'pn-icon', it.icon));
      if (it.text) n.append(h('div', 'pn-text', it.text));
      if (it.mark) n.append(h('div', 'pn-mark', it.mark));
      n.style.transform = `rotate(${[-3, 2, -1, 3, -2, 1, -4, 2, 0, -2][i % 10]}deg)`;
      box.append(n);
    });
    return box;
  };

  R.stack = v => {
    const box = h('div', 'cv-stack');
    for (let i = 0; i < v.count; i++) {
      const s = h('div', 'st-item');
      s.append(h('span', 'si-icon', v.icon));
      if (v.mark) s.append(h('span', 'si-mark', v.mark));
      s.style.transform = `translate(${(i - (v.count - 1) / 2) * 230}px, ${Math.abs(i - (v.count - 1) / 2) * 18}px) rotate(${(i - 1) * 5}deg)`;
      box.append(s);
    }
    return box;
  };

  // 「나이테 읽는 법」: 바깥 링부터 ①②③④, 시계는 긴 바늘(분) ① → 짧은 바늘(시) ②
  R.ringguide = () => {
    const box = h('div', 'cv-doc paper-book');
    const svg = newSvg(900, 420); svg.setAttribute('class', 'rg-svg');
    const rings = [175, 130, 85, 40];
    rings.forEach(r => svgEl(svg, 'circle', { cx: 230, cy: 210, r, class: 'rg-ring' }));
    // 번호는 오른쪽 아래 대각선 위에 바깥부터 1 2 3 4
    rings.forEach((r, i) => {
      const x = 230 + r * 0.707, y = 210 + r * 0.707;
      svgEl(svg, 'circle', { cx: x, cy: y, r: 17, class: 'rg-badge' });
      svgEl(svg, 'text', { x, y: y + 7, class: 'rg-num' }, String(i + 1));
    });
    // 바깥에서 안쪽으로 들어가는 화살표(왼쪽 위 대각선)
    svgEl(svg, 'path', { d: 'M 60 40 L 190 170', class: 'rg-arrow' });
    svgEl(svg, 'path', { d: 'M 172 170 L 192 172 L 190 152', class: 'rg-arrow' });
    // 시계: 긴 바늘 ① 먼저, 짧은 바늘 ② 나중
    svgEl(svg, 'circle', { cx: 660, cy: 210, r: 150, class: 'rg-clock' });
    svgEl(svg, 'line', { x1: 660, y1: 210, x2: 790, y2: 150, class: 'rg-long' });
    svgEl(svg, 'line', { x1: 660, y1: 210, x2: 600, y2: 290, class: 'rg-short' });
    svgEl(svg, 'circle', { cx: 660, cy: 210, r: 7, class: 'rg-pin' });
    svgEl(svg, 'circle', { cx: 800, cy: 122, r: 20, class: 'rg-badge' });
    svgEl(svg, 'text', { x: 800, y: 129, class: 'rg-num' }, '1');
    svgEl(svg, 'circle', { cx: 580, cy: 318, r: 20, class: 'rg-badge' });
    svgEl(svg, 'text', { x: 580, y: 325, class: 'rg-num' }, '2');
    box.append(svg);
    return box;
  };

  // it: { view: 'v-…' | {kind…} }
  //   그림 파일: assets/view/<ID>.png (EF.VIEW_IMAGES 에 등록). 기본은 그림 그대로, overlay:true 인 것만 그림 위에 글을 얹는다.
  UI.showView = function (it, done) {
    const id = typeof it.view === 'string' ? it.view : null;
    const v = id ? EF.VIEWS[id] : (it.view || { kind: 'pic' });
    if (!v) { console.warn('알 수 없는 클로즈업', it.view); done(); return; }

    const cu = h('div', 'closeup' + (EF.isEnded() ? ' quiet' : ''));
    cu.dataset.view = id || '';
    const hasImg = !!(id && EF.viewImg(id));
    // 그림이 있을 때:
    //  - 기본(퍼즐 단서 그림): 글자·숫자·기호까지 그림에 그려져 있으므로 그림만 보여 준다.
    //  - overlay:true(퍼즐과 무관한 그림): 글 없는 바탕 그림 위 box 영역에 글을 얹는다. bare:true 면 종이 바탕도 뺀다.
    const content = hasImg && !v.overlay ? R.pic({}, id) : (R[v.kind] || R.pic)(v, id);
    if (hasImg && v.overlay && v.kind !== 'pic') {
      const pb = h('div', 'cu-picbg'); pb.style.backgroundImage = `url(${EF.viewImg(id)})`; cu.append(pb); // 글을 얹을 바탕 그림
      content.classList.add('on-img');
      if (v.bare) content.classList.add('bare');
      const b = v.box || [240, 110, 800, 500];
      Object.assign(content.style, { position: 'absolute', left: b[0] + 'px', top: b[1] + 'px', width: b[2] + 'px', height: b[3] + 'px' });
    }
    cu.append(content);
    if (hasImg) { cu.classList.add('has-img'); cu.append(EF.blurBg()); } // 흐린 장면 배경(뒤에 깔림)
    // 돌아가기: 장면과 같은 하단 띠 + ▼
    const back = h('div', 'edge-back'); back.append(h('div', 'edge-arrow'));
    cu.append(back);
    UI.stage.append(cu);

    const close = () => { cu.remove(); UI.dismiss = null; UI.dismissEscOnly = false; done(); };
    back.onclick = e => { e.stopPropagation(); close(); };
    UI.dismiss = close; UI.dismissEscOnly = true; // 키보드는 Esc 만(Enter/Space 로는 안 닫힘)
  };
})();
