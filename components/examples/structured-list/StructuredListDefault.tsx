import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/dynamic/button";
import {
  StructuredList,
  StructuredListActions,
  StructuredListBadge,
  StructuredListBody,
  StructuredListDescription,
  StructuredListHeader,
  StructuredListMetadata,
  StructuredListMetadataItem,
  StructuredListPeriod,
  StructuredListSubAction,
  StructuredListSubActions,
  StructuredListTitle
} from "@/components/ui/dynamic/structured-list";

export default function StructuredListDefault() {
  return (
    <StructuredList className="w-full" variant="vertical">
      <StructuredListBody>
        <StructuredListHeader>
          <StructuredListBadge>복지</StructuredListBadge>
          <StructuredListTitle>아동수당 신청 안내</StructuredListTitle>
        </StructuredListHeader>
        <StructuredListDescription>
          만 8세 미만 아동에게 매월 10만원을 지급하여 양육 부담을 완화하고 아동의 권리를 보장합니다. 온라인으로 간편하게
          신청하실 수 있습니다.
        </StructuredListDescription>
        <StructuredListPeriod>2024.01.01 - 2024.12.31</StructuredListPeriod>
        <StructuredListMetadata>
          <StructuredListMetadataItem>조회수 1,234</StructuredListMetadataItem>
          <StructuredListMetadataItem>등록일 2024.01.01</StructuredListMetadataItem>
        </StructuredListMetadata>
        <StructuredListActions>
          <StructuredListSubActions>
            <StructuredListSubAction icon={<Share2 size={20} />} aria-label="공유하기">
              공유하기
            </StructuredListSubAction>
            <StructuredListSubAction icon={<Heart size={20} />} aria-label="찜하기">
              찜하기
            </StructuredListSubAction>
          </StructuredListSubActions>
          <Button variant="default" size="default">
            신청하기
          </Button>
        </StructuredListActions>
      </StructuredListBody>
    </StructuredList>
  );
}
