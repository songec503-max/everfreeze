# EVERFREEZE — ChatGPT 이미지 제작 문서

이 문서를 ChatGPT에 올리고, 아래 **「ChatGPT에게 주는 지시」** 를 먼저 읽게 한 뒤 **번호로 한 장씩** 요청하세요.
예: `#01 그려줘` → 다 되면 `#02 그려줘` … 마음에 안 들면 `#01 다시, 더 종이 느낌으로` 처럼 말하면 됩니다.

총 **70장** · 꼭 필요한 것 57장(배경 20 · 인물 8 · 클로즈업 29) + 사이트 꾸밈 13장

---

## ChatGPT에게 주는 지시 (Instructions for ChatGPT)

```
You are the image artist for EVERFREEZE, a point-and-click mystery website styled as a layered cut-paper theater stage.
This document lists every image to create. Each item has a number (#01, #02 ...), a file name, a size, and a PROMPT.
Rules:
1. When I say "#NN", generate exactly ONE image for item #NN, using its PROMPT as written. Do not merge items.
2. Keep ONE consistent art style for every image: flat 2D cut-paper diorama, visible paper edges, thin soft shadows between paper layers, watercolor/gouache on cream paper, soft pastel colors. Never photorealistic, never 3D render, never glossy.
3. Images in the same village use the SAME curtain frame (Rosemary = dusty rose curtains, Glenweaver = oak-leaf branch curtains, Luminaria = teal drapes with shells). Reuse the look of earlier images of that village.
4. No text, letters or numbers in any image, EXCEPT the "puzzle clue" items, which must contain exactly the specified text/numbers/symbols and nothing else. Check them carefully.
5. Scene and close-up images are wide 16:9 landscape. If 16:9 is not available, make the widest landscape image and keep important things away from the top and bottom edges.
6. Items marked "transparent background" must have a real transparent background (PNG).
7. After each image, tell me the file name it should be saved as.
```

---

## 공통 설정 (모든 프롬프트에 이미 들어 있음 · 참고용)

- **공통 스타일**: layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9
- **인물 등신**: cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set
- **마을 커튼 프레임**
  - 로즈메리: stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs
  - 글렌위버: stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills
  - 루미나리아: stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs
  - 월드맵: grand cream and gold paper proscenium arch, curtains on the left in dusty rose with roses, top valance mixing rose, oak leaf and seashell paper ornaments, curtains on the right in teal with shells, foreground paper clouds along the bottom edge
- **등장인물** (클로버는 플레이어 시점이라 그리지 않음)
  - 벨라: Bella: chibi girl about 2.5 heads tall, short wavy auburn bob with a pink ribbon bow, green-gray eyes, cream puff-sleeve blouse with peter pan collar and pink ribbon tie, dusty pink bloomer shorts, white frilly socks, brown mary jane shoes, holding a small cream wooden box with pink trim
  - 아리아: Aria: chibi girl, very long straight silver-white hair, lavender eyes, gentle calm smile, cream ankle-length dress with puff sleeves, lavender ribbon bow, lace hem, white flat shoes, holding a round brass pendant with lavender glass on a chain
  - 오크스: Oaks: chibi elderly man, fluffy white curly hair and big white beard, round brass glasses, small oak leaf in his hair, brown quilted vest with a wooden tree-ring badge, cream shirt with rolled sleeves, moss green trousers, acorn pouch and leather satchel, brown shoes
  - 시에나: Sienna: chibi girl, long wavy olive-brown hair with small peach flowers, green eyes, olive green layered tunic dress with wide sleeves and sailor collar, mustard yellow neckerchief, mint sheer sash with a small glass vial and a thread spool, beige ankle boots with green ribbons
  - 노아: Noa: chibi boy, curly auburn-brown hair, small scar on the forehead, navy wool jacket with a brass sea-turtle brooch, cream cable-knit sweater, beige trousers rolled at the hem, brown boots, holding a brass lantern, coiled rope and a postal stamp
  - 루루: Lulu: chibi girl, long wavy lavender hair with a mint jellyfish hair clip, layered sheer lavender and white frilly dress with a star brooch, mint ribbon, lavender flat shoes, holding a glass jar of pastel star candies
  - 주민(로즈메리): a Rosemary villager: chibi townsperson in a rose-pink apron and straw hat, gentle smile, holding a flower basket
  - 주민(글렌위버): a Glenweaver villager: chibi townsperson in a sage green knitted cardigan and leaf-patterned scarf

---

## 이미지 목록

