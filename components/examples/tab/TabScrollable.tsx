import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds";

const CATEGORIES = [
  { value: "all", label: "전체" },
  { value: "civil", label: "민원" },
  { value: "tax", label: "세금" },
  { value: "health", label: "보건" },
  { value: "welfare", label: "복지" },
  { value: "education", label: "교육" },
  { value: "housing", label: "주거" },
  { value: "business", label: "사업" }
];

export default function TabScrollable() {
  return (
    <Tab defaultValue="all">
      <div className="overflow-x-auto">
        <TabList className="w-max min-w-full">
          {CATEGORIES.map(({ value, label }) => (
            <TabTrigger key={value} value={value}>
              {label}
            </TabTrigger>
          ))}
        </TabList>
      </div>
      <TabContent>
        {CATEGORIES.map(({ value, label }) => (
          <TabPanel key={value} value={value}>
            <p className="text-krds-gray-70 py-2 text-sm">
              <strong>{label}</strong> 카테고리의 서비스 목록이 표시됩니다.
            </p>
          </TabPanel>
        ))}
      </TabContent>
    </Tab>
  );
}
