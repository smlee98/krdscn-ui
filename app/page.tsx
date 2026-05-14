import { ComparisonGrid } from "@/app/comparison-grid";
import { KrdsAppShell } from "@/components/krds-app/app-shell";

export { KrdsVerifyPage as default };

function KrdsVerifyPage() {
  return (
    <KrdsAppShell>
      <main className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">KRDS 컴포넌트 라이브러리</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Each cell carries <code>data-krds-token</code> for getComputedStyle assertions.
        </p>
        <ComparisonGrid />
      </main>
    </KrdsAppShell>
  );
}
