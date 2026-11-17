/* 사이트 전체 오류 연출: 세계에 오류가 생기면 게임 창 바깥(사이트 자체)도 망가진다.
   단계 2: 아주 가끔 글자가 깨짐 · 옅은 알갱이
   단계 3: 글자 깨짐 잦아짐 · 제목 색 번짐 · 작은 픽셀 블록 · 틀/커튼 일부 색 뒤틀림 · 칸이 순간적으로 옆으로 밀림
   단계 4: 위 모든 것이 심해짐 · 가로 띠가 색 반전 · 순간적인 검은 틈 · 사이트에 검은 균열이 남는다
   단계 5: 움직임은 멈추고, 깨진 글자와 균열(큰 틈 포함)이 그대로 남는다
   글자 깨짐은 화면에만 보이는 연출이라 원래 문장은 바뀌지 않는다(곧 되돌아온다). 버튼·탭 글자는 건드리지 않는다. */
(function () {
  const EF = window.EF;
  const G = (EF.Glitch = { stage: 1 });
  const GLYPHS = '▒▓░█▚▞▙▟◤◥◣◢�□■▪▫¦╳╱╲ㅁㅂㅃㅉㄸ#%&@';
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [], layer, cracks, site;

  // 깨뜨릴 글자: 사이트 틀의 설명 글 (게임 창 안과 버튼·탭은 제외)
  const TEXT_SEL = '#masthead .tagline, #ptitle, #pintro, #caption .tip, #foot span, .bs-title, .bs-sub';
  function textNodes() {
    const out = [];
    document.querySelectorAll(TEXT_SEL).forEach(el => {
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode());) if (n.nodeValue.trim().length > 1 && !n.parentElement.closest('button, a, #stage')) out.push(n);
    });
    return out;
  }
  const frozen = new WeakMap(); // 5단계에서 이미 깨뜨린 글자(다시 깨뜨리지 않는다)
  function corrupt(n, ratio, ms) {
    const orig = n.nodeValue, chars = [...orig];
    const k = Math.max(1, Math.round(chars.length * ratio));
    for (let i = 0; i < k; i++) { const j = Math.floor(Math.random() * chars.length); if (chars[j].trim()) chars[j] = pick(GLYPHS); }
    const bad = chars.join(''); n.nodeValue = bad;
    if (!ms) frozen.set(n, bad);
    if (ms) setTimeout(() => { if (n.nodeValue === bad) n.nodeValue = orig; }, ms); // 그 사이 문장이 바뀌었으면 건드리지 않는다
  }

  // 화면 위 연출 층 (누르기를 막지 않는다)
  function ensureLayer() {
    if (layer) return;
    site = document.getElementById('site');
    layer = document.createElement('div'); layer.className = 'glitch-layer'; document.body.append(layer);
    cracks = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); cracks.setAttribute('class', 'site-cracks'); site.append(cracks);
  }
  function blip(cls, css, ms) {
    const d = document.createElement('div'); d.className = cls; Object.assign(d.style, css); layer.append(d);
    setTimeout(() => d.remove(), ms);
  }
  // 픽셀 블록: 사이트의 어느 부분(틀·머리말·설명 칸·무대 뒤) 위에 잠깐 생긴다
  function pixels(n) {
    const targets = ['#stagewrap', '#masthead', '#caption', '.backstage', '#foot'].map(s => document.querySelector(s)).filter(Boolean);
    for (let i = 0; i < n; i++) {
      const t = pick(targets).getBoundingClientRect(), s = rnd(6, 34);
      // 틀 가장자리 근처에 몰리게 (커튼·틀 색이 일부 바뀌어 보이도록)
      const edge = Math.random() < .5, x = edge ? (Math.random() < .5 ? t.left + rnd(-8, 24) : t.right - rnd(-8, 24)) : rnd(t.left, t.right), y = rnd(t.top, t.bottom);
      blip('gpx ' + pick(['k', 'm', 'c', 'h', 'h', 'i']), { left: x + 'px', top: y + 'px', width: s * rnd(1, 3) + 'px', height: s + 'px' }, rnd(90, 260));
    }
  }
  // 화면 아무 곳(좌우 배경 포함)에 산발적으로: 노이즈 덩어리 · 픽셀 블록 · 색 반전 조각 · 어긋난 가로 선
  function scatter(n, big) {
    for (let i = 0; i < n; i++) {
      const x = rnd(-20, innerWidth), y = rnd(-20, innerHeight), kind = pick(['noise', 'noise', 'px', 'px', 'inv', 'hue', 'line']);
      if (kind === 'noise') { const w = rnd(40, big ? 260 : 140), hh = rnd(20, big ? 160 : 90); blip('gnoise', { left: x + 'px', top: y + 'px', width: w + 'px', height: hh + 'px' }, rnd(120, 420)); }
      else if (kind === 'line') blip('gline', { left: x + 'px', top: y + 'px', width: rnd(80, big ? 520 : 260) + 'px' }, rnd(80, 200));
      else if (kind === 'px') { const sz = rnd(5, big ? 46 : 26); blip('gpx ' + pick(['k', 'k', 'm', 'c']), { left: x + 'px', top: y + 'px', width: sz * rnd(1, 4) + 'px', height: sz + 'px' }, rnd(90, 260)); }
      else blip('gpx ' + (kind === 'inv' ? 'i' : 'h'), { left: x + 'px', top: y + 'px', width: rnd(30, big ? 220 : 110) + 'px', height: rnd(10, big ? 90 : 50) + 'px' }, rnd(100, 300));
    }
  }

  // 배경 종이가 찢겨 뒤의 검은 바탕이 보인다 (3단계부터, 단계가 오를수록 늘고 커진다)
  let tears, tearsTop;
  function drawTears(stage) {
    const NS = 'http://www.w3.org/2000/svg';
    if (!tears) {
      tears = document.createElementNS(NS, 'svg'); tears.setAttribute('class', 'paper-tears'); document.body.prepend(tears);
      tearsTop = document.createElementNS(NS, 'svg'); tearsTop.setAttribute('class', 'paper-tears top'); document.body.append(tearsTop);
    }
    const W = document.documentElement.scrollWidth, H = Math.max(document.documentElement.scrollHeight, innerHeight);
    [tears, tearsTop].forEach(t => { t.setAttribute('width', W); t.setAttribute('height', H); t.setAttribute('viewBox', `0 0 ${W} ${H}`); t.innerHTML = ''; });
    if (stage < 3) return;
    let seed = 31; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280; // 매번 같은 자리
    const sr = site.getBoundingClientRect(), sl = sr.left + scrollX, srt = sr.right + scrollX;
    // 찢긴 구멍 하나: 바깥은 밝은 찢긴 종이 가장자리, 안쪽은 검은 바탕
    const hole = (svg, cx, cy, rx, ry) => {
      const N = 26, rim = [], inner = [];
      for (let i = 0; i < N; i++) {
        const a = i / N * Math.PI * 2, j = .72 + r() * .5, k = j - .08 - r() * .1;
        rim.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
        inner.push([cx + Math.cos(a) * rx * k + (r() - .5) * 4, cy + Math.sin(a) * ry * k + (r() - .5) * 4]);
      }
      const d = pts => 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z';
      const a = document.createElementNS(NS, 'path'); a.setAttribute('d', d(rim)); a.setAttribute('class', 'tear-rim');
      const b = document.createElementNS(NS, 'path'); b.setAttribute('d', d(inner)); b.setAttribute('class', 'tear-hole');
      svg.append(a, b);
      // 찢긴 섬유 몇 가닥
      for (let i = 0; i < 6; i++) { const p0 = inner[Math.floor(r() * N)], f = document.createElementNS(NS, 'path');
        f.setAttribute('d', `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} l${((r() - .5) * 14).toFixed(1)},${((r() - .5) * 14).toFixed(1)}`); f.setAttribute('class', 'tear-fiber'); svg.append(f); }
    };
    const margin = () => r() < .5 ? rnd2(10, Math.max(20, sl - 30)) : rnd2(Math.min(W - 20, srt + 30), W - 10);
    function rnd2(a, b) { return a + r() * (b - a); }
    const count = { 3: 3, 4: 7, 5: 11 }[Math.min(stage, 5)], scale = { 3: 1, 4: 1.5, 5: 2 }[Math.min(stage, 5)];
    for (let i = 0; i < count; i++) hole(tears, margin(), rnd2(40, H - 40), (18 + r() * 34) * scale, (14 + r() * 28) * scale);
    // 4단계부터: 사이트 종이 가장자리도 살짝 찢긴다 / 5단계: 더 크게
    if (stage >= 4) for (let i = 0; i < (stage >= 5 ? 5 : 2); i++) hole(tearsTop, r() < .5 ? sl + r() * 30 : srt - r() * 30, rnd2(120, H - 120), (16 + r() * 26) * (stage >= 5 ? 1.6 : 1), (12 + r() * 22) * (stage >= 5 ? 1.6 : 1));
  }

  function band(kind) { // 가로 띠: 색 반전 / 색 뒤틀림 / 검은 틈
    const hgt = kind === 'gap' ? rnd(2, 7) : rnd(8, 40);
    blip('gband ' + kind, { top: rnd(0, innerHeight) + 'px', height: hgt + 'px' }, kind === 'gap' ? rnd(60, 140) : rnd(80, 200));
  }
  function shove() { // 칸이 순간적으로 옆으로 밀림
    const el = pick(['#masthead', '#stagewrap', '#caption', '.backstage', '#foot'].map(s => document.querySelector(s)).filter(Boolean));
    const dx = rnd(5, 16) * (Math.random() < .5 ? -1 : 1);
    el.style.transform = `translateX(${dx}px)`; el.classList.add('gshove');
    setTimeout(() => { el.style.transform = ''; el.classList.remove('gshove'); }, rnd(70, 160));
  }

  // 사이트 위 검은 균열 (4단계부터 남는다)
  function drawCracks(stage) {
    const W = site.scrollWidth, H = site.scrollHeight;
    cracks.setAttribute('viewBox', `0 0 ${W} ${H}`); cracks.setAttribute('width', W); cracks.setAttribute('height', H);
    cracks.innerHTML = '';
    if (stage < 4) return;
    let seed = 7; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280; // 매번 같은 모양
    const crack = (x, y, len, ang, w) => {
      let d = `M${x},${y}`, px = x, py = y;
      for (let i = 0; i < len; i++) { ang += (r() - .5) * .9; px += Math.cos(ang) * (18 + r() * 26); py += Math.sin(ang) * (18 + r() * 26); d += ` L${px.toFixed(1)},${py.toFixed(1)}`;
        if (r() < .18) { const b = document.createElementNS(cracks.namespaceURI, 'path'); let bx = px, by = py, ba = ang + (r() < .5 ? 1 : -1) * (0.6 + r()); let bd = `M${bx},${by}`;
          for (let j = 0; j < 4; j++) { bx += Math.cos(ba) * 14; by += Math.sin(ba) * 14; ba += (r() - .5); bd += ` L${bx.toFixed(1)},${by.toFixed(1)}`; }
          b.setAttribute('d', bd); b.setAttribute('class', 'ck thin'); cracks.append(b); } }
      const p = document.createElementNS(cracks.namespaceURI, 'path'); p.setAttribute('d', d); p.setAttribute('class', 'ck'); p.style.strokeWidth = w; cracks.append(p);
    };
    crack(0, H * .12, 26, .15, 2.5); crack(W, H * .55, 22, Math.PI - .2, 2); crack(W * .3, 0, 14, 1.3, 1.6);
    if (stage >= 5) {
      crack(W * .7, H, 16, -1.6, 2.2); crack(0, H * .78, 30, -.08, 3);
      // 페이지를 가로지르는 큰 틈: 검은 쐐기 모양의 갈라짐
      let top = `M0,${H * .42}`, bot = '', x = 0, y = H * .42; const pts = [];
      while (x < W) { x += 40 + r() * 60; y += (r() - .5) * 36; pts.push([Math.min(x, W), y]); }
      pts.forEach(([a, b]) => top += ` L${a.toFixed(1)},${b.toFixed(1)}`);
      [...pts].reverse().forEach(([a, b], i) => bot += ` L${a.toFixed(1)},${(b + 3 + r() * 9 + Math.sin(i) * 2).toFixed(1)}`);
      const g = document.createElementNS(cracks.namespaceURI, 'path'); g.setAttribute('d', top + bot + ` L0,${H * .42 + 8} Z`); g.setAttribute('class', 'gap'); cracks.append(g);
    }
  }

  G.set = function (stage) {
    ensureLayer();
    if (stage === G.stage && G.ready) {
      // 같은 단계: 5단계면 새로 바뀐 설명 글도 멈춘 채 조금 깨뜨린다(이미 깨진 글은 그대로)
      if (stage >= 5) textNodes().forEach(n => { if (frozen.get(n) !== n.nodeValue && Math.random() < .5) corrupt(n, .06, 0); });
      if (site && Math.abs(site.scrollHeight - (+cracks.getAttribute('height') || 0)) > 40) { drawCracks(stage); drawTears(stage); } // 무대 뒤가 펼쳐지는 등 높이가 바뀌면 다시 그린다
      return;
    }
    G.stage = stage; G.ready = true;
    timers.forEach(clearInterval); timers = [];
    document.body.dataset.glitch = stage;
    drawCracks(stage); drawTears(stage);
    if (stage >= 5) { ghost(false); textNodes().forEach(n => Math.random() < .5 && corrupt(n, .06, 0)); return; } // 멈춘 채 깨진 글자가 남는다
    if (reduced || stage < 2) return;
    const every = (ms, fn) => timers.push(setInterval(fn, ms));
    const L = { 2: { text: [6000, .03], px: 0 }, 3: { text: [1600, .06], px: [900, 3], shove: 4200 }, 4: { text: [520, .1], px: [300, 6], shove: 1300, band: 700, gap: 2100 } }[stage];
    every(L.text[0], () => { const ns = textNodes(); if (ns.length) corrupt(pick(ns), L.text[1], rnd(90, 320)); });
    if (L.px) every(L.px[0], () => pixels(Math.ceil(rnd(1, L.px[1]))));
    if (L.shove) every(L.shove, () => Math.random() < .8 && shove());
    if (L.band) every(L.band, () => band(pick(['inv', 'hue', 'hue'])));
    if (L.gap) every(L.gap, () => band('gap'));
    // 화면 전체 산발적인 글리치 (좌우 배경 포함)
    every({ 2: 2600, 3: 650, 4: 230 }[stage], () => scatter(Math.ceil(rnd(...{ 2: [1, 2], 3: [1, 4], 4: [2, 7] }[stage])), stage >= 4));
    // ---- 덧붙인 연출 ----
    if (stage >= 3) {
      every(stage >= 4 ? 2600 : 5200, tabTitle);                 // 브라우저 탭 제목이 깨짐
      every(stage >= 4 ? 1900 : 4300, visitorCount);             // 방문자 수가 흔들림
      every(stage >= 4 ? 3700 : 8200, () => Math.random() < .75 && whisper()); // 숨은 문장이 번쩍임
      every(stage >= 4 ? 2900 : 6500, echo);                     // 설명 글이 겹쳐 보임
    }
    ghost(stage >= 4);                                           // 마우스 잔상 (반 박자 늦게 따라온다)
  };

  // 브라우저 탭 제목: 잠깐 깨졌다가 돌아온다
  function tabTitle() {
    const orig = document.title, chars = [...orig];
    for (let i = 0; i < 2; i++) { const j = Math.floor(Math.random() * chars.length); if (chars[j].trim()) chars[j] = pick(GLYPHS); }
    const bad = Math.random() < .3 ? orig + ' ' + orig : chars.join('');
    document.title = bad;
    setTimeout(() => { if (document.title === bad) document.title = orig; }, rnd(400, 1200));
  }
  // 방문자 수: 127 → 128 → 126 … 다시 127
  function visitorCount() {
    const el = document.getElementById('counter'); if (!el) return;
    const orig = el.textContent; if (!/\d+/.test(orig)) return;
    let k = 0;
    const t = setInterval(() => {
      if (k++ > 5) { clearInterval(t); el.textContent = orig; return; }
      el.textContent = orig.replace(/\d+/, m => String(+m + Math.round(rnd(-3, 3)) || m));
    }, 70);
  }
  // 숨은 문장: 머리말이나 바닥글이 아주 잠깐 다른 문장으로 바뀐다
  const WHISPERS = ['오늘도 봄 3일입니다.', '11:59', '클로버, 보고 있어?', '어제도 여기 있었어요.', '같은 하루에 오신 것을 환영합니다.', '아무것도 바뀌지 않았어요.', '다시, 처음부터.'];
  function whisper() {
    const el = pick([document.getElementById('tagline'), document.querySelector('#foot span:last-of-type')].filter(Boolean));
    const orig = el.textContent, w = pick(WHISPERS);
    el.textContent = w; el.classList.add('gwhisper');
    setTimeout(() => { if (el.textContent === w) el.textContent = orig; el.classList.remove('gwhisper'); }, rnd(140, 260));
  }
  // 설명 글이 위아래로 한 번 더 겹쳐 보인다
  function echo() {
    const el = document.getElementById('pintro'); if (!el) return;
    el.classList.add('gecho'); setTimeout(() => el.classList.remove('gecho'), rnd(160, 340));
  }
  // 마우스 잔상: 4단계에서만. 실제 커서보다 반 박자 늦게 따라온다
  let ghostEl, ghostOn = false, trail = [], mx = -100, my = -100;
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  function ghost(on) {
    if (reduced) on = false;
    if (on === ghostOn) return; ghostOn = on;
    if (!ghostEl) { ghostEl = document.createElement('div'); ghostEl.className = 'gghost'; layer.append(ghostEl); }
    ghostEl.style.display = on ? '' : 'none';
    if (on) (function tick() {
      if (!ghostOn) return;
      trail.push([mx, my]); if (trail.length > 14) trail.shift();
      const [x, y] = trail[0]; ghostEl.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(tick);
    })();
  }
  addEventListener('resize', () => { if (G.ready) { drawCracks(G.stage); drawTears(G.stage); } });
})();
