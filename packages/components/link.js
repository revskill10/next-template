import Link from 'next/link'
import styled from 'styled-components'

const StyledLink = styled.a`
  //styles
`
const NextLink = ({ href, children, className }) => {
  return (
    <Link href={href} passHref>
      <StyledLink className={className}>{children}</StyledLink>
    </Link>
  )
};

export default NextLink