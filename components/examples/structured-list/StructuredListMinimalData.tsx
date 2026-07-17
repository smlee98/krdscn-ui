import { Button } from "@/registry/krds/ui/button"
import {
  StructuredList,
  StructuredListActions,
  StructuredListBadge,
  StructuredListBody,
  StructuredListDescription,
  StructuredListGroup,
  StructuredListHeader,
  StructuredListSubActions,
  StructuredListTitle,
} from "@/registry/krds/ui/structured-list"

export default function StructuredListMinimalData() {
  return (
    <StructuredListGroup className="w-full">
      <StructuredList variant="horizontal">
        <StructuredListBody>
          <StructuredListHeader>
            <StructuredListBadge>공지</StructuredListBadge>
            <StructuredListTitle>2024년 전자정부 서비스 만족도 조사 결과 발표</StructuredListTitle>
          </StructuredListHeader>
          <StructuredListDescription>
            행정안전부는 국민이 자주 이용하는 전자정부 서비스 30종에 대한 만족도 조사 결과를 공개했습니다.
          </StructuredListDescription>
          <StructuredListActions>
            <StructuredListSubActions />
            <Button variant="default" size="default">
              결과 보기
            </Button>
          </StructuredListActions>
        </StructuredListBody>
      </StructuredList>
    </StructuredListGroup>
  )
}
