import { withStyles } from '@material-ui/core/styles';
import {Home} from 'styled-icons/fa-solid/Home.cjs'
import {Blogger} from 'styled-icons/fa-brands/Blogger.cjs'
import {ViewModule} from 'styled-icons/material/ViewModule.cjs'
import StyledNav from 'components/styled-nav'
import { StyledNavLink, IconLink } from 'components/styled-link'
import StyledUserAgent from 'components/styled-user-agent'
import styles from 'components/layouts/styles'

const NavBar = ({theme}) => {
  return (
    <StyledNav>
      <StyledUserAgent computer>
        <>
          <StyledNavLink href='/' prefetch>Home</StyledNavLink>
          <StyledNavLink href='/blog'>Blog</StyledNavLink>
          <StyledNavLink href='/admin'>Admin</StyledNavLink>
        </>
      </StyledUserAgent>
      <StyledUserAgent mobile>
        <>
          <IconLink href='/'>
            <Home size={theme.spacing.unit * 2} title={'Home'} color={'white'} />
          </IconLink>
          <IconLink href='/blog'>
            <Blogger size={theme.spacing.unit * 4} title={'Blog'} color={'white'} />
          </IconLink>
          <IconLink href='/admin'>
            <ViewModule size={theme.spacing.unit * 6} title={'Admin'} color={'white'} />
          </IconLink>
        </>
      </StyledUserAgent>
    </StyledNav>
  )
}

export default  withStyles(styles, { withTheme: true })(NavBar)