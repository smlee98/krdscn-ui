import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/registry/krds/ui/tab"

export default function TabFillTypeFull() {
  return (
    <Tab variant="fill" defaultValue="home">
      <TabList className="w-full">
        <TabTrigger value="home" className="flex-1">
          홈
        </TabTrigger>
        <TabTrigger value="about" className="flex-1">
          소개
        </TabTrigger>
        <TabTrigger value="contact" className="flex-1">
          연락처
        </TabTrigger>
      </TabList>
      <TabContent>
        <TabPanel value="home">
          <div>홈 페이지 내용입니다.</div>
        </TabPanel>
        <TabPanel value="about">
          <div>소개 페이지 내용입니다.</div>
        </TabPanel>
        <TabPanel value="contact">
          <div>연락처 정보입니다.</div>
        </TabPanel>
      </TabContent>
    </Tab>
  )
}
