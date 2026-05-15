import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/krds/select";

export default function SelectMultiple() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="text-krds-gray-90 text-sm font-medium">지역 (그룹화)</label>
      <Select>
        <SelectTrigger size="large">
          <SelectValue placeholder="시/도를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>특별시 / 광역시</SelectLabel>
            <SelectItem value="seoul">서울특별시</SelectItem>
            <SelectItem value="busan">부산광역시</SelectItem>
            <SelectItem value="incheon">인천광역시</SelectItem>
            <SelectItem value="daegu">대구광역시</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>도</SelectLabel>
            <SelectItem value="gyeonggi">경기도</SelectItem>
            <SelectItem value="gangwon">강원특별자치도</SelectItem>
            <SelectItem value="jeju">제주특별자치도</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