| # | 종류 | 파일 (넣는 폴더) | 설명 |
|---|---|---|---|
| #01 | 배경 | `assets/bg/WORLD_MAP.png` | 월드맵. 세 마을이 한 무대 위에 놓인 첫 화면. |
| #02 | 배경 | `assets/bg/MAP_ROSEMARY.png` | 로즈메리 마을 지도. 장소 4곳을 고르는 화면. |
| #03 | 배경 | `assets/bg/MAP_GLENWEAVER.png` | 글렌위버 마을 지도. |
| #04 | 배경 | `assets/bg/MAP_LUMINARIA.png` | 루미나리아 마을 지도. |
| #05 | 배경 | `assets/bg/RM_HOME.png` | 클로버의 집(방). 주인공 시점이라 클로버는 그리지 않음. |
| #06 | 배경 | `assets/bg/RM_PLAZA.png` | 로즈메리 광장과 시계탑, 주민1. |
| #07 | 배경 | `assets/bg/RM_LIBRARY_EXT.png` | 도서관 앞. 오른쪽에 아리아가 서 있음(4단계 대면 장소). |
| #08 | 배경 | `assets/bg/RM_LIBRARY_READING.png` | 도서관 열람실. |
| #09 | 배경 | `assets/bg/RM_LIBRARY_ARCHIVE.png` | 자료 보관실 (책장이 닫힌 판). |
| #10 | 배경 | `assets/bg/RM_LIBRARY_ARCHIVE_open.png` | 자료 보관실 (책장이 열려 비밀 통로가 보이는 판). 바로 위 그림과 같은 구도로. |
| #11 | 배경 | `assets/bg/RM_LIBRARY_SECRET.png` | 비밀 기록실. |
| #12 | 배경 | `assets/bg/RM_BELLA_SHOP.png` | 벨라의 잡화점, 벨라. |
| #13 | 배경 | `assets/bg/GW_TOWER.png` | 주야 교대 새집 탑 (레버 4개 장치 + 교대 기록). |
| #14 | 배경 | `assets/bg/GW_OAKS.png` | 오크스의 나이테 회전형 만물상, 오크스. |
| #15 | 배경 | `assets/bg/GW_SIENNA.png` | 시에나의 계절 망토 공방, 시에나. |
| #16 | 배경 | `assets/bg/GW_HOUSE.png` | 글렌위버 마을 주택, 주민2. |
| #17 | 배경 | `assets/bg/LM_LIGHTHOUSE.png` | 바다거북 우체국 등대, 노아. |
| #18 | 배경 | `assets/bg/LM_ATELIER.png` | 펄 루미너스 아틀리에 (유리 작품 + 작업대). |
| #19 | 배경 | `assets/bg/LM_CAFE.png` | 루루의 카페, 루루. 오른쪽 위 해파리 조명. |
| #20 | 배경 | `assets/bg/LM_HARBOR.png` | 루미나리아 항구 (선착장 + 표지판). |
| #21 | 인물 | `assets/npc/bella.png` | 벨라 인물 그림(배경 속 벨라를 누르면 그림 창 전체에 뜸). |
| #22 | 인물 | `assets/npc/aria.png` | 아리아 인물 그림. |
| #23 | 인물 | `assets/npc/oaks.png` | 오크스 인물 그림. |
| #24 | 인물 | `assets/npc/sienna.png` | 시에나 인물 그림. |
| #25 | 인물 | `assets/npc/noa.png` | 노아 인물 그림. |
| #26 | 인물 | `assets/npc/lulu.png` | 루루 인물 그림. |
| #27 | 인물 | `assets/npc/resident1.png` | 주민1(로즈메리) 인물 그림. |
| #28 | 인물 | `assets/npc/resident2.png` | 주민2(글렌위버) 인물 그림. |
| #29 | 클로즈업 | `assets/view/v-mirror.png` | 클로버의 집 거울 클로즈업. 비친 방이 아주 살짝 어긋남. |
| #30 | 클로즈업 | `assets/view/v-archivebox.png` | 자료 보관실 보관함 클로즈업. 거의 다 빈 칸. |
| #31 | 클로즈업 | `assets/view/v-display.png` | 벨라 잡화점 진열대 클로즈업. 오르골 하나만 먼지 없이 깨끗. |
| #32 | 클로즈업 | `assets/view/v-birdhouse.png` | 새집 장치를 푼 뒤 보이는 안쪽. |
| #33 | 클로즈업 | `assets/view/v-shelf.png` | 나이테 회전 선반을 푼 뒤의 모습. |
| #34 | 클로즈업 | `assets/view/v-oldthing.png` | 오크스 만물상의 오래된 물건. |
| #35 | 클로즈업 | `assets/view/v-glassart.png` | 아틀리에 유리 작품. 안에 마을이 희미하게 보임. |
| #36 | 클로즈업 | `assets/view/v-atelier.png` | 마지막 퍼즐(유리 조각)을 푼 뒤의 이어 붙인 유리. ※엔딩에서 "창문"으로 쓰이고 유리 너머로 아리아가 비침. |
| #37 | 클로즈업 | `assets/view/v-pier.png` | 항구 선착장 끝. 같은 자리에 찍힌 발자국. |
| #38 | 퍼즐 단서 | `assets/view/v-sign.png` | [퍼즐 단서] 항구 표지판 → 서랍 자물쇠 정답 417. |
| #39 | 퍼즐 단서 | `assets/view/v-clock.png` | [퍼즐 단서] 광장 시계 11:59 → 회전 선반 정답 5911 + 유리 조각 시계 방향. |
| #40 | 퍼즐 단서 | `assets/view/v-book.png` | [퍼즐 단서] 「나이테 읽는 법」 → 회전 선반은 바깥 링부터, 분(긴 바늘) 먼저. |
| #41 | 퍼즐 단서 | `assets/view/v-shopledger.png` | [퍼즐 단서] 벨라 장부 → 우편함 시계 정답 6:20. |
| #42 | 퍼즐 단서 | `assets/view/v-registry.png` | [퍼즐 단서] 주민 명부 → 대출 장부 정답 "하나"(명부에 없는 이름). |
| #43 | 퍼즐 단서 | `assets/view/v-ledger.png` | [퍼즐 결과] 대출 장부를 푼 뒤 모습. 모든 줄이 똑같음. |
| #44 | 퍼즐 단서 | `assets/view/v-cloak.png` | [퍼즐 단서] 망토 완성 도안 → 기록 조각 슬라이드(위 해·가운데 시계탑·아래 물결). |
| #45 | 퍼즐 단서 | `assets/view/v-jelly.png` | [퍼즐 단서] 해파리 조명 → 새집 레버 순서. 놓인 자리는 노랑·파랑·초록·분홍. |
| #46 | 퍼즐 단서 | `assets/view/v-shiftlog.png` | [퍼즐 단서] 새집 탑 교대 기록 → 유리 조각 순서와 ▲ 방향(새가 날아가는 쪽). |
| #47 | 퍼즐 단서 | `assets/view/v-record.png` | [퍼즐 단서] 복원된 기록 → 등대 신호 정답(오른쪽 ●에서 왼쪽으로: 저녁 밤 아침 밤 낮). |
| #48 | 퍼즐 단서 | `assets/view/v-board.png` | [퍼즐 단서] 광장 게시판 → ▲ = 2. |
| #49 | 퍼즐 단서 | `assets/view/v-mailbox.png` | [퍼즐 단서] 우편함 편지 → ● = 3. |
| #50 | 퍼즐 단서 | `assets/view/v-workbench.png` | [퍼즐 단서] 공방 작업대 → ★ = 7 (땀 7개, 번호 없음). |
| #51 | 바탕만 | `assets/view/v-desk.png` | 책상 위 노트 (바탕만. 내용은 사이트가 얹음). |
| #52 | 바탕만 | `assets/view/v-drawer.png` | 서랍 속 (바탕만). |
| #53 | 바탕만 | `assets/view/v-journal.png` | 관찰일지 (바탕만). |
| #54 | 바탕만 | `assets/view/v-oldrec.png` | 오래된 기록 (바탕만). |
| #55 | 바탕만 | `assets/view/v-libnotice.png` | 도서관 출입 제한 안내문 판 (바탕만). |
| #56 | 바탕만 | `assets/view/v-menu.png` | 카페 메뉴판 (바탕만). |
| #57 | 바탕만 | `assets/view/v-letter.png` | 부치지 못한 편지 (바탕만). |
| #58 | 사이트 배경 | `assets/page/stage1.png` | 사이트 바깥 배경 (1단계 · 일상). 화면 전체에 늘어나 깔림. |
| #59 | 사이트 배경 | `assets/page/stage2.png` | 사이트 바깥 배경 (2단계 · 미세한 어긋남). 화면 전체에 늘어나 깔림. |
| #60 | 사이트 배경 | `assets/page/stage3.png` | 사이트 바깥 배경 (3단계 · 뚜렷한 오류). 화면 전체에 늘어나 깔림. |
| #61 | 사이트 배경 | `assets/page/stage4.png` | 사이트 바깥 배경 (4단계 · 심한 오류). 화면 전체에 늘어나 깔림. |
| #62 | 사이트 배경 | `assets/page/stage5.png` | 사이트 바깥 배경 (5단계 · 완전한 오류). 화면 전체에 늘어나 깔림. |
| #63 | 마우스 포인터 | `assets/cursor/stage1.png` | 마우스 포인터 (1단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음. |
| #64 | 마우스 포인터 | `assets/cursor/stage2.png` | 마우스 포인터 (2단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음. |
| #65 | 마우스 포인터 | `assets/cursor/stage3.png` | 마우스 포인터 (3단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음. |
| #66 | 마우스 포인터 | `assets/cursor/stage4.png` | 마우스 포인터 (4단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음. |
| #67 | 마우스 포인터 | `assets/cursor/stage5.png` | 마우스 포인터 (5단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음. |
| #68 | 균열 | `assets/crack/stage4.png` | 4단계부터 사이트 전체(머리글·그림 창·설명·무대 뒤) 위에 덮이는 균열. |
| #69 | 균열 | `assets/crack/stage5.png` | 5단계 균열 (더 크고 많이). 한 장만 만들면 4·5단계에 같이 씀. |
| #70 | 엔딩 | `assets/ending/aria.png` | 엔딩: 창문(이어 붙인 유리) 너머로 2초 뒤 나타나 플레이어를 바라보다 사라지는 아리아. |

