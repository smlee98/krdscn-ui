import { SearchIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/krds/(action)/button";

export default function ButtonIcon() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" aria-label="삭제">
        <Trash2Icon className="size-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label="검색">
        <SearchIcon className="size-5" />
      </Button>
    </div>
  );
}
