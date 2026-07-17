"use client"

import { ChevronRight } from "lucide-react"
import { ContextualHelp, ContextualHelpLabel, ContextualHelpTitle } from "@/registry/krds/ui/contextual-help"

const positions = ["top", "bottom"] as const
const alignments = ["left", "center", "right"] as const

export default function ContextualHelpList() {
  return (
    <div className="flex flex-col items-center gap-16 p-32">
      {positions.map((position) => (
        <div key={position} className="flex w-full items-center justify-around gap-8">
          {alignments.map((alignment) => (
            <div key={`${position}-${alignment}`} className="inline-flex items-center gap-2">
              <ContextualHelpLabel>{`예시이미지(${position} ${alignment})`}</ContextualHelpLabel>
              <ContextualHelp position={position} alignment={alignment}>
                <ContextualHelpTitle>도움말 제목</ContextualHelpTitle>
                <p>
                  컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적
                  도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에 표시된다.
                </p>
                <div className="mt-2">
                  <a
                    href="#"
                    className="text-krds-body-sm text-krds-foreground hover:text-krds-foreground-primary inline-flex items-center gap-0.5"
                  >
                    <span>바로가기</span>
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </ContextualHelp>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
