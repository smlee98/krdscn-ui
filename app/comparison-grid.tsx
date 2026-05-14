"use client";

import { IdentitySection } from "@/app/sections/identity";
import { NavigationSection } from "@/app/sections/navigation";
import { LayoutSection } from "@/app/sections/layout";
import { ActionSection } from "@/app/sections/action";
import { SelectionSection } from "@/app/sections/selection";
import { FeedbackSection } from "@/app/sections/feedback";
import { HelpSection } from "@/app/sections/help";
import { InputSection } from "@/app/sections/input";
import { SettingsSection } from "@/app/sections/settings";
import { IntegratedDemoSection } from "@/app/sections/demo";

export { ComparisonGrid };

function ComparisonGrid() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <IdentitySection />
      <NavigationSection />
      <LayoutSection />
      <ActionSection />
      <SelectionSection />
      <FeedbackSection />
      <HelpSection />
      <InputSection />
      <SettingsSection />
      <IntegratedDemoSection />
    </div>
  );
}
