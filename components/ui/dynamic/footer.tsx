// Footer is a KRDS identity component with no shadcn primitive equivalent, so there is
// no dual-render branch: the dynamic surface re-exports the KRDS footer composition kit
// directly. (Other identity-only components follow the same KRDS-only pattern.)

export {
  Footer,
  FooterQuick,
  FooterQuickLink,
  FooterLogo,
  FooterInfo,
  FooterAddress,
  FooterContact,
  FooterContactItem,
  FooterLinks,
  FooterLinkActions,
  FooterLinkAction,
  FooterSns,
  FooterSnsLink,
  FooterBottom,
  FooterMenu,
  FooterMenuLink,
  FooterCopyright
} from "@/components/ui/krds/(identity)/footer";
