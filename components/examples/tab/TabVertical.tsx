import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds";

export default function TabVertical() {
  return (
    <Tab defaultValue="personal">
      <div className="flex gap-0">
        <TabList className="border-krds-gray-20 min-w-[7.5rem] flex-col items-start border-r border-b-0">
          <TabTrigger value="personal" className="w-full justify-start rounded-r-none px-3">
            개인정보
          </TabTrigger>
          <TabTrigger value="security" className="w-full justify-start rounded-r-none px-3">
            보안 설정
          </TabTrigger>
          <TabTrigger value="notification" className="w-full justify-start rounded-r-none px-3">
            알림 설정
          </TabTrigger>
        </TabList>
        <TabContent className="flex-1 pt-0 pl-4">
          <TabPanel value="personal">
            <div className="border-krds-gray-20 rounded-lg border bg-white p-4">
              <h3 className="text-krds-gray-90 mb-2 text-sm font-semibold">개인정보</h3>
              <p className="text-krds-gray-70 text-sm">이름, 연락처, 주소 등 기본 개인정보를 관리합니다.</p>
            </div>
          </TabPanel>
          <TabPanel value="security">
            <div className="border-krds-gray-20 rounded-lg border bg-white p-4">
              <h3 className="text-krds-gray-90 mb-2 text-sm font-semibold">보안 설정</h3>
              <p className="text-krds-gray-70 text-sm">비밀번호 변경 및 2단계 인증을 설정합니다.</p>
            </div>
          </TabPanel>
          <TabPanel value="notification">
            <div className="border-krds-gray-20 rounded-lg border bg-white p-4">
              <h3 className="text-krds-gray-90 mb-2 text-sm font-semibold">알림 설정</h3>
              <p className="text-krds-gray-70 text-sm">이메일, 문자 알림 수신 여부를 설정합니다.</p>
            </div>
          </TabPanel>
        </TabContent>
      </div>
    </Tab>
  );
}
