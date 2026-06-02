// rsc:safe
import * as React from "react";
import { Root as Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

function Footer({ className, children, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="krds-footer"
      className={cn("bg-krds-surface-subtler border-krds-border-light w-full border-t", className)}
      {...props}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-10">{children}</div>
    </footer>
  );
}

function FooterOrg({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="krds-footer-org"
      className={cn("text-krds-foreground mb-6 text-base font-semibold", className)}
      {...props}
    />
  );
}

function FooterColumns({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-footer-columns"
      className={cn("grid grid-cols-1 gap-8 sm:grid-cols-3", className)}
      {...props}
    />
  );
}

function FooterColumn({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="krds-footer-column" className={cn("flex flex-col gap-3", className)} {...props} />;
}

function FooterColumnTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="krds-footer-column-title"
      className={cn("text-krds-foreground text-sm font-semibold", className)}
      {...props}
    />
  );
}

function FooterColumnLinks({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="krds-footer-column-links" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function FooterLink({ asChild = false, className, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";
  return (
    <li data-slot="krds-footer-link">
      <Comp
        className={cn(
          "text-krds-foreground-subtle text-sm",
          "hover:text-krds-foreground hover:underline",
          "focus:krds-focus-ring rounded-sm",
          className
        )}
        {...props}
      />
    </li>
  );
}

function FooterCopyright({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="krds-footer-copyright" className={cn("text-krds-foreground-disabled mt-8 text-xs", className)} {...props} />;
}

export {
  Footer,
  FooterOrg,
  FooterColumns,
  FooterColumn,
  FooterColumnTitle,
  FooterColumnLinks,
  FooterLink,
  FooterCopyright
};
