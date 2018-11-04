import Link from 'next/link'

const NextLink = ({href, children, className, ...props }) => (
  <Link href={href} passHref {...props}>
    <a className={className}>{children}</a>
  </Link>
);

export default NextLink
