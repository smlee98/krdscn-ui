import { TextInput } from "@/components/ui/krds/text-input";

export default function TextInputSearch() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <TextInput
        label="검색"
        type="search"
        placeholder="검색어를 입력하세요"
        hint="제목, 본문, 첨부파일 이름까지 검색됩니다."
      />
      <TextInput type="search" size="large" placeholder="공지사항 통합 검색" />
    </div>
  );
}
