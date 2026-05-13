// rsc:safe

import { cn } from "@/lib/cn";

interface IdentifierLink {
  label: string;
  href: string;
}

interface IdentifierProps {
  agencyName: string;
  siteDescription?: string;
  links?: IdentifierLink[];
  className?: string;
}

function Identifier({ agencyName, siteDescription, links, className }: IdentifierProps) {
  return (
    <div
      role="contentinfo"
      className={cn(
        "flex flex-col gap-1 px-4 py-3",
        "bg-krds-gray-5 border-krds-gray-20 border-t",
        "text-krds-gray-70 text-sm",
        className
      )}
    >
      <span className="text-krds-gray-90 font-semibold">{agencyName}</span>
      {siteDescription && <span>{siteDescription}</span>}
      {links && links.length > 0 && (
        <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {links.map((link, i) => (
            <li key={`${i}-${link.href}`}>
              <a href={link.href} className="text-krds-primary-50 hover:text-krds-primary-70 underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type { IdentifierProps, IdentifierLink };
export { Identifier };
