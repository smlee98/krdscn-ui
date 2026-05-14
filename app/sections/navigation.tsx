// rsc:client
"use client";

import { useState } from "react";

import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { SkipLink } from "@/components/ui/krds/skip-link";
import {
  MainMenu,
  MainMenuItem,
  MainMenuTrigger,
  MainMenuContent,
  MainMenuLink,
} from "@/components/ui/krds/main-menu";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/krds/breadcrumb";
import {
  SideNavigation,
  SideNavigationGroup,
  SideNavigationGroupLabel,
  SideNavigationItem,
} from "@/components/ui/krds/side-navigation";
import { InPageNavigation, InPageNavigationItem } from "@/components/ui/krds/in-page-navigation";
import {
  buildPageItems,
  Pagination,
  PaginationContent,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/krds/pagination";

export { NavigationSection };

function NavigationSection() {
  const [page, setPage] = useState(1);
  const [activeNav, setActiveNav] = useState("notices");
  const [activeSection, setActiveSection] = useState("masthead");

  const totalPages = 10;
  const pageItems = buildPageItems(page, totalPages, 1, 1);

  const inPageItems = [
    { id: "masthead", label: "공식 배너" },
    { id: "identifier", label: "운영기관 식별자" },
    { id: "header", label: "헤더" },
    { id: "footer", label: "푸터" },
    { id: "skip-link", label: "건너뛰기 링크" },
    { id: "main-menu", label: "메인 메뉴" },
    { id: "breadcrumb", label: "브레드크럼" },
  ];

  return (
    <>
      <GroupHeading>탐색</GroupHeading>

      <DemoSection id="skip-link" title="건너뛰기 링크 (Skip link)">
        <DemoCard description="키보드 사용자를 위한 본문 바로가기 링크 (포커스 시 표시됨)">
          <div className="relative w-full min-h-12 border border-dashed border-border rounded flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Tab 키를 눌러 포커스하면 링크가 표시됩니다</p>
            <SkipLink href="#main-content">본문 바로가기</SkipLink>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="main-menu" title="메인 메뉴 (Main menu)">
        <DemoCard description="수평 내비게이션 메뉴 (서브메뉴 포함)">
          <MainMenu>
            <MainMenuItem>
              <MainMenuTrigger>서비스 안내</MainMenuTrigger>
              <MainMenuContent>
                <MainMenuLink href="#">주요서비스</MainMenuLink>
                <MainMenuLink href="#">서비스 목록</MainMenuLink>
              </MainMenuContent>
            </MainMenuItem>
            <MainMenuItem>
              <MainMenuTrigger>민원 신청</MainMenuTrigger>
              <MainMenuContent>
                <MainMenuLink href="#">온라인 신청</MainMenuLink>
                <MainMenuLink href="#">신청 현황</MainMenuLink>
              </MainMenuContent>
            </MainMenuItem>
            <MainMenuItem>
              <MainMenuLink href="#">정보 공개</MainMenuLink>
            </MainMenuItem>
            <MainMenuItem>
              <MainMenuLink href="#">정책 자료</MainMenuLink>
            </MainMenuItem>
          </MainMenu>
        </DemoCard>
      </DemoSection>

      <DemoSection id="breadcrumb" title="브레드크럼 (Breadcrumb)">
        <DemoCard description="현재 페이지 위치를 나타내는 경로 탐색">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">홈</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/civil">민원 신청</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>온라인 신청</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DemoCard>
      </DemoSection>

      <DemoSection id="side-navigation" title="사이드 메뉴 (Side navigation)">
        <DemoCard description="좌측 사이드 탐색 메뉴 (접기/펼치기 지원)">
          <SideNavigation aria-label="민원 신청 메뉴">
            <SideNavigationItem
              href="#"
              active={activeNav === "notices"}
              onClick={(e) => { e.preventDefault(); setActiveNav("notices"); }}
            >
              공지사항
            </SideNavigationItem>
            <SideNavigationGroup>
              <SideNavigationGroupLabel>민원 신청</SideNavigationGroupLabel>
              <SideNavigationItem
                href="#"
                active={activeNav === "online"}
                onClick={(e) => { e.preventDefault(); setActiveNav("online"); }}
              >
                온라인 신청
              </SideNavigationItem>
              <SideNavigationItem
                href="#"
                active={activeNav === "visit"}
                onClick={(e) => { e.preventDefault(); setActiveNav("visit"); }}
              >
                방문 신청
              </SideNavigationItem>
              <SideNavigationItem
                href="#"
                active={activeNav === "mail"}
                onClick={(e) => { e.preventDefault(); setActiveNav("mail"); }}
              >
                우편 신청
              </SideNavigationItem>
            </SideNavigationGroup>
            <SideNavigationGroup>
              <SideNavigationGroupLabel>신청 현황</SideNavigationGroupLabel>
              <SideNavigationItem
                href="#"
                active={activeNav === "received"}
                onClick={(e) => { e.preventDefault(); setActiveNav("received"); }}
              >
                접수 현황
              </SideNavigationItem>
              <SideNavigationItem
                href="#"
                active={activeNav === "processed"}
                onClick={(e) => { e.preventDefault(); setActiveNav("processed"); }}
              >
                처리 현황
              </SideNavigationItem>
            </SideNavigationGroup>
            <SideNavigationItem
              href="#"
              active={activeNav === "faq"}
              onClick={(e) => { e.preventDefault(); setActiveNav("faq"); }}
            >
              자주 묻는 질문
            </SideNavigationItem>
          </SideNavigation>
        </DemoCard>
      </DemoSection>

      <DemoSection id="in-page-navigation" title="콘텐츠 내 탐색 (In-page navigation)">
        <DemoCard description="페이지 내 섹션 간 이동">
          <InPageNavigation aria-label="페이지 내 목차">
            {inPageItems.map((item) => (
              <InPageNavigationItem
                key={item.id}
                href={`#${item.id}`}
                active={activeSection === item.id}
                onClick={(e) => { e.preventDefault(); setActiveSection(item.id); }}
              >
                {item.label}
              </InPageNavigationItem>
            ))}
          </InPageNavigation>
        </DemoCard>
      </DemoSection>

      <DemoSection id="pagination" title="페이지네이션 (Pagination)">
        <DemoCard description="페이지 이동 컨트롤">
          <div className="flex flex-col gap-3">
            <Pagination>
              <PaginationContent>
                <PaginationPrev
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                />
                {pageItems.map((item, idx) =>
                  item === "dots" ? (
                    <PaginationEllipsis key={`dots-${idx}`} />
                  ) : (
                    <PaginationItem
                      key={item}
                      active={item === page}
                      aria-label={`${item}페이지`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </PaginationItem>
                  )
                )}
                <PaginationNext
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </PaginationContent>
            </Pagination>
            <p className="text-sm text-muted-foreground">현재 {page} / {totalPages} 페이지</p>
          </div>
        </DemoCard>
      </DemoSection>
    </>
  );
}
