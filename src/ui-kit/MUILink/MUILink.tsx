import Link from '@mui/material/Link';
import { default as NextJSLink } from 'next/link';
import { ComponentProps, forwardRef } from 'react';

type MUILinkProps = ComponentProps<typeof NextJSLink>;

const MUILink = ({ children, href, ...otherProps }: MUILinkProps) => {
  return <NextJSLink href={ href } { ...otherProps } passHref>
    <Link href={href.toString()} >
      { children }
    </Link>
  </NextJSLink>;
};

export default MUILink;
