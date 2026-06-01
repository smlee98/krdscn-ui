import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// KRDS 타이포 토큰은 `text-krds-*` 라는 커스텀 이름의 font-size 유틸리티다.
// 기본 twMerge 는 이를 모르고 text-color 그룹으로 오인해, 같은 요소의
// `text-white` / `text-krds-foreground-*` 같은 색상 유틸과 충돌시켜 하나를 제거한다.
// (예: KRDS Button default = bg-krds-primary-50 + text-white + text-krds-body-md →
//  text-white 가 삭제되어 파란 배경에 검정 글씨가 됨.)
// font-size 클래스 그룹에 명시 등록해 색상 유틸과 분리한다.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "krds-display-lg",
            "krds-display-md",
            "krds-display-sm",
            "krds-heading-xl",
            "krds-heading-lg",
            "krds-heading-md",
            "krds-heading-sm",
            "krds-heading-xs",
            "krds-heading-xxs",
            "krds-body-lg",
            "krds-body-md",
            "krds-body-sm",
            "krds-body-xs"
          ]
        }
      ]
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
