# EVERFREEZE 이미지 제작 프롬프트

기준: LINEWORKS 최종 아트북(선택 스타일 A) + 사이트 구조(장면 19 · 클로즈업 29 · 인물 크롭 8).
**가장 중요한 두 가지**: ① 무대처럼 보이는 연출(마을별 커튼 프레임 + 무대 바닥 + 앞쪽 종이 덤불) ② 잘라 겹친 종이 질감(종이 가장자리·얇은 접촉 그림자).

---

## 0. 사용법

프롬프트 하나 = **[공통 스타일] + [프레임 블록] + [장면 블록]**, 그리고 **[네거티브]**.

- 크기: 전부 **1280×720 (16:9)**. 더 크게 뽑으면 16:9 비율만 지키면 된다.
- 파일 이름: 표의 `파일` 칸 그대로. 넣는 곳: 배경 `assets/bg/`, 클로즈업 `assets/view/`, 인물 크롭 `assets/npc/`.
- **글자·숫자 규칙**: 배경·인물·일반 클로즈업에는 글자·숫자를 넣지 않는다 (아트북 규칙). **단, 퍼즐 단서 그림(7-2)은 예외**로, 정답에 필요한 숫자·글·기호를 그림 안에 정확히 그려 넣는다.
- 같은 마을은 **같은 커튼 프레임**을 모든 장면에 쓴다 (아트북: 마을별 정상 OVERVIEW = 커튼 마스터). 가능하면 OVERVIEW 그림을 참조 이미지(img2img / style reference)로 같이 넣는다.
- 클릭 영역 위치(왼쪽·가운데·오른쪽)는 지금 사이트 기준이다. 그림이 조금 달라져도 괜찮다. 그림을 넣으면 클릭 위치를 그림에 맞춰 옮긴다.
- 그림 아래쪽 76px은 '뒤로 가기 띠'라서, 클릭할 물건을 맨 아래 가장자리에 두지 않는다 (앞쪽 종이 덤불 자리로 둔다).
- 다 그린 뒤 해당 ID를 코드에 등록하면 적용된다: 배경 `EF.BG_IMAGES`(scenes.js), 클로즈업 `EF.VIEW_IMAGES`(views.js), 인물 `EF.NPC_IMAGES`(npcs.js). 파일만 올려 주면 등록과 클릭 위치 맞추기는 Claude 가 한다.

---

