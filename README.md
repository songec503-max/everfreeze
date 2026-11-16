# EVERFREEZE 사이트

`index.html` 을 더블클릭하면 바로 실행됩니다 (서버·빌드 불필요, 정적 호스팅 가능).
`python3 build_single.py` 를 실행하면 모든 파일을 합친 `everfreeze_single.html` 하나가 만들어집니다 (공유·미리보기용).

## 구조 (3층)
- `src/data/`  내용: scenes(장소·핫스팟·규칙) / views(클로즈업) / evidence / deductions / puzzles / npcs / texts
- `src/engine/` 규칙: state(상태·오류 단계 계산·오답 수) / conditions / engine(액션 실행·자동 추리·엔딩 차단)
- `src/ui/`    화면: view(그림 창·뒤로 가기 띠·흔들림) / pz(퍼즐 유형별 화면) / overlays(대화·퍼즐 창·엔딩) / closeup(클로즈업) / notebook / debug

## 조사 = 클로즈업 장면
- 조사 요소를 누르면 그림 창 전체가 그 물건을 가까이 본 **클로즈업 장면**으로 바뀐다. 제목·설명 문장은 없다.
- 힌트는 그림 속 사물로만 보인다 (예: 게시판 공지 2장에 ▲, 편지 3통에 ●, 작업대 7번째 땀에서 멈춘 바늘 옆 ★, 하루 순서 그림 띠).
- 돌아가기: 장면과 똑같이 그림 하단 ▼ 띠를 클릭 (키보드는 Esc).
- 내용은 `src/data/views.js`. 종류: pic doc strip clock lights pattern steps pins stack ringguide
- 진짜 그림을 넣으려면 `assets/view/<뷰ID>.png` (1280×720) 를 넣고 `EF.VIEW_IMAGES` 에 ID 추가 (예: 오래된 물건 = `v-oldthing`)
- 아직 상호작용할 수 없는 것(단계 미달·잠긴 문·대면 전 작업대)은 글 없이 그림이 살짝 흔들린다.
- 퍼즐을 풀면 풀린 모습의 클로즈업이 열린다 (`puzzles.js` 의 `view`). `success` 문장은 화면에 나오지 않는 기획 메모.

## 그림 넣기
- 프롬프트와 전체 목록: `docs/IMAGE_PROMPTS.md`
- 배경 `assets/bg/<장면ID>.png` → `EF.BG_IMAGES` (scenes.js) · 오작동판 `<장면ID>_err.png` → `EF.BG_ERR_IMAGES` (4단계부터)
- 클로즈업 `assets/view/<뷰ID>.png` → `EF.VIEW_IMAGES` (views.js). 퍼즐 단서 그림은 숫자·글·기호까지 그림에 그려 그대로 보여 주고, `overlay:true` 인 것(퍼즐과 무관)만 사이트가 그림 위에 글을 얹는다(`box`, `bare`)
- 인물 크롭 `assets/npc/<인물ID>.png` → `EF.NPC_IMAGES` (npcs.js). 배경 속 인물을 누르면 이 그림이 뜨고 대화창이 위에 얹힌다

## 자주 하는 수정
- 대사 교체: `npcs.js` 의 `lines: [{if:[조건], text:'…'}]` (없으면 "000과 대화")
- 장소 소개말: `scenes.js` 각 장면의 `intro`
- 배경 이미지: `assets/bg/<장면ID>.png` (1280×720) 를 넣고 `scenes.js` 의 `EF.BG_IMAGES` 에 장면 ID 추가
- 핫스팟 좌표: `scenes.js` 의 `[x, y, w, h]` (1280×720 기준)
- 단계 구간 변경: `engine/state.js` 의 `EF.TIERS`
- 퍼즐 교체: `puzzles.js` — 정답을 바꾸면 **다른 마을에 있는 단서 문장(scenes.js)도 함께** 바꿀 것 (각 퍼즐의 `clueAt` 참고)
- 메모(추리 수첩) 다시 보이기: `texts.js` 의 `EF.CONFIG.showMemo = true`

## 퍼즐 9종 (정답·문장은 임시)
| ID | 위치 | 유형 | 정답 | 얻는 증거 | 단서 위치 |
|---|---|---|---|---|---|
| P-DRAWER | 클로버의 집 서랍 | dial | 417 | R-02 | 루미나리아 항구 표지판 |
| P-LEDGER | 도서관 열람실 대출 장부 | pick | 하나 | R-05 | 글렌위버 마을 주택 주민 명부 |
| P-ARCHIVE | 자료 보관실 기록 조각 | slide | 위 해 · 가운데 시계탑 · 아래 물결 | R-10 | 글렌위버 공방 망토 도안 |
| P-OLDREC | 비밀 기록실 오래된 기록 | cipher | 2737 (▲2 ★7 ●3 ★7) | R-11 | 공방 작업대 · 등대 우편함 · 광장 게시판 |
| P-BIRDHOUSE | 글렌위버 새집 탑 장치 | lever | 파랑→분홍→노랑→초록 | R-06 | 루미나리아 카페 해파리 조명 |
| P-SHELF | 글렌위버 만물상 회전 선반 | rings | 5911 | R-07 | 광장 시계 11:59 + 열람실 책장 |
| P-MAILBOX | 루미나리아 등대 우편함 | clock | 6시 20분 | R-09 | 로즈메리 벨라 장부 |
| P-LETTER | 루미나리아 등대 편지 | signal | 아침·낮·저녁·밤·밤 | R-12 | 로즈메리 자료 보관실 복원 기록 |
| P-ATELIER | 루미나리아 아틀리에 작업대 | glass | 새벽·한낮·노을·밤 (시계 방향, ▲ 위) | R-13 | 새집 탑 교대 기록 + 광장 시계 |

- 건너뛰기 없음. 닫아도 미해결로 남음. 오답 3회부터 힌트 문장이 보임 (`EF.HINT_AFTER`).
- 퍼즐 창은 Esc(또는 닫기 버튼)로만 닫힘. Enter/Space 로는 닫히지 않음.

## 조작
마우스 클릭 / 그림 아래쪽 가장자리 = 뒤로 / `Esc`·`Enter` 문장 닫기 / 설명 칸의 `클릭할 수 있는 곳 표시하기` / `?dev` 또는 `Ctrl+Shift+D` = 개발용 패널
