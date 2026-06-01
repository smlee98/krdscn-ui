import "@/app/globals.css";
import { cn } from "@/lib/cn";
import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "KRDS shadcn"
};

const pretendardGov = localFont({
  src: [
    {
      path: "../assets/PretendardGOVVariable.woff2",
      weight: "45 920",
      style: "normal"
    }
  ],
  variable: "--font-pretendard-gov"
});

const monoplexKr = localFont({
  src: [
    { path: "../assets/MonoplexKR/MonoplexKR-Thin.ttf", weight: "100", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Light.ttf", weight: "300", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Text.ttf", weight: "350", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-TextItalic.ttf", weight: "350", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-Italic.ttf", weight: "400", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-BoldItalic.ttf", weight: "700", style: "italic" }
  ],
  variable: "--font-monoplex-kr"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={cn(pretendardGov.variable, monoplexKr.variable)}>
      <body>{children}</body>
    </html>
  );
}
