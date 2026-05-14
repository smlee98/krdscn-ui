// rsc:safe
import * as React from "react";
import { cn } from "@/lib/cn";

function Masthead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-masthead"
      role="banner"
      className={cn(
        "flex h-8 items-center px-4",
        "bg-krds-gray-5 border-krds-gray-10 border-b",
        className
      )}
      {...props}
    >
      <a
        href="https://www.korea.go.kr"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1.5",
          "text-krds-gray-70 text-xs",
          "hover:text-krds-gray-90 hover:underline",
          "focus-visible:ring-krds-primary-50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        )}
      >
        <MastheadEmblem className="h-4 w-auto shrink-0" aria-hidden="true" />
        <span>대한민국 정부</span>
      </a>
    </div>
  );
}

function MastheadEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 태극 문양 간략화 심볼 */}
      <circle cx="12" cy="8" r="6" fill="#cd2e3a" opacity="0.15" />
      <circle cx="12" cy="8" r="6" stroke="#cd2e3a" strokeWidth="1.2" fill="none" />
      <path d="M12 2a6 6 0 0 1 0 12A3 3 0 0 1 12 2z" fill="#cd2e3a" opacity="0.8" />
      <path d="M12 14a6 6 0 0 1 0-12A3 3 0 0 1 12 14z" fill="#003478" opacity="0.8" />
    </svg>
  );
}

export { Masthead };
