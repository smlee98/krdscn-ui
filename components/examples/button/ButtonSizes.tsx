import { Button } from "@/components/ui/krds/(action)/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Button variant="primary" size="xsmall">
        XSmall
      </Button>
      <Button variant="primary" size="small">
        Small
      </Button>
      <Button variant="primary" size="medium">
        Medium
      </Button>
      <Button variant="primary" size="large">
        Large
      </Button>
      <Button variant="primary" size="xlarge">
        XLarge
      </Button>
    </div>
  );
}
