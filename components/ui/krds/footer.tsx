// rsc:safe
import type { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Footer — 3단 컬럼 레이아웃                                           */
/*  NOTE: Identifier는 호출 측에서 직접 합성 (Footer가 import하지 않음)   */
/* ------------------------------------------------------------------ */

export interface FooterLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumnProps {
  title?: string;
  links: FooterLinkItem[];
  className?: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** 3개 컬럼 데이터 */
  columns?: FooterColumnProps[];
  /** 하단 카피라이트 텍스트 */
  copyright?: string;
  /** 푸터 로고/기관명 */
  organizationName?: string;
  className?: string;
  children?: ReactNode;
}

function FooterLink({
  href,
  children,
  external,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "text-krds-gray-70 text-sm",
        "hover:text-krds-gray-90 hover:underline",
        "focus-visible:ring-krds-primary-50 rounded-sm focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

function FooterColumn({ title, links, className }: FooterColumnProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title && <p className="text-krds-gray-90 text-sm font-semibold">{title}</p>}
      <ul className="flex flex-col gap-2">
        {links.map((link, i) => (
          <li key={`${i}-${link.href}`}>
            <FooterLink href={link.href} external={link.external}>
              {link.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ columns, copyright, organizationName, className, children, ...rest }: FooterProps) {
  const defaultColumns: FooterColumnProps[] = columns ?? [
    {
      title: "기관소개",
      links: [
        { label: "기관 안내", href: "#" },
        { label: "조직도", href: "#" },
        { label: "연혁", href: "#" }
      ]
    },
    {
      title: "이용안내",
      links: [
        { label: "이용약관", href: "#" },
        { label: "개인정보처리방침", href: "#" },
        { label: "저작권정책", href: "#" }
      ]
    },
    {
      title: "바로가기",
      links: [
        { label: "정부24", href: "https://www.gov.kr", external: true },
        { label: "국민신문고", href: "https://www.epeople.go.kr", external: true },
        { label: "공공데이터포털", href: "https://www.data.go.kr", external: true }
      ]
    }
  ];

  return (
    <footer className={cn("bg-krds-gray-5 border-krds-gray-10 w-full border-t", className)} {...rest}>
      <div className="mx-auto max-w-screen-xl px-6 py-10">
        {organizationName && <p className="text-krds-gray-90 mb-6 text-base font-semibold">{organizationName}</p>}

        {/* 3-column link grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {defaultColumns.map((col, idx) => (
            <FooterColumn key={idx} {...col} />
          ))}
        </div>

        {/* children slot — 호출 측에서 Identifier 등 합성 가능 */}
        {children && <div className="border-krds-gray-10 mt-8 border-t pt-6">{children}</div>}

        {/* copyright */}
        {copyright !== undefined ? (
          <p className="text-krds-gray-50 mt-8 text-xs">{copyright}</p>
        ) : (
          <p className="text-krds-gray-50 mt-8 text-xs">
            © {new Date().getFullYear()} 대한민국 정부. All rights reserved.
          </p>
        )}
      </div>
    </footer>
  );
}

export { Footer, FooterColumn, FooterLink };
