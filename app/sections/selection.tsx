// rsc:client
"use client";

import { useState } from "react";
import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { Radio, RadioGroup, RadioChip } from "@/components/ui/krds/radio-group";
import { Checkbox, CheckboxGroup, CheckboxChip } from "@/components/ui/krds/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/krds/select";
import { Tag } from "@/components/ui/krds/tag";
import { ToggleSwitch } from "@/components/ui/krds/toggle-switch";

export function SelectionSection() {
  // Radio state
  const [radio, setRadio] = useState("opt1");
  const [radioChip, setRadioChip] = useState("chip1");

  // Checkbox state
  const [cbx1, setCbx1] = useState(false);
  const [cbx2, setCbx2] = useState(false);
  const [cbx3, setCbx3] = useState(false);
  const [cbxChip1, setCbxChip1] = useState(false);
  const [cbxChip2, setCbxChip2] = useState(false);
  const [cbxChip3, setCbxChip3] = useState(false);

  // Select state
  const [region, setRegion] = useState("");

  // Tag state
  const [tags, setTags] = useState(["Next.js", "React", "TypeScript", "Tailwind", "CSS"]);

  // ToggleSwitch state
  const [toggled, setToggled] = useState(false);

  const selectedCheckboxes = [cbx1 && "옵션 1", cbx2 && "옵션 2", cbx3 && "옵션 3"]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <GroupHeading>선택</GroupHeading>

      <DemoSection id="radio-group" title="라디오 버튼 / Radio Button">
        <DemoCard title="기본 라디오">
          <div className="flex flex-col gap-3 w-full">
            <RadioGroup name="radio-demo" value={radio} onChange={setRadio}>
              <Radio value="opt1">옵션 1</Radio>
              <Radio value="opt2">옵션 2</Radio>
              <Radio value="opt3">옵션 3</Radio>
            </RadioGroup>
            <p className="text-sm text-krds-gray-70">
              선택된 값: <span className="font-medium">{radio}</span>
            </p>
          </div>
        </DemoCard>
        <DemoCard title="라디오 칩">
          <div className="flex flex-col gap-3">
            <RadioGroup name="radio-chip-demo" value={radioChip} onChange={setRadioChip} column={false}>
              <RadioChip value="chip1">디자인</RadioChip>
              <RadioChip value="chip2">개발</RadioChip>
              <RadioChip value="chip3">기획</RadioChip>
            </RadioGroup>
            <p className="text-sm text-krds-gray-70">
              선택된 값: <span className="font-medium">{radioChip}</span>
            </p>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="checkbox" title="체크박스 / Checkbox">
        <DemoCard title="기본 체크박스">
          <div className="flex flex-col gap-3 w-full">
            <CheckboxGroup column>
              <Checkbox label="옵션 1" checked={cbx1} onChange={setCbx1} />
              <Checkbox label="옵션 2" checked={cbx2} onChange={setCbx2} />
              <Checkbox label="옵션 3" checked={cbx3} onChange={setCbx3} />
            </CheckboxGroup>
            <p className="text-sm text-krds-gray-70">
              선택된 항목: <span className="font-medium">{selectedCheckboxes || "없음"}</span>
            </p>
          </div>
        </DemoCard>
        <DemoCard title="체크박스 칩">
          <div className="flex flex-col gap-3">
            <CheckboxGroup>
              <CheckboxChip checked={cbxChip1} onChange={setCbxChip1}>
                디자인
              </CheckboxChip>
              <CheckboxChip checked={cbxChip2} onChange={setCbxChip2}>
                개발
              </CheckboxChip>
              <CheckboxChip checked={cbxChip3} onChange={setCbxChip3}>
                기획
              </CheckboxChip>
            </CheckboxGroup>
            <p className="text-sm text-krds-gray-70">
              선택:{" "}
              <span className="font-medium">
                {[cbxChip1 && "디자인", cbxChip2 && "개발", cbxChip3 && "기획"]
                  .filter(Boolean)
                  .join(", ") || "없음"}
              </span>
            </p>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="select" title="셀렉트 / Select">
        <DemoCard>
          <div className="flex flex-col gap-3 w-64">
            <div className="flex flex-col gap-1">
              <label className="text-krds-gray-90 text-sm font-medium leading-none mb-1">
                지역 선택
              </label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="지역을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seoul">서울</SelectItem>
                  <SelectItem value="busan">부산</SelectItem>
                  <SelectItem value="daegu">대구</SelectItem>
                  <SelectItem value="incheon">인천</SelectItem>
                  <SelectItem value="gwangju">광주</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-krds-gray-70">
              선택된 지역:{" "}
              <span className="font-medium">
                {region
                  ? ({ seoul: "서울", busan: "부산", daegu: "대구", incheon: "인천", gwangju: "광주" } as Record<string, string>)[region]
                  : "없음"}
              </span>
            </p>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="tag" title="태그 / Tag">
        <DemoCard title="태그 종류">
          <Tag>기본 태그</Tag>
          <Tag onDelete={() => {}}>삭제 가능</Tag>
          <Tag variant="link" href="#">링크 태그</Tag>
        </DemoCard>
        <DemoCard title="태그 크기">
          <Tag size="small">소</Tag>
          <Tag size="medium">중</Tag>
          <Tag size="large">대</Tag>
        </DemoCard>
        <DemoCard title="삭제 가능한 태그 목록">
          {tags.map((tag) => (
            <Tag
              key={tag}
              onDelete={() => setTags((prev) => prev.filter((t) => t !== tag))}
            >
              {tag}
            </Tag>
          ))}
          {tags.length === 0 && (
            <p className="text-sm text-krds-gray-50">모든 태그가 삭제되었습니다.</p>
          )}
        </DemoCard>
      </DemoSection>

      <DemoSection id="toggle-switch" title="토글 스위치 / Toggle Switch">
        <DemoCard>
          <div className="flex flex-col gap-4">
            <ToggleSwitch
              checked={toggled}
              onCheckedChange={setToggled}
              label="알림 수신"
            />
            <p className="text-sm text-krds-gray-70">
              상태: <span className="font-medium">{toggled ? "켜짐" : "꺼짐"}</span>
            </p>
          </div>
        </DemoCard>
        <DemoCard title="크기 비교">
          <div className="flex flex-col gap-3">
            <ToggleSwitch size="medium" label="보통 크기 (medium)" />
            <ToggleSwitch size="large" label="큰 크기 (large)" />
          </div>
        </DemoCard>
        <DemoCard title="비활성화">
          <ToggleSwitch disabled label="비활성화 (꺼짐)" />
          <ToggleSwitch disabled defaultChecked label="비활성화 (켜짐)" />
        </DemoCard>
      </DemoSection>
    </>
  );
}
