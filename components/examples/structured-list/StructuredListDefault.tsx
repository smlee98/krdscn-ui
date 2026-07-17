import { Heart, Share2 } from "lucide-react"
import { Button } from "@/registry/krds/ui/button"
import {
  StructuredList,
  StructuredListActions,
  StructuredListBadge,
  StructuredListBody,
  StructuredListDescription,
  StructuredListGroup,
  StructuredListHeader,
  StructuredListMetadata,
  StructuredListMetadataItem,
  StructuredListPeriod,
  StructuredListSubAction,
  StructuredListSubActions,
  StructuredListTag,
  StructuredListTagList,
  StructuredListTitle,
} from "@/registry/krds/ui/structured-list"

export default function StructuredListDefault() {
  return (
    <StructuredListGroup className="w-full">
      <StructuredList variant="vertical">
        <StructuredListBody>
          {/* KRDS .card-top: 배지만 배치 — 공유/찜(card-btn)은 카드 우상단 절대 배치 */}
          <StructuredListHeader>
            <StructuredListBadge>복지</StructuredListBadge>
          </StructuredListHeader>
          {/* KRDS .card-body: 본문(c-text)이 flex-1, 신청하기(c-btn)가 우측 열 */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <StructuredListTitle>아동수당 신청 안내</StructuredListTitle>
              <StructuredListDescription>
                만 8세 미만 아동에게 매월 10만원을 지급하여 양육 부담을 완화하고 아동의 권리를 보장합니다. 온라인으로
                간편하게 신청하실 수 있습니다.
              </StructuredListDescription>
              <StructuredListPeriod>2024.01.01 - 2024.12.31</StructuredListPeriod>
              <StructuredListMetadata>
                <StructuredListMetadataItem>조회수 1,234</StructuredListMetadataItem>
                <StructuredListMetadataItem>등록일 2024.01.01</StructuredListMetadataItem>
              </StructuredListMetadata>
            </div>
            <Button variant="secondary" size="default" className="shrink-0">
              신청하기
            </Button>
          </div>
          {/* KRDS .card-btm: 상단 구분선 아래 태그 나열 */}
          <StructuredListTagList>
            <StructuredListTag>#아동수당</StructuredListTag>
            <StructuredListTag>#복지</StructuredListTag>
          </StructuredListTagList>
          {/* KRDS .card-btn: 카드 우상단 절대 배치 */}
          <StructuredListActions>
            <StructuredListSubActions>
              <StructuredListSubAction icon={<Share2 size={20} />} aria-label="공유하기">
                공유하기
              </StructuredListSubAction>
              <StructuredListSubAction icon={<Heart size={20} />} aria-label="찜하기">
                찜하기
              </StructuredListSubAction>
            </StructuredListSubActions>
          </StructuredListActions>
        </StructuredListBody>
      </StructuredList>
    </StructuredListGroup>
  )
}
