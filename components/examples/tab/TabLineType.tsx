import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/dynamic/tab";

export default function TabLineType() {
  return (
    <Tab variant="line" defaultValue="overview">
      <TabList>
        <TabTrigger value="overview">개요</TabTrigger>
        <TabTrigger value="features">기능</TabTrigger>
        <TabTrigger value="usage">사용법</TabTrigger>
      </TabList>
      <TabContent>
        <TabPanel value="overview">
          <div>
            <h4>프로젝트 개요</h4>
            <p>이 프로젝트는 KRDS 디자인 시스템을 구현한 React 컴포넌트 라이브러리입니다.</p>
          </div>
        </TabPanel>
        <TabPanel value="features">
          <div>
            <h4>주요 기능</h4>
            <p>다양한 UI 컴포넌트와 유틸리티를 제공합니다.</p>
          </div>
        </TabPanel>
        <TabPanel value="usage">
          <div>
            <h4>사용법</h4>
            <p>npm 또는 yarn을 통해 설치하고 사용할 수 있습니다.</p>
          </div>
        </TabPanel>
      </TabContent>
    </Tab>
  );
}
