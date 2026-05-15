import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds";
import { FileTextIcon, HelpCircleIcon, BookOpenIcon } from "lucide-react";

export default function TabWithIcons() {
  return (
    <Tab defaultValue="docs" variant="fill">
      <TabList>
        <TabTrigger value="docs">
          <span className="flex items-center gap-1.5">
            <FileTextIcon className="size-4" />
            서류 안내
          </span>
        </TabTrigger>
        <TabTrigger value="help">
          <span className="flex items-center gap-1.5">
            <HelpCircleIcon className="size-4" />
            도움말
          </span>
        </TabTrigger>
        <TabTrigger value="guide">
          <span className="flex items-center gap-1.5">
            <BookOpenIcon className="size-4" />
            매뉴얼
          </span>
        </TabTrigger>
      </TabList>
      <TabContent>
        <TabPanel value="docs">
          <p className="text-krds-gray-70 text-sm">신청에 필요한 서류 목록을 안내합니다.</p>
        </TabPanel>
        <TabPanel value="help">
          <p className="text-krds-gray-70 text-sm">자주 묻는 질문 및 도움말을 제공합니다.</p>
        </TabPanel>
        <TabPanel value="guide">
          <p className="text-krds-gray-70 text-sm">서비스 이용 매뉴얼을 확인할 수 있습니다.</p>
        </TabPanel>
      </TabContent>
    </Tab>
  );
}
