import { Button } from "@/components/ui/dynamic/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Button variant="default" size="xs">
        XSmall
      </Button>
      <Button variant="default" size="sm">
        Small
      </Button>
      <Button variant="default" size="default">
        Medium
      </Button>
      <Button variant="default" size="lg">
        Large
      </Button>
      <Button variant="default" size="xl">
        XLarge
      </Button>
    </div>
  );
}
