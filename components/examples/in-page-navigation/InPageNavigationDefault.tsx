import { InPageNavigation, InPageNavigationItem } from "@/components/ui/krds/in-page-navigation";

export default function InPageNavigationDefault() {
  return (
    <InPageNavigation className="border-krds-gray-20 w-56 border-l pl-2">
      <InPageNavigationItem href="#overview" active>
        개요
      </InPageNavigationItem>
      <InPageNavigationItem href="#install">설치</InPageNavigationItem>
      <InPageNavigationItem href="#usage">사용법</InPageNavigationItem>
      <InPageNavigationItem href="#props">Props</InPageNavigationItem>
      <InPageNavigationItem href="#examples">예제</InPageNavigationItem>
      <InPageNavigationItem href="#accessibility">접근성</InPageNavigationItem>
    </InPageNavigation>
  );
}
