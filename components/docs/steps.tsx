import { cn } from "@/lib/utils"

export function Steps({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("steps [&>h3]:step mb-12 md:ml-4 md:border-l md:pl-8", className)}>{children}</div>
}

export function Step({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("mt-8 scroll-m-32 text-lg font-medium tracking-tight", className)}>{children}</h3>
}
