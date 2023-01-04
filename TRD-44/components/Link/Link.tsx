import React, { FC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export interface LinkProps extends NextLinkProps {
  target?: string;
  className?: string;
}

export const Link: FC<LinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  children,
  target,
  ...props
}) => {
  const nextLinkProps: NextLinkProps = {
    href: href ?? '#',
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
  };

  return (
    <NextLink {...nextLinkProps}>
      <a target={target} draggable="false" {...props}>
        {children}
      </a>
    </NextLink>
  );
};
