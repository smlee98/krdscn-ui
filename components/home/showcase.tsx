"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/dynamic/badge"
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/dynamic/breadcrumb"
import { Button } from "@/components/ui/dynamic/button"
import { Checkbox } from "@/components/ui/dynamic/checkbox"
import { DateInput } from "@/components/ui/dynamic/date-input"
import {
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "@/components/ui/dynamic/modal"
import {
  buildPageItems,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/dynamic/pagination"
import { Select } from "@/components/ui/dynamic/select"
import { StepIndicator, StepIndicatorItem } from "@/components/ui/dynamic/step-indicator"
import { Tag } from "@/components/ui/dynamic/tag"
import { TextInput } from "@/components/ui/dynamic/text-input"
import { ToggleSwitch } from "@/components/ui/dynamic/toggle-switch"
import { cn } from "@/lib/cn"

const PROGRAM_OPTIONS = [
  { value: "tour", label: "견학 프로그램" },
  { value: "edu", label: "교육 프로그램" },
  { value: "event", label: "체험 행사" },
]

/** 히어로 우측 — 실제 KRDS 컴포넌트로 조립한 신청 폼 데모 */
export function ApplyFormDemo() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const emailError = submitted && !email.includes("@") ? "이메일 형식이 아닙니다" : undefined

  return (
    <div className="bg-card w-full rounded-xl border shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">프로그램 신청</span>
          <span className="text-muted-foreground text-xs">아래 컴포넌트는 실제로 동작합니다</span>
        </div>
        <Badge type="pastel" variant="info">
          접수 중
        </Badge>
      </div>
      <form
        className="flex flex-col gap-5 px-5 py-5"
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
      >
        <StepIndicator className="w-full" currentStep={2}>
          <StepIndicatorItem step={1}>약관 동의</StepIndicatorItem>
          <StepIndicatorItem step={2}>정보 입력</StepIndicatorItem>
          <StepIndicatorItem step={3}>신청 완료</StepIndicatorItem>
        </StepIndicator>
        <TextInput
          label="이메일"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          error={emailError}
          hint={emailError ? undefined : "접수 결과를 이메일로 안내합니다"}
        />
        <Select options={PROGRAM_OPTIONS} label="신청 프로그램" defaultValue="tour" />
        <DateInput label="방문 희망일" />
        <Checkbox label="개인정보 수집·이용에 동의합니다" />
        <div className="flex gap-2">
          <Button type="submit" size="sm" className="flex-1">
            신청하기
          </Button>
          <Button type="button" variant="secondary" size="sm">
            임시저장
          </Button>
        </div>
      </form>
    </div>
  )
}

function ShowcaseCell({
  title,
  href,
  className,
  children,
}: {
  title: string
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("bg-card group relative flex flex-col rounded-xl border", className)}>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground flex items-center justify-between gap-2 border-b px-4 py-2.5 font-mono text-xs transition-colors"
      >
        {title}
        <ArrowUpRightIcon className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
      <div className="flex min-h-36 flex-1 items-center [justify-content:safe_center] overflow-x-auto p-5">
        {children}
      </div>
    </div>
  )
}

function PaginationDemo() {
  const total = 5
  const [current, setCurrent] = React.useState(3)
  const items = buildPageItems(current, total, 1, 1)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrev disabled={current === 1} onClick={() => setCurrent((p) => Math.max(1, p - 1))}>
          {""}
        </PaginationPrev>
        {items.map((item, index) =>
          item === "dots" ? (
            <PaginationEllipsis key={`dots-${index}`} />
          ) : (
            <PaginationItem key={item} active={item === current} onClick={() => setCurrent(item)}>
              {item}
            </PaginationItem>
          )
        )}
        <PaginationNext disabled={current === total} onClick={() => setCurrent((p) => Math.min(total, p + 1))}>
          {""}
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  )
}

/** 홈 중단 — 카테고리별 대표 컴포넌트 라이브 데모 그리드 */
export function ShowcaseBento() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ShowcaseCell title="Button" href="/docs/components/button">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm">신청하기</Button>
          <Button size="sm" variant="secondary">
            임시저장
          </Button>
          <Button size="sm" variant="tertiary">
            취소
          </Button>
          <Button size="sm" variant="text">
            더보기
          </Button>
        </div>
      </ShowcaseCell>

      <ShowcaseCell title="Badge · Tag" href="/docs/components/badge">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge type="pastel" variant="success">
              접수 완료
            </Badge>
            <Badge type="pastel" variant="warning">
              검토 중
            </Badge>
            <Badge type="outline" variant="secondary">
              마감
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Tag>복지</Tag>
            <Tag>교육</Tag>
            <Tag>행사</Tag>
          </div>
        </div>
      </ShowcaseCell>

      <ShowcaseCell title="Checkbox · ToggleSwitch" href="/docs/components/checkbox">
        <div className="flex flex-col items-start gap-4">
          <Checkbox label="약관에 동의합니다" defaultValue />
          <ToggleSwitch label="알림 받기" />
        </div>
      </ShowcaseCell>

      <ShowcaseCell title="Pagination" href="/docs/components/pagination">
        <PaginationDemo />
      </ShowcaseCell>

      <ShowcaseCell title="Modal" href="/docs/components/modal">
        <ModalRoot>
          <ModalTrigger asChild>
            <Button size="sm" variant="secondary">
              모달 열기
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalClose />
            <ModalHeader title="신청을 취소할까요?" />
            <ModalBody>작성 중인 내용은 저장되지 않습니다.</ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="tertiary">아니요</Button>
              </ModalClose>
              <ModalClose asChild>
                <Button>예</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </ModalRoot>
      </ShowcaseCell>

      <ShowcaseCell title="Breadcrumb" href="/docs/components/breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbHome href="#" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">민원 서비스</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>신청 내역</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ShowcaseCell>
    </div>
  )
}