## 1. 공통 스타일 (모든 프롬프트 맨 앞)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9
```

인물이 들어가는 장면에는 이것도 붙인다:
```
cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set
```

## 2. 네거티브 (퍼즐 단서 그림 7-2 를 뺀 모든 프롬프트)

```
text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars
```

퍼즐 단서 그림(7-2)용 네거티브 — 글자 관련 단어를 뺀다:
```
watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion
```

---

## 3. 프레임 블록 (마을별 커튼 마스터)

| 블록 | 프롬프트 |
|---|---|
| **F-RM 로즈메리** | `stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs` |
| **F-GW 글렌위버** | `stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills` |
| **F-LM 루미나리아** | `stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs` |
| **F-WORLD 월드맵** | `grand cream and gold paper proscenium arch, curtains on the left in dusty rose with roses, top valance mixing rose, oak leaf and seashell paper ornaments, curtains on the right in teal with shells, foreground paper clouds along the bottom edge` |

실내 장면도 같은 프레임을 쓴다 (커튼 안쪽이 방 세트). 실내용 덧말: `indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props`.

---

## 4. 등장인물 묘사 (배경에 함께 그릴 때 그대로 넣기)

클로버(주인공)는 플레이어 시점이라 배경에 그리지 않는다.

| 인물 | 묘사 |
|---|---|
| 벨라 | `Bella: chibi girl about 2.5 heads tall, short wavy auburn bob with a pink ribbon bow, green-gray eyes, cream puff-sleeve blouse with peter pan collar and pink ribbon tie, dusty pink bloomer shorts, white frilly socks, brown mary jane shoes, holding a small cream wooden box with pink trim` |
| 아리아 | `Aria: chibi girl, very long straight silver-white hair, lavender eyes, gentle calm smile, cream ankle-length dress with puff sleeves, lavender ribbon bow, lace hem, white flat shoes, holding a round brass pendant with lavender glass on a chain` |
| 오크스 | `Oaks: chibi elderly man, fluffy white curly hair and big white beard, round brass glasses, small oak leaf in his hair, brown quilted vest with a wooden tree-ring badge, cream shirt with rolled sleeves, moss green trousers, acorn pouch and leather satchel, brown shoes` |
| 시에나 | `Sienna: chibi girl, long wavy olive-brown hair with small peach flowers, green eyes, olive green layered tunic dress with wide sleeves and sailor collar, mustard yellow neckerchief, mint sheer sash with a small glass vial and a thread spool, beige ankle boots with green ribbons` |
| 노아 | `Noa: chibi boy, curly auburn-brown hair, small scar on the forehead, navy wool jacket with a brass sea-turtle brooch, cream cable-knit sweater, beige trousers rolled at the hem, brown boots, holding a brass lantern, coiled rope and a postal stamp` |
| 루루 | `Lulu: chibi girl, long wavy lavender hair with a mint jellyfish hair clip, layered sheer lavender and white frilly dress with a star brooch, mint ribbon, lavender flat shoes, holding a glass jar of pastel star candies` |
| 주민(로즈메리) | `a Rosemary villager: chibi townsperson in a rose-pink apron and straw hat, gentle smile, holding a flower basket` |
| 주민(글렌위버) | `a Glenweaver villager: chibi townsperson in a sage green knitted cardigan and leaf-patterned scarf` |

---

## 5. 배경 19장 (+1) — `assets/bg/`

각 줄 = **[공통] + [프레임] + 아래 장면 블록** (인물이 있으면 4번 묘사도 덧붙임).

### 월드맵 · 마을 지도

| 파일 | 프레임 | 장면 블록 | 클릭 위치(왼→오) |
|---|---|---|---|
| `WORLD_MAP.png` | F-WORLD | `overview of three fairy-tale villages as miniature paper-craft sets on one big stage: on the left a rose-roofed village with a clock tower, in the center slightly higher a forest village with a giant tree full of birdhouses, on the right a seaside village with a striped lighthouse and blue roofs, paper hills and paper sea connecting them, small paper paths` | 로즈메리(왼쪽 가운데) · 글렌위버(가운데 약간 위) · 루미나리아(오른쪽) |
| `MAP_ROSEMARY.png` | F-RM | `wide overview of Rosemary village, tidy medieval European houses with rose-colored roofs, from left to right: a small cozy cottage, the tall clock tower on the town square, a stately stone library with arched windows, a little general store with a striped awning` | 클로버의 집 · 광장 시계탑 · 도서관 · 벨라의 잡화점 |
| `MAP_GLENWEAVER.png` | F-GW | `wide overview of Glenweaver forest village, green roofs, from left to right: a giant ancient tree covered with many birdhouses, a round shop built inside an old tree stump with tree-ring patterns, a cloak workshop with seasonal cloaks hanging outside, a small cottage` | 새집 탑 · 만물상 · 망토 공방 · 마을 주택 |
| `MAP_LUMINARIA.png` | F-LM | `wide overview of Luminaria seaside village, blue roofs, from left to right: a striped lighthouse post office with sea turtles carrying letters in the water, a glass greenhouse atelier glowing with pearl light, a café with a striped awning and jellyfish lamps, a small wooden harbor pier with sailboats` | 우체국 등대 · 아틀리에 · 카페 · 항구 |

### 로즈메리

| 파일 | 프레임 | 장면 블록 | 클릭 위치(왼→오) |
|---|---|---|---|
| `RM_HOME.png` | F-RM + 실내 | `inside Clover's cozy cottage room, cream paper walls with small clover and rose wallpaper, on the left a wooden writing desk with an open old notebook, in the center a low wooden chest of drawers with a small three-wheel combination dial lock, on the right a tall oval standing mirror, lace curtains, warm and tidy, everything perfectly in place` | 책상 · 서랍(다이얼 자물쇠) · 거울 |
| `RM_PLAZA.png` | F-RM | `Rosemary town square, the tall clock tower with a large round clock face and a bell, rose vines, checkered pink paper pavement with a compass-star pattern, a wooden notice board on posts in the middle, benches and street lamps` + 주민(로즈메리) `standing on the right` | 시계탑(왼쪽, 크게) · 게시판(가운데) · 주민(오른쪽) |
| `RM_LIBRARY_EXT.png` | F-RM | `front of the Rosemary library, a stately cream stone building with tall arched windows and a big arched double door, a small framed notice plaque on a post at the lower left, rose bushes, steps` + 아리아 `standing on the right beside the door, calm, watching` | 출입 제한 안내문(왼쪽 아래) · 도서관 문(가운데) · 아리아(오른쪽) |
| `RM_LIBRARY_READING.png` | F-RM + 실내 | `library reading room, tall wooden bookshelves packed with paper books, green reading lamps, on the left a reading desk with a large open lending ledger, in the center a tall bookshelf where several books share the same spine, on the right a heavy wooden door with an iron lock` | 대출 장부 · 책장 · 자료 보관실 문 |
| `RM_LIBRARY_ARCHIVE.png` | F-RM + 실내 | `cold dim archive room, dusty filing cabinets and storage boxes, muted beige and gray paper layers, on the left a table with torn paper fragments scattered in a square wooden frame, in the center a tall storage cabinet with mostly empty cubbies, on the right a plain bookcase standing against the wall` | 기록 조각 · 보관함 · (오른쪽 책장) |
| `RM_LIBRARY_ARCHIVE_open.png` ※ | F-RM + 실내 | 위와 같은 그림, `the bookcase on the right has swung open revealing a narrow dark secret passage` | 비밀 기록실 입구(오른쪽) |
| `RM_LIBRARY_SECRET.png` | F-RM + 실내 | `hidden secret archive room, small and quiet, lavender-gray paper layers, dust in the air, on the left a desk with a leather observation journal, on the right a lectern holding a very thick ancient record book` | 관찰일지 · 오래된 기록 |
| `RM_BELLA_SHOP.png` | F-RM + 실내 | `inside Bella's general store, wooden shelves full of jars, baskets, candles and ribbons, a striped awning inside the window, in the center a neat display table where one cherished item sits spotless, on the right a shop counter with an open ledger` + 벨라 `standing on the left, cheerful` | 벨라 · 진열대 · 장부 |

