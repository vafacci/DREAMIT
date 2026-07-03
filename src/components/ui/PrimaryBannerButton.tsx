import { Button } from "@/components/ui/Button";
import { RotatingCtaLabel } from "@/components/ui/RotatingCtaLabel";
import { CTA_PRIMARY_HREF } from "@/lib/constants";
import { type ComponentPropsWithoutRef } from "react";

type PrimaryBannerButtonProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  "children" | "href"
> & {
  href?: string;
};

export function PrimaryBannerButton({
  href = CTA_PRIMARY_HREF,
  className = "",
  ...props
}: PrimaryBannerButtonProps) {
  return (
    <Button href={href} className={className} primaryCta {...props}>
      <RotatingCtaLabel />
    </Button>
  );
}
