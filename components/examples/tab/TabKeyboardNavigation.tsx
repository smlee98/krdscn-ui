import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/dynamic/tab";

export default function TabKeyboardNavigation() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-krds-gray-50 text-xs">키보드: 탭 포커스 후 ← → 방향키로 탭 이동, Enter/Space로 선택</p>
      <Tab defaultValue="tab1">
        <TabList>
          <TabTrigger value="tab1">타이틀 1</TabTrigger>
          <TabTrigger value="tab2">타이틀 2</TabTrigger>
          <TabTrigger value="tab3">타이틀 3</TabTrigger>
          <TabTrigger value="tab4">타이틀 4</TabTrigger>
        </TabList>
        <TabContent>
          <TabPanel value="tab1">
            <div>탭 1 영역</div>
          </TabPanel>
          <TabPanel value="tab2">
            <div>탭 2 영역</div>
          </TabPanel>
          <TabPanel value="tab3">
            <div>탭 3 영역</div>
          </TabPanel>
          <TabPanel value="tab4">
            <div>탭 4 영역</div>
          </TabPanel>
        </TabContent>
      </Tab>
    </div>
  );
}
