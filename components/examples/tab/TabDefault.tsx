import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds";

export default function TabDefault() {
  return (
    <Tab defaultValue="notice">
      <TabList>
        <TabTrigger value="notice">공지사항</TabTrigger>
        <TabTrigger value="faq">자주 묻는 질문</TabTrigger>
        <TabTrigger value="guide">이용 안내</TabTrigger>
      </TabList>
      <TabContent>
        <TabPanel value="notice">
          <ul className="flex flex-col gap-2 text-sm">
            <li className="border-krds-gray-10 flex justify-between border-b py-2">
              <span className="text-krds-gray-90">2024년 상반기 서비스 개편 안내</span>
              <span className="text-krds-gray-50">2024.03.15</span>
            </li>
            <li className="border-krds-gray-10 flex justify-between border-b py-2">
              <span className="text-krds-gray-90">시스템 점검 안내 (3월 20일)</span>
              <span className="text-krds-gray-50">2024.03.12</span>
            </li>
          </ul>
        </TabPanel>
        <TabPanel value="faq">
          <p className="text-krds-gray-70 text-sm">자주 묻는 질문 내용이 표시됩니다.</p>
        </TabPanel>
        <TabPanel value="guide">
          <p className="text-krds-gray-70 text-sm">이용 안내 내용이 표시됩니다.</p>
        </TabPanel>
      </TabContent>
    </Tab>
  );
}