---

## 배경

### #01 · `assets/bg/WORLD_MAP.png`

- **설명**: 월드맵. 세 마을이 한 무대 위에 놓인 첫 화면.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 로즈메리(왼쪽 가운데) · 글렌위버(가운데 약간 위) · 루미나리아(오른쪽)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. grand cream and gold paper proscenium arch, curtains on the left in dusty rose with roses, top valance mixing rose, oak leaf and seashell paper ornaments, curtains on the right in teal with shells, foreground paper clouds along the bottom edge. Scene: overview of three fairy-tale villages as miniature paper-craft sets on one big stage: on the left a rose-roofed village with a clock tower, in the center slightly higher a forest village with a giant tree full of birdhouses, on the right a seaside village with a striped lighthouse and blue roofs, paper hills and paper sea connecting them, small paper paths. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #02 · `assets/bg/MAP_ROSEMARY.png`

- **설명**: 로즈메리 마을 지도. 장소 4곳을 고르는 화면.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 클로버의 집 · 광장 시계탑 · 도서관 · 벨라의 잡화점

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. Scene: wide overview of Rosemary village, tidy medieval European houses with rose-colored roofs, from left to right: a small cozy cottage, the tall clock tower on the town square, a stately stone library with arched windows, a little general store with a striped awning. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #03 · `assets/bg/MAP_GLENWEAVER.png`

- **설명**: 글렌위버 마을 지도.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 새집 탑 · 만물상 · 망토 공방 · 마을 주택

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. Scene: wide overview of Glenweaver forest village, green roofs, from left to right: a giant ancient tree covered with many birdhouses, a round shop built inside an old tree stump with tree-ring patterns, a cloak workshop with seasonal cloaks hanging outside, a small cottage. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #04 · `assets/bg/MAP_LUMINARIA.png`

- **설명**: 루미나리아 마을 지도.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 우체국 등대 · 아틀리에 · 카페 · 항구

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. Scene: wide overview of Luminaria seaside village, blue roofs, from left to right: a striped lighthouse post office with sea turtles carrying letters in the water, a glass greenhouse atelier glowing with pearl light, a café with a striped awning and jellyfish lamps, a small wooden harbor pier with sailboats. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #05 · `assets/bg/RM_HOME.png`

- **설명**: 클로버의 집(방). 주인공 시점이라 클로버는 그리지 않음.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 책상 · 서랍(다이얼 자물쇠) · 거울

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: inside Clover's cozy cottage room, cream paper walls with small clover and rose wallpaper, on the left a wooden writing desk with an open old notebook, in the center a low wooden chest of drawers with a small three-wheel combination dial lock, on the right a tall oval standing mirror, lace curtains, warm and tidy, everything perfectly in place. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #06 · `assets/bg/RM_PLAZA.png`

- **설명**: 로즈메리 광장과 시계탑, 주민1.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 시계탑(왼쪽, 크게) · 게시판(가운데) · 주민(오른쪽)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. Scene: Rosemary town square, the tall clock tower with a large round clock face and a bell, rose vines, checkered pink paper pavement with a compass-star pattern, a wooden notice board on posts in the middle, benches and street lamps. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: a Rosemary villager: chibi townsperson in a rose-pink apron and straw hat, gentle smile, holding a flower basket, standing on the right. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #07 · `assets/bg/RM_LIBRARY_EXT.png`

- **설명**: 도서관 앞. 오른쪽에 아리아가 서 있음(4단계 대면 장소).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 출입 제한 안내문(왼쪽 아래) · 도서관 문(가운데) · 아리아(오른쪽)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. Scene: front of the Rosemary library, a stately cream stone building with tall arched windows and a big arched double door, a small framed notice plaque on a post at the lower left, rose bushes, steps. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: Aria: chibi girl, very long straight silver-white hair, lavender eyes, gentle calm smile, cream ankle-length dress with puff sleeves, lavender ribbon bow, lace hem, white flat shoes, holding a round brass pendant with lavender glass on a chain, standing on the right beside the door, calm, watching. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #08 · `assets/bg/RM_LIBRARY_READING.png`

- **설명**: 도서관 열람실.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 대출 장부 · 책장 · 자료 보관실 문

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: library reading room, tall wooden bookshelves packed with paper books, green reading lamps, on the left a reading desk with a large open lending ledger, in the center a tall bookshelf where several books share the same spine, on the right a heavy wooden door with an iron lock. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #09 · `assets/bg/RM_LIBRARY_ARCHIVE.png`

- **설명**: 자료 보관실 (책장이 닫힌 판).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 기록 조각 · 보관함 · (오른쪽 책장)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: cold dim archive room, dusty filing cabinets and storage boxes, muted beige and gray paper layers, on the left a table with torn paper fragments scattered in a square wooden frame, in the center a tall storage cabinet with mostly empty cubbies, on the right a plain bookcase standing against the wall. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #10 · `assets/bg/RM_LIBRARY_ARCHIVE_open.png`

- **설명**: 자료 보관실 (책장이 열려 비밀 통로가 보이는 판). 바로 위 그림과 같은 구도로.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 비밀 기록실 입구(오른쪽)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: cold dim archive room, dusty filing cabinets and storage boxes, muted beige and gray paper layers, on the left a table with torn paper fragments scattered in a square wooden frame, in the center a tall storage cabinet with mostly empty cubbies, on the right the bookcase has swung open revealing a narrow dark secret passage. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #11 · `assets/bg/RM_LIBRARY_SECRET.png`

- **설명**: 비밀 기록실.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 관찰일지 · 오래된 기록

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: hidden secret archive room, small and quiet, lavender-gray paper layers, dust in the air, on the left a desk with a leather observation journal, on the right a lectern holding a very thick ancient record book. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #12 · `assets/bg/RM_BELLA_SHOP.png`

