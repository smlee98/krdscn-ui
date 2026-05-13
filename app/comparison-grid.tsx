"use client";

// Side-by-side renderer for KRDS wrapper verification.
// Each KRDS root carries data-krds-token="<expected-var>" for getComputedStyle assertions.
// Components are added here progressively as phases complete.

import * as React from "react";

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "@/components/ui/krds/accordion";
import { AlertModal } from "@/components/ui/krds/alert-modal";
import { Badge } from "@/components/ui/krds/badge";
import { Breadcrumb } from "@/components/ui/krds/breadcrumb";
import { Button } from "@/components/ui/krds/button";
import { Calendar } from "@/components/ui/krds/calendar";
import { Checkbox, CheckboxChip, CheckboxGroup } from "@/components/ui/krds/checkbox";
import { DateInput } from "@/components/ui/krds/date-input";
import { Disclosure } from "@/components/ui/krds/disclosure";
import { FileUpload } from "@/components/ui/krds/file-upload";
import { Link } from "@/components/ui/krds/link";
import {
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  ModalTrigger
} from "@/components/ui/krds/modal";
import { Pagination } from "@/components/ui/krds/pagination";
import { Radio, RadioChip, RadioGroup } from "@/components/ui/krds/radio-group";
import { Select } from "@/components/ui/krds/select";
import { Spinner } from "@/components/ui/krds/spinner";
import { StepIndicator } from "@/components/ui/krds/step-indicator";
import { Tab, TabContent, TabList, TabPanel, TabTrigger } from "@/components/ui/krds/tab";
import { Tag } from "@/components/ui/krds/tag";
import { TextInput } from "@/components/ui/krds/text-input";
import { TextList, TextListItem } from "@/components/ui/krds/text-list";
import { Textarea } from "@/components/ui/krds/textarea";
import { ToggleSwitch } from "@/components/ui/krds/toggle-switch";
import { Tooltip } from "@/components/ui/krds/tooltip";

export { ComparisonGrid };

