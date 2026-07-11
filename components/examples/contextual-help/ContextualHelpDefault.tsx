import { ContextualHelp, ContextualHelpLabel, ContextualHelpTitle } from "@/components/ui/dynamic/contextual-help"

export default function ContextualHelpDefault() {
  return (
    <div className="flex items-center justify-center p-16">
      <div className="inline-flex items-center gap-2">
        <ContextualHelpLabel>도움말 라벨</ContextualHelpLabel>
        <ContextualHelp>
          <ContextualHelpTitle>도움말 제목</ContextualHelpTitle>
          <p>도움말 내용</p>
        </ContextualHelp>
      </div>
    </div>
  )
}
