// Shared KRDS icons used by 2+ registry components (contract §1: helpers shared by
// 2+ files live in lib/, since every file in registry/krds/ui/ becomes a registry item).

// Filled circular delete/clear glyph — a gray-20 disc with a gray-80 "X".
// Used by text-input (내용 삭제) and file-upload (파일 삭제). Fills are theme utilities
// (`fill-krds-gray-20` / `fill-krds-gray-80`) rather than hardcoded hex so the token
// pipeline owns the color; both tokens are fixed numeric steps that render identically
// in light and high-contrast (dark) themes, matching the original artwork.
function IconDeleteFill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <rect width="20" height="20" rx="10" className="fill-krds-gray-20" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.06491 4.93451C5.75249 4.62209 5.24595 4.62209 4.93353 4.93451C4.62112 5.24693 4.62112 5.75346 4.93353 6.06588L8.86863 10.001L4.9351 13.9345C4.62268 14.2469 4.62268 14.7535 4.9351 15.0659C5.24752 15.3783 5.75405 15.3783 6.06647 15.0659L10 11.1323L13.9335 15.0659C14.246 15.3783 14.7525 15.3783 15.0649 15.0659C15.3773 14.7535 15.3773 14.2469 15.0649 13.9345L11.1314 10.001L15.0665 6.06588C15.3789 5.75346 15.3789 5.24693 15.0665 4.93451C14.754 4.62209 14.2475 4.62209 13.9351 4.93451L10 8.86961L6.06491 4.93451Z"
        className="fill-krds-gray-80"
      />
    </svg>
  )
}

export { IconDeleteFill }
