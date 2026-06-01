// rsc:client
"use client";

// Syntax highlighting: shiki v4 bundle/web (JS regex engine, no WASM); highlighter cached at module scope.
// Theme is chosen in JS from next-themes (resolvedTheme) and re-highlighted on change — no global CSS.
import { useState, useEffect, useCallback } from "react";
import { getSingletonHighlighter } from "shiki/bundle/web";
import { useTheme } from "next-themes";
import { Check, Clipboard } from "lucide-react";
import { cn } from "@/lib/cn";

export { CodeBlock };

// Module-scope promise — created once in the browser, reused across all instances
let highlighterPromise: ReturnType<typeof getSingletonHighlighter> | null = null;

function getHighlighter() {
  if (typeof window === "undefined") return null;
  if (!highlighterPromise) {
    highlighterPromise = getSingletonHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "ts", "jsx", "js", "css", "json", "bash", "sh", "html"]
    });
  }
  return highlighterPromise;
}

function CodeBlock({
  code,
  lang = "tsx",
  className
}: {
  code: string;
  lang?: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const theme = resolvedTheme === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    const promise = getHighlighter();
    if (!promise) return;
    let cancelled = false;
    promise.then((h) => {
      if (cancelled) return;
      const loaded = h.getLoadedLanguages();
      const resolvedLang = loaded.includes(lang as never) ? lang : "text";
      setHtml(h.codeToHtml(code, { lang: resolvedLang, theme }));
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang, theme]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className={cn("bg-krds-surface-subtler relative rounded-md border text-sm", className)}>
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
  );
}
