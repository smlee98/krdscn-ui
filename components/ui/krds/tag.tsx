import { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagSize = "small" | "medium" | "large";

interface BaseTagProps {
  children: ReactNode;
  className?: string;
  size?: TagSize;
}

interface DeletableTagProps extends BaseTagProps, Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  variant?: "deletable";
  onDelete?: () => void;
  deleteDisabled?: boolean;
}

interface LinkTagProps extends BaseTagProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  variant: "link";
  href: string;
}

type TagProps = DeletableTagProps | LinkTagProps;

const sizeStyles: Record<TagSize, { root: string; text: string; btn: string }> = {
  small: {
    root: "h-6 px-1.5 gap-1",
    text: "text-[0.6875rem]",
    btn: "size-4"
  },
  medium: {
    root: "h-8 px-2 gap-1.5",
    text: "text-xs",
    btn: "size-4"
  },
  large: {
    root: "h-10 px-2.5 gap-1.5",
    text: "text-sm",
    btn: "size-4"
  }
};

const rootBase =
  "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap shrink-0 leading-none" +
  " bg-krds-gray-0" +
  " border-krds-gray-20" +
  " text-krds-gray-90" +
  " hover:bg-krds-gray-10" +
  " hover:border-krds-gray-10" +
  " active:bg-krds-gray-20" +
  " active:border-krds-gray-20";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <path
        d="M12 4L4 12M4 4l8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Tag(props: TagProps) {
  const { children, className, size = "medium" } = props;
  const sz = sizeStyles[size];

  if (props.variant === "link") {
    const { variant: _v, href, size: _s, ...rest } = props;
    return (
      <a href={href} className={cn(rootBase, sz.root, sz.text, "cursor-pointer", className)} {...rest}>
        <span>{children}</span>
      </a>
    );
  }

  const { variant: _v, onDelete, deleteDisabled, size: _s, ...rest } = props as DeletableTagProps;

  return (
    <span className={cn(rootBase, sz.root, sz.text, className)} {...rest}>
      <span>{children}</span>
      {onDelete !== undefined && (
        <button
          type="button"
          aria-label="태그 삭제"
          disabled={deleteDisabled}
          onClick={onDelete}
          className={cn(
            sz.btn,
            "inline-flex shrink-0 items-center justify-center rounded-full",
            "text-krds-gray-90",
            "disabled:cursor-not-allowed disabled:opacity-40"
          )}
        >
          <CloseIcon className="size-full" />
        </button>
      )}
    </span>
  );
}

export type { TagProps, TagSize, DeletableTagProps, LinkTagProps };
export { Tag };
