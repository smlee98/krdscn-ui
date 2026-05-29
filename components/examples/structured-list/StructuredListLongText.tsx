import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/krds/(action)/button";
import {
  StructuredList,
  StructuredListActions,
  StructuredListBadge,
  StructuredListBody,
  StructuredListDescription,
  StructuredListHeader,
  StructuredListImage,
  StructuredListMetadata,
  StructuredListMetadataItem,
  StructuredListPeriod,
  StructuredListSubAction,
  StructuredListSubActions,
  StructuredListTag,
  StructuredListTagList,
  StructuredListTitle
} from "@/components/ui/dynamic/structured-list";

export default function StructuredListLongText() {
  return (
    <StructuredList variant="horizontal">
      <StructuredListImage src="/placeholder.svg" alt="청년 주거 지원 사업 안내 이미지" />
      <StructuredListBody>
        <StructuredListHeader>
          <StructuredListBadge>청년</StructuredListBadge>
          <StructuredListTitle>
            청년 월세 한시 특별지원 사업 — 무주택 청년을 위한 주거비 경감 프로그램
          </StructuredListTitle>
        </StructuredListHeader>
        <StructuredListDescription>
          만 19~34세 무주택 청년에게 12개월간 월 최대 20만원의 월세를 지원합니다. 소득·자산 요건을 충족하면 거주지 관할
          시·군·구청 또는 복지로(bokjiro.go.kr)에서 신청할 수 있습니다. 지원 대상은 부모와 별도 거주하는 청년 가구이며,
          보증금 5천만원·월세 60만원 이하 주택에 거주하는 경우 신청이 가능합니다.
        </StructuredListDescription>
        <StructuredListPeriod>2024.02.01 - 2024.12.31</StructuredListPeriod>
        <StructuredListMetadata>
          <StructuredListMetadataItem>주관 국토교통부</StructuredListMetadataItem>
          <StructuredListMetadataItem>조회수 23,540</StructuredListMetadataItem>
          <StructuredListMetadataItem>등록일 2024.01.20</StructuredListMetadataItem>
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
          <Button variant="default" size="lg">
            신청하기
          </Button>
        </StructuredListActions>
        <StructuredListTagList>
          <StructuredListTag>#청년주거</StructuredListTag>
          <StructuredListTag>#월세지원</StructuredListTag>
          <StructuredListTag>#복지로</StructuredListTag>
        </StructuredListTagList>
      </StructuredListBody>
    </StructuredList>
  );
}
