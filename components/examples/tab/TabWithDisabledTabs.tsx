import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/registry/krds/ui/tab"

export default function TabWithDisabledTabs() {
  return (
    <Tab defaultValue="tab1">
      <TabList>
        <TabTrigger value="tab1">타이틀 1</TabTrigger>
        <TabTrigger value="tab2">타이틀 2</TabTrigger>
        <TabTrigger value="tab3" disabled>
          타이틀 3
        </TabTrigger>
        <TabTrigger value="tab4" disabled>
          타이틀 4
        </TabTrigger>
      </TabList>
      <TabContent>
        <TabPanel value="tab1">
          <div>탭 1 영역</div>
        </TabPanel>
        <TabPanel value="tab2">
          <div>탭 2 영역</div>
        </TabPanel>
      </TabContent>
    </Tab>
  )
}
