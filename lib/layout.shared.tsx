import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "krdscn/ui",
      url: "/",
    },
    links: [
      {
        text: "Docs",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "레지스트리",
        url: "/docs/registry",
        active: "nested-url",
      },
      {
        text: "GitHub",
        url: "https://github.com/krdscn-ui/ui",
        external: true,
      },
    ],
    searchToggle: {
      enabled: false,
    },
    githubUrl: "https://github.com/krdscn-ui/ui",
  }
}