- **설명**: 벨라의 잡화점, 벨라.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 벨라 · 진열대 · 장부

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: inside Bella's general store, wooden shelves full of jars, baskets, candles and ribbons, a striped awning inside the window, in the center a neat display table where one cherished item sits spotless, on the right a shop counter with an open ledger. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: Bella: chibi girl about 2.5 heads tall, short wavy auburn bob with a pink ribbon bow, green-gray eyes, cream puff-sleeve blouse with peter pan collar and pink ribbon tie, dusty pink bloomer shorts, white frilly socks, brown mary jane shoes, holding a small cream wooden box with pink trim, standing on the left, cheerful. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #13 · `assets/bg/GW_TOWER.png`

- **설명**: 주야 교대 새집 탑 (레버 4개 장치 + 교대 기록).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 새집 장치(레버 4개) · 교대 기록

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. Scene: at the foot of the giant birdhouse tower tree, many small wooden birdhouses with green roofs, bluebirds and a squirrel, on the left a wooden gear mechanism on the trunk with four colored levers (blue, pink, yellow, green), on the right a small wooden board on a stand holding a paper shift log. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #14 · `assets/bg/GW_OAKS.png`

- **설명**: 오크스의 나이테 회전형 만물상, 오크스.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 오크스 · 회전 선반 · 오래된 물건

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: inside Oaks' general goods shop built in a hollow tree, tree-ring patterns on the walls, in the center a big round rotating shelf made of four nested tree-ring rings, on the right a small worn wooden object on a stool with a little paper tag. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: Oaks: chibi elderly man, fluffy white curly hair and big white beard, round brass glasses, small oak leaf in his hair, brown quilted vest with a wooden tree-ring badge, cream shirt with rolled sleeves, moss green trousers, acorn pouch and leather satchel, brown shoes, standing on the left behind a counter. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #15 · `assets/bg/GW_SIENNA.png`

- **설명**: 시에나의 계절 망토 공방, 시에나.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 시에나 · 걸린 망토 · 작업대

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: Sienna's seasonal cloak workshop, cloaks in spring, summer, autumn and winter colors hanging on a rail in the center, thread spools, fabric bolts, on the right a sewing workbench with an unfinished cloak and a needle. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: Sienna: chibi girl, long wavy olive-brown hair with small peach flowers, green eyes, olive green layered tunic dress with wide sleeves and sailor collar, mustard yellow neckerchief, mint sheer sash with a small glass vial and a thread spool, beige ankle boots with green ribbons, standing on the left. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #16 · `assets/bg/GW_HOUSE.png`

- **설명**: 글렌위버 마을 주택, 주민2.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 주민 · 주민 명부(오른쪽 벽)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: inside a modest forest cottage, wooden beams, knitted rugs, on the right wall a framed paper residents register, a teapot on the table. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: a Glenweaver villager: chibi townsperson in a sage green knitted cardigan and leaf-patterned scarf, standing in the center. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #17 · `assets/bg/LM_LIGHTHOUSE.png`

- **설명**: 바다거북 우체국 등대, 노아.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 노아 · 우편함(작은 시계) · 편지

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: inside the sea-turtle post office at the base of the lighthouse, round stone walls, brass fittings, letter cubbies, sea turtle motifs, in the center-left a brass mailbox with a small round clock on top, on the right a counter with a sealed envelope. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: Noa: chibi boy, curly auburn-brown hair, small scar on the forehead, navy wool jacket with a brass sea-turtle brooch, cream cable-knit sweater, beige trousers rolled at the hem, brown boots, holding a brass lantern, coiled rope and a postal stamp, standing on the left with his lantern. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #18 · `assets/bg/LM_ATELIER.png`

- **설명**: 펄 루미너스 아틀리에 (유리 작품 + 작업대).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 유리 작품 · 작업대

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: Pearl Luminous glass atelier inside a greenhouse, pearly glass panes, glass art pieces glowing softly, on the left a large glass artwork with a faint village scene inside, on the right a worktable with four loose colored glass pieces. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #19 · `assets/bg/LM_CAFE.png`

- **설명**: 루루의 카페, 루루. 오른쪽 위 해파리 조명.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 루루 · 메뉴판 · 해파리 조명(오른쪽 위)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs, indoor room set built inside the same stage, paper flats for walls, cut-paper furniture standing like stage props. Scene: Lulu's seaweed dessert café, pastel aqua walls, shell chairs, on the center-left a menu board on an easel, on the upper right four jellyfish-shaped hanging lamps in blue, pink, yellow and green. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. Characters in the scene: Lulu: chibi girl, long wavy lavender hair with a mint jellyfish hair clip, layered sheer lavender and white frilly dress with a star brooch, mint ribbon, lavender flat shoes, holding a glass jar of pastel star candies, standing on the left behind the counter. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #20 · `assets/bg/LM_HARBOR.png`

- **설명**: 루미나리아 항구 (선착장 + 표지판).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 선착장 · 표지판

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. Scene: small Luminaria harbor, wooden pier with rope railings on the left reaching into the paper sea, sailboats, sea turtles, on the right a wooden harbor signpost with a blank board. Wide 16:9 landscape composition; keep every important object away from the very top and bottom edges (the image may be cropped to 16:9), and keep the bottom strip of the image free of clickable objects (only foreground paper bushes there). Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

---

## 인물

### #21 · `assets/npc/bella.png`

- **설명**: 벨라 인물 그림(배경 속 벨라를 누르면 그림 창 전체에 뜸).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: Bella: chibi girl about 2.5 heads tall, short wavy auburn bob with a pink ribbon bow, green-gray eyes, cream puff-sleeve blouse with peter pan collar and pink ribbon tie, dusty pink bloomer shorts, white frilly socks, brown mary jane shoes, holding a small cream wooden box with pink trim, inside her general store. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #22 · `assets/npc/aria.png`

- **설명**: 아리아 인물 그림.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: Aria: chibi girl, very long straight silver-white hair, lavender eyes, gentle calm smile, cream ankle-length dress with puff sleeves, lavender ribbon bow, lace hem, white flat shoes, holding a round brass pendant with lavender glass on a chain, in front of the library door, calm smile that feels slightly too perfect. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #23 · `assets/npc/oaks.png`

- **설명**: 오크스 인물 그림.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: Oaks: chibi elderly man, fluffy white curly hair and big white beard, round brass glasses, small oak leaf in his hair, brown quilted vest with a wooden tree-ring badge, cream shirt with rolled sleeves, moss green trousers, acorn pouch and leather satchel, brown shoes, inside the tree-ring shop. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #24 · `assets/npc/sienna.png`

- **설명**: 시에나 인물 그림.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: Sienna: chibi girl, long wavy olive-brown hair with small peach flowers, green eyes, olive green layered tunic dress with wide sleeves and sailor collar, mustard yellow neckerchief, mint sheer sash with a small glass vial and a thread spool, beige ankle boots with green ribbons, inside the cloak workshop. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #25 · `assets/npc/noa.png`

