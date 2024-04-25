import Link from '@mui/material/Link';
import { default as NextJSLink } from 'next/link';
import { ComponentProps } from 'react';

type MUILinkProps = ComponentProps<typeof Link> & { href: string };

const MUILink = ({ children, href, ...otherProps }: MUILinkProps) => {
  return <NextJSLink href={ href } passHref>
    <Link href={href.toString()} { ...otherProps }>
      { children }
    </Link>
  </NextJSLink>;
};

export default MUILink;
