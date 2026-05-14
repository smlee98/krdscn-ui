import { notFound } from "next/navigation";

import { SIDEBAR_GROUPS } from "@/lib/sidebar-nav";

export async function generateStaticParams() {
  return SIDEBAR_GROUPS.flatMap((group) => group.items.map((item) => ({ group: group.id, id: item.id })));
}

interface PageProps {
  params: Promise<{ group: string; id: string }>;
}

export default async function ComponentPage({ params }: PageProps) {
  const { group, id } = await params;

  const sidebarGroup = SIDEBAR_GROUPS.find((g) => g.id === group);
  const item = sidebarGroup?.items.find((i) => i.id === id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">{item.labelKo}</h1>
      <p className="text-muted-foreground mt-2">{item.labelEn} — Placeholder. Stage 5 will fill this.</p>
    </div>
  );
}
