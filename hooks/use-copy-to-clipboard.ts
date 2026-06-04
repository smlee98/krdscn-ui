"use client"

import * as React from "react"

async function copyText(value: string) {
  const clipboard = navigator.clipboard as Clipboard | undefined

  if (typeof clipboard?.writeText === "function") {
    await clipboard.writeText(value)
    return
  }

  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.top = "-9999px"
  document.body.appendChild(textarea)
  textarea.select()

  try {
    document.execCommand("copy")
  } finally {
    document.body.removeChild(textarea)
  }
}

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(async (value: string) => {
    await copyText(value)
    setIsCopied(true)
    window.setTimeout(() => setIsCopied(false), 1500)
  }, [])

  return { isCopied, copyToClipboard }
}