- **설명**: 노아 인물 그림.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: Noa: chibi boy, curly auburn-brown hair, small scar on the forehead, navy wool jacket with a brass sea-turtle brooch, cream cable-knit sweater, beige trousers rolled at the hem, brown boots, holding a brass lantern, coiled rope and a postal stamp, inside the lighthouse post office. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #26 · `assets/npc/lulu.png`

- **설명**: 루루 인물 그림.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: Lulu: chibi girl, long wavy lavender hair with a mint jellyfish hair clip, layered sheer lavender and white frilly dress with a star brooch, mint ribbon, lavender flat shoes, holding a glass jar of pastel star candies, inside the jellyfish café. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #27 · `assets/npc/resident1.png`

- **설명**: 주민1(로즈메리) 인물 그림.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: a Rosemary villager: chibi townsperson in a rose-pink apron and straw hat, gentle smile, holding a flower basket, on the town square. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #28 · `assets/npc/resident2.png`

- **설명**: 주민2(글렌위버) 인물 그림.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 얼굴은 위쪽 절반

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. cute chibi SD characters about 3 heads tall, round faces, big heads, short limbs, soft clothing silhouettes, watercolor on paper, same paper texture as the set. waist-up close-up of the character standing on the paper stage, slightly left of center, face in the upper half of the frame, the village curtain frame visible at the edges, softly blurred paper set of the location behind, gentle neutral expression, looking at the viewer. Character: a Glenweaver villager: chibi townsperson in a sage green knitted cardigan and leaf-patterned scarf, inside a forest cottage. Wide 16:9 landscape composition; the dialogue box will cover the bottom quarter, so keep the face in the upper half. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

---

## 클로즈업

### #29 · `assets/view/v-mirror.png`

- **설명**: 클로버의 집 거울 클로즈업. 비친 방이 아주 살짝 어긋남.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an oval standing mirror, the reflection of the cozy room inside it looks very slightly out of sync, as if delayed. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #30 · `assets/view/v-archivebox.png`

- **설명**: 자료 보관실 보관함 클로즈업. 거의 다 빈 칸.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a storage cabinet with many cubbies, almost all empty, faint dust outlines where boxes used to be. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #31 · `assets/view/v-display.png`

- **설명**: 벨라 잡화점 진열대 클로즈업. 오르골 하나만 먼지 없이 깨끗.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a display table in a general store, one small cherished music box sits perfectly spotless while everything around it has a little dust. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #32 · `assets/view/v-birdhouse.png`

- **설명**: 새집 장치를 푼 뒤 보이는 안쪽.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a wooden birdhouse gear mechanism opened, the gears stopped, inside a looping track that returns to the same place. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #33 · `assets/view/v-shelf.png`

- **설명**: 나이테 회전 선반을 푼 뒤의 모습.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a round rotating shelf of four nested tree-ring rings, stopped, the same carved marks repeating around every ring. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #34 · `assets/view/v-oldthing.png`

- **설명**: 오크스 만물상의 오래된 물건.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a small worn wooden heirloom on a stool, smooth from years of hands, a tiny blank paper tag tied with string, quiet and precious. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #35 · `assets/view/v-glassart.png`

- **설명**: 아틀리에 유리 작품. 안에 마을이 희미하게 보임.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a large pearly glass artwork, inside the glass a tiny village scene is faintly visible. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #36 · `assets/view/v-atelier.png`

- **설명**: 마지막 퍼즐(유리 조각)을 푼 뒤의 이어 붙인 유리. ※엔딩에서 "창문"으로 쓰이고 유리 너머로 아리아가 비침.
- **크기**: 16:9 가로
- **꼭 지킬 것**: ※ 엔딩의 **창문**으로도 쓰인다. 엔딩에서 회색으로 빛바래 보이고, 2초 뒤 유리 너머로 아리아가 비친다 → 유리 칸이 잘 보이게. 넣은 뒤 유리 칸 위치를 `EF.ENDING_WINDOW_PANE` 에 맞춘다

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a small window made of four pieces of colored glass joined into one stained-glass picture: dawn, noon, sunset and night arranged clockwise, muted faded colors, the glass panes semi-clear so something behind them could be seen, no one around. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #37 · `assets/view/v-pier.png`

- **설명**: 항구 선착장 끝. 같은 자리에 찍힌 발자국.
- **크기**: 16:9 가로

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: the end of a wooden pier, a pair of small boot prints pressed into the wet planks at the exact same spot, sea and sailboats behind. Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

---

## 퍼즐 단서

### #38 · `assets/view/v-sign.png`

- **설명**: [퍼즐 단서] 항구 표지판 → 서랍 자물쇠 정답 417.
- **크기**: 16:9 가로
- **꼭 지킬 것**: **루미나리아 항구** / ⛴️ **4:17**

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a wooden harbor signpost seen up close, sea and sailboats behind, the signboard reads a harbor name and an arrival time with a small ship icon. Exact writing on the signboard: first line "루미나리아 항구" (Korean, means Luminaria Harbor); second line a small ship icon followed by the time "4:17". Nothing else written. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #39 · `assets/view/v-clock.png`

- **설명**: [퍼즐 단서] 광장 시계 11:59 → 회전 선반 정답 5911 + 유리 조각 시계 방향.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 시각 **11:59** (긴 바늘 59분, 짧은 바늘 12 직전), 시계 방향 화살표

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: the clock tower's round clock face seen up close with Roman numerals, the long minute hand pointing at 59 minutes, the short hour hand just before XII, a faint curved arrow showing clockwise direction, rose vines around. Only the Roman numerals I to XII on the dial. Hands show exactly 11:59: the long minute hand points at the 59-minute mark (one tick before XII), the short hour hand sits just before XII. A faint curved arrow beside the dial shows clockwise direction. No other writing. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #40 · `assets/view/v-book.png`

- **설명**: [퍼즐 단서] 「나이테 읽는 법」 → 회전 선반은 바깥 링부터, 분(긴 바늘) 먼저.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 제목 **나이테 읽는 법**, 링 번호 **1 2 3 4**(바깥→안쪽), 긴 바늘 **1** · 짧은 바늘 **2**

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an old open book on a desk titled "How to Read Tree Rings", left page: four concentric tree rings numbered 1 to 4 from the outermost ring inward with an arrow pointing inward, right page: a clock where the long hand is labeled 1 and the short hand is labeled 2. Exact writing: the book title "나이테 읽는 법" at the top. Left page: four concentric rings labeled 1, 2, 3, 4 from the OUTERMOST ring to the innermost, with an arrow pointing inward. Right page: a clock face whose long hand is labeled "1" and short hand is labeled "2". Nothing else written. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #41 · `assets/view/v-shopledger.png`

