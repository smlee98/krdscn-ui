import { ContextualHelp } from "@/components/ui/krds/contextual-help";

export default function ContextualHelpDefault() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-krds-gray-90 text-sm font-medium">주민등록번호</span>
      <ContextualHelp
        title="주민등록번호 안내"
        content="앞 6자리(생년월일)와 뒤 7자리를 입력하세요. 입력값은 암호화되어 저장됩니다."
      />
    </div>
  );
}
