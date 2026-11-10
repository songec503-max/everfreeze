# EVERFREEZE 사이트

`index.html` 을 더블클릭하면 바로 실행됩니다 (서버·빌드 불필요, 정적 호스팅 가능).

## 구조 (3층)
- `src/data/`  내용: scenes(장소·핫스팟·규칙) / evidence / deductions / puzzles / npcs / texts
- `src/engine/` 규칙: state(상태·오류 단계 계산) / conditions / engine(액션 실행·엔딩 차단)
- `src/ui/`    화면: view / overlays(조사·대화·퍼즐·엔딩) / notebook(추리 수첩) / debug

## 자주 하는 수정
- 대사 교체: `npcs.js` 의 `lines: [{if:[조건], text:'…'}]` (없으면 "000과 대화")
- 장소 소개말: `scenes.js` 각 장면의 `intro`
- 배경 이미지: `assets/bg/<장면ID>.png` 를 넣고 `scenes.js` 의 `EF.BG_IMAGES` 에 장면 ID 추가
- 핫스팟 좌표: `scenes.js` 의 `[x, y, w, h]` (1280×720 기준)
- 단계 구간 변경: `engine/state.js` 의 `EF.TIERS`
- 퍼즐 교체: `puzzles.js` (type: pick / order / code)

## 조작
마우스 클릭 / `N` 추리 수첩 / `Esc`·`Enter` 닫기 / 상단 `힌트 표시` = 핫스팟 종류·임시 요소 표시 / `DEV` = 장면 이동·증거 지급·초기화