- **설명**: [퍼즐 단서] 벨라 장부 → 우편함 시계 정답 6:20.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 날짜 칸 전부 **봄 3일**, 마지막 줄 🐴✉️ **6:20**

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an open shop ledger on a wooden counter, rows of small item drawings with the same date on every row, the last line has a little horse-drawn mail coach drawing and a time. A ledger table with 4 rows; every row starts with the date "봄 3일". Rows: [봄 3일 | wheat bundle drawing | 2], [봄 3일 | oil lamp drawing | 1], [봄 3일 | yarn ball drawing | 1], [봄 3일 | wheat bundle drawing | 2]. Under the last row: a small horse-drawn mail coach drawing, an envelope drawing and the time "6:20". Nothing else written. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #42 · `assets/view/v-registry.png`

- **설명**: [퍼즐 단서] 주민 명부 → 대출 장부 정답 "하나"(명부에 없는 이름).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 🌹 **클로버 · 벨라 · 아리아 · 토비** / 🍂 **오크스 · 시에나 · 마렌 · 페넬** / 🐚 **노아 · 루루 · 로완** (**'하나' 없음**)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a framed residents register on a cottage wall with three columns headed by a rose, an oak leaf and a seashell, names written in each column. Three columns. Column 1 headed by a rose drawing: 클로버, 벨라, 아리아, 토비. Column 2 headed by an oak leaf drawing: 오크스, 시에나, 마렌, 페넬. Column 3 headed by a seashell drawing: 노아, 루루, 로완. Write exactly these Korean names, one per line, and nothing else (the name 하나 must NOT appear). the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #43 · `assets/view/v-ledger.png`

- **설명**: [퍼즐 결과] 대출 장부를 푼 뒤 모습. 모든 줄이 똑같음.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 5줄 모두 **봄 3일 · 하나 · 첫 번째 하루**

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an open library lending ledger, every row is identical: the same date, the same borrower name, the same book title. Three column headers drawn as icons (calendar, person, red book). Exactly 5 identical rows, each row reads: "봄 3일" | "하나" | "첫 번째 하루". Nothing else written. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #44 · `assets/view/v-cloak.png`

- **설명**: [퍼즐 단서] 망토 완성 도안 → 기록 조각 슬라이드(위 해·가운데 시계탑·아래 물결).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 위 **해** · 가운데 **시계탑** · 아래 **물결** (그림 문양)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a finished cloak pattern sheet pinned on the workshop wall, embroidered in three horizontal bands: top band suns, middle band clock towers, bottom band waves. No writing at all. Three horizontal embroidered bands: top band a row of suns, middle band a row of clock towers, bottom band a row of waves. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #45 · `assets/view/v-jelly.png`

- **설명**: [퍼즐 단서] 해파리 조명 → 새집 레버 순서. 놓인 자리는 노랑·파랑·초록·분홍.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 놓인 자리(왼→오) **노랑 · 파랑 · 초록 · 분홍** (새집 레버와 같은 배치). 켜지는 순서 **파랑 → 분홍 → 노랑 → 초록** 은 사이트가 그림 위에 빛으로 보여 준다

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: four jellyfish-shaped lamps hanging in a row from the café ceiling, from left to right: yellow, blue, green, pink, all unlit and dim, ready to glow. No writing at all. Exactly four jellyfish lamps in one row, left to right: yellow, blue, green, pink. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #46 · `assets/view/v-shiftlog.png`

- **설명**: [퍼즐 단서] 새집 탑 교대 기록 → 유리 조각 순서와 ▲ 방향(새가 날아가는 쪽).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 머리 🌅🐦↑ ☀️🐦← 🌇🐦↓ 🌙🐦↑ ✓ (새 방향 = 유리 조각 ▲ 방향), 7줄 모두 **봄 3일 · 05:12:00 · 11:59:00 · 17:44:00 · 23:59:00 · ✓**

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a wooden clipboard holding a shift log table, header icons dawn, noon, sunset, night, each header with a tiny bluebird flying in a direction (dawn: up, noon: left, sunset: down, night: up), seven rows with exactly the same date and the same times, a check mark on every row. A table. Header row (icons, no words): calendar | sunrise + tiny bluebird flying UP (arrow ↑) | sun + tiny bluebird flying LEFT (arrow ←) | sunset + tiny bluebird flying DOWN (arrow ↓) | moon + tiny bluebird flying UP (arrow ↑) | check mark. Then exactly 7 identical rows, each: "봄 3일" | "05:12:00" | "11:59:00" | "17:44:00" | "23:59:00" | ✓. Nothing else written. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #47 · `assets/view/v-record.png`

- **설명**: [퍼즐 단서] 복원된 기록 → 등대 신호 정답(오른쪽 ●에서 왼쪽으로: 저녁 밤 아침 밤 낮).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 왼쪽부터 ☀️ ← 🌙 ← 🌅 ← 🌙 ← 🌇 ● (● 오른쪽 끝에서 시작해 왼쪽으로 = 저녁 밤 아침 밤 낮)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a long torn paper strip restored and taped together, showing five small paintings joined by arrows pointing to the LEFT, from left to right: sun, moon, sunrise, moon, sunset, with a small red dot at the far right end marking where to start reading. No words. From left to right exactly: sun, arrow ←, moon, arrow ←, sunrise, arrow ←, moon, arrow ←, sunset, then a small red dot at the far right end. All arrows point LEFT. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #48 · `assets/view/v-board.png`

- **설명**: [퍼즐 단서] 광장 게시판 → ▲ = 2.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 같은 공지 **2장**, 각각 빨간 **▲**

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a wooden cork notice board, two identical paper notices with a broom drawing pinned side by side, each stamped with a red triangle mark. No words. Exactly two identical notices with a broom drawing, each stamped with one red triangle ▲. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #49 · `assets/view/v-mailbox.png`

- **설명**: [퍼즐 단서] 우편함 편지 → ● = 3.
- **크기**: 16:9 가로
- **꼭 지킬 것**: 편지 **3통**, 각각 **●** 봉인

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an open brass mailbox, three identical envelopes inside, each sealed with a round red wax seal. No words. Exactly three identical envelopes, each with one round red wax seal ●. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

### #50 · `assets/view/v-workbench.png`

