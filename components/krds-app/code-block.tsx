// rsc:client
"use client";

// Syntax highlighting: shiki v4 bundle/web (JS regex engine, no WASM); highlighter cached at module scope
import { useState, useEffect, useCallback } from "react";
import { getSingletonHighlighter } from "shiki/bundle/web";
import { Check, Clipboard, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn";

export { CodeBlock };

// Module-scope promise — created once in the browser, reused across all instances
let highlighterPromise: ReturnType<typeof getSingletonHighlighter> | null = null;

function getHighlighter() {
  if (typeof window === "undefined") return null;
  if (!highlighterPromise) {
    highlighterPromise = getSingletonHighlighter({
      themes: ["github-light"],
      langs: ["tsx", "ts", "jsx", "js", "css", "json", "bash", "sh", "html"]
    });
  }
  return highlighterPromise;
}

function CodeBlock({
  code,
  lang = "tsx",
  collapsible = false,
  className
}: {
  code: string;
  lang?: string;
  collapsible?: boolean;
  className?: string;
}) {
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(collapsible);

  useEffect(() => {
    const promise = getHighlighter();
    if (!promise) return;
    let cancelled = false;
    promise.then((h) => {
      if (cancelled) return;
      const loaded = h.getLoadedLanguages();
      const resolvedLang = loaded.includes(lang as never) ? lang : "text";
      setHtml(h.codeToHtml(code, { lang: resolvedLang, theme: "github-light" }));
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className={cn("rounded-md border bg-[#f6f8fa] text-sm", className)}>
      {collapsible && (
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-muted-foreground hover:text-foreground flex w-full items-center gap-1 border-b px-4 py-2 text-xs transition-colors last:border-b-0"
        >
          {collapsed ? (
            <>
              <ChevronDown className="size-3.5" />
              코드 보기
            </>
          ) : (
            <>
              <ChevronUp className="size-3.5" />
              코드 숨기기
            </>
          )}
        </button>
      )}
      {!collapsed && (
        <div className="relative">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "복사됨" : "코드 복사"}
            className="bg-background/80 hover:bg-muted absolute top-2 right-2 z-10 rounded-md border p-1.5 backdrop-blur-sm transition-colors"
          >
            {copied ? <Check className="size-3.5 text-green-600" /> : <Clipboard className="size-3.5" />}
          </button>
          {html ? (
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              className="font-mono [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:leading-relaxed"
            />
          ) : (
            <pre className="overflow-x-auto rounded-md p-4 font-mono leading-relaxed">
              <code>{code}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
