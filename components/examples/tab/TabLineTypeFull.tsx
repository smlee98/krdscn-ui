import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds/(layout)/tab";

export default function TabLineTypeFull() {
  return (
    <Tab variant="line" defaultValue="dashboard">
      <TabList className="w-full">
        <TabTrigger value="dashboard" className="flex-1">
          대시보드
        </TabTrigger>
        <TabTrigger value="analytics" className="flex-1">
          분석
        </TabTrigger>
        <TabTrigger value="reports" className="flex-1">
          보고서
        </TabTrigger>
      </TabList>
      <TabContent>
        <TabPanel value="dashboard">
          <div>대시보드 내용</div>
        </TabPanel>
        <TabPanel value="analytics">
          <div>분석 내용</div>
        </TabPanel>
        <TabPanel value="reports">
          <div>보고서 내용</div>
        </TabPanel>
      </TabContent>
    </Tab>
  );
}
