import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/krds/select";

export default function SelectDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-krds-gray-90 text-sm font-medium">지역 (비활성)</label>
        <Select disabled defaultValue="seoul">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seoul">서울특별시</SelectItem>
            <SelectItem value="busan">부산광역시</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-krds-gray-90 text-sm font-medium">구분 (오류 상태)</label>
        <Select>
          <SelectTrigger hasError>
            <SelectValue placeholder="필수 항목입니다" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">옵션 A</SelectItem>
            <SelectItem value="b">옵션 B</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-krds-danger-50 text-xs">구분을 선택해주세요.</span>
      </div>
    </div>
  );
}
