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
   node scripts/krds/render-compare/capture-compare.mjs < target > [--dark]
   # target: select | calendar | date-input | header | resize |
   #         main-menu | main-menu-mobile | file-upload | modal | tutorial-panel | carousel | table
   ```

   출력: `.omc/artifacts/render-compare/*.png` (orig/ours 쌍). playwright-core + chrome/msedge 채널 사용. 새 컴포넌트는 `TARGETS`에 항목 추가(원본 조각명, 우리 슬러그, 상태별 액션).

## 캡처 시 주의

- 원본 datepicker류 레이어는 위로 열림 — 액션에서 `body{padding-top:620px}` 주입 후 클릭.
- 클릭 후 `mouse.move(5,5)`로 hover 잔상 제거.
- 다크는 next-themes 소유라 `addInitScript`로 `localStorage.theme=dark` 주입.
- 알려진 의도적 이탈: 원본 `:focus`(클릭 후 링 유지) vs 우리 `focus-visible:`(키보드만).
- 캐러셀류(swiper 기반) 조각은 원본 사이트에서 페이지별 인라인 스크립트로 초기화하며 ui-script.js엔 없음 — 하네스가 `.swiper` 요소를 표준 클래스명(navigation/pagination) 기준으로 범용 초기화하도록 보강했으나, 완전한 픽셀 대조에는 한계가 있다.

## 2026-07-18 전수 대조 결과

**1차 (최악 8파일 재작성 검증)**: 회귀 2건(calendar 확인 버튼 원문, 연/월 드롭다운 원본 룩) + 기존 공백 3건(header 드롭다운 중앙 정렬·꼬리, resize "가장크게" 원문, 달력 토요일 자동 착색 제거)을 발견·수정. select/resize 다크/date-input은 일치 판정.

**2차 (커버리지 확대 — main-menu/main-menu-mobile/file-upload/modal/tutorial-panel/carousel/table)**: 구조적 회귀 없음. 관찰 사항:

- carousel: 원본 조각이 미스타일 스켈레톤이라(위 하네스 보강에도) 완전한 픽셀 대조 한계 — embla 직접 합성은 코드 레벨에서 byte-identical 구성 확인됨(carousel-graduate 보고).
- main-menu: "기본"(닫힘) vs 원본 샘플(열림)이 어긋난 비교였음 — "패널 포함" 예제와 대조해 사이드바 하이라이트·타이틀·바로가기 구조 일치 확인. 패널의 absolute 오버레이가 데모 박스 안에서 다음 섹션과 겹치는 것은 header.tsx와 동일한 의도된 오버레이 설계.
- tutorial-panel/help-panel: 액션 버튼이 원본은 auto-width, 우리는 `flex flex-col`로 풀폭 — 두 파일 동일 패턴이라 이전부터의 설계 선택(이번 회귀 아님). 배경색(#ecf2fe secondary)은 정확히 일치. 저위험 코스메틱, 미수정 기록만.
