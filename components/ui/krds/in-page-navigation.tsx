// rsc:client
"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

interface InPageNavItem {
  id: string;
  label: string;
}

interface InPageNavigationProps {
  items: InPageNavItem[];
  className?: string;
  "aria-label"?: string;
}

function InPageNavigation({ items, className, "aria-label": ariaLabel = "페이지 내 탐색" }: InPageNavigationProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (items.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    const observer = observerRef.current;
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setActiveId(id);
  }

  return (
    <nav role="navigation" aria-label={ariaLabel} className={cn("flex flex-col gap-1", className)}>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => handleAnchorClick(e, item.id)}
                className={cn(
                  "block py-1.5 pr-3 text-sm transition-colors",
                  "hover:text-krds-gray-90",
                  isActive
                    ? "border-krds-primary-50 text-krds-primary-50 border-l-2 pl-2.5 font-medium"
                    : "text-krds-gray-70 border-l-2 border-transparent pl-2.5"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export type { InPageNavItem, InPageNavigationProps };
export { InPageNavigation };
