import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const StyledHeader = styled.header`
* {
  margin-bottom: 25px;
  float: left;
}
a {
  font-size: 14px;
  margin-right: 15px;
  text-decoration: none;
}
.is-active {
  text-decoration: underline;
}
`

const Header = ({ router: { pathname } }) => (
  <StyledHeader>
    <Link prefetch href='/'>
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
    <Link prefetch href='/about'>
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
  </StyledHeader>
)

export default withRouter(Header)
