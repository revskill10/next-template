import Link from 'next/link'
import { withRouter } from 'next/router'

const NextLink = ({href, children, className }) => (
  <Link href={href} passHref>
    <a className={className}>{children}</a>
  </Link>
);

export default withRouter(NextLink)
