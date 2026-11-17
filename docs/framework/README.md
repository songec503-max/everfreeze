# 연결망 그림 (08-A · 08-B · 08-C · 09 · 10)

사이트 데이터(`src/data/*.js`)에서 바로 뽑는 연결망 그림입니다. 대사·퍼즐·장소 소개를 고친 뒤 다시 뽑으면 그대로 반영됩니다.

| 파일 | 내용 |
|---|---|
| `EVERFREEZE_08-A.png` | 로즈메리 상세 연결망 (장면 → 클릭 → 결과 → 연쇄) |
| `EVERFREEZE_08-B.png` | 글렌위버 상세 연결망 |
| `EVERFREEZE_08-C.png` | 루미나리아 상세 연결망 |
| `EVERFREEZE_09.png` | 퍼즐 · 단서 연결망 |
| `EVERFREEZE_10.png` | 오류 단계 · 추리 · 엔딩 연결망 |

## 다시 뽑기
Playwright 가 있는 환경에서, 이 폴더의 절대 경로를 넘겨 실행합니다.

```bash
node shot.js "$(pwd)" RM GW LM   # 08-A · 08-B · 08-C
node shot2.js "$(pwd)"           # 09 · 10
```

- `framework.html?v=RM|GW|LM` : 08 생성기 · `fw09.html` · `fw10.html` : 09 · 10 생성기
- `common.js` · `base.css` : 09 · 10 공통 (단서 위치 목록 `CLUES` 는 여기서 고친다)
