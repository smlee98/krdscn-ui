"use client"

// Z:\portfolio 의 code-block-command 룩을 포팅한 버전.
// - 상단: 패키지매니저 브랜드 아이콘(전환 시 스왑 애니메이션) + line 탭(활성 밑줄)
// - 본문: 보더 코드 박스, 우상단 ghost 복사 버튼
// portfolio 와 달리 rehype 파이프라인(__pnpm__ 등 사전 계산 prop)·Base UI·motion 의존 없이,
// 기존 시그니처(command 문자열 → getCommands 변환)와 localStorage 퍼시스턴스를 유지한다.

import { CheckIcon, CopyIcon } from "lucide-react"
import * as React from "react"

import { BunIcon, NpmIcon, PnpmIcon, YarnIcon } from "@/components/docs/brand-icons"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const managers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]

const managerIcons: Record<PackageManager, React.ReactNode> = {
  pnpm: <PnpmIcon />,
  npm: <NpmIcon />,
  yarn: <YarnIcon />,
  bun: <BunIcon />,
}

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
      data-slot="code-block-command"
      className={cn(
        // portfolio 의 figure 셸([data-rehype-pretty-code-figure]) 재현: 연회색 카드
        // (rounded-xl + p-1 + inset ring) 안에 코드 박스가 떠 있고, 명령 블록은 탭 행이
        // 셸 상단에 붙도록 pt-0 (has-data-[slot=code-block-command]:pt-0 대응).
        "bg-code text-code-foreground inset-ring-border/60 relative my-6 rounded-xl p-1 pt-0 inset-ring-1",
        className
      )}
    >
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => setPackageManager(value as PackageManager)}
      >
        <div className="px-3">
          <TabsList variant="line" className="[&_svg]:text-muted-foreground h-10 bg-transparent p-0 [&_svg]:size-4">
            {/* motion(IconSwap) 대신 key 리마운트 + tw-animate 로 아이콘 스왑 */}
            <span key={packageManager} className="animate-in fade-in zoom-in-50 mr-2 duration-200" aria-hidden="true">
              {managerIcons[packageManager]}
            </span>
            {managers.map((manager) => (
              <TabsTrigger key={manager} value={manager} className="h-7 flex-none rounded-lg px-2 font-mono">
                {manager}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {managers.map((manager) => (
          <TabsContent key={manager} value={manager} className="mt-0">
            <div className="bg-background rounded-[9px] border">
              <pre className="no-scrollbar overflow-x-auto overscroll-x-contain px-4 py-3.5 leading-5">
                <code data-language="bash" className="text-muted-foreground font-mono text-sm/none">
                  {commands[manager]}
                </code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Button
        data-slot="copy-button"
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground absolute top-1.5 right-1.5 z-10 size-7"
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
