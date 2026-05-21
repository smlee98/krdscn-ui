import { Button } from "@/components/ui/krds/(action)/button";
import {
  StructuredList,
  StructuredListActions,
  StructuredListBadge,
  StructuredListBody,
  StructuredListDescription,
  StructuredListHeader,
  StructuredListImage,
  StructuredListPeriod,
  StructuredListSubActions,
  StructuredListTag,
  StructuredListTagList,
  StructuredListTitle
} from "@/components/ui/krds/(layout)/structured-list";

export default function StructuredListVariousBadges() {
  return (
    <div className="flex flex-col gap-4">
      <StructuredList variant="vertical">
        <StructuredListImage src="/placeholder.svg" alt="디지털 배움터 운영 안내 이미지" />
        <StructuredListBody>
          <StructuredListHeader>
            <StructuredListBadge>교육</StructuredListBadge>
            <StructuredListTitle>디지털 배움터 운영</StructuredListTitle>
          </StructuredListHeader>
          <StructuredListDescription>
            누구나 가까운 곳에서 디지털 역량을 배울 수 있도록 전국 1,000여 곳에서 무료 교육을 진행합니다.
          </StructuredListDescription>
          <StructuredListPeriod>2024.03.01 - 2024.11.30</StructuredListPeriod>
          <StructuredListActions>
            <StructuredListSubActions />
            <Button variant="primary" size="medium">
              자세히 보기
            </Button>
          </StructuredListActions>
          <StructuredListTagList>
            <StructuredListTag>#디지털교육</StructuredListTag>
            <StructuredListTag>#배움터</StructuredListTag>
            <StructuredListTag>#무료</StructuredListTag>
          </StructuredListTagList>
        </StructuredListBody>
      </StructuredList>
      <StructuredList variant="vertical">
        <StructuredListBody>
          <StructuredListHeader>
            <StructuredListBadge>복지</StructuredListBadge>
            <StructuredListTitle>아동수당 신청 안내</StructuredListTitle>
          </StructuredListHeader>
          <StructuredListDescription>만 8세 미만 아동에게 매월 10만원을 지급합니다.</StructuredListDescription>
          <StructuredListPeriod>2024.01.01 - 2024.12.31</StructuredListPeriod>
          <StructuredListActions>
            <StructuredListSubActions />
            <Button variant="primary" size="medium">
              신청하기
            </Button>
          </StructuredListActions>
          <StructuredListTagList>
            <StructuredListTag>#아동</StructuredListTag>
            <StructuredListTag>#수당</StructuredListTag>
          </StructuredListTagList>
        </StructuredListBody>
      </StructuredList>
    </div>
  );
}
