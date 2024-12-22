import Link from "next/link";
import { ReactNode } from "react";

type ConditionalLinkProps = {
  children: ReactNode;
  condition: boolean;
  href?: string;
  [key: string]: any;
};

export const ConditionalLink = ({
  children,
  condition,
  href,
  ...props
}: ConditionalLinkProps) => {
  return condition && href ? (
    <Link href={href} {...props}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};
