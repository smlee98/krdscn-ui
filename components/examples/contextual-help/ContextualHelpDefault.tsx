import { ContextualHelp } from "@/components/ui/krds/(help)/contextual-help";

export default function ContextualHelpDefault() {
  return (
    <div className="flex items-center justify-center p-16">
      <ContextualHelp label="도움말 라벨" title="도움말 제목">
        <p>도움말 내용</p>
      </ContextualHelp>
    </div>
  );
}
