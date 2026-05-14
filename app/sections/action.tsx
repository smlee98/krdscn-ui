// rsc:client
"use client";

import { ExternalLink as ExternalLinkIcon, Download, Bell, ChevronRight } from "lucide-react";
import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { Button, buttonVariants } from "@/components/ui/krds/button";
import { Link } from "@/components/ui/krds/link";

export function ActionSection() {
  return (
    <>
      <GroupHeading>액션</GroupHeading>

      <DemoSection id="link" title="링크 / Link">
        <DemoCard title="기본 링크">
          <Link href="#">기본 링크 (default)</Link>
          <Link href="#" variant="basic">기본 텍스트 링크 (basic)</Link>
        </DemoCard>
        <DemoCard title="외부 링크">
          <Link
            href="https://example.com"
            external
            icon={<ExternalLinkIcon className="size-3.5" />}
          >
            외부 링크
          </Link>
        </DemoCard>
        <DemoCard title="링크 크기">
          <Link href="#" size="xsmall">아주 작은 (xs)</Link>
          <Link href="#" size="small">작은 (sm)</Link>
          <Link href="#" size="medium">보통 (md)</Link>
          <Link href="#" size="large">큰 (lg)</Link>
          <Link href="#" size="xlarge">아주 큰 (xl)</Link>
        </DemoCard>
        <DemoCard title="밑줄 옵션">
          <Link href="#" underline="always">항상 밑줄</Link>
          <Link href="#" underline="hover">호버시 밑줄</Link>
          <Link href="#" underline="none">밑줄 없음</Link>
        </DemoCard>
        <DemoCard title="비활성화">
          <Link disabled>비활성화 링크</Link>
        </DemoCard>
      </DemoSection>

      <DemoSection id="button" title="버튼 / Button">
        <DemoCard title="버튼 유형">
          <Button variant="primary">주요 (Primary)</Button>
          <Button variant="secondary">보조 (Secondary)</Button>
          <Button variant="tertiary">3차 (Tertiary)</Button>
          <Button variant="text">텍스트/고스트 (Ghost)</Button>
        </DemoCard>
        <DemoCard title="버튼 크기">
          <Button size="xlarge">아주 큰 (XL)</Button>
          <Button size="large">큰 (LG)</Button>
          <Button size="medium">보통 (MD)</Button>
          <Button size="small">작은 (SM)</Button>
          <Button size="xsmall">아주 작은 (XS)</Button>
        </DemoCard>
        <DemoCard title="아이콘 버튼">
          <Button variant="primary">
            <Download className="size-4" />
            다운로드
          </Button>
          <Button variant="secondary">
            <Bell className="size-4" />
            알림
          </Button>
          <Button variant="icon" size="medium" aria-label="다음">
            <ChevronRight className="size-4" />
          </Button>
        </DemoCard>
        <DemoCard title="buttonVariants (className API)">
          <a
            href="#"
            className={buttonVariants({ variant: "primary", size: "small" })}
          >
            앵커 버튼
          </a>
          <a
            href="#"
            className={buttonVariants({ variant: "secondary", size: "small" })}
          >
            보조 앵커
          </a>
        </DemoCard>
        <DemoCard title="비활성화">
          <Button disabled variant="primary">주요 비활성</Button>
          <Button disabled variant="secondary">보조 비활성</Button>
          <Button disabled variant="tertiary">3차 비활성</Button>
          <Button disabled variant="text">텍스트 비활성</Button>
        </DemoCard>
      </DemoSection>
    </>
  );
}
