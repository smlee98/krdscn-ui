import { Button } from "@/components/ui/krds/button";

export default function ButtonTertiary() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="tertiary">3차 버튼 (tertiary)</Button>
      <Button variant="text">텍스트 버튼 (text)</Button>
      <Button variant="link">링크 버튼 (link)</Button>
    </div>
  );
}
