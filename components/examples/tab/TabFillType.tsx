import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/dynamic/tab";

export default function TabFillType() {
  return (
    <Tab variant="fill" defaultValue="home">
      <TabList>
        <TabTrigger value="home">홈</TabTrigger>
        <TabTrigger value="about">소개</TabTrigger>
        <TabTrigger value="contact">연락처</TabTrigger>
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
  );
}
