import { BellIcon, PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/krds/button";

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="icon" size="small" aria-label="추가">
        <PlusIcon className="size-3.5" />
      </Button>
      <Button variant="icon" size="medium" aria-label="검색">
        <SearchIcon className="size-4" />
      </Button>
      <Button variant="icon" size="large" aria-label="알림">
        <BellIcon className="size-5" />
      </Button>
      <Button variant="icon" size="xlarge" aria-label="추가 (XL)">
        <PlusIcon className="size-5" />
      </Button>
    </div>
  );
}
