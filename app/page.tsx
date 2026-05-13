import { ComparisonGrid } from "@/app/comparison-grid";

export { KrdsVerifyPage as default };

function KrdsVerifyPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>KRDS Wrapper Verification</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Each cell carries <code>data-krds-token</code> for getComputedStyle assertions.
      </p>
      <ComparisonGrid />
    </main>
  );
}
