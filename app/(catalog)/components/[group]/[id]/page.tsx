// rsc:server-only — full per-component documentation page (5-section anatomy).

import { notFound } from "next/navigation";

import { CodeBlock } from "@/components/krds-app/code-block";
import { ExamplePreview } from "@/components/krds-app/example-preview";
import { PropsTable } from "@/components/krds-app/props-table";
import { EXAMPLES_CONFIG, type ExampleSlug } from "@/components/examples/examples-config";
import { COMPONENT_COPY, type SidebarItemId } from "@/lib/component-copy";
import { getExampleSource } from "@/lib/get-example-source";
import { getExampleTitle } from "@/lib/example-titles";
import { getPropsData } from "@/lib/get-props-data";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-nav";

import { ExampleHost } from "./example-host";

const BASE_REPO_URL = "https://github.com/gridone/krds-shadcn";

export const dynamicParams = false;

export async function generateStaticParams() {
  return SIDEBAR_GROUPS.flatMap((group) => group.items.map((item) => ({ group: group.id, id: item.id })));
}

interface PageProps {
  params: Promise<{ group: string; id: string }>;
}

function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export default async function ComponentPage({ params }: PageProps) {
  const { group, id } = await params;

  const sidebarGroup = SIDEBAR_GROUPS.find((g) => g.id === group);
  const item = sidebarGroup?.items.find((i) => i.id === id);

  if (!item) {
    notFound();
  }

  const slug = item.id as SidebarItemId;
  const copy = COMPONENT_COPY[slug];
  const exampleNames = EXAMPLES_CONFIG[slug as ExampleSlug] as readonly string[];
  const propsKey = `Krds${toPascalCase(slug)}`;
  const propsData = getPropsData(propsKey);

  const examples = exampleNames.map((name) => ({
    name,
    title: getExampleTitle(slug, name),
    source: getExampleSource(slug, name)
  }));

  return (
    <article className="space-y-12 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{item.labelKo}</h1>
        <p className="text-muted-foreground text-base">{item.labelEn}</p>
      </header>

      <section aria-labelledby="overview-heading" className="space-y-3">
        <h2 id="overview-heading" className="sr-only">
          개요
        </h2>
        <p className="text-foreground text-base leading-relaxed">{copy.intro}</p>
        <p className="text-muted-foreground text-base leading-relaxed">{copy.usage}</p>
      </section>

      <section aria-labelledby="examples-heading" className="space-y-6">
        <h2 id="examples-heading" className="text-2xl font-semibold tracking-tight">
          예제
        </h2>
        <div className="space-y-8">
          {examples.map(({ name, title, source }) => (
            <div key={name} className="space-y-3">
              {title ? (
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              ) : null}
              <ExamplePreview>
                <ExampleHost slug={slug} name={name} />
              </ExamplePreview>
              <CodeBlock code={source} lang="tsx" />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="props-heading" className="space-y-4">
        <h2 id="props-heading" className="text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <PropsTable data={propsData} />
      </section>

      <section aria-labelledby="source-heading" className="space-y-3">
        <h2 id="source-heading" className="text-2xl font-semibold tracking-tight">
          소스 코드
        </h2>
        <p className="text-muted-foreground text-sm">
          이 컴포넌트의 원본 래퍼 소스는 GitHub 저장소에서 확인할 수 있습니다.
        </p>
        <a
          href={`${BASE_REPO_URL}/blob/master/components/ui/krds/${slug}.tsx`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
        >
          components/ui/krds/{slug}.tsx
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </article>
  );
}
