import { Button } from "@/components/ui/krds/button";

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" disabled>
        Primary 비활성
      </Button>
      <Button variant="secondary" disabled>
        Secondary 비활성
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary 비활성
      </Button>
      <Button variant="text" disabled>
        Text 비활성
      </Button>
      <Button variant="link" disabled>
        Link 비활성
      </Button>
    </div>
  );
}