※ 자료 보관실은 퍼즐을 풀면 비밀 통로가 열린다. 두 장(`RM_LIBRARY_ARCHIVE.png`, `..._open.png`)을 만들면 열리는 순간 그림이 바뀌게 연결한다.

### 글렌위버

| 파일 | 프레임 | 장면 블록 | 클릭 위치(왼→오) |
|---|---|---|---|
| `GW_TOWER.png` | F-GW | `at the foot of the giant birdhouse tower tree, many small wooden birdhouses with green roofs, bluebirds and a squirrel, on the left a wooden gear mechanism on the trunk with four colored levers (blue, pink, yellow, green), on the right a small wooden board on a stand holding a paper shift log` | 새집 장치(레버 4개) · 교대 기록 |
| `GW_OAKS.png` | F-GW + 실내 | `inside Oaks' general goods shop built in a hollow tree, tree-ring patterns on the walls, in the center a big round rotating shelf made of four nested tree-ring rings, on the right a small worn wooden object on a stool with a little paper tag` + 오크스 `standing on the left behind a counter` | 오크스 · 회전 선반 · 오래된 물건 |
| `GW_SIENNA.png` | F-GW + 실내 | `Sienna's seasonal cloak workshop, cloaks in spring, summer, autumn and winter colors hanging on a rail in the center, thread spools, fabric bolts, on the right a sewing workbench with an unfinished cloak and a needle` + 시에나 `standing on the left` | 시에나 · 걸린 망토 · 작업대 |
| `GW_HOUSE.png` | F-GW + 실내 | `inside a modest forest cottage, wooden beams, knitted rugs, on the right wall a framed paper residents register, a teapot on the table` + 주민(글렌위버) `standing in the center` | 주민 · 주민 명부(오른쪽 벽) |

### 루미나리아

