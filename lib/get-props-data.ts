// rsc:server-only
import "server-only";
import type { PropsDoc } from "@/components/krds-app/props-table";
import propsData from "@/data/props-data.json";

export type { PropsDoc } from "@/components/krds-app/props-table";
export { getPropsData };

function getPropsData(componentName: string): PropsDoc[] | null {
  return (propsData as Record<string, PropsDoc[]>)[componentName] ?? null;
}
