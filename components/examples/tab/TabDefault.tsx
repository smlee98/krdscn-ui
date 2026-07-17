import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/registry/krds/ui/tab"

export default function TabDefault() {
  return (
    <Tab defaultValue="tab1">
      <TabList>
        <TabTrigger value="tab1">타이틀 1</TabTrigger>
        <TabTrigger value="tab2">타이틀 2</TabTrigger>
        <TabTrigger value="tab3">타이틀 3</TabTrigger>
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
      </TabContent>
    </Tab>
  )
}
