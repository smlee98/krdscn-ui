import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/krds/select";

export default function SelectDefault() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="text-krds-gray-90 text-sm font-medium">정렬 기준</label>
      <Select defaultValue="recent">
        <SelectTrigger>
          <SelectValue placeholder="정렬 기준을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">최신 순</SelectItem>
          <SelectItem value="popular">인기 순</SelectItem>
          <SelectItem value="title">제목 순</SelectItem>
          <SelectItem value="views">조회수 순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