function Section({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontSize: "1.1rem",
        fontWeight: 600,
        margin: "2rem 0 0.5rem",
        paddingBottom: "0.25rem",
        borderBottom: "1px solid #e0e0e0"
      }}
    >
      {title}
    </h2>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", marginBottom: "1rem" }}>
      <div style={{ minWidth: 160, fontSize: "0.85rem", color: "#555", paddingTop: 4 }}>{label}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function ComparisonGrid() {
  return (
    <>
      <div data-krds-comparison-grid="">
        <Section title="Phase 0 — Infrastructure" />
        <Row label="Layout passthrough (provider removed)">
          <div
            data-krds=""
            data-krds-token="--krds-color-light-primary-50"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--krds-color-light-primary-5, #ecf2fe)",
              border: "1px solid var(--krds-color-light-primary-20, #b1cefb)",
              borderRadius: 4
            }}
          >
            Token scope active — background uses <code>--krds-color-light-primary-5</code>
          </div>
        </Row>

        {/* Phase 1 — Button */}
        <Section title="Phase 1 — Button" />
        <Row label="primary (all sizes)">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="primary" size="xsmall">
              XSmall
            </Button>
            <Button variant="primary" size="small">
              Small
            </Button>
            <Button variant="primary" size="medium">
              Medium
            </Button>
            <Button variant="primary" size="large">
              Large
            </Button>
            <Button variant="primary" size="xlarge">
              XLarge
            </Button>
          </div>
        </Row>
        <Row label="secondary">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="secondary" size="small">
              Small
            </Button>
            <Button variant="secondary" size="medium">
              Medium
            </Button>
            <Button variant="secondary" size="large">
              Large
            </Button>
          </div>
        </Row>
        <Row label="tertiary">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="tertiary" size="small">
              Small
            </Button>
            <Button variant="tertiary" size="medium">
              Medium
            </Button>
            <Button variant="tertiary" size="large">
              Large
            </Button>
          </div>
        </Row>
        <Row label="text">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="text" size="small">
              Small
            </Button>
            <Button variant="text" size="medium">
              Medium
            </Button>
            <Button variant="text" size="large">
              Large
            </Button>
          </div>
        </Row>
        <Row label="link">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="link" size="small">
              Small
            </Button>
            <Button variant="link" size="medium">
              Medium
            </Button>
            <Button variant="link" size="large">
              Large
            </Button>
          </div>
        </Row>
        <Row label="icon">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="icon" size="xsmall" aria-label="icon xsmall">
              ★
            </Button>
            <Button variant="icon" size="small" aria-label="icon small">
              ★
            </Button>
            <Button variant="icon" size="medium" aria-label="icon medium">
              ★
            </Button>
            <Button variant="icon" size="large" aria-label="icon large">
              ★
            </Button>
            <Button variant="icon" size="xlarge" aria-label="icon xlarge">
              ★
            </Button>
          </div>
        </Row>
        <Row label="disabled states">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="primary" size="medium" disabled>
              Primary
            </Button>
            <Button variant="secondary" size="medium" disabled>
              Secondary
            </Button>
            <Button variant="tertiary" size="medium" disabled>
              Tertiary
            </Button>
            <Button variant="text" size="medium" disabled>
              Text
            </Button>
            <Button variant="link" size="medium" disabled>
              Link
            </Button>
          </div>
        </Row>
        <Row label="as anchor (href)">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button variant="primary" size="medium" href="#">
              Primary Link
            </Button>
            <Button variant="link" size="medium" href="#">
              Link variant
            </Button>
          </div>
        </Row>

        <Section title="Phase 1 — TextInput" />
        <Row label="default (medium)">
          <TextInput placeholder="Enter text..." size="medium" />
        </Row>
        <Row label="small">
          <TextInput placeholder="Small input" size="small" />
        </Row>
        <Row label="large">
          <TextInput placeholder="Large input" size="large" />
        </Row>
        <Row label="with label + hint">
          <TextInput label="이름" hint="성과 이름을 입력해 주세요." placeholder="홍길동" size="medium" />
        </Row>
        <Row label="error state">
          <TextInput
            label="이메일"
            error="유효한 이메일 주소를 입력해 주세요."
            placeholder="user@example.com"
            size="medium"
          />
        </Row>
        <Row label="success state">
          <TextInput label="아이디" success="사용 가능한 아이디입니다." placeholder="my_id" size="medium" />
        </Row>
        <Row label="information state">
          <TextInput
            label="비밀번호"
            information="영문, 숫자, 특수문자를 조합해 주세요."
            placeholder="••••••••"
            type="password"
            size="medium"
          />
        </Row>
        <Row label="disabled">
          <TextInput placeholder="Disabled input" size="medium" disabled />
        </Row>

        <Section title="Phase 1 — Textarea" />
        <Row label="default">
          <Textarea placeholder="내용을 입력하세요..." />
        </Row>
        <Row label="with label">
          <Textarea label="메모" placeholder="메모를 입력하세요..." />
        </Row>
        <Row label="with char count">
          <Textarea
            label="설명"
            placeholder="설명을 입력하세요..."
            showCount
            countTotal={200}
            value=""
            onChange={() => {}}
          />
        </Row>
        <Row label="disabled">
          <Textarea placeholder="Disabled textarea" disabled />
        </Row>
        <Section title="Phase 1 — Badge" />
        <Row label="variants (medium)">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Badge variant="basic">basic</Badge>
            <Badge variant="primary">primary</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="danger">danger</Badge>
            <Badge variant="information">information</Badge>
            <Badge variant="point">point</Badge>
            <Badge variant="gray">gray</Badge>
            <Badge variant="disabled">disabled</Badge>
          </div>
        </Row>
        <Row label="sizes (primary)">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Badge variant="primary" size="small">
              small
            </Badge>
            <Badge variant="primary" size="medium">
              medium
            </Badge>
            <Badge variant="primary" size="large">
              large
            </Badge>
          </div>
        </Row>
        <Row label="rounded">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Badge variant="primary" rounded>
              primary
            </Badge>
            <Badge variant="success" rounded>
              success
            </Badge>
            <Badge variant="danger" rounded>
              danger
            </Badge>
          </div>
        </Row>

        <Section title="Phase 1 — Tag" />
        <Row label="deletable (all sizes)">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Tag size="small" onDelete={() => {}}>
              small
            </Tag>
            <Tag size="medium" onDelete={() => {}}>
              medium
            </Tag>
            <Tag size="large" onDelete={() => {}}>
              large
            </Tag>
          </div>
        </Row>
        <Row label="no close button">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Tag size="small">small</Tag>
            <Tag size="medium">medium</Tag>
            <Tag size="large">large</Tag>
          </div>
        </Row>
        <Row label="delete disabled">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Tag size="medium" onDelete={() => {}} deleteDisabled>
              disabled close
            </Tag>
          </div>
        </Row>
        <Row label="link variant">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Tag variant="link" href="#" size="small">
              small link
            </Tag>
            <Tag variant="link" href="#" size="medium">
              medium link
            </Tag>
            <Tag variant="link" href="#" size="large">
              large link
            </Tag>
          </div>
        </Row>

        <Section title="Phase 2 — Checkbox / CheckboxGroup / CheckboxChip" />
        <Row label="sizes (medium / large)">
          <CheckboxGroup column={false}>
            <Checkbox size="medium" label="Medium" defaultValue={false} />
            <Checkbox size="large" label="Large" defaultValue={false} />
          </CheckboxGroup>
        </Row>
        <Row label="with description">
          <CheckboxGroup>
            <Checkbox size="medium" label="옵션 A" description="추가 설명 텍스트입니다." defaultValue={true} />
            <Checkbox size="large" label="옵션 B" description="Large 크기의 추가 설명." defaultValue={false} />
          </CheckboxGroup>
        </Row>
        <Row label="disabled">
          <CheckboxGroup column={false}>
            <Checkbox size="medium" label="비활성 (선택됨)" defaultValue={true} disabled />
            <Checkbox size="medium" label="비활성 (미선택)" defaultValue={false} disabled />
          </CheckboxGroup>
        </Row>
        <Row label="CheckboxChip (all sizes)">
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <CheckboxChip size="small" defaultValue={false}>
              Small
            </CheckboxChip>
            <CheckboxChip size="medium" defaultValue={true}>
              Medium
            </CheckboxChip>
            <CheckboxChip size="large" defaultValue={false}>
              Large
            </CheckboxChip>
          </div>
        </Row>
        <Row label="CheckboxChip disabled">
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <CheckboxChip size="medium" defaultValue={true} disabled>
              비활성 선택됨
            </CheckboxChip>
            <CheckboxChip size="medium" defaultValue={false} disabled>
              비활성
            </CheckboxChip>
          </div>
        </Row>

        <Section title="Phase 2 — Radio / RadioGroup / RadioChip" />
        <Row label="RadioGroup (column)">
          <RadioGroup name="demo-col" defaultValue="a">
            <Radio value="a" size="medium">
              옵션 A
            </Radio>
            <Radio value="b" size="medium">
              옵션 B
            </Radio>
            <Radio value="c" size="medium" description="추가 설명 텍스트">
              옵션 C
            </Radio>
          </RadioGroup>
        </Row>
        <Row label="RadioGroup (row)">
          <RadioGroup name="demo-row" defaultValue="x" column={false}>
            <Radio value="x" size="medium">
              X
            </Radio>
            <Radio value="y" size="medium">
              Y
            </Radio>
            <Radio value="z" size="medium">
              Z
            </Radio>
          </RadioGroup>
        </Row>
        <Row label="size: large">
          <RadioGroup name="demo-large" defaultValue="1">
            <Radio value="1" size="large">
              Large 옵션 1
            </Radio>
            <Radio value="2" size="large">
              Large 옵션 2
            </Radio>
          </RadioGroup>
        </Row>
        <Row label="disabled">
          <RadioGroup name="demo-disabled" defaultValue="a">
            <Radio value="a" size="medium" disabled>
              비활성 (선택됨)
            </Radio>
            <Radio value="b" size="medium" disabled>
              비활성 (미선택)
            </Radio>
          </RadioGroup>
        </Row>
        <Row label="RadioChip (all sizes)">
          <RadioGroup name="demo-chip" defaultValue="sm" column={false}>
            <RadioChip value="sm" size="small">
              Small
            </RadioChip>
            <RadioChip value="md" size="medium">
              Medium
            </RadioChip>
            <RadioChip value="lg" size="large">
              Large
            </RadioChip>
          </RadioGroup>
        </Row>
        <Row label="RadioChip disabled">
          <RadioGroup name="demo-chip-dis" defaultValue="a" column={false}>
            <RadioChip value="a" size="medium" disabled>
              비활성 선택됨
            </RadioChip>
            <RadioChip value="b" size="medium" disabled>
              비활성
            </RadioChip>
          </RadioGroup>
        </Row>

        <Section title="Phase 2 — ToggleSwitch" />
        <Row label="sizes">
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <ToggleSwitch size="medium" label="medium" />
            <ToggleSwitch size="large" label="large" />
          </div>
        </Row>
        <Row label="checked">
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <ToggleSwitch size="medium" defaultChecked label="medium checked" />
            <ToggleSwitch size="large" defaultChecked label="large checked" />
          </div>
        </Row>
        <Row label="disabled">
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <ToggleSwitch size="medium" disabled label="disabled off" />
            <ToggleSwitch size="medium" disabled defaultChecked label="disabled on" />
          </div>
        </Row>

        <Section title="Phase 2 — Select" />
        <Row label="sizes">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 320 }}>
            <Select
              size="small"
              options={[
                { value: "a", label: "옵션 A" },
                { value: "b", label: "옵션 B" }
              ]}
              placeholder="small 선택"
            />
            <Select
              size="medium"
              options={[
                { value: "a", label: "옵션 A" },
                { value: "b", label: "옵션 B" }
              ]}
              placeholder="medium 선택"
            />
            <Select
              size="large"
              options={[
                { value: "a", label: "옵션 A" },
                { value: "b", label: "옵션 B" }
              ]}
              placeholder="large 선택"
            />
          </div>
        </Row>
        <Row label="with label + hint">
          <div style={{ maxWidth: 320 }}>
            <Select
              label="분류"
              hint="해당하는 항목을 선택해 주세요."
              options={[
                { value: "1", label: "항목 1" },
                { value: "2", label: "항목 2" }
              ]}
            />
          </div>
        </Row>
        <Row label="error state">
          <div style={{ maxWidth: 320 }}>
            <Select label="분류" error="항목을 선택해 주세요." options={[{ value: "1", label: "항목 1" }]} />
          </div>
        </Row>
        <Row label="disabled">
          <div style={{ maxWidth: 320 }}>
            <Select disabled options={[{ value: "1", label: "항목 1" }]} defaultValue="1" />
          </div>
        </Row>

        <Section title="Phase 3 — Modal (8 sub-parts)" />
        <Row label="default (md)">
          <ModalRoot size="md">
            <ModalTrigger asChild>
              <button type="button" style={{ padding: "0.4rem 0.8rem", border: "1px solid #ccc", borderRadius: 4 }}>
                Open Modal (md)
              </button>
            </ModalTrigger>
            <ModalOverlay />
            <ModalContent>
              <ModalClose />
              <ModalHeader title="모달 제목" />
              <ModalBody>
                <p>모달 본문 내용입니다. 필요한 정보를 이 영역에 입력하세요.</p>
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <button type="button" style={{ padding: "0.4rem 1rem", border: "1px solid #ccc", borderRadius: 4 }}>
                    취소
                  </button>
                </ModalClose>
                <button
                  type="button"
                  style={{
                    padding: "0.4rem 1rem",
                    background: "var(--krds-button--color-primary-fill)",
                    color: "var(--krds-button--color-primary-text)",
                    border: "none",
                    borderRadius: 4
                  }}
                >
                  확인
                </button>
              </ModalFooter>
            </ModalContent>
          </ModalRoot>
        </Row>
        <Row label="small size">
          <ModalRoot size="sm">
            <ModalTrigger asChild>
              <button type="button" style={{ padding: "0.4rem 0.8rem", border: "1px solid #ccc", borderRadius: 4 }}>
                Open Modal (sm)
              </button>
            </ModalTrigger>
            <ModalOverlay />
            <ModalContent>
              <ModalClose />
              <ModalHeader title="소형 모달" />
              <ModalBody>
                <p>소형 모달 내용입니다.</p>
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <button type="button" style={{ padding: "0.4rem 1rem", border: "1px solid #ccc", borderRadius: 4 }}>
                    닫기
                  </button>
                </ModalClose>
              </ModalFooter>
            </ModalContent>
          </ModalRoot>
        </Row>
        <Row label="bottom-sheet">
          <ModalRoot variant="bottom-sheet">
            <ModalTrigger asChild>
              <button type="button" style={{ padding: "0.4rem 0.8rem", border: "1px solid #ccc", borderRadius: 4 }}>
                Open Bottom Sheet
              </button>
            </ModalTrigger>
            <ModalOverlay />
            <ModalContent>
              <ModalClose />
              <ModalHeader title="바텀 시트" />
              <ModalBody>
                <p>바텀 시트 내용입니다.</p>
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <button type="button" style={{ padding: "0.4rem 1rem", border: "1px solid #ccc", borderRadius: 4 }}>
                    닫기
                  </button>
                </ModalClose>
              </ModalFooter>
            </ModalContent>
          </ModalRoot>
        </Row>

        <Section title="Phase 3 — AlertModal" />
        <Row label="confirm dialog">
          <AlertModal
            title="삭제 확인"
            description="이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
            confirmLabel="삭제"
            cancelLabel="취소"
            trigger={
              <button type="button" style={{ padding: "0.4rem 0.8rem", border: "1px solid #ccc", borderRadius: 4 }}>
                Open AlertModal
              </button>
            }
          />
        </Row>

        <Section title="Phase 4 — Breadcrumb" />
        <Row label="3 items">
          <Breadcrumb
            items={[
              { text: "홈", href: "#" },
              { text: "서비스", href: "#" },
              { text: "현재 페이지", href: "#" }
            ]}
          />
        </Row>
        <Row label="with disabled">
          <Breadcrumb
            items={[
              { text: "홈", href: "#" },
              { text: "비활성", href: "#", disabled: true },
              { text: "현재", href: "#" }
            ]}
          />
        </Row>

        <Section title="Phase 4 — Pagination" />
        <Row label="10 pages">
          <Pagination totalPages={10} defaultPage={5} />
        </Row>
        <Row label="3 pages">
          <Pagination totalPages={3} defaultPage={1} />
        </Row>
        <Row label="disabled">
          <Pagination totalPages={10} defaultPage={3} disabled />
        </Row>

        <Section title="Phase 4 — Tooltip" />
        <Row label="horizontal (right)">
          <Tooltip text="오른쪽 툴팁입니다." variant="horizontal">
            <button type="button" style={{ padding: "0.4rem 0.8rem", border: "1px solid #ccc", borderRadius: 4 }}>
              hover me
            </button>
          </Tooltip>
        </Row>
        <Row label="vertical (top)">
          <Tooltip text="위쪽 툴팁입니다." variant="vertical">
            <button type="button" style={{ padding: "0.4rem 0.8rem", border: "1px solid #ccc", borderRadius: 4 }}>
              hover me
            </button>
          </Tooltip>
        </Row>
        <Row label="box (top)">
          <Tooltip text="박스형 툴팁입니다. 더 넓은 내용을 담을 수 있습니다." variant="box">
            <button type="button" style={{ padding: "0.4rem 0.8rem", border: "1px solid #ccc", borderRadius: 4 }}>
              hover me
            </button>
          </Tooltip>
        </Row>

        <Section title="Phase 4 — Spinner" />
        <Row label="default">
          <Spinner />
        </Row>
        <Row label="with label">
          <Spinner label="데이터를 불러오는 중..." />
        </Row>

        <Section title="Phase 4 — StepIndicator" />
        <Row label="3 steps (step 2 active)">
          <StepIndicator
            steps={[
              { step: "1", title: "기본 정보" },
              { step: "2", title: "상세 설정" },
              { step: "3", title: "완료" }
            ]}
            currentStep={1}
          />
        </Row>
        <Row label="all done">
          <StepIndicator
            steps={[
              { step: "1", title: "기본 정보" },
              { step: "2", title: "상세 설정" },
              { step: "3", title: "완료" }
            ]}
            currentStep={3}
          />
        </Row>
        <Row label="5 steps with above-labels (Storybook reference)">
          <StepIndicator
            currentStep={3}
            steps={[
              { step: "1", title: "단계 레이블", aboveLabel: "1단계" },
              { step: "2", title: "단계 레이블", aboveLabel: "2단계" },
              { step: "3", title: "단계 레이블", aboveLabel: "3단계" },
              { step: "4", title: "단계 레이블", aboveLabel: "4단계" },
              { step: "5", title: "단계 레이블", aboveLabel: "5단계" }
            ]}
          />
        </Row>

        <Section title="Phase 4 — Link" />
        <Row label="default (always underline)">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="#">기본 링크</Link>
            <Link href="#" size="small">
              small
            </Link>
            <Link href="#" size="large">
              large
            </Link>
          </div>
        </Row>
        <Row label="basic variant">
          <Link href="#" variant="basic">
            기본 색상 링크
          </Link>
        </Row>
        <Row label="external">
          <Link href="https://example.com" external>
            외부 링크
          </Link>
        </Row>
        <Row label="hover underline">
          <Link href="#" underline="hover">
            호버 시 밑줄
          </Link>
        </Row>
        <Row label="disabled">
          <Link disabled>비활성 링크</Link>
        </Row>

        <Section title="Phase 4 — TextList" />
        <Row label="dash (default)">
          <TextList type="dash">
            <TextListItem>첫 번째 항목</TextListItem>
            <TextListItem>두 번째 항목</TextListItem>
            <TextListItem>세 번째 항목</TextListItem>
          </TextList>
        </Row>
        <Row label="decimal">
          <TextList type="decimal">
            <TextListItem>순서가 있는 첫 번째</TextListItem>
            <TextListItem>순서가 있는 두 번째</TextListItem>
          </TextList>
        </Row>
        <Row label="hollow">
          <TextList type="hollow">
            <TextListItem>속이 빈 원형 첫 번째</TextListItem>
            <TextListItem>속이 빈 원형 두 번째</TextListItem>
          </TextList>
        </Row>
        <Row label="nested (Storybook reference)">
          <TextList type="dash">
            <TextListItem>• 텍스트 목록 레벨1</TextListItem>
            <TextListItem>
              • 텍스트 목록 레벨1
              <div className="pl-6">
                <TextList type="dash">
                  <TextListItem>– 텍스트 목록 레벨2</TextListItem>
                  <TextListItem>
                    – 텍스트 목록 레벨2
                    <div className="pl-6">
                      <TextList type="hollow">
                        <TextListItem>◦ 텍스트 목록 레벨3</TextListItem>
                        <TextListItem>◦ 텍스트 목록 레벨3</TextListItem>
                      </TextList>
                    </div>
                  </TextListItem>
                  <TextListItem>– 텍스트 목록 레벨2</TextListItem>
                </TextList>
              </div>
            </TextListItem>
            <TextListItem>• 텍스트 목록 레벨1</TextListItem>
          </TextList>
        </Row>

        <Section title="Phase 2 — DateInput" />
        <Row label="default (medium)">
          <div style={{ maxWidth: 320 }}>
            <DateInput label="날짜 선택" placeholder="YYYY.MM.DD" size="medium" />
          </div>
        </Row>
        <Row label="small / large">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 320 }}>
            <DateInput placeholder="small" size="small" />
            <DateInput placeholder="large" size="large" />
          </div>
        </Row>
        <Row label="error state">
          <div style={{ maxWidth: 320 }}>
            <DateInput label="날짜" error="날짜를 선택해 주세요." size="medium" />
          </div>
        </Row>

        <Section title="Phase 2 — FileUpload" />
        <Row label="empty">
          <FileUpload
            title="파일 첨부"
            description="최대 5개까지 업로드 가능합니다."
            maxFiles={5}
            maxFileSize={10 * 1024 * 1024}
          />
        </Row>
        <Row label="with files">
          <FileUpload
            files={[
              { id: "1", name: "document.pdf", size: 204800, type: "application/pdf", status: "completed" },
              { id: "2", name: "image.png", size: 512000, type: "image/png", status: "ready" },
              {
                id: "3",
                name: "broken.docx",
                size: 10240,
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                status: "error",
                errorMessage: "업로드 실패"
              }
            ]}
          />
        </Row>
        <Row label="drop-zone (Storybook reference)">
          <FileUpload
            title="파일을 드래그하거나 선택해 주세요"
            description="최대 5개까지 업로드 가능합니다. (이미지·PDF·DOCX)"
            maxFiles={5}
            maxFileSize={10 * 1024 * 1024}
          />
        </Row>

        <Section title="Phase 3 — Disclosure" />
        <Row label="default (closed)">
          <Disclosure buttonText="더 보기">
            <p style={{ margin: 0 }}>펼쳐진 내용입니다. 추가적인 정보를 여기에 표시합니다.</p>
          </Disclosure>
        </Row>
        <Row label="default expanded">
          <Disclosure buttonText="기본 열림" defaultExpanded>
            <p style={{ margin: 0 }}>기본으로 열려 있는 디스클로저입니다.</p>
          </Disclosure>
        </Row>
        <Row label="controlled open">
          <Disclosure buttonText="제어 열림" expanded={true} onToggle={() => {}}>
            <p style={{ margin: 0 }}>제어된 상태로 항상 열려 있습니다.</p>
          </Disclosure>
        </Row>
        <Row label="controlled closed">
          <Disclosure buttonText="제어 닫힘" expanded={false} onToggle={() => {}}>
            <p style={{ margin: 0 }}>이 내용은 보이지 않습니다.</p>
          </Disclosure>
        </Row>

        <Section title="Phase 3 — Tab" />
        <Row label="line variant (default)">
          <Tab defaultValue="tab1" variant="line">
            <TabList>
              <TabTrigger value="tab1">탭 1</TabTrigger>
              <TabTrigger value="tab2">탭 2</TabTrigger>
              <TabTrigger value="tab3">탭 3</TabTrigger>
            </TabList>
            <TabContent>
              <TabPanel value="tab1">탭 1 내용입니다.</TabPanel>
              <TabPanel value="tab2">탭 2 내용입니다.</TabPanel>
              <TabPanel value="tab3">탭 3 내용입니다.</TabPanel>
            </TabContent>
          </Tab>
        </Row>
        <Row label="fill variant">
          <Tab defaultValue="a" variant="fill">
            <TabList>
              <TabTrigger value="a">항목 A</TabTrigger>
              <TabTrigger value="b">항목 B</TabTrigger>
              <TabTrigger value="c">항목 C</TabTrigger>
            </TabList>
            <TabContent>
              <TabPanel value="a">항목 A 내용입니다.</TabPanel>
              <TabPanel value="b">항목 B 내용입니다.</TabPanel>
              <TabPanel value="c">항목 C 내용입니다.</TabPanel>
            </TabContent>
          </Tab>
        </Row>
        <Row label="full size (fill)">
          <Tab defaultValue="x" variant="fill" size="full">
            <TabList>
              <TabTrigger value="x">전체 X</TabTrigger>
              <TabTrigger value="y">전체 Y</TabTrigger>
            </TabList>
            <TabContent>
              <TabPanel value="x">전체 너비 X 내용</TabPanel>
              <TabPanel value="y">전체 너비 Y 내용</TabPanel>
            </TabContent>
          </Tab>
        </Row>

        <Section title="Phase 3 — Accordion" />
        <Row label="default variant (allowMultiple)">
          <Accordion defaultValue={["item1"]} allowMultiple variant="default">
            <AccordionItem value="item1">
              <AccordionHeader>아코디언 항목 1</AccordionHeader>
              <AccordionPanel>항목 1의 내용입니다. 여기에 상세 설명을 입력합니다.</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="item2">
              <AccordionHeader>아코디언 항목 2</AccordionHeader>
              <AccordionPanel>항목 2의 내용입니다. 펼침/접힘이 독립적으로 동작합니다.</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="item3">
              <AccordionHeader>아코디언 항목 3</AccordionHeader>
              <AccordionPanel>항목 3의 내용입니다.</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Row>
        <Row label="line variant (single)">
          <Accordion defaultValue={["a"]} allowMultiple={false} variant="line">
            <AccordionItem value="a">
              <AccordionHeader>라인형 항목 A</AccordionHeader>
              <AccordionPanel>라인형 스타일의 내용입니다.</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionHeader>라인형 항목 B</AccordionHeader>
              <AccordionPanel>하나만 열리는 단일 선택 모드입니다.</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionHeader>라인형 항목 C</AccordionHeader>
              <AccordionPanel>라인형 항목 C 내용입니다.</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Row>
        {/* Calendar: today-dot is dynamic by date — excluded from dark-invariance pixelmatch elsewhere, but kept in storybook parity grid */}
        <Section title="Phase 5 — Calendar" />
        <Row label="single (fixed selected date)">
          <Calendar mode="single" defaultValue="2026.01.15" />
        </Row>
        <Row label="range mode (fixed dates)">
          <Calendar mode="range" defaultStartDate="2026.01.05" defaultEndDate="2026.01.10" />
        </Row>
      </div>
    </>
  );
}
