import {Link} from 'lib/utils/routes'
import styled from 'styled-components'

const StyledLink = styled.a`
  //styles
`
const NextLink = ({ route, params, href, children, className }) => {
  return (
    <Link route={route} params={params} href={href} passHref>
      <StyledLink className={className}>{children}</StyledLink>
    </Link>
  )
};

export default NextLink