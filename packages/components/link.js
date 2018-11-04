import Link from 'next/link'

const NextLink = ({href, children, className, native, ...props }) => {
  if (native) {
    return (
      <a className={className} {...props} href={href}>{children}</a>
    )
  } else {
    return (
      <Link href={href} passHref {...props}>
        <a className={className}>{children}</a>
      </Link>
    )
  }  
}

export default NextLink
