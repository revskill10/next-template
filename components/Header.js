import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import LanguageSwitch from 'components/languageSwitch'

const Header = ({ router: { pathname }, className }) => (
  <div className={className}>
    <header >
      <Link prefetch href='/'>
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link prefetch href='/about'>
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      <LanguageSwitch />
    </header>
  </div>
  
)

const StyledHeader = styled(Header)`
header {
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

export default withRouter(StyledHeader)
