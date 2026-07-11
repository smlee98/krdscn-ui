import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/dynamic/disclosure"

export default function DisclosureMultipleDisclosures() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Disclosure>
        <DisclosureTrigger>첫 번째 디스클로저</DisclosureTrigger>
        <DisclosureContent>
          <div>
            <h4>첫 번째 콘텐츠</h4>
            <p>여러 개의 디스클로저를 함께 사용할 수 있습니다.</p>
          </div>
        </DisclosureContent>
      </Disclosure>
      <Disclosure defaultOpen>
        <DisclosureTrigger>두 번째 디스클로저</DisclosureTrigger>
        <DisclosureContent>
          <div>
            <h4>두 번째 콘텐츠</h4>
            <p>이 디스클로저는 기본적으로 확장된 상태입니다.</p>
          </div>
        </DisclosureContent>
      </Disclosure>
      <Disclosure>
        <DisclosureTrigger>세 번째 디스클로저</DisclosureTrigger>
        <DisclosureContent>
          <div>
            <h4>세 번째 콘텐츠</h4>
            <p>각각 독립적으로 동작합니다.</p>
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  )
}
