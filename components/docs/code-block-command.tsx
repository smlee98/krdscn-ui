"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, TerminalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/cn"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const managers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]

function getCommands(command: string): Record<PackageManager, string> {
  const raw = command.trim()

  if (raw.startsWith("pnpm dlx ")) {
    return {
      pnpm: raw,
      npm: raw.replace(/^pnpm dlx/, "npx"),
      yarn: raw.replace(/^pnpm dlx/, "yarn dlx"),
      bun: raw.replace(/^pnpm dlx/, "bunx --bun"),
    }
  }

  if (raw.startsWith("npx ")) {
    return {
      pnpm: raw.replace(/^npx/, "pnpm dlx"),
      npm: raw,
      yarn: raw.replace(/^npx/, "yarn dlx"),
      bun: raw.replace(/^npx/, "bunx --bun"),
    }
  }

  if (raw.startsWith("npm install ")) {
    return {
      pnpm: raw.replace(/^npm install/, "pnpm add"),
      npm: raw,
      yarn: raw.replace(/^npm install/, "yarn add"),
      bun: raw.replace(/^npm install/, "bun add"),
    }
  }

  if (raw.startsWith("npm run ")) {
    return {
      pnpm: raw.replace(/^npm run/, "pnpm"),
      npm: raw,
      yarn: raw.replace(/^npm run/, "yarn"),
      bun: raw.replace(/^npm run/, "bun"),
    }
  }

  if (raw.startsWith("pnpm add ")) {
    return {
      pnpm: raw,
      npm: raw.replace(/^pnpm add/, "npm install"),
      yarn: raw.replace(/^pnpm add/, "yarn add"),
      bun: raw.replace(/^pnpm add/, "bun add"),
    }
  }

  return {
    pnpm: raw,
    npm: raw,
    yarn: raw,
    bun: raw,
  }
}

function usePackageManager() {
  const [packageManager, setPackageManagerState] = React.useState<PackageManager>("pnpm")

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem("krdscn-ui-package-manager")
      if (stored === "pnpm" || stored === "npm" || stored === "yarn" || stored === "bun") {
        setPackageManagerState(stored)
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const setPackageManager = React.useCallback((value: PackageManager) => {
    setPackageManagerState(value)
    window.localStorage.setItem("krdscn-ui-package-manager", value)
  }, [])

  return [packageManager, setPackageManager] as const
}

export function CodeBlockCommand({ command, className }: { command: string; className?: string }) {
  const [packageManager, setPackageManager] = usePackageManager()
  const [copied, setCopied] = React.useState(false)
  const commands = React.useMemo(() => getCommands(command), [command])

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyCommand = commands[packageManager]

  return (
    <div
      className={cn(
        "bg-code text-code-foreground relative my-6 overflow-x-auto rounded-xl border shadow-none",
        className
      )}
    >
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => setPackageManager(value as PackageManager)}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <TerminalIcon className="text-code size-3" />
          </div>
          <TabsList className="bg-transparent">
            {managers.map((manager) => (
              <TabsTrigger
                key={manager}
                value={manager}
                className="border-border/60 h-7 shadow-none! data-active:shadow-none!"
              >
                {manager}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {managers.map((manager) => (
            <TabsContent key={manager} value={manager} className="mt-0 px-4 py-3.5">
              <pre>
                <code className="relative font-mono text-sm leading-none" data-language="bash">
                  {commands[manager]}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <Button
        data-slot="copy-button"
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10"
        onClick={async () => {
          await navigator.clipboard.writeText(copyCommand)
          setCopied(true)
        }}
      >
        <span className="sr-only">복사</span>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}
