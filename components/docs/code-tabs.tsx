"use client"

import * as React from "react"

import { Tabs } from "@/components/ui/tabs"

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [installationType, setInstallationType] = React.useState("cli")

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem("krdscn-ui-installation-type")
      if (stored === "cli" || stored === "manual") {
        setInstallationType(stored)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <Tabs
      value={installationType}
      onValueChange={(value) => {
        setInstallationType(value)
        window.localStorage.setItem("krdscn-ui-installation-type", value)
      }}
      className="relative mt-6 w-full gap-0 *:data-[slot=tabs-list]:gap-6"
    >
      {children}
    </Tabs>
  )
}
