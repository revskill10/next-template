import styled from 'styled-components'
import Link from 'components/link'
import IconButton from '@material-ui/core/IconButton';

export const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 5px;
`

export const StyledBarLink = styled(Link)`
  text-decoration: none;
  color: black;
`

export const StyledProfileLink = styled(Link)`
  text-decoration: none;
`

export const IconLink = ({children, ...props}) => (
  <Link {...props}>
    <IconButton>{children}</IconButton>
  </Link>
)