| 파일 | 프레임 | 장면 블록 | 클릭 위치(왼→오) |
|---|---|---|---|
| `LM_LIGHTHOUSE.png` | F-LM + 실내 | `inside the sea-turtle post office at the base of the lighthouse, round stone walls, brass fittings, letter cubbies, sea turtle motifs, in the center-left a brass mailbox with a small round clock on top, on the right a counter with a sealed envelope` + 노아 `standing on the left with his lantern` | 노아 · 우편함(작은 시계) · 편지 |
| `LM_ATELIER.png` | F-LM + 실내 | `Pearl Luminous glass atelier inside a greenhouse, pearly glass panes, glass art pieces glowing softly, on the left a large glass artwork with a faint village scene inside, on the right a worktable with four loose colored glass pieces` | 유리 작품 · 작업대 |
| `LM_CAFE.png` | F-LM + 실내 | `Lulu's seaweed dessert café, pastel aqua walls, shell chairs, on the center-left a menu board on an easel, on the upper right four jellyfish-shaped hanging lamps in blue, pink, yellow and green` + 루루 `standing on the left behind the counter` | 루루 · 메뉴판 · 해파리 조명(오른쪽 위) |
| `LM_HARBOR.png` | F-LM | `small Luminaria harbor, wooden pier with rope railings on the left reaching into the paper sea, sailboats, sea turtles, on the right a wooden harbor signpost with a blank board` | 선착장 · 표지판 |

### (선택) 오작동 배경 — `assets/bg/<ID>_err.png`
4단계부터 이 그림으로 바뀐다. 없으면 지금처럼 색 효과만 들어간다. 위 장면 프롬프트 끝에 붙인다:
```
malfunction state: same composition and buildings, dark blue-violet and indigo palette, restrained red horizontal glitch noise lines, red glowing windows and lamps, slight color misregistration, paper sky torn open in cracks, cracked and split paper floor, structure still readable
```

---

## 6. 인물 크롭 8장 — `assets/npc/<인물ID>.png`

배경 속 인물을 누르면 그림 창 전체에 뜨는 따로 그린 그림. 대화창이 아래쪽 1/4을 덮으므로 **얼굴은 위쪽 절반**에 둔다.

공통 블록: `waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer`

| 파일 | 프레임 | 인물 + 배경 |
|---|---|---|
| `bella.png` | F-RM | 벨라 묘사 + `inside her general store` |
| `aria.png` | F-RM | 아리아 묘사 + `in front of the library door, calm smile that feels slightly too perfect` |
| `oaks.png` | F-GW | 오크스 묘사 + `inside the tree-ring shop` |
| `sienna.png` | F-GW | 시에나 묘사 + `inside the cloak workshop` |
| `noa.png` | F-LM | 노아 묘사 + `inside the lighthouse post office` |
| `lulu.png` | F-LM | 루루 묘사 + `inside the jellyfish café` |
| `resident1.png` | F-RM | 주민(로즈메리) 묘사 + `on the town square` (화면 이름: 주민1) |
| `resident2.png` | F-GW | 주민(글렌위버) 묘사 + `inside a forest cottage` (화면 이름: 주민2) |

---

## 7. 클로즈업 29장 — `assets/view/<뷰ID>.png`

클로즈업 공통 블록: `close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges`

### 7-1. 그림 그대로 쓰는 것 9장 (pic)

| 파일 | 프레임 | 장면 블록 |
|---|---|---|
| `v-mirror.png` | F-RM | `an oval standing mirror, the reflection of the cozy room inside it looks very slightly out of sync, as if delayed` |
| `v-archivebox.png` | F-RM | `a storage cabinet with many cubbies, almost all empty, faint dust outlines where boxes used to be` |
| `v-display.png` | F-RM | `a display table in a general store, one small cherished music box sits perfectly spotless while everything around it has a little dust` |
| `v-birdhouse.png` | F-GW | `a wooden birdhouse gear mechanism opened, the gears stopped, inside a looping track that returns to the same place` |
| `v-shelf.png` | F-GW | `a round rotating shelf of four nested tree-ring rings, stopped, the same carved marks repeating around every ring` |
| `v-oldthing.png` | F-GW | `a small worn wooden heirloom on a stool, smooth from years of hands, a tiny blank paper tag tied with string, quiet and precious` (그림만 보이는 장면) |
| `v-glassart.png` | F-LM | `a large pearly glass artwork, inside the glass a tiny village scene is faintly visible` |
| `v-atelier.png` | F-LM | `a small window made of four pieces of colored glass joined into one stained-glass picture: dawn, noon, sunset and night arranged clockwise, muted faded colors, the glass panes semi-clear so something behind them could be seen, no one around` | ※ 엔딩의 **창문**으로도 쓰인다. 엔딩에서 회색으로 빛바래 보이고, 2초 뒤 유리 너머로 아리아가 비친다 → 유리 칸이 잘 보이게. 넣은 뒤 유리 칸 위치를 `EF.ENDING_WINDOW_PANE` 에 맞춘다 |
| `v-pier.png` | F-LM | `the end of a wooden pier, a pair of small boot prints pressed into the wet planks at the exact same spot, sea and sailboats behind` |

