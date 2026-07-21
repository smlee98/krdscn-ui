<div align="center">

<img src=".github/assets/logo.png" alt="krdscn/ui" width="96" height="96">

# krdscn/ui

**KRDS(대한민국 정부 디자인 시스템)를 shadcn/ui 방식으로.**

React · TypeScript · Tailwind CSS v4 · Radix UI 기반의 KRDS 컴포넌트 레지스트리

[**문서 & 컴포넌트 카탈로그**](https://krdscn-ui.github.io/ui/) · [설치 가이드](https://krdscn-ui.github.io/ui/docs/installation/) · [레지스트리](https://krdscn-ui.github.io/ui/docs/registry/)

</div>

---

## 소개

krdscn/ui는 [KRDS](https://www.krds.go.kr/) 공식 컴포넌트를 [shadcn/ui](https://ui.shadcn.com) 레지스트리 형태로 제공합니다. 패키지를 설치하는 대신 **소스 코드가 프로젝트 안으로 복사**되므로, 서비스 요구사항에 맞게 직접 수정하고 확장할 수 있습니다.

- **KRDS 기본값 내장** — 색상·타이포그래피·이중 포커스 링 등 KRDS 디자인 토큰이 컴포넌트와 함께 설치됩니다.
- **접근성 내장** — 레이블·오류 메시지 ARIA 연결, 스크린리더 낭독, 건너뛰기 링크 등 KRDS 접근성 규칙이 기본입니다.
- **Radix 기반 호환** — 기존 shadcn/ui · Radix primitive 생태계와 같은 구조라, 쓰던 프로젝트에 그대로 얹을 수 있습니다.

## 사용법

shadcn CLI가 준비된 프로젝트에서 레지스트리 URL로 바로 설치합니다.

```bash
# 전체 컴포넌트 + KRDS 테마를 한 번에
npx shadcn@latest add https://krdscn-ui.github.io/ui/r/krds-all.json
```

필요한 것만 골라 설치할 수도 있습니다.

```bash
# 개별 컴포넌트
npx shadcn@latest add https://krdscn-ui.github.io/ui/r/button.json

# KRDS 디자인 토큰(테마)만
npx shadcn@latest add https://krdscn-ui.github.io/ui/r/krds-theme.json
```

설치 가능한 전체 목록과 각 컴포넌트의 예제·Props는 [문서 사이트](https://krdscn-ui.github.io/ui/docs/components/)에서 확인하세요.

## License

[MIT](./LICENSE) © smlee98, gwlee-dev
