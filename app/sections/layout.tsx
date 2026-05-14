// rsc:client
"use client";

import { useState } from "react";
import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";

import { StructuredList, StructuredListItem } from "@/components/ui/krds/structured-list";
import { CriticalAlert, CriticalAlertTitle, CriticalAlertDescription } from "@/components/ui/krds/critical-alert";
import { Calendar } from "@/components/ui/krds/calendar";
import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/krds/disclosure";
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose
} from "@/components/ui/krds/modal";
import { Badge } from "@/components/ui/krds/badge";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/krds/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/krds/carousel";
import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds/tab";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from "@/components/ui/krds/table";
import { TextList, TextListItem } from "@/components/ui/krds/text-list";
import { Button } from "@/components/ui/krds/button";

export function LayoutSection() {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <GroupHeading>레이아웃 및 표현</GroupHeading>

      <DemoSection id="structured-list" title="구조화 목록 / Structured List">
        <DemoCard>
          <div className="w-full">
            <StructuredList>
              <StructuredListItem label="이름" value="홍길동" />
              <StructuredListItem label="생년월일" value="1990.01.01" />
              <StructuredListItem label="주소" value="서울시 종로구 세종대로 209" />
            </StructuredList>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="critical-alert" title="긴급 공지 / Critical Alerts">
        <DemoCard>
          <div className="w-full">
            <CriticalAlert>
              <CriticalAlertTitle>긴급 공지</CriticalAlertTitle>
              <CriticalAlertDescription>
                시스템 점검으로 인해 2026년 5월 14일 오전 2시부터 4시까지 서비스가 일시 중단됩니다.
              </CriticalAlertDescription>
            </CriticalAlert>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="calendar" title="달력 / Calendar">
        <DemoCard>
          <div className="flex flex-col gap-3">
            <Calendar value={selectedDate} onChange={setSelectedDate} />
            <p className="text-sm text-krds-gray-70">
              선택된 날짜:{" "}
              <span className="font-medium">{selectedDate || "없음"}</span>
            </p>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="disclosure" title="디스클로저 / Disclosure">
        <DemoCard>
          <div className="w-full">
            <Disclosure>
              <DisclosureTrigger>더 보기</DisclosureTrigger>
              <DisclosureContent>
                <p className="text-sm">
                  디스클로저 컴포넌트는 추가 콘텐츠를 토글 방식으로 표시하거나 숨길 수 있습니다.
                  접기/펼치기 기능을 통해 사용자에게 필요한 정보를 선택적으로 제공합니다.
                </p>
              </DisclosureContent>
            </Disclosure>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="modal" title="모달 / Modal">
        <DemoCard>
          <ModalRoot open={modalOpen} onOpenChange={setModalOpen}>
            <ModalTrigger asChild>
              <Button>모달 열기</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalClose />
              <ModalHeader title="모달 제목" />
              <ModalBody>
                모달 내용입니다. 사용자에게 중요한 정보를 전달하거나 추가 작업을 요청할 때 사용합니다.
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="tertiary">닫기</Button>
                </ModalClose>
                <Button onClick={() => setModalOpen(false)}>확인</Button>
              </ModalFooter>
            </ModalContent>
          </ModalRoot>
        </DemoCard>
      </DemoSection>

      <DemoSection id="badge" title="배지 / Badge">
        <DemoCard title="배지 종류">
          <Badge variant="basic">기본</Badge>
          <Badge variant="primary">주요</Badge>
          <Badge variant="secondary">보조</Badge>
          <Badge variant="success">성공</Badge>
          <Badge variant="warning">경고</Badge>
          <Badge variant="danger">위험</Badge>
          <Badge variant="information">정보</Badge>
          <Badge variant="point">포인트</Badge>
          <Badge variant="gray">회색</Badge>
          <Badge variant="disabled">비활성</Badge>
        </DemoCard>
        <DemoCard title="배지 크기">
          <Badge size="small">소</Badge>
          <Badge size="medium">중</Badge>
          <Badge size="large">대</Badge>
        </DemoCard>
        <DemoCard title="라운드 배지">
          <Badge rounded variant="primary">주요</Badge>
          <Badge rounded variant="success">성공</Badge>
          <Badge rounded variant="danger">위험</Badge>
        </DemoCard>
      </DemoSection>

      <DemoSection id="accordion" title="아코디언 / Accordion">
        <DemoCard>
          <div className="w-full">
            <Accordion>
              <AccordionItem value="item-1">
                <AccordionHeader>공지사항 안내</AccordionHeader>
                <AccordionPanel>
                  공지사항 관련 세부 내용을 여기에 입력합니다. 다양한 정보를 제공할 수 있습니다.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionHeader>자주 묻는 질문</AccordionHeader>
                <AccordionPanel>
                  자주 묻는 질문에 대한 답변을 여기에 제공합니다. 사용자 친화적인 정보를 담습니다.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionHeader>이용 약관</AccordionHeader>
                <AccordionPanel>
                  이용 약관의 주요 내용을 여기에 기재합니다. 서비스 이용에 관한 규정입니다.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="carousel" title="캐러셀 / Carousel">
        <DemoCard>
          <div className="w-full max-w-md mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="flex aspect-[16/9] items-center justify-center rounded-md border border-krds-gray-20 bg-krds-gray-5 text-krds-gray-90">
                    <span className="text-2xl font-semibold">슬라이드 1</span>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex aspect-[16/9] items-center justify-center rounded-md border border-krds-gray-20 bg-krds-gray-5 text-krds-gray-90">
                    <span className="text-2xl font-semibold">슬라이드 2</span>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex aspect-[16/9] items-center justify-center rounded-md border border-krds-gray-20 bg-krds-gray-5 text-krds-gray-90">
                    <span className="text-2xl font-semibold">슬라이드 3</span>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="tab" title="탭 / Tab">
        <DemoCard>
          <div className="w-full">
            <Tab defaultValue="tab1">
              <TabList>
                <TabTrigger value="tab1">개요</TabTrigger>
                <TabTrigger value="tab2">상세 정보</TabTrigger>
                <TabTrigger value="tab3">관련 문서</TabTrigger>
              </TabList>
              <TabContent>
                <TabPanel value="tab1">
                  개요 탭의 내용입니다. 컴포넌트에 대한 간략한 설명을 제공합니다.
                </TabPanel>
                <TabPanel value="tab2">
                  상세 정보 탭의 내용입니다. 속성과 사용 방법을 상세히 설명합니다.
                </TabPanel>
                <TabPanel value="tab3">
                  관련 문서 탭의 내용입니다. 참고 자료 및 관련 링크를 제공합니다.
                </TabPanel>
              </TabContent>
            </Tab>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="table" title="표 / Table">
        <DemoCard>
          <div className="w-full">
            <Table>
              <TableCaption>2026년 1분기 지역별 현황</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>지역</TableHead>
                  <TableHead>인구(만명)</TableHead>
                  <TableHead>면적(km²)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>서울</TableCell>
                  <TableCell>956</TableCell>
                  <TableCell>605</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>부산</TableCell>
                  <TableCell>340</TableCell>
                  <TableCell>770</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>인천</TableCell>
                  <TableCell>300</TableCell>
                  <TableCell>1,063</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="text-list" title="텍스트 목록 / Text List">
        <DemoCard title="점선 목록 (dash)">
          <TextList type="dash">
            <TextListItem>첫 번째 항목입니다.</TextListItem>
            <TextListItem>두 번째 항목입니다.</TextListItem>
            <TextListItem>세 번째 항목입니다.</TextListItem>
            <TextListItem>네 번째 항목입니다.</TextListItem>
            <TextListItem>다섯 번째 항목입니다.</TextListItem>
          </TextList>
        </DemoCard>
        <DemoCard title="번호 목록 (decimal)">
          <TextList type="decimal">
            <TextListItem>첫 번째 단계를 수행합니다.</TextListItem>
            <TextListItem>두 번째 단계를 수행합니다.</TextListItem>
            <TextListItem>세 번째 단계를 수행합니다.</TextListItem>
            <TextListItem>네 번째 단계를 수행합니다.</TextListItem>
            <TextListItem>다섯 번째 단계를 수행합니다.</TextListItem>
          </TextList>
        </DemoCard>
      </DemoSection>
    </>
  );
}