### 7-2. 퍼즐 단서 그림 13장 — 글자·숫자를 그림에 직접 넣는다

정답에 쓰이는 숫자·글·기호를 **그림 안에 정확히** 그린다. 사이트는 이 그림을 그대로 보여 준다.
- 덧말: `the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written`
- 숫자와 기호는 정확해야 한다. 생성 후 **숫자·기호가 정확한지 꼭 확인**하고, 틀리면 다시 뽑거나 그림판에서 고친다.
- 한글은 이미지 생성기가 자주 틀린다. 한글 이름이 깨지면 그 칸만 비워 두고 알려 주면, 사이트가 그 위에 글을 얹도록 바꿔 준다.

| 파일 | 퍼즐 | 프레임 | 장면 블록 | 그림 안에 꼭 들어갈 글·숫자·기호 |
|---|---|---|---|---|
| `v-sign.png` | P-DRAWER | F-LM | `a wooden harbor signpost seen up close, sea and sailboats behind, the signboard reads a harbor name and an arrival time with a small ship icon` | **루미나리아 항구** / ⛴️ **4:17** |
| `v-clock.png` | P-SHELF · P-ATELIER | F-RM | `the clock tower's round clock face seen up close with Roman numerals, the long minute hand pointing at 59 minutes, the short hour hand just before XII, a faint curved arrow showing clockwise direction, rose vines around` | 시각 **11:59** (긴 바늘 59분, 짧은 바늘 12 직전), 시계 방향 화살표 |
| `v-book.png` | P-SHELF | F-RM | `an old open book on a desk titled "How to Read Tree Rings", left page: four concentric tree rings numbered 1 to 4 from the outermost ring inward with an arrow pointing inward, right page: a clock where the long hand is labeled 1 and the short hand is labeled 2` | 제목 **나이테 읽는 법**, 링 번호 **1 2 3 4**(바깥→안쪽), 긴 바늘 **1** · 짧은 바늘 **2** |
| `v-shopledger.png` | P-MAILBOX | F-RM | `an open shop ledger on a wooden counter, rows of small item drawings with the same date on every row, the last line has a little horse-drawn mail coach drawing and a time` | 날짜 칸 전부 **봄 3일**, 마지막 줄 🐴✉️ **6:20** |
| `v-registry.png` | P-LEDGER | F-GW | `a framed residents register on a cottage wall with three columns headed by a rose, an oak leaf and a seashell, names written in each column` | 🌹 **클로버 · 벨라 · 아리아 · 토비** / 🍂 **오크스 · 시에나 · 마렌 · 페넬** / 🐚 **노아 · 루루 · 로완** (**'하나' 없음**) |
| `v-ledger.png` | P-LEDGER 풀린 뒤 | F-RM | `an open library lending ledger, every row is identical: the same date, the same borrower name, the same book title` | 5줄 모두 **봄 3일 · 하나 · 첫 번째 하루** |
| `v-cloak.png` | P-ARCHIVE | F-GW | `a finished cloak pattern sheet pinned on the workshop wall, embroidered in three horizontal bands: top band suns, middle band clock towers, bottom band waves` | 위 **해** · 가운데 **시계탑** · 아래 **물결** (그림 문양) |
| `v-jelly.png` | P-BIRDHOUSE | F-LM | `four jellyfish-shaped lamps hanging in a row from the café ceiling, from left to right: yellow, blue, green, pink, all unlit and dim, ready to glow` | 놓인 자리(왼→오) **노랑 · 파랑 · 초록 · 분홍** (새집 레버와 같은 배치). 켜지는 순서 **파랑 → 분홍 → 노랑 → 초록** 은 사이트가 그림 위에 빛으로 보여 준다 |
| `v-shiftlog.png` | P-ATELIER | F-GW | `a wooden clipboard holding a shift log table, header icons dawn, noon, sunset, night, each header with a tiny bluebird flying in a direction (dawn: up, noon: left, sunset: down, night: up), seven rows with exactly the same date and the same times, a check mark on every row` | 머리 🌅🐦↑ ☀️🐦← 🌇🐦↓ 🌙🐦↑ ✓ (새 방향 = 유리 조각 ▲ 방향), 7줄 모두 **봄 3일 · 05:12:00 · 11:59:00 · 17:44:00 · 23:59:00 · ✓** |
| `v-record.png` | P-LETTER | F-RM | `a long torn paper strip restored and taped together, showing five small paintings joined by arrows pointing to the LEFT, from left to right: sun, moon, sunrise, moon, sunset, with a small red dot at the far right end marking where to start reading` | 왼쪽부터 ☀️ ← 🌙 ← 🌅 ← 🌙 ← 🌇 ● (● 오른쪽 끝에서 시작해 왼쪽으로 = 저녁 밤 아침 밤 낮) |
| `v-board.png` | P-OLDREC (▲) | F-RM | `a wooden cork notice board, two identical paper notices with a broom drawing pinned side by side, each stamped with a red triangle mark` | 같은 공지 **2장**, 각각 빨간 **▲** |
| `v-mailbox.png` | P-OLDREC (●) | F-LM | `an open brass mailbox, three identical envelopes inside, each sealed with a round red wax seal` | 편지 **3통**, 각각 **●** 봉인 |
| `v-workbench.png` | P-OLDREC (★) | F-GW | `a strip of cloth on a sewing workbench, a small paper tag with a star mark sewn at the left end, a single straight row of stitches: exactly seven red thread stitches sewn, a silver needle with thread stuck in the seventh stitch, then three empty needle holes, no numbers` | **★** 표 + 실로 꿰맨 땀 **정확히 7개**(7번째에 바늘이 꽂힌 채 멈춤), 그 뒤 바늘구멍 3개. **번호 없음**(땀을 세어 7을 알게 함) |