- **설명**: [퍼즐 단서] 공방 작업대 → ★ = 7 (땀 7개, 번호 없음).
- **크기**: 16:9 가로
- **꼭 지킬 것**: **★** 표 + 실로 꿰맨 땀 **정확히 7개**(7번째에 바늘이 꽂힌 채 멈춤), 그 뒤 바늘구멍 3개. **번호 없음**(땀을 세어 7을 알게 함)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of layered cut-paper oak leaves and twisting branches forming curtains on both sides and an arch on top, small cream and pink paper blossoms, large paper tree trunks at the side wings, foreground row of layered paper leaf bushes along the bottom edge, green roofs, distant row of arches on the hills. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a strip of cloth on a sewing workbench, a small paper tag with a star mark sewn at the left end, a single straight row of stitches: exactly seven red thread stitches sewn, a silver needle with thread stuck in the seventh stitch, then three empty needle holes, no numbers. No words and NO numbers. A small tag with one star ★. Exactly seven sewn red stitches in one straight row, the needle stuck in the 7th stitch, then exactly three empty needle holes. the writing is hand-lettered in brown ink on cream paper, clearly legible, exactly as specified, nothing else written. Wide 16:9 landscape composition. Do NOT include: watermark, signature, logo, misspelled text, extra numbers, wrong digits, garbled letters, photorealistic, 3D render, CGI, plastic, glossy, harsh cast shadows, neon colors, black vector outlines, cel shading, wide-angle distortion.
```

---

## 바탕만

### #51 · `assets/view/v-desk.png`

- **설명**: 책상 위 노트 (바탕만. 내용은 사이트가 얹음).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 가운데 종이는 비워 둠 · 사이트가 얹는 것: 🕰️✔ 🛒✔ 📚✖

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an old notebook open on a wooden desk, lined pages blank. Leave the paper surface in the center completely blank and empty, no writing at all (text will be added later by the website). Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #52 · `assets/view/v-drawer.png`

- **설명**: 서랍 속 (바탕만).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 가운데 종이는 비워 둠 · 사이트가 얹는 것: 같은 메모 여러 장

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an open wooden drawer seen from above, empty bottom. Leave the paper surface in the center completely blank and empty, no writing at all (text will be added later by the website). Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #53 · `assets/view/v-journal.png`

- **설명**: 관찰일지 (바탕만).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 가운데 종이는 비워 둠 · 사이트가 얹는 것: 📅+1 · 내일의 클로버

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a leather observation journal open on a desk in a dim secret room, blank pages. Leave the paper surface in the center completely blank and empty, no writing at all (text will be added later by the website). Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #54 · `assets/view/v-oldrec.png`

- **설명**: 오래된 기록 (바탕만).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 가운데 종이는 비워 둠 · 사이트가 얹는 것: 같은 날짜 종이 여러 장

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a very thick ancient book open on a lectern, blank yellowed pages, dust. Leave the paper surface in the center completely blank and empty, no writing at all (text will be added later by the website). Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #55 · `assets/view/v-libnotice.png`

- **설명**: 도서관 출입 제한 안내문 판 (바탕만).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 가운데 종이는 비워 둠 · 사이트가 얹는 것: 📚🚫 / 🔑👤

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of dusty rose and crimson velvet-look paper curtains drawn to both sides, top valance of layered cut-paper scrolls with rose medallions, small gold flowers and leaves, foreground row of layered paper rose bushes and round shrubs along the bottom edge, rose-colored roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a small framed notice plaque on a post in front of the library, blank. Leave the paper surface in the center completely blank and empty, no writing at all (text will be added later by the website). Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #56 · `assets/view/v-menu.png`

- **설명**: 카페 메뉴판 (바탕만).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 가운데 종이는 비워 둠 · 사이트가 얹는 것: 어제 메뉴 = 오늘 메뉴

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: a café menu board on an easel, empty paper surface, shell decorations. Leave the paper surface in the center completely blank and empty, no writing at all (text will be added later by the website). Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

### #57 · `assets/view/v-letter.png`

- **설명**: 부치지 못한 편지 (바탕만).
- **크기**: 16:9 가로
- **꼭 지킬 것**: 가운데 종이는 비워 둠 · 사이트가 얹는 것: 클로버에게, (번진 글)

```
layered cut-paper theater diorama, paper puppet stage, handmade paper craft, visible cut paper edges, stacked paper layers with thin soft contact shadows between layers, watercolor and gouache texture printed on textured cream paper, subtle paper grain and speckles, warm soft diffused daylight at 1 pm, clear sunny weather, soft pastel palette of cream and ivory base with dusty rose, sage and moss green, powder blue, mint and lavender, warm brown hand-drawn outlines with lighter inner lines, storybook fairy-tale European village, cozy and symmetrical, front-facing stage composition at third-person eye level, theater proscenium framing, 16:9. stage frame of teal and powder blue paper drapes on both sides, top valance of cut-paper wave scrolls with scallop shells, seaweed garlands and small pearls, foreground cut-paper wave clouds and shells along the bottom edge, blue roofs. close-up stage insert: the single object fills the center of the frame like a prop on a small paper stage, simple dark paper backdrop, the village curtain frame cropped at the edges. Object: an opened envelope and a letter sheet on a post office counter, the paper is blank, a smudged postmark circle. Leave the paper surface in the center completely blank and empty, no writing at all (text will be added later by the website). Wide 16:9 landscape composition. Do NOT include: text, letters, words, numbers, digits, signature, watermark, logo, caption, label, photorealistic, 3D render, CGI, plastic, glossy, vinyl, PBR, mirror reflections, harsh cast shadows, dramatic rim light, volumetric light, neon colors, black vector outlines, cel shading, realistic adult proportions, wide-angle distortion, fisheye, extreme low or high angle, missing frame, frameless, modern buildings, cars.
```

---

## 사이트 배경

### #58 · `assets/page/stage1.png`

- **설명**: 사이트 바깥 배경 (1단계 · 일상). 화면 전체에 늘어나 깔림.
- **크기**: 16:9 가로 (1920×1080 이상)
- **꼭 지킬 것**: 깨끗한 크림색 종이

```
seamless warm cream paper texture background, soft speckles and faint fibers, flat, no objects, no frame, no text, wide 16:9 landscape, evenly filled edge to edge, calm
```

### #59 · `assets/page/stage2.png`

- **설명**: 사이트 바깥 배경 (2단계 · 미세한 어긋남). 화면 전체에 늘어나 깔림.
- **크기**: 16:9 가로 (1920×1080 이상)
- **꼭 지킬 것**: 아주 희미한 긁힘·얼룩

```
seamless warm cream paper texture background, soft speckles and faint fibers, flat, no objects, no frame, no text, wide 16:9 landscape, evenly filled edge to edge, a few barely visible faint gray scratches and tiny smudges
```

### #60 · `assets/page/stage3.png`

- **설명**: 사이트 바깥 배경 (3단계 · 뚜렷한 오류). 화면 전체에 늘어나 깔림.
- **크기**: 16:9 가로 (1920×1080 이상)
- **꼭 지킬 것**: 누렇게 변색, 가는 주름, 분홍·하늘색 작은 점

```
seamless warm cream paper texture background, soft speckles and faint fibers, flat, no objects, no frame, no text, wide 16:9 landscape, evenly filled edge to edge, slightly yellowed and stained, thin hairline creases, a few small faded glitch-colored specks in pink and cyan
```

### #61 · `assets/page/stage4.png`

- **설명**: 사이트 바깥 배경 (4단계 · 심한 오류). 화면 전체에 늘어나 깔림.
- **크기**: 16:9 가로 (1920×1080 이상)
- **꼭 지킬 것**: 어두워지고 구겨짐, 작은 찢김 사이로 검은색, 픽셀 노이즈, 어긋난 가로 띠

```
the same cream paper now darker and wrinkled, small torn gaps showing pure black behind, scattered pink and cyan pixel noise, horizontal misaligned glitch bands, flat, no objects, no text, wide 16:9 landscape, evenly filled edge to edge
```

### #62 · `assets/page/stage5.png`

- **설명**: 사이트 바깥 배경 (5단계 · 완전한 오류). 화면 전체에 늘어나 깔림.
- **크기**: 16:9 가로 (1920×1080 이상)
- **꼭 지킬 것**: 회색으로 빛바래고 멈춤, 크게 갈라지고 찢겨 검은색, 깨진 픽셀 덩어리

```
grayish faded desaturated paper, frozen still, heavily cracked and torn with pure black showing through, broken pixel blocks frozen in place, flat, no objects, no text, wide 16:9 landscape, evenly filled edge to edge
```

---

## 마우스 포인터

### #63 · `assets/cursor/stage1.png`

- **설명**: 마우스 포인터 (1단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음.
- **크기**: 정사각형 · 투명 배경
- **꼭 지킬 것**: 깨끗한 종이 화살표

```
a single computer mouse pointer arrow icon, the arrow tip pointing exactly to the upper-left corner of the canvas, hand-cut cream paper arrow with a dark warm-brown outline, simple and bold so it stays readable when shrunk to 32x32 pixels, centered large, transparent background, no shadow outside the arrow, no text, clean and neat
```

### #64 · `assets/cursor/stage2.png`

- **설명**: 마우스 포인터 (2단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음.
- **크기**: 정사각형 · 투명 배경
- **꼭 지킬 것**: 테두리 색이 살짝 어긋남

```
a single computer mouse pointer arrow icon, the arrow tip pointing exactly to the upper-left corner of the canvas, hand-cut cream paper arrow with a dark warm-brown outline, simple and bold so it stays readable when shrunk to 32x32 pixels, centered large, transparent background, no shadow outside the arrow, no text, the outline slightly misregistered with faint pink and cyan color fringes
```

### #65 · `assets/cursor/stage3.png`

- **설명**: 마우스 포인터 (3단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음.
- **크기**: 정사각형 · 투명 배경
- **꼭 지킬 것**: 노이즈 점 몇 개

```
a single computer mouse pointer arrow icon, the arrow tip pointing exactly to the upper-left corner of the canvas, hand-cut cream paper arrow with a dark warm-brown outline, simple and bold so it stays readable when shrunk to 32x32 pixels, centered large, transparent background, no shadow outside the arrow, no text, slight pink and cyan color fringes, a few small noise dots and specks on and around the arrow
```

### #66 · `assets/cursor/stage4.png`

- **설명**: 마우스 포인터 (4단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음.
- **크기**: 정사각형 · 투명 배경
- **꼭 지킬 것**: 픽셀이 깨지고 가로줄이 밀림

```
a single computer mouse pointer arrow icon, the arrow tip pointing exactly to the upper-left corner of the canvas, hand-cut cream paper arrow with a dark warm-brown outline, simple and bold so it stays readable when shrunk to 32x32 pixels, centered large, transparent background, no shadow outside the arrow, no text, glitched: broken square pixels, two horizontal slices shifted sideways, pink and cyan color split, noise specks
```

### #67 · `assets/cursor/stage5.png`

- **설명**: 마우스 포인터 (5단계). 정사각형으로 크게 만들면 Claude 가 32×32 로 줄여 넣음.
- **크기**: 정사각형 · 투명 배경
- **꼭 지킬 것**: 회색으로 빛바래고 조각이 흩어짐

```
a single computer mouse pointer arrow icon, the arrow tip pointing exactly to the upper-left corner of the canvas, hand-cut gray faded paper arrow with a black outline, simple and bold so it stays readable when shrunk to 32x32 pixels, centered large, transparent background, no shadow outside the arrow, no text, heavily glitched and desaturated, fragmented with black pixel blocks and scattered broken pieces
```

---

## 균열

### #68 · `assets/crack/stage4.png`

- **설명**: 4단계부터 사이트 전체(머리글·그림 창·설명·무대 뒤) 위에 덮이는 균열.
- **크기**: 세로형 · 투명 배경
- **꼭 지킬 것**: 가는 균열 위주

```
black ink cracks spreading across a fully transparent background like a broken sheet of paper, thin branching hairline cracks and a few thicker jagged fissures, spread across the whole tall canvas but mostly near the edges and corners, large empty transparent areas in between, flat 2D ink drawing, no paper, no background color, no text
```

### #69 · `assets/crack/stage5.png`

- **설명**: 5단계 균열 (더 크고 많이). 한 장만 만들면 4·5단계에 같이 씀.
- **크기**: 세로형 · 투명 배경
- **꼭 지킬 것**: 굵은 틈이 더 많음

```
black ink cracks spreading across a fully transparent background like a broken sheet of paper, thin branching hairline cracks and many thick jagged fissures and wide black splits, spread across the whole tall canvas but mostly near the edges and corners, large empty transparent areas in between, flat 2D ink drawing, no paper, no background color, no text
```

---

## 엔딩

### #70 · `assets/ending/aria.png`

- **설명**: 엔딩: 창문(이어 붙인 유리) 너머로 2초 뒤 나타나 플레이어를 바라보다 사라지는 아리아.
- **크기**: 세로형 · 투명 배경
- **꼭 지킬 것**: 유리 너머에 서 있는 상반신 · 무표정 · 정면 응시

```
Aria standing still and facing the viewer, upper body, expressionless, staring straight ahead, Aria: chibi girl, very long straight silver-white hair, lavender eyes, gentle calm smile, cream ankle-length dress with puff sleeves, lavender ribbon bow, lace hem, white flat shoes, holding a round brass pendant with lavender glass on a chain, flat 2D cut-paper style, muted dim colors, slightly dark, transparent background, no frame, no text
```

---

## (선택) 오작동 배경
4단계부터 장면 배경이 바뀌는 판. 원하면 배경(#01~#20) 프롬프트 끝에 아래 문장을 붙여 같은 구도로 한 번 더 그립니다. 파일 이름은 `assets/bg/<원래 이름>_err.png` (예: `RM_PLAZA_err.png`).

```
malfunction state: same composition and buildings, dark blue-violet and indigo palette, restrained red horizontal glitch noise lines, red glowing windows and lamps, slight color misregistration, paper sky torn open in cracks, cracked and split paper floor, structure still readable
```

## 다 만든 뒤
- 만든 그림을 파일 이름 그대로 Claude 에게 보내 주면, 사이트에 넣고 클릭 위치·글 얹는 자리·엔딩 창문 유리 칸 위치를 그림에 맞춰 조정합니다.
- 퍼즐 단서 그림(#38~#50)은 숫자·기호가 정확한지 꼭 확인하세요. 한글이 깨지면 그 칸만 비워서 보내 주면 사이트가 글을 얹도록 바꿉니다.
