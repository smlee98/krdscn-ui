# 렌더 대조 하네스 (원본 KRDS vs krdscn/ui)

정적 코드 비교가 놓치는 리셋·페인트순서·런타임 상태를 원본 실렌더와 눈으로 대조한다. 판정은 픽셀 diff 스크립트가 아니라 **모델/사람 눈의 쌍별 비교**다.

## 구성

1. **원본 하네스 서버** — `Z:\krds-uiux`(원본 저장소) 필요:

   ```sh
   node scripts/krds/render-compare/harness-server.mjs # http://localhost:4173
   ```

   `/view/<name>` 이 `html/code/<name>.html` 조각을 토큰/공통/컴포넌트 CSS + ui-script.js로 래핑. 컴파일 CSS의 `/resources/img/img/` 이중 세그먼트는 서버가 재작성. 원본 저장소에 쓰기 금지.

2. **우리 쪽** — `yarn dev` (https://localhost:8080).

3. **캡처**:

   ```sh
   node scripts/krds/render-compare/capture-compare.mjs < select | calendar | date-input | header | resize > [--dark]
   ```

   출력: `.omc/artifacts/render-compare/*.png` (orig/ours 쌍). playwright-core + chrome/msedge 채널 사용. 새 컴포넌트는 `TARGETS`에 항목 추가(원본 조각명, 우리 슬러그, 상태별 액션).

## 캡처 시 주의

- 원본 datepicker류 레이어는 위로 열림 — 액션에서 `body{padding-top:620px}` 주입 후 클릭.
- 클릭 후 `mouse.move(5,5)`로 hover 잔상 제거.
- 다크는 next-themes 소유라 `addInitScript`로 `localStorage.theme=dark` 주입.
- 알려진 의도적 이탈: 원본 `:focus`(클릭 후 링 유지) vs 우리 `focus-visible:`(키보드만).

## 2026-07-18 전수 대조 결과

Phase 3 재작성 검증 완료 — 회귀 2건(calendar 확인 버튼 원문, 연/월 드롭다운 원본 룩) + 기존 공백 3건(header 드롭다운 중앙 정렬·꼬리, resize "가장크게" 원문, 달력 토요일 자동 착색 제거)을 발견·수정. select/resize 다크/date-input은 일치 판정.