### 7-3. 퍼즐과 무관한 그림 7장 — 글 없이 바탕만 (사이트가 위에 얹음)

그림은 **가운데를 비워 둔 바탕**으로 만든다 (`blank, empty, no writing`). 사이트가 그 위에 내용을 얹는다.

| 파일 | 프레임 | 장면 블록 (가운데는 비움) | 사이트가 얹는 것 |
|---|---|---|---|
| `v-desk.png` | F-RM | `an old notebook open on a wooden desk, lined pages blank` | 🕰️✔ 🛒✔ 📚✖ |
| `v-drawer.png` | F-RM | `an open wooden drawer seen from above, empty bottom` | 같은 메모 여러 장 |
| `v-journal.png` | F-RM | `a leather observation journal open on a desk in a dim secret room, blank pages` | 📅+1 · 내일의 클로버 |
| `v-oldrec.png` | F-RM | `a very thick ancient book open on a lectern, blank yellowed pages, dust` | 같은 날짜 종이 여러 장 |
| `v-libnotice.png` | F-RM | `a small framed notice plaque on a post in front of the library, blank` | 📚🚫 / 🔑👤 |
| `v-menu.png` | F-LM | `a café menu board on an easel, empty paper surface, shell decorations` | 어제 메뉴 = 오늘 메뉴 |
| `v-letter.png` | F-LM | `an opened envelope and a letter sheet on a post office counter, the paper is blank, a smudged postmark circle` | 클로버에게, (번진 글) |

> 그림을 넣고 나면, 얹는 내용이 그림 속 종이·간판 위치에 오도록 Claude 가 위치(`box`)를 맞춘다.

---

## 8. 만드는 순서 추천

1. 마을별 **커튼 마스터** 확정: 아트북 OVERVIEW 3장을 기준 이미지로 고정
2. 마을 지도 3장 + 월드맵 → 플레이 흐름 전체가 한 번에 그림으로 바뀜
3. 로즈메리 장소 7장(+보관실 열린 판) → 1~2단계 플레이 구간
4. 글렌위버 4장 · 루미나리아 4장
5. 인물 크롭 8장
6. 클로즈업 7-1 (9장) → 7-2 퍼즐 단서 (13장) → 7-3 (7장)
7. 사이트 꾸밈: 단계별 배경 5장 · 마우스 포인터 5장 · 균열 · 엔딩 아리아
8. (선택) 오작동 배경

## 9. 체크리스트

- [ ] 16:9, 1280×720 이상
- [ ] 마을 커튼 프레임이 같은 마을 장면끼리 같다
- [ ] 종이 가장자리와 겹침 그림자가 보인다 (일반 3D 배경처럼 보이면 다시)
- [ ] 글자·숫자·워터마크 없음 (퍼즐 단서 그림 7-2 는 예외: 지정한 글·숫자·기호가 **정확히** 들어갔는지 확인)
- [ ] 클릭할 물건이 프레임에 가려지지 않고, 맨 아래 76px 띠 위에 있다
- [ ] 인물 고유색·소품이 아트북과 같다 (벨라 2.5등신, 나머지 3등신 계열)

## 10. 사이트 꾸밈 그림 (게임 창 바깥)

### 10-1. 단계별 사이트 배경 5장 — `assets/page/stage<N>.png`
사이트 바깥 배경(좌우 여백 포함). 화면에 꽉 차게 늘어나고 스크롤해도 고정된다. 가로로 긴 그림(1920×1080 이상) 권장.
없는 단계는 바로 아래 단계 그림을 쓴다(예: 1·3·5단계만 주면 2단계=1단계, 4단계=3단계).

| 파일 | 단계 | 프롬프트 (공통 스타일 뒤에) |
|---|---|---|
| `stage1.png` | 1 · 일상 | `seamless warm cream paper texture background, soft speckles and faint fibers, calm, no objects` |
| `stage2.png` | 2 · 미세한 어긋남 | 위와 같은 종이 + `a few barely visible faint gray scratches and tiny smudges` |
| `stage3.png` | 3 · 뚜렷한 오류 | 위와 같은 종이 + `slightly yellowed and stained, thin hairline creases, a few small faded glitch-colored specks (pink and cyan)` |
| `stage4.png` | 4 · 심한 오류 | `the same paper now darker and wrinkled, torn small gaps showing black behind, scattered pink and cyan pixel noise, horizontal misaligned bands` |
| `stage5.png` | 5 · 완전한 오류 | `grayish faded paper, frozen, heavily cracked and torn with black showing through, broken pixel blocks frozen in place, desaturated` |

### 10-2. 단계별 마우스 포인터 5장 — `assets/cursor/stage<N>.png`
**32×32 픽셀, 투명 배경 PNG.** 화살표의 뾰족한 끝이 **왼쪽 위 모서리(1,1)** 에 오게. 지금은 임시 포인터가 들어가 있다.

| 파일 | 단계 | 모습 |
|---|---|---|
| `stage1.png` | 1 | 크림색 종이 화살표 + 진한 테두리, 깨끗하게 |
| `stage2.png` | 2 | 테두리 색이 살짝 어긋남(분홍·하늘색 번짐) |
| `stage3.png` | 3 | 노이즈 점이 몇 개 생김 |
| `stage4.png` | 4 | 픽셀이 깨지고 가로줄이 밀림 |
| `stage5.png` | 5 | 회색으로 빛바래고 깨진 조각이 흩어짐 |

### 10-3. 균열 그림 — `assets/crack/stage4.png`, `stage5.png`
4단계부터 사이트 전체(머리글·그림 창·설명 칸·무대 뒤) 위에 덮이는 균열. **투명 배경 PNG**, 세로로 긴 사이트 비율(예: 1240×2400). 한 장만 주면 4·5단계에 같이 쓴다.
`black ink cracks spreading across a transparent background like a broken paper sheet, thin branching lines, a few thicker fissures, empty elsewhere`
넣으면 scenes.js 의 `EF.CRACK_IMAGES = { 4: 'assets/crack/stage4.png', 5: 'assets/crack/stage5.png' }` 로 등록.

## 엔딩 · 창문 건너편의 아리아 (선택)
| 파일 | 쓰는 곳 | 프롬프트 | 비고 |
|---|---|---|---|
| `assets/ending/aria.png` | 엔딩 (창문 건너편, 유리 칸 안) | `upper body of Aria standing still behind a window and facing the viewer, expressionless, staring straight ahead, flat 2D paper cut-out style, dark muted colors, transparent background` | 투명 배경. 넣으면 scenes.js 의 `EF.ENDING_ARIA_IMAGE = 'assets/ending/aria.png'` 로 등록. 없으면 임시 실루엣. 창문 그림(v-atelier)을 넣으면 유리 칸 위치를 `EF.ENDING_WINDOW_PANE` 에 맞춘다 |
